-- Witchr Sanctum: Atomic Guest Preview Reservation & Tracking
-- Enforces the 1-question guest allowance atomically in PostgreSQL across distributed server instances.
-- Hardened: Least privilege (service_role only), fixed search_path, validated inputs, bounded timeouts.
-- Safe to re-run idempotently without modifying existing records.

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;

-- 1. Table Schema
CREATE TABLE IF NOT EXISTS public.sanctum_guest_previews (
  session_id VARCHAR(64) PRIMARY KEY,
  status VARCHAR(20) NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'reserved', 'completed')),
  questions_count INT NOT NULL DEFAULT 0,
  reservation_token VARCHAR(64),
  reserved_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  first_asked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_asked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.sanctum_guest_previews ENABLE ROW LEVEL SECURITY;

-- Restrict direct table access: Revoke from browser roles, grant exclusively to server service_role
REVOKE ALL ON TABLE public.sanctum_guest_previews FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.sanctum_guest_previews TO service_role;

DROP POLICY IF EXISTS "Service role manages guest previews" ON public.sanctum_guest_previews;
CREATE POLICY "Service role manages guest previews"
  ON public.sanctum_guest_previews
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 2. Function: Atomic reservation
-- Locks session row with SELECT ... FOR UPDATE.
-- Validates session format and bounds timeout between 30 and 600 seconds.
CREATE OR REPLACE FUNCTION public.sanctum_reserve_guest_preview(
  p_session_id VARCHAR(64),
  p_timeout_seconds INT DEFAULT 120
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
DECLARE
  v_row public.sanctum_guest_previews%ROWTYPE;
  v_token VARCHAR(64);
  v_timeout INT;
BEGIN
  -- Strict validation of session identifier format
  IF p_session_id IS NULL OR length(p_session_id) < 20 OR length(p_session_id) > 64 OR p_session_id !~ '^[a-zA-Z0-9_-]+$' THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'code', 'INVALID_SESSION',
      'error', 'Invalid guest session identifier format.'
    );
  END IF;

  -- Bound reservation timeout safely between 30s and 600s (defaults to 120s)
  v_timeout := GREATEST(30, LEAST(COALESCE(p_timeout_seconds, 120), 600));

  -- Seed initial idle row if absent without overwriting existing data
  INSERT INTO public.sanctum_guest_previews (session_id, status, questions_count)
  VALUES (p_session_id, 'idle', 0)
  ON CONFLICT (session_id) DO NOTHING;

  -- Lock row exclusively to serialize simultaneous requests
  SELECT * INTO v_row
  FROM public.sanctum_guest_previews
  WHERE session_id = p_session_id
  FOR UPDATE;

  -- Verify preview allowance not already exhausted
  IF v_row.questions_count >= 1 OR v_row.status = 'completed' THEN
    RETURN jsonb_build_object(
      'allowed', false,
      'code', 'GUEST_LIMIT_REACHED',
      'error', 'Guest preview limit reached. Create an account to continue your conversation in the Sanctum.'
    );
  END IF;

  -- Verify active lock; auto-recover if previous lock timed out
  IF v_row.status = 'reserved' THEN
    IF v_row.reserved_at IS NOT NULL AND v_row.reserved_at < NOW() - (v_timeout || ' seconds')::INTERVAL THEN
      v_row.status := 'idle';
      v_row.reservation_token := NULL;
    ELSE
      RETURN jsonb_build_object(
        'allowed', false,
        'code', 'CONCURRENT_REQUEST_BLOCKED',
        'error', 'A question preview request is already in progress for this session. Please wait a moment.'
      );
    END IF;
  END IF;

  -- Generate secure token and reserve slot
  v_token := encode(gen_random_bytes(24), 'hex');

  UPDATE public.sanctum_guest_previews
  SET
    status = 'reserved',
    reservation_token = v_token,
    reserved_at = NOW(),
    last_asked_at = NOW()
  WHERE session_id = p_session_id;

  RETURN jsonb_build_object(
    'allowed', true,
    'code', 'RESERVED',
    'reservationToken', v_token
  );
END;
$$;

-- Revoke execute from browser roles; grant exclusively to server service_role
REVOKE ALL ON FUNCTION public.sanctum_reserve_guest_preview(VARCHAR, INT) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sanctum_reserve_guest_preview(VARCHAR, INT) TO service_role;

-- 3. Function: Release reservation on failed/aborted generation
CREATE OR REPLACE FUNCTION public.sanctum_release_guest_reservation(
  p_session_id VARCHAR(64),
  p_reservation_token VARCHAR(64)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) < 20 OR length(p_session_id) > 64 OR p_session_id !~ '^[a-zA-Z0-9_-]+$' OR
     p_reservation_token IS NULL OR length(p_reservation_token) < 20 OR length(p_reservation_token) > 64 THEN
    RETURN FALSE;
  END IF;

  UPDATE public.sanctum_guest_previews
  SET
    status = 'idle',
    reservation_token = NULL,
    reserved_at = NULL
  WHERE session_id = p_session_id
    AND reservation_token = p_reservation_token
    AND status = 'reserved';

  RETURN FOUND;
END;
$$;

-- Revoke execute from browser roles; grant exclusively to server service_role
REVOKE ALL ON FUNCTION public.sanctum_release_guest_reservation(VARCHAR, VARCHAR) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sanctum_release_guest_reservation(VARCHAR, VARCHAR) TO service_role;

-- 4. Function: Complete preview after successful response delivery
CREATE OR REPLACE FUNCTION public.sanctum_complete_guest_preview(
  p_session_id VARCHAR(64),
  p_reservation_token VARCHAR(64)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions, pg_temp
AS $$
BEGIN
  IF p_session_id IS NULL OR length(p_session_id) < 20 OR length(p_session_id) > 64 OR p_session_id !~ '^[a-zA-Z0-9_-]+$' OR
     p_reservation_token IS NULL OR length(p_reservation_token) < 20 OR length(p_reservation_token) > 64 THEN
    RETURN FALSE;
  END IF;

  UPDATE public.sanctum_guest_previews
  SET
    status = 'completed',
    questions_count = questions_count + 1,
    reservation_token = NULL,
    completed_at = NOW(),
    last_asked_at = NOW()
  WHERE session_id = p_session_id
    AND reservation_token = p_reservation_token
    AND status = 'reserved';

  RETURN FOUND;
END;
$$;

-- Revoke execute from browser roles; grant exclusively to server service_role
REVOKE ALL ON FUNCTION public.sanctum_complete_guest_preview(VARCHAR, VARCHAR) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.sanctum_complete_guest_preview(VARCHAR, VARCHAR) TO service_role;
