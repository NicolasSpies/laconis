import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Manifest — "was ich nicht mache"
 * Ehrliche anti-liste, direkt unter hero. setzt tonalität für die ganze seite.
 */

type Zeile = {
  nicht: string;
  stattdessen: string;
  detail?: string;
};

const ZEILEN: Zeile[] = [
  {
    nicht: "Auf fremden Branding-Systemen aufsetzen.",
    stattdessen: "Wir starten einmal bei null. Danach bist du drin für alles.",
    detail:
      "Kein Snobismus. Wenn ich die Marke nicht selbst gebaut hab, kenn ich die Regeln dahinter nicht. Und ohne die Regeln wird's nie richtig gut. Bin ich aber von Anfang an dabei, läuft später alles easy. Broschüre, Card, Roll-up, Social-Kit · ich hab die Linie im Kopf. Websites sind die Ausnahme. Die bau ich auch von null neu.",
  },
  {
    nicht: "Keine 27 Logo-Optionen im ersten Entwurf.",
    stattdessen: "Zwei Richtungen. Tiefer statt breiter.",
  },
  {
    nicht: "Keine Canva-Templates mit deinem Namen drübergebügelt.",
    stattdessen: "Ein eigenes System, keine geliehene Hülle.",
  },
  {
    nicht: "Kein Trend-Chasing, das 2027 schon alt aussieht.",
    stattdessen: "Marken, die altern dürfen, ohne peinlich zu werden.",
  },
  {
    nicht: "Keine Preisverhandlung per WhatsApp um 23 Uhr.",
    stattdessen: "Ein Telefonat. Kaffee in Eupen. Klare Zahl.",
  },
  {
    nicht: "Kein ‚ist doch nur ein Logo'.",
    stattdessen: "Es ist die Tür zu allem, was danach kommt.",
  },
  {
    nicht: "Kein Design ohne Recherche.",
    stattdessen: "Erst fragen, dann zeichnen.",
  },
];

type ManifestProps = {
  num?: string;
  hideHeader?: boolean;
};

export function Manifest({
  num = "05",
  hideHeader = false,
}: ManifestProps = {}) {
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
                Vorab ehrlich, was bei mir nicht drin ist. Damit später keine
                Überraschungen kommen.
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
