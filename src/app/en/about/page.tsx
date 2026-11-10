import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Server,
  Code2,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "About WebNovo | Engineering Standards, Security & NDA",
  description:
    "Meet the WebNovo (Novin Web) engineering team: security protocols, dedicated in-country server deployment, and legal confidentiality commitments for organizations' data.",
  alternates: { canonical: `${SITE_URL}/en/about` },
};

export default function EnAbout() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Engineering, transparency and information security</span>
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            We don&apos;t write code just to make it work; we build systems designed for continuous,
            real-world operation
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            WebNovo is a specialised software-engineering and industrial-automation agency focused
            on the particular challenges of the Iranian business ecosystem (Sepidar, Holoo, Torob,
            Digikala, local messengers and tax systems), delivering stable, custom solutions.
          </p>
        </div>

        {/* 4 Pillars of Trust */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Non-disclosure agreement (NDA)</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              On request or when needed, before receiving any access to databases or documentation,
              a formal commercial-confidentiality agreement is signed.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Server className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">On-premise deployment</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Source code, Docker containers and databases are deployed directly onto a physical or
              virtual server inside your company network; core data stays on your own
              infrastructure — apart from the traffic the system itself needs to work with your
              chosen services (e.g. Telegram or a payment gateway).
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Full source-code handover</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              There is no lifetime dependency. You fully own clean, structured, commented code along
              with a setup guide.
            </p>
          </div>

          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-white">Bug-fix warranty and adaptation to changes</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              If Torob changes its HTML structure or Digikala adds a new field to its API, within the
              warranty and support period agreed in the contract, those changes are reviewed and the
              system is adapted.
            </p>
          </div>
        </div>

        {/* Detailed Tech Stack Showcase */}
        <div className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:rounded-3xl sm:p-10">
          <div className="border-b border-slate-800 pb-4">
            <div className="mb-1 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Terminal className="h-3.5 w-3.5" />
              <span>Tech stack & software development standards</span>
            </div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              WebNovo&apos;s engineering tools and frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="text-sm font-bold text-cyan-300">Processing core & robotics</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span><strong>Python & FastAPI:</strong> isolated, asynchronous processing for concurrent loads</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span><strong>Playwright & Selenium:</strong> reliable crawling and session management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span><strong>Node.js & TypeScript:</strong> real-time microservice deployment</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="text-sm font-bold text-blue-300">Databases & financial connections</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span><strong>Microsoft SQL Server:</strong> safe queries into Sepidar and Holoo</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span><strong>PostgreSQL & Drizzle ORM:</strong> structured data storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
                  <span><strong>Redis in-memory cache:</strong> job queueing and request-rate control</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
              <h4 className="text-sm font-bold text-indigo-300">AI & messengers</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                  <span><strong>Persian OCR engines:</strong> automatic receipt and invoice data extraction, with review support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                  <span><strong>Telegram & Bale Bot SDK:</strong> instant answering via SSL webhooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400" />
                  <span><strong>Docker & Traefik:</strong> easy containerised setup in minutes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* NDA Sample Clause */}
        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-6 sm:p-10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <FileCheck2 className="h-4 w-4" />
            <span>Sample clause from WebNovo&apos;s non-disclosure agreement (NDA)</span>
          </div>
          <blockquote className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs italic leading-relaxed text-slate-300 sm:text-sm">
            “The WebNovo engineering team undertakes to treat all financial information, customer
            identity data, cost prices, logs and the client&apos;s databases as trade secrets, and
            under no circumstances to disclose them to any third party, natural or legal. Liability
            for any breach of this obligation rests with the contractor under the terms of the
            agreement and applicable law.”
          </blockquote>
        </div>

        {/* Bottom CTA */}
        <div className="space-y-4 rounded-3xl border border-cyan-800/40 bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
            Have an in-person or online session with our technical managers
          </h3>
          <p className="mx-auto max-w-xl text-sm text-slate-300">
            We speak your business language, not complicated computer jargon. Bring up your needs
            with peace of mind.
          </p>
          <div className="pt-2">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
            >
              <span>Request a consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
