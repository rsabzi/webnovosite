import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  CalendarClock,
  CandlestickChart,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
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
import { getProject } from "@/data/projects";
import { BLOG_POSTS } from "@/data/blog";
import AutomationCheckCta from "@/components/AutomationCheckCta";

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
  const service = getService(slug);
  if (!service) return { title: "سرویس یافت نشد | نوین وب", robots: { index: false } };

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      siteName: "نوین وب | Webnovo",
      title: service.metaTitle,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

/** فرآیند همکاری فشرده — برای همه‌ی صفحات سرویس مشترک است */
const WORK_STEPS = [
  { step: "۱", title: "گفت‌وگو و بررسی نیاز", desc: "ایده یا نیاز شما را می‌شنویم و سؤال‌های لازم را می‌پرسیم؛ بدون اصطلاحات پیچیده." },
  { step: "۲", title: "پیشنهاد شفاف", desc: "راه‌حل، زمان ساخت و هزینه را مکتوب و شفاف پیشنهاد می‌دهیم تا با خیال راحت تصمیم بگیرید." },
  { step: "۳", title: "ساخت و تست", desc: "پروژه را مرحله‌به‌مرحله می‌سازیم و در هر مرحله نتیجه را می‌بینید، نه فقط در انتها." },
  { step: "۴", title: "تحویل و پشتیبانی", desc: "سورس‌کد کامل تحویل داده می‌شود و طبق قرارداد، پشتیبانی و رفع خطا ادامه دارد." },
];

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = ICONS[service.icon] ?? Bot;
  const colors = SERVICE_COLORS[service.color];
  const relatedProjects = service.relatedProjects
    .map((p) => getProject(p))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const relatedServices = service.relatedServices
    .map((s) => getService(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "خدمات", item: `${SITE_URL}/services` },
      { "@type": "ListItem", position: 3, name: service.name, item: `${SITE_URL}/services/${service.slug}` },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.h1,
    description: service.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Iran" },
    url: `${SITE_URL}/services/${service.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <main className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
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
        {/* بردکرامب */}
        <nav aria-label="مسیر صفحه" className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-cyan-300">
            <Home className="h-3.5 w-3.5" />
            خانه
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <Link href="/services" className="transition-colors hover:text-cyan-300">
            خدمات
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="font-semibold text-slate-200">{service.name}</span>
        </nav>

        {/* هدر + معرفی */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          <div className="space-y-5 lg:col-span-8">
            <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl border ${colors.iconBox}`}>
              <Icon className="h-7 w-7" />
            </span>
            <h1 className="text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl">
              {service.h1}
            </h1>
            <p className="text-sm leading-loose text-slate-300 sm:text-base">{service.intro}</p>

            {service.honestNote && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-700/40 bg-amber-950/20 p-4">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                <p className="text-xs leading-relaxed text-amber-200/90 sm:text-sm">{service.honestNote}</p>
              </div>
            )}

            {/* دو مسیر ورود */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link
                href={`/contact?service=${service.slug}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-500 hover:to-indigo-500 active:scale-95"
              >
                برای ساخت این سرویس مشاوره بگیرم
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/idea"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-3.5 text-sm font-semibold text-slate-100 transition-colors hover:border-cyan-600/60 hover:text-white"
              >
                <Lightbulb className="h-4 w-4 text-cyan-400" />
                ایده‌ام را مطرح می‌کنم
              </Link>
            </div>
          </div>

          {/* ستون کناری: حقایق سریع */}
          <aside className="space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <h2 className="mb-3 text-sm font-bold text-white">در یک نگاه</h2>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  تحویل مرحله‌به‌مرحله؛ از هفته‌های اول نتیجه را می‌بینید
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  سورس‌کد کامل و مستندات، مال شما
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  پشتیبانی و رفع خطا طبق قرارداد
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  برآورد شفاف هزینه قبل از شروع، بدون هزینه‌ی پنهان
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-5">
              <h2 className="mb-2 text-sm font-bold text-white">هزینه ساخت چقدر است؟</h2>
              <p className="text-xs leading-relaxed text-slate-300">
                به امکانات و اتصال‌هایی که لازم دارید بستگی دارد؛ پروژه‌های ساده تا سیستم‌های اختصاصی را
                متناسب با نیاز تعریف می‌کنیم. بعد از شنیدن نیاز شما، برآورد دقیق می‌دهیم.
              </p>
              <Link
                href="/pricing"
                className={`mt-3 inline-flex items-center gap-1.5 text-xs font-semibold ${colors.link}`}
              >
                مدل‌های همکاری و تعرفه‌ها
                <ArrowLeft className="h-3 w-3" />
              </Link>
              <p className="mt-3 border-t border-slate-800 pt-3 text-[11px] leading-relaxed text-slate-400">
                یک کار مشخص و کوچک دارید؟{" "}
                <Link href="/small-project" className={`font-semibold ${colors.link}`}>
                  از مسیر «پروژه کوچک» شروع کنید
                </Link>
              </p>
            </div>
          </aside>
        </div>

        {/* قابلیت‌ها */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>قابلیت‌ها</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">چه کارهایی می‌تواند انجام دهد؟</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {service.capabilities.map((cap) => (
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

        {/* سناریوها */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>سناریوهای واقعی</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">{service.scenarioTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.scenarios.map((sc) => (
              <div key={sc.title} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <h3 className="text-sm font-bold text-white sm:text-base">{sc.title}</h3>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-400 sm:text-sm">{sc.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* پروژه‌های مرتبط */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>نمونه‌ی واقعی</span>
              <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">
                پروژه‌هایی که از همین خانواده ساخته‌ایم
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-700/60"
                >
                  <div className="relative h-36 w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt ?? project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col space-y-2 p-5">
                    <h3 className="text-sm font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">{project.subtitle}</p>
                    <span className="mt-auto pt-2 text-[11px] font-semibold text-emerald-400">
                      {project.results[0]?.label}: {project.results[0]?.value}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              این‌ها بخشی از ایده‌هایی هستند که تبدیل به سیستم واقعی شده‌اند.{" "}
              <Link href="/projects" className="font-semibold text-cyan-400 hover:text-cyan-300">
                همه‌ی نمونه‌کارها
              </Link>
            </p>
          </section>
        )}

        {/* روند همکاری */}
        <section className="space-y-6">
          <div>
            <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>روند همکاری</span>
            <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">از ایده تا ابزار واقعی</h2>
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

        {/* سوالات متداول */}
        <section className="mx-auto max-w-3xl space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-black text-white sm:text-3xl">سوالات پرتکرار درباره {service.name}</h2>
          </div>
          <div className="space-y-3">
            {service.faq.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-slate-800 bg-slate-900/80 p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-bold text-white sm:text-base">
                  <span>{faq.q}</span>
                  <ChevronDown className="mr-2 h-4 w-4 shrink-0 text-cyan-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 border-t border-slate-800/80 pt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* راهنماهای مرتبط با این سرویس */}
        {BLOG_POSTS.filter((post) =>
          post.related.some((link) => link.href === `/services/${slug}`)
        ).length > 0 && (
          <section className="space-y-6">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${colors.link}`}>
                قبل از سفارش بخوانید
              </span>
              <h2 className="mt-2 text-xl font-black text-white sm:text-3xl">
                راهنماهای مرتبط با {service.name}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {BLOG_POSTS.filter((post) =>
                post.related.some((link) => link.href === `/services/${slug}`)
              ).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-colors hover:border-cyan-700/60"
                >
                  <h3 className="text-sm font-bold leading-6 text-white group-hover:text-cyan-300">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-400">
                    {post.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                    خواندن راهنما
                    <span aria-hidden className="rotate-180">←</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* سرویس‌های مرتبط */}
        {relatedServices.length > 0 && (
          <section className="flex flex-wrap items-center gap-3 border-t border-slate-800 pt-8">
            <span className="text-xs font-semibold text-slate-400">سرویس‌های مرتبط:</span>
            {relatedServices.map((rs) => (
              <Link
                key={rs.slug}
                href={`/services/${rs.slug}`}
                className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-cyan-500/60 ${colors.chip}`}
              >
                {rs.name}
              </Link>
            ))}
            <Link
              href="/services"
              className="rounded-full border border-slate-700 bg-slate-950/70 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-cyan-500/60 hover:text-white"
            >
              همه‌ی خدمات
            </Link>
          </section>
        )}

        {/* ابزار تشخیص رایگان — مسیر سوم برای کاربر مردد */}
        <AutomationCheckCta
          compact
          location={`service_${service.slug}`}
          title={`مطمئن نیستید ${service.name} به کارتان می‌آید؟`}
        />
      </div>
    </main>
  );
}
