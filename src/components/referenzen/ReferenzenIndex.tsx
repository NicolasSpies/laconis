"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { referenzen, type Referenz } from "@/data/referenzen";
import { buildPath, type Locale } from "@/i18n/config";
import { useLocale, pick } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";

/**
 * ReferenzenIndex · editorial index-liste für /referenzen (phase 3).
 *
 * ersetzt das scroll-tilted-grid: full-width rows statt kleiner tiles ·
 * skaliert von 3 auf 30 cases ohne layout-bruch · API-ready (rendert
 * stumpf das referenzen-array, egal woher es kommt).
 *
 *   row:  nr. 01   fabry baumpflege.      web · 2025 · ostbelgien   →
 *
 * micro-interactions:
 *   - hover: bild-preview folgt dem cursor (lerp + velocity-tilt) ·
 *     der klassische designer-index-move · desktop only
 *   - hover: aktive row rückt nach rechts, andere rows dimmen
 *   - rows staggern beim ersten sichtbarwerden
 *   - mobile/touch: statisches mini-thumb rechts in der row
 *   - reduced-motion: alles statisch, kein follower
 */

type Dict = {
  numberPrefix: string;
  konzeptBadge: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: { numberPrefix: "nr.", konzeptBadge: "konzept", cta: "case lesen" },
  fr: { numberPrefix: "n°", konzeptBadge: "concept", cta: "voir le case" },
  en: { numberPrefix: "no.", konzeptBadge: "concept", cta: "see case" },
};

/* follower-tuning */
const FOLLOW_LERP = 0.14;
const TILT_MAX = 6; // deg · velocity-tilt clamp

function PreviewVisual({ r }: { r: Referenz }) {
  if (r.heroImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={r.heroImage}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    );
  }
  return (
    <div
      className="w-full h-full grid place-items-center"
      style={{ background: r.farbe }}
    >
      <span className="font-display font-black text-[64px] text-[#f2f2f2] leading-none">
        {r.monogram ?? r.name[0].toLowerCase()}
      </span>
    </div>
  );
}

