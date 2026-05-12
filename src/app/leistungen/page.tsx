import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { WebDemo } from "@/components/leistungen/WebDemo";
import { GrafikDemo } from "@/components/leistungen/GrafikDemo";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen");
}

type Dict = {
  srHeadline: string;
  intro: string;
  hand: { l1: string; l2: string; l3: string };
  claimPre: string;
  claimAccent: string;
  claimPost: string;
  bundleHint: string;
  ctaHeadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    srHeadline: "web + branding. aus einem kopf.",
    intro: "zwei disziplinen · ein tisch",
    hand: { l1: "am", l2: "liebsten", l3: "beides." },
    claimPre: "code ",
    claimAccent: "+",
    claimPost: " design · aus einem kopf.",
    bundleHint: "web + branding · alles aus einer hand →",
    ctaHeadline: "nicht sicher, was du brauchst?",
    ctaPrimary: "kurz reden →",
    ctaSecondary: "referenzen ansehen",
  },
  fr: {
    srHeadline: "web + branding. d'une seule tête.",
    intro: "deux disciplines · une table",
    hand: { l1: "idéalement", l2: "les", l3: "deux." },
    claimPre: "code ",
    claimAccent: "+",
    claimPost: " design · d'une seule tête.",
    bundleHint: "web + branding · tout d'une même main →",
    ctaHeadline: "tu ne sais pas trop ce qu'il te faut ?",
    ctaPrimary: "parler vite fait →",
    ctaSecondary: "voir les références",
  },
  en: {
    srHeadline: "web + branding. from one head.",
    intro: "two disciplines · one table",
    hand: { l1: "ideally", l2: "both", l3: "of them." },
    claimPre: "code ",
    claimAccent: "+",
    claimPost: " design · from one head.",
    bundleHint: "web + branding · all from one hand →",
    ctaHeadline: "not sure what you need?",
    ctaPrimary: "quick chat →",
    ctaSecondary: "see work",
  },
};

const LEISTUNGEN = [
  { key: "web", routeKey: "leistungen/web" as const },
  { key: "branding", routeKey: "leistungen/branding" as const },
] as const;

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      {/* HERO · full viewport · demos zentriert, claim unten */}
      <section className="min-h-screen flex flex-col justify-center pt-24 md:pt-28 pb-10">
        <div className="container-site">
          <h1 className="sr-only">{t.srHeadline}</h1>

          <div className="flex justify-center mb-8 md:mb-12">
            <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-label text-offwhite/55">
              {t.intro}
            </span>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-10 lg:gap-14">
            {LEISTUNGEN.map((w) => (
              <Link
                key={w.key}
                href={buildPath(w.routeKey, locale)}
                className="group relative flex flex-col"
              >
                <div className="relative">
                  {w.key === "web" ? <WebDemo /> : <GrafikDemo />}
                </div>
              </Link>
            ))}

            <span
              aria-hidden
              className="hidden lg:flex flex-col items-center pointer-events-none absolute left-1/2 top-1/2 font-hand text-[26px] md:text-[30px] leading-[0.95] text-accent-ink/85"
              style={{ transform: "translate(-50%, -50%) rotate(-4deg)" }}
            >
              <span>{t.hand.l1}</span>
              <span>{t.hand.l2}</span>
              <span>{t.hand.l3}</span>
            </span>
          </div>

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

          <div className="mt-10 md:mt-14 flex flex-col items-center gap-3">
            <p className="font-mono text-[11px] md:text-[12px] uppercase tracking-label text-offwhite/55">
              {t.claimPre}
              <span className="text-accent-ink">{t.claimAccent}</span>
              <span className="text-offwhite/35">{t.claimPost}</span>
            </p>
            <Link
              href={buildPath("preise", locale)}
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 hover:text-accent-ink transition-colors"
            >
              {t.bundleHint}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 pt-4">
        <div className="container-site flex flex-col items-center gap-5 text-center">
          <h2 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite max-w-[620px]">
            {t.ctaHeadline}
          </h2>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              href={buildPath("kontakt", locale)}
              variant="primary"
              size="lg"
              analyticsLabel="leistungen_hub_kontakt"
            >
              {t.ctaPrimary}
            </Button>
            <Button
              href={buildPath("referenzen", locale)}
              variant="glass"
              size="lg"
              analyticsLabel="leistungen_hub_referenzen"
            >
              {t.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
