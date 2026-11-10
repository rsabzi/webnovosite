"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Activity,
  Zap,
  ArrowRight,
  ShieldCheck,
  Server,
  Database,
  Send,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

interface WorkflowStep {
  title: string;
  desc: string;
  system: string;
  timeMs: number;
  log: string;
}

interface Scenario {
  id: string;
  name: string;
  badge: string;
  targetPlatform: string;
  summary: string;
  steps: WorkflowStep[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "torob_digikala",
    name: "رصد رقیب در ترب و آپدیت خودکار دیجی‌کالا",
    badge: "فروشگاهی و مارکت‌پلیس",
    targetPlatform: "ترب + دیجی‌کالا + سپیدار",
    summary:
      "هر ۵ دقیقه ربات قیمت رقبای شما را در ترب اسکرپ می‌کند؛ اگر رقیب قیمت را کاهش دهد، بر اساس کف حاشیه سود تعریف‌شده در سیستم سپیدار یا اکسل، قیمت پنل فروشندگان دیجی‌کالا و وب‌سایت شما را به‌صورت خودکار (در این مثال ۱۰,۰۰۰ تومان ارزان‌تر از رقیب) به‌روز می‌کند تا بدون فروش زیر قیمت تمام‌شده، شانس حفظ بای‌باکس بالا بماند.",
    steps: [
      {
        title: "اسکرپینگ قیمت رقیب از ترب",
        desc: "ربات پایتون قیمت محصول در ۳ فروشگاه صدر لیست ترب را استخراج می‌کند.",
        system: "Torob Scraper Bot (Playwright)",
        timeMs: 320,
        log: "GET torob.com/p/10928 -> Found 4 sellers. Lowest competitor: 1,840,000 Toman (Seller: TechMarket)",
      },
      {
        title: "استعلام کف قیمت مجاز از سپیدار",
        desc: "بررسی بهای تمام‌شده کالا و حاشیه سود مجاز سازمان تا زیر قیمت خرید فروخته نشود.",
        system: "Sepidar ERP API / DB",
        timeMs: 180,
        log: "QUERY Sepidar.InventoryItem(SKU='TM-882') -> MinFloorPrice: 1,650,000 Toman. Margin: SAFE.",
      },
      {
        title: "محاسبه الگوریتم بای‌باکس و سود",
        desc: "تعیین بهینه‌ترین قیمت برنده (۱۰,۰۰۰ تومان ارزان‌تر از رقیب: ۱,۸۳۰,۰۰۰ تومان).",
        system: "Smart Pricing Engine",
        timeMs: 90,
        log: "CALC TargetPrice = 1,840,000 - 10,000 = 1,830,000 Toman. Expected Profit: +180,000 Toman.",
      },
      {
        title: "به‌روزرسانی پنل دیجی‌کالا و سایت",
        desc: "ارسال درخواست تغییر قیمت به API فروشندگان دیجی‌کالا و ووکامرس.",
        system: "Digikala Seller API",
        timeMs: 450,
        log: "POST seller.digikala.com/api/v1/variants/price -> Status: 200 OK. Price updated to 1,830,000 Toman.",
      },
      {
        title: "ارسال اعلان وضعیت به تلگرام مدیر",
        desc: "ثبت گزارش تغییر قیمت و موقعیت بای‌باکس برای مدیر بازرگانی.",
        system: "Telegram Alert Bot",
        timeMs: 140,
        log: "TELEGRAM MESSAGE SENT to @FinanceDirector: 'کالای SKU-882 با قیمت ۱,۸۳۰,۰۰۰ تومان برنده شد.'",
      },
    ],
  },
  {
    id: "sepidar_didar",
    name: "ثبت سفارش سایت ➔ صدور فاکتور سپیدار و دیدار CRM",
    badge: "اتوماسیون مالی و فروش",
    targetPlatform: "ووکامرس + سپیدار + دیدار CRM + کاوه‌نگار",
    summary:
      "با هر خرید موفق در سایت یا فروشگاه اینترنتی، بدون نیاز به اپراتور، فاکتور رسمی و حواله خروج انبار در سپیدار صادر می‌شود، وضعیت لید و معامله در دیدار CRM روی 'فروش موفق' قرار می‌گیرد و پیامک با شماره پیگیری ارسال می‌شود.",
    steps: [
      {
        title: "دریافت رویداد خرید از وب‌سایت",
        desc: "دریافت وب‌هوک و پرداخت موفق از زرین‌پال / به‌پرداخت ملت.",
        system: "Webhook Receiver",
        timeMs: 110,
        log: "HOOK RECEIVED: Order #49201 Paid: 4,750,000 Toman (Customer: علی محمدی - 09121234567)",
      },
      {
        title: "ایجاد یا آپدیت پرونده در CRM دیدار",
        desc: "ثبت مشخصات خریدار، افزودن برچسب مشتری وفادار و ثبت معامله جدید.",
        system: "Didar CRM API",
        timeMs: 240,
        log: "POST app.didarcrm.ir/api/v1/deals -> Deal ID: #9821 created. Pipeline stage: Won.",
      },
      {
        title: "صدور خودکار فاکتور رسمی در سپیدار",
        desc: "ثبت آرتیکل حسابداری، کد کالا، تخفیف و مالیات بر ارزش افزوده در دیتابیس سپیدار.",
        system: "Sepidar System DB Connector",
        timeMs: 380,
        log: "EXEC sp_InsertSalesInvoice (CustomerCode='C-109', Amount=4,750,000) -> Invoice #8841 Registered.",
      },
      {
        title: "کسر موجودی و صدور حواله انبار",
        desc: "کاهش موجودی انبار مرکزی و ارسال دستور چاپ به پرینتر انباردار.",
        system: "Warehouse Dispatcher",
        timeMs: 210,
        log: "UPDATE Inventory SET Qty = Qty - 1 WHERE SKU='LAP-202' -> Warehouse Slip Printed.",
      },
      {
        title: "ارسال پیامک ردیابی کاوه‌نگار",
        desc: "ارسال پیامک به خریدار همراه با شماره فاکتور رسمی و لینک رهگیری مرسوله.",
        system: "Kavenegar SMS API",
        timeMs: 160,
        log: "SMS SENT: 'آقای علی محمدی، فاکتور ۸۸۴۱ سپیدار صادر شد و سفارش تحویل پست گردید.'",
      },
    ],
  },
  {
    id: "ai_receipt_ocr",
    name: "تایید خودکار فیش واریزی تلگرام با هوش مصنوعی",
    badge: "هوش مصنوعی و OCR",
    targetPlatform: "تلگرام / بله + مدل پردازش تصویر + زیبال",
    summary:
      "مشتری تصویر فیش کارت‌به‌کارت یا پایا را در تلگرام یا بله ارسال می‌کند. ربات با مدل OCR هوش مصنوعی متن فیش، شماره پیگیری، تاریخ و مبلغ را می‌خواند، صحت آن را با دیتابیس حساب بانکی شرکت تطبیق داده و دسترسی کاربر را در چند ثانیه باز می‌کند.",
    steps: [
      {
        title: "دریافت تصویر فیش واریزی در ربات تلگرام",
        desc: "مشتری تصویر اسکرین‌شات رسید همراه بانک یا عابربانک را می‌فرستد.",
        system: "Telegram Business Bot",
        timeMs: 150,
        log: "RECEIVED Photo: receipt_img_49102.jpg from User: @iran_client",
      },
      {
        title: "پردازش OCR هوش مصنوعی فارسی",
        desc: "استخراج شماره پیگیری، تاریخ، ۴ رقم کارت مبدا و مبلغ به ریال و تومان.",
        system: "Webnovo AI OCR Engine",
        timeMs: 420,
        log: "OCR EXTRACT: { TraceNo: '7849102', Amount: '2,500,000 Toman', Bank: 'Mellat', Status: 'Success' }",
      },
      {
        title: "استعلام با صورت‌حساب بانکی / وب‌سرویس",
        desc: "بررسی وجود تراکنش با شماره پیگیری در حساب شرکت جهت جلوگیری از فیش جعلی.",
        system: "Bank Statement Matcher",
        timeMs: 310,
        log: "VERIFIED: Transaction matched bank credit slip #TX-7849102 at 14:22:10. Match: CONFIRMED.",
      },
      {
        title: "فعال‌سازی سرویس یا ارسال لینک دسترسی",
        desc: "فعال‌سازی آنی اکانت مشتری در پرتال کاربری بدون معطلی برای اپراتور انسانی.",
        system: "Internal User Database",
        timeMs: 190,
        log: "USER ACCOUNT UPDATED: Activated Subscription Plan (30 Days).",
      },
      {
        title: "پاسخ خودکار محبت‌آمیز به مشتری",
        desc: "ارسال پیام موفقیت و فاکتور الکترونیکی در تلگرام با زمان پردازش زیر ۳ ثانیه.",
        system: "Telegram Bot Auto-Reply",
        timeMs: 120,
        log: "BOT REPLIED: 'پرداخت شما تایید شد. دسترسی شما هم‌اکنون فعال است. با سپاس از اعتماد شما.'",
      },
    ],
  },
];

