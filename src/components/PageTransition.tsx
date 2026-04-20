"use client";

import { usePathname } from "next/navigation";

/**
 * simple fade-in on route-change.
 * zero-js animation · css `@keyframes pt-fade` mit key-reset via pathname.
 * ersetzt den früheren framer-motion-wrapper → kein motion-import im
 * shared bundle für dieses mini-effekt.
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-transition">
      {children}
    </div>
  );
}
