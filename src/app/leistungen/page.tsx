import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { WebDemo } from "@/components/leistungen/WebDemo";
import { GrafikDemo } from "@/components/leistungen/GrafikDemo";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen");
}

type Leistung = {
  key: "web" | "grafik";
  label: string;
  href: string;
};

const LEISTUNGEN: Leistung[] = [
  { key: "web", label: "web", href: "/leistungen/web" },
  { key: "grafik", label: "grafik", href: "/leistungen/grafik" },
];

export default function Page() {
  return (
    <>
      {/* HERO · full viewport · demos zentriert, claim unten */}
      <section className="min-h-screen flex flex-col justify-center pt-24 md:pt-28 pb-10">
        <div className="container-site">
          {/* h1 · sichtbar nur für screenreader, visual hierarchy über demos
              → trotzdem SEO-wirksam, klare primäre aussage für die route */}
          <h1 className="sr-only">web + grafik. aus einem kopf.</h1>

          {/* kleine pre-h-aufklärung für sehende user */}
          <div className="flex justify-center mb-8 md:mb-12">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-label text-offwhite/55">
              zwei disziplinen · ein tisch
            </span>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14">
            {LEISTUNGEN.map((w, i) => (
              <Link
                key={w.key}
                href={w.href}
                className="group relative flex flex-col"
              >
                {/* kringel-nummer · handgezeichnet */}
                <span
                  aria-hidden
                  className="absolute -top-6 -left-2 z-10 font-hand text-[38px] leading-none text-accent-ink"
                  style={{
                    transform: `rotate(${i === 0 ? -8 : 6}deg)`,
                  }}
                >
                  {i === 0 ? "i." : "ii."}
                </span>
                <div className="relative">
                  {w.key === "web" ? <WebDemo /> : <GrafikDemo />}
                </div>
              </Link>
            ))}

            {/* hand-aside zwischen den cards · nur desktop sichtbar */}
            <span
              aria-hidden
              className="hidden lg:block pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-hand text-[22px] text-accent-ink/80 whitespace-nowrap"
              style={{ transform: "translate(-50%, -50%) rotate(-4deg)" }}
            >
              am liebsten beides.
            </span>
          </div>

          {/* scribble-trennlinie unter der card-row */}
          <div className="mt-10 md:mt-14 flex justify-center">
            <svg
              aria-hidden
              width="180"
              height="18"
              viewBox="0 0 180 18"
              className="text-offwhite/25"
            >
              <path
                d="M 2 9 Q 30 3 60 10 T 120 9 Q 150 6 178 10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>

          {/* dezente claim + bundle-hint · unter den demos */}
          <div className="mt-10 md:mt-14 flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-label text-offwhite/55">
              code <span className="text-accent-ink">+</span> design ·{" "}
              <span className="text-offwhite/35">aus einem kopf.</span>
            </p>
            <Link
              href="/preise"
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
            >
              beides zusammen? als bundle günstiger →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA · knapp */}
      <section className="pb-32 pt-4">
        <div className="container-site flex flex-col items-center gap-5 text-center">
          <h2 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite max-w-[620px]">
            nicht sicher, was du brauchst?
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              href="/kontakt"
              variant="primary"
              size="lg"
              analyticsLabel="leistungen_hub_kontakt"
            >
              kurz reden →
            </Button>
            <Button
              href="/referenzen"
              variant="glass"
              size="lg"
              analyticsLabel="leistungen_hub_referenzen"
            >
              referenzen ansehen
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
