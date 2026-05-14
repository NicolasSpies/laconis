"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * route transition · framer-motion AnimatePresence + pathname-key.
 *
 * subtle fade + slight y · 300ms · respect reduced-motion automatisch
 * weil framer-motion das schon via useReducedMotion hint im environment
 * abhandelt · für ganz alten code geben wir trotzdem prefers-reduced via
 * css-utility (page-transition class als zero-js fallback bleibt erhalten).
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="page-transition"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
