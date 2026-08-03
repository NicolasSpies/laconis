"use client";

import { useEffect, useRef, useState } from "react";
import { TiltCard } from "@/components/shared/TiltCard";
import { ProcessScene, type SceneKind } from "@/components/leistungen/web/ProcessScenes";

/**
 * ProcessSteps · 4 schritte als premium-storyboard (visual-first umbau).
 *
 * vorher: nummer + 4-satz-absatz pro karte (textwüste, laien steigen aus).
 * jetzt: pro schritt eine handgezeichnete szene + große zahl + dauer-chip +
 * EIN destillierter halbsatz. der volltext lebt im HowTo-schema weiter (SEO),
 * sichtbar ist nur das wesentliche. sticky chapter-rail links bleibt.
 */

type Step = {
  name: string;
  text: string;
  duration?: string;
  short: string;
  dauer: string;
  scene: SceneKind;
};

type Props = {
  steps: Step[];
  label?: string;
};

const ACCENTS = ["#e1fd52", "#b084d3", "#e1fd52", "#b084d3"] as const;

export function ProcessSteps({ steps, label = "process" }: Props) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [passedSet, setPassedSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    function onScroll() {
      const vh = window.innerHeight;
      const center = vh * 0.5;
      let bestIdx = 0;
      let bestDist = Infinity;
      const passed = new Set<number>();

      refs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const elCenter = r.top + r.height / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
        if (r.top < center) passed.add(i);
      });

      setActiveIdx(bestIdx);
      setPassedSet(passed);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16">
      {/* sticky progress indicator · desktop only */}
      <aside className="hidden lg:block">
        <div className="sticky top-32">
          <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55 mb-5">
            · {label}
          </p>
          <ul className="space-y-3">
            {steps.map((s, i) => {
              const isActive = i === activeIdx;
              const isPassed = passedSet.has(i);
              return (
                <li
                  key={s.name}
                  className="flex items-center gap-3 transition-colors"
                  style={{
                    color: isActive
                      ? "#0a0a0a"
                      : isPassed
                        ? "rgba(10,10,10,0.7)"
                        : "rgba(10,10,10,0.35)",
                  }}
                >
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full font-mono text-[10px] tabular-nums transition-all"
                    style={{
                      background: isActive
                        ? "#e1fd52"
                        : isPassed
                          ? "rgba(225,253,82,0.4)"
                          : "transparent",
                      border: isActive
                        ? "1px solid #e1fd52"
                        : "1px solid rgba(10,10,10,0.2)",
                      color: isActive ? "#0a0a0a" : "inherit",
                      transform: isActive ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[13px] lowercase">{s.name}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      {/* step cards · storyboard */}
      <ol className="space-y-5">
        {steps.map((step, i) => {
          const isPassed = passedSet.has(i);
          const paper = i % 2 === 0;
          const accent = ACCENTS[i % ACCENTS.length];
          const sceneStroke = paper ? "#0f0f0f" : "#f2f2f2";
          const chipColor = paper ? "rgba(10,10,10,0.6)" : "rgba(242,242,242,0.65)";
          const chipBorder = paper ? "rgba(10,10,10,0.2)" : "rgba(242,242,242,0.25)";

          return (
            <li
              key={step.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              <TiltCard preset={paper ? "paper" : "ink"} intensity={6}>
                <div className="p-7 md:p-9 grid grid-cols-[1fr] sm:grid-cols-[132px_1fr] md:grid-cols-[156px_1fr] gap-6 md:gap-9 items-center">
                  {/* szene · handgezeichnet */}
                  <div
                    className="hidden sm:flex items-center justify-center rounded-2xl p-3 aspect-square"
                    style={{
                      background: paper
                        ? "rgba(10,10,10,0.035)"
                        : "rgba(242,242,242,0.05)",
                    }}
                  >
                    <ProcessScene kind={step.scene} stroke={sceneStroke} accent={accent} />
                  </div>

                  {/* text · destilliert */}
                  <div>
                    <div className="flex items-center gap-4 mb-3">
                      <span
                        className="text-[clamp(2.4rem,5vw,3.6rem)] font-black tracking-[-0.04em] leading-none tabular-nums transition-colors"
                        style={{
                          color: isPassed
                            ? "#e1fd52"
                            : paper
                              ? "rgba(10,10,10,0.5)"
                              : "rgba(242,242,242,0.5)",
                          textShadow: isPassed ? "0 0 24px rgba(225,253,82,0.55)" : "none",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full"
                        style={{ color: chipColor, border: `1px solid ${chipBorder}` }}
                      >
                        {step.dauer}
                      </span>
                    </div>
                    <h3 className="text-[clamp(1.5rem,2.8vw,2.1rem)] font-black tracking-[-0.025em] leading-tight lowercase">
                      {step.name}.
                    </h3>
                    <p
                      className="mt-3 text-[15px] md:text-[16px] leading-snug max-w-[440px]"
                      style={{ opacity: 0.8 }}
                    >
                      {step.short}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
