import type { Metadata } from "next";
import Link from "next/link";
import AutomationCheckCta from "@/components/AutomationCheckCta";
import {
  TrendingUp,
  Database,
  Cpu,
  Code2,
  Sparkles,
  FileSpreadsheet,
  ArrowLeft,
  CheckCircle2,
  Zap,
  Lightbulb,
  Bot,
  ShoppingCart,
  CalendarClock,
  MessageSquare,
  Users,
  MessageCircle,
  LineChart,
  ScanText,
  CandlestickChart,
  type LucideIcon,
} from "lucide-react";
import { SERVICES, SERVICE_COLORS } from "@/data/services";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "خدمات ساخت ربات، ابزار و سیستم‌های اتوماسیون | نوین وب",
  description:
    "ربات تلگرام، ربات فروش و ثبت سفارش، نوبت‌دهی، پاسخگویی خودکار، CRM، ربات واتساپ، ربات قیمت و وب اسکرپینگ، OCR فاکتور و ربات ترید؛ می‌دانید چه می‌خواهید؟ بگویید تا برای شما بسازیم.",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوین وب | Webnovo",
    title: "خدمات ساخت ربات و سیستم‌های اتوماسیون | نوین وب",
    description:
      "از ربات فروش و ثبت سفارش تا نوبت‌دهی، پاسخگویی، CRM و ابزارهای اختصاصی؛ چیزی می‌سازیم که واقعاً بخشی از کار روزمره‌ی شما را انجام بدهد.",
    url: "/services",
  },
};

/** نگاشت آیکون کارت‌های شبکه‌ی خدمات */
const SERVICE_ICONS: Record<string, LucideIcon> = {
  Bot,
  ShoppingCart,
  CalendarClock,
  MessageSquare,
  MessageCircle,
  Users,
  CandlestickChart,
  LineChart,
  ScanText,
};

