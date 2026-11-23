"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Award } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All projects" },
  { id: "marketplace", label: "Marketplace & Torob" },
  { id: "accounting", label: "Sepidar, Holoo & CRM" },
  { id: "messengers", label: "Telegram, Bale & Eitaa" },
  { id: "scraping_ai", label: "Scraping & AI" },
];

const CASE_STUDIES = [
  {
    id: "auto-parts-torob",
    category: "marketplace",
    client: "Pishtaz Auto Parts Trading Co.",
    field: "Auto spare-parts distribution and retail on Torob & Digikala",
    challenge:
      "The sales team manually checked prices of a wide range of SKUs on Torob for hours every day, then updated the Digikala seller panel and their own site. After each competitor price change, their turn to update took hours and they lost the buy-box. Several times, out-of-stock items kept selling, triggering Digikala penalties.",
    solution:
      "WebNovo built a dedicated Python + Playwright monitoring bot with rotating domestic IPs. At regular intervals it scrapes competitor prices on Torob, matches them against the warehouse's allowed-margin Excel table and automatically updates prices via the Digikala sellers web service and WooCommerce. When stock hits zero, the item is instantly marked unavailable.",
    results: [
      { label: "Pricing on Digikala & store", value: "Automated within margin floor" },
      { label: "Reaction to competitor changes", value: "Hours → seconds" },
      { label: "Daily manual Torob checks", value: "Handled by scheduled bot" },
      { label: "Out-of-stock order risk", value: "Auto-disabled when stock hits zero" },
    ],
    tech: ["Python", "Playwright", "Digikala Seller API", "Torob Engine", "Redis Queue"],
    quote:
      "“Previously we noticed competitor price drops hours late; automating Torob checks inside strict margin rules freed the sales team to focus on sourcing.”",
    author: "Alireza Soleimani — Market Development Manager",
  },
  {
    id: "sepidar-didar-distribution",
    category: "accounting",
    client: "Arvand Food & Hygiene Distribution Co.",
    field: "Nationwide capillary distribution and B2B online store",
    challenge:
      "Online orders from supermarkets and pharmacies arrived daily via the website and visitor software. Accounting staff typed orders one by one into Sepidar. Item-code typos, missed items and central-warehouse mismatches caused significant return costs.",
    solution:
      "A two-way integrator between the online store, Didar CRM and the Sepidar SQL Server database. On each order, the sales-invoice procedure and warehouse dispatch are executed in Sepidar, the customer profile updates in Didar, and an SMS with the invoice number goes to the customer.",
    results: [
      { label: "Official invoice & dispatch issuing", value: "Automated on order placement" },
      { label: "Manual item typing in Sepidar", value: "Manual typing eliminated" },
      { label: "Store & CRM synchronization", value: "Automated two-way sync" },
      { label: "Warehouse handoff", value: "Same day, without manual queue" },
    ],
    tech: ["Sepidar SQL Procedures", "Didar CRM API", "WooCommerce Webhooks", "Node.js Microservice"],
    quote:
      "“The Sepidar database connection was tested step by step before launch so accounting records stayed intact. Our accountants now focus on collections instead of typing orders.”",
    author: "Hamid Pourmand — Finance Manager, Arvand",
  },
  {
    id: "telegram-ai-academy",
    category: "messengers",
    client: "Andisheh Bartar Educational Institute",
    field: "Online courses and nationwide entrance-exam tests",
    challenge:
      "Near exam season and discount campaigns, floods of students made card-to-card deposits and sent receipt images to direct messages and Telegram. Support worked late yet each student waited hours for access; several forged receipts slipped through.",
    solution:
      "A two-way Telegram + Bale bot with WebNovo's Persian AI OCR engine. The bot reads the bank receipt — tracking number, date, amount, account holder — in moments, verifies the deposit via the bank web service and instantly activates course access.",
    results: [
      { label: "Receipt check & course access", value: "Automated, around the clock" },
      { label: "Duplicate or suspicious receipts", value: "Auto-checked; flagged for review" },
      { label: "Support ticket load", value: "Focused only on edge cases" },
      { label: "Student wait time", value: "Hours → moments after confirmation" },
    ],
    tech: ["Telegram Bot API", "Bale Bot SDK", "Persian OCR Model", "Zibal Inquiry API", "Python FastAPI"],
    quote:
      "“Students even submit deposit slips late at night and receive their class link once verification passes; support only steps in on flagged receipts.”",
    author: "Dr. Moradi — Founder, Andisheh Bartar",
  },
  {
    id: "tender-scraper-industrial",
    category: "scraping_ai",
    client: "Pars Sazeh Engineering & Contracting Group",
    field: "Pipeline contracting and oil & gas projects",
    challenge:
      "Tender specialists spent hours daily checking subsidiary oil-company sites, the national tender system and municipality portals one by one. On several occasions, major tender documents were missed because a site was checked too late.",
    solution:
      "An intelligent web crawler that scrapes dozens of national tender and auction portals on schedule. The bot matches ad texts against the company's keywords and delivers document summaries, submission deadlines and attachments to a confidential board Telegram channel and managers' emails.",
    results: [
      { label: "Monitored tender portals", value: "Scheduled checks on target portals" },
      { label: "Team notifications", value: "Auto-sent to Telegram & email" },
      { label: "Relevant tender filtering", value: "Matched by domain keywords" },
      { label: "Specialist review time", value: "Focused on technical evaluation" },
    ],
    tech: ["Scrapy Engine", "Headless Chrome", "Telegram Alerts", "PostgreSQL", "Docker Cron"],
    quote:
      "“Before the bot we worried about noticing key tender deadlines too late; now our target portals are monitored daily and matching notices reach the team promptly.”",
    author: "Mr. Jahangiri — Commercial Deputy, Pars Sazeh",
  },
];

