import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { MarqueeI18n } from "@/components/home/MarqueeI18n";

/**
 * Hero ist above-fold → eager geladen.
 * Der rest ist below-fold und wird per next/dynamic in eigene chunks
 * gesplittet. server rendered trotzdem (SEO bleibt intakt), aber der
 * client-JS kommt in kleineren häppchen.
 */
const SkeletonSection = ({ h }: { h: number }) => (
  <div aria-hidden style={{ minHeight: `${h}px` }} />
);

const UeberMichTeaser = dynamic(
  () =>
    import("@/components/home/UeberMichTeaser").then((m) => m.UeberMichTeaser),
  { loading: () => <SkeletonSection h={420} /> },
);
const LeistungenTeaser = dynamic(
  () =>
    import("@/components/home/LeistungenTeaser").then((m) => m.LeistungenTeaser),
  { loading: () => <SkeletonSection h={1000} /> },
);
const PreiseTeaser = dynamic(
  () => import("@/components/home/PreiseTeaser").then((m) => m.PreiseTeaser),
  { loading: () => <SkeletonSection h={640} /> },
);
const ReferenzenTeaser = dynamic(
  () =>
    import("@/components/home/ReferenzenTeaser").then((m) => m.ReferenzenTeaser),
  { loading: () => <SkeletonSection h={800} /> },
);
const KontaktStrip = dynamic(
  () => import("@/components/home/KontaktStrip").then((m) => m.KontaktStrip),
  { loading: () => <SkeletonSection h={480} /> },
);

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* der mensch zuerst · wer steckt dahinter */}
      <UeberMichTeaser />

      <LeistungenTeaser />

      <PreiseTeaser />

      <ReferenzenTeaser />

      {/* marquee · setup vor kontakt · words werden i18n-aware vom wrapper geliefert */}
      <MarqueeI18n direction="right" baseVelocity={2.5} />

      <KontaktStrip />
    </>
  );
}
