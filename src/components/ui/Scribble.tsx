"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Variant = "underline" | "circle" | "strike" | "arrow";

const paths: Record<Variant, { d: string; viewBox: string; aspect: string }> = {
  underline: {
    viewBox: "0 0 300 24",
    aspect: "300 / 24",
    // a slightly drunk, hand-drawn underline — two passes for marker feel
    d: "M6 14 C 40 6, 80 18, 130 12 S 220 8, 292 16 M10 18 C 55 13, 110 22, 170 16 S 240 11, 288 20",
  },
  strike: {
    viewBox: "0 0 300 24",
    aspect: "300 / 24",
    d: "M4 12 C 50 10, 100 15, 150 11 S 250 14, 296 12",
  },
  circle: {
    viewBox: "0 0 220 110",
    aspect: "220 / 110",
    // loose ellipse, doesn't quite close
    d: "M30 60 C 30 20, 100 12, 150 14 S 210 40, 196 70 C 180 100, 90 104, 46 88 C 20 76, 22 54, 40 40",
  },
  arrow: {
    viewBox: "0 0 140 40",
    aspect: "140 / 40",
    d: "M4 20 C 30 10, 70 30, 120 18 M104 8 L 124 18 L 108 32",
  },
};

export function Scribble({
  variant = "underline",
  className = "",
  delay = 0.2,
  duration = 1.1,
  strokeWidth = 2,
  color = "currentColor",
  replayOnHover = false,
}: {
  variant?: Variant;
  className?: string;
  delay?: number;
  duration?: number;
  strokeWidth?: number;
  color?: string;
  replayOnHover?: boolean;
}) {
  const { d, viewBox, aspect } = paths[variant];
  const svgRef = useRef<SVGSVGElement>(null);
  const [replayKey, setReplayKey] = useState(0);
  const cooldownRef = useRef(false);

  useEffect(() => {
    if (!replayOnHover) return;
    const svg = svgRef.current;
    const parent = svg?.parentElement;
    if (!parent) return;
    const handler = () => {
      if (cooldownRef.current) return;
      cooldownRef.current = true;
      setReplayKey((k) => k + 1);
      window.setTimeout(() => {
        cooldownRef.current = false;
      }, (duration + delay) * 1000);
    };
    parent.addEventListener("mouseenter", handler);
    return () => parent.removeEventListener("mouseenter", handler);
  }, [replayOnHover, duration, delay]);

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      style={{ aspectRatio: aspect }}
    >
      <motion.path
        key={replayKey}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          replayKey > 0 ? { pathLength: 1, opacity: 1 } : undefined
        }
        whileInView={
          replayKey === 0 ? { pathLength: 1, opacity: 1 } : undefined
        }
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          pathLength: { duration, delay: replayKey > 0 ? 0 : delay, ease: [0.65, 0, 0.35, 1] },
          opacity: { duration: 0.2, delay: replayKey > 0 ? 0 : delay },
        }}
      />
    </svg>
  );
}
