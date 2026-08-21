"use client";

import { usePathname } from "next/navigation";

/**
 * PageTransition · der Vorhang, ohne Bibliothek.
 *
 * beim seitenwechsel faehrt ein ink-vorhang mit lime-unterkante nach
 * oben aus dem bild, die neue seite steht dahinter schon bereit.
 *
 * ═══ warum ohne framer-motion ═══
 *
 * die seite wirbt mit „0 kb fremdes javascript". framer-motion wiegt
 * 5,5 MB im paket und lief ueber das layout auf JEDER seite mit ·
 * damit war der satz durch einen blick in den netzwerk-tab zu
 * widerlegen. auf einer seite, deren ganze position ehrlichkeit ist,
 * war das die teuerste zeile code im projekt.
 *
 * ═══ was sich dabei mit-repariert hat ═══
 *
 * die alte fassung animierte den INHALT von opacity 0 auf 1. jedes
 * element mit backdrop-filter darunter war waehrend dieser halben
 * sekunde flach und sprang danach an · und `.reveal-up` trug
 * dauerhaft will-change: opacity. der inhalt bewegt sich jetzt nur
 * noch in y, ohne deckkraft.
 *
 * der vorhang laeuft ueber eine CSS-keyframe, die durch den
 * `key={pathname}` bei jedem routenwechsel neu startet. kein exit ·
 * dafuer braeuchte es AnimatePresence, und der halbe effekt ist den
 * ganzen import nicht wert.
 */

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="pt-wrap">
      <div className="pt-inhalt">{children}</div>

      <div className="pt-vorhang" aria-hidden>
        <span className="pt-kante" />
        <span className="pt-marke">lacønis</span>
      </div>
    </div>
  );
}
