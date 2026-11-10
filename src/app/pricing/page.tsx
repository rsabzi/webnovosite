import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Server,
  FileCheck2,
  Clock,
  Sparkles,
} from "lucide-react";
import { SUPPORT_POLICY } from "@/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "تعرفه و هزینه ساخت ربات و سیستم‌های اتوماسیون | نوین وب",
  description:
    "هزینه ساخت ربات به نوع ربات، امکانات و اتصال‌هایی که لازم دارد بستگی دارد؛ از ربات‌های تک‌منظوره تا سیستم‌های چندبخشی، با مدل پرداخت مرحله‌ای و شفاف.",
};

const TIERS = [
  {
    id: "starter",
    name: "ربات متمرکز و تک‌منظوره",
    target: "فروشگاه‌های آنلاین، فروشندگان دیجی‌کالا و استارتاپ‌ها",
    price: "از ۳۵ میلیون تومان",
    deliveryTime: "۵ تا ۱۰ روز کاری",
    description:
      "مناسب برای اتوماسیون یک فرایند حیاتی خاص مثل ربات مانیتورینگ قیمت ترب، ربات اختصاصی تلگرام یا اسکرپینگ یک وبسایت مشخص.",
    features: [
      "توسعه ربات اختصاصی با پایتون / Node.js",
      "استقرار اولیه روی سرور ابری ایران یا هاست شما",
      "کانفیگ ربات تلگرام هشدار و نوتیفیکیشن",
      "سیستم مدیریت پروکسی و عبور از کپچا",
      `${SUPPORT_POLICY.planPeriodsFa.starter} گارانتی رفع ایراد و پشتیبانی فنی طبق دامنه‌ی قرارداد`,
      "مالکیت کامل سورس‌کد پروژه",
    ],
    popular: false,
    cta: "سفارش این پلن",
  },
  {
    id: "growth",
    name: "یکپارچه‌سازی دو یا چند سیستم",
    target: "شرکت‌های بازرگانی، فروشگاه‌های در حال رشد و پخش مویرگی",
    price: "از ۶۵ میلیون تومان",
    deliveryTime: "۱۵ تا ۲۵ روز کاری",
    description:
      "محبوب‌ترین پلن برای اتصال دو سیستم ناهمگون؛ مثلاً اتصال خودکار فروشگاه اینترنتی و دیدار CRM به دیتابیس حسابداری سپیدار یا هلو.",
    features: [
      "اتصال دیتابیس SQL Server سپیدار / هلو / همکاران",
      "صدور خودکار حواله خروج انبار و فاکتور فروش رسمی",
      "همگام‌سازی لحظه‌ای موجودی و قیمت در کلیه کانال‌ها",
      "پنل وب اختصاصی جهت مشاهده لاگ‌ها و مدیریت سیستم",
      "سیستم Retry خودکار و صف‌بندی هوشمند رخدادها",
      `${SUPPORT_POLICY.planPeriodsFa.growth} گارانتی رفع ایراد و پشتیبانی فنی طبق دامنه‌ی قرارداد`,
      "جلسه آموزش حضوری یا آنلاین برای پرسنل شرکت",
      "امکان عقد قرارداد رسمی محرمانگی (NDA)",
    ],
    popular: true,
    cta: "انتخاب پلن یکپارچه‌سازی",
  },
  {
    id: "enterprise",
    name: "سیستم‌های چندبخشی و مقیاس بالا",
    target: "مجموعه‌هایی که چند سیستم و فرایند را همزمان می‌خواهند متصل و خودکار کنند",
    price: "سفارشی (بر اساس RFP)",
    deliveryTime: "بر اساس فازبندی چابک",
    description:
      "ترکیب چند سیستم با هم: هوش مصنوعی اختصاصی، خواندن اسناد مالی، اتوماسیون دسکتاپ و زیرساخت توزیع‌شده؛ با سطح خدمات توافقی در قرارداد.",
    features: [
      "معماری توزیع‌شده چندسروری؛ ظرفیت و مقیاس‌پذیری بر اساس بار واقعی پروژه طراحی می‌شود",
      "سیستم هوش مصنوعی OCR اختصاصی پردازش فاکتور و فیش",
      "استقرار ایزوله در شبکه محلی شرکت (On-Premises)",
      "تعهد آپ‌تایم و سطح خدمات (SLA) مطابق قرارداد پروژه",
      "کانال پشتیبانی اختصاصی با زمان پاسخ‌گویی توافق‌شده در SLA",
      "یکپارچه‌سازی با سامانه مودیان و درگاه‌های پرداخت",
      `${SUPPORT_POLICY.planPeriodsFa.enterprise} گارانتی رفع ایراد و پشتیبانی فنی طبق دامنه‌ی قرارداد`,
      "بازبینی امنیتی کد و در صورت توافق، تست نفوذ پیش از استقرار",
    ],
    popular: false,
    cta: "گفت‌وگو درباره پروژه بزرگ",
  },
];

