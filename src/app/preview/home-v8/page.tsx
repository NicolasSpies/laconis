"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LetterShuffle } from "@/components/shared/LetterShuffle";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { referenzen } from "@/data/referenzen";

/**
 * /preview/home-v8 · portfolio-mode hero MIT echter arbeit rechts.
 *
 * left: anagram-morph "nicolas." → "lacønis." + statement + soft CTA + marginalia
 * right: peek auf jüngste case-study (heroImage + tiny meta) · klickbar
 *
 * argument: portfolio sollte das WAS direkt zeigen, nicht nur das WER.
 * der besucher in der ersten sekunde: "okay, der zeigt arbeit, nicht nur worte."
 */

type Dict = {
  greet: string;
  initial: string;
  reveal: string;
  statement: { prefix: string; marker: string; suffix: string };
  marginalia: string;
  cta: string;
  caseLabel: string;
  caseCta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    greet: "hi, ich bin",
    initial: "nicolas.",
    reveal: "lacønis.",
    statement: {
      prefix: "ich bau websites mit ruhe, mit kopf, von ",
      marker: "hand",
      suffix: ".",
    },
    marginalia: "~ gleiche buchstaben, andere rolle.",
    cta: "→ aktuelle arbeit",
    caseLabel: "jüngst",
    caseCta: "case ansehen →",
  },
  fr: {
    greet: "salut, je suis",
    initial: "nicolas.",
    reveal: "lacønis.",
    statement: {
      prefix: "je fais des sites avec calme, avec tête, à la ",
      marker: "main",
      suffix: ".",
    },
    marginalia: "~ mêmes lettres, autre rôle.",
    cta: "→ voir les projets",
    caseLabel: "récent",
    caseCta: "voir le case →",
  },
  en: {
    greet: "hi, i'm",
    initial: "nicolas.",
    reveal: "lacønis.",
    statement: {
      prefix: "i build websites with calm, with thought, by ",
      marker: "hand",
      suffix: ".",
    },
    marginalia: "~ same letters, different role.",
    cta: "→ recent work",
    caseLabel: "latest",
    caseCta: "see case →",
  },
};

const MARKER_PATH = "M12 42 C 82 30, 160 52, 232 36 C 264 28, 284 44, 292 40";

export default function Page() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduced = useReducedMotion();
  const pathInit = reduced ? 1 : 0;

  // latest case · first real project mit heroImage
  const latestCase = referenzen.find((r) => r.istEcht && r.heroImage) ?? referenzen[0];

  return (
    <section
      className="relative min-h-[100svh] flex items-center"
      style={{ background: "#c8c8c8" }}
    >
      {/* faint dot-grid · texture nur, kein noise */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(10,10,10,0.18) 0.8px, transparent 1.4px)",
          backgroundSize: "32px 32px",
          opacity: 0.45,
          maskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
        }}
      />

      <div className="container-site relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-8 md:gap-16 items-center">
          {/* LEFT · identity + statement */}
          <div>
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
              className="text-[clamp(3.5rem,8.5vw,8rem)] leading-[0.92] tracking-[-0.04em] font-black text-[#0a0a0a]"
            >
              <LetterShuffle initial={t.initial} reveal={t.reveal} delay={1500} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-[560px] text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.35] text-[#0a0a0a] font-medium"
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
                      pathLength: { duration: 0.6, delay: 1.0, ease: [0.65, 0, 0.35, 1] },
                      opacity: { duration: 0.2, delay: 1.0 },
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
              className="mt-10"
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
              transition={{ duration: 0.7, delay: 1.6 }}
              className="mt-14 inline-block"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                color: "#b084d3",
                fontSize: "17px",
                transform: "rotate(-1.5deg)",
              }}
            >
              {t.marginalia}
            </motion.div>
          </div>

          {/* RIGHT · jüngste case-study peek · die WORK ist die rechte seite */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden md:block"
          >
            <Link
              href={`${buildPath("referenzen", locale)}/${latestCase.slug}`}
              className="group block relative aspect-[4/5] rounded-lg overflow-hidden no-underline"
            >
              {latestCase.heroImage ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[800ms] ease-out group-hover:scale-[1.04]"
                  style={{ backgroundImage: `url("${latestCase.heroImage}")` }}
                />
              ) : (
                <div
                  className="absolute inset-0 grid place-items-center"
                  style={{ background: latestCase.farbe }}
                >
                  <span className="text-[#f2f2f2] font-black text-7xl">
                    {latestCase.monogram ?? latestCase.name[0]}
                  </span>
                </div>
              )}
              {/* gradient overlay für caption-lesbarkeit */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

              {/* corner label · klein, top-left */}
              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e1fd52] bg-[#0a0a0a]/65 px-2 py-1 rounded-sm">
                {t.caseLabel}
              </div>

              {/* bottom caption */}
              <div className="absolute bottom-5 left-5 right-5 text-[#f2f2f2]">
                <div className="font-mono text-[10px] uppercase tracking-label opacity-70">
                  {latestCase.kategorieLabel} · {latestCase.jahr} · {latestCase.ort}
                </div>
                <div className="mt-1 text-[clamp(1.4rem,2.4vw,2.2rem)] font-black tracking-[-0.025em] leading-[1]">
                  {latestCase.name.toLowerCase()}.
                </div>
                <div className="mt-3 font-mono text-[10px] uppercase tracking-label opacity-65 group-hover:opacity-95 transition-opacity">
                  {t.caseCta}
                </div>
              </div>

              {/* lila ring on hover · accent */}
              <div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-[#b084d3] transition-all duration-300 pointer-events-none rounded-lg" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
