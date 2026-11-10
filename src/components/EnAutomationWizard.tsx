"use client";

import { useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, Loader2, Mail, Phone, RotateCcw, Send, User } from "lucide-react";
import { QUESTION_STEPS_EN, TOTAL_STEPS_EN, type EnStep } from "@/lib/automation-questions.en";

type Answers = {
  businessType: string;
  monthlyVolume: string;
  channels: string[];
  currentProcess: string;
  painTasks: string[];
  mainProblem: string;
  currentTools: string;
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
};

const EMPTY: Answers = {
  businessType: "",
  monthlyVolume: "",
  channels: [],
  currentProcess: "",
  painTasks: [],
  mainProblem: "",
  currentTools: "",
  fullName: "",
  businessName: "",
  phone: "",
  email: "",
};

function isAnswered(step: EnStep, a: Answers): boolean {
  switch (step.kind) {
    case "single":
      return Boolean(a[step.key]);
    case "multi":
      return a[step.key].length > 0;
    case "text":
      return step.required ? a[step.key].trim().length >= step.minLength : true;
    case "contact":
      return a.fullName.trim().length >= 3 && a.businessName.trim().length >= 2 && a.phone.trim().length >= 10;
  }
}

export default function EnAutomationWizard() {
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<"form" | "sending" | "sent" | "error">("form");

  const step = QUESTION_STEPS_EN[stepIndex];
  const canContinue = useMemo(() => isAnswered(step, answers), [step, answers]);
  const progress = Math.round(((stepIndex + (canContinue ? 1 : 0)) / TOTAL_STEPS_EN) * 100);

  const update = (patch: Partial<Answers>) => setAnswers((prev) => ({ ...prev, ...patch }));
  const toggleMulti = (key: "channels" | "painTasks", id: string) => {
    const current = answers[key];
    update({ [key]: current.includes(id) ? current.filter((x) => x !== id) : [...current, id] } as Partial<Answers>);
  };

  const submit = async () => {
    setPhase("sending");
    try {
      const response = await fetch("/api/automation-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...answers,
          mainProblem: answers.mainProblem.trim(),
          currentTools: answers.currentTools.trim(),
          fullName: answers.fullName.trim(),
          businessName: answers.businessName.trim(),
          email: answers.email.trim(),
        }),
      });
      setPhase(response.ok ? "sent" : "error");
    } catch {
      setPhase("error");
    }
  };

  if (phase === "sent") {
    return (
      <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-700/50 bg-slate-900/70 p-6 text-center shadow-2xl sm:p-10">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">Your request was sent to the WebNovo team</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          We usually reply within one business day via{" "}
          <span className="font-semibold text-white" dir="ltr">{answers.phone}</span>. If automation
          is not worth it for your business, we will tell you plainly.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://t.me/Webnovobot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600"
          >
            In a hurry? Chat on Telegram
          </a>
          <button
            type="button"
            onClick={() => {
              setAnswers(EMPTY);
              setStepIndex(0);
              setPhase("form");
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 hover:border-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Check another business
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl sm:p-8">
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>Step {step.stepNumber} of {TOTAL_STEPS_EN}</span>
          <span className="text-cyan-300">{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-black text-white sm:text-2xl">{step.title}</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{step.help}</p>
        </div>

        {step.kind === "single" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {step.options.map((option) => {
              const selected = answers[step.key] === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => update({ [step.key]: option.id } as Partial<Answers>)}
                  className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all ${
                    selected ? "border-cyan-500/70 bg-cyan-950/40" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <span>
                    <span className={`block text-sm font-semibold ${selected ? "text-cyan-100" : "text-slate-100"}`}>{option.label}</span>
                    {option.hint && <span className="mt-1 block text-xs text-slate-400">{option.hint}</span>}
                  </span>
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "border-slate-700 text-transparent"}`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {step.kind === "multi" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {step.options.map((option) => {
              const selected = answers[step.key].includes(option.id);
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => toggleMulti(step.key, option.id)}
                  className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-all ${
                    selected ? "border-cyan-500/70 bg-cyan-950/40" : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                  }`}
                >
                  <span className={`text-sm font-semibold ${selected ? "text-cyan-100" : "text-slate-100"}`}>{option.label}</span>
                  <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${selected ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "border-slate-700 text-transparent"}`}>
                    <Check className="h-3.5 w-3.5" />
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {step.kind === "text" && (
          <div>
            <textarea
              value={answers[step.key]}
              onChange={(event) => update({ [step.key]: event.target.value.slice(0, step.maxLength) } as Partial<Answers>)}
              rows={step.key === "mainProblem" ? 5 : 3}
              placeholder={step.placeholder}
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>{step.required ? "Required for a useful review." : "Optional"}</span>
              <span>{answers[step.key].length} / {step.maxLength}</span>
            </div>
          </div>
        )}

        {step.kind === "contact" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <User className="h-3.5 w-3.5 text-cyan-400" /> Full name <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={answers.fullName}
                autoComplete="name"
                onChange={(event) => update({ fullName: event.target.value.slice(0, 80) })}
                placeholder="e.g. Sara Ahmadi"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" /> Business name <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={answers.businessName}
                autoComplete="organization"
                onChange={(event) => update({ businessName: event.target.value.slice(0, 120) })}
                placeholder="e.g. Aria Trading Co."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Phone className="h-3.5 w-3.5 text-cyan-400" /> Phone / WhatsApp <span className="text-red-400">*</span>
              </span>
              <input
                type="tel"
                dir="ltr"
                value={answers.phone}
                autoComplete="tel"
                onChange={(event) => update({ phone: event.target.value.slice(0, 30) })}
                placeholder="+98 9xx xxx xxxx"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Mail className="h-3.5 w-3.5 text-cyan-400" /> Email (optional)
              </span>
              <input
                type="email"
                dir="ltr"
                value={answers.email}
                autoComplete="email"
                onChange={(event) => update({ email: event.target.value.slice(0, 120) })}
                placeholder="info@company.com"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>
          </div>
        )}
      </div>

      {phase === "error" && (
        <p role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-red-700/60 bg-red-950/50 px-3 py-2 text-xs text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Sending failed — please try again, or message us on Telegram.
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          {stepIndex > 0 && (
            <button
              type="button"
              onClick={() => setStepIndex(stepIndex - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-xs font-semibold text-slate-200 hover:border-slate-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Previous
            </button>
          )}
        </div>

        {step.kind === "contact" ? (
          <button
            type="button"
            onClick={submit}
            disabled={!canContinue || phase === "sending"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {phase === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            Send request to the WebNovo team
          </button>
        ) : (
          <button
            type="button"
            onClick={() => canContinue && setStepIndex(stepIndex + 1)}
            disabled={!canContinue}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            Next step
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  );
}
