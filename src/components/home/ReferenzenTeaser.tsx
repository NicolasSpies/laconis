"use client";

import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { referenzen } from "@/data/referenzen";
import { useReveal } from "@/lib/useReveal";

/**
 * home-referenzen · pinnwand-strip.
 * drei neueste projekte · leicht rotiert, mit tape-akzent und handschriftlicher
 * notiz wenn vorhanden. mehr persönlichkeit als reine editorial-cards, aber
 * deutlich dezenter als die Moodboard-variante auf /referenzen.
 */

export function ReferenzenTeaser() {
  const items = [...referenzen].sort((a, b) => b.jahr - a.jahr).slice(0, 3);
  const gridRef = useReveal({ margin: "-120px 0px" }) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="05">referenzen</SectionLabel>

        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <h2 className="heading-display text-[clamp(2rem,5vw,3.5rem)] max-w-[700px] text-offwhite">
            ergebnisse, die für sich{" "}
            <span className="italic font-serif text-accent-ink">sprechen.</span>
          </h2>
          <p className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[340px] leading-snug">
            auswahl · jedes eins nach dem anderen, keine vorlagen.
          </p>
        </div>

        <div
          ref={gridRef}
          className="reveal-root mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 md:gap-y-16"
        >
          {items.map((r, i) => {
            const rotate = [-1.2, 0.8, -0.6][i] ?? 0;
            const tapeLeft = i % 2 === 0;
            const delay = i * 180;
            return (
              <Link
                key={r.slug}
                href={`/referenzen/${r.slug}`}
                className="group block relative"
                style={{ transform: `rotate(${rotate}deg)` }}
              >
                {/* tape */}
                <span
                  aria-hidden
                  className={
                    "pointer-events-none absolute -top-3 h-4 w-16 bg-offwhite/10 border border-ink/10 rounded-[2px] " +
                    (tapeLeft ? "left-6 -rotate-6" : "right-6 rotate-3")
                  }
                />

                <div
                  className="reveal-clip relative overflow-hidden rounded-md border border-ink/10 transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-[0_18px_48px_-20px_rgba(225,253,82,0.25)]"
                  style={{ "--rd": `${delay}ms` } as React.CSSProperties}
                >
                  <RefThumb ref_={r} aspect="4 / 3" />
                  <span className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-label text-offwhite bg-black/60 backdrop-blur-sm border border-white/15 px-1.5 py-0.5 rounded-sm">
                    {r.kategorieLabel}
                  </span>
                  {r.inArbeit && (
                    <span className="absolute top-3 right-3 font-mono text-[9px] uppercase tracking-label text-accent-ink bg-black/70 px-1.5 py-0.5 rounded-sm">
                      in arbeit
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="heading-sans text-[20px] leading-tight text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                      {r.name}
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

                {r.notiz && (
                  <p
                    className="mt-4 font-hand text-[17px] leading-tight text-offwhite/55"
                    style={{ transform: "rotate(-1.5deg)" }}
                  >
                    {r.notiz}
                  </p>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-20 flex justify-center">
          <Button href="/referenzen" variant="glass" size="md">
            alle referenzen ansehen →
          </Button>
        </div>
      </div>
    </section>
  );
}
