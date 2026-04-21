import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * SketchProcess — handgezeichnete prozess-darstellung.
 * Keine boxen, kein corporate-step-layout. ein skizzen-block, der
 * wirkt wie aus dem design-tagebuch · mit handschriftlichen
 * annotationen, pfeilen und nummern.
 */

const STEPS = [
  {
    num: "01",
    titel: "kennenlernen",
    handNote: "wer bist du?",
    kurz: "Ich rede mit dir über dich, nicht übers Logo. Je ehrlicher, desto besser das Ergebnis.",
    dauer: "~1 h",
  },
  {
    num: "02",
    titel: "moodboard",
    handNote: "richtung, nicht lösung",
    kurz: "3-5 Welten zur Auswahl. Du pickst, was sich anfühlt.",
    dauer: "~3-5 tage",
  },
  {
    num: "03",
    titel: "entwurf",
    handNote: "tiefer, nicht breiter",
    kurz: "Zwei Richtungen, kein 27-Optionen-Schaufenster. Ich geh mit dir in die Substanz.",
    dauer: "~1-2 wochen",
  },
  {
    num: "04",
    titel: "feinschliff + lieferung",
    handNote: "du bekommst alles",
    kurz: "Alle Dateien, Kurz-Manual, Print-ready. Keine Nachlieferungen.",
    dauer: "~3-5 tage",
  },
];

export function SketchProcess({ num = "03" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>so läuft&apos;s ab</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            vier skizzen.{" "}
            <span className="text-offwhite/35">vom gespräch bis zur übergabe.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            Kein Agentur-Gantt-Chart, kein 42-Seiten-Prozess-Dokument. Vier
            Schritte · jeder mit einem klaren Ergebnis, bevor der nächste
            anfängt.
          </p>
        </div>

        {/* sketchbook */}
        <div className="mt-16 relative glass rounded-2xl p-6 md:p-12 overflow-hidden">
          {/* papier-grid subtiler background */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgb(var(--ink)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink)) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-4">
            {STEPS.map((s, i) => (
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
                      style={{ transform: `rotate(${i * 7 - 10}deg)`, transformOrigin: "center" }}
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

                <p className="mt-4 text-[13px] leading-relaxed text-offwhite/55 max-w-[240px]">
                  {s.kurz}
                </p>

                <p className="mt-4 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                  dauer · {s.dauer}
                </p>

                {/* handgezeichneter pfeil zum nächsten step (nur desktop) */}
                {i < STEPS.length - 1 && (
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

          {/* mini footer-scribble */}
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
              und ja · du darfst jederzeit zurückgehen
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
