import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { EnNavbar, EnFooter } from "@/components/EnChrome";
import { Analytics } from "@vercel/analytics/react";
import SiteTracker from "@/components/SiteTracker";
import ContactFloat from "@/components/ContactFloat";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // نوار آدرس مرورگر موبایل هم‌رنگ پس‌زمینه شب می‌شود
  themeColor: "#030712",
  colorScheme: "dark",
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "نوین وب | طراحی ربات، ابزار و سیستم‌های اتوماسیون برای کسب‌وکارها",
  description:
    "نوین وب ایده‌ها و کارهای تکراری کسب‌وکارها را به ابزارهای واقعی تبدیل می‌کند: طراحی ربات تلگرام، ربات فروش و ثبت سفارش، نوبت‌دهی، پاسخگویی خودکار، ربات واتساپ، ربات قیمت، وب اسکرپینگ، هوش مصنوعی و ربات ترید.",
  keywords: [
    "طراحی ربات تلگرام",
    "ربات فروش",
    "ربات ثبت سفارش",
    "ربات نوبت‌دهی",
    "ربات واتساپ",
    "ربات قیمت",
    "وب اسکرپینگ",
    "ربات ترید",
    "اتوماسیون کسب و کار",
    "نوین وب",
    "webnovo",
  ],
  authors: [{ name: "رضا سبزی — نوین وب" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "نوین وب | Webnovo",
    title: "نوین وب | طراحی و ساخت انواع ربات برای اتوماسیون و هوشمندسازی کسب‌وکار شما",
    description:
      "طراحی ربات تلگرام، ربات فروش و ثبت سفارش، نوبت‌دهی، پاسخگویی خودکار، ربات قیمت، وب اسکرپینگ و ابزارهای اختصاصی؛ با نمونه‌کار واقعی و تحویل سورس‌کد.",
    images: ["/images/hero-automation.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "نوین وب | طراحی ربات و سیستم‌های اتوماسیون برای کسب‌وکارها",
    description: "از ایده تا ابزار واقعی — ربات‌ها و سیستم‌هایی که کارهای تکراری کسب‌وکار را انجام می‌دهند.",
    images: ["/images/hero-automation.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

/**
 * داده‌ی ساختاریافته‌ی سازمان (JSON-LD) — به موتورهای جست‌وجو می‌گوید نوین وب
 * یک کسب‌وکار مشخص با چه تخصص‌هایی است. هیچ ادعای غیرقابل‌سنجش در آن نیست.
 */
const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: "نوین وب | WebNovo",
      alternateName: "Webnovo",
      url: SITE_URL,
      email: "rsabzi714@gmail.com",
      telephone: "+989165486367",
      description:
        "طراحی ربات، ابزار و سیستم‌های اتوماسیون برای کسب‌وکارها: ربات تلگرام و پیام‌رسان‌ها، ربات فروش و ثبت سفارش، نوبت‌دهی، پاسخگویی خودکار، ربات قیمت و وب اسکرپینگ، و ربات ترید.",
      areaServed: { "@type": "Country", name: "Iran" },
      founder: { "@type": "Person", name: "رضا سبزی" },
      knowsAbout: [
        "طراحی ربات تلگرام",
        "ربات فروش و ثبت سفارش",
        "ربات نوبت‌دهی",
        "پاسخگویی خودکار مشتری",
        "ربات قیمت و وب اسکرپینگ",
        "ربات ترید و اتصال به صرافی",
        "اتوماسیون کسب‌وکار",
      ],
      sameAs: ["https://t.me/Webnovobot", "https://github.com/rsabzi"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "نوین وب | WebNovo",
      inLanguage: ["fa-IR", "en"],
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // middleware زبان و مسیر را از روی URL تشخیص داده و در هدرها گذاشته است
  const h = await headers();
  const locale = h.get("x-locale") === "en" ? "en" : "fa";
  const pathname = h.get("x-pathname") ?? "/";
  const faPath = locale === "en" ? (pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/") : pathname;
  const enPath = locale === "en" ? pathname : pathname === "/" ? "/en" : `/en${pathname}`;
  const isEn = locale === "en";

  return (
    <html
      lang={isEn ? "en" : "fa-IR"}
      dir={isEn ? "ltr" : "rtl"}
      className="dark"
      style={{ colorScheme: "dark", backgroundColor: "#030712" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* hreflang دوطرفه برای هر صفحه — سیگنال اصلی سئوی چندزبانه */}
        <link rel="alternate" hrefLang="fa" href={`${SITE_URL}${faPath}`} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${enPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${faPath}`} />
        {/* پیش از اولین رنگ‌آمیزی اجرا می‌شود تا هنگام لود، پرش تم (FOUC) رخ ندهد */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('webnovo-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}var r=document.documentElement;if(t==='light'){r.classList.add('light');}r.style.colorScheme=t;}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--bg-night)] text-slate-100 tech-grid-pattern selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="relative flex min-h-screen flex-col">
          {isEn ? <EnNavbar /> : <Navbar />}
          <div className="flex-1">{children}</div>
          {isEn ? <EnFooter /> : <Footer />}
        </div>
        <SiteTracker />
        <ContactFloat locale={isEn ? "en" : "fa"} />
        <Analytics />
      </body>
    </html>
  );
}
