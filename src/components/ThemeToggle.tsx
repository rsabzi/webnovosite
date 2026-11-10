"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const STORAGE_KEY = "webnovo-theme";

/**
 * تم، وضعیتی است که «بیرون» از React زندگی می‌کند (روی تگ <html>)، چون
 * اسکریپت ضدپرش پیش از بالا آمدن React آن را تنظیم می‌کند.
 * useSyncExternalStore راه درست خواندن چنین وضعیتی است.
 */
const themeStore = {
  listeners: new Set<() => void>(),

  subscribe(listener: () => void) {
    themeStore.listeners.add(listener);
    return () => {
      themeStore.listeners.delete(listener);
    };
  },

  emit() {
    themeStore.listeners.forEach((l) => l());
  },

  getSnapshot(): Theme {
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  },

  // در سرور همیشه تم شب فرض می‌شود (پیش‌فرض سایت)
  getServerSnapshot(): Theme {
    return "dark";
  },

  set(theme: Theme) {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.classList.toggle("light", theme === "light");
    root.style.colorScheme = theme;

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* حالت مرور خصوصی — نادیده گرفته می‌شود */
    }

    themeStore.emit();
    window.setTimeout(() => root.classList.remove("theme-transition"), 300);
  },
};

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const isDark = theme === "dark";
  const label = isDark ? "روشن کردن تم روز" : "برگشت به تم شب";

  return (
    <button
      type="button"
      onClick={() => themeStore.set(isDark ? "light" : "dark")}
      title={label}
      aria-label={label}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors ${className}`}
    >
      {isDark ? (
        <Moon className="w-[18px] h-[18px]" />
      ) : (
        <Sun className="w-[18px] h-[18px] text-amber-500" />
      )}
    </button>
  );
}
