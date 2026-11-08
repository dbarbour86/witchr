import { NextRequest, NextResponse } from "next/server";
import { checkGuestAccess } from "@/lib/sanctum/guest-access";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { resolveClientIp, hashClientIp } from "@/lib/sanctum/oracle/client-ip";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const clientIp = resolveClientIp(req.headers);
    const clientIpHash = hashClientIp(clientIp);
    const access = await checkGuestAccess(clientIpHash);
    return NextResponse.json({
      isMember: access.isMember,
      questionsRemaining: access.questionsRemaining,
      canAskQuestion: access.canAskQuestion,
      isConfigured: isSupabaseConfigured(),
    });
  } catch (error) {
    console.error("[Auth Status Error]", error);
    return NextResponse.json({
      isMember: false,
      questionsRemaining: 1,
      canAskQuestion: true,
      isConfigured: isSupabaseConfigured(),
    });
  }
}

