import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebDeliverables · slim version.
 * 3 klare versprechen statt 14 technische bullets · mehr atmung, weniger
 * datenblatt. alle details liegen auf /leistungen/web/technik.
 */

type Promise = {
  num: string;
  titel: string;
  kurz: string;
  /** kleines icon als SVG · passt zur scribble-ästhetik */
  icon: React.ReactNode;
};

const PROMISES: Promise[] = [
  {
    num: "01",
    titel: "die seite",
    kurz:
      "schnell, klar, auffindbar · pagespeed 95+, SEO von anfang an, lesbar auf jedem bildschirm.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 17 L42 17"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
        <circle cx="13" cy="13.5" r="0.9" fill="currentColor" />
        <circle cx="16" cy="13.5" r="0.9" fill="currentColor" />
        <path
          d="M12 24 L22 24 M12 28 L30 28 M12 32 L24 32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    ),
  },
  {
    num: "02",
    titel: "dein zugang",
    kurz:
      "du pflegst die seite selbst · mit contentcore, meinem eigenen CMS. eine kurze einweisung, unbefristeter support.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <path
          d="M10 20 A6 6 0 0 1 22 20 L22 26 L26 26"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <rect
          x="24"
          y="22"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="33" cy="28" r="1.5" fill="currentColor" />
        <path
          d="M33 30 L33 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    num: "03",
    titel: "der wechsel",
    kurz:
      "keine überraschung am launch-tag · google behält alle rankings, deine alte seite bleibt online bis es losgeht.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <circle
          cx="14"
          cy="24"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="34"
          cy="24"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2"
        />
        <path
          d="M20 24 L28 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M26 21 L29 24 L26 27"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    ),
  },
];

export function WebDeliverables({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>was du bekommst</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            drei versprechen,{" "}
            <span className="text-offwhite/35">
              sauber einlösbar.
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            keine endlose checkliste. das hier ist der kern · alles andere
            (hosting, CMS-architektur, technische details) liegt für neugierige
            auf einer eigenen seite.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROMISES.map((p) => (
            <div
              key={p.num}
              className="rounded-2xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-7 md:p-8 hover:border-lime/25 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  {p.num}
                </span>
                <span className="text-accent-ink">{p.icon}</span>
              </div>
              <h3 className="heading-sans mt-6 text-[22px] text-offwhite">
                {p.titel}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-offwhite/55">
                {p.kurz}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/leistungen/web/technik"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            alle technik-details →
          </Link>
        </div>
      </div>
    </section>
  );
}
