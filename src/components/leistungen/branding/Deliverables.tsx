"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Corner = "tl" | "tc" | "tr";

type Paket = {
  num: string;
  titelPre: string;
  titelItalic: string;
  titelPost: string;
  kurz: string;
  tags: string[];
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  bridgePre: string;
  bridgeAccent: string;
  bridgePost: string;
  pakete: Paket[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was du bekommst",
    h2pre: "drei pakete,",
    h2post: "sauber übergeben.",
    intro: "Keine Nachlieferungen per E-Mail, kein „Ach, die Datei schicke ich dir morgen\". Am Übergabetag hast du alles · in einem geteilten Ordner, print-ready und web-ready.",
    bridgePre: "und wenn du ",
    bridgeAccent: "mehr",
    bridgePost: " brauchst?",
    pakete: [
      { num: "01", titelPre: "das ", titelItalic: "logo", titelPost: "-paket", kurz: "Alle Formate, alle Fälle · Primär, Mono, Monogramm, Favicon. Nie wieder die Frage: Hast du das Logo auch als…?", tags: ["svg", "png", "pdf druckfertig", "favicon", "monogramm"] },
      { num: "02", titelPre: "der basic ", titelItalic: "brand", titelPost: " guide", kurz: "Farben, Typografie, Bildsprache, Ton. Kurz & knapp, alles drin · das Manual für dich und alle, die später damit arbeiten.", tags: ["hex · rgb · cmyk · pantone", "typo-system", "bildsprache", "voice"] },
      { num: "03", titelPre: "print & ", titelItalic: "web", titelPost: "-set", kurz: "Visitenkarte, Briefpapier, E-Mail-Signatur, Favicon, drei Social-Posts · druckfertig mit Schnittmarken, web-ready mit allen Größen.", tags: ["visitenkarte", "briefpapier", "e-mail-signatur", "3 social-posts"] },
    ],
  },
  fr: {
    sectionLabel: "ce que tu reçois",
    h2pre: "trois packs,",
    h2post: "livrés proprement.",
    intro: "Pas de livraisons par e-mail à la rallonge, pas de « ah, le fichier je te l'envoie demain ». Le jour de la livraison tu as tout · dans un dossier partagé, prêt-à-imprimer et prêt-pour-le-web.",
    bridgePre: "et si tu as besoin de ",
    bridgeAccent: "plus",
    bridgePost: " ?",
    pakete: [
      { num: "01", titelPre: "le pack ", titelItalic: "logo", titelPost: "", kurz: "Tous les formats, tous les cas · Primaire, Mono, Monogramme, Favicon. Plus jamais la question : tu as le logo aussi en… ?", tags: ["svg", "png", "pdf prêt-à-imprimer", "favicon", "monogramme"] },
      { num: "02", titelPre: "le ", titelItalic: "brand", titelPost: " guide basic", kurz: "Couleurs, typo, image, ton. Bref et complet · le manuel pour toi et tous ceux qui bossent avec ensuite.", tags: ["hex · rgb · cmyk · pantone", "système typo", "image", "voix"] },
      { num: "03", titelPre: "le set print & ", titelItalic: "web", titelPost: "", kurz: "Carte de visite, papier à lettre, signature mail, favicon, trois posts sociaux · prêt-à-imprimer avec marques de coupe, web-ready dans toutes les tailles.", tags: ["carte de visite", "papier à lettre", "signature mail", "3 posts sociaux"] },
    ],
  },
  en: {
    sectionLabel: "what you get",
    h2pre: "three packs,",
    h2post: "cleanly delivered.",
    intro: "No follow-up files by e-mail, no \"oh, i'll send that one tomorrow\". On handover day you've got everything · in a shared folder, print-ready and web-ready.",
    bridgePre: "and if you need ",
    bridgeAccent: "more",
    bridgePost: "?",
    pakete: [
      { num: "01", titelPre: "the ", titelItalic: "logo", titelPost: " pack", kurz: "All formats, every situation · Primary, Mono, Monogram, Favicon. Never again the question: do you have the logo as…?", tags: ["svg", "png", "pdf print-ready", "favicon", "monogram"] },
      { num: "02", titelPre: "the basic ", titelItalic: "brand", titelPost: " guide", kurz: "Colours, typography, imagery, tone. Short and full · the manual for you and anyone who works with it later.", tags: ["hex · rgb · cmyk · pantone", "type system", "imagery", "voice"] },
      { num: "03", titelPre: "print & ", titelItalic: "web", titelPost: " set", kurz: "Business card, letterhead, e-mail signature, favicon, three social posts · print-ready with crop marks, web-ready in every size.", tags: ["business card", "letterhead", "e-mail signature", "3 social posts"] },
    ],
  },
};

