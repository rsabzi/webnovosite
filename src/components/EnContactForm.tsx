"use client";

import { useState } from "react";
import { Mail, MessageSquare, PhoneCall, Send } from "lucide-react";

export default function EnContactForm() {
  const [idea, setIdea] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async () => {
    if (idea.trim().length < 10 || (phone.trim() === "" && email.trim() === "" && telegram.trim() === "")) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: idea.trim(), phone: phone.trim(), email: email.trim(), telegram: telegram.trim() }),
      });
      setState(response.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href="https://t.me/Webnovobot"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center transition-colors hover:border-cyan-700/60"
        >
          <MessageSquare className="mx-auto h-5 w-5 text-cyan-400" />
          <p className="mt-2 text-sm font-bold text-white">Telegram</p>
          <p className="mt-1 text-xs text-slate-400">@Webnovobot — fastest response</p>
        </a>
        <a
          href="tel:+989165486367"
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center transition-colors hover:border-cyan-700/60"
        >
          <PhoneCall className="mx-auto h-5 w-5 text-cyan-400" />
          <p className="mt-2 text-sm font-bold text-white">Phone / WhatsApp</p>
          <p className="mt-1 text-xs text-slate-400" dir="ltr">+98 916 548 6367</p>
        </a>
        <a
          href="mailto:rsabzi714@gmail.com"
          className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-center transition-colors hover:border-cyan-700/60"
        >
          <Mail className="mx-auto h-5 w-5 text-cyan-400" />
          <p className="mt-2 text-sm font-bold text-white">Email</p>
          <p className="mt-1 text-xs text-slate-400">rsabzi714@gmail.com</p>
        </a>
      </div>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8">
        <h2 className="text-lg font-black text-white">Send a request</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-300">
              What process or idea should we look at? *
            </span>
            <textarea
              value={idea}
              onChange={(event) => setIdea(event.target.value.slice(0, 1200))}
              rows={5}
              placeholder="Example: we receive orders in WhatsApp and type them into Excel manually every day…"
              className="w-full resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-300">Phone / WhatsApp</span>
            <input
              type="tel"
              dir="ltr"
              value={phone}
              onChange={(event) => setPhone(event.target.value.slice(0, 30))}
              placeholder="+98 9xx xxx xxxx"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-300">Telegram ID (optional)</span>
            <input
              type="text"
              dir="ltr"
              value={telegram}
              onChange={(event) => setTelegram(event.target.value.slice(0, 100))}
              placeholder="@username"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-xs font-semibold text-slate-300">Email (optional)</span>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(event) => setEmail(event.target.value.slice(0, 200))}
              placeholder="you@company.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          </label>
        </div>

        {state === "sent" ? (
          <p className="mt-5 rounded-2xl border border-emerald-700/50 bg-emerald-950/40 p-4 text-sm text-emerald-200">
            Request received — we usually reply within one business day.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={submit}
              disabled={state === "sending"}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-600/25 transition-all hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {state === "sending" ? "Sending…" : "Send request"}
            </button>
            {state === "error" && (
              <p className="mt-3 text-xs text-red-300">
                Please describe the process in a sentence or two and leave at least one contact
                option — or message us directly on Telegram.
              </p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
