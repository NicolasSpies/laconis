import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Deliverables — konkrete datei-liste am ende des brand-projekts.
 * Antwortet: "was bekomme ich am ende eigentlich in die hand?"
 */

type Item = { label: string; meta?: string };

const GROUPS: { titel: string; sub: string; items: Item[] }[] = [
  {
    titel: "logo-dateien",
    sub: "alle formate, alle varianten, alle fälle.",
    items: [
      { label: "svg", meta: "vektor, web, skalierbar" },
      { label: "png transparent", meta: "3 größen (512 / 1024 / 2048)" },
      { label: "pdf druckfertig", meta: "vektor, für druckereien" },
      { label: "eps", meta: "backwards-kompatibel, agency-format" },
      {
        label: "5 varianten",
        meta: "primär · mono dark · mono light · monogramm · favicon",
      },
    ],
  },
  {
    titel: "brand guide",
    sub: "pdf, ~25 seiten. alles an einem ort.",
    items: [
      { label: "logo-verwendung", meta: "do's & don'ts, mindestgröße, freiraum" },
      { label: "farbpalette", meta: "hex · rgb · cmyk · pantone" },
      { label: "typografie-system", meta: "hierarchie, größen, zeilenhöhen" },
      { label: "bildsprache", meta: "fotografie-richtung, stil-referenzen" },
      { label: "tone of voice", meta: "wie du schreibst, wie du nicht schreibst" },
    ],
  },
  {
    titel: "print + digital",
    sub: "druckfertig und web-ready, out of the box.",
    items: [
      { label: "visitenkarte", meta: "pdf/x-4 · 3mm anschnitt · schnittmarken" },
      { label: "briefpapier a4", meta: "word + indesign-quelle" },
      { label: "e-mail-signatur", meta: "html, in jedem mail-client lesbar" },
      { label: "3 social-posts", meta: "figma + exportierte jpg/png" },
      { label: "favicon + app-icon", meta: "svg + png 512, manifest-ready" },
    ],
  },
];

export function Deliverables() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[780px]">
          <SectionLabel num="05">deliverables</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            was du am ende{" "}
            <span className="text-offwhite/35">wirklich in der hand hast.</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/60">
            keine nachlieferungen per e-mail, keine „ach die datei schicke ich
            dir morgen". am übergabetag hast du alles, was du brauchst —
            print-ready und web-ready.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-ink/8 border border-ink/8 rounded-2xl overflow-hidden">
          {GROUPS.map((g) => (
            <div key={g.titel} className="bg-dark p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <h3 className="heading-sans text-[18px] text-offwhite">
                  {g.titel}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {g.items.length} files
                </span>
              </div>
              <p className="mt-2 text-[12.5px] leading-relaxed text-offwhite/45">
                {g.sub}
              </p>

              <ul className="mt-6 space-y-4">
                {g.items.map((it, idx) => (
                  <li
                    key={idx}
                    className="group flex items-start gap-3 pb-4 border-b border-ink/6 last:border-0 last:pb-0"
                  >
                    <span
                      aria-hidden
                      className="mt-[7px] h-[6px] w-[6px] rounded-full bg-accent-ink shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] text-offwhite leading-snug">
                        {it.label}
                      </p>
                      {it.meta && (
                        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-mono text-offwhite/40">
                          {it.meta}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-[640px] text-[13px] leading-relaxed text-offwhite/45">
          farbprofile nach iso 12647 · fonts mit lizenz-info · alles in einem
          geteilten ordner (drive oder dropbox, wie du willst).
        </p>
      </div>
    </section>
  );
}
