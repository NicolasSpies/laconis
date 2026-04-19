"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function AmbientGlow() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 25,
    damping: 40,
    mass: 0.8,
  });

  // Orb 1 — primary lime, gentle drift left → right-center
  const top1 = useTransform(smooth, [0, 1], ["15%", "75%"]);
  const left1 = useTransform(smooth, [0, 1], ["0%", "55%"]);

  // Orb 2 — right side companion
  const top2 = useTransform(smooth, [0, 1], ["25%", "65%"]);
  const left2 = useTransform(smooth, [0, 1], ["90%", "100%"]);

  // Orb 3 — warm amber, counter-drift
  const top3 = useTransform(smooth, [0, 1], ["100%", "10%"]);
  const left3 = useTransform(smooth, [0, 1], ["70%", "30%"]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Orb 1 — main lime, soft breathing opacity */}
      <motion.div
        style={{
          top: top1,
          left: left1,
          x: "-50%",
          y: "-50%",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[52vw] h-[52vw] max-w-[720px] max-h-[720px] rounded-full bg-lime/[0.09] blur-[150px] will-change-transform"
      />

      {/* Orb 2 — right-side companion */}
      <motion.div
        style={{
          top: top2,
          left: left2,
          x: "-50%",
          y: "-50%",
        }}
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute w-[40vw] h-[40vw] max-w-[560px] max-h-[560px] rounded-full bg-lime/[0.055] blur-[170px] will-change-transform"
      />

      {/* Orb 3 — warm amber, counter-drift */}
      <motion.div
        style={{
          top: top3,
          left: left3,
          x: "-50%",
          y: "-50%",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        className="absolute w-[36vw] h-[36vw] max-w-[520px] max-h-[520px] rounded-full bg-[#ffe9a0]/[0.03] blur-[190px] will-change-transform"
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-[14vh] bg-gradient-to-b from-black/90 to-transparent" />

      {/* Global grain */}
      <div className="absolute inset-0 noise opacity-[0.06] mix-blend-soft-light" />
    </div>
  );
}
