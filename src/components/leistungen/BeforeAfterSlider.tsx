"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Accent = {
  key: string;
  label: string;
  rgb: string; // "225 253 82"
  hex: string;
};

const ACCENTS: Accent[] = [
  { key: "lime", label: "lime", rgb: "225 253 82", hex: "#E1FD52" },
  { key: "coral", label: "coral", rgb: "255 122 89", hex: "#FF7A59" },
  { key: "sky", label: "sky", rgb: "120 190 255", hex: "#78BEFF" },
  { key: "pink", label: "pink", rgb: "244 154 194", hex: "#F49AC2" },
  { key: "peach", label: "peach", rgb: "255 196 130", hex: "#FFC482" },
  { key: "slate", label: "slate", rgb: "200 210 220", hex: "#C8D2DC" },
];

/**
 * Before/After slider.
 * Linke Seite (geclippt): Generic 0815-Standard-Scheiss.
 * Rechte Seite (ganze Fläche darunter): Laconis-Premium-Editorial.
 */
export function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(45);
  const [accent, setAccent] = useState<Accent>(ACCENTS[0]);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const next = Math.max(4, Math.min(96, (x / rect.width) * 100));
    setPct(next);
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    };
    const onUp = () => {
      draggingRef.current = false;
      document.body.style.cursor = "";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [updateFromClientX]);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      draggingRef.current = true;
      document.body.style.cursor = "ew-resize";
      updateFromClientX(e.clientX);
    },
    [updateFromClientX],
  );

  const scopeStyle = { ["--demo" as string]: accent.rgb } as React.CSSProperties;

  return (
    <div className="relative w-full" style={scopeStyle}>
      {/* Labels */}
      <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-label">
        <span className="text-offwhite/40">← 0815-template</span>
        <span className="text-offwhite/40">zieh den regler</span>
        <span style={{ color: `rgb(${accent.rgb})` }}>laconis →</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-ink/10 select-none touch-none shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
        onPointerDown={startDrag}
      >
        {/* Right — Laconis premium (unten, ganze Fläche) */}
        <LaconisMock accentRgb={accent.rgb} />

        {/* Left — Generic 0815 (geclippt) */}
        <div
          className="absolute inset-0 isolate overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)`, zIndex: 1 }}
        >
          <GenericMock />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
          style={{
            left: `${pct}%`,
            transform: "translateX(-1px)",
            background: `rgb(${accent.rgb})`,
            boxShadow: `0 0 16px rgb(${accent.rgb} / 0.5)`,
          }}
        />

        {/* Handle */}
        <motion.button
          type="button"
          aria-label="vergleichs-regler"
          onPointerDown={startDrag}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full text-black flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.6)] cursor-ew-resize"
          style={{ left: `${pct}%`, background: `rgb(${accent.rgb})` }}
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            <path
              d="M6 1L1 7L6 13M14 1L19 7L14 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      </div>

      {/* Farb-Picker direkt unter dem Slider */}
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
          deine seite in deiner farbe:
        </span>
        <div className="flex flex-wrap gap-2">
          {ACCENTS.map((a) => {
            const active = a.key === accent.key;
            return (
              <button
                key={a.key}
                type="button"
                onClick={() => setAccent(a)}
                className="group inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border transition-colors"
                style={{
                  borderColor: active
                    ? `rgb(${a.rgb} / 0.55)`
                    : "rgb(var(--ink) / 0.1)",
                  background: active
                    ? `rgb(${a.rgb} / 0.08)`
                    : "rgb(var(--ink) / 0.01)",
                }}
                aria-pressed={active}
              >
                <span
                  className="h-4 w-4 rounded-full border border-black/20 shrink-0"
                  style={{ background: a.hex }}
                />
                <span
                  className="font-mono text-[11px]"
                  style={{
                    color: active ? `rgb(${a.rgb})` : "rgb(var(--fg) / 0.6)",
                  }}
                >
                  {a.label}
                </span>
              </button>
            );
          })}
        </div>
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/30 ml-auto">
          {accent.hex}
        </span>
      </div>
    </div>
  );
}

/* ---------- Browser Chrome ---------- */

