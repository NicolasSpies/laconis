import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ContentCoreSection } from "@/components/leistungen/web/ContentCoreSection";
import { HostingBlock } from "@/components/leistungen/web/HostingBlock";
import { ContentCoreVsWordpress } from "@/components/leistungen/web/ContentCoreVsWordpress";
import { ContentCoreDeepDive } from "@/components/leistungen/web/ContentCoreDeepDive";
import { BeweisStrip } from "@/components/leistungen/web/BeweisStrip";
import { ContentControl } from "@/components/leistungen/web/ContentControl";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

type Dict = {
  back: string;
  sectionLabel: string;
  h1pre: string;
  h1post: string;
  intro1: string;
  intro2: string;
  nav: { href: string; label: string }[];
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    back: "← zurück zu leistungen · web",
    sectionLabel: "web · technik",
    h1pre: "für alle, die's genau ",
    h1post: "wissen wollen.",
    intro1: "die kurzversion steht auf der haupt-seite. hier unten: mein eigenes CMS in aktion, wo das zeug läuft, warum ich kein wordpress baue, und wie contentcore technisch aufgebaut ist.",
    intro2: "kein marketing-sprech. ehrliche technik. nimm dir zeit · oder spring direkt zu einem abschnitt.",
    nav: [
      { href: "#beweis", label: "beweis · scores" },
      { href: "#content-control", label: "content-control" },
      { href: "#contentcore", label: "contentcore · überblick" },
      { href: "#hosting", label: "hosting" },
      { href: "#cms-vergleich", label: "contentcore vs wordpress" },
      { href: "#deep-dive", label: "contentcore architektur" },
    ],
    ctaH2: "noch fragen? einfach fragen.",
    ctaBody: "technik-details sind ein sprungbrett, keine checkliste. wenn was unklar ist · sag bescheid, ich klär's im gespräch.",
    ctaPrimary: "kontakt aufnehmen →",
    ctaSecondary: "← zurück zur übersicht",
  },
  fr: {
    back: "← retour à services · web",
    sectionLabel: "web · technique",
    h1pre: "pour ceux qui veulent vraiment ",
    h1post: "savoir.",
    intro1: "la version courte est sur la page principale. ici en dessous : mon cms en action, où le truc tourne, pourquoi je fais pas de wordpress, et comment contentcore est techniquement construit.",
    intro2: "pas de blabla marketing. de la vraie technique. prends le temps · ou saute direct à une section.",
    nav: [
      { href: "#beweis", label: "preuves · scores" },
      { href: "#content-control", label: "content-control" },
      { href: "#contentcore", label: "contentcore · aperçu" },
      { href: "#hosting", label: "hébergement" },
      { href: "#cms-vergleich", label: "contentcore vs wordpress" },
      { href: "#deep-dive", label: "architecture contentcore" },
    ],
    ctaH2: "encore des questions ? demande.",
    ctaBody: "les détails techniques sont un tremplin, pas une checklist. si quelque chose est flou · dis-le, on clarifie en échange.",
    ctaPrimary: "prendre contact →",
    ctaSecondary: "← retour à l'aperçu",
  },
  en: {
    back: "← back to services · web",
    sectionLabel: "web · tech",
    h1pre: "for everyone who wants to ",
    h1post: "know exactly.",
    intro1: "the short version is on the main page. down here: my own cms in action, where the stuff runs, why i don't build wordpress, and how contentcore is built technically.",
    intro2: "no marketing speak. honest tech. take your time · or jump to a section.",
    nav: [
      { href: "#beweis", label: "proof · scores" },
      { href: "#content-control", label: "content-control" },
      { href: "#contentcore", label: "contentcore · overview" },
      { href: "#hosting", label: "hosting" },
      { href: "#cms-vergleich", label: "contentcore vs wordpress" },
      { href: "#deep-dive", label: "contentcore architecture" },
    ],
    ctaH2: "questions left? just ask.",
    ctaBody: "tech details are a springboard, not a checklist. if anything's unclear · say so, i'll clear it up in a call.",
    ctaPrimary: "get in touch →",
    ctaSecondary: "← back to overview",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/web/technik");
}

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];
  return (
    <>
      <section className="pt-36 pb-4">
        <div className="container-site">
          <Link
            href={buildPath("leistungen/web", locale)}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            {t.back}
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site">
          <SectionLabel num="01">{t.sectionLabel}</SectionLabel>
          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,7vw,5rem)] text-offwhite leading-[1.02]">
              {t.h1pre}
              <span className="text-offwhite/35">{t.h1post}</span>
            </h1>
            <p className="mt-8 max-w-[640px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              {t.intro1}
            </p>
            <p className="mt-4 max-w-[640px] text-[13px] leading-relaxed text-offwhite/55">
              {t.intro2}
            </p>
          </div>

          <nav className="mt-10 flex flex-wrap gap-2">
            {t.nav.map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="font-mono text-[11px] uppercase tracking-label px-3 py-1.5 rounded-full border border-ink/10 text-offwhite/55 hover:border-lime/25 hover:text-accent-ink transition-colors"
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div id="beweis">
        <BeweisStrip num="02" />
      </div>
      <div id="content-control">
        <ContentControl num="03" />
      </div>
      <div id="contentcore">
        <ContentCoreSection num="04" />
      </div>
      <div id="hosting">
        <HostingBlock num="05" />
      </div>
      <div id="cms-vergleich">
        <ContentCoreVsWordpress num="06" />
      </div>
      <div id="deep-dive">
        <ContentCoreDeepDive num="07" />
      </div>

      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              {t.ctaH2}
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              {t.ctaBody}
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href={buildPath("kontakt", locale)} variant="primary" size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={buildPath("leistungen/web", locale)} variant="glass" size="lg">
                {t.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
