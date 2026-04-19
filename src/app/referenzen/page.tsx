import { SectionLabel } from "@/components/ui/SectionLabel";
import { Moodboard } from "@/components/referenzen/Moodboard";

export const metadata = { title: "referenzen" };

export default function Page() {
  return (
    <section className="pt-36 pb-32">
      <div className="container-site">
        <SectionLabel num="04">referenzen</SectionLabel>

        <div className="mt-8 max-w-[900px]">
          <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite">
            ausgewählte{" "}
            <span className="text-offwhite/35">arbeiten.</span>
          </h1>
          <p className="mt-8 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/60">
            projekte, die bleiben • keine 0815-websites, keine austauschbaren
            logos. einfach sachen, die zu den leuten passen, die dahinter
            stehen.
          </p>
        </div>

        <div className="mt-16">
          <Moodboard />
        </div>
      </div>
    </section>
  );
}