/** بخش‌های تخصصی قدیمی — با همان لنگرها (id) حفظ شده‌اند تا لینک‌های قبلی نشکنند */
const DETAILS = [
  {
    id: "marketplace",
    title: "ربات‌های قیمت‌گذاری و رصد مارکت‌پلیس (ترب، دیجی‌کالا، باسلام و ایمالز)",
    badge: "فروشگاهی و تجارت الکترونیک",
    icon: TrendingUp,
    overview:
      "در بازارهای رقابتی، کسی که زودتر به تغییر قیمت رقبا واکنش نشان بدهد، بای‌باکس دیجی‌کالا و جایگاه ترب را نگه می‌دارد. ربات‌های مانیتورینگ ما قیمت‌ها را ۲۴ ساعته پایش می‌کنند و با فرمول سودی که خودتان تعیین می‌کنید، بهترین قیمت را اعمال می‌کنند.",
    capabilities: [
      "رصد مستمر قیمت و موجودی فروشندگان رقیب در ترب و ایمالز با فواصل چند دقیقه‌ای",
      "محاسبه‌ی خودکار فرمول سود و کف قیمت مجاز برای جلوگیری از فروش با زیان",
      "اتصال به وب‌سرویس فروشندگان دیجی‌کالا و سایت فروشگاهی (ووکامرس، شاپیر و مشابه)",
      "ناموجودکردن خودکار کالا به محض اتمام موجودی انبار",
      "مدیریت پروکسی و نرخ درخواست برای پایش پایدار و بدون بلاک‌شدن",
      "گزارش‌دهی لحظه‌ای تغییرات قیمت از طریق ربات تلگرام",
    ],
    techStack: ["Python", "Playwright", "FastAPI", "Digikala Seller API", "Torob Engine", "Redis"],
    realExample:
      "یک فروشگاه لوازم خانگی با طیف گسترده‌ای از کالاها، بخش بزرگی از وقت روزانه‌ی پرسنل را صرف چک‌کردن دستی ترب می‌کرد. بعد از استقرار ربات، فروش ماهانه‌ی دیجی‌کالای آن‌ها رشد محسوسی کرد و کار دستی حذف شد.",
    relatedLinks: [{ href: "/services/price-monitoring", label: "صفحه‌ی ربات قیمت و وب اسکرپینگ" }],
  },
  {
    id: "accounting",
    title: "اتصال نرم‌افزارهای حسابداری (سپیدار، هلو) به سایت و سیستم‌های فروش",
    badge: "مالی، انبار و فروش",
    icon: Database,
    overview:
      "وقتی نرم‌افزار حسابداری از فروشگاه آنلاین جدا باشد، ثبت دستی فاکتور، خطای انسانی و کسر موجودی اشتباه اجتناب‌ناپذیر است. ما دیتابیس سپیدار و هلو را مستقیم به سایت فروشگاهی، سیستم‌های فروش و در صورت نیاز سامانه مودیان وصل می‌کنیم.",
    capabilities: [
      "صدور خودکار پیش‌فاکتور و فاکتور نهایی به محض ثبت سفارش آنلاین",
      "ثبت خودکار حواله خروج انبار و به‌روزرسانی کاردکس کالا",
      "ارسال خودکار صورت‌حساب الکترونیکی به سامانه مودیان در صورت نیاز",
      "انتقال مشتریان جدید به پنل فروش یا سیستم مدیریت مشتری شما",
      "همگام‌سازی مانده‌حساب مشتریان اعتباری",
      "کار از مسیر استاندارد دیتابیس و وب‌سرویس، بدون دستکاری غیرمجاز",
    ],
    techStack: ["MS SQL Server", "Sepidar DB", "Didar CRM", "WooCommerce", "Python / C#"],
    realExample:
      "یک شرکت پخش با اتصال سایت فروشگاهی به سپیدار، صدها سفارش روزانه‌ی همکاران را بدون ثبت دستی، در همان لحظه به فاکتور و حواله انبار تبدیل کرد.",
    relatedLinks: [{ href: "/services/crm", label: "صفحه‌ی CRM و پنل مدیریت مشتری" }],
  },
  {
    id: "messengers",
    title: "ربات‌های اختصاصی تلگرام، بله، ایتا، روبیکا و واتساپ",
    badge: "فروش، پشتیبانی و تعامل با مشتری",
    icon: Cpu,
    overview:
      "مشتری‌های شما در پیام‌رسان‌ها حضور دارند. یک ربات اختصاصی می‌تواند کاتالوگ نشان بدهد، سفارش ثبت کند، فیش بانکی بگیرد و به سؤال‌های رایج جواب بدهد؛ در واقع یک شعبه‌ی ۲۴ ساعته که همیشه باز است.",
    capabilities: [
      "پشتیبانی همزمان از چند پیام‌رسان روی یک سرور مشترک",
      "پنل مدیریت تحت وب برای پیام همگانی، مدیریت کاربران و مشاهده‌ی لاگ‌ها",
      "اتصال به درگاه پرداخت (زرین‌پال و مشابه) داخل خود ربات",
      "ارجاع هوشمند چت به اپراتور انسانی در صورت لزوم",
      "ارسال خودکار کد پیگیری و وضعیت سفارش به خریدار",
      "استعلام مانده‌حساب و صورت‌حساب مشتریان از طریق ربات",
    ],
    techStack: ["Telegram Bot API", "Bale Bot API", "Eitaa", "Python / Node.js", "PostgreSQL"],
    realExample:
      "یک موسسه‌ی آموزشی در ایام ثبت‌نام، دریافت مدارک، بررسی پرداخت‌های کارت‌به‌کارت و صدور کارت ورود به همایش برای حجم بالای شرکت‌کنندگان را به‌طور کامل از طریق ربات تلگرام و بله انجام داد.",
    relatedLinks: [
      { href: "/services/telegram-bot", label: "صفحه‌ی ربات تلگرام" },
      { href: "/services/whatsapp-bot", label: "صفحه‌ی ربات واتساپ" },
      { href: "/services/appointment-bot", label: "صفحه‌ی ربات نوبت‌دهی" },
      { href: "/services/sales-bot", label: "صفحه‌ی ربات فروش و ثبت سفارش" },
    ],
  },
  {
    id: "scraping",
    title: "وب اسکرپینگ، جمع‌آوری داده و مانیتورینگ سایت‌ها",
    badge: "داده و تحلیل بازار",
    icon: Code2,
    overview:
      "اگر بدانید رقبای شما چه چیزی را با چه قیمتی می‌فروشند یا چه فرصت‌هایی در سایت‌های هدف وجود دارد، همیشه چند قدم جلوترید. ما داده‌ی پراکنده‌ی وب را استخراج و مرتب تحویل می‌دهیم.",
    capabilities: [
      "خزش ساختاریافته‌ی وب‌سایت‌ها با سرعت و مقیاس کنترل‌شده",
      "مانیتورینگ سایت‌های هدف و ارسال هشدار به تلگرام",
      "استخراج لیست محصولات، مشخصات و دیدگاه‌ها",
      "مدیریت کپچا و آی‌پی‌های چرخشی برای پایش پایدار",
      "تحویل خروجی در قالب اکسل، JSON یا اتصال مستقیم به دیتابیس شما",
      "زمان‌بندی دوره‌ای برای به‌روزرسانی خودکار اطلاعات",
    ],
    techStack: ["Playwright", "Selenium", "Scrapy", "BeautifulSoup", "Proxy Rotation", "Docker"],
    realExample:
      "یک شرکت واردکننده با ربات اسکرپینگ، نوسانات قیمت ده‌ها تأمین‌کننده را در یک داشبورد مانیتور کرد و تصمیم‌های خرید عمده را با داده گرفت.",
    relatedLinks: [{ href: "/services/price-monitoring", label: "صفحه‌ی ربات قیمت و وب اسکرپینگ" }],
  },
  {
    id: "ai",
    title: "هوش مصنوعی کاربردی: خواندن اسناد مالی و پاسخگویی هوشمند",
    badge: "هوش مصنوعی و پردازش اسناد",
    icon: Sparkles,
    overview:
      "دیگر لازم نیست کسی ارقام فیش‌های بانکی یا فاکتورهای کاغذی را دستی تایپ کند. سیستم‌های ما داده‌های تصویری را به رکوردهای ساختاریافته تبدیل می‌کنند و وقتی واقعاً لازم باشد، مثل یک پاسخگو به سؤال‌های مشتریان جواب می‌دهند.",
    capabilities: [
      "خواندن فیش کارت‌به‌کارت: مبلغ، شماره پیگیری، تاریخ و تطبیق با پرداخت انتظار",
      "تشخیص رسیدهای تکراری و مشکوک و ارجاع به بازبینی انسانی",
      "تبدیل فاکتورهای اسکن‌شده به ردیف‌های ساختاریافته‌ی اکسل",
      "چت‌بات آموزش‌دیده روی مستندات و کاتالوگ شما",
      "خلاصه‌سازی و دسته‌بندی تیکت‌های پشتیبانی",
    ],
    techStack: ["OpenAI / مدل‌های زبانی", "Persian OCR", "RAG Pipeline", "FastAPI"],
    realExample:
      "یک پلتفرم فروش، صدها فیش واریزی روزانه را بدون دخالت نیروی مالی پردازش و تأیید کرد و خطای تایپی را حذف کرد.",
    relatedLinks: [
      { href: "/services/ocr", label: "صفحه‌ی OCR فاکتور و فیش" },
      { href: "/services/ai-chatbot", label: "صفحه‌ی ربات پاسخگویی و چت‌بات" },
    ],
  },
  {
    id: "rpa",
    title: "اتوماسیون کارهای دسکتاپ، اکسل و سامانه‌های بدون وب‌سرویس",
    badge: "کارهای تکراری اداری",
    icon: FileSpreadsheet,
    overview:
      "کارهای تکراری که در نرم‌افزارهای قدیمی دسکتاپی، سامانه‌های بدون وب‌سرویس یا اکسل‌های چندصد ستونه انجام می‌شوند، برای انسان خسته‌کننده‌اند اما برای یک اسکریپت خوب، کاری چند ثانیه‌ای‌اند.",
    capabilities: [
      "ثبت خودکار فرم‌ها و فاکتورها در سامانه‌های سنتی بدون API",
      "ترکیب و مغایرت‌گیری فایل‌های اکسل انبار، مالی و فروش",
      "دانلود خودکار گزارش‌های روزانه و ارسال ایمیل جمع‌بندی",
      "اجرای برنامه‌ریزی‌شده در ساعات غیرکاری",
      "خروجی قابل بررسی و لاگ کامل هر اجرا",
    ],
    techStack: ["PyAutoGUI", "OpenPyXL", "Windows Automation", "Cron / Task Scheduler"],
    realExample:
      "یک شرکت بازرگانی، ثبت اطلاعات در سه سامانه‌ی مختلف را که روزانه ساعت‌ها وقت می‌گرفت، به چند دقیقه کار خودکار تبدیل کرد.",
    relatedLinks: [{ href: "/idea", label: "ایده‌ی شما را مطرح کنید تا بررسی کنیم" }],
  },
];

