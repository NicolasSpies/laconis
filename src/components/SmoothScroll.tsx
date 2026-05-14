"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll · sitewide lenis-driven smooth scrolling.
 *
 * - lerp 0.1 · wheelMultiplier 1 · touchMultiplier 1.5
 * - skip wenn prefers-reduced-motion · damit accessibility-respekt erhalten bleibt
 * - RAF-loop · cleanup beim unmount
 * - lenis updates window.scrollY normal, framer-motion's useScroll liest weiter
 *   davon · keine zusätzliche sync nötig
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // respect reduced-motion: keine smooth-scroll-overlay
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