const PAKET_META: { rotate: string; corner: Corner; numRotate: string; offset: string }[] = [
  { rotate: "-1.6deg", corner: "tl", numRotate: "-10deg", offset: "md:mt-0" },
  { rotate: "1.2deg", corner: "tc", numRotate: "4deg", offset: "md:mt-8" },
  { rotate: "-0.8deg", corner: "tr", numRotate: "8deg", offset: "md:mt-3" },
];

const OUTLINE_STYLE = {
  WebkitTextStroke: "1.5px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

const CORNER_ANCHOR: Record<Corner, string> = {
  tl: "top-0 left-0",
  tc: "top-0 left-1/2",
  tr: "top-0 right-0",
};
const CORNER_TRANSLATE: Record<Corner, string> = {
  tl: "translate(-45%, -65%)",
  tc: "translate(-50%, -75%)",
  tr: "translate(45%, -65%)",
};

export function Deliverables({ num = "05" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="relative pb-8 md:pb-10 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
          {t.h2pre}{" "}
          <span className="text-offwhite/35">{t.h2post}</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
          {t.intro}
        </p>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {t.pakete.map((p, idx) => {
            const meta = PAKET_META[idx];
            return (
              <div
                key={p.num}
                className={[
                  "relative group",
                  idx > 0 ? "md:-ml-4" : "",
                  meta.offset,
                ].join(" ")}
                style={{ zIndex: 10 + idx }}
              >
                <span
                  aria-hidden
                  className={[
                    "heading-display block absolute select-none pointer-events-none z-0",
                    "text-[clamp(5.5rem,10vw,7.5rem)] leading-[0.82] text-offwhite/30",
                    CORNER_ANCHOR[meta.corner],
                  ].join(" ")}
                  style={{
                    ...OUTLINE_STYLE,
                    transform: `${CORNER_TRANSLATE[meta.corner]} rotate(${meta.numRotate})`,
                  }}
                >
                  {p.num}
                </span>

                <article
                  className="relative z-10 liquid-glass-dark rounded-2xl p-7 md:p-8 transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50"
                  style={{ transform: `rotate(${meta.rotate})` }}
                >
                  <h3 className="heading-display text-[clamp(1.5rem,2.4vw,1.9rem)] text-offwhite leading-[1.1]">
                    {p.titelPre}
                    <span className="italic font-serif text-accent-ink">{p.titelItalic}</span>
                    {p.titelPost}
                  </h3>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-offwhite/75">
                    {p.kurz}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-0.5 rounded-full border border-ink/20 bg-ink/[0.03] font-mono text-[10.5px] text-offwhite/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </div>
            );
          })}
        </div>

        <BridgeArrow t={t} />
      </div>
    </section>
  );
}

function BridgeArrow({ t }: { t: Dict }) {
  return (
    <div className="mt-16 md:mt-20 relative flex flex-col items-center gap-3">
      <span className="font-hand text-[22px] md:text-[24px] text-offwhite/85 -rotate-2 leading-tight">
        {t.bridgePre}<span className="text-accent-ink">{t.bridgeAccent}</span>{t.bridgePost}
      </span>
      <svg
        width="74"
        height="88"
        viewBox="0 0 74 88"
        fill="none"
        aria-hidden
        className="text-offwhite/55"
      >
        <path
          d="M38 2 C 44 16, 28 28, 36 42 C 44 56, 28 64, 38 80"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31 72 L38 82 L46 72"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
