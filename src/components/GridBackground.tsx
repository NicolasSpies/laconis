"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GridBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * -0.4);

  return (
    <motion.div
      aria-hidden
      style={{ y, zIndex: -20 }}
      className="absolute inset-x-0 top-0 h-[200%] grid-bg pointer-events-none will-change-transform"
    />
  );
}
