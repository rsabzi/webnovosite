import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ChevronDown, Clock, ListChecks, Play, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import AutomationCheckWizard from "@/components/automation-check/AutomationCheckWizard";

export const metadata: Metadata = {
  title: "تشخیص رایگان اتوماسیون کسب‌وکار | نوین وب",
  description:
    "در هشت گام کوتاه بگویید درخواست‌های مشتریان از کجا می‌آید و وقت تیم شما کجا هدر می‌رود؛ فرم شما مستقیم برای تیم نوین وب ارسال می‌شود و تا یک روز کاری پیشنهاد روشن می‌گیرید.",
  keywords: [
    "تشخیص اتوماسیون کسب و کار",
    "اتوماسیون فرایند",
    "اتوماسیون پاسخگویی مشتری",
    "اتوماسیون فروش",
    "طراحی سیستم هوشمند",
    "نوین وب",
  ],
  alternates: { canonical: "/automation-check" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوین وب | Webnovo",
    title: "تشخیص رایگان اتوماسیون کسب‌وکار | نوین وب",
    description:
      "کدام بخش از کسب‌وکار شما قابل اتوماسیون است؟ در چند گام کوتاه فرم بررسی را پر کنید؛ پاسخ‌ها مستقیم برای تیم نوین وب ارسال می‌شود.",
    url: "/automation-check",
  },
};

const TRUST_POINTS = [
  {
    icon: Clock,
    title: "کمتر از ۲ دقیقه",
    desc: "هشت گام کوتاه؛ در هر گام فقط یک انتخاب دارید.",
  },
  {
    icon: ListChecks,
    title: "ارسال مستقیم برای تیم نوین وب",
    desc: "در پایان، فرم شما همان لحظه برای تیم ما ارسال می‌شود؛ خبری از فرم گم‌شده نیست.",
  },
  {
    icon: ShieldCheck,
    title: "شفافیت پردازش اطلاعات",
    desc: "اطلاعات تماس فقط به تلگرام داخلی تیم ارسال می‌شود و پاسخ‌های فرایند (بدون نام و شماره) برای تولید تحلیل در Google Gemini پردازش می‌گردد.",
  },
];

const WHAT_HAPPENS = [
  "پاسخ‌های شما همان لحظه به‌همراه بررسی اولیه‌ی فرایندها برای تیم نوین وب ارسال می‌شود.",
  "یک کارشناس، فرایندهای شما را بررسی و فرصت‌های اتوماسیون واقعی را مشخص می‌کند.",
  "معمولاً تا یک روز کاری، با یک پیشنهاد روشن و بدون تعارف با شما تماس می‌گیریم.",
];

