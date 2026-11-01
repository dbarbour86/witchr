import { cookies } from "next/headers";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { getCurrentUser } from "@/lib/supabase/server";
import { isSupabaseConfigured, getSupabaseEnv } from "@/lib/supabase/config";

export const GUEST_SESSION_COOKIE = "witchr_guest_session";
export const GUEST_MAX_QUESTIONS = 1;

export interface GuestAccessCheck {
  isMember: boolean;
  userId?: string;
  guestSessionId: string;
  canAskQuestion: boolean;
  questionsRemaining: number;
  reason?: "guest_preview_available" | "guest_limit_reached" | "member_access" | "storage_unavailable";
  errorMessage?: string;
}

export interface GuestReservationResult {
  allowed: boolean;
  code: "RESERVED" | "GUEST_LIMIT_REACHED" | "CONCURRENT_REQUEST_BLOCKED" | "STORAGE_UNAVAILABLE";
  reservationToken?: string;
  error?: string;
}

// In-memory atomic reservation simulation ONLY for isolated development tests (process.env.SANCTUM_TEST_ENV === "true")
interface TestSessionRecord {
  status: "idle" | "reserved" | "completed";
  questionsCount: number;
  reservationToken?: string;
  reservedAt?: number;
}
const testStore = new Map<string, TestSessionRecord>();

function isIsolatedTestMode(): boolean {
  return process.env.SANCTUM_TEST_ENV === "true";
}

/**
 * Ensures an anonymous guest session ID exists in HTTP-only cookies.
 */
export async function getOrCreateGuestSessionId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get(GUEST_SESSION_COOKIE)?.value;

  if (existing && /^[a-zA-Z0-9_-]{20,64}$/.test(existing)) {
    return existing;
  }

  const newId =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? `${crypto.randomUUID().replace(/-/g, "")}${crypto.randomUUID().replace(/-/g, "")}`.slice(0, 36)
      : Math.random().toString(36).slice(2) + Date.now().toString(36);

  try {
    cookieStore.set(GUEST_SESSION_COOKIE, newId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  } catch {
    // Read-only server component fallback
  }

  return newId;
}

/**
 * Checks whether the current request is an authenticated member or an eligible guest.
 * Persistent storage is mandatory in production: if storage is unavailable, returns storage_unavailable
 * without consuming preview or allowing unauthorized access.
 */
export async function checkGuestAccess(): Promise<GuestAccessCheck> {
  const user = await getCurrentUser();
  const guestSessionId = await getOrCreateGuestSessionId();

  if (user) {
    return {
      isMember: true,
      userId: user.id,
      guestSessionId,
      canAskQuestion: true,
      questionsRemaining: Infinity,
      reason: "member_access",
    };
  }

  // Mandatory persistent storage check
  const env = getSupabaseEnv();
  const hasDb = isSupabaseConfigured() && env.hasSecretKey;

  if (!hasDb) {
    if (isIsolatedTestMode()) {
      const record = testStore.get(guestSessionId);
      const count = record?.questionsCount || 0;
      const canAsk = count < GUEST_MAX_QUESTIONS && record?.status !== "completed";
      return {
        isMember: false,
        guestSessionId,
        canAskQuestion: canAsk,
        questionsRemaining: Math.max(0, GUEST_MAX_QUESTIONS - count),
        reason: canAsk ? "guest_preview_available" : "guest_limit_reached",
      };
    }

    return {
      isMember: false,
      guestSessionId,
      canAskQuestion: false,
      questionsRemaining: 0,
      reason: "storage_unavailable",
      errorMessage: "Sanctum consultation storage is unconfigured or initializing. Persistent guest tracking is required.",
    };
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return {
      isMember: false,
      guestSessionId,
      canAskQuestion: false,
      questionsRemaining: 0,
      reason: "storage_unavailable",
      errorMessage: "Database administrative client is unavailable.",
    };
  }

  try {
    const { data, error } = await (admin as any)
      .from("sanctum_guest_previews")
      .select("questions_count, status")
      .eq("session_id", guestSessionId)
      .maybeSingle();

    if (error) {
      console.error("[Guest Access Check Error]", error);
      return {
        isMember: false,
        guestSessionId,
        canAskQuestion: false,
        questionsRemaining: 0,
        reason: "storage_unavailable",
        errorMessage: "Failed to read persistent guest preview state from database.",
      };
    }

    const count = Number(data?.questions_count) || 0;
    const isCompleted = data?.status === "completed" || count >= GUEST_MAX_QUESTIONS;

    return {
      isMember: false,
      guestSessionId,
      canAskQuestion: !isCompleted,
      questionsRemaining: isCompleted ? 0 : 1,
      reason: isCompleted ? "guest_limit_reached" : "guest_preview_available",
    };
  } catch (err) {
    console.error("[Guest Access Database Exception]", err);
    return {
      isMember: false,
      guestSessionId,
      canAskQuestion: false,
      questionsRemaining: 0,
      reason: "storage_unavailable",
      errorMessage: "Unable to verify guest preview allowance against database storage.",
    };
  }
}

