import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getBlogPost } from "../../../data/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "مقاله پیدا نشد | نوین وب" };
  return {
    title: `${post.title} | نوین وب`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const next = BLOG_POSTS[index + 1];
  const prev = BLOG_POSTS[index - 1];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir"}${post.image}`,
    inLanguage: "fa-IR",
    author: { "@type": "Organization", name: "نوین وب" },
    publisher: { "@type": "Organization", name: "نوین وب", url: "https://www.webnovo.ir" },
  };

  const faqJsonLd =
    post.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <div dir="rtl" className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16 sm:px-6">
        <nav className="text-xs text-slate-500 animate-fade-up" aria-label="breadcrumb">
          <Link href="/" className="hover:text-cyan-400">خانه</Link>
          <span className="mx-1.5" aria-hidden>/</span>
          <Link href="/blog" className="hover:text-cyan-400">بلاگ و راهنمای سفارش</Link>
        </nav>

        <article className="mt-6 animate-fade-up">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="rounded-full border border-cyan-800/50 bg-cyan-950/40 px-3 py-1 text-cyan-300 font-medium">
              {post.category}
            </span>
            <span>{post.readMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
          </div>

          <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold leading-10 text-white">
            {post.title}
          </h1>

          <div className="relative mt-6 h-52 w-full overflow-hidden rounded-2xl border border-slate-800 sm:h-64">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>

          <p className="mt-4 text-slate-300 leading-8">{post.intro}</p>

          {post.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-bold text-white">{section.heading}</h2>
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="mt-3 text-slate-400 leading-8">
                  {paragraph}
                </p>
              ))}
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-400 leading-7">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {post.faq.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold text-white">سؤالات متداول</h2>
              <div className="mt-4 space-y-3">
                {post.faq.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 open:border-cyan-800/60"
                  >
                    <summary className="cursor-pointer list-none font-semibold text-slate-200 transition-colors group-open:text-cyan-300">
                      {item.q}
                    </summary>
                    <p className="mt-3 text-sm text-slate-400 leading-7">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <div className="mt-12 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6">
          <p className="font-semibold text-white">مرتبط با این موضوع</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {post.related.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-600 hover:text-cyan-300"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/idea"
            className="mt-5 inline-flex rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            ایده یا فرایند خود را رایگان بررسی کنید
          </Link>
        </div>

        {(prev || next) && (
          <nav className="mt-8 flex items-center justify-between gap-4 text-sm" aria-label="مقالات دیگر">
            {prev ? (
              <Link href={`/blog/${prev.slug}`} className="text-cyan-400 hover:text-cyan-300">
                → {prev.title.length > 40 ? `${prev.title.slice(0, 40)}…` : prev.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={`/blog/${next.slug}`} className="text-cyan-400 hover:text-cyan-300 text-left">
                {next.title.length > 40 ? `${next.title.slice(0, 40)}…` : next.title} ←
              </Link>
            ) : <span />}
          </nav>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </div>
  );
}
