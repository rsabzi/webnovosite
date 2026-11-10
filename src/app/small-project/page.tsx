import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Rocket,
  Sparkles,
  Wallet,
} from "lucide-react";
import SmallProjectForm from "@/components/SmallProjectForm";

export const metadata: Metadata = {
  alternates: { canonical: "/small-project" },
  title: "شروع پروژه کوچک | سفارش کار مشخص و محدود | نوین وب",
  description:
    "اسکریپت، اتصال API، ربات ساده تلگرام، استخراج داده یا خودکارسازی یک فرایند تکراری؛ در چند گام کوتاه کار مشخص خود را تعریف کنید و برآورد اولیه بگیرید. محدوده و قیمت نهایی پس از بررسی مشخص می‌شود.",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوین وب | Webnovo",
    title: "شروع پروژه کوچک | نوین وب",
    description:
      "مسیر کوتاه برای پروژه‌های مشخص و محدود: تعریف کار، اعلام خروجی مورد انتظار و دریافت برآورد اولیه پس از بررسی.",
    url: "/small-project",
  },
};

const EXAMPLES = [
  "اسکریپت Python با ورودی و خروجی مشخص",
  "اتصال دو سرویس از طریق API",
  "ساخت یک ربات تلگرام ساده",
  "افزودن یک قابلیت محدود به سیستم موجود",
  "استخراج و تبدیل داده",
  "نمونه اولیه یا MVP محدود",
  "خودکارسازی یک فرایند تکراری",
];

const HOW = [
  {
    icon: ClipboardCheck,
    title: "۱. کارتان را کوتاه تعریف کنید",
    desc: "نوع کار، توضیح نیاز و خروجی مورد انتظار — در چند دقیقه، بدون فرم طولانی.",
  },
  {
    icon: FileSearch,
    title: "۲. بررسی و برآورد اولیه",
    desc: "امکان‌پذیری، محدوده و بازه‌ی هزینه را بررسی می‌کنیم و حداکثر تا ۲۴ ساعت کاری پاسخ می‌دهیم.",
  },
  {
    icon: Rocket,
    title: "۳. شروع با محدوده‌ی روشن",
    desc: "پیش از شروع، محدوده‌ی تحویل مکتوب می‌شود؛ تغییرات خارج از آن برآورد جدا دارد.",
  },
];

const FAQS = [
  {
    q: "با «ایده من» چه تفاوتی دارد؟",
    a: "«ایده من» برای وقتی است که هنوز نمی‌دانید راه‌حل چیست و می‌خواهید امکان‌پذیری را بسنجید. مسیر «پروژه کوچک» برای وقتی است که کار مشخص و محدودی دارید و می‌خواهید سریع‌تر به برآورد برسید.",
  },
  {
    q: "قیمت ثابت اعلام می‌کنید؟",
    a: "قیمت نهایی فقط بعد از روشن‌شدن محدوده‌ی کار مشخص می‌شود. برای کارهای کوچک و استاندارد، همان ابتدا یک برآورد اولیه‌ی شفاف (بازه‌ی هزینه و زمان) می‌گیرید؛ اما بدون مشخص‌بودن محدوده، عدد ثابت اعلام نمی‌کنیم.",
  },
  {
    q: "اگر کارم خیلی کوچک باشد چه؟",
    a: "کارهای کوچک را فقط وقتی می‌پذیریم که از نظر زمانی و اقتصادی برای هر دو طرف منطقی باشد. اگر راه ساده‌تر یا ابزار آماده‌ای برایتان به‌صرفه‌تر باشد، همان را صادقانه می‌گوییم.",
  },
  {
    q: "بعد از ارسال درخواست چه اتفاقی می‌افتد؟",
    a: "درخواست برای تیم نوین وب می‌رود، نیازمندی‌ها بررسی می‌شود و حداکثر تا ۲۴ ساعت کاری با شما تماس می‌گیریم. امکان‌پذیری، محدوده‌ی دقیق، زمان و هزینه پس از همین بررسی مشخص می‌شود.",
  },
];

