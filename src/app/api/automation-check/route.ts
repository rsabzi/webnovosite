import { NextResponse } from "next/server";
import {
  describeAnswers,
  inspectApiKeyFormat,
  isAiConfigured,
  probeAiConfiguration,
  probeHint,
  runtimeInfo,
  runAutomationDiagnosis,
  validateAssessmentInput,
  type DiagnosisOutcome,
} from "@/lib/automation-diagnosis";
import { optionLabel } from "@/lib/automation-questions";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";
// تحلیل AI + تلاش مجدد ممکن است تا ~۲۶ ثانیه طول بکشد؛ سقف زمان تابع باید بالاتر از آن باشد.
export const maxDuration = 30;
export const dynamic = "force-dynamic";

const SUBMIT_LIMIT = 4;
const SUBMIT_WINDOW_MS = 10 * 60 * 1000;
const PROBE_LIMIT = 3;
const PROBE_WINDOW_MS = 60 * 1000;

function fitLabel(fit: string): string {
  if (fit === "high") return "بالا — اتوماسیون سریع قابل توجیه است";
  if (fit === "medium") return "متوسط — شروع با یک پایلوت منطقی است";
  return "پایین — فعلاً اولویت اصلی نیست";
}

function buildTelegramMessage(
  value: Parameters<typeof describeAnswers>[0],
  outcome: DiagnosisOutcome,
): string {
  const { diagnosis, source, reason } = outcome;
  const sourceLine =
    source === "ai"
      ? "🤖 <b>تحلیل:</b> مدل هوش مصنوعی"
      : `🧮 <b>تحلیل:</b> قاعده‌محور${reason ? ` (${escapeHtml(reason.slice(0, 120))})` : ""}`;

  const opportunities = diagnosis.opportunities
    .map((item, index) => {
      const priority = item.priority === "high" ? "🔴 بالا" : item.priority === "medium" ? "🟠 متوسط" : "🟢 پایین";
      return [
        `${index + 1}. <b>${escapeHtml(item.title)}</b> — اهمیت: ${priority} · پیچیدگی: ${escapeHtml(item.complexity)}`,
        `   ${escapeHtml(item.solution)}`,
      ].join("\n");
    })
    .join("\n");

  return [
    "🧠 <b>لید جدید — تشخیص رایگان اتوماسیون</b>",
    "",
    `👤 <b>نام:</b> ${escapeHtml(value.fullName)}`,
    `🏢 <b>کسب‌وکار:</b> ${escapeHtml(value.businessName)}`,
    `📞 <b>تماس:</b> ${escapeHtml(value.phone)}`,
    value.email ? `📧 <b>ایمیل:</b> ${escapeHtml(value.email)}` : "",
    "",
    "📋 <b>پاسخ‌های ارزیابی:</b>",
    escapeHtml(describeAnswers(value)),
    "",
    "📊 <b>نتیجه تحلیل:</b>",
    sourceLine,
    `⚙️ <b>آمادگی اتوماسیون:</b> ${escapeHtml(fitLabel(diagnosis.automation_fit))}`,
    "",
    `<b>خلاصه:</b> ${escapeHtml(diagnosis.summary)}`,
    "",
    "<b>فرصت‌های پیشنهادی:</b>",
    opportunities,
    "",
    `<b>گام بعدی پیشنهادی:</b> ${escapeHtml(diagnosis.recommended_next_step)}`,
    diagnosis.honest_note ? `\n<b>یادداشت صادقانه:</b> ${escapeHtml(diagnosis.honest_note)}` : "",
    "",
    `🕒 ${escapeHtml(new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" }))}`,
  ]
    .filter((line) => line !== "")
    .join("\n");
}

export async function POST(req: Request) {
  const limit = checkRateLimit(requestKey(req, "automation-check"), SUBMIT_LIMIT, SUBMIT_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `تعداد ارسال‌ها زیاد بود. لطفاً ${limit.retryAfterSeconds} ثانیه دیگر دوباره تلاش کنید.`,
      },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const validated = validateAssessmentInput(body);
  if (!validated.ok) {
    return NextResponse.json({ success: false, error: validated.error }, { status: 400 });
  }

  const outcome = await runAutomationDiagnosis(validated.value);

  // اعلان تلگرام: مسیر اصلی تحویل لید در این پروژه است.
  const telegram = await sendTelegramMessage(buildTelegramMessage(validated.value, outcome));
  if (!telegram.ok) {
    // اگر تلگرام در دسترس نبود، متن کامل در لاگ سرور می‌ماند تا لید از دست نرود
    // (کاربر همچنان نتیجه‌ی تحلیل خود را می‌بیند).
    console.error("[automation-check] telegram delivery failed:", telegram.error);
    console.error(
      "[automation-check] payload:",
      JSON.stringify({ ...validated.value, diagnosis: outcome.diagnosis }),
    );
  }

  return NextResponse.json({
    success: true,
    delivered: telegram.ok,
    source: outcome.source,
    // نام مدل واقعی برای نمایش شفاف در صفحه‌ی نتیجه (هیچ کلید/سری برنمی‌گردد)
    model: outcome.source === "ai" ? (outcome.model ?? null) : null,
    diagnosis: outcome.diagnosis,
    message:
      "نتیجه‌ی بررسی شما آماده است. اگر بخواهید، تیم نوین وب می‌تواند همین تحلیل را به‌صورت دقیق‌تر و اجرایی بررسی کند.",
  });
}

/**
 * عیب‌یابی پیکربندی AI (فقط یک بررسی کوچک و بدون افشای کلید):
 *   GET /api/automation-check?probe=1
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  if (url.searchParams.get("probe") !== "1") {
    return NextResponse.json({
      ok: true,
      aiConfigured: isAiConfigured(),
      environment: runtimeInfo().environment,
      hint: "برای بررسی سلامت پیکربندی هوش مصنوعی، آدرس را با ?probe=1 باز کنید.",
    });
  }

  const limit = checkRateLimit(requestKey(req, "automation-check-probe"), PROBE_LIMIT, PROBE_WINDOW_MS);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: `تعداد بررسی‌ها زیاد بود. ${limit.retryAfterSeconds} ثانیه دیگر تلاش کنید.` },
      { status: 429 },
    );
  }

  const probe = await probeAiConfiguration();
  const runtime = runtimeInfo();
  const keyFormat = inspectApiKeyFormat();

  return NextResponse.json(
    {
      ok: probe.ok,
      provider: "google-gemini",
      model: probe.model,
      availableModels: probe.availableModels,
      error: probe.error,
      // عیب‌یابی محیط اجرا: کدام محیط (production/preview) و کدام کامیت در حال سرویس‌دهی است
      environment: runtime.environment,
      branch: runtime.branch,
      commit: runtime.commit,
      keyPresent: keyFormat.present,
      keyLooksValid: probe.keyLooksValid,
      keyNote: probe.keyNote,
      hint: [probeHint({
        ok: probe.ok,
        keyPresent: keyFormat.present,
        keyLooksValid: probe.keyLooksValid,
        env: runtime.environment,
      }), probe.keyNote]
        .filter(Boolean)
        .join(" "),
    },
    { status: probe.ok ? 200 : 502 },
  );
}
