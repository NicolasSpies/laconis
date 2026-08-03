"use client";

import { useCallback, useRef, useState } from "react";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * VorherNachher · der signature-regler auf der home.
 *
 * ein browser-frame, zwei komplette mini-sites übereinander: dieselbe
 * (fiktive) bäckerei als 2014er-website (times, besucherzähler, blink)
 * und als laconis-version. lime-griff in der mitte, frei ziehbar —
 * der „ich übernehme deine alte seite"-pitch als ERLEBNIS statt text.
 *
 * technik: beide layer absolute inset-0 in voller breite, der alte layer
 * wird per clip-path beschnitten (kein reflow beim ziehen · echtes
 * comparison-slider-verhalten). pointer capture auf dem viewport,
 * touch-action pan-y (vertikal scrollen bleibt möglich, horizontal
 * ziehen gehört uns). griff = role="slider" + pfeiltasten. cqw-sizing
 * mit px-floors (lesbar auch im schmalen mobile-frame).
 *
 * der alte layer spricht ABSICHTLICH „Wir/Sie" + großschreibung —
 * das ist die parodierte alte website, nicht laconis-stimme.
 */

type Dict = {
  chipOld: string;
  chipNew: string;
  aria: string;
  o: {
    title: string;
    nav: string[];
    welcome: string;
    body: string;
    neu: string;
    news: string;
    button: string;
    counter: string;
    updated: string;
  };
  n: {
    brand: string;
    nav: string[];
    h1a: string;
    h1b: string;
    body: string;
    cta: string;
    tiles: string[];
    chips: string;
  };
};

const DICT: Record<Locale, Dict> = {
  de: {
    chipOld: "vorher",
    chipNew: "nachher",
    aria: "vorher-nachher-vergleich · regler mit pfeiltasten bewegen",
    o: {
      title: "Bäckerei Kessler",
      nav: ["Startseite", "Über Uns", "Unsere Produkte", "Gästebuch", "Kontakt"],
      welcome: "Herzlich Willkommen auf unserer Homepage!!!",
      body: "Wir freuen uns sehr, dass Sie den Weg auf unsere Internetseite gefunden haben. Hier finden Sie alle Informationen rund um unsere Backstube und unsere Produkte.",
      neu: "NEU:",
      news: "Unsere Öffnungszeiten haben sich geändert!",
      button: "Hier klicken für mehr Infos!",
      counter: "Besucher Nr. 0038412",
      updated: "Zuletzt aktualisiert: 03.11.2014",
    },
    n: {
      brand: "kessler.",
      nav: ["brot", "laden", "kontakt"],
      h1a: "brot.",
      h1b: "ehrlich gebacken.",
      body: "seit 1987 · jeden morgen frisch.",
      cta: "vorbeikommen →",
      tiles: ["ruchbrot", "sauerteig", "zopf"],
      chips: "0,4s ladezeit · mobil ✓ · bei google ✓",
    },
  },
  fr: {
    chipOld: "avant",
    chipNew: "après",
    aria: "comparaison avant-après · déplacer le curseur avec les flèches",
    o: {
      title: "Boulangerie Kessler",
      nav: ["Accueil", "Qui sommes-nous", "Nos Produits", "Livre d'or", "Contact"],
      welcome: "Bienvenue sur notre site internet!!!",
      body: "Nous sommes très heureux que vous ayez trouvé le chemin de notre site. Vous trouverez ici toutes les informations sur notre fournil et nos produits.",
      neu: "NOUVEAU:",
      news: "Nos horaires d'ouverture ont changé!",
      button: "Cliquez ici pour plus d'infos!",
      counter: "Visiteur n° 0038412",
      updated: "Dernière mise à jour: 03.11.2014",
    },
    n: {
      brand: "kessler.",
      nav: ["pain", "boutique", "contact"],
      h1a: "du pain.",
      h1b: "honnêtement cuit.",
      body: "depuis 1987 · frais chaque matin.",
      cta: "venir goûter →",
      tiles: ["pain gris", "levain", "tresse"],
      chips: "0,4s de chargement · mobile ✓ · sur google ✓",
    },
  },
  en: {
    chipOld: "before",
    chipNew: "after",
    aria: "before-after comparison · move the handle with arrow keys",
    o: {
      title: "Kessler Bakery",
      nav: ["Home", "About Us", "Our Products", "Guestbook", "Contact"],
      welcome: "Welcome to our homepage!!!",
      body: "We are very happy that you found your way to our website. Here you will find all information about our bakery and our products.",
      neu: "NEW:",
      news: "Our opening hours have changed!",
      button: "Click here for more info!",
      counter: "Visitor no. 0038412",
      updated: "Last updated: 03.11.2014",
    },
    n: {
      brand: "kessler.",
      nav: ["bread", "shop", "contact"],
      h1a: "bread.",
      h1b: "honestly baked.",
      body: "since 1987 · fresh every morning.",
      cta: "come by →",
      tiles: ["rye", "sourdough", "braid"],
      chips: "0.4s load · mobile ✓ · on google ✓",
    },
  },
};

