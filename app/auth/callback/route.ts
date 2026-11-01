import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || searchParams.get("redirect") || "/sanctum/chamber";

  // Validate internal redirect
  const safeNext =
    next.startsWith("/sanctum") && !next.startsWith("//") && !next.includes(":")
      ? next
      : "/sanctum/chamber";

  if (code) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${safeNext}`);
      }
      console.error("[Auth Callback Error]", error);
    }
  }

  // Fallback to login with error
  return NextResponse.redirect(`${origin}/sanctum/login?error=auth_callback_failed`);
}

