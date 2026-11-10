import type { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, Send, Sparkles } from "lucide-react";
import { SITE } from "@/data/site";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Bot Building & Automation | WebNovo",
  description:
    "Transparent answers to common questions about cost, delivery time, source-code ownership, confidentiality, support and how to start an automation or Telegram bot project.",
  alternates: { canonical: `${SITE_URL}/en/faq` },
};

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long does a project usually take?",
    a: "It depends on scope. A single-purpose Telegram bot is usually ready in one to two weeks. A system like a subscription sales bot with a payment gateway and several management dashboards takes weeks to months and is delivered in stages — meaning you have a usable version from the very first weeks, not nothing until the end of the project.",
  },
  {
    q: "How is the cost calculated?",
    a: "Based on the exact scope of work, not guesses. First we hold a short meeting, we listen to your current process and write a proposal stating precisely what will be delivered and when. Payments are milestone-based and tied to each phase delivery.",
  },
  {
    q: "Who owns the project source code?",
    a: "It is entirely yours. The code goes into your own repository, deploys on your own server, and technical documentation plus a setup guide are delivered too. There is no hidden lock or dependency on us in the system.",
  },
  {
    q: "How are project data and website form submissions handled?",
    a: "In client projects, the system deploys on your own server, keys and tokens stay in your server's environment variables, our standing preference is sample data, and on request we sign a non-disclosure agreement (NDA) before any technical access. Separately, inquiry/idea forms and ROI calculator entries on this website go to our internal Telegram bot and PostgreSQL database, while in the Automation Check workflow answers (excluding dedicated name/contact fields) are sent to Google Gemini for analysis and forwarded with your contact details to our team Telegram. There is no automated deletion endpoint — full details are on the Privacy Policy page.",
  },
  {
    q: "Which platforms have you worked with?",
    a: "Messengers: Telegram, Bale, Eitaa, Rubika and WhatsApp Business. Payment gateways: Zarinpal and alternative gateways. Marketplaces: Digikala, Torob, Basalam and Emalls. Enterprise software: Sepidar, Holoo, Didar CRM and the taxpayer system (Moadian). And in financial markets: the LBank, XT and Binance exchange APIs.",
  },
  {
    q: "What happens if Telegram or an API service changes after delivery?",
    a: "The post-delivery support period exists exactly for this. API changes on platforms are inevitable; within the support window of the same contract, adapting the bot to ordinary platform changes is handled inside the current scope. Rebuilding work or added features count as new development with a separate estimate. After the window ends, we can sign a monthly maintenance contract.",
  },
  {
    q: "How long is the warranty and support period?",
    a: "The exact duration is set by each project's contract and that document is what we work to. In the pricing plans, the indicative period runs from 3 months (single-purpose projects) to 12 months (multi-part systems). Support after that window can be extended through a monthly maintenance contract.",
  },
  {
    q: "What is the difference between the bug-fix warranty and support?",
    a: "The bug-fix warranty means defects attributable to what we built are fixed within the agreed scope. Technical support means guidance, investigating runtime issues and adapting to platform changes during the same period. Adding a new feature or changing requirements counts as new development — a separate project with its own estimate. Server and third-party service costs stay with the client.",
  },
  {
    q: "Which server does the bot run on?",
    a: "Your own server — inside or outside Iran, whichever suits your service better. Everything is delivered Dockerised, so moving between servers is a single command. If you don't have a server, the WebNovo team helps with selection and initial setup.",
  },
  {
    q: "Do you take small projects?",
    a: "Yes. Many of the most useful automations are small: a script that sends the daily sales report to Telegram every night, or a bot that cleans and merges Excel files. If you have a specific, limited task, start from the “Small project” path on the site; if a task repeats manually every day, it is likely worth automating.",
  },
  {
    q: "I only have an idea; I don't know if it's buildable at all. What should I do?",
    a: "That's exactly why the “My Idea” section exists on this site. Describe your idea or process in your own words; we review it and honestly say whether it's feasible. If it is, we propose the solution, timeline and cost; if not, we say that too.",
  },
  {
    q: "Do you necessarily build every idea?",
    a: "No — and that's honesty, not laziness. We review your idea and, if it's feasible and makes financial sense, we turn it into a real system. If there is a better path, we suggest that instead.",
  },
  {
    q: "How do we start?",
    a: `Fill in the consultation request form or message us directly on Telegram ${SITE.telegramUser}. Form messages reach the WebNovo team instantly and replies arrive within 24 working hours. The first session is free, and its output is a clear picture of the solution and a time estimate — even if we don't end up working together.`,
  },
];

export default function EnFaq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="mx-auto max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Transparent answers, no fluff</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Questions clients ask before starting
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
            The more clearly we talk before a project starts, the smoother the work goes. These are
            the questions asked in almost every first session.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-slate-700"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-start gap-3 p-5">
                <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />
                <span className="flex-1 text-sm font-bold text-white sm:text-base">{item.q}</span>
                <span className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 pl-13 text-sm leading-loose text-slate-300">{item.a}</p>
            </details>
          ))}
        </div>

        <section className="space-y-4 rounded-3xl border border-cyan-800/40 bg-gradient-to-r from-cyan-950/40 to-indigo-950/30 p-8 text-center">
          <h2 className="text-xl font-black text-white sm:text-2xl">Wasn&apos;t your question on this list?</h2>
          <p className="text-sm text-slate-300">
            Ask us; we answer honestly — even if the answer is “you don&apos;t need this”.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/en/contact"
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white"
            >
              Request a project consultation
            </Link>
            <a
              href={SITE.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200"
            >
              <Send className="h-4 w-4 text-cyan-400" /> Quick question on Telegram
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
