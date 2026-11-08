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

  const cookieStore = await cookies();
  const cookieRedirect = cookieStore.get("sanctum_oauth_redirect")?.value;
  const rawNext =
    searchParams.get("next") ||
    searchParams.get("redirect") ||
    cookieRedirect ||
    "/sanctum/chamber";

  // Validate internal redirect destination path
  const safeNext =
    rawNext.startsWith("/sanctum") && !rawNext.startsWith("//") && !rawNext.includes(":")
      ? rawNext
      : "/sanctum/chamber";

  // Explicit, hardened host allowlist (strictly avoids blanket *.vercel.app wildcard)
  const forwardedHost = request.headers.get("x-forwarded-host")?.trim().toLowerCase();
  const isLocal = process.env.NODE_ENV === "development";

  const isApprovedHost = (host: string | undefined): boolean => {
    if (!host) return false;
    // Production domains
    if (host === "www.witchr.com" || host === "witchr.com") return true;
    // Project-specific alias
    if (host === "witchr-one.vercel.app") return true;
    // Team-scoped Vercel preview deployments (supports legitimate hyphenated branch names)
    if (/^witchr(-[a-z0-9]+)*-derekbarbour-9724s-projects\.vercel\.app$/.test(host)) return true;
    // Local development hosts
    if (isLocal && (host === "localhost:3000" || host === "127.0.0.1:3000" || host === "localhost" || host === "127.0.0.1")) {
      return true;
    }
    return false;
  };

  const safeHost = isApprovedHost(forwardedHost) ? forwardedHost : null;
  const baseUrl = isLocal ? origin : safeHost ? `https://${safeHost}` : "https://www.witchr.com";
  const targetRedirect = `${baseUrl}${safeNext}`;

  // Check for OAuth cancellation or provider errors (e.g. access_denied)
  const authError = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  if (authError) {
    console.error("[Auth Callback OAuth Error]", authError, errorDescription);
    const errParams = new URLSearchParams();
    errParams.set("error", authError);
    if (errorDescription) errParams.set("error_description", errorDescription);
    errParams.set("redirect", safeNext);
    const errResponse = NextResponse.redirect(`${baseUrl}/sanctum/login?${errParams.toString()}`);
    errResponse.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });
    return errResponse;
  }

  const { url, publishableKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured || !url || !publishableKey) {
    const setupErrResponse = NextResponse.redirect(`${baseUrl}/sanctum/login?error=setup_required`);
    setupErrResponse.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });
    return setupErrResponse;
  }

  // Pre-initialize redirect response so we can write cookies directly onto it with full original options
  const redirectResponse = NextResponse.redirect(targetRedirect);

  // Clear one-time oauth redirect cookie upon consumption
  redirectResponse.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });

  // Forward existing cookies (e.g. guest session cookie) to preserve them
  cookieStore.getAll().forEach((c) => {
    if (c.name !== "sanctum_oauth_redirect") {
      redirectResponse.cookies.set(c.name, c.value);
    }
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
    console.error("[Auth Callback Code Exchange Error]", error);
    const errParams = new URLSearchParams();
    errParams.set("error", "code_exchange_failed");
    if (error.message) errParams.set("error_description", error.message);
    errParams.set("redirect", safeNext);
    const errRes = NextResponse.redirect(`${baseUrl}/sanctum/login?${errParams.toString()}`);
    errRes.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });
    return errRes;
  } else if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });
    if (!error) {
      return redirectResponse;
    }
    console.error("[Auth Callback OTP Error]", error);
    const errParams = new URLSearchParams();
    errParams.set("error", "otp_verification_failed");
    if (error.message) errParams.set("error_description", error.message);
    errParams.set("redirect", safeNext);
    const errRes = NextResponse.redirect(`${baseUrl}/sanctum/login?${errParams.toString()}`);
    errRes.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });
    return errRes;
  }

  // Fallback to login with error
  const fallbackParams = new URLSearchParams();
  fallbackParams.set("error", "auth_callback_failed");
  fallbackParams.set("redirect", safeNext);
  const fallbackRes = NextResponse.redirect(`${baseUrl}/sanctum/login?${fallbackParams.toString()}`);
  fallbackRes.cookies.set("sanctum_oauth_redirect", "", { path: "/", maxAge: 0 });
  return fallbackRes;
}
