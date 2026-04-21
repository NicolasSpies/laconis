import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ContentCoreSection } from "@/components/leistungen/web/ContentCoreSection";
import { HostingBlock } from "@/components/leistungen/web/HostingBlock";
import { ContentCoreVsWordpress } from "@/components/leistungen/web/ContentCoreVsWordpress";
import { ContentCoreDeepDive } from "@/components/leistungen/web/ContentCoreDeepDive";
import { BeweisStrip } from "@/components/leistungen/web/BeweisStrip";
import { ContentControl } from "@/components/leistungen/web/ContentControl";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/web/technik");
}

export default function Page() {
  return (
    <>
      {/* breadcrumb */}
      <section className="pt-36 pb-4">
        <div className="container-site">
          <Link
            href="/leistungen/web"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            <span>←</span> zurück zu leistungen · web
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="pb-24">
        <div className="container-site">
          <SectionLabel num="01">web · technik</SectionLabel>
          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,7vw,5rem)] text-offwhite leading-[1.02]">
              für alle, die's genau{" "}
              <span className="text-offwhite/35">wissen wollen.</span>
            </h1>
            <p className="mt-8 max-w-[640px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              die kurzversion steht auf der haupt-seite. hier unten: mein
              eigenes CMS in aktion, wo das zeug läuft, warum ich kein
              wordpress baue, und wie contentcore technisch aufgebaut ist.
            </p>
            <p className="mt-4 max-w-[640px] text-[13px] leading-relaxed text-offwhite/55">
              kein marketing-sprech. ehrliche technik. nimm dir zeit · oder
              spring direkt zu einem abschnitt.
            </p>
          </div>

          {/* anchor-nav */}
          <nav className="mt-10 flex flex-wrap gap-2">
            {[
              { href: "#beweis", label: "beweis · scores" },
              { href: "#content-control", label: "content-control" },
              { href: "#contentcore", label: "contentcore · überblick" },
              { href: "#hosting", label: "hosting" },
              { href: "#cms-vergleich", label: "contentcore vs wordpress" },
              { href: "#deep-dive", label: "contentcore architektur" },
            ].map((a) => (
              <a
                key={a.href}
                href={a.href}
                className="font-mono text-[11px] uppercase tracking-label px-3 py-1.5 rounded-full border border-ink/10 text-offwhite/55 hover:border-lime/25 hover:text-accent-ink transition-colors"
              >
                {a.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div id="beweis">
        <BeweisStrip num="02" />
      </div>
      <div id="content-control">
        <ContentControl num="03" />
      </div>
      <div id="contentcore">
        <ContentCoreSection num="04" />
      </div>
      <div id="hosting">
        <HostingBlock num="05" />
      </div>
      <div id="cms-vergleich">
        <ContentCoreVsWordpress num="06" />
      </div>
      <div id="deep-dive">
        <ContentCoreDeepDive num="07" />
      </div>

      {/* CTA */}
      <section className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              noch fragen? einfach fragen.
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              technik-details sind ein sprungbrett, keine checkliste. wenn was
              unklar ist · sag bescheid, ich klär's im gespräch.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href="/kontakt" variant="primary" size="lg">
                kontakt aufnehmen →
              </Button>
              <Button href="/leistungen/web" variant="glass" size="lg">
                ← zurück zur übersicht
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
