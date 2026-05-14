"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * CursorCanvas · "alive"-section auf /ueber-mich.
 *
 * dunkles feld mit grid-bg. cursor zieht lime-trails (verblassen).
 * scattered wörter sind magnetisch · werden zum cursor gezogen, je
 * näher desto mehr. pure interactive vibe ohne funktion — emotional,
 * keine call-to-action. landet als atmosphere-section, kein wow für
 * den wow-effekt sondern als "ich bin da, ich antworte"-moment.
 */

type Trail = { id: number; x: number; y: number };

type WordSpec = {
  t: string;
  x: number; // 0..1
  y: number; // 0..1
  size: number;
  italic: boolean;
  color: "offwhite" | "accent" | "muted";
};

type Dict = {
  kicker: string;
  hint: string;
  cornerTop: string;
  cornerBottom: string;
  words: WordSpec[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "↘ alive · bewege die maus",
    hint: "kein call-to-action · nur ein moment ↗",
    cornerTop: "move · draw · feel",
    cornerBottom: "atmosphere · 07",
    words: [
      { t: "design", x: 0.18, y: 0.22, size: 56, italic: false, color: "offwhite" },
      { t: "code", x: 0.75, y: 0.18, size: 70, italic: true, color: "accent" },
      { t: "marke", x: 0.62, y: 0.55, size: 84, italic: true, color: "offwhite" },
      { t: "soul", x: 0.28, y: 0.7, size: 92, italic: true, color: "accent" },
      { t: "websites", x: 0.46, y: 0.38, size: 64, italic: false, color: "offwhite" },
      { t: "print", x: 0.85, y: 0.78, size: 50, italic: false, color: "offwhite" },
      { t: "DE·FR·EN", x: 0.08, y: 0.85, size: 32, italic: false, color: "muted" },
      { t: "eupen", x: 0.88, y: 0.45, size: 36, italic: true, color: "muted" },
    ],
  },
  fr: {
    kicker: "↘ alive · bouge la souris",
    hint: "pas de call-to-action · juste un moment ↗",
    cornerTop: "bouge · trace · ressens",
    cornerBottom: "atmosphere · 07",
    words: [
      { t: "design", x: 0.18, y: 0.22, size: 56, italic: false, color: "offwhite" },
      { t: "code", x: 0.75, y: 0.18, size: 70, italic: true, color: "accent" },
      { t: "marque", x: 0.62, y: 0.55, size: 84, italic: true, color: "offwhite" },
      { t: "âme", x: 0.28, y: 0.7, size: 92, italic: true, color: "accent" },
      { t: "sites web", x: 0.46, y: 0.38, size: 64, italic: false, color: "offwhite" },
      { t: "print", x: 0.85, y: 0.78, size: 50, italic: false, color: "offwhite" },
      { t: "DE·FR·EN", x: 0.08, y: 0.85, size: 32, italic: false, color: "muted" },
      { t: "eupen", x: 0.88, y: 0.45, size: 36, italic: true, color: "muted" },
    ],
  },
  en: {
    kicker: "↘ alive · move the mouse",
    hint: "no call-to-action · just a moment ↗",
    cornerTop: "move · draw · feel",
    cornerBottom: "atmosphere · 07",
    words: [
      { t: "design", x: 0.18, y: 0.22, size: 56, italic: false, color: "offwhite" },
      { t: "code", x: 0.75, y: 0.18, size: 70, italic: true, color: "accent" },
      { t: "brand", x: 0.62, y: 0.55, size: 84, italic: true, color: "offwhite" },
      { t: "soul", x: 0.28, y: 0.7, size: 92, italic: true, color: "accent" },
      { t: "websites", x: 0.46, y: 0.38, size: 64, italic: false, color: "offwhite" },
      { t: "print", x: 0.85, y: 0.78, size: 50, italic: false, color: "offwhite" },
      { t: "DE·FR·EN", x: 0.08, y: 0.85, size: 32, italic: false, color: "muted" },
      { t: "eupen", x: 0.88, y: 0.45, size: 36, italic: true, color: "muted" },
    ],
  },
};

const CANVAS_W = 1200;
const CANVAS_H = 640;