export default function SmallProjectPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-14">
        {/* هدر */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            پروژه‌های کوچک و مشخص — مسیر کوتاه همکاری با نوین وب
          </span>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            یک کار مشخص برای خودکارسازی دارید؟
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            اگر یک اسکریپت، اتصال API، ربات ساده، قابلیت محدود یا فرایند تکراری دارید که می‌خواهید خودکار
            شود، لازم نیست مسیر یک پروژه‌ی بزرگ را طی کنید. کارتان را در چند گام کوتاه تعریف کنید تا
            امکان‌پذیری، محدوده و برآورد اولیه را بررسی و شفاف اعلام کنیم.
          </p>

          <p className="text-xs leading-relaxed text-slate-400">
            پروژه‌ی بزرگ‌تر و چندبخشی دارید؟{" "}
            <Link href="/contact" className="font-semibold text-cyan-400 hover:text-cyan-300">
              فرم درخواست پروژه
            </Link>{" "}
            جای درستی است. هنوز نمی‌دانید راه‌حل چیست؟ از{" "}
            <Link href="/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              «ایده من»
            </Link>{" "}
            شروع کنید.
          </p>
        </div>

        {/* برای چه کارهایی */}
        <section className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">
              <Boxes className="h-5 w-5 text-cyan-400" />
              برای چه کارهایی مناسب است؟
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-slate-700 bg-slate-950/70 px-3.5 py-1.5 text-xs text-slate-300"
                >
                  {ex}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-800 pt-4 text-[11px] leading-relaxed text-slate-500">
              این‌ها نمونه‌اند، نه فهرست تعهد. پذیرش هر مورد پس از بررسی مشخص می‌شود و برای همه‌ی این
              موارد هم قیمت یا زمان ثابت از پیش تعیین‌شده وجود ندارد.
            </p>
          </div>
        </section>

        {/* چطور کار می‌کند */}
        <section>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">چطور کار می‌کند؟</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              از تعریف کار تا شروع، بدون پیچیدگی
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {HOW.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-white sm:text-base">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* فرم */}
        <section id="request" className="mx-auto max-w-3xl scroll-mt-24">
          <SmallProjectForm locale="fa" />
        </section>

        {/* شفافیت قیمت */}
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Wallet className="h-5 w-5 text-cyan-400" />
              درباره‌ی قیمت، شفاف باشیم
            </h2>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
              <p>
                قیمت‌گذاری بر اساس محدوده‌ی کار، پیچیدگی و زمان واقعی اجرا انجام می‌شود؛ نه حدس. برای
                پروژه‌های تعریف‌شده، بازه‌ی معمول از حدود ۳۵ میلیون تومان شروع می‌شود (همان‌طور که در{" "}
                <Link href="/pricing" className="font-semibold text-cyan-400 hover:text-cyan-300">
                  صفحه‌ی تعرفه
                </Link>{" "}
                آمده) و اگر کار شما کوچک‌تر است، اول محدوده را روشن می‌کنیم تا ببینیم با چه ساختاری
                انجام‌شدنی و برای هر دو طرف منطقی است.
              </p>
              <p>
                هزینه‌ی توسعه‌ی اولیه با هزینه‌ی سرویس‌های ثالث (سرور، درگاه پرداخت، پیامک و…) و نگهداری
                ماهانه فرق دارد و هرکدام جداگانه و پیش از شروع روشن می‌شوند.
              </p>
            </div>
          </div>
        </section>

        {/* سوالات */}
        <section className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-center text-xl font-black text-white sm:text-2xl">سوال‌های پرتکرار</h2>
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-slate-700"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-bold text-white sm:text-base">
                <span>{item.q}</span>
                <span className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-xs leading-loose text-slate-300 sm:text-sm">{item.a}</p>
            </details>
          ))}
        </section>

        {/* CTA پایانی */}
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-gradient-to-l from-cyan-950/40 to-indigo-950/30 p-8 text-center">
          <h2 className="text-xl font-black text-white sm:text-2xl">هنوز مردد هستید؟</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            نیازی نیست از قبل همه‌چیز را بدانید. مسئله‌تان را ساده توضیح بدهید؛ اگر مسیر «پروژه کوچک»
            مناسب نباشد، شما را به مسیر درست راهنمایی می‌کنیم.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              مشاوره و برآورد پروژه
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/automation-check"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
            >
              <Clock3 className="h-4 w-4 text-cyan-400" />
              بررسی رایگان اتوماسیون
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            امکان‌پذیری، محدوده و قیمت نهایی همیشه پس از بررسی مشخص می‌شود.
          </p>
        </section>
      </div>
    </main>
  );
}
