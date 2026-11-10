"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

/**
 * مرز خطای سراسری صفحه‌ها: به‌جای صفحه‌ی سفید، پیام انسانی و مسیر بازگشت نشان داده می‌شود.
 */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[webnovo] page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900/70 p-8 text-center shadow-2xl">
        <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-300">
          <AlertTriangle className="h-7 w-7" />
        </span>

        <h1 className="text-xl font-black text-white sm:text-2xl">مشکلی در بارگذاری این بخش پیش آمد</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          اطلاعات شما از بین نرفته است. می‌توانید دوباره تلاش کنید یا به صفحه‌ی اصلی برگردید. اگر مشکل ادامه داشت،
          از طریق تلگرام یا تلفن با تیم نوین وب در تماس باشید.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
            تلاش دوباره
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
          >
            <Home className="h-4 w-4" />
            بازگشت به صفحه اصلی
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          یا{" "}
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
      </div>
    </main>
  );
}
