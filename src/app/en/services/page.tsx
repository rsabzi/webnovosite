import type { Metadata } from "next";
import Link from "next/link";
import EnAutomationCheckCta from "@/components/EnAutomationCheckCta";
import {
  TrendingUp,
  Database,
  Cpu,
  Code2,
  Sparkles,
  FileSpreadsheet,
  ArrowRight,
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
import { SERVICES_EN } from "@/data/services.en";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Bot, Tool & Automation System Building Services | WebNovo",
  description:
    "Telegram bots, sales and order bots, booking, auto-answering, CRM, WhatsApp bots, price bots and web scraping, invoice OCR and trading bots — if you know what you want, tell us and we build it.",
  alternates: { canonical: `${SITE_URL}/en/services` },
};

/** Icon map for the services grid cards */
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

/** Specialist sections — same anchors (ids) as the Persian page */
const DETAILS_EN = [
  {
    id: "marketplace",
    title: "Pricing & marketplace monitoring bots (Torob, Digikala, Basalam, Emalls)",
    badge: "Retail & e-commerce",
    icon: TrendingUp,
    overview:
      "In competitive markets, whoever reacts to competitor price changes first keeps the Digikala buy-box and the Torob ranking. Our monitoring bots watch prices 24/7 and apply the best price using a margin formula you define.",
    capabilities: [
      "Continuous monitoring of competitor sellers' prices and stock on Torob and Emalls, minutes apart",
      "Automatic margin-formula calculation and minimum allowed price to prevent selling at a loss",
      "Integration with the Digikala sellers web service and your store (WooCommerce, Sapper and similar)",
      "Automatic out-of-stock marking the moment warehouse inventory runs out",
      "Proxy management and request-rate control for stable, block-free monitoring",
      "Instant price-change reports via a Telegram bot",
    ],
    techStack: ["Python", "Playwright", "FastAPI", "Digikala Seller API", "Torob Engine", "Redis"],
    realExample:
      "A home-appliance store with a wide product range spent a large part of each day checking Torob manually. After deploying the bot, their monthly Digikala sales saw clear growth and the manual work disappeared.",
    relatedLinks: [{ href: "/en/services/price-monitoring", label: "Price bot & web scraping page" }],
  },
  {
    id: "accounting",
    title: "Connecting accounting software (Sepidar, Holoo) to your site and sales systems",
    badge: "Finance, warehouse & sales",
    icon: Database,
    overview:
      "When the accounting software is disconnected from the online store, manual invoice entry, human error and wrong stock deductions are unavoidable. We connect the Sepidar and Holoo databases directly to your store, sales systems and — if needed — the taxpayer e-invoicing system.",
    capabilities: [
      "Automatic pro-forma and final invoice issuance the moment an online order is placed",
      "Automatic warehouse exit dispatch registration and product cardex updates",
      "Automatic electronic invoice submission to the taxpayer system when required",
      "Transferring new customers into your sales panel or customer-management system",
      "Synchronising credit-customer account balances",
      "Working through standard database and web-service routes — no unauthorised tampering",
    ],
    techStack: ["MS SQL Server", "Sepidar DB", "Didar CRM", "WooCommerce", "Python / C#"],
    realExample:
      "A distribution company connected its online store directly to Sepidar so incoming wholesale orders generate invoices and warehouse dispatches without manual re-typing.",
    relatedLinks: [{ href: "/en/services/crm", label: "CRM & customer management panel page" }],
  },
  {
    id: "messengers",
    title: "Custom bots for Telegram, Bale, Eitaa, Rubika and WhatsApp",
    badge: "Sales, support & customer interaction",
    icon: Cpu,
    overview:
      "Your customers live in messengers. A custom bot can show the catalogue, take orders, collect bank receipts and answer common questions — effectively a branch that is open 24/7.",
    capabilities: [
      "Supporting several messengers at once on one shared server",
      "Web admin panel for broadcasts, user management and log viewing",
      "Payment gateway integration (Zarinpal and similar) inside the bot itself",
      "Smart chat handoff to a human operator when needed",
      "Automatic tracking-code and order-status messages to the buyer",
      "Customer balance and statement inquiries through the bot",
    ],
    techStack: ["Telegram Bot API", "Bale Bot API", "Eitaa", "Python / Node.js", "PostgreSQL"],
    realExample:
      "An educational institute handled document collection, card-to-card payment verification and entrance-card issuance for a large volume of participants during registration season — entirely through Telegram and Bale bots.",
    relatedLinks: [
      { href: "/en/services/telegram-bot", label: "Telegram bot page" },
      { href: "/en/services/whatsapp-bot", label: "WhatsApp bot page" },
      { href: "/en/services/appointment-bot", label: "Booking bot page" },
      { href: "/en/services/sales-bot", label: "Sales & order bot page" },
    ],
  },
  {
    id: "scraping",
    title: "Web scraping, data collection & website monitoring",
    badge: "Data & market analysis",
    icon: Code2,
    overview:
      "If you know what your competitors sell and at what price, or which opportunities exist on target sites, you are always a few steps ahead. We extract scattered web data and deliver it clean and structured.",
    capabilities: [
      "Structured crawling of websites at controlled speed and scale",
      "Monitoring target sites and sending alerts to Telegram",
      "Extracting product lists, specifications and reviews",
      "Captcha handling and rotating IPs for stable monitoring",
      "Delivering output as Excel, JSON or a direct connection to your database",
      "Periodic scheduling for automatically refreshed data",
    ],
    techStack: ["Playwright", "Selenium", "Scrapy", "BeautifulSoup", "Proxy Rotation", "Docker"],
    realExample:
      "An importing company monitored price movements of dozens of suppliers in one dashboard with a scraping bot and made its bulk purchasing decisions with data.",
    relatedLinks: [{ href: "/en/services/price-monitoring", label: "Price bot & web scraping page" }],
  },
  {
    id: "ai",
    title: "Applied AI: reading financial documents & smart answering",
    badge: "AI & document processing",
    icon: Sparkles,
    overview:
      "Nobody needs to type bank receipt amounts or paper invoice figures by hand anymore. Our systems turn image data into structured records and, when genuinely needed, answer customer questions like a real responder.",
    capabilities: [
      "Reading card-to-card receipts: amount, tracking number, date, and matching against the expected payment",
      "Detecting duplicate or suspicious receipts and routing them to human review",
      "Turning scanned invoices into structured Excel rows",
      "A chatbot trained on your documentation and catalogue",
      "Summarising and categorising support tickets",
    ],
    techStack: ["OpenAI / LLMs", "Persian OCR", "RAG Pipeline", "FastAPI"],
    realExample:
      "A sales platform processed and verified hundreds of daily deposit receipts without any finance-staff involvement, eliminating typing errors.",
    relatedLinks: [
      { href: "/en/services/ocr", label: "Invoice & receipt OCR page" },
      { href: "/en/services/ai-chatbot", label: "Answering bot & chatbot page" },
    ],
  },
  {
    id: "rpa",
    title: "Automating desktop work, Excel and systems without web services",
    badge: "Repetitive office work",
    icon: FileSpreadsheet,
    overview:
      "Repetitive work done in legacy desktop software, systems without web services or Excel files with hundreds of columns is exhausting for humans — but for a good script it takes seconds.",
    capabilities: [
      "Automatic form and invoice entry in traditional systems with no API",
      "Merging and reconciling warehouse, finance and sales Excel files",
      "Automatic download of daily reports and sending a summary email",
      "Scheduled execution outside working hours",
      "Auditable output and a complete log of every run",
    ],
    techStack: ["PyAutoGUI", "OpenPyXL", "Windows Automation", "Cron / Task Scheduler"],
    realExample:
      "A trading company turned data entry across multiple disconnected systems — hours of daily work — into a matter of minutes of automated work.",
    relatedLinks: [{ href: "/en/idea", label: "Pitch your idea and we'll review it" }],
  },
];

