import novo from "./novo-music-player.json";

/**
 * نمونه‌کارهای واقعی — استخراج‌شده از مخازن کد و گزارش‌های تحویل پروژه
 * (مونوریپوی bot-company و پروژه‌های جانبی)
 */

export type Project = {
  slug: string;
  category: "bots" | "dashboards" | "integration" | "ai" | "web" | "android";
  title: string;
  subtitle: string;
  client: string;
  year: string;
  botId?: string;
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  results: { label: string; value: string }[];
  stack: string[];
  repo?: string;
  liveNote?: string;
  /** لینک به صفحات خدمات مرتبط — برای لینک‌سازی دوطرفه‌ی پروژه ↔ سرویس */
  serviceLinks?: { href: string; label: string }[];
  caseStudy?: {
    category: string;
    role: string;
    intro: string;
    challengeTitle: string;
    solutionTitle: string;
    resultsTitle: string;
    sections: { title: string; text: string }[];
    gallery: { image: string; alt: string; caption: string }[];
    links: { href: string; label: string }[];
  };
};

export const PROJECT_CATEGORIES = [
  { id: "all", label: "همه پروژه‌ها" },
  { id: "bots", label: "ربات‌های تلگرام و پیام‌رسان" },
  { id: "dashboards", label: "داشبوردهای مدیریتی" },
  { id: "integration", label: "یکپارچه‌سازی و API" },
  { id: "ai", label: "هوش مصنوعی و پردازش داده" },
  { id: "web", label: "وب و برند" },
  { id: "android", label: "اپلیکیشن اندروید" },
] as const;

const NOVO_IMAGES: Record<string, { alt: string; caption: string }> = {
  "01-songs-tabs.png": {
    alt: "فهرست آهنگ‌ها در اپ نوو با تب‌های همه آهنگ‌ها، علاقه‌مندی‌ها، پربازدیدترین و اخیراً",
    caption: "کتابخانه و تب‌های لمسی",
  },
  "02-now-playing-swipe.png": {
    alt: "صفحهٔ پخش اپ نوو با کاور آهنگ و پیش‌نمایش آهنگ بعدی هنگام کشیدن",
    caption: "صفحهٔ پخش و کشیدن کاور",
  },
  "03-home-widget.png": {
    alt: "ویجت صفحهٔ اصلی اپ نوو با کاور آهنگ، تایم‌لاین و دکمه‌های کنترل",
    caption: "ویجت صفحهٔ اصلی",
  },
  "04-equalizer.png": {
    alt: "اکولایزر پنج‌باندی گرافیکی اپ نوو",
    caption: "اکولایزر پنج‌باندی",
  },
  "05-settings-fa.png": {
    alt: "صفحهٔ تنظیمات اپ نوو با انتخاب زبان و رنگ تم",
    caption: "تنظیمات فارسی",
  },
  "06-brand-novinweb.png": {
    alt: "بخش «بیشتر از نوین‌وب» در تنظیمات اپ نوو",
    caption: "بیشتر از نوین‌وب",
  },
};

function novoImage(filename: string) {
  return `/images/works/novo/${filename.replace(/\.png$/, ".webp")}`;
}

