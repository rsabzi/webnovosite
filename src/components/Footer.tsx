import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { SUPPORT_POLICY } from "@/data/site";
import {
  ShieldCheck,
  Headphones,
  FileCheck2,
  Server,
  Phone,
  Mail,
  MapPin,
  Send,
  ArrowUpLeft,
  Code2,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[var(--bg-deep)] text-slate-300 relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      {/* Trust Guarantees Bar */}
      <div className="border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">قرارداد رسمی NDA</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  قرارداد محرمانگی (NDA) پیش از هر دسترسی فنی؛ دسترسی و داده‌ها تحت همان توافق مدیریت می‌شود.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">استقرار روی سرور شما</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  استقرار روی سرور یا شبکه داخلی شما و انتقال مالکیت کد و مستندات در پایان پروژه.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{SUPPORT_POLICY.boxTitleFa}</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {SUPPORT_POLICY.boxTextFa}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">پایش و آلرت خطا (در چارچوب قرارداد)</h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  هشدار خودکار تلگرامی/پیامکی هنگام توقف ربات یا خطای پردازش؛ سطح پایش ۲۴/۷ در قرارداد تعیین می‌شود.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[var(--bg-surface)] rounded-[11px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo-webnovo.png"
                    alt="لوگوی نوین وب"
                    width={32}
                    height={32}
                    className="w-7 h-7 object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="text-lg font-black text-white">نوین وب</span>
                <span className="mr-2 text-xs font-mono-num text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
                  webnovo
                </span>
                <p className="text-xs text-slate-400">طراحی ربات، ابزار و سیستم‌های اتوماسیون برای کسب‌وکارها</p>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              نوین وب به مدیران کسب‌وکار، فروشگاه‌ها، تولیدکنندگان و استارتاپ‌ها کمک می‌کند تا
              فرایندهای زمان‌بر و خطای انسانی را با سیستم‌های اتوماسیون اختصاصی، ربات‌های مانیتورینگ
              قیمت، وب اسکرپینگ و یکپارچه‌سازی نرم‌افزارهای حسابداری و CRM به حداقل برسانند.
            </p>

            {/* Direct Contact info */}
            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>تلفن تماس مستقیم: </span>
                <a href="tel:09165486367" className="text-white hover:text-cyan-300 font-mono-num font-semibold">
                  ۰۹۱۶۵۴۸۶۳۶۷
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>تلگرام پشتیبانی و سفارش پروژه: </span>
                <a
                  href="https://t.me/Webnovobot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono-num"
                >
                  @Webnovobot
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>ایمیل: </span>
                <a href="mailto:rsabzi714@gmail.com" className="text-white hover:text-cyan-300 font-mono-num">
                  rsabzi714@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>گیت‌هاب: </span>
                <a
                  href="https://github.com/rsabzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline font-mono-num"
                >
                  @rsabzi
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  ایران — همکاری دورکار با کارفرمایان داخل و خارج از کشور
                </span>
              </div>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              خدمات اتوماسیون
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/services/telegram-bot" className="hover:text-cyan-300 transition-colors">
                  طراحی ربات تلگرام
                </Link>
              </li>
              <li>
                <Link href="/services/sales-bot" className="hover:text-cyan-300 transition-colors">
                  ربات فروش و ثبت سفارش
                </Link>
              </li>
              <li>
                <Link href="/services/appointment-bot" className="hover:text-cyan-300 transition-colors">
                  ربات نوبت‌دهی و رزرو
                </Link>
              </li>
              <li>
                <Link href="/services/whatsapp-bot" className="hover:text-cyan-300 transition-colors">
                  ربات واتساپ
                </Link>
              </li>
              <li>
                <Link href="/services/price-monitoring" className="hover:text-cyan-300 transition-colors">
                  ربات قیمت و وب اسکرپینگ
                </Link>
              </li>
              <li>
                <Link href="/services/ocr" className="hover:text-cyan-300 transition-colors">
                  OCR فاکتور و فیش بانکی
                </Link>
              </li>
              <li>
                <Link href="/services/trading-bot" className="hover:text-cyan-300 transition-colors">
                  ربات ترید و ارز دیجیتال
                </Link>
              </li>
              <li>
                <Link href="/services" className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
                  همه‌ی خدمات ←
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/small-project" className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
                  پروژه کوچک — برای یک کار مشخص و محدود
                </Link>
              </li>
              <li>
                <Link href="/idea" className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
                  ایده من — ایده‌ی شما را مطرح کنید
                </Link>
              </li>
              <li>
                <Link href="/automation-check" className="font-semibold text-cyan-300 hover:text-cyan-200 transition-colors">
                  بررسی رایگان اتوماسیون
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-cyan-300 transition-colors">
                  نمونه‌کارها ({PROJECTS.length.toLocaleString("fa-IR")} پروژه واقعی)
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-cyan-300 transition-colors">
                  مطالعات موردی و نتایج
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-300 transition-colors">
                  سوالات پرتکرار کارفرمایان
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-300 transition-colors">
                  بلاگ و راهنمای سفارش
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-cyan-300 transition-colors">
                  محاسبه‌گر آنلاین سود سرمایه‌گذاری
                </Link>
              </li>
              <li>
                <Link href="/live-demo" className="hover:text-cyan-300 transition-colors">
                  کنسول شبیه‌ساز زنده ربات‌ها
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-cyan-300 transition-colors">
                  تعرفه‌ها و بسته‌های همکاری
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition-colors">
                  درباره متدولوژی و امنیت ما
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-300 transition-colors">
                  درخواست جلسه و آنالیز اختصاصی
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Real Platforms Connected */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              پلتفرم‌های تحت پشتیبانی
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                "سپیدار سیستم",
                "نرم‌افزار هلو",
                "دیدار CRM",
                "پیام‌گستر",
                "دیجی‌کالا",
                "ترب",
                "ایمالز",
                "باسلام",
                "سامانه مودیان",
                "تلگرام",
                "بله",
                "ایتا",
                "کاوه‌نگار",
                "زرین‌پال",
                "ووکامرس",
                "اکسل و گوگل‌شیت",
                "پایتون FastAPI",
                "داکر و n8n",
              ].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} تمامی حقوق مادی و معنوی متعلق به گروه مهندسی{" "}
            <span className="text-slate-300 font-semibold">نوین وب (Webnovo)</span> است.
            <span className="mx-2 text-slate-700">|</span>
            <Link href="/privacy" className="text-slate-400 hover:text-white">
              حریم خصوصی
            </Link>
            <span className="mx-2 text-slate-700">|</span>
            <Link href="/terms" className="text-slate-400 hover:text-white">
              قوانین و مقررات
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1 text-slate-400">
              <Clock className="w-3.5 h-3.5 text-cyan-400" /> پاسخ‌گویی: شنبه تا پنج‌شنبه، ۹ تا ۲۰
            </span>
            <Link href="/idea" className="text-slate-400 hover:text-white flex items-center gap-1">
              ایده‌ام را مطرح می‌کنم <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
            <Link href="/contact" className="text-slate-400 hover:text-white flex items-center gap-1">
              ثبت پروژه جدید <ArrowUpLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
