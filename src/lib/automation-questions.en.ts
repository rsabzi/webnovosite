/**
 * English steps for the free automation check — same keys/ids as the
 * Persian source so server-side validation works unchanged.
 */

export type EnOption = { id: string; label: string; hint?: string };

export type EnStep =
  | { key: "businessType" | "monthlyVolume" | "currentProcess"; stepNumber: number; title: string; help: string; kind: "single"; options: EnOption[] }
  | { key: "channels" | "painTasks"; stepNumber: number; title: string; help: string; kind: "multi"; options: EnOption[] }
  | { key: "mainProblem" | "currentTools"; stepNumber: number; title: string; help: string; kind: "text"; placeholder: string; minLength: number; maxLength: number; required: boolean }
  | { key: "contact"; stepNumber: number; title: string; help: string; kind: "contact" };

export const QUESTION_STEPS_EN: EnStep[] = [
  {
    key: "businessType",
    stepNumber: 1,
    title: "What type of business do you run?",
    help: "Your business type determines which tasks are most automatable.",
    kind: "single",
    options: [
      { id: "retail", label: "Online store / e-commerce", hint: "Online sales, marketplaces, warehouse" },
      { id: "education", label: "Academy / online education", hint: "Enrollment, classes, student support" },
      { id: "clinic", label: "Clinic / medical center", hint: "Booking, records, patient follow-up" },
      { id: "restaurant", label: "Restaurant / café", hint: "Orders, table reservations, delivery" },
      { id: "services", label: "Service business", hint: "Technical services, consulting, projects" },
      { id: "b2b", label: "B2B / trading company", hint: "Corporate sales, pro-forma invoices, agents" },
      { id: "manufacturing", label: "Manufacturing / industrial", hint: "Production orders, warehouse, distribution" },
      { id: "other", label: "Other / multi-domain", hint: "A different business model" },
    ],
  },
  {
    key: "monthlyVolume",
    stepNumber: 2,
    title: "Roughly how many customers or requests per month?",
    help: "An approximate number is fine.",
    kind: "single",
    options: [
      { id: "under_50", label: "Fewer than 50 requests a month" },
      { id: "50_200", label: "Around 50–200 requests" },
      { id: "200_1000", label: "Around 200–1,000 requests" },
      { id: "over_1000", label: "More than 1,000 requests" },
      { id: "unknown", label: "I don't know exactly" },
    ],
  },
  {
    key: "channels",
    stepNumber: 3,
    title: "Where do customers mostly contact you?",
    help: "You can pick more than one.",
    kind: "multi",
    options: [
      { id: "instagram", label: "Instagram" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "telegram", label: "Telegram / Bale / Eitaa" },
      { id: "website", label: "Website and forms" },
      { id: "phone", label: "Phone calls" },
      { id: "email", label: "Email" },
      { id: "marketplace", label: "Marketplaces (Digikala, Torob, …)" },
      { id: "other", label: "Other" },
    ],
  },
  {
    key: "currentProcess",
    stepNumber: 4,
    title: "How are customer requests managed today?",
    help: "Your current situation is the starting point.",
    kind: "single",
    options: [
      { id: "manual", label: "Fully manual", hint: "Phone, chat and note-taking" },
      { id: "spreadsheet", label: "Excel or Google Sheets" },
      { id: "crm", label: "CRM (Didar, …)" },
      { id: "custom_software", label: "Custom software / ERP" },
      { id: "mixed", label: "A mix of several" },
    ],
  },
  {
    key: "painTasks",
    stepNumber: 5,
    title: "Which tasks take the most time from your team?",
    help: "Pick as many as apply.",
    kind: "multi",
    options: [
      { id: "reply", label: "Answering repetitive customer questions" },
      { id: "followup", label: "Following up with customers and leads" },
      { id: "order", label: "Registering and processing orders" },
      { id: "booking", label: "Reservations / appointments" },
      { id: "data_entry", label: "Manual data entry in Excel or software" },
      { id: "invoice", label: "Issuing and sending invoices" },
      { id: "payment", label: "Verifying and matching payments" },
      { id: "support", label: "Support and request tracking" },
      { id: "reporting", label: "Reporting and analysis" },
      { id: "other", label: "Other" },
    ],
  },
  {
    key: "mainProblem",
    stepNumber: 6,
    title: "What is the most important process you want improved?",
    help: "The clearer you write, the better the review. Example: “Two people spend their day answering the same questions.”",
    kind: "text",
    placeholder: "Example: answering repetitive messages takes most of our team's time.",
    minLength: 20,
    maxLength: 1000,
    required: true,
  },
  {
    key: "currentTools",
    stepNumber: 7,
    title: "Do you currently use any specific tools or systems?",
    help: "Optional. E.g. your accounting software, CRM, WooCommerce, Excel or a seller panel.",
    kind: "text",
    placeholder: "Example: accounting software + Excel order tracking",
    minLength: 0,
    maxLength: 300,
    required: false,
  },
  {
    key: "contact",
    stepNumber: 8,
    title: "Your contact details",
    help: "Your request is sent straight to the WebNovo team; we only use it to review this request.",
    kind: "contact",
  },
];

export const TOTAL_STEPS_EN = QUESTION_STEPS_EN.length;
