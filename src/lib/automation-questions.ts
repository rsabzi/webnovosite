/**
 * تعریف گام‌های ابزار «تشخیص رایگان اتوماسیون» — تنها منبع حقیقت.
 *
 * این فایل هم توسط ویزارد فرم (کلاینت) و هم توسط پرامپت تحلیل و اعتبارسنجی
 * سمت سرور استفاده می‌شود؛ بنابراین هیچ وابستگی به React ندارد و صرفاً داده است.
 */

export type QuestionOption = {
  id: string;
  label: string;
  /** توضیح کوتاه برای کمک به تصمیم‌گیری کاربر */
  hint?: string;
};

export type QuestionStep =
  | {
      key: "businessType";
      stepNumber: number;
      title: string;
      help: string;
      kind: "single";
      required: true;
      options: QuestionOption[];
    }
  | {
      key: "monthlyVolume";
      stepNumber: number;
      title: string;
      help: string;
      kind: "single";
      required: true;
      options: QuestionOption[];
    }
  | {
      key: "channels";
      stepNumber: number;
      title: string;
      help: string;
      kind: "multi";
      required: true;
      options: QuestionOption[];
    }
  | {
      key: "currentProcess";
      stepNumber: number;
      title: string;
      help: string;
      kind: "single";
      required: true;
      options: QuestionOption[];
    }
  | {
      key: "painTasks";
      stepNumber: number;
      title: string;
      help: string;
      kind: "multi";
      required: true;
      options: QuestionOption[];
    }
  | {
      key: "mainProblem";
      stepNumber: number;
      title: string;
      help: string;
      kind: "text";
      required: true;
      placeholder: string;
      minLength: number;
      maxLength: number;
    }
  | {
      key: "currentTools";
      stepNumber: number;
      title: string;
      help: string;
      kind: "text";
      required: false;
      placeholder: string;
      minLength: number;
      maxLength: number;
    }
  | {
      key: "contact";
      stepNumber: number;
      title: string;
      help: string;
      kind: "contact";
      required: true;
    };

