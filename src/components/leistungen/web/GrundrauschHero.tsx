"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const COLS = 4;
const ROWS = 3;
const TOTAL = COLS * ROWS;
const HERO_IDX = 5; // 0-indexed: row 1, col 1 (= 2. zeile, 2. spalte im 4×3)

type Phase = "hidden" | "noise" | "breakout";

/**
 * Ghost-cards: "das grundrauschen" · generische websites, erkennbar als nav/bild/headline/body/button
 * · noise: 0.55 · breakout: runter auf 0.2 (so wird der kontrast zur hero sichtbar)
 */
const ghostVariants: Variants = {
  hidden: { opacity: 0 },
  noise: { opacity: 0.55, transition: { duration: 0.6, ease: "easeOut" } },
  breakout: { opacity: 0.2, transition: { duration: 0.9, ease: "easeOut" } },
};

// Hero-geometry per phase · animated via CSS transitions (framer-motion struggles
// with %-based left/top/width/height when the parent resizes mid-animation).
const HERO_GEOM: Record<Phase, { left: string; top: string; width: string; height: string }> = {
  hidden: { left: "25%", top: "33.333%", width: "25%", height: "33.333%" },
  noise: { left: "25%", top: "33.333%", width: "25%", height: "33.333%" },
  // landscape ~16:10, leicht links-versetzt damit text-kolumne & glow gut sitzen
  breakout: { left: "22%", top: "26.5%", width: "56%", height: "47%" },
};

const HERO_OPACITY: Record<Phase, number> = {
  hidden: 0,
  noise: 0.55,
  breakout: 1,
};

/** Ghost · generisches website-template, grayscale, absichtlich boring */
function GhostCard() {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-offwhite/[0.12]">
        <div className="h-[4px] w-5 rounded-[1px] bg-offwhite/[0.22]" />
        <div className="flex gap-[3px]">
          <div className="h-[2px] w-2 rounded-full bg-offwhite/[0.18]" />
          <div className="h-[2px] w-2 rounded-full bg-offwhite/[0.18]" />
          <div className="h-[2px] w-2 rounded-full bg-offwhite/[0.18]" />
        </div>
      </div>
      <div
        className="mx-2 mt-1.5 rounded-[1px] bg-offwhite/[0.10]"
        style={{ height: "34%" }}
      />
      <div className="mx-2 mt-1.5 space-y-[3px]">
        <div className="h-[4px] w-4/5 rounded-[1px] bg-offwhite/[0.18]" />
        <div className="h-[4px] w-3/5 rounded-[1px] bg-offwhite/[0.18]" />
      </div>
      <div className="mx-2 mt-1.5 space-y-[2px]">
        <div className="h-[1.5px] w-full rounded-full bg-offwhite/[0.10]" />
        <div className="h-[1.5px] w-5/6 rounded-full bg-offwhite/[0.10]" />
        <div className="h-[1.5px] w-2/3 rounded-full bg-offwhite/[0.10]" />
      </div>
      <div className="mx-2 mt-auto mb-2">
        <div className="h-[7px] w-12 rounded-[1px] bg-offwhite/[0.18]" />
      </div>
    </div>
  );
}

/**
 * Hero-Card · editorial split-layout.
 * Alle sizes in cqw (container query width) · scaled automatisch mit der hero-breite,
 * egal ob noise-phase (klein) oder breakout (groß). Neutraler brand-mark, keine fake-location.
 */
