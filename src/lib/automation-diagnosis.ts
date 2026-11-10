/**
 * موتور تحلیل «تشخیص اتوماسیون کسب‌وکار».
 *
 * اصل طراحی:
 *  ۱) تحلیل با مدل هوش مصنوعی (Google Gemini) و خروجی JSON ساختاریافته.
 *  ۲) هر خطا (نبود کلید، تایم‌اوت، پاسخ خالی، JSON نامعتبر) → تحلیل قاعده‌محور.
 *     کاربر هیچ‌وقت صفحه‌ی خراب یا خالی نمی‌بیند؛ فقط سطح تحلیل متفاوت است.
 *  ۳) خروجی AI قبل از رسیدن به UI «کلمپ و اعتبارسنجی» می‌شود تا هیچ متن یا
 *     مقدار خارج از اسکیما به کاربر نمایش داده نشود.
 *
 * کلید API فقط سمت سرور خوانده می‌شود (GEMINI_API_KEY) و هرگز به کلاینت نمی‌رود.
 */

import {
  isValidOptionId,
  optionLabel,
  optionLabels,
} from "@/lib/automation-questions";
import { clampText, isValidEmail, isValidPhoneNumber, normalizePhoneNumber } from "@/lib/validation";

/* ------------------------------------------------------------------ */
/* انواع داده                                                          */
/* ------------------------------------------------------------------ */

export type AssessmentInput = {
  businessType: string;
  monthlyVolume: string;
  channels: string[];
  currentProcess: string;
  painTasks: string[];
  mainProblem: string;
  currentTools: string;
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
};

export type Priority = "high" | "medium" | "low";
export type Complexity = "low" | "medium" | "high";
export type AutomationFit = "high" | "medium" | "low";

export type DiagnosisOpportunity = {
  title: string;
  problem: string;
  solution: string;
  priority: Priority;
  complexity: Complexity;
};

export type Diagnosis = {
  summary: string;
  automation_fit: AutomationFit;
  opportunities: DiagnosisOpportunity[];
  recommended_next_step: string;
  honest_note: string;
};

export type DiagnosisSource = "ai" | "rules";

export type DiagnosisOutcome = {
  diagnosis: Diagnosis;
  source: DiagnosisSource;
  /** مدل هوش مصنوعی که واقعاً پاسخ داده (برای نمایش/عیب‌یابی، فقط وقتی source="ai") */
  model?: string;
  /** پیام فنی برای لاگ سرور (هرگز با محتوای حساس به کاربر نشان داده نمی‌شود) */
  reason?: string;
};

export const MAX_OPPORTUNITIES = 4;
const MAX_FIELD_LENGTH = 420;

/**
 * تلاش مجدد برای خطاهای گذرا (قطعی شبکه، 429، 5xx، پاسخ ناقص) تا تحلیل واقعی AI
 * جای خود را به مسیر قاعده‌محور ندهد. خطاهای پیکربندی (کلید نامعتبر، 400/401/403)
 * تکرار نمی‌شوند چون تلاش دوباره نتیجه‌ای ندارد.
 */
const AI_TIMEOUT_MS = 12_000;
const AI_TOTAL_BUDGET_MS = 26_000;
const AI_MAX_ATTEMPTS = 3;
const AI_RETRY_DELAY_MS = 700;
/** حداکثر مدل‌هایی که در یک فراخوانی امتحان می‌شوند (چرخش روی ظرفیت مدل‌ها). */
const AI_MAX_MODEL_ATTEMPTS = 3;
const AI_RETRYABLE_STATUS = new Set([408, 425, 429, 500, 502, 503, 504]);

/* ------------------------------------------------------------------ */
/* اعتبارسنجی ورودی                                                    */
/* ------------------------------------------------------------------ */

export type ValidationResult =
  | { ok: true; value: AssessmentInput }
  | { ok: false; error: string };

function toStringArray(value: unknown, max: number): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, max);
}

export function validateAssessmentInput(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "درخواست نامعتبر است." };
  }

  const body = raw as Record<string, unknown>;

  const businessType = clampText(body.businessType, 40);
  const monthlyVolume = clampText(body.monthlyVolume, 40);
  const currentProcess = clampText(body.currentProcess, 40);
  const channels = toStringArray(body.channels, 8);
  const painTasks = toStringArray(body.painTasks, 12);
  const mainProblem = clampText(body.mainProblem, 1000);
  const currentTools = clampText(body.currentTools, 300);
  const fullName = clampText(body.fullName, 80);
  const businessName = clampText(body.businessName, 120);
  const phone = normalizePhoneNumber(clampText(body.phone, 30));
  const email = clampText(body.email, 120);

  if (!isValidOptionId("businessType", businessType)) {
    return { ok: false, error: "لطفاً نوع کسب‌وکار را انتخاب کنید." };
  }
  if (!isValidOptionId("monthlyVolume", monthlyVolume)) {
    return { ok: false, error: "لطفاً حجم تقریبی درخواست‌ها را انتخاب کنید." };
  }
  if (channels.length === 0 || !channels.every((id) => isValidOptionId("channels", id))) {
    return { ok: false, error: "حداقل یک کانال ارتباطی مشتریان را انتخاب کنید." };
  }
  if (!isValidOptionId("currentProcess", currentProcess)) {
    return { ok: false, error: "لطفاً وضعیت فعلی مدیریت درخواست‌ها را انتخاب کنید." };
  }
  if (painTasks.length === 0 || !painTasks.every((id) => isValidOptionId("painTasks", id))) {
    return { ok: false, error: "حداقل یک کار زمان‌بر را انتخاب کنید." };
  }
  if (mainProblem.length < 20) {
    return { ok: false, error: "لطفاً فرایند اصلی را کمی کامل‌تر توضیح دهید (حداقل ۲۰ کاراکتر)." };
  }
  if (fullName.length < 3) {
    return { ok: false, error: "لطفاً نام خود را وارد کنید." };
  }
  if (businessName.length < 2) {
    return { ok: false, error: "لطفاً نام کسب‌وکار را وارد کنید." };
  }
  if (!phone || !isValidPhoneNumber(phone)) {
    return { ok: false, error: "شماره موبایل/واتساپ وارد‌شده معتبر نیست." };
  }
  if (email && !isValidEmail(email)) {
    return { ok: false, error: "ایمیل وارد‌شده معتبر نیست." };
  }

  return {
    ok: true,
    value: {
      businessType,
      monthlyVolume,
      channels,
      currentProcess,
      painTasks,
      mainProblem,
      currentTools,
      fullName,
      businessName,
      phone,
      email,
    },
  };
}

