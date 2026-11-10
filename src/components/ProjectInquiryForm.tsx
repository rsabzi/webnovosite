"use client";

import { useState } from "react";
import {
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Phone,
  User,
  MessageSquare,
  FileText,
  Calendar,
  Layers,
  Check,
  ChevronDown,
} from "lucide-react";

const AUTOMATION_TYPES = [
  { id: "telegram_bot", label: "ربات تلگرام / بله / ایتا (فروش، سفارش، پشتیبانی)" },
  { id: "messengers", label: "ربات هوشمند پیام‌رسان (تلگرام، بله، ایتا، واتساپ)" },
  { id: "marketplace", label: "مارکت‌پلیس‌ها (دیجی‌کالا، ترب، باسلام، ایمالز)" },
  { id: "accounting_crm", label: "یکپارچه‌سازی حسابداری و CRM (سپیدار، هلو، دیدار)" },
  { id: "ai_system", label: "هوش مصنوعی و OCR اسناد و فاکتورها" },
  { id: "scraping", label: "وب اسکرپینگ، خزنده و جمع‌آوری دیتا از وب" },
  { id: "dashboard", label: "داشبورد مدیریتی و گزارش‌گیری" },
  { id: "custom_rpa", label: "اتوماسیون کارهای تکراری اکسل و دسکتاپ (RPA)" },
];

/** نگاشت پارامتر ?service= صفحات سرویس (و لنگرهای قدیمی) به نوع پروژه در فرم */
const SERVICE_PARAM_MAP: Record<string, string> = {
  "telegram-bot": "telegram_bot",
  "sales-bot": "telegram_bot",
  "appointment-bot": "telegram_bot",
  "ai-chatbot": "ai_system",
  crm: "dashboard",
  "whatsapp-bot": "messengers",
  "trading-bot": "custom_rpa",
  "price-monitoring": "marketplace",
  ocr: "ai_system",
  // لنگرهای قدیمی صفحه‌ی خدمات
  marketplace: "marketplace",
  accounting: "accounting_crm",
  messengers: "messengers",
  scraping: "scraping",
  ai: "ai_system",
  rpa: "custom_rpa",
};

const BUDGET_OPTIONS = [
  { id: "under_30m", label: "زیر ۳۵ میلیون تومان (اتوماسیون متمرکز و ربات تکی)" },
  { id: "35_to_80m", label: "۳۵ تا ۸۰ میلیون تومان (اتصال دو سیستم، مثلا سپیدار به CRM)" },
  { id: "80_to_150m", label: "۸۰ تا ۱۵۰ میلیون تومان (سیستم جامع چندپلتفرمه)" },
  { id: "enterprise", label: "بیش از ۱۵۰ میلیون تومان (اتوماسیون سازمانی، ERP اختصاصی)" },
  { id: "not_sure", label: "نیازمند جلسه مشاوره جهت برآورد دقیق" },
];

