import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { AnsatzToggle } from "@/components/ansatz/AnsatzToggle";
import { UnifiedProcess } from "@/components/ansatz/UnifiedProcess";
import { WebManifest } from "@/components/leistungen/web/WebManifest";
import { Manifest } from "@/components/leistungen/branding/Manifest";
import { HowToSchema } from "@/components/seo/HowToSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

type Dict = {
  sectionLabel: string;
  headlinePre: string;
  headlinePost: string;
  intro: string;
  breakText: string;
  ctaHeadline: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  howTo: { name: string; description: string };
  steps: { name: string; text: string; duration: string }[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "ansatz",
    headlinePre: "wie ich ",
    headlinePost: "arbeite.",
    intro: "Kein Agentur-Gantt-Chart, keine Blackbox. Vier Schritte vom ersten Gespräch bis zur Übergabe · und eine ehrliche Liste von dem, was ich bewusst nicht mache.",
    breakText: "und was ich nicht mache ↓",
    ctaHeadline: "klingt nach deiner art zu arbeiten?",
    ctaBody: "30 Minuten Video-Call. Keine Präsentation, kein Vertrag · nur Klarheit.",
    ctaPrimary: "gespräch anfragen →",
    ctaSecondary: "leistungen ansehen",
    howTo: {
      name: "So läuft ein Projekt bei lacønis ab",
      description: "Vier Schritte vom ersten Gespräch bis zur Übergabe · für Web und Branding identisch. Klarer Prozess, keine Blackbox.",
    },
    steps: [
      { name: "Kennenlernen", text: "30 Minuten Video-Call. Ich rede mit dir über dich, nicht über Logos oder Pixel. Was machst du, wer ist die Zielgruppe, warum jetzt. Kostet nichts und bringt Klarheit darüber, ob wir zusammen passen.", duration: "P1D" },
      { name: "Richtung finden", text: "Moodboard, Struktur, Tonalität. Ich lege 2–3 Richtungen vor. Du bestimmst, wohin's geht · bevor irgendeine Farbe oder Zeile umgesetzt wird. So vermeide ich Sackgassen und Doppelarbeit.", duration: "P1W" },
      { name: "Bauen", text: "Bei Web: Design und Code parallel · du siehst klickbare Vorschau-Versionen alle paar Tage. Bei Branding: erster Entwurf, dann gemeinsame Schleifen bis es sitzt. Keine wochenlange Funkstille.", duration: "P3W" },
      { name: "Übergabe", text: "Bei Web: Live-Schaltung + CMS-Einweisung, du kannst von Tag 1 selbst pflegen. Bei Branding: alle Quelldateien, druckfertige Exports, Kurz-Manual. Keine Nachlieferungen, keine versteckten Kosten.", duration: "P3D" },
    ],
  },
  fr: {
    sectionLabel: "approche",
    headlinePre: "comment je ",
    headlinePost: "travaille.",
    intro: "Pas de Gantt d'agence, pas de boîte noire. Quatre étapes de la première conversation à la livraison · et une liste honnête de ce que je ne fais volontairement pas.",
    breakText: "et ce que je ne fais pas ↓",
    ctaHeadline: "ça ressemble à ta façon de travailler ?",
    ctaBody: "30 minutes en visio. Pas de présentation, pas de contrat · juste de la clarté.",
    ctaPrimary: "demander un échange →",
    ctaSecondary: "voir les services",
    howTo: {
      name: "Comment se déroule un projet chez lacønis",
      description: "Quatre étapes de la première conversation à la livraison · identique pour web et branding. Processus clair, pas de boîte noire.",
    },
    steps: [
      { name: "Faire connaissance", text: "30 minutes en visio. Je te parle de toi, pas de logos ou de pixels. Ce que tu fais, qui est ta cible, pourquoi maintenant. Ça ne coûte rien et ça clarifie si on s'accorde.", duration: "P1D" },
      { name: "Trouver la direction", text: "Moodboard, structure, tonalité. Je propose 2–3 directions. Tu choisis où on va · avant qu'aucune couleur ou ligne ne soit posée. Comme ça j'évite les impasses et les refontes.", duration: "P1W" },
      { name: "Construire", text: "En web : design et code en parallèle · tu vois des versions cliquables toutes les quelques jours. En branding : première proposition, puis boucles communes jusqu'à ce que ça tienne. Pas de silence de plusieurs semaines.", duration: "P3W" },
      { name: "Livraison", text: "En web : mise en ligne + formation CMS, tu peux gérer toi-même dès jour 1. En branding : tous les fichiers sources, exports prêts à imprimer, mini-manuel. Pas de livraisons en retard, pas de coûts cachés.", duration: "P3D" },
    ],
  },
  en: {
    sectionLabel: "approach",
    headlinePre: "how i ",
    headlinePost: "work.",
    intro: "No agency Gantt chart, no black box. Four steps from first conversation to handover · plus an honest list of what i deliberately don't do.",
    breakText: "and what i don't do ↓",
    ctaHeadline: "sounds like your way of working?",
    ctaBody: "30-minute video call. No presentation, no contract · just clarity.",
    ctaPrimary: "request a chat →",
    ctaSecondary: "see services",
    howTo: {
      name: "How a project runs at lacønis",
      description: "Four steps from first conversation to handover · same for web and branding. Clear process, no black box.",
    },
    steps: [
      { name: "Get to know each other", text: "30-minute video call. I talk with you about you, not logos or pixels. What you do, who your audience is, why now. Costs nothing and brings clarity on whether we fit.", duration: "P1D" },
      { name: "Find the direction", text: "Moodboard, structure, tone. I lay out 2–3 directions. You decide where it goes · before any colour or line is set. Saves dead ends and rework.", duration: "P1W" },
      { name: "Build", text: "Web: design and code in parallel · you see clickable previews every few days. Branding: first draft, then shared loops until it sits. No weeks of radio silence.", duration: "P3W" },
      { name: "Handover", text: "Web: launch + CMS walkthrough, you can edit yourself from day 1. Branding: all source files, print-ready exports, short manual. No late deliveries, no hidden costs.", duration: "P3D" },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ansatz");
}

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: t.sectionLabel, url: `${BASE}${buildPath("ansatz", locale)}` },
        ]}
      />
      <HowToSchema
        name={t.howTo.name}
        description={t.howTo.description}
        totalTime="P6W"
        steps={t.steps}
      />
      {/* HERO */}
      <section className="pt-32 md:pt-36 pb-16 md:pb-20">
        <div className="container-site">
          <SectionLabel num="01">{t.sectionLabel}</SectionLabel>

          <div className="mt-10 max-w-[820px]">
            <h1 className="heading-display text-[clamp(2.25rem,6vw,4.5rem)] text-offwhite leading-[0.98]">
              {t.headlinePre}
              <span className="text-offwhite/35">{t.headlinePost}</span>
            </h1>
            <p className="mt-7 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Unified process · gilt für web + branding */}
      <UnifiedProcess num="02" />

      {/* atmospheric break */}
      <div className="container-site py-2">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(-1deg)" }}>
            {t.breakText}
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      {/* Toggle · manifeste unterscheiden sich zwischen disziplinen */}
      <AnsatzToggle
        num="03"
        web={<WebManifest hideHeader />}
        branding={<Manifest hideHeader />}
      />

      {/* CTA */}
      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              {t.ctaHeadline}
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              {t.ctaBody}
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href={buildPath("kontakt", locale)}
                variant="primary"
                size="lg"
                analyticsLabel="ansatz_final_kontakt"
              >
                {t.ctaPrimary}
              </Button>
              <Button
                href={buildPath("leistungen", locale)}
                variant="glass"
                size="lg"
                analyticsLabel="ansatz_final_leistungen"
              >
                {t.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
