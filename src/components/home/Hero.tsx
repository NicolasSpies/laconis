"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * Hero · clean left-aligned · drifting-blob bg system.
 *
 *   - text 3-zeilig · lime marker auf "design" · lila scribbles unter accent
 *   - hintergrund: 6 drifting blobs in 3 speed-layers (slow/mid/fast)
 *     · mouse-parallax pro layer für depth · breathing-scale
 *   - kein italic serif · pure DM Sans
 *   - 1 primary CTA · magnetic
 *
 * lila #b084d3 + lime #e1fd52 leben in den blobs + accent-strokes.
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

  // mouse-parallax for blob layers
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 50, damping: 22, mass: 0.6 });
  const layerSlow = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`,
  );
  const layerMid = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 40}px)`,
  );
  const layerFast = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 70}px, ${(y - 0.5) * 70}px)`,
  );

  return (
    <section
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      onMouseMove={(e) => {
        if (reduceMotion) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
      }}
    >
      {/* atmospheric grid fadet nach unten aus · sitzt unter den blobs */}
      <div
        aria-hidden
        className="absolute inset-0 grid-bg pointer-events-none -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 35%, rgba(0,0,0,0.4) 75%, transparent 100%)",
        }}
      />

      {/* ─── drifting blobs · 3 speed-layers, 6 blobs total ─── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-[5]">
        {/* SLOW · lime · top-left */}
        <motion.div
          style={{ transform: layerSlow }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 80, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.08, 0.96, 1] }
          }
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[8%] top-[8%] w-[55vw] h-[55vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
              opacity: 0.5,
              filter: "blur(55px)",
            }}
          />
        </motion.div>

        {/* SLOW · lila · bottom-right */}
        <motion.div
          style={{ transform: layerSlow }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -90, 40, 0], y: [0, 70, -50, 0], scale: [1, 0.95, 1.1, 1] }
          }
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[5%] bottom-[5%] w-[48vw] h-[48vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
              opacity: 0.58,
              filter: "blur(55px)",
            }}
          />
        </motion.div>

        {/* MID · lila · center-left */}
        <motion.div
          style={{ transform: layerMid }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 60, -50, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.92, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-5%] top-[40%] w-[32vw] h-[32vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
              opacity: 0.42,
              filter: "blur(40px)",
            }}
          />
        </motion.div>

        {/* MID · lime · bottom-left */}
        <motion.div
          style={{ transform: layerMid }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -50, 40, 0], y: [0, -60, 20, 0], scale: [1, 1.12, 0.95, 1] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[30%] bottom-[15%] w-[28vw] h-[28vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
              opacity: 0.4,
              filter: "blur(36px)",
            }}
          />
        </motion.div>

        {/* FAST darter · lime · top-right */}
        <motion.div
          style={{ transform: layerFast }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, -40, 60, 0], y: [0, 50, -40, 0], scale: [1, 1.3, 0.85, 1] }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[20%] top-[18%] w-[18vw] h-[18vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
              opacity: 0.55,
              filter: "blur(28px)",
            }}
          />
        </motion.div>

        {/* FAST darter · lila · center */}
        <motion.div
          style={{ transform: layerFast }}
          animate={
            reduceMotion
              ? undefined
              : { x: [0, 70, -30, 0], y: [0, -40, 60, 0], scale: [1, 0.8, 1.25, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[40%] bottom-[30%] w-[14vw] h-[14vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
              opacity: 0.5,
              filter: "blur(24px)",
            }}
          />
        </motion.div>
      </div>

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

            {/* zeile 2 · clean */}
            <span className="block whitespace-nowrap">{t.line2}</span>

            {/* zeile 3 · accent + 2 lila scribble-strokes drunter · pure DM Sans */}
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

          {/* subtitle · echtes verkaufsargument · keine listung */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 max-w-[520px] text-[16px] md:text-[18px] leading-relaxed text-offwhite/75 lowercase"
          >
            {t.sub}
          </motion.p>

          {/* ein primary CTA · magnetic */}
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
