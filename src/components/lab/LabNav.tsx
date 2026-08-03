"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LabNav · die navigation als gerätefront.
 *
 * eine glas-schiene oben: geätztes logo links, beleuchtete tastenbank
 * mitte, sprach-wahlschalter + scharfe CTA-taste rechts. darunter eine
 * hairline die den scroll-fortschritt als lime-LED zeigt.
 *
 * der fortschrittsbalken läuft über NATIVES scroll-driven CSS
 * (animation-timeline: scroll()) — null javascript, läuft auf dem
 * compositor. seit 2026 baseline. fallback: bleibt einfach leer.
 *
 * struktur-entscheidung: "leistung" (singular) ist EIN ziel, keine
 * unterseite mehr — der ganze web-kram lebt dort.
 *
 * mobile: menü-taste öffnet ein vollflächiges panel mit großen tasten
 * (kein hover nötig · die aktive taste pulst von selbst).
 */

const ITEMS = [
  { key: "leistung", label: "leistung" },
  { key: "referenzen", label: "referenzen" },
  { key: "preise", label: "preise" },
  { key: "ueber", label: "über mich" },
] as const;

const LOCALES = ["de", "fr", "en"] as const;

export function LabNav() {
  const [active, setActive] = useState<string>("leistung");
  const [loc, setLoc] = useState<string>("de");
  const [open, setOpen] = useState(false);

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
          {/* geätztes logo */}
          <span className="lab-nav-logo">
            lac<span style={{ color: "#e1fd52" }}>ø</span>nis
          </span>

          {/* tastenbank · desktop */}
          <nav className="lab-nav-keys" aria-label="hauptnavigation">
            {ITEMS.map((it) => {
              const on = active === it.key;
              return (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setActive(it.key)}
                  aria-current={on ? "page" : undefined}
                  className="lab-navkey"
                  data-on={on ? "1" : "0"}
                >
                  {/* status-LED · aktive taste pulst dauerhaft */}
                  <span
                    aria-hidden
                    className={`lab-navkey-led ${on ? "lab-led-idle" : ""}`}
                  />
                  <span>{it.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="lab-nav-right">
            {/* sprach-wahlschalter · drei rasten */}
            <div className="lab-selector" role="group" aria-label="sprache">
              {LOCALES.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLoc(l)}
                  aria-pressed={loc === l}
                  className="lab-selector-pos"
                  data-on={loc === l ? "1" : "0"}
                >
                  {l}
                </button>
              ))}
            </div>

            <button type="button" className="lab-cta-key">
              projekt starten
            </button>

            {/* menü-taste · nur mobile */}
            <button
              type="button"
              className="lab-menu-key"
              aria-expanded={open}
              aria-label="menü"
              onClick={() => setOpen((v) => !v)}
            >
              <span data-bar="1" />
              <span data-bar="2" />
            </button>
          </div>
        </div>

        {/* scroll-fortschritt · natives scroll-driven CSS, 0 KB JS */}
        <span className="lab-nav-progress" aria-hidden />
      </header>

      {/* mobile-panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lab-menu-panel"
          >
            <nav className="flex flex-col gap-3">
              {ITEMS.map((it, i) => {
                const on = active === it.key;
                return (
                  <motion.button
                    key={it.key}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.4 }}
                    onClick={() => {
                      setActive(it.key);
                      setOpen(false);
                    }}
                    className="lab-menu-key-big"
                    data-on={on ? "1" : "0"}
                  >
                    <span
                      aria-hidden
                      className={`lab-navkey-led ${on ? "lab-led-idle" : ""}`}
                    />
                    <span className="lab-display text-[clamp(2rem,11vw,3.4rem)]">
                      {it.label}
                    </span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
