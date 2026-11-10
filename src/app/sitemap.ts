import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

/** یک تاریخ ساخت برای همه‌ی رکوردها تا سیگنال تازگی بی‌معنا نشود. */
const LAST_MODIFIED = new Date();

/** مسیرهایی که نسخه‌ی انگلیسی دارند (زیر /en) */
const EN_ROUTES = new Set([
  "",
  "/services",
  "/projects",
  "/pricing",
  "/about",
  "/faq",
  "/contact",
  "/automation-check",
  "/calculator",
  "/case-studies",
  "/live-demo",
  "/idea",
  "/small-project",
  "/privacy",
  "/terms",
  ...SERVICES.map((service) => `/services/${service.slug}`),
  ...PROJECTS.map((project) => `/projects/${project.slug}`),
]);

function entry(path: string, priority: number, changeFrequency: "monthly" | "yearly"): MetadataRoute.Sitemap {
  const faUrl = `${BASE}${path || "/"}`;
  const hasEn = EN_ROUTES.has(path);
  const enUrl = `${BASE}/en${path}`;

  const base = {
    url: faUrl,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  };

  if (!hasEn) return [base];

  return [
    { ...base, alternates: { languages: { fa: faUrl, en: enUrl } } },
    {
      url: enUrl,
      lastModified: LAST_MODIFIED,
      changeFrequency,
      priority,
      alternates: { languages: { fa: faUrl, en: enUrl } },
    },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/idea", priority: 0.9 },
    { path: "/small-project", priority: 0.9 },
    { path: "/automation-check", priority: 0.9 },
    { path: "/projects", priority: 0.8 },
    { path: "/case-studies", priority: 0.8 },
    { path: "/calculator", priority: 0.7 },
    { path: "/live-demo", priority: 0.6 },
    { path: "/pricing", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/faq", priority: 0.5 },
    { path: "/contact", priority: 0.9 },
    { path: "/blog", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
    ...SERVICES.map((service) => ({ path: `/services/${service.slug}`, priority: 0.85 })),
  ];

  return [
    ...staticRoutes.flatMap((route) => entry(route.path, route.priority, "monthly")),
    ...PROJECTS.flatMap((project) => entry(`/projects/${project.slug}`, 0.7, "yearly")),
    ...BLOG_POSTS.flatMap((post) => entry(`/blog/${post.slug}`, 0.5, "yearly")),
  ];
}
