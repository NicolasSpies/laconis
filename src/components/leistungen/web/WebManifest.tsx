import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebManifest — "was ich nicht mache" für /leistungen/web
 * Personality-statement, mirror zu /branding.
 */

type Zeile = {
  nicht: string;
  stattdessen: string;
  detail?: string;
};

const ZEILEN: Zeile[] = [
  {
    nicht: "Websites auf brüchigem Brand-Fundament.",
    stattdessen: "Wenn die grafische Linie wackelt, sag ich dir's ehrlich.",
    detail:
      "Eine Website komplett ab null neu bauen · oft sogar mein Lieblings-Szenario. Aber wenn der Brand dahinter schon unklar ist, empfehl ich: Erst die Marke, dann die Seite. Sonst wird nur ein Fundament tapeziert, das nicht hält. Ab und zu geht's in die andere Richtung: Du kommst für die Website, und ich fange mit der Marke an.",
  },
  {
    nicht: "Keine Baukasten-Templates. (Wix, Jimdo, Squarespace.)",
    stattdessen: "Jede Seite ein eigenes System, handgeschrieben.",
  },
  {
    nicht: "Kein WordPress-Plugin-Friedhof.",
    stattdessen: "Mein eigenes CMS. Gewartet. Keine Updates, die Dinge brechen.",
  },
  {
    nicht: "Kein Launch ohne 301-Redirects.",
    stattdessen: "Deine Google-Rankings bleiben, wo sie sind.",
  },
  {
    nicht: "Keine Seite ohne Test-Domain.",
    stattdessen: "Du siehst alles vorher auf einer privaten URL.",
  },
  {
    nicht: "Keine 8-Monats-Wartezeit für eine Landing Page.",
    stattdessen: "2 bis 8 Wochen. Kalenderwoche, nicht Quartal.",
  },
  {
    nicht: "Kein Hosting-Lotto bei GoDaddy oder 1&1.",
    stattdessen: "EU-Server, eigener VPS, DSGVO von Anfang an.",
  },
];

type WebManifestProps = {
  num?: string;
  hideHeader?: boolean;
};

export function WebManifest({
  num = "08",
  hideHeader = false,
}: WebManifestProps = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div
          className={
            hideHeader
              ? "max-w-[880px] mx-auto"
              : "grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20"
          }
        >
          {/* LEFT: Intro (verstecken wenn im toggle-kontext) */}
          {!hideHeader && (
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel num={num}>manifest</SectionLabel>
              <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
                was ich{" "}
                <span className="italic font-serif text-accent-ink">nicht</span>{" "}
                mache.
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
                Vorab ehrlich, was bei mir nicht drin ist. Und was du stattdessen
                bekommst.
              </p>
            </div>
          )}

          {/* RIGHT: Anti-list */}
          <ol className="divide-y divide-ink/10 border-y border-ink/10">
            {ZEILEN.map((z, i) => (
              <li
                key={i}
                className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="heading-sans text-[clamp(1.15rem,2vw,1.5rem)] text-offwhite/35 line-through decoration-[1px] decoration-offwhite/25">
                    {z.nicht}
                  </p>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-accent-ink">
                    → {z.stattdessen}
                  </p>
                  {z.detail && (
                    <p className="mt-3 max-w-[560px] text-[13px] leading-relaxed text-offwhite/55">
                      {z.detail}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
