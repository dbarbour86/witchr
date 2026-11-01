import { NextResponse } from "next/server";
import { checkGuestAccess } from "@/lib/sanctum/guest-access";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const access = await checkGuestAccess();
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