export default function EnServices() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Zap className="h-3.5 w-3.5" />
            WebNovo services — bots, tools & automation systems
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            You know what you want? Tell us and we&apos;ll build it
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            From sales and order bots to booking, auto-answering, custom tools and trading bots; we
            build each service around your real need — nothing more. Every project ships with source
            code and support per contract.
          </p>
        </div>

        {/* Need-based categories */}
        <section aria-label="Start from your need" className="space-y-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-black text-white sm:text-2xl">Start from what you need</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
              You don&apos;t need to know the technical name of the solution; pick the need closest to you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Bot,
                title: "Telegram bots & custom tools",
                items: "Personal & utility bots · Channel & group management · File processing · API-based bots · Smart bots",
                href: "/en/services/telegram-bot",
                cta: "Start with Telegram bots",
              },
              {
                icon: ShoppingCart,
                title: "Sales & management tools",
                items: "Order intake & sales · Customer management · Notifications & follow-ups · Admin panels · Service connections",
                href: "/en/services/sales-bot",
                cta: "Start with sales tools",
              },
              {
                icon: Sparkles,
                title: "Automation & AI",
                items: "Cutting repetitive manual steps · Connecting tools · Processing documents & data · Data extraction & monitoring · AI assistants",
                href: "/en/services/ocr",
                cta: "Start with automation",
              },
              {
                icon: Lightbulb,
                title: "Custom ideas",
                items: "Feasibility review · First-version scope · Cost & time estimate · Build after agreement",
                href: "/en/idea",
                cta: "I'll pitch my idea",
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
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Services grid */}
        <section aria-label="Services list">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] ?? Bot;
              const colors = SERVICE_COLORS[service.color];
              const en = SERVICES_EN[service.slug];
              return (
                <Link
                  key={service.slug}
                  href={`/en/services/${service.slug}`}
                  className="glass-panel glass-panel-hover group flex flex-col justify-between rounded-2xl p-6"
                >
                  <div className="space-y-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colors.iconBox}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h2 className={`text-base font-bold text-white transition-colors ${colors.titleHover}`}>
                      {en?.name ?? service.name}
                    </h2>
                    <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
                      {en?.intro ?? service.metaDescription.split("؛")[0]}.
                    </p>
                  </div>
                  <span className={`mt-5 flex items-center gap-1.5 border-t border-slate-800 pt-4 text-xs font-semibold ${colors.link}`}>
                    Details & work samples
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}

            {/* Open idea card */}
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-cyan-500/40 bg-gradient-to-br from-slate-900 to-cyan-950/40 p-6 shadow-xl shadow-cyan-950/30">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl" />
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/15 text-cyan-300">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h2 className="text-base font-bold text-white">Your idea isn&apos;t on this list?</h2>
                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">
                  That&apos;s fine. You don&apos;t need to know exactly what should be built;
                  describe your process or idea and we&apos;ll review how it can become a real tool.
                </p>
              </div>
              <Link
                href="/en/idea"
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95"
              >
                I&apos;ll describe my idea
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Specialist detail sections */}
        <div className="space-y-12">
          {DETAILS_EN.map((s) => {
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
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ))}
                    <Link
                      href={`/en/contact?service=${s.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-cyan-600/60 hover:text-white sm:text-sm"
                    >
                      Consult about this area
                    </Link>
                  </div>
                </div>

                <div className="space-y-6 py-6">
                  <p className="text-sm font-normal leading-relaxed text-slate-300 sm:text-base">{s.overview}</p>

                  <div className="space-y-3">
                    <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                      <CheckCircle2 className="h-4 w-4" />
                      What does it do?
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
                    <span className="mb-1 block font-bold text-cyan-300">One example of a real result:</span>
                    <p className="leading-relaxed text-slate-400">{s.realExample}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-2 text-xs">
                    <span className="font-medium text-slate-400">Common tools in this area:</span>
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

        {/* Final banner */}
        <div className="rounded-3xl border border-cyan-700/40 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-8 text-center shadow-2xl sm:p-12">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Wasn&apos;t your idea on the list?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            That&apos;s fine. You don&apos;t need to know exactly what should be built. Describe
            your process or idea; we review what can turn it into a real tool.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 pt-5 sm:flex-row">
            <Link
              href="/en/idea"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
            >
              <Lightbulb className="h-4 w-4" />
              I&apos;ll describe my idea
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-8 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
            >
              Talk about a specific project
            </Link>
          </div>
        </div>

        <EnAutomationCheckCta
          compact
          location="services_page"
          title="Not sure which service fits your business?"
        />
      </div>
    </main>
  );
}
