import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ContentCoreSection } from "@/components/leistungen/web/ContentCoreSection";
import { WebApproaches } from "@/components/leistungen/web/WebApproaches";
import { HostingBlock } from "@/components/leistungen/web/HostingBlock";
import { FabryCase } from "@/components/leistungen/web/FabryCase";
import { ProcessFlow } from "@/components/leistungen/web/ProcessFlow";
import { ContentCoreVsWordpress } from "@/components/leistungen/web/ContentCoreVsWordpress";
import { ContentCoreDeepDive } from "@/components/leistungen/web/ContentCoreDeepDive";
import { WebManifest } from "@/components/leistungen/web/WebManifest";
import { WebVsAlternatives } from "@/components/leistungen/web/WebVsAlternatives";
import { WebDeliverables } from "@/components/leistungen/web/WebDeliverables";
import { TechAccordion } from "@/components/leistungen/web/TechAccordion";

export const metadata = { title: "leistungen · web" };

export default function Page() {
  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">leistungen · web</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              websites, die nicht im{" "}
              <span className="text-offwhite/35">grundrauschen</span>
              <br />
              verschwinden.
            </h1>
            <p className="mt-8 max-w-[580px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
              kein template, kein baukasten. du bekommst eine seite, die nach
              dir aussieht. handgemacht von der ersten zeile code bis zur
              letzten einstellung. schnell, zugänglich, mit meinem eigenen cms
              zum selberpflegen.
            </p>
          </div>
        </div>
      </section>

      {/* ContentCore */}
      <ContentCoreSection />

      {/* Deliverables */}
      <WebDeliverables />

      {/* Fabry-Beweis */}
      <FabryCase />

      {/* Prozess */}
      <ProcessFlow />

      {/* TECHNIKER-BEREICH in accordion */}
      <TechAccordion>
        <WebApproaches />
        <HostingBlock />
        <ContentCoreVsWordpress />
        <ContentCoreDeepDive />
        <WebVsAlternatives />
        <WebManifest />
      </TechAccordion>

      {/* CTA */}
      <section id="kontakt" className="pb-36 pt-16">
        <div className="container-site">
          <div className="rounded-2xl border border-ink/10 bg-gradient-to-br from-ink/[0.03] to-transparent p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              klingt nach deinem projekt?
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              30 minuten video-call oder kaffee in eupen. ich sag dir ehrlich,
              ob ich die richtige adresse bin.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt" variant="primary" size="lg">
                kontakt aufnehmen →
              </Button>
              <Button href="/preise" variant="glass" size="lg">
                preise ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
