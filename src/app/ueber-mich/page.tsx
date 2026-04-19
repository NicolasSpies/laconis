import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "über mich" };

const FAKTEN = [
  {
    farbe: "#e58d3f",
    rotate: -3,
    titel: "drei sprachen",
    kurz: "deutsch, französisch, englisch — alles auf verhandlungsebene.",
  },
  {
    farbe: "#7a4bd1",
    rotate: 2,
    titel: "seit 2019 am bauen",
    kurz: "angefangen mit wordpress, angekommen bei next.js + eigenem cms.",
  },
  {
    farbe: "#2f5d3a",
    rotate: -1,
    titel: "eupen, belgien",
    kurz: "ostbelgien-grenze. kunden in DE, BE, LUX, NL.",
  },
  {
    farbe: "#c9a87a",
    rotate: 4,
    titel: "handschrift-fan",
    kurz: "ja der caveat-font auf der seite ist absicht. ich schreibe gern mit papier.",
  },
  {
    farbe: "#6e1d2b",
    rotate: -4,
    titel: "wein > bier",
    kurz: "kontrovers, ich weiss. abendplanung nach 18 uhr: kaltes glas rotwein.",
  },
];

const TOOLS = [
  { name: "next.js", kat: "stack" },
  { name: "react", kat: "stack" },
  { name: "tailwind", kat: "stack" },
  { name: "typescript", kat: "stack" },
  { name: "figma", kat: "design" },
  { name: "affinity designer", kat: "design" },
  { name: "procreate", kat: "design" },
  { name: "notion", kat: "ops" },
  { name: "linear", kat: "ops" },
];

const WERDEGANG = [
  {
    jahr: "2019",
    titel: "erste website",
    kurz: "für einen freund eine wordpress-seite gebastelt. haken tief drinnen.",
  },
  {
    jahr: "2021",
    titel: "nebenberuflich selbständig",
    kurz: "erste echte kunden. die ersten 'ich mach das für lau'-fehler.",
  },
  {
    jahr: "2023",
    titel: "umzug auf next.js",
    kurz: "wordpress weg. alles selbst gebaut. nie mehr plugin-hölle.",
  },
  {
    jahr: "2025",
    titel: "laconis als marke",
    kurz:
      "aus 'nicolas macht websites' wird 'laconis'. name, handschrift, haltung.",
  },
  {
    jahr: "2026",
    titel: "vollzeit",
    kurz: "endlich. nur noch laconis. volle konzentration.",
  },
];

const NICHT_MACHE = [
  "newsletter-bombardements — keine sales-sprache, keine tricks.",
  "copy-paste-templates — jede seite ist eine eigene entscheidung.",
  "versprechen die ich nicht halten kann — lieber ehrlich nein als leises vielleicht.",
  "arbeit mit unternehmen, hinter denen ich nicht stehe — geld ist nicht alles.",
];

