"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Wortmarke } from "@/components/Wortmarke";

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

  /* der vorhang lief auch beim ERSTEN laden · für jeden
     erstbesucher 560ms ladebildschirm, bevor er irgendetwas
     gesehen hat.

     NICHT über den pfad vergleichen: dann fehlt der vorhang auch,
     sobald jemand auf die startseite ZURÜCK navigiert, weil das
     wieder der erste pfad ist. der ref merkt sich den MOUNT ·
     PageTransition selbst ist nicht gekeyed, er überlebt also
     jeden routenwechsel. */
  const ersterMount = useRef(true);
  const istErsterAufruf = ersterMount.current;
  useEffect(() => {
    ersterMount.current = false;
  }, []);

  return (
    <div key={pathname} className="pt-wrap">
      <div className="pt-inhalt">{children}</div>

      {!istErsterAufruf && (
        <div className="pt-vorhang" aria-hidden>
          <span className="pt-kante" />
          {/* stand hier als 11px-text bei 50% in der mono-schrift ·
              auf der perfekten bühne (schwarze vollfläche, lime-
              kante) der markenname in briefmarkengrösse. das
              gezeichnete logo kam auf der ganzen seite nie grösser
              als 17px vor. */}
          <Wortmarke className="pt-marke" />
        </div>
      )}
    </div>
  );
}
