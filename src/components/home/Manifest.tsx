"use client";

import { Scribble } from "@/components/ui/Scribble";
import { useReveal } from "@/lib/useReveal";

/**
 * manifest · freier typografischer moment.
 * keine card mehr · nur zentrierte bühne mit: pin als anker oben, großes
 * öffnungs-" als hero-glyph, headline zentriert, stempel schwebt seitlich
 * raus, handschrift-margin-note drunter. atmet mehr.
 */
export function Manifest() {
  const ref = useReveal({ margin: "-80px 0px" }) as React.RefObject<HTMLDivElement>;

  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      <div className="container-site">
        <div
          ref={ref}
          className="reveal-root relative max-w-[960px] mx-auto text-center"
        >
          {/* label · zwischen zwei lime-divider-lines, zentriert */}
          <div
            className="reveal-up inline-flex items-center gap-3 mb-10"
            style={{ "--rd": "0ms" } as React.CSSProperties}
          >
            <span className="h-px w-10 bg-lime/50" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              eine überzeugung
            </span>
            <span className="h-px w-10 bg-lime/50" />
          </div>

          {/* pin · schwebender anker ganz oben, so als wäre es an die wand gepinnt */}
          <div
            aria-hidden
            className="reveal-fade relative mx-auto mb-4 w-3 h-3"
            style={{ "--rd": "120ms" } as React.CSSProperties}
          >
            <span className="absolute inset-0 rounded-full bg-lime shadow-[0_0_18px_rgba(225,253,82,0.7)]" />
            <span className="absolute top-[2px] left-[2px] w-1 h-1 rounded-full bg-offwhite/40" />
          </div>

          {/* großes öffnungs-zeichen · als hero-glyph, dekorativ */}
          <span
            aria-hidden
            className="reveal-fade pointer-events-none select-none block font-serif italic leading-[0.85] text-accent-ink/30"
            style={
              {
                fontSize: "clamp(7rem, 17vw, 15rem)",
                marginBottom: "-0.22em",
                "--rd": "200ms",
              } as React.CSSProperties
            }
          >
            „
          </span>

          {/* statement · freistehend, zentriert */}
          <h2 className="heading-display text-[clamp(2.25rem,6.8vw,5.75rem)] leading-[0.98]">
            <span
              className="reveal-up block text-offwhite"
              style={{ "--rd": "280ms" } as React.CSSProperties}
            >
              Eine Website
            </span>
            <span
              className="reveal-up block text-offwhite"
              style={{ "--rd": "380ms" } as React.CSSProperties}
            >
              ist kein Produkt.
            </span>
            <span
              className="reveal-up block text-offwhite/45 mt-3"
              style={{ "--rd": "480ms" } as React.CSSProperties}
            >
              es ist das{" "}
              <span className="relative inline-block">
                <span className="relative">erste Wort</span>
                <Scribble
                  variant="circle"
                  delay={1.1}
                  duration={1.8}
                  strokeWidth={1.2}
                  replayOnHover
                  className="absolute -inset-x-[6%] -inset-y-[30%] w-[112%] h-[160%] text-accent-ink/80 pointer-events-none"
                />
              </span>{" "}
              das deine Kunden
            </span>
            <span
              className="reveal-up block text-accent-ink"
              style={{ "--rd": "600ms" } as React.CSSProperties}
            >
              von dir hören.
            </span>
          </h2>

          {/* margin-note · handschrift direkt unter der headline, leicht rotiert */}
          <div
            className="reveal-fade mt-10 inline-flex items-center gap-3 font-hand"
            style={
              {
                "--rd": "1200ms",
                transform: "rotate(-2deg)",
              } as React.CSSProperties
            }
          >
            <Scribble
              variant="arrow"
              delay={2.1}
              duration={1.3}
              strokeWidth={1.3}
              className="w-[90px] h-8 text-offwhite/55"
            />
            <span className="text-[22px] md:text-[26px] text-accent-ink/80 whitespace-nowrap">
              genau das.
            </span>
          </div>

          {/* stempel · schwebt rechts raus, bricht die zentrierte symmetrie */}
          <div
            className="reveal-fade hidden md:block absolute right-0 md:-right-6 lg:-right-16 bottom-[-30px] lg:bottom-[-40px]"
            style={
              {
                "--rd": "900ms",
                transform: "rotate(9deg)",
              } as React.CSSProperties
            }
          >
            <div className="relative w-[140px] h-[140px] lg:w-[160px] lg:h-[160px] rounded-full border-2 border-accent-ink/60 bg-[rgba(225,253,82,0.04)] flex items-center justify-center">
              <div className="absolute inset-2 rounded-full border border-accent-ink/30" />
              <div className="text-center">
                <div className="font-mono text-[9px] uppercase tracking-label text-accent-ink/80 leading-none">
                  laCØnis
                </div>
                <div className="mt-1 font-serif italic text-[22px] lg:text-[26px] leading-none text-accent-ink">
                  überzeugt
                </div>
                <div className="mt-1.5 font-mono text-[8px] uppercase tracking-label text-accent-ink/60">
                  seit 2019
                </div>
              </div>
            </div>
          </div>

          <p
            className="reveal-up mt-16 mx-auto max-w-[580px] text-[14px] leading-relaxed text-offwhite/55"
            style={{ "--rd": "1400ms" } as React.CSSProperties}
          >
            Zuerst verstehen • dann bauen. So entsteht etwas, das wirklich zu
            dir passt · und nicht nach vorlage riecht.
          </p>
        </div>
      </div>
    </section>
  );
}
