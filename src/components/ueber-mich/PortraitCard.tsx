"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCardDrag } from "@/components/shared/useCardDrag";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<Locale, { role: string; since: string; one: string; sign: string }> = {
  de: { role: "designer · web-dev", since: "solo · seit 2019", one: "1 mensch", sign: "— nicolas" },
  fr: { role: "designer · dev web", since: "solo · depuis 2019", one: "1 humain", sign: "— nicolas" },
  en: { role: "designer · web dev", since: "solo · since 2019", one: "1 person", sign: "— nicolas" },
};

/**
 * PortraitCard · der hero-anker für /über-mich · ein gekipptes polaroid.
 *
 * antwortet visuell auf „ein mensch, kein team, persönlich" — zeigt die
 * person statt leerem raum. foto wird aus /nicolas.jpg geladen; fehlt die
 * datei, greift ein sauberes monogram-fallback (kein broken-image, kein
 * „foto folgt"-platzhalter). dahinter ein torn-scrap mit mono-fakten, oben
 * lime-tape — gleiche „desk"-bildsprache wie BrandSystemHero.
 *
 * → foto austauschen: einfach public/nicolas.jpg ablegen.
 */
const PHOTO = "/nicolas.jpg";

export function PortraitCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  // monogram als default · foto wird nur eingeblendet wenn /nicolas.jpg
  // wirklich lädt → nie ein broken-image, auch wenn die datei (noch) fehlt.
  const [hasPhoto, setHasPhoto] = useState(false);
  const locale = useLocale();
  const t = pick(DICT, locale);
  const { elRef: dragRef, x: dragX, y: dragY, handlers: dragHandlers } = useCardDrag(ref);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setOn(true);
      return;
    }
    const tid = setTimeout(() => setOn(true), 100);
    return () => clearTimeout(tid);
  }, [inView, reduced]);

  useEffect(() => {
    const probe = new window.Image();
    probe.onload = () => setHasPhoto(true);
    probe.src = PHOTO;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="relative w-full select-none"
      style={{ containerType: "inline-size" }}
    >
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* ambient lila glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: "12%", top: "12%", width: "76%", height: "76%",
            background: "radial-gradient(ellipse at center, rgb(176 132 211 / 0.16), transparent 70%)",
            filter: "blur(46px)",
            opacity: on ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />

        {/* ── torn scrap behind · mono-fakten ───────────────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, x: 16, rotate: 8 }}
          animate={on ? { opacity: 1, x: 0, rotate: 5 } : {}}
          transition={{ duration: 0.7, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            right: "3%", top: "8%", width: "32%", height: "21%",
            background: "#efede5",
            boxShadow: "0 10px 24px -10px rgba(0,0,0,0.5)",
            borderRadius: "1px",
          }}
        >
          <svg viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute" style={{ top: "-4px", left: 0, width: "100%", height: "8px" }}>
            <path d="M 0 8 L 0 3 L 8 5 L 15 2 L 24 6 L 33 3 L 42 5 L 51 2 L 60 6 L 69 3 L 78 5 L 86 2 L 94 6 L 100 3 L 100 8 Z" fill="#efede5" />
          </svg>
          <div className="absolute inset-0 flex flex-col justify-center" style={{ padding: "0 13%" }}>
            <div className="font-mono uppercase" style={{ fontSize: "min(2.6cqw,12px)", letterSpacing: "0.1em", color: "#0a0a0a" }}>
              {t.since}
            </div>
            <div className="font-mono uppercase mt-1" style={{ fontSize: "min(2.1cqw,10px)", letterSpacing: "0.1em", color: "#8a8a8a" }}>
              {t.one}
            </div>
          </div>
        </motion.div>

        {/* ── das polaroid · anfassbar (useCardDrag · äußerer div macht
            entrance, innerer trägt styling + x/y-drag) ──────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: 22, rotate: -5 }}
          animate={on ? { opacity: 1, y: 0, rotate: -2.4 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02 }}
          style={{ left: "13%", top: "9%", width: "60%", height: "84%", zIndex: 5 }}
        >
        <motion.div
          ref={dragRef}
          {...dragHandlers}
          className="w-full h-full"
          style={{
            x: dragX,
            y: dragY,
            background: "#f6f5f1",
            padding: "5.5% 5.5% 0",
            boxShadow: "0 26px 60px -20px rgba(0,0,0,0.6), 0 6px 20px -6px rgba(0,0,0,0.3)",
            borderRadius: "2px",
            cursor: "grab",
            touchAction: "none",
          }}
        >
          {/* foto-fläche · 1:1 */}
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "1/1", background: "#161616", borderRadius: "1px" }}
          >
            {hasPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={PHOTO}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(150deg,#242424 0%,#0f0f0f 100%)" }}
              >
                <span className="font-display leading-none" style={{ fontSize: "min(30cqw,140px)", color: "#f2f2f2" }}>
                  n<span style={{ color: "#e1fd52" }}>.</span>
                </span>
              </div>
            )}
            {/* foto-vignette für tiefe */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.35)" }}
            />
          </div>

          {/* caption-streifen */}
          <div className="flex items-end justify-between" style={{ padding: "8% 2% 9%" }}>
            <span
              className="font-hand"
              style={{ fontSize: "min(5.4cqw,26px)", color: "#0a0a0a", transform: "rotate(-2deg)", transformOrigin: "left bottom" }}
            >
              {t.sign}
            </span>
            <span className="font-mono uppercase" style={{ fontSize: "min(2.1cqw,10px)", letterSpacing: "0.1em", color: "#6a6a6a" }}>
              {t.role}
            </span>
          </div>
        </motion.div>
        </motion.div>

        {/* ── lime-tape oben ────────────────────────────────────────── */}
        <motion.div
          className="absolute"
          initial={{ opacity: 0, y: -8 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          style={{
            left: "28%", top: "5%", width: "17%", height: "5.5%",
            background: "rgb(225 253 82 / 0.8)",
            transform: "rotate(-4deg)",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
