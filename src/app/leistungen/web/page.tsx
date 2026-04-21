import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { HeroBrowser } from "@/components/leistungen/web/HeroBrowser";
import { WebApproaches } from "@/components/leistungen/web/WebApproaches";
import { WebDeliverables } from "@/components/leistungen/web/WebDeliverables";
import { WebVsAlternatives } from "@/components/leistungen/web/WebVsAlternatives";
import { StaerkenStrip } from "@/components/shared/StaerkenStrip";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

const BASE = "https://laconis.be";
const WEB_SERVICES = [
  {
    name: "Website · Basis",
    description:
      "Onepager · responsiv · SEO · eigenes analytics · ssl + backups · für Selbständige und Neugründer. Domain und Mail separat zubuchbar.",
    price: 1400,
    serviceType: "Web Development",
  },
  {
    name: "Website · Standard",
    description:
      "Alles aus Basis, plus bis zu 5 Unterseiten und 1 CMS-Bereich zum selber pflegen · ideal für KMUs und Lokalbetriebe. Weitere Seiten jederzeit zubuchbar.",
    price: 2800,
    serviceType: "Web Development",
  },
  {
    name: "Website · Pro",
    description:
      "Alles aus Standard, plus bis zu 10 Unterseiten, 2 CMS-Bereiche und Mehrsprachigkeit (2 Sprachen inkl.) · für wachsende Unternehmen. Seiten, Sprachen und Bereiche erweiterbar.",
    price: 4200,
    serviceType: "Web Development",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/web");
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "leistungen", url: `${BASE}/leistungen` },
          { name: "web", url: `${BASE}/leistungen/web` },
        ]}
      />
      <ServiceSchema services={WEB_SERVICES} />

      {/* HERO · split-layout · text links, live-browser-demo rechts */}
      <section className="pt-32 md:pt-36 pb-16 md:pb-20">
        <div className="container-site">
          <SectionLabel num="01">leistungen · web</SectionLabel>

          <div className="mt-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            {/* LINKS · text */}
            <div className="max-w-[620px]">
              <h1 className="heading-display text-[clamp(2.25rem,6vw,4.5rem)] text-offwhite leading-[0.98]">
                websites, die nicht im{" "}
                <span className="text-offwhite/35">grundrauschen</span>{" "}
                verschwinden.
              </h1>
              <p className="mt-7 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
                kein template, kein baukasten. handgemacht von der ersten zeile
                code bis zur letzten einstellung · schnell, zugänglich, mit
                meinem eigenen cms zum selberpflegen.
              </p>

              {/* mini-stats unter dem text · ersetzt zweite fette headline */}
              <dl className="mt-10 grid grid-cols-3 gap-4 max-w-[520px]">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    google-score
                  </dt>
                  <dd className="heading-display text-lime text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    95+
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    du pflegst
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    selbst
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    launch
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    2-6w
                  </dd>
                </div>
              </dl>
            </div>

            {/* RECHTS · live browser-demo */}
            <div className="relative">
              <HeroBrowser />
            </div>
          </div>
        </div>
      </section>

      {/* STÄRKEN-STRIP · 3 punkte teaser (geteilte komponente, unnummeriert) */}
      <StaerkenStrip />

      {/* 02 · ZWEI WEGE · das angebot */}
      <WebApproaches num="02" />

      {/* 03 · WAS DU BEKOMMST · deliverables direkt nach angebot */}
      <WebDeliverables num="03" />

      {/* 04 · EINORDNUNG · passt das zu mir */}
      <WebVsAlternatives num="04" />

      {/* VERTIEFUNGS-LINKS · technik + ansatz */}
      <section className="pb-20">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/leistungen/web/technik"
              className="group glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  für die techniker
                </span>
                <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                  hosting, cms-architektur, contentcore vs wordpress.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 self-center">
                →
              </span>
            </Link>
            <Link
              href="/ansatz"
              className="group glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors flex items-start justify-between gap-4"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  wie ich arbeite
                </span>
                <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                  vier schritte, keine blackbox · und was ich nicht mache.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 self-center">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              klingt nach deinem projekt?
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              30 minuten video-call oder kaffee in eupen. ich sag dir ehrlich,
              ob ich die richtige adresse bin.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="leistungen_web_kontakt"
              >
                kontakt aufnehmen →
              </Button>
              <Button
                href="/preise"
                variant="glass"
                size="lg"
                analyticsLabel="leistungen_web_preise"
              >
                preise ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
