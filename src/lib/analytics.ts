/**
 * لایه‌ی سبک رخدادسنجی (Analytics) — بدون هیچ وابستگی جدید.
 *
 * رویدادها در `window.dataLayer` ثبت می‌شوند؛ بنابراین هر زمان GTM/GA4 به سایت
 * اضافه شود، بدون تغییر کد قابل استفاده‌اند. علاوه بر آن یک CustomEvent با نام
 * `webnovo:event` منتشر می‌شود تا ابزارهای دیگر (مثل شنونده‌های سفارشی) هم بتوانند
 * به آن واکنش بدهند.
 */

export type WebnovoEvent =
  | "automation_cta_click"
  | "automation_form_started"
  | "automation_form_completed"
  | "automation_result_viewed"
  | "lead_submitted"
  | "project_request_clicked"
  | "hero_cta_click"
  | "idea_cta_click"
  | "idea_form_started"
  | "idea_submitted"
  | "contact_float_click";

type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function trackEvent(event: WebnovoEvent, payload: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload };

  try {
    const w = window as DataLayerWindow;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(detail);
  } catch {
    // رخدادسنجی هرگز نباید تجربه‌ی کاربر را مختل کند.
  }

  try {
    window.dispatchEvent(new CustomEvent("webnovo:event", { detail }));
  } catch {
    /* no-op */
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", detail);
  }
}
