"use client";

import { useEffect, useRef, useState } from "react";

/**
 * CounterUp — zahl, die beim scroll-into-view von 0 (oder prev) nach value
 * hochzählt. Respektiert prefers-reduced-motion (zeigt endwert sofort).
 *
 * Einbau z.b. in PaketCard, PriceRow, Kassenzettel-summen.
 *
 * defaults:
 *   duration = 400ms (ease-out)
 *   format   = de-DE locale (tausender-trenner)
 *
 * zähler läuft nur EINMAL pro viewport-entry (nicht bei jedem re-scroll),
 * aber re-triggert wenn sich `value` ändert (live-builder-szenario).
 */

type Props = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
  /**
   * wenn true, zählt immer von 0 hoch.
   * wenn false (default), animiert nur zwischen alt und neu (für live-updates).
   */
  resetOnViewEnter?: boolean;
};

const DEFAULT_FMT = (n: number) => Math.round(n).toLocaleString("de-DE");

export function CounterUp({
  value,
  duration = 400,
  format = DEFAULT_FMT,
  className,
  resetOnViewEnter = false,
}: Props) {
  const [display, setDisplay] = useState<number>(value);
  const [hasEntered, setHasEntered] = useState(false);
  const prevValueRef = useRef<number>(value);
  const rootRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);

  // observer · einmalig entry → hasEntered toggeln
  useEffect(() => {
    const node = rootRef.current;
    if (!node || hasEntered) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setHasEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [hasEntered]);

  useEffect(() => {
    // reduce-motion-shortcut: endwert sofort setzen, keine animation
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setDisplay(value);
      prevValueRef.current = value;
      return;
    }

    if (!hasEntered) return;

    const from = resetOnViewEnter ? 0 : prevValueRef.current;
    const to = value;

    if (from === to) {
      setDisplay(to);
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevValueRef.current = to;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, hasEntered, resetOnViewEnter]);

  return (
    <span ref={rootRef} className={className}>
      {format(display)}
    </span>
  );
}
