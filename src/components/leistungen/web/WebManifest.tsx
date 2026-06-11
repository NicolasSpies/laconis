"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * WebManifest — "was ich nicht mache" für /leistungen/web
 * Personality-statement, mirror zu /branding.
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
    intro: "Vorab ehrlich, was bei mir nicht drin ist. Und was du stattdessen bekommst.",
    zeilen: [
      {
        nicht: "Websites auf brüchigem Brand-Fundament.",
        stattdessen: "Wenn die grafische Linie wackelt, sag ich dir's ehrlich.",
        detail:
          "Eine Website komplett ab null neu bauen · oft sogar mein Lieblings-Szenario. Aber wenn der Brand dahinter schon unklar ist, empfehl ich: Erst die Marke, dann die Seite. Sonst wird nur ein Fundament tapeziert, das nicht hält. Ab und zu geht's in die andere Richtung: Du kommst für die Website, und ich fange mit der Marke an.",
      },
      { nicht: "Keine Baukasten-Templates. (Wix, Jimdo, Squarespace.)", stattdessen: "Jede Seite ein eigenes System, handgeschrieben." },
      { nicht: "Kein WordPress-Plugin-Friedhof.", stattdessen: "Mein eigenes CMS. Gewartet. Keine Updates, die Dinge brechen." },
      { nicht: "Kein Launch ohne 301-Redirects.", stattdessen: "Deine Google-Rankings bleiben, wo sie sind." },
      { nicht: "Keine Seite ohne Test-Domain.", stattdessen: "Du siehst alles vorher auf einer privaten URL." },
      { nicht: "Keine 8-Monats-Wartezeit für eine Landing Page.", stattdessen: "2 bis 8 Wochen. Kalenderwoche, nicht Quartal." },
      { nicht: "Kein Hosting-Lotto bei GoDaddy oder 1&1.", stattdessen: "EU-Server, eigener VPS, DSGVO von Anfang an." },
    ],
  },
  fr: {
    sectionLabel: "manifeste",
    h2pre: "ce que je ",
    h2italic: "ne fais pas",
    h2post: ".",
    intro: "D'emblée honnête, sur ce qui n'est pas dans mon offre. Et ce que tu reçois à la place.",
    zeilen: [
      {
        nicht: "Des sites sur des bases de marque fragiles.",
        stattdessen: "Si la ligne graphique tangue, je te le dis franchement.",
        detail:
          "Reconstruire un site complètement à partir de zéro · souvent mon scénario préféré. Mais si la marque derrière est déjà floue, je recommande : d'abord la marque, puis le site. Sinon on tapisse juste une fondation qui ne tient pas. Parfois c'est l'inverse : tu viens pour le site, et je commence par la marque.",
      },
      { nicht: "Pas de templates de constructeurs. (Wix, Jimdo, Squarespace.)", stattdessen: "Chaque site est un système à part, écrit à la main." },
      { nicht: "Pas de cimetière de plugins WordPress.", stattdessen: "Mon propre CMS. Maintenu. Pas d'updates qui cassent des trucs." },
      { nicht: "Pas de lancement sans redirections 301.", stattdessen: "Tes positions Google restent où elles sont." },
      { nicht: "Pas de site sans domaine de test.", stattdessen: "Tu vois tout avant sur une URL privée." },
      { nicht: "Pas 8 mois d'attente pour une landing page.", stattdessen: "2 à 8 semaines. En semaines, pas en trimestres." },
      { nicht: "Pas de loto-hébergement chez GoDaddy ou 1&1.", stattdessen: "Serveurs UE, VPS propre, RGPD dès le début." },
    ],
  },
  en: {
    sectionLabel: "manifesto",
    h2pre: "what i ",
    h2italic: "don't",
    h2post: " do.",
    intro: "Upfront and honest about what's not on the menu. And what you get instead.",
    zeilen: [
      {
        nicht: "Websites on a wobbly brand foundation.",
        stattdessen: "If the visual line is shaky, i'll tell you straight.",
        detail:
          "Rebuilding a website from scratch · often my favourite scenario. But if the brand behind it is already unclear, i recommend: brand first, then the site. Otherwise you're just wallpapering a foundation that won't hold. Sometimes it goes the other way: you come for the site, and i start with the brand.",
      },
      { nicht: "No drag-and-drop templates. (Wix, Jimdo, Squarespace.)", stattdessen: "Every site its own system, hand-written." },
      { nicht: "No WordPress plugin graveyard.", stattdessen: "My own CMS. Maintained. No updates that break things." },
      { nicht: "No launch without 301 redirects.", stattdessen: "Your Google rankings stay where they are." },
      { nicht: "No site without a staging domain.", stattdessen: "You see everything beforehand on a private URL." },
      { nicht: "No 8-month wait for a landing page.", stattdessen: "2 to 8 weeks. Calendar weeks, not quarters." },
      { nicht: "No hosting lottery at GoDaddy or 1&1.", stattdessen: "EU servers, own VPS, GDPR from day one." },
    ],
  },
};

type WebManifestProps = {
  num?: string;
  hideHeader?: boolean;
};

export function WebManifest({
  num = "08",
  hideHeader = false,
}: WebManifestProps = {}) {
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
                <span className="font-hand text-accent-ink">{t.h2italic}</span>
                {t.h2post}
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
                {t.intro}
              </p>
            </div>
          )}

          {/* RIGHT: Anti-list */}
          <ol className="divide-y divide-ink/10 border-y border-ink/20">
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
