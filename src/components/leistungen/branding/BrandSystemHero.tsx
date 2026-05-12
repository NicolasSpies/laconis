"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<Locale, { loose: string; skizze: string; hand: string }> = {
  de: { loose: "loose · nicht perfekt.", skizze: "skizze → system", hand: "↗ alles von hand" },
  fr: { loose: "loose · pas parfait.", skizze: "esquisse → système", hand: "↗ tout fait main" },
  en: { loose: "loose · not perfect.", skizze: "sketch → system", hand: "↗ all by hand" },
};

/**
 * „tisch von oben" · designer-workspace, nicht präsentiert, nicht steril.
 * Papier mit handgezeichnetem scribble · type-scrap · farbpaletten-dots · tape.
 * Alles lose verteilt, rotiert, animiert rein wie beim echten skizzieren.
 * Kein fake-brand, kein fake-logo — nur was branding *ist*: spuren.
 */

export function BrandSystemHero() {
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
    <div ref={ref} aria-hidden className="relative w-full select-none">
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* ambient lime glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "10%", top: "15%", width: "80%", height: "70%",
            background: "radial-gradient(ellipse at center, rgb(225 253 82 / 0.12), transparent 70%)",
            filter: "blur(50px)",
            opacity: on ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />

        {/* ── LAYER 1 · hauptpapier · groß, leicht rotiert ───────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 20, rotate: -4 }}
          animate={on ? { opacity: 1, y: 0, rotate: -2.2 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: "14%", top: "12%", width: "68%", height: "72%",
            background: "linear-gradient(170deg, #f2f1ec 0%, #e8e6df 100%)",
            boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6), 0 6px 20px -6px rgba(0,0,0,0.3)",
            borderRadius: "2px",
          }}
        >
          {/* papier-textur · dezente grid/noise */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, #000 0, #000 1px, transparent 1px, transparent 22px)",
            }}
          />

          {/* SCRIBBLE · wird animiert gezeichnet */}
          <svg
            viewBox="0 0 200 140"
            className="absolute"
            style={{ left: "8%", top: "12%", width: "55%", height: "auto" }}
          >
            <motion.path
              d="M 10 60 Q 30 20, 55 50 T 110 55 Q 140 40, 170 70 Q 185 85, 180 110"
              stroke="#0f0f0f"
              strokeWidth="2.2"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="400"
              initial={{ strokeDashoffset: 400 }}
              animate={on ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1.6, delay: 0.5, ease: "easeInOut" }}
            />
            {/* kleiner anschlag-strich */}
            <motion.path
              d="M 125 72 L 155 95"
              stroke="rgb(225 253 82)"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="50"
              initial={{ strokeDashoffset: 50 }}
              animate={on ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 0.4, delay: 2.0, ease: "easeOut" }}
              style={{ mixBlendMode: "multiply" }}
            />
          </svg>

          {/* TYPE-SPECIMEN · loose auf papier geschrieben */}
          <motion.div
            className="absolute"
            style={{ right: "8%", bottom: "14%", transform: "rotate(1.5deg)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={on ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <div
              className="font-serif leading-none"
              style={{ fontSize: "min(14cqw, 64px)", color: "#0f0f0f" }}
            >
              Aa
            </div>
            <div
              className="font-mono uppercase leading-none mt-1"
              style={{ fontSize: "min(2.2cqw, 10px)", letterSpacing: "0.12em", color: "#6a6a6a" }}
            >
              34 / 44 / 72
            </div>
          </motion.div>

          {/* notiz · hand-line */}
          <motion.div
            className="absolute font-hand"
            style={{
              left: "10%", bottom: "8%",
              transform: "rotate(-2deg)",
              fontSize: "min(4cqw, 18px)",
              color: "#2a2a2a",
            }}
            initial={{ opacity: 0 }}
            animate={on ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            {t.loose}
          </motion.div>
        </motion.div>

        {/* ── LAYER 2 · tape oben mitte ──────────────────────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: -8 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          style={{
            left: "40%", top: "9%", width: "14%", height: "5%",
            background: "rgb(225 253 82 / 0.75)",
            transform: "rotate(3deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />

        {/* ── LAYER 3 · torn scrap oben links ────────────────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, x: -20, rotate: -12 }}
          animate={on ? { opacity: 1, x: 0, rotate: -8 } : {}}
          transition={{ duration: 0.7, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: "3%", top: "28%", width: "22%", height: "24%",
            background: "#efede5",
            boxShadow: "0 10px 24px -10px rgba(0,0,0,0.5)",
            borderRadius: "1px",
          }}
        >
          {/* abgerissene kante oben */}
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute" style={{ top: "-4px", left: 0, width: "100%", height: "8px" }}>
            <path d="M 0 8 L 0 3 L 8 5 L 15 2 L 24 6 L 33 3 L 42 5 L 51 2 L 60 6 L 69 3 L 78 5 L 86 2 L 94 6 L 100 3 L 100 8 Z" fill="#efede5" />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "12% 14%" }}>
            <div className="font-hand leading-tight" style={{ fontSize: "min(4cqw, 16px)", color: "#0f0f0f" }}>
              {t.skizze}
            </div>
            <div className="flex gap-[6%] mt-2">
              <span className="rounded-full" style={{ width: "18%", aspectRatio: "1", background: "#0f0f0f" }} />
              <span className="rounded-full" style={{ width: "18%", aspectRatio: "1", background: "rgb(225 253 82)" }} />
              <span className="rounded-full" style={{ width: "18%", aspectRatio: "1", background: "#8a8a8a" }} />
            </div>
          </div>
        </motion.div>

        {/* ── LAYER 4 · farbpalette unten rechts · dots poppen rein ──── */}
        <div
          className="absolute flex items-center"
          style={{
            right: "4%", bottom: "9%",
            gap: "min(1.6cqw, 8px)",
            padding: "min(2cqw, 10px) min(2.8cqw, 14px)",
            background: "#1a1a1a",
            borderRadius: "99px",
            boxShadow: "0 12px 30px -8px rgba(0,0,0,0.6)",
            transform: "rotate(4deg)",
          }}
        >
          {[
            "#0f0f0f",
            "#3a3a3a",
            "rgb(225 253 82)",
            "#e8e6df",
            "#8a8a8a",
          ].map((c, i) => (
            <motion.span
              key={i}
              className="block rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={on ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 1.5 + i * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                width: "min(3cqw, 14px)",
                height: "min(3cqw, 14px)",
                background: c,
                boxShadow: c.includes("225") ? "0 0 12px rgb(225 253 82 / 0.6)" : "inset 0 0 0 1px rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>

        {/* ── LAYER 5 · bleistift-strich am rand · animiert ──────────── */}
        <svg
          viewBox="0 0 300 30"
          className="absolute pointer-events-none"
          style={{ left: "6%", top: "6%", width: "30%", height: "auto", transform: "rotate(-4deg)" }}
        >
          <motion.path
            d="M 0 15 Q 80 5, 160 18 T 300 12"
            stroke="rgb(225 253 82)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="320"
            initial={{ strokeDashoffset: 320, opacity: 0 }}
            animate={on ? { strokeDashoffset: 0, opacity: 0.7 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />
        </svg>

        {/* ── LAYER 6 · kleine hand-notiz unten links · *nur wenn keine  reduced motion ── */}
        <motion.div
          className="absolute font-hand pointer-events-none"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
          style={{
            left: "4%", bottom: "5%",
            fontSize: "min(3.4cqw, 15px)",
            color: "rgb(var(--offwhite) / 0.55)",
            transform: "rotate(-3deg)",
          }}
        >
          {t.hand}
        </motion.div>
      </div>
    </div>
  );
}
