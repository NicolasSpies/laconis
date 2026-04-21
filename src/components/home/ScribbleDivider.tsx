"use client";

import { motion } from "framer-motion";

type Variant = "wave" | "loop" | "dots";

type Props = {
  variant?: Variant;
  /** optional handwritten annotation above the scribble */
  note?: string;
  className?: string;
};

const PATHS: Record<Variant, string> = {
  // loose wave — not mechanical, pen-on-paper feel
  wave:
    "M 10 20 Q 40 8 80 18 T 160 20 Q 200 28 240 16 T 320 20 Q 360 12 400 22 T 480 18 Q 520 26 560 20 T 640 22",
  // open horizontal loop — like someone warming up a pen
  loop:
    "M 10 22 Q 30 10 55 18 T 100 20 Q 115 28 130 18 Q 160 6 200 20 Q 230 30 260 20 Q 290 10 320 22 Q 360 30 400 20 T 480 22 Q 520 14 560 22 T 640 20",
  // dotted trail — like ellipsis across
  dots: "",
};

export function ScribbleDivider({ variant = "wave", note, className }: Props) {
  return (
    <div
      aria-hidden
      className={"relative w-full flex flex-col items-center gap-4 py-16 " + (className ?? "")}
    >
      {note && (
        <span
          className="font-hand text-[18px] md:text-[22px] leading-none text-offwhite/55"
          style={{ transform: "rotate(-1.2deg)" }}
        >
          {note}
        </span>
      )}
      {variant === "dots" ? (
        <div className="flex items-center gap-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-offwhite/35"
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            />
          ))}
        </div>
      ) : (
        <svg
          viewBox="0 0 650 40"
          className="w-[min(90%,520px)] text-offwhite/40"
          fill="none"
        >
          <motion.path
            d={PATHS[variant]}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      )}
    </div>
  );
}
