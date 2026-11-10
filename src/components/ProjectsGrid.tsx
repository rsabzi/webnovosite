"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bot, Calendar } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";

export default function ProjectsGrid() {
  const [active, setActive] = useState<string>("all");

  const list = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {PROJECT_CATEGORIES.map((cat) => {
          const count =
            cat.id === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat.id).length;
          if (count === 0) return null;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
                active === cat.id
                  ? "bg-cyan-500/15 border-cyan-500/50 text-cyan-300"
                  : "bg-slate-900/70 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600"
              }`}
            >
              {cat.label}
              <span className="mr-1.5 text-[11px] font-mono-num opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-cyan-700/60 hover:bg-slate-900 transition-all"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={p.image}
                alt={p.imageAlt ?? p.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: p.imagePosition }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              {p.botId && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-lg bg-slate-950/80 border border-cyan-800/60 text-cyan-300 font-mono-num">
                  <Bot className="w-3 h-3" /> {p.botId}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col p-5 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Calendar className="w-3 h-3" />
                <span className="font-mono-num">{p.year}</span>
                <span className="text-slate-700">•</span>
                <span className="truncate">{p.client}</span>
              </div>

              <h3 className="text-base font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{p.subtitle}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.stack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/60 font-mono-num"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {p.liveNote && (
                <p className="text-[11px] text-cyan-300 leading-relaxed">{p.liveNote}</p>
              )}

              <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="truncate text-cyan-400 font-semibold">
                  {p.results[0] ? `${p.results[0].label}: ${p.results[0].value}` : ""}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-slate-400 group-hover:text-white transition-colors">
                  جزئیات پروژه <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
