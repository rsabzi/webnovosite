"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AtSign,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Link as LinkIcon,
  Loader2,
  Mail,
  Phone,
  Send,
  Users,
} from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type IdeaFormState = {
  idea: string;
  audience: string;
  budget: string;
  sampleLink: string;
  phone: string;
  telegram: string;
  email: string;
};

const EMPTY: IdeaFormState = { idea: "", audience: "", budget: "", sampleLink: "", phone: "", telegram: "", email: "" };

/** گزینه‌های بودجه — همه اختیاری؛ عدم انتخاب یعنی «نمی‌خواهم بگویم». بازه‌ها با صفحه تعرفه همگام است. */
const BUDGET_OPTIONS = [
  "زیر ۳۵ میلیون تومان",
  "۳۵ تا ۶۵ میلیون تومان",
  "۶۵ تا ۱۰۰ میلیون تومان",
  "بالای ۱۰۰ میلیون تومان",
  "هنوز نمی‌دانم",
];

export default function IdeaForm({ source = "idea_page" }: { source?: string }) {
  const [form, setForm] = useState<IdeaFormState>(EMPTY);
  const [started, setStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const update = (key: keyof IdeaFormState, value: string) => {
    if (!started) {
      setStarted(true);
      trackEvent("idea_form_started", { source });
    }
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (form.idea.trim().length < 20) {
      setErrorMessage("ایده یا فرایند شما را کمی کامل‌تر توضیح بدهید تا بتوانیم درست بررسی‌اش کنیم.");
      return;
    }
    if (!form.phone.trim() && !form.telegram.trim() && !form.email.trim()) {
      setErrorMessage("حداقل یک راه ارتباطی (شماره، آیدی تلگرام یا ایمیل) لازم است تا جواب بررسی را بفرستیم.");
      return;
    }

    // فیلدهای ساختاریافته‌ی جدید بدون تغییر بک‌اند، به متن اصلی ایده اضافه می‌شوند.
    const extras = [
      form.audience.trim() ? `چه کسی استفاده می‌کند: ${form.audience.trim()}` : "",
      form.budget ? `بودجه تقریبی: ${form.budget}` : "",
    ].filter(Boolean);
    const combinedIdea = extras.length > 0 ? `${form.idea.trim()}\n\n${extras.join("\n")}` : form.idea.trim();

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: combinedIdea,
          sampleLink: form.sampleLink,
          phone: form.phone,
          telegram: form.telegram,
          email: form.email,
        }),
      });

      const raw = await res.text();
      let data: { success?: boolean; error?: string; message?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("پاسخ نامعتبری از سرور دریافت شد. لطفاً چند لحظه دیگر دوباره تلاش کنید یا در تلگرام پیام بدهید.");
      }

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "خطایی در ثبت ایده رخ داد.");
      }

      setSuccessMessage(data.message || "ایده‌ی شما ثبت شد.");
      trackEvent("idea_submitted", { source, hasSampleLink: Boolean(form.sampleLink.trim()) });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "خطا در اتصال به سرور.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successMessage) {
    return (
      <div className="rounded-3xl border border-emerald-500/40 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur-xl sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h3 className="mb-3 text-2xl font-extrabold text-white sm:text-3xl">درخواست شما رسید</h3>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">{successMessage}</p>
        <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-slate-400">
          درخواست‌ها را یکی‌یکی بررسی می‌کنیم و از همین مسیرهای ارتباطی با شما در تماس خواهیم بود.
          امکان‌پذیری، محدوده و هزینه‌ی پروژه بعد از بررسی مشخص می‌شود؛ قبل از آن قول قطعی ساخت،
          قیمت یا زمان نمی‌دهیم.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 border-t border-slate-800 pt-6">
          <a
            href="https://t.me/Webnovobot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-800/60 bg-cyan-950 px-5 py-2.5 text-xs font-semibold text-cyan-300 transition-colors hover:bg-cyan-900"
          >
            <Send className="h-4 w-4" />
            گفت‌وگوی سریع‌تر در تلگرام
          </a>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY);
              setSuccessMessage(null);
              setStarted(false);
            }}
            className="text-xs text-slate-400 underline hover:text-white"
          >
            ثبت یک درخواست دیگر
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8"
    >
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl border border-red-700/60 bg-red-950/60 p-3.5 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ایده یا فرایند */}
      <div>
        <label htmlFor="idea" className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Lightbulb className="h-4 w-4 text-cyan-400" />
          ایده یا فرایند شما را ساده توضیح بدهید <span className="text-red-400">*</span>
        </label>
        <textarea
          id="idea"
          required
          rows={6}
          placeholder="مثال: می‌خوام مشتری وقتی وارد تلگرام می‌شه، خودش محصول رو انتخاب کنه، پول رو پرداخت کنه و سفارش براش ثبت بشه."
          value={form.idea}
          onChange={(e) => update("idea", e.target.value)}
          className={`${inputClass} resize-none leading-relaxed`}
        />
        <p className="mt-1.5 text-[11px] text-slate-500">
          لازم نیست فنی باشد؛ همین سه تا را بگویید کافی است: چه چیزی می‌خواهید بسازی، قرار است چه کاری
          انجام بدهد و الان آن کار چطور انجام می‌شود. اگر ایده‌ی شما مبهم است، آزاد توضیح بدهید.
        </p>
      </div>

      {/* چه کسی استفاده می‌کند؟ */}
      <div>
        <label htmlFor="audience" className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <Users className="h-4 w-4 text-emerald-400" />
          این ابزار را چه کسی استفاده خواهد کرد؟
          <span className="font-normal text-slate-500">(اختیاری)</span>
        </label>
        <input
          id="audience"
          type="text"
          placeholder="مثال: خودم، مشتری‌های فروشگاه، تیم پشتیبانی…"
          value={form.audience}
          onChange={(e) => update("audience", e.target.value.slice(0, 200))}
          className={inputClass}
        />
      </div>

      {/* بودجه تقریبی */}
      <div>
        <p className="mb-2 text-sm font-bold text-white">
          آیا بودجه تقریبی مشخصی در نظر دارید؟ <span className="font-normal text-slate-500">(اختیاری)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update("budget", form.budget === option ? "" : option)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                form.budget === option
                  ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-300"
                  : "border-slate-700 bg-slate-950/70 text-slate-300 hover:border-slate-500"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[11px] text-slate-500">
          بودجه فقط به تخمین دقیق‌تر کمک می‌کند؛ هزینه نهایی بعد از بررسی محدوده پروژه مشخص می‌شود.
        </p>
      </div>

      {/* نمونه‌ی مشابه */}
      <div>
        <label htmlFor="sample-link" className="mb-2 flex items-center gap-2 text-sm font-bold text-white">
          <LinkIcon className="h-4 w-4 text-blue-400" />
          اگر نمونه‌ای از چیزی که می‌خواهید دارید، لینکش را بفرستید
          <span className="font-normal text-slate-500">(اختیاری)</span>
        </label>
        <input
          id="sample-link"
          type="text"
          dir="ltr"
          placeholder="https://..."
          value={form.sampleLink}
          onChange={(e) => update("sampleLink", e.target.value)}
          className={`${inputClass} text-left font-mono-num`}
        />
      </div>

      {/* راه‌های ارتباطی */}
      <div>
        <p className="mb-2 text-sm font-bold text-white">از چه راهی جواب را برای شما بفرستیم؟ <span className="text-red-400">*</span></p>
        <p className="mb-3 text-[11px] text-slate-500">حداقل یکی از این سه مورد را پر کنید.</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="relative">
            <Phone className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              aria-label="شماره تماس"
              placeholder="شماره تماس"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={`${inputClass} pr-10 font-mono-num`}
            />
          </div>
          <div className="relative">
            <AtSign className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              aria-label="آیدی تلگرام"
              placeholder="آیدی تلگرام @..."
              value={form.telegram}
              onChange={(e) => update("telegram", e.target.value)}
              className={`${inputClass} pr-10`}
            />
          </div>
          <div className="relative">
            <Mail className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              aria-label="ایمیل"
              placeholder="ایمیل"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={`${inputClass} pr-10 text-left font-mono-num`}
              dir="ltr"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-5 sm:flex-row">
        <p className="text-[11px] leading-relaxed text-slate-500">
          ایده یا فرایند شما را بررسی می‌کنیم و اگر قابل اجرا و منطقی باشد، برای ساختش پیشنهاد می‌دهیم؛ بدون تماس تبلیغاتی.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95 disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              در حال ارسال...
            </>
          ) : (
            <>
              بررسی ایده یا فرایند
              <ArrowLeft className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <p className="text-center text-[11px] text-slate-500">
        ترجیح می‌دهید مستقیم صحبت کنیم؟{" "}
        <Link href="/contact" className="text-cyan-400 hover:text-cyan-300">
          فرم پروژه
        </Link>{" "}
        یا{" "}
        <a
          href="https://t.me/Webnovobot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300"
        >
          تلگرام
        </a>
      </p>
    </form>
  );
}
