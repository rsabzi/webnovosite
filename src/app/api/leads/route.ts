import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { projectInquiries } from "@/db/schema";
import { desc } from "drizzle-orm";
import { escapeHtml, sendTelegramMessage } from "@/lib/telegram";
import { checkRateLimit, requestKey } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PROJECT_TYPE_LABELS: Record<string, string> = {
  telegram_bot: "ربات تلگرام / بله / ایتا",
  marketplace: "مارکت‌پلیس (دیجی‌کالا، ترب، باسلام)",
  accounting_crm: "یکپارچه‌سازی حسابداری و CRM (سپیدار، هلو، دیدار)",
  messengers: "ربات پیام‌رسان و پشتیبانی",
  scraping: "وب اسکرپینگ و جمع‌آوری داده",
  ai_system: "هوش مصنوعی و OCR",
  dashboard: "داشبورد مدیریتی و گزارش‌گیری",
  custom_rpa: "اتوماسیون اختصاصی و RPA",
  small_project: "🧩 پروژه کوچک و مشخص",
  idea_submission: "💡 ایده از سایت (بخش ایده من)",
};

const BUDGET_LABELS: Record<string, string> = {
  under_30m: "زیر ۳۵ میلیون تومان",
  "35_to_80m": "۳۵ تا ۸۰ میلیون تومان",
  "80_to_150m": "۸۰ تا ۱۵۰ میلیون تومان",
  enterprise: "بیش از ۱۵۰ میلیون تومان",
  not_sure: "نیازمند مشاوره برای برآورد",
};

const CONTACT_LABELS: Record<string, string> = {
  phone: "تماس تلفنی",
  telegram: "تلگرام",
  whatsapp: "واتساپ",
  email: "ایمیل",
};

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** رقم‌های فارسی/عربی را برای اعتبارسنجی و ارسال یکدست به لاتین تبدیل می‌کند. */
function normalizePhoneNumber(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/\u00a0/g, " ")
    .trim();
}

function isValidPhoneNumber(value: string): boolean {
  // فاصله، خط تیره و پرانتز برای قالب‌های رایج مجازند؛ + فقط باید اول شماره باشد.
  const compact = value.replace(/[\s()-]/g, "");
  return /^\+?\d{8,15}$/.test(compact);
}

