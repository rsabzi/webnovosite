import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * اتصال دیتابیس به‌صورت تنبل (lazy) برقرار می‌شود.
 * اگر DATABASE_URL تنظیم نشده باشد سایت همچنان بالا می‌آید و فرم‌ها
 * از مسیر تلگرام کار می‌کنند؛ فقط ذخیره‌سازی دیتابیس غیرفعال است.
 */

const globalForDb = globalThis as typeof globalThis & {
  __webnovoPool?: Pool;
};

export const hasDatabase = Boolean(process.env.DATABASE_URL);

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) return null;

  const pool =
    globalForDb.__webnovoPool ??
    new Pool({
      connectionString: databaseUrl,
      ssl: databaseUrl.includes("localhost") ? undefined : { rejectUnauthorized: false },
    });

  globalForDb.__webnovoPool = pool;
  return drizzle(pool);
}
