"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Calculator,
  ChevronDown,
  ClipboardCheck,
  FolderOpen,
  HelpCircle,
  Info,
  LayoutGrid,
  Lightbulb,
  Menu,
  MessageSquare,
  PhoneCall,
  Sparkles,
  Workflow,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { NAV_SERVICES, getService } from "@/data/services";
import { trackEvent } from "@/lib/analytics";

/* منوی موبایل: فهرست کامل صفحه‌ها (مسیر ایده از دکمه‌ی بررسی ایده من در دسترس است) */
const NAV_LINKS = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/services", label: "خدمات اتوماسیون" },
  { href: "/automation-check", label: "بررسی رایگان اتوماسیون", badge: "رایگان" },
  { href: "/projects", label: "نمونه‌کارها", badge: `${PROJECTS.length.toLocaleString("fa-IR")} پروژه` },
  { href: "/case-studies", label: "مطالعات موردی" },
  { href: "/calculator", label: "محاسبه‌گر صرفه‌جویی", badge: "ROI" },
  { href: "/live-demo", label: "شبیه‌ساز زنده گردش کار", badge: "تستی" },
  { href: "/pricing", label: "پلن‌ها و تعرفه" },
  { href: "/blog", label: "بلاگ و راهنمای سفارش" },
  { href: "/about", label: "درباره ما و امنیت" },
  { href: "/contact", label: "تماس و ثبت پروژه" },
];

/* ------------------------------------------------------------------
   منوی دسکتاپ: به‌جای ۹ لینکِ بلند در یک ردیف، شش آیتم کوتاه
   با دو زیرمنوی بازشو (ابزارها / بیشتر) و فهرست نمونه‌کارها.
   ------------------------------------------------------------------ */

type NavChild = {
  href: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  badge?: string;
};

type NavItem =
  | { label: string; href: string; children?: undefined; align?: undefined }
  | { label: string; href?: string; children: NavChild[]; align?: "start" | "end" };

const CATEGORY_LABELS: Record<string, string> = {};
for (const category of PROJECT_CATEGORIES) {
  CATEGORY_LABELS[category.id] = category.label;
}

const FEATURED_PROJECTS: NavChild[] = PROJECTS.slice(0, 3).map((project) => ({
  href: `/projects/${project.slug}`,
  label: project.title,
  desc: `${CATEGORY_LABELS[project.category] ?? "نمونه‌کار"} · ${project.year}`,
  icon: FolderOpen,
}));

/* مسیر اول ورود: «می‌دانم چه می‌خواهم» — صفحات اختصاصی خدمات */
const SERVICE_NAV_CHILDREN: NavChild[] = NAV_SERVICES.map((slug) => {
  const service = getService(slug);
  return {
    href: `/services/${slug}`,
    label: service?.name ?? slug,
    desc: service ? service.h1.split("؛")[0].slice(0, 72) : "",
    icon: LayoutGrid,
  };
}).concat([
  {
    href: "/services",
    label: "همه‌ی خدمات",
    desc: "فهرست کامل سرویس‌ها و بخش‌های تخصصی",
    icon: LayoutGrid,
  },
]);

const DESKTOP_NAV: NavItem[] = [
  {
    label: "خدمات",
    href: "/services",
    children: SERVICE_NAV_CHILDREN,
  },
  {
    label: "نمونه‌کارها",
    href: "/projects",
    children: [
      ...FEATURED_PROJECTS,
      {
        href: "/projects",
        label: "همه‌ی نمونه‌کارها",
        desc: "فهرست کامل پروژه‌های تحویل‌شده و در حال کار",
        icon: LayoutGrid,
      },
    ],
  },
  { label: "مطالعات موردی", href: "/case-studies" },
  {
    label: "ابزارها",
    children: [
      {
        href: "/automation-check",
        label: "بررسی رایگان اتوماسیون",
        desc: "در ۸ گام کوتاه ببینید کجای کارتان قابل خودکارسازی است",
        icon: ClipboardCheck,
        badge: "رایگان",
      },
      {
        href: "/calculator",
        label: "محاسبه‌گر صرفه‌جویی",
        desc: "ببینید کار دستی چقدر هزینه دارد و چه زمانی برمی‌گردد",
        icon: Calculator,
      },
      {
        href: "/live-demo",
        label: "شبیه‌ساز زنده",
        desc: "سه سناریوی واقعی، بدون اتصال به سرویس خارجی",
        icon: Workflow,
        badge: "تستی",
      },
    ],
  },
  { label: "تعرفه‌ها", href: "/pricing" },
  { label: "بلاگ و راهنما", href: "/blog" },
  {
    label: "بیشتر",
    align: "end",
    children: [
      {
        href: "/about",
        label: "درباره ما",
        desc: "مسیر کاری، متدولوژی و ملاحظات امنیتی",
        icon: Info,
      },
      {
        href: "/faq",
        label: "سوالات پرتکرار",
        desc: "پاسخ به ابهام‌های رایج کارفرماها",
        icon: HelpCircle,
      },
      {
        href: "/contact",
        label: "تماس با ما",
        desc: "ثبت درخواست پروژه و رزرو جلسه",
        icon: MessageSquare,
      },
    ],
  },
];

