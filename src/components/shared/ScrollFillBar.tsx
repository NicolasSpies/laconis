"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ScrollFillBar · horizontal bar die mit lime/lila fillt während element
 * durchs viewport scrollt. cool-effekt aus dem spec.
 *
 * usage:
 *   <ScrollFillBar color="#e1fd52" />        // standalone full-width bar
 *   <ScrollFillBar color="#b084d3" thick />  // dicker variant
 *
 * berechnung: scroll-progress = wie weit ist der TOP des bars schon im viewport
 * gescrollt. 0 = unten am rand · 1 = oben am rand.
 */

type Props = {
  color?: string;
  thick?: boolean;
  /** if true, bar fillt von rechts statt links */
  fromRight?: boolean;
  className?: string;
  label?: string;
};

export function ScrollFillBar({
  color = "#e1fd52",
  thick = false,
  fromRight = false,
  className = "",
  label,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 wenn der bar gerade unten ankommt · 1 wenn er oben rausgeht
      const raw = (vh - r.top) / (vh + r.height);
      const p = Math.max(0, Math.min(1, raw));
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

  const height = thick ? "h-2" : "h-[3px]";

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <div className={`relative ${height} bg-[#0a0a0a]/10 overflow-hidden rounded-full`}>
        <div
          className="absolute inset-y-0 rounded-full"
          style={{
            background: color,
            width: `${progress * 100}%`,
            left: fromRight ? "auto" : 0,
            right: fromRight ? 0 : "auto",
            transition: "width 0.18s linear",
          }}
        />
      </div>
      {label && (
        <div className="mt-2 font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
          {label} · {Math.round(progress * 100)}%
        </div>
      )}
    </div>
  );
}
