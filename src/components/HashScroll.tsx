"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * HashScroll · scrollt zu #anker bei cross-page-links.
 *
 * drei stolpersteine umschifft:
 *  1. next/navigation mountet die neue seite
 *     erst nach dem exit · der native next-hash-scroll läuft da ins leere.
 *     → kurz warten + ziel mit retry suchen.
 *  2. `overflow: clip` auf <html> (sticky-fix) macht natives smooth-scrollen
 *     (behavior:"smooth") wirkungslos · nur instant scrollt.
 *  3. der link nutzt scroll={false}, damit next nicht selbst auf top setzt.
 *
 * darum: instant-scroll via scrollIntoView (zuverlässig, kein rAF nötig).
 * scroll-mt auf der ziel-section hält die fixe nav frei.
 */
export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let retry: ReturnType<typeof setTimeout>;
    let tries = 0;
    const run = () => {
      let el: Element | null = null;
      try {
        el = document.querySelector(hash);
      } catch {
        return;
      }
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
      } else if (tries++ < 30) {
        retry = setTimeout(run, 60);
      }
    };
    // ganze transition (exit 300 + enter 300) abwarten, dann scrollen
    const start = setTimeout(run, 650);

    return () => {
      clearTimeout(start);
      clearTimeout(retry);
    };
  }, [pathname]);

  return null;
}
