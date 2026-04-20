"use client";

import { useRef, useState, useEffect } from "react";
import { track } from "@/lib/analytics";

/**
 * EvolutionSlider — vorher/nachher für eigene iterationen.
 *
 * framing: „iteration 1 → iteration 2" oder „launch v1 → 2 jahre später".
 * EXPLIZIT nur für eigene arbeiten · kein vergleich mit fremd-designern.
 *
 * UX:
 *   - drag-handle in der mitte, optional click-to-toggle
 *   - labels links (before) und rechts (after) werden gedimmt,
 *     wenn der andere dominiert
 *   - caption darunter handschriftlich
 *   - analytics: `evolution_slider_used` beim ersten move pro session
 *
 * a11y:
 *   - role=slider, aria-valuemin/-max/-now
 *   - keyboard: ← → bewegt um 2%, home/end springt
 *   - focus-ring sichtbar
 */

type Props = {
  before: string;
  after: string;
  labelBefore: string;
  labelAfter: string;
  caption?: string;
  slug: string;
};

export function EvolutionSlider({
  before,
  after,
  labelBefore,
  labelAfter,
  caption,
  slug,
}: Props) {
  const [percent, setPercent] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firedRef = useRef(false);

  const fireAnalytics = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    track({ type: "evolution_slider_used", slug });
  };

  const updateFromClientX = (clientX: number) => {
    const box = containerRef.current?.getBoundingClientRect();
    if (!box) return;
    const rel = ((clientX - box.left) / box.width) * 100;
    const next = Math.min(100, Math.max(0, rel));
    setPercent(next);
    fireAnalytics();
  };

  useEffect(() => {
    const move = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      const clientX =
        "touches" in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      if (clientX == null) return;
      updateFromClientX(clientX);
    };
    const stop = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const draggingRef = useRef(false);

  return (
    <div>
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-ink/10 select-none bg-ink/5"
        onMouseDown={(e) => {
          draggingRef.current = true;
          updateFromClientX(e.clientX);
        }}
        onTouchStart={(e) => {
          draggingRef.current = true;
          const x = e.touches[0]?.clientX;
          if (x != null) updateFromClientX(x);
        }}
      >
        {/* after · unten drunter, zeigt sich rechts vom slider */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={after}
          alt={labelAfter}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* before · layered, per clip-path abgeschnitten */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={before}
            alt={labelBefore}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* handle line */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-0.5 h-full bg-offwhite/75 shadow-[0_0_12px_rgba(0,0,0,0.4)]" />
          {/* grip-kreis */}
          <button
            type="button"
            role="slider"
            aria-label="vorher-nachher regler"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(percent)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                setPercent((p) => Math.max(0, p - 2));
                fireAnalytics();
              } else if (e.key === "ArrowRight") {
                setPercent((p) => Math.min(100, p + 2));
                fireAnalytics();
              } else if (e.key === "Home") {
                setPercent(0);
                fireAnalytics();
              } else if (e.key === "End") {
                setPercent(100);
                fireAnalytics();
              }
            }}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-offwhite text-black flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(0,0,0,0.8)] cursor-ew-resize focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/50"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M 5 11 L 1 11 M 1 11 L 4 8 M 1 11 L 4 14" />
              <path d="M 17 11 L 21 11 M 21 11 L 18 8 M 21 11 L 18 14" />
            </svg>
          </button>
        </div>

        {/* labels */}
        <span
          className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-label text-offwhite bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none transition-opacity"
          style={{ opacity: percent > 8 ? 1 : 0.3 }}
        >
          {labelBefore}
        </span>
        <span
          className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-label text-offwhite bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full pointer-events-none transition-opacity"
          style={{ opacity: percent < 92 ? 1 : 0.3 }}
        >
          {labelAfter}
        </span>
      </div>

      {caption && (
        <p
          className="mt-4 font-hand text-[20px] md:text-[22px] text-offwhite/55 max-w-[680px]"
          style={{ transform: "rotate(-0.8deg)" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}
