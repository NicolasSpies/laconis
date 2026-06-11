"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * NichtListe · EINE gemeinsame "was ich nicht mache"-liste (phase großputz).
 *
 * ersetzt den AnsatzToggle (web/branding-switch mit zwei fast identischen
 * manifesten · versteckte interaktion, doppelter content). die stärksten
 * punkte aus beiden manifesten kuratiert · text-rows, kein toggle.
 */

type Zeile = { nicht: string; stattdessen: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2accent: string;
  h2post: string;
  intro: string;
  zeilen: Zeile[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "manifest",
    h2pre: "was ich ",
    h2accent: "nicht",
    h2post: " mache.",
    intro:
      "vorab ehrlich, was bei mir nicht drin ist · damit später keine überraschungen kommen.",
    zeilen: [
      {
        nicht: "keine baukasten-templates.",
        stattdessen: "jede seite ein eigenes system, handgeschrieben.",
      },
      {
        nicht: "kein wordpress-plugin-friedhof.",
        stattdessen: "mein eigenes cms · gewartet, keine updates die dinge brechen.",
      },
      {
        nicht: "keine 27 logo-optionen im ersten entwurf.",
        stattdessen: "zwei richtungen · tiefer statt breiter.",
      },
      {
        nicht: "kein trend-chasing, das 2027 alt aussieht.",
        stattdessen: "marken, die altern dürfen, ohne peinlich zu werden.",
      },
      {
        nicht: "kein launch ohne 301-redirects.",
        stattdessen: "deine google-rankings bleiben, wo sie sind.",
      },
      {
        nicht: "keine 8-monats-wartezeit.",
        stattdessen: "2 bis 8 wochen · kalenderwoche, nicht quartal.",
      },
      {
        nicht: "keine preisverhandlung per whatsapp um 23 uhr.",
        stattdessen: "ein telefonat · klare zahl.",
      },
    ],
  },
  fr: {
    sectionLabel: "manifeste",
    h2pre: "ce que je ne ",
    h2accent: "fais pas",
    h2post: ".",
    intro:
      "honnête d'avance sur ce qui n'est pas inclus · pour éviter les surprises plus tard.",
    zeilen: [
      {
        nicht: "pas de templates de builders.",
        stattdessen: "chaque site un système propre, écrit à la main.",
      },
      {
        nicht: "pas de cimetière de plugins wordpress.",
        stattdessen: "mon propre cms · maintenu, pas de mises à jour qui cassent.",
      },
      {
        nicht: "pas de 27 options de logo au premier jet.",
        stattdessen: "deux directions · en profondeur plutôt qu'en largeur.",
      },
      {
        nicht: "pas de course aux tendances démodée en 2027.",
        stattdessen: "des marques qui peuvent vieillir sans devenir gênantes.",
      },
      {
        nicht: "pas de lancement sans redirections 301.",
        stattdessen: "tes positions google restent où elles sont.",
      },
      {
        nicht: "pas de 8 mois d'attente.",
        stattdessen: "2 à 8 semaines · semaine calendaire, pas trimestre.",
      },
      {
        nicht: "pas de négociation de prix par whatsapp à 23h.",
        stattdessen: "un coup de fil · un chiffre clair.",
      },
    ],
  },
  en: {
    sectionLabel: "manifesto",
    h2pre: "what i ",
    h2accent: "don't",
    h2post: " do.",
    intro:
      "honest upfront about what's not included · so there are no surprises later.",
    zeilen: [
      {
        nicht: "no site-builder templates.",
        stattdessen: "every site its own system, handwritten.",
      },
      {
        nicht: "no wordpress plugin graveyard.",
        stattdessen: "my own cms · maintained, no updates that break things.",
      },
      {
        nicht: "no 27 logo options in the first draft.",
        stattdessen: "two directions · deeper instead of wider.",
      },
      {
        nicht: "no trend-chasing that looks dated by 2027.",
        stattdessen: "brands that can age without becoming embarrassing.",
      },
      {
        nicht: "no launch without 301 redirects.",
        stattdessen: "your google rankings stay where they are.",
      },
      {
        nicht: "no 8-month waiting time.",
        stattdessen: "2 to 8 weeks · calendar week, not quarter.",
      },
      {
        nicht: "no price haggling via whatsapp at 11pm.",
        stattdessen: "one phone call · a clear number.",
      },
    ],
  },
};

export function NichtListe({ num = "04" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-24">
      <div className="container-site">
        <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-10 md:gap-16 items-start">
          <div className="md:sticky md:top-28">
            <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] text-offwhite leading-[1.05]">
              {t.h2pre}
              <span className="text-[#b084d3]">{t.h2accent}</span>
              {t.h2post}
            </h2>
            <p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-offwhite/60">
              {t.intro}
            </p>
          </div>

          <div className="border-t-2 border-[#0a0a0a]/15">
            {t.zeilen.map((z, i) => (
              <motion.div
                key={z.nicht}
                initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.04 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="py-5 border-b-2 border-[#0a0a0a]/15"
              >
                <p className="heading-sans text-[16px] md:text-[18px] text-offwhite leading-tight">
                  <span aria-hidden className="text-[#b084d3] mr-2">
                    ✕
                  </span>
                  {z.nicht}
                </p>
                <p className="mt-1.5 pl-6 text-[13.5px] leading-relaxed text-offwhite/65">
                  <span aria-hidden className="text-[#0a0a0a] mr-2">
                    →
                  </span>
                  {z.stattdessen}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
