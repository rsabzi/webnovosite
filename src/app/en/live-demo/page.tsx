import type { Metadata } from "next";
import EnLiveWorkflowRunner from "@/components/EnLiveWorkflowRunner";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.webnovo.ir";

export const metadata: Metadata = {
  title: "Live Automation Simulator | WebNovo",
  description:
    "Press the run button yourself and watch step by step how WebNovo agents execute a real automation workflow in seconds.",
  alternates: { canonical: `${SITE_URL}/en/live-demo` },
};

export default function EnLiveDemoPage() {
  return (
    <main dir="ltr">
      <EnLiveWorkflowRunner />
    </main>
  );
}
