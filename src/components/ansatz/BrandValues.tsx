"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useLocale, pick } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

/**
 * BrandValues · 4-wort-anker block für /ansatz.
 *
 * inspiration: savoirfaire's "audacieux · radical · rigoureux · pertinent" block.
 * deine variante: ruhig statt laut, kontra-positioning gegen agentur-bling.
 *
 * micro-anims:
 *   - stagger reveal von links nach rechts (each delay +0.08s)
 *   - wort kommt von y:24px + opacity:0
 *   - hover: lila underline scribble draws in (svg path)
 *   - hover: subtitle slides up + fades in
 *   - active card (klick): bleibt expanded · reset on outside click
 */

type ValueItem = {
  key: "tief" | "klar" | "ruhig" | "dein";
  label: string;
  sub: string;
  body: string;
};

type Dict = {
  kicker: string;
  headline: string;
  values: ValueItem[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· haltung",
    headline: "vier wörter · keine paragrafen.",
    values: [
      {
        key: "tief",
        label: "tief",
        sub: "lieber 2 richtungen durchdacht als 20 oberflächlich.",
        body: "ich gehe gerne tief in dein business rein, bevor ich was zeichne. wenn die richtung nicht stimmt, hilft kein schöner pixel.",
      },
      {
        key: "klar",
        label: "klar",
        sub: "kein agentur-talk, kein blackbox-gantt.",
        body: "du weißt vom ersten gespräch an, was wann passiert, was du bekommst, was es kostet · und auch was ich bewusst nicht mache.",
      },
      {
        key: "ruhig",
        label: "ruhig",
        sub: "ein projekt zur zeit · darum kommt es heil an.",
        body: "ich nehme keine 5 projekte parallel. mein kalender ist absichtlich klein. das ist deine garantie dass dein projekt nicht in einer pipeline versumpft.",
      },
      {
        key: "dein",
        label: "dein.",
        sub: "quelldateien · domain · cms · alles dir.",
        body: "kein lock-in, kein abo, kein vendor-trick. du bekommst die quelldateien, die seite läuft auf deinem hosting, jeder developer der welt kann übernehmen.",
      },
    ],
  },
  fr: {
    kicker: "· attitude",
    headline: "quatre mots · pas de paragraphes.",
    values: [
      {
        key: "tief",
        label: "profond",
        sub: "2 pistes réfléchies plutôt que 20 superficielles.",
        body: "j'aime rentrer en profondeur dans ton business avant de dessiner. si la direction n'est pas la bonne, aucun joli pixel n'aide.",
      },
      {
        key: "klar",
        label: "clair",
        sub: "pas de blabla d'agence, pas de boîte noire.",
        body: "dès la première conversation, tu sais quoi se passe quand, ce que tu obtiens, ce que ça coûte · et aussi ce que je refuse de faire.",
      },
      {
        key: "ruhig",
        label: "calme",
        sub: "un projet à la fois · c'est pour ça qu'il arrive entier.",
        body: "je ne prends pas 5 projets en parallèle. mon calendrier est volontairement petit. c'est ta garantie que ton projet ne marine pas dans un pipeline.",
      },
      {
        key: "dein",
        label: "tien.",
        sub: "sources · domaine · cms · tout à toi.",
        body: "pas de lock-in, pas d'abonnement, pas de combine. tu reçois les fichiers sources, le site tourne sur ton hébergement, n'importe quel dev peut reprendre.",
      },
    ],
  },
  en: {
    kicker: "· stance",
    headline: "four words · no paragraphs.",
    values: [
      {
        key: "tief",
        label: "deep",
        sub: "two directions thought through rather than twenty surface-level.",
        body: "i like going deep into your business before drawing anything. if the direction is off, no pretty pixel helps.",
      },
      {
        key: "klar",
        label: "clear",
        sub: "no agency talk, no blackbox gantt.",
        body: "from the first conversation, you know what happens when, what you get, what it costs · and also what i deliberately won't do.",
      },
      {
        key: "ruhig",
        label: "quiet",
        sub: "one project at a time · that's why it arrives intact.",
        body: "i don't take on 5 projects in parallel. my calendar is intentionally small. that's your guarantee your project doesn't drown in a pipeline.",
      },
      {
        key: "dein",
        label: "yours.",
        sub: "source files · domain · cms · all yours.",
        body: "no lock-in, no subscription, no vendor trick. you get the source files, the site runs on your hosting, any developer in the world can take over.",
      },
    ],
  },
};

const ACCENT_COLORS = ["#e1fd52", "#b084d3", "#e1fd52", "#b084d3"] as const;

export function BrandValues({ num }: { num?: string }) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        {/* header */}
        <div className="flex items-baseline gap-4 mb-12">
          {num && (
            <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
              {num}
            </span>
          )}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
              {t.kicker}
            </p>
            <h2 className="mt-2 text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[720px]">
              {t.headline}
            </h2>
          </div>
        </div>

        {/* values grid · 4 cards, stagger reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {t.values.map((v, i) => {
            const accent = ACCENT_COLORS[i];
            const isActive = active === v.key;
            return (
              <motion.button
                key={v.key}
                type="button"
                onClick={() => setActive((p) => (p === v.key ? null : v.key))}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.08 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={
                  reduce
                    ? undefined
                    : {
                        y: -4,
                        transition: { duration: 0.2, ease: "easeOut" },
                      }
                }
                className={cn(
                  "group relative text-left overflow-hidden rounded-xl p-6 md:p-7",
                  "border border-[#0a0a0a]/15 bg-[#0a0a0a]/[0.025]",
                  "transition-colors hover:bg-[#0a0a0a]/[0.045]",
                  "cursor-pointer tactile-press",
                )}
                aria-expanded={isActive}
              >
                {/* nummer · oben rechts */}
                <span className="absolute top-4 right-5 font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/35">
                  0{i + 1}
                </span>

                {/* big word · mit hover-underline */}
                <div className="relative inline-block">
                  <span className="block font-display font-black text-[clamp(34px,4.2vw,52px)] leading-[0.95] tracking-[-0.025em] text-[#0a0a0a] lowercase">
                    {v.label}
                  </span>
                  {/* scribble-underline · draws in on hover/active */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    className="absolute -bottom-1 left-0 w-full h-[10px] pointer-events-none overflow-visible"
                  >
                    <motion.path
                      d="M4 6 C 50 2, 120 10, 196 5"
                      stroke={accent}
                      strokeWidth="3"
                      strokeLinecap="round"
                      fill="none"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength: isActive ? 1 : 0,
                        opacity: isActive ? 0.85 : 0,
                      }}
                      transition={{
                        pathLength: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.3 },
                      }}
                      style={{ pathLength: undefined }}
                      className="group-hover:[--draw:1]"
                    />
                  </svg>
                </div>

                <p className="mt-5 text-[14px] leading-relaxed text-[#0a0a0a]/70">
                  {v.sub}
                </p>

                {/* expand-body · collapsed by default, opens on click */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 pt-4 border-t border-[#0a0a0a]/12 text-[13px] leading-relaxed text-[#0a0a0a]/65">
                    {v.body}
                  </p>
                </motion.div>

                {/* hint · zeigt-mehr-pfeil unten · rotiert wenn aktiv */}
                <motion.span
                  aria-hidden
                  animate={{ rotate: isActive ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute bottom-4 right-5 font-mono text-[14px] text-[#0a0a0a]/35 group-hover:text-[#0a0a0a]/65"
                >
                  +
                </motion.span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
