import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") || searchParams.get("redirect") || "/sanctum/chamber";

  // Validate internal redirect
  const safeNext =
    next.startsWith("/sanctum") && !next.startsWith("//") && !next.includes(":")
      ? next
      : "/sanctum/chamber";

  // In proxy/serverless environments like Vercel preview, respect x-forwarded-host
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocal = process.env.NODE_ENV === "development";
  const baseUrl = isLocal ? origin : forwardedHost ? `https://${forwardedHost}` : origin;

  if (code) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const redirectResponse = NextResponse.redirect(`${baseUrl}${safeNext}`);
        // Ensure session cookies are attached to the redirect response
        const cookieStore = await cookies();
        cookieStore.getAll().forEach((c) => {
          redirectResponse.cookies.set(c.name, c.value);
        });
        return redirectResponse;
      }
      console.error("[Auth Callback Error]", error);
    }
  } else if (token_hash && type) {
    const supabase = await getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.verifyOtp({ token_hash, type });
      if (!error) {
        const redirectResponse = NextResponse.redirect(`${baseUrl}${safeNext}`);
        // Ensure session cookies are attached to the redirect response
        const cookieStore = await cookies();
        cookieStore.getAll().forEach((c) => {
          redirectResponse.cookies.set(c.name, c.value);
        });
        return redirectResponse;
      }
      console.error("[Auth Callback OTP Error]", error);
    }
  }

  // Fallback to login with error
  return NextResponse.redirect(`${baseUrl}/sanctum/login?error=auth_callback_failed`);
}

