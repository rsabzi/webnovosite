"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Phone, Send, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

/**
 * دکمه‌ی تماس شناور — همیشه در گوشه‌ی صفحه در دسترس است.
 * با کلیک، سه مسیر تماس مستقیم باز می‌شود: تماس تلفنی، تلگرام و واتساپ.
 * کلیک‌ها با رویداد `contact_float_click` ثبت می‌شوند (بدون هیچ داده‌ی شخصی).
 */

const WHATSAPP_TEXT = {
  fa: "سلام! از سایت نوین وب آمدم و درباره ساخت ربات یا اتوماسیون کسب‌وکار سؤال داشتم.",
  en: "Hi! I came from the WebNovo website and have a question about building a bot or business automation.",
};

const CONTENT = {
  fa: {
    fabLabel: "تماس سریع",
    title: "با ما در تماس باشید",
    subtitle: "هر کدام را که راحت‌تر هستید انتخاب کنید؛ معمولاً خیلی زود جواب می‌دهیم.",
    phone: { label: "تماس تلفنی مستقیم", value: "۰۹۱۶۵۴۸۶۳۶۷" },
    telegram: { label: "تلگرام", value: "@Webnovobot" },
    whatsapp: { label: "واتساپ", value: "rezasabzi40" },
    close: "بستن",
  },
  en: {
    fabLabel: "Quick contact",
    title: "Talk to us",
    subtitle: "Pick whatever is easier for you — we usually reply very quickly.",
    phone: { label: "Direct phone call", value: "+98 916 548 6367" },
    telegram: { label: "Telegram", value: "@Webnovobot" },
    whatsapp: { label: "WhatsApp", value: "rezasabzi40" },
    close: "Close",
  },
} as const;

/* نشان واتساپ (SVG رسمی ساده‌شده) */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactFloat({ locale }: { locale: "fa" | "en" }) {
  const [open, setOpen] = useState(false);
  const t = CONTENT[locale];
  const waText = encodeURIComponent(WHATSAPP_TEXT[locale]);

  /* با کلید Escape بسته شود */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const channels = [
    {
      key: "phone" as const,
      href: "tel:09165486367",
      label: t.phone.label,
      value: t.phone.value,
      icon: <Phone className="h-4 w-4" />,
      chip: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
    },
    {
      key: "telegram" as const,
      href: "https://t.me/Webnovobot",
      label: t.telegram.label,
      value: t.telegram.value,
      icon: <Send className="h-4 w-4" />,
      chip: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    },
    {
      key: "whatsapp" as const,
      href: `https://wa.me/rezasabzi40?text=${waText}`,
      label: t.whatsapp.label,
      value: t.whatsapp.value,
      icon: <WhatsAppIcon className="h-4 w-4" />,
      chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-[80] sm:bottom-6 sm:left-6">
      {/* لایه‌ی نیمه‌شفاف برای بستن با کلیک بیرون */}
      {open && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default bg-transparent"
        />
      )}

      {/* پنل مسیرهای تماس */}
      <div
        role="dialog"
        aria-label={t.title}
        className={`absolute bottom-16 left-0 w-[min(19rem,calc(100vw-2rem))] origin-bottom-left rounded-2xl border border-slate-700/70 bg-slate-900/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-300 motion-reduce:transition-none sm:w-80 ${
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-white">{t.title}</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t.close}
            className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="mt-3 space-y-2">
          {channels.map((c) => (
            <li key={c.key}>
              <a
                href={c.href}
                target={c.key === "phone" ? undefined : "_blank"}
                rel="noopener noreferrer"
                onClick={() => trackEvent("contact_float_click", { locale, channel: c.key })}
                className="group flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-2.5 transition-all hover:border-cyan-600/50 hover:bg-slate-800/70 motion-reduce:transition-none"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${c.chip}`}>
                  {c.icon}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span className="text-xs font-bold text-white">{c.label}</span>
                  <span className="font-mono-num truncate text-[11px] text-slate-400">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* دکمه‌ی شناور اصلی */}
      <button
        type="button"
        onClick={() => {
          const next = !open;
          setOpen(next);
          trackEvent("contact_float_click", { locale, channel: next ? "open" : "close" });
        }}
        aria-label={t.fabLabel}
        aria-expanded={open}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl shadow-cyan-700/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-600/50 active:scale-95 motion-reduce:transition-none"
      >
        {/* حلقه‌ی نوری ملایم */}
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30 motion-reduce:animate-none"
          style={{ animationDuration: "3s" }}
        />
        {open ? (
          <X className="h-6 w-6 transition-transform duration-300 motion-reduce:transition-none" />
        ) : (
          <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none" />
        )}
      </button>
    </div>
  );
}
