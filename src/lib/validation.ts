/**
 * اعتبارسنجی و نرمال‌سازی ورودی‌های کاربر — مشترک بین APIها.
 * ارقام فارسی/عربی به لاتین تبدیل می‌شوند تا شماره تماس یکدست ذخیره و ارسال شود.
 */

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** رقم‌های فارسی/عربی را به لاتین تبدیل و فاصله‌های عجیب را پاک می‌کند. */
export function normalizePhoneNumber(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(PERSIAN_DIGITS.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(ARABIC_DIGITS.indexOf(digit)))
    .replace(/\u00a0/g, " ")
    .trim();
}

/** فاصله، خط تیره و پرانتز مجاز است؛ `+` فقط در ابتدای شماره. */
export function isValidPhoneNumber(value: string): boolean {
  const compact = value.replace(/[\s()-]/g, "");
  return /^\+?\d{8,15}$/.test(compact);
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function clampText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}
