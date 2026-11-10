/**
 * English copy for /en/projects — mirrors src/data/projects.ts per slug.
 * Persian file stays the source of images, stack and links.
 */

export type ProjectEn = {
  title: string;
  subtitle: string;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  results: { label: string; value: string }[];
  liveNote?: string;
};

export const CATEGORY_LABELS_EN: Record<string, string> = {
  all: "All projects",
  bots: "Telegram & messenger bots",
  dashboards: "Management dashboards",
  integration: "Integrations & APIs",
  ai: "AI & data processing",
  web: "Web & brand",
  android: "Android apps",
};

export const PROJECTS_EN: Record<string, ProjectEn> = {
  "receipt-ocr-verification": {
    title: "Bank Receipt OCR Verification",
    subtitle: "AI reading of card-to-card receipts with duplicate/tamper detection and human review queue",
    summary:
      "A live OCR system that reads bank receipt photos, matches them against expected payments and flags duplicates or tampered images for human review — used inside our payment bots.",
    challenge:
      "Admins verified deposit receipts by eye; forged or duplicate receipts occasionally slipped through, and manual checking slowed order delivery.",
    solution:
      "An OCR + validation pipeline extracts amount, date and tracking number, matches them to the expected payment, detects reuse/tampering and routes suspicious cases to a review queue.",
    highlights: [
      "Persian receipt OCR in production",
      "Automatic approve/reject against expected payments",
      "Human-review queue for edge cases",
    ],
    results: [
      { label: "Payment verification time", value: "Hours → seconds" },
      { label: "Manual support workload", value: "Substantially reduced" },
      { label: "Duplicate or suspicious slips", value: "Auto-checked + review queue" },
    ],
  },
  "marketplace-price-bot": {
    title: "Marketplace Price Monitoring Bot",
    subtitle: "Competitor price and stock monitoring with margin-based automatic repricing",
    summary:
      "A monitoring bot that tracks competitor prices and stock on marketplaces, alerts on changes and updates the store's prices automatically within a margin formula defined by the owner.",
    challenge:
      "Manual price checks every morning couldn't keep up with competitor changes, leading to lost buy-boxes or sales below cost.",
    solution:
      "Scheduled scraping with change alerts and automatic repricing bounded by the owner's margin rules, plus dashboards and Excel outputs.",
    highlights: [
      "Scheduled competitor monitoring",
      "Margin-bounded automatic repricing",
      "Instant change alerts",
    ],
    results: [
      { label: "Competitor price reaction", value: "Hours → seconds" },
      { label: "Manual work freed up", value: "Hours saved monthly" },
      { label: "Out-of-stock listings", value: "Auto-disabled when stock hits zero" },
    ],
  },
  "webnovo-portfolio": {
    title: "WebNovo Portfolio & Automation Website",
    subtitle: "The site you are on: Next.js, RTL/LTR bilingual, SEO-structured, with free automation tools",
    summary:
      "Our own site: a bilingual (Persian/English) Next.js platform with structured SEO, interactive tools like the automation check and ROI calculator, and a live workflow simulator.",
    challenge:
      "Presenting a technical portfolio to non-technical business owners required clear language, honest claims and fast, SEO-friendly pages.",
    solution:
      "App Router with static rendering where possible, structured data, hreflang bilingual architecture and interactive tools that demonstrate the work instead of describing it.",
    highlights: [
      "Bilingual fa/en with hreflang and per-language sitemaps",
      "Interactive automation check and ROI calculator",
      "Structured data and honest, business-first copy",
    ],
    results: [
      { label: "New-lead alert latency", value: "Immediate via Telegram" },
      { label: "Visitor conversion paths", value: "Clear entry points across pages" },
      { label: "Deployment", value: "Ready on Vercel" },
    ],
  },
  "nobat-sabz": {
    title: "Nobat Sabz (SabzTime)",
    subtitle: "Business appointment booking: Telegram bot, web app and native Android app on one core",
    summary:
      "Nobat Sabz is a complete appointment and business management system delivered as a Telegram bot, a web app and a native Android app. Business owners define services, prices, working hours and time slots; customers book online; reminders, rescheduling, cancellations, payments and reporting all live in the same system.",
    challenge:
      "Booking is not a single task: registering businesses and branches, defining services and prices, working hours, time slots, customer reminders, cancellations and rescheduling, payments and customer communication form one connected cycle. Nobat Sabz was built to simplify that cycle for businesses and to deliver an orderly, automated experience.",
    solution:
      "One PHP/MySQL backend serves every role — business owner, customer and marketer — from a single data source. The main entry point is the Telegram bot with menus, inline buttons, deep links and a web app; alongside it sit a full web app (search, booking, calendar, owner and marketer panels) and a native Android app built with Kotlin and Jetpack Compose with a Jalali calendar and WorkManager reminders. Payments are integrated through Zarinpal and subscription packages with customer credit, and WooCommerce integration is available as an option.",
    highlights: [
      "Online booking with time slots, calendar, cancellation/rescheduling and automatic reminders",
      "Dedicated booking link (alias) per business, plus marketer deep links",
      "Location- and category-based business search with smart caching and full-text search",
      "Integrated payments: Zarinpal gateway, subscription packages, customer credit and optional WooCommerce",
      "Marketer panel with referral links and commissions, plus customer attendance tracking and credit score",
      "Native Android app (Kotlin + Jetpack Compose) with Jalali calendar and WorkManager reminders",
    ],
    results: [
      { label: "Booking workflow for businesses", value: "Fully automated and online" },
      { label: "Pre-appointment reminders", value: "Automatic, no manual follow-up" },
      { label: "Cancellations and rescheduling", value: "Self-service by the customer" },
      { label: "Today's appointments and queue", value: "Always available on Telegram, web and Android" },
    ],
  },
  "novo-music-player": {
    title: "Novo Music Player (Android)",
    subtitle: "A polished Android music player: gestures, widgets, equalizer and full Persian support",
    summary:
      "A consumer Android music player with swipe gestures, home-screen widgets, a 5-band equalizer and complete Persian localization — showing our range beyond business automation.",
    challenge:
      "Delivering a smooth, gesture-driven player with widgets and equalizer across diverse Android devices and versions.",
    solution:
      "A native Android app with a gesture-based now-playing screen, customizable widgets, graphical equalizer and full RTL/Persian UI.",
    highlights: [
      "Swipe-based now-playing experience",
      "Home-screen widget with controls",
      "5-band graphical equalizer",
      "Full Persian/RTL localization",
    ],
    results: [
      { label: "Package size", value: "~13 MB" },
      { label: "Compatibility", value: "Android 7 to 16" },
      { label: "Widget controls", value: "6 buttons + timeline" },
      { label: "Pricing model", value: "Free, ad-free" },
    ],
    liveNote: "Submitted on Cafe Bazaar (under review) + separate tester release channel",
  },
};

export function getProjectEn(slug: string): ProjectEn | undefined {
  return PROJECTS_EN[slug];
}
