import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Server,
  Code2,
  FileCheck2,
  Users,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Terminal,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "درباره نوین وب | استانداردهای مهندسی، امنیت و قرارداد محرمانگی",
  description:
    "آشنایی با تیم مهندسی نوین وب (Webnovo)، پروتکل‌های امنیتی، استقرار سرور اختصاصی داخل کشور، و تعهدات حقوقی محرمانگی اطلاعات سازمان‌ها.",
};

export default function AboutPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>مهندسی، شفافیت و امنیت اطلاعات</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            ما کدنویسی نمی‌کنیم که فقط کار کند؛ سیستمی می‌سازیم که برای کار پیوسته و شرایط واقعی ساخته شده باشد
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            نوین وب یک آژانس تخصصی مهندسی نرم‌افزار و اتوماسیون صنعتی است که با تمرکز ویژه بر چالش‌های خاص اکوسیستم کسب‌وکار در ایران (سپیدار، هلو، ترب، دیجی‌کالا، پیام‌رسان‌های بومی و سامانه‌های مالیاتی) راه‌حل‌های پایدار و اختصاصی ارائه می‌دهد.
          </p>
        </div>

        {/* 4 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">قرارداد محرمانگی (NDA)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              در صورت درخواست یا نیاز، پیش از دریافت هرگونه دسترسی به دیتابیس یا مستندات، قرارداد رسمی
              حفظ محرمانگی اطلاعات تجاری منعقد می‌گردد.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">استقرار محلی (On-Premise)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              سورس‌کدها، کانتینرهای داکر و پایگاه داده‌ها مستقیماً روی سرور فیزیکی یا مجازی داخل شبکه شرکت
              شما دیپلوی می‌شوند و داده‌های اصلی روی زیرساخت خودتان می‌ماند؛ جز تبادلاتی که خودِ سیستم برای
              کار با سرویس‌های انتخابی شما (مثل تلگرام یا درگاه پرداخت) لازم دارد.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">تحویل کامل سورس‌کد</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              هیچ وابستگی مادام‌العمری وجود ندارد. شما مالک کامل کدهای تمیز، ساختاریافته و دارای کامنت همراه با راهنمای استقرار (Setup Guide) خواهید بود.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">گارانتی رفع ایراد و تطبیق با تغییرات</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              اگر ترب ساختار HTML خود را تغییر دهد یا دیجی‌کالا فیلد جدیدی به API خود بیفزاید، در دوره‌ی
              گارانتی و پشتیبانیِ توافق‌شده در قرارداد، این تغییرات بررسی و سازگاری سیستم انجام می‌شود.
            </p>
          </div>
        </div>

        {/* Detailed Tech Stack Showcase */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
              <Terminal className="w-3.5 h-3.5" />
              <span>پشته فنی و استانداردهای توسعه نرم‌افزار</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              ابزارها و فریم‌ورک‌های مهندسی نوین وب
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-cyan-300">هسته پردازشی و رباتیک</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Python & FastAPI:</strong> پردازش ایزوله و ناهمگام (Asynchronous) برای بارهای همزمان
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Playwright & Selenium:</strong> خزش پایدار و مدیریت نشست‌ها
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Node.js & TypeScript:</strong> استقرار مایکروسرویس‌های بلادرنگ
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-blue-300">پایگاه‌های داده و اتصالات مالی</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <strong>Microsoft SQL Server:</strong> کوئری‌های ایمن به سپیدار و هلو
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <strong>PostgreSQL & Drizzle ORM:</strong> ذخیره‌سازی داده‌های ساخت‌یافته
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <strong>Redis In-Memory Cache:</strong> صف‌بندی کارها و کنترل نرخ درخواست
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">هوش مصنوعی و پیام‌رسان‌ها</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <strong>موتورهای OCR فارسی:</strong> استخراج خودکار اطلاعات فیش و فاکتور، با امکان بازبینی
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <strong>Telegram & Bale Bot SDK:</strong> پاسخگویی آنی با وب‌هوک SSL
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                  <strong>Docker & Traefik:</strong> راه‌اندازی آسان و کانتینری در چند دقیقه
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* NDA Sample Clause */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <FileCheck2 className="w-4 h-4" />
            <span>بند نمونه از مفاد قرارداد محرمانگی نوین وب (NDA)</span>
          </div>
          <blockquote className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed italic">
            «تیم مهندسی نوین وب متعهد می‌گردد کلیه اطلاعات مالی، اطلاعات هویتی مشتریان، قیمت تمام‌شده، لاگ‌ها و بانک اطلاعاتی طرف کارفرما را به عنوان اسرار تجاری تلقی نموده و تحت هیچ عنوان در اختیار اشخاص ثالث حقیقی یا حقوقی قرار ندهد. مسئولیت نقض تعهد مذکور بر اساس مفاد قرارداد و قوانین جاری بر عهده مجری خواهد بود.»
          </blockquote>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/40 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            جلسه‌ای حضوری یا آنلاین با مدیران فنی ما داشته باشید
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            ما به زبان کسب‌وکار شما صحبت می‌کنیم، نه اصطلاحات پیچیده کامپیوتری. با آرامش نیازهای شما را مطرح کنید.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>درخواست مشاوره</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