/* ------------------------------------------------------------------ */
/* ساخت متن قابل‌فهم از پاسخ‌ها (برای پرامپت و گزارش تلگرام)             */
/* ------------------------------------------------------------------ */

export function describeAnswers(input: AssessmentInput): string {
  return [
    `نوع کسب‌وکار: ${optionLabel("businessType", input.businessType)}`,
    `حجم ماهانه درخواست‌ها: ${optionLabel("monthlyVolume", input.monthlyVolume)}`,
    `کانال‌های ارتباطی: ${optionLabels("channels", input.channels).join("، ")}`,
    `وضعیت فعلی مدیریت درخواست‌ها: ${optionLabel("currentProcess", input.currentProcess)}`,
    `کارهای زمان‌بر تیم: ${optionLabels("painTasks", input.painTasks).join("، ")}`,
    `فرایند اصلی: ${input.mainProblem}`,
    input.currentTools ? `ابزارها و سیستم‌های فعلی: ${input.currentTools}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/* تحلیل قاعده‌محور (fallback و پایه‌ی مقایسه)                          */
/* ------------------------------------------------------------------ */

const VOLUME_SCORE: Record<string, number> = {
  under_50: 0,
  "50_200": 1,
  "200_1000": 2,
  over_1000: 3,
  unknown: 1,
};

const PROCESS_SCORE: Record<string, number> = {
  manual: 2,
  spreadsheet: 1.6,
  mixed: 1.2,
  crm: 0.4,
  custom_software: 0.4,
};

type OpportunityTemplate = {
  title: string;
  problem: string;
  solution: string;
  complexity: Complexity;
};

const PAIN_TEMPLATES: Record<string, OpportunityTemplate> = {
  reply: {
    title: "پاسخ‌گویی خودکار به سؤالات تکراری",
    problem: "بخش بزرگی از سؤالات مشتریان تکراری است، اما هر بار وقت یک نفر را می‌گیرد و در ساعات غیرکاری بی‌پاسخ می‌ماند.",
    solution: "دستیار پاسخ‌گو روی همان کانال‌هایی که مشتری پیام می‌دهد، به سؤالات پرتکرار و وضعیت سفارش/نوبت پاسخ می‌دهد و موارد پیچیده را به تیم شما ارجاع می‌کند.",
    complexity: "medium",
  },
  followup: {
    title: "پیگیری خودکار مشتریان و لیدها",
    problem: "پیگیری‌ها دستی و وابسته به حافظه‌ی تیم است؛ بخشی از لیدها بی‌صدا از دست می‌رود.",
    solution: "جریان پیگیری زمان‌بندی‌شده (روز ۱، ۳، ۷) با یادآور خودکار برای تیم و پیام پیگیری برای مشتری، همراه با وضعیت هر لید در یک فهرست واحد.",
    complexity: "low",
  },
  order: {
    title: "ثبت و پردازش خودکار سفارش",
    problem: "ثبت سفارش‌ها دستی انجام می‌شود؛ خطای تایپی و ناهماهنگی موجودی محتمل است.",
    solution: "اتصال کانال فروش به سیستم انبار/حسابداری: سفارش به‌صورت خودکار ثبت، موجودی کسر و وضعیت آن به مشتری اطلاع داده می‌شود.",
    complexity: "medium",
  },
  booking: {
    title: "رزرو و نوبت‌دهی خودکار",
    problem: "هماهنگی نوبت‌ها تلفنی/چتی است و بازه‌های خالی یا تداخل زمانی ایجاد می‌شود.",
    solution: "سیستم رزرو با نمایش زمان‌های آزاد، تأیید و یادآور خودکار، و همگام‌سازی با تقویم تیم.",
    complexity: "medium",
  },
  data_entry: {
    title: "حذف ورود دستی اطلاعات",
    problem: "اطلاعات بین اکسل، نرم‌افزار و چت‌ها دستی کپی می‌شود؛ زمان‌بر و مستعد خطا است.",
    solution: "یکپارچه‌سازی سیستم‌ها به‌صورت API/دیتابیسی؛ داده یک‌بار ثبت می‌شود و در همه‌ی سامانه‌ها همگام می‌ماند.",
    complexity: "medium",
  },
  invoice: {
    title: "صدور و ارسال خودکار فاکتور",
    problem: "صدور فاکتور دستی، کند و پرخطاست و گزارش‌گیری مالی را به عقب می‌اندازد.",
    solution: "تولید خودکار فاکتور پس از تأیید سفارش/پرداخت و ارسال آن به مشتری، با ثبت هم‌زمان در سیستم مالی.",
    complexity: "medium",
  },
  payment: {
    title: "تأیید خودکار پرداخت‌ها",
    problem: "تطبیق فیش‌ها و تأیید پرداخت‌ها دستی است و فعال‌سازی مشتری به تأخیر می‌افتد.",
    solution: "تأیید خودکار پرداخت از طریق درگاه/بانک و فعال‌سازی آنی سرویس مشتری، با ثبت رکورد در سیستم مالی.",
    complexity: "high",
  },
  support: {
    title: "دستیار پشتیبانی مبتنی بر دانش سازمان",
    problem: "پاسخ به سؤالات فنی و پیگیری تیکت‌ها بار سنگینی روی تیم پشتیبانی می‌گذارد.",
    solution: "دستیار هوشمند متصل به مستندات و کاتالوگ شما که پاسخ می‌دهد، تیکت می‌سازد و موارد حساس را به انسان ارجاع می‌دهد.",
    complexity: "high",
  },
  reporting: {
    title: "گزارش‌گیری خودکار مدیریتی",
    problem: "گزارش‌ها دستی از چند منبع جمع می‌شود و همیشه چند روز عقب است.",
    solution: "داشبورد/گزارش زمان‌بندی‌شده که داده را از سیستم‌های شما می‌خواند و به‌صورت روزانه یا هفتگی ارسال می‌کند.",
    complexity: "low",
  },
  other: {
    title: "اتوماسیون فرایندهای اختصاصی",
    problem: "بخشی از کارهای روزمره در قالب فرایند مکتوب تعریف نشده و وابسته به افراد است.",
    solution: "مستندسازی و خودکارسازی گام‌های تکراری همان فرایند، با تعریف نقاط کنترل انسانی.",
    complexity: "medium",
  },
};

function priorityFor(painId: string, score: number): Priority {
  const highValueTasks = ["reply", "followup", "order", "booking", "data_entry"];
  if (score >= 5 && highValueTasks.includes(painId)) return "high";
  if (score >= 3 || highValueTasks.includes(painId)) return "medium";
  return "low";
}

/** موتور قاعده‌محور: کاملاً قابل پیش‌بینی، بدون وابستگی به سرویس خارجی. */
export function ruleBasedDiagnosis(input: AssessmentInput): Diagnosis {
  const volumeScore = VOLUME_SCORE[input.monthlyVolume] ?? 1;
  const processScore = PROCESS_SCORE[input.currentProcess] ?? 1;
  const painScore = Math.min(input.painTasks.length, 4) * 0.6;
  const channelScore = input.channels.length >= 3 ? 1 : input.channels.length === 2 ? 0.5 : 0;
  const problemScore = input.mainProblem.length >= 80 ? 0.6 : 0.2;
  const score = volumeScore + processScore + painScore + channelScore + problemScore;

  const fit: AutomationFit = score >= 6 ? "high" : score >= 3.5 ? "medium" : "low";

  const orderedPains = [...input.painTasks].sort(
    (a, b) => (PAIN_TEMPLATES[b] ? 1 : 0) - (PAIN_TEMPLATES[a] ? 1 : 0),
  );

  const opportunities: DiagnosisOpportunity[] = [];
  for (const painId of orderedPains) {
    const template = PAIN_TEMPLATES[painId];
    if (!template) continue;
    if (opportunities.some((item) => item.title === template.title)) continue;
    opportunities.push({
      title: template.title,
      problem: template.problem,
      solution: template.solution,
      priority: priorityFor(painId, score),
      complexity: template.complexity,
    });
    if (opportunities.length >= MAX_OPPORTUNITIES) break;
  }

  if (opportunities.length === 0) {
    const fallbackPains = input.currentProcess === "manual" ? ["data_entry", "followup"] : ["reporting", "followup"];
    for (const painId of fallbackPains) {
      const template = PAIN_TEMPLATES[painId];
      opportunities.push({
        title: template.title,
        problem: template.problem,
        solution: template.solution,
        priority: fit === "low" ? "low" : "medium",
        complexity: template.complexity,
      });
    }
  }

  const summary = [
    `کسب‌وکار شما در حوزه‌ی «${optionLabel("businessType", input.businessType)}» با ${optionLabel("monthlyVolume", input.monthlyVolume)} فعالیت می‌کند و مشتریان عمدتاً از کانال‌های ${optionLabels("channels", input.channels).join("، ")} در ارتباط هستند.`,
    `درخواست‌ها ${optionLabel("currentProcess", input.currentProcess)} مدیریت می‌شوند و ${input.painTasks.length.toLocaleString("fa-IR")} کار زمان‌بر در فهرست شما ثبت شده است.`,
    opportunities.length > 0
      ? `بیشترین ظرفیت اتوماسیون در «${opportunities[0].title}» دیده می‌شود.`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  const recommendedNextStep =
    fit === "low"
      ? "شروع از یک گام کوچک: پیگیری مشتریان را با یک یادآور زمان‌بندی‌شده ساده کنید و پس از رسیدن به حجم بالاتر، اتوماسیون گسترده‌تری را بررسی کنید."
      : "یکی از فرصت‌های با اهمیت بالا را انتخاب کنید و یک پایلوت ۲ تا ۳ هفته‌ای اجرا کنید؛ سپس بر اساس نتیجه، گسترش سیستم را برنامه‌ریزی کنیم.";

  const honestNote =
    fit === "low"
      ? "بر اساس اطلاعات وارد‌شده، در حال حاضر اتوماسیون گسترده احتمالاً اولویت بالایی برای کسب‌وکار شما ندارد؛ با افزایش حجم درخواست‌ها، پیگیری مشتریان می‌تواند نقطه‌ی شروع مناسبی باشد."
      : fit === "medium"
        ? "بخشی از مزیت اتوماسیون شما به نظم فعلی فرایندها وابسته است؛ پیش از اجرای گسترده، بهتر است یک فرایند مشخص به‌عنوان پایلوت انتخاب شود."
        : "";

  return {
    summary,
    automation_fit: fit,
    opportunities: opportunities.slice(0, MAX_OPPORTUNITIES),
    recommended_next_step: recommendedNextStep,
    honest_note: honestNote,
  };
}

/* ------------------------------------------------------------------ */
/* فراخوانی Gemini (سمت سرور)                                          */
/* ------------------------------------------------------------------ */

const DEFAULT_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";
/**
 * مدل پیش‌فرض: گوگل دسترسی پروژه‌های جدید به سری ۲.۵ را محدود کرده است
 * (پاسخ ۴۰۴: «no longer available to new users») و برای پروژه‌های جدید
 * سری ۳.۸ را پیشنهاد می‌کند.
 */
const DEFAULT_MODEL = "gemini-3.8-flash";

/** زنجیره‌ی جایگزین: اگر مدل اول در دسترس نباشد، به‌ترتیب امتحان می‌شوند. */
const MODEL_PREFERENCE = [
  "gemini-3.8-flash",
  "gemini-3.7-flash",
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
  "gemini-3.1-flash-lite",
  "gemini-2.5-flash",
];

/** کش فهرست مدل‌های در دسترس این کلید (۱۰ دقیقه) */
const MODEL_CACHE_TTL_MS = 10 * 60 * 1000;
let modelCache: { at: number; models: string[] } | null = null;

/** اسکیمای خروجی برای Gemini (زیرمجموعه‌ی OpenAPI Schema). */
const DIAGNOSIS_RESPONSE_SCHEMA = {
  type: "OBJECT",
  properties: {
    summary: { type: "STRING" },
    automation_fit: { type: "STRING", enum: ["high", "medium", "low"] },
    opportunities: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          problem: { type: "STRING" },
          solution: { type: "STRING" },
          priority: { type: "STRING", enum: ["high", "medium", "low"] },
          complexity: { type: "STRING", enum: ["low", "medium", "high"] },
        },
        required: ["title", "problem", "solution", "priority", "complexity"],
        propertyOrdering: ["title", "problem", "solution", "priority", "complexity"],
      },
    },
    recommended_next_step: { type: "STRING" },
    honest_note: { type: "STRING" },
  },
  required: ["summary", "automation_fit", "opportunities", "recommended_next_step"],
  propertyOrdering: ["summary", "automation_fit", "opportunities", "recommended_next_step", "honest_note"],
} as const;

export function isAiConfigured(): boolean {
  return Boolean(process.env.GEMINI_API_KEY?.trim());
}

export function aiModelName(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL;
}

function buildPrompt(input: AssessmentInput): string {
  return [
    "شما تحلیل‌گر ارشد اتوماسیون کسب‌وکار در شرکت «نوین وب» هستید.",
    "بر اساس پاسخ‌های زیر، فرصت‌های واقعی اتوماسیون این کسب‌وکار را تحلیل کنید.",
    "",
    "قواعد الزامی:",
    "- تحلیل باید مخصوص همین کسب‌وکار باشد، نه متن عمومی. در «summary» حتماً نوع کسب‌وکار، حجم درخواست‌ها و کانال‌های همین کاربر را بیاورید و اگر «فرایند اصلی» را نوشته، همان را با کلمات خودش بازتاب بدهید.",
    "- هر فرصت باید مستقیماً به یکی از «کارهای زمان‌بر» یا «فرایند اصلی» همین کاربر گره بخورد و در «problem» توضیح بدهید همین کسب‌وکار با آن چه دردی دارد.",
    "- اگر ابزار یا سیستم فعلی ذکر شده، راه‌حل را با آن هماهنگ کنید (مثلاً اتصال به همان CRM/ERP/اکسل) نه راه‌حل جدا و موازی.",
    "- پاسخ‌ها را فقط بر پایه‌ی همین اطلاعات بنویس؛ هیچ فرض بیرونی یا عدد حدسی اضافه نکنید.",
    "- لحن حرفه‌ای، محترمانه و بدون اغراق باشد. از وعده‌های مالی قطعی، درصدهای ساختگی و عبارت‌های تبلیغاتی پرهیز کنید.",
    "- حداکثر ۴ فرصت بنویس و آن‌ها را از مهم‌ترین به کم‌اهمیت‌تر مرتب کنید.",
    "- هر فیلد کوتاه و روشن: عنوان حداکثر ۶ کلمه، «problem» و «solution» هر یک یک تا دو جمله.",
    "- اگر حجم درخواست‌ها کم است و فرایند فعلی پیچیدگی زیادی ندارد، صادقانه automation_fit را \"low\" بگذارید و در honest_note توضیح بدهید که اتوماسیون گسترده فعلاً اولویت بالایی ندارد و کدام گام کوچک منطقی‌تر است.",
    "- در حالت \"low\" تعداد فرصت‌ها کمتر و سبک‌تر باشد (۱ تا ۲ مورد).",
    "- recommended_next_step باید یک اقدام عملی و مشخص برای دو تا چهار هفته‌ی آینده باشد.",
    "- تمام متن‌ها فارسی روان و قابل‌فهم برای مدیر کسب‌وکار باشد (نه اصطلاح فنی خام).",
    "",
    "پاسخ‌های کسب‌وکار:",
    describeAnswers(input),
    "",
    "خروجی را فقط در قالب JSON مطابق اسکیمای تعیین‌شده برگردان.",
  ].join("\n");
}

function coerceEnum<T extends string>(value: unknown, allowed: readonly T[], fallback: T): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value) ? (value as T) : fallback;
}

function coerceText(value: unknown, fallback: string): string {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) return fallback;
  return text.slice(0, MAX_FIELD_LENGTH);
}

/**
 * خروجی مدل را به اسکیمای داخلی تبدیل می‌کند.
 * اگر ساختار پایه وجود نداشته باشد، خطا می‌دهد تا مسیر fallback فعال شود.
 */
function normalizeDiagnosis(raw: unknown): Diagnosis {
  if (!raw || typeof raw !== "object") {
    throw new Error("diagnosis payload is not an object");
  }
  const data = raw as Record<string, unknown>;

  const rawOpportunities = Array.isArray(data.opportunities) ? data.opportunities : [];
  const opportunities: DiagnosisOpportunity[] = rawOpportunities
    .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      title: coerceText(item.title, ""),
      problem: coerceText(item.problem, ""),
      solution: coerceText(item.solution, ""),
      priority: coerceEnum(item.priority, ["high", "medium", "low"] as const, "medium"),
      complexity: coerceEnum(item.complexity, ["low", "medium", "high"] as const, "medium"),
    }))
    .filter((item) => item.title.length > 0 && item.problem.length > 0)
    .slice(0, MAX_OPPORTUNITIES);

  if (opportunities.length === 0) {
    throw new Error("diagnosis contained no usable opportunities");
  }

  const summary = coerceText(data.summary, "");
  if (summary.length < 10) {
    throw new Error("diagnosis summary is missing");
  }

  return {
    summary,
    automation_fit: coerceEnum(data.automation_fit, ["high", "medium", "low"] as const, "medium"),
    opportunities,
    recommended_next_step: coerceText(data.recommended_next_step, ""),
    honest_note: coerceText(data.honest_note, ""),
  };
}

type ModelFamily = "gemini3" | "gemini25" | "legacy";

/**
 * خانواده‌ی مدل تعیین می‌کند کدام کنترل تفکر مجاز است:
 * - نسل ۳ و بالاتر: thinkingConfig.thinkingLevel با مقادیر low/medium/high
 * - نسل ۲.۵: thinkingConfig.thinkingBudget (عددی)
 * ارسال پارامتر اشتباه، خطای ۴۰۰ می‌دهد؛ پس تفکیک دقیق لازم است.
 */
function modelFamily(model: string): ModelFamily {
  if (/^gemini-3(\D|$)/.test(model) || /^gemini-([4-9]|\d{2,})(\D|$)/.test(model)) return "gemini3";
  if (/^gemini-2\.5/.test(model)) return "gemini25";
  return "legacy";
}

function thinkingConfigFor(model: string): Record<string, unknown> {
  const family = modelFamily(model);
  if (family === "gemini3") {
    const requested = (process.env.GEMINI_THINKING_LEVEL?.trim() || "low").toLowerCase();
    const allowed = ["low", "medium", "high"];
    // «minimal» در مدل‌های نسل ۳.۸ پذیرفته نمی‌شود؛ کمترین سطح مجاز low است.
    return { thinkingLevel: allowed.includes(requested) ? requested : "low" };
  }
  if (family === "gemini25") {
    // بودجه‌ی کم برای پاسخ کوتاه کافی است و هزینه/تأخیر را پایین می‌آورد.
    return { thinkingBudget: 1024 };
  }
  return {};
}

/** نسخه‌ی عددی مدل برای مرتب‌سازی (۳.۸ > ۳.۵ و …). */
function modelVersion(model: string): { major: number; minor: number; lite: number } {
  const match = model.match(/^gemini-(\d+)(?:\.(\d+))?/);
  return {
    major: match ? Number(match[1]) : 0,
    minor: match && match[2] ? Number(match[2]) : 0,
    lite: /-lite/.test(model) ? 1 : 0,
  };
}

function compareModels(a: string, b: string): number {
  const va = modelVersion(a);
  const vb = modelVersion(b);
  if (va.major !== vb.major) return vb.major - va.major;
  if (va.minor !== vb.minor) return vb.minor - va.minor;
  return va.lite - vb.lite; // نسخه‌ی کامل بر lite اولویت دارد
}

/** فهرست مدل‌های متنی فلشِ در دسترس همین کلید (با کش). */
async function discoverModels(apiKey: string, baseUrl: string): Promise<string[]> {
  if (modelCache && Date.now() - modelCache.at < MODEL_CACHE_TTL_MS) return modelCache.models;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(`${baseUrl}/models?pageSize=1000`, {
      headers: { "x-goog-api-key": apiKey },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return [];

    const payload = (await response.json()) as {
      models?: { name?: string; supportedGenerationMethods?: string[] }[];
    };

    const models = (payload.models ?? [])
      .filter((item) => (item.supportedGenerationMethods ?? []).includes("generateContent"))
      .map((item) => (item.name ?? "").replace(/^models\//, ""))
      // فقط مدل‌های متنی پایدار خانواده‌ی flash؛ صدا/تصویر/پیش‌نمایش‌ها حذف می‌شوند
      .filter((name) => /^gemini-\d+(\.\d+)?-flash(-lite)?$/.test(name))
      .sort(compareModels);

    modelCache = { at: Date.now(), models };
    return models;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

/** ترتیب نامزدهای مدل: تنظیم دستی > مدل‌های واقعاً در دسترس > فهرست اولویت. */
async function modelCandidates(apiKey: string, baseUrl: string): Promise<string[]> {
  const envModel = process.env.GEMINI_MODEL?.trim();
  const discovered = await discoverModels(apiKey, baseUrl);
  const ordered = [
    ...new Set([envModel, ...discovered, ...MODEL_PREFERENCE].filter((item): item is string => Boolean(item))),
  ];

  // مدل‌های نسل ۲.۵ برای پروژه‌های جدید بازنشسته‌اند؛ فقط به‌عنوان آخرین گزینه می‌مانند
  const isOldGen = (model: string) => /^gemini-2\./.test(model);
  const fresh = ordered.filter((model) => !isModelCooling(model) && !isOldGen(model));
  const older = ordered.filter((model) => !isModelCooling(model) && isOldGen(model));
  const cooling = ordered.filter((model) => isModelCooling(model));
  return [...fresh, ...older, ...cooling];
}

/** خطای «مدل در دسترس نیست» (۴۰۴) — باید مدل دیگری امتحان شود، نه تلاش دوباره. */
function isModelUnavailableError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Gemini HTTP 404/.test(message) && /(not found|no longer available|not available|does not exist|unsupported)/i.test(message);
}

/** خطای مربوط به قالب خروجی/پارامترها (۴۰۰) — با قالب دیگر امتحان می‌شود. */
function isResponseFormatError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /Gemini HTTP 400/.test(message) && /(schema|response_?format|responsemime|generationconfig|invalid|unknown name)/i.test(message);
}

/**
 * خطای ساخت‌یافته‌ی فراخوانی Gemini.
 * وضعیت HTTP و هدر Retry-After را نگه می‌دارد تا تصمیم‌گیری دقیق باشد
 * (مدل بازنشسته؟ ظرفیت پر؟ قالب خروجی ناسازگار؟).
 */
class GeminiRequestError extends Error {
  readonly status: number;
  readonly retryAfterSeconds: number | null;

  constructor(status: number, body: string, retryAfterSeconds: number | null = null) {
    super(`Gemini HTTP ${status} ${body.slice(0, 300)}`);
    this.name = "GeminiRequestError";
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

function statusOf(error: unknown): number | null {
  if (error instanceof GeminiRequestError) return error.status;
  const message = error instanceof Error ? error.message : String(error);
  const match = message.match(/Gemini HTTP (\d{3})/);
  return match ? Number(match[1]) : null;
}

/** خطاهایی که ارزش تلاش دوباره دارند (گذرا هستند). */
function isRetryableAiError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  if (/GEMINI_API_KEY is not configured/i.test(message)) return false;
  const status = statusOf(error);
  if (status !== null) return AI_RETRYABLE_STATUS.has(status);
  // خطای شبکه/تایم‌اوت (AbortError، fetch failed، ECONNRESET و…) گذراست
  return true;
}

/** اوج تقاضا/محدودیت نرخ: بهترین واکنش، امتحان مدل دیگری است، نه صبر کردن. */
function isCapacityError(error: unknown): boolean {
  const status = statusOf(error);
  return status === 429 || status === 503 || status === 500 || status === 502 || status === 504;
}

/* ------------------------------------------------------------------ */
/* سلامت مدل‌ها: مدلی که ظرفیتش پر است، چند لحظه کنار گذاشته می‌شود     */
/* ------------------------------------------------------------------ */

const MODEL_COOLDOWN_MS = 60_000;
const modelCooldowns = new Map<string, number>();

function markModelCooling(model: string, ms: number = MODEL_COOLDOWN_MS): void {
  modelCooldowns.set(model, Date.now() + ms);
}

function isModelCooling(model: string): boolean {
  const until = modelCooldowns.get(model);
  if (!until) return false;
  if (until <= Date.now()) {
    modelCooldowns.delete(model);
    return false;
  }
  return true;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ResponseFormatVariant = "schema" | "textSchema";

/**
 * دو قالب مستندشده برای خروجی ساختاریافته:
 * - "schema": responseMimeType + responseSchema (مستند در مرجع generateContent)
 * - "textSchema": responseFormat.text.{mimeType,schema} (مستند در راهنمای structured outputs)
 * نسل‌ها در پذیرش این دو متفاوت‌اند؛ بنابراین هر دو امتحان می‌شوند.
 */
function buildGenerationConfig(model: string, variant: ResponseFormatVariant): Record<string, unknown> {
  const generationConfig: Record<string, unknown> = {
    temperature: 0.35,
    // بودجه‌ی خروجی سخاوتمندانه تا متن فارسی + استدلال مدل در میانه‌ی راه بریده نشود
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  const thinking = thinkingConfigFor(model);
  if (Object.keys(thinking).length > 0) generationConfig.thinkingConfig = thinking;

  if (variant === "schema") {
    generationConfig.responseSchema = DIAGNOSIS_RESPONSE_SCHEMA;
  } else {
    generationConfig.responseFormat = {
      text: { mimeType: "application/json", schema: DIAGNOSIS_RESPONSE_SCHEMA },
    };
  }

  return generationConfig;
}

/** یک فراخوانی برای یک مدل و یک قالب خروجی مشخص. */
async function requestModel(
  input: AssessmentInput,
  model: string,
  variant: ResponseFormatVariant,
  apiKey: string,
  baseUrl: string,
  timeoutMs: number,
): Promise<Diagnosis> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${baseUrl}/models/${model}:generateContent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      cache: "no-store",
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: {
          parts: [
            {
              text: "شما تحلیل‌گر ارشد اتوماسیون کسب‌وکار هستید و فقط JSON معتبر مطابق اسکیما برمی‌گردانی.",
            },
          ],
        },
        contents: [{ role: "user", parts: [{ text: buildPrompt(input) }] }],
        generationConfig: buildGenerationConfig(model, variant),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      const retryAfterHeader = response.headers.get("retry-after");
      const retryAfter = retryAfterHeader ? Number(retryAfterHeader) : null;
      throw new GeminiRequestError(
        response.status,
        detail,
        retryAfter !== null && Number.isFinite(retryAfter) ? retryAfter : null,
      );
    }

    const payload = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] }; finishReason?: string }[];
      promptFeedback?: { blockReason?: string };
    };

    const text = (payload.candidates?.[0]?.content?.parts ?? [])
      .map((part) => part?.text ?? "")
      .join("")
      .trim();

    const finishReason = payload.candidates?.[0]?.finishReason;
    if (!text) {
      throw new Error(
        finishReason === "MAX_TOKENS"
          ? "Gemini hit the output token limit before returning content"
          : `Gemini returned an empty response (${payload.promptFeedback?.blockReason ?? finishReason ?? "no text"})`,
      );
    }

    return normalizeDiagnosis(JSON.parse(text));
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * فراخوانی مدل با انتخاب هوشمند مدل:
 * اگر مدل تنظیم‌شده در دسترس این کلید نباشد (۴۰۴)، فهرست مدل‌های واقعی کلید خوانده
 * می‌شود و جدیدترین مدل متنی فلشِ موجود انتخاب می‌گردد. خطاهای گذرا به لایه‌ی
 * بالاتر (تلاش مجدد) سپرده می‌شوند.
 */
async function callGemini(
  input: AssessmentInput,
  timeoutMs: number = AI_TIMEOUT_MS,
  deadline: number = Date.now() + AI_TOTAL_BUDGET_MS,
): Promise<{ diagnosis: Diagnosis; model: string }> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) throw new Error("GEMINI_API_KEY is not configured");

  const baseUrl = (process.env.GEMINI_API_BASE_URL?.trim() || DEFAULT_BASE_URL).replace(/\/$/, "");
  const candidates = await modelCandidates(apiKey, baseUrl);
  let lastError: unknown = null;
  let modelAttempts = 0;

  for (const model of candidates) {
    // بودجه‌ی زمانی و سقف تعداد مدل‌های واقعاً امتحان‌شده (برای جا شدن در سقف زمان تابع)
    if (Date.now() + 3000 >= deadline) break;
    if (modelAttempts >= AI_MAX_MODEL_ATTEMPTS) break;

    const variants: ResponseFormatVariant[] = ["schema", "textSchema"];

    for (const variant of variants) {
      try {
        const diagnosis = await requestModel(input, model, variant, apiKey, baseUrl, timeoutMs);
        console.info(`[automation-check] AI analysis via ${model} (format: ${variant})`);
        return { diagnosis, model };
      } catch (error) {
        lastError = error;

        if (isModelUnavailableError(error)) {
          // مدل بازنشسته/ناموجود: رد کردنش هزینه‌ی سهمیه ندارد و فهرست مدل‌ها به‌روز می‌شود
          console.error(`[automation-check] model ${model} unavailable, trying next candidate`);
          modelCache = null;
          break; // مدل بعدی
        }

        // از این نقطه به بعد، مدل واقعاً امتحان‌شده حساب می‌شود
        modelAttempts += 1;

        if (isResponseFormatError(error) && variant === "schema") {
          console.error(`[automation-check] model ${model} rejected responseSchema, retrying with responseFormat`);
          continue; // قالب دیگر با همان مدل
        }

        if (isCapacityError(error)) {
          // اوج تقاضا/محدودیت نرخ: این مدل را کنار بگذارید و مدل دیگری را امتحان کنید
          markModelCooling(model);
          console.error(
            `[automation-check] model ${model} is at capacity (${statusOf(error)}), rotating to another model`,
          );
          break; // مدل بعدی
        }

        throw error; // خطای گذرا/نامشخص → تلاش مجدد در لایه‌ی بالاتر
      }
    }
  }

  throw lastError ?? new Error("no usable Gemini model was available");
}

/* ------------------------------------------------------------------ */
/* نقطه‌ی ورود اصلی                                                     */
/* ------------------------------------------------------------------ */

export async function runAutomationDiagnosis(input: AssessmentInput): Promise<DiagnosisOutcome> {
  if (!isAiConfigured()) {
    return {
      diagnosis: ruleBasedDiagnosis(input),
      source: "rules",
      reason: "GEMINI_API_KEY is not configured",
    };
  }

  let lastError: unknown = null;
  const startedAt = Date.now();
  const deadline = startedAt + AI_TOTAL_BUDGET_MS;

  for (let attempt = 1; attempt <= AI_MAX_ATTEMPTS; attempt += 1) {
    const remaining = deadline - Date.now();
    if (remaining < 3000) {
      console.error("[automation-check] AI time budget exhausted before attempt", attempt);
      break;
    }

    try {
      const result = await callGemini(input, Math.min(AI_TIMEOUT_MS, remaining), deadline);
      if (attempt > 1) {
        console.info(`[automation-check] AI analysis succeeded on attempt ${attempt}/${AI_MAX_ATTEMPTS}`);
      }
      return { diagnosis: result.diagnosis, source: "ai", model: result.model };
    } catch (error) {
      lastError = error;
      const reason = error instanceof Error ? error.message : String(error);
      const canRetry = attempt < AI_MAX_ATTEMPTS && isRetryableAiError(error);
      console.error(
        `[automation-check] AI attempt ${attempt}/${AI_MAX_ATTEMPTS} failed${canRetry ? ", retrying" : ""}: ${reason}`,
      );
      if (!canRetry) break;

      // اگر گوگل Retry-After داده، همان را رعایت کنید (سقف ۳ ثانیه)؛ وگرنه عقب‌نشینی نمایی با jitter
      const retryAfterMs =
        lastError instanceof GeminiRequestError && lastError.retryAfterSeconds
          ? Math.min(lastError.retryAfterSeconds * 1000, 3000)
          : AI_RETRY_DELAY_MS * attempt + Math.floor(Math.random() * 250);
      await wait(retryAfterMs);
    }
  }

  const reason = lastError instanceof Error ? lastError.message : String(lastError);
  console.error("[automation-check] AI analysis failed, falling back to rules:", reason);
  return { diagnosis: ruleBasedDiagnosis(input), source: "rules", reason };
}

/**
 * بررسی سریع سلامت پیکربندی AI برای عیب‌یابی روی سرور (بدون افشای کلید).
 * فقط برای فراخوانی از مسیر مدیریتی/دیباگ استفاده می‌شود.
 */
/**
 * بازرسی (مشورتی) شکل کلید، بدون افشای هیچ بخشی از مقدار آن.
 *
 * ⚠️ این بررسی هرگز جلوی فراخوانی گوگل را نمی‌گیرد؛ چون اعتبار واقعی کلید فقط با
 * پاسخ خود گوگل مشخص می‌شود و ممکن است کلیدهای جدید الگوی نام‌گذاری متفاوتی داشته باشند.
 * فقط برای پیام راهنما استفاده می‌شود.
 */
export function inspectApiKeyFormat(): { present: boolean; looksValid: boolean; issue: string | null } {
  const raw = process.env.GEMINI_API_KEY;
  if (!raw || !raw.trim()) return { present: false, looksValid: false, issue: null };

  const key = raw.trim();
  if (raw !== key) {
    return {
      present: true,
      looksValid: false,
      issue: "مقدار ذخیره‌شده فاصله یا خط جدید اضافه دارد (احتمالاً هنگام کپی)؛ آن را دوباره و بدون فاصله وارد کنید.",
    };
  }
  if (/^["'`]|["'`]$/.test(key)) {
    return { present: true, looksValid: false, issue: "کلید داخل کوتیشن قرار گرفته است؛ فقط خود کلید را وارد کنید." };
  }
  if (/\s/.test(key)) {
    return { present: true, looksValid: false, issue: "کلید حاوی فاصله یا خط جدید است؛ باید یک رشته‌ی پیوسته باشد." };
  }
  if (key.length < 20) {
    return { present: true, looksValid: false, issue: "مقدار کلید بسیار کوتاه است؛ به‌نظر نمی‌رسد کلید کامل کپی شده باشد." };
  }
  return { present: true, looksValid: true, issue: null };
}

