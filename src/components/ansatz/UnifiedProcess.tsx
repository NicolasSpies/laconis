"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * UnifiedProcess — vier-schritte-prozess, gilt für web + branding.
 * Sketchbook-stil: handschriftliche notizen, kringelnummern, pfeile.
 * Unterschiede zwischen den disziplinen im lauftext (bauen-step).
 */

type Step = {
  num: string;
  titel: string;
  handNote: string;
  kurz: string;
  dauer: string;
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  footnote: string;
  steps: Step[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "so läuft's ab",
    h2pre: "vier schritte.",
    h2post: "vom gespräch bis zur übergabe.",
    intro: "Gleicher Rhythmus für Web und Branding. Kein Agentur-Gantt-Chart, kein 42-Seiten-Prozess-Dokument. Jeder Schritt mit klarem Ergebnis, bevor der nächste anfängt.",
    footnote: "und ja · du darfst jederzeit zurückgehen",
    steps: [
      {
        num: "01",
        titel: "kennenlernen",
        handNote: "wer bist du?",
        kurz: "30 Min Video-Call. Ich rede mit dir über dich, nicht übers Logo oder Pixel. Kostet nichts, bringt Klarheit.",
        dauer: "~1 tag",
      },
      {
        num: "02",
        titel: "richtung finden",
        handNote: "tiefer, nicht breiter",
        kurz: "Moodboard, Struktur, Tonalität. Ich leg Richtungen vor · du bestimmst, wohin's geht · bevor irgendeine Farbe oder Zeile umgesetzt wird.",
        dauer: "~1 woche",
      },
      {
        num: "03",
        titel: "bauen",
        handNote: "fortschritt statt blackbox",
        kurz: "Bei Web: Design + Code parallel. Bei Branding: Entwurf + Schleifen. Du siehst was alle paar Tage, nicht erst nach Wochen Stille.",
        dauer: "~2 bis 5 wochen",
      },
      {
        num: "04",
        titel: "übergabe",
        handNote: "du bekommst alles",
        kurz: "Web: Live-Gang + CMS-Einweisung. Branding: alle Dateien, Print-ready-Exports, Kurz-Manual. Keine Nachlieferungen.",
        dauer: "~2-3 tage",
      },
    ],
  },
  fr: {
    sectionLabel: "comment ça se passe",
    h2pre: "quatre étapes.",
    h2post: "du premier échange à la livraison.",
    intro: "Même rythme pour web et branding. Pas de gantt d'agence, pas de doc-processus de 42 pages. Chaque étape avec un résultat clair, avant que la suivante démarre.",
    footnote: "et oui · tu peux revenir en arrière à tout moment",
    steps: [
      {
        num: "01",
        titel: "on fait connaissance",
        handNote: "tu es qui ?",
        kurz: "30 min en visio. Je te parle de toi, pas de logo ni de pixels. Ça coûte rien, ça apporte de la clarté.",
        dauer: "~1 jour",
      },
      {
        num: "02",
        titel: "trouver la direction",
        handNote: "plus profond, pas plus large",
        kurz: "Moodboard, structure, ton. Je propose des directions · tu décides où on va · avant qu'une couleur ou une ligne soit posée.",
        dauer: "~1 semaine",
      },
      {
        num: "03",
        titel: "on construit",
        handNote: "progrès sans boîte noire",
        kurz: "En web : design + code en parallèle. En branding : esquisse + boucles. Tu vois quelque chose tous les quelques jours, pas après des semaines de silence.",
        dauer: "~2 à 5 semaines",
      },
      {
        num: "04",
        titel: "livraison",
        handNote: "tu reçois tout",
        kurz: "Web : mise en ligne + formation CMS. Branding : tous les fichiers, exports prêts à imprimer, mini-manuel. Pas de livraisons en retard.",
        dauer: "~2-3 jours",
      },
    ],
  },
  en: {
    sectionLabel: "how it goes",
    h2pre: "four steps.",
    h2post: "from first chat to handover.",
    intro: "Same rhythm for web and branding. No agency gantt chart, no 42-page process doc. Every step with a clear outcome, before the next one starts.",
    footnote: "and yes · you can step back any time",
    steps: [
      {
        num: "01",
        titel: "getting to know you",
        handNote: "who are you?",
        kurz: "30 min video call. I talk to you about you, not about the logo or pixels. Costs nothing, brings clarity.",
        dauer: "~1 day",
      },
      {
        num: "02",
        titel: "finding the direction",
        handNote: "deeper, not wider",
        kurz: "Moodboard, structure, tone. I put directions on the table · you decide where it goes · before a single colour or line gets built.",
        dauer: "~1 week",
      },
      {
        num: "03",
        titel: "building",
        handNote: "progress, not a blackbox",
        kurz: "For web: design + code in parallel. For branding: sketch + iterations. You see something every few days, not after weeks of silence.",
        dauer: "~2 to 5 weeks",
      },
      {
        num: "04",
        titel: "handover",
        handNote: "you get it all",
        kurz: "Web: go-live + CMS training. Branding: all files, print-ready exports, short manual. No follow-up deliveries.",
        dauer: "~2-3 days",
      },
    ],
  },
};