export default function EnCaseStudiesContent() {
  const [selected, setSelected] = useState("all");
  const filtered = selected === "all" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === selected);

  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Award className="h-3.5 w-3.5" />
            WebNovo case studies &amp; operational projects
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Operational case studies &amp; outcomes
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            These scenarios illustrate how recurring business bottlenecks turn into automated
            workflows — showing the problem, solution architecture and operational outcome.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-800/80 pb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelected(cat.id)}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                selected === cat.id
                  ? "bg-cyan-500 font-bold text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-12">
          {filtered.map((cs) => (
            <div key={cs.id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl sm:p-10">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-center">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full border border-cyan-800/40 bg-cyan-950 px-2.5 py-0.5 text-[11px] font-bold text-cyan-300">
                      Case study
                    </span>
                    <span className="text-xs text-slate-400">{cs.field}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white sm:text-2xl">{cs.client}</h2>
                </div>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-700 lg:self-auto"
                >
                  Request a similar scenario
                  <ArrowRight className="h-4 w-4 text-cyan-400" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-8 border-b border-slate-800/80 py-8 lg:grid-cols-2">
                <div className="space-y-2 rounded-2xl border border-red-900/30 bg-red-950/20 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-red-300">
                    <span className="h-2 w-2 rounded-full bg-red-400" />
                    The client&apos;s challenge:
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{cs.challenge}</p>
                </div>
                <div className="space-y-2 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    The solution WebNovo built:
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{cs.solution}</p>
                </div>
              </div>

              <div className="py-6">
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Results after deployment:</h4>
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {cs.results.map((res) => (
                    <div key={res.label} className="space-y-1 rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                      <span className="block text-xs text-slate-400">{res.label}</span>
                      <span className="text-lg font-black text-cyan-400 sm:text-xl">{res.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-between gap-4 border-t border-slate-800/80 pt-6 md:flex-row md:items-center">
                <div className="max-w-2xl space-y-1">
                  <p className="text-xs italic text-slate-300 sm:text-sm">{cs.quote}</p>
                  <span className="block text-xs font-semibold text-slate-400">{cs.author}</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {cs.tech.map((t) => (
                    <span key={t} className="rounded border border-slate-700/60 bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500">
          The figures and outcomes shown above belong to that specific client&apos;s conditions and a
          defined reporting window; they are not a result guarantee for a new project. Each
          engagement is defined by its own written proposal.
        </p>

        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">Want your organization to be our next success story?</h3>
          <p className="mx-auto max-w-xl text-sm text-slate-300">
            A 30-minute online session with our engineers gives you a transparent estimate of your
            monthly savings.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
          >
            Request a free consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