export default function ServicesPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* هدر — هاب خدمات */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Zap className="h-3.5 w-3.5" />
            خدمات نوین وب — ربات، ابزار و سیستم‌های اتوماسیون
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            راهکارهای اتوماسیون و ربات‌های اختصاصی برای سازمان شما
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            از ربات فروش و ثبت سفارش تا نوبت‌دهی، پاسخگویی خودکار، ابزارهای اختصاصی و ربات ترید؛ هر سرویس
            را متناسب با نیاز خودتان می‌سازیم، نه بیشتر از آن. همه‌ی پروژه‌ها با تحویل سورس‌کد و پشتیبانی طبق
            قرارداد.
          </p>
        </div>

        {/* دسته‌بندی بر اساس نیاز کاربر */}
        <section aria-label="شروع بر اساس نیاز" className="space-y-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-black text-white sm:text-2xl">بر اساس نیاز شما شروع کنید</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
              لازم نیست نام فنی راه‌حل را بدانید؛ ببینید کدام نیاز به شما نزدیک‌تر است.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Bot,
                title: "ربات تلگرام و ابزارهای اختصاصی",
                items: "ربات‌های شخصی و کاربردی · مدیریت کانال و گروه · پردازش و مدیریت فایل · اتصال به API · ربات‌های هوشمند",
                href: "/services/telegram-bot",
                cta: "شروع از ربات تلگرام",
              },
              {
                icon: ShoppingCart,
                title: "ابزارهای فروش و مدیریت",
                items: "ثبت سفارش و فروش · مدیریت مشتری · اطلاع‌رسانی و پیگیری · پنل‌های مدیریتی · اتصال سرویس‌ها",
                href: "/services/sales-bot",
                cta: "شروع از ابزار فروش",
              },
              {
                icon: Sparkles,
                title: "اتوماسیون و هوش مصنوعی",
                items: "حذف کارهای دستی تکراری · اتصال ابزارها به هم · پردازش اسناد و اطلاعات · استخراج و پایش داده · دستیارهای هوش مصنوعی",
                href: "/services/ocr",
                cta: "شروع از اتوماسیون",
              },
              {
                icon: Lightbulb,
                title: "ایده‌های اختصاصی",
                items: "بررسی امکان‌پذیری · تعیین محدوده نسخه اولیه · تخمین هزینه و زمان · ساخت پس از توافق",
                href: "/idea",
                cta: "ایده‌ام را مطرح می‌کنم",
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="glass-panel glass-panel-hover group flex flex-col justify-between rounded-2xl p-5"
              >
                <div className="space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                    <cat.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 sm:text-base">{cat.title}</h3>
                  <p className="text-[11px] leading-relaxed text-slate-400 sm:text-xs">{cat.items}</p>
                </div>
                <span className="mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-3.5 text-xs font-semibold text-cyan-400">
                  {cat.cta}
                  <ArrowLeft className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* شبکه‌ی صفحات خدمات */}
        <section aria-label="فهرست خدمات">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Bot;
              const colors = SERVICE_COLORS[service.color];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="glass-panel glass-panel-hover group flex flex-col justify-between rounded-2xl p-6"
                >
                  <div className="space-y-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colors.iconBox}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className={`text-base font-bold text-white transition-colors ${colors.titleHover}`}>
                      {service.name}
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                      {service.metaDescription.split("؛")[0]}.
                    </p>
                  </div>
                  <span className={`mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold ${colors.link}`}>
                    جزئیات و نمونه‌کارها
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}

            {/* کارت مسیر دوم: ایده‌ی آزاد */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-6 shadow-xl shadow-cyan-950/30">
              <div className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="text-base font-bold text-white">ایده‌ی شما توی این لیست نیست؟</h2>
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  اشکالی ندارد. لازم نیست دقیقاً بدانید چه چیزی باید ساخته شود؛ فرایند یا ایده‌ی شما را توضیح بدهید
                  تا بررسی کنیم چطور می‌شود آن را به یک ابزار واقعی تبدیل کرد.
                </p>
              </div>
              <Link
                href="/idea"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95"
              >
                ایده‌ام را توضیح می‌دهم
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* بخش‌های تخصصی با جزئیات (لنگرهای قدیمی حفظ شده‌اند) */}
        <div className="space-y-12">
          {DETAILS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                id={s.id}
                className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm sm:rounded-3xl sm:p-10"
              >
                <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-center">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="rounded-full border border-cyan-800/40 bg-cyan-950 px-2 py-0.5 text-[11px] font-bold text-cyan-300">
                        {s.badge}
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-white sm:text-2xl">{s.title}</h2>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
                    {s.relatedLinks.map((rl) => (
                      <Link
                        key={rl.href}
                        href={rl.href}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95 sm:text-sm"
                      >
                        <span>{rl.label}</span>
                        <ArrowLeft className="h-4 w-4" />
                      </Link>
                    ))}
                    <Link
                      href={`/contact?service=${s.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-600/60 hover:text-white sm:text-sm"
                    >
                      مشاوره درباره این بخش
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 py-6">
                  <p className="text-sm font-normal leading-relaxed text-slate-300 sm:text-base">{s.overview}</p>

                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" />
                      چه کارهایی انجام می‌دهد؟
                    </h3>
                    <div className="grid grid-cols-1 gap-3 pt-1 md:grid-cols-2">
                      {s.capabilities.map((cap, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 rounded-xl border border-slate-800/70 bg-slate-950/60 p-3 text-xs text-slate-200 sm:text-sm"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                          <span className="leading-relaxed">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-cyan-900/30 bg-slate-950/80 p-4 text-xs text-slate-300 sm:text-sm">
                    <span className="mb-1 block font-bold text-cyan-300">یک نمونه از نتیجه‌ی واقعی:</span>
                    <p className="leading-relaxed text-slate-400">{s.realExample}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-2 text-xs">
                    <span className="font-medium text-slate-400">ابزارهای رایج در این حوزه:</span>
                    {s.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono-num text-[11px] text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* بنر پایانی — مسیر آزاد */}
        <div className="rounded-3xl border border-cyan-700/40 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-8 text-center shadow-2xl sm:p-12">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            ایده‌ی شما توی لیست نبود؟
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            اشکالی ندارد. لازم نیست دقیقاً بدانید چه چیزی باید ساخته شود. فرایند یا ایده‌ی شما را برایمان توضیح
            بدهید؛ ما بررسی می‌کنیم چه چیزی می‌تواند آن را به یک ابزار واقعی تبدیل کند.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-5 sm:flex-row">
            <Link
              href="/idea"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
            >
              <Lightbulb className="h-4 w-4" />
              ایده‌ام را توضیح می‌دهم
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
            >
              گفت‌وگو درباره یک پروژه‌ی مشخص
            </Link>
          </div>
        </div>

        {/* ابزار تشخیص رایگان — برای کسانی که هنوز مطمئن نیستند از کجا شروع کنند */}
        <AutomationCheckCta
          compact
          location="services_page"
          title="مطمئن نیستید کدام سرویس برای کسب‌وکار شما مناسب است؟"
        />
      </div>
    </main>
  );
}
