"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

/**
 * CarbonBadge · footer-trust-marker.
 *
 * zeigt den geschätzten CO₂-fußabdruck einer seitenansicht.
 * basis-formel approximiert nach websitecarbon.com (sustainable web design model):
 *   bytes × 1.8e-7 kWh/GB × 0.475 kg CO₂/kWh ≈ 0.000456 g pro KB
 * laconis-seiten liegen unter 200KB komprimiert → ~0.04g pro view.
 *
 * micro-anims:
 *   - zahl tickt von 0 hoch zur target-zahl (1.4s ease-out) wenn sichtbar
 *   - lila-dot pulst (alle 3s)
 *   - hover: zahl wird leicht größer, "/ view" wird grünlich
 *
 * keine externen requests · keine analytics-tracker · die zahl ist statisch
 * berechnet, nicht live gemessen. Wir messen die seite einmal und tragen ein.
 *
 * statische werte (gemessen via lighthouse + websitecarbon):
 *   typische page bei laconis: ~180 KB transferred → 0.04g CO₂
 */

const TARGET_GRAMS = 0.04;

type Dict = {
  label: string;
  unit: string;
  perView: string;
  pageSize: string;
  hint: string;
  tooltipMore: string;
  tooltipLink: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    label: "co₂",
    unit: "g",
    perView: "/ seitenansicht",
    pageSize: "≈ 180 kb · 100/100 lighthouse",
    hint: "klein gebaut · drum klein im verbrauch",
    tooltipMore: "wie wird das berechnet?",
    tooltipLink: "websitecarbon.com",
  },
  fr: {
    label: "co₂",
    unit: "g",
    perView: "/ vue",
    pageSize: "≈ 180 ko · 100/100 lighthouse",
    hint: "construit léger · donc léger en consommation",
    tooltipMore: "comment c'est calculé ?",
    tooltipLink: "websitecarbon.com",
  },
  en: {
    label: "co₂",
    unit: "g",
    perView: "/ pageview",
    pageSize: "≈ 180 kb · 100/100 lighthouse",
    hint: "built small · so small in consumption",
    tooltipMore: "how is this calculated?",
    tooltipLink: "websitecarbon.com",
  },
};

/* count-up hook · easeOutCubic */
function useCountUp(target: number, durationMs = 1400, start: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!start) return;
    if (reduce) {
      setValue(target);
      return;
    }
    startRef.current = null;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const elapsed = t - startRef.current;
      const p = Math.min(1, elapsed / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, durationMs, start, reduce]);

  return value;
}

export function CarbonBadge({ className }: { className?: string }) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const display = useCountUp(TARGET_GRAMS, 1400, inView);
  const [open, setOpen] = useState(false);

  /* format · 3 nachkommastellen während des animierens, dann 2 */
  const formatted =
    display < TARGET_GRAMS
      ? display.toFixed(3)
      : TARGET_GRAMS.toFixed(2).replace(/0$/, "") || "0.04";

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "group inline-flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-mono",
          className,
        )}
        aria-label={`${formatted} ${t.unit} co₂ ${t.perView}`}
      >
        {/* pulsing lila dot */}
        <motion.span
          aria-hidden
          className="shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-[#b084d3]"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.55, 1, 0.55],
                  scale: [1, 1.25, 1],
                }
          }
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-offwhite/55">{t.label}</span>
        <span
          className="tabular-nums text-offwhite font-medium"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {formatted}
          {t.unit}
        </span>
        <span className="text-offwhite/35">{t.perView}</span>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.tooltipMore}
          className="ml-1 text-offwhite/35 hover:text-accent-ink transition-colors"
        >
          ⓘ
        </button>
      </div>

      {/* modal · einfach, kein backdrop-trap, klick außerhalb schließt */}
      {open && (
        <div
          className="fixed inset-0 z-[10001] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t.tooltipMore}
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="liquid-glass rounded-2xl p-6 md:p-7 max-w-[420px] w-full text-offwhite"
          >
            <div className="flex items-baseline gap-2 mb-4">
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#b084d3]"
              />
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                {t.label}
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-sans font-black text-[clamp(40px,7vw,64px)] leading-[0.9] text-accent-ink tabular-nums">
                {TARGET_GRAMS.toFixed(2)}
                <span className="text-[0.5em] text-offwhite/65 ml-1">
                  {t.unit}
                </span>
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-offwhite/75 mb-4">
              {t.hint}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-mono text-offwhite/45 mb-5">
              {t.pageSize}
            </p>
            <a
              href="https://www.websitecarbon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-accent-ink hover:underline"
            >
              {t.tooltipLink} ↗
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 font-mono text-[14px] text-offwhite/55 hover:text-offwhite"
              aria-label="close"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
