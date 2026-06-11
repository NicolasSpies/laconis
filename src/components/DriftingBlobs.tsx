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
 * DriftingBlobs v2 · "licht statt nebel" (phase 1).
 *
 * Vorher: 6 blobs in 3 speed-layern, große blur-radien, lime+lila
 * überlagerten sich → milchig-lavendelner dunst über der ganzen seite.
 *
 * Jetzt: 2 farbfelder, RÄUMLICH GETRENNT (gegenüberliegende ecken),
 * kleiner + schärfer + gesättigter · eine bewusste farb-präsenz statt
 * überall schleier. Der papier-helle bg (#E9E9E7) macht den rest.
 *
 *   - lime · top-right (hero-zone) · die marke leuchtet
 *   - lila · bottom-left · der duo-akzent antwortet
 *   - kein overlap → kein braun-grauer misch-matsch
 *   - drift bleibt (langsam, atmend) · mouse-parallax subtil
 *   - scroll-parallax nur slow-layer · blobs bleiben ruhig
 *   - useReducedMotion · statisch, keine animation
 */
export function DriftingBlobs() {
  const reduced = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  // mouse-parallax · mx/my normalisiert 0..1 auf viewport
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useSpring(mx, { stiffness: 50, damping: 22, mass: 0.6 });
  const py = useSpring(my, { stiffness: 50, damping: 22, mass: 0.6 });

  // scroll-parallax · ein layer, sanft
  const { scrollY } = useScroll();
  const scrollSlow = useSpring(
    useTransform(scrollY, (y) => y * 0.05),
    { stiffness: 80, damping: 25, mass: 0.5 },
  );

  const layerLime = useTransform<number, string>(
    [px, py, scrollSlow],
    ([x, y, sy]: number[]) =>
      `translate(${(x - 0.5) * 24}px, ${(y - 0.5) * 24 + sy}px)`,
  );
  const layerLila = useTransform<number, string>(
    [px, py, scrollSlow],
    ([x, y, sy]: number[]) =>
      `translate(${(x - 0.5) * -18}px, ${(y - 0.5) * -18 - sy * 0.6}px)`,
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
      {/* LIME · top-right · die marken-präsenz */}
      <motion.div
        style={{ transform: layerLime, willChange: "transform" }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, -50, 30, 0],
                y: [0, 40, -30, 0],
                scale: [1, 1.06, 0.97, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-4%] top-[-6%]"
      >
        <div
          className="rounded-full"
          style={{
            width: mobile ? "62vw" : "40vw",
            height: mobile ? "62vw" : "40vw",
            background:
              "radial-gradient(circle, #e1fd52 0%, rgba(225,253,82,0.55) 35%, transparent 58%)",
            opacity: 0.5,
            filter: mobile ? "blur(28px)" : "blur(34px)",
          }}
        />
      </motion.div>

      {/* LILA · bottom-left · der duo-akzent · bewusst leiser als lime */}
      <motion.div
        style={{ transform: layerLila, willChange: "transform" }}
        animate={
          reduced
            ? undefined
            : {
                x: [0, 40, -30, 0],
                y: [0, -36, 26, 0],
                scale: [1, 0.96, 1.05, 1],
              }
        }
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-6%] bottom-[-10%]"
      >
        <div
          className="rounded-full"
          style={{
            width: mobile ? "55vw" : "36vw",
            height: mobile ? "55vw" : "36vw",
            background:
              "radial-gradient(circle, #b084d3 0%, rgba(176,132,211,0.5) 35%, transparent 58%)",
            opacity: 0.34,
            filter: mobile ? "blur(28px)" : "blur(34px)",
          }}
        />
      </motion.div>
    </div>
  );
}
