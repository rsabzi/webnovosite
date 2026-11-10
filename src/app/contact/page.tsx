import type { Metadata } from "next";
import Link from "next/link";
import ProjectInquiryForm from "@/components/ProjectInquiryForm";
import { SUPPORT_POLICY } from "@/data/site";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "ثبت پروژه و مشاوره ساخت ربات | نوین وب",
  description:
    "ثبت درخواست ساخت ربات تلگرام، ربات فروش، نوبت‌دهی، پاسخگویی خودکار، وب اسکرپینگ یا سیستم اختصاصی؛ با مشاوره رایگان و برآورد زمان و هزینه.",
};

export default function ContactPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>شروع همکاری و مشاوره بدون تعهد مالی</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            کارهای خسته‌کننده را به ربات‌ها بسپارید
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            فرم زیر را تکمیل کنید؛ پیام شما همان لحظه به تیم نوین وب می‌رسد و حداکثر تا ۲۴ ساعت کاری با سناریوی پیشنهادی، پشته فنی و برآورد زمان پاسخ می‌دهیم.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            دقیق نمی‌دانید چه چیزی لازم دارید؟ اشکالی نیست؛ مسئله‌تان را همین‌جا توضیح بدهید تا درباره‌ی راه‌حل مناسب
            صحبت کنیم. اگر یک کار مشخص و کوچک دارید، مسیر کوتاه{" "}
            <Link
              href="/small-project"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              «پروژه کوچک»
            </Link>{" "}
            سریع‌تر است؛ و اگر هنوز ایده‌ای شکل‌نگرفته دارید، از بخش{" "}
            <Link
              href="/idea"
              className="font-semibold text-cyan-400 hover:text-cyan-300"
            >
              «ایده من»
            </Link>{" "}
            شروع کنید.
          </p>
        </div>

        {/* Content Grid: Form on Right, Contact Details on Left */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <ProjectInquiryForm />
          </div>

          {/* Quick Contact & Office Details */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl backdrop-blur-sm">
              <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Headphones className="w-4 h-4 text-cyan-400" />
                راه‌های ارتباط مستقیم و فوری
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">تماس مستقیم با رضا سبزی:</span>
                    <a
                      href="tel:09165486367"
                      className="text-white hover:text-cyan-300 font-bold font-mono-num text-base block mt-0.5"
                    >
                      ۰۹۱۶۵۴۸۶۳۶۷
                    </a>
                    <span className="text-[11px] text-slate-500 block">پاسخ‌گویی شنبه تا پنج‌شنبه، ۹ تا ۲۰</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">تلگرام مستقیم (سریع‌ترین راه):</span>
                    <a
                      href="https://t.me/Webnovobot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline font-mono-num font-semibold block mt-0.5"
                    >
                      @Webnovobot
                    </a>
                    <span className="text-[11px] text-slate-500 block">سریع‌ترین راه ارتباطی با تیم</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">ایمیل (ارسال RFP و مستندات):</span>
                    <a
                      href="mailto:rsabzi714@gmail.com"
                      className="text-white hover:text-cyan-300 font-mono-num text-xs block mt-0.5"
                    >
                      rsabzi714@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">محل استقرار دفتر فنی:</span>
                    <span className="text-slate-300 text-xs block mt-0.5 leading-relaxed">
                      ایران — همکاری دورکار با کارفرمایان داخل و خارج از کشور؛ جلسات آنلاین و تحویل مرحله‌ای پروژه
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>تعهدات پشتیبانی نوین وب</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>امکان عقد قرارداد رسمی محرمانگی (NDA) پیش از هر دسترسی فنی</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{SUPPORT_POLICY.summaryFa}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>مالکیت کامل سورس‌کد پروژه با شما</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
