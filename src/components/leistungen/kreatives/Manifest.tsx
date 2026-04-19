import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Manifest — "was ich nicht mache"
 * Ehrliche anti-liste, direkt unter hero. setzt tonalität für die ganze seite.
 */

const ZEILEN = [
  {
    nicht: "keine 27 logo-optionen im ersten entwurf.",
    stattdessen: "zwei richtungen. tiefer statt breiter.",
  },
  {
    nicht: "keine canva-templates mit deinem namen drübergebügelt.",
    stattdessen: "ein eigenes system, keine geliehene hülle.",
  },
  {
    nicht: "kein trend-chasing, das 2027 schon alt aussieht.",
    stattdessen: "marken, die altern dürfen, ohne peinlich zu werden.",
  },
  {
    nicht: "keine preisverhandlung per whatsapp um 23 uhr.",
    stattdessen: "ein telefonat. kaffee in eupen. klare zahl.",
  },
  {
    nicht: "kein ‚ist doch nur ein logo'.",
    stattdessen: "es ist die tür zu allem, was danach kommt.",
  },
  {
    nicht: "kein design ohne recherche.",
    stattdessen: "erst fragen, dann zeichnen.",
  },
];

export function Manifest() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          {/* LEFT: Intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel num="08">manifest</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
              was ich{" "}
              <span className="italic font-serif text-accent-ink">nicht</span>{" "}
              mache.
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
              sechs dinge, die bei mir nicht drin sind. damit du nicht nach
              sechs wochen enttäuscht fragst, warum.
            </p>
          </div>

          {/* RIGHT: Anti-list */}
          <ol className="divide-y divide-ink/8 border-y border-ink/8">
            {ZEILEN.map((z, i) => (
              <li
                key={i}
                className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/50 pt-1 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="heading-sans text-[clamp(1.15rem,2vw,1.5rem)] text-offwhite/40 line-through decoration-[1px] decoration-offwhite/25">
                    {z.nicht}
                  </p>
                  <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-accent-ink">
                    → {z.stattdessen}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