/** وضعیت محیط اجرا برای عیب‌یابی (روی Vercel مقداردهی می‌شود). */
export function runtimeInfo(): { environment: string; branch: string | null; commit: string | null } {
  const sha = process.env.VERCEL_GIT_COMMIT_SHA?.trim();
  return {
    environment: process.env.VERCEL_ENV?.trim() || "local",
    branch: process.env.VERCEL_GIT_COMMIT_REF?.trim() || null,
    commit: sha ? sha.slice(0, 7) : null,
  };
}

/** راهنمای دقیق بر اساس وضعیت واقعی سرور (تولید/پیش‌نمایش/لوکال). */
export function probeHint(status: { ok: boolean; keyPresent: boolean; keyLooksValid: boolean; env: string }): string {
  const where =
    status.env === "production"
      ? "Production"
      : status.env === "preview"
        ? "Preview"
        : "لوکال (.env.local)";

  if (status.ok) return "پیکربندی هوش مصنوعی سالم است؛ تحلیل‌ها با مدل انجام می‌شود.";
  if (!status.keyPresent) {
    return `GEMINI_API_KEY برای محیط ${where} تنظیم نشده است. در Vercel → Settings → Environment Variables مقدار کلید را برای همین محیط فعال کنید و سپس Redeploy بزنید (متغیرهای محیطی فقط روی دیپلوی‌های جدید اثر می‌گذارند).`;
  }
  if (!status.keyLooksValid) {
    return "کلید تنظیم شده است اما شکل آن درست نیست؛ مقدار را از Google AI Studio دوباره کپی کنید (بدون کوتیشن/فاصله) و Redeploy بزنید.";
  }
  return "کلید تنظیم شده و شکل آن درست است، اما تماس با Google برقرار نشد. متن error را ببینید و لاگ‌های Vercel (Functions) را بررسی کنید.";
}

