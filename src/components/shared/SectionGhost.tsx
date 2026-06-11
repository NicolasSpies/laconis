"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * SectionGhost · riesiges outline-wort als layout-element (phase 4b).
 *
 * der "künstlerische part": ein section-ankündigungs-wort in outline-typo,
 * bewusst am rand ANGESCHNITTEN (läuft aus dem viewport), mit leichtem
 * scroll-parallax · typo als bild statt brave section-labels.
 *
 *   <SectionGhost word="ablauf" side="left" />
 *
 * - kein platz im layout-fluss (height 0 + overflow visible) · legt sich
 *   über den section-anfang ohne content zu verschieben
 * - aria-hidden · rein dekorativ, screenreader kriegen die echten labels
 * - outline via -webkit-text-stroke · fill transparent
 * - reduced-motion: statisch, kein parallax
 */
export function SectionGhost({
  word,
  side = "left",
  /** stroke-farbe · default ink-zart · auf dark sections offwhite-zart */
  tone = "ink",
  className,
}: {
  word: string;
  side?: "left" | "right";
  tone?: "ink" | "offwhite" | "lila";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* gegenläufiger drift · das wort schiebt sich langsam quer beim scrollen */
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    side === "left" ? [-30, 30] : [30, -30],
  );

  const strokeColor =
    tone === "offwhite"
      ? "rgba(242,242,242,0.13)"
      : tone === "lila"
        ? "rgba(176,132,211,0.28)"
        : "rgba(10,10,10,0.13)";

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("relative h-0 overflow-visible pointer-events-none select-none", className)}
    >
      <motion.span
        style={{
          x: reduce ? 0 : x,
          WebkitTextStroke: `1.5px ${strokeColor}`,
        }}
        className={cn(
          "absolute font-display font-black lowercase leading-none whitespace-nowrap text-transparent",
          "text-[clamp(90px,16vw,220px)] tracking-[-0.04em]",
          "-top-[0.55em]",
          side === "left" ? "-left-[0.35em]" : "-right-[0.35em]",
        )}
      >
        {word}
      </motion.span>
    </div>
  );
}
