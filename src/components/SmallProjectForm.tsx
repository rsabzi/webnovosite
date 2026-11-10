"use client";

import { useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  ArrowRight,
  ClipboardList,
  Clock3,
  Wallet,
  User,
  MessageSquare,
  PackageCheck,
} from "lucide-react";

/**
 * فرم «پروژه کوچک» — مسیر کوتاه برای کارهای مشخص و محدود.
 * سه گام: ۱) تعریف کار ۲) زمان و تماس ۳) بازبینی و تأیید ارسال.
 * از همان زیرساخت `/api/leads` استفاده می‌کند؛ قیمت و زمان قطعی پیش از
 * بررسی اعلام نمی‌شود.
 */

type Locale = "fa" | "en";

const TASK_TYPES: { id: string; fa: string; en: string }[] = [
  { id: "script", fa: "اسکریپت یا ابزار کوچک (پایتون، اکسل، گزارش خودکار)", en: "Small script or tool (Python, Excel, automated report)" },
  { id: "api_integration", fa: "اتصال دو سرویس از طریق API", en: "Connecting two services via API" },
  { id: "simple_bot", fa: "ربات ساده تلگرام / بله / ایتا", en: "Simple Telegram / Bale / Eitaa bot" },
  { id: "small_feature", fa: "افزودن یک قابلیت محدود به سیستم موجود", en: "Adding one limited feature to an existing system" },
  { id: "data_extract", fa: "استخراج و تبدیل داده", en: "Data extraction and conversion" },
  { id: "mvp", fa: "نمونه اولیه یا MVP محدود", en: "Small prototype or MVP" },
  { id: "process_automation", fa: "خودکارسازی یک فرایند تکراری", en: "Automating one repetitive process" },
  { id: "other", fa: "کار مشخص دیگر", en: "Another well-defined task" },
];

const TIMELINES: { id: string; fa: string; en: string }[] = [
  { id: "within_2w", fa: "طی ۲ هفته‌ی آینده", en: "Within the next 2 weeks" },
  { id: "within_1m", fa: "طی یک ماه آینده", en: "Within a month" },
  { id: "within_3m", fa: "طی ۱ تا ۳ ماه آینده", en: "In 1–3 months" },
  { id: "flexible", fa: "عجله‌ای ندارم", en: "No rush" },
];

/** بازه‌های بودجه — هم‌نام با گزینه‌های `/api/leads` تا گزارش‌ها یکدست بمانند */
const BUDGET_OPTIONS: { id: string; fa: string; en: string }[] = [
  { id: "under_30m", fa: "زیر ۳۵ میلیون تومان", en: "Under 35M Toman" },
  { id: "35_to_80m", fa: "۳۵ تا ۸۰ میلیون تومان", en: "35–80M Toman" },
  { id: "80_to_150m", fa: "۸۰ تا ۱۵۰ میلیون تومان", en: "80–150M Toman" },
  { id: "enterprise", fa: "بیش از ۱۵۰ میلیون تومان", en: "Above 150M Toman" },
  { id: "not_sure", fa: "هنوز نمی‌دانم", en: "Not sure yet" },
];

