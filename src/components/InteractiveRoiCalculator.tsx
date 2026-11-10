"use client";

import { useState, useMemo } from "react";
import {
  Calculator,
  TrendingUp,
  Clock,
  Coins,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Users,
  ShieldAlert,
  Loader2,
} from "lucide-react";

interface Props {
  showTitle?: boolean;
  compact?: boolean;
}

export default function InteractiveRoiCalculator({ showTitle = true, compact = false }: Props) {
  const [staffCount, setStaffCount] = useState<number>(3);
  const [wastedHoursPerDay, setWastedHoursPerDay] = useState<number>(3);
  const [avgMonthlySalary, setAvgMonthlySalary] = useState<number>(25); // In Million Tomans
  const [errorRiskPercent, setErrorRiskPercent] = useState<number>(15);

  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Calculations
  const stats = useMemo(() => {
    // 22 working days per month in Iran
    const monthlyWorkingDays = 22;
    const totalWastedHoursPerMonth = staffCount * wastedHoursPerDay * monthlyWorkingDays;
    // Hourly rate in Tomans (160 standard working hours per month)
    const hourlyRateTomans = (avgMonthlySalary * 1_000_000) / 160;
    const directWastedSalaryMonthly = totalWastedHoursPerMonth * hourlyRateTomans;
    const errorRiskCostMonthly = directWastedSalaryMonthly * (errorRiskPercent / 100);
    const totalMonthlyWaste = directWastedSalaryMonthly + errorRiskCostMonthly;
    const totalAnnualWaste = totalMonthlyWaste * 12;

    // Typical one-time automation cost estimate for this team scale
    const estimatedProjectCost = Math.max(35_000_000, staffCount * 18_000_000);
    // Payback period in months
    const paybackMonths = Math.max(0.8, Number((estimatedProjectCost / totalMonthlyWaste).toFixed(1)));

    return {
      totalWastedHoursPerMonth: Math.round(totalWastedHoursPerMonth),
      totalMonthlyWaste: Math.round(totalMonthlyWaste),
      totalAnnualWaste: Math.round(totalAnnualWaste),
      paybackMonths,
      estimatedProjectCost: Math.round(estimatedProjectCost),
    };
  }, [staffCount, wastedHoursPerDay, avgMonthlySalary, errorRiskPercent]);

  const handleSaveCalculation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staffCount,
          wastedHoursPerWeek: wastedHoursPerDay * 5,
          avgMonthlySalaryTomans: avgMonthlySalary * 1_000_000,
          estimatedMonthlySavingTomans: stats.totalMonthlyWaste,
          companyName,
          phoneNumber,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTomans = (amount: number) => {
    if (amount >= 1_000_000_000) {
      return `${(amount / 1_000_000_000).toFixed(1)} میلیارد تومان`;
    }
    return `${Math.round(amount / 1_000_000).toLocaleString("fa-IR")} میلیون تومان`;
  };

  return (
    <div className="w-full">
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>محاسبه‌گر هوشمند بازگشت سرمایه (ROI)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            کارهای دستی چقدر از بودجه ماهانه کسب‌وکار شما را هدر می‌دهند؟
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            با تنظیم اسلایدرهای زیر برآورد اولیه‌ای از ارزش مالی اتوماسیون و دوره تقریبی بازگشت سرمایه بر اساس
            اطلاعات واردشده می‌بینید؛ این عددها تخمین‌اند، نه وعده قطعی.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          {/* Slider 1: Staff count */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="staff-count" className="font-semibold text-slate-200 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                تعداد کارمندان درگیر با کارهای تکراری:
              </label>
              <span className="font-mono-num font-bold text-base px-3 py-0.5 rounded-lg bg-cyan-950 border border-cyan-800/60 text-cyan-300">
                {staffCount} نفر
              </span>
            </div>
            <input
              id="staff-count"
              type="range"
              min="1"
              max="25"
              step="1"
              value={staffCount}
              onChange={(e) => setStaffCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-xs text-slate-400">
              (پرسنل ثبت فاکتور در سپیدار، آپدیت قیمت ترب، ورود دستی اکسل، پاسخگویی به چت‌ها)
            </p>
          </div>

          {/* Slider 2: Daily wasted hours */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="wasted-hours" className="font-semibold text-slate-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                زمان تلف‌شده هر فرد در روز روی امور روتین:
              </label>
              <span className="font-mono-num font-bold text-base px-3 py-0.5 rounded-lg bg-blue-950 border border-blue-800/60 text-blue-300">
                {wastedHoursPerDay} ساعت
              </span>
            </div>
            <input
              id="wasted-hours"
              type="range"
              min="1"
              max="7"
              step="0.5"
              value={wastedHoursPerDay}
              onChange={(e) => setWastedHoursPerDay(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
            />
            <p className="text-xs text-slate-400">
              (کپی‌پیست اکسل، صدور حواله، بررسی رسیدهای بانکی، همگام‌سازی موجودی دیجی‌کالا)
            </p>
          </div>

          {/* Slider 3: Average salary */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="avg-salary" className="font-semibold text-slate-200 flex items-center gap-2">
                <Coins className="w-4 h-4 text-emerald-400" />
                میانگین حقوق ناخالص ماهانه هر نیرو (با بیمه و مزایا):
              </label>
              <span className="font-mono-num font-bold text-base px-3 py-0.5 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-300">
                {avgMonthlySalary} م.تومان
              </span>
            </div>
            <input
              id="avg-salary"
              type="range"
              min="12"
              max="60"
              step="1"
              value={avgMonthlySalary}
              onChange={(e) => setAvgMonthlySalary(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Slider 4: Risk of manual error */}
          <div className="space-y-3 pt-3 border-t border-slate-800/80">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="error-risk" className="font-semibold text-slate-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                هزینه تخمینی خطاهای انسانی و تأخیرها:
              </label>
              <span className="font-mono-num font-bold text-base px-3 py-0.5 rounded-lg bg-amber-950 border border-amber-800/60 text-amber-300">
                {errorRiskPercent}٪ اضافه
              </span>
            </div>
            <input
              id="error-risk"
              type="range"
              min="5"
              max="40"
              step="5"
              value={errorRiskPercent}
              onChange={(e) => setErrorRiskPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
            <p className="text-xs text-slate-400">
              (جریمه تأخیر دیجی‌کالا، عدم تطابق موجودی انبار، سفارشات لغو شده، خطای قیمت‌گذاری)
            </p>
          </div>
        </div>

        {/* Results & Action Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-[var(--bg-elevated)] border-2 border-cyan-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider">
              خلاصه بازدهی اقتصادی اتوماسیون
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              بازگشت برآوردی در حدود {stats.paybackMonths} ماه
            </span>
          </div>

          <div className="py-6 space-y-6">
            {/* Big Stat: Annual Savings */}
            <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/50">
              <span className="text-xs text-slate-300 font-medium">برآورد ارزش صرفه‌جویی سالانه:</span>
              <div className="mt-1 text-2xl sm:text-3xl font-black text-cyan-300 font-mono-num">
                {formatTomans(stats.totalAnnualWaste)}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                معادل {formatTomans(stats.totalMonthlyWaste)} در هر ماه؛ عددی تخمینی که صرفه‌جویی واقعی به
                میزان اتوماتیک‌شدن فرایندها بستگی دارد.
              </p>
            </div>

            {/* Metric Grids */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-xs text-slate-400 block mb-1">زمان آزاد شده ماهانه:</span>
                <span className="text-lg font-bold text-white font-mono-num">
                  {stats.totalWastedHoursPerMonth.toLocaleString("fa-IR")} ساعت
                </span>
                <span className="text-[11px] text-emerald-400 block mt-0.5">برای تمرکز بر فروش</span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
                <span className="text-xs text-slate-400 block mb-1">دوره بازگشت برآوردی:</span>
                <span className="text-lg font-bold text-emerald-300 font-mono-num">
                  حدود {stats.paybackMonths} ماه
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">برآورد اولیه، نه تضمین</span>
              </div>
            </div>

            <p className="text-[11px] leading-relaxed text-slate-500 border-t border-dashed border-slate-800 pt-3">
              این عدد یک تخمین اولیه بر اساس اطلاعات واردشده است و نتیجه واقعی می‌تواند متفاوت باشد؛ به شرایط
              کسب‌وکار، حجم عملیات و نحوه اجرا بستگی دارد.
            </p>

            {/* Lead capture form */}
            {!submitted ? (
              <form onSubmit={handleSaveCalculation} className="mt-4 pt-4 border-t border-slate-800/80 space-y-3">
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  می‌خواهید سناریوی اتوماسیون اختصاصی و برآورد هزینه متناسب با کسب‌وکار خود را دریافت کنید؟
                </p>
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="نام شرکت یا کسب‌وکار شما"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="شماره همراه مدیر / مسئول فنی (۰۹xxxxxxxxx)"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono-num"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      در حال ثبت و ارسال به مهندسی...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      ثبت درخواست پروژه و تماس مشاور
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-700/60 text-emerald-200 text-xs space-y-1.5 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 font-bold text-sm text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  اطلاعات با موفقیت ثبت شد
                </div>
                <p>
                  درخواست شما ثبت شد؛ سناریوی پیشنهادی متناسب با کسب‌وکار{" "}
                  <strong className="text-white">{companyName}</strong> را برای بررسی برای شما می‌فرستیم.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
