"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * LegacyChrome · nav und footer der ALTEN seiten.
 *
 * bis august 2026 führte diese datei die GERÄTE-seiten und gab
 * überall sonst die alte navigation aus. das war eine falle: eine
 * 404 hat keinen eigenen pfad — sie rendert unter der adresse, die
 * der besucher aufgerufen hat. die stand naturgemäss in keiner
 * liste, also bekam ausgerechnet die seite, auf der jeder alte
 * indexierte link landet, nav und footer aus dem alten projekt.
 *
 * jetzt andersherum: hier stehen die wenigen seiten, die die alte
 * oberfläche NOCH tragen. alles andere — auch jeder unbekannte
 * pfad — bekommt nichts, und die seite bringt ihre navigation
 * selbst mit. eine neue seite kann so nicht mehr versehentlich
 * altes chrome erben.
 */

/* die letzten seiten der alten oberfläche · locale-präfixe werden
   abgezogen, deshalb reicht der pfad ohne /fr bzw. /en */
const ALTE_PFADE = ["/preview", "/web-performance-ostbelgien"];

function istAlteSeite(pathname: string): boolean {
  const ohneLocale = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  if (ALTE_PFADE.includes(ohneLocale)) return true;
  /* die prototypen unter /labor hängen noch am alten chrome */
  return ohneLocale === "/labor" || ohneLocale.startsWith("/labor/");
}

export function LegacyChrome({ position }: { position: "nav" | "footer" }) {
  const pathname = usePathname() || "/";
  if (!istAlteSeite(pathname)) return null;
  return position === "nav" ? <Nav /> : <Footer />;
}
