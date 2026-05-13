import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseWall } from "@/components/referenzen/CaseWall";
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
  sectionLabel: string;
  headlinePre: string;
  headlineAccent: string;
  intro: string;
  honestNote: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "referenzen",
    headlinePre: "ausgewählte ",
    headlineAccent: "arbeiten.",
    intro: "Projekte, die bleiben · keine 0815-Websites, keine austauschbaren Logos. Einfach Sachen, die zu den Leuten passen, die dahinter stehen.",
    honestNote: "ehrlich-hinweis · ein teil der gezeigten arbeiten sind konzept-studien (mit „konzept\"-badge markiert). echte kunden-projekte kommen laufend dazu.",
  },
  fr: {
    sectionLabel: "références",
    headlinePre: "travaux ",
    headlineAccent: "sélectionnés.",
    intro: "Des projets qui durent · pas de sites lambda, pas de logos interchangeables. Juste des choses qui collent aux gens derrière.",
    honestNote: "note honnête · une partie des travaux montrés sont des études concept (badge « concept »). les vrais projets clients arrivent en continu.",
  },
  en: {
    sectionLabel: "work",
    headlinePre: "selected ",
    headlineAccent: "work.",
    intro: "Projects that stick · no off-the-shelf websites, no interchangeable logos. Just things that fit the people behind them.",
    honestNote: "honest note · some of the work shown is concept studies (marked with \"concept\" badge). real client projects keep coming.",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <section className="pt-36 pb-32">
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: t.sectionLabel, url: `${BASE}${buildPath("referenzen", locale)}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <div className="container-site">
        <SectionLabel num="04">{t.sectionLabel}</SectionLabel>

        <div className="mt-8 max-w-[900px]">
          <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
            {t.headlinePre}
            <span className="text-offwhite/35">{t.headlineAccent}</span>
          </h1>
          <p className="mt-8 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
          <p className="mt-4 max-w-[560px] font-mono text-[11px] uppercase tracking-label text-offwhite/55">
            {t.honestNote}
          </p>
        </div>

        <div className="mt-16">
          <CaseWall />
        </div>
      </div>
    </section>
  );
}
