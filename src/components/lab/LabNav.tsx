"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * LabNav v3 · leise leiste, das ganze drama im menü. Jetzt mit echten
 * links (v2 waren buttons ohne ziel · man kam nirgends hin).
 *
 * die geräte-sprache bleibt draussen: logo, burger, haarlinie mit
 * scroll-fortschritt (natives scroll-driven CSS, 0 KB JS). keine
 * schrauben, keine LEDs in der leiste.
 *
 * das menü ist der eine grosse moment: eine lime-linie fährt einmal
 * durchs bild, dann klappen die einträge gestaffelt hoch. der aktive
 * eintrag wird aus dem pathname gelesen, nicht aus state.
 */

type Item = { key: string; route: string; label: Record<Locale, string>; meta: Record<Locale, string> };

const ITEMS: Item[] = [
  {
    key: "leistung",
    route: "leistung",
    label: { de: "leistung", fr: "prestation", en: "service" },
    meta: {
      de: "websites · cms · übernahme",
      fr: "sites · cms · reprise",
      en: "websites · cms · takeover",
    },
  },
  {
    key: "referenzen",
    route: "referenzen",
    label: { de: "referenzen", fr: "références", en: "work" },
    meta: { de: "was schon läuft", fr: "ce qui tourne déjà", en: "what's already running" },
  },
  {
    key: "preise",
    route: "preise",
    label: { de: "preise", fr: "prix", en: "pricing" },
    meta: { de: "richtwerte, ehrlich", fr: "ordres de grandeur, honnêtes", en: "honest ballparks" },
  },
  {
    key: "ueber-mich",
    route: "ueber-mich",
    label: { de: "über mich", fr: "à propos", en: "about" },
    meta: { de: "eine person, kein team", fr: "une personne, pas une équipe", en: "one person, not a team" },
  },
  {
    key: "kontakt",
    route: "kontakt",
    label: { de: "kontakt", fr: "contact", en: "contact" },
    meta: { de: "schreib einfach", fr: "écris simplement", en: "just write" },
  },
];

export function LabNav() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname() || "/";

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

  /* route-wechsel schliesst das menü · sonst bleibt es beim
     client-side nav offen über der neuen seite stehen */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="lab-nav">
        <div className="lab-nav-inner">
          <Link href={buildPath("home", locale)} className="lab-nav-logo" aria-label="lacønis · startseite">
            lac<span style={{ color: "#e1fd52" }}>ø</span>nis
          </Link>

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
                const href = buildPath(it.route, locale);
                const on = pathname === href;
                return (
                  <motion.div
                    key={it.key}
                    initial={{ opacity: 0, y: 34 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.14 + i * 0.07,
                      duration: 0.62,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={href}
                      className="lab-menu-item"
                      data-on={on ? "1" : "0"}
                      aria-current={on ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span className="lab-menu-idx">0{i + 1}</span>
                      <span className="lab-display lab-menu-word">{it.label[locale]}</span>
                      <span className="lab-menu-meta">{it.meta[locale]}</span>
                    </Link>
                  </motion.div>
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
              <a className="lab-label" href="mailto:nicolas@laconis.be">
                nicolas@laconis.be
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
