import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { BrandSystemHero } from "@/components/leistungen/branding/BrandSystemHero";
import { SpecimenKartei } from "@/components/leistungen/branding/SpecimenKartei";
import { Deliverables } from "@/components/leistungen/branding/Deliverables";
import { BrandCase } from "@/components/leistungen/branding/BrandCase";
import { BrandVsAlternatives } from "@/components/leistungen/branding/BrandVsAlternatives";
import { OnDemandExtras } from "@/components/leistungen/branding/OnDemandExtras";
import { StaerkenStrip } from "@/components/shared/StaerkenStrip";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/branding");
}

const BASE = "https://laconis.be";
const KREATIV_SERVICES = [
  {
    name: "Branding · Basis",
    description:
      "Logo inkl. Varianten + Favicon, Farbpalette, Typografie · ideal für Neugründer und Selbstständige.",
    price: 600,
    serviceType: "Branding",
  },
  {
    name: "Branding · Essential",
    description:
      "Kompletter Brand-Guide + Visitenkarte, Briefpapier, 3 Social-Templates · ein konsistenter Look, mit dem du arbeiten kannst.",
    price: 1400,
    serviceType: "Branding",
  },
  {
    name: "Branding · Pro",
    description:
      "Vollständiges Brand-System mit Bild- und Textrichtlinien, Mood-Direction, Print-Package · für wachsende Marken.",
    price: 3200,
    serviceType: "Branding",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "leistungen", url: `${BASE}/leistungen` },
          { name: "branding", url: `${BASE}/leistungen/branding` },
        ]}
      />
      <ServiceSchema services={KREATIV_SERVICES} />

      {/* HERO · split-layout · text links, brand-system-animation rechts */}
      <section className="pt-32 md:pt-36 pb-16 md:pb-20">
        <div className="container-site">
          <SectionLabel num="01">leistungen · branding</SectionLabel>

          <div className="mt-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            {/* LINKS · text */}
            <div className="max-w-[620px]">
              <h1 className="heading-display text-[clamp(2.25rem,6vw,4.5rem)] text-offwhite leading-[0.98]">
                logo, brand &{" "}
                <span className="text-offwhite/35">alles drum herum</span>.
              </h1>
              <p className="mt-7 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
                ein logo allein ist noch keine marke. logo + typografie +
                farben + ton + einheitlicher auftritt auf visitenkarte, social
                und schaufenster · das ist eine marke. beides kommt von mir ·
                handgemacht.
              </p>
              <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-offwhite/35">
                branding für startups, handwerker, kleine unternehmen · auch
                einfach nur ein logo, wenn du damit starten willst.
              </p>

              {/* mini-stats */}
              <dl className="mt-10 grid grid-cols-3 gap-4 max-w-[520px]">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    varianten
                  </dt>
                  <dd className="heading-display text-lime text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    3 – 5
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    gehört dir
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    immer
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    halbwertszeit
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    5+ j.
                  </dd>
                </div>
              </dl>
            </div>

            {/* RECHTS · brand-system animation */}
            <div className="relative">
              <BrandSystemHero />
            </div>
          </div>
        </div>
      </section>

      {/* 02 · STÄRKEN-STRIP · 3 punkte teaser */}
      <StaerkenStrip />

      <ScribbleBreak text="und so sieht's aus ↓" rotate={-1} />

      {/* 03 · DEIN START-PAKET · das angebot */}
      <SpecimenKartei num="03" />

      {/* 04 · WAS DU BEKOMMST · deliverables + on-demand extras (ein kapitel) */}
      <Deliverables num="04" />
      <OnDemandExtras />

      <ScribbleBreak text="ein echter kunde dazu ↓" rotate={-0.8} flip />

      {/* 05 · ECHTES PROJEKT · holoroom case */}
      <BrandCase num="05" />

      <ScribbleBreak text="und mal ehrlich ↓" rotate={0.8} />

      {/* 06 · EINORDNUNG · passt das zu mir */}
      <BrandVsAlternatives num="06" />

      {/* 07 · VERTIEFUNGS-LINKS · ansatz + preise */}
      <section className="pb-20">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/ansatz"
              className="group block glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                wie ich arbeite
              </span>
              <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                vier skizzen vom ersten gespräch bis zur übergabe · und was
                ich bewusst nicht mache.
              </p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-label text-accent-ink">
                ansatz ansehen →
              </span>
            </Link>
            <Link
              href="/preise"
              className="group block glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                was es kostet
              </span>
              <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                alle pakete nebeneinander · fixpreise, keine stundensätze ·
                damit du weißt woran du bist.
              </p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-label text-accent-ink">
                preise ansehen →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA · personal · first-person signature */}
      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="relative liquid-glass rounded-2xl p-10 md:p-16 text-center">
            {/* marginalia · hand-notiz oben */}
            <p
              className="absolute -top-3 left-8 font-hand text-[17px] text-accent-ink/70 select-none"
              style={{ transform: "rotate(-2deg)" }}
            >
              kurz &amp; ehrlich ↘
            </p>

            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto leading-[1.05]">
              erzähl mir, was du machst ·{" "}
              <span className="text-offwhite/45">
                ich sag dir wie man's sichtbar macht.
              </span>
            </h2>

            <p className="mt-6 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              kein pitch-deck, kein agentur-talk. ein erstes gespräch · 20
              minuten · schaust ob's passt. kostet nichts.
            </p>

            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="leistungen_branding_kontakt"
              >
                kontakt aufnehmen →
              </Button>
              <Button
                href="/referenzen"
                variant="glass"
                size="lg"
                analyticsLabel="leistungen_branding_referenzen"
              >
                referenzen ansehen
              </Button>
            </div>

            {/* signatur · klein unten */}
            <p
              className="mt-8 font-hand text-[16px] text-offwhite/35"
              style={{ transform: "rotate(-1deg)" }}
            >
              — nicolas
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
