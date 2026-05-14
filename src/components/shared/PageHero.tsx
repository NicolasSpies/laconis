"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * PageHero · grey-bg hero im stil der homepage.
 *
 * pattern:
 *   - bg #c8c8c8 (silver-grey, matches home hero) damit cursor-morph schön drauf glüht
 *   - big lowercase headline links · italic-serif für accent-word
 *   - subtitle drunter · max 520px
 *   - optionale lila scribbles unter italic
 *   - optional kicker (mono uppercase) drüber
 *   - optional right-side visual slot (svg, demo, illustration)
 *
 * usage:
 *   <PageHero
 *     kicker="· leistungen"
 *     line1="was ich"
 *     line2={<>mache<em>.</em></>}
 *     italicAccent="liebsten" // optional lila-scribble unter
 *     sub="zwei disziplinen · ein tisch"
 *     visual={<svg />}        // optional right side
 *   />
 */

type Props = {
  kicker?: string;
  /** zeile 1 · headline-text */
  line1: ReactNode;
  /** zeile 2 · optional, headline-fortsetzung */
  line2?: ReactNode;
  /** italic-serif wort am ende (mit lila scribble) */
  italicAccent?: string;
  sub?: ReactNode;
  /** rechtes side-visual · desktop-only */
  visual?: ReactNode;
  /** mehr padding-top falls hero im funnel weiter unten sitzt */
  paddedTop?: boolean;
  children?: ReactNode;
};

export function PageHero({
  kicker,
  line1,
  line2,
  italicAccent,
  sub,
  visual,
  paddedTop = false,
  children,
}: Props) {
  return (
    <section
      className={`relative ${paddedTop ? "pt-36 md:pt-44" : "pt-32 md:pt-36"} pb-20 md:pb-28 text-[#0a0a0a] overflow-hidden`}
    >
      {/* atmospheric dot-grid – gleicher tone wie homepage SplitStatement */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.10] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-site relative">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] gap-10 items-center">
          <div>
            {kicker && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/55 mb-6"
              >
                {kicker}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2.6rem,9vw,8rem)] leading-[0.92] tracking-[-0.04em] font-black text-[#0a0a0a]"
              style={{ textTransform: "lowercase" }}
            >
              <span className="block">{line1}</span>
              {line2 && <span className="block">{line2}</span>}
              {italicAccent && (
                <span className="block">
                  <span className="relative inline-block">
                    <span
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontStyle: "italic",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {italicAccent}
                    </span>
                    <motion.svg
                      aria-hidden
                      viewBox="0 0 200 30"
                      preserveAspectRatio="none"
                      className="absolute left-[-2%] right-[-2%] -bottom-[0.18em] w-[104%] h-[0.32em] pointer-events-none overflow-visible"
                    >
                      <motion.path
                        d="M6 10 C 46 3, 112 15, 194 7"
                        stroke="#b084d3"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            duration: 0.45,
                            delay: 0.95,
                            ease: [0.65, 0, 0.35, 1],
                          },
                          opacity: { duration: 0.2, delay: 0.95 },
                        }}
                      />
                      <motion.path
                        d="M18 23 C 64 17, 128 26, 180 21"
                        stroke="#b084d3"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{
                          pathLength: {
                            duration: 0.4,
                            delay: 1.2,
                            ease: [0.65, 0, 0.35, 1],
                          },
                          opacity: { duration: 0.2, delay: 1.2 },
                        }}
                      />
                    </motion.svg>
                  </span>
                </span>
              )}
            </motion.h1>

            {sub && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 md:mt-10 max-w-[560px] text-[15px] md:text-[17px] leading-relaxed text-[#0a0a0a]/75"
              >
                {sub}
              </motion.div>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-10"
              >
                {children}
              </motion.div>
            )}
          </div>

          {visual && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="hidden md:flex items-center justify-center pointer-events-none select-none"
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * default visual · gleicher SVG-pattern wie home Hero · soft rings.
 * kann pro page mit custom-prop überschrieben werden.
 */
export function HeroRings() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-[320px] h-[320px] lg:w-[400px] lg:h-[400px]"
      aria-hidden
    >
      <circle
        cx="200"
        cy="200"
        r="170"
        stroke="#b084d3"
        strokeWidth="1"
        fill="none"
        opacity="0.22"
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        stroke="#0a0a0a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.18"
        strokeDasharray="6 10"
      />
      <circle
        cx="200"
        cy="200"
        r="72"
        stroke="#b084d3"
        strokeWidth="0.6"
        fill="none"
        opacity="0.25"
        strokeDasharray="3 7"
      />
      <line x1="200" y1="148" x2="200" y2="168" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.4" />
      <line x1="200" y1="232" x2="200" y2="252" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.4" />
      <line x1="148" y1="200" x2="168" y2="200" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.4" />
      <line x1="232" y1="200" x2="252" y2="200" stroke="#0a0a0a" strokeWidth="0.8" opacity="0.4" />
      <circle cx="200" cy="200" r="3" fill="#0a0a0a" opacity="0.55" />
      <circle cx="200" cy="30" r="2.5" fill="#b084d3" opacity="0.5" />
      <circle cx="370" cy="200" r="2.5" fill="#b084d3" opacity="0.5" />
      <circle cx="200" cy="370" r="2.5" fill="#b084d3" opacity="0.5" />
      <circle cx="30" cy="200" r="2.5" fill="#b084d3" opacity="0.5" />
    </svg>
  );
}