function MockBrowserChrome({
  url,
  bar,
  textColor = "rgba(0,0,0,0.5)",
}: {
  url: string;
  bar: string;
  textColor?: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-3 py-1.5 border-b shrink-0"
      style={{ borderColor: bar, background: bar }}
    >
      <div className="flex gap-1.5">
        <span className="w-2 h-2 rounded-full bg-black/25" />
        <span className="w-2 h-2 rounded-full bg-black/25" />
        <span className="w-2 h-2 rounded-full bg-black/25" />
      </div>
      <div
        className="ml-3 flex-1 rounded-sm px-2 py-0.5 text-[9px] font-mono truncate"
        style={{ background: "rgba(0,0,0,0.06)", color: textColor }}
      >
        {url}
      </div>
    </div>
  );
}

/* =================================================================
   GENERIC 0815 — maximum cringe edition
   ================================================================= */

function GenericMock() {
  return (
    <div className="absolute inset-0 isolate flex flex-col bg-[#f4f4f6] overflow-hidden">
      <MockBrowserChrome
        url="www.xn--bcker-mller-eupen-ydb.de/index.php?page=home&lang=de"
        bar="#e1e2e5"
      />

      {/* Gelbe Rabatt-Leiste */}
      <div className="bg-[#f5c518] text-black text-center py-1 text-[8px] font-bold uppercase tracking-wider flex items-center justify-center gap-2">
        <span>⭐</span>
        <span>NUR HEUTE -20% auf ALLE Brote! Code: BROT20</span>
        <span>⭐</span>
      </div>

      {/* Top-Bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#e9e9eb] border-b border-black/5 text-[7px] text-black/50 font-medium">
        <div className="flex items-center gap-2">
          <span>📞 087-123456</span>
          <span>✉ info@mueller.de</span>
        </div>
        <div className="flex items-center gap-2">
          <span>DE ▾</span>
          <span>🔍</span>
          <span>👤 Login</span>
          <span>🛒 (0)</span>
          <span>f</span>
          <span>i</span>
          <span>in</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-black/5 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center ring-2 ring-amber-200">
            <span className="text-[9px] font-black text-white">BM</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] font-black text-black/80 uppercase">
              Bäcker Müller
            </span>
            <span className="text-[6px] text-black/40 italic">
              Seit 1962 · Meisterbetrieb
            </span>
          </div>
        </div>
        <div className="flex gap-2.5 text-[8px] text-black/60 font-semibold uppercase">
          <span>Home</span>
          <span>Über ▾</span>
          <span>Produkte ▾</span>
          <span>Shop</span>
          <span>Blog</span>
          <span>Kontakt</span>
          <span className="px-2 py-0.5 bg-[#ff5757] text-white rounded-sm animate-pulse">
            AKTION!
          </span>
          <span className="px-2 py-0.5 bg-[#4a90e2] text-white rounded-sm">
            BESTELLEN →
          </span>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="px-5 py-1 bg-white border-b border-black/5 text-[7px] text-black/40">
        Startseite › Home › Willkommen auf unserer Website
      </div>

      {/* Hero */}
      <div className="flex-1 grid grid-cols-[1fr_1fr] gap-3 p-4 relative">
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-[7px] font-bold text-[#f5c518]">
              ★★★★★
            </span>
            <span className="text-[7px] text-black/50 font-medium">
              5,0 Sterne bei Google (273 Bewertungen)
            </span>
          </div>
          <div className="text-[8px] font-bold text-[#4a90e2] uppercase tracking-wider mb-1.5">
            ▸ Ihre Bäckerei Nr.1 in Eupen ◂
          </div>
          <div
            className="text-[20px] font-black text-black/85 leading-tight mb-0.5"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            Herzlich Willkommen
          </div>
          <div
            className="text-[20px] font-black text-black/85 leading-tight mb-2"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            auf unserer Website! 🥖
          </div>
          <div className="text-[8px] text-black/60 leading-relaxed mb-3">
            Wir sind Ihre traditionelle Bäckerei aus Eupen und backen seit
            über 60 Jahren mit viel Liebe und Handwerk. Entdecken Sie unser
            vielfältiges Sortiment an frischen Broten, Brötchen und leckeren
            Kuchen.
          </div>
          <div className="flex gap-1.5 flex-wrap">
            <div className="h-7 px-3 rounded-md bg-[#4a90e2] flex items-center justify-center shadow-md gap-1">
              <span className="text-[8px] text-white font-black uppercase">
                ★ Mehr erfahren ★
              </span>
            </div>
            <div className="h-7 px-3 rounded-md bg-[#ff5757] flex items-center justify-center shadow-md">
              <span className="text-[8px] text-white font-black uppercase">
                Jetzt Bestellen!
              </span>
            </div>
            <div className="h-7 px-3 rounded-md bg-white border border-black/20 flex items-center justify-center">
              <span className="text-[8px] text-black/60 font-bold uppercase">
                Kontakt
              </span>
            </div>
          </div>
        </div>

        {/* Stock-Foto-Feld */}
        <div className="rounded-md bg-gradient-to-br from-[#d4d4d6] via-[#bdbdbf] to-[#9c9c9e] flex items-center justify-center relative overflow-hidden shadow-inner border-2 border-white">
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            className="text-black/20"
          >
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[20px] font-black text-black/10 rotate-[-25deg] tracking-widest">
              SHUTTERSTOCK
            </span>
          </div>
          <span className="absolute bottom-1 right-1.5 text-[6px] font-mono text-black/40">
            shutterstock_248194_baking.jpg
          </span>
          <span className="absolute top-1.5 left-1.5 bg-[#ff5757] text-white text-[6px] font-black px-1 py-0.5 rounded-sm">
            NEU!
          </span>
        </div>

        {/* Newsletter-Popup */}
        <div className="absolute bottom-1 left-3 right-[55%] bg-white border-2 border-[#4a90e2] rounded-md p-2 shadow-2xl">
          <div className="flex items-center gap-1.5">
            <div className="text-[14px]">🎁</div>
            <div className="flex-1 min-w-0">
              <div className="text-[8px] font-black text-black/80 uppercase">
                5€ Gutschein sichern!
              </div>
              <div className="text-[6px] text-black/50">
                Newsletter abonnieren & sparen
              </div>
            </div>
            <div className="text-[8px] text-black/30">✕</div>
          </div>
        </div>
      </div>

      {/* Trust-Badges */}
      <div className="flex items-center justify-center gap-2 px-5 py-1 bg-white border-t border-black/5">
        {["TÜV", "DEKRA", "IHK", "ISO 9001", "★★★★★"].map((b) => (
          <div
            key={b}
            className="text-[6px] font-bold text-black/40 border border-black/10 rounded-sm px-1 py-0.5"
          >
            {b}
          </div>
        ))}
      </div>

      {/* Produkt-Kacheln */}
      <div className="grid grid-cols-4 gap-1.5 px-5 py-1.5 bg-[#f0f0f2]">
        {["Brote", "Brötchen", "Kuchen", "Torten"].map((t, i) => (
          <div
            key={i}
            className="rounded-md bg-white border border-black/10 p-1.5 shadow-sm"
          >
            <div className="h-5 bg-gradient-to-br from-[#ddd] to-[#aaa] rounded-sm mb-1" />
            <div className="text-[7px] font-black text-black/70 mb-0.5 uppercase">
              {t}
            </div>
            <div className="text-[6px] text-[#ff5757] font-bold">
              AB 2,99€ ★
            </div>
          </div>
        ))}
      </div>

      {/* Chat-Bubble */}
      <div className="absolute bottom-3 right-3 bg-[#25D366] text-white rounded-full px-2.5 py-1.5 shadow-2xl flex items-center gap-1">
        <span className="text-[10px]">💬</span>
        <span className="text-[7px] font-bold">Hallo! Kann ich helfen?</span>
      </div>

      {/* Cookie-Banner */}
      <div className="mx-3 mb-1.5 bg-[#1a1a1a] text-white rounded-md px-2.5 py-1.5 flex items-center justify-between shadow-lg relative z-10">
        <span className="text-[7px]">
          🍪 Wir verwenden Cookies, Google Analytics, Facebook Pixel, Hotjar
          und 14 weitere Tracker. Mit der Nutzung stimmen Sie zu.
        </span>
        <div className="flex gap-1 shrink-0 ml-2">
          <span className="px-1.5 py-0.5 bg-[#4a90e2] text-[6px] font-black rounded-sm">
            ALLES AKZEPTIEREN
          </span>
          <span className="px-1.5 py-0.5 bg-white/10 text-[6px] rounded-sm">
            Einstellungen
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-[6px] text-center text-black/30 py-0.5 bg-white border-t border-black/5">
        Made with WordPress · Theme: BakeryPro 2019 · © 2024 Bäcker Müller
      </div>
    </div>
  );
}

/* =================================================================
   LACONIS — premium editorial bakery
   ================================================================= */

function LaconisMock({ accentRgb }: { accentRgb: string }) {
  const ac = `rgb(${accentRgb})`;
  const ac70 = `rgb(${accentRgb} / 0.7)`;
  const ac20 = `rgb(${accentRgb} / 0.2)`;
  const ac10 = `rgb(${accentRgb} / 0.1)`;

  return (
    <div
      className="absolute inset-0 isolate flex flex-col text-offwhite overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 85% 0%, ${ac10} 0%, transparent 45%),
          radial-gradient(ellipse at 10% 100%, rgba(120,70,30,0.12) 0%, transparent 50%),
          linear-gradient(180deg, #0a0a0a 0%, #050505 100%)
        `,
      }}
    >
      <MockBrowserChrome
        url="müller.be"
        bar="#0a0a0a"
        textColor="rgba(242,242,242,0.4)"
      />

      {/* subtle film grain via CSS radial mask */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.015) 0%, transparent 40%)",
        }}
      />

      {/* TOP NAV — editorial magazine style */}
      <div className="relative z-10 flex items-center justify-between px-5 py-2 border-b border-white/6 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-baseline gap-0.5">
            <span
              className="text-[14px] lowercase tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-dm-sans)", fontWeight: 900 }}
            >
              müller
            </span>
            <span className="text-[14px]" style={{ color: ac }}>
              .
            </span>
          </div>
          <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-offwhite/35">
            handwerksbäckerei · eupen · seit 1962
          </span>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex gap-4 font-mono text-[8px] uppercase tracking-[0.18em] text-offwhite/55">
            <span>sortiment</span>
            <span>journal</span>
            <span>werk</span>
            <span>besuchen</span>
          </div>
          <div className="flex items-center gap-1.5 pl-4 border-l border-white/8">
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
                style={{ background: ac }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: ac }}
              />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-offwhite/60">
              offen · bis 13:00
            </span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="relative z-10 flex-1 grid grid-cols-[1.15fr_1fr] min-h-0 overflow-hidden">
        {/* Left — editorial copy */}
        <div className="flex flex-col justify-between p-5 md:p-6 pr-4 md:pr-5 relative min-h-0">
          {/* Top meta */}
          <div className="flex items-baseline justify-between">
            <span
              className="font-mono text-[8px] uppercase tracking-[0.24em]"
              style={{ color: ac }}
            >
              kapitel 01 — brot
            </span>
            <span className="font-mono text-[8px] text-offwhite/30">
              (01)
            </span>
          </div>

          {/* Massive editorial headline */}
          <div className="min-h-0">
            <h1
              className="text-offwhite leading-[0.88] lowercase tracking-[-0.045em]"
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: "clamp(22px, 3.4vw, 38px)",
                fontWeight: 900,
              }}
            >
              brot das
              <br />
              nach{" "}
              <em
                className="italic"
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 400,
                  color: ac,
                }}
              >
                kornfeld
              </em>
              <br />
              riecht.
            </h1>

            {/* Pull-quote */}
            <div
              className="mt-3 pl-2.5 border-l-2 max-w-[220px]"
              style={{ borderColor: ac20 }}
            >
              <p
                className="text-[10px] leading-[1.4] text-offwhite/70"
                style={{
                  fontFamily: "var(--font-instrument), serif",
                  fontStyle: "italic",
                }}
              >
                seit 1962. um vier uhr morgens. weil der teig es verlangt.
              </p>
              <span
                className="mt-1 inline-block font-mono text-[7px] uppercase tracking-[0.2em] text-offwhite/35"
              >
                — pierre müller, 3. generation
              </span>
            </div>
          </div>

          {/* CTAs + meta row */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="px-3 py-1.5 rounded-sm text-black text-[9px] inline-flex items-center gap-1.5"
                style={{
                  background: ac,
                  fontFamily: "var(--font-dm-sans)",
                  fontWeight: 600,
                }}
              >
                sortiment heute
                <span
                  className="font-mono text-[8px]"
                  style={{ opacity: 0.6 }}
                >
                  →
                </span>
              </div>
              <div className="px-3 py-1.5 rounded-sm border border-white/15 text-[9px] text-offwhite/80 font-mono uppercase tracking-[0.14em]">
                werk besuchen
              </div>
            </div>

            {/* Thin meta-row like a magazine colophon */}
            <div className="flex items-center gap-4 pt-2.5 border-t border-white/8">
              <div className="flex flex-col">
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-offwhite/35">
                  sauerteig
                </span>
                <span
                  className="text-[11px] mt-0.5"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 900,
                  }}
                >
                  18 std
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-offwhite/35">
                  ofen
                </span>
                <span
                  className="text-[11px] mt-0.5"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 900,
                  }}
                >
                  240°
                </span>
              </div>
              <div className="flex flex-col ml-auto">
                <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-offwhite/35 text-right">
                  sorten heute
                </span>
                <span
                  className="text-[11px] mt-0.5 text-right"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 900,
                    color: ac,
                  }}
                >
                  14
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right — photo column · clean */}
        <div className="relative p-3 md:p-4 pl-0 min-h-0">
          <div className="relative h-full w-full rounded-md overflow-hidden flex flex-col">
            {/* Warm bread-photo gradient */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 45% 45%, rgba(230,155,80,0.95) 0%, rgba(155,85,35,0.9) 40%, rgba(55,28,14,0.98) 80%, #1a0d06 100%)
                `,
              }}
            />

            {/* Gradient vignette */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* Index top */}
            <div className="relative z-10 p-3 flex items-baseline justify-between">
              <span className="font-mono text-[7px] uppercase tracking-[0.24em] text-offwhite/60">
                laib des tages · nº 04
              </span>
              <span
                className="text-[14px]"
                style={{
                  fontFamily: "var(--font-caveat)",
                  color: ac,
                }}
              >
                frisch um 6
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Bottom row — price left, caption right */}
            <div className="relative z-10 p-3 flex items-end justify-between gap-2">
              <div>
                <div className="font-mono text-[7px] uppercase tracking-[0.22em] text-offwhite/70">
                  roggen · sauerteig · steinofen
                </div>
                <div
                  className="text-[18px] leading-none mt-1"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontWeight: 900,
                    color: ac,
                    letterSpacing: "-0.02em",
                  }}
                >
                  €4,80
                </div>
              </div>
              <span
                className="text-[10px] italic shrink-0"
                style={{
                  fontFamily: "var(--font-instrument), serif",
                  color: ac70,
                }}
              >
                laib 04
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SORTIMENT-STRIP */}
      <div className="relative z-10 px-5 pt-1.5 pb-2 shrink-0 border-t border-white/8">
        <div className="flex items-baseline justify-between mb-1.5">
          <span
            className="font-mono text-[7px] uppercase tracking-[0.24em]"
            style={{ color: ac }}
          >
            — heute im werk —
          </span>
          <span className="font-mono text-[7px] uppercase tracking-[0.18em] text-offwhite/30">
            stand 06:12 · live
          </span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { n: "01", name: "dinkelvollkorn", preis: "4,50", sub: "700g" },
            { n: "02", name: "walnuss", preis: "3,80", sub: "500g" },
            { n: "03", name: "sauerteig", preis: "5,20", sub: "900g" },
            { n: "04", name: "kornfeld", preis: "6,00", sub: "1kg · neu" },
          ].map((p, i) => (
            <div
              key={p.name}
              className={
                "rounded-md border p-2 flex items-start gap-2 relative"
              }
              style={{
                borderColor:
                  i === 3 ? `rgb(${accentRgb} / 0.3)` : "rgba(255,255,255,0.08)",
                background:
                  i === 3
                    ? `rgb(${accentRgb} / 0.04)`
                    : "rgba(255,255,255,0.015)",
              }}
            >
              <span className="font-mono text-[7px] text-offwhite/30 pt-0.5">
                {p.n}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[10px] text-offwhite leading-tight truncate"
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontWeight: 500,
                  }}
                >
                  {p.name}
                </div>
                <div className="font-mono text-[7px] text-offwhite/35 mt-0.5">
                  {p.sub}
                </div>
              </div>
              <div
                className="text-[11px] leading-none shrink-0"
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontWeight: 900,
                  color: i === 3 ? ac : "rgba(242,242,242,0.85)",
                }}
              >
                €{p.preis}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER META */}
      <div className="relative z-10 flex items-center justify-between px-5 py-1.5 font-mono text-[7px] uppercase tracking-[0.22em] text-offwhite/35 border-t border-white/5 shrink-0">
        <span>eupen · belgien</span>
        <span>mo–sa · 06:00–13:00</span>
        <span style={{ color: ac70 }}>say less · mean møre</span>
        <span>01 / 04</span>
      </div>
    </div>
  );
}
