"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SiteTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    // عدم ردیابی مسیرهای مدیریت و API
    if (pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    // جلوگیری از ارسال تکراری در یک رندر
    if (lastTrackedPath.current === pathname) {
      return;
    }
    lastTrackedPath.current = pathname;

    try {
      const payload = {
        path: pathname,
        referrer: typeof document !== "undefined" ? document.referrer : "",
        screenWidth: typeof window !== "undefined" ? window.innerWidth : 0,
      };

      fetch("/api/site-analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {
        // نادیده گرفتن هرگونه خطای شبکه سمت کاربر
      });
    } catch {
      // ادامه بدون اثرگذاری روی تجربه کاربر
    }
  }, [pathname]);

  return null;
}
