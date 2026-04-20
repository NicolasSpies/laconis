"use client";

import { useEffect, useRef } from "react";

/**
 * minimal scroll-reveal via IntersectionObserver.
 * setzt data-show="1" auf dem ref-element, sobald es in den viewport kommt.
 * ein einzelner observer pro hook-call · once-only (unobserve nach trigger).
 *
 * usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal-up" />
 *
 * für gruppen einfach ein wrapper-element nehmen und via sibling/class + css-
 * variable `--rd` die staffelung bauen. braucht kein framer-motion.
 */

type Opts = {
  /** root margin für early-trigger (default: "-80px 0px") */
  margin?: string;
  /** wenn true · re-observe nach exit (default: false · once) */
  repeat?: boolean;
};

export function useReveal<T extends HTMLElement = HTMLElement>(
  opts: Opts = {},
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // SSR-fallback · auf sichtbar stellen
      el?.setAttribute("data-show", "1");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).setAttribute("data-show", "1");
            if (!opts.repeat) io.unobserve(entry.target);
          } else if (opts.repeat) {
            (entry.target as HTMLElement).removeAttribute("data-show");
          }
        }
      },
      { rootMargin: opts.margin ?? "-80px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [opts.margin, opts.repeat]);

  return ref;
}
