"use client";

import { useState } from "react";
import {
  Bot,
  FileText,
  CheckCircle2,
  Play,
  RotateCcw,
  Zap,
  Clock,
  BarChart3,
  Loader2,
  CheckSquare,
} from "lucide-react";

const SCENARIOS = [
  {
    id: "torob_digikala",
    title: "Price monitoring on Torob & Digikala",
    desc: "Scheduled competitor price check and margin-bounded update",
    steps: [
      { label: "Scraping Torob price data", status: "crawl", duration: 800 },
      { label: "Analyzing competitor prices", status: "analyze", duration: 1200 },
      { label: "Price update in the Digikala seller panel", status: "update", duration: 900 },
      { label: "Notifying the support team via Telegram", status: "notify", duration: 600 },
      { label: "Logging and generating the daily report", status: "log", duration: 500 },
    ],
  },
  {
    id: "sepidar_didar",
    title: "Sepidar accounting + Didar CRM integration",
    desc: "Automatic invoice issuance from online orders",
    steps: [
      { label: "Receiving the new order from the WooCommerce site", status: "crawl", duration: 700 },
      { label: "Customer validation and registration in Didar CRM", status: "analyze", duration: 1100 },
      { label: "Issuing the official invoice in the Sepidar SQL database", status: "update", duration: 1500 },
      { label: "Sending SMS to the customer with the invoice number", status: "notify", duration: 600 },
      { label: "Updating the warehouse and stock levels", status: "log", duration: 400 },
    ],
  },
  {
    id: "ai_receipt_ocr",
    title: "AI deposit verification (OCR)",
    desc: "Extracting bank receipt fields and matching payment records in seconds",
    steps: [
      { label: "Receiving the receipt image from Telegram", status: "crawl", duration: 600 },
      { label: "Text extraction with the Persian AI OCR engine", status: "analyze", duration: 800 },
      { label: "Matching the amount against the bank gateway", status: "update", duration: 1000 },
      { label: "Automatic approval and delivering access to the student", status: "notify", duration: 500 },
      { label: "Archiving the document in the reporting system", status: "log", duration: 300 },
    ],
  },
];

