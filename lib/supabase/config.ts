/**
 * Supabase Configuration & Status Checker
 * 
 * Securely verifies environment variables without exposing secrets.
 * Supports newer Supabase publishable & secret keys:
 * - NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (client-safe)
 * - SUPABASE_SECRET_KEY (strictly server-side)
 * Also supports legacy NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY.
 */

export function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  // Support newer publishable key with fallback to legacy anon key
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  // Support newer secret key with fallback to legacy service role key (strictly server-side)
  const secretKey =
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  const isConfigured = Boolean(
    url &&
    publishableKey &&
    url.startsWith("https://") &&
    !url.includes("your-project-id") &&
    !publishableKey.includes("your-supabase-publishable-key") &&
    !publishableKey.includes("your-anon-key")
  );

  const hasSecretKey = Boolean(
    secretKey &&
    !secretKey.includes("your-supabase-secret-key") &&
    !secretKey.includes("your-service-role-key")
  );

  return {
    url,
    publishableKey,
    // Alias anonKey to publishableKey for backward-compatibility
    anonKey: publishableKey,
    secretKey,
    // Alias serviceRoleKey to secretKey for backward-compatibility
    serviceRoleKey: secretKey,
    isConfigured,
    hasSecretKey,
    hasServiceRole: hasSecretKey,
  };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv().isConfigured;
}
