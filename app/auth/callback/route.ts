import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";

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
  const targetRedirect = `${baseUrl}${safeNext}`;

  const { url, publishableKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !url || !publishableKey) {
    return NextResponse.redirect(`${baseUrl}/sanctum/login?error=setup_required`);
  }

  // Pre-initialize redirect response so we can write cookies directly onto it with full original options
  const redirectResponse = NextResponse.redirect(targetRedirect);
  const cookieStore = await cookies();

  // Forward existing cookies (e.g. guest session cookie) to preserve them
  cookieStore.getAll().forEach((c) => {
    redirectResponse.cookies.set(c.name, c.value);
  });

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          // Update cookieStore for downstream server context
          try {
            cookieStore.set(name, value, options);
          } catch {}
          // Set directly on the redirect response PRESERVING ALL ORIGINAL OPTIONS
          // (including expiry, maxAge, security attributes, httpOnly, sameSite, path, domain)
          redirectResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return redirectResponse;
    }
    console.error("[Auth Callback Error]", error);
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return redirectResponse;
    }
    console.error("[Auth Callback OTP Error]", error);
  }

  // Fallback to login with error
  return NextResponse.redirect(`${baseUrl}/sanctum/login?error=auth_callback_failed`);
}

