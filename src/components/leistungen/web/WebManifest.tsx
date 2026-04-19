import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebManifest — "was ich nicht mache" für /leistungen/web
 * Personality-statement, mirror zu /kreatives.
 */

const ZEILEN = [
  {
    nicht: "keine baukasten-templates. (wix, jimdo, squarespace.)",
    stattdessen: "jede seite ein eigenes system, handgeschrieben.",
  },
  {
    nicht: "kein wordpress-plugin-friedhof.",
    stattdessen: "mein eigenes cms. gewartet. keine updates, die dinge brechen.",
  },
  {
    nicht: "keine launch ohne 301-redirects.",
    stattdessen: "deine google-rankings bleiben, wo sie sind.",
  },
  {
    nicht: "keine seite ohne test-domain.",
    stattdessen: "du siehst alles vorher auf einer privaten url.",
  },
  {
    nicht: "keine 8-monats-wartezeit für eine landing page.",
    stattdessen: "2 bis 8 wochen. kalenderwoche, nicht quartal.",
  },
  {
    nicht: "kein hosting-lotto bei godaddy oder 1&1.",
    stattdessen: "eu-server, eigener vps, dsgvo von anfang an.",
  },
];

export function WebManifest() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          {/* LEFT: Intro */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionLabel num="12">manifest</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
              was ich{" "}
              <span className="italic font-serif text-accent-ink">nicht</span>{" "}
              mache.
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
              sechs dinge, die bei mir nicht drin sind. damit du weißt, worauf
              du dich einlässt — und was du stattdessen bekommst.
            </p>
          </div>

          {/* RIGHT: Anti-list */}
          <ol className="divide-y divide-ink/8 border-y border-ink/8">
            {ZEILEN.map((z, i) => (
              <li
                key={i}
                className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/30 pt-1 tabular-nums">
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
