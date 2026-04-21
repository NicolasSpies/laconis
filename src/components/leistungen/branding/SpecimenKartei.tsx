import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CONTACT } from "@/config/contact";

/**
 * SpecimenKartei — das branding-start-paket.
 * Zeigt die vier musterblätter, die jede marke bei mir zum start bekommt:
 * logo, moodboard, brand guide (mit farbe + typo drin), print/packaging.
 * Unter den kärtchen: button zum brand-simulator-spielplatz.
 */

export function SpecimenKartei({ num = "02" }: { num?: string } = {}) {
  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        <SectionLabel num={num}>dein start-paket</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
          alles, womit deine marke{" "}
          <span className="text-offwhite/35">wirklich losgehen kann.</span>
        </h2>
        <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
          Kein Cherry-Picking, keine Baustein-Liste · das ist der
          Grundstock, mit dem jede Marke bei mir startet. Vier Musterblätter,
          alles greift ineinander, nichts fehlt.
        </p>
        <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
          Vom Logo über Farbwelt und Typo bis zur Visitenkarte · alles
          stimmt aufeinander ab. Später kommt mehr dazu, wenn du&apos;s
          brauchst · aber so startest du sauber.
        </p>

        <div className="mt-16 space-y-6 md:space-y-7">
          {/* 01 · LOGO + WORDMARK */}
          <SpecimenFrame
            num="01"
            titel="logo + wordmark"
            untertitel="Nicht das 500ste Kreis-mit-Schwung-Logo. Eine Marke, die man auf einem T-Shirt erkennt und im Telefonbuch schreiben kann."
            meta="wordmark · favicon · monogramm"
            layout="classic"
            rotate="-0.6deg"
          >
            <WordmarkSpecimen />
          </SpecimenFrame>

          {/* 02 · MOODBOARD + RECHERCHE */}
          <SpecimenFrame
            num="02"
            titel="moodboard + recherche"
            untertitel="Bevor geschraubt wird: wer bist du, wer sind die anderen, was fehlt. Ehrliche Recherche, kein Pinterest-Dump."
            meta="3-5 welten zur auswahl · wettbewerbs-scan"
            layout="mirror"
            rotate="0.7deg"
          >
            <MoodboardSpecimen />
          </SpecimenFrame>

          {/* handmade-bridge · zusammenhalt der vier blätter */}
          <div className="flex justify-center py-4 md:py-6">
            <span
              className="font-hand text-[22px] md:text-[24px] text-offwhite/75 leading-none"
              style={{ transform: "rotate(-1.2deg)" }}
            >
              vier blätter{" "}
              <span className="text-accent-ink">·</span> eine sprache.
            </span>
          </div>

          {/* 03 · BRAND GUIDE (farbe + typo inside) */}
          <SpecimenFrame
            num="03"
            titel="brand guide"
            untertitel="Farbwelt, Typografie, Bildsprache, Tonalität. Damit du nicht jedes Mal von vorne anfängst, wenn jemand ein Plakat druckt."
            meta="pdf · deine marke auf einen blick"
            layout="classic"
            rotate="-0.5deg"
          >
            <BrandGuideSpecimen />
          </SpecimenFrame>

          {/* 04 · PRINT + PACKAGING */}
          <SpecimenFrame
            num="04"
            titel="print + packaging"
            untertitel="Etiketten, Flyer, Speisekarten, Verpackung. Druckfertig mit den richtigen Farbprofilen · nicht nur fürs Screen-Hübsch."
            meta="pdf/x-4 · 3mm anschnitt · iso 12647"
            layout="mirror"
            rotate="0.6deg"
          >
            <PrintSpecimen />
          </SpecimenFrame>
        </div>

        {/* CTA zum simulator */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <Link
            href="/leistungen/branding/simulator"
            className="inline-flex items-center gap-3 rounded-full border border-lime/50 bg-lime/[0.06] hover:bg-lime/[0.12] px-6 py-3 font-mono text-[11px] uppercase tracking-mono text-accent-ink transition-colors"
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-lime" />
            versuch&apos;s selber aus · brand-simulator →
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
            name + farben wählen · in sekunden eine marke bauen
          </p>
        </div>
      </div>
    </section>
  );
}