export function ReferenzenIndex({
  limit,
  tone = "light",
}: {
  /** optional · zeigt nur die ersten N cases (home-teaser) */
  limit?: number;
  /** dark = auf schwarzem slab (home) · namen füllen sich lime beim hover */
  tone?: "light" | "dark";
} = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();
  const cases = limit ? referenzen.slice(0, limit) : referenzen;
  const dark = tone === "dark";

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [followerOn, setFollowerOn] = useState(false);
  const followerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  /* follower nur auf desktop-pointern */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setFollowerOn(window.matchMedia("(pointer: fine)").matches);
  }, []);

  /* rAF-lerp · folgt dem cursor, tilt aus horizontal-velocity ·
     direkte DOM-writes, kein react re-render pro frame */
  useEffect(() => {
    if (!followerOn) return;
    const list = listRef.current;
    const follower = followerRef.current;
    if (!list || !follower) return;

    let mx = 0;
    let my = 0;
    let fx = 0;
    let fy = 0;
    let lastFx = 0;
    let raf: number | null = null;
    let visible = false;

    const tick = () => {
      fx += (mx - fx) * FOLLOW_LERP;
      fy += (my - fy) * FOLLOW_LERP;
      const vel = fx - lastFx;
      lastFx = fx;
      const tilt = Math.max(-TILT_MAX, Math.min(TILT_MAX, vel * 0.35));
      follower.style.transform = `translate(${fx}px, ${fy}px) rotate(${tilt}deg)`;
      const settled = Math.abs(mx - fx) < 0.3 && Math.abs(my - fy) < 0.3;
      if (visible || !settled) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };
    const kick = () => {
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      /* offset: follower schwebt rechts-oberhalb des cursors */
      mx = e.clientX + 28;
      my = e.clientY - 120;
      kick();
    };
    const onEnter = (e: PointerEvent) => {
      visible = true;
      /* beim eintritt: follower direkt an den cursor teleportieren
         (kein lerp-flug quer über den screen) */
      mx = e.clientX + 28;
      my = e.clientY - 120;
      fx = mx;
      fy = my;
      lastFx = fx;
      kick();
    };
    const onLeave = () => {
      visible = false;
    };

    list.addEventListener("pointermove", onMove, { passive: true });
    list.addEventListener("pointerenter", onEnter);
    list.addEventListener("pointerleave", onLeave);
    return () => {
      list.removeEventListener("pointermove", onMove);
      list.removeEventListener("pointerenter", onEnter);
      list.removeEventListener("pointerleave", onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [followerOn]);

  const active = referenzen.find((r) => r.slug === activeSlug) ?? null;

  return (
    <section className={cn("relative", dark ? "py-6 md:py-8" : "py-16 md:py-24")}>
      <div className="container-site">
        <div
          ref={listRef}
          className={cn(
            "border-t-2",
            dark ? "border-[#f2f2f2]/15" : "border-[#0a0a0a]/15",
          )}
          onPointerLeave={() => setActiveSlug(null)}
        >
          {cases.map((r, i) => {
            const isActive = activeSlug === r.slug;
            const isDimmed = activeSlug !== null && !isActive;
            return (
              <motion.div
                key={r.slug}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.05 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`${buildPath("referenzen", locale)}/${r.slug}`}
                  onPointerEnter={() => setActiveSlug(r.slug)}
                  className={cn(
                    "group relative flex items-baseline md:items-center gap-4 md:gap-8 py-7 md:py-9",
                    "border-b-2 no-underline",
                    dark ? "border-[#f2f2f2]/15" : "border-[#0a0a0a]/15",
                    "transition-opacity duration-300",
                    isDimmed && "opacity-30",
                  )}
                >
                  {/* nr. */}
                  <span
                    className={cn(
                      "shrink-0 flex items-baseline gap-1.5 font-mono text-[10px] uppercase tracking-label w-[52px] md:w-[64px]",
                      dark ? "text-[#f2f2f2]/45" : "text-[#0a0a0a]/45",
                    )}
                  >
                    {t.numberPrefix}
                    <span
                      className={cn(
                        "text-[13px] md:text-[14px] tabular-nums",
                        dark ? "text-[#f2f2f2]/70" : "text-[#0a0a0a]/70",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>

                  {/* name · der star der row · auf dark füllt er sich lime */}
                  <span
                    className={cn(
                      "flex-1 min-w-0 font-display font-black lowercase leading-[0.95] tracking-[-0.03em]",
                      "text-[clamp(1.75rem,5vw,3.75rem)]",
                      "transition-[transform,color] duration-300 ease-out",
                      dark
                        ? isActive
                          ? "text-[#e1fd52]"
                          : "text-[#f2f2f2]"
                        : "text-[#0a0a0a]",
                      isActive && "md:translate-x-3",
                    )}
                  >
                    <span className="truncate block">
                      {r.name.toLowerCase()}.
                    </span>
                  </span>

                  {/* meta rechts · desktop */}
                  <span className="hidden md:flex shrink-0 items-center gap-5">
                    {!r.istEcht && (
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-label px-2.5 py-1 rounded-full border border-[#b084d3]/50",
                          dark ? "text-[#f2f2f2]/65" : "text-[#0a0a0a]/65",
                        )}
                      >
                        {t.konzeptBadge}
                      </span>
                    )}
                    <span
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-label text-right",
                        dark ? "text-[#f2f2f2]/55" : "text-[#0a0a0a]/55",
                      )}
                    >
                      {r.kategorieLabel} · {r.jahr}
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[18px] transition-all duration-300",
                        dark ? "text-[#f2f2f2]/35" : "text-[#0a0a0a]/35",
                        isActive &&
                          (dark
                            ? "text-[#e1fd52] translate-x-1"
                            : "text-[#0a0a0a] translate-x-1"),
                      )}
                      aria-hidden
                    >
                      →
                    </span>
                  </span>

                  {/* mobile · mini-thumb + meta */}
                  <span className="flex md:hidden shrink-0 flex-col items-end gap-2">
                    <span
                      className={cn(
                        "block w-[64px] h-[48px] rounded-md overflow-hidden border",
                        dark ? "border-[#f2f2f2]/15" : "border-[#0a0a0a]/12",
                      )}
                    >
                      <PreviewVisual r={r} />
                    </span>
                    <span
                      className={cn(
                        "font-mono text-[9px] uppercase tracking-label",
                        dark ? "text-[#f2f2f2]/50" : "text-[#0a0a0a]/50",
                      )}
                    >
                      {r.kategorieLabel} · {r.jahr}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* cursor-follower · fixed, lerped, decorative */}
      {followerOn && (
        <div
          ref={followerRef}
          aria-hidden
          className="fixed left-0 top-0 z-[50] pointer-events-none will-change-transform"
          style={{ transform: "translate(-9999px, -9999px)" }}
        >
          <div
            className={cn(
              "w-[300px] lg:w-[340px] aspect-[4/3] rounded-xl overflow-hidden",
              "shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]",
              "transition-[opacity,scale] duration-300 ease-out origin-center",
              active ? "opacity-100 scale-100" : "opacity-0 scale-90",
            )}
          >
            {active && <PreviewVisual r={active} />}
            {active && (
              <span className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-label px-2.5 py-1 rounded-full bg-[#0a0a0a]/80 text-[#e1fd52]">
                {t.cta} →
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
