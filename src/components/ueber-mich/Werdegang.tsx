"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Werdegang · vertical timeline mit scroll-triggered lila-fill.
 *
 * line links · scrollt user runter, der lila-line füllt sich von oben.
 * jeder werdegang-eintrag bekommt einen dot der lila wird wenn er passiert.
 * cooler effekt aus dem spec.
 */

type Item = {
  jahr: string;
  titel: string;
  kurz: string;
};

type Props = {
  items: Item[];
};

export function Werdegang({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = top des containers ist auf 75% viewport · 1 = bottom auf 25% viewport
      const start = vh * 0.75;
      const end = vh * 0.25;
      const totalScroll = r.height + (start - end);
      const scrolled = start - r.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
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
    <div ref={containerRef} className="relative">
      {/* vertical track (line bg) · sitzt fixed bei left:56px · matched ml von text */}
      <div
        aria-hidden
        className="absolute top-1 bottom-1 w-px bg-[#0a0a0a]/15 left-[7px] md:left-[56px]"
      />
      {/* scroll-fill (lila) · clip-path nach progress */}
      <div
        aria-hidden
        className="absolute top-1 w-[3px] left-[6px] md:left-[55px] rounded-full"
        style={{
          background: "#b084d3",
          height: `calc(${progress * 100}% - 0.5rem)`,
          maxHeight: "calc(100% - 0.5rem)",
          transition: "height 0.18s linear",
          boxShadow: "0 0 12px rgba(176,132,211,0.5)",
        }}
      />

      <div className="space-y-10">
        {items.map((w, i) => {
          // dot is "passed" if its position is < progress
          const dotPos = items.length > 1 ? i / (items.length - 1) : 0;
          const passed = progress >= dotPos - 0.02;
          return (
            <div
              key={w.jahr}
              className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-8 items-start relative"
            >
              {/* dot · wird lila wenn passed */}
              <span
                aria-hidden
                className="absolute md:left-[50px] left-[1px] top-2 h-3.5 w-3.5 rounded-full ring-4 transition-colors duration-300"
                style={{
                  background: passed ? "#b084d3" : "#0a0a0a",
                  // ring-color matches grey body bg
                  // @ts-expect-error -- arbitrary css var
                  "--tw-ring-color": "rgb(var(--bg))",
                  boxShadow: passed ? "0 0 14px rgba(176,132,211,0.7)" : "none",
                }}
              />
              <div className="md:pl-0 pl-7">
                <span
                  className="font-mono text-[11px] uppercase tracking-label transition-colors"
                  style={{ color: passed ? "#b084d3" : "rgba(10,10,10,0.55)" }}
                >
                  {w.jahr}
                </span>
              </div>
              <div className="md:pl-4 pl-7">
                <h3 className="text-[clamp(1.2rem,2.3vw,1.6rem)] font-black tracking-[-0.025em] leading-tight lowercase text-[#0a0a0a]">
                  {w.titel}
                </h3>
                <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-[#0a0a0a]/75">
                  {w.kurz}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
