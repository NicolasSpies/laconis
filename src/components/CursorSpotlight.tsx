"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * Cursor spotlight · zwei ebenen:
 * 1. Lime glow-blob · fixed, folgt cursor · z:-1 · sitzt DIREKT ÜBER dem body-bg,
 *    HINTER allem inhalt. cards blurren ihn durch ihre backdrop-filter echt raus.
 * 2. Grid-reveal · nur unterhalb des heros · absolute doc-relative,
 *    enthüllt das base-grid im bereich um die maus.
 *
 * Lime-glow ist jetzt IMMER sichtbar (auch im hero) · gibt dem hero den selben
 * morph-glass-effect wie den unteren sections.
 */
export function CursorSpotlight() {
  // direct motion values — no spring, kein trailing. folgt cursor 1:1.
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const [mounted, setMounted] = useState(false);

  const { scrollY } = useScroll();
  // grid-reveal fadet erst ab ~halbem viewport ein · grid-look bleibt subtil
  const gridOpacity = useTransform(scrollY, [350, 900], [0, 1]);

  // document-relative cursor Y (viewport Y + scroll offset) so mask aligns with absolute base grid
  const docY = useTransform<number, number>(
    [y, scrollY] as unknown as never,
    (vals: number[]) => vals[0] + vals[1],
  );

  const revealMask = useMotionTemplate`radial-gradient(circle 440px at ${x}px ${docY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, transparent 85%)`;

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const onLeave = () => {
      x.set(-1000);
      y.set(-1000);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <>
      {/* Grid reveal — absolute on body, aligned with base grid, mask in doc coords.
          fadet erst unterhalb des heros ein (scroll-gesteuert). */}
      <motion.div
        aria-hidden
        style={{
          top: "100svh",
          opacity: gridOpacity,
          maskImage: revealMask,
          WebkitMaskImage: revealMask,
          zIndex: -1,
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0 grid-bg-bright"
      />

      {/* Lime glow — fixed, follows viewport cursor · IMMER sichtbar (ab mount).
          sitzt bei z:-1 direkt über body-bg · cards in main (z:1) blurren ihn. */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity: mounted ? 1 : 0,
          width: "var(--cursor-glow-size, 720px)",
          height: "var(--cursor-glow-size, 720px)",
          zIndex: -1,
        }}
        className="pointer-events-none fixed left-0 top-0 rounded-full will-change-transform transition-opacity duration-500"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--accent) / var(--cursor-glow-a1, 0.14)) 0%, rgb(var(--accent) / var(--cursor-glow-a2, 0.05)) 35%, transparent 70%)",
            filter: "blur(26px)",
          }}
        />
      </motion.div>
    </>
  );
}
