import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Privacy Policy | WebNovo",
  description:
    "WebNovo privacy policy: separation between client project systems and website forms, how PostgreSQL, Telegram and Google Gemini handle submissions, and manual contact inquiries.",
  alternates: { canonical: "/en/privacy" },
  openGraph: {
    title: "Privacy Policy | WebNovo",
    description: "How WebNovo handles client project data and website form submissions.",
    url: `${SITE_URL}/en/privacy`,
  },
};

const SECTIONS: { title: string; body: string[] }[] = [
  {
    title: "Client project systems vs. website form submissions",
    body: [
      "We strictly separate two categories of data: (1) operational business data inside client software projects, and (2) information you voluntarily submit in forms and tools on this website.",
      "Delivered software projects are deployed on the client's own server and infrastructure, keeping operational data, API keys and tokens on your systems. During development we prefer anonymized sample data, access real data only when technically required, and sign a non-disclosure agreement (NDA) beforehand when requested or needed.",
    ],
  },
  {
    title: "What data this website collects",
    body: [
      "In the project inquiry, “Small project”, “My Idea” and English contact forms: your name (on inquiry/small-project forms), optional company name, contact details (phone, Telegram handle or email depending on the form), project category, estimated budget, existing software and description of your request.",
      "In the ROI calculator: numeric estimation inputs (repetitive hours, staff count, salary/hourly cost and build cost range) plus optional company name, phone number or email if you request follow-up.",
      "In the Free Automation Check wizard: multiple-choice answers about business type, monthly volume, channels and current process, your problem description, optional current tools, and in the final step your required full name, business name and phone number plus optional email.",
      "We do not request bank card details, account passwords or secret keys through site forms — please avoid placing passwords or confidential credentials in free-text fields.",
    ],
  },
  {
    title: "Where website submissions are sent and stored",
    body: [
      "Internal Telegram notifications: submissions from the inquiry and small-project forms (/api/leads), idea and English contact forms (/api/ideas), ROI callback numbers (/api/calculator), and automation-check assessments/follow-ups (/api/automation-check and /api/automation-check/review) are sent via the Telegram Bot API to WebNovo's internal team chat.",
      "PostgreSQL database & fallback error logs: when the server database is configured, /api/leads and /api/ideas submissions are stored in the project_inquiries table and ROI calculations in roi_calculations (automation-check submissions are not written to PostgreSQL tables). If primary delivery fails, fallback error logs record the payload on the server so inquiries are not lost.",
      "AI processing in the Automation Check (Google Gemini): on /api/automation-check, your workflow answers and process description — excluding the dedicated fullName, businessName, phone and email fields unless written inside your free-text note — are sent to the Google Gemini API to generate the tailored diagnosis (falling back to rule-based server logic when Gemini is unavailable).",
      "We do not sell, rent or share your information with advertising networks, unless disclosure is required by applicable law.",
    ],
  },
  {
    title: "Visit analytics and browser storage",
    body: [
      "To monitor site performance, page views record the page path, HTTP referrer, device/browser category and a short one-way hash derived from IP + User-Agent (without names or phone numbers) in server memory and the page_visits table in PostgreSQL.",
      "Button interaction events push metadata to your browser's window.dataLayer. We set no advertising cookies; your light/dark theme choice is stored in localStorage and draft answers in the Persian Automation Check wizard are stored in sessionStorage in your own browser.",
    ],
  },
  {
    title: "Inquiries, corrections and technical limits on deletion",
    body: [
      "This website currently has no automated or self-service deletion endpoint, and records already transmitted to external services (such as Telegram messages, Google Gemini API requests or hosting server logs) remain subject to those providers' technical retention mechanics.",
      "To inquire about information you submitted, request corrections, or ask for manual review/removal of records directly held by our team (in our database or internal chat), contact us at rsabzi714@gmail.com or +98 916 548 6367.",
    ],
  },
  {
    title: "Changes to this policy",
    body: [
      "Whenever form handling or third-party integrations change in our codebase, this page will be updated accordingly.",
    ],
  },
];

export default function EnPrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Legal</p>
      <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm leading-loose text-slate-300 sm:text-base">
        This page explains how WebNovo handles the information you share when using the site or
        requesting a project. In short: your data is used only to respond to you, and you own it.
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
          href="/en/terms"
          className="rounded-xl border border-cyan-800/60 px-5 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:border-cyan-500"
        >
          Terms of Service
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
