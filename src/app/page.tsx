import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { LeistungenTeaser } from "@/components/home/LeistungenTeaser";
import { Manifest } from "@/components/home/Manifest";
import { ReferenzenTeaser } from "@/components/home/ReferenzenTeaser";
import { UeberMichTeaser } from "@/components/home/UeberMichTeaser";
import { KontaktStrip } from "@/components/home/KontaktStrip";

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
