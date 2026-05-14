import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { TiltCard } from "@/components/shared/TiltCard";
import { GreySection } from "@/components/shared/GreySection";
import { Marquee } from "@/components/shared/Marquee";
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
  kicker: string;
  srHeadline: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  sub: string;
  webTitle: string;
  webDesc: string;
  webCta: string;
  brandTitle: string;
  brandDesc: string;
  brandCta: string;
  marqueeBits: string[];
  bundleHint: string;
  ctaHeadline: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· leistungen",
    srHeadline: "web + branding. aus einem kopf.",
    heroL1: "was ich",
    heroL2: "mache.",
    heroItalic: "am liebsten beides.",
    sub: "zwei disziplinen · ein tisch. code und design aus einem kopf · keine zwei dienstleister, keine versteckten kosten in der koordination.",
    webTitle: "web.",
    webDesc: "von der ersten skizze bis zum launch. eigenes CMS, dreisprachig, schnell, kein bloat. lighthouse 95+, ladezeit < 1s.",
    webCta: "alles über web →",
    brandTitle: "branding.",
    brandDesc: "wortmarke, brand guide, farbsystem, druck. allein oder zur website dazu · dann sparst du dir die koordination.",
    brandCta: "alles über branding →",
    marqueeBits: ["·", "web", "·", "branding", "·", "logo", "·", "cms", "·", "print", "·", "trilingue", "·"],
    bundleHint: "web + branding · alles aus einer hand →",
    ctaHeadline: "nicht sicher, was du brauchst?",
    ctaPrimary: "kurz reden →",
    ctaSecondary: "referenzen ansehen",
  },
  fr: {
    kicker: "· services",
    srHeadline: "web + branding. d'une seule tête.",
    heroL1: "ce que",
    heroL2: "je fais.",
    heroItalic: "idéalement les deux.",
    sub: "deux disciplines · une table. code et design d'une seule tête · pas deux prestataires, pas de coûts cachés dans la coordination.",
    webTitle: "web.",
    webDesc: "de la première esquisse au launch. CMS sur mesure, trilingue, rapide, pas de bloat. lighthouse 95+, chargement < 1s.",
    webCta: "tout sur le web →",
    brandTitle: "branding.",
    brandDesc: "wordmark, brand guide, couleurs, impression. seul ou avec le site · alors tu épargnes la coordination.",
    brandCta: "tout sur le branding →",
    marqueeBits: ["·", "web", "·", "branding", "·", "logo", "·", "cms", "·", "print", "·", "trilingue", "·"],
    bundleHint: "web + branding · tout d'une même main →",
    ctaHeadline: "tu ne sais pas trop ce qu'il te faut ?",
    ctaPrimary: "parler vite fait →",
    ctaSecondary: "voir les références",
  },
  en: {
    kicker: "· services",
    srHeadline: "web + branding. from one head.",
    heroL1: "what i",
    heroL2: "do.",
    heroItalic: "ideally both.",
    sub: "two disciplines · one table. code and design from one head · no two providers, no hidden costs in the coordination.",
    webTitle: "web.",
    webDesc: "from first sketch to launch. custom CMS, trilingual, fast, no bloat. lighthouse 95+, load time < 1s.",
    webCta: "more on web →",
    brandTitle: "branding.",
    brandDesc: "wordmark, brand guide, colours, print. on its own or with the website · saves you the coordination.",
    brandCta: "more on branding →",
    marqueeBits: ["·", "web", "·", "branding", "·", "logo", "·", "cms", "·", "print", "·", "trilingual", "·"],
    bundleHint: "web + branding · all from one hand →",
    ctaHeadline: "not sure what you need?",
    ctaPrimary: "quick chat →",
    ctaSecondary: "see work",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      {/* HERO · grey wie homepage */}
      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2}
        italicAccent={t.heroItalic}
        sub={t.sub}
      />
      <h1 className="sr-only">{t.srHeadline}</h1>

      {/* BIG SERVICE CARDS · 3D tilt im stil von home.ServicesMorph aber bigger */}
      <GreySection className="!py-16 md:!py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">
          <TiltCard preset="lime">
            <Link
              href={buildPath("leistungen/web", locale)}
              className="flex flex-col justify-between p-10 md:p-12 lg:p-14"
              style={{
                color: "inherit",
                textDecoration: "none",
                minHeight: "clamp(420px, 50vw, 560px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className="text-[clamp(3.5rem,7vw,6rem)] leading-[0.88] font-black tracking-[-0.04em]">
                  {t.webTitle}
                </p>
                <div
                  className="mt-6 opacity-70 scale-90 origin-left"
                  style={{ filter: "drop-shadow(0 0 0 #0a0a0a)" }}
                >
                  <WebDemo />
                </div>
              </div>
              <div>
                <p
                  className="text-[15px] md:text-[16px] leading-relaxed mb-5"
                  style={{ opacity: 0.78 }}
                >
                  {t.webDesc}
                </p>
                <p
                  className="font-mono text-[12px] uppercase tracking-label"
                  style={{ opacity: 0.7 }}
                >
                  {t.webCta}
                </p>
              </div>
            </Link>
          </TiltCard>

          <TiltCard preset="lila">
            <Link
              href={buildPath("leistungen/branding", locale)}
              className="flex flex-col justify-between p-10 md:p-12 lg:p-14"
              style={{
                color: "inherit",
                textDecoration: "none",
                minHeight: "clamp(420px, 50vw, 560px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className="text-[clamp(3.5rem,7vw,6rem)] leading-[0.88] font-black tracking-[-0.04em]">
                  {t.brandTitle}
                </p>
                <div className="mt-6 opacity-80 scale-90 origin-left">
                  <GrafikDemo />
                </div>
              </div>
              <div>
                <p
                  className="text-[15px] md:text-[16px] leading-relaxed mb-5"
                  style={{ opacity: 0.78 }}
                >
                  {t.brandDesc}
                </p>
                <p
                  className="font-mono text-[12px] uppercase tracking-label"
                  style={{ opacity: 0.7 }}
                >
                  {t.brandCta}
                </p>
              </div>
            </Link>
          </TiltCard>
        </div>
      </GreySection>

      {/* Marquee strip · dark mit lime · gibt der seite atmospheric break */}
      <Marquee items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={42} />

      {/* CTA · lila tint */}
      <GreySection tint="lila">
        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] leading-[0.98] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
            {t.ctaHeadline}
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("referenzen", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>

          <p className="mt-12">
            <Link
              href={buildPath("preise", locale)}
              className="font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/55 hover:text-[#0a0a0a] transition-colors"
            >
              {t.bundleHint}
            </Link>
          </p>
        </div>
      </GreySection>
    </>
  );
}
