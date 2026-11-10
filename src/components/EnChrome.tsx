"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Mail, MessageSquare, PhoneCall, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { SUPPORT_POLICY } from "@/data/site";

/* English navigation chrome — mirrors the Persian navbar/footer visually,
   links only to pages that exist in English. */

const EN_LINKS = [
  { href: "/en", label: "Home" },
  { href: "/en/services", label: "Services" },
  { href: "/en/projects", label: "Work" },
  { href: "/en/pricing", label: "Pricing" },
  { href: "/en/about", label: "About" },
  { href: "/en/faq", label: "FAQ" },
  { href: "/en/contact", label: "Contact" },
];

const EN_TOOL_LINKS = [
  { href: "/en/automation-check", label: "Automation Check" },
  { href: "/en/calculator", label: "ROI Calculator" },
  { href: "/en/live-demo", label: "Live Demo" },
  { href: "/en/case-studies", label: "Case Studies" },
  { href: "/en/idea", label: "Send an Idea" },
];

export function EnNavbar() {
  const pathname = usePathname();
  const faPath = pathname === "/en" ? "/" : pathname.replace(/^\/en/, "") || "/";

  return (
    <>
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-800/30 py-1.5 px-4 text-xs sm:text-sm text-cyan-200 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold">
          Custom automation
        </span>
        <span>We turn repetitive business processes into reliable systems</span>
      </div>

      <header className="sticky top-0 z-[60] bg-[var(--bg-night)]/80 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/en" className="flex items-center gap-3 group focus:outline-none">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
                <div className="w-full h-full bg-[var(--bg-surface)] rounded-[11px] flex items-center justify-center overflow-hidden">
                  <Image src="/images/logo-webnovo.png" alt="WebNovo logo" width={32} height={32} className="w-7 h-7 object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                  WebNovo
                </span>
                <span className="hidden sm:block text-[11px] text-slate-400 font-medium tracking-wide">
                  Business automation studio
                </span>
              </div>
            </Link>

            <nav aria-label="Main menu" className="hidden lg:flex items-center gap-0.5">
              {EN_LINKS.slice(1, 3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    pathname === link.href ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative group">
                <button
                  type="button"
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    EN_TOOL_LINKS.some((t) => pathname === t.href)
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  Tools
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="invisible absolute top-full right-0 z-50 w-52 rounded-xl border border-slate-800 bg-[var(--bg-night)] p-1.5 opacity-0 shadow-2xl transition-all duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {EN_TOOL_LINKS.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`block rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
                        pathname === tool.href
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                      }`}
                    >
                      {tool.label}
                    </Link>
                  ))}
                </div>
              </div>

              {EN_LINKS.slice(3).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-[13.5px] font-medium transition-colors ${
                    pathname === link.href ? "text-cyan-400" : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              {/* Full page reload on purpose: the root layout (chrome) only
                  re-renders on a fresh server request. */}
              <a
                href={faPath}
                lang="fa"
                className="rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[12px] font-bold text-slate-200 transition-colors hover:border-slate-500"
              >
                فارسی
              </a>
              <Link
                href="/en/contact"
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-4 py-2.5 text-[13px] font-semibold text-white shadow-md shadow-cyan-600/25 hover:from-cyan-500 hover:to-indigo-500 transition-all"
              >
                <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200" />
                Request a build
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export function EnFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[var(--bg-surface)]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="text-lg font-black text-white">WebNovo | نوین وب</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            We review your business processes, find the automation opportunities, and build the
            right custom system for each — Telegram bots, order & payment flows, booking, CRM,
            price monitoring, OCR and trading tools.
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-200">Explore</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            {EN_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-200">Free tools</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            {EN_TOOL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-300 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-200">Contact</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-400">
            <li>
              <a href="https://t.me/Webnovobot" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
                <MessageSquare className="h-3.5 w-3.5 text-cyan-400" /> Telegram: @Webnovobot
              </a>
            </li>
            <li>
              <a href="tel:+989165486367" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
                <PhoneCall className="h-3.5 w-3.5 text-cyan-400" /> +98 916 548 6367
              </a>
            </li>
            <li>
              <a href="mailto:rsabzi714@gmail.com" className="inline-flex items-center gap-1.5 hover:text-cyan-300">
                <Mail className="h-3.5 w-3.5 text-cyan-400" /> rsabzi714@gmail.com
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-200">How we work</p>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Free process review → a written proposal with the agreed scope → step-by-step delivery
            with source code and documentation → support after launch. If automation is not worth it
            for you, we say so.
          </p>
          <p className="mt-3 text-[11px] leading-relaxed text-slate-500">{SUPPORT_POLICY.summaryEn}</p>
          <a
            href="/"
            lang="fa"
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[11px] font-semibold text-slate-200 hover:border-slate-500"
          >
            نسخه فارسی <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
      <div className="border-t border-slate-800/70 py-4 text-center text-[11px] text-slate-500">
        © {new Date().getFullYear()} WebNovo — Novin Web. All rights reserved.
        <span className="mx-2 text-slate-700">|</span>
        <Link href="/en/privacy" className="text-slate-400 hover:text-white">
          Privacy
        </Link>
        <span className="mx-2 text-slate-700">|</span>
        <Link href="/en/terms" className="text-slate-400 hover:text-white">
          Terms
        </Link>
      </div>
    </footer>
  );
}
