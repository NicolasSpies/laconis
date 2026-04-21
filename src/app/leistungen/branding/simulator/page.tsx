import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BrandSimulator } from "@/components/leistungen/branding/BrandSimulator";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/branding/simulator");
}

export default function Page() {
  return (
    <>
      {/* HERO · laconic */}
      <section className="pt-36 pb-12">
        <div className="container-site">
          <Link
            href="/leistungen/branding"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            ← zurück zu branding
          </Link>

          <div className="mt-8">
            <SectionLabel num="01">spielplatz</SectionLabel>
          </div>

          <h1 className="mt-8 heading-display text-[clamp(2.25rem,6.5vw,5rem)] text-offwhite leading-[1.05] max-w-[920px]">
            fummel{" "}
            <span className="italic font-serif text-accent-ink">mal</span>.
            <br />
            <span className="text-offwhite/35">vibes, kein logo.</span>
          </h1>
        </div>
      </section>

      {/* SIMULATOR */}
      <BrandSimulator />

      {/* CTA · kurz */}
      <section className="pb-36 pt-4">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-14 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              lust, das{" "}
              <span className="italic font-serif text-accent-ink">richtig</span>{" "}
              zu machen?
            </h2>
            <div className="mt-7 flex justify-center gap-3 flex-wrap">
              <Link
                href="/kontakt"
                className="inline-flex items-center rounded-full bg-lime text-[#111] px-6 py-3 font-mono text-[11px] uppercase tracking-mono hover:bg-lime/80 transition-colors"
              >
                lass uns reden →
              </Link>
              <Link
                href="/leistungen/branding"
                className="inline-flex items-center rounded-full border border-ink/25 px-6 py-3 font-mono text-[11px] uppercase tracking-mono text-offwhite/75 hover:border-lime/50 hover:text-accent-ink transition-colors"
              >
                zurück zu branding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
