"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LabNav v2 · leise leiste, das ganze drama im menü.
 *
 * v1 war eine volle gerätefront (tastenbank + wahlschalter + CTA) —
 * zu viel. Regel: chrome bleibt still, die geräte-sprache ist den
 * interaktions-momenten vorbehalten.
 *
 * geblieben: logo, burger, haarlinie mit scroll-fortschritt (natives
 * scroll-driven CSS, 0 KB JS).
 *
 * das menü ist der eine große moment: eine lime-linie fährt einmal
 * durchs bild, dann klappen die einträge gestaffelt hoch. keine
 * schrauben, keine LEDs — nur typo, licht und timing.
 */

const ITEMS = [
  { key: "leistung", label: "leistung", meta: "websites · cms · shop" },
  { key: "referenzen", label: "referenzen", meta: "drei projekte" },
  { key: "preise", label: "preise", meta: "richtwerte, ehrlich" },
  { key: "ueber", label: "über mich", meta: "eine person, kein team" },
] as const;

export function LabNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("leistung");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="lab-nav">
        <div className="lab-nav-inner">
          <span className="lab-nav-logo">
            lac<span style={{ color: "#e1fd52" }}>ø</span>nis
          </span>

          <button
            type="button"
            className="lab-burger"
            aria-expanded={open}
            aria-label={open ? "menü schließen" : "menü öffnen"}
            onClick={() => setOpen((v) => !v)}
            data-open={open ? "1" : "0"}
          >
            <span aria-hidden />
            <span aria-hidden />
          </button>
        </div>

        {/* scroll-fortschritt · natives scroll-driven CSS */}
        <span className="lab-nav-progress" aria-hidden />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lab-menu"
          >
            {/* die lime-linie fährt einmal durch */}
            <span className="lab-menu-scan" aria-hidden />

            <nav className="lab-menu-list" aria-label="hauptnavigation">
              {ITEMS.map((it, i) => {
                const on = active === it.key;
                return (
                  <motion.button
                    key={it.key}
                    type="button"
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.14 + i * 0.07,
                      duration: 0.62,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => {
                      setActive(it.key);
                      setOpen(false);
                    }}
                    className="lab-menu-item"
                    data-on={on ? "1" : "0"}
                  >
                    <span className="lab-menu-idx">0{i + 1}</span>
                    <span className="lab-display lab-menu-word">{it.label}</span>
                    <span className="lab-menu-meta">{it.meta}</span>
                  </motion.button>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="lab-menu-foot"
            >
              <span className="lab-label">de · fr · en</span>
              <span className="lab-label">nicolas@laconis.be</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
