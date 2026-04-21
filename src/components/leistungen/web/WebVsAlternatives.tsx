import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebVsAlternatives — ehrliche einordnung, zwei wege.
 * Block A: selbermachen / baukasten (abstrakt, ohne markennamen).
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
    unter: "Baukasten · Templates · Drag-and-Drop-Editoren",
    preis: "10 – 100 € / Monat",
    gut: [
      "In ein paar Stunden online",
      "Kein Code, kein Tech-Wissen nötig",
      "Reicht für Vereine, Hobbyprojekte, Pop-ups",
    ],
    schlecht: [
      "Sieht aus wie tausend andere Seiten · deine Marke quetscht sich ins Template",
      "Lahm · Lighthouse oft unter 60, Google mag's nicht, Besucher auch nicht",
      "SEO-Fundament fehlt · keine saubere Struktur, kein Schema, kein Sitemap-Control",
      "Du gehörst dem Anbieter · bei Preiserhöhung, Insolvenz oder Umbau ist die Seite weg",
      "Kein Code-Zugriff, kein Export · Umzug später ist die Hölle",
      "Jeder Plugin- oder Anbieter-Fehler legt deine Seite lahm · du kannst nichts machen",
      "Responsive nur halbgar · auf dem Handy bricht das Layout gern mal",
    ],
    wannSinnvoll:
      "Vereinsseite, Nebenprojekt, erste Landingpage für einen Test.",
    akzent: "muted",
  },
  {
    key: "laconis",
    titel: "lacønis",
    unter: "Handgeschrieben · schnell · eigenes System",
    preis: "3 – 15 k € einmalig",
    gut: [
      "Eigenes System · jede Zeile verstanden, ich kann jeden Bug selber fixen",
      "Pagespeed 95+ out of the box · schnell auf allen Geräten, auch mit Mobilfunk",
      "SEO-Fundament von Anfang an · sauberes HTML, Schema.org, Sitemaps, Alt-Texte",
      "Du besitzt den Code · exportierbar, umziehbar, für immer deins",
      "Eigenes CMS optional · Inhalte selber pflegen ohne WordPress-Hölle",
      "Barrierefrei · Keyboard, Screenreader, Kontraste. Nicht nachgedacht, sondern mitgebaut",
      "Design + Code aus einem Kopf · keine verlorene Übersetzung, keine fehlenden Details",
      "Ein Gesprächspartner, jahrelang erreichbar · keine Agentur-Hotline, keine Ticketsysteme",
    ],
    schlecht: [
      "Nicht für „morgen bitte fertig“",
      "Nicht für 50-€-Budget",
      "Braucht Zeit · weil's durchdacht ist, nicht schnell-schnell aus der Schublade",
    ],
    wannSinnvoll:
      "Marke, die bleiben soll. 2 – 50 Mitarbeiter. Lokal oder in einer Nische, wo eine gute Seite den Unterschied macht.",
    akzent: "accent",
  },
];

export function WebVsAlternatives({ num = "07" }: { num?: string } = {}) {
  return (
    <section className="pb-32 overflow-hidden">
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
            Website · der schnelle über Baukasten und der langsame über einen
            Kopf. Hier was beide gut können und wo sie aussteigen.
          </p>
        </div>

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
                      "transition-transform duration-300 ease-out group-hover:!rotate-0",
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
          <p className="font-hand text-[22px] md:text-[24px] text-offwhite/85 leading-tight -rotate-[0.8deg]">
            und ehrlich ·{" "}
            <span className="text-accent-ink">ich versteh&apos;s</span>.
          </p>
          <p className="mt-4 text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
            Für ein Nebenprojekt reicht ein Baukasten völlig, und das ist okay.
            Mir geht&apos;s um Projekte, die für uns beide passen · das spürt
            man hinterher an jedem Detail.
          </p>
        </div>
      </div>
    </section>
  );
}
