import { getDb } from "@/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const telegramConfigured = Boolean(
    process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID
  );

  const db = getDb();
  let database: "ok" | "error" | "not_configured" = "not_configured";
  if (db) {
    try {
      await db.execute(sql`select 1`);
      database = "ok";
    } catch {
      database = "error";
    }
  }

  return Response.json({ ok: true, database, telegram: telegramConfigured ? "configured" : "not_configured" });
}