const TILE_COLORS = ["#d9c5a0", "#c4a878", "#b08d5e"] as const;

export function VorherNachher() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [x, setX] = useState(58);
  const [touched, setTouched] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setX(Math.min(94, Math.max(6, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    setTouched(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const endDrag = () => {
    dragging.current = false;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setTouched(true);
      setX((v) => Math.max(6, v - 5));
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      setTouched(true);
      setX((v) => Math.min(94, v + 5));
      e.preventDefault();
    }
  };

  return (
    <div className="w-full max-w-[960px] rounded-2xl overflow-hidden border border-[#0a0a0a]/12 bg-[#161616] shadow-[0_36px_90px_-32px_rgba(10,10,10,0.5)] select-none">
      {/* browser-chrome */}
      <div className="flex items-center gap-3 h-9 md:h-10 px-4 bg-[#161616]">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f2f2f2]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f2f2f2]/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f2f2f2]/20" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="font-mono text-[10px] tracking-wide text-[#f2f2f2]/55 bg-[#f2f2f2]/[0.07] rounded-full px-4 py-1">
            baeckerei-kessler.be
          </span>
        </div>
        <span className="w-10" aria-hidden />
      </div>

      {/* viewport · beide sites + regler */}
      <div
        ref={frameRef}
        className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden"
        style={{ containerType: "inline-size", touchAction: "pan-y", cursor: "ew-resize" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* ── NACHHER · basis-layer · laconis-stil ─────────────────── */}
        <div className="absolute inset-0 bg-[#f2f1ec] text-[#0f0f0f] overflow-hidden">
          <div className="absolute inset-0 flex flex-col" style={{ padding: "4cqw 5cqw" }}>
            <div className="flex items-baseline justify-between">
              <span className="font-display font-black lowercase" style={{ fontSize: "clamp(12px,3cqw,18px)" }}>
                {t.n.brand}
              </span>
              <span className="font-mono uppercase" style={{ fontSize: "clamp(7px,1.8cqw,10px)", letterSpacing: "0.12em", color: "rgba(15,15,15,0.55)" }}>
                {t.n.nav.join(" · ")}
              </span>
            </div>

            <h3
              className="font-display font-black lowercase"
              style={{ fontSize: "clamp(22px,7.2cqw,46px)", lineHeight: 0.95, letterSpacing: "-0.03em", marginTop: "6cqw" }}
            >
              {t.n.h1a}
              <br />
              {t.n.h1b}
            </h3>
            <p style={{ fontSize: "clamp(10px,2.2cqw,13px)", color: "rgba(15,15,15,0.6)", marginTop: "2.4cqw" }}>
              {t.n.body}
            </p>
            <span
              className="self-start font-mono uppercase rounded-full"
              style={{
                fontSize: "clamp(8px,1.9cqw,11px)",
                letterSpacing: "0.1em",
                background: "#0f0f0f",
                color: "#e1fd52",
                padding: "clamp(4px,1.2cqw,8px) clamp(10px,2.8cqw,18px)",
                marginTop: "3.2cqw",
              }}
            >
              {t.n.cta}
            </span>

            <div className="grid grid-cols-3 mt-auto" style={{ gap: "clamp(6px,2cqw,14px)" }}>
              {t.n.tiles.map((label, i) => (
                <div key={label}>
                  <div className="rounded-lg" style={{ aspectRatio: "4/3", background: TILE_COLORS[i] }} />
                  <div className="font-mono lowercase" style={{ fontSize: "clamp(8px,1.8cqw,10px)", color: "rgba(15,15,15,0.6)", marginTop: "1cqw" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            <div className="font-mono" style={{ fontSize: "clamp(8px,1.7cqw,10px)", color: "rgba(15,15,15,0.45)", marginTop: "2.6cqw" }}>
              {t.n.chips}
            </div>
          </div>

          {/* chip nachher */}
          <span
            className="absolute font-mono uppercase rounded-full"
            style={{ right: "3.5%", top: "4.5%", fontSize: "clamp(8px,1.9cqw,10px)", letterSpacing: "0.12em", background: "#0f0f0f", color: "#e1fd52", padding: "4px 12px" }}
          >
            {t.chipNew}
          </span>
        </div>

        {/* ── VORHER · top-layer · wird geclippt ───────────────────── */}
        <div
          className="absolute inset-0 bg-white overflow-hidden"
          style={{ clipPath: `inset(0 calc(100% - ${x}%) 0 0)`, fontFamily: "'Times New Roman', Times, serif" }}
        >
          <div className="absolute inset-0" style={{ padding: "4cqw 5cqw", color: "#000" }}>
            <div style={{ fontSize: "clamp(15px,4.2cqw,26px)", fontWeight: 700, color: "#00007a", textAlign: "center", textDecoration: "underline" }}>
              {t.o.title}
            </div>
            <div style={{ fontSize: "clamp(8px,2.1cqw,12px)", textAlign: "center", marginTop: "1.6cqw", color: "#0000ee" }}>
              {t.o.nav.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span style={{ color: "#555" }}> | </span>}
                  <span style={{ textDecoration: "underline" }}>{item}</span>
                </span>
              ))}
            </div>
            <div style={{ borderTop: "3px double #999", marginTop: "2.4cqw" }} />

            <div style={{ fontSize: "clamp(11px,3cqw,18px)", fontWeight: 700, color: "#cc0000", textAlign: "center", marginTop: "3.2cqw" }}>
              {t.o.welcome}
            </div>
            <p style={{ fontSize: "clamp(9px,2.3cqw,13px)", lineHeight: 1.45, textAlign: "justify", marginTop: "2.4cqw" }}>
              {t.o.body}
            </p>

            <div
              style={{
                fontSize: "clamp(9px,2.2cqw,12px)",
                background: "#ffff99",
                border: "1px dashed #cc0000",
                padding: "1.6cqw 2.4cqw",
                marginTop: "3cqw",
              }}
            >
              <span className="vn-blink" style={{ color: "#cc0000", fontWeight: 700 }}>
                {t.o.neu}
              </span>{" "}
              {t.o.news}
            </div>

            <div style={{ textAlign: "center", marginTop: "3.4cqw" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: "clamp(9px,2.2cqw,13px)",
                  background: "#d4d0c8",
                  border: "2px outset #fff",
                  padding: "1.2cqw 3cqw",
                  color: "#000",
                }}
              >
                {t.o.button}
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                left: "5%",
                right: "5%",
                bottom: "4%",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "clamp(8px,1.9cqw,11px)",
                color: "#555",
              }}
            >
              <span style={{ fontFamily: "monospace", background: "#000", color: "#0f0", padding: "1px 6px" }}>{t.o.counter}</span>
              <span>{t.o.updated}</span>
            </div>
          </div>

          {/* chip vorher */}
          <span
            className="absolute font-mono uppercase rounded-full"
            style={{ left: "3.5%", top: "4.5%", fontSize: "clamp(8px,1.9cqw,10px)", letterSpacing: "0.12em", background: "rgba(10,10,10,0.85)", color: "#f2f2f2", padding: "4px 12px" }}
          >
            {t.chipOld}
          </span>
        </div>

        {/* ── regler ───────────────────────────────────────────────── */}
        <div className="absolute inset-y-0 pointer-events-none" style={{ left: `${x}%` }}>
          <div
            aria-hidden
            className="absolute inset-y-0 -translate-x-1/2 w-[3px] bg-[#e1fd52]"
            style={{ boxShadow: "0 0 18px rgba(225,253,82,0.55)" }}
          />
          <div
            role="slider"
            tabIndex={0}
            aria-label={t.aria}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(x)}
            onKeyDown={onKeyDown}
            className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center w-11 h-11 rounded-full bg-[#e1fd52] border-2 border-[#0a0a0a] outline-none focus-visible:ring-4 focus-visible:ring-[#b084d3]/60 ${touched ? "" : "vn-idle"}`}
            style={{ cursor: "grab", touchAction: "none", boxShadow: "0 10px 30px -8px rgba(10,10,10,0.5)" }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#0a0a0a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 6 L4 12 L9 18" />
              <path d="M15 6 L20 12 L15 18" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
