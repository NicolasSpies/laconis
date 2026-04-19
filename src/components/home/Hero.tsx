"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const CYCLE_WORDS = [
  "Seele.",
  "Charakter.",
  "Stimme.",
  "Haltung.",
] as const;

const LONGEST_WORD = CYCLE_WORDS.reduce((a, b) =>
  a.length >= b.length ? a : b,
);

function TypewriterCycle() {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState<string>(CYCLE_WORDS[0]);
  const [phase, setPhase] = useState<"hold" | "deleting" | "typing">("hold");

  useEffect(() => {
    if (phase === "hold") {
      const t = setTimeout(() => setPhase("deleting"), 2600);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (display.length === 0) {
        setIndex((i) => (i + 1) % CYCLE_WORDS.length);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setDisplay((d) => d.slice(0, -1)), 45);
      return () => clearTimeout(t);
    }
    const target = CYCLE_WORDS[index];
    if (display.length === target.length) {
      setPhase("hold");
      return;
    }
    const t = setTimeout(
      () => setDisplay(target.slice(0, display.length + 1)),
      75,
    );
    return () => clearTimeout(t);
  }, [phase, display, index]);

  return (
    <span className="relative inline-grid text-accent-ink whitespace-nowrap align-baseline">
      <span
        aria-hidden
        className="invisible col-start-1 row-start-1"
      >
        {LONGEST_WORD}
      </span>
      <span className="col-start-1 row-start-1 justify-self-start">
        {display}
        <span
          aria-hidden
          className="inline-block align-middle ml-[0.04em] w-[0.08em] h-[0.72em] -translate-y-[0.04em] bg-lime animate-pulse"
        />
      </span>
    </span>
  );
}

const MARKER_PATH =
  "M6 11 C 42 2, 95 14, 160 6 C 218 0, 272 10, 296 14 C 299 22, 298 48, 296 66 C 268 76, 200 73, 138 70 C 80 66, 28 72, 4 66 C 0 44, 2 24, 6 11 Z";
const MARKER_MASK = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 80' preserveAspectRatio='none'><path d='${MARKER_PATH}' fill='black'/></svg>`,
)}")`;

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center">
      <div
        aria-hidden
        className="absolute inset-0 grid-bg pointer-events-none -z-10"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />
      <div className="container-site relative pt-28 pb-20 md:pt-32 md:pb-28 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-[960px]"
        >
          <motion.div variants={item} className="flex items-center gap-3 mb-10">
            <span className="inline-block w-2 h-2 rounded-full bg-lime animate-pulse" />
            <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/60">
              lakonisch /la·ko·nisch/ • knapp gesagt, viel gemeint
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="heading-display text-[clamp(3rem,10vw,8.5rem)] text-offwhite tracking-[-0.035em]"
          >
            <span className="relative inline-block isolate">
              <motion.span
                aria-hidden
                animate={{
                  opacity: [0.45, 0.8, 0.45],
                  scale: [0.92, 1.08, 0.92],
                  x: [0, 14, 0],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-x-20 md:-inset-x-28 -inset-y-12 md:-inset-y-16 rounded-full bg-lime/[0.18] blur-[90px] -z-10 will-change-transform"
              />
              <motion.svg
                aria-hidden
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{
                  opacity: { duration: 0.3, delay: 0.9 },
                  scaleX: { duration: 1.3, delay: 0.9, ease: [0.65, 0, 0.35, 1] },
                }}
                style={{ transformOrigin: "left center" }}
                className="absolute -left-[4%] -right-[4%] -top-[14%] -bottom-[10%] w-[108%] h-[124%] -z-[5] pointer-events-none"
              >
                <path d={MARKER_PATH} fill="#E1FD52" />
              </motion.svg>
              <span className="relative">Design</span>
              <motion.span
                aria-hidden
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1.3, delay: 0.9, ease: [0.65, 0, 0.35, 1] }}
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
                Design
              </motion.span>
            </span>
            <br />
            mit Meinung.
            <br />
            <span className="relative inline-block">
              Web mit <TypewriterCycle />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-10 max-w-[560px] text-[15px] md:text-[17px] leading-relaxed text-offwhite/60"
          >
            Deine Website sollte für dich arbeiten • nicht nur gut aussehen.
            Keine 0815-Websites • Identitäten, die bleiben.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <Button href="/kontakt#projekt" size="lg">
              projekt starten →
            </Button>
            <Button href="/referenzen" size="lg" variant="glass">
              referenzen ansehen
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll cue — vertically aligned to heading, right edge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="absolute top-1/2 -translate-y-1/2 right-6 md:right-10"
        >
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
            }
            aria-label="weiter scrollen"
            className="text-offwhite/30 hover:text-offwhite/80 transition-colors"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="block text-[20px] leading-none"
            >
              ↓
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
