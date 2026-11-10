import type { Metadata } from "next";
import Link from "next/link";
import EnContactForm from "@/components/EnContactForm";
import { SUPPORT_POLICY } from "@/data/site";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  CheckCircle2,
  Headphones,
  Sparkles,
} from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Project Registration & Bot Building Consultation | WebNovo",
  description:
    "Submit a request for a Telegram bot, sales bot, booking, auto-answering, web scraping or a custom system — with free consultation and a time & cost estimate.",
  alternates: { canonical: `${SITE_URL}/en/contact` },
};

export default function EnContactPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-16">
        {/* Header */}
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-800/60 bg-cyan-950/80 px-3 py-1 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Start working together — consultation with no financial commitment</span>
          </div>
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Hand the tedious work over to bots
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Fill in the form below; your message reaches the WebNovo team instantly and we reply
            within 24 working hours with a proposed scenario, tech stack and time estimate.
          </p>
          <p className="text-xs leading-relaxed text-slate-400 sm:text-sm">
            Not sure exactly what you need? That&apos;s fine; describe your problem right here and
            we&apos;ll talk about the right solution. If you have one specific, limited task, the short{" "}
            <Link href="/en/small-project" className="font-semibold text-cyan-400 hover:text-cyan-300">
              “Small project”
            </Link>{" "}
            path is faster; and if your idea is still unshaped, begin from the{" "}
            <Link href="/en/idea" className="font-semibold text-cyan-400 hover:text-cyan-300">
              “My Idea”
            </Link>{" "}
            section.
          </p>
        </div>

        {/* Content grid: form + contact details */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Form column */}
          <div className="lg:col-span-8">
            <EnContactForm />
          </div>

          {/* Quick contact & office details */}
          <div className="space-y-6 lg:col-span-4">
            {/* Direct contact card */}
            <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm sm:rounded-3xl">
              <h3 className="flex items-center gap-2 border-b border-slate-800 pb-3 text-base font-bold text-white">
                <Headphones className="h-4 w-4 text-cyan-400" />
                Direct & instant contact channels
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-2 text-cyan-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Direct call to Reza Sabzi:</span>
                    <a
                      href="tel:+989165486367"
                      className="mt-0.5 block font-mono-num text-base font-bold text-white hover:text-cyan-300"
                    >
                      +98 916 548 6367
                    </a>
                    <span className="block text-[11px] text-slate-500">Answering Saturday to Thursday, 9:00–20:00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-blue-500/20 bg-blue-500/10 p-2 text-blue-400">
                    <Send className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Direct Telegram (fastest way):</span>
                    <a
                      href="https://t.me/Webnovobot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block font-mono-num font-semibold text-cyan-400 hover:underline"
                    >
                      @Webnovobot
                    </a>
                    <span className="block text-[11px] text-slate-500">Fastest way to reach the team</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-indigo-500/20 bg-indigo-500/10 p-2 text-indigo-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Email (for RFPs and documents):</span>
                    <a
                      href="mailto:rsabzi714@gmail.com"
                      className="mt-0.5 block font-mono-num text-xs text-white hover:text-cyan-300"
                    >
                      rsabzi714@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-400">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">Technical office location:</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-slate-300">
                      Iran — remote collaboration with clients inside and outside the country;
                      online meetings and phased project delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantees box */}
            <div className="space-y-3 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
                <span>WebNovo support commitments</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Option to sign a formal NDA before any technical access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>{SUPPORT_POLICY.summaryEn}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  <span>Full ownership of the project source code stays with you</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
