"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * Hero · clean left-aligned · sitzt über den globalen DriftingBlobs.
 *
 *   - text 3-zeilig · lime marker auf "design" · lila scribbles unter accent
 *   - keine eigenen blobs · die kommen global aus layout.tsx (DriftingBlobs)
 *   - pure DM Sans · kein italic serif
 *   - 1 primary magnetic CTA
 *
 * lila #b084d3 + lime #e1fd52 leben in den globalen blobs + scribbles/marker.
 */

type Dict = {
  line1: string;
  line2: string;
  line3prefix: string;
  line3accent: string;
  sub: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    line1: "design",
    line2: "mit meinung.",
    line3prefix: "web mit ",
    line3accent: "seele.",
    sub: "für leute, die ihre marke ernst nehmen.",
    cta: "projekt starten →",
  },
  fr: {
    line1: "design",
    line2: "avec opinion.",
    line3prefix: "web avec ",
    line3accent: "âme.",
    sub: "pour ceux qui prennent leur marque au sérieux.",
    cta: "démarrer un projet →",
  },
  en: {
    line1: "design",
    line2: "with opinion.",
    line3prefix: "web with ",
    line3accent: "soul.",
    sub: "for people who take their brand seriously.",
    cta: "start a project →",
  },
};

/* marker-stroke pfad · single hand-stroke über "design" (lime) */
const MARKER_PATH = "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";
const MARKER_STROKE_WIDTH = 58;
const MARKER_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'><path d='${MARKER_PATH}' stroke='black' stroke-width='${MARKER_STROKE_WIDTH}' stroke-linecap='round' fill='none'/></svg>`,
)}")`;

export function Hero() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduceMotion = useReducedMotion();
  const pathFinal = 1;
  const pathInit = reduceMotion ? 1 : 0;
  const opInit = reduceMotion ? 1 : 0;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* atmospheric grid · subtle texture · fadet aus */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg pointer-events-none -z-[5]"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
        }}
      />

      <div className="container-site w-full relative z-10">
        <div className="max-w-[1100px]">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3rem,10vw,10rem)] leading-[0.92] tracking-[-0.035em] font-black text-offwhite"
          >
            {/* zeile 1 · lime marker-stroke auf "design" */}
            <span className="block whitespace-nowrap">
              <span className="relative inline-block isolate">
                <svg
                  aria-hidden
                  viewBox="0 0 300 80"
                  preserveAspectRatio="none"
                  className="absolute -left-[4%] -right-[4%] -top-[14%] -bottom-[10%] w-[108%] h-[124%] -z-[5] pointer-events-none overflow-visible"
                >
                  <motion.path
                    d={MARKER_PATH}
                    stroke="rgb(var(--accent))"
                    strokeWidth={MARKER_STROKE_WIDTH}
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: pathInit, opacity: opInit }}
                    animate={{ pathLength: pathFinal, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.7, delay: 0.4, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 0.4 },
                    }}
                  />
                </svg>
                <span className="relative">{t.line1}</span>
                {/* mask-cutout · dunkler text durch den stroke */}
                <motion.span
                  aria-hidden
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.7, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
                  className="absolute inset-0 pointer-events-none select-none text-[#0a0a0a]"
                  style={{
                    maskImage: MARKER_MASK,
                    WebkitMaskImage: MARKER_MASK,
                    maskSize: "108% 124%",
                    WebkitMaskSize: "108% 124%",
                    maskPosition: "50% 58.33%",
                    WebkitMaskPosition: "50% 58.33%",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                >
                  {t.line1}
                </motion.span>
              </span>
            </span>

            {/* zeile 2 */}
            <span className="block whitespace-nowrap">{t.line2}</span>

            {/* zeile 3 · accent + lila scribbles · pure DM Sans */}
            <span className="block whitespace-nowrap">
              {t.line3prefix}
              <span className="relative inline-block">
                <span>{t.line3accent}</span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 30"
                  preserveAspectRatio="none"
                  className="absolute left-[-2%] right-[-2%] -bottom-[0.08em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
                >
                  <motion.path
                    d="M6 10 C 46 3, 112 15, 194 7"
                    stroke="#b084d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: pathInit, opacity: opInit }}
                    animate={{ pathLength: pathFinal, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.45, delay: 0.95, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 0.95 },
                    }}
                  />
                  <motion.path
                    d="M18 23 C 64 17, 128 26, 180 21"
                    stroke="#b084d3"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: pathInit, opacity: opInit }}
                    animate={{ pathLength: pathFinal, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 0.4, delay: 1.2, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 1.2 },
                    }}
                  />
                </svg>
              </span>
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-[520px] text-[16px] md:text-[18px] leading-relaxed text-offwhite/75 lowercase"
          >
            {t.sub}
          </motion.p>

          {/* primary CTA · magnetic */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.7 }}
            className="mt-10"
          >
            <MagneticButton>
              <Button
                href={`${buildPath("kontakt", locale)}#projekt`}
                size="md"
                analyticsLabel="home_hero_kontakt"
              >
                {t.cta}
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