export default function AutomationCheckPage() {
  return (
    <main className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* هدر صفحه */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            ابزار رایگان بررسی فرصت‌های اتوماسیون
          </span>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            کدام بخش از کسب‌وکار شما قابل اتوماسیون است؟
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            چند سؤال کوتاه را پاسخ بدهید تا ببینیم کجای کسب‌وکار شما قابل خودکارسازی است؛ بدون اصطلاح فنی و بدون
            وعده‌ی بزرگ — در پایان، فرم شما مستقیم برای تیم ما ارسال می‌شود.
          </p>
        </div>

        {/* مزیت‌ها */}
        <div className="grid gap-4 sm:grid-cols-3 max-w-5xl mx-auto">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <point.icon className="h-5 w-5" />
              </span>
              <h2 className="text-sm font-bold text-white">{point.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{point.desc}</p>
            </div>
          ))}
        </div>

        {/* بنر متمایز ویدیوی معرفی اتوماسیون */}
        <details className="group mx-auto max-w-4xl overflow-hidden rounded-3xl border-2 border-amber-400/50 bg-gradient-to-l from-amber-400/10 via-slate-900/90 to-cyan-500/10 shadow-lg shadow-amber-500/10 transition-colors open:border-amber-300/70">
          <summary className="flex cursor-pointer flex-col gap-4 p-5 sm:flex-row sm:items-center [&::-webkit-details-marker]:hidden">
            {/* تصویر معرف ویدیو */}
            <span className="relative block w-full shrink-0 overflow-hidden rounded-xl border border-amber-300/30 sm:w-52">
              <Image
                src="/images/video-automation-poster.jpg"
                alt="تصویری از ویدیوی معرفی اتوماسیون سازمانی نوین وب"
                width={640}
                height={360}
                loading="lazy"
                className="aspect-video h-auto w-full object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-slate-950/40 transition-colors group-hover:bg-slate-950/20">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/40">
                  <Play className="h-5 w-5" />
                </span>
              </span>
              <span className="absolute bottom-1.5 left-1.5 rounded-md bg-slate-950/80 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                ۷ دقیقه
              </span>
            </span>
            <span className="flex-1">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-[11px] font-bold text-amber-300">
                <Play className="h-3 w-3" />
                ویدیوی معرفی
              </span>
              <span className="block text-base font-black text-white sm:text-lg">
                قبل از شروع، اتوماسیون را در عمل ببینید
              </span>
              <span className="mt-1.5 block text-xs leading-relaxed text-slate-300 sm:text-sm">
                سیستم‌های نوین وب چطور فرایندهای تکراری کسب‌وکار شما را خودکار می‌کنند — در ۷ دقیقه.
              </span>
            </span>
            <ChevronDown className="hidden h-5 w-5 shrink-0 text-amber-300 transition-transform group-open:rotate-180 sm:block" />
          </summary>
          <div className="px-5 pb-5">
            <video
              controls
              playsInline
              preload="none"
              poster="/images/video-automation-poster.jpg"
              className="aspect-video w-full rounded-xl border border-slate-800 bg-slate-950"
              aria-label="ویدیوی معرفی نحوه اتوماسیون و مزیت‌های آن با سیستم‌های طراحی‌شده توسط نوین وب"
            >
              <source src="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" type="video/mp4" />
              مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند؛ می‌توانید{" "}
              <a href="/videos/اتوماسیون_سازمانی_نوین_وب.mp4" className="text-amber-300 underline">
                ویدیو را مستقیم دانلود کنید
              </a>
              .
            </video>
          </div>
        </details>

        {/* فرم چندمرحله‌ای */}
        <div className="mx-auto max-w-4xl">
          <AutomationCheckWizard />
        </div>

        {/* توضیح شفاف فرایند */}
        <section className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-base font-black text-white sm:text-xl">
            <Workflow className="h-5 w-5 text-cyan-400" />
            بعد از ارسال پاسخ‌ها چه اتفاقی می‌افتد؟
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            {WHAT_HAPPENS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">
            اگر ترجیح می‌دهید گفت‌وگو را مستقیم شروع کنید، می‌توانید از{" "}
            <Link href="/contact" className="font-semibold text-cyan-400 hover:text-cyan-300">
              فرم مشاوره‌ی پروژه
            </Link>{" "}
            استفاده کنید؛ اگر یک کار مشخص و کوچک دارید، مسیر{" "}
            <Link href="/small-project" className="font-semibold text-cyan-400 hover:text-cyan-300">
              «پروژه کوچک»
            </Link>{" "}
            سریع‌تر است یا{" "}
            <a
              href="https://t.me/Webnovobot"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              در تلگرام پیام بدهید
            </a>
            .
          </p>
        </section>

        {/* ارجاع به خدمات */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-gradient-to-l from-cyan-950/40 via-slate-900/60 to-indigo-950/40 p-6 sm:flex-row sm:p-8">
          <div>
            <h2 className="text-base font-black text-white sm:text-lg">می‌خواهید بدانید دقیقاً چه سیستمی می‌سازیم؟</h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
              در صفحه‌ی خدمات، هر راه‌حل با زبان ساده و همراه با خروجی مشخص نوشته شده است.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
          >
            خدمات اتوماسیون
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
