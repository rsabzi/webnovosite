import type { Metadata } from "next";
import EnRoiCalculator from "@/components/EnRoiCalculator";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Automation Savings (ROI) Calculator | WebNovo",
  description:
    "Estimate how much manual work costs your business per month and year, and the approximate payback period of automation. Estimates, not promises.",
  alternates: { canonical: `${SITE_URL}/en/calculator` },
};

export default function EnCalculatorPage() {
  return (
    <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8" dir="ltr">
      <div className="mx-auto max-w-7xl">
        <EnRoiCalculator />
      </div>
    </main>
  );
}
