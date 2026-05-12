"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen, type Referenz } from "@/data/referenzen";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

type FilterKey = "alle" | "web" | "branding" | "grafik";

type Dict = {
  filters: { key: FilterKey; label: string }[];
  empty: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    filters: [
      { key: "alle", label: "alle" },
      { key: "web", label: "web" },
      { key: "branding", label: "branding" },
      { key: "grafik", label: "grafik" },
    ],
    empty: "nichts in dieser kategorie · schau gerne in einer anderen",
  },
  fr: {
    filters: [
      { key: "alle", label: "tout" },
      { key: "web", label: "web" },
      { key: "branding", label: "branding" },
      { key: "grafik", label: "graphisme" },
    ],
    empty: "rien dans cette catégorie · regarde une autre",
  },
  en: {
    filters: [
      { key: "alle", label: "all" },
      { key: "web", label: "web" },
      { key: "branding", label: "branding" },
      { key: "grafik", label: "graphic" },
    ],
    empty: "nothing in this category · try another",
  },
};

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
  const locale = useLocale();
  const t = pick(DICT, locale);

  const items = useMemo(
    () => referenzen.filter((r) => matchesFilter(r, filter)),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-5">
        {t.filters.map((f) => {
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
                  ? "border-lime/50 bg-lime/10 text-accent-ink"
                  : "border-ink/10 text-offwhite/55 hover:text-offwhite hover:border-ink/25")
              }
            >
              <span>{f.label}</span>
              <span
                className={
                  "ml-1.5 text-[9px] " +
                  (active ? "text-accent-ink/80" : "text-offwhite/55")
                }
              >
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

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
                href={`${buildPath("referenzen", locale)}/${r.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-md border border-ink/10 transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-[0_18px_48px_-20px_rgb(var(--accent) / 0.25)] group-hover:rotate-[-0.5deg]">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="will-change-transform"
                  >
                    <RefThumb ref_={r} aspect="4 / 3" />
                  </motion.div>

                  <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-label text-offwhite bg-black/60 backdrop-blur-sm border border-white/15 px-1.5 py-0.5 rounded-sm">
                    {r.kategorieLabel}
                  </span>

                  <svg
                    aria-hidden
                    viewBox="0 0 40 40"
                    className="absolute top-3 right-3 w-7 h-7 text-accent-ink opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <path
                      d="M 6 22 Q 14 30 20 32 T 34 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="heading-sans text-[20px] leading-tight text-offwhite group-hover:text-accent-ink transition-colors">
                      {r.name.toLowerCase()}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/55 truncate">
                      {r.ort} · {r.jahr}
                    </p>
                  </div>
                  <span className="font-mono text-[12px] text-offwhite/35 group-hover:text-accent-ink group-hover:translate-x-0.5 transition-all shrink-0">
                    →
                  </span>
                </div>

                <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55 line-clamp-2">
                  {r.kurz}
                </p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-mono text-[12px] uppercase tracking-label text-offwhite/35">
            {t.empty}
          </p>
        </div>
      )}
    </div>
  );
}
