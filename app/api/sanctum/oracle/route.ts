import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/sanctum/oracle/rate-limit";
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

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. Resolve client IP for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 20, 60_000); // 20 requests per minute

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. Expected JSON object." },
        { status: 400 }
      );
    }

    const { type, payload } = body;

    // 2. Handle rate limiting gracefully
    if (!rateLimit.allowed) {
      if (type === "three-card" && payload) {
        return NextResponse.json(
          {
            success: true,
            meta: {
              source: "written-tradition",
              fallback: true,
              fallbackReason: "Rate limit exceeded. Returned to written tradition.",
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
              fallbackReason: "Rate limit exceeded. Returned to written tradition.",
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
        return NextResponse.json(
          {
            success: true,
            meta: {
              source: "written-tradition",
              fallback: true,
              fallbackReason: "Rate limit exceeded. Returned to written tradition.",
            },
            data: getConversationFallback(payload as OracleConversationInput),
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

    // 3. Validate user input bounds
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

    // 4. Route by type
    if (type === "conversation") {
      if (!payload || typeof payload.message !== "string" || payload.message.trim().length === 0) {
        return NextResponse.json(
          { error: "Missing required 'message' string in conversation payload." },
          { status: 400 }
        );
      }

      const result = await generateConversationOracleResponse(payload as OracleConversationInput);
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
      if (!payload || !payload.intention || !Array.isArray(payload.approvedIngredients)) {
        return NextResponse.json(
          { error: "Missing required intention or approved ingredients." },
          { status: 400 }
        );
      }

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
  }
}
