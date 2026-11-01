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

  // 1. Initialize downstream response passing incoming request headers
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Ensure all Sanctum routes carry noindex, nofollow headers to prevent search indexing
  if (pathname.startsWith("/sanctum")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  // 3. Ensure anonymous guest session cookie exists
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

  // 4. Verify Supabase session configuration
  const { url, publishableKey, isConfigured } = getSupabaseEnv();

  // Check if route requires member authentication
  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  // If Supabase is not configured yet, redirect protected routes with explanation
  if (!isConfigured || !url || !publishableKey) {
    if (isProtected) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/sanctum/login";
      loginUrl.search = `?redirect=${encodeURIComponent(pathname + search)}&reason=setup_required`;
      const redirectResponse = NextResponse.redirect(loginUrl);
      redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow");
      return redirectResponse;
    }
    return response;
  }

  // 5. Official @supabase/ssr Next.js 15 Middleware Pattern
  // Synchronizes cookies between request headers and response, keeping tokens fresh
  const supabase = createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Update request cookies so downstream server components receive fresh tokens
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        // Recreate response passing the updated request object
        response = NextResponse.next({
          request,
        });

        // Preserve noindex header
        if (pathname.startsWith("/sanctum")) {
          response.headers.set("X-Robots-Tag", "noindex, nofollow");
        }

        // Preserve guest session cookie
        if (guestCookie) {
          response.cookies.set(GUEST_SESSION_COOKIE, guestCookie, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
          });
        }

        // Set cookies on response so browser receives refreshed cookies
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // Call getUser() to refresh expired tokens and validate session
  // Running this across Sanctum routes prevents token expiration drift
  let user = null;
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    user = authUser;
  } catch {
    user = null;
  }

  // If protected route and user is not authenticated, redirect to login
  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/sanctum/login";
    loginUrl.search = `?redirect=${encodeURIComponent(pathname + search)}`;

    const redirectResponse = NextResponse.redirect(loginUrl);
    redirectResponse.headers.set("X-Robots-Tag", "noindex, nofollow");

    // Forward all cookies (including guest cookie and any updated/cleared session cookies)
    response.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c.name, c.value);
    });

    return redirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    "/sanctum/:path*",
  ],
};
