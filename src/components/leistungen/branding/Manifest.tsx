"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * Manifest — "was ich nicht mache"
 * Ehrliche anti-liste, direkt unter hero. setzt tonalität für die ganze seite.
 */

type Zeile = {
  nicht: string;
  stattdessen: string;
  detail?: string;
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2italic: string;
  h2post: string;
  intro: string;
  zeilen: Zeile[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "manifest",
    h2pre: "was ich ",
    h2italic: "nicht",
    h2post: " mache.",
    intro: "Vorab ehrlich, was bei mir nicht drin ist. Damit später keine Überraschungen kommen.",
    zeilen: [
      {
        nicht: "Auf fremden Branding-Systemen aufsetzen.",
        stattdessen: "Ich starte einmal bei null. Danach bist du drin für alles.",
        detail:
          "Kein Snobismus. Wenn ich die Marke nicht selbst gebaut hab, kenn ich die Regeln dahinter nicht. Und ohne die Regeln wird's nie richtig gut. Bin ich aber von Anfang an dabei, läuft später alles easy. Broschüre, Card, Roll-up, Social-Kit · ich hab die Linie im Kopf. Websites sind die Ausnahme. Die bau ich auch von null neu.",
      },
      { nicht: "Keine 27 Logo-Optionen im ersten Entwurf.", stattdessen: "Zwei Richtungen. Tiefer statt breiter." },
      { nicht: "Keine Canva-Templates mit deinem Namen drübergebügelt.", stattdessen: "Ein eigenes System, keine geliehene Hülle." },
      { nicht: "Kein Trend-Chasing, das 2027 schon alt aussieht.", stattdessen: "Marken, die altern dürfen, ohne peinlich zu werden." },
      { nicht: "Keine Preisverhandlung per WhatsApp um 23 Uhr.", stattdessen: "Ein Telefonat. Klare Zahl." },
      { nicht: "Kein ‚ist doch nur ein Logo'.", stattdessen: "Es ist die Tür zu allem, was danach kommt." },
      { nicht: "Kein Design ohne Recherche.", stattdessen: "Erst fragen, dann zeichnen." },
    ],
  },
  fr: {
    sectionLabel: "manifeste",
    h2pre: "ce que je ",
    h2italic: "ne fais pas",
    h2post: ".",
    intro: "D'emblée honnête, sur ce qui n'est pas dans mon offre. Pour qu'il n'y ait pas de surprises plus tard.",
    zeilen: [
      {
        nicht: "Travailler sur des systèmes de marque d'autres.",
        stattdessen: "Je pars une fois de zéro. Après tu m'as pour tout.",
        detail:
          "Pas du snobisme. Si je n'ai pas construit la marque moi-même, j'en connais pas les règles. Et sans les règles, ça sera jamais vraiment bon. Mais si je suis là depuis le début, tout roule ensuite. Brochure, carte, roll-up, kit social · j'ai la ligne en tête. Les sites web sont l'exception. Ceux-là aussi je les construis de zéro.",
      },
      { nicht: "Pas 27 options de logo dans le premier rendu.", stattdessen: "Deux directions. Plus profond, pas plus large." },
      { nicht: "Pas de templates Canva avec ton nom collé dessus.", stattdessen: "Un système à toi, pas une coquille empruntée." },
      { nicht: "Pas de course aux tendances qui aura l'air vieux en 2027.", stattdessen: "Des marques qui ont le droit de vieillir sans devenir gênantes." },
      { nicht: "Pas de négo de prix par WhatsApp à 23h.", stattdessen: "Un coup de fil. Un chiffre clair." },
      { nicht: "Pas de 'c'est juste un logo'.", stattdessen: "C'est la porte vers tout ce qui suit." },
      { nicht: "Pas de design sans recherche.", stattdessen: "D'abord poser des questions, ensuite dessiner." },
    ],
  },
  en: {
    sectionLabel: "manifesto",
    h2pre: "what i ",
    h2italic: "don't",
    h2post: " do.",
    intro: "Upfront and honest about what's not on the menu. So there are no surprises later.",
    zeilen: [
      {
        nicht: "Building on other people's brand systems.",
        stattdessen: "I start once at zero. After that you've got me for everything.",
        detail:
          "Not snobbery. If i didn't build the brand myself, i don't know the rules behind it. And without the rules, it never gets really good. But if i'm in from the start, everything runs easy later. Brochure, card, roll-up, social kit · i've got the line in my head. Websites are the exception. Those i also build from scratch.",
      },
      { nicht: "No 27 logo options in the first draft.", stattdessen: "Two directions. Deeper, not wider." },
      { nicht: "No Canva templates with your name slapped on top.", stattdessen: "Your own system, not a borrowed shell." },
      { nicht: "No trend-chasing that'll look dated by 2027.", stattdessen: "Brands that get to age without becoming embarrassing." },
      { nicht: "No price haggling via WhatsApp at 11pm.", stattdessen: "One phone call. A clear number." },
      { nicht: "No 'it's just a logo'.", stattdessen: "It's the door to everything that comes after." },
      { nicht: "No design without research.", stattdessen: "Ask first, then draw." },
    ],
  },
};

type ManifestProps = {
  num?: string;
  hideHeader?: boolean;
};

export function Manifest({
  num = "05",
  hideHeader = false,
}: ManifestProps = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <div
          className={
            hideHeader
              ? "max-w-[880px] mx-auto"
              : "grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20"
          }
        >
          {/* LEFT: Intro (verstecken wenn im toggle-kontext) */}
          {!hideHeader && (
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
              <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
                {t.h2pre}
                <span className="italic font-serif text-accent-ink">{t.h2italic}</span>
                {t.h2post}
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
                {t.intro}
              </p>
            </div>
          )}

          {/* RIGHT: Anti-list */}
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {t.zeilen.map((z, i) => (
              <li
                key={i}
                className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="heading-sans text-[clamp(1.15rem,2vw,1.5rem)] text-offwhite/35 line-through decoration-[1px] decoration-offwhite/25">
                    {z.nicht}
                  </p>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-accent-ink">
                    → {z.stattdessen}
                  </p>
                  {z.detail && (
                    <p className="mt-3 max-w-[560px] text-[13px] leading-relaxed text-offwhite/55">
                      {z.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
