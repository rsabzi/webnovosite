import type { Metadata } from "next";
import InteractiveRoiCalculator from "@/components/InteractiveRoiCalculator";
import AutomationCheckCta from "@/components/AutomationCheckCta";
import {
  Coins,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  Clock,
  Users,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "/calculator" },
  title: "محاسبه‌گر هوشمند صرفه‌جویی مالی و ROI اتوماسیون | نوین وب",
  description:
    "با ابزار آنلاین نوین وب، برآورد اولیه‌ای از هزینه تلف‌شده در کارهای تکراری (اکسل، فاکتور سپیدار، ترب و پشتیبانی) و دوره تقریبی بازگشت سرمایه سیستم اتوماسیون بگیرید.",
};

export default function CalculatorPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Coins className="w-3.5 h-3.5" />
            <span>ابزار برآورد مالی و بازگشت سرمایه اختصاصی</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            کارهای دستی چقدر به کسب‌وکار شما خسارت مالی می‌زنند؟
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            برآورد شفاف ساعت‌های تلف‌شده روی کارهای تکراری و مدت تقریبی بازگشت سرمایه اتوماسیون، بر اساس اطلاعاتی که خودتان وارد می‌کنید؛ عددها تخمین اولیه‌اند، نه وعده قطعی.
          </p>
        </div>

        {/* Embedded Calculator */}
        <InteractiveRoiCalculator showTitle={false} />

        {/* Deep Explanation of Hidden Costs */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              هزینه‌های پنهانی کارهای دستی که در فیش حقوقی دیده نمی‌شوند
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              تنها هزینه پرداخت حقوق نیست؛ خطای انسانی و تاخیرهای سیستمی عامل اصلی از دست رفتن فروش و مشتری هستند:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">از دست رفتن موقعیت‌های فروش لحظه‌ای</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                وقتی قیمت رقیب در ترب پایین می‌آید یا مشتری در تلگرام سوال می‌کند، هر دقیقه تاخیر در پاسخ یا به‌روزرسانی، احتمال از دست رفتن همان مشتری را بالا می‌برد.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">جرایم و خسارت لغو سفارش</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                عدم تطابق لحظه‌ای موجودی انبار سپیدار با پنل دیجی‌کالا یا وب‌سایت باعث فروش کالایی می‌شود که در انبار نیست؛ نتیجه: جریمه دیجی‌کالا و امتیاز منفی فروشنده.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">فرسودگی شغلی و جابجایی بالای نیرو</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                نیروهای بااستعداد علاقه‌ای به کپی‌پیست روزانه ۴ ساعت اکسل ندارند. کارهای تکراری انگیزه را می‌کشد و شرکت را مجبور به استخدام و آموزش مکرر پرسنل می‌کند.
              </p>
            </div>
          </div>
        </div>

        {/* Why Payback is so fast */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border border-cyan-800/40 space-y-4">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <Zap className="w-4 h-4" />
            <span>چرا بازگشت سرمایه اتوماسیون معمولاً سریع‌تر از استخدام نیروی جدید است؟</span>
          </div>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            بر خلاف استخدام پرسنل که هزینه‌ای مداوم، ماهانه و افزایشی (با عیدی، سنوات و بیمه) است، هزینه ساخت سیستم اتوماسیون یک‌بار انجام می‌شود و سیستم بدون مرخصی و اضافه‌کاری کار می‌کند. البته هزینه‌های جانبی مثل نگهداری و سرور را هم باید در نظر بگیرید؛ بازگشت سرمایه واقعی به همین عوامل و حجم عملیات شما بستگی دارد و برآورد دقیق‌تر آن را در گفت‌وگوی اولیه انجام می‌دهیم.
          </p>
        </div>

        {/* قدم بعدی: تشخیص اینکه از کجا شروع شود */}
        <AutomationCheckCta
          compact
          location="calculator_page"
          title="عددهای صرفه‌جویی را دیدید؛ حالا ببینید کدام فرایند اول قابل اتوماسیون است"
        />
      </div>
    </main>
  );
}