export default function LiveWorkflowRunner() {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string[]>(() => [
    `[SYSTEM READY] موتور اتوماسیون نوین وب آماده اجرای سناریوی: "${SCENARIOS[0].name}"`,
    `[CONFIG] اتصالات فعال: ${SCENARIOS[0].targetPlatform}`,
    `[INFO] روی دکمه «شبیه‌سازی زنده گردش کار» کلیک کنید.`,
  ]);

  const scenario = SCENARIOS[selectedScenarioIndex];
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // تعویض سناریو: بازنشانی وضعیت در همان رویداد انجام می‌شود (بدون setState در effect)
  const selectScenario = (index: number) => {
    if (index === selectedScenarioIndex) return;
    const next = SCENARIOS[index];
    setSelectedScenarioIndex(index);
    setActiveStepIndex(-1);
    setIsRunning(false);
    setIsCompleted(false);
    setConsoleLogs([
      `[SYSTEM READY] موتور اتوماسیون نوین وب آماده اجرای سناریوی: "${next.name}"`,
      `[CONFIG] اتصالات فعال: ${next.targetPlatform}`,
      `[INFO] روی دکمه «شبیه‌سازی زنده گردش کار» کلیک کنید.`,
    ]);
  };

  /**
   * اسکرول خودکار فقط داخل کادر لاگ انجام می‌شود (نه اسکرول صفحه).
   * قبلاً از scrollIntoView استفاده می‌شد و چون این افکت در بارگذاری اولیه هم اجرا
   * می‌شد، صفحه هنگام باز شدن سایت به این بخش می‌پرید.
   */
  useEffect(() => {
    const body = terminalBodyRef.current;
    if (!body || !isRunning) return;
    body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
  }, [consoleLogs, isRunning]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setActiveStepIndex(0);
    setConsoleLogs([
      `[START] آغاز فرایند اتوماسیون در ${new Date().toLocaleTimeString("fa-IR")}`,
      `[EXEC] بارگذاری پیش‌نیازهای سناریو: ${scenario.name}...`,
    ]);

    let currentStep = 0;

    const executeNextStep = () => {
      if (currentStep < scenario.steps.length) {
        const step = scenario.steps[currentStep];
        setActiveStepIndex(currentStep);

        setConsoleLogs((prev) => [
          ...prev,
          `[STEP ${currentStep + 1}/${scenario.steps.length}] ${step.title}`,
          ` ↳ [${step.system}] ${step.log} (+${step.timeMs}ms)`,
        ]);

        currentStep++;
        setTimeout(executeNextStep, 800);
      } else {
        setIsRunning(false);
        setIsCompleted(true);
        setActiveStepIndex(scenario.steps.length);
        setConsoleLogs((prev) => [
          ...prev,
          `[SUCCESS] تمامی ${scenario.steps.length} مرحله شبیه‌سازی نمونه در ۱.۸ ثانیه اجرا شد.`,
          `[RESULT] مراحل دستی این سناریوی نمونه به‌صورت خودکار شبیه‌سازی شد`,
        ]);
      }
    };

    setTimeout(executeNextStep, 500);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setIsCompleted(false);
    setActiveStepIndex(-1);
    setConsoleLogs([
      `[RESET] بازنشانی وضعیت شبیه‌ساز`,
      `[SYSTEM READY] آماده اجرای مجدد.`,
    ]);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>کنسول مانیتورینگ زنده جریان ربات‌ها (Live Pipeline)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ببینید ربات‌های نوین وب چگونه در ثانیه‌ها کارهای ساعت‌ها را انجام می‌دهند
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={runSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Play className={`w-4 h-4 fill-white ${isRunning ? "animate-spin" : ""}`} />
            <span>{isRunning ? "در حال اجرای جریان..." : "شبیه‌سازی زنده این سناریو"}</span>
          </button>

          <button
            type="button"
            onClick={resetSimulation}
            disabled={isRunning}
            title="ریست شبیه‌ساز"
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-6">
        {SCENARIOS.map((sc, idx) => {
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => selectScenario(idx)}
              className={`p-3.5 rounded-xl text-right transition-all border ${
                isSelected
                  ? "bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-500/10 text-white"
                  : "bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                  {sc.badge}
                </span>
                <span className="text-xs text-slate-500 font-mono-num">سناریو {idx + 1}</span>
              </div>
              <div className="font-semibold text-xs sm:text-sm line-clamp-1">{sc.name}</div>
            </button>
          );
        })}
      </div>

      {/* Scenario Overview Description */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-6">
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{scenario.summary}</p>
        <div className="mt-2.5 flex items-center gap-2 text-xs text-cyan-400 font-mono-num">
          <Server className="w-3.5 h-3.5" />
          <span>پلتفرم‌های متصل: {scenario.targetPlatform}</span>
        </div>
      </div>

      {/* Workflow Execution Pipeline & Terminal Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Step Pipeline */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>مراحل اجرای گردش کار (Workflow Steps)</span>
            <span className="font-mono-num text-cyan-400">{scenario.steps.length} مرحله خودکار</span>
          </div>

          {scenario.steps.map((st, i) => {
            const isCurrent = activeStepIndex === i;
            const isDone = activeStepIndex > i || isCompleted;

            return (
              <div
                key={st.title}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCurrent
                    ? "bg-cyan-950/40 border-cyan-400/80 shadow-lg shadow-cyan-500/10 translate-x-1"
                    : isDone
                    ? "bg-slate-950/60 border-emerald-500/30 text-slate-300"
                    : "bg-slate-950/40 border-slate-800/80 opacity-60"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : isCurrent ? (
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
                    ) : (
                      <div className="w-5 h-5 shrink-0 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center text-slate-400">
                        <span className="text-[10px] leading-none font-mono-num">{i + 1}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold text-white">{st.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono-num px-1.5 py-0.5 rounded bg-slate-800/60">
                        {st.system}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-normal">{st.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Live Terminal Engine Logs */}
        <div className="lg:col-span-6 bg-[var(--bg-deep)] border border-slate-800 rounded-xl overflow-hidden font-mono text-xs flex flex-col h-full shadow-inner">
          {/* Terminal top bar */}
          <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px] font-semibold text-slate-300">webnovo-worker-node-01 [iran-cloud]</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalBodyRef}
            className="p-4 space-y-2 h-[340px] overflow-y-auto text-slate-300 selection:bg-cyan-500/40 selection:text-white"
          >
            {consoleLogs.map((log, index) => {
              const isStep = log.startsWith("[STEP");
              const isSuccess = log.startsWith("[SUCCESS]");
              const isExec = log.startsWith("[EXEC]") || log.startsWith("[START]");

              return (
                <div
                  key={index}
                  className={`leading-relaxed font-mono-num break-all ${
                    isSuccess
                      ? "text-emerald-300 font-bold bg-emerald-950/40 p-1.5 rounded border border-emerald-800/40"
                      : isStep
                      ? "text-cyan-300 font-semibold"
                      : isExec
                      ? "text-amber-300"
                      : "text-slate-400"
                  }`}
                >
                  {log}
                </div>
              );
            })}
            <div />
          </div>

          {/* Terminal footer status */}
          <div className="bg-slate-900/60 px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
            <span>پروتکل: gRPC / Webhook / REST</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Worker Status: ONLINE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