export default function PricingPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>مدل‌های همکاری شفاف و بدون هزینه‌های مخفی</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            سرمایه‌گذاری روی اتوماسیون، نه هزینه جاری
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            پرداخت در نوین وب متناسب با پیشرفت فازهای عملیاتی و تحویل دمو صورت می‌گیرد تا با آرامش کامل روند پیشرفت سیستم را ارزیابی کنید.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                tier.popular
                  ? "bg-slate-900/90 border-2 border-cyan-500 shadow-2xl shadow-cyan-500/15 lg:-translate-y-2"
                  : "bg-slate-900/70 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-1/2 translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-md">
                  محبوب‌ترین مدل همکاری
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{tier.target}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <span className="text-xs text-slate-400 block">برآورد هزینه پایه:</span>
                  <div className="text-2xl font-black text-cyan-400 mt-0.5">{tier.price}</div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>مدت تحویل تخمینی: {tier.deliveryTime}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{tier.description}</p>

                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    امکانات شامل‌شده در این پلن:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-800">
                <Link
                  href={`/contact?plan=${tier.id}`}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20"
                      : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* پیام شفاف برای پروژه‌های کوچک */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6 sm:flex-row sm:p-8">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
            هزینه ساخت به نوع ربات، امکانات و اتصال‌هایی که لازم دارد بستگی دارد؛ پروژه‌های ساده و
            تک‌منظوره تا سیستم‌های اختصاصی را متناسب با نیاز تعریف می‌کنیم. اگر یک کار مشخص و کوچک
            (اسکریپت، اتصال API، ربات ساده، استخراج داده…) دارید، از مسیر کوتاه «پروژه کوچک» شروع کنید؛
            اگر هنوز ایده‌ی شکل‌نگرفته دارید، «ایده من» جای درستی است. قیمت نهایی فقط بعد از روشن‌شدن
            محدوده‌ی کار اعلام می‌شود، نه قبل از آن.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog/telegram-bot-cost"
              className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap"
            >
              راهنمای هزینه ساخت ربات ←
            </Link>
            <Link
              href="/small-project"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95 sm:text-sm"
            >
              شروع پروژه کوچک
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/idea"
              className="text-xs text-slate-300 hover:text-white transition-colors whitespace-nowrap underline underline-offset-4 decoration-slate-600"
            >
              ایده دارید؟ از «ایده من» شروع کنید
            </Link>
          </div>
        </div>

        {/* Payment Terms & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-3">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">پرداخت مرحله‌ای بر اساس پیشرفت کار</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              ۴۰٪ پیش‌پرداخت همزمان با عقد قرارداد، ۴۰٪ پس از تحویل دمو و تست در محیط Sandbox، و ۲۰٪ نهایی پس از استقرار کامل روی سرور شما.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">گارانتی انطباق با مشخصات فنی پروپوزال</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              اگر سیستم تحویل‌شده با مشخصات فنی تأییدشده در پروپوزال مطابقت نداشته باشد، ابتدا فرصت اصلاح
              می‌دهیم؛ اگر عدم انطباق برطرف نشد، مبالغ پرداختیِ مربوط به همان بخش طبق شرایط قرارداد
              بازگردانده می‌شود.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">قرارداد رسمی با فاکتور معتبر</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              امکان انعقاد قرارداد رسمی شرکتی با شناسه ملی و صدور صورت‌حساب رسمی قابل ثبت در سامانه‌های مالیاتی برای کسب‌وکارهایی که به سند رسمی نیاز دارند.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
