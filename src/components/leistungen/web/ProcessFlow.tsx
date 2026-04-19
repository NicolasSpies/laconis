import { SectionLabel } from "@/components/ui/SectionLabel";

const SCHRITTE = [
  {
    num: "01",
    titel: "gespräch",
    kurz: "30 minuten video-call oder kaffee in eupen. kostet nichts, bringt klarheit.",
    dauer: "~1 tag",
  },
  {
    num: "02",
    titel: "konzept",
    kurz: "struktur, tonalität, moodboard. bevor eine einzige pixel-entscheidung fällt.",
    dauer: "~1 woche",
  },
  {
    num: "03",
    titel: "umsetzung",
    kurz: "design und bau parallel. du siehst fortschritt alle paar tage, nicht erst nach sechs wochen.",
    dauer: "2 bis 5 wochen",
  },
  {
    num: "04",
    titel: "launch",
    kurz: "live gehen, einweisung ins CMS, übergabe. danach bin ich eine mail entfernt.",
    dauer: "~2 tage",
  },
];

export function ProcessFlow() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num="10">ablauf</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            vier schritte.{" "}
            <span className="text-offwhite/35">keine blackbox.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/60">
            ich weiss nach gespräch eins, ob wir zusammenpassen. du weisst es
            nach gespräch zwei. ab dann bauen wir, nicht verhandeln.
          </p>
        </div>

        {/* Flow */}
        <div className="mt-16 relative">
          {/* vertikale Linie links (mobile) */}
          <div className="absolute left-[14px] top-4 bottom-4 w-px bg-ink/8 md:hidden" />
          {/* horizontale Linie (desktop) */}
          <div className="absolute hidden md:block left-0 right-0 top-[44px] h-px bg-ink/8" />

          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {SCHRITTE.map((s, i) => (
              <div
                key={s.num}
                className="relative pl-10 md:pl-0 md:pr-6"
              >
                {/* Meilenstein-Punkt */}
                <div className="absolute md:static left-0 top-0 md:mb-6 w-7 h-7 rounded-full bg-black border border-lime/50 flex items-center justify-center">
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
                  <p className="mt-4 text-[13px] leading-relaxed text-offwhite/60 max-w-[280px]">
                    {s.kurz}
                  </p>
                </div>

                {/* Pfeil zu nächstem Schritt (desktop) */}
                {i < SCHRITTE.length - 1 && (
                  <span className="hidden md:inline absolute top-[34px] -right-3 font-mono text-[12px] text-offwhite/30">
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
