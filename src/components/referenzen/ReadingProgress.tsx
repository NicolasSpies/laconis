"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

/**
 * ReadingProgress · top-fixed bar (3px, lime fill, links → rechts).
 *
 * mount auf /referenzen/[slug] · respect reduced-motion (rendert unsichtbar).
 */
export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        scaleX,
        transformOrigin: "0% 50%",
      }}
      className="fixed left-0 right-0 top-0 z-50 h-[3px] bg-[#e1fd52] pointer-events-none"
    />
  );
}
