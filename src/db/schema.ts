import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from "drizzle-orm/pg-core";

export const projectInquiries = pgTable("project_inquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  companyName: text("company_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  email: text("email"),
  projectType: text("project_type").notNull(), // 'marketplace', 'accounting_crm', 'telegram_bot', 'scraping', 'ai_system', 'custom_rpa'
  currentSoftware: text("current_software"), // e.g., سپیدار، هلو، دیدار، ووکامرس، دیجی‌کالا
  estimatedBudget: text("estimated_budget"), // e.g., 'under_30m', '30_to_80m', '80_to_200m', 'enterprise'
  projectDescription: text("project_description").notNull(),
  preferredContactMethod: text("preferred_contact_method").default("phone"), // 'phone', 'telegram', 'whatsapp'
  status: text("status").default("pending"), // 'pending', 'contacted', 'meeting_scheduled', 'closed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const roiCalculations = pgTable("roi_calculations", {
  id: serial("id").primaryKey(),
  staffCount: integer("staff_count").notNull(),
  wastedHoursPerWeek: integer("wasted_hours_per_week").notNull(),
  avgMonthlySalaryTomans: integer("avg_monthly_salary_tomans").notNull(),
  estimatedMonthlySavingTomans: integer("estimated_monthly_saving_tomans").notNull(),
  companyName: text("company_name"),
  phoneNumber: text("phone_number"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultationRequests = pgTable("consultation_requests", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phoneNumber: text("phone_number").notNull(),
  businessField: text("business_field").notNull(),
  urgency: text("urgency").default("normal"), // 'urgent', 'normal', 'exploring'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageVisits = pgTable("page_visits", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  referrer: text("referrer"),
  referrerSource: text("referrer_source").notNull(),
  device: text("device").notNull(),
  browser: text("browser").notNull(),
  visitorHash: text("visitor_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ProjectInquiry = typeof projectInquiries.$inferSelect;
export type NewProjectInquiry = typeof projectInquiries.$inferInsert;
export type RoiCalculation = typeof roiCalculations.$inferSelect;
export type NewRoiCalculation = typeof roiCalculations.$inferInsert;
export type PageVisit = typeof pageVisits.$inferSelect;
export type NewPageVisit = typeof pageVisits.$inferInsert;