export default function Page() {
  return (
    <>
      {/* HERO — studio-blick */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="container-site">
          <SectionLabel num="06">über mich</SectionLabel>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-start">
            {/* left — intro */}
            <div>
              <h1 className="heading-display text-[clamp(2.5rem,7vw,5.5rem)] text-offwhite">
                hinter laconis
                <br />
                <span className="text-offwhite/35">steck nur ich.</span>
              </h1>
              <p className="mt-8 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
                nicolas spies. 26, aus eupen, belgien. designer und
                web-developer seit 2019 — seit 2026 vollzeit als laconis. ich
                bau marken und websites, die sich nach den leuten anfühlen, die
                dahinterstehen.
              </p>
              <p className="mt-5 max-w-[520px] text-[14px] leading-relaxed text-offwhite/50">
                kein studio, keine holding, keine praktikanten. du redest immer
                mit mir. das macht manche projekte enger in der zeitplanung —
                aber du weißt jederzeit, wer was baut.
              </p>

              <div className="mt-10">
                <Button href="/kontakt" variant="primary" size="lg">
                  sag hallo →
                </Button>
              </div>
            </div>

            {/* right — desk scatter */}
            <div className="relative min-h-[520px] lg:min-h-[640px]">
              {/* portrait placeholder */}
              <div
                className="absolute top-0 right-0 w-[260px] h-[340px] rounded-md border border-ink/10 overflow-hidden shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]"
                style={{
                  transform: "rotate(-2.5deg)",
                  background:
                    "radial-gradient(ellipse at 30% 20%, rgba(225,253,82,0.08) 0%, transparent 55%), linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%)",
                }}
              >
                {/* monogram as stand-in */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="heading-display text-offwhite/25 text-[120px]"
                    style={{ letterSpacing: "-0.08em" }}
                  >
                    ns
                  </span>
                </div>
                {/* tape */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-lime/50 rounded-[1px] rotate-[-3deg]" />
                {/* caption */}
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-label text-offwhite/50">
                  nicolas • 2025 • eupen
                </div>
              </div>

              {/* post-its */}
              {FAKTEN.map((f, i) => {
                const positions = [
                  { left: "4%", top: "60px" },
                  { left: "38%", top: "180px" },
                  { left: "10%", top: "310px" },
                  { left: "44%", top: "420px" },
                  { left: "18%", top: "540px" },
                ];
                const p = positions[i % positions.length];
                return (
                  <div
                    key={f.titel}
                    className="absolute w-[220px] p-4 rounded-sm shadow-[0_14px_30px_-14px_rgba(0,0,0,0.7)]"
                    style={{
                      ...p,
                      transform: `rotate(${f.rotate}deg)`,
                      background: f.farbe,
                    }}
                  >
                    <h3
                      className="font-hand text-[22px] leading-tight text-black/85"
                    >
                      {f.titel}
                    </h3>
                    <p className="mt-1 font-hand text-[15px] leading-snug text-black/65">
                      {f.kurz}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WERDEGANG */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel num="07">werdegang</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            in kürze — keine drei-seiten-bio.
          </h2>

          <div className="mt-14 relative">
            {/* timeline line */}
            <div className="absolute left-[56px] top-2 bottom-2 w-px bg-ink/10 hidden md:block" />

            <div className="space-y-8">
              {WERDEGANG.map((w) => (
                <div
                  key={w.jahr}
                  className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-8 items-start relative"
                >
                  <div className="relative">
                    <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                      {w.jahr}
                    </span>
                    {/* dot */}
                    <span className="absolute hidden md:block left-[52px] top-1 h-2 w-2 rounded-full bg-lime ring-4 ring-black" />
                  </div>
                  <div className="md:pl-4">
                    <h3 className="heading-sans text-[22px] text-offwhite">
                      {w.titel}
                    </h3>
                    <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-offwhite/55">
                      {w.kurz}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel num="08">werkzeug</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(1.75rem,4vw,3rem)] text-offwhite max-w-[720px]">
            tools sind mittel, nicht sinn.
          </h2>
          <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
            aber weil mich's jeder fragt — hier die aktuelle palette. wird
            sich in 2 jahren wieder geändert haben.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="flex items-baseline gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.015]"
              >
                <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink/70">
                  {t.kat}
                </span>
                <span className="font-mono text-[12px] text-offwhite">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WAS ICH NICHT MACHE */}
      <section className="pb-28">
        <div className="container-site">
          <SectionLabel num="09">ehrlichkeits-liste</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            was ich <span className="text-offwhite/35">nicht</span> mache.
          </h2>
          <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
            genauso wichtig wie was ich mache. spart uns beiden zeit.
          </p>

          <ul className="mt-10 space-y-4 max-w-[720px]">
            {NICHT_MACHE.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-4 pb-4 border-b border-ink/8 last:border-0"
              >
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 pt-1">
                  ×
                </span>
                <p className="text-[14px] leading-relaxed text-offwhite/70">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              soweit in kurz. wollen wir reden?
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              mehr über mich als über laconis? auch okay. ich mag kaffee und
              ehrliche gespräche.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt" variant="primary" size="lg">
                kontakt aufnehmen →
              </Button>
              <Button href="/referenzen" variant="glass" size="lg">
                meine arbeiten
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
