/**
 * Cloudflare Turnstile Bot Protection Verification Helper
 * 
 * PHASE 1 STATUS: DEFERRED / INACTIVE.
 * This server helper is prepared for Phase 2 integration when the frontend widget
 * (@marsidev/react-turnstile or Turnstile script) is connected in OracleChatClient.
 * In Phase 1, server enforcement is intentionally disabled so that legitimate guest
 * consultations are not blocked.
 */

export interface TurnstileVerificationResult {
  success: boolean;
  error?: string;
  isConfigured: boolean;
}

/**
 * Validates a client-submitted Turnstile response token with Cloudflare's siteverify API.
 * If TURNSTILE_SECRET_KEY is not configured, flags isConfigured: false.
 */
export async function verifyTurnstileToken(
  token: string | null | undefined,
  remoteIp?: string
): Promise<TurnstileVerificationResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();

  // If Turnstile is unconfigured on the server
  if (!secret) {
    return {
      success: true, // Non-blocking when unconfigured
      isConfigured: false,
    };
  }

  if (!token || typeof token !== "string" || token.trim().length === 0) {
    return {
      success: false,
      error: "Bot verification token is missing or empty.",
      isConfigured: true,
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secret);
    formData.append("response", token.trim());
    if (remoteIp && remoteIp !== "127.0.0.1") {
      formData.append("remoteip", remoteIp);
    }

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Turnstile verification endpoint returned status ${res.status}.`,
        isConfigured: true,
      };
    }

    const data = await res.json();
    if (data.success) {
      return {
        success: true,
        isConfigured: true,
      };
    }

    const errorCodes = Array.isArray(data["error-codes"])
      ? data["error-codes"].join(", ")
      : "verification_failed";

    return {
      success: false,
      error: `Turnstile challenge failed: ${errorCodes}`,
      isConfigured: true,
    };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Turnstile network verification failed.";
    return {
      success: false,
      error: msg,
      isConfigured: true,
    };
  }
}

