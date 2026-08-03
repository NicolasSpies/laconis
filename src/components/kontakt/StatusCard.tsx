"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<
  Locale,
  { header: string; status: string; rows: { k: string; v: string }[]; note: string }
> = {
  de: {
    header: "status",
    status: "offen für projekte",
    rows: [
      { k: "erreichbar", v: "direkt" },
      { k: "sprachen", v: "DE · FR · EN" },
      { k: "arbeitsweise", v: "remote · überall" },
    ],
    note: "schreib einfach",
  },
  fr: {
    header: "statut",
    status: "ouvert aux projets",
    rows: [
      { k: "joignable", v: "direct" },
      { k: "langues", v: "DE · FR · EN" },
      { k: "façon de bosser", v: "remote · partout" },
    ],
    note: "écris-moi",
  },
  en: {
    header: "status",
    status: "open for projects",
    rows: [
      { k: "reachable", v: "direct" },
      { k: "languages", v: "DE · FR · EN" },
      { k: "how i work", v: "remote · everywhere" },
    ],
    note: "just write",
  },
};

/**
 * StatusCard · hero-anker für /kontakt · eine gekippte „live"-status-karte.
 *
 * pulsierender lime-dot (animate-ping · CSS/compositor, friert nicht ein) +
 * „offen für projekte", drunter erreichbar / sprachen / arbeitsweise. macht
 * den leeren hero-raum zu einem verfügbarkeits-signal. dunkle karte =
 * eigener kleiner kontrast-moment im sonst hellen kontakt-hero.
 */
export function StatusCard() {
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
            background: "radial-gradient(ellipse at center, rgb(225 253 82 / 0.14), transparent 70%)",
            filter: "blur(48px)",
            opacity: on ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />

        {/* ── dunkle status-karte ───────────────────────────────────── */}
        <motion.div
          className="absolute flex flex-col"
          initial={{ opacity: 0, y: 22, rotate: -4 }}
          animate={on ? { opacity: 1, y: 0, rotate: -2 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            left: "16%", top: "11%", width: "62%", height: "78%",
            background: "linear-gradient(160deg, #1c1c1c 0%, #0e0e0e 100%)",
            padding: "9% 9%",
            boxShadow: "0 26px 60px -20px rgba(0,0,0,0.7), 0 6px 20px -6px rgba(0,0,0,0.4)",
            borderRadius: "6px",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <span className="font-mono uppercase" style={{ fontSize: "min(2.4cqw,11px)", letterSpacing: "0.16em", color: "rgba(242,242,242,0.4)" }}>
            {t.header}
          </span>

          {/* status-zeile · pulsierender dot */}
          <div className="flex items-center" style={{ gap: "min(2.6cqw,12px)", marginTop: "7%" }}>
            <span className="relative flex shrink-0" style={{ width: "min(2.6cqw,12px)", height: "min(2.6cqw,12px)" }}>
              <span className="absolute inline-flex h-full w-full rounded-full animate-ping" style={{ background: "rgba(225,253,82,0.65)" }} />
              <span className="relative inline-flex rounded-full h-full w-full" style={{ background: "#e1fd52", boxShadow: "0 0 12px rgba(225,253,82,0.8)" }} />
            </span>
            <span className="font-display lowercase" style={{ fontSize: "min(6cqw,30px)", lineHeight: 1.02, color: "#f2f2f2", letterSpacing: "-0.02em" }}>
              {t.status}
            </span>
          </div>

          {/* meta-rows */}
          <div className="mt-auto flex flex-col" style={{ gap: "min(2.2cqw,10px)", paddingTop: "8%" }}>
            {t.rows.map((r, i) => (
              <motion.div
                key={r.k}
                className="flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "min(2.2cqw,10px)" }}
                initial={{ opacity: 0, x: -8 }}
                animate={on ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.15 }}
              >
                <span className="font-mono uppercase" style={{ fontSize: "min(2.1cqw,10px)", letterSpacing: "0.1em", color: "rgba(242,242,242,0.45)" }}>
                  {r.k}
                </span>
                <span className="font-mono" style={{ fontSize: "min(2.5cqw,12px)", color: "#f2f2f2" }}>
                  {r.v}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── hand-notiz ────────────────────────────────────────────── */}
        <motion.div
          className="absolute font-hand"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
          style={{
            right: "5%", bottom: "3%",
            fontSize: "min(4cqw,19px)",
            color: "#2a2a2a",
            transform: "rotate(-3deg)",
          }}
        >
          {t.note} ↘
        </motion.div>
      </div>
    </div>
  );
}
