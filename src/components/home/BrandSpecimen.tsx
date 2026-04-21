"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * BrandSpecimen — mini-markenprüfstand, pendant zur BrowserMock des web-cards.
 *
 * Zeigt rotierend drei fiktive marken. Pro marke:
 *   · wordmark in markentypografie (groß, zentral)
 *   · farbpalette · 4 swatches + hex
 *   · typo-probe · display + serif/mono body
 *   · visitenkarte-mockup · mit wordmark darauf, leicht gekippt
 *   · flyer-mockup · portrait, zweite rotation · wordmark, accent, serif-sample
 *
 * auto-advance alle 6 s, pausiert on hover. respektiert prefers-reduced-motion.
 */

type Brand = {
  name: string;
  fontFamily: string;
  fontWeight: number;
  letterSpacing: string;
  tagline: string;
  palette: { hex: string; label: string; dark?: boolean }[];
  paperBg: string; // vk-hintergrund
  inkColor: string; // vk-text
  accentOn: string; // highlight-farbe (für linie unter wordmark)
  serifSample: string; // typo-probe
  field: string; // branche — footer-chip
};

const BRANDS: Brand[] = [
  {
    name: "claire.",
    fontFamily:
      "'Cormorant Garamond', 'Times New Roman', Georgia, serif",
    fontWeight: 500,
    letterSpacing: "-0.015em",
    tagline: "naturkosmetik · eupen",
    palette: [
      { hex: "#E4C9B3", label: "sand" },
      { hex: "#2D3A2E", label: "pine", dark: true },
      { hex: "#F5EFE6", label: "paper" },
      { hex: "#A14A3D", label: "clay" },
    ],
    paperBg: "#F5EFE6",
    inkColor: "#2D3A2E",
    accentOn: "#A14A3D",
    serifSample: "ruhe, die man sieht.",
    field: "kosmetik",
  },
  {
    name: "nordstück",
    fontFamily:
      "'Inter', 'Helvetica Neue', Arial, sans-serif",
    fontWeight: 800,
    letterSpacing: "-0.045em",
    tagline: "tischlerei · münster",
    palette: [
      { hex: "#1E2A33", label: "slate", dark: true },
      { hex: "#E1FD52", label: "lime" },
      { hex: "#D8D2C4", label: "oak" },
      { hex: "#6E7277", label: "stone" },
    ],
    paperBg: "#1E2A33",
    inkColor: "#E1FD52",
    accentOn: "#E1FD52",
    serifSample: "ehrlich. gerade. fertig.",
    field: "handwerk",
  },
  {
    name: "aleph",
    fontFamily:
      "'JetBrains Mono', 'Menlo', 'Courier New', monospace",
    fontWeight: 500,
    letterSpacing: "-0.02em",
    tagline: "lektorat · berlin",
    palette: [
      { hex: "#0F1A3A", label: "ink", dark: true },
      { hex: "#D64545", label: "coral" },
      { hex: "#F1ECE3", label: "cream" },
      { hex: "#B8A66A", label: "brass" },
    ],
    paperBg: "#F1ECE3",
    inkColor: "#0F1A3A",
    accentOn: "#D64545",
    serifSample: "der richtige satz zuerst.",
    field: "text",
  },
];

const ROTATE_MS = 6000;

