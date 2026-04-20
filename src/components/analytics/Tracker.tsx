"use client";

/**
 * auto-pageview-tracker · client-component.
 * feuert bei jedem pathname-wechsel einen pageview-event.
 * referrer nur beim allerersten aufruf (document.referrer ist nach client-nav
 * eh leer/unzuverlässig).
 */

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

export function Tracker() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    const referrer =
      firstRender.current && typeof document !== "undefined"
        ? document.referrer || undefined
        : undefined;
    firstRender.current = false;

    track({ type: "pageview", path: pathname, referrer });
  }, [pathname]);

  return null;
}
