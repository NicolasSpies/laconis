"use client";

import { motion } from "framer-motion";
import { ACCENTS, useAccent } from "@/components/accent/AccentProvider";

type Props = {
  label?: string;
  className?: string;
};

export function AccentSwitcher({ label = "akzentfarbe", className = "" }: Props) {
  const { accent, setAccent } = useAccent();

  return (
    <div
      className={
        "glass inline-flex items-center gap-3 rounded-full px-3 py-2 " +
        className
      }
    >
      <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 pl-1">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        {ACCENTS.map((a) => {
          const active = a.key === accent;
          return (
            <button
              key={a.key}
              type="button"
              onClick={() => setAccent(a.key)}
              aria-label={`akzentfarbe ${a.label}`}
              className="tactile-press relative h-6 w-6 rounded-full hover:scale-110"
              style={{ background: a.hex }}
            >
              {active && (
                <motion.span
                  layoutId="accent-ring"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute -inset-1 rounded-full border border-ink/80 pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
