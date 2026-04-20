import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";

/**
 * Hero + SocialProof sind above-fold → eager geladen.
 * Der rest ist below-fold und wird per next/dynamic in eigene chunks
 * gesplittet. server rendered trotzdem (SEO bleibt intakt), aber der
 * client-JS kommt in kleineren häppchen.
 */
/* section-skeletons · höhe grob anhand real-rendering gemessen,
   verhindert layout-shift beim lazy-einblenden. */
const SkeletonSection = ({ h }: { h: number }) => (
  <div aria-hidden style={{ minHeight: `${h}px` }} />
);

const LeistungenTeaser = dynamic(
  () =>
    import("@/components/home/LeistungenTeaser").then((m) => m.LeistungenTeaser),
  { loading: () => <SkeletonSection h={900} /> },
);
const Manifest = dynamic(
  () => import("@/components/home/Manifest").then((m) => m.Manifest),
  { loading: () => <SkeletonSection h={600} /> },
);
const ReferenzenTeaser = dynamic(
  () =>
    import("@/components/home/ReferenzenTeaser").then((m) => m.ReferenzenTeaser),
  { loading: () => <SkeletonSection h={800} /> },
);
const UeberMichTeaser = dynamic(
  () =>
    import("@/components/home/UeberMichTeaser").then((m) => m.UeberMichTeaser),
  { loading: () => <SkeletonSection h={640} /> },
);
const KontaktStrip = dynamic(
  () => import("@/components/home/KontaktStrip").then((m) => m.KontaktStrip),
  { loading: () => <SkeletonSection h={480} /> },
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <LeistungenTeaser />
      <Manifest />
      <ReferenzenTeaser />
      <UeberMichTeaser />
      <KontaktStrip />
    </>
  );
}
