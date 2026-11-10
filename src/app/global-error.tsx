"use client";

import { useEffect } from "react";

/**
 * آخرین مرز خطا (خطا در ریشه‌ی اپ). این کامپوننت باید خودش <html> و <body> رندر کند.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[webnovo] global error:", error);
  }, [error]);

  return (
    <html lang="fa" dir="rtl">
      <body style={{ margin: 0, background: "#030712", color: "#f1f5f9", fontFamily: "Vazirmatn, sans-serif" }}>
        <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div
            style={{
              maxWidth: 560,
              textAlign: "center",
              border: "1px solid #1e293b",
              background: "#0b0f19",
              borderRadius: 24,
              padding: 32,
            }}
          >
            <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>سرویس موقتاً در دسترس نیست</h1>
            <p style={{ marginTop: 12, fontSize: 14, lineHeight: 1.9, color: "#94a3b8" }}>
              مشکلی در بارگذاری سایت پیش آمد. اطلاعات ارسالی شما از بین نرفته است؛ لطفاً چند لحظه دیگر دوباره تلاش
              کنید.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 20,
                padding: "12px 22px",
                borderRadius: 12,
                border: "none",
                background: "linear-gradient(90deg,#06b6d4,#4f46e5)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              تلاش دوباره
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
