import { BrandDesk } from "@/components/leistungen/branding/BrandDesk";
import { BrandingBento } from "@/components/leistungen/branding/BrandingBento";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";

/**
 * /preview/branding-a · option A · SpecimenKartei komplett raus.
 * flow: BrandDesk → BrandingBento (direkt).
 */
export default function Page() {
  return (
    <main className="pt-32">
      <PreviewLabel code="A · specimen komplett raus" />
      <BrandDesk num="02" />
      <ScribbleBreak text="alles aus einer hand ↓" rotate={-1} />
      <BrandingBento num="03" />
    </main>
  );
}

function PreviewLabel({ code }: { code: string }) {
  return (
    <div className="container-site mb-8">
      <span className="inline-flex font-mono text-[11px] uppercase tracking-[0.18em] text-[#e1fd52] bg-[#0a0a0a] px-3 py-2 rounded-full">
        preview · {code}
      </span>
    </div>
  );
}
