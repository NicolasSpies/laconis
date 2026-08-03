"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<
  Locale,
  { header: string; items: string[]; sum: string; stamp: string; note: string }
> = {
  de: {
    header: "kostenvoranschlag",
    items: ["onepager", "+ cms · selbst pflegen", "+ branding-set"],
    sum: "summe",
    stamp: "richtwert",
    note: "kein festpreis · ehrliche schätzung",
  },
  fr: {
    header: "devis indicatif",
    items: ["onepager", "+ cms · à gérer soi-même", "+ pack branding"],
    sum: "total",
    stamp: "indicatif",
    note: "pas de prix fixe · estimation honnête",
  },
  en: {
    header: "ballpark quote",
    items: ["onepager", "+ cms · self-edit", "+ branding set"],
    sum: "total",
    stamp: "ballpark",
    note: "no fixed price · honest estimate",
  },
};

/**
 * EstimateCard · hero-anker für /preise · ein gekippter „kostenvoranschlag".
 *
 * antwortet auf „kein paket-raster, jedes projekt anders": ein beleg mit
 * positionen, aber statt erfundener zahlen ein diagonaler lime-stempel
 * „richtwert" — sagt visuell, was die seite sagt: keine festen preise.
 * gleiche papier-bildsprache wie BrandSystemHero.
 */
export function EstimateCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  const locale = useLocale();
  const t = pick(DICT, locale);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setOn(true);
      return;
    }
    const tid = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(tid);
  }, [inView, reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full select-none"
      style={{ containerType: "inline-size" }}
    >
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* ambient lime glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "12%", top: "12%", width: "76%", height: "76%",
            background: "radial-gradient(ellipse at center, rgb(225 253 82 / 0.13), transparent 70%)",
            filter: "blur(48px)",
            opacity: on ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />

        {/* ── der beleg ─────────────────────────────────────────────── */}
        <motion.div
          className="absolute flex flex-col"
          initial={{ opacity: 0, y: 22, rotate: -4 }}
          animate={on ? { opacity: 1, y: 0, rotate: -2 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: "16%", top: "10%", width: "62%", height: "80%",
            background: "linear-gradient(170deg, #f6f5f1 0%, #ecebe4 100%)",
            padding: "7% 8%",
            boxShadow: "0 26px 60px -20px rgba(0,0,0,0.6), 0 6px 20px -6px rgba(0,0,0,0.3)",
            borderRadius: "2px",
          }}
        >
          {/* header-zeile */}
          <div className="flex items-center justify-between" style={{ marginBottom: "8%" }}>
            <span className="font-mono uppercase" style={{ fontSize: "min(2.6cqw,12px)", letterSpacing: "0.12em", color: "#0a0a0a" }}>
              {t.header}
            </span>
            <span className="font-display lowercase" style={{ fontSize: "min(4cqw,18px)", color: "#0a0a0a" }}>
              lac<span style={{ color: "#b084d3" }}>ø</span>nis
            </span>
          </div>

          {/* positionen · dotted leader */}
          <div className="flex flex-col" style={{ gap: "min(3cqw,14px)" }}>
            {t.items.map((it, i) => (
              <motion.div
                key={it}
                className="flex items-baseline"
                initial={{ opacity: 0, x: -10 }}
                animate={on ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
              >
                <span style={{ fontSize: "min(3cqw,14px)", color: "#2a2a2a" }}>{it}</span>
                <span
                  className="flex-1 mx-2"
                  style={{ borderBottom: "1px dotted rgba(10,10,10,0.3)", transform: "translateY(-0.2em)" }}
                />
                <span className="font-mono" style={{ fontSize: "min(3.2cqw,15px)", color: "#0a0a0a" }}>~</span>
              </motion.div>
            ))}
          </div>

          {/* summe */}
          <div className="mt-auto" style={{ paddingTop: "7%" }}>
            <div style={{ borderTop: "2px solid rgba(10,10,10,0.15)", paddingTop: "6%" }} className="flex items-baseline justify-between">
              <span className="font-mono uppercase" style={{ fontSize: "min(2.4cqw,11px)", letterSpacing: "0.1em", color: "#6a6a6a" }}>
                {t.sum}
              </span>
              <span className="font-display" style={{ fontSize: "min(8cqw,38px)", lineHeight: 1, color: "#0a0a0a" }}>
                ~ <span style={{ color: "#0a0a0a" }}>€</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── diagonaler lime-stempel „richtwert" ───────────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, scale: 1.4, rotate: -18 }}
          animate={on ? { opacity: 1, scale: 1, rotate: -12 } : {}}
          transition={{ duration: 0.5, delay: 1.4, ease: [0.34, 1.56, 0.64, 1] }}
          style={{
            right: "6%", top: "46%",
            padding: "min(1.4cqw,7px) min(3cqw,15px)",
            border: "2.5px solid #e1fd52",
            borderRadius: "4px",
            background: "#141414",
            boxShadow: "0 10px 26px -8px rgba(0,0,0,0.5)",
          }}
        >
          <span className="font-mono uppercase" style={{ fontSize: "min(3.4cqw,16px)", letterSpacing: "0.14em", color: "#e1fd52" }}>
            {t.stamp}
          </span>
        </motion.div>

        {/* ── hand-notiz unten ──────────────────────────────────────── */}
        <motion.div
          className="absolute font-hand"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
          style={{
            left: "6%", bottom: "3%",
            fontSize: "min(3.6cqw,17px)",
            color: "#2a2a2a",
            transform: "rotate(-2deg)",
          }}
        >
          {t.note}
        </motion.div>
      </div>
    </div>
  );
}