function HeroCard() {
  return (
    <div className="absolute inset-0 flex bg-[#0e0e0e] overflow-hidden">
      {/* LEFT · editorial composition */}
      <div
        className="relative h-full"
        style={{ flexBasis: "55%", flexShrink: 0 }}
      >
        {/* warmer layered gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a0f08 0%, #4a2d18 22%, #96623a 48%, #d9a56b 74%, rgb(225 253 82 / 0.55) 100%)",
          }}
        />
        {/* soft reflections */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 75%, rgba(255,255,255,0.22) 0%, transparent 35%), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.18) 0%, transparent 30%)",
          }}
        />
        {/* big italic serif initial · typografie als bild */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <span
            className="font-serif italic text-offwhite leading-none"
            style={{
              fontSize: "18cqw",
              textShadow: "0 2px 24px rgba(0,0,0,0.4)",
              opacity: 0.92,
            }}
          >
            H.
          </span>
        </div>
        {/* reflex-punkt */}
        <div
          className="absolute rounded-full bg-white/90"
          style={{ top: "6%", right: "8%", width: "1.6cqw", height: "1.6cqw" }}
        />
      </div>

      {/* RIGHT · content */}
      <div
        className="flex-1 flex flex-col min-w-0"
        style={{ padding: "2.8cqw" }}
      >
        {/* nav */}
        <div className="flex items-center justify-between">
          <div className="flex items-center" style={{ gap: "1cqw" }}>
            <div
              className="rounded-full bg-lime"
              style={{ width: "1.4cqw", height: "1.4cqw" }}
            />
            <span
              className="font-serif italic text-offwhite/95 leading-none"
              style={{ fontSize: "2.2cqw" }}
            >
              atelier
            </span>
          </div>
          <div className="flex" style={{ gap: "0.6cqw" }}>
            <div
              className="rounded-full bg-offwhite/50"
              style={{ height: "0.4cqw", width: "1.6cqw" }}
            />
            <div
              className="rounded-full bg-offwhite/50"
              style={{ height: "0.4cqw", width: "1.6cqw" }}
            />
            <div
              className="rounded-full bg-offwhite/50"
              style={{ height: "0.4cqw", width: "1.6cqw" }}
            />
          </div>
        </div>

        {/* content-block · nach unten ausgerichtet */}
        <div style={{ marginTop: "auto" }}>
          <p
            className="font-mono uppercase tracking-label text-lime leading-none"
            style={{ fontSize: "1.2cqw", marginBottom: "1cqw" }}
          >
            studio · №02
          </p>
          <p
            className="font-serif italic text-offwhite leading-[0.98]"
            style={{ fontSize: "4.2cqw", marginBottom: "1.8cqw" }}
          >
            handgemacht.
            <br />
            <span className="text-offwhite/70">nicht gerendert.</span>
          </p>
          <p
            className="text-offwhite/55 leading-snug"
            style={{ fontSize: "1.4cqw", marginBottom: "2cqw" }}
          >
            kein theme · keine schablone · jede linie sitzt wo sie soll.
          </p>
          <div className="flex items-center" style={{ gap: "1.2cqw" }}>
            <div
              className="bg-lime"
              style={{ width: "4cqw", height: "0.5cqw" }}
            />
            <span
              className="font-mono uppercase tracking-label text-lime leading-none"
              style={{ fontSize: "1.2cqw" }}
            >
              weiterlesen →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GrundrauschHero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setPhase("breakout");
      return;
    }
    setPhase("noise");
    // 1400ms = 600ms fade-in + 800ms lesen-der-noise · dann breakout
    const tid = setTimeout(() => setPhase("breakout"), 1400);
    return () => clearTimeout(tid);
  }, [inView, reduced]);

  return (
    <div ref={ref} aria-hidden className="relative w-full select-none">
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* ambient lime-glow · expands mit hero */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase === "hidden" ? 0 : 1,
            left: phase === "breakout" ? "8%" : "17%",
            top: phase === "breakout" ? "15%" : "27%",
            width: phase === "breakout" ? "84%" : "50%",
            height: phase === "breakout" ? "70%" : "45%",
          }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "radial-gradient(ellipse at center, rgb(225 253 82 / 0.16), transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* ghost grid · hero-slot bleibt leer (hero ist absolute overlay) */}
        <div
          className="absolute inset-0 grid gap-1.5"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            if (i === HERO_IDX) return <div key={i} aria-hidden />;
            return (
              <motion.div
                key={i}
                variants={ghostVariants}
                initial="hidden"
                animate={phase}
                className="relative rounded-[4px] border border-offwhite/[0.12] bg-offwhite/[0.02] overflow-hidden"
              >
                <GhostCard />
              </motion.div>
            );
          })}
        </div>

        {/* hero · absolute overlay · CSS-transitions für layout (reliably animates %-values) */}
        <div
          className="absolute rounded-[4px] border border-lime/35 overflow-hidden"
          style={
            {
              zIndex: 10,
              containerType: "inline-size",
              boxShadow:
                "0 0 40px -8px rgb(225 253 82 / 0.45), 0 0 100px -24px rgb(225 253 82 / 0.28)",
              left: HERO_GEOM[phase].left,
              top: HERO_GEOM[phase].top,
              width: HERO_GEOM[phase].width,
              height: HERO_GEOM[phase].height,
              opacity: HERO_OPACITY[phase],
              transition:
                "left 1.1s cubic-bezier(0.22,1,0.36,1), top 1.1s cubic-bezier(0.22,1,0.36,1), width 1.1s cubic-bezier(0.22,1,0.36,1), height 1.1s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease-out",
            } as React.CSSProperties
          }
        >
          <HeroCard />
        </div>
      </div>
    </div>
  );
}
