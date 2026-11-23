"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Database,
  Code2,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Clock,
  Coins,
  ShieldCheck,
  Award,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "همه پروژه‌ها" },
  { id: "marketplace", label: "مارکت‌پلیس و ترب" },
  { id: "accounting", label: "سپیدار، هلو و CRM" },
  { id: "messengers", label: "تلگرام، بله و ایتا" },
  { id: "scraping_ai", label: "اسکرپینگ و هوش مصنوعی" },
];

const CASE_STUDIES = [
  {
    id: "auto-parts-torob",
    category: "marketplace",
    client: "بازرگانی قطعات خودرو پیشتاز",
    field: "پخش و خرده‌فروشی قطعات یدکی خودرو در ترب و دیجی‌کالا",
    challenge:
      "تیم فروش هر روز ساعت‌ها قیمت طیف گسترده‌ای از قطعات را در ترب دستی چک می‌کرد و در پنل فروشندگان دیجی‌کالا و سایت اختصاصی تغییر می‌داد. با هر تغییر قیمت رقیب، تا رسیدن نوبت آپدیت چند ساعت طول می‌کشید و بای‌باکس را از دست می‌دادند. علاوه بر این، چندین بار کالایی که در انبار تمام شده بود به فروش رفت و منجر به جریمه دیجی‌کالا شد.",
    solution:
      "نوین وب ربات مانیتورینگ اختصاصی روی پایتون و سلنیوم با آی‌پی‌های چرخشی داخل کشور توسعه داد. ربات به‌صورت دوره‌ای قیمت رقبا در ترب را اسکرپ کرده، با جدول سود مجاز در اکسل انبار تطبیق داده و به صورت اتوماتیک قیمت جدید را در وب‌سرویس فروشندگان دیجی‌کالا و سایت ووکامرس ثبت می‌کند. همچنین در صورت رسیدن موجودی به صفر، بلافاصله کالا ناموجود می‌شود.",
    results: [
      { label: "قیمت‌گذاری در دیجی‌کالا و سایت", value: "خودکار در چارچوب کف سود" },
      { label: "زمان واکنش به تغییر رقیب", value: "از ساعت‌ها به چند ثانیه" },
      { label: "بررسی دستی روزانه ترب", value: "سپرده‌شده به ربات زمان‌بندی‌شده" },
      { label: "فروش کالای ناموجود", value: "ناموجودسازی خودکار با صفر شدن انبار" },
    ],
    tech: ["Python", "Playwright", "Digikala Seller API", "Torob Engine", "Redis Queue"],
    quote:
      "«قبلاً تغییر قیمت رقبا را ساعت‌ها دیرتر می‌دیدیم؛ با خودکار شدن پایش ترب و سقف و کف سود، تیم فروش به‌جای چک دستی قیمت روی تأمین کالا متمرکز شده است.»",
    author: "مهندس علیرضا سلیمانی - مدیر توسعه بازار",
  },
  {
    id: "sepidar-didar-distribution",
    category: "accounting",
    client: "شرکت پخش مواد غذایی و بهداشتی اروند",
    field: "توزیع سراسری مویرگی و فروشگاه آنلاین B2B",
    challenge:
      "سفارش‌های آنلاین خریداران سوپرمارکت و داروخانه‌ها هر روز روی سایت و نرم‌افزار ویزیتوری ثبت می‌شد. نیروی حسابداری سفارش‌ها را دانه به دانه در نرم‌افزار حسابداری سپیدار تایپ می‌کرد. خطای تایپ کد اقلام، جا ماندن برخی اقلام و مغایرت انبار مرکزی، هزینه‌های مرجوعی قابل‌توجهی به بار می‌آورد.",
    solution:
      "پیاده‌سازی یکپارچه‌ساز دوطرفه میان سایت فروشگاهی، نرم‌افزار دیدار CRM و دیتابیس SQL Server سپیدار سیستم. به محض ثبت سفارش، پروسیدور ثبت فاکتور فروش و صدور حواله خروج از انبار در سپیدار اجرا شده، پرونده مشتری در دیدار CRM بروزرسانی گشته و پیامک تایید با شماره فاکتور برای مشتری ارسال می‌شود.",
    results: [
      { label: "صدور فاکتور رسمی و حواله", value: "خودکار پس از ثبت سفارش" },
      { label: "ثبت دستی اقلام در سپیدار", value: "حذف تایپ دستی اپراتور" },
      { label: "همگام‌سازی فروش و CRM", value: "اتصال دوطرفه خودکار" },
      { label: "ارجاع به واحد انبار", value: "همان روز، بدون صف تایپ دستی" },
    ],
    tech: ["Sepidar SQL Procedures", "Didar CRM API", "WooCommerce Webhooks", "Node.js Microservice"],
    quote:
      "«اتصال به دیتابیس سپیدار مرحله‌به‌مرحله در محیط تست بررسی شد تا ساختار حسابداری به هم نریزد. الان نیروهای حسابداری روی مدیریت وصول مطالبات متمرکز شده‌اند.»",
    author: "حمید پورمند - مدیر مالی شرکت اروند",
  },
  {
    id: "telegram-ai-academy",
    category: "messengers",
    client: "موسسه آموزشی و کنکوری اندیشه برتر",
    field: "برگزاری دوره‌های آنلاین و آزمون‌های کشوری",
    challenge:
      "در بازه‌های نزدیک به کنکور و کمپین‌های تخفیفی، انبوه دانش‌آموزان اقدام به واریز وجه کارت‌به‌کارت می‌کردند و تصویر رسید را به دایرکت و تلگرام می‌فرستادند. تیم پشتیبانی تا دیروقت کار می‌کرد اما پاسخگویی به هر دانش‌آموز ساعت‌ها طول می‌کشید. تعدادی رسید جعلی و فوتوشاپی نیز از چشم پشتیبانان مخفی مانده بود.",
    solution:
      "طراحی ربات دوطرفه تلگرام و بله با موتور OCR هوش مصنوعی فارسی نوین وب. ربات تصویر فیش بانکی را دریافت کرده، شماره پیگیری، تاریخ، مبلغ و نام صاحب حساب را در چند لحظه می‌خواند، از طریق وب‌سرویس بانک اصالت واریز را چک کرده و بلافاصله پنل دسترسی دوره را فعال می‌کند.",
    results: [
      { label: "بررسی رسید و فعال‌سازی دوره", value: "خودکار و شبانه‌روزی" },
      { label: "رسیدهای تکراری و مشکوک", value: "کنترل خودکار + ارجاع به بازبینی" },
      { label: "بار ترافیک پشتیبانی", value: "تمرکز فقط روی موارد استثنا" },
      { label: "زمان انتظار دانش‌آموز", value: "از ساعت‌ها به چند لحظه پس از تأیید" },
    ],
    tech: ["Telegram Bot API", "Bale Bot SDK", "Persian OCR Model", "Zibal Inquiry API", "Python FastAPI"],
    quote:
      "«دانش‌آموزان نیمه‌شب هم فیش واریز را ارسال می‌کنند و پس از استعلام خودکار، لینک کلاس برایشان فعال می‌شود؛ تیم پشتیبانی فقط موارد مشکوک را بررسی می‌کند.»",
    author: "دکتر مرادی - بنیان‌گذار موسسه اندیشه برتر",
  },
  {
    id: "tender-scraper-industrial",
    category: "scraping_ai",
    client: "گروه مهندسی و پیمانکاری پارس سازه",
    field: "پیمانکاری خطوط لوله و پروژه‌های نفت و گاز",
    challenge:
      "کارشناسان واحد مناقصات باید هر روز ساعت‌ها وقت خود را صرف چک کردن تک‌تک سایت‌های شرکت‌های تابعه نفت، سامانه‌های ستاد ایران و شهرداری‌ها می‌کردند. در چندین مورد اسناد یک مناقصه بزرگ به دلیل بررسی دیرهنگام سایت از دست رفت.",
    solution:
      "توسعه خزنده وب هوشمند که روزانه در ساعات مشخص، ده‌ها پایگاه اطلاع‌رسانی مناقصات و مزایدات کشوری را اسکرپ می‌کند. ربات متون آگهی را با کلمات کلیدی حوزه شرکت تطبیق داده و خلاصه اسناد، مهلت ارسال پیشنهاد و فایل‌های ضمیمه را در کانال تلگرام محرمانه هیئت‌مدیره و ایمیل مدیران قرار می‌دهد.",
    results: [
      { label: "پایش پرتال‌های مناقصات", value: "بررسی خودکار طبق فهرست هدف" },
      { label: "اطلاع‌رسانی به تیم مهندسی", value: "ارسال خودکار به تلگرام و ایمیل" },
      { label: "فیلتر آگهی‌های مرتبط", value: "تطبیق خودکار با کلیدواژه‌های تخصصی" },
      { label: "وقت کارشناسان مناقصات", value: "متمرکز بر ارزیابی فنی اسناد" },
    ],
    tech: ["Scrapy Engine", "Headless Chrome", "Telegram Alerts", "PostgreSQL", "Docker Cron"],
    quote:
      "«قبل از ربات همیشه نگران جا ماندن از مهلت مناقصات مهم بودیم؛ حالا پرتال‌های هدف هر روز خودکار رصد می‌شوند و آگهی‌های مرتبط به‌موقع به دست تیم می‌رسد.»",
    author: "مهندس جهانگیری - معاونت بازرگانی پارس سازه",
  },
];

