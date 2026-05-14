"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * /preview/home-v7 · STILLE variante zum vergleich mit v6.
 *
 * KEINE anagram-morph. just identity-statement statisch.
 * gleiche typografie, gleiche farben, gleiche marginalia.
 * vergleich: ist der anagram-effekt wirklich der move, oder
 * ist still+confident die stärkere haltung?
 */

type Dict = {
  greet: string;
  name: string;
  statement: { prefix: string; marker: string; suffix: string };
  marginalia: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    greet: "hi, ich bin",
    name: "lacønis.",
    statement: {
      prefix: "ich bau websites mit ruhe, mit kopf, von ",
      marker: "hand",
      suffix: ".",
    },
    marginalia: "~ aka nicolas, falls du dich fragst.",
    cta: "→ aktuelle arbeit",
  },
  fr: {
    greet: "salut, je suis",
    name: "lacønis.",
    statement: {
      prefix: "je fais des sites avec calme, avec tête, à la ",
      marker: "main",
      suffix: ".",
    },
    marginalia: "~ aka nicolas, au cas où.",
    cta: "→ voir les projets",
  },
  en: {
    greet: "hi, i'm",
    name: "lacønis.",
    statement: {
      prefix: "i build websites with calm, with thought, by ",
      marker: "hand",
      suffix: ".",
    },
    marginalia: "~ aka nicolas, in case you wondered.",
    cta: "→ recent work",
  },
};

const MARKER_PATH = "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";

export default function Page() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduced = useReducedMotion();
  const pathFinal = 1;
  const pathInit = reduced ? 1 : 0;

  return (
    <section
      className="relative min-h-[100svh] flex items-center"
      style={{ background: "#c8c8c8" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(10,10,10,0.18) 0.8px, transparent 1.4px)",
          backgroundSize: "32px 32px",
          opacity: 0.5,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />

      <div className="container-site relative w-full">
        <div className="max-w-[1100px]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-[12px] uppercase tracking-[0.18em] text-[#0a0a0a]/55 mb-4"
          >
            {t.greet}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(3.5rem,11vw,11rem)] leading-[0.92] tracking-[-0.04em] font-black text-[#0a0a0a]"
          >
            {t.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-[640px] text-[clamp(1.1rem,2.2vw,1.6rem)] leading-[1.35] text-[#0a0a0a] font-medium"
          >
            {t.statement.prefix}
            <span className="relative inline-block isolate">
              <svg
                aria-hidden
                viewBox="0 0 300 80"
                preserveAspectRatio="none"
                className="absolute -left-[6%] -right-[6%] -top-[10%] -bottom-[6%] w-[112%] h-[120%] -z-[5] pointer-events-none overflow-visible"
              >
                <motion.path
                  d={MARKER_PATH}
                  stroke="#e1fd52"
                  strokeWidth={48}
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: pathInit, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.6, delay: 0.9, ease: [0.65, 0, 0.35, 1] },
                    opacity: { duration: 0.2, delay: 0.9 },
                  }}
                />
              </svg>
              <span className="relative">{t.statement.marker}</span>
            </span>
            {t.statement.suffix}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12"
          >
            <Link
              href={buildPath("referenzen", locale)}
              className="inline-flex items-center gap-2 text-[15px] font-medium text-[#0a0a0a]/85 hover:text-[#0a0a0a] underline decoration-[#0a0a0a]/25 hover:decoration-[#0a0a0a] underline-offset-[6px] decoration-[1.5px] transition-colors"
            >
              {t.cta}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-16 inline-block"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              color: "#b084d3",
              fontSize: "18px",
              transform: "rotate(-1.5deg)",
            }}
          >
            {t.marginalia}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
