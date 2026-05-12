"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Step = { num: string; titel: string; handNote: string; kurz: string; dauer: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  dauerLabel: string;
  footnote: string;
  steps: Step[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "so läuft's ab",
    h2pre: "vier skizzen.",
    h2post: "vom gespräch bis zur übergabe.",
    intro: "Kein Agentur-Gantt-Chart, kein 42-Seiten-Prozess-Dokument. Vier Schritte · jeder mit einem klaren Ergebnis, bevor der nächste anfängt.",
    dauerLabel: "dauer",
    footnote: "und ja · du darfst jederzeit zurückgehen",
    steps: [
      { num: "01", titel: "kennenlernen", handNote: "wer bist du?", kurz: "Ich rede mit dir über dich, nicht übers Logo. Je ehrlicher, desto besser das Ergebnis.", dauer: "~1 h" },
      { num: "02", titel: "moodboard", handNote: "richtung, nicht lösung", kurz: "3-5 Welten zur Auswahl. Du pickst, was sich anfühlt.", dauer: "~3-5 tage" },
      { num: "03", titel: "entwurf", handNote: "tiefer, nicht breiter", kurz: "Zwei Richtungen, kein 27-Optionen-Schaufenster. Ich geh mit dir in die Substanz.", dauer: "~1-2 wochen" },
      { num: "04", titel: "feinschliff + lieferung", handNote: "du bekommst alles", kurz: "Alle Dateien, Kurz-Manual, Print-ready. Keine Nachlieferungen.", dauer: "~3-5 tage" },
    ],
  },
  fr: {
    sectionLabel: "comment ça se passe",
    h2pre: "quatre esquisses.",
    h2post: "du premier échange à la livraison.",
    intro: "Pas de gantt d'agence, pas de doc-processus de 42 pages. Quatre étapes · chacune avec un résultat clair, avant que la suivante démarre.",
    dauerLabel: "durée",
    footnote: "et oui · tu peux revenir en arrière à tout moment",
    steps: [
      { num: "01", titel: "on fait connaissance", handNote: "tu es qui ?", kurz: "Je te parle de toi, pas du logo. Plus c'est honnête, meilleur le résultat.", dauer: "~1 h" },
      { num: "02", titel: "moodboard", handNote: "direction, pas solution", kurz: "3-5 univers au choix. Tu prends ce qui te parle.", dauer: "~3-5 jours" },
      { num: "03", titel: "esquisse", handNote: "plus profond, pas plus large", kurz: "Deux directions, pas un catalogue de 27 options. Je vais à l'essentiel avec toi.", dauer: "~1-2 semaines" },
      { num: "04", titel: "finitions + livraison", handNote: "tu reçois tout", kurz: "Tous les fichiers, mini-manuel, prêt-à-imprimer. Pas de livraisons en retard.", dauer: "~3-5 jours" },
    ],
  },
  en: {
    sectionLabel: "how it goes",
    h2pre: "four sketches.",
    h2post: "from first chat to handover.",
    intro: "No agency gantt chart, no 42-page process doc. Four steps · each with a clear outcome before the next one starts.",
    dauerLabel: "duration",
    footnote: "and yes · you can step back any time",
    steps: [
      { num: "01", titel: "getting to know you", handNote: "who are you?", kurz: "I talk to you about you, not about the logo. The more honest, the better the result.", dauer: "~1 h" },
      { num: "02", titel: "moodboard", handNote: "direction, not solution", kurz: "3-5 worlds to choose. You pick what feels right.", dauer: "~3-5 days" },
      { num: "03", titel: "sketch", handNote: "deeper, not wider", kurz: "Two directions, not a 27-option shop window. I go into the substance with you.", dauer: "~1-2 weeks" },
      { num: "04", titel: "polish + delivery", handNote: "you get everything", kurz: "All files, short manual, print-ready. No follow-up deliveries.", dauer: "~3-5 days" },
    ],
  },
};

export function SketchProcess({ num = "03" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        <div className="mt-16 relative glass rounded-2xl p-6 md:p-12 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--ink)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink)) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
            {t.steps.map((s, i) => (
              <div key={s.num} className="relative">
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
                      style={{ transform: `rotate(${i * 7 - 10}deg)`, transformOrigin: "center" }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center heading-display text-offwhite text-[22px]">
                    {s.num}
                  </span>
                </div>

                <h3 className="heading-sans mt-5 text-[22px] text-offwhite leading-tight">
                  {s.titel}
                </h3>

                <div className="mt-2 flex items-center gap-2">
                  <ScribbleUnderline />
                  <span className="font-hand text-[18px] text-lime/80 leading-none">
                    {s.handNote}
                  </span>
                </div>

                <p className="mt-4 text-[13px] leading-relaxed text-offwhite/55 max-w-[240px]">
                  {s.kurz}
                </p>

                <p className="mt-4 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                  {t.dauerLabel} · {s.dauer}
                </p>

                {i < t.steps.length - 1 && (
                  <svg
                    className="hidden lg:block absolute top-[26px] -right-5 text-offwhite/25"
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

          <div className="relative mt-12 flex items-center gap-3 text-offwhite/35">
            <svg width="42" height="10" viewBox="0 0 42 10" fill="none" aria-hidden>
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
