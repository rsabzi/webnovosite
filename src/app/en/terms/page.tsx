import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Terms of Service | WebNovo",
  description:
    "WebNovo terms of engagement: estimates and contracts, staged payments, source-code ownership, support and each party's responsibilities.",
  alternates: { canonical: "/en/terms" },
  openGraph: {
    title: "Terms of Service | WebNovo",
    description: "How we work together: scope, delivery, payment and support.",
    url: `${SITE_URL}/en/terms`,
  },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Scope of services",
    body: [
      "WebNovo designs and builds bots, software tools and business-automation systems. The exact scope of each project is defined in a written proposal, which is the basis of our engagement.",
    ],
  },
  {
    title: "Estimates, pricing and payment",
    body: [
      "Prices shown on the pricing page are indicative ranges; the final figure is quoted after understanding your needs in the proposal. Payments are staged and tied to the delivery of agreed phases.",
      "Mid-project scope changes may affect timeline and cost depending on size; any change is documented and approved before implementation.",
    ],
  },
  {
    title: "Source-code ownership",
    body: [
      "The complete source code and technical documentation are delivered to you, and ownership transfers to the client after settlement. No locks, hidden dependencies or forced subscriptions are built into the deliverable.",
    ],
  },
  {
    title: "Bug-fix warranty, support, development and maintenance",
    body: [
      "These four concepts differ from one another and are clarified separately in each project's contract:",
      "Bug-fix warranty: defects attributable to the delivered implementation are fixed within the agreed scope and the period stated in the contract. The support and warranty period is defined in each project's proposal or contract (the pricing plans suggest 3 to 12 months) and that written document is what we work to.",
      "Technical support: guidance, investigating runtime issues and help with usage, plus following up changes on dependent platforms (such as Telegram or payment gateways) during the same period.",
      "New development: adding a feature, changing requirements or designing and connecting something new counts as a separate project and is estimated and approved separately.",
      "Maintenance and infrastructure: server and third-party service costs are the client's responsibility. Ongoing maintenance after the support period, if agreed, runs under a separate monthly contract.",
    ],
  },
  {
    title: "Client responsibilities",
    body: [
      "Timely information, access and feedback are prerequisites for smooth delivery. Delays in providing access may shift the schedule.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Many projects connect to third-party services (Telegram, payment gateways, hosting). Their policy and pricing changes are beyond our control; we recommend lower-risk options during setup.",
    ],
  },
  {
    title: "Prohibited use",
    body: [
      "Projects with illegal use cases, harassment of others or platform-policy violations are not accepted.",
    ],
  },
  {
    title: "Termination",
    body: [
      "Either party may end the engagement under the conditions agreed in the contract/proposal. Work completed up to that point is settled and delivered.",
    ],
  },
];

export default function EnTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Legal</p>
      <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Terms of Service</h1>
      <p className="mt-4 text-sm leading-loose text-slate-300 sm:text-base">
        This page sets the general rules for working with WebNovo. Project-specific details are
        documented in the proposal or contract for each engagement, and that document prevails.
      </p>

      <div className="mt-10 space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-bold text-white">{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-loose text-slate-300">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/en/privacy"
          className="rounded-xl border border-cyan-800/60 px-5 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:border-cyan-500"
        >
          Privacy Policy
        </Link>
        <Link
          href="/en/contact"
          className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
        >
          Contact us
        </Link>
      </div>
    </main>
  );
}
