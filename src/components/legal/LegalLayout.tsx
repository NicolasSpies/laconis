/**
 * LegalLayout · clean grey-bg pass für legal-seiten.
 * gleiche design-sprache wie restliche site (#c8c8c8 + dot-grid + lowercase typo)
 * aber minimal · keine theatralik · paragraphen lesen sich klar.
 */

type Props = {
  num: string;
  label: string;
  titel: string;
  intro?: string;
  children: React.ReactNode;
};

export function LegalLayout({ num, label, titel, intro, children }: Props) {
  return (
    <section
      className="relative pt-32 md:pt-36 pb-36 bg-[#c8c8c8] text-[#0a0a0a] overflow-hidden"
    >
      {/* subtler dot-grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.5) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />

      <div className="container-site relative">
        <div className="flex items-center gap-3">
          <span className="inline-block w-2 h-2 rounded-full bg-[#b084d3]" />
          <span className="font-mono text-[10px] text-[#0a0a0a]/55 tracking-label uppercase">
            {num}
          </span>
          <span className="font-mono text-[11px] text-[#0a0a0a]/75 tracking-label uppercase">
            {label}
          </span>
          <span className="h-px flex-1 bg-[#0a0a0a]/12" />
        </div>

        <div className="mt-8 max-w-[820px]">
          <h1 className="text-[clamp(2rem,6vw,4.5rem)] leading-[1] font-black tracking-[-0.04em] text-[#0a0a0a] lowercase">
            {titel}
          </h1>
          {intro && (
            <p
              className="mt-6 text-[18px] md:text-[20px] leading-snug text-[#0a0a0a]/75"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                transform: "rotate(-0.3deg)",
                transformOrigin: "left center",
              }}
            >
              {intro}
            </p>
          )}
        </div>

        <div className="mt-14 max-w-[820px] space-y-12 text-[14px] leading-relaxed text-[#0a0a0a]/80">
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
        <h2 className="text-[20px] font-black tracking-[-0.025em] lowercase text-[#0a0a0a] mb-4">
          {titel}
        </h2>
        <div className="space-y-3">{children}</div>
      </div>
      {aside && (
        <aside
          className="text-[17px] leading-snug text-[#0a0a0a]/80 lg:pt-10 lg:border-l lg:border-[#0a0a0a]/15 lg:pl-5"
          style={{
            fontFamily: "var(--font-caveat), cursive",
            transform: "rotate(-0.4deg)",
          }}
        >
          {aside}
        </aside>
      )}
    </div>
  );
}

export function LegalRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-5">
      <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55 md:w-[160px] shrink-0">
        {k}
      </span>
      <span className="text-[#0a0a0a]/85">{v}</span>
    </div>
  );
}
