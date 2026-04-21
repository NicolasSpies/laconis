"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Props = {
  children: React.ReactNode;
  /** 0..1 · wie stark dem cursor gefolgt wird (default 0.35) */
  strength?: number;
  /** max translation in px (guard rail gegen zu wilde sprünge) */
  max?: number;
  className?: string;
};

/**
 * magnetic · wrapper der sein kind leicht richtung cursor zieht, wenn er in
 * der nähe hovert. primär für primäre CTAs — nicht überall verwenden, sonst
 * wird's unruhig. deaktiviert auf touch-devices (kein hover) · pointer-events
 * bleiben voll durchlassend damit clicks auf dem child funktionieren.
 */
export function Magnetic({
  children,
  strength = 0.35,
  max = 14,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { damping: 16, stiffness: 240, mass: 0.4 });
  const sy = useSpring(y, { damping: 16, stiffness: 240, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-flex ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        x.set(Math.max(-max, Math.min(max, dx)));
        y.set(Math.max(-max, Math.min(max, dy)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
