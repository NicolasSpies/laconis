"use client";

import { usePathname } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

/**
 * LegacyChrome · nav und footer der alten seiten.
 *
 * die geräte-seiten bringen ihre eigene navigation mit. bis august 2026
 * wurden nav und footer trotzdem auf JEDER seite gerendert und dann per
 * `body[data-lab="1"]` weggeblendet · doppeltes DOM und unnötiges JS auf
 * jeder seite, nur damit man es nicht sieht.
 *
 * jetzt entscheidet der pfad, ob es überhaupt gerendert wird.
 *
 * die liste führt die GERÄTE-seiten, nicht die alten · so bekommt eine
 * neu umgestellte seite die alte navigation nicht versehentlich zurück,
 * sondern man muss sie hier eintragen. vergessen fällt sofort auf.
 */

/* canonical-pfade der geräte-seiten · die locale-aliase werden aus
   dem präfix erschlagen, deshalb reicht der pfad ohne /fr bzw. /en */
const DEVICE_PATHS = [
  "/",
  "/leistung",
  "/prestation",
  "/service",
  "/referenzen",
  "/references",
  "/work",
  "/preise",
  "/prix",
  "/pricing",
  "/ueber-mich",
  "/a-propos",
  "/about",
  "/kontakt",
  "/contact",
  /* die pflichtseiten laufen seit august 2026 auch im geräte-stil und
     bringen ihre nav über LegalLayout mit */
  "/impressum",
  "/mentions-legales",
  "/legal-notice",
  "/datenschutz",
  "/confidentialite",
  "/privacy",
];

function istGeraeteSeite(pathname: string): boolean {
  /* locale-präfix abziehen · /fr/prestation → /prestation */
  const ohneLocale = pathname.replace(/^\/(fr|en)(?=\/|$)/, "") || "/";
  if (DEVICE_PATHS.includes(ohneLocale)) return true;
  /* die referenz-detailseiten hängen unter den listen-pfaden */
  return /^\/(referenzen|references|work)\/[^/]+$/.test(ohneLocale);
}

export function LegacyChrome({ position }: { position: "nav" | "footer" }) {
  const pathname = usePathname() || "/";
  if (istGeraeteSeite(pathname)) return null;
  return position === "nav" ? <Nav /> : <Footer />;
}
