import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Rocket,
  Sparkles,
  Wallet,
} from "lucide-react";
import SmallProjectForm from "@/components/SmallProjectForm";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Start a Small Project | Well-Defined, Scoped Work | WebNovo",
  description:
    "A script, an API integration, a simple Telegram bot, data extraction or automating one repetitive process — define your task in a few short steps and get an initial estimate. Scope and final price are confirmed after review.",
  alternates: { canonical: `${SITE_URL}/en/small-project` },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WebNovo | نوین وب",
    title: "Start a Small Project | WebNovo",
    description:
      "A short path for well-defined, limited projects: describe the task, state the expected output and get an initial estimate after review.",
    url: `${SITE_URL}/en/small-project`,
  },
};

const EXAMPLES = [
  "A Python script with clear input/output",
  "Connecting two services via API",
  "A simple Telegram bot",
  "One limited feature added to an existing system",
  "Data extraction and conversion",
  "A small prototype or MVP",
  "Automating one repetitive process",
];

const HOW = [
  {
    icon: ClipboardCheck,
    title: "1. Define your task briefly",
    desc: "Type of work, a short description and the expected output — in minutes, without a long form.",
  },
  {
    icon: FileSearch,
    title: "2. Review and initial estimate",
    desc: "We check feasibility, scope and a cost range, and reply within 24 working hours.",
  },
  {
    icon: Rocket,
    title: "3. Start with a clear scope",
    desc: "The delivery scope is written down before work starts; changes outside it need a new estimate.",
  },
];

const FAQS = [
  {
    q: "How is this different from the idea form?",
    a: "Use the idea form when you don't yet know the solution and want to test feasibility. The small-project path is for when you already have a well-defined, limited task and want to reach an estimate faster.",
  },
  {
    q: "Do you quote fixed prices?",
    a: "The final price is confirmed only after the scope is clear. For small, standard tasks you get a transparent initial estimate (a cost and time range) early on — but we don't quote a fixed number before the scope is defined.",
  },
  {
    q: "What if my task is very small?",
    a: "We take very small tasks only when they make sense for both sides in time and economics. If a simpler or ready-made route is cheaper for you, we say so honestly.",
  },
  {
    q: "What happens after I submit?",
    a: "The request reaches the WebNovo team, we review the details and contact you within 24 working hours. Feasibility, exact scope, timeline and cost are confirmed after that review.",
  },
];

export default function EnSmallProjectPage() {
  return (
    <main className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-14">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/70 px-3.5 py-1.5 text-xs font-semibold text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            Small, well-defined projects — a short path to work with WebNovo
          </span>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Have one specific task to automate?
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            If you have a script, an API integration, a simple bot, one limited feature or a repetitive
            process to automate, you don&apos;t need to go through the full large-project journey. Define
            your task in a few short steps and we&apos;ll review feasibility, scope and an initial estimate
            transparently.
          </p>

          <p className="text-xs leading-relaxed text-slate-400">
            Bigger, multi-part project? The{" "}
            <Link href="/en/contact" className="font-semibold text-cyan-400 hover:text-cyan-300">
              project request form
            </Link>{" "}
            is the right place. Still unsure what the solution is? Start with{" "}
            <Link href="/en/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              the idea form
            </Link>
            .
          </p>
        </div>

        {/* What it's for */}
        <section className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-white sm:text-lg">
              <Boxes className="h-5 w-5 text-cyan-400" />
              What is it suitable for?
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {EXAMPLES.map((ex) => (
                <span
                  key={ex}
                  className="rounded-full border border-slate-700 bg-slate-950/70 px-3.5 py-1.5 text-xs text-slate-300"
                >
                  {ex}
                </span>
              ))}
            </div>
            <p className="mt-5 border-t border-slate-800 pt-4 text-[11px] leading-relaxed text-slate-500">
              These are examples, not a commitment list. Each case is accepted after review, and there
              are no pre-set fixed prices or timelines for all of them.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">How it works</span>
            <h2 className="mt-2 text-2xl font-black leading-tight text-white sm:text-3xl">
              From defining the task to starting — without the complexity
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {HOW.map((step) => (
              <div key={step.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                  <step.icon className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-white sm:text-base">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form */}
        <section id="request" className="mx-auto max-w-3xl scroll-mt-24">
          <SmallProjectForm locale="en" />
        </section>

        {/* Pricing transparency */}
        <section className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6 sm:p-8">
            <h2 className="flex items-center gap-2 text-base font-bold text-white">
              <Wallet className="h-5 w-5 text-cyan-400" />
              Let&apos;s be clear about pricing
            </h2>
            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
              <p>
                Pricing is based on scope, complexity and real execution time — not guesswork. For
                defined projects, the usual range starts at around 35 million tomans (as shown on the{" "}
                <Link href="/en/pricing" className="font-semibold text-cyan-400 hover:text-cyan-300">
                  pricing page
                </Link>
                ); if your task is smaller, we clarify the scope first to see what structure is
                practical and fair for both sides.
              </p>
              <p>
                Initial development cost differs from third-party services (server, payment gateway,
                SMS…) and monthly maintenance — each is made clear separately before work starts.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl space-y-4">
          <h2 className="text-center text-xl font-black text-white sm:text-2xl">Frequently asked</h2>
          {FAQS.map((item, i) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 transition-colors hover:border-slate-700"
              open={i === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between p-5 text-sm font-bold text-white sm:text-base">
                <span>{item.q}</span>
                <span className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="px-5 pb-5 text-xs leading-loose text-slate-300 sm:text-sm">{item.a}</p>
            </details>
          ))}
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-gradient-to-l from-cyan-950/40 to-indigo-950/30 p-8 text-center">
          <h2 className="text-xl font-black text-white sm:text-2xl">Still not sure?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
            You don&apos;t need to know everything in advance. Describe your problem simply; if the
            small-project path isn&apos;t right, we&apos;ll point you to the right one.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              Project consultation & estimate
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/en/automation-check"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
            >
              <Clock3 className="h-4 w-4 text-cyan-400" />
              Free automation check
            </Link>
          </div>
          <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Feasibility, scope and the final price are always confirmed after review.
          </p>
        </section>
      </div>
    </main>
  );
}
