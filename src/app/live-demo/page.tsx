import type { Metadata } from "next";
import LiveWorkflowRunner from "@/components/LiveWorkflowRunner";
import Link from "next/link";
import {
  Activity,
  Terminal,
  ShieldCheck,
  Server,
  ArrowLeft,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/live-demo" },
  title: "شبیه‌ساز زنده گردش کار ربات‌ها و تست آنلاین | نوین وب",
  description:
    "مشاهده و تست عملکرد زنده سناریوهای اتوماسیون ترب، دیجی‌کالا، سپیدار سیستم، پیام‌رسان‌ها و هوش مصنوعی در محیط شبیه‌ساز مهندسی نوین وب.",
};

export default function LiveDemoPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>کنسول شبیه‌ساز مهندسی نوین وب</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            تست زنده سناریوهای اتوماسیون سازمانی
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ببینید کدهای ربات‌ها چگونه در پس‌زمینه اجرا می‌شوند، با وب‌سرویس‌ها ارتباط برقرار می‌کنند و داده‌ها را با میلی‌ثانیه‌ها جابجا می‌کنند.
          </p>
        </div>

        {/* Live Runner Component */}
        <LiveWorkflowRunner />

        {/* Technical Architecture Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">معماری غیرمسدودکننده (Async)</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              توسعه بر پایه معماری رویدادمحور و صف‌های پیام سریع (Redis + Celery) با قابلیت پردازش همزمان ده‌ها هزار رخداد بدون افت سرعت.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">مدیریت هوشمند خطا و Retry</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              در صورت قطع شدن موقت اینترنت یا کندی سایت طرف مقابل، درخواست‌ها در صف ذخیره شده و پس از رفع مانع، بدون از دست رفتن تراکنش‌ها اجرا می‌شوند.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">مانیتورینگ و آلرت آنی</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              ثبت خط‌به‌خط لاگ‌های اجرایی و ارسال فوری هشدار به ربات تلگرام مدیر در صورت مواجهه با سناریوهای غیرمنتظره یا نیاز به مداخله انسانی.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            می‌خواهید چنین سیستمی برای سناریوی اختصاصی شرکت شما ساخته شود؟
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            تیم ما آماده است نمونه اولیه دمو (Prototype) را برای بررسی ساختار فنی شرکت شما ارائه دهد.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>سفارش ساخت سیستم اتوماسیون اختصاصی</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
