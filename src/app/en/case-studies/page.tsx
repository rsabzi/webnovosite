import type { Metadata } from "next";
import EnCaseStudiesContent from "@/components/EnCaseStudiesContent";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Automation & Integration Case Studies | WebNovo",
  description:
    "Real results from WebNovo automation projects: the original problem, the delivered solution, and the measurable impact for shops, trading companies, and operations teams.",
  alternates: { canonical: `${SITE_URL}/en/case-studies` },
};

export default function EnCaseStudiesPage() {
  return <EnCaseStudiesContent />;
}
