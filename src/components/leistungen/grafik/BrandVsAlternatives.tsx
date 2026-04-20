import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BrandVsAlternatives — ehrliche selbsteinordnung, zwei wege.
 * Block A: selbermachen (tools, ki, templates) — abstrakt, ohne markennamen.
 * Block B: lacønis.
 */

type Option = {
  key: string;
  titel: string;
  unter: string;
  preis: string;
  gut: string[];
  schlecht: string[];
  wannSinnvoll: string;
  akzent: "muted" | "accent";
};

const OPTIONEN: Option[] = [
  {
    key: "diy",
    titel: "selbermachen",
    unter: "Templates · KI-Tools · Online-Generatoren",
    preis: "0 – 200 € / einmalig oder monatlich",
    gut: [
      "Schnell: in Minuten bis Stunden fertig",
      "Günstig, kein Budget für Profi nötig",
      "Für Nebenbei-Kram oder erste Tests völlig ok",
    ],
    schlecht: [
      "Sieht aus wie tausend andere · gleiches Template, gleiches KI-Modell",
      "KI-Logos gehören dir oft nicht · Lizenz-Grauzone, Schriften unklar",
      "Druckerei lehnt deine Dateien ab · kein CMYK, keine Farbprofile, keine Beschnitte",
      "Kein System · der Flyer matcht nicht der Website, Website nicht dem Insta",
      "Keine Strategie, nur Optik. Der Unterschied zur Konkurrenz bleibt Zufall",
      "Du baust dich in eine Ecke · jedes Update heißt von vorne anfangen",
      "Die Lücken merkst du erst, wenn's richtig drauf ankommt",
    ],
    wannSinnvoll:
      "Schneller Insta-Post, interner Flyer, Weihnachtskarte, MVP-Test am Wochenende.",
    akzent: "muted",
  },
  {
    key: "laconis",
    titel: "lacønis",
    unter: "Recherche · System · langfristig",
    preis: "1,5 – 6 k € einmalig",
    gut: [
      "Recherche vor Design · ich frag, was du brauchst, bevor ich was zeichne",
      "Ein komplettes System · Logo, Farben, Typo, Anwendungen, alles im gleichen Look",
      "Druckfertige Dateien · CMYK + RGB, Farbprofile, Beschnitte. Druckerei freut sich",
      "Du besitzt alles · Rechte, Schriften-Lizenzen, offene Dateien, für immer deins",
      "Strategie vor Optik · du hebst dich wirklich ab, nicht nur oberflächlich",
      "Design mit Halbwertszeit · sieht in 5 Jahren noch gut aus, keine Trend-Jagd",
      "Werkzeug-Kasten inklusive · Vorlagen für Social, Briefpapier, Slides. Nutzbar ohne mich",
      "Ein Gesprächspartner, jahrelang erreichbar · keine Agentur-Hotline, keine Tickets",
    ],
    schlecht: [
      "Nicht für „morgen bitte fertig“",
      "Nicht für 50-€-Gesamtbudget",
      "Braucht Zeit · weil's durchdacht ist, nicht schnell-schnell aus der Schublade",
    ],
    wannSinnvoll:
      "Deine Marke soll bleiben. In 2 Jahren noch gut aussehen. Sich vom Wettbewerb absetzen.",
    akzent: "accent",
  },
];

export function BrandVsAlternatives({
  num = "04",
}: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num={num}>einordnung</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            brauchst du mich{" "}
            <span className="italic font-serif text-accent-ink">überhaupt</span>
            ?
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
            Ehrliche Antwort: nicht immer. Grob gibt&apos;s zwei Wege zu einer
            Marke · der schnelle über Tools und der langsame über einen Kopf.
            Hier was beide gut können und wo sie aussteigen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5">
          {OPTIONEN.map((o) => {
            const isAccent = o.akzent === "accent";
            return (
              <div
                key={o.key}
                className={[
                  "relative liquid-glass rounded-2xl p-8 md:p-10 flex flex-col",
                  isAccent ? "liquid-glass-lime-tint" : "",
                ].join(" ")}
              >
                {isAccent && (
                  <span className="absolute -top-2.5 left-8 inline-flex items-center rounded-full bg-lime text-[#111] px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-mono">
                    mein platz
                  </span>
                )}

                <div>
                  <h3 className="heading-sans text-[22px] md:text-[24px] text-offwhite">
                    {o.titel}
                  </h3>
                  <p className="mt-1 text-[13px] text-offwhite/55">
                    {o.unter}
                  </p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-mono text-offwhite/55">
                    {o.preis}
                  </p>
                </div>

                {/* GUT */}
                <div className="mt-7">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-accent-ink/80">
                    gut für
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {o.gut.map((g, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[13.5px] leading-snug text-offwhite/75"
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
                  <p className="font-mono text-[10px] uppercase tracking-mono text-offwhite/35">
                    nicht gut für
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {o.schlecht.map((s, i) => (
                      <li
                        key={i}
                        className="flex gap-2.5 text-[13.5px] leading-snug text-offwhite/55"
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
                <div className="mt-7 pt-5 border-t border-ink/10">
                  <p className="font-mono text-[10px] uppercase tracking-mono text-offwhite/35">
                    wann sinnvoll
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55">
                    {o.wannSinnvoll}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 max-w-[640px] mx-auto text-center">
          <p className="text-[14.5px] md:text-[15px] leading-relaxed text-offwhite/55">
            Und ehrlich ·{" "}
            <span className="italic font-serif text-accent-ink">
              ich versteh&apos;s
            </span>
            . Manchmal reicht Template plus KI-Logo völlig, und das ist okay.
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-offwhite/55">
            Mir geht&apos;s um Projekte, die für uns beide passen. Das spürt
            man hinterher an jedem Detail.
          </p>
        </div>
      </div>
    </section>
  );
}
