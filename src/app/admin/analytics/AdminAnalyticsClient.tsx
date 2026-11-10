"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Eye,
  Users,
  Smartphone,
  Monitor,
  TrendingUp,
  RefreshCw,
  Lock,
  LogOut,
  ExternalLink,
  Calendar,
  Globe,
  Compass,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

type AnalyticsData = {
  totalPageViews: number;
  todayPageViews: number;
  uniqueVisitorsCount: number;
  todayUniqueVisitorsCount: number;
  mobilePercentage: number;
  topPages: { path: string; title: string; count: number; percentage: number }[];
  topReferrers: { label: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; label: string; count: number; percentage: number }[];
  browserBreakdown: { browser: string; count: number; percentage: number }[];
  recentVisits: {
    id: string;
    path: string;
    title: string;
    device: "mobile" | "desktop" | "tablet";
    browser: string;
    referrerSource: string;
    timeAgo: string;
    timestamp: number;
  }[];
};

const STORAGE_KEY = "webnovo_admin_token";

export default function AdminAnalyticsClient() {
  const [token, setToken] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [data, setData] = useState<AnalyticsData | null>(null);

  const refreshData = async (authToken: string) => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/site-analytics", {
        headers: { "x-admin-token": authToken },
      });
      if (res.status === 401) {
        setIsAuthenticated(false);
        sessionStorage.removeItem(STORAGE_KEY);
        setAuthError("رمز عبور یا توکن نادرست است");
        setData(null);
      } else if (res.ok) {
        const json = await res.json();
        if (json.ok && json.data) {
          setData(json.data);
          setIsAuthenticated(true);
          setAuthError(null);
        }
      }
    } catch {
      setAuthError("خطا در برقراری ارتباط با سرور");
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function checkAuth() {
      const savedToken = typeof window !== "undefined" ? sessionStorage.getItem(STORAGE_KEY) : null;
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/site-analytics", {
          headers: { "x-admin-token": savedToken },
        });
        if (ignore) return;
        if (res.status === 401) {
          sessionStorage.removeItem(STORAGE_KEY);
          setAuthError("رمز عبور یا توکن نادرست است");
        } else if (res.ok) {
          const json = await res.json();
          if (json.ok && json.data) {
            setData(json.data);
            setToken(savedToken);
            setIsAuthenticated(true);
            setAuthError(null);
          }
        }
      } catch {
        if (!ignore) setAuthError("خطا در برقراری ارتباط با سرور");
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    void checkAuth();
    return () => {
      ignore = true;
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputToken.trim()) return;

    setIsLoading(true);
    setAuthError(null);

    try {
      const verifyRes = await fetch("/api/site-analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: inputToken.trim() }),
      });
      const verifyJson = await verifyRes.json();

      if (verifyJson.valid) {
        sessionStorage.setItem(STORAGE_KEY, inputToken.trim());
        setToken(inputToken.trim());
        setIsAuthenticated(true);
        await refreshData(inputToken.trim());
      } else {
        setAuthError("رمز عبور نامعتبر است. لطفاً توکن مدیریتی معتبر وارد کنید.");
      }
    } catch {
      setAuthError("خطا در بررسی رمز عبور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setToken("");
    setIsAuthenticated(false);
    setData(null);
  };

  // صفحه ورود برای حالت محافظت‌شده
  if (!isAuthenticated && !isLoading) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black text-white">ورود به داشبورد مدیریت آمار</h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              این بخش اختصاصی و محرمانه است. برای مشاهده آمار بازدیدها و رفتار کاربران، توکن مدیریتی را وارد کنید.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs text-center">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                توکن مدیریتی یا رمز عبور:
              </label>
              <input
                type="password"
                value={inputToken}
                onChange={(e) => setInputToken(e.target.value)}
                placeholder="رمز عبور مدیریت..."
                dir="ltr"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>ورود به پنل آمار</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 text-center space-y-1">
            <p>توکن پیش‌فرض: <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">webnovo-admin-2026</code></p>
            <p className="text-slate-500">(یا مقدار متغیر <code className="text-slate-400">LEADS_ADMIN_TOKEN</code> در Vercel)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* سربرگ داشبورد */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">داشبورد اختصاصی آمار بازدید نوین وب</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            ردیابی لحظه‌ای بازدیدها، صفحات محبوب، کانال‌های ورودی و دستگاه‌های کاربران
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ردیاب داخلی فعال
          </div>

          <button
            onClick={() => refreshData(token)}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-slate-600 transition-colors text-xs flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-cyan-400" : ""}`} />
            <span>به‌روزرسانی</span>
          </button>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-800 transition-colors"
            title="خروج از پنل"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* کارت‌های شاخص‌های کلیدی (KPIs) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>کل بازدیدها</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono-num">
            {data ? data.totalPageViews.toLocaleString("fa-IR") : "—"}
          </div>
          <p className="text-[11px] text-slate-400">مجموع نمایش صفحات ثبت‌شده</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>بازدیدهای امروز</span>
            <Calendar className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono-num">
            {data ? data.todayPageViews.toLocaleString("fa-IR") : "—"}
          </div>
          <p className="text-[11px] text-slate-400">از ساعت ۰۰:۰۰ بامداد امروز</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>بازدیدکنندگان یکتا</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-300 font-mono-num">
            {data ? data.uniqueVisitorsCount.toLocaleString("fa-IR") : "—"}
          </div>
          <p className="text-[11px] text-slate-400">کاربران مجزا بدون ذخیره هویت</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>سهم موبایل</span>
            <Smartphone className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono-num">
            {data ? `${data.mobilePercentage.toLocaleString("fa-IR")}٪` : "—"}
          </div>
          <p className="text-[11px] text-slate-400">ترافیک ورودی از تلفن‌های هوشمند</p>
        </div>
      </section>

      {/* بخش‌های تحلیلی دو ستونه */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* پربازدیدترین صفحات */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              <span>پربازدیدترین صفحات سایت</span>
            </h2>
            <span className="text-xs text-slate-400">۱۰ صفحه برتر</span>
          </div>

          <div className="space-y-4">
            {data && data.topPages.length > 0 ? (
              data.topPages.map((page) => (
                <div key={page.path} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200 truncate max-w-[240px] sm:max-w-[320px]">
                      {page.title}
                    </span>
                    <div className="flex items-center gap-2 font-mono-num">
                      <span className="text-cyan-400 font-bold">{page.count.toLocaleString("fa-IR")}</span>
                      <span className="text-slate-400 text-[11px]">({page.percentage}٪)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700"
                      style={{ width: `${Math.max(page.percentage, 4)}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono" dir="ltr">
                    {page.path}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">هنوز بازدیدی برای نمایش ثبت نشده است.</p>
            )}
          </div>
        </section>

        {/* مراجع ورودی و ترافیک */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span>منابع ورودی و مراجع ترافیک (Referrers)</span>
            </h2>
            <span className="text-xs text-slate-400">کانال‌های جذب</span>
          </div>

          <div className="space-y-4">
            {data && data.topReferrers.length > 0 ? (
              data.topReferrers.map((ref) => (
                <div key={ref.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{ref.label}</span>
                    <div className="flex items-center gap-2 font-mono-num">
                      <span className="text-indigo-400 font-bold">{ref.count.toLocaleString("fa-IR")}</span>
                      <span className="text-slate-400 text-[11px]">({ref.percentage}٪)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-700"
                      style={{ width: `${Math.max(ref.percentage, 4)}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">منبع ورودی ثبت نشده است.</p>
            )}
          </div>
        </section>
      </div>

      {/* دستگاه‌ها و مرورگرها */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>تفکیک دستگاه‌های کاربران</span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {data?.deviceBreakdown.map((d) => (
              <div key={d.device} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                <span className="text-xs text-slate-400 block">{d.label}</span>
                <span className="text-lg font-black text-white font-mono-num">{d.count.toLocaleString("fa-IR")}</span>
                <span className="text-[10px] text-cyan-400 block font-mono-num">{d.percentage}٪</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Monitor className="w-4 h-4 text-indigo-400" />
            <span>مرورگرهای کاربران</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {data?.browserBreakdown.map((b) => (
              <div key={b.browser} className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-xs">
                <span className="text-slate-300">{b.browser}</span>
                <span className="text-indigo-400 font-bold font-mono-num">{b.count.toLocaleString("fa-IR")}</span>
                <span className="text-[10px] text-slate-400">({b.percentage}٪)</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* لاگ زنده آخرین بازدیدها */}
      <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <span>آخرین بازدیدهای زنده (Live Feed)</span>
          </h2>
          <span className="text-xs text-slate-400">۳۰ رویداد آخر</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="py-3 px-3">زمان</th>
                <th className="py-3 px-3">صفحه بازدیدشده</th>
                <th className="py-3 px-3">دستگاه و مرورگر</th>
                <th className="py-3 px-3">منبع ورود (Referrer)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {data && data.recentVisits.length > 0 ? (
                data.recentVisits.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap">{v.timeAgo}</td>
                    <td className="py-2.5 px-3 text-white font-medium">
                      <div className="flex flex-col">
                        <span>{v.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono" dir="ltr">{v.path}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 whitespace-nowrap">
                      {v.device === "mobile" ? "📱 موبایل" : v.device === "tablet" ? "📟 تبلت" : "💻 دسکتاپ"} ({v.browser})
                    </td>
                    <td className="py-2.5 px-3 text-cyan-300 whitespace-nowrap">{v.referrerSource}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    هنوز بازدیدی برای نمایش ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* بخش راهنمای فعال‌سازی Vercel Web Analytics */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-l from-indigo-950/40 via-slate-900 to-cyan-950/30 border border-cyan-800/40 space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>پکیج رسمی Vercel Analytics در سایت فعال شد</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              مشاهده آمار پیشرفته ورسل (Vercel Web Analytics)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              علاوه بر این داشبورد داخلی، پکیج رسمی <code className="text-cyan-300 bg-slate-950 px-1.5 py-0.5 rounded">@vercel/analytics</code> نیز روی کل صفحات سایت فعال شد. برای مشاهده نمودارهای پیشرفته، نقشه جغرافیایی و سرعت صفحات در ورسل:
            </p>
            <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1 pr-2">
              <li>به داشبورد ورسل پروژه بروید: <a href="https://vercel.com/rezasabzi6367-3403/bot-company" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">پروژه bot-company در Vercel</a></li>
              <li>تب <strong>Analytics</strong> را از منوی بالای پروژه انتخاب کنید.</li>
              <li>دکمه آبی <strong>Enable Web Analytics</strong> را بزنید تا فعال شود.</li>
            </ol>
          </div>

          <a
            href="https://vercel.com/rezasabzi6367-3403/bot-company/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-cyan-500/20"
          >
            <span>باز کردن تب Analytics در Vercel</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* بازگشت به سایت */}
      <footer className="text-center pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
        >
          <span>بازگشت به صفحه اصلی سایت</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </main>
  );
}
