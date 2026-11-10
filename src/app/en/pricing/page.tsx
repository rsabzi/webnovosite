import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  Zap,
  ShieldCheck,
  ArrowRight,
  Server,
  FileCheck2,
  Clock,
  Sparkles,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Bot & Automation System Pricing | WebNovo",
  description:
    "The cost of building a bot depends on its type, features and integrations; from single-purpose bots to multi-part systems, with a transparent milestone-based payment model.",
  alternates: { canonical: `${SITE_URL}/en/pricing` },
};

const TIERS = [
  {
    id: "starter",
    name: "Focused single-purpose bot",
    target: "Online stores, Digikala sellers and startups",
    price: "From 35M toman",
    deliveryTime: "5–10 business days",
    description:
      "For automating one specific critical process, such as a Torob price-monitoring bot, a dedicated Telegram bot, or scraping one specific website.",
    features: [
      "Custom bot development in Python / Node.js",
      "Initial deployment on an Iranian cloud server or your host",
      "Alert & notification Telegram bot configuration",
      "Proxy management and captcha-handling system",
      "3 months bug-fix warranty and technical support per contract scope",
      "Full ownership of the project source code",
    ],
    popular: false,
    cta: "Order this plan",
  },
  {
    id: "growth",
    name: "Integration of two or more systems",
    target: "Trading companies, growing stores and capillary distribution",
    price: "From 65M toman",
    deliveryTime: "15–25 business days",
    description:
      "The most popular plan for connecting two heterogeneous systems — e.g. automatically linking your online store and Didar CRM to the Sepidar or Holoo accounting database.",
    features: [
      "SQL Server connection for Sepidar / Holoo / Hamkaran",
      "Automatic warehouse exit dispatch and official sales invoices",
      "Real-time stock and price sync across all channels",
      "Dedicated web panel to view logs and manage the system",
      "Automatic retry system and smart event queueing",
      "6 months bug-fix warranty and technical support per contract scope",
      "On-site or online training session for your staff",
      "Option to sign a formal non-disclosure agreement (NDA)",
    ],
    popular: true,
    cta: "Choose the integration plan",
  },
  {
    id: "enterprise",
    name: "Multi-part, large-scale systems",
    target: "Organizations that want several systems and processes connected and automated at once",
    price: "Custom (based on RFP)",
    deliveryTime: "Agile phasing",
    description:
      "Combining several systems: dedicated AI, financial document reading, desktop automation and distributed infrastructure; with an agreed service level in the contract.",
    features: [
      "Distributed multi-server architecture; capacity and scalability designed around your project's real load",
      "Dedicated OCR AI system for invoices and receipts",
      "Isolated deployment inside your local network (on-premises)",
      "Uptime and service-level (SLA) commitments per project contract",
      "Dedicated support channel with response times agreed in the SLA",
      "Integration with the taxpayer system (Moadian) and payment gateways",
      "12 months bug-fix warranty and technical support per contract scope",
      "Code security review and, by agreement, penetration testing before deployment",
    ],
    popular: false,
    cta: "Talk about a large project",
  },
];

export default function EnPricing() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Transparent engagement models with no hidden costs</span>
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            An investment in automation, not a running cost
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            At WebNovo, payments follow the progress of operational phases and demo deliveries, so
            you can evaluate the system&apos;s progress with complete peace of mind.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between rounded-2xl p-6 transition-all sm:rounded-3xl sm:p-8 ${
                tier.popular
                  ? "border-2 border-cyan-500 bg-slate-900/90 shadow-2xl shadow-cyan-500/15 lg:-translate-y-2"
                  : "border border-slate-800 bg-slate-900/70 hover:border-slate-700"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-1/2 translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                  Most popular engagement model
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{tier.target}</p>
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/80 p-4">
                  <span className="block text-xs text-slate-400">Base cost estimate:</span>
                  <div className="mt-0.5 text-2xl font-black text-cyan-400">{tier.price}</div>
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5 text-slate-500" />
                    <span>Estimated delivery: {tier.deliveryTime}</span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-slate-300 sm:text-sm">{tier.description}</p>

                <div className="space-y-3 pt-2">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                    What&apos;s included in this plan:
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 border-t border-slate-800 pt-8">
                <Link
                  href={`/en/contact?plan=${tier.id}`}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold transition-all sm:text-sm ${
                    tier.popular
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500"
                      : "border border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent note for small projects */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6 sm:flex-row sm:p-8">
          <p className="max-w-2xl text-xs leading-relaxed text-slate-300 sm:text-sm">
            The build cost depends on the bot type, features and integrations it needs; we scope
            everything from simple single-purpose projects to dedicated systems around the real
            need. If you have one specific, limited task (a script, an API integration, a simple
            bot, data extraction…), start with the short &quot;Small project&quot; path; if you only have an
            unshaped idea, use the idea form. The final price is only quoted after the scope is
            clear — never before.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en/small-project"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-500 hover:to-blue-500 active:scale-95 sm:text-sm"
            >
              Start a small project
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/idea"
              className="whitespace-nowrap text-xs text-slate-300 underline decoration-slate-600 underline-offset-4 transition-colors hover:text-white"
            >
              Have an idea? Use the idea form
            </Link>
          </div>
        </div>

        {/* Payment terms & guarantees */}
        <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-3">
          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Milestone payments based on progress</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              40% advance with the contract, 40% after demo delivery and testing in a sandbox
              environment, and the final 20% after full deployment on your server.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Compliance guarantee against the proposal specs</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              If the delivered system does not match the technical specifications approved in the
              proposal, we first fix it within an agreed opportunity; if the mismatch remains, the
              payments for that part are refunded per the contract terms.
            </p>
          </div>

          <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Server className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Official contract with valid invoice</h4>
            <p className="text-xs leading-relaxed text-slate-400">
              For businesses that need official documentation, we can sign a formal corporate
              contract and issue official invoices registerable in tax systems.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
