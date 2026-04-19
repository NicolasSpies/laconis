import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebVsAlternatives — ehrliche einordnung
 * Baukasten / WP+Agentur / Laconis / Dev-Agency. Wer passt wann.
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
    key: "baukasten",
    titel: "baukasten",
    preis: "10 – 30 € / monat",
    gut: [
      "in einem tag online",
      "kein code, kein tech-wissen",
      "reicht für hobby / verein",
    ],
    schlecht: [
      "sieht aus wie 1.000 andere",
      "lahm (lighthouse unter 50)",
      "du gehörst dem anbieter, nicht umgekehrt",
    ],
    wannSinnvoll:
      "vereinsseite, pop-up-projekt, erste ein-seiten-landingpage für ein nebenprojekt.",
    akzent: "muted",
  },
  {
    key: "wordpress",
    titel: "wordpress + lokale agentur",
    preis: "2 – 8 k € einmalig",
    gut: [
      "riesiger plugin-markt",
      "viele freelancer können weiterpflegen",
      "klassisch, viele templates",
    ],
    schlecht: [
      "sicherheitslücken (plugin-updates brechen dinge)",
      "langsam ohne viel caching-arbeit",
      "plugin-friedhof nach 2 jahren",
    ],
    wannSinnvoll:
      "shop mit 5.000+ artikeln, multi-autoren-blog, wenn du wirklich woocommerce willst.",
    akzent: "muted",
  },
  {
    key: "laconis",
    titel: "laconis",
    preis: "3 – 15 k € einmalig",
    gut: [
      "eigenes system, handgeschrieben",
      "pagespeed 95+ out of the box",
      "ein gesprächspartner — jahrelang",
    ],
    schlecht: [
      "nicht für ‚morgen bitte fertig'",
      "nicht für 50-€-budget",
      "nur 4 – 6 projekte pro jahr",
    ],
    wannSinnvoll:
      "marke die bleiben soll. 2 – 50 mitarbeiter. lokal oder in einer nische, wo eine gute seite den unterschied macht.",
    akzent: "accent",
  },
  {
    key: "agency",
    titel: "dev-agency 20k€+",
    preis: "20 – 120 k €",
    gut: [
      "20 – 80 leute im team",
      "skaliert für konzerne & multi-site",
      "compliance, rollout, stakeholder-prozesse",
    ],
    schlecht: [
      "du bist nie wichtigster kunde",
      "juniors setzen um, senior präsentiert",
      "für unter 5 mio umsatz oft übertrieben",
    ],
    wannSinnvoll:
      "internationaler rollout, 100+ mitarbeiter, sso-integrationen, enterprise-dsgvo-prozesse.",
    akzent: "muted",
  },
];

export function WebVsAlternatives() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num="11">einordnung</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            brauchst du mich{" "}
            <span className="italic font-serif text-accent-ink">überhaupt</span>
            ?
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/60">
            ehrliche antwort: nicht immer. hier vier wege zu einer website — mit
            dem, was sie wirklich können und wo sie aussteigen. wenn baukasten
            für dich reicht, nimm baukasten. ich will nur die projekte, bei
            denen&apos;s sinn ergibt.
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
      </div>
    </section>
  );
}
