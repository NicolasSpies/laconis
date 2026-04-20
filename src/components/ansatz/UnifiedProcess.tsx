import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * UnifiedProcess — vier-schritte-prozess, gilt für web + grafik.
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

const STEPS: Step[] = [
  {
    num: "01",
    titel: "kennenlernen",
    handNote: "wer bist du?",
    kurz: "30 min call oder kaffee in eupen. wir reden über dich, nicht übers logo oder pixel. kostet nichts, bringt klarheit.",
    dauer: "~1 tag",
  },
  {
    num: "02",
    titel: "richtung finden",
    handNote: "tiefer, nicht breiter",
    kurz: "moodboard, struktur, tonalität. wir picken gemeinsam wohin's geht · bevor irgendeine farbe oder zeile umgesetzt wird.",
    dauer: "~1 woche",
  },
  {
    num: "03",
    titel: "bauen",
    handNote: "fortschritt statt blackbox",
    kurz: "bei web: design + code parallel. bei grafik: entwurf + schleifen. du siehst was alle paar tage, nicht erst nach wochen stille.",
    dauer: "~2 bis 5 wochen",
  },
  {
    num: "04",
    titel: "übergabe",
    handNote: "du bekommst alles",
    kurz: "web: live-gang + cms-einweisung. grafik: alle dateien, print-ready-exports, kurz-manual. keine nachlieferungen.",
    dauer: "~2-3 tage",
  },
];

export function UnifiedProcess({
  num = "02",
}: { num?: string } = {}) {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num={num}>so läuft&apos;s ab</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            vier schritte.{" "}
            <span className="text-offwhite/35">
              vom gespräch bis zur übergabe.
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            gleicher rhythmus für web und grafik. kein agentur-gantt-chart,
            kein 42-seiten-prozess-dokument. jeder schritt mit klarem ergebnis,
            bevor der nächste anfängt.
          </p>
        </div>

        {/* Sketchbook-block · ohne grid-rauschen, fokus auf inhalt */}
        <div className="mt-14 md:mt-16 relative rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.025] to-transparent p-6 md:p-10 lg:p-12 overflow-hidden">
          {/* dezenter lime-glow oben rechts, atmosphäre statt struktur */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-lime/[0.04] blur-3xl"
          />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4">
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
                  dauer · {s.dauer}
                </p>

                {/* handgezeichneter pfeil zum nächsten step (nur desktop) */}
                {i < STEPS.length - 1 && (
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
