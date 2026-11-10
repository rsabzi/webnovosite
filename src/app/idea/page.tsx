import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Lightbulb, Search, ShieldCheck, Wand2 } from "lucide-react";
import IdeaForm from "@/components/IdeaForm";

export const metadata: Metadata = {
  title: "ایده من | ایده، فرایند یا نیاز شما را بگویید | نوین وب",
  description:
    "ایده، فرایند یا چیزی که در ذهنت دارید را ساده توضیح بدهید؛ بررسی می‌کنیم، راه‌حل پیشنهاد می‌دهیم و اگر قابل اجرا باشد، برای شما یک ربات، پنل یا سیستم واقعی می‌سازیم.",
  keywords: [
    "ساخت ربات از ایده",
    "سفارش ربات اختصاصی",
    "ساخت سیستم اختصاصی",
    "اتوماسیون کار تکراری",
    "نوین وب",
  ],
  alternates: { canonical: "/idea" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوین وب | Webnovo",
    title: "ایده من | ایده، فرایند یا نیاز شما را بگویید | نوین وب",
    description:
      "ایده، فرایند یا سوالی که در ذهنت دارید را ساده توضیح بدهید؛ بررسی می‌کنیم، راه‌حل پیشنهاد می‌دهیم و اگر قابل اجرا باشد، می‌سازیم.",
    url: "/idea",
  },
};

const STEPS = [
  {
    icon: Lightbulb,
    title: "۱. ایده یا فرایند شما را می‌گویید",
    desc: "با زبان خودتان؛ نه فنی، نه اداری. فرایند، ایده یا سوال را همان‌طور که هست توضیح بدهید.",
  },
  {
    icon: Search,
    title: "۲. بررسی می‌کنیم",
    desc: "از نظر فنی و منطقی بودن بررسی می‌کنیم و صادقانه می‌گوییم شدنی است یا نه.",
  },
  {
    icon: Wand2,
    title: "۳. راه‌حل پیشنهاد می‌دهیم",
    desc: "اگر قابل اجرا باشد، راه‌حل، زمان و هزینه را شفاف پیشنهاد می‌دهیم تا تصمیم بگیرید.",
  },
];

export default function IdeaPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-14">
        {/* هدر صفحه */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Lightbulb className="h-3.5 w-3.5" />
            ایده من — ایده، فرایند یا نیاز شما را بگویید
          </span>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            چه چیزی در ذهن دارید؟
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            شاید یک ایده دارید، شاید یک فرایند دست‌وپاگیر در کسب‌وکار شما، شاید یک کار تکراری که دوست دارید خودکار شود؛ شاید هم
            فقط می‌خواهید مشورت کنید. لازم نیست بدانید راه‌حل چیست؛ فقط ساده توضیح بدهید.
          </p>
        </div>

        {/* سه گام ساده */}
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <step.icon className="h-5 w-5" />
              </span>
              <h2 className="text-sm font-bold text-white">{step.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* فرم ایده */}
        <div className="mx-auto max-w-3xl">
          <IdeaForm source="idea_page" />
        </div>

        {/* چه چیزهایی می‌تواند ساخته شود؟ */}
        <section className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-base font-black text-white sm:text-xl">
            «ابزار واقعی» می‌تواند چه چیزی باشد؟
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
            از ایده‌هایی که تا حالا ساخته‌ایم، این‌ها درآمده است:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "ربات تلگرام، بله، ایتا یا روبیکا",
              "ربات فروش و ثبت سفارش",
              "سیستم نوبت‌دهی و رزرو",
              "چت‌بات و پاسخگویی خودکار",
              "پنل مدیریت و CRM",
              "وب‌اپلیکیشن و داشبورد اختصاصی",
              "ربات قیمت و وب اسکرپینگ",
              "خواندن فاکتور با هوش مصنوعی (OCR)",
              "ربات ترید و اتصال به صرافی",
              "اتصال چند سرویس به هم",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center">
            <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
              دقیقاً می‌دانید چه می‌خواهید؟{" "}
              <Link href="/services" className="font-semibold text-cyan-400 hover:text-cyan-300">
                خدمات را ببینید و مستقیم سراغ همان بروید
              </Link>
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
            >
              نمونه‌کارها را ببینید
              <ArrowLeft className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* مسیر جایگزین: تشخیص ساختاریافته */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-gradient-to-l from-cyan-950/40 via-slate-900/60 to-indigo-950/40 p-6 sm:flex-row sm:p-8">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-black text-white sm:text-lg">
                نمی‌دانید چه چیزی در کسب‌وکار شما قابل خودکارسازی است؟
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                اگر اصلاً نمی‌دانید از کدام فرایند شروع کنید، ابزار «بررسی رایگان اتوماسیون» با هشت سؤال کوتاه
                فرصت‌های اتوماسیون کسب‌وکار شما را برای شما پیدا می‌کند.
              </p>
            </div>
          </div>
          <Link
            href="/automation-check"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
          >
            <ClipboardCheck className="h-4 w-4 text-cyan-400" />
            بررسی رایگان اتوماسیون
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
