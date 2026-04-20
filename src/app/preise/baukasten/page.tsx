import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PaketBuilder } from "@/components/preise/PaketBuilder";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/preise/baukasten");
}

const SCHRITTE = [
  {
    num: "1",
    titel: "anschalten",
    text: "web, grafik oder beides • jede kategorie ist ein eigener schalter. was aus ist, kostet nichts.",
  },
  {
    num: "2",
    titel: "feinjustieren",
    text: "umfang, sprachen, cms-bereiche, hosting • alles mit kurzen erklärungen. keine fachbegriffe ohne übersetzung.",
  },
  {
    num: "3",
    titel: "bon nehmen",
    text: "rechts wächst dein kassenzettel live mit. als pdf speichern, link teilen, oder direkt bei mir anfragen.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "preise", url: `${BASE}/preise` },
          { name: "baukasten", url: `${BASE}/preise/baukasten` },
        ]}
      />

      {/* BREADCRUMB */}
      <section className="pt-36 pb-6">
        <div className="container-site">
          <Link
            href="/preise"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            <span aria-hidden>←</span> zurück zur preisübersicht
          </Link>
        </div>
      </section>

      {/* HERO */}
      <section className="pb-14">
        <div className="container-site">
          <SectionLabel num="01">baukasten</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
              bau dir dein paket.{" "}
              <span className="text-offwhite/35">
                der bon wächst live mit.
              </span>
            </h1>
            <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              keine fertigpackung, die ein bisschen zu klein oder ein bisschen
              zu viel ist. du schaltest ein was du brauchst • ich rechne live
              mit, inklusive rabatten und hosting. am ende nimmst du den bon
              als pdf mit oder schickst mir die anfrage direkt.
            </p>
          </div>
        </div>
      </section>

      {/* SO GEHT'S · 3 schritte */}
      <section className="pb-20">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="02">so geht&apos;s</SectionLabel>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {SCHRITTE.map((s) => (
              <div
                key={s.num}
                className="rounded-xl border border-ink/10 bg-ink/[0.015] p-5 md:p-6"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                    schritt {s.num}
                  </span>
                </div>
                <h3 className="mt-3 heading-sans text-[18px] text-offwhite">
                  {s.titel}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-offwhite/55">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUILDER */}
      <section id="builder" className="pb-28 scroll-mt-24">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="03">dein paket</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
              fang einfach an.{" "}
              <span className="text-offwhite/35">
                ändern kannst du jederzeit.
              </span>
            </h2>
          </div>

          <div className="mt-12">
            <PaketBuilder />
          </div>
        </div>
      </section>

      {/* UNTERER ABSCHLUSS */}
      <section className="pb-28">
        <div className="container-site">
          <div className="max-w-[820px] mx-auto text-center">
            <p className="text-[13px] leading-relaxed text-offwhite/55">
              unsicher bei einer entscheidung? lass sie einfach offen • im
              gespräch klären wir das in 10 minuten und ich rechne dir die
              finalen zahlen.
            </p>
            <div className="mt-6">
              <Link
                href="/preise"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
              >
                <span aria-hidden>←</span> zurück zur preisübersicht
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
