import { SectionLabel } from "@/components/ui/SectionLabel";

const UNTERSCHIEDE = [
  {
    num: "01",
    punkt: "kein code-zugriff · kein export · kein entkommen.",
    detail: "Bei Wix, Squarespace & Co. gehört die Seite dem Anbieter. Preiserhöhung? Insolvenz? Umbau? Du hast keine Karte.",
  },
  {
    num: "02",
    punkt: "templates sehen nach templates aus.",
    detail: "Deine Marke quetscht sich ins vorhandene Raster. Google erkennt das. Besucher auch · sie bleiben kürzer.",
  },
  {
    num: "03",
    punkt: "pagespeed unter 60 kostet dich google-plätze.",
    detail: "Baukästen laden langsam. Das ist kein Zufall, das ist Architektur. Ein lacønis-Projekt startet bei 95+.",
  },
];

export function WebVsAlternatives({ num = "04" }: { num?: string } = {}) {
  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">

        {/* ehrliche frage · direkt */}
        <div className="max-w-[820px]">
          <SectionLabel num={num}>ehrlich gesagt</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            brauchst du mich{" "}
            <span className="italic font-serif text-accent-ink">überhaupt</span>?
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
              Wenn du einen Verein gründest, ein Hobby-Projekt testest oder
              die ersten 50 Kunden suchst · nimm einen Baukasten. 10 € im
              Monat, morgen online, kein Stress.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-offwhite/55 max-w-[400px]">
              Ich sage dir das lieber bevor du buchst, als danach.
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
                dann macht der unterschied sich über jahre bemerkbar.
              </p>

              <div className="mt-8 space-y-6 border-t border-ink/10 pt-6">
                {UNTERSCHIEDE.map((u) => (
                  <div key={u.num} className="grid grid-cols-[28px_1fr] gap-3">
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
              und das spürt man hinterher.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
