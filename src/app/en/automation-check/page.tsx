import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ListChecks, ShieldCheck } from "lucide-react";
import EnAutomationWizard from "@/components/EnAutomationWizard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Free Automation Check | WebNovo",
  description:
    "Eight short questions about where your customers come from and where your team's time goes. Your answers are sent straight to the WebNovo team for a free, honest review.",
  alternates: { canonical: `${SITE_URL}/en/automation-check` },
};

const TRUST_POINTS = [
  { icon: Clock, title: "Under 2 minutes", desc: "Eight short steps; one choice per step." },
  { icon: ListChecks, title: "Sent straight to our team", desc: "Your form reaches us the moment you submit — nothing gets lost." },
  {
    icon: ShieldCheck,
    title: "Transparent data handling",
    desc: "Contact fields go only to our internal Telegram team chat; workflow answers (excluding name/contact fields) are processed via Google Gemini.",
  },
];

const WHAT_HAPPENS = [
  "Your answers, with an initial process analysis, reach the WebNovo team instantly.",
  "A specialist reviews your processes and identifies the real automation opportunities.",
  "Usually within one business day we call you with a clear, honest recommendation.",
];

export default function EnAutomationCheckPage() {
  return (
    <main className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            Which part of your business can be automated?
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-lg">
            Answer a few short questions so we can see where your business can be automated — no
            technical jargon, no big promises. At the end, your request is sent straight to our team.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {TRUST_POINTS.map((point) => (
            <div key={point.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                <point.icon className="h-5 w-5" />
              </span>
              <h2 className="text-sm font-bold text-white">{point.title}</h2>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{point.desc}</p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl">
          <EnAutomationWizard />
        </div>

        <section className="mx-auto max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-base font-black text-white sm:text-xl">What happens after you submit?</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
            {WHAT_HAPPENS.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-slate-400">
            If you would rather start the conversation directly, use the{" "}
            <Link href="/en/contact" className="font-semibold text-cyan-400 hover:text-cyan-300">
              project request form
            </Link>
            ; for a small, well-defined task the{" "}
            <Link href="/en/small-project" className="font-semibold text-cyan-400 hover:text-cyan-300">
              “small project”
            </Link>{" "}
            path is faster, or message us on Telegram.
          </p>
        </section>
      </div>
    </main>
  );
}
