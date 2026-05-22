"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { CASE_CLAIMS } from "@/data/case-claims";
import type { Locale } from "@/i18n/config";

/**
 * CaseClaim · großer literarischer 1-zeiler oben auf jeder case-detail-page.
 *
 * micro-anims:
 *   - wörter staggered fade-in von unten (word-by-word reveal)
 *   - subtle lila scribble-underline draws in after der claim drin ist
 *   - reduced-motion: instant, kein stagger, kein draw
 *
 * keine sub-headline · der claim soll allein stehen. groß. ehrlich.
 */
export function CaseClaim({
  slug,
  locale,
}: {
  slug: string;
  locale: Locale;
}) {
  const reduce = useReducedMotion();
  const claim = CASE_CLAIMS[slug]?.[locale];

  /* split in wörter für stagger · "·" als separator-token markieren */
  const tokens = useMemo(() => {
    if (!claim) return [] as Array<{ text: string; isSep: boolean }>;
    return claim
      .split(/(\s+)/)
      .filter((t) => t.length > 0)
      .map((t) => ({
        text: t,
        isSep: /^\s*·\s*$/.test(t) || t.trim() === "·",
      }));
  }, [claim]);

  if (!claim) return null;

  const wordInit = reduce ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 };
  const wordTo = { y: 0, opacity: 1 };
  const lineInit = reduce ? { pathLength: 1, opacity: 0.6 } : { pathLength: 0, opacity: 0 };
  const lineTo = { pathLength: 1, opacity: 0.7 };

  return (
    <div className="container-site mt-12 md:mt-16 mb-2">
      <div className="relative max-w-[920px]">
        <h2
          aria-label={claim}
          className="font-sans font-black lowercase leading-[0.98] tracking-[-0.04em] text-[#0a0a0a]"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
        >
          {tokens.map((tok, i) => {
            if (/^\s+$/.test(tok.text)) {
              return <span key={i}>{tok.text}</span>;
            }
            return (
              <motion.span
                key={i}
                initial={wordInit}
                whileInView={wordTo}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.65,
                  delay: 0.08 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={
                  tok.isSep ? "inline-block text-[#b084d3]" : "inline-block"
                }
              >
                {tok.text}
              </motion.span>
            );
          })}
        </h2>

        {/* lila scribble underline · draws in nachdem die wörter drin sind */}
        <svg
          aria-hidden
          viewBox="0 0 800 18"
          preserveAspectRatio="none"
          className="absolute -bottom-2 left-0 w-[min(640px,90%)] h-[14px] pointer-events-none overflow-visible"
        >
          <motion.path
            d="M10 9 C 120 4, 320 14, 540 7 C 640 4, 720 12, 790 8"
            stroke="#b084d3"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={lineInit}
            whileInView={lineTo}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{
              pathLength: { duration: 1.1, delay: 0.5, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.4, delay: 0.5 },
            }}
          />
        </svg>
      </div>
    </div>
  );
}