const CONTENT = {
  fa: {
    steps: ["تعریف کار", "زمان و تماس", "بازبینی و ارسال"],
    stepLabel: "گام",
    taskType: "نوع کار",
    need: "توضیح کوتاه درباره‌ی نیاز",
    needHint: "الان چطور انجامش می‌دهید و چه چیزی آزارتان می‌دهد؟",
    needPlaceholder: "مثال: هر شب گزارش فروش را از اکسل برمی‌دارم و دستی در تلگرام می‌فرستم…",
    output: "خروجی مورد انتظار",
    outputHint: "در پایان چه چیزی باید تحویل بگیرید؟",
    outputPlaceholder: "مثال: رباتی که هر شب ساعت ۲۱ گزارش را در کانال تلگرام بفرستد",
    timeline: "کِی به نتیجه نیاز دارید؟",
    timelineHint: "کمک‌کننده‌ی اولویت‌بندی است؛ تعهد زمان تحویل نیست.",
    budget: "بودجه‌ی پیشنهادی (اختیاری)",
    budgetHint: "اگر نمی‌دانید، خالی بگذارید؛ بعد از بررسی محدوده، برآورد شفاف می‌دهیم.",
    budgetEmpty: "ترجیح می‌دهم بعد از برآورد تصمیم بگیرم",
    contactTitle: "راه تماس",
    fullName: "نام و نام‌خانوادگی",
    phone: "شماره تماس",
    telegram: "آیدی تلگرام (اختیاری)",
    contactMethod: "روش ترجیحی ارتباط:",
    phoneOption: "تماس تلفنی",
    telegramOption: "تلگرام",
    next: "ادامه",
    back: "بازگشت",
    summaryTitle: "خلاصه‌ی درخواست شما",
    summaryTask: "نوع کار",
    summaryNeed: "شرح نیاز",
    summaryOutput: "خروجی مورد انتظار",
    summaryTimeline: "زمان موردنیاز",
    summaryBudget: "بودجه",
    summaryContact: "راه تماس",
    notSet: "تعیین نشده",
    scopeTitle: "پیش از ارسال، این‌ها را بدانید",
    scopeItems: [
      "امکان‌پذیری پروژه پس از بررسی تأیید می‌شود، نه پیش از آن.",
      "محدوده‌ی تحویل پیش از شروع کار مکتوب و تأیید می‌شود.",
      "تغییرات خارج از محدوده ممکن است نیازمند برآورد جدید باشند.",
      "تحویل سورس، استقرار، پشتیبانی و هزینه‌ی زیرساخت طبق توافق همان پروژه مشخص می‌شود.",
    ],
    acknowledge: "می‌دانم که محدوده‌ی کار، امکان‌پذیری و قیمت نهایی پس از بررسی درخواست مشخص می‌شود.",
    submit: "ارسال درخواست پروژه کوچک",
    submitting: "در حال ارسال…",
    errTask: "یکی از انواع کار را انتخاب کنید.",
    errNeed: "توضیح نیاز را کمی کامل‌تر بنویسید (حداقل ۱۵ حرف).",
    errOutput: "خروجی مورد انتظار را کوتاه بنویسید.",
    errContact: "نام و شماره تماس لازم است تا بتوانیم جواب بررسی را بفرستیم.",
    errAcknowledge: "لطفاً تأیید پاراگراف بالا را بزنید.",
    errGeneric: "خطایی در اتصال به سرور رخ داد. مستقیماً در تلگرام پیام بدهید.",
    successTitle: "درخواست شما ثبت شد",
    successBody:
      "درخواست شما برای تیم نوین وب ارسال شد. محدوده‌ی کار، امکان‌پذیری و قیمت نهایی پس از بررسی مشخص می‌شود؛ تا پیش از آن قیمت یا زمان قطعی اعلام نمی‌کنیم.",
    successFollow:
      "نیازمندی‌ها را بررسی می‌کنیم و حداکثر تا ۲۴ ساعت کاری با شما تماس می‌گیریم. اگر کار شما برای همکاری مناسب نباشد (مثلاً راه ارزان‌تر و آماده‌ای داشته باشد)، همان را صادقانه می‌گوییم.",
    successAgain: "ثبت درخواست دیگر",
    telegramCta: "گفت‌وگوی سریع‌تر در تلگرام",
  },
  en: {
    steps: ["Define the task", "Timeline & contact", "Review & send"],
    stepLabel: "Step",
    taskType: "Type of work",
    need: "Short description of the need",
    needHint: "How do you do it today, and what makes it painful?",
    needPlaceholder: "e.g. Every night I copy the sales report from Excel and post it to Telegram by hand…",
    output: "Expected output",
    outputHint: "What should be delivered in the end?",
    outputPlaceholder: "e.g. A bot that posts the report to our Telegram channel at 9 PM",
    timeline: "When do you need the result?",
    timelineHint: "Helps us prioritise; it is not a delivery commitment.",
    budget: "Suggested budget (optional)",
    budgetHint: "Skip it if unsure; we quote clearly after scoping.",
    budgetEmpty: "I'll decide after the estimate",
    contactTitle: "How to reach you",
    fullName: "Full name",
    phone: "Phone number",
    telegram: "Telegram ID (optional)",
    contactMethod: "Preferred contact:",
    phoneOption: "Phone call",
    telegramOption: "Telegram",
    next: "Continue",
    back: "Back",
    summaryTitle: "Your request summary",
    summaryTask: "Type of work",
    summaryNeed: "Need",
    summaryOutput: "Expected output",
    summaryTimeline: "Timeline",
    summaryBudget: "Budget",
    summaryContact: "Contact",
    notSet: "Not set",
    scopeTitle: "Before you send, please note",
    scopeItems: [
      "Feasibility is confirmed after review, not before.",
      "The delivery scope is written down and approved before work starts.",
      "Changes outside the scope may need a new estimate.",
      "Source handover, deployment, support and infrastructure costs follow the agreement for each project.",
    ],
    acknowledge: "I understand that scope, feasibility and the final price are confirmed after the request is reviewed.",
    submit: "Send small-project request",
    submitting: "Sending…",
    errTask: "Pick one type of work.",
    errNeed: "Please describe the need a bit more (at least 15 characters).",
    errOutput: "Please write the expected output briefly.",
    errContact: "Name and phone number are required so we can reply.",
    errAcknowledge: "Please confirm the note above.",
    errGeneric: "Could not reach the server. Please message us on Telegram.",
    successTitle: "Your request has been sent",
    successBody:
      "Your request is on its way to the WebNovo team. Scope, feasibility and the final price are confirmed after review — we don't quote fixed prices or deadlines before that.",
    successFollow:
      "We review the details and get back to you within 24 working hours. If this isn't a good fit (e.g. a cheaper ready-made route exists), we'll say so honestly.",
    successAgain: "Submit another request",
    telegramCta: "Faster chat on Telegram",
  },
} as const;

