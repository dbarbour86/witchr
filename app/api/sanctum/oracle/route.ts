import { NextRequest, NextResponse } from "next/server";
import { checkDistributedRateLimit, checkGuestIpRateLimit } from "@/lib/sanctum/oracle/rate-limit";
import { resolveClientIp, hashClientIp } from "@/lib/sanctum/oracle/client-ip";
import { verifyTurnstileToken } from "@/lib/sanctum/oracle/turnstile";
import {
  generateTarotOracleResponse,
  generateWorkingOracleResponse,
  generateConversationOracleResponse,
} from "@/lib/sanctum/oracle/client";
import {
  getTarotFallback,
  getWorkingFallback,
  getConversationFallback,
} from "@/lib/sanctum/oracle/fallbacks";
import {
  OracleTarotInput,
  OracleWorkingInput,
  OracleConversationInput,
} from "@/lib/sanctum/oracle/types";
import {
  checkGuestAccess,
  reserveGuestPreview,
  releaseGuestPreview,
  completeGuestPreview,
} from "@/lib/sanctum/guest-access";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let guestSessionId: string | null = null;
  let reservationToken: string | null = null;
  let clientIpHash: string | null = null;

  try {
    // 1. Resolve client IP securely and compute privacy-conscious hash
    const clientIp = resolveClientIp(req.headers);
    clientIpHash = hashClientIp(clientIp);

    // Distributed rate limit across serverless instances (20 requests per 60 seconds)
    const rateLimit = await checkDistributedRateLimit(clientIpHash, 20, 60);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. Expected JSON object." },
        { status: 400 }
      );
    }

    const { type, payload } = body;

    // 2. Check access privileges with IP-anchored enforcement
    const access = await checkGuestAccess(clientIpHash);

    // Three-card and ritual creation require active member authentication
    if ((type === "three-card" || type === "working") && !access.isMember) {
      return NextResponse.json(
        {
          error: "This practice requires an active Sanctum membership. Please log in or create an account to access.",
          code: "AUTHENTICATION_REQUIRED",
        },
        { status: 401 }
      );
    }

    // Guest conversation allowance check, bot protection, and atomic database reservation
    if (type === "conversation" && !access.isMember) {
      guestSessionId = access.guestSessionId;

      // 2a. IP-level guest preview abuse threshold (allows shared Wi-Fi up to 10 previews/hr, blocks rapid cookie rotators)
      const ipGuestLimit = await checkGuestIpRateLimit(clientIpHash);
      if (!ipGuestLimit.allowed) {
        return NextResponse.json(
          {
            error: "Too many guest consultations from this network. Please sign in or create an account to continue.",
            code: "GUEST_IP_LIMIT_EXCEEDED",
          },
          {
            status: 429,
            headers: {
              "Retry-After": String(ipGuestLimit.resetSeconds),
            },
          }
        );
      }

      // 2b. Bot protection (Cloudflare Turnstile): Deferred to Phase 2 (frontend widget integration).
      // Backend verification helper is maintained in @/lib/sanctum/oracle/turnstile for future activation.
      // Server enforcement is kept inactive in Phase 1 so legitimate guests are never blocked.

      if (!access.canAskQuestion) {
        if (access.reason === "storage_unavailable") {
          return NextResponse.json(
            {
              error: "Sanctum consultation storage is momentarily initializing. Please try again in a few moments.",
              code: "STORAGE_UNAVAILABLE",
            },
            { status: 503 }
          );
        }

        return NextResponse.json(
          {
            error: "You have used your 1 free preview question. Create an account to continue your conversation in the Sanctum.",
            code: "GUEST_LIMIT_REACHED",
          },
          { status: 403 }
        );
      }

      // Reserve atomically in database bound to both session ID and IP hash
      const reservation = await reserveGuestPreview(access.guestSessionId, clientIpHash);
      if (!reservation.allowed) {
        if (reservation.code === "CONCURRENT_REQUEST_BLOCKED") {
          return NextResponse.json(
            {
              error: reservation.error || "A preview question is currently in flight. Please wait a moment.",
              code: "CONCURRENT_REQUEST_BLOCKED",
            },
            { status: 429 }
          );
        }
        if (reservation.code === "STORAGE_UNAVAILABLE") {
          return NextResponse.json(
            {
              error: "Sanctum consultation storage is momentarily initializing. Please try again in a few moments.",
              code: "STORAGE_UNAVAILABLE",
            },
            { status: 503 }
          );
        }
        return NextResponse.json(
          {
            error: reservation.error || "Guest preview limit reached. Create an account to continue.",
            code: reservation.code,
          },
          { status: 403 }
        );
      }

      reservationToken = reservation.reservationToken || null;
    }

    // 3. Handle rate limiting gracefully
    if (!rateLimit.allowed) {
      if (type === "three-card" && payload) {
        return NextResponse.json(
          {
            success: true,
            meta: {
              source: "written-tradition",
              fallback: true,
              fallbackReason: "Rate limit exceeded. Using rule-based synthesis.",
            },
            data: getTarotFallback(payload as OracleTarotInput),
          },
          {
            status: 200,
            headers: {
              "X-RateLimit-Limit": String(rateLimit.limit),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(rateLimit.resetSeconds),
            },
          }
        );
      } else if (type === "working" && payload) {
        return NextResponse.json(
          {
            success: true,
            meta: {
              source: "written-tradition",
              fallback: true,
              fallbackReason: "Rate limit exceeded. Using rule-based formulation.",
            },
            data: getWorkingFallback(payload as OracleWorkingInput),
          },
          {
            status: 200,
            headers: {
              "X-RateLimit-Limit": String(rateLimit.limit),
              "X-RateLimit-Remaining": "0",
              "X-RateLimit-Reset": String(rateLimit.resetSeconds),
            },
          }
        );
      } else if (type === "conversation" && payload && typeof payload.message === "string") {
        const fallbackResult = {
          success: true,
          meta: {
            source: "written-tradition",
            fallback: true,
            fallbackReason: "Rate limit exceeded. Using rule-based synthesis.",
          },
          data: getConversationFallback(payload as OracleConversationInput),
        };

        // Complete guest preview on successful fallback delivery
        if (!access.isMember && guestSessionId && reservationToken) {
          await completeGuestPreview(guestSessionId, reservationToken, clientIpHash || undefined);
          reservationToken = null;
        }

        return NextResponse.json(fallbackResult, {
          status: 200,
          headers: {
            "X-RateLimit-Limit": String(rateLimit.limit),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetSeconds),
          },
        });
      }

      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait before consulting the Oracle again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rateLimit.resetSeconds),
          },
        }
      );
    }

    // 4. Validate user input bounds
    if (typeof payload?.question === "string" && payload.question.length > 1000) {
      return NextResponse.json(
        { error: "Question exceeds maximum allowed limit of 1000 characters." },
        { status: 400 }
      );
    }

    if (typeof payload?.customIntention === "string" && payload.customIntention.length > 1000) {
      return NextResponse.json(
        { error: "Custom intention exceeds maximum allowed limit of 1000 characters." },
        { status: 400 }
      );
    }

    if (typeof payload?.message === "string" && payload.message.length > 1000) {
      return NextResponse.json(
        { error: "Message exceeds maximum allowed limit of 1000 characters." },
        { status: 400 }
      );
    }

    // 5. Route by type
    if (type === "conversation") {
      if (!payload || typeof payload.message !== "string" || payload.message.trim().length === 0) {
        return NextResponse.json(
          { error: "Missing required 'message' string in conversation payload." },
          { status: 400 }
        );
      }

      if (process.env.NODE_ENV !== "production") {
        console.log(`[Sanctum Oracle] incoming conversation request: "${payload.message.trim().slice(0, 120)}" (member=${access.isMember})`);
      }

      const result = await generateConversationOracleResponse(payload as OracleConversationInput);

      // Complete reservation atomically in database only upon successful generation
      if (!access.isMember && guestSessionId && reservationToken) {
        await completeGuestPreview(guestSessionId, reservationToken, clientIpHash || undefined);
        reservationToken = null;
      }

      return NextResponse.json(result, {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      });
    }

    if (type === "three-card") {
      if (!payload || !payload.situation || !payload.challenge || !payload.guidance) {
        return NextResponse.json(
          { error: "Missing required Three-Card spread positions." },
          { status: 400 }
        );
      }

      const result = await generateTarotOracleResponse(payload as OracleTarotInput);
      return NextResponse.json(result, {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      });
    }

    if (type === "working") {
      const intention =
        (typeof payload?.intention === "string" && payload.intention.trim().length > 0 ? payload.intention.trim() : null) ||
        (typeof payload?.effectiveIntention === "string" && payload.effectiveIntention.trim().length > 0 ? payload.effectiveIntention.trim() : null) ||
        (typeof payload?.customIntention === "string" && payload.customIntention.trim().length > 0 ? payload.customIntention.trim() : null);

      if (!payload || !intention || !Array.isArray(payload.approvedIngredients)) {
        return NextResponse.json(
          { error: "Missing required intention or approved ingredients." },
          { status: 400 }
        );
      }

      payload.intention = intention;
      payload.effectiveIntention = payload.effectiveIntention || intention;

      const result = await generateWorkingOracleResponse(payload as OracleWorkingInput);
      return NextResponse.json(result, {
        headers: {
          "Cache-Control": "no-store",
          "X-RateLimit-Limit": String(rateLimit.limit),
          "X-RateLimit-Remaining": String(rateLimit.remaining),
        },
      });
    }

    return NextResponse.json(
      { error: `Unsupported Oracle request type: '${type}'. Expected 'conversation', 'three-card', or 'working'.` },
      { status: 400 }
    );
  } catch (error) {
    console.error("[Oracle API Error]", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while communicating with the Oracle." },
      { status: 500 }
    );
  } finally {
    // If generation aborted or threw before completeGuestPreview was called, release reservation
    if (reservationToken && guestSessionId) {
      await releaseGuestPreview(guestSessionId, reservationToken, clientIpHash || undefined).catch((err) => {
        console.error("[Guest Preview Release Error]", err);
      });
    }
  }
}
