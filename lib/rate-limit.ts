/** Simple in-memory sliding window limiter for server actions and route handlers. Replace with Redis in multi-instance deployments. */
const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number } {
  const now = Date.now();
  const arr = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (arr.length >= limit) {
    buckets.set(key, arr);
    return { ok: false, remaining: 0 };
  }
  arr.push(now);
  buckets.set(key, arr);
  return { ok: true, remaining: limit - arr.length };
}
