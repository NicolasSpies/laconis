import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BrandVsAlternatives — ehrliche selbsteinordnung
 * Canva / KI-Logo / Agency / Laconis. Wer passt wann.
 */

type Option = {
  key: string;
  titel: string;
  preis: string;
  gut: string[];
  schlecht: string[];
  wannSinnvoll: string;
  akzent: "muted" | "accent";
};

const OPTIONEN: Option[] = [
  {
    key: "canva",
    titel: "canva-template",
    preis: "0 – 12 € / monat",
    gut: [
      "in 20 min einen post raus",
      "kein designer nötig",
      "reicht für nebenbei-kram",
    ],
    schlecht: [
      "sieht aus wie alle anderen",
      "keine farbprofile für print",
      "zerfällt ab 3 touchpoints",
    ],
    wannSinnvoll: "schneller insta-post, interner flyer, weihnachtskarte.",
    akzent: "muted",
  },
  {
    key: "ki",
    titel: "chatgpt / ki-logo-generator",
    preis: "20 – 50 € einmalig",
    gut: [
      "10 vorschläge in minuten",
      "gut für erste ideen",
      "billig",
    ],
    schlecht: [
      "keine rechte am ergebnis (oft)",
      "kein system drumherum",
      "niemand fragt dich, was du eigentlich brauchst",
    ],
    wannSinnvoll: "pop-up-projekt, teste-deine-idee-am-wochenende, mvp.",
    akzent: "muted",
  },
  {
    key: "laconis",
    titel: "laconis",
    preis: "1,5 – 6 k € einmalig",
    gut: [
      "recherche vor design",
      "system, nicht einzelteile",
      "ein gesprächspartner — jahrelang",
    ],
    schlecht: [
      "nicht für ‚heute bitte fertig'",
      "nicht für 50 € gesamtbudget",
      "nur 4–6 projekte pro jahr",
    ],
    wannSinnvoll:
      "marke soll bleiben. in 2 jahren noch gut aussehen. sich vom wettbewerb absetzen.",
    akzent: "accent",
  },
  {
    key: "agency",
    titel: "agency 20k€+",
    preis: "15 – 80 k €",
    gut: [
      "großes team, viel specialisten",
      "9-monate-strategie mit research",
      "skaliert für konzerne",
    ],
    schlecht: [
      "du bist nie wichtigster kunde",
      "20 juniors + ein partner für dich",
      "oft overkill unter 3 mio umsatz",
    ],
    wannSinnvoll:
      "internationaler rollout, börsengang, 100+ mitarbeiter.",
    akzent: "muted",
  },
];

export function BrandVsAlternatives() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num="07">einordnung</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            brauchst du mich{" "}
            <span className="italic font-serif text-accent-ink">überhaupt</span>
            ?
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/60">
            ehrliche antwort: nicht immer. hier vier wege zu einem logo und
            einer marke — mit dem, was sie wirklich können und wo sie
            aussteigen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {OPTIONEN.map((o) => {
            const isAccent = o.akzent === "accent";
            return (
              <div
                key={o.key}
                className={[
                  "relative rounded-2xl border p-7 flex flex-col",
                  isAccent
                    ? "border-lime/40 bg-lime/[0.04]"
                    : "border-ink/10 bg-ink/[0.02]",
                ].join(" ")}
              >
                {isAccent && (
                  <span className="absolute -top-2.5 left-6 inline-flex items-center rounded-full bg-lime text-[#111] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-mono">
                    mein platz
                  </span>
                )}

                <div>
                  <h3 className="heading-sans text-[18px] text-offwhite">
                    {o.titel}
                  </h3>
                  <p className="mt-1.5 font-mono text-[11px] uppercase tracking-mono text-offwhite/45">
                    {o.preis}
                  </p>
                </div>

                {/* GUT */}
                <div className="mt-6">
                  <p className="font-mono text-[9.5px] uppercase tracking-mono text-accent-ink/80">
                    gut für
                  </p>
                  <ul className="mt-3 space-y-2">
                    {o.gut.map((g, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[13px] leading-snug text-offwhite/75"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] h-[3px] w-[8px] rounded-full bg-accent-ink shrink-0"
                        />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SCHLECHT */}
                <div className="mt-5">
                  <p className="font-mono text-[9.5px] uppercase tracking-mono text-offwhite/35">
                    nicht gut für
                  </p>
                  <ul className="mt-3 space-y-2">
                    {o.schlecht.map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[13px] leading-snug text-offwhite/45"
                      >
                        <span
                          aria-hidden
                          className="mt-[9px] h-[3px] w-[8px] rounded-full bg-offwhite/20 shrink-0"
                        />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WANN SINNVOLL */}
                <div className="mt-6 pt-5 border-t border-ink/8">
                  <p className="font-mono text-[9.5px] uppercase tracking-mono text-offwhite/35">
                    wann sinnvoll
                  </p>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-offwhite/55">
                    {o.wannSinnvoll}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 max-w-[680px] text-[13px] leading-relaxed text-offwhite/45">
          wenn canva oder ki für dich passt —{" "}
          <span className="text-offwhite/70">nimm das.</span> ich will nicht
          dein geld, ich will die projekte, bei denen's sinn ergibt.
        </p>
      </div>
    </section>
  );
}
