import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { DeskScene } from "@/components/ueber-mich/DeskScene";
import { Werkstatt } from "@/components/home/Werkstatt";
import { StaerkenSection } from "@/components/ueber-mich/StaerkenSection";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ueber-mich");
}

const TOOLS = [
  { name: "next.js", kat: "stack" },
  { name: "react", kat: "stack" },
  { name: "tailwind", kat: "stack" },
  { name: "typescript", kat: "stack" },
  { name: "affinity designer", kat: "design" },
  { name: "procreate", kat: "design" },
  { name: "notion", kat: "ops" },
  { name: "linear", kat: "ops" },
];

const WERDEGANG = [
  {
    jahr: "2019",
    titel: "erste website",
    kurz: "Für einen Freund eine WordPress-Seite gebastelt. Haken tief drinnen.",
  },
  {
    jahr: "2021",
    titel: "nebenberuflich selbständig",
    kurz: "Erste echte Kunden. Die ersten „ich mach das für lau“-Fehler.",
  },
  {
    jahr: "2023",
    titel: "umzug auf next.js",
    kurz: "WordPress weg. Alles selbst gebaut. Nie mehr Plugin-Hölle.",
  },
  {
    jahr: "2025",
    titel: "laconis als marke",
    kurz:
      "Aus „Nicolas macht Websites“ wird „lacønis“. Name, Handschrift, Haltung.",
  },
  {
    jahr: "2026",
    titel: "vollzeit",
    kurz: "Endlich. Nur noch lacønis. Volle Konzentration.",
  },
];

export default function Page() {
  return (
    <>
      {/* SECTION A · HERO — photo + quote */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="container-site">
          <SectionLabel num="06">über mich</SectionLabel>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-center">
            {/* left — quote + intro */}
            <div>
              <h1 className="heading-display text-[clamp(2.25rem,6vw,4.75rem)] text-offwhite leading-[1.05]">
                hinter laconis steckt{" "}
                <span className="text-accent-ink">nur ich.</span>{" "}
                <span className="text-offwhite/35">
                  und ich nehme das persönlich.
                </span>
              </h1>

              <p className="mt-8 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
                Nicolas Spies. 29, aus Eupen, Belgien. Designer und
                Web-Developer seit 2019 · seit 2026 vollzeit als lacønis. Ich
                bau Marken und Websites, die sich nach den Leuten anfühlen, die
                dahinterstehen.
              </p>

              {/* PS · hand-notiz · erklärt subtil den namen
                  · rand-annotation-feel, wie mit bleistift dazu gekritzelt */}
              <p
                className="mt-5 max-w-[520px] text-accent-ink"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                  lineHeight: 1.25,
                  transform: "rotate(-1deg)",
                  transformOrigin: "left center",
                }}
              >
                <span className="text-offwhite/45">p.s. </span>
                lakonisch · knapp gesagt, viel gemeint. daher der name.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>designer</Tag>
                <Tag>web-developer</Tag>
                <Tag>eupen · belgien</Tag>
                <Tag>DE · FR · EN</Tag>
              </div>

              <div className="mt-10">
                <Button
                  href="/kontakt"
                  variant="primary"
                  size="lg"
                  analyticsLabel="ueber_mich_hero_kontakt"
                >
                  sag hallo →
                </Button>
              </div>
            </div>

            {/* right — portrait */}
            <div className="relative">
              <div
                className="portrait-stand relative mx-auto w-[280px] md:w-[320px] aspect-[3/4] rounded-md border border-ink/10 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
                style={{ transform: "rotate(-2deg)" }}
              >
                {/* monogram stand-in */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="heading-display text-offwhite/20 text-[140px]"
                    style={{ letterSpacing: "-0.08em" }}
                  >
                    ns
                  </span>
                </div>
                {/* tape */}
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-lime/50 rounded-[1px] rotate-[-3deg]" />
                {/* caption */}
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  nicolas · 2025 · eupen
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B · DESK-SCENE */}
      <DeskScene />

      {/* DIE WERKSTATT · polaroid-break */}
      <Werkstatt />

      {/* WAS MICH AUSMACHT */}
      <StaerkenSection />

      {/* atmospheric break */}
      <div className="container-site py-2">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(-1deg)" }}>
            und wo ich herkomme ↓
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      {/* WERDEGANG */}
      <section className="pb-28 pt-8">
        <div className="container-site">
          <SectionLabel num="08">werdegang</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            in kürze · keine drei-seiten-bio.
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

      {/* atmospheric break */}
      <div className="container-site py-2">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(0.7deg)" }}>
            was ich dabei nutze ↓
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      {/* TOOLS */}
      <section className="pb-28 pt-8">
        <div className="container-site">
          <SectionLabel num="09">werkzeug</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(1.75rem,4vw,3rem)] text-offwhite max-w-[720px]">
            tools sind mittel, nicht sinn.
          </h2>
          <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
            Aber weil mich's jeder fragt · hier die aktuelle Palette. Wird
            sich in 2 Jahren wieder geändert haben.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className="flex items-baseline gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.015]"
              >
                <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink/80">
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

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              soweit in kurz. lust auf ein gespräch?
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              Mehr über mich als über lacønis? Auch okay. Ich mag Kaffee und
              ehrliche Gespräche.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="ueber_mich_final_kontakt"
              >
                kontakt aufnehmen →
              </Button>
              <Button
                href="/referenzen"
                variant="glass"
                size="lg"
                analyticsLabel="ueber_mich_final_referenzen"
              >
                meine arbeiten
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full border border-ink/10 bg-ink/[0.02] text-offwhite/55">
      {children}
    </span>
  );
}
