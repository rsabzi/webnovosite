"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ClipboardCheck, MessageSquare, PhoneCall, Send } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * دو مسیر اصلی ورود در هیرو + مسیر مستقیم تماس برای مشتریان سازمانی.
 * اولویت با «مشاوره و برآورد پروژه» است (مسیر اصلی تماس ورودی).
 * کلیک‌ها با رویداد `hero_cta_click` ثبت می‌شوند (بدون هیچ داده‌ی شخصی).
 */

const CONTENT = {
  fa: {
    primary: {
      href: "/contact",
      title: "مشاوره رایگان و برآورد پروژه",
      desc: "اتوماسیون فرایندها، ساخت ربات اختصاصی و اتصال سیستم‌هایتان؛ اول نیاز سازمان شما را می‌شنویم، بعد برآورد شفاف می‌دهیم.",
    },
    secondary: {
      href: "/automation-check",
      title: "بررسی رایگان اتوماسیون",
      desc: "با هشت سؤال کوتاه ببینید کدام بخش از کسب‌وکار شما بیشتر قابل خودکارسازی است.",
    },
    directLabel: "ترجیح می‌دهید مستقیم صحبت کنید؟",
    phoneHref: "tel:09165486367",
    phoneText: "۰۹۱۶۵۴۸۶۳۶۷",
    telegramText: "تلگرام",
  },
  en: {
    primary: {
      href: "/en/contact",
      title: "Free consultation & project estimate",
      desc: "Business automation, custom bots and system integration — we listen to your needs first, then quote clearly.",
    },
    secondary: {
      href: "/en/automation-check",
      title: "Free automation check",
      desc: "Eight quick questions show which parts of your business are worth automating.",
    },
    directLabel: "Prefer to talk now?",
    phoneHref: "tel:+989165486367",
    phoneText: "+98 916 548 6367",
    telegramText: "Telegram",
  },
} as const;

export default function HeroActions({ locale }: { locale: "fa" | "en" }) {
  const t = CONTENT[locale];
  const Arrow = locale === "fa" ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-stretch">
        {/* مسیر اول — گرادیان سیان/آبی */}
        <Link
          href={t.primary.href}
          onClick={() => trackEvent("hero_cta_click", { locale, variant: "consultation" })}
          className="group relative inline-flex max-w-md flex-1 items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-l from-cyan-400 via-sky-500 to-blue-600 px-5 py-3 text-start shadow-lg shadow-cyan-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 active:translate-y-0 active:scale-[0.98] sm:px-6 sm:py-3.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-sm">
            <MessageSquare className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-extrabold leading-snug text-white sm:text-base">{t.primary.title}</span>
            <span className="mt-0.5 text-[11px] font-medium leading-snug text-white/85 sm:text-xs">{t.primary.desc}</span>
          </span>
          <Arrow className="h-4 w-4 shrink-0 text-white/90 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
          <span className="btn-sheen" aria-hidden="true" />
        </Link>

        {/* مسیر دوم — گرادیان زمرد/فیروزه‌ای */}
        <Link
          href={t.secondary.href}
          onClick={() => trackEvent("hero_cta_click", { locale, variant: "automation_check" })}
          className="group relative inline-flex max-w-md flex-1 items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-l from-emerald-400 via-teal-500 to-cyan-600 px-5 py-3 text-start shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300 active:translate-y-0 active:scale-[0.98] sm:px-6 sm:py-3.5"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white shadow-sm">
            <ClipboardCheck className="h-5 w-5" />
          </span>
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-extrabold leading-snug text-white sm:text-base">{t.secondary.title}</span>
            <span className="mt-0.5 text-[11px] font-medium leading-snug text-white/85 sm:text-xs">{t.secondary.desc}</span>
          </span>
          <Arrow className="h-4 w-4 shrink-0 text-white/90 transition-transform duration-300 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
          <span className="btn-sheen" aria-hidden="true" />
        </Link>
      </div>

      <div className="mx-auto flex w-fit flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs font-semibold text-slate-400 sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <PhoneCall className="h-3.5 w-3.5 text-cyan-500/80" />
          {t.directLabel}
        </span>
        <a
          href={t.phoneHref}
          onClick={() => trackEvent("hero_cta_click", { locale, variant: "direct_phone" })}
          className="font-mono-num text-cyan-300 transition-colors hover:text-cyan-200 hover:underline"
        >
          {t.phoneText}
        </a>
        <span className="text-slate-600">—</span>
        <a
          href="https://t.me/Webnovobot"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("hero_cta_click", { locale, variant: "direct_telegram" })}
          className="inline-flex items-center gap-1 text-cyan-300 transition-colors hover:text-cyan-200 hover:underline"
        >
          <Send className="h-3.5 w-3.5" />
          {t.telegramText} <span dir="ltr">@Webnovobot</span>
        </a>
      </div>
    </div>
  );
}