export function CursorCanvas() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const ref = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [mouse, setMouse] = useState({ x: -200, y: -200, inside: false });
  const idCounter = useRef(0);

  useEffect(() => {
    if (!mouse.inside) return;
    const i = setInterval(() => setTrails((prev) => prev.slice(-30)), 800);
    return () => clearInterval(i);
  }, [mouse.inside]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({ x, y, inside: true });
    const id = ++idCounter.current;
    setTrails((prev) => [...prev.slice(-29), { id, x, y }]);
  }

  return (
    <section className="relative py-12 md:py-16">
      <div className="container-site">
        <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
            {t.kicker}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
            {t.cornerBottom}
          </span>
        </div>

        <div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={() => setMouse({ x: -200, y: -200, inside: false })}
          className="relative mx-auto rounded-2xl overflow-hidden cursor-none border border-ink/20"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, #181818 0%, #0a0a0a 70%, #050505 100%)",
            height: `${CANVAS_H}px`,
            maxWidth: `${CANVAS_W}px`,
          }}
        >
          {/* ambient grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* cursor spotlight */}
          {mouse.inside && (
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                left: mouse.x - 300,
                top: mouse.y - 300,
                width: 600,
                height: 600,
                background:
                  "radial-gradient(circle, rgba(225,253,82,0.18) 0%, rgba(225,253,82,0.06) 30%, transparent 60%)",
                filter: "blur(4px)",
              }}
            />
          )}

          {/* trails */}
          {trails.map((tr, i) => {
            const age = (trails.length - i) / trails.length;
            return (
              <div
                key={tr.id}
                aria-hidden
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: tr.x - 8,
                  top: tr.y - 8,
                  width: 16,
                  height: 16,
                  background: "#e1fd52",
                  opacity: age * 0.85,
                  filter: `blur(${(1 - age) * 8}px)`,
                  boxShadow: `0 0 ${age * 30}px ${age * 8}px rgba(225,253,82,${age * 0.4})`,
                }}
              />
            );
          })}

          {/* magnetic words */}
          {t.words.map((w, i) => {
            const baseX = w.x * CANVAS_W;
            const baseY = w.y * CANVAS_H;
            const dx = mouse.inside ? mouse.x - baseX : 0;
            const dy = mouse.inside ? mouse.y - baseY : 0;
            const dist = Math.hypot(dx, dy);
            const force = mouse.inside ? Math.max(0, 1 - dist / 380) : 0;
            const offsetX = dx * force * 0.3;
            const offsetY = dy * force * 0.3;
            const color =
              w.color === "accent"
                ? "rgb(225,253,82)"
                : w.color === "muted"
                  ? "rgba(242,242,242,0.35)"
                  : "rgba(242,242,242,0.75)";
            return (
              <motion.span
                key={i}
                animate={{ x: offsetX, y: offsetY }}
                transition={{ type: "spring", damping: 12, stiffness: 80 }}
                className={`absolute pointer-events-none select-none whitespace-nowrap ${
                  w.italic ? "" : "font-sans tracking-[-0.03em]"
                }`}
                style={{
                  left: baseX,
                  top: baseY,
                  fontSize: w.size,
                  fontWeight: w.italic ? 400 : 700,
                  lineHeight: 1,
                  color,
                  textShadow: force > 0.3 ? `0 0 20px ${color}` : "none",
                  ...(w.italic
                    ? {
                        fontFamily: "var(--font-instrument), serif",
                        fontStyle: "italic",
                      }
                    : {}),
                }}
              >
                {w.t}
              </motion.span>
            );
          })}

          {/* fake cursor */}
          {mouse.inside && (
            <div
              aria-hidden
              className="absolute pointer-events-none z-10"
              style={{
                left: mouse.x - 6,
                top: mouse.y - 6,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#e1fd52",
                boxShadow: "0 0 20px 4px rgba(225,253,82,0.6)",
              }}
            />
          )}

          {/* corner labels */}
          <span className="absolute top-5 left-6 font-mono text-[10px] uppercase tracking-label text-offwhite/35 z-20 pointer-events-none">
            {t.cornerTop}
          </span>

          {!mouse.inside && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <span className="font-hand text-[26px] text-offwhite/55 rotate-[-2deg]">
                {t.hint}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
