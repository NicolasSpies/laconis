"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "lime" | "dark";
  href?: string;
  className?: string;
};

const sizes = {
  sm: "h-[20px]",
  md: "h-[26px]",
  lg: "h-[38px]",
};

const colors = {
  light: "bg-offwhite",
  lime: "bg-accent-ink",
  dark: "bg-anthrazit",
};

export function Logo({
  size = "md",
  variant = "lime",
  href = "/",
  className,
}: Props) {
  const [clicks, setClicks] = useState(0);
  const [egg, setEgg] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setEgg(true);
      setClicks(0);
      setTimeout(() => setEgg(false), 3000);
    } else {
      timerRef.current = setTimeout(() => setClicks(0), 800);
    }
  };

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Link
        href={href}
        aria-label="lacønis • zur Startseite"
        onClick={handleClick}
        className="inline-flex items-center"
      >
        <span
          className={cn(
            "block aspect-[600/140.83] transition-colors",
            sizes[size],
            colors[variant],
          )}
          style={{
            WebkitMaskImage: "url(/laconis-logo.svg)",
            maskImage: "url(/laconis-logo.svg)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </Link>

      <AnimatePresence>
        {egg && (
          <motion.span
            key="egg"
            initial={{ opacity: 0, scale: 0.6, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -4 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap rounded-full border border-lime/50 bg-lime/10 px-3 py-1 font-mono text-[10px] uppercase tracking-label text-accent-ink"
          >
            du hast mich gefunden 👀
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
