import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * BrandCase · narrative case-study analog FabryCase, aber fürs branding.
 * Kein kunden-testimonial (gibt's nicht schriftlich) · stattdessen eine
 * first-person skizzen-notiz von mir. Visual: brand-sheet (wordmark + monogramm +
 * farbwelt) statt website-screenshot — passt zum medium.
 */

function HoloroomBrandSheet() {
  return (
    <div
      className="relative aspect-[16/10] w-full rounded-lg overflow-hidden border border-ink/10"
      style={{ background: "#0a0a0a", containerType: "inline-size" }}
      aria-hidden
    >
      <div className="absolute inset-0 flex">
        {/* LINKS · purple hero panel mit wordmark */}
        <div
          className="relative h-full"
          style={{
            flexBasis: "60%",
            flexShrink: 0,
            background:
              "linear-gradient(135deg, #3e2570 0%, #5e3aa5 32%, #7a4bd1 66%, #9a68ed 100%)",
          }}
        >
          {/* soft highlights */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 28% 18%, rgba(255,255,255,0.22) 0%, transparent 40%), radial-gradient(circle at 82% 85%, rgba(0,0,0,0.25) 0%, transparent 45%)",
            }}
          />
          {/* wordmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-serif text-offwhite leading-none"
              style={{
                fontSize: "min(10cqw, 68px)",
                letterSpacing: "-0.015em",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
              }}
            >
              holoroom
            </span>
          </div>
          {/* corner labels */}
          <span
            className="absolute font-mono uppercase tracking-label text-offwhite/65"
            style={{ top: "6%", left: "6%", fontSize: "min(1.4cqw, 10px)" }}
          >
            № 02 · brand
          </span>
          <span
            className="absolute font-mono uppercase tracking-label text-offwhite/65"
            style={{ bottom: "6%", right: "6%", fontSize: "min(1.4cqw, 10px)" }}
          >
            studio · 2025
          </span>
        </div>

        {/* RECHTS · specs-panel */}
        <div
          className="flex-1 relative flex flex-col bg-[#0e0e0e] min-w-0"
          style={{ padding: "5%" }}
        >
          {/* monogramm · groß */}
          <div
            className="font-serif text-offwhite leading-none"
            style={{ fontSize: "min(11cqw, 72px)" }}
          >
            H.
          </div>

          {/* palette unten */}
          <div style={{ marginTop: "auto" }}>
            <p
              className="font-mono uppercase tracking-label text-offwhite/55"
              style={{ fontSize: "min(1.4cqw, 10px)", marginBottom: "6%" }}
            >
              farbwelt
            </p>
            <div className="flex" style={{ gap: "3%" }}>
              {[
                "#3e2570",
                "#5e3aa5",
                "#7a4bd1",
                "#9a68ed",
                "#e4dff0",
              ].map((c, i) => (
                <div
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: "17%",
                    aspectRatio: "1",
                    background: c,
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PAKET_ITEMS = [
  "wordmark + monogramm",
  "brand guide · pdf",
  "farbpalette · 5 werte",
  "favicon + social-tiles",
];

export function BrandCase({ num = "05" }: { num?: string } = {}) {
  return (
    <section className="pb-32">
      <div className="container-site">
        <SectionLabel num={num}>ein echtes projekt</SectionLabel>

        {/* narrative · first-person notiz */}
        <div className="mt-10 max-w-[820px]">
          <blockquote className="relative">
            <span
              aria-hidden
              className="absolute -top-4 -left-2 font-serif text-[80px] leading-none text-accent-ink/20 select-none pointer-events-none"
            >
              „
            </span>
            <p className="relative heading-display text-[clamp(1.6rem,3.8vw,2.8rem)] text-offwhite leading-[1.1] pl-6">
              violett war am ersten tag klar.{" "}
              <span className="text-offwhite/45">
                alles andere kam dazu.
              </span>
            </p>
            <footer className="mt-6 pl-6 flex items-center gap-3">
              <span className="h-px w-8 bg-accent-ink/40" />
              <div>
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  notiz · tag 1
                </span>
                <span className="font-mono text-[11px] text-offwhite/25 ml-2">
                  · holoroom
                </span>
              </div>
            </footer>
          </blockquote>
        </div>

        {/* visual + kontext */}
        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-6 items-start">
          {/* LINKS · brand-sheet */}
          <div className="relative glass rounded-2xl p-5 md:p-6">
            {/* tape-accent · oben links, als wäre das sheet angepinnt */}
            <span
              aria-hidden
              className="absolute -top-2.5 left-6 z-10 h-5 w-14 shadow-md"
              style={{
                background: "rgb(225 253 82 / 0.78)",
                transform: "rotate(-4deg)",
                boxShadow: "0 3px 8px -2px rgba(0,0,0,0.35)",
              }}
            />
            {/* marginalia · handnote oben rechts */}
            <span
              aria-hidden
              className="absolute -top-3 right-7 z-10 font-hand text-[15px] text-accent-ink/70"
              style={{ transform: "rotate(2deg)" }}
            >
              echt ↙
            </span>
            <HoloroomBrandSheet />
            <div className="mt-4 flex items-baseline justify-between gap-3">
              <div>
                <h3 className="heading-sans text-[17px] text-offwhite">
                  holoroom
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  logo · mini brand guide · 2025
                </p>
              </div>
              <Link
                href="/referenzen/holoroom"
                className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors shrink-0"
              >
                case ansehen →
              </Link>
            </div>
          </div>

          {/* RECHTS · story + paket-inhalt */}
          <div className="flex flex-col gap-5">
            <div className="glass rounded-2xl p-6">
              <p className="text-[14px] leading-relaxed text-offwhite/65">
                holoroom ist ein junges studio für immersive räume. beim
                ersten gespräch stand das violett · nicht als mode, sondern
                weil es der sache entsprach. alles drumherum · wordmark,
                monogramm, farbwelt, mini-guide · ist darauf aufgebaut.
              </p>
              <p
                className="mt-4 font-hand text-[18px] text-accent-ink"
                style={{ transform: "rotate(-1deg)" }}
              >
                zwei wochen. ↗
              </p>
            </div>

            <div className="glass rounded-2xl p-6">
              <p className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 mb-4">
                was im paket war
              </p>
              <ul className="space-y-3 text-[13px] text-offwhite/75">
                {PAKET_ITEMS.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="font-mono text-lime mt-0.5 leading-tight shrink-0"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
