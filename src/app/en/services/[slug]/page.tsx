import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CalendarClock,
  CandlestickChart,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Home,
  Lightbulb,
  LineChart,
  MessageCircle,
  MessageSquare,
  ScanText,
  ShoppingCart,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getService, SERVICES, SERVICE_COLORS } from "@/data/services";
import { getServiceEn, SERVICES_EN } from "@/data/services.en";
import { getProject } from "@/data/projects";
import { PROJECTS_EN } from "@/data/projects.en";
import EnAutomationCheckCta from "@/components/EnAutomationCheckCta";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

const ICONS: Record<string, LucideIcon> = {
  Bot,
  ShoppingCart,
  CalendarClock,
  MessageSquare,
  MessageCircle,
  Users,
  CandlestickChart,
  LineChart,
  ScanText,
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const en = getServiceEn(slug);
  if (!en) return { title: "Service not found | WebNovo", robots: { index: false } };

  return {
    title: en.metaTitle,
    description: en.metaDescription,
    alternates: { canonical: `${SITE_URL}/en/services/${slug}` },
  };
}

/** Compact collaboration process — shared across all service pages */
const WORK_STEPS = [
  { step: "1", title: "Conversation & needs review", desc: "We listen to your idea or need and ask the right questions; no complicated jargon." },
  { step: "2", title: "Transparent proposal", desc: "We propose the solution, build time and cost in writing and clearly, so you can decide with peace of mind." },
  { step: "3", title: "Build & test", desc: "We build the project step by step and you see results at every stage, not only at the end." },
  { step: "4", title: "Delivery & support", desc: "The complete source code is delivered, and support and bug fixing continue per the contract." },
];

export default async function EnServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const fa = getService(slug);
  const en = getServiceEn(slug);
  if (!fa || !en) notFound();

  const Icon = ICONS[fa.icon] ?? Bot;
  const colors = SERVICE_COLORS[fa.color];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
      { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/en/services` },
      { "@type": "ListItem", position: 3, name: en.name, item: `${SITE_URL}/en/services/${fa.slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: en.name,
    serviceType: en.h1,
    description: en.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Iran" },
    url: `${SITE_URL}/en/services/${fa.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: en.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8" dir="ltr">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mx-auto max-w-7xl space-y-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/en" className="flex items-center gap-1 transition-colors hover:text-cyan-300">
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/en/services" className="transition-colors hover:text-cyan-300">
            Services
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-semibold text-slate-200">{en.name}</span>
        </nav>

        {/* Header + intro */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-5 lg:col-span-8">
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${colors.iconBox}`}>
              <Icon className="h-7 w-7" />
            </span>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {en.h1}
            </h1>
            <p className="text-sm leading-loose text-slate-300 sm:text-base">{en.intro}</p>

            {en.honestNote && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-700/40 bg-amber-950/20 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs leading-relaxed text-amber-200/90 sm:text-sm">{en.honestNote}</p>
              </div>
            )}

            {/* Two entry paths */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href={`/en/contact?service=${fa.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-500 hover:to-indigo-500 active:scale-95"
              >
                Get a consultation about building this
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/en/idea"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
              >
                <Lightbulb className="h-4 w-4 text-cyan-400" />
                I&apos;ll pitch my idea
              </Link>
            </div>
          </div>

          {/* Sidebar: quick facts */}
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="mb-3 text-sm font-bold text-white">At a glance</h2>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Step-by-step delivery; you see results from the first weeks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Full source code and documentation — yours
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Support and bug fixing per the contract
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  Transparent cost estimate before starting, no hidden fees
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5">
              <h2 className="mb-2 text-sm font-bold text-white">How much does it cost?</h2>
              <p className="text-xs leading-relaxed text-slate-300">
                It depends on the features and integrations you need; we scope everything from
                simple projects to dedicated systems around your real need. After hearing your
                need, we give a precise estimate.
              </p>
              <Link
                href="/en/pricing"
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${colors.link}`}
              >
                Engagement models & pricing
                <ArrowRight className="h-3 w-3" />
              </Link>
              <p className="mt-3 border-t border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-400">
                Have one specific, small task?{" "}
                <Link href="/en/small-project" className={`font-semibold ${colors.link}`}>
                  Start with the “Small project” path
                </Link>
              </p>
            </div>
          </aside>
        </div>

        {/* Capabilities */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>Capabilities</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">What can it do?</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {en.capabilities.map((cap) => (
              <div
                key={cap}
                className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-xs leading-relaxed text-slate-200 sm:text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>Real scenarios</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">{en.scenarioTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {en.scenarios.map((sc) => (
              <div key={sc.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-sm font-bold text-white sm:text-base">{sc.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-400 sm:text-sm">{sc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related projects */}
        {fa.relatedProjects.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>Real example</span>
              <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">
                Projects we&apos;ve built from this same family
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {fa.relatedProjects.map((pSlug) => {
                const project = getProject(pSlug);
                if (!project) return null;
                const pEn = PROJECTS_EN[project.slug];
                return (
                  <Link
                    key={project.slug}
                    href={`/en/projects/${project.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-700/60"
                  >
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={pEn?.title ?? project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </div>
                    <div className="flex flex-1 flex-col space-y-2 p-5">
                      <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
                        {pEn?.title ?? project.title}
                      </h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
                        {pEn?.subtitle ?? project.subtitle}
                      </p>
                      {pEn && pEn.results[0] && (
                        <span className="mt-auto pt-2 text-[11px] font-semibold text-emerald-400">
                          {pEn.results[0].label}: {pEn.results[0].value}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
            <p className="text-xs text-slate-500">
              These are some of the ideas that became real systems.{" "}
              <Link href="/en/projects" className="font-semibold text-cyan-400 hover:text-cyan-300">
                All delivered work
              </Link>
            </p>
          </section>
        )}

        {/* Collaboration process */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>How we work together</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">From idea to a real tool</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WORK_STEPS.map((st) => (
              <div key={st.step} className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5">
                <span className="font-mono-num text-xl font-extrabold text-cyan-400">{st.step}</span>
                <h3 className="mt-2 text-sm font-bold text-white">{st.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-black text-white sm:text-3xl">FAQ about {en.name}</h2>
          </div>
          <div className="space-y-3">
            {en.faq.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-white sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-slate-800/80 pt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Related services */}
        {fa.relatedServices.length > 0 && (
          <section className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-8">
            <span className="text-xs font-semibold text-slate-400">Related services:</span>
            {fa.relatedServices.map((rsSlug) => {
              const rs = getService(rsSlug);
              if (!rs) return null;
              const rsEn = SERVICES_EN[rs.slug];
              return (
                <Link
                  key={rs.slug}
                  href={`/en/services/${rs.slug}`}
                  className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-cyan-500/60 ${colors.chip}`}
                >
                  {rsEn?.name ?? rs.name}
                </Link>
              );
            })}
            <Link
              href="/en/services"
              className="rounded-full border border-slate-700 bg-slate-950/70 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-500/60 hover:text-white"
            >
              All services
            </Link>
          </section>
        )}

        <EnAutomationCheckCta
          compact
          location={`service_${fa.slug}`}
          title={`Not sure ${en.name} fits your work?`}
        />
      </div>
    </main>
  );
}