/** زیرخطی که از سمت راست (ابتدای متن در RTL) باز می‌شود */
const underlineClass = (visible: boolean) =>
  `pointer-events-none absolute bottom-1 right-3 left-3 h-[2px] origin-right rounded-full bg-cyan-400 transition-transform duration-300 ${
    visible ? "scale-x-100" : "scale-x-0"
  }`;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const desktopNavRef = useRef<HTMLDivElement>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when the route changes (derived during render,
  // instead of a setState-in-effect which causes cascading renders)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  }

  // Close on Escape, and lock background scroll while the drawer is open
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  /* ---------------- رفتار زیرمنوهای دسکتاپ ---------------- */

  // با تغییر مسیر، هر زیرمنوی باز بسته می‌شود (همان الگوی بالا: محاسبه در حین
  // رندر به‌جای setState درون effect که باعث رندرهای زنجیره‌ای می‌شود)
  const [lastPathnameForMenu, setLastPathnameForMenu] = useState(pathname);
  if (pathname !== lastPathnameForMenu) {
    setLastPathnameForMenu(pathname);
    if (openMenu !== null) setOpenMenu(null);
  }

  const clearTimers = useCallback(() => {
    if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  // تأخیر کوتاه پیش از باز شدن: عبورِ اتفاقی موس از روی منو آن را باز نمی‌کند،
  // اما توقفِ واقعی روی آیتم بلافاصله منو را نشان می‌دهد.
  const openDropdown = useCallback(
    (label: string) => {
      clearTimers();
      openTimer.current = window.setTimeout(() => setOpenMenu(label), 120);
    },
    [clearTimers]
  );

  // تأخیر کوتاه هنگام خروج، تا رفت‌وبرگشتِ موس روی آیتم‌ها منو را نبندد
  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  }, [clearTimers]);

  useEffect(() => clearTimers, [clearTimers]);

  // کلیک بیرون از منو یا کلید Escape آن را می‌بندد
  useEffect(() => {
    if (!openMenu) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openMenu]);

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-800/30 py-1.5 px-4 text-xs sm:text-sm text-cyan-200 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold">
          <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: "3s" }} />
          بررسی رایگان اتوماسیون
        </span>
        <span>رایگان ببینید کجای کار شرکت شما وقت‌گیر است و چقدر می‌شود ساده‌ترش کرد</span>
        <Link
          href="/automation-check"
          onClick={() => trackEvent("automation_cta_click", { location: "top_announcement_bar" })}
          className="hidden sm:inline-flex items-center gap-1 text-cyan-300 hover:text-white underline font-semibold mr-1"
        >
          شروع بررسی رایگان <ArrowLeft className="w-3 h-3" />
        </Link>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-[60] transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--bg-night)]/90 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
            : "bg-[var(--bg-night)]/60 backdrop-blur-md border-b border-slate-800/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-[height] duration-300 ${
              isScrolled ? "h-16" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
                <div className="w-full h-full bg-[var(--bg-surface)] rounded-[11px] flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/logo-webnovo.png"
                    alt="لوگوی نوین وب"
                    width={36}
                    height={36}
                    priority
                    className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-night)] animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--bg-night)]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                    نوین وب
                  </span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40 font-mono-num">
                    webnovo
                  </span>
                </div>
                <span className="hidden xl:block text-[11px] text-slate-400 font-medium tracking-wide">
                  اتوماسیون هوشمند کسب‌وکار
                </span>
              </div>
            </Link>

            {/* Desktop Navigation — شش آیتم کوتاه + زیرمنو */}
            <nav
              ref={desktopNavRef}
              aria-label="منوی اصلی"
              className="hidden lg:flex items-center gap-0.5 xl:gap-1"
              onMouseLeave={scheduleClose}
            >
              {DESKTOP_NAV.map((item) => {
                if (!item.children) {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onMouseEnter={scheduleClose}
                      className={`group relative flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                        isActive
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className={underlineClass(isActive) + " group-hover:scale-x-100"} />
                    </Link>
                  );
                }

                const isOpen = openMenu === item.label;
                const panelId = `desktop-menu-${item.label}`;
                const isParentActive =
                  !!item.href &&
                  (pathname === item.href || pathname.startsWith(`${item.href}/`));

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => openDropdown(item.label)}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        // کلیک باید بی‌درنگ پاسخ بدهد (تأخیرِ هاور اینجا اعمال نمی‌شود)
                        clearTimers();
                        setOpenMenu(isOpen ? null : item.label);
                      }}
                      aria-expanded={isOpen}
                      aria-haspopup="true"
                      aria-controls={panelId}
                      className={`group relative flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors focus:outline-none ${
                        isOpen || isParentActive
                          ? "text-cyan-400"
                          : "text-slate-300 hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      <span
                        className={
                          underlineClass(isOpen || isParentActive) + " group-hover:scale-x-100"
                        }
                      />
                    </button>

                    {/* پنل همیشه در DOM است تا انیمیشن باز/بسته شدن حفظ شود؛
                        اما وقتی بسته است نباید هیچ رویداد موسی را بگیرد
                        (وگرنه رد شدن از پایین منو هم آن را باز می‌کرد). */}
                    <div
                      id={panelId}
                      className={`absolute top-full z-[70] pt-3 ${
                        item.align === "end" ? "left-0" : "right-0"
                      } ${isOpen ? "" : "pointer-events-none"}`}
                    >
                      <div
                        className={`w-[min(20rem,calc(100vw-2rem))] max-h-[min(30rem,calc(100vh-9rem))] overflow-y-auto rounded-2xl border border-slate-800 bg-[var(--bg-surface)] p-2 shadow-2xl shadow-black/40 transition-all duration-200 ${
                          isOpen
                            ? "visible translate-y-0 opacity-100"
                            : "invisible -translate-y-1 opacity-0"
                        }`}
                      >
                        {item.children.map((child) => {
                          const ChildIcon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setOpenMenu(null)}
                              className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-slate-800/60"
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-cyan-400 transition-colors group-hover/item:border-cyan-500/40 group-hover/item:text-cyan-300">
                                <ChildIcon className="h-4 w-4" />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="flex items-center gap-2">
                                  <span className="line-clamp-2 text-[13.5px] font-semibold leading-snug text-[var(--text-primary)]">
                                    {child.label}
                                  </span>
                                  {child.badge && (
                                    <span className="shrink-0 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-1.5 py-0.5 text-[10px] font-bold text-cyan-300">
                                      {child.badge}
                                    </span>
                                  )}
                                </span>
                                <span className="mt-0.5 block text-[11.5px] leading-relaxed text-slate-400 line-clamp-2">
                                  {child.desc}
                                </span>
                              </span>
                              <ArrowLeft className="mt-2.5 h-3.5 w-3.5 shrink-0 text-slate-600 transition-all group-hover/item:-translate-x-1 group-hover/item:text-cyan-400" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Right Action Buttons — دو مسیر ورود همیشه در دید */}
            <div className="hidden lg:flex items-center gap-2">
              <ThemeToggle />

              {/* Full page reload on purpose: the root layout (chrome) only
                  re-renders on a fresh server request. */}
              <a
                href={pathname === "/" ? "/en" : `/en${pathname}`}
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[12px] font-bold text-slate-200 transition-colors hover:border-slate-500"
              >
                EN
              </a>

              <Link
                href="/idea"
                onClick={() => trackEvent("idea_cta_click", { location: "navbar" })}
                className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-950/40 px-4 py-2.5 text-[13px] font-semibold text-cyan-300 transition-colors hover:border-cyan-400/60 hover:text-cyan-200"
              >
                <Lightbulb className="h-4 w-4" />
                <span>بررسی ایده من</span>
              </Link>

              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-md shadow-cyan-600/25 hover:shadow-cyan-500/40 active:scale-95 transition-all group overflow-hidden"
              >
                <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200 group-hover:rotate-12 transition-transform" />
                <span>مشاوره درباره پروژه</span>
              </Link>
            </div>

            {/* Mobile: theme toggle + menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={pathname === "/" ? "/en" : `/en${pathname}`}
                className="px-2.5 py-2 rounded-xl text-[11px] font-bold text-slate-200 border border-slate-700 bg-slate-900"
              >
                EN
              </a>
              <ThemeToggle className="w-9 h-9" />
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className="lg:hidden relative z-[80] p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              aria-label={isMobileMenuOpen ? "بستن منو" : "باز کردن منو"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Backdrop behind the mobile drawer */}
        {isMobileMenuOpen && (
          <button
            type="button"
            aria-label="بستن منو"
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 top-20 z-[65] bg-black/60 cursor-default"
          />
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden absolute top-full inset-x-0 z-[70] max-h-[calc(100vh-5rem)] overflow-y-auto border-b border-slate-800 bg-[var(--bg-surface)] px-4 pt-3 pb-6 space-y-2 shadow-2xl"
          >
            <div className="space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-cyan-950/60 text-cyan-300 border border-cyan-800/40"
                        : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <a
                href="tel:09165486367"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold text-slate-200 border border-slate-700 bg-slate-900"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>تماس فوری: ۰۹۱۶۵۴۸۶۳۶۷</span>
              </a>

              <Link
                href="/idea"
                onClick={() => {
                  trackEvent("idea_cta_click", { location: "mobile_menu" });
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-cyan-200 border border-cyan-500/40 bg-cyan-950/40"
              >
                <Lightbulb className="w-4 h-4" />
                <span>ایده‌ام را مطرح می‌کنم</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-cyan-600/30"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>می‌دانم چه می‌خواهم؛ ثبت پروژه</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
