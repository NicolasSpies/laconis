import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { getHomeFaqItems } from "@/data/home-faq";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/");
}

/**
 * home composition · sprint-5 final · light-first mit lila als duo-akzent.
 * referenzen tiefer gesetzt · funnel-flow: identität → proof → action.
 *
 *   1 · Hero              ☼ LIGHT  (clean left-aligned, marker + lila scribbles)
 *   2 · ServicesMorph     ☼ LIGHT  (2 cards web/branding · web primary dark)
 *   3 · SplitStatement    ◆ LILA   (lila slab + dark portrait · "wer ich bin")
 *   4 · PreiseTeaser      ☼ LIGHT  (3 factor-cards · klein-print price-range)
 *   5 · HorizontalCases   ◐ DARK   (scroll-jacked cases · proof tiefer in der seite)
 *   6 · ContactBlock      ☼ LIGHT  (warm closing · lime + lila CTAs)
 *
 * UeberMichTeaser raus · personal-content lebt jetzt im SplitStatement-portrait.
 * MarqueeI18n raus · zu viel noise.
 * OParallax raus · 3D-ø-experiment passte nicht zum sauberen funnel.
 * Numerierung überall raus · KISS.
 */
const SkeletonSection = ({ h }: { h: number }) => (
  <div aria-hidden style={{ minHeight: `${h}px` }} />
);

const ServicesSplit = dynamic(
  () => import("@/components/home/ServicesSplit").then((m) => m.ServicesSplit),
  { loading: () => <SkeletonSection h={600} /> },
);
const HorizontalCases = dynamic(
  () =>
    import("@/components/home/HorizontalCases").then((m) => m.HorizontalCases),
  { loading: () => <SkeletonSection h={1200} /> },
);
const SplitStatement = dynamic(
  () =>
    import("@/components/home/SplitStatement").then((m) => m.SplitStatement),
  { loading: () => <SkeletonSection h={0} /> },
);
const ContactBlock = dynamic(
  () => import("@/components/home/ContactBlock").then((m) => m.ContactBlock),
  { loading: () => <SkeletonSection h={680} /> },
);

export default function HomePage() {
  const locale = getLocale();
  const faqItems = getHomeFaqItems(locale);

  return (
    <>
      {/* FAQPage-schema · money-keywords landen als AI-/SERP-antworten */}
      <FAQSchema items={faqItems.map((f) => ({ q: f.q, a: f.a }))} />
      <Hero />
      <ServicesSplit />
      <SplitStatement />
      <div data-theme="dark" className="bg-dark text-offwhite">
        <HorizontalCases />
      </div>
      {/* kompakte FAQ · 4 fragen · SEO-content auf der home */}
      <HomeFAQ />
      <ContactBlock />
    </>
  );
}