export const QUESTION_STEPS: QuestionStep[] = [
  {
    key: "businessType",
    stepNumber: 1,
    title: "نوع کسب‌وکار شما چیست؟",
    help: "نوع کسب‌وکار مشخص می‌کند کدام کارها بیشتر قابل خودکارسازی هستند.",
    kind: "single",
    required: true,
    options: [
      { id: "retail", label: "فروشگاه / تجارت الکترونیک", hint: "فروش آنلاین، مارکت‌پلیس، انبار" },
      { id: "education", label: "آموزشگاه / آموزش آنلاین", hint: "ثبت‌نام، کلاس، پشتیبانی هنرجو" },
      { id: "clinic", label: "کلینیک / مرکز درمانی", hint: "نوبت‌دهی، پرونده، پیگیری بیمار" },
      { id: "restaurant", label: "رستوران / کافه", hint: "سفارش، رزرو میز، پیک" },
      { id: "services", label: "کسب‌وکار خدماتی", hint: "خدمات فنی، مشاوره، پروژه‌ای" },
      { id: "b2b", label: "شرکت B2B / بازرگانی", hint: "فروش سازمانی، پیش‌فاکتور، نمایندگان" },
      { id: "manufacturing", label: "تولیدی / صنعتی", hint: "سفارش تولید، انبار، توزیع" },
      { id: "other", label: "سایر / چند حوزه‌ای", hint: "مدل کسب‌وکار متفاوت" },
    ],
  },
  {
    key: "monthlyVolume",
    stepNumber: 2,
    title: "تقریباً چند مشتری یا درخواست در ماه دارید؟",
    help: "عدد تقریبی هم کافی است.",
    kind: "single",
    required: true,
    options: [
      { id: "under_50", label: "کمتر از ۵۰ درخواست در ماه" },
      { id: "50_200", label: "حدود ۵۰ تا ۲۰۰ درخواست" },
      { id: "200_1000", label: "حدود ۲۰۰ تا ۱۰۰۰ درخواست" },
      { id: "over_1000", label: "بیش از ۱۰۰۰ درخواست" },
      { id: "unknown", label: "دقیق نمی‌دانم" },
    ],
  },
  {
    key: "channels",
    stepNumber: 3,
    title: "مشتری‌ها بیشتر از کجا با شما در تماس هستند؟",
    help: "می‌توانید چند گزینه را انتخاب کنید.",
    kind: "multi",
    required: true,
    options: [
      { id: "instagram", label: "اینستاگرام" },
      { id: "whatsapp", label: "واتساپ" },
      { id: "telegram", label: "تلگرام / بله / ایتا" },
      { id: "website", label: "وب‌سایت و فرم‌ها" },
      { id: "phone", label: "تماس تلفنی" },
      { id: "email", label: "ایمیل" },
      { id: "marketplace", label: "مارکت‌پلیس (دیجی‌کالا، ترب، باسلام)" },
      { id: "other", label: "سایر" },
    ],
  },
  {
    key: "currentProcess",
    stepNumber: 4,
    title: "درخواست‌های مشتری الان چگونه مدیریت می‌شوند؟",
    help: "همین وضعیت فعلی، نقطه‌ی شروع کار است.",
    kind: "single",
    required: true,
    options: [
      { id: "manual", label: "کاملاً دستی", hint: "تلفن، چت و یادداشت‌برداری" },
      { id: "spreadsheet", label: "اکسل یا Google Sheets" },
      { id: "crm", label: "CRM (دیدار، پیام‌گستر و…)" },
      { id: "custom_software", label: "نرم‌افزار اختصاصی / ERP" },
      { id: "mixed", label: "ترکیبی از چند مورد" },
    ],
  },
  {
    key: "painTasks",
    stepNumber: 5,
    title: "کدام کارها وقت بیشتری از تیم شما می‌گیرند؟",
    help: "چند مورد را می‌توانید انتخاب کنید.",
    kind: "multi",
    required: true,
    options: [
      { id: "reply", label: "پاسخ به سؤالات تکراری مشتری" },
      { id: "followup", label: "پیگیری مشتری و لیدها" },
      { id: "order", label: "ثبت و پردازش سفارش" },
      { id: "booking", label: "رزرو / نوبت‌دهی" },
      { id: "data_entry", label: "ثبت دستی اطلاعات در اکسل یا نرم‌افزار" },
      { id: "invoice", label: "صدور و ارسال فاکتور" },
      { id: "payment", label: "تأیید و تطبیق پرداخت‌ها" },
      { id: "support", label: "پشتیبانی و پیگیری درخواست‌ها" },
      { id: "reporting", label: "گزارش‌گیری و تحلیل" },
      { id: "other", label: "سایر" },
    ],
  },
  {
    key: "mainProblem",
    stepNumber: 6,
    title: "مهم‌ترین فرایندی که می‌خواهید بهبود پیدا کند چیست؟",
    help: "هر چه روشن‌تر بنویسید، تحلیل دقیق‌تر می‌شود. مثلاً: «هر روز دو نفر مشغول پاسخ دادن به سؤال‌های تکراری هستند.»",
    kind: "text",
    required: true,
    placeholder: "مثلاً: پاسخ به سؤال‌های تکراری اینستاگرام، بیشتر وقت تیم را گرفته است.",
    minLength: 20,
    maxLength: 1000,
  },
  {
    key: "currentTools",
    stepNumber: 7,
    title: "آیا در حال حاضر از ابزار یا سیستم خاصی استفاده می‌کنید؟",
    help: "اختیاری است. مثلاً سپیدار، هلو، دیدار، ووکامرس، اکسل یا پنل دیجی‌کالا.",
    kind: "text",
    required: false,
    placeholder: "مثال: نرم‌افزار حسابداری سپیدار + اکسل پیگیری سفارش",
    minLength: 0,
    maxLength: 300,
  },
  {
    key: "contact",
    stepNumber: 8,
    title: "اطلاعات تماس شما",
    help: "نتیجه را همان لحظه در همین صفحه می‌بینید. شماره تماس فقط برای این است که اگر خواستید، خودمان دقیق‌تر بررسی کنیم.",
    kind: "contact",
    required: true,
  },
];

export const TOTAL_STEPS = QUESTION_STEPS.length;

export function getOptions(key: "businessType" | "monthlyVolume" | "channels" | "currentProcess" | "painTasks"): QuestionOption[] {
  const step = QUESTION_STEPS.find((s) => s.key === key);
  return step && "options" in step ? step.options : [];
}

export function optionLabel(key: "businessType" | "monthlyVolume" | "channels" | "currentProcess" | "painTasks", id: string): string {
  const found = getOptions(key).find((option) => option.id === id);
  return found?.label ?? id;
}

export function optionLabels(
  key: "businessType" | "monthlyVolume" | "channels" | "currentProcess" | "painTasks",
  ids: string[], 
): string[] {
  return ids.map((id) => optionLabel(key, id));
}

const idSets: Record<string, Set<string>> = {
  businessType: new Set(getOptions("businessType").map((o) => o.id)),
  monthlyVolume: new Set(getOptions("monthlyVolume").map((o) => o.id)),
  channels: new Set(getOptions("channels").map((o) => o.id)),
  currentProcess: new Set(getOptions("currentProcess").map((o) => o.id)),
  painTasks: new Set(getOptions("painTasks").map((o) => o.id)),
};

export function isValidOptionId(
  key: "businessType" | "monthlyVolume" | "channels" | "currentProcess" | "painTasks",
  id: string,
): boolean {
  return idSets[key]?.has(id) ?? false;
}
