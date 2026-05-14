"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState } from "react";

/**
 * DriftingBlobs · global ambient blob-system · fixed bg, z:-10.
 *
 * - 6 blobs (3 speed-layers) auf desktop · 3 blobs auf mobile
 * - mouse-parallax pro layer: slow=20px, mid=40px, fast=70px shift
 * - breathing-scale + varied drift-paths
 * - sitzt FIXED auf der viewport · folgt nicht dem scroll · ambient
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

  const layerSlow = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 20}px, ${(y - 0.5) * 20}px)`,
  );
  const layerMid = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 40}px, ${(y - 0.5) * 40}px)`,
  );
  const layerFast = useTransform<number, string>(
    [px, py],
    ([x, y]: number[]) =>
      `translate(${(x - 0.5) * 70}px, ${(y - 0.5) * 70}px)`,
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
