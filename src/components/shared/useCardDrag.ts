"use client";

import { useRef, type RefObject } from "react";
import { useMotionValue } from "framer-motion";

/**
 * useCardDrag · manueller karten-drag · pointer-capture + clamp aufs
 * container-rect.
 *
 * bewusst OHNE framer's drag-geste: deren pan-erkennung schluckte die
 * events im zusammenspiel mit dem custom-cursor (verifiziert: pointer-
 * sequenzen kamen an, onDragStart feuerte nie). rohe pointer-handler —
 * dasselbe muster wie beim VorherNachher-regler — sind deterministisch.
 *
 * x/y sind framer-MotionValues → komponierbar mit entrance-animationen
 * auf einem ÄUSSEREN wrapper (rotate/opacity dort, drag hier · nie beide
 * auf demselben element, sonst kämpfen sie um den y-kanal).
 */
export function useCardDrag(
  containerRef: RefObject<HTMLElement | null>,
  onFirstMove?: () => void,
) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const elRef = useRef<HTMLDivElement>(null);
  const start = useRef<{ px: number; py: number; x0: number; y0: number; notified: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    const el = elRef.current;
    if (!el) return;
    try {
      el.setPointerCapture(e.pointerId);
    } catch {
      /* synthetic pointer-ids haben keine capture · handler laufen trotzdem */
    }
    start.current = { px: e.clientX, py: e.clientY, x0: x.get(), y0: y.get(), notified: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = start.current;
    const el = elRef.current;
    const c = containerRef.current;
    if (!s || !el || !c) return;
    if (!s.notified) {
      s.notified = true;
      onFirstMove?.();
    }
    const nx = s.x0 + (e.clientX - s.px);
    const ny = s.y0 + (e.clientY - s.py);
    /* clamp mit SLACK: karten dürfen etwas über den container raus
       (echtes „rumwerfen"-gefühl), aber nie verloren gehen (user-gesetz) */
    const SLACK = 64;
    const er = el.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    const cx = x.get();
    const cy = y.get();
    x.set(Math.min(cr.right + SLACK - (er.right - cx), Math.max(cr.left - SLACK - (er.left - cx), nx)));
    y.set(Math.min(cr.bottom + SLACK - (er.bottom - cy), Math.max(cr.top - SLACK - (er.top - cy), ny)));
  };

  const onPointerEnd = () => {
    start.current = null;
  };

  return {
    elRef,
    x,
    y,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: onPointerEnd,
      onPointerCancel: onPointerEnd,
    },
  };
}
