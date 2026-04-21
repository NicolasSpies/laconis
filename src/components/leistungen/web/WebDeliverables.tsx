import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

/**
 * WebDeliverables · drei versprechen als papierstapel.
 * zahlen hinter den karten, ragen als ecken raus · keine content-überlappung.
 * handmade-vibe: echte papier-stapel-logik, karten sind opak (liquid-glass-dark).
 */

type Corner = "tl" | "tc" | "tr";

type Promise = {
  num: string;
  titel: string;
  kurz: string;
  /** kleines icon als SVG · passt zur scribble-ästhetik */
  icon: React.ReactNode;
  rotate: string;
  corner: Corner;
  numRotate: string;
  offset?: string;
};

const PROMISES: Promise[] = [
  {
    num: "01",
    titel: "die seite",
    kurz:
      "Schnell genug, dass niemand den Tab vorher schließt · Pagespeed 95+, sauberes SEO, lesbar auch auf dem Uralt-Samsung deiner Tante. Barrierefrei, ohne dass du daran denken musst.",
    rotate: "-1.6deg",
    corner: "tl",
    numRotate: "-10deg",
    offset: "md:mt-0",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 17 L42 17"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
        <circle cx="13" cy="13.5" r="0.9" fill="currentColor" />
        <circle cx="16" cy="13.5" r="0.9" fill="currentColor" />
        <path
          d="M12 24 L22 24 M12 28 L30 28 M12 32 L24 32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    num: "02",
    titel: "dein zugang",
    kurz:
      "Pflegen ohne WordPress-Hölle · mit ContentCore, meinem eigenen CMS. Keine 47 Plugins, kein rotes Update-Fenster im Dashboard. Eine Einweisung, dann läufst du selbst.",
    rotate: "1.2deg",
    corner: "tc",
    numRotate: "4deg",
    offset: "md:mt-8",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        {/* schlüssel · sauber, symbolisch für „zugang" */}
        <circle
          cx="16"
          cy="24"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="16" cy="24" r="1.8" fill="currentColor" />
        <path
          d="M22 24 L40 24 M34 24 L34 29 M38 24 L38 28"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    num: "03",
    titel: "für immer deins",
    kurz:
      "Der Code gehört dir · keine Abo-Falle, kein Vendor-Lock, kein monatlicher Mietzins ans Silicon Valley. Wenn du mich eines Tages nicht mehr brauchst, nimmst du einfach alles mit.",
    rotate: "-0.8deg",
    corner: "tr",
    numRotate: "8deg",
    offset: "md:mt-3",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        {/* ordner-icon · alles auf einen griff */}
        <path
          d="M8 14 L20 14 L23 18 L40 18 L40 36 L8 36 Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M14 24 L34 24 M14 28 L30 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
];

const OUTLINE_STYLE = {
  WebkitTextStroke: "1.5px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

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

export function WebDeliverables({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="relative pb-8 md:pb-10 overflow-hidden">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>was du bekommst</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            drei versprechen.{" "}
            <span className="text-offwhite/35">
              einlösbar, nicht verschwurbelt.
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            Keine 47-Punkt-Feature-Liste · das hier ist der Kern. Den Rest
            (Hosting-Details, CMS-Architektur, Technik-Tiefkram) spar ich mir
            hier · liegt drüben für die, die&apos;s genauer wissen wollen.
          </p>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {PROMISES.map((p, idx) => (
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
                className="relative z-10 liquid-glass-dark rounded-2xl p-7 md:p-8 transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50"
                style={{ transform: `rotate(${p.rotate})` }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    versprechen · {p.num}
                  </span>
                  <span className="text-accent-ink">{p.icon}</span>
                </div>
                <h3 className="heading-sans mt-5 text-[clamp(1.3rem,2vw,1.55rem)] text-offwhite leading-tight">
                  {p.titel}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-offwhite/75">
                  {p.kurz}
                </p>
              </article>
            </div>
          ))}
        </div>

        {/* handmade-pfeil → technik-link */}
        <TechnikBridge />
      </div>
    </section>
  );
}

/**
 * TechnikBridge · scribble-pfeil + text · führt vom versprechen-trio zum technik-link.
 */
function TechnikBridge() {
  return (
    <div className="mt-16 md:mt-20 relative flex flex-col items-center gap-3">
      <span className="font-hand text-[22px] md:text-[24px] text-offwhite/85 -rotate-2 leading-tight">
        und wenn du's <span className="text-accent-ink">genauer</span> wissen willst?
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
      <Button href="/leistungen/web/technik" variant="primary" size="sm">
        alle technik-details →
      </Button>
    </div>
  );
}
