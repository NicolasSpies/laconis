"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

export function CursorSpotlight() {
  // direct motion values — no spring, kein trailing. folgt cursor 1:1.
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  const { scrollY } = useScroll();
  // invisible in hero, fades in after ~half viewport scroll
  const opacity = useTransform(scrollY, [350, 900], [0, 1]);

  // document-relative cursor Y (viewport Y + scroll offset) so mask aligns with absolute base grid
  const docY = useTransform<number, number>(
    [y, scrollY] as unknown as never,
    (vals: number[]) => vals[0] + vals[1],
  );

  const revealMask = useMotionTemplate`radial-gradient(circle 440px at ${x}px ${docY}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 30%, transparent 85%)`;

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

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
      {/* Grid reveal — absolute on body, aligned with base grid, mask in doc coords */}
      <motion.div
        aria-hidden
        style={{
          top: "100svh",
          opacity,
          maskImage: revealMask,
          WebkitMaskImage: revealMask,
          zIndex: -1,
        }}
        className="pointer-events-none absolute inset-x-0 bottom-0 grid-bg-bright"
      />

      {/* Lime glow — fixed, follows viewport cursor */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          opacity,
          zIndex: -1,
        }}
        className="pointer-events-none fixed left-0 top-0 h-[720px] w-[720px] rounded-full will-change-transform"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(225,253,82,0.11) 0%, rgba(225,253,82,0.04) 35%, transparent 70%)",
            filter: "blur(26px)",
          }}
        />
      </motion.div>
    </>
  );
}
