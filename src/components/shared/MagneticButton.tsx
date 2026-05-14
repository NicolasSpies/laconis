"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * MagneticButton · wrapper that pulls child toward cursor inside a ~120px radius.
 *
 * - raw dom transform · keine framer-motion-spring (mehr performance, weniger js)
 * - off auf touch-devices und reduced-motion
 * - radius 120 · strength 0.2 · smooth-reset auf mouseleave via transition
 *
 * usage: einfach um eine bestehende Link/Button-instanz wrappen.
 */
type Props = {
  children: ReactNode;
  /** wirkbereich radius in px (default 120) */
  radius?: number;
  /** anteil des offsets der übernommen wird (default 0.2) */
  strength?: number;
  className?: string;
};

export function MagneticButton({
  children,
  radius = 120,
  strength = 0.2,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        active = true;
        const tx = dx * strength;
        const ty = dy * strength;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
        });
      } else if (active) {
        active = false;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = "translate3d(0, 0, 0)";
        });
      }
    };

    const onLeave = () => {
      active = false;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = "translate3d(0, 0, 0)";
      });
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [radius, strength]);

  return (
    <span
      ref={ref}
      className={`inline-flex ${className}`}
      style={{
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
