import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { SpecimenKartei } from "@/components/leistungen/branding/SpecimenKartei";
import { Deliverables } from "@/components/leistungen/branding/Deliverables";
import { BrandVsAlternatives } from "@/components/leistungen/branding/BrandVsAlternatives";
import { OnDemandExtras } from "@/components/leistungen/branding/OnDemandExtras";
import { StaerkenStrip } from "@/components/shared/StaerkenStrip";
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

      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">leistungen · branding</SectionLabel>

          <h1 className="mt-8 heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite leading-[1.02]">
            logo, brand &{" "}
            <span className="text-offwhite/35">alles drum herum</span>.
          </h1>
          <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
            ein logo allein ist noch keine marke. ein logo + typografie +
            farben + ton + einheitlicher auftritt auf visitenkarte, social
            und schaufenster — das ist eine marke. beides geht von mir ·
            handgemacht in eupen.
          </p>
          <p className="mt-5 max-w-[620px] text-[14px] leading-relaxed text-offwhite/35">
            branding für startups, handwerker, kleine unternehmen · auch
            einfach nur ein logo, wenn du damit starten willst.
          </p>
        </div>
      </section>

      {/* 02 · STÄRKEN-STRIP · 3 punkte teaser */}
      <StaerkenStrip />

      {/* 03 · DEIN START-PAKET · das angebot */}
      <SpecimenKartei num="03" />

      {/* 04 · WAS DU BEKOMMST · deliverables + on-demand extras (ein kapitel) */}
      <Deliverables num="04" />
      <OnDemandExtras />

      {/* 05 · EINORDNUNG · passt das zu mir */}
      <BrandVsAlternatives num="05" />

      {/* 07 · VERTIEFUNGS-LINK · ansatz */}
      <section className="pb-20">
        <div className="container-site">
          <Link
            href="/ansatz"
            className="group block glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors md:flex md:items-center md:justify-between gap-4"
          >
            <div>
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                wie ich arbeite
              </span>
              <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                vier skizzen vom ersten gespräch bis zur übergabe · und was
                ich bewusst nicht mache.
              </p>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 mt-3 md:mt-0">
              ansatz ansehen →
            </span>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              lust auf ein logo · oder gleich eine ganze marke?
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              erzähl mir, was du machst. ich sag dir, wie man es sichtbar
              macht.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="leistungen_branding_kontakt"
              >
                lass uns reden →
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
          </div>
        </div>
      </section>
    </>
  );
}
