import Link from "next/link";
import { ArrowLeft, ClipboardCheck, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-2xl">
        <p className="font-mono-num text-5xl font-black text-cyan-400">۴۰۴</p>
        <h1 className="mt-4 text-xl font-black text-white sm:text-2xl">این صفحه پیدا نشد</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          ممکن است آدرس تغییر کرده باشد. از مسیرهای زیر ادامه دهید یا با ابزار تشخیص اتوماسیون شروع کنید.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
          >
            <Home className="h-4 w-4" />
            صفحه اصلی
          </Link>
          <Link
            href="/automation-check"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
          >
            <ClipboardCheck className="h-4 w-4" />
            تشخیص رایگان اتوماسیون
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <Link href="/services" className="hover:text-cyan-300">
            خدمات
          </Link>
          <Link href="/projects" className="hover:text-cyan-300">
            نمونه‌کارها
          </Link>
          <Link href="/pricing" className="hover:text-cyan-300">
            تعرفه‌ها
          </Link>
          <Link href="/contact" className="hover:text-cyan-300">
            تماس
          </Link>
        </div>
      </div>
    </main>
  );
}
