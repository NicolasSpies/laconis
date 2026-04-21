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
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
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

        {/* zwei wege · mit vs-stempel dazwischen */}
        <div className="mt-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
            {OPTIONEN.map((o) => {
              const isAccent = o.akzent === "accent";
              const rotation = isAccent ? "0.9deg" : "-1.4deg";
              return (
                <div
                  key={o.key}
                  className={[
                    "relative group",
                    // laconis-card leicht nach oben versetzt · bisschen prominenter
                    isAccent ? "md:-mt-6" : "md:mt-4",
                  ].join(" ")}
                  style={{ zIndex: isAccent ? 20 : 10 }}
                >
                  {/* handmade "mein platz"-stempel · nur bei laconis */}
                  {isAccent && (
                    <div
                      className="absolute -top-6 md:-top-7 right-6 md:right-10 z-30 pointer-events-none"
                      style={{ transform: "rotate(-8deg)" }}
                    >
                      <span className="font-hand text-[20px] md:text-[22px] text-accent-ink leading-none">
                        mein platz.
                      </span>
                      <svg
                        viewBox="0 0 120 10"
                        className="block w-[100px] md:w-[110px] h-[8px] mt-0.5 text-accent-ink/80"
                        aria-hidden
                      >
                        <path
                          d="M2 6 C 20 2, 40 8, 60 4 S 100 7, 118 3"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}

                  <article
                    className={[
                      "relative liquid-glass-dark rounded-2xl p-8 md:p-10 flex flex-col",
                      "transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50",
                      isAccent ? "liquid-glass-lime-tint" : "",
                    ].join(" ")}
                    style={{ transform: `rotate(${rotation})` }}
                  >
                    <div>
                      <h3 className="heading-sans text-[22px] md:text-[26px] text-offwhite">
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
                  </article>
                </div>
              );
            })}
          </div>

          {/* vs-scribble · zwischen den cards · desktop absolut, mobile versteckt */}
          <div
            aria-hidden
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none items-center justify-center"
          >
            <div className="relative w-[68px] h-[68px] flex items-center justify-center">
              <svg
                viewBox="0 0 80 80"
                className="absolute inset-0 w-full h-full text-offwhite/55"
                aria-hidden
              >
                <path
                  d="M40 6 C 58 8, 74 22, 72 42 C 70 62, 52 74, 34 72 C 16 70, 6 54, 8 36 C 10 20, 22 8, 40 6 Z"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  fill="rgb(var(--bg))"
                  opacity="0.96"
                />
              </svg>
              <span className="relative font-hand text-[22px] text-offwhite/85 -rotate-6">
                vs.
              </span>
            </div>
          </div>
        </div>

        {/* closing · handmade */}
        <div className="mt-20 md:mt-24 max-w-[640px] mx-auto text-center">
          <p
            className="font-hand text-[22px] md:text-[24px] text-offwhite/85 leading-tight -rotate-[0.8deg]"
          >
            und ehrlich ·{" "}
            <span className="text-accent-ink">ich versteh&apos;s</span>.
          </p>
          <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
            Manchmal reicht Template plus KI-Logo völlig, und das ist okay.
            Mir geht&apos;s um Projekte, die passen · das spürt
            man hinterher an jedem Detail.
          </p>
        </div>
      </div>
    </section>
  );
}