export async function probeAiConfiguration(): Promise<{
  ok: boolean;
  model: string;
  error: string | null;
  keyPresent: boolean;
  keyLooksValid: boolean;
  /** یادداشت مشورتی درباره‌ی شکل مقدار (هرگز مانع فراخوانی نمی‌شود) */
  keyNote: string | null;
  availableModels: string[];
}> {
  const keyFormat = inspectApiKeyFormat();
  const fallbackModel = aiModelName();

  if (!keyFormat.present) {
    return {
      ok: false,
      model: fallbackModel,
      error: "GEMINI_API_KEY تنظیم نشده است.",
      keyPresent: false,
      keyLooksValid: false,
      keyNote: null,
      availableModels: [],
    };
  }
  const apiKey = process.env.GEMINI_API_KEY!.trim();
  const baseUrl = (process.env.GEMINI_API_BASE_URL?.trim() || DEFAULT_BASE_URL).replace(/\/$/, "");
  const candidates = await modelCandidates(apiKey, baseUrl);
  let available = await discoverModels(apiKey, baseUrl);

  let lastError: string | null = null;
  const tried: string[] = [];

  for (const model of candidates.slice(0, 4)) {
    tried.push(model);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch(`${baseUrl}/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "پاسخ فقط: ok" }] }],
          generationConfig: {
            maxOutputTokens: 256,
            temperature: 0,
            // کنترل تفکر باید مطابق نسل مدل و در کلید thinkingConfig باشد؛ وگرنه ۴۰۰ می‌گیریم
            ...(Object.keys(thinkingConfigFor(model)).length > 0
              ? { thinkingConfig: thinkingConfigFor(model) }
              : {}),
          },
        }),
      });

      if (!response.ok) {
        const detail = await response.text().catch(() => "");
        lastError = `HTTP ${response.status}: ${detail.slice(0, 200)}`;
        if (response.status === 404) {
          // مدل بازنشسته: کش را باطل کنید تا فهرست واقعی مدل‌ها دوباره خوانده شود
          modelCache = null;
          available = await discoverModels(apiKey, baseUrl);
        }
        continue;
      }

      const payload = (await response.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
      const reply = (payload.candidates?.[0]?.content?.parts ?? []).map((part) => part?.text ?? "").join("").trim();

      return {
        ok: Boolean(reply),
        model,
        error: reply ? null : "پاسخ خالی از مدل دریافت شد.",
        keyPresent: true,
        keyLooksValid: keyFormat.looksValid,
        keyNote: keyFormat.issue,
        availableModels: available,
      };
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
      continue;
    } finally {
      clearTimeout(timeout);
    }
  }

  return {
    ok: false,
    model: tried[0] ?? fallbackModel,
    error:
      lastError ??
      (available.length > 0
        ? "مدل‌های در دسترس پیدا شدند اما هیچ‌کدام پاسخ ندادند."
        : "هیچ مدل متنی فلشی برای این کلید در دسترس نیست."),
    keyPresent: true,
    keyLooksValid: keyFormat.looksValid,
    keyNote: keyFormat.issue,
    availableModels: available,
  };
}
