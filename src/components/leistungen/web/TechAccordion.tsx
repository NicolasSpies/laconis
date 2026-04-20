"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function TechAccordion({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="py-10">
      <div className="container-site">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="group w-full flex items-center justify-between gap-4 px-6 py-4 rounded-xl border border-ink/10 hover:border-lime/25 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[12px] lowercase tracking-mono text-offwhite/55 group-hover:text-offwhite transition-colors">
              für die techniker unter euch
            </span>
          </div>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="font-mono text-[12px] text-offwhite/35 group-hover:text-accent-ink transition-colors"
          >
            ▼
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
