import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Lightbulb, Search, ShieldCheck, Wand2 } from "lucide-react";
import EnIdeaForm from "@/components/EnIdeaForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "My Idea | Tell Us Your Idea, Process or Need | WebNovo",
  description:
    "Describe the idea, process or need on your mind in simple words; we review it, propose a solution, and if it's feasible we build a real bot, panel or system for you.",
  keywords: [
    "build a bot from an idea",
    "custom bot development",
    "custom system building",
    "automating repetitive work",
    "WebNovo",
  ],
  alternates: { canonical: `${SITE_URL}/en/idea` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WebNovo | نوین وب",
    title: "My Idea | Tell Us Your Idea, Process or Need | WebNovo",
    description:
      "Describe the idea, process or question on your mind simply; we review it, propose a solution, and build it if it's feasible.",
    url: `${SITE_URL}/en/idea`,
  },
};

const STEPS = [
  {
    icon: Lightbulb,
    title: "1. You tell us your idea or process",
    desc: "In your own words — not technical, not corporate. Describe the process, idea or question exactly as it is.",
  },
  {
    icon: Search,
    title: "2. We review it",
    desc: "We review it technically and practically, and honestly say whether it is feasible or not.",
  },
  {
    icon: Wand2,
    title: "3. We propose a solution",
    desc: "If it's feasible, we transparently propose the solution, timeline and cost so you can decide.",
  },
];

export default function EnIdeaPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-14">
        {/* Page header */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Lightbulb className="h-3.5 w-3.5" />
            My idea — tell us your idea, process or need
          </span>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            What&apos;s on your mind?
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            Maybe you have an idea, maybe a cumbersome process in your business, maybe a repetitive
            task you&apos;d like automated — or maybe you just want to consult. You don&apos;t need
            to know the solution; just describe it simply.
          </p>
        </div>

        {/* Three simple steps */}
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <step.icon className="h-5 w-5" />
              </span>
              <h2 className="text-sm font-bold text-white">{step.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Idea form */}
        <div className="mx-auto max-w-3xl">
          <EnIdeaForm source="en_idea_page" />
        </div>

        {/* What can a "real tool" be? */}
        <section className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-base font-black text-white sm:text-xl">
            What can a &ldquo;real tool&rdquo; be?
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
            From the ideas we&apos;ve built so far, these are what came out:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Telegram, Bale, Eitaa or Rubika bots",
              "Sales & order bots",
              "Booking & reservation systems",
              "Chatbots & auto-answering",
              "Admin panels & CRM",
              "Custom web apps & dashboards",
              "Price bots & web scraping",
              "Invoice reading with AI (OCR)",
              "Trading bots & exchange connections",
              "Connecting several services together",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-xs text-slate-300"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-5 sm:flex-row sm:items-center">
            <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
              Know exactly what you want?{" "}
              <Link href="/en/services" className="font-semibold text-cyan-400 hover:text-cyan-300">
                See the services and go straight to it
              </Link>
            </p>
            <Link
              href="/en/projects"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-2.5 text-xs font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
            >
              See delivered work
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Alternative path: structured diagnosis */}
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-indigo-950/40 p-6 sm:flex-row sm:p-8">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-black text-white sm:text-lg">
                Not sure what in your business can be automated?
              </h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                If you don&apos;t know which process to start with, the free automation check finds
                your business&apos;s automation opportunities with eight short questions.
              </p>
            </div>
          </div>
          <Link
            href="/en/automation-check"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
          >
            <ClipboardCheck className="h-4 w-4 text-cyan-400" />
            Free automation check
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
