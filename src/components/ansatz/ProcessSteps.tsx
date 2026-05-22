"use client";

import { useEffect, useRef, useState } from "react";
import { TiltCard } from "@/components/shared/TiltCard";

/**
 * ProcessSteps · 4-5 numbered tilt-cards mit sticky scroll-indicator.
 *
 * sticky-leiste links zeigt aktive step (durch viewport-center).
 * jede step-number wird lime sobald die card passiert wurde.
 */

type Step = {
  name: string;
  text: string;
  duration?: string;
};

type Props = {
  steps: Step[];
  label?: string;
};

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
        // passed = element's top is above viewport center
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

      {/* step cards */}
      <ol className="space-y-5">
        {steps.map((step, i) => {
          const isPassed = passedSet.has(i);
          return (
            <li
              key={step.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
            >
              <TiltCard
                preset={i % 2 === 0 ? "paper" : "ink"}
                intensity={8}
              >
                <div className="p-8 md:p-10 grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-start">
                  <span
                    className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-[-0.04em] leading-none tabular-nums transition-colors"
                    style={{
                      color: isPassed
                        ? "#e1fd52"
                        : i % 2 === 0
                          ? "rgba(10,10,10,0.55)"
                          : "rgba(242,242,242,0.55)",
                      textShadow: isPassed
                        ? "0 0 24px rgba(225,253,82,0.6)"
                        : "none",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-black tracking-[-0.025em] leading-tight lowercase">
                      {step.name}.
                    </h3>
                    <p
                      className="mt-4 text-[14px] md:text-[15px] leading-relaxed"
                      style={{ opacity: 0.85 }}
                    >
                      {step.text}
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
