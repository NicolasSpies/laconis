"use client";
import { useEffect, useRef, useState } from "react";

export function CursorDot() {
  const dot = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // skip on touch devices
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;
    setMounted(true);

    const move = (e: PointerEvent | MouseEvent) => {
      if (!dot.current) return;
      dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button'], summary, label, input, select, textarea")) {
        dot.current?.classList.add("is-hovering");
      }
    };

    const leave = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest("a, button, [role='button'], summary, label, input, select, textarea")) {
        dot.current?.classList.remove("is-hovering");
      }
    };

    // pointerrawupdate fires at native pointer rate (not rAF-throttled) — chrome only.
    // fallback: pointermove (sync with native events in all modern browsers).
    const supportsRaw = "onpointerrawupdate" in window;
    const moveEvent = supportsRaw ? "pointerrawupdate" : "pointermove";

    window.addEventListener(
      moveEvent as "pointermove",
      move as EventListener,
      { passive: true },
    );
    document.addEventListener("mouseover", enter);
    document.addEventListener("mouseout", leave);

    return () => {
      window.removeEventListener(
        moveEvent as "pointermove",
        move as EventListener,
      );
      document.removeEventListener("mouseover", enter);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="cursor-dot fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
    >
      {/* inner span: transition nur auf hover-properties (bg, size) — transform bleibt instant */}
      <span className="cursor-dot-inner block w-2 h-2 rounded-full bg-lime -translate-x-1/2 -translate-y-1/2 transition-[background-color,width,height] duration-200 ease-out" />
    </div>
  );
}
