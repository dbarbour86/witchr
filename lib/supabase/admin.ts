import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

/**
 * Privileged Supabase Admin Client using SUPABASE_SECRET_KEY.
 * STRICTLY SERVER-SIDE. Never import or bundle this into client components.
 */
let adminClient: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdminClient() {
  const { url, secretKey, hasSecretKey } = getSupabaseEnv();

  if (!hasSecretKey || !url || !secretKey) {
    return null;
  }

  if (!adminClient) {
    adminClient = createClient(url, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return adminClient;
}
