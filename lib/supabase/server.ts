import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseEnv } from "./config";

/**
 * Server-side Supabase client for Server Components, Actions, and Route Handlers.
 * Properly awaits cookies in Next.js 15.
 */
export async function getSupabaseServerClient() {
  const { url, publishableKey, isConfigured } = getSupabaseEnv();

  if (!isConfigured || !url || !publishableKey) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // If called from a Server Component where setting cookies is restricted, ignore.
        }
      },
    },
  });
}

/**
 * Convenience helper to get the currently authenticated user on the server.
 */
export async function getCurrentUser() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}
