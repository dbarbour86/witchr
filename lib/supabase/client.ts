import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "./config";

/**
 * Client-side Supabase instance.
 * Safe to call in browser components using NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 * Returns null if environment variables are not yet configured.
 */
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseBrowserClient() {
  const { url, publishableKey, isConfigured } = getSupabaseEnv();

  if (!isConfigured || !url || !publishableKey) {
    return null;
  }

  if (!browserClient) {
    browserClient = createBrowserClient(url, publishableKey);
  }

  return browserClient;
}