export default function EnLiveWorkflowRunner() {
  const [selected, setSelected] = useState<string | null>(null);
  const [runningStep, setRunningStep] = useState(-1);
  const [finished, setFinished] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [runLogs, setRunLogs] = useState<string[]>([]);

  const activeScenario = SCENARIOS.find((s) => s.id === selected);

  const runScenario = () => {
    if (!activeScenario) return;
    setFinished(false);
    setRunLogs([]);
    setLogs([
      `[info] Initializing module: ${activeScenario.title}`,
      `[info] Environment: Production | Region: IR-FRA`,
      `[start] Workflow started...`,
    ]);

    activeScenario.steps.forEach((step, index) => {
      setTimeout(() => {
        setRunningStep(index);
      }, index * 800);

      setTimeout(() => {
        setRunLogs((prev) => [
          ...prev,
          `[OK] ${step.label} (Done in ${(step.duration / 1000).toFixed(1)}s)`,
        ]);
        setLogs((prev) => [
          ...prev,
          `[SUCCESS] Step ${index + 1}: ${step.label}`,
        ]);
      }, (index + 1) * 800);
    });

    setTimeout(() => {
      setRunningStep(-1);
      setFinished(true);
      setLogs((prev) => [...prev, `[DONE] Workflow completed successfully.`]);
    }, activeScenario.steps.length * 800 + 500);
  };

  const reset = () => {
    setSelected(null);
    setFinished(false);
    setLogs([]);
    setRunLogs([]);
  };

  const getStepIcon = (status: string, index: number) => {
    const size = "h-5 w-5";
    if (index < runningStep || finished) return <CheckCircle2 className={`${size} text-cyan-400`} />;
    if (index === runningStep) return <Loader2 className={`${size} animate-spin text-white`} />;
    switch (status) {
      case "crawl": return <Bot className={size} />;
      case "analyze": return <BarChart3 className={size} />;
      case "update": return <Zap className={size} />;
      case "notify": return <FileText className={size} />;
      default: return <Clock className={size} />;
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          WebNovo <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Live</span> System
        </h1>
        <p className="mx-auto max-w-2xl text-slate-400">
          Experience it yourself: run the sample workflows and watch WebNovo&apos;s agents execute each
          step automatically.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl">
            <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-white">
              <Zap className="h-5 w-5 text-cyan-400" />
              Automation scenarios
            </h2>
            <div className="space-y-4">
              {SCENARIOS.map((scenario) => (
                <div
                  key={scenario.id}
                  onClick={() => { reset(); setSelected(scenario.id); }}
                  className={`cursor-pointer rounded-xl border p-4 transition-all duration-300 ${
                    selected === scenario.id
                      ? "border-cyan-500 bg-cyan-500/10 ring-1 ring-cyan-500/50"
                      : "border-slate-800 bg-slate-900 hover:border-slate-600"
                  }`}
                >
                  <h3 className={`font-bold ${selected === scenario.id ? "text-cyan-300" : "text-slate-200"}`}>
                    {scenario.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">{scenario.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {selected && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-white">Step-by-step execution</h3>
                <button
                  onClick={reset}
                  className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset
                </button>
              </div>
              <div className="space-y-1">
                {activeScenario?.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 py-2">
                    <div className={`rounded-full p-2 transition-colors duration-500 ${
                      index === runningStep
                        ? "animate-pulse bg-cyan-500/20 text-cyan-400"
                        : index < runningStep || finished
                          ? "bg-slate-800 text-cyan-400"
                          : "bg-slate-800 text-slate-500"
                    }`}>
                      {getStepIcon(step.status, index)}
                    </div>
                    <span className={`text-sm transition-colors duration-500 ${
                      index <= runningStep || finished ? "text-white" : "text-slate-500"
                    }`}>
                      {step.label}
                    </span>
                    {(index < runningStep || finished) && (
                      <CheckSquare className="ml-auto h-4 w-4 text-cyan-400" />
                    )}
                  </div>
                ))}
              </div>

              {runLogs.length > 0 && (
                <div className="mt-6 space-y-1 border-t border-slate-800 pt-4">
                  {runLogs.map((log, i) => (
                    <p key={i} className="font-mono text-[10px] text-cyan-500">{log}</p>
                  ))}
                </div>
              )}

              {finished && (
                <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>All {activeScenario?.steps.length} steps completed successfully in 1.8 seconds.</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:col-span-7">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0a0c10] shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <span className="h-3 w-3 rounded-full bg-green-500/80" />
                </span>
                <span className="font-mono text-xs text-slate-400">webnovo-worker-node-01 [iran-cloud]</span>
              </div>
              <div className="flex items-center gap-3">
                {runningStep !== -1 && (
                  <span className="flex animate-pulse items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-400 ring-1 ring-cyan-500/20">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Running...
                  </span>
                )}
                <button
                  onClick={runScenario}
                  disabled={!selected || runningStep !== -1}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                    !selected || runningStep !== -1
                      ? "cursor-not-allowed bg-slate-800 text-slate-500"
                      : "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 hover:bg-cyan-400 active:scale-95"
                  }`}
                >
                  <Play className="h-4 w-4" />
                  {runningStep !== -1 ? "Running" : finished ? "Run again" : "Run"}
                </button>
              </div>
            </div>

            <div className="flex-1 space-y-1.5 overflow-y-auto p-6 font-mono text-sm">
              {!selected && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-500">
                  <div className="rounded-full border border-slate-700 p-4">
                    <Play className="h-8 w-8" />
                  </div>
                  <p className="text-xs">Select a scenario from the menu and press “Run”.</p>
                </div>
              )}
              {selected && logs.length === 0 && (
                <p className="text-slate-500">
                  <span className="text-cyan-500">➜</span> Engine initialized...
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-cyan-500 align-middle" />
                </p>
              )}
              {logs.map((log, index) => (
                <p key={index} className={
                  log.startsWith("[SUCCESS]")
                    ? "text-emerald-400"
                    : log.startsWith("[DONE]")
                      ? "font-bold text-white"
                      : log.includes("Error")
                        ? "text-red-400"
                        : "text-slate-300"
                }>
                  <span className="mr-2 text-slate-600">$</span> {log}
                </p>
              ))}
              {finished && (
                <div className="mt-4 space-y-1 border-t border-slate-800 pt-4">
                  <p className="text-slate-400">Simulation Summary:</p>
                  <p className="text-cyan-400">
                    ▸ {activeScenario?.steps.length} sample steps simulated successfully
                  </p>
                  <p className="text-cyan-400">▸ Manual copy-paste steps in this sample flow: removed</p>
                  <p className="mt-2 font-bold text-emerald-400">
                    Illustrative simulation — actual workflow steps and timing depend on your systems and scope.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