export default function CaseStudiesContent() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredCases =
    selectedCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === selectedCategory);

  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <Award className="w-3.5 h-3.5" />
            <span>مطالعات موردی و پروژه‌های عملیاتی نوین وب</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            مطالعات موردی و نتایج عملیاتی
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            این‌ها نمونه‌سناریوهای اجرایی از مسائلی هستند که با سیستم‌های خودکار حل می‌شوند؛ به‌جای وعده‌های کلی،
            مسئله، معماری راه‌حل و خروجی عملیاتی هر سناریو را می‌بینید.
          </p>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            ایده یا فرایند مشابهی دارید؟{" "}
            <Link href="/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              ایده‌ی شما را مطرح کنید
            </Link>{" "}
            تا بررسی کنیم.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800/80 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-bold"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-12">
          {filteredCases.map((cs) => (
            <div
              key={cs.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm"
            >
              {/* Header info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                      مطالعه موردی
                    </span>
                    <span className="text-xs text-slate-400">{cs.field}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{cs.client}</h2>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors self-start lg:self-auto"
                >
                  <span>درخواست سناریوی مشابه برای شرکت شما</span>
                  <ArrowLeft className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8 border-b border-slate-800/80">
                <div className="p-5 rounded-2xl bg-red-950/20 border border-red-900/30 space-y-2">
                  <h3 className="text-sm font-bold text-red-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    چالش و معضلات اولیه کارفرما:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {cs.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-800/40 space-y-2">
                  <h3 className="text-sm font-bold text-cyan-300 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    راهکار و معماری پیاده‌شده توسط نوین وب:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {cs.solution}
                  </p>
                </div>
              </div>

              {/* Metrics Result Grid */}
              <div className="py-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                  نتایج پس از استقرار سیستم:
                </h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {cs.results.map((res, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1"
                    >
                      <span className="text-xs text-slate-400 block">{res.label}</span>
                      <span className="text-lg sm:text-xl font-black text-cyan-400 font-mono-num">
                        {res.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Quote & Tech Stack */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <p className="text-xs sm:text-sm text-slate-300 italic">{cs.quote}</p>
                  <span className="text-xs font-semibold text-slate-400 block">{cs.author}</span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {cs.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono-num px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* یادداشت روش‌شناسی ارقام */}
        <p className="text-[11px] leading-relaxed text-slate-500">
          ارقام و نتیجه‌های نمایش‌داده‌شده مربوط به شرایط همان کارفرما و در بازه‌ی زمانی مشخص ثبت
          شده‌اند و تعهد نتیجه برای پروژه‌ی تازه محسوب نمی‌شوند؛ ملاک هر پروژه، پروپوزال مکتوب همان
          پروژه است.
        </p>

        {/* Bottom CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            می‌خواهید نام سازمان شما داستان موفقیت بعدی نوین وب باشد؟
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            کافیست یک جلسه آنلاین نیم‌ساعته با مهندسان ما داشته باشید تا برآورد صرفه‌جویی ماهانه سازمان خود را شفاف دریافت کنید.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
            >
              <span>درخواست جلسه مشاوره تخصصی رایگان</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
