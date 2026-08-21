"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/useLocale";
import { Wortmarke } from "@/components/Wortmarke";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * DeviceNav v3 · leise leiste, das ganze drama im menü. Jetzt mit echten
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
    label: { de: "studio", fr: "studio", en: "studio" },
    meta: {
      de: "leistung · preise · wer das baut",
      fr: "prestation · prix · qui construit",
      en: "service · pricing · who builds it",
    },
  },
  {
    key: "referenzen",
    route: "referenzen",
    label: { de: "arbeiten", fr: "travaux", en: "work" },
    meta: { de: "was schon läuft", fr: "ce qui tourne déjà", en: "what's already running" },
  },
  {
    key: "kontakt",
    route: "kontakt",
    label: { de: "kontakt", fr: "contact", en: "contact" },
    meta: { de: "schreib einfach", fr: "écris simplement", en: "just write" },
  },
];

export function DeviceNav() {
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
            {/* das echte logo · vorher stand hier der name in Archivo
                nachgebaut, mit einem lime eingefärbten „ø" */}
            <Wortmarke />
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

      {/* das menue wird nur gerendert, WENN es offen ist.

          zwischenschritt war: dauerhaft im DOM lassen und ueber
          data-open plus visibility schalten · das sollte die
          ausblend-animation ohne framer-motion moeglich machen. das
          menue oeffnete danach zwar (data-open sprang auf 1,
          visibility auf visible), blieb aber auf opacity 0 stehen,
          obwohl die einzige zutreffende regel opacity: 1 setzt. eine
          wechselwirkung, die ich nicht schnell genug festnageln
          konnte · und ein menue, das nicht aufgeht, ist teurer als
          eine fehlende ausblend-animation.

          jetzt: bedingtes rendern, einblenden ueber eine
          CSS-keyframe. kein ausblenden · dafuer braeuchte es
          AnimatePresence, und dafuer lohnt die bibliothek nicht. */}
      {open && (
        <div className="lab-menu" data-offen>
          {/* die lime-linie fährt einmal durch */}
          <span className="lab-menu-scan" aria-hidden />

          <nav className="lab-menu-list" aria-label="hauptnavigation">
            {ITEMS.map((it, i) => {
              const href = buildPath(it.route, locale);
              const on = pathname === href;
              return (
                <Link
                  key={it.key}
                  href={href}
                  className="lab-menu-item"
                  data-on={on ? "1" : "0"}
                  aria-current={on ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="lab-display lab-menu-word">{it.label[locale]}</span>
                  <span className="lab-menu-meta">{it.meta[locale]}</span>
                </Link>
              );
            })}
          </nav>

          <div className="lab-menu-foot">
            <span className="lab-label">de · fr · en</span>
            <a className="lab-label" href="mailto:nicolas@laconis.be">
              nicolas@laconis.be
            </a>
          </div>
        </div>
      )}

    </>
  );
}
