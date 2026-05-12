"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * PreiseTeaser — homepage section.
 * keine pakete mehr · zeigt was das investment beeinflusst.
 * drei kartei-karten mit faktoren statt preiszeilen.
 */

type Karte = {
  num: string;
  titel: string;
  text: string;
  rotate: number;
  tape?: "left" | "right";
  note?: string;
};

type Dict = {
  sectionLabel: string;
  headlinePre: string;
  headlineItalic: string;
  handAside: string;
  cards: Karte[];
  footnote: string;
  cta: string;
};

const KARTEN_LAYOUT = [
  { rotate: -1.6, tape: "left" as const },
  { rotate: 0.6, tape: "right" as const },
  { rotate: 2.1, tape: "left" as const },
];

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "investment",
    headlinePre: "was kostet das ",
    headlineItalic: "eigentlich",
    handAside: "keine tabelle · ehrliche faustregeln auf der preise-seite.",
    cards: [
      {
        num: "01", titel: "scope",
        text: "onepager oder mehrseitige site mit cms · was du brauchst, bestimmt den rahmen.",
        ...KARTEN_LAYOUT[0],
      },
      {
        num: "02", titel: "content",
        text: "bringst du texte + bilder mit, oder soll ich beim schreiben mit ran? macht den größten unterschied.",
        ...KARTEN_LAYOUT[1], note: "oft unterschätzt.",
      },
      {
        num: "03", titel: "branding dazu",
        text: "website allein · oder alles aus einer hand. letzteres spart dir koordination und sieht stimmiger aus.",
        ...KARTEN_LAYOUT[2], note: "am liebsten beides.",
      },
    ],
    footnote: "Die meisten Projekte: 1.500–6.000 €. Was den Rahmen bestimmt und wie's konkret läuft · auf der Preise-Seite.",
    cta: "was es kostet →",
  },
  fr: {
    sectionLabel: "investissement",
    headlinePre: "ça coûte combien, ",
    headlineItalic: "en vrai",
    handAside: "pas de tableau · des règles honnêtes sur la page prix.",
    cards: [
      {
        num: "01", titel: "scope",
        text: "onepage ou site multi-pages avec cms · ce qu'il te faut définit le cadre.",
        ...KARTEN_LAYOUT[0],
      },
      {
        num: "02", titel: "contenu",
        text: "tu apportes textes + images, ou je m'y mets avec toi pour l'écriture ? ça fait la plus grande différence.",
        ...KARTEN_LAYOUT[1], note: "souvent sous-estimé.",
      },
      {
        num: "03", titel: "branding en plus",
        text: "site web seul · ou tout d'une même main. la deuxième te fait gagner de la coordination et c'est plus cohérent.",
        ...KARTEN_LAYOUT[2], note: "les deux, idéalement.",
      },
    ],
    footnote: "La plupart des projets : 1 500–6 000 €. Ce qui définit le cadre et comment ça se passe · sur la page prix.",
    cta: "voir les prix →",
  },
  en: {
    sectionLabel: "investment",
    headlinePre: "what does it ",
    headlineItalic: "actually",
    handAside: "no table · honest rules of thumb on the pricing page.",
    cards: [
      {
        num: "01", titel: "scope",
        text: "onepager or multipage site with cms · what you need sets the frame.",
        ...KARTEN_LAYOUT[0],
      },
      {
        num: "02", titel: "content",
        text: "do you bring text + images, or should i help write? makes the biggest difference.",
        ...KARTEN_LAYOUT[1], note: "often underestimated.",
      },
      {
        num: "03", titel: "branding too",
        text: "website alone · or everything from one place. the second saves you coordination and looks more cohesive.",
        ...KARTEN_LAYOUT[2], note: "both, ideally.",
      },
    ],
    footnote: "Most projects: €1,500–6,000. What sets the frame and how it actually works · on the pricing page.",
    cta: "what it costs →",
  },
};

export function PreiseTeaser() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="relative py-28 md:py-36">
      <div className="container-site">
        <SectionLabel num="03">{t.sectionLabel}</SectionLabel>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-6 flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="heading-display text-[clamp(2.25rem,5.5vw,4rem)] max-w-[820px] text-offwhite leading-[1.02]">
            {t.headlinePre}
            <span className="italic font-serif text-accent-ink">{t.headlineItalic}</span>?
          </h2>
          <p className="font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[360px] leading-snug">
            {t.handAside}
          </p>
        </motion.div>

        {/* kartei-karten · faktoren statt preise */}
        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-6 lg:gap-8">
          {t.cards.map((k, i) => (
            <motion.article
              key={k.num}
              initial={{ opacity: 0, y: 32, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: k.rotate }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4, rotate: k.rotate * 0.4, transition: { duration: 0.4 } }}
              className="relative glass rounded-xl p-7 md:p-8 flex flex-col min-h-[300px]"
            >
              <span
                aria-hidden
                className={
                  "pointer-events-none absolute -top-2 h-4 w-20 bg-offwhite/10 border border-ink/10 rounded-[2px] " +
                  (k.tape === "left" ? "left-6 -rotate-6" : "right-6 rotate-3")
                }
              />

              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                {locale === "fr" ? "facteur" : locale === "en" ? "factor" : "faktor"} · {k.num}
              </span>

              <h3 className="mt-4 heading-display text-[clamp(1.75rem,2.8vw,2.35rem)] lowercase text-offwhite leading-none">
                {k.titel}
              </h3>

              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 flex-1">
                {k.text}
              </p>

              {k.note && (
                <p
                  className="mt-6 font-hand text-[16px] text-offwhite/55 leading-snug"
                  style={{ transform: "rotate(-1deg)" }}
                >
                  {k.note}
                </p>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-5">
          <p className="max-w-[520px] text-[13px] leading-relaxed text-offwhite/55">
            {t.footnote}
          </p>
          <Button href={buildPath("preise", locale)} variant="primary" size="sm">
            {t.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
