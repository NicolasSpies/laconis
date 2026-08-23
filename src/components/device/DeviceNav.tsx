"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/useLocale";
import { Wortmarke } from "@/components/Wortmarke";
import { buildPath, switchLocale, LOCALES, type Locale } from "@/i18n/config";
import { CONTACT } from "@/config/contact";

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
    /* "leistung · preise" versprach zwei seiten, die es seit dem
       relaunch nicht mehr gibt · und preise nennt er ohnehin
       erst im gespräch */
    meta: {
      de: "wie ich baue · und wer das ist",
      fr: "comment je construis · et qui je suis",
      en: "how i build · and who i am",
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

/* die drei beschriftungen der leiste standen fest auf deutsch ·
   auch auf /fr und /en. sie sind das einzige, was ein screenreader
   von der navigation hört. */
const NAV_TEXT: Record<Locale, { logo: string; auf: string; zu: string; nav: string; sprache: string }> = {
  de: { logo: "lacønis · startseite", auf: "menü öffnen", zu: "menü schliessen", nav: "hauptnavigation", sprache: "sprache wählen" },
  fr: { logo: "lacønis · accueil", auf: "ouvrir le menu", zu: "fermer le menu", nav: "navigation principale", sprache: "choisir la langue" },
  en: { logo: "lacønis · home", auf: "open menu", zu: "close menu", nav: "main navigation", sprache: "choose language" },
};

export function DeviceNav() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const nt = NAV_TEXT[locale];

  /* G14 · das menü war optisch ein dialog und semantisch keiner:
     kein role, kein inert auf dem rest, kein fokus rein und keiner
     zurück. wer mit der tastatur öffnete, tabte weiter durch die
     seite DAHINTER, die er nicht sehen konnte. */
  const menueRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    const dahinter = document.querySelector<HTMLElement>(".lab-root");
    dahinter?.setAttribute("inert", "");
    menueRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      dahinter?.removeAttribute("inert");
      /* zurück auf den knopf, der es geöffnet hat · sonst landet
         der fokus beim schliessen am seitenanfang */
      burgerRef.current?.focus();
    };
  }, [open]);

  /* route-wechsel schliesst das menü · sonst bleibt es beim
     client-side nav offen über der neuen seite stehen */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  /* die leiste ist über dem hero unsichtbar und wird erst beim
     scrollen zur fläche. vorher lag dort ein verlauf mit
     backdrop-filter · über der lime-vollplatte ergab das ein
     64px hohes olivband quer über die seite. */
  const [gescrollt, setGescrollt] = useState(false);
  useEffect(() => {
    const mal = () => setGescrollt(window.scrollY > 0);
    mal();
    window.addEventListener("scroll", mal, { passive: true });
    return () => window.removeEventListener("scroll", mal);
  }, []);

  return (
    <>
      <header className="lab-nav" data-gescrollt={gescrollt ? "1" : "0"}>
        <div className="lab-nav-inner">
          <Link href={buildPath("home", locale)} className="lab-nav-logo" aria-label={nt.logo}>
            {/* das echte logo · vorher stand hier der name in Archivo
                nachgebaut, mit einem lime eingefärbten „ø" */}
            <Wortmarke />
          </Link>

          <button
            type="button"
            ref={burgerRef}
            className="lab-burger"
            aria-expanded={open}
            aria-label={open ? nt.zu : nt.auf}
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
        <div
          ref={menueRef}
          className="lab-menu"
          data-offen
          role="dialog"
          aria-modal="true"
          aria-label={nt.nav}
        >
          {/* die lime-linie fährt einmal durch */}
          <span className="lab-menu-scan" aria-hidden />

          <nav className="lab-menu-list" aria-label={nt.nav}>
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
            {/* hier stand "de · fr · en" als toter <span> · text, der
                aussah wie ein umschalter. der einzige echte
                (switchLocale) hing in Nav.tsx, das auf keiner der
                vier seiten rendert. */}
            <span className="lab-sprachen" aria-label={nt.sprache}>
              {LOCALES.map((code) => (
                <Link
                  key={code}
                  href={switchLocale(pathname, code)}
                  hrefLang={code}
                  className="lab-label lab-sprache"
                  aria-current={code === locale ? "true" : undefined}
                  data-an={code === locale ? "1" : "0"}
                  onClick={() => setOpen(false)}
                >
                  {code}
                </Link>
              ))}
            </span>
            <a className="lab-label-lg" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>
        </div>
      )}

    </>
  );
}
