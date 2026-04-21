"use client";

import { motion } from "framer-motion";

type Props = {
  words: string[];
  direction?: "left" | "right";
  /** Seconds for one full loop — higher = slower */
  duration?: number;
  /** Optional lime-bullet separator between words (default true) */
  separator?: boolean;
};

export function Marquee({
  words,
  direction = "left",
  duration = 60,
  separator = true,
}: Props) {
  const row = separator
    ? words.flatMap((w, i) => (i === 0 ? [w] : ["•", w]))
    : words;

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
        className="flex gap-10 whitespace-nowrap w-max will-change-transform"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
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
