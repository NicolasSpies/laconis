"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";

type Props = {
  words: string[];
  direction?: "left" | "right";
  /** Basis-Speed · % des tracks pro sekunde (default 3 = gemächlich) */
  baseVelocity?: number;
  /** Optional lime-bullet separator between words (default true) */
  separator?: boolean;
};

/**
 * marquee mit scroll-velocity-boost · je schneller du scrollst, desto
 * schneller rennt der marquee. idle-speed bleibt gemütlich, aber ein
 * schwung gibt dem ganzen einen spürbaren ruck. richtung bleibt konstant ·
 * kein flip, das würde sonst orientierungslos wirken.
 */
export function Marquee({
  words,
  direction = "left",
  baseVelocity = 3,
  separator = true,
}: Props) {
  const row = separator
    ? words.flatMap((w, i) => (i === 0 ? [w] : ["•", w]))
    : words;

  const prefersReducedMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  /* velocityFactor · 0 = idle, >0 = scroll-schwung. clamp=false damit
     auch große schwünge durchkommen aber capped bei ~5x basis-speed */
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  /* track translated %-based · wrap(-50, 0) sorgt für seamless loop
     weil der row 2× dupliziert ist → bei -50% springt er zurück auf 0% */
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const dir = direction === "left" ? -1 : 1;
  const dirRef = useRef(dir);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion) return;
    /* basis-bewegung pro frame · delta in ms */
    let moveBy = dirRef.current * baseVelocity * (delta / 1000);
    /* velocity-boost · abs damit scroll in beide richtungen beschleunigt */
    moveBy += moveBy * Math.abs(velocityFactor.get());
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div
      aria-hidden
      className="relative overflow-hidden py-6 border-y border-ink/10"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        style={{ x }}
        className="flex gap-10 whitespace-nowrap w-max will-change-transform"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-10 shrink-0">
            {row.map((w, i) => (
              <span
                key={`${copy}-${i}`}
                className={
                  w === "•"
                    ? "w-1 h-1 rounded-full bg-lime shrink-0"
                    : "font-sans font-black lowercase text-[clamp(1.75rem,4.5vw,3.25rem)] leading-none text-offwhite/75 tracking-[-0.02em]"
                }
              >
                {w !== "•" && w}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
