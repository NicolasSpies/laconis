"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Mode = "web" | "branding";

type Props = {
  web: ReactNode;
  branding: ReactNode;
  initial?: Mode;
  num?: string;
};

/**
 * AnsatzToggle — zeigt manifest-variante für web oder branding.
 * Inline (nicht sticky) · mit section-label + intro, toggle als zentriertes
 * pill-paar. Panels werden beide gerendert, nur eines sichtbar — kein remount
 * beim switch, state bleibt.
 */
export function AnsatzToggle({
  web,
  branding,
  initial = "web",
  num = "03",
}: Props) {
  const [mode, setMode] = useState<Mode>(initial);

  return (
    <>
      {/* Intro-section · eigener raum für den toggle, keine klebe-sticky */}
      <section className="pt-4 pb-10 md:pb-14">
        <div className="container-site">
          <div className="max-w-[760px]">
            <SectionLabel num={num}>was ich nicht mache</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-offwhite leading-[1.05]">
              kommt drauf an,{" "}
              <span className="text-offwhite/35">was du brauchst.</span>
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-offwhite/55">
              Die No-Gos unterscheiden sich zwischen Web und Branding ·
              manche überschneiden sich, manche nicht. Umschalten, was dich
              betrifft.
            </p>
          </div>

          {/* Toggle · zentriert unter intro */}
          <div className="mt-8 md:mt-10 flex items-center justify-center">
            <div
              role="tablist"
              aria-label="disziplin wählen"
              className="inline-flex items-center gap-1 p-1 rounded-full border border-ink/10 bg-ink/[0.04]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "web"}
                onClick={() => setMode("web")}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-mono px-5 py-2 rounded-full transition-all",
                  mode === "web"
                    ? "bg-lime text-[#111]"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                web
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "branding"}
                onClick={() => setMode("branding")}
                className={cn(
                  "font-mono text-[11px] uppercase tracking-mono px-5 py-2 rounded-full transition-all",
                  mode === "branding"
                    ? "bg-lime text-[#111]"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                branding
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Panels · beide gerendert, nur eines sichtbar (kein remount beim switch) */}
      <div className={cn(mode === "web" ? "block" : "hidden")}>{web}</div>
      <div className={cn(mode === "branding" ? "block" : "hidden")}>
        {branding}
      </div>
    </>
  );
}
