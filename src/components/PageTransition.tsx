"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * route transition v2 · ink-shutter mit lime-kante (signature-wipe).
 *
 * statt unsichtbarem fade: beim seitenwechsel senkt sich ein ink-vorhang
 * mit lime-unterkante über die seite (exit), die neue seite mountet
 * dahinter, der vorhang hebt sich (enter). geparkt wird er unsichtbar
 * über dem viewport (idle y:-100.5%) · initial={false} → kein wipe beim
 * allerersten load.
 *
 * z-9998: unter der nav (10000) — die leiste bleibt beim wipe stehen,
 * wirkt wie eine bühne. reduced-motion: schlichter kurz-fade.
 */

const EASE = [0.76, 0, 0.24, 1] as const;

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="page-transition"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="enter"
        animate="idle"
        exit="exit"
        className="page-transition"
      >
        {/* content · dezenter lift sobald der vorhang sich hebt */}
        <motion.div
          variants={{
            enter: { opacity: 0, y: 16 },
            idle: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
            },
            exit: { opacity: 0.55, transition: { duration: 0.3 } },
          }}
        >
          {children}
        </motion.div>

        {/* ink-vorhang · kommt von oben runter (exit), hebt sich (enter) */}
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{ background: "#0a0a0a", willChange: "transform" }}
          variants={{
            enter: { y: "0%" },
            idle: { y: "-100.5%", transition: { duration: 0.55, ease: EASE } },
            exit: { y: "0%", transition: { duration: 0.4, ease: EASE } },
          }}
        >
          {/* lime-kante · die signatur an der vorhang-unterkante */}
          <span
            className="absolute left-0 right-0 bottom-0 h-[3px]"
            style={{ background: "#e1fd52", boxShadow: "0 0 24px rgba(225,253,82,0.8)" }}
          />
          {/* wortmarke · mittig überm saum, dezent */}
          <span
            className="absolute left-1/2 bottom-8 -translate-x-1/2 font-mono text-[11px] lowercase tracking-mono"
            style={{ color: "rgba(242,242,242,0.5)" }}
          >
            lacønis
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
