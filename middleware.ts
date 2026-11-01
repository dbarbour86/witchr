import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/config";
import { GUEST_SESSION_COOKIE } from "@/lib/sanctum/guest-access";

// Protected Sanctum Member Routes
const PROTECTED_PREFIXES = [
  "/sanctum/tarot",
  "/sanctum/working",
  "/sanctum/grimoire",
];

/**
 * Validates that an authentication redirect path is safe and strictly internal.
 * Prevents open redirect vulnerabilities.
 */
export function isSafeSanctumRedirect(target: string | null | undefined): boolean {
  if (!target || typeof target !== "string") return false;
  const clean = target.trim();
  // Must start with /sanctum, cannot start with // or include protocol
  return clean.startsWith("/sanctum") && !clean.startsWith("//") && !clean.includes(":");
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Ensure all Sanctum routes carry noindex, nofollow headers to prevent search indexing
  if (pathname.startsWith("/sanctum")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // Ensure anonymous guest session cookie exists
  let guestCookie = request.cookies.get(GUEST_SESSION_COOKIE)?.value;
  if (!guestCookie || !/^[a-zA-Z0-9_-]{20,64}$/.test(guestCookie)) {
    guestCookie = (typeof crypto !== "undefined" && crypto.randomUUID)
      ? `${crypto.randomUUID().replace(/-/g, "")}${crypto.randomUUID().replace(/-/g, "")}`.slice(0, 36)
      : Math.random().toString(36).slice(2) + Date.now().toString(36);
    response.cookies.set(GUEST_SESSION_COOKIE, guestCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  // Check if route requires member authentication
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return response;
  }

  // Verify Supabase session
  const { url, publishableKey, isConfigured } = getSupabaseEnv();

  // If Supabase is not configured yet, redirect with explanation
  if (!isConfigured || !url || !publishableKey) {
    const loginUrl = new URL("/sanctum/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    loginUrl.searchParams.set("reason", "setup_required");
    return NextResponse.redirect(loginUrl);
  }

  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const loginUrl = new URL("/sanctum/login", request.url);
    loginUrl.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/sanctum/:path*",
  ],
};
