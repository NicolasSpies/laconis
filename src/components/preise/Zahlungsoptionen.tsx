import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Zahlungsoptionen — drei modelle, transparent gelistet. plus hosting-hinweis
 * am fuß (läuft immer über lacønis, jährlich, nicht verhandelbar).
 *
 * Referenz: files/preise_struktur.html · sektion 05
 */

type Modell = {
  num: string;
  titel: string;
  kurz: string;
  details: string[];
  zinsNote?: string;
  highlight?: boolean;
};

const MODELLE: Modell[] = [
  {
    num: "01",
    titel: "komplett bei lieferung",
    kurz: "Einmalig beim Launch.",
    details: [
      "Voller Betrag mit Projekt-Abschluss",
      "Keine Zinsen, keine Teilbeträge",
      "Einfachste Variante · am schnellsten durch",
    ],
    highlight: true,
  },
  {
    num: "02",
    titel: "50% anzahlung + raten",
    kurz: "Hälfte zum Start, Rest in bis zu 5 Raten.",
    details: [
      "50% bei Auftrag",
      "Rest aufgeteilt auf bis zu 5 Monate",
      "Läuft automatisiert · SEPA-Lastschrift oder Überweisung",
    ],
    zinsNote: "2% / monat · gedeckelt bei max 10%",
  },
  {
    num: "03",
    titel: "vollständig in raten",
    kurz: "Kein Startbetrag, gleichmäßig über max. 6 Monate.",
    details: [
      "Ab erstem Monat Raten, bis 6 Monate",
      "Gleichbleibende Monatsrate",
      "Für kleinere Betriebe mit monatlichem Cashflow gedacht",
    ],
    zinsNote: "4% / monat auf laufenden restbetrag",
  },
];

export function Zahlungsoptionen() {
  return (
    <section className="pb-28">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num="05">zahlung</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            so kannst du zahlen.{" "}
            <span className="text-offwhite/35">
              drei wege, offen kommuniziert.
            </span>
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
            Keine „auf Anfrage"-Spielchen bei den Zinsen. Du siehst, was eine
            Rate dich mehr kostet · bevor du fragst. Such dir aus, was zu
            deinem Cashflow passt.
          </p>
        </div>

        {/* MODELS */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {MODELLE.map((m) => (
            <div
              key={m.num}
              className={[
                "relative rounded-2xl p-6 md:p-7 flex flex-col gap-4",
                m.highlight
                  ? "border border-lime/25 bg-gradient-to-b from-lime/[0.03] to-transparent"
                  : "border border-ink/10 bg-ink/[0.015] hover:border-ink/25 transition-colors",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  modell {m.num}
                </span>
                {m.highlight && (
                  <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                    0% zinsen
                  </span>
                )}
              </div>

              <div>
                <h3 className="heading-sans text-[20px] md:text-[22px] text-offwhite">
                  {m.titel}
                </h3>
                <p className="mt-1.5 text-[13px] leading-snug text-offwhite/55">
                  {m.kurz}
                </p>
              </div>

              <ul className="flex flex-col gap-2 flex-1">
                {m.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-offwhite/55"
                  >
                    <span className="text-accent-ink/80 mt-[6px] shrink-0">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                        <circle cx="4" cy="4" r="1.6" fill="currentColor" />
                      </svg>
                    </span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {m.zinsNote && (
                <div className="pt-3 border-t border-ink/10">
                  <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    zinsen
                  </div>
                  <div className="mt-1.5 font-mono text-[11.5px] text-offwhite/75">
                    {m.zinsNote}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* HOSTING NOTE */}
        <div className="mt-6 glass rounded-xl px-5 py-4 flex items-start gap-3 max-w-[820px]">
          <span
            aria-hidden
            className="mt-0.5 font-mono text-[11px] text-accent-ink shrink-0"
          >
            ⓘ
          </span>
          <p className="text-[13px] leading-relaxed text-offwhite/55">
            <span className="text-offwhite/75">Hosting läuft immer über lacønis.</span>{" "}
            Jährlich fakturiert, der Preis wird pro Monat kommuniziert, damit du
            ihn gegen deine laufenden Kosten halten kannst. Das ist kein extra
            Produkt zum Mitverhandeln · es ist Teil vom Service, damit ich
            weiß, dass das Ding läuft.
          </p>
        </div>
      </div>
    </section>
  );
}
