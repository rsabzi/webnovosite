"use client";

import { useMemo, useState } from "react";
import { Calculator, CheckCircle2, Clock, Coins, Loader2, ShieldAlert, Sparkles, Users } from "lucide-react";

/** Same estimation formula as the Persian calculator — estimates, not promises. */
export default function EnRoiCalculator() {
  const [staffCount, setStaffCount] = useState(3);
  const [wastedHoursPerDay, setWastedHoursPerDay] = useState(3);
  const [avgMonthlySalary, setAvgMonthlySalary] = useState(25); // million toman
  const [errorRiskPercent, setErrorRiskPercent] = useState(15);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const stats = useMemo(() => {
    const monthlyWorkingDays = 22;
    const totalWastedHoursPerMonth = staffCount * wastedHoursPerDay * monthlyWorkingDays;
    const hourlyRateTomans = (avgMonthlySalary * 1_000_000) / 160;
    const directWastedSalaryMonthly = totalWastedHoursPerMonth * hourlyRateTomans;
    const errorRiskCostMonthly = directWastedSalaryMonthly * (errorRiskPercent / 100);
    const totalMonthlyWaste = directWastedSalaryMonthly + errorRiskCostMonthly;
    const totalAnnualWaste = totalMonthlyWaste * 12;
    const estimatedProjectCost = Math.max(35_000_000, staffCount * 18_000_000);
    const paybackMonths = Math.max(0.8, Number((estimatedProjectCost / totalMonthlyWaste).toFixed(1)));
    return {
      totalWastedHoursPerMonth: Math.round(totalWastedHoursPerMonth),
      totalMonthlyWaste: Math.round(totalMonthlyWaste),
      totalAnnualWaste: Math.round(totalAnnualWaste),
      paybackMonths,
    };
  }, [staffCount, wastedHoursPerDay, avgMonthlySalary, errorRiskPercent]);

  const formatTomans = (amount: number) =>
    amount >= 1_000_000_000
      ? `${(amount / 1_000_000_000).toFixed(1)} billion toman`
      : `${Math.round(amount / 1_000_000).toLocaleString("en-US")} million toman`;

  const handleSave = async (e: React.FormEvent) => {
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
      if (res.ok) setSubmitted(true);
    } catch {
      /* silent — user can retry or contact via Telegram */
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mx-auto mb-10 max-w-3xl text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-300">
          <Calculator className="h-3.5 w-3.5 text-cyan-400" />
          Smart ROI calculator
        </div>
        <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
          How much of your monthly budget do manual tasks waste?
        </h2>
        <p className="mt-3 text-sm text-slate-300 sm:text-base">
          Move the sliders for a first estimate of automation value and the approximate payback
          period. These numbers are estimates, not promises.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl sm:p-8 lg:col-span-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="en-staff" className="flex items-center gap-2 font-semibold text-slate-200">
                <Users className="h-4 w-4 text-cyan-400" />
                Staff doing repetitive work:
              </label>
              <span className="rounded-lg border border-cyan-800/60 bg-cyan-950 px-3 py-0.5 text-base font-bold text-cyan-300">{staffCount}</span>
            </div>
            <input id="en-staff" type="range" min={1} max={25} value={staffCount} onChange={(e) => setStaffCount(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-cyan-400" />
            <p className="text-xs text-slate-400">(invoice entry, price updates, manual Excel work, chat answering)</p>
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="en-hours" className="flex items-center gap-2 font-semibold text-slate-200">
                <Clock className="h-4 w-4 text-blue-400" />
                Wasted hours per person per day:
              </label>
              <span className="rounded-lg border border-blue-800/60 bg-blue-950 px-3 py-0.5 text-base font-bold text-blue-300">{wastedHoursPerDay}h</span>
            </div>
            <input id="en-hours" type="range" min={1} max={7} step={0.5} value={wastedHoursPerDay} onChange={(e) => setWastedHoursPerDay(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-blue-400" />
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="en-salary" className="flex items-center gap-2 font-semibold text-slate-200">
                <Coins className="h-4 w-4 text-emerald-400" />
                Average gross monthly salary (million toman):
              </label>
              <span className="rounded-lg border border-emerald-800/60 bg-emerald-950 px-3 py-0.5 text-base font-bold text-emerald-300">{avgMonthlySalary}M</span>
            </div>
            <input id="en-salary" type="range" min={12} max={60} value={avgMonthlySalary} onChange={(e) => setAvgMonthlySalary(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-400" />
          </div>

          <div className="space-y-3 border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="en-risk" className="flex items-center gap-2 font-semibold text-slate-200">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                Cost of human errors and delays:
              </label>
              <span className="rounded-lg border border-amber-800/60 bg-amber-950 px-3 py-0.5 text-base font-bold text-amber-300">+{errorRiskPercent}%</span>
            </div>
            <input id="en-risk" type="range" min={5} max={40} step={5} value={errorRiskPercent} onChange={(e) => setErrorRiskPercent(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-amber-400" />
            <p className="text-xs text-slate-400">(late penalties, stock mismatches, cancelled orders, pricing errors)</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl sm:p-8 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Economic summary</span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
              ~{stats.paybackMonths} months payback
            </span>
          </div>

          <div className="space-y-6 py-6">
            <div className="rounded-xl border border-cyan-800/50 bg-cyan-950/40 p-4">
              <span className="text-xs font-medium text-slate-300">Estimated annual saving:</span>
              <div className="mt-1 text-2xl font-black text-cyan-300 sm:text-3xl">{formatTomans(stats.totalAnnualWaste)}</div>
              <p className="mt-1 text-xs text-slate-400">
                ≈ {formatTomans(stats.totalMonthlyWaste)} per month; an estimate — real savings depend on how much gets automated.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3.5">
                <span className="mb-1 block text-xs text-slate-400">Monthly hours freed:</span>
                <span className="text-lg font-bold text-white">{stats.totalWastedHoursPerMonth.toLocaleString("en-US")}h</span>
                <span className="mt-0.5 block text-[11px] text-emerald-400">to focus on sales</span>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-slate-800/60 p-3.5">
                <span className="mb-1 block text-xs text-slate-400">Payback period:</span>
                <span className="text-lg font-bold text-emerald-300">~{stats.paybackMonths} mo</span>
                <span className="mt-0.5 block text-[11px] text-slate-400">estimate, not a guarantee</span>
              </div>
            </div>

            <p className="border-t border-dashed border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-500">
              This is a first estimate based on your inputs; actual results vary with your business
              conditions, volumes and implementation.
            </p>

            {!submitted ? (
              <form onSubmit={handleSave} className="space-y-3 border-t border-slate-800/80 pt-4">
                <p className="text-xs font-medium leading-relaxed text-slate-300">
                  Want a custom automation scenario and cost estimate for your business?
                </p>
                <input
                  type="text"
                  required
                  placeholder="Company or business name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  dir="ltr"
                  placeholder="Manager phone (+98 9xx…)"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                  {isSubmitting ? "Sending…" : "Request my project review"}
                </button>
              </form>
            ) : (
              <div className="space-y-1.5 rounded-xl border border-emerald-700/60 bg-emerald-950/60 p-4 text-xs text-emerald-200">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Saved successfully
                </div>
                <p>
                  Your request is registered; we will send the suggested scenario for{" "}
                  <strong className="text-white">{companyName}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
