"use client";

import {
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * useScrollSkew · velocity-basierter skew für große headlines (phase 4).
 *
 * beim scrollen kippen die zeilen minimal in scroll-richtung und federn
 * zurück wenn der scroll stoppt · macht die typo "flüssig" ohne dass man
 * den effekt bewusst wahrnimmt.
 *
 *   const skew = useScrollSkew();          // default ±1.5°
 *   <motion.h2 style={{ skewY: skew }} />
 *
 * reduced-motion: liefert eine tote motion-value (immer 0°).
 */
export function useScrollSkew(maxDeg = 1.5): MotionValue<string> {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, {
    stiffness: 300,
    damping: 50,
    mass: 0.8,
  });
  const max = reduce ? 0 : maxDeg;
  return useTransform(smooth, [-2200, 0, 2200], [
    `${-max}deg`,
    "0deg",
    `${max}deg`,
  ]);
}