export function UnifiedProcess({
  num = "02",
}: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">
              {t.h2post}
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        {/* Sketchbook-block · ohne grid-rauschen, fokus auf inhalt */}
        <div className="mt-14 md:mt-16 relative glass rounded-2xl p-6 md:p-10 lg:p-12 overflow-hidden">
          {/* dezenter lime-glow oben rechts, atmosphäre statt struktur */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl"
            style={{ background: "rgb(var(--accent) / 0.04)" }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4">
            {t.steps.map((s, i) => (
              <div key={s.num} className="relative">
                {/* handgezeichnete nummer mit kringel */}
                <div className="relative inline-flex items-center justify-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    className="text-lime/80"
                    aria-hidden
                  >
                    <path
                      d="M 32 6 C 48 6 58 16 58 32 C 58 48 48 58 32 58 C 16 58 6 48 6 32 C 6 16 16 6 32 6 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="160"
                      strokeDashoffset="2"
                      style={{
                        transform: `rotate(${i * 7 - 10}deg)`,
                        transformOrigin: "center",
                      }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center heading-display text-offwhite text-[22px]">
                    {s.num}
                  </span>
                </div>

                {/* title */}
                <h3 className="heading-sans mt-5 text-[22px] text-offwhite leading-tight">
                  {s.titel}
                </h3>

                {/* handschriftliche notiz */}
                <div className="mt-2 flex items-center gap-2">
                  <ScribbleUnderline />
                  <span className="font-hand text-[18px] text-lime/80 leading-none">
                    {s.handNote}
                  </span>
                </div>

                {/* beschreibung · besserer kontrast */}
                <p className="mt-4 text-[13.5px] leading-relaxed text-offwhite/75 max-w-[260px]">
                  {s.kurz}
                </p>

                <p className="mt-4 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  {locale === "fr" ? "durée" : locale === "en" ? "duration" : "dauer"} · {s.dauer}
                </p>

                {/* handgezeichneter pfeil zum nächsten step (nur desktop) */}
                {i < t.steps.length - 1 && (
                  <svg
                    className="hidden lg:block absolute top-[26px] -right-5 text-offwhite/35"
                    width="24"
                    height="16"
                    viewBox="0 0 24 16"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M 1 8 Q 8 5, 16 8 T 22 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 18 4 L 22 8 L 18 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Fußnote — handschriftlicher zusatz */}
          <div className="relative mt-10 md:mt-12 flex items-center gap-3 text-offwhite/35">
            <svg
              width="42"
              height="10"
              viewBox="0 0 42 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M 2 5 Q 6 1, 10 5 T 18 5 T 26 5 T 34 5 T 40 5"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <span className="font-hand text-[16px] text-offwhite/55">
              {t.footnote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScribbleUnderline() {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill="none"
      className="text-lime/50"
      aria-hidden
    >
      <path
        d="M 1 5 Q 4 1, 7 5 T 13 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
