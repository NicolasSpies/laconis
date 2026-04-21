import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Deliverables · drei karten, leicht schräg, überlappend.
 * zahlen hinter den karten, ragen als ecken raus · keine content-überlappung.
 * handmade-vibe: echte papier-stapel-logik, karten sind opak (liquid-glass-dark).
 */

type Corner = "tl" | "tc" | "tr";

type Paket = {
  num: string;
  titel: React.ReactNode;
  kurz: string;
  tags: string[];
  rotate: string;
  corner: Corner;
  numRotate: string;
  offset?: string; // vertikaler versatz zwischen den karten
};

const PAKETE: Paket[] = [
  {
    num: "01",
    titel: (
      <>
        das{" "}
        <span className="italic font-serif text-accent-ink">logo</span>
        -paket
      </>
    ),
    kurz:
      "Alle Formate, alle Fälle · Primär, Mono, Monogramm, Favicon. Nie wieder die Frage: Hast du das Logo auch als…?",
    tags: ["svg", "png", "pdf druckfertig", "favicon", "monogramm"],
    rotate: "-1.6deg",
    corner: "tl",
    numRotate: "-10deg",
    offset: "md:mt-0",
  },
  {
    num: "02",
    titel: (
      <>
        der basic{" "}
        <span className="italic font-serif text-accent-ink">brand</span> guide
      </>
    ),
    kurz:
      "Farben, Typografie, Bildsprache, Ton. Kurz & knapp, alles drin · das Manual für dich und alle, die später damit arbeiten.",
    tags: ["hex · rgb · cmyk · pantone", "typo-system", "bildsprache", "voice"],
    rotate: "1.2deg",
    corner: "tc",
    numRotate: "4deg",
    offset: "md:mt-8",
  },
  {
    num: "03",
    titel: (
      <>
        print &{" "}
        <span className="italic font-serif text-accent-ink">web</span>-set
      </>
    ),
    kurz:
      "Visitenkarte, Briefpapier, E-Mail-Signatur, Favicon, drei Social-Posts · druckfertig mit Schnittmarken, web-ready mit allen Größen.",
    tags: [
      "visitenkarte",
      "briefpapier",
      "e-mail-signatur",
      "3 social-posts",
    ],
    rotate: "-0.8deg",
    corner: "tr",
    numRotate: "8deg",
    offset: "md:mt-3",
  },
];

const OUTLINE_STYLE = {
  WebkitTextStroke: "1.5px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

/**
 * numeral positioning · hinter der karte, ragt aus der ecke raus.
 * translate so dass ~55% der zahl außerhalb der karte liegt.
 */
const CORNER_ANCHOR: Record<Corner, string> = {
  tl: "top-0 left-0",
  tc: "top-0 left-1/2",
  tr: "top-0 right-0",
};
const CORNER_TRANSLATE: Record<Corner, string> = {
  tl: "translate(-45%, -65%)",
  tc: "translate(-50%, -75%)",
  tr: "translate(45%, -65%)",
};

export function Deliverables({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="relative pb-8 md:pb-10 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>was du bekommst</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
          drei pakete,{" "}
          <span className="text-offwhite/35">sauber übergeben.</span>
        </h2>
        <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
          Keine Nachlieferungen per E-Mail, kein „Ach, die Datei schicke ich
          dir morgen". Am Übergabetag hast du alles · in einem geteilten
          Ordner, print-ready und web-ready.
        </p>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {PAKETE.map((p, idx) => (
            <div
              key={p.num}
              className={[
                "relative group",
                idx > 0 ? "md:-ml-4" : "",
                p.offset ?? "",
              ].join(" ")}
              style={{ zIndex: 10 + idx }}
            >
              {/* zahl · hinter der karte, ragt raus */}
              <span
                aria-hidden
                className={[
                  "heading-display block absolute select-none pointer-events-none z-0",
                  "text-[clamp(5.5rem,10vw,7.5rem)] leading-[0.82] text-offwhite/30",
                  CORNER_ANCHOR[p.corner],
                ].join(" ")}
                style={{
                  ...OUTLINE_STYLE,
                  transform: `${CORNER_TRANSLATE[p.corner]} rotate(${p.numRotate})`,
                }}
              >
                {p.num}
              </span>

              {/* karte · opak, keine durchsicht */}
              <article
                className="relative z-10 liquid-glass-dark rounded-2xl p-7 md:p-8 transition-transform duration-300 ease-out group-hover:!rotate-0"
                style={{ transform: `rotate(${p.rotate})` }}
              >
                <h3 className="heading-display text-[clamp(1.5rem,2.4vw,1.9rem)] text-offwhite leading-[1.1]">
                  {p.titel}
                </h3>
                <p className="mt-4 text-[13.5px] leading-relaxed text-offwhite/75">
                  {p.kurz}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-2 py-0.5 rounded-full border border-ink/20 bg-ink/[0.03] font-mono text-[10.5px] text-offwhite/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* handmade-pfeil → obendrauf */}
        <BridgeArrow />
      </div>
    </section>
  );
}

/**
 * BridgeArrow · scribble-pfeil + kurze notiz.
 * führt vom paket-trio visuell runter zu "obendrauf".
 */
function BridgeArrow() {
  return (
    <div className="mt-16 md:mt-20 relative flex flex-col items-center gap-3">
      <span
        className="font-hand text-[22px] md:text-[24px] text-offwhite/85 -rotate-2 leading-tight"
      >
        und wenn du{" "}
        <span className="text-accent-ink">mehr</span> brauchst?
      </span>
      <svg
        width="74"
        height="88"
        viewBox="0 0 74 88"
        fill="none"
        aria-hidden
        className="text-offwhite/55"
      >
        <path
          d="M38 2 C 44 16, 28 28, 36 42 C 44 56, 28 64, 38 80"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31 72 L38 82 L46 72"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