export function BrandSpecimen() {
  const [idx, advance] = useReducer((n: number) => (n + 1) % BRANDS.length, 0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (reduce || paused) return;
    timer.current = setTimeout(advance, ROTATE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [idx, paused, reduce]);

  const brand = BRANDS[idx];

  return (
    <div
      className="relative w-full h-[460px] md:h-[520px] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ambient color-wash, changes with brand */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-xl blur-[60px] pointer-events-none"
        animate={{
          background: `radial-gradient(circle at 50% 38%, ${brand.palette[0].hex}22, transparent 65%)`,
        }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      />

      {/* frame */}
      <div className="relative w-full h-full rounded-xl overflow-hidden glass flex flex-col">
        {/* top-bar · analog zur browser-bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-ink/5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-ink" />
          <span className="font-mono text-[10px] tracking-mono text-offwhite/55 lowercase">
            specimen · {brand.field}
          </span>
          <div className="ml-auto flex items-center gap-1.5">
            {BRANDS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`marke ${i + 1}`}
                onClick={() => {
                  if (timer.current) clearTimeout(timer.current);
                  // jump directly — synthetic advance
                  const steps = (i - idx + BRANDS.length) % BRANDS.length;
                  for (let s = 0; s < steps; s++) advance();
                }}
                className={[
                  "h-1 rounded-full transition-all",
                  i === idx ? "w-5 bg-accent-ink" : "w-2 bg-offwhite/20 hover:bg-offwhite/35",
                ].join(" ")}
              />
            ))}
          </div>
        </div>

        {/* main canvas */}
        <div className="relative flex-1 overflow-hidden bg-gradient-to-b from-ink/[0.02] to-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={brand.name}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -6 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="absolute inset-0 flex flex-col"
            >
              {/* wortmark · groß, in markentypo */}
              <div className="flex-[1.2] flex items-center justify-center px-6 pt-6 md:pt-8">
                <div className="text-center">
                  <div
                    className="text-offwhite leading-[0.9] transition-colors"
                    style={{
                      fontFamily: brand.fontFamily,
                      fontWeight: brand.fontWeight,
                      letterSpacing: brand.letterSpacing,
                      fontSize: "clamp(2.6rem, 7.5vw, 4.5rem)",
                    }}
                  >
                    {brand.name}
                  </div>
                  {/* understroke in brand-accent */}
                  <svg
                    viewBox="0 0 220 10"
                    preserveAspectRatio="none"
                    className="mt-3 mx-auto block h-[6px] w-[clamp(120px,16vw,180px)]"
                    aria-hidden
                  >
                    <motion.path
                      d="M4 6 C 50 2, 110 8, 164 4 S 212 7, 216 5"
                      fill="none"
                      stroke={brand.accentOn}
                      strokeWidth={1.6}
                      strokeLinecap="round"
                      initial={reduce ? undefined : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
                    />
                  </svg>
                  <div className="mt-3 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    {brand.tagline}
                  </div>
                </div>
              </div>

              {/* palette · typo · strip */}
              <div className="px-5 md:px-8 flex items-center justify-between gap-4 border-t border-ink/5 py-3 md:py-4">
                <div className="flex gap-1.5 items-center">
                  {brand.palette.map((c) => (
                    <div
                      key={c.hex}
                      className="w-5 h-5 md:w-6 md:h-6 rounded-[2px] border border-ink/15"
                      style={{ background: c.hex }}
                      title={`${c.label} · ${c.hex}`}
                    />
                  ))}
                </div>
                <div
                  className="truncate text-offwhite/75 text-[12px] md:text-[13px] italic"
                  style={{
                    fontFamily: brand.fontFamily,
                    fontWeight: brand.fontWeight === 800 ? 500 : brand.fontWeight,
                    letterSpacing: brand.letterSpacing,
                  }}
                >
                  {brand.serifSample}
                </div>
              </div>

              {/* bottom cluster · visitenkarte + flyer */}
              <div className="flex-[1] relative px-5 md:px-8 pb-6 md:pb-8">
                {/* visitenkarte · links, leicht gekippt */}
                <div
                  className="absolute left-5 md:left-8 bottom-6 md:bottom-8 rounded-[3px] shadow-[0_14px_32px_-14px_rgba(0,0,0,0.55)] flex flex-col justify-between"
                  style={{
                    width: "clamp(108px, 16vw, 142px)",
                    aspectRatio: "16 / 10",
                    background: brand.paperBg,
                    transform: "rotate(-4deg)",
                    padding: "10px 12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: "6.5px",
                      letterSpacing: "0.06em",
                      color: brand.inkColor,
                      opacity: 0.55,
                    }}
                  >
                    · visitenkarte
                  </span>
                  <div
                    style={{
                      fontFamily: brand.fontFamily,
                      fontWeight: brand.fontWeight,
                      letterSpacing: brand.letterSpacing,
                      color: brand.inkColor,
                      fontSize: "clamp(14px, 2.2vw, 20px)",
                      lineHeight: 0.95,
                    }}
                  >
                    {brand.name}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "5.5px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: brand.inkColor,
                        opacity: 0.45,
                      }}
                    >
                      kontakt
                    </span>
                    <span
                      style={{
                        width: 18,
                        height: 1,
                        background: brand.accentOn,
                        opacity: 0.75,
                      }}
                    />
                  </div>
                </div>

                {/* flyer / poster · rechts, leicht gekippt (+4°) */}
                <div
                  className="absolute right-6 md:right-10 bottom-6 md:bottom-8 shadow-[0_18px_36px_-16px_rgba(0,0,0,0.6)] flex flex-col"
                  style={{
                    width: "clamp(86px, 12.5vw, 112px)",
                    aspectRatio: "2 / 3",
                    background: brand.paperBg,
                    transform: "rotate(4deg)",
                    padding: "10px 10px 12px",
                    border: "1px solid rgba(0,0,0,0.1)",
                    borderRadius: 2,
                  }}
                  aria-hidden
                >
                  <span
                    className="font-mono uppercase"
                    style={{
                      fontSize: "6px",
                      letterSpacing: "0.08em",
                      color: brand.inkColor,
                      opacity: 0.5,
                    }}
                  >
                    · flyer a6
                  </span>

                  <div
                    className="mt-auto"
                    style={{
                      fontFamily: brand.fontFamily,
                      fontWeight: brand.fontWeight,
                      letterSpacing: brand.letterSpacing,
                      color: brand.inkColor,
                      fontSize: "clamp(13px, 2vw, 18px)",
                      lineHeight: 0.92,
                    }}
                  >
                    {brand.name}
                  </div>

                  <span
                    style={{
                      display: "block",
                      width: "52%",
                      height: 1,
                      marginTop: 6,
                      background: brand.accentOn,
                      opacity: 0.85,
                    }}
                  />

                  <div
                    className="mt-2"
                    style={{
                      fontFamily: brand.fontFamily,
                      fontWeight: brand.fontWeight === 800 ? 400 : brand.fontWeight,
                      letterSpacing: brand.letterSpacing,
                      color: brand.inkColor,
                      opacity: 0.72,
                      fontStyle: "italic",
                      fontSize: "7px",
                      lineHeight: 1.15,
                    }}
                  >
                    {brand.serifSample}
                  </div>

                  <span
                    className="mt-2"
                    style={{
                      fontFamily: "monospace",
                      fontSize: "5px",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: brand.inkColor,
                      opacity: 0.4,
                    }}
                  >
                    {brand.tagline}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

