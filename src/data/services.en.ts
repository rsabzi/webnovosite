/**
 * English copy for /en/services — mirrors src/data/services.ts field by field.
 * The Persian file remains the single source of slugs, icons, colors and links.
 */

export type ServiceEn = {
  name: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  capabilities: string[];
  scenarioTitle: string;
  scenarios: { title: string; desc: string }[];
  honestNote?: string;
  faq: { q: string; a: string }[];
};

export const SERVICES_EN: Record<string, ServiceEn> = {
  "telegram-bot": {
    name: "Telegram Bot",
    h1: "Custom Telegram bots; from orders to support and channel management",
    metaTitle: "Telegram Bot Development | Custom Bots for Business | WebNovo",
    metaDescription:
      "We build custom Telegram bots that take orders, accept payments, answer repetitive questions and keep customers updated — from a simple order bot to a full sales system with an admin panel and payment gateway.",
    intro:
      "For many businesses, Telegram is where the customers are — but answering messages manually, taking orders in chat and checking receipts gets time-consuming fast. A custom Telegram bot does exactly that work without manual effort: it takes orders, receives payment, answers repetitive questions and keeps customers posted. We build it around your real needs; from a simple order bot to a complete sales system with an admin panel and payment gateway.",
    capabilities: [
      "In-chat ordering: the customer picks a product and the order is registered automatically",
      "Online payment via gateways such as Zarinpal, or automatic card-to-card receipt verification",
      "Automatic answers to repetitive questions, with handover to a human operator when needed",
      "Mandatory channel membership, group management and user access control",
      "Announcements and broadcast messages from the admin panel",
      "Connecting the bot to your website, database, Google Sheets or custom API",
      "Web admin panel for orders, users and statistics",
      "Automatic subscription renewal reminders, order follow-up and shipment status",
    ],
    scenarioTitle: "What will your bot do?",
    scenarios: [
      {
        title: "Telegram sales bot",
        desc: "The customer picks a product in chat, pays, and the order is registered with a confirmation — even while you are offline.",
      },
      {
        title: "Support & answering bot",
        desc: "Frequent questions like price, stock and ordering are answered automatically; special cases go to a human.",
      },
      {
        title: "Membership & channel management",
        desc: "Joining a channel or group requires an action: payment, sign-up or admin approval — with per-flow statistics.",
      },
      {
        title: "Notifications & reminders",
        desc: "Appointment reminders, order status and important notices are sent to customers or your team automatically.",
      },
    ],
    faq: [
      {
        q: "How much does a Telegram bot cost?",
        a: "It depends on the features; a simple single-purpose bot costs less than a full sales system with a panel and payment gateway. After hearing your needs we give a transparent, fixed estimate.",
      },
      {
        q: "How long does it take?",
        a: "Single-purpose bots are usually ready in 5–10 business days. Larger systems with an admin panel and payment integration take several weeks and are delivered step by step.",
      },
      {
        q: "Does the bot come with an admin panel?",
        a: "If needed, we build a web panel where you see orders, users and bot statistics, and edit the bot's messages without touching code.",
      },
      {
        q: "What if Telegram imposes limitations?",
        a: "Bots are built on Telegram's official Bot API and are reliably stable. If a limitation ever appears, it is reviewed and fixed during the support period per contract.",
      },
      {
        q: "Who owns the source code?",
        a: "You do. The complete source code is delivered with documentation, with no forced dependency on us.",
      },
    ],
  },
  "sales-bot": {
    name: "Sales & Order Bot",
    h1: "Sales and order automation; from product selection to payment and follow-up",
    metaTitle: "Sales & Order Bot | Automated Ordering and Payment | WebNovo",
    metaDescription:
      "Sales bots and order systems for Telegram, Bale and web; payment gateway integration, receipt verification, order tracking and an admin panel. For shops, academies and small businesses.",
    intro:
      "If you register orders manually in chat or direct messages every day, check deposit receipts and answer order-status questions one by one, this cycle can probably be handed to a bot. A sales bot walks the customer from product selection to payment and confirmation, and you end up seeing only the sales report.",
    capabilities: [
      "Ordering in chat or a simple form, no online store required",
      "Online payment gateway integration (Zarinpal and similar) with automatic payment confirmation",
      "Card-to-card receipt photo intake with automatic matching against the expected payment",
      "Automatic order-status updates for the customer: registered, processing, shipped, delivered",
      "Order admin panel: view, change status, search and sales reports",
      "Simple receipt or invoice issued to the customer after ordering",
      "Connection to your website, Google Sheets or accounting software when needed",
    ],
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Selling on Telegram or Bale",
        desc: "The catalog lives inside the bot; the customer picks, pays and the order is registered.",
      },
      {
        title: "Subscriptions, courses or services",
        desc: "After payment, access is activated automatically; renewals and expiry are managed automatically too.",
      },
      {
        title: "Orders from resellers and branches",
        desc: "Resellers register orders in the bot and the final list is prepared for packing and shipping.",
      },
    ],
    honestNote:
      "Connecting to Instagram direct messages depends on Instagram's own official rules and permissions; in the review meeting we suggest the realistic, low-risk path for your needs — we don't make unfeasible promises.",
    faq: [
      {
        q: "Do I need a website for a sales bot?",
        a: "No; the bot alone can be your store in chat. If you have a website or online shop, the bot connects to it as well.",
      },
      {
        q: "Which payment gateways does it work with?",
        a: "Common gateways like Zarinpal. If you have a specific one in mind, we check feasibility before starting.",
      },
      {
        q: "Where are orders stored?",
        a: "In the bot's dedicated database; viewable and exportable from the admin panel, and connectable to Google Sheets or your software if needed.",
      },
      {
        q: "Do you take small, simple projects?",
        a: "Yes; from a simple order bot to multi-part systems — we scope the work to the real need, not beyond it.",
      },
    ],
  },
  "appointment-bot": {
    name: "Booking Bot",
    h1: "Appointment scheduling and online booking bots",
    metaTitle: "Appointment Bot | Online Booking System | WebNovo",
    metaDescription:
      "Booking and appointment bots for clinics, salons, academies and service centers; automatic reminders, cancellation management and connection to Telegram, Bale and WhatsApp.",
    intro:
      "When appointments are coordinated by phone or chat, the same repetitive work repeats: checking the calendar, aligning times, reminding customers and moving bookings. A booking bot runs this cycle itself: the customer picks and reserves a slot, gets a reminder on time, and your calendar stays tidy and up to date.",
    capabilities: [
      "Working hours, holidays and per-slot capacity definitions",
      "Customer booking in Telegram, Bale, WhatsApp or a simple web page",
      "Automatic reminders before appointments to reduce no-shows",
      "Cancellation and rescheduling by the customer, without phone calls",
      "Instant notification of new appointments to reception or the person in charge",
      "Appointment admin panel: daily calendar, search and reports",
    ],
    scenarioTitle: "Which businesses is this for?",
    scenarios: [
      {
        title: "Clinics and practices",
        desc: "Patients book in chat, receive reminders, and the day's list is ready for reception.",
      },
      {
        title: "Salons and barbershops",
        desc: "Each provider has their own calendar; customers see free slots and book instantly.",
      },
      {
        title: "Academies and classes",
        desc: "Registration and trial-session booking without phone calls; automatic reminders before class.",
      },
    ],
    faq: [
      {
        q: "Can customers book without installing anything?",
        a: "Yes; booking happens in the messenger your customers already use (Telegram, Bale or WhatsApp), or on a simple web page you can link anywhere.",
      },
      {
        q: "How are reminders sent?",
        a: "In the same channel the booking was made; you set the timing, e.g. one day and one hour before.",
      },
      {
        q: "What if a customer cancels?",
        a: "The slot is freed immediately for others to book, and you are notified of the cancellation.",
      },
      {
        q: "Can booking be combined with a sales bot?",
        a: "Yes; if you also need a deposit or payment next to booking, both are combined in one system.",
      },
    ],
  },
  "ai-chatbot": {
    name: "Answering Bot & Chatbot",
    h1: "Automatic answering and AI-powered chatbots",
    metaTitle: "Answering Bot & Chatbot | Automated Customer Support | WebNovo",
    metaDescription:
      "Answering bots and chatbots for Telegram, WhatsApp and websites; automatic answers to repetitive questions, AI chatbots trained on your documents, and human-operator handover.",
    intro:
      "How many times a day do you answer the same question? “What's the price?” “Do you have stock?” “How do I order?” An answering bot handles these at any hour, and you join the conversation only when it truly matters.",
    capabilities: [
      "Automatic answers to repetitive questions based on conversation flows we define together",
      "AI chatbots that answer from your documents, catalog and FAQs",
      "Works on Telegram, Bale, WhatsApp or your website",
      "Smart handover to a human operator when the bot is unsure or the conversation is sensitive",
      "Logging of frequent questions and topics for continuous improvement",
      "24/7 answers to repetitive questions, even outside working hours",
    ],
    honestNote:
      "AI is not always necessary. For many businesses, predefined answers are faster, cheaper and more reliable. We review the process first and use AI only when it genuinely helps — we don't label everything “AI”.",
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Online stores",
        desc: "Price, stock, shipping time and ordering questions are answered automatically so customers reach checkout faster.",
      },
      {
        title: "Services and support",
        desc: "Repetitive requests like fault reports or status checks are registered; complex cases go to the team.",
      },
      {
        title: "Academies and enrollment",
        desc: "Course guidance, enrollment terms and applicant FAQs — without someone spending time on it each time.",
      },
    ],
    faq: [
      {
        q: "What's the difference between a simple chatbot and an AI chatbot?",
        a: "A simple chatbot uses predefined answers and is great for clear questions; an AI chatbot is trained on your documents and handles open questions too. In the review meeting we tell you which is enough for you.",
      },
      {
        q: "Can the bot give a wrong answer?",
        a: "With AI chatbots the possibility exists; that's why we limit answers to your documents and always keep the human-handover path open.",
      },
      {
        q: "Which platforms does it run on?",
        a: "Telegram, Bale, WhatsApp and websites — depending on where your customers message most.",
      },
      {
        q: "Is an AI chatbot more expensive?",
        a: "Yes, because language-model costs are added. If a simpler version covers your needs, we recommend that one.",
      },
    ],
  },
  crm: {
    name: "CRM & Customer Panel",
    h1: "Custom CRM and customer management panel for your business",
    metaTitle: "Custom CRM Development | Simple Customer Panel | WebNovo",
    metaDescription:
      "Simple, custom CRMs for small businesses: customer profiles, order follow-up, sales reports and connection to Telegram and WhatsApp bots — without heavy, complex panels.",
    intro:
      "In many businesses, customer information is scattered across chats, Excel files and people's memories. A simple custom CRM has exactly what you need: a profile per customer, order status, follow-up reminders and sales reports — without heavy panels whose features are never used.",
    capabilities: [
      "Unified profile per customer: contact info, orders and notes",
      "Order registration and follow-up from intake to delivery",
      "Follow-up reminders for open tasks and customers for the sales team",
      "Simple, understandable sales and performance reports",
      "Connection to Telegram or WhatsApp bots: customer messages in chat, registered in your panel",
      "Access levels for team members when needed",
    ],
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Sales and lead follow-up",
        desc: "Every request is registered, has an owner, and no lead gets lost between chats.",
      },
      {
        title: "Services and support",
        desc: "Each customer's history in one place; the next call is answered faster and more accurately.",
      },
      {
        title: "Bot-to-panel connection",
        desc: "Orders and payments made in the bot are registered in the panel automatically — no manual entry.",
      },
    ],
    faq: [
      {
        q: "Why build a custom CRM instead of buying an off-the-shelf one?",
        a: "If ready-made panels cover your needs exactly, they are a good choice. We build when your process is special, when bots and panel must connect, or when you are tired of crowded panels.",
      },
      {
        q: "How many users is this suitable for?",
        a: "From one person to small and medium teams. For large organizational needs we first review whether custom-building makes sense.",
      },
      {
        q: "Can data be migrated from Excel?",
        a: "Yes; your current data (Excel, exports from other software) is migrated at kickoff so you work with real data from day one.",
      },
      {
        q: "Does the CRM connect to a Telegram bot?",
        a: "Yes; it's one of the most used combinations: the customer orders on Telegram and everything is registered in the panel automatically.",
      },
    ],
  },
  "whatsapp-bot": {
    name: "WhatsApp Bot",
    h1: "WhatsApp bots and automated customer answering",
    metaTitle: "WhatsApp Bot | WhatsApp Automation | WebNovo",
    metaDescription:
      "WhatsApp automation for businesses: automatic customer answering, order notifications and connection to panels and other bots — with full transparency about WhatsApp's paths and limitations.",
    intro:
      "WhatsApp is the main channel for many customers; but answering a high volume of repetitive messages and losing messages outside working hours has a real cost. With WhatsApp automation, repetitive messages get automatic answers and important conversations reach you neatly.",
    capabilities: [
      "Automatic answering to repetitive customer messages",
      "Guide menus that route the customer to the right section (orders, support, address)",
      "Order status notifications and reminders on WhatsApp",
      "Handover to a human for sensitive conversations",
      "Connection to your panel, Telegram bot or website so channels stay unified",
    ],
    honestNote:
      "For automation, WhatsApp has an official Business API path with its own terms and costs; unofficial methods carry limitations such as the risk of the number being blocked. In the review meeting we transparently present the suitable path with its risks based on your message volume, then decide together.",
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Stores and order taking",
        desc: "Customers ask prices or place orders on WhatsApp; routine answers are automatic and orders are registered neatly.",
      },
      {
        title: "Answering and support",
        desc: "Repetitive questions are answered at any hour; special cases go to a human.",
      },
      {
        title: "Notifications and reminders",
        desc: "Appointment reminders, order status or payment due dates — in the messenger your customers know.",
      },
    ],
    faq: [
      {
        q: "Can our WhatsApp number get blocked?",
        a: "On the official path (Business API), no — it has a clear framework. Unofficial methods carry that risk and we don't hide it; the choice is yours and we explain both sides.",
      },
      {
        q: "What's the difference between official and unofficial paths?",
        a: "The official path goes through Meta and authorized providers: stable, with per-message costs. Unofficial paths are cheaper but sensitive to WhatsApp's internal rules. For a business whose number matters, the official path is our first review.",
      },
      {
        q: "Can a WhatsApp bot work alongside a Telegram bot?",
        a: "Yes; both connect to one core so orders and customers are registered in one place, not two separate islands.",
      },
    ],
  },
  "trading-bot": {
    name: "Trading & Crypto Bot",
    h1: "Trading bots, signal management and exchange integration",
    metaTitle: "Trading & Crypto Bot | Signal and Exchange Bots | WebNovo",
    metaDescription:
      "Trading and crypto bot development: automatic signal registration and publishing, stop-loss and target management, exchange API integration and performance reports. Software tooling for trading teams — no profit promises.",
    intro:
      "This page is about building software, not promising profit. If you have an analysis or trading team and part of the work — signal entry, target announcements, stop-loss management, reporting — has become manual and tedious, we can hand that part to a bot that runs 24/7 by the rules you define, so execution no longer depends on manual tracking.",
    capabilities: [
      "Signal entry by the trader and automatic publishing to channels or groups",
      "Real-time price monitoring with automatic target-hit announcements",
      "Automatic stop-loss, risk-free and trailing-stop management",
      "Exchange API integration for prices, balances and order execution",
      "Telegram bot for traders to control and view status",
      "Periodic performance reports in Excel or Google Sheets, based on real logs",
    ],
    honestNote:
      "These bots make no trading decisions and guarantee no profit; their job is automating and precision-executing your decisions. Responsibility for trades always stays with the trader.",
    scenarioTitle: "Who is this built for?",
    scenarios: [
      {
        title: "Signal and analysis teams",
        desc: "Signals are registered, published automatically, and target hits announced without manual watching.",
      },
      {
        title: "Individual traders",
        desc: "Trading plans execute without staring at charts; stops and targets managed by your rules.",
      },
      {
        title: "Exchanges and referral campaigns",
        desc: "User registration and verification, reporting and notifications — automated.",
      },
    ],
    faq: [
      {
        q: "Does the bot trade on its own?",
        a: "Depending on your needs: it can be only a registration/publishing/monitoring tool, or execute rules you define on the exchange. The level of involvement is your decision.",
      },
      {
        q: "Which exchanges does it connect to?",
        a: "Exchanges with public or private APIs; previous projects used LBank and XT and similar services. Tell us your exchange in the review meeting so we check feasibility.",
      },
      {
        q: "How is API key security handled?",
        a: "Keys are stored only on your own server, created with the minimum permission scope, and never written into code or logs.",
      },
      {
        q: "Is there guaranteed profit?",
        a: "No — and anyone saying so is not being honest. We build software; trading results depend on the market and your decisions.",
      },
    ],
  },
  "price-monitoring": {
    name: "Price Bot & Web Scraping",
    h1: "Price bots, competitor monitoring and web scraping",
    metaTitle: "Price & Competitor Monitoring Bot | Web Scraping | WebNovo",
    metaDescription:
      "Price and competitor monitoring bots for Torob, Digikala and other sites; automatic price updates with your margin formula, and product data extraction via web scraping.",
    intro:
      "If you check competitor prices manually or collect product information from websites, this is one of those jobs a bot does far better than a human: it runs around the clock, never gets tired and avoids human copy-and-type errors. We have built price and monitoring bots for stores selling on Torob, Digikala and Emalls that are running right now.",
    capabilities: [
      "Periodic competitor price and stock monitoring on Torob, Digikala, Emalls or any other site",
      "Instant alerts on competitor price or stock changes",
      "Automatic updating of your store's prices based on a margin formula you define",
      "Preventing below-floor pricing or selling out-of-stock items",
      "Extracting products, lists and data from websites (web scraping)",
      "Output to Excel, database or a custom dashboard; hourly, daily or weekly schedules",
    ],
    honestNote:
      "Scraping is done within the target site's rules and with a reasonable request rate. If a site has officially closed data access, we first review alternatives — such as official seller web services.",
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Marketplace sellers",
        desc: "Your prices stay in the competitive range within your allowed margin — without manual morning checks.",
      },
      {
        title: "Importers and suppliers",
        desc: "Supplier and market fluctuations in one dashboard so purchase decisions are data-driven.",
      },
      {
        title: "Market research and data collection",
        desc: "Product lists, specs and prices extracted from target sites and delivered neatly.",
      },
    ],
    faq: [
      {
        q: "Is scraping legal?",
        a: "It depends on usage and the target site's terms. We work with public data, reasonable request rates and no harm to the target site; if an official path exists (like seller web services) we suggest it first.",
      },
      {
        q: "What if competitor site structures change?",
        a: "During the support period per contract, page structure changes are reviewed and the bot is fixed; that's a core reason support commitments exist.",
      },
      {
        q: "What formats is the output?",
        a: "Whatever is useful to you: Excel files, database, Google Sheets or a custom dashboard with charts.",
      },
      {
        q: "Which sites can you build price bots for?",
        a: "Almost any site that shows prices publicly. Send your target sites and we check technical feasibility before starting.",
      },
    ],
  },
  ocr: {
    name: "Invoice & Receipt OCR",
    h1: "Invoice OCR; automatic reading of receipts and invoices with AI",
    metaTitle: "Invoice & Bank Receipt OCR | AI Data Extraction | WebNovo",
    metaDescription:
      "Automatic reading of bank receipts and invoices with OCR and AI: turning invoice images into data, matching payments and removing manual typing — with a human-review queue for suspicious cases.",
    intro:
      "Visually checking deposit receipts, typing invoice data and finding mismatches is repetitive and error-prone. The system we build takes the image, extracts the key information and delivers structured results; you review only the suspicious cases. A real instance of this system is live in our payment bots, verifying bank receipts.",
    capabilities: [
      "Reading card-to-card receipts: amount, date, tracking number and destination",
      "Automatic matching of receipts against expected payments, approved or rejected",
      "Detecting duplicate or tampered receipts and routing them to human review",
      "Extracting purchase/sale invoice data into structured form",
      "Processing Persian documents and invoices",
      "Output to database or Excel, or direct connection to your bot and panel",
    ],
    honestNote:
      "Reading accuracy depends on image quality and document layout, and we never claim everything is always flawless; that's why a human-review path is always kept for suspicious cases so errors never reach your books.",
    scenarioTitle: "Where does this help?",
    scenarios: [
      {
        title: "Receipt verification in sales bots",
        desc: "The customer sends a receipt photo in chat; the bot reads amount and tracking number and approves or rejects the order.",
      },
      {
        title: "Purchase invoice processing",
        desc: "Incoming invoice data enters your Excel or system automatically instead of manual typing.",
      },
      {
        title: "Financial and administrative documents",
        desc: "Specific fields read from repetitive documents, delivered structured for the next steps.",
      },
    ],
    faq: [
      {
        q: "Is Persian OCR supported?",
        a: "Yes; our main focus is Persian receipts and invoices, and a live instance runs in our payment bots.",
      },
      {
        q: "How accurate is the reading?",
        a: "It depends on photo quality and document layout. Instead of advertising a number, we test the system on samples of your real documents and you see the actual result before starting.",
      },
      {
        q: "Does it read handwriting?",
        a: "Handwriting is far harder than printed text and varies by legibility. Send samples and we'll honestly say whether it's feasible.",
      },
      {
        q: "How is the system delivered?",
        a: "As a module connected to your current bot or panel, or as a standalone service with Excel/database output — depending on where receipts and invoices enter your workflow.",
      },
    ],
  },
};

export function getServiceEn(slug: string): ServiceEn | undefined {
  return SERVICES_EN[slug];
}
