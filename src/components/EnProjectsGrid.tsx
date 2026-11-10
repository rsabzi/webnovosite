"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Bot, Calendar } from "lucide-react";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import { PROJECTS_EN, CATEGORY_LABELS_EN } from "@/data/projects.en";

export default function EnProjectsGrid() {
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
              className={`rounded-xl border px-4 py-2 text-xs font-semibold transition-all sm:text-sm ${
                active === cat.id
                  ? "border-cyan-500/50 bg-cyan-500/15 text-cyan-300"
                  : "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-slate-600 hover:text-white"
              }`}
            >
              {CATEGORY_LABELS_EN[cat.id] ?? cat.label}
              <span className="ml-1.5 font-mono-num text-[11px] opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => {
          const en = PROJECTS_EN[p.slug];
          if (!en) return null;
          return (
            <Link
              key={p.slug}
              href={`/en/projects/${p.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 transition-all hover:border-cyan-700/60 hover:bg-slate-900"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={en.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: p.imagePosition }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                {p.botId && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-lg border border-cyan-800/60 bg-slate-950/80 px-2 py-1 font-mono-num text-[11px] text-cyan-300">
                    <Bot className="h-3 w-3" /> {p.botId}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col space-y-3 p-5">
                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <span className="font-mono-num">{p.year}</span>
                  <span className="text-slate-700">•</span>
                  <span className="truncate">{p.client}</span>
                </div>

                <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-cyan-300">
                  {en.title}
                </h3>
                <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">{en.subtitle}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded border border-slate-700/60 bg-slate-800/80 px-2 py-0.5 font-mono-num text-[10px] text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {(en.liveNote ?? p.liveNote) && (
                  <p className="text-[11px] leading-relaxed text-cyan-300">
                    {en.liveNote ?? p.liveNote}
                  </p>
                )}

                <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-800 pt-3 text-xs">
                  <span className="truncate font-semibold text-cyan-400">
                    {en.results[0] ? `${en.results[0].label}: ${en.results[0].value}` : ""}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 text-slate-400 transition-colors group-hover:text-white">
                    Project details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
