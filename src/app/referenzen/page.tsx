import { PageHero, HeroRings } from "@/components/shared/PageHero";
import { Marquee } from "@/components/shared/Marquee";
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
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  intro: string;
  honestNote: string;
  marqueeBits: string[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· referenzen",
    heroL1: "ausgewählte",
    heroL2: "arbeiten.",
    heroItalic: "die bleiben.",
    intro: "projekte, die bleiben · keine 0815-websites, keine austauschbaren logos. einfach sachen, die zu den leuten passen, die dahinter stehen.",
    honestNote: "ehrlich-hinweis · ein teil der gezeigten arbeiten sind konzept-studien (mit „konzept\"-badge markiert). echte kunden-projekte kommen laufend dazu.",
    marqueeBits: ["·", "real work", "·", "konzept-studien", "·", "echte kunden", "·", "case lesen →", "·"],
  },
  fr: {
    kicker: "· références",
    heroL1: "travaux",
    heroL2: "sélectionnés.",
    heroItalic: "qui durent.",
    intro: "des projets qui durent · pas de sites lambda, pas de logos interchangeables. juste des choses qui collent aux gens derrière.",
    honestNote: "note honnête · une partie des travaux montrés sont des études concept (badge « concept »). les vrais projets clients arrivent en continu.",
    marqueeBits: ["·", "vraie work", "·", "études concept", "·", "vrais clients", "·", "voir le case →", "·"],
  },
  en: {
    kicker: "· work",
    heroL1: "selected",
    heroL2: "work.",
    heroItalic: "that sticks.",
    intro: "projects that stick · no off-the-shelf websites, no interchangeable logos. just things that fit the people behind them.",
    honestNote: "honest note · some of the work shown is concept studies (marked with \"concept\" badge). real client projects keep coming.",
    marqueeBits: ["·", "real work", "·", "concept studies", "·", "real clients", "·", "see case →", "·"],
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
        visual={<HeroRings />}
      />

      <Marquee items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={45} />

      {/* CaseWall (existing 3D-tilt wall component, keeps dark island) */}
      <div data-theme="dark" className="bg-[#0a0a0a] text-offwhite py-16 md:py-20">
        <div className="container-site">
          <CaseWall />
        </div>
      </div>
    </>
  );
}
