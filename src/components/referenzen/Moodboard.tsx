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

// deterministic "random" feel per card, seeded by index
function cardStyle(i: number) {
  const aspects = ["4 / 3", "4 / 5", "1 / 1", "3 / 4", "5 / 4"];
  const aspect = aspects[i % aspects.length];
  // rotate between -2.6 and +2.6 deg
  const rotate = Math.round(Math.sin(i * 2.17 + 0.4) * 2.6 * 10) / 10;
  // small vertical shift so rows don't align too neatly
  const offsetY = Math.round(Math.cos(i * 1.73 + 0.9) * 8);
  // tape on ~every 3rd card, alternating side
  const hasTape = i % 3 === 0;
  const tapeLeft = i % 2 === 0;
  // pin dot on some others
  const hasPin = !hasTape && i % 4 === 1;
  return { aspect, rotate, offsetY, hasTape, tapeLeft, hasPin };
}

// dark card background — subtle noise over near-black (same family as polaroid-board)
const CARD_BG = `
  radial-gradient(ellipse at 30% 0%, rgba(255,255,255,0.045) 0%, transparent 55%),
  url("data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>`,
  )}"),
  linear-gradient(180deg, #121212 0%, #0c0c0c 100%)
`;

export function Moodboard() {
  const [filter, setFilter] = useState<FilterKey>("alle");

  const items = useMemo(
    () => referenzen.filter((r) => matchesFilter(r, filter)),
    [filter],
  );

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink/10 pb-5">
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

        <span className="ml-auto font-mono text-[10px] uppercase tracking-label text-offwhite/35 hidden sm:inline">
          pinnwand • keine perfekte ordnung
        </span>
      </div>

      {/* Masonry via CSS columns */}
      <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-x-8 [column-fill:_balance]">
        <AnimatePresence mode="popLayout">
          {items.map((r, i) => {
            const s = cardStyle(i);
            return (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 16, rotate: 0 }}
                animate={{ opacity: 1, y: 0, rotate: s.rotate }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.25 } }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: (i % 6) * 0.04,
                }}
                style={{
                  marginTop: i < 3 ? 0 : `${s.offsetY}px`,
                }}
                className="relative mb-10 break-inside-avoid will-change-transform"
              >
                <Link
                  href={`/referenzen/${r.slug}`}
                  className="group block"
                >
                  {/* dark card */}
                  <div
                    className="relative text-offwhite rounded-md p-2.5 pb-3 border border-ink/10 group-hover:border-lime/50 shadow-[0_22px_50px_-20px_rgba(0,0,0,0.9),0_2px_6px_rgba(0,0,0,0.4)] transition-all duration-500 group-hover:-translate-y-1"
                    style={{ background: CARD_BG }}
                  >
                    {/* thin lime accent at top — the "tape" moment */}
                    {s.hasTape && (
                      <span
                        aria-hidden
                        className={
                          "pointer-events-none absolute -top-[1px] h-[2px] bg-lime/50 " +
                          (s.tapeLeft
                            ? "left-5 right-1/3"
                            : "left-1/3 right-5")
                        }
                      />
                    )}

                    {/* pin dot — small lime accent */}
                    {s.hasPin && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-lime"
                      />
                    )}

                    <div className="relative overflow-hidden rounded-[2px]">
                      <RefThumb ref_={r} aspect={s.aspect} />

                      {/* kategorie badge */}
                      <span className="absolute top-2.5 left-2.5 font-mono text-[9px] uppercase tracking-label text-black bg-lime px-1.5 py-0.5 rounded-sm">
                        {r.kategorieLabel}
                      </span>

                      {/* in-arbeit tag */}
                      {r.inArbeit && (
                        <span className="absolute top-2.5 right-2.5 font-mono text-[9px] uppercase tracking-label text-accent-ink bg-black/70 px-1.5 py-0.5 rounded-sm">
                          in arbeit
                        </span>
                      )}
                    </div>

                    <div className="pt-3 px-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <h3 className="heading-sans text-[17px] leading-none text-offwhite truncate lowercase group-hover:text-accent-ink transition-colors">
                          {r.name}
                        </h3>
                        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 shrink-0">
                          {r.jahr}
                        </span>
                      </div>
                      <p className="mt-1.5 font-mono text-[9px] uppercase tracking-label text-offwhite/35 truncate">
                        {r.ort}
                      </p>
                      <p className="mt-2 text-[12px] leading-snug text-offwhite/55 line-clamp-2">
                        {r.kurz}
                      </p>

                      <div className="mt-3 flex items-center justify-end">
                        <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55 group-hover:text-accent-ink transition-colors">
                          ansehen →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* handwritten caption — if notiz exists */}
                {r.notiz && (
                  <p
                    className="mt-3 font-hand text-[17px] leading-tight text-offwhite/55 px-2"
                    style={{
                      transform: `rotate(${
                        Math.round(Math.sin(i * 4.11 + 1.1) * 3 * 10) / 10
                      }deg)`,
                    }}
                  >
                    {r.notiz}
                  </p>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="mt-16 text-center">
          <p className="font-mono text-[12px] uppercase tracking-label text-offwhite/35">
            nichts in dieser kategorie • schau gerne in einer anderen
          </p>
        </div>
      )}
    </div>
  );
}
