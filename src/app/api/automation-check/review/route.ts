import { NextResponse } from "next/server";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { clampText, isValidPhoneNumber, normalizePhoneNumber } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REVIEW_LIMIT = 3;
const REVIEW_WINDOW_MS = 10 * 60 * 1000;

/**
 * ثبت «درخواست بررسی دقیق‌تر» پس از مشاهده‌ی نتیجه‌ی تحلیل.
 * اطلاعات تماس همان اطلاعات گام آخر ابزار تشخیص است.
 */
export async function POST(req: Request) {
  const limit = checkRateLimit(requestKey(req, "automation-check-review"), REVIEW_LIMIT, REVIEW_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: `تعداد درخواست‌ها زیاد بود. ${limit.retryAfterSeconds} ثانیه دیگر تلاش کنید.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const fullName = clampText(body.fullName, 80);
  const businessName = clampText(body.businessName, 120);
  const phone = normalizePhoneNumber(clampText(body.phone, 30));
  const email = clampText(body.email, 120);
  const summary = clampText(body.summary, 600);
  const topOpportunity = clampText(body.topOpportunity, 160);
  const fit = clampText(body.fit, 12);

  if (fullName.length < 3 || businessName.length < 2) {
    return NextResponse.json({ success: false, error: "اطلاعات تماس کامل نیست." }, { status: 400 });
  }
  if (!isValidPhoneNumber(phone)) {
    return NextResponse.json({ success: false, error: "شماره تماس معتبر نیست." }, { status: 400 });
  }

  const fitLabel =
    fit === "high" ? "بالا" : fit === "medium" ? "متوسط" : fit === "low" ? "پایین" : "نامشخص";

  const result = await sendTelegramMessage(
    [
      "📣 <b>درخواست بررسی دقیق — از ابزار تشخیص اتوماسیون</b>",
      "",
      `👤 <b>نام:</b> ${escapeHtml(fullName)}`,
      `🏢 <b>کسب‌وکار:</b> ${escapeHtml(businessName)}`,
      `📞 <b>تماس:</b> ${escapeHtml(phone)}`,
      email ? `📧 <b>ایمیل:</b> ${escapeHtml(email)}` : "",
      "",
      `⚙️ <b>آمادگی اتوماسیون:</b> ${escapeHtml(fitLabel)}`,
      topOpportunity ? `🎯 <b>نقطه‌ی شروع پیشنهادی:</b> ${escapeHtml(topOpportunity)}` : "",
      summary ? `\n<b>خلاصه‌ی تحلیل:</b> ${escapeHtml(summary)}` : "",
      "",
      "⏱ این کاربر درخواست بررسی توسط تیم نوین وب را ثبت کرده است.",
      `🕒 ${escapeHtml(new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }))}`,
    ]
      .filter((line) => line !== "")
      .join("\n"),
  );

  if (!result.ok) {
    console.error("[automation-check/review] telegram delivery failed:", result.error);
    console.error(
      "[automation-check/review] payload (برای پیگیری دستی):",
      JSON.stringify({ fullName, businessName, phone, email, topOpportunity, fit }),
    );
  }

  return NextResponse.json({
    success: true,
    delivered: result.ok,
    message: "درخواست بررسی شما ثبت شد. حداکثر تا ۲۴ ساعت کاری پاسخ می‌دهیم.",
  });
}
