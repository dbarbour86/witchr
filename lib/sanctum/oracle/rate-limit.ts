/**
 * Production-Ready Distributed Rate Limiter for Witchr Sanctum
 * 
 * Supports:
 * 1. Distributed Edge/Serverless Redis via Upstash REST API or Vercel KV REST API.
 * 2. In-memory rolling window fallback for local development.
 * 3. Configurable "fail-closed" mode for strict abuse prevention.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks in long-running processes
if (typeof setInterval !== "undefined") {
  const cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      record.timestamps = record.timestamps.filter((t) => now - t < 120_000);
      if (record.timestamps.length === 0) {
        rateLimitStore.delete(key);
      }
    }
  }, 300_000);

  if (typeof cleanupTimer.unref === "function") {
    cleanupTimer.unref();
  }
}

export interface RateLimitCheckResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
  provider: "distributed-redis" | "in-memory";
  warning?: string;
}

/**
 * Checks and records a request against in-memory rate limits (Synchronous).
 * Default: 20 requests per 60 seconds.
 */
export function checkRateLimit(
  identifier: string,
  limit = 20,
  windowMs = 60_000
): RateLimitCheckResult {
  const now = Date.now();
  let record = rateLimitStore.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(identifier, record);
  }

  // Filter timestamps within current rolling window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  const currentCount = record.timestamps.length;
  const oldestTimestamp = record.timestamps[0] || now;
  const resetSeconds = Math.max(1, Math.ceil((oldestTimestamp + windowMs - now) / 1000));

  if (currentCount >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetSeconds,
      provider: "in-memory",
    };
  }

  record.timestamps.push(now);

  return {
    allowed: true,
    limit,
    remaining: limit - currentCount - 1,
    resetSeconds,
    provider: "in-memory",
  };
}

/**
 * Lua script for atomic increment and expiration handling in Redis.
 * Executes atomically in a single Redis execution cycle.
 * - Atomically increments counter.
 * - If key is new (TTL == -1), sets expiration window.
 * - Returns {current_count, remaining_ttl} together.
 */
const REDIS_RATE_LIMIT_LUA = `
local current = redis.call('INCR', KEYS[1])
local ttl = redis.call('TTL', KEYS[1])
if ttl == -1 then
  redis.call('EXPIRE', KEYS[1], ARGV[1])
  ttl = tonumber(ARGV[1])
end
return {current, ttl}
`.trim();

/**
 * Checks distributed rate limit across all Vercel serverless instances (Asynchronous).
 * Connects to Upstash Redis REST API or Vercel KV REST API if configured.
 * Uses atomic Lua script execution to prevent race conditions on increment and TTL.
 */
export async function checkDistributedRateLimit(
  identifier: string,
  limit = 20,
  windowSeconds = 60
): Promise<RateLimitCheckResult> {
  const redisUrl =
    process.env.UPSTASH_REDIS_REST_URL?.trim() ||
    process.env.KV_REST_API_URL?.trim();

  const redisToken =
    process.env.UPSTASH_REDIS_REST_TOKEN?.trim() ||
    process.env.KV_REST_API_TOKEN?.trim();

  const isProduction = process.env.NODE_ENV === "production";
  const failClosedEnforced = process.env.RATE_LIMIT_FAIL_CLOSED === "true";

  // If Redis is not configured
  if (!redisUrl || !redisToken) {
    if (isProduction) {
      console.warn(
        "[RateLimit Security Warning] Redis credentials unconfigured in production. Distributed protection inactive."
      );
      if (failClosedEnforced) {
        return {
          allowed: false,
          limit,
          remaining: 0,
          resetSeconds: windowSeconds,
          provider: "distributed-redis",
          warning: "REDIS_UNCONFIGURED_FAIL_CLOSED",
        };
      }
    }
    const memoryRes = checkRateLimit(identifier, limit, windowSeconds * 1000);
    return memoryRes;
  }

  const cleanId = identifier.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
  const key = `witchr:ratelimit:${cleanId}`;

  try {
    // Atomic Lua script execution via Redis REST EVAL command
    const evalUrl = redisUrl.replace(/\/$/, "");
    const response = await fetch(evalUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${redisToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        "EVAL",
        REDIS_RATE_LIMIT_LUA,
        "1",
        key,
        String(windowSeconds),
      ]),
      signal: AbortSignal.timeout(3000), // Strict 3-second timeout for serverless resilience
    });

    if (!response.ok) {
      throw new Error(`Upstash Redis error status ${response.status}`);
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(`Upstash Redis Lua error: ${data.error}`);
    }

    const resArray = Array.isArray(data.result) ? data.result : [];
    const count = Number(resArray[0]) || 1;
    const ttl = Number(resArray[1]) || windowSeconds;
    const resetSeconds = ttl > 0 ? ttl : windowSeconds;

    if (count > limit) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetSeconds,
        provider: "distributed-redis",
      };
    }

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - count),
      resetSeconds,
      provider: "distributed-redis",
    };
  } catch (error) {
    console.error("[Distributed Rate Limit Exception]", error);

    // In production or when explicitly configured, fail closed to protect paid APIs from unmetered flooding
    if (isProduction || failClosedEnforced) {
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetSeconds: windowSeconds,
        provider: "distributed-redis",
        warning: "REDIS_OUTAGE_FAIL_CLOSED",
      };
    }

    // Local development fallback to in-memory store
    return checkRateLimit(identifier, limit, windowSeconds * 1000);
  }
}

/**
 * Limits total guest consultations originating from a single IP address across all sessions.
 * Allows multiple legitimate guests on shared Wi-Fi / NAT networks (e.g., up to 10 previews per hour),
 * while preventing rapid cookie rotation abuse and automated mass requests.
 */
export async function checkGuestIpRateLimit(
  ipHash: string,
  limit = 10,
  windowSeconds = 3600
): Promise<RateLimitCheckResult> {
  const cleanHash = ipHash.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 40);
  return checkDistributedRateLimit(`guest_preview_ip:${cleanHash}`, limit, windowSeconds);
}
