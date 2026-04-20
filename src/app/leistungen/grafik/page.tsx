import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { SpecimenKartei } from "@/components/leistungen/grafik/SpecimenKartei";
import { Deliverables } from "@/components/leistungen/grafik/Deliverables";
import { BrandVsAlternatives } from "@/components/leistungen/grafik/BrandVsAlternatives";
import { StaerkenStrip } from "@/components/shared/StaerkenStrip";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/grafik");
}

const BASE = "https://laconis.be";
const KREATIV_SERVICES = [
  {
    name: "Brand · Basis",
    description:
      "Logo inkl. Varianten + Favicon, Farbpalette, Typografie · ideal für Neugründer und Selbstständige.",
    price: 600,
    serviceType: "Branding",
  },
  {
    name: "Brand · Essential",
    description:
      "Kompletter Brand-Guide + Visitenkarte, Briefpapier, 3 Social-Templates · ein konsistenter Look, mit dem du arbeiten kannst.",
    price: 1400,
    serviceType: "Branding",
  },
  {
    name: "Brand · Pro",
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
          { name: "grafik", url: `${BASE}/leistungen/grafik` },
        ]}
      />
      <ServiceSchema services={KREATIV_SERVICES} />

      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">leistungen · grafik</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              marken, die{" "}
              <span className="text-offwhite/35">wiedererkennbar</span>
              <br />
              bleiben.
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              branding ist kein logo. branding ist das gefühl, das jemand
              bekommt, wenn er deinen namen hört · und die visuellen werkzeuge,
              die dieses gefühl transportieren. ich baue beides.
            </p>
          </div>
        </div>
      </section>

      {/* 02 · STÄRKEN-STRIP · 3 punkte teaser */}
      <StaerkenStrip />

      {/* 03 · DEIN START-PAKET · das angebot */}
      <SpecimenKartei num="03" />

      {/* 04 · WAS DU BEKOMMST · deliverables direkt nach angebot */}
      <Deliverables num="04" />

      {/* 05 · EINORDNUNG · passt das zu mir */}
      <BrandVsAlternatives num="05" />

      {/* 06 · VERTIEFUNGS-LINK · ansatz */}
      <section className="pb-20">
        <div className="container-site">
          <Link
            href="/ansatz"
            className="group block rounded-xl border border-ink/10 bg-ink/[0.02] px-6 py-5 hover:border-lime/25 transition-colors md:flex md:items-center md:justify-between gap-4"
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
              lust deine marke aufzubauen?
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
                analyticsLabel="leistungen_grafik_kontakt"
              >
                lass uns reden →
              </Button>
              <Button
                href="/referenzen"
                variant="glass"
                size="lg"
                analyticsLabel="leistungen_grafik_referenzen"
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
