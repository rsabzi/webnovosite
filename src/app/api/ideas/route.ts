import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { projectInquiries } from "@/db/schema";
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import {
  clampText,
  isValidEmail,
  isValidPhoneNumber,
  normalizePhoneNumber,
} from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * مسیر ارسال فرم «ایده من» (/idea)
 *
 * همان الگوی /api/leads: اعلان لحظه‌ای تلگرام + ذخیره در جدول موجود
 * `project_inquiries` با `projectType = 'idea_submission'`. ستون‌ها متنی و آزاد
 * هستند، بنابراین این مسیر نیازی به مایگریشن یا جدول جدید ندارد.
 *
 * نقش فیلدها در ذخیره‌سازی (ستون اختصاصی برای ایده وجود ندارد):
 *   - متن اصلی ایده      -> projectDescription
 *   - لینک نمونه / آی‌دی تلگرام -> currentSoftware (به‌عنوان یادداشت تکمیلی)
 *   - نام ذخیره‌شده همیشه «ایده از سایت» است تا در پنل ادمین قابل تفکیک باشد.
 */

const SUBMIT_LIMIT = 4;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;

const IDEA_MIN_LENGTH = 20;
const IDEA_MAX_LENGTH = 4000;
const LINK_MAX_LENGTH = 500;

function isValidTelegramHandle(value: string): boolean {
  const v = value.trim();
  return /^@[A-Za-z0-9_]{4,32}$/.test(v) || /^https?:\/\/t\.me\/[A-Za-z0-9_+/.-]+$/.test(v);
}

function looksLikeUrl(value: string): boolean {
  return /^https?:\/\/\S+$/.test(value.trim()) || /^t\.me\/\S+$/.test(value.trim());
}

export async function POST(req: Request) {
  const limit = checkRateLimit(requestKey(req, "ideas"), SUBMIT_LIMIT, SUBMIT_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `تعداد ارسال‌ها زیاد بود. لطفاً ${limit.retryAfterSeconds} ثانیه دیگر دوباره تلاش کنید.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const idea = clampText(body.idea, IDEA_MAX_LENGTH);
  const sampleLink = clampText(body.sampleLink, LINK_MAX_LENGTH);
  const rawPhone = typeof body.phone === "string" ? body.phone : "";
  const phone = normalizePhoneNumber(rawPhone);
  const telegramHandle = clampText(body.telegram, 100);
  const email = clampText(body.email, 200);

  if (idea.length < IDEA_MIN_LENGTH) {
    return NextResponse.json(
      {
        success: false,
        error: "ایده یا فرایند شما را کمی کامل‌تر توضیح بدهید تا بتوانیم درست بررسی‌اش کنیم.",
      },
      { status: 400 },
    );
  }

  if (sampleLink && !looksLikeUrl(sampleLink)) {
    return NextResponse.json(
      { success: false, error: "لینک نمونه باید یک آدرس معتبر باشد (مثلاً با https:// شروع شود)." },
      { status: 400 },
    );
  }

  const phoneOk = phone !== "" && isValidPhoneNumber(phone);
  const telegramOk = telegramHandle !== "" && isValidTelegramHandle(telegramHandle);
  const emailOk = email !== "" && isValidEmail(email);

  if (!phoneOk && !telegramOk && !emailOk) {
    return NextResponse.json(
      {
        success: false,
        error: "حداقل یک راه ارتباطی معتبر (شماره تماس، آیدی تلگرام یا ایمیل) لازم است تا بتوانیم جواب بررسی را بفرستیم.",
      },
      { status: 400 },
    );
  }

  if (phone && !phoneOk) {
    return NextResponse.json({ success: false, error: "شماره تماس واردشده معتبر نیست." }, { status: 400 });
  }
  if (telegramHandle && !telegramOk) {
    return NextResponse.json(
      { success: false, error: "آیدی تلگرام باید با @ شروع شود (مثلاً @yourname)." },
      { status: 400 },
    );
  }
  if (email && !emailOk) {
    return NextResponse.json({ success: false, error: "ایمیل واردشده معتبر نیست." }, { status: 400 });
  }

  const preferred = telegramOk ? "telegram" : emailOk ? "email" : "phone";
  const now = new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" });

  const contactLines = [
    phoneOk ? `📞 <b>شماره:</b> ${escapeHtml(phone)}` : "",
    telegramOk ? `💬 <b>تلگرام:</b> ${escapeHtml(telegramHandle)}` : "",
    emailOk ? `📧 <b>ایمیل:</b> ${escapeHtml(email)}` : "",
  ].filter(Boolean);

  const message = [
    "💡 <b>ایده‌ی جدید از سایت — بخش «ایده من»</b>",
    "",
    "📝 <b>ایده / فرایند:</b>",
    escapeHtml(idea),
    "",
    sampleLink ? `🔗 <b>نمونه‌ی مشابه:</b> ${escapeHtml(sampleLink)}` : "",
    contactLines.join("\n"),
    `☎️ <b>راه ارتباطی ترجیحی:</b> ${preferred === "telegram" ? "تلگرام" : preferred === "email" ? "ایمیل" : "تماس تلفنی"}`,
    "",
    `🕒 ${escapeHtml(now)}`,
  ]
    .filter(Boolean)
    .join("\n");

  const telegram = await sendTelegramMessage(message);

  let inquiryId: number | null = null;
  try {
    const db = getDb();
    if (db) {
      const notes = [
        sampleLink ? `نمونه: ${sampleLink}` : "",
        telegramOk ? `تلگرام: ${telegramHandle}` : "",
      ]
        .filter(Boolean)
        .join(" | ");

      const [inserted] = await db
        .insert(projectInquiries)
        .values({
          fullName: "ایده از سایت",
          companyName: "—",
          phoneNumber: phoneOk ? phone : "—",
          email: emailOk ? email : null,
          projectType: "idea_submission",
          currentSoftware: notes || null,
          estimatedBudget: "not_sure",
          projectDescription: idea,
          preferredContactMethod: preferred,
        })
        .returning();
      inquiryId = inserted?.id ?? null;
    }
  } catch (error) {
    console.error("[ideas] database insert failed:", error);
  }

  if (!telegram.ok && inquiryId === null) {
    console.error("[ideas] delivery failed:", telegram.error, { status: telegram.status ?? null });
    console.error("[ideas] idea payload (ذخیره‌سازی نشد — برای پیگیری دستی):", JSON.stringify({
      idea,
      sampleLink,
      phone: phoneOk ? phone : null,
      telegram: telegramOk ? telegramHandle : null,
      email: emailOk ? email : null,
      at: now,
    }));

    // مثل /api/leads عمداً 5xx برنمی‌گردانیم تا پراکسی‌ها بدنه را با صفحه‌ی
    // خطای HTML جایگزین نکنند و سمت کلاینت خطای پارس رخ ندهد.
    return NextResponse.json(
      {
        success: false,
        error: "ثبت ایده با مشکل مواجه شد. لطفاً مستقیماً از طریق تلگرام پیام بدهید.",
        detail: telegram.error ?? null,
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    success: true,
    delivered: telegram.ok,
    inquiryId,
    message:
      "ایده‌ی شما رسید. بررسی‌اش می‌کنیم و اگر قابل اجرا باشد، حداکثر تا ۲۴ ساعت کاری باهات تماس می‌گیریم.",
  });
}
