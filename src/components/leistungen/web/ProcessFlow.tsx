import { SectionLabel } from "@/components/ui/SectionLabel";

const SCHRITTE = [
  {
    num: "01",
    titel: "gespräch",
    kurz: "30 Minuten Video-Call oder Kaffee in Eupen. Kostet nichts, bringt Klarheit.",
    dauer: "~1 tag",
  },
  {
    num: "02",
    titel: "konzept",
    kurz: "Struktur, Tonalität, Moodboard. Bevor eine einzige Pixel-Entscheidung fällt.",
    dauer: "~1 woche",
  },
  {
    num: "03",
    titel: "umsetzung",
    kurz: "Design und Bau parallel. Du siehst Fortschritt alle paar Tage, nicht erst nach sechs Wochen.",
    dauer: "2 bis 5 wochen",
  },
  {
    num: "04",
    titel: "launch",
    kurz: "Live gehen, Einweisung ins CMS, Übergabe. Danach bin ich eine Mail entfernt.",
    dauer: "~2 tage",
  },
];

export function ProcessFlow({ num = "06" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>ablauf</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            vier schritte.{" "}
            <span className="text-offwhite/35">keine blackbox.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            Ich weiß nach Gespräch eins, ob wir zusammenpassen. Du weißt es
            nach Gespräch zwei. Ab dann wird gebaut, nicht verhandelt.
          </p>
        </div>

        {/* Flow */}
        <div className="mt-16 relative">
          {/* vertikale Linie links (mobile) */}
          <div className="absolute left-[14px] top-4 bottom-4 w-px bg-ink/10 md:hidden" />
          {/* horizontale Linie (desktop) */}
          <div className="absolute hidden md:block left-0 right-0 top-[44px] h-px bg-ink/10" />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {SCHRITTE.map((s, i) => (
              <div
                key={s.num}
                className="relative pl-10 md:pl-0 md:pr-6"
              >
                {/* Meilenstein-Punkt */}
                <div className="absolute md:static left-0 top-0 md:mb-6 w-7 h-7 rounded-full bg-dark border border-lime/50 flex items-center justify-center">
                  <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink">
                    {s.num}
                  </span>
                </div>

                <div className="md:mt-8">
                  <h3 className="heading-sans text-[22px] text-offwhite">
                    {s.titel}
                  </h3>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    {s.dauer}
                  </p>
                  <p className="mt-4 text-[13px] leading-relaxed text-offwhite/55 max-w-[280px]">
                    {s.kurz}
                  </p>
                </div>

                {/* Pfeil zu nächstem Schritt (desktop) */}
                {i < SCHRITTE.length - 1 && (
                  <span className="hidden md:inline absolute top-[34px] -right-3 font-mono text-[12px] text-offwhite/35">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