export const PROJECTS: Project[] = [
  {
    slug: "receipt-ocr-verification",
    category: "ai",
    title: "تأیید هوشمند رسید پرداخت با OCR فارسی",
    subtitle: "خواندن فیش بانکی از تصویر و فعال‌سازی خودکار سرویس",
    client: "ماژول مشترک ربات‌های پرداختی",
    year: "۱۴۰۵",
    image: "/images/case-ocr.jpg",
    summary:
      "ماژولی که تصویر رسید کارت‌به‌کارت را می‌گیرد، مبلغ، تاریخ، شماره پیگیری و مقصد را استخراج می‌کند و بدون دخالت پشتیبان درباره تأیید یا رد پرداخت تصمیم می‌گیرد.",
    challenge:
      "در ساعات اوج، انبوه عکس رسید به پشتیبانی می‌رسید. بررسی چشمی هر رسید زمان‌بر بود، تا ساعت‌ها طول می‌کشید و چند فیش فوتوشاپ‌شده هم از فیلتر انسانی رد شده بود.",
    solution:
      "پیش‌پردازش تصویر (اصلاح زاویه و کنتراست) و سپس استخراج فیلدهای کلیدی با موتور OCR فارسی و مدل زبانی. مبلغ و شماره پیگیری با رکورد انتظار پرداخت تطبیق داده می‌شود؛ رسیدهای تکراری، دستکاری‌شده یا خارج از بازه زمانی به‌صورت خودکار علامت‌گذاری و به صف بازبینی انسانی می‌روند.",
    highlights: [
      "استخراج مبلغ، تاریخ، شماره پیگیری و مقصد از تصویر فیش",
      "تشخیص رسید تکراری با هش تصویر و شماره پیگیری",
      "صف بازبینی انسانی فقط برای موارد مشکوک، نه همه رسیدها",
      "پاسخ کاربر در چند ثانیه، ۲۴ ساعت شبانه‌روز",
    ],
    results: [
      { label: "زمان تأیید پرداخت", value: "از چند ساعت به چند ثانیه" },
      { label: "حجم بررسی دستی پشتیبانی", value: "کاهش چشمگیر" },
      { label: "رسیدهای تکراری و مشکوک", value: "کنترل خودکار + ارجاع به بازبینی" },
    ],
    stack: ["Python", "OCR فارسی", "مدل زبانی", "Pillow", "FastAPI"],
    serviceLinks: [
      { href: "/services/ocr", label: "OCR فاکتور و فیش بانکی" },
      { href: "/services/sales-bot", label: "تأیید فیش در ربات فروش" },
    ],
  },
  {
    slug: "marketplace-price-bot",
    category: "integration",
    title: "ربات رصد قیمت و همگام‌سازی موجودی مارکت‌پلیس",
    subtitle: "ترب، دیجی‌کالا، باسلام و ایمالز در یک حلقه خودکار",
    client: "فروشندگان آنلاین و بازرگانی‌های پخش",
    year: "۱۴۰۴ – ۱۴۰۵",
    image: "/images/case-marketplace.jpg",
    summary:
      "ربات مانیتورینگ که قیمت رقبا را روی مارکت‌پلیس‌های ایرانی رصد می‌کند، بر اساس قاعده سود مجاز قیمت را به‌روز می‌کند و موجودی را با انبار همگام نگه می‌دارد.",
    challenge:
      "تیم فروش هر روز ساعت‌ها قیمت رقبا را دستی چک می‌کرد و تا رسیدن نوبت به‌روزرسانی، بای‌باکس از دست رفته بود. فروش کالای ناموجود هم جریمه و لغو سفارش به همراه داشت.",
    solution:
      "اسکرپر مقاوم با مدیریت نرخ درخواست و تلاش مجدد، به‌علاوه اتصال به وب‌سرویس فروشندگان برای ثبت قیمت جدید. سقف و کف سود در یک جدول ساده تعریف می‌شود و ربات هرگز از آن عبور نمی‌کند؛ رسیدن موجودی به صفر بلافاصله کالا را ناموجود می‌کند و به مدیر هشدار تلگرامی می‌رود.",
    highlights: [
      "رصد دوره‌ای قیمت رقبا با مدیریت نرخ درخواست و خطا",
      "قاعده سود مجاز: ربات هیچ‌وقت زیر کف قیمت نمی‌رود",
      "همگام‌سازی موجودی با انبار و ناموجودسازی آنی",
      "هشدار تلگرامی لحظه‌ای برای تغییرات مهم بازار",
    ],
    results: [
      { label: "زمان واکنش به تغییر قیمت رقیب", value: "از ساعت به ثانیه" },
      { label: "کار دستی آزادشده", value: "چندین ساعت در ماه" },
      { label: "فروش کالای ناموجود", value: "ناموجودسازی خودکار با صفر شدن انبار" },
    ],
    stack: ["Python", "Playwright", "Digikala Seller API", "Redis", "Docker"],
    serviceLinks: [{ href: "/services/price-monitoring", label: "ربات قیمت و وب اسکرپینگ" }],
  },
  {
    slug: "webnovo-portfolio",
    category: "web",
    title: "وب‌سایت برند شخصی نوین وب",
    subtitle: "سایت چندصفحه‌ای فارسی با فرم تماس متصل به ربات تلگرام",
    client: "پروژه داخلی — برند Webnovo",
    year: "۱۴۰۵",
    image: "/images/hero-automation.jpg",
    summary:
      "همین سایتی که در حال مشاهده آن هستید: یک وب‌سایت چندصفحه‌ای راست‌به‌چپ با محاسبه‌گر ROI، شبیه‌ساز زنده گردش کار و فرمی که پیام را واقعاً و لحظه‌ای به تلگرام می‌رساند.",
    challenge:
      "پیام‌های ورودی سایت اگر فقط در دیتابیس ذخیره شوند، تا وقتی کسی پنل را باز نکند دیده نمی‌شوند. برای یک برند فنی، دیر پاسخ‌دادن یعنی از دست دادن پروژه.",
    solution:
      "فرم درخواست پروژه علاوه بر ثبت در دیتابیس، پیام را در همان ثانیه از طریق Bot API به تلگرام می‌فرستد؛ پس حتی اگر دیتابیس در دسترس نباشد، اعلان از دست نمی‌رود. سایت با Next.js App Router ساخته شده، کاملاً RTL است و برای استقرار روی Vercel آماده است.",
    highlights: [
      "ارسال آنی لید به تلگرام (مستقل از وضعیت دیتابیس)",
      "محاسبه‌گر تعاملی صرفه‌جویی و بازگشت سرمایه",
      "شبیه‌ساز زنده گردش کار برای نمایش عملی اتوماسیون",
      "طراحی RTL، ریسپانسیو و بهینه برای موبایل",
    ],
    results: [
      { label: "تأخیر اطلاع از درخواست جدید", value: "بلافاصله" },
      { label: "مسیر تبدیل بازدیدکننده", value: "نقاط تماس مشخص در همه صفحه‌ها" },
      { label: "استقرار", value: "آماده انتشار روی Vercel" },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Drizzle ORM", "Telegram Bot API", "Vercel"],
    repo: "bot-company/webnovo-portofolio",
  },
  {
    slug: "nobat-sabz",
    category: "android",
    title: "نوبت سبز (SabzTime)",
    subtitle: "سامانه نوبت‌دهی کسب‌وکارها: ربات تلگرام، وب‌اپ و اپلیکیشن نیتیو اندروید روی یک هسته واحد",
    client: "پروژه داخلی — نوین وب",
    year: "۱۴۰۳ – ۱۴۰۵",
    image: "/images/case-nobat-sabz.jpg",
    imageAlt:
      "نمای داشبورد نوبت‌دهی نوبت سبز با تقویم هفتگی و صف نوبت‌ها در کنار پنل چت رزرو و اپ موبایل، روی زمینه تیره با اکسنت سیان",
    summary:
      "نوبت سبز سیستم جامع مدیریت نوبت‌دهی و کسب‌وکار است که در قالب ربات تلگرام، وب‌اپ و اپلیکیشن نیتیو اندروید ارائه می‌شود. صاحب کسب‌وکار خدمات، قیمت، ساعات کاری و اسلات‌های زمانی‌اش را تعریف می‌کند، مشتری به‌صورت آنلاین رزرو می‌کند و یادآوری، لغو و جابه‌جایی نوبت، پرداخت و گزارش‌گیری همگی در همان سامانه انجام می‌شود.",
    challenge:
      "نوبت‌دهی یک کار تنها نیست: ثبت کسب‌وکار و شعبه‌ها، تعریف خدمات و قیمت، ساعات کاری، رزرو و اسلات‌های زمانی، یادآوری مشتری، لغو و تغییر نوبت، پرداخت و ارتباط با مشتری یک چرخه به‌هم‌پیوسته است. نوبت سبز برای این ساخته شد که این چرخه را برای کسب‌وکارها ساده کند و تجربه‌ای منظم و خودکار ارائه دهد.",
    solution:
      "یک بک‌اند PHP/MySQL همه نقش‌ها — صاحب کسب‌وکار، مشتری و بازاریاب — را روی یک منبع داده واحد سرویس می‌دهد. ورودی اصلی کاربر ربات تلگرام است با منوها، دکمه‌های تعاملی، لینک‌های عمیق و وب‌اپ؛ در کنارش یک وب‌اپ کامل (جست‌وجو، رزرو، تقویم، پنل مدیریت و پنل بازاریاب) و یک اپ نیتیو اندروید با Kotlin و Jetpack Compose، تقویم جلالی و یادآوری خودکار با WorkManager ساخته شد. پرداخت از طریق زرین‌پال و پکیج‌های اشتراک با اعتبار مشتری یکپارچه است و ادغام WooCommerce هم به‌صورت اختیاری در دسترس است.",
    highlights: [
      "رزرو آنلاین با اسلات زمانی، تقویم، لغو و جابه‌جایی نوبت و یادآوری خودکار",
      "لینک اختصاصی رزرو (Alias) برای هر کسب‌وکار، به‌همراه لینک‌های عمیق بازاریاب",
      "جست‌وجوی کسب‌وکار بر اساس موقعیت و دسته‌بندی، با کش هوشمند و جست‌وجوی فول‌تکست",
      "پرداخت یکپارچه: درگاه زرین‌پال، پکیج اشتراک، اعتبار مشتری و ادغام اختیاری WooCommerce",
      "پنل بازاریاب با لینک ارجاع و کمیسیون، به‌همراه ثبت حضور/غیاب مشتری و امتیاز اعتباری",
      "اپ نیتیو اندروید (Kotlin + Jetpack Compose) با تقویم جلالی و یادآوری با WorkManager",
    ],
    results: [
      { label: "فرایند نوبت‌دهی کسب‌وکار", value: "کاملاً خودکار و آنلاین" },
      { label: "یادآوری پیش از نوبت", value: "خودکار، بدون پیگیری دستی" },
      { label: "لغو و جابه‌جایی نوبت", value: "توسط خود مشتری در سامانه" },
      { label: "نوبت‌ها و صف روز جاری", value: "همیشه در دسترس؛ تلگرام، وب‌اپ و اندروید" },
    ],
    stack: ["PHP", "MySQL", "Telegram Bot API", "Kotlin", "Jetpack Compose", "ZarinPal", "WooCommerce", "GitHub Actions"],
    repo: "rsabzi/nobat_sabz",
    serviceLinks: [
      { href: "/services/appointment-bot", label: "ربات نوبت‌دهی" },
      { href: "/services/telegram-bot", label: "ربات تلگرام" },
    ],
  },
  {
    slug: novo.slug,
    category: "android",
    title: novo.title_fa,
    subtitle: novo.summary_fa,
    client: novo.client_fa,
    year: novo.year,
    image: novoImage(novo.cover_image),
    imageAlt: NOVO_IMAGES[novo.cover_image].alt,
    // کادرهای افقی روی خودِ ویجت تمرکز می‌کنند؛ گالری تصاویر کامل را نشان می‌دهد.
    imagePosition: "center 25%",
    summary: novo.summary_fa,
    challenge: novo.body_fa[2],
    solution: novo.body_fa[1],
    highlights: novo.highlights_fa,
    results: novo.metrics_fa,
    stack: novo.stack,
    liveNote: novo.status_fa,
    caseStudy: {
      category: novo.category_fa,
      role: novo.role_fa,
      intro: novo.body_fa[0],
      challengeTitle: "سخت‌ترین بخش کار",
      solutionTitle: "ویجت و کنترل پخش",
      resultsTitle: "مشخصات نوو",
      sections: [
        { title: "مهندسی انتشار", text: novo.body_fa[3] },
        { title: "وضعیت امروز و حریم خصوصی", text: novo.body_fa[4] },
      ],
      gallery: novo.gallery.map((filename) => ({
        image: novoImage(filename),
        ...NOVO_IMAGES[filename],
      })),
      links: [
        { href: novo.links.store, label: "کافه‌بازار — در حال بررسی" },
        { href: novo.links.releases, label: "نسخه‌ها و دانلود از GitHub" },
        { href: novo.links.brand, label: "وب‌سایت نوین‌وب" },
      ],
    },
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
