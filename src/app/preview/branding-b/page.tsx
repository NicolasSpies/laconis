import { BrandDesk } from "@/components/leistungen/branding/BrandDesk";
import { BrandingBento } from "@/components/leistungen/branding/BrandingBento";
import { BrandSpecimen } from "@/components/home/BrandSpecimen";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";

/**
 * /preview/branding-b · option B · SpecimenKartei reduziert auf 1 musterblatt
 * (verwendet BrandSpecimen statt der ausführlichen kartei).
 */
export default function Page() {
  return (
    <main className="pt-32">
      <PreviewLabel code="B · 1 musterblatt statt 4" />
      <BrandDesk num="02" />
      <ScribbleBreak text="ein beispiel ↓" rotate={-1} />
      <section className="pb-16 md:pb-20">
        <div className="container-site max-w-[1100px]">
          <BrandSpecimen />
        </div>
      </section>
      <BrandingBento num="04" />
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
