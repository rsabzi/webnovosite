import type { Metadata } from "next";
import CaseStudiesContent from "@/components/CaseStudiesContent";

export const metadata: Metadata = {
  title: "مطالعات موردی اتوماسیون و یکپارچه‌سازی | نوین وب",
  description:
    "نتیجه‌ی واقعی پروژه‌های اتوماسیون نوین وب: مسئله‌ی اولیه، راه‌حل پیاده‌سازی‌شده و اثر قابل‌اندازه‌گیری در فروشگاه‌ها، شرکت‌های بازرگانی و تیم‌های عملیاتی.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    title: "مطالعات موردی اتوماسیون | نوین وب",
    description: "مسئله، راه‌حل و نتیجه‌ی پروژه‌های اتوماسیون تحویل‌شده.",
    url: "/case-studies",
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesContent />;
}