/**
 * Atomically reserves a guest preview in PostgreSQL.
 * Uses SELECT ... FOR UPDATE row-level locking to handle simultaneous requests across distributed nodes.
 * Automatically recovers expired reservations.
 */
export async function reserveGuestPreview(guestSessionId: string): Promise<GuestReservationResult> {
  const env = getSupabaseEnv();
  const hasDb = isSupabaseConfigured() && env.hasSecretKey;

  if (!hasDb) {
    if (isIsolatedTestMode()) {
      let record = testStore.get(guestSessionId);
      if (!record) {
        record = { status: "idle", questionsCount: 0 };
        testStore.set(guestSessionId, record);
      }

      // Check expired reservation
      if (record.status === "reserved") {
        if (record.reservedAt && Date.now() - record.reservedAt > 120_000) {
          record.status = "idle";
          record.reservationToken = undefined;
        } else {
          return {
            allowed: false,
            code: "CONCURRENT_REQUEST_BLOCKED",
            error: "A question preview request is already in progress for this session. Please wait a moment.",
          };
        }
      }

      if (record.questionsCount >= GUEST_MAX_QUESTIONS || record.status === "completed") {
        return {
          allowed: false,
          code: "GUEST_LIMIT_REACHED",
          error: "Guest preview limit reached. Create an account to continue your conversation in the Sanctum.",
        };
      }

      const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
      record.status = "reserved";
      record.reservationToken = token;
      record.reservedAt = Date.now();

      return {
        allowed: true,
        code: "RESERVED",
        reservationToken: token,
      };
    }

    return {
      allowed: false,
      code: "STORAGE_UNAVAILABLE",
      error: "Sanctum persistent storage is unconfigured or initializing. Preview cannot be reserved.",
    };
  }

  const admin = getSupabaseAdminClient();
  if (!admin) {
    return {
      allowed: false,
      code: "STORAGE_UNAVAILABLE",
      error: "Database administrative client is unavailable.",
    };
  }

  try {
    const { data, error } = await (admin as any).rpc("sanctum_reserve_guest_preview", {
      p_session_id: guestSessionId,
      p_timeout_seconds: 120,
    });

    if (error) {
      console.error("[Database Reserve Preview Error]", error);
      return {
        allowed: false,
        code: "STORAGE_UNAVAILABLE",
        error: "Database reservation error: " + error.message,
      };
    }

    if (!data || typeof data !== "object") {
      return {
        allowed: false,
        code: "STORAGE_UNAVAILABLE",
        error: "Malformed reservation response from database.",
      };
    }

    return {
      allowed: Boolean(data.allowed),
      code: data.code || (data.allowed ? "RESERVED" : "GUEST_LIMIT_REACHED"),
      reservationToken: data.reservationToken,
      error: data.error,
    };
  } catch (err) {
    console.error("[Database Reserve Preview Exception]", err);
    return {
      allowed: false,
      code: "STORAGE_UNAVAILABLE",
      error: "Could not execute atomic reservation on database.",
    };
  }
}

/**
 * Releases an unconsumed reservation (e.g., if generation or synthesis throws an error).
 */
export async function releaseGuestPreview(
  guestSessionId: string,
  reservationToken: string
): Promise<boolean> {
  const env = getSupabaseEnv();
  const hasDb = isSupabaseConfigured() && env.hasSecretKey;

  if (!hasDb) {
    if (isIsolatedTestMode()) {
      const record = testStore.get(guestSessionId);
      if (record && record.reservationToken === reservationToken && record.status === "reserved") {
        record.status = "idle";
        record.reservationToken = undefined;
        record.reservedAt = undefined;
        return true;
      }
      return false;
    }
    return false;
  }

  const admin = getSupabaseAdminClient();
  if (!admin) return false;

  try {
    const { data, error } = await (admin as any).rpc("sanctum_release_guest_reservation", {
      p_session_id: guestSessionId,
      p_reservation_token: reservationToken,
    });
    return !error && Boolean(data);
  } catch (err) {
    console.error("[Database Release Reservation Exception]", err);
    return false;
  }
}

/**
 * Atomically marks the guest preview as completed and increments the count.
 * Called ONLY AFTER successful response generation.
 */
export async function completeGuestPreview(
  guestSessionId: string,
  reservationToken: string
): Promise<boolean> {
  const env = getSupabaseEnv();
  const hasDb = isSupabaseConfigured() && env.hasSecretKey;

  if (!hasDb) {
    if (isIsolatedTestMode()) {
      const record = testStore.get(guestSessionId);
      if (record && record.reservationToken === reservationToken && record.status === "reserved") {
        record.status = "completed";
        record.questionsCount += 1;
        record.reservationToken = undefined;
        record.reservedAt = undefined;
        return true;
      }
      return false;
    }
    return false;
  }

  const admin = getSupabaseAdminClient();
  if (!admin) return false;

  try {
    const { data, error } = await (admin as any).rpc("sanctum_complete_guest_preview", {
      p_session_id: guestSessionId,
      p_reservation_token: reservationToken,
    });
    return !error && Boolean(data);
  } catch (err) {
    console.error("[Database Complete Reservation Exception]", err);
    return false;
  }
}
