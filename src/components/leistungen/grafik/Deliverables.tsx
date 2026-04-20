import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Deliverables · slim version.
 * 3 klare versprechen statt 15 file-formate · das datenblatt
 * landet später im brand guide selbst. hier nur das essenzielle.
 */

type Promise = {
  num: string;
  titel: string;
  kurz: string;
  icon: React.ReactNode;
};

const PROMISES: Promise[] = [
  {
    num: "01",
    titel: "das logo-paket",
    kurz:
      "alle formate, alle fälle · svg, png, pdf druckfertig · primär, mono, monogramm, favicon. nie wieder: hast du das logo auch als…?",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <circle cx="18" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
        <rect
          x="26"
          y="14"
          width="16"
          height="20"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 30 20 L 38 20 M 30 24 L 38 24 M 30 28 L 36 28"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    num: "02",
    titel: "der brand guide",
    kurz:
      "pdf, ~25 seiten. farben mit hex/rgb/cmyk/pantone, typografie-system, bildsprache, tone of voice. das manual für alle, die später damit arbeiten.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <rect
          x="10"
          y="8"
          width="28"
          height="32"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 14 8 L 14 40"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        <path
          d="M 20 16 L 34 16 M 20 20 L 34 20 M 20 24 L 30 24 M 20 28 L 32 28 M 20 32 L 28 32"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
    ),
  },
  {
    num: "03",
    titel: "print- + web-set",
    kurz:
      "visitenkarte, briefpapier, e-mail-signatur, favicon, 3 social-posts · druckfertig mit schnittmarken, web-ready mit allen größen.",
    icon: (
      <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
        <rect
          x="6"
          y="14"
          width="22"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="22"
          y="22"
          width="20"
          height="16"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M 10 20 L 16 20 M 10 23 L 20 23"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 26 28 L 38 28 M 26 31 L 36 31 M 26 34 L 34 34"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    ),
  },
];

export function Deliverables({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>was du bekommst</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            drei pakete,{" "}
            <span className="text-offwhite/35">sauber übergeben.</span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            keine nachlieferungen per e-mail, keine „ach die datei schicke ich
            dir morgen". am übergabetag hast du alles · in einem geteilten
            ordner, print-ready und web-ready.
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

        <p className="mt-8 max-w-[640px] text-[13px] leading-relaxed text-offwhite/55">
          farbprofile nach iso 12647 · fonts mit lizenz-info · alles in einem
          geteilten ordner (drive oder dropbox, wie du willst).
        </p>
      </div>
    </section>
  );
}
