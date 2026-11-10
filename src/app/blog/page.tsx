import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "../../data/blog";

export const metadata: Metadata = {
  title: "بلاگ و راهنمای سفارش ربات و اتوماسیون | نوین وب",
  description:
    "راهنماهای صادقانه برای سفارش ربات تلگرام و سیستم‌های اتوماسیون: هزینه‌ی واقعی، انتخاب بین ربات آماده و اختصاصی، و عوامل تعیین‌کننده قیمت. از نوین وب.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-16 sm:px-6">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-800/50 bg-cyan-950/40 px-4 py-1.5 text-xs font-medium text-cyan-300">
            بلاگ و راهنمای سفارش
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl font-extrabold text-white">
            راهنمای تصمیم‌های درست قبل از سفارش ربات
          </h1>
          <p className="mt-4 text-slate-400 leading-7">
            اینجا درباره‌ی قیمت‌ها، مسیرهای ساخت و انتخاب‌های واقعی می‌نویسیم — بدون عددسازی و
            بدون وعده‌ی الکی. هدف این نوشته‌ها این است که قبل از هر هزینه‌ای، بدانید دقیقاً به چه
            چیزی نیاز دارید.
          </p>
        </div>

        <div className="mt-10 space-y-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/60 transition-colors hover:border-cyan-700/60"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 720px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="text-cyan-400/90 font-medium">{post.category}</span>
                <span aria-hidden>•</span>
                <span>{post.readMinutes.toLocaleString("fa-IR")} دقیقه مطالعه</span>
              </div>
              <h2 className="mt-3 text-lg sm:text-xl font-bold text-white leading-8">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-slate-400 leading-6">{post.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
                خواندن مقاله
                <span aria-hidden className="rotate-180">←</span>
              </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-cyan-800/40 bg-cyan-950/20 p-6 text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-slate-300 font-medium">ایده‌ای در ذهن دارید؟ قبل از هر تصمیمی، رایگان بررسی‌اش می‌کنیم.</p>
          <Link
            href="/idea"
            className="mt-4 inline-flex rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-cyan-400"
          >
            ثبت ایده من
          </Link>
        </div>
      </div>
    </div>
  );
}
