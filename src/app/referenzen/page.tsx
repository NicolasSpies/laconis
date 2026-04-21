import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactSheet } from "@/components/referenzen/ContactSheet";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/referenzen");
}

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
          <p className="mt-8 max-w-[560px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
            Projekte, die bleiben · keine 0815-Websites, keine austauschbaren
            Logos. Einfach Sachen, die zu den Leuten passen, die dahinter
            stehen.
          </p>
          <p className="mt-4 max-w-[560px] font-mono text-[11px] uppercase tracking-label text-offwhite/55">
            ehrlich-hinweis · ein teil der gezeigten arbeiten sind
            konzept-studien (mit „konzept"-badge markiert). echte kunden-
            projekte kommen laufend dazu.
          </p>
        </div>

        <div className="mt-16">
          <ContactSheet />
        </div>
      </div>
    </section>
  );
}
