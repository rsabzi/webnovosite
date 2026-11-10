"use client";

import { useCallback, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  User,
} from "lucide-react";
import {
  QUESTION_STEPS,
  TOTAL_STEPS,
  type QuestionOption,
  type QuestionStep,
} from "@/lib/automation-questions";
import type { AssessmentInput, Diagnosis, DiagnosisSource } from "@/lib/automation-diagnosis";
import { isValidEmail, isValidPhoneNumber, normalizePhoneNumber } from "@/lib/validation";
import { trackEvent } from "@/lib/analytics";

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

export type DiagnosisResultState = {
  diagnosis: Diagnosis;
  source: DiagnosisSource;
  delivered: boolean;
  model?: string | null;
} | null;

type Snapshot = {
  answers: Answers;
  stepIndex: number;
  result: DiagnosisResultState;
};

const STORAGE_KEY = "webnovo-automation-check";

const EMPTY_ANSWERS: Answers = {
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

const EMPTY_SNAPSHOT: Snapshot = { answers: EMPTY_ANSWERS, stepIndex: 0, result: null };

/* ------------------------------------------------------------------
   مخزن پیش‌نویس: وضعیت فرم در sessionStorage زندگی می‌کند تا رفرش،
   پاسخ‌ها و نتیجه را از بین نبرد. خواندن با useSyncExternalStore انجام
   می‌شود (همان الگوی ThemeToggle) تا هم در SSR سالم باشد و هم بدون
   setState درون effect کار کند.
   ------------------------------------------------------------------ */

let cachedRaw: string | null = null;
let cachedSnapshot: Snapshot = EMPTY_SNAPSHOT;
let hasCache = false;
const listeners = new Set<() => void>();

function readRaw(): string | null {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function parseSnapshot(raw: string | null): Snapshot {
  if (!raw) return EMPTY_SNAPSHOT;
  try {
    const parsed = JSON.parse(raw) as Partial<Snapshot>;
    const stepIndex = typeof parsed.stepIndex === "number" ? parsed.stepIndex : 0;
    return {
      answers: { ...EMPTY_ANSWERS, ...(parsed.answers ?? {}) },
      stepIndex: Math.min(Math.max(stepIndex, 0), TOTAL_STEPS - 1),
      result: parsed.result?.diagnosis?.opportunities?.length ? parsed.result : null,
    };
  } catch {
    return EMPTY_SNAPSHOT;
  }
}

function getSnapshot(): Snapshot {
  const raw = readRaw();
  if (hasCache && raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = parseSnapshot(raw);
  hasCache = true;
  return cachedSnapshot;
}

function getServerSnapshot(): Snapshot {
  return EMPTY_SNAPSHOT;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function writeSnapshot(next: Snapshot): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* حافظه‌ی مرورگر در دسترس نیست؛ فرم بدون ذخیره‌سازی هم کار می‌کند */
  }
  cachedRaw = readRaw();
  cachedSnapshot = next;
  hasCache = true;
  listeners.forEach((listener) => listener());
}

function clearSnapshot(): void {
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  cachedRaw = null;
  cachedSnapshot = EMPTY_SNAPSHOT;
  hasCache = true;
  listeners.forEach((listener) => listener());
}

/* ------------------------------------------------------------------ */

function isAnswered(step: QuestionStep, answers: Answers): boolean {
  switch (step.key) {
    case "businessType":
      return Boolean(answers.businessType);
    case "monthlyVolume":
      return Boolean(answers.monthlyVolume);
    case "channels":
      return answers.channels.length > 0;
    case "currentProcess":
      return Boolean(answers.currentProcess);
    case "painTasks":
      return answers.painTasks.length > 0;
    case "mainProblem":
      return answers.mainProblem.trim().length >= step.minLength;
    case "currentTools":
      return true;
    case "contact":
      return (
        answers.fullName.trim().length >= 3 &&
        answers.businessName.trim().length >= 2 &&
        isValidPhoneNumber(normalizePhoneNumber(answers.phone)) &&
        (answers.email.trim() === "" || isValidEmail(answers.email))
      );
  }
}

function stepHint(step: QuestionStep, answers: Answers): string {
  if (step.key === "mainProblem" && answers.mainProblem.trim().length > 0) {
    const remaining = step.minLength - answers.mainProblem.trim().length;
    if (remaining > 0) return `برای تحلیل بهتر، ${remaining.toLocaleString("fa-IR")} حرف دیگر بنویسید.`;
  }
  if (step.key === "contact" && answers.phone.trim() !== "" && !isValidPhoneNumber(normalizePhoneNumber(answers.phone))) {
    return "شماره موبایل را کامل بنویسید (مثل ۰۹۱۲۳۴۵۶۷۸۹).";
  }
  if (step.key === "contact" && answers.email.trim() !== "" && !isValidEmail(answers.email)) {
    return "ایمیل درست به‌نظر نمی‌رسد؛ می‌توانید این بخش را خالی بگذارید.";
  }
  return "";
}

function OptionButton({
  option,
  selected,
  onSelect,
}: {
  option: QuestionOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-right transition-all active:scale-[0.99] ${
        selected
          ? "border-cyan-500/70 bg-cyan-950/40 shadow-lg shadow-cyan-950/30"
          : "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900"
      }`}
    >
      <span className="min-w-0">
        <span className={`block text-sm font-semibold sm:text-base ${selected ? "text-cyan-100" : "text-slate-100"}`}>
          {option.label}
        </span>
        {option.hint && <span className="mt-1 block text-xs leading-relaxed text-slate-400">{option.hint}</span>}
      </span>
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
          selected ? "border-cyan-400 bg-cyan-500/20 text-cyan-300" : "border-slate-700 text-transparent"
        }`}
      >
        <Check className="h-3.5 w-3.5" />
      </span>
    </button>
  );
}

const SUBMIT_STAGES = ["در حال ارسال پاسخ‌ها…", "در حال ثبت درخواست شما…"];

export default function AutomationCheckWizard() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { answers, stepIndex, result } = snapshot;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const startedRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const step = QUESTION_STEPS[stepIndex];
  const progress = Math.round(((stepIndex + (isAnswered(step, answers) ? 1 : 0)) / TOTAL_STEPS) * 100);
  const canContinue = useMemo(() => isAnswered(step, answers), [step, answers]);
  const hint = stepHint(step, answers);

  const update = useCallback(
    (patch: Partial<Answers>) => {
      writeSnapshot({ ...snapshot, answers: { ...snapshot.answers, ...patch } });
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("automation_form_started");
      }
    },
    [snapshot],
  );

  const toggleMulti = (key: "channels" | "painTasks", id: string) => {
    const current = answers[key];
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    update({ [key]: next } as Partial<Answers>);
  };

  const goNext = () => {
    if (!canContinue) return;
    setErrorMessage("");
    writeSnapshot({ ...snapshot, stepIndex: Math.min(stepIndex + 1, TOTAL_STEPS - 1) });
    headingRef.current?.focus();
  };

  const goBack = () => {
    setErrorMessage("");
    writeSnapshot({ ...snapshot, stepIndex: Math.max(stepIndex - 1, 0) });
    headingRef.current?.focus();
  };

  const restart = () => {
    clearSnapshot();
    setErrorMessage("");
    setIsSubmitting(false);
  };

  /** پاسخ‌های فعلی را به شکل معتبر سرور تبدیل می‌کند. */
  const buildPayload = (): AssessmentInput => ({
    ...answers,
    phone: normalizePhoneNumber(answers.phone),
    email: answers.email.trim(),
    mainProblem: answers.mainProblem.trim(),
    currentTools: answers.currentTools.trim(),
    fullName: answers.fullName.trim(),
    businessName: answers.businessName.trim(),
  });

  /**
   * ارسال به سرور و به‌روزرسانی نتیجه.
   * برای هر دو حالت استفاده می‌شود: ارسال اولیه‌ی فرم و «تلاش دوباره برای تحلیل هوش مصنوعی».
   */
  const postAssessment = async (): Promise<{ ok: true } | { ok: false; message: string }> => {
    const payload = buildPayload();

    try {
      const response = await fetch("/api/automation-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const raw = await response.text();
      let data: {
        success?: boolean;
        error?: string;
        source?: DiagnosisSource;
        delivered?: boolean;
        model?: string | null;
        diagnosis?: Diagnosis;
      } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("پاسخ نامعتبری از سرور دریافت شد.");
      }

      if (!response.ok || data.success === false || !data.diagnosis) {
        throw new Error(data.error || "در تحلیل اطلاعات مشکلی پیش آمد.");
      }

      const nextResult: DiagnosisResultState = {
        diagnosis: data.diagnosis,
        source: data.source === "ai" ? "ai" : "rules",
        delivered: Boolean(data.delivered),
        model: typeof data.model === "string" ? data.model : null,
      };

      writeSnapshot({ ...snapshot, result: nextResult });
      trackEvent("automation_form_completed", { source: nextResult.source });
      trackEvent("lead_submitted", { source: nextResult.source, delivered: nextResult.delivered });
      return { ok: true };
    } catch (error) {
      const message =
        error instanceof Error && error.message && !error.message.startsWith("Failed to fetch")
          ? error.message
          : "ارتباط با سرور برقرار نشد.";
      return { ok: false, message: `${message} اطلاعات شما از بین نرفته؛ لطفاً دوباره تلاش کنید.` };
    }
  };

  const submit = async () => {
    if (!isAnswered(QUESTION_STEPS[TOTAL_STEPS - 1], answers)) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setStageIndex(0);

    const stageTimer = window.setInterval(
      () => setStageIndex((index) => Math.min(index + 1, SUBMIT_STAGES.length - 1)),
      2600,
    );

    const outcome = await postAssessment();

    window.clearInterval(stageTimer);
    setIsSubmitting(false);
    setStageIndex(0);

    if (!outcome.ok) setErrorMessage(outcome.message);
  };

  if (result) {
    return (
      <section
        id="automation-check-result"
        className="mx-auto max-w-2xl rounded-3xl border border-emerald-700/50 bg-slate-900/70 p-6 text-center shadow-2xl backdrop-blur-xl sm:p-10"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h2 className="mt-5 text-xl font-black text-white sm:text-2xl">پاسخ‌های شما برای تیم نوین وب ارسال شد</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          فرم شما ثبت شد و بررسی آن شروع شده است. معمولاً تا یک روز کاری از طریق شماره‌ی{" "}
          <span className="font-mono-num font-semibold text-white">{answers.phone}</span> با شما تماس می‌گیریم؛ اگر
          اتوماسیون برای کسب‌وکار شما به‌صرفه نباشد، همان را صریح می‌گوییم.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://t.me/Webnovobot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
          >
            عجله دارید؟ گفت‌وگو در تلگرام
          </a>
          <button
            type="button"
            onClick={restart}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            بررسی کسب‌وکار دیگر
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id="automation-check-form"
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl sm:p-8"
      aria-busy={isSubmitting}
    >
      {/* نوار پیشرفت */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>
            مرحله {step.stepNumber.toLocaleString("fa-IR")} از {TOTAL_STEPS.toLocaleString("fa-IR")}
          </span>
          <span className="text-cyan-300">{progress.toLocaleString("fa-IR")}٪</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-l from-cyan-400 via-blue-500 to-indigo-500 transition-all duration-500 motion-reduce:transition-none"
            style={{ width: `${Math.max(progress, 4)}%` }}
          />
        </div>
      </div>

      <div aria-live="polite" className="space-y-5">
        <div>
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-lg font-black leading-snug text-white outline-none sm:text-2xl"
          >
            {step.title}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{step.help}</p>
        </div>

        {step.kind === "single" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {step.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={answers[step.key] === option.id}
                onSelect={() => update({ [step.key]: option.id } as Partial<Answers>)}
              />
            ))}
          </div>
        )}

        {step.kind === "multi" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {step.options.map((option) => (
              <OptionButton
                key={option.id}
                option={option}
                selected={answers[step.key].includes(option.id)}
                onSelect={() => toggleMulti(step.key, option.id)}
              />
            ))}
          </div>
        )}

        {step.kind === "text" && (
          <div>
            <textarea
              value={answers[step.key]}
              onChange={(event) =>
                update({ [step.key]: event.target.value.slice(0, step.maxLength) } as Partial<Answers>)
              }
              rows={step.key === "mainProblem" ? 5 : 3}
              maxLength={step.maxLength}
              placeholder={step.placeholder}
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-relaxed text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
              <span>{step.required ? "این فیلد برای تحلیل لازم است." : "اختیاری"}</span>
              <span className="font-mono-num">
                {answers[step.key].length.toLocaleString("fa-IR")} / {step.maxLength.toLocaleString("fa-IR")}
              </span>
            </div>
          </div>
        )}

        {step.kind === "contact" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <User className="h-3.5 w-3.5 text-cyan-400" /> نام و نام‌خانوادگی <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={answers.fullName}
                autoComplete="name"
                onChange={(event) => update({ fullName: event.target.value.slice(0, 80) })}
                placeholder="مثال: مهندس رضوانی"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" /> نام کسب‌وکار{" "}
                <span className="text-red-400">*</span>
              </span>
              <input
                type="text"
                value={answers.businessName}
                autoComplete="organization"
                onChange={(event) => update({ businessName: event.target.value.slice(0, 120) })}
                placeholder="مثال: بازرگانی آریا"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Phone className="h-3.5 w-3.5 text-cyan-400" /> موبایل / واتساپ <span className="text-red-400">*</span>
              </span>
              <input
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={answers.phone}
                autoComplete="tel"
                onChange={(event) => update({ phone: event.target.value.slice(0, 30) })}
                placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left font-mono-num text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Mail className="h-3.5 w-3.5 text-cyan-400" /> ایمیل (اختیاری)
              </span>
              <input
                type="email"
                dir="ltr"
                value={answers.email}
                autoComplete="email"
                onChange={(event) => update({ email: event.target.value.slice(0, 120) })}
                placeholder="info@company.ir"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left font-mono-num text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
              />
            </label>

            <p className="flex items-start gap-2 text-[11px] leading-relaxed text-slate-400 sm:col-span-2">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              پاسخ‌ها و اطلاعات تماس شما همان لحظه مستقیم برای تیم نوین وب ارسال می‌شود و فقط برای بررسی همین
              درخواست استفاده می‌گردد.
            </p>
          </div>
        )}
      </div>

      {hint && (
        <p className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {hint}
        </p>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="mt-4 space-y-3 rounded-2xl border border-red-700/60 bg-red-950/50 p-4 text-xs text-red-200"
        >
          <p className="flex items-start gap-2 leading-relaxed">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={submit}
              className="rounded-lg border border-red-600/60 bg-red-900/40 px-3 py-1.5 font-semibold text-red-100 transition-colors hover:bg-red-900/60"
            >
              تلاش دوباره
            </button>
            <a
              href="https://t.me/Webnovobot"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 font-semibold text-slate-200 transition-colors hover:border-slate-600"
            >
              ارسال در تلگرام
            </a>
          </div>
        </div>
      )}

      {isSubmitting ? (
        <div
          role="status"
          className="mt-6 space-y-3 rounded-2xl border border-cyan-800/60 bg-cyan-950/30 p-4 text-xs text-cyan-100"
        >
          <p className="flex items-center gap-2 font-semibold">
            <Loader2 className="h-4 w-4 animate-spin" />
            {SUBMIT_STAGES[stageIndex]}
          </p>
          <p className="leading-relaxed text-cyan-200/80">
            تحلیل معمولاً چند ثانیه طول می‌کشد. لطفاً صفحه را نبندید؛ پاسخ‌های شما ذخیره شده است.
          </p>
        </div>
      ) : (
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-600"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                مرحله قبل
              </button>
            )}
            {stepIndex === 0 && <span className="text-[11px] text-slate-500">بدون ثبت‌نام، کمتر از ۲ دقیقه</span>}
          </div>

          {step.kind === "contact" ? (
            <button
              type="button"
              onClick={submit}
              disabled={!canContinue}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              ارسال درخواست برای تیم نوین وب
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!canContinue}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-cyan-500 via-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-cyan-600/20 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              مرحله بعد
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          پاسخ‌ها مستقیم برای تیم نوین وب ارسال می‌شود؛ بدون تماس تبلیغاتی.
        </span>
        <button type="button" onClick={restart} className="inline-flex items-center gap-1.5 hover:text-slate-300">
          <RotateCcw className="h-3 w-3" />
          شروع از ابتدا
        </button>
      </div>

      <details className="mt-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-xs text-slate-400">
        <summary className="flex cursor-pointer items-center justify-between font-semibold text-slate-300 [&_summary::-webkit-details-marker]:hidden">
          چرا این ابزار رایگان است؟
          <ChevronDown className="h-3.5 w-3.5 text-cyan-400" />
        </summary>
        <p className="mt-2 leading-relaxed">
          چون تصمیم درباره‌ی اتوماسیون باید با شناخت کارتان شروع شود، نه با فروش. پاسخ‌های شما مستقیم برای تیم
          نوین وب ارسال می‌شود و یک کارشناس آن‌ها را بررسی می‌کند؛ اگر اتوماسیون اولویت شما نباشد، همان را صریح
          می‌گوییم.
        </p>
      </details>

      <p className="mt-4 text-[11px] text-slate-500">
        می‌خواهید اول خدمات را ببینید؟{" "}
        <Link href="/services" className="font-semibold text-cyan-400 hover:text-cyan-300">
          خدمات اتوماسیون نوین وب
        </Link>
      </p>
    </section>
  );
}
