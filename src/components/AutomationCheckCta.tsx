"use client";

import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

const PRIMARY_LABEL = "رایگان بررسی کنید کجای کارتان قابل اتوماسیون است";

/** دکمه‌ی اصلی Hero — ابزار تشخیص اتوماسیون. */
export function AutomationCheckHeroCta({ location = "hero" }: { location?: string }) {
  return (
    <Link
      href="/automation-check"
      onClick={() => trackEvent("automation_cta_click", { location })}
      className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95 sm:w-auto"
    >
      <ClipboardCheck className="h-5 w-5 text-cyan-100" />
      <span>{PRIMARY_LABEL}</span>
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
    </Link>
  );
}

/**
 * نوار CTA میانی — بدون افکت سنگین، با متن کاربردی (نه تبلیغاتی).
 * `location` برای تفکیک محل کلیک در تحلیل‌های بعدی ثبت می‌شود.
 */
export default function AutomationCheckCta({
  location,
  title = "ببینید کجای کارتان قابل اتوماسیون است",
  description = "هشت سؤال کوتاه، بدون ثبت‌نام. نتیجه را همان لحظه می‌بینید و اگر اتوماسیون برای شما به‌صرفه نباشد، صریح می‌گوییم.",
  compact = false,
}: {
  location: string;
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:flex-row">
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        <Link
          href="/automation-check"
          onClick={() => trackEvent("automation_cta_click", { location })}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
        >
          <ClipboardCheck className="h-4 w-4 text-cyan-100" />
          شروع بررسی رایگان
        </Link>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-900/50 bg-gradient-to-l from-cyan-950/50 via-slate-900/70 to-indigo-950/50 p-6 sm:p-9">
      <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative flex flex-col items-start gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-800/60 bg-cyan-950/60 px-3 py-1 text-[11px] font-semibold text-cyan-300">
            <Sparkles className="h-3 w-3" />
            ابزار رایگان بررسی اتوماسیون
          </span>
          <h3 className="mt-3 text-lg font-black leading-snug text-white sm:text-2xl">{title}</h3>
          <p className="mt-2 text-xs leading-relaxed text-slate-300 sm:text-sm">{description}</p>
        </div>

        <div className="w-full shrink-0 lg:w-auto">
          <Link
            href="/automation-check"
            onClick={() => trackEvent("automation_cta_click", { location })}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95 lg:w-auto"
          >
            <ClipboardCheck className="h-4 w-4 text-cyan-100" />
            <span>{PRIMARY_LABEL}</span>
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <p className="mt-2 text-center text-[11px] text-slate-400 lg:text-left">
            نتیجه را همان لحظه و رایگان ببینید.
          </p>
        </div>
      </div>
    </div>
  );
}