type FormState = {
  taskType: string;
  need: string;
  output: string;
  timeline: string;
  budget: string;
  fullName: string;
  phone: string;
  telegram: string;
  contactMethod: "phone" | "telegram";
};

const EMPTY: FormState = {
  taskType: "",
  need: "",
  output: "",
  timeline: TIMELINES[1].id,
  budget: "",
  fullName: "",
  phone: "",
  telegram: "",
  contactMethod: "phone",
};

export default function SmallProjectForm({ locale = "fa" }: { locale?: Locale }) {
  const t = CONTENT[locale];
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;
  const label = (item: { fa: string; en: string }) => item[locale];

  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [acknowledged, setAcknowledged] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const update = (patch: Partial<FormState>) => setForm((prev) => ({ ...prev, ...patch }));

  const validateStep = (): string => {
    if (step === 0) {
      if (!form.taskType) return t.errTask;
      if (form.need.trim().length < 15) return t.errNeed;
      if (!form.output.trim()) return t.errOutput;
    }
    if (step === 1) {
      if (!form.fullName.trim() || !form.phone.trim()) return t.errContact;
    }
    return "";
  };

  const goNext = () => {
    const err = validateStep();
    if (err) {
      setErrorMessage(err);
      return;
    }
    setErrorMessage("");
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const err = validateStep();
    if (err) {
      setErrorMessage(err);
      return;
    }
    if (!acknowledged) {
      setErrorMessage(t.errAcknowledge);
      return;
    }

    const taskLabel = TASK_TYPES.find((x) => x.id === form.taskType);
    const timelineLabel = TIMELINES.find((x) => x.id === form.timeline);
    const budgetLabel = BUDGET_OPTIONS.find((x) => x.id === form.budget);

    const extras = [
      `${locale === "fa" ? "نوع کار" : "Task type"}: ${taskLabel ? label(taskLabel) : form.taskType}`,
      `${t.output}: ${form.output.trim()}`,
      `${t.timeline}: ${timelineLabel ? label(timelineLabel) : form.timeline}`,
      form.budget && form.budget !== "not_sure"
        ? `${t.summaryBudget}: ${budgetLabel ? label(budgetLabel) : form.budget}`
        : "",
      form.telegram.trim()
        ? `${locale === "fa" ? "تلگرام" : "Telegram"}: ${form.telegram.trim()}`
        : "",
    ].filter(Boolean);

    const projectDescription = [
      `${locale === "fa" ? "درخواست «پروژه کوچک»" : "Small-project request"}`,
      "",
      form.need.trim(),
      "",
      extras.join("\n"),
    ].join("\n");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          companyName: "",
          phoneNumber: form.phone.trim(),
          email: "",
          projectType: "small_project",
          currentSoftware: "",
          estimatedBudget: form.budget || "not_sure",
          projectDescription,
          preferredContactMethod: form.contactMethod,
        }),
      });

      const raw = await res.text();
      let data: { success?: boolean; error?: string; inquiryId?: number } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(t.errGeneric);
      }
      if (!res.ok || data.success === false) {
        throw new Error(data.error || t.errGeneric);
      }
      setInquiryId(data.inquiryId ?? null);
      setDone(true);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : t.errGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAll = () => {
    setForm(EMPTY);
    setAcknowledged(false);
    setStep(0);
    setDone(false);
    setInquiryId(null);
    setErrorMessage("");
  };

  if (done) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-emerald-500/40 bg-slate-900/90 p-8 sm:p-12 text-center shadow-2xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        {inquiryId !== null && (
          <span className="font-mono-num rounded-full border border-emerald-800/60 bg-emerald-950/80 px-3 py-1 text-xs font-bold tracking-widest text-emerald-400">
            #{inquiryId}
          </span>
        )}
        <h3 className="mt-4 mb-3 text-2xl font-extrabold text-white sm:text-3xl">{t.successTitle}</h3>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{t.successBody}</p>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-400">{t.successFollow}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800 pt-6">
          <a
            href="https://t.me/Webnovobot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-800/60 bg-cyan-950 px-5 py-2.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-900"
          >
            <Send className="h-4 w-4" />
            {t.telegramCta}
          </a>
          <button
            type="button"
            onClick={resetAll}
            className="text-xs text-slate-400 underline transition-colors hover:text-white"
          >
            {t.successAgain}
          </button>
        </div>
      </div>
    );
  }

  const summaryRows: { icon: typeof ClipboardList; title: string; value: string }[] = [
    {
      icon: ClipboardList,
      title: t.summaryTask,
      value: TASK_TYPES.find((x) => x.id === form.taskType)
        ? label(TASK_TYPES.find((x) => x.id === form.taskType)!)
        : t.notSet,
    },
    { icon: MessageSquare, title: t.summaryNeed, value: form.need.trim() || t.notSet },
    { icon: PackageCheck, title: t.summaryOutput, value: form.output.trim() || t.notSet },
    {
      icon: Clock3,
      title: t.summaryTimeline,
      value: TIMELINES.find((x) => x.id === form.timeline)
        ? label(TIMELINES.find((x) => x.id === form.timeline)!)
        : t.notSet,
    },
    {
      icon: Wallet,
      title: t.summaryBudget,
      value: form.budget
        ? label(BUDGET_OPTIONS.find((x) => x.id === form.budget) ?? BUDGET_OPTIONS[BUDGET_OPTIONS.length - 1])
        : t.budgetEmpty,
    },
    {
      icon: User,
      title: t.summaryContact,
      value: `${form.fullName.trim() || t.notSet} — ${form.phone.trim() || t.notSet}`,
    },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl sm:p-10"
    >
      {/* نوار پیشرفت */}
      <div className="mb-8 flex items-center gap-2">
        {t.steps.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col gap-2">
            <div
              className={`h-1.5 rounded-full transition-colors ${
                i <= step ? "bg-cyan-500" : "bg-slate-800"
              }`}
            />
            <div className="flex items-center gap-1.5">
              <span
                className={`font-mono-num flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                  i <= step ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-500"
                }`}
              >
                {i + 1}
              </span>
              <span className={`text-[11px] font-semibold ${i <= step ? "text-slate-200" : "text-slate-500"}`}>
                {s}
              </span>
            </div>
          </div>
        ))}
      </div>

      {errorMessage && (
        <div className="mb-6 flex items-center gap-2 rounded-xl border border-red-700/60 bg-red-950/60 p-3.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* گام ۱ — تعریف کار */}
      {step === 0 && (
        <div className="space-y-6">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <ClipboardList className="h-3.5 w-3.5 text-cyan-400" />
              {t.taskType}
            </h4>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {TASK_TYPES.map((type) => {
                const selected = form.taskType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => update({ taskType: type.id })}
                    className={`flex items-center justify-between rounded-xl border p-3 text-start text-xs font-medium transition-all ${
                      selected
                        ? "border-cyan-500/80 bg-cyan-950/50 text-cyan-200"
                        : "border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <span>{label(type)}</span>
                    {selected && <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              {t.need} <span className="text-red-400">*</span>
            </label>
            <p className="mb-2 text-[11px] text-slate-500">{t.needHint}</p>
            <textarea
              required
              rows={3}
              value={form.need}
              onChange={(e) => update({ need: e.target.value })}
              placeholder={t.needPlaceholder}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-300">
              {t.output} <span className="text-red-400">*</span>
            </label>
            <p className="mb-2 text-[11px] text-slate-500">{t.outputHint}</p>
            <textarea
              required
              rows={2}
              value={form.output}
              onChange={(e) => update({ output: e.target.value })}
              placeholder={t.outputPlaceholder}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* گام ۲ — زمان، بودجه و تماس */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Clock3 className="h-3.5 w-3.5 text-blue-400" />
                {t.timeline}
              </label>
              <p className="mb-2 text-[11px] text-slate-500">{t.timelineHint}</p>
              <select
                value={form.timeline}
                onChange={(e) => update({ timeline: e.target.value })}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                {TIMELINES.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                    {label(opt)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Wallet className="h-3.5 w-3.5 text-emerald-400" />
                {t.budget}
              </label>
              <p className="mb-2 text-[11px] text-slate-500">{t.budgetHint}</p>
              <select
                value={form.budget}
                onChange={(e) => update({ budget: e.target.value })}
                className="w-full cursor-pointer appearance-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="" className="bg-slate-900 text-white">
                  {t.budgetEmpty}
                </option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                    {label(opt)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-5">
            <h4 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <User className="h-3.5 w-3.5 text-cyan-400" />
              {t.contactTitle}
            </h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  {t.fullName} <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => update({ fullName: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">
                  {t.phone} <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                  placeholder="۰۹۱۲XXXXXXX"
                  className="font-mono-num w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-slate-300">{t.telegram}</label>
                <input
                  type="text"
                  value={form.telegram}
                  onChange={(e) => update({ telegram: e.target.value })}
                  dir="ltr"
                  placeholder="@username"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-left text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <span className="font-semibold text-slate-400">{t.contactMethod}</span>
              <label className="inline-flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="sp-contact"
                  checked={form.contactMethod === "phone"}
                  onChange={() => update({ contactMethod: "phone" })}
                  className="accent-cyan-400"
                />
                {t.phoneOption}
              </label>
              <label className="inline-flex cursor-pointer items-center gap-1.5">
                <input
                  type="radio"
                  name="sp-contact"
                  checked={form.contactMethod === "telegram"}
                  onChange={() => update({ contactMethod: "telegram" })}
                  className="accent-cyan-400"
                />
                {t.telegramOption}
              </label>
            </div>
          </div>
        </div>
      )}

      {/* گام ۳ — بازبینی و تأیید */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h4 className="mb-4 text-sm font-bold text-white">{t.summaryTitle}</h4>
            <ul className="space-y-3">
              {summaryRows.map((row) => (
                <li key={row.title} className="flex items-start gap-2.5 text-xs">
                  <row.icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400" />
                  <div>
                    <span className="block text-slate-500">{row.title}</span>
                    <span className="block leading-relaxed text-slate-200">{row.value}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-300">{t.scopeTitle}</h4>
            <ul className="space-y-2">
              {t.scopeItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <label className="mt-4 flex cursor-pointer items-start gap-2.5 border-t border-cyan-900/60 pt-4 text-xs text-slate-200">
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="mt-0.5 accent-cyan-400"
              />
              <span>{t.acknowledge}</span>
            </label>
          </div>
        </div>
      )}

      {/* دکمه‌ها */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-800 pt-6">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setErrorMessage("");
              setStep((s) => Math.max(s - 1, 0));
            }}
            className="text-xs text-slate-400 underline transition-colors hover:text-white"
          >
            {t.back}
          </button>
        ) : (
          <span />
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
          >
            {t.next}
            <Arrow className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                {t.submit}
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
}