export default function ProjectInquiryForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    phoneNumber: "",
    email: "",
    projectType: "marketplace",
    currentSoftware: "",
    estimatedBudget: "35_to_80m",
    projectDescription: "",
    preferredContactMethod: "phone",
  });

  // پیش‌انتخاب نوع پروژه از روی ?service= (لینک‌های «مشاوره این سرویس» در صفحات خدمات).
  // همان الگوی محاسبه در رندر که در Navbar استفاده شده — نه داخل افکت.
  const [appliedServiceParam, setAppliedServiceParam] = useState(false);
  if (!appliedServiceParam && typeof window !== "undefined") {
    setAppliedServiceParam(true);
    try {
      const param = new URLSearchParams(window.location.search).get("service");
      if (param) {
        const mapped = SERVICE_PARAM_MAP[param] ?? param;
        if (AUTOMATION_TYPES.some((t) => t.id === mapped)) {
          setFormData((prev) => ({ ...prev, projectType: mapped }));
        }
      }
    } catch {
      /* پارامتر آدرس هیچ‌وقت نباید مانع پرشدن فرم شود */
    }
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successResponse, setSuccessResponse] = useState<{
    inquiryId: number | null;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.phoneNumber.trim()) {
      setErrorMessage("لطفاً نام، نام شرکت و شماره تماس را وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // پاسخ را ایمن می‌خوانیم: اگر سرور یا پراکسی به‌جای JSON یک صفحه HTML
      // برگرداند، JSON.parse خطای گیج‌کننده «Unexpected token <» می‌داد.
      const raw = await res.text();
      let data: { success?: boolean; error?: string; message?: string; inquiryId?: number } = {};

      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          "پاسخ نامعتبری از سرور دریافت شد. لطفاً چند لحظه دیگر دوباره تلاش کنید یا مستقیماً در تلگرام پیام بدهید."
        );
      }

      if (!res.ok || data.success === false) {
        throw new Error(data.error || "خطایی در ثبت اطلاعات رخ داد.");
      }

      setSuccessResponse({
        inquiryId: data.inquiryId ?? null,
        message: data.message || "درخواست شما ثبت شد.",
      });
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "خطا در اتصال به سرور.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successResponse) {
    return (
      <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden backdrop-blur-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center mb-6">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        {successResponse.inquiryId !== null && (
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 font-mono-num">
            شماره پیگیری لید: #{successResponse.inquiryId}
          </span>
        )}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-3">
          درخواست شما ثبت شد و برای تیم نوین وب ارسال شد
        </h3>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          پیام شما همین لحظه به تیم نوین وب رسید. نیازمندی‌ها را بررسی می‌کنیم و حداکثر تا ۲۴ ساعت کاری برای
          ارائه سناریوی اولیه و هماهنگی جلسه آنلاین با شماره{" "}
          <strong className="text-white font-mono-num">{formData.phoneNumber}</strong> تماس می‌گیریم.
        </p>

        <div className="mt-8 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://t.me/Webnovobot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-800/60 text-cyan-300 text-xs font-semibold transition-colors"
          >
            <Send className="w-4 h-4" />
            ارسال فایل مستندات تکمیلی در تلگرام
          </a>
          <button
            type="button"
            onClick={() => {
              setSuccessResponse(null);
              setFormData({
                fullName: "",
                companyName: "",
                phoneNumber: "",
                email: "",
                projectType: "marketplace",
                currentSoftware: "",
                estimatedBudget: "35_to_80m",
                projectDescription: "",
                preferredContactMethod: "phone",
              });
            }}
            className="text-xs text-slate-400 hover:text-white underline"
          >
            ثبت یک پروژه یا سناریوی دیگر
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl relative backdrop-blur-xl space-y-8"
    >
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>فرم استعلام پروژه و دریافت برآورد اولیه رایگان</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          به ما بگویید چه فرایندی در کسب‌وکار شما نیاز به اتوماسیون دارد
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          اطلاعات فرم صرفاً برای بررسی درخواست شما در تلگرام داخلی تیم و پایگاه داده ثبت می‌شود (رمز یا دادهٔ
          حساس وارد نکنید)؛ پیش از هر دسترسی فنی در پروژه، در صورت درخواست قرارداد محرمانگی (NDA) امضا می‌شود.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-700/60 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Section 1: Contact info */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          ۱. اطلاعات تماس
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نام و نام‌خانوادگی شما: <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: مهندس رضوانی"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              نام شرکت / فروشگاه / برند: <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="مثال: بازرگانی آریا / فروشگاه دیجی‌پارت"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              شماره تماس شما: <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="۰۹۱۲XXXXXXX"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono-num"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ایمیل (اختیاری):
            </label>
            <input
              type="email"
              placeholder="info@yourcompany.ir"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono-num text-left"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Automation Type */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          ۲. حوزه اصلی پروژه اتوماسیون
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AUTOMATION_TYPES.map((type) => {
            const isSelected = formData.projectType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({ ...formData, projectType: type.id })}
                className={`p-3.5 rounded-xl text-right text-xs sm:text-sm font-medium border flex items-center justify-between transition-all ${
                  isSelected
                    ? "bg-cyan-950/50 border-cyan-500/80 text-cyan-200"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <span>{type.label}</span>
                {isSelected && (
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Current Software & Stack */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          ۳. نرم‌افزارها و ابزارهای فعلی شما
        </h4>
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            هم‌اکنون از چه نرم‌افزارهایی در کسب‌وکار شما استفاده می‌کنید؟
          </label>
          <input
            type="text"
            placeholder="مثال: سپیدار سیستم، دیدار CRM، سایت ووکامرسی، اکسل، پنل دیجی‌کالا..."
            value={formData.currentSoftware}
            onChange={(e) => setFormData({ ...formData, currentSoftware: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Section 4: Budget */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          ۴. بودجه تخمینی اختصاص‌یافته برای اجرای این سیستم:
        </label>
        <div className="relative">
          <select
            value={formData.estimatedBudget}
            onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
            className="w-full appearance-none px-4 py-2.5 pl-10 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 cursor-pointer"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id} className="bg-slate-900 text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Section 5: Description */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
          ۵. شرح نیازمندی و وضعیتی که قصد دارید اتوماسیون شود: <span className="text-red-400">*</span>
        </label>
        <textarea
          required
          rows={4}
          placeholder="توضیح دهید در حال حاضر کجای فرایند کاری کند است، پرسنل چه‌کارهایی را دستی انجام می‌دهند و هدف نهایی سیستم چیست..."
          value={formData.projectDescription}
          onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 resize-none leading-relaxed"
        />
      </div>

      {/* Section 6: Contact Preference */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-4 text-slate-300">
          <span className="font-semibold text-slate-400">روش ترجیحی ارتباط:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="phone"
              checked={formData.preferredContactMethod === "phone"}
              onChange={() => setFormData({ ...formData, preferredContactMethod: "phone" })}
              className="accent-cyan-400"
            />
            تماس تلفنی
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="telegram"
              checked={formData.preferredContactMethod === "telegram"}
              onChange={() => setFormData({ ...formData, preferredContactMethod: "telegram" })}
              className="accent-cyan-400"
            />
            تلگرام
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="contactMethod"
              value="whatsapp"
              checked={formData.preferredContactMethod === "whatsapp"}
              onChange={() => setFormData({ ...formData, preferredContactMethod: "whatsapp" })}
              className="accent-cyan-400"
            />
            واتساپ
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              در حال ارسال اطلاعات...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              ثبت درخواست و هماهنگی صحبت اولیه
            </>
          )}
        </button>
      </div>
    </form>
  );
}
