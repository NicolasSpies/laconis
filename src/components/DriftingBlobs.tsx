"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * DriftingBlobs · global ambient blob-system · fixed bg, z:-10.
 *
 * - 6 blobs (3 speed-layers) auf desktop · 3 blobs auf mobile
 * - 3 motion-quellen pro layer:
 *   1. continuous drift (animate-loop) · varied paths + scale breathing
 *   2. mouse-parallax · slow=20px, mid=40px, fast=70px shift
 *   3. scroll-parallax · slow=0.04, mid=0.12, fast=0.22 multiplier
 *      → blobs driften mit dem scroll, slow fast stationär, fast spürbar
 * - sitzt FIXED auf der viewport · scroll-parallax fügt translateY hinzu
 * - z-index -10 → dunkle/farbige sections decken die blobs natürlich ab
 *   → blobs sind nur auf grey #c8c8c8 sections sichtbar
 * - useReducedMotion · keine animation, keine parallax
 */
export function DriftingBlobs() {
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  // mouse-parallax · setze mx/my als 0..1 normalisiert auf viewport
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 50, damping: 22, mass: 0.6 });

  // scroll-parallax · scrollY in px, multipliert pro layer
  const { scrollY } = useScroll();
  const scrollSlow = useSpring(useTransform(scrollY, (y) => y * 0.04), {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });
  const scrollMid = useSpring(useTransform(scrollY, (y) => y * 0.12), {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });
  const scrollFast = useSpring(useTransform(scrollY, (y) => y * 0.22), {
    stiffness: 80,
    damping: 25,
    mass: 0.5,
  });

  // kombinierte transform · mouse-x/y + scroll-y · alles in einer translate
  const layerSlow = useTransform<number, string>(
    [px, py, scrollSlow],
    ([x, y, sy]: number[]) =>
      `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20 + sy}px)`,
  );
  const layerMid = useTransform<number, string>(
    [px, py, scrollMid],
    ([x, y, sy]: number[]) =>
      `translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 40 - sy}px)`,
  );
  const layerFast = useTransform<number, string>(
    [px, py, scrollFast],
    ([x, y, sy]: number[]) =>
      `translate(${(x - 0.5) * 70}px, ${(y - 0.5) * 70 + sy}px)`,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(max-width: 768px)");
    setMobile(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMobile(e.matches);
    mql.addEventListener("change", onChange);

    if (reduced) {
      mql.removeEventListener("change", onChange);
      return;
    }

    // global pointer-tracker · setzt mx/my auf viewport-normalized 0..1
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      mql.removeEventListener("change", onChange);
    };
  }, [reduced, mx, my]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -10 }}
    >
      {/* SLOW · lime · top-left */}
      <motion.div
        style={{ transform: layerSlow, willChange: "transform" }}
        animate={
          reduced
            ? undefined
            : { x: [0, 80, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.08, 0.96, 1] }
        }
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-[8%] rounded-full"
      >
        <div
          className="rounded-full"
          style={{
            width: mobile ? "70vw" : "55vw",
            height: mobile ? "70vw" : "55vw",
            background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
            opacity: 0.5,
            filter: mobile ? "blur(40px)" : "blur(55px)",
          }}
        />
      </motion.div>

      {/* SLOW · lila · bottom-right */}
      <motion.div
        style={{ transform: layerSlow, willChange: "transform" }}
        animate={
          reduced
            ? undefined
            : { x: [0, -90, 40, 0], y: [0, 70, -50, 0], scale: [1, 0.95, 1.1, 1] }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] bottom-[5%] rounded-full"
      >
        <div
          className="rounded-full"
          style={{
            width: mobile ? "60vw" : "48vw",
            height: mobile ? "60vw" : "48vw",
            background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
            opacity: 0.58,
            filter: mobile ? "blur(40px)" : "blur(55px)",
          }}
        />
      </motion.div>

      {/* MID · lila · center-left · desktop only */}
      {!mobile && (
        <motion.div
          style={{ transform: layerMid, willChange: "transform" }}
          animate={
            reduced
              ? undefined
              : { x: [0, 60, -50, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.92, 1] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-5%] top-[40%] w-[32vw] h-[32vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
              opacity: 0.42,
              filter: "blur(40px)",
            }}
          />
        </motion.div>
      )}

      {/* MID · lime · bottom-left · desktop only */}
      {!mobile && (
        <motion.div
          style={{ transform: layerMid, willChange: "transform" }}
          animate={
            reduced
              ? undefined
              : { x: [0, -50, 40, 0], y: [0, -60, 20, 0], scale: [1, 1.12, 0.95, 1] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[30%] bottom-[15%] w-[28vw] h-[28vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
              opacity: 0.4,
              filter: "blur(36px)",
            }}
          />
        </motion.div>
      )}

      {/* FAST darter · lime · top-right */}
      <motion.div
        style={{ transform: layerFast, willChange: "transform" }}
        animate={
          reduced
            ? undefined
            : { x: [0, -40, 60, 0], y: [0, 50, -40, 0], scale: [1, 1.3, 0.85, 1] }
        }
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] top-[18%] rounded-full"
      >
        <div
          className="rounded-full"
          style={{
            width: mobile ? "22vw" : "18vw",
            height: mobile ? "22vw" : "18vw",
            background: "radial-gradient(circle, #e1fd52 0%, transparent 60%)",
            opacity: 0.55,
            filter: mobile ? "blur(22px)" : "blur(28px)",
          }}
        />
      </motion.div>

      {/* FAST darter · lila · center · desktop only */}
      {!mobile && (
        <motion.div
          style={{ transform: layerFast, willChange: "transform" }}
          animate={
            reduced
              ? undefined
              : { x: [0, 70, -30, 0], y: [0, -40, 60, 0], scale: [1, 0.8, 1.25, 1] }
          }
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[40%] bottom-[30%] w-[14vw] h-[14vw] rounded-full"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, #b084d3 0%, transparent 60%)",
              opacity: 0.5,
              filter: "blur(24px)",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}
