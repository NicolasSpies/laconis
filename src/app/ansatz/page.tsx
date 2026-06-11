import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GreySection } from "@/components/shared/GreySection";
import { StatementStrip } from "@/components/shared/StatementStrip";
import { AnsatzToggle } from "@/components/ansatz/AnsatzToggle";
import { ProcessSteps } from "@/components/ansatz/ProcessSteps";
import { ChatThread } from "@/components/ansatz/ChatThread";
import { BrandValues } from "@/components/ansatz/BrandValues";
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
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  intro: string;
  processLabel: string;
  marqueeBits: string[];
  ctaHeadline: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  howTo: { name: string; description: string };
  steps: { name: string; text: string; duration: string }[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· ansatz",
    heroL1: "so arbeite",
    heroL2: "ich.",
    heroItalic: "ohne blackbox.",
    intro: "kein agentur-gantt-chart, keine blackbox. vier schritte vom ersten gespräch bis zur übergabe · und eine ehrliche liste von dem, was ich bewusst nicht mache.",
    processLabel: "schritte",
    marqueeBits: ["·", "kennenlernen", "·", "richtung", "·", "bauen", "·", "übergabe", "·", "transparent", "·"],
    ctaHeadline: "klingt nach deiner art zu arbeiten?",
    ctaBody: "30 minuten video-call. keine präsentation, kein vertrag · nur klarheit.",
    ctaPrimary: "gespräch anfragen →",
    ctaSecondary: "leistungen ansehen",
    howTo: {
      name: "So läuft ein Projekt bei laconis ab",
      description: "Vier Schritte vom ersten Gespräch bis zur Übergabe · für Web und Branding identisch. Klarer Prozess, keine Blackbox.",
    },
    steps: [
      { name: "kennenlernen", text: "30 Minuten Video-Call. Ich rede mit dir über dich, nicht über Logos oder Pixel. Was machst du, wer ist die Zielgruppe, warum jetzt. Kostet nichts und bringt Klarheit darüber, ob wir zusammen passen.", duration: "P1D" },
      { name: "richtung finden", text: "Moodboard, Struktur, Tonalität. Ich lege 2–3 Richtungen vor. Du bestimmst, wohin's geht · bevor irgendeine Farbe oder Zeile umgesetzt wird. So vermeide ich Sackgassen und Doppelarbeit.", duration: "P1W" },
      { name: "bauen", text: "Bei Web: Design und Code parallel · du siehst klickbare Vorschau-Versionen alle paar Tage. Bei Branding: erster Entwurf, dann gemeinsame Schleifen bis es sitzt. Keine wochenlange Funkstille.", duration: "P3W" },
      { name: "übergabe", text: "Bei Web: Live-Schaltung + CMS-Einweisung, du kannst von Tag 1 selbst pflegen. Bei Branding: alle Quelldateien, druckfertige Exports, Kurz-Manual. Keine Nachlieferungen, keine versteckten Kosten.", duration: "P3D" },
    ],
  },
  fr: {
    kicker: "· approche",
    heroL1: "comment je",
    heroL2: "travaille.",
    heroItalic: "sans boîte noire.",
    intro: "pas de gantt d'agence, pas de boîte noire. quatre étapes de la première conversation à la livraison · et une liste honnête de ce que je ne fais volontairement pas.",
    processLabel: "étapes",
    marqueeBits: ["·", "rencontre", "·", "direction", "·", "construire", "·", "livraison", "·", "transparent", "·"],
    ctaHeadline: "ça ressemble à ta façon de travailler ?",
    ctaBody: "30 minutes en visio. pas de présentation, pas de contrat · juste de la clarté.",
    ctaPrimary: "demander un échange →",
    ctaSecondary: "voir les services",
    howTo: {
      name: "Comment se déroule un projet chez laconis",
      description: "Quatre étapes de la première conversation à la livraison · identique pour web et branding. Processus clair, pas de boîte noire.",
    },
    steps: [
      { name: "faire connaissance", text: "30 minutes en visio. Je te parle de toi, pas de logos ou de pixels. Ce que tu fais, qui est ta cible, pourquoi maintenant. Ça ne coûte rien et ça clarifie si on s'accorde.", duration: "P1D" },
      { name: "trouver la direction", text: "Moodboard, structure, tonalité. Je propose 2–3 directions. Tu choisis où on va · avant qu'aucune couleur ou ligne ne soit posée. Comme ça j'évite les impasses et les refontes.", duration: "P1W" },
      { name: "construire", text: "En web : design et code en parallèle · tu vois des versions cliquables toutes les quelques jours. En branding : première proposition, puis boucles communes jusqu'à ce que ça tienne. Pas de silence de plusieurs semaines.", duration: "P3W" },
      { name: "livraison", text: "En web : mise en ligne + formation CMS, tu peux gérer toi-même dès jour 1. En branding : tous les fichiers sources, exports prêts à imprimer, mini-manuel. Pas de livraisons en retard, pas de coûts cachés.", duration: "P3D" },
    ],
  },
  en: {
    kicker: "· approach",
    heroL1: "how i",
    heroL2: "work.",
    heroItalic: "no black box.",
    intro: "no agency gantt chart, no black box. four steps from first conversation to handover · plus an honest list of what i deliberately don't do.",
    processLabel: "steps",
    marqueeBits: ["·", "intro", "·", "direction", "·", "build", "·", "handover", "·", "transparent", "·"],
    ctaHeadline: "sounds like your way of working?",
    ctaBody: "30-minute video call. no presentation, no contract · just clarity.",
    ctaPrimary: "request a chat →",
    ctaSecondary: "see services",
    howTo: {
      name: "How a project runs at laconis",
      description: "Four steps from first conversation to handover · same for web and branding. Clear process, no black box.",
    },
    steps: [
      { name: "get to know each other", text: "30-minute video call. I talk with you about you, not logos or pixels. What you do, who your audience is, why now. Costs nothing and brings clarity on whether we fit.", duration: "P1D" },
      { name: "find the direction", text: "Moodboard, structure, tone. I lay out 2–3 directions. You decide where it goes · before any colour or line is set. Saves dead ends and rework.", duration: "P1W" },
      { name: "build", text: "Web: design and code in parallel · you see clickable previews every few days. Branding: first draft, then shared loops until it sits. No weeks of radio silence.", duration: "P3W" },
      { name: "handover", text: "Web: launch + CMS walkthrough, you can edit yourself from day 1. Branding: all source files, print-ready exports, short manual. No late deliveries, no hidden costs.", duration: "P3D" },
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
          { name: "ansatz", url: `${BASE}${buildPath("ansatz", locale)}` },
        ]}
      />
      <HowToSchema
        name={t.howTo.name}
        description={t.howTo.description}
        totalTime="P6W"
        steps={t.steps}
      />

      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2}
        italicAccent={t.heroItalic}
        sub={t.intro}
      />

      {/* CHAT-THREAD opener · existing component */}
      <GreySection tone="grey">
        <ChatThread num="02" />
      </GreySection>

      {/* BRAND-VALUES · 4-wort-anker (tief · klar · ruhig · dein.) */}
      <BrandValues num="03" />

      {/* PROCESS STEPS · scroll-triggered numbers + sticky sidebar */}
      <GreySection tone="grey" tint="lime">
        <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
          · prozess
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[680px]">
          vier schritte · keine zauberei.
        </h2>
        <div className="mt-14">
          <ProcessSteps steps={t.steps} label={t.processLabel} />
        </div>
      </GreySection>

      <StatementStrip items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={40} />

      {/* AnsatzToggle · web vs branding mode */}
      <GreySection tone="grey">
        <AnsatzToggle
          num="04"
          web={<WebManifest hideHeader />}
          branding={<Manifest hideHeader />}
        />
      </GreySection>

      {/* CTA · lila */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "#b084d3" }}
        aria-label={t.ctaHeadline}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-site relative text-center">
          <h2 className="text-[clamp(2rem,6vw,4rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[820px] mx-auto">
            {t.ctaHeadline}
          </h2>
          <p className="mt-6 max-w-[520px] mx-auto text-[15px] leading-relaxed text-[#0a0a0a]/80">
            {t.ctaBody}
          </p>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("leistungen/web", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
