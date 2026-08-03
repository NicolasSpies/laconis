import { PageHero } from "@/components/shared/PageHero";
import { ReferenzenIndex } from "@/components/referenzen/ReferenzenIndex";
import { ContactSheetCard } from "@/components/referenzen/ContactSheetCard";
import { SectionGhost } from "@/components/shared/SectionGhost";
import { LimeCta } from "@/components/shared/LimeCta";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { referenzen } from "@/data/referenzen";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/referenzen");
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: referenzen.map((r, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${BASE}/referenzen/${r.slug}`,
    name: r.name,
  })),
};

type Dict = {
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  intro: string;
  honestNote: string;
  ctaKicker: string;
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSignature: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· referenzen",
    heroL1: "ausgewählte",
    heroL2: "arbeiten.",
    heroItalic: "die bleiben.",
    intro: "projekte, die bleiben · keine 0815-websites, keine austauschbaren logos. einfach sachen, die zu den leuten passen, die dahinter stehen.",
    honestNote: "ehrlich-hinweis · ein teil der gezeigten arbeiten sind konzept-studien (mit „konzept\"-badge markiert). echte kunden-projekte kommen laufend dazu.",
    ctaKicker: "frei für neues ↘",
    ctaH2: "dein projekt als nr. 04?",
    ctaBody: "der nächste case ist noch frei. erzähl mir kurz, was du vorhast · ich sag dir ehrlich, ob ich der richtige dafür bin.",
    ctaPrimary: "projekt starten →",
    ctaSecondary: "preise ansehen",
    ctaSignature: "— nicolas",
  },
  fr: {
    kicker: "· références",
    heroL1: "travaux",
    heroL2: "sélectionnés.",
    heroItalic: "qui durent.",
    intro: "des projets qui durent · pas de sites lambda, pas de logos interchangeables. juste des choses qui collent aux gens derrière.",
    honestNote: "note honnête · une partie des travaux montrés sont des études concept (badge « concept »). les vrais projets clients arrivent en continu.",
    ctaKicker: "libre pour du neuf ↘",
    ctaH2: "ton projet en nr. 04 ?",
    ctaBody: "le prochain case est encore libre. dis-moi vite ce que tu prévois · je te dis franchement si je suis le bon pour ça.",
    ctaPrimary: "démarrer un projet →",
    ctaSecondary: "voir les prix",
    ctaSignature: "— nicolas",
  },
  en: {
    kicker: "· work",
    heroL1: "selected",
    heroL2: "work.",
    heroItalic: "that sticks.",
    intro: "projects that stick · no off-the-shelf websites, no interchangeable logos. just things that fit the people behind them.",
    honestNote: "honest note · some of the work shown is concept studies (marked with \"concept\" badge). real client projects keep coming.",
    ctaKicker: "open for new ↘",
    ctaH2: "your project as no. 04?",
    ctaBody: "the next case is still open. tell me what you're planning · i'll tell you honestly if i'm the right fit.",
    ctaPrimary: "start a project →",
    ctaSecondary: "see pricing",
    ctaSignature: "— nicolas",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "referenzen", url: `${BASE}${buildPath("referenzen", locale)}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2}
        italicAccent={t.heroItalic}
        sub={
          <>
            <span>{t.intro}</span>
            <span className="mt-4 block font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/55">
              {t.honestNote}
            </span>
          </>
        }
        visual={<ContactSheetCard />}
        visualInteractive
      />


      {/* outline-ghost · typo als layout-element */}
      <SectionGhost word="work" side="left" />

      {/* Editorial index · full-width rows, cursor-following preview ·
         skaliert von 3 auf 30 cases · ContentCore-API-ready */}
      <ReferenzenIndex />

      {/* CTA · sitewide lime-flood sign-off · referenz-index endete vorher
          abrupt am footer · „dein projekt als nr. 04?" greift die nummerierung auf */}
      <LimeCta
        ariaLabel={t.ctaH2}
        kicker={t.ctaKicker}
        h2={t.ctaH2}
        body={t.ctaBody}
        primaryLabel={t.ctaPrimary}
        primaryHref={`${buildPath("kontakt", locale)}#projekt`}
        secondaryLabel={t.ctaSecondary}
        secondaryHref={buildPath("preise", locale)}
        signature={t.ctaSignature}
      />
    </>
  );
}
