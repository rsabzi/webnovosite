/**
 * محدودکننده‌ی نرخ ساده و بدون وابستگی (in-memory، به‌ازای هر نمونه‌ی سرور).
 *
 * هدف: جلوگیری از اسپم فرم‌ها و مصرف بی‌رویه‌ی API هوش مصنوعی.
 * توجه: در Vercel هر نمونه حافظه‌ی مستقل دارد؛ این لایه «محافظ اول» است، نه
 * یک راه‌حل توزیع‌شده. برای مقاوم‌سازی کامل می‌توان بعداً Redis اضافه کرد.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_KEYS = 5000;

function pruneIfNeeded(now: number) {
  if (buckets.size <= MAX_TRACKED_KEYS) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
  // اگر هنوز بزرگ است، قدیمی‌ترین‌ها را حذف می‌کنیم تا حافظه بی‌رویه رشد نکند.
  if (buckets.size > MAX_TRACKED_KEYS) {
    const overflow = buckets.size - MAX_TRACKED_KEYS;
    let removed = 0;
    for (const key of buckets.keys()) {
      buckets.delete(key);
      if (++removed >= overflow) break;
    }
  }
}

export type RateLimitResult = {
  allowed: boolean;
  /** ثانیه‌های باقی‌مانده تا آزاد شدن سهمیه */
  retryAfterSeconds: number;
  remaining: number;
};

export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  pruneIfNeeded(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
      remaining: 0,
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0, remaining: limit - bucket.count };
}

/** شناسه‌ی ناشناس برای کلید محدودسازی (بدون ذخیره‌ی IP خام). */
export function requestKey(req: Request, scope: string): string {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  let hash = 0;
  for (let i = 0; i < ip.length; i += 1) {
    hash = (hash * 31 + ip.charCodeAt(i)) % 2147483647;
  }
  return `${scope}:${hash}`;
}
