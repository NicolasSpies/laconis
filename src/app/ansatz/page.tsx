import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { AnsatzToggle } from "@/components/ansatz/AnsatzToggle";
import { UnifiedProcess } from "@/components/ansatz/UnifiedProcess";
import { WebManifest } from "@/components/leistungen/web/WebManifest";
import { Manifest } from "@/components/leistungen/grafik/Manifest";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ansatz");
}

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="pt-32 md:pt-36 pb-16 md:pb-20">
        <div className="container-site">
          <SectionLabel num="01">ansatz</SectionLabel>

          <div className="mt-10 max-w-[820px]">
            <h1 className="heading-display text-[clamp(2.25rem,6vw,4.5rem)] text-offwhite leading-[0.98]">
              wie ich{" "}
              <span className="text-offwhite/35">arbeite.</span>
            </h1>
            <p className="mt-7 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              kein agentur-gantt-chart, keine blackbox. vier schritte vom
              ersten gespräch bis zur übergabe · und eine ehrliche liste
              von dem, was ich bewusst nicht mache.
            </p>
          </div>
        </div>
      </section>

      {/* Unified process · gilt für web + grafik */}
      <UnifiedProcess num="02" />

      {/* Toggle · manifeste unterscheiden sich zwischen disziplinen */}
      <AnsatzToggle
        num="03"
        web={<WebManifest hideHeader />}
        grafik={<Manifest hideHeader />}
      />

      {/* CTA */}
      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              klingt nach deiner art zu arbeiten?
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              30 minuten video-call oder kaffee in eupen. keine präsentation,
              kein vertrag · nur klarheit.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="ansatz_final_kontakt"
              >
                gespräch anfragen →
              </Button>
              <Button
                href="/leistungen"
                variant="glass"
                size="lg"
                analyticsLabel="ansatz_final_leistungen"
              >
                leistungen ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
