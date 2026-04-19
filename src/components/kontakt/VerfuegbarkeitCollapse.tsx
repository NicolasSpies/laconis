"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { VerfuegbarkeitWidget } from "@/components/VerfuegbarkeitWidget";

/**
 * Collapsible verfügbarkeits-section auf /kontakt.
 * Standardmäßig zu, damit die seite nicht mit zu viel information
 * erschlägt. Nutzer können die queue öffnen wenn sie wissen wollen
 * wann ich zeit habe — ohne formular zu scrollen.
 */
export function VerfuegbarkeitCollapse() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-[820px] mx-auto">
      <SectionLabel num="03">verfügbarkeit</SectionLabel>
      <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
        wann ich für dich da bin.{" "}
        <span className="text-offwhite/35">ehrlich, kein fake-kalender.</span>
      </h2>
      <p className="mt-6 max-w-[620px] text-[14px] leading-relaxed text-offwhite/60">
        keine agentur · kein team. du siehst, was ich sehe: die nächsten 12
        wochen. öffne die queue, wenn du direkt einen realistischen start-slot
        willst.
      </p>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="verfuegbarkeit-panel"
        className="mt-6 inline-flex items-center gap-3 rounded-full border border-ink/15 bg-ink/[0.02] hover:border-lime/40 hover:bg-lime/[0.04] px-5 py-2.5 font-mono text-[11px] uppercase tracking-label text-offwhite/75 hover:text-accent-ink transition-colors"
      >
        <span
          className={[
            "inline-block transition-transform duration-200",
            open ? "rotate-90" : "rotate-0",
          ].join(" ")}
          aria-hidden
        >
          ▸
        </span>
        {open ? "queue schließen" : "meine queue ansehen"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="verfuegbarkeit-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-8">
              <VerfuegbarkeitWidget />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
