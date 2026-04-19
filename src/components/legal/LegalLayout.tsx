import { SectionLabel } from "@/components/ui/SectionLabel";

type Props = {
  num: string;
  label: string;
  titel: string;
  intro?: string;
  children: React.ReactNode;
};

export function LegalLayout({ num, label, titel, intro, children }: Props) {
  return (
    <section className="pt-36 pb-36">
      <div className="container-site">
        <SectionLabel num={num}>{label}</SectionLabel>

        <div className="mt-8 max-w-[820px]">
          <h1 className="heading-display text-[clamp(2rem,6vw,4.5rem)] text-offwhite">
            {titel}
          </h1>
          {intro && (
            <p className="mt-6 font-hand text-[20px] leading-snug text-offwhite/55">
              {intro}
            </p>
          )}
        </div>

        <div className="mt-14 max-w-[820px] space-y-12 text-[14px] leading-relaxed text-offwhite/70">
          {children}
        </div>
      </div>
    </section>
  );
}

export function LegalSection({
  titel,
  aside,
  children,
}: {
  titel: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_220px] gap-8 items-start">
      <div>
        <h2 className="heading-sans text-[20px] text-offwhite mb-4">
          {titel}
        </h2>
        <div className="space-y-3">{children}</div>
      </div>
      {aside && (
        <aside
          className="font-hand text-[17px] leading-snug text-offwhite/55 lg:pt-10 lg:border-l lg:border-ink/8 lg:pl-5"
          style={{ transform: "rotate(-0.4deg)" }}
        >
          {aside}
        </aside>
      )}
    </div>
  );
}

export function LegalRow({
  k,
  v,
}: {
  k: string;
  v: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-5">
      <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40 md:w-[160px] shrink-0">
        {k}
      </span>
      <span className="text-offwhite/75">{v}</span>
    </div>
  );
}
