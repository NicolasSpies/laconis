import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";

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
const Manifest = dynamic(
  () => import("@/components/home/Manifest").then((m) => m.Manifest),
  { loading: () => <SkeletonSection h={600} /> },
);
const PreiseTeaser = dynamic(
  () => import("@/components/home/PreiseTeaser").then((m) => m.PreiseTeaser),
  { loading: () => <SkeletonSection h={640} /> },
);
const ProzessStrip = dynamic(
  () => import("@/components/home/ProzessStrip").then((m) => m.ProzessStrip),
  { loading: () => <SkeletonSection h={640} /> },
);
const ScribbleDivider = dynamic(
  () =>
    import("@/components/home/ScribbleDivider").then((m) => m.ScribbleDivider),
  { loading: () => <SkeletonSection h={140} /> },
);
const ReferenzenTeaser = dynamic(
  () =>
    import("@/components/home/ReferenzenTeaser").then((m) => m.ReferenzenTeaser),
  { loading: () => <SkeletonSection h={800} /> },
);
const TestimonialStrip = dynamic(
  () =>
    import("@/components/home/TestimonialStrip").then((m) => m.TestimonialStrip),
  { loading: () => <SkeletonSection h={260} /> },
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

      {/* keyword-marquee · stitch in die leistungen */}
      <Marquee
        words={[
          "design",
          "code",
          "launch",
          "handgemacht",
          "eupen",
          "wallonien",
          "messbar",
          "kein baukasten",
          "responsive",
          "mehrsprachig",
        ]}
        direction="left"
      />

      <LeistungenTeaser />

      <ScribbleDivider variant="wave" note="warum ich das so mache ·" />

      <Manifest />

      <PreiseTeaser />

      <ProzessStrip />

      <ReferenzenTeaser />

      <TestimonialStrip />

      <ScribbleDivider variant="loop" />

      {/* zweiter marquee · umgekehrt, setup vor kontakt */}
      <Marquee
        words={[
          "sag hallo",
          "schreib mir",
          "ruf an",
          "mail",
          "multistep",
          "kaffee in eupen",
          "30-min call",
        ]}
        direction="right"
        duration={75}
      />

      <KontaktStrip />
    </>
  );
}