/* ————————————————————————————————————————————————————————————
   Frame — gemeinsames layout für alle specimens
   layout="classic" → index-card links, specimen rechts
   layout="mirror"  → specimen links, index-card rechts (alterniert)
   rotate           → subtile rotation für papierstapel-feel
———————————————————————————————————————————————————————————— */
const NUM_OUTLINE_STYLE = {
  WebkitTextStroke: "1.2px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

function SpecimenFrame({
  num,
  titel,
  untertitel,
  meta,
  children,
  layout = "classic",
  rotate = "0deg",
}: {
  num: string;
  titel: string;
  untertitel: string;
  meta: string;
  children: React.ReactNode;
  layout?: "classic" | "mirror";
  rotate?: string;
}) {
  const isMirror = layout === "mirror";

  return (
    <div className="relative group">
      {/* dezente outline-nummer · editorial-akzent in der äußeren ecke */}
      <span
        aria-hidden
        className={[
          "heading-display absolute z-0 select-none pointer-events-none",
          "text-[clamp(4rem,7vw,5.5rem)] leading-[0.82] text-offwhite/25",
          isMirror ? "top-0 right-0" : "top-0 left-0",
        ].join(" ")}
        style={{
          ...NUM_OUTLINE_STYLE,
          transform: isMirror
            ? "translate(35%, -55%) rotate(6deg)"
            : "translate(-35%, -55%) rotate(-6deg)",
        }}
      >
        {num}
      </span>

      <div
        className="relative z-10 liquid-glass-dark rounded-2xl overflow-hidden transition-transform duration-300 ease-out group-hover:!rotate-0"
        style={{ transform: `rotate(${rotate})` }}
      >
        <div className="grid lg:grid-cols-[320px_1fr] gap-0">
          {/* INDEX-CARD · links in classic, rechts in mirror */}
          <div
            className={[
              "p-7 md:p-9 flex flex-col justify-between min-h-[280px]",
              "border-b lg:border-b-0 border-ink/10",
              isMirror
                ? "lg:order-2 lg:border-l"
                : "lg:order-1 lg:border-r",
            ].join(" ")}
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                musterblatt · {num}
              </span>
              <h3 className="heading-sans mt-4 text-[clamp(1.5rem,2.5vw,1.875rem)] text-offwhite leading-tight">
                {titel}
              </h3>
              <p className="mt-4 text-[13px] leading-relaxed text-offwhite/55 max-w-[280px]">
                {untertitel}
              </p>
            </div>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              {meta}
            </p>
          </div>

          {/* VISUAL SPECIMEN · rechts in classic, links in mirror */}
          <div
            className={[
              "relative p-6 md:p-10 min-h-[280px] flex items-center justify-center overflow-hidden",
              isMirror ? "lg:order-1" : "lg:order-2",
            ].join(" ")}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   Logo-mask helper · rendert laconis-logo.svg in currentColor
———————————————————————————————————————————————————————————— */
function LogoMark({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      aria-hidden
      className={["block aspect-[600/140.83]", className].filter(Boolean).join(" ")}
      style={{
        WebkitMaskImage: "url(/laconis-logo.svg)",
        maskImage: "url(/laconis-logo.svg)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        backgroundColor: "currentColor",
        ...style,
      }}
    />
  );
}

/* ————————————————————————————————————————————————————————————
   01 · Wordmark-specimen · 2 varianten (primär + favicon)
———————————————————————————————————————————————————————————— */
function WordmarkSpecimen() {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-[1.7fr_1fr] gap-8 md:gap-10 items-center">
      {/* primär · das echte logo */}
      <div className="relative text-center md:text-left">
        <span className="absolute -top-2 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 font-mono text-[8px] uppercase tracking-label text-offwhite/35">
          01 · primär
        </span>
        <div className="mt-4 text-offwhite inline-flex">
          <LogoMark className="h-[clamp(42px,6.5vw,72px)] w-auto" />
        </div>
        <span className="mt-4 block font-mono text-[9px] uppercase tracking-mono text-offwhite/35">
          wortmarke · hausfont
        </span>
      </div>

      {/* favicon · ø in lime-circle */}
      <div className="relative text-center md:text-right">
        <span className="absolute -top-2 right-1/2 md:right-0 translate-x-1/2 md:translate-x-0 font-mono text-[8px] uppercase tracking-label text-offwhite/35">
          02 · favicon
        </span>
        <div className="inline-flex items-center justify-center mt-4">
          <div className="w-[clamp(64px,8vw,88px)] h-[clamp(64px,8vw,88px)] rounded-full border border-lime/50 flex items-center justify-center bg-lime/[0.05]">
            <span className="heading-display text-lime text-[clamp(1.5rem,2.8vw,2rem)] leading-none">
              ø
            </span>
          </div>
        </div>
        <div className="mt-4 font-mono text-[9px] uppercase tracking-mono text-offwhite/35">
          app-icon · social-avatar
        </div>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   03 · Brand-guide spread · farbwelt + typografie drin
———————————————————————————————————————————————————————————— */
function BrandGuideSpecimen() {
  const COLORS = [
    { hex: "rgb(var(--accent))", name: "lime" },
    { hex: "#1A1A1A", name: "ink" },
    { hex: "#F3F1EA", name: "paper" },
    { hex: "#A89F8C", name: "sand" },
  ];

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex gap-3 items-start scale-[0.85] md:scale-100 origin-center">
        {/* linke seite · cover */}
        <div className="w-[148px] md:w-[190px] aspect-[3/4] rounded-sm bg-dark border border-ink/25 p-4 flex flex-col justify-between shadow-[8px_8px_24px_rgba(0,0,0,0.4)]">
          <div>
            <span className="font-mono text-[7px] uppercase tracking-label text-accent-ink">
              brand guide
            </span>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              v 1.0 · 2025
            </p>
          </div>
          <div className="heading-display text-offwhite text-[28px] md:text-[34px] leading-[0.9] tracking-tight">
            wie wir
            <br />
            aussehen
            <br />
            <span className="text-lime">wollen.</span>
          </div>
          <div className="flex justify-between items-end">
            <span className="font-mono text-[7px] text-offwhite/35">01</span>
            <span className="font-mono text-[7px] text-offwhite/35">
              → titel
            </span>
          </div>
        </div>

        {/* rechte seite · inner-spread mit farbe + typo */}
        <div className="w-[148px] md:w-[190px] aspect-[3/4] rounded-sm bg-dark border border-ink/25 p-4 flex flex-col gap-3 shadow-[8px_8px_24px_rgba(0,0,0,0.4)]">
          {/* farbwelt-mini */}
          <div>
            <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              farbwelt
            </span>
            <div className="mt-1.5 grid grid-cols-4 gap-1">
              {COLORS.map((c) => (
                <div key={c.hex} className="flex flex-col gap-0.5">
                  <div
                    className="aspect-square rounded-[1px] border border-ink/10"
                    style={{ background: c.hex }}
                  />
                  <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/55">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* typo-mini · 3 stufen */}
          <div className="mt-1">
            <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
              typografie
            </span>
            <div className="mt-1.5 space-y-1.5 border-l border-ink/25 pl-2">
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  h1 · display
                </span>
                <p className="heading-display text-offwhite text-[13px] md:text-[16px] leading-[1] mt-0.5">
                  überschrift
                </p>
              </div>
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  h3 · sans
                </span>
                <p className="heading-sans text-offwhite text-[9px] md:text-[10px] leading-tight mt-0.5">
                  zwischenzeile
                </p>
              </div>
              <div>
                <span className="font-mono text-[5.5px] uppercase tracking-mono text-offwhite/35 block">
                  body · sans
                </span>
                <p className="text-offwhite/75 text-[7px] md:text-[7.5px] leading-[1.35] mt-0.5">
                  Fließtext mit Luft. Lesbar auch auf alten Bildschirmen.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-between items-end">
            <span className="font-mono text-[7px] text-offwhite/35">08</span>
            <span className="font-mono text-[7px] text-lime">→ system</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ————————————————————————————————————————————————————————————
   04 · Print specimen · visitenkarte mit anschnitt
———————————————————————————————————————————————————————————— */
function PrintSpecimen() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative">
        {/* crop marks wrapper */}
        <div className="relative p-8">
          {/* ecken-marken */}
          <CropMarks />

          {/* karte · rückseite */}
          <div className="absolute -left-2 -top-2 w-[200px] md:w-[260px] aspect-[1.618/1] rounded-[2px] bg-dark border border-ink/10 rotate-[-3deg] shadow-[8px_8px_20px_rgba(0,0,0,0.3)] p-4 flex items-end">
            <div className="w-full flex items-end justify-between">
              <div className="heading-display text-lime text-[18px] leading-none">
                ø
              </div>
              <span className="font-mono text-[7px] uppercase tracking-label text-offwhite/35">
                laconis.be
              </span>
            </div>
          </div>

          {/* karte · vorderseite */}
          <div className="relative w-[200px] md:w-[260px] aspect-[1.618/1] rounded-[2px] bg-paper p-4 md:p-5 shadow-[0_8px_24px_rgba(0,0,0,0.35)] flex flex-col justify-between"
               style={{ background: "#F3F1EA" }}>
            <div>
              <span className="font-mono text-[7px] uppercase tracking-label" style={{ color: "#8A8376" }}>
                designer · eupen
              </span>
              <div className="heading-display mt-2 text-[16px] md:text-[20px] leading-tight" style={{ color: "#1A1A1A" }}>
                nicolas spies
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div className="font-mono text-[7px] uppercase tracking-mono leading-tight" style={{ color: "#1A1A1A" }}>
                {CONTACT.email}
                <br />
                {CONTACT.phone ?? "+32 … … …"}
              </div>
              <div className="heading-display text-[18px]" style={{ color: "#1A1A1A" }}>
                ø
              </div>
            </div>
          </div>
        </div>

        <p className="mt-4 font-mono text-[9px] uppercase tracking-mono text-offwhite/35 text-center">
          85×55mm · 3mm anschnitt · schnittmarken
        </p>
      </div>
    </div>
  );
}

function CropMarks() {
  const pos = [
    "top-0 left-0",
    "top-0 right-0 rotate-90",
    "bottom-0 left-0 -rotate-90",
    "bottom-0 right-0 rotate-180",
  ];
  return (
    <>
      {pos.map((p) => (
        <div
          key={p}
          className={`absolute ${p} w-4 h-4 pointer-events-none`}
          aria-hidden
        >
          <span className="absolute top-0 left-0 w-full h-px bg-offwhite/25" />
          <span className="absolute top-0 left-0 h-full w-px bg-offwhite/25" />
        </div>
      ))}
    </>
  );
}

/* ————————————————————————————————————————————————————————————
   02 · Moodboard · sticky-note grid
———————————————————————————————————————————————————————————— */
function MoodboardSpecimen() {
  const TILES = [
    { kind: "hex", value: "rgb(var(--accent))" },
    { kind: "word", value: "ruhig" },
    { kind: "texture", value: "papier" },
    { kind: "word", value: "ehrlich" },
    { kind: "hex", value: "#1E3A5F" },
    { kind: "word", value: "editorial" },
    { kind: "pattern", value: "grid" },
    { kind: "hex", value: "#A89F8C" },
  ];

  return (
    <div className="w-full grid grid-cols-4 gap-2.5 max-w-[440px] mx-auto">
      {TILES.map((t, i) => (
        <div
          key={i}
          className={[
            "aspect-square rounded-sm border border-ink/10 relative overflow-hidden",
            i % 3 === 0 ? "rotate-[-1.5deg]" : i % 3 === 1 ? "rotate-[1deg]" : "rotate-[-0.5deg]",
          ].join(" ")}
        >
          {t.kind === "hex" && (
            <>
              <div className="absolute inset-0" style={{ background: t.value }} />
              <span className="absolute bottom-1 left-1 font-mono text-[7px] uppercase tracking-mono text-black/60">
                {t.value}
              </span>
            </>
          )}
          {t.kind === "word" && (
            <div className="absolute inset-0 flex items-center justify-center bg-ink/[0.03]">
              <span className="font-hand text-[18px] md:text-[22px] text-offwhite/75">
                {t.value}
              </span>
            </div>
          )}
          {t.kind === "texture" && (
            <div className="absolute inset-0 flex items-center justify-center"
                 style={{
                   background:
                     "repeating-linear-gradient(45deg, rgb(var(--ink) / 0.04) 0 3px, transparent 3px 6px)",
                 }}>
              <span className="font-hand text-[14px] text-offwhite/55">
                {t.value}
              </span>
            </div>
          )}
          {t.kind === "pattern" && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(var(--ink) / 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--ink) / 0.12) 1px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
