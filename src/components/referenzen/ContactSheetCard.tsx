"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useCardDrag } from "@/components/shared/useCardDrag";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<Locale, { note: string; reset: string }> = {
  de: { note: "zieh mich ruhig rum", reset: "↺ aufräumen" },
  fr: { note: "déplace-moi, vas-y", reset: "↺ ranger" },
  en: { note: "go on, drag me around", reset: "↺ tidy up" },
};

/**
 * ContactSheetCard · hero-anker für /referenzen · drei gekippte film-frames
 * (kontaktbogen-anmutung), NR.01–03, leicht gefächert · ANFASSBAR.
 *
 * drag über useCardDrag (rohe pointer-handler, clamp aufs container-rect)
 * statt framer-drag-geste. struktur pro frame: äußerer motion.div macht
 * position + entrance (opacity/y/rotate), innerer motion.div trägt das
 * karten-styling + x/y-motionvalues + handler — so kämpfen entrance und
 * drag nie um denselben transform-kanal.
 *
 * reset-chip („↺ aufräumen") nach dem ersten zug · remountet die frames
 * per key → sie fliegen mit der entrance-animation zurück (user-gesetz:
 * „bitte mit reset button · nicht dass der die nicht mehr sieht!").
 */
const FRAMES = [
  { src: "/referenz-konzept/light.jpg", nr: "01", tag: "web", left: "6%", top: "20%", rot: -7, z: 1 },
  { src: "/referenz-konzept/path.jpg", nr: "02", tag: "branding", left: "30%", top: "10%", rot: 3, z: 3 },
  { src: "/referenz-konzept/canopy.jpg", nr: "03", tag: "web + branding", left: "54%", top: "24%", rot: 9, z: 2 },
] as const;

type FrameSpec = (typeof FRAMES)[number];

function Frame({
  f,
  i,
  on,
  replay,
  containerRef,
  onMoved,
}: {
  f: FrameSpec;
  i: number;
  on: boolean;
  replay: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  onMoved: () => void;
}) {
  const { elRef, x, y, handlers } = useCardDrag(containerRef, onMoved);

  return (
    <motion.div
      aria-hidden
      className="absolute"
      initial={{ opacity: 0, y: 26, rotate: f.rot * 1.8 }}
      animate={on ? { opacity: 1, y: 0, rotate: f.rot } : {}}
      transition={{ duration: 0.8, delay: replay ? i * 0.08 : 0.4 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
      style={{ left: f.left, top: f.top, width: "40%", zIndex: f.z }}
    >
      <motion.div
        ref={elRef}
        {...handlers}
        style={{
          x,
          y,
          background: "#f6f5f1",
          padding: "5% 5% 0",
          boxShadow: "0 22px 50px -18px rgba(0,0,0,0.6), 0 5px 16px -6px rgba(0,0,0,0.3)",
          borderRadius: "2px",
          cursor: "grab",
          touchAction: "none",
        }}
      >
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "3/4", background: "#161616", borderRadius: "1px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={f.src} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" loading="lazy" draggable={false} />
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.4)" }} />
          {/* NR badge */}
          <span
            className="absolute font-mono"
            style={{ left: "6%", top: "5%", fontSize: "min(2.4cqw,11px)", letterSpacing: "0.1em", color: "#e1fd52" }}
          >
            nr.{f.nr}
          </span>
        </div>
        <div className="flex items-center justify-between" style={{ padding: "7% 2% 8%" }}>
          <span className="font-mono uppercase" style={{ fontSize: "min(1.9cqw,9px)", letterSpacing: "0.08em", color: "#6a6a6a" }}>
            {f.tag}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ContactSheetCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [on, setOn] = useState(false);
  /* moved zeigt den reset-chip · resetKey remountet die frames */
  const [moved, setMoved] = useState(false);
  const [resetKey, setResetKey] = useState(0);
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
      className="relative w-full select-none"
      style={{ containerType: "inline-size" }}
    >
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        {/* ambient lime glow */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            left: "12%", top: "12%", width: "78%", height: "74%",
            background: "radial-gradient(ellipse at center, rgb(225 253 82 / 0.12), transparent 70%)",
            filter: "blur(50px)",
            opacity: on ? 1 : 0,
            transition: "opacity 1.2s ease-out",
          }}
        />

        {FRAMES.map((f, i) => (
          <Frame
            key={`${f.nr}-${resetKey}`}
            f={f}
            i={i}
            on={on}
            replay={resetKey > 0}
            containerRef={ref}
            onMoved={() => setMoved(true)}
          />
        ))}

        {/* ── hand-notiz ────────────────────────────────────────────── */}
        <motion.div
          aria-hidden
          className="absolute font-hand"
          initial={{ opacity: 0 }}
          animate={on ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          style={{
            right: "4%", bottom: "2%",
            fontSize: "min(4cqw,19px)",
            color: "#2a2a2a",
            transform: "rotate(-3deg)",
          }}
        >
          ↗ {t.note}
        </motion.div>

        {/* ── reset · erscheint nach dem ersten zug (user-gesetz:
            „nicht dass der die nicht mehr sieht") ───────────────────── */}
        {moved && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => {
              setResetKey((k) => k + 1);
              setMoved(false);
            }}
            className="absolute left-[2%] bottom-[2%] z-50 font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full border border-[#0a0a0a]/25 bg-[#0a0a0a]/[0.04] text-[#0a0a0a]/70 hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors cursor-pointer"
          >
            {t.reset}
          </motion.button>
        )}
      </div>
    </div>
  );
}
