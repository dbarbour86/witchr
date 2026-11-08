import { createHash } from "crypto";

/**
 * Resolves the client IP address from request headers in a proxy/serverless-aware manner.
 * Vercel sets `x-real-ip` as the trusted client IP.
 * Fallbacks to the first untrusted IP in `x-forwarded-for` or loopback for local dev.
 */
export function resolveClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp && isValidIp(realIp)) {
    return realIp;
  }

  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first && isValidIp(first)) {
      return first;
    }
  }

  return "127.0.0.1";
}

function isValidIp(ip: string): boolean {
  // Bounded check for valid IPv4 or IPv6
  return (
    /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip) ||
    /^[0-9a-fA-F:]+$/.test(ip)
  );
}

/**
 * Privacy-conscious one-way cryptographic hash of a client IP address.
 * Never stores or logs raw client IP addresses.
 * Salts the hash with server-side secret (or daily epoch salt) so hashes cannot be pre-computed.
 */
export function hashClientIp(ip: string, salt?: string): string {
  const secretSalt =
    salt ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.ORACLE_RATE_LIMIT_SALT ||
    "witchr-sanctum-privacy-salt";

  return createHash("sha256")
    .update(`${secretSalt}:${ip.trim()}`)
    .digest("hex");
}

