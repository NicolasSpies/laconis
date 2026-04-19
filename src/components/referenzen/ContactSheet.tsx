"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen, type Referenz } from "@/data/referenzen";

type FilterKey = "alle" | "web" | "branding" | "grafik";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "alle", label: "alle" },
  { key: "web", label: "web" },
  { key: "branding", label: "branding" },
  { key: "grafik", label: "grafik" },
];

function matchesFilter(r: Referenz, filter: FilterKey): boolean {
  if (filter === "alle") return true;
  if (filter === "web")
    return r.kategorie === "web" || r.kategorie === "web-branding";
  if (filter === "branding")
    return r.kategorie === "branding" || r.kategorie === "web-branding";
  if (filter === "grafik") return r.kategorie === "grafik";
  return true;
}

function countFor(filter: FilterKey): number {
  return referenzen.filter((r) => matchesFilter(r, filter)).length;
}

export function ContactSheet() {
  const [filter, setFilter] = useState<FilterKey>("alle");

  const items = useMemo(
    () => referenzen.filter((r) => matchesFilter(r, filter)),
    [filter],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/8 pb-5">
        {FILTERS.map((f) => {
          const active = filter === f.key;
          const count = countFor(f.key);
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={
                "group relative font-mono text-[11px] uppercase tracking-label px-3 py-1.5 rounded-full border transition-colors " +
                (active
                  ? "border-lime/40 bg-lime/10 text-accent-ink"
                  : "border-ink/10 text-offwhite/55 hover:text-offwhite hover:border-ink/20")
              }
            >
              <span>{f.label}</span>
              <span
                className={
                  "ml-1.5 text-[9px] " +
                  (active ? "text-accent-ink/70" : "text-offwhite/30")
                }
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
      >
        <AnimatePresence mode="popLayout">
          {items.map((r) => (
            <motion.div
              key={r.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/referenzen/${r.slug}`}
                className="group block"
              >
                {/* Image frame */}
                <div className="relative overflow-hidden rounded-md border border-ink/8 transition-all duration-300 group-hover:border-lime/60 group-hover:shadow-[0_18px_48px_-20px_rgba(225,253,82,0.25)]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="will-change-transform"
                  >
                    <RefThumb ref_={r} aspect="4 / 3" />
                  </motion.div>

                  {/* Kategorie-Badge */}
                  <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-label text-black bg-lime px-1.5 py-0.5 rounded-sm">
                    {r.kategorieLabel}
                  </span>
                </div>

                {/* Meta */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="heading-sans text-[20px] leading-tight text-offwhite group-hover:text-accent-ink transition-colors">
                      {r.name.toLowerCase()}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/45 truncate">
                      {r.ort} • {r.jahr}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] text-offwhite/30 group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all shrink-0">
                    →
                  </span>
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-offwhite/50 line-clamp-2">
                  {r.kurz}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-mono text-[12px] uppercase tracking-label text-offwhite/40">
            nichts in dieser kategorie • schau gerne in einer anderen
          </p>
        </div>
      )}
    </div>
  );
}
