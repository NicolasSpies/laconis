import { SectionLabel } from "@/components/ui/SectionLabel";

const UNTERSCHIEDE = [
  {
    num: "01",
    punkt: "ki-logos sind lizenz-grauzone · gehören dir oft nicht.",
    detail:
      "Rechte unklar, Schrift-Lizenz fehlt, Druckerei findet keine Farbprofile. Das merkst du erst, wenn du's wirklich brauchst.",
  },
  {
    num: "02",
    punkt: "template plus ki-logo sieht aus wie alle anderen.",
    detail:
      "Gleiches Raster, gleiches Modell. Der Unterschied zum Wettbewerb bleibt Zufall · und der Wettbewerb weiß das.",
  },
  {
    num: "03",
    punkt: "ohne system zerfällt alles beim zweiten touchpoint.",
    detail:
      "Der Flyer matcht nicht die Website, die Website nicht den Insta-Post. Jedes Update heißt: von vorne.",
  },
];

export function BrandVsAlternatives({
  num = "06",
}: { num?: string } = {}) {
  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        {/* ehrliche frage · direkt */}
        <div className="max-w-[820px]">
          <SectionLabel num={num}>ehrlich gesagt</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            brauchst du mich{" "}
            <span className="italic font-serif text-accent-ink">
              überhaupt
            </span>
            ?
          </h2>
        </div>

        {/* manchmal nicht · zwei-spalter */}
        <div className="mt-14 grid md:grid-cols-[1fr_1.2fr] gap-10 md:gap-16 items-start">
          {/* links · manchmal nicht */}
          <div>
            <p
              className="font-hand text-[22px] md:text-[26px] text-offwhite/50 leading-tight"
              style={{ transform: "rotate(-1deg)" }}
            >
              manchmal nicht. ↓
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-offwhite/55 max-w-[400px]">
              Wenn du einen Verein gründest, ein MVP am Wochenende testest
              oder einfach schnell los willst · nimm Canva, Looka oder einen
              KI-Generator. 0 – 50 €, morgen fertig, kein Stress.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-offwhite/55 max-w-[400px]">
              Ich sag dir das lieber bevor du buchst, als danach.
            </p>
          </div>

          {/* rechts · aber wenn */}
          <div className="relative">
            <div
              className="glass rounded-2xl p-7 md:p-9"
              style={{ transform: "rotate(0.4deg)" }}
            >
              <p className="font-mono text-[10px] uppercase tracking-label text-accent-ink/70">
                aber wenn du eine marke aufbaust ·
              </p>
              <p className="mt-3 heading-display text-[clamp(1.5rem,3vw,2.1rem)] text-offwhite leading-[1.08]">
                dann siehst du den unterschied an jedem touchpoint.
              </p>

              <div className="mt-8 space-y-6 border-t border-ink/10 pt-6">
                {UNTERSCHIEDE.map((u) => (
                  <div
                    key={u.num}
                    className="grid grid-cols-[28px_1fr] gap-3"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30 pt-1">
                      {u.num}
                    </span>
                    <div>
                      <p className="text-[14px] text-offwhite/85 font-medium leading-snug">
                        {u.punkt}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-offwhite/45">
                        {u.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* handwritten margin note */}
            <p
              className="mt-5 font-hand text-[19px] text-offwhite/35 text-right"
              style={{ transform: "rotate(-1.5deg)" }}
            >
              und das sieht man sofort.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
