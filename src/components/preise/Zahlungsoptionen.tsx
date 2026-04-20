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
    kurz: "einmalig beim launch.",
    details: [
      "voller betrag mit projekt-abschluss",
      "keine zinsen, keine teilbeträge",
      "einfachste variante • am schnellsten durch",
    ],
    highlight: true,
  },
  {
    num: "02",
    titel: "50% anzahlung + raten",
    kurz: "hälfte zum start, rest in bis zu 5 raten.",
    details: [
      "50% bei auftrag",
      "rest aufgeteilt auf bis zu 5 monate",
      "läuft automatisiert • SEPA-lastschrift oder überweisung",
    ],
    zinsNote: "2% / monat · gedeckelt bei max 10%",
  },
  {
    num: "03",
    titel: "vollständig in raten",
    kurz: "kein startbetrag, gleichmäßig über max 6 monate.",
    details: [
      "ab erstem monat raten, bis 6 monate",
      "gleichbleibende monatsrate",
      "für kleinere betriebe mit monatlichem cashflow gedacht",
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
            keine „auf anfrage"-spielchen bei den zinsen. du siehst, was eine
            rate dich mehr kostet • bevor du fragst. such dir aus, was zu
            deinem cashflow passt.
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
        <div className="mt-6 rounded-xl border border-ink/10 bg-ink/[0.015] px-5 py-4 flex items-start gap-3 max-w-[820px]">
          <span
            aria-hidden
            className="mt-0.5 font-mono text-[11px] text-accent-ink shrink-0"
          >
            ⓘ
          </span>
          <p className="text-[13px] leading-relaxed text-offwhite/55">
            <span className="text-offwhite/75">hosting läuft immer über lacønis.</span>{" "}
            jährlich fakturiert, der preis wird pro monat kommuniziert damit du
            ihn gegen deine laufenden kosten halten kannst. das ist kein extra
            produkt zum mitverhandeln • es ist teil vom service, damit ich
            weiß, dass das ding läuft.
          </p>
        </div>
      </div>
    </section>
  );
}