export async function POST(req: Request) {
  // محافظ ساده در برابر ارسال انبوه/اسپم فرم
  const limit = checkRateLimit(requestKey(req, "leads"), 5, 10 * 60 * 1000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: `تعداد ارسال‌ها زیاد بود. لطفاً ${limit.retryAfterSeconds} ثانیه دیگر تلاش کنید.` },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  let body: Record<string, string> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const {
    fullName = "",
    companyName = "",
    phoneNumber: rawPhoneNumber = "",
    email = "",
    projectType = "custom_rpa",
    currentSoftware = "",
    estimatedBudget = "not_sure",
    projectDescription = "",
    preferredContactMethod = "phone",
  } = body;

  const phoneNumber = normalizePhoneNumber(rawPhoneNumber);

  if (!fullName.trim() || !phoneNumber || !projectDescription.trim()) {
    return NextResponse.json(
      { error: "لطفاً نام، شماره تماس و شرح کوتاه پروژه را تکمیل کنید." },
      { status: 400 }
    );
  }

  if (!isValidPhoneNumber(phoneNumber)) {
    return NextResponse.json({ error: "شماره تماس وارد‌شده معتبر نیست." }, { status: 400 });
  }

  const now = new Date().toLocaleString("fa-IR", { timeZone: "Asia/Tehran" });

  const message = [
    "🚀 <b>درخواست پروژه جدید از سایت نوین وب</b>",
    "",
    `👤 <b>نام:</b> ${escapeHtml(fullName)}`,
    companyName ? `🏢 <b>کسب‌وکار:</b> ${escapeHtml(companyName)}` : "",
    `📞 <b>تماس:</b> ${escapeHtml(phoneNumber)}`,
    email ? `📧 <b>ایمیل:</b> ${escapeHtml(email)}` : "",
    `🧩 <b>نوع پروژه:</b> ${escapeHtml(PROJECT_TYPE_LABELS[projectType] || projectType)}`,
    currentSoftware ? `🛠 <b>سیستم فعلی:</b> ${escapeHtml(currentSoftware)}` : "",
    `💰 <b>بودجه:</b> ${escapeHtml(BUDGET_LABELS[estimatedBudget] || estimatedBudget)}`,
    `☎️ <b>روش تماس ترجیحی:</b> ${escapeHtml(CONTACT_LABELS[preferredContactMethod] || preferredContactMethod)}`,
    "",
    "📝 <b>شرح پروژه:</b>",
    escapeHtml(projectDescription),
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
      const [inserted] = await db
        .insert(projectInquiries)
        .values({
          fullName,
          companyName: companyName || "—",
          phoneNumber,
          email: email || null,
          projectType,
          currentSoftware: currentSoftware || null,
          estimatedBudget,
          projectDescription,
          preferredContactMethod,
        })
        .returning();
      inquiryId = inserted?.id ?? null;
    }
  } catch (error) {
    console.error("[leads] database insert failed:", error);
  }

  if (!telegram.ok && inquiryId === null) {
    // علت دقیق (توضیح خودِ تلگرام) در لاگ سرور ثبت می‌شود تا در Vercel
    // قابل پیگیری باشد، و متن کامل درخواست هم ذخیره می‌شود تا مشتری از دست نرود.
    console.error("[leads] delivery failed:", telegram.error, {
      status: telegram.status ?? null,
    });
    console.error(
      "[leads] inquiry payload (ذخیره‌سازی نشد — برای پیگیری دستی):",
      JSON.stringify({
        fullName,
        companyName,
        phoneNumber,
        email,
        projectType,
        currentSoftware,
        estimatedBudget,
        preferredContactMethod,
        projectDescription,
        at: now,
      })
    );

    // عمداً وضعیت 5xx برنمی‌گردانیم: بعضی پراکسی‌ها بدنه خطاهای 5xx را با
    // یک صفحه HTML جایگزین می‌کنند و سمت کلاینت هنگام JSON.parse خطا می‌دهد.
    return NextResponse.json(
      {
        success: false,
        error:
          "ثبت درخواست با مشکل مواجه شد. لطفاً مستقیماً از طریق تلگرام یا تماس تلفنی در ارتباط باشید.",
        // فقط برای دیاگنوستیک (بدون هیچ اطلاعات حساسی): توضیح خطای تلگرام
        detail: telegram.error ?? null,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({
    success: true,
    delivered: telegram.ok,
    inquiryId,
    message:
      "درخواست شما ثبت شد و همین لحظه برای تیم نوین وب ارسال شد. حداکثر تا ۲۴ ساعت کاری پاسخ می‌دهیم.",
  });
}

/**
 * فهرست لیدها فقط برای استفاده‌ی داخلی است.
 * دسترسی با هدر `x-admin-token` و متغیر محیطی LEADS_ADMIN_TOKEN کنترل می‌شود؛
 * اگر متغیر تنظیم نشده باشد، این مسیر عمداً ۴۰۴ برمی‌گرداند تا هیچ داده‌ی
 * تماس مشتریان به‌صورت عمومی قابل خواندن نباشد.
 */
export async function GET(req: Request) {
  const expected = process.env.LEADS_ADMIN_TOKEN?.trim();
  const provided = req.headers.get("x-admin-token")?.trim();

  if (!expected || provided !== expected) {
    return NextResponse.json({ success: false, error: "not found" }, { status: 404 });
  }

  const db = getDb();
  if (!db) {
    return NextResponse.json({ success: false, error: "database not configured" }, { status: 503 });
  }
  try {
    const leads = await db
      .select()
      .from(projectInquiries)
      .orderBy(desc(projectInquiries.createdAt))
      .limit(20);
    return NextResponse.json({ success: true, count: leads.length, leads });
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}
