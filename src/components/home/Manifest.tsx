"use client";

import { Scribble } from "@/components/ui/Scribble";
import { useReveal } from "@/lib/useReveal";

/**
 * Manifest · css-driven reveal stagger.
 * ein einziger IntersectionObserver (via useReveal) setzt data-show="1"
 * auf dem root-wrapper · die CSS-regeln in globals.css sorgen für die
 * cascade der kinder-reveals. kein framer-motion mehr in diesem component
 * → entfernt ~14 motion-nodes aus dem bundle dieses chunks.
 */

export function Manifest() {
  const ref = useReveal<HTMLDivElement>({ margin: "-80px 0px" });

  return (
    <section className="relative py-32 md:py-48">
      <div className="container-site">
        <div ref={ref} className="reveal-root max-w-[900px] relative">
          <div
            className="reveal-up flex items-center gap-3 mb-10"
            style={{ "--rd": "0ms" } as React.CSSProperties}
          >
            <span className="h-px w-8 bg-lime/50" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              eine überzeugung
            </span>
          </div>

          <h2 className="heading-display text-[clamp(2.5rem,7.5vw,6rem)] leading-[0.95]">
            <span
              className="reveal-up block text-offwhite"
              style={{ "--rd": "100ms" } as React.CSSProperties}
            >
              Eine Website
            </span>
            <span
              className="reveal-up block text-offwhite"
              style={{ "--rd": "220ms" } as React.CSSProperties}
            >
              ist kein Produkt.
            </span>
            <span
              className="reveal-up block text-offwhite/35"
              style={{ "--rd": "340ms" } as React.CSSProperties}
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
              </span>
            </span>
            <span
              className="reveal-up block text-offwhite/35"
              style={{ "--rd": "460ms" } as React.CSSProperties}
            >
              das deine Kunden
            </span>
            <span
              className="reveal-up block text-accent-ink"
              style={{ "--rd": "580ms" } as React.CSSProperties}
            >
              von dir hören.
            </span>
          </h2>

          <div
            className="reveal-fade hidden xl:flex items-center gap-2 absolute right-0 top-[38%] font-hand leading-[1]"
            style={
              {
                "--rd": "1600ms",
                transform: "rotate(-4deg)",
              } as React.CSSProperties
            }
          >
            <Scribble
              variant="arrow"
              delay={2.1}
              duration={1.3}
              strokeWidth={1.3}
              className="w-[130px] h-10 text-offwhite/55 -scale-x-100"
            />
            <span className="whitespace-nowrap text-[26px] text-accent-ink/80">
              genau das.
            </span>
          </div>

          <p
            className="reveal-up mt-12 text-[14px] leading-relaxed text-offwhite/55 whitespace-nowrap"
            style={{ "--rd": "900ms" } as React.CSSProperties}
          >
            Zuerst verstehen • dann bauen. So entsteht etwas, das wirklich zu
            dir passt.
          </p>
        </div>
      </div>
    </section>
  );
}
