import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { SectionGhost } from "@/components/shared/SectionGhost";
import { ContentCoreSection } from "@/components/leistungen/web/ContentCoreSection";
import { ContentCoreVsWordpress } from "@/components/leistungen/web/ContentCoreVsWordpress";
import { ContentCoreDeepDive } from "@/components/leistungen/web/ContentCoreDeepDive";
import { BeweisStrip } from "@/components/leistungen/web/BeweisStrip";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

/**
 * Technik-page v2 · "kurz und knackig, trotzdem interessant" (nicolas).
 *
 * vorher: 12.800px, 7 sections, card-friedhof (sprint-4-design).
 * jetzt: 5 sections in der neuen design-sprache ·
 *   beweis (echte scores) → contentcore-dashboard → feature-rows →
 *   hosting-kurzfakten → vergleichstabelle → dark-slab CTA.
 * raus: ContentControl-demo + HostingBlock-monster (588 zeilen) ·
 * die hosting-kernfakten leben jetzt als kompakte rows hier.
 */

type HostingFakt = { label: string; wert: string };

type Dict = {
  back: string;
  sectionLabel: string;
  h1pre: string;
  h1post: string;
  intro1: string;
  ghost: string;
  hostingLabel: string;
  hostingH2: string;
  hostingIntro: string;
  hostingFakten: HostingFakt[];
  hostingPreis: string;
  breakVergleich: string;
  ctaMarginalia: string;
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSignature: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    back: "← zurück zu leistungen · web",
    sectionLabel: "web · technik",
    h1pre: "für alle, die's genau ",
    h1post: "wissen wollen.",
    intro1:
      "die kurzversion steht auf der haupt-seite. hier: mein eigenes CMS in aktion, wo das zeug läuft, und warum ich kein wordpress baue. kein marketing-sprech · ehrliche technik.",
    ghost: "technik",
    hostingLabel: "hosting",
    hostingH2: "wo deine seite wohnt.",
    hostingIntro:
      "backend und website bewusst getrennt · jede ebene bekommt genau das, was sie braucht. kein shared-hosting-lotto.",
    hostingFakten: [
      { label: "backend", wert: "eigener VPS · EU (litauen) · dsgvo-konform" },
      { label: "website", wert: "statisch auf globaler edge · besucher laden vom nächsten standort" },
      { label: "backups", wert: "täglich automatisch · datenbank + uploads" },
      { label: "updates", wert: "änderung im cms → seite in sekunden aktuell" },
    ],
    hostingPreis: "hosting ab 20 €/monat · details auf der preise-seite →",
    breakVergleich: "und gegen wordpress? ↓",
    ctaMarginalia: "kurz & ehrlich ↘",
    ctaH2: "noch fragen? einfach fragen.",
    ctaBody:
      "technik-details sind ein sprungbrett, keine checkliste. wenn was unklar ist · sag bescheid, ich klär's im gespräch.",
    ctaPrimary: "kontakt aufnehmen →",
    ctaSecondary: "zurück zur übersicht",
    ctaSignature: "— nicolas",
  },
  fr: {
    back: "← retour à services · web",
    sectionLabel: "web · technique",
    h1pre: "pour ceux qui veulent vraiment ",
    h1post: "savoir.",
    intro1:
      "la version courte est sur la page principale. ici : mon cms en action, où ça tourne, et pourquoi je ne fais pas de wordpress. pas de blabla marketing · de la vraie technique.",
    ghost: "technique",
    hostingLabel: "hébergement",
    hostingH2: "où vit ton site.",
    hostingIntro:
      "backend et site volontairement séparés · chaque couche reçoit exactement ce qu'il lui faut. pas de loterie shared-hosting.",
    hostingFakten: [
      { label: "backend", wert: "VPS dédié · UE (lituanie) · conforme RGPD" },
      { label: "site", wert: "statique sur edge globale · les visiteurs chargent depuis le point le plus proche" },
      { label: "backups", wert: "quotidiens automatiques · base de données + uploads" },
      { label: "updates", wert: "changement dans le cms → site à jour en secondes" },
    ],
    hostingPreis: "hébergement à partir de 20 €/mois · détails sur la page prix →",
    breakVergleich: "et contre wordpress ? ↓",
    ctaMarginalia: "court & honnête ↘",
    ctaH2: "encore des questions ? demande.",
    ctaBody:
      "les détails techniques sont un tremplin, pas une checklist. si quelque chose est flou · dis-le, on clarifie en échange.",
    ctaPrimary: "prendre contact →",
    ctaSecondary: "retour à l'aperçu",
    ctaSignature: "— nicolas",
  },
  en: {
    back: "← back to services · web",
    sectionLabel: "web · tech",
    h1pre: "for everyone who wants to ",
    h1post: "know exactly.",
    intro1:
      "the short version is on the main page. here: my own cms in action, where the stuff runs, and why i don't build wordpress. no marketing speak · honest tech.",
    ghost: "tech",
    hostingLabel: "hosting",
    hostingH2: "where your site lives.",
    hostingIntro:
      "backend and website deliberately separated · each layer gets exactly what it needs. no shared-hosting lottery.",
    hostingFakten: [
      { label: "backend", wert: "dedicated VPS · EU (lithuania) · GDPR-compliant" },
      { label: "website", wert: "static on global edge · visitors load from the nearest location" },
      { label: "backups", wert: "daily automatic · database + uploads" },
      { label: "updates", wert: "change in the cms → site current in seconds" },
    ],
    hostingPreis: "hosting from €20/month · details on the pricing page →",
    breakVergleich: "and against wordpress? ↓",
    ctaMarginalia: "short & honest ↘",
    ctaH2: "questions left? just ask.",
    ctaBody:
      "tech details are a springboard, not a checklist. if anything's unclear · say so, i'll clear it up in a call.",
    ctaPrimary: "get in touch →",
    ctaSecondary: "back to overview",
    ctaSignature: "— nicolas",
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
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-[#b084d3] transition-colors"
          >
            {t.back}
          </Link>
        </div>
      </section>

      {/* HERO · gestrafft · sprungmarken raus (page ist kurz genug) */}
      <section className="pb-16">
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
          </div>
        </div>
      </section>

      {/* BEWEIS · echte scores · stärkster content zuerst */}
      <BeweisStrip num="02" />

      {/* CONTENTCORE · dashboard-mockup */}
      <ContentCoreSection num="03" />

      {/* outline-ghost + feature-rows (v2 · kein card-friedhof) */}
      <SectionGhost word={t.ghost} side="right" />
      <ContentCoreDeepDive num="04" />

      {/* HOSTING · kompakte fakten-rows statt 588-zeilen-monster */}
      <section className="py-16 md:py-20">
        <div className="container-site">
          <div className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-10 md:gap-16 items-start">
            <div className="md:sticky md:top-28">
              <SectionLabel num="05">{t.hostingLabel}</SectionLabel>
              <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] text-offwhite leading-[1.05]">
                {t.hostingH2}
              </h2>
              <p className="mt-5 max-w-[380px] text-[14px] leading-relaxed text-offwhite/60">
                {t.hostingIntro}
              </p>
            </div>
            <div>
              <div className="border-t-2 border-[#0a0a0a]/15">
                {t.hostingFakten.map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-5 border-b-2 border-[#0a0a0a]/15"
                  >
                    <span className="shrink-0 w-[90px] font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                      {f.label}
                    </span>
                    <span className="text-[14px] md:text-[15px] leading-relaxed text-[#0a0a0a]/85">
                      {f.wert}
                    </span>
                  </div>
                ))}
              </div>
              <Link
                href={buildPath("preise", locale)}
                className="mt-5 inline-block font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/65 hover:text-[#b084d3] transition-colors"
              >
                {t.hostingPreis}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakVergleich} rotate={-0.8} />

      {/* VERGLEICH · tabelle (gestrafft · schichten-cards raus) */}
      <ContentCoreVsWordpress num="06" />

      {/* CTA · dark slab · gleiches pattern wie alle service-pages */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-[#0a0a0a]">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.1] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(242,242,242,0.5) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-site relative">
          <p
            className="font-mono text-[11px] uppercase tracking-label text-[#b084d3] mb-6"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {t.ctaMarginalia}
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] leading-[1] font-black tracking-[-0.035em] text-[#f2f2f2] lowercase max-w-[820px]">
            {t.ctaH2}
          </h2>
          <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-[#f2f2f2]/75">
            {t.ctaBody}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#e1fd52] text-[#0a0a0a] hover:bg-[#d4f03e] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("leistungen/web", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#b084d3] text-[#f2f2f2] hover:bg-[#b084d3] hover:text-[#0a0a0a] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
          <p
            className="mt-10 text-[16px] text-[#b084d3]"
            style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-1deg)" }}
          >
            {t.ctaSignature}
          </p>
        </div>
      </section>
    </>
  );
}
