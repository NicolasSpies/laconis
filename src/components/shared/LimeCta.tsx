import Link from "next/link";
import type { ReactNode } from "react";

/**
 * LimeCta · der sitewide sign-off · lime-flood statt dunklem slab.
 *
 * tonaler umbau (juni 2026): der dunkle end-CTA kam auf jeder seite als
 * einziger dunkler block vor → wirkte zufällig. dunkel ist jetzt den
 * mittigen "räumen" vorbehalten (proof/beichte/intimität); der abschluss
 * ist ein warmer lime-flood — mehr lacønis, klar als sign-off lesbar.
 *
 * pures #e1fd52 (lime ist heilig · keine opacity auf der fläche), text +
 * buttons in ink. dunkle pille mit lime-text als primär-CTA.
 */

type Props = {
  /** optionale mono-marginalia (rotiert) drüber */
  kicker?: ReactNode;
  h2: ReactNode;
  body: ReactNode;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** optionale caveat-signatur drunter */
  signature?: string;
  id?: string;
  ariaLabel?: string;
};

export function LimeCta({
  kicker,
  h2,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  signature,
  id,
  ariaLabel,
}: Props) {
  return (
    <section
      id={id}
      data-theme="light"
      aria-label={ariaLabel}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "#e1fd52" }}
    >
      {/* ink dot-grid auf lime · gleiche textur-familie, nur dunkle punkte */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(20,20,20,0.5) 1px, transparent 1.4px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div className="container-site relative">
        {kicker && (
          <p
            className="font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/60 mb-6"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {kicker}
          </p>
        )}
        <h2 className="text-[clamp(2rem,5.5vw,4rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[820px]">
          {h2}
        </h2>
        <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-[#0a0a0a]/75">
          {body}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
        {signature && (
          <p
            className="mt-10 text-[16px] text-[#0a0a0a]"
            style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-1deg)" }}
          >
            {signature}
          </p>
        )}
      </div>
    </section>
  );
}
