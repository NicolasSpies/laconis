import Link from "next/link";

/**
 * StaerkenStrip — 3-punkt teaser für die leistungs-subpages.
 * kurze erinnerung was mich ausmacht, mit link auf /ueber-mich für die lange version.
 */

type Staerke = {
  num: string;
  titel: string;
  unter: string;
};

const STAERKEN: Staerke[] = [
  {
    num: "01",
    titel: "alles aus einem kopf",
    unter: "Design & Code · kein Handoff, keine verlorene Übersetzung.",
  },
  {
    num: "02",
    titel: "eigenes system",
    unter: "Keine Templates, kein Baukasten · auf deine Marke zugeschnitten.",
  },
  {
    num: "03",
    titel: "bleibt danach",
    unter: "Ein Gesprächspartner, jahrelang erreichbar · nicht abtauchen nach Launch.",
  },
];

export function StaerkenStrip() {
  return (
    <section className="pb-24 md:pb-32">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {STAERKEN.map((s) => (
            <div
              key={s.num}
              className="flex flex-col gap-3 pt-5 border-t border-ink/10"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                · {s.num}
              </span>
              <h3 className="heading-sans text-[18px] md:text-[20px] text-offwhite leading-tight">
                {s.titel}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-offwhite/55">
                {s.unter}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/ueber-mich"
            className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
          >
            mehr über mich →
          </Link>
        </div>
      </div>
    </section>
  );
}
