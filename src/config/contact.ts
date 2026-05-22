/**
 * CONTACT · single source of truth für alle kontakt-daten.
 *
 * Regel:
 * - `email` = public-facing (website, footer, kontaktformular, autoreply-FROM)
 * - `emailPrivate` = intern (API, SEO-schema, console-logs, bug-reports)
 *   · zurzeit identisch mit `email` — hallo@ existiert nicht, alles läuft über nicolas@.
 *
 * Niemals mails hardcoden. Wenn du irgendwo `@laconis.be` tippen willst → CONTACT importieren.
 */
export const CONTACT = {
  email: "nicolas@laconis.be",
  emailPrivate: "nicolas@laconis.be",
  phone: "+32 488 43 91 47",
  phoneE164: "+32488439147",
  street: "Rotenberg 18a",
  city: "Eupen",
  country: "BE",
  region: "BE-WLG",
  postalCode: "4700",
  coords: { lat: 50.6288, lng: 6.0384 },
  languages: ["de", "fr", "en"] as const,
  areaServed: ["BE", "DE", "FR", "LU", "NL"] as const,
  /** granular regions + cities · boosted lokale SERPs (Local Pack) */
  areaServedCities: [
    "Eupen",
    "Ostbelgien",
    "Aachen",
    "Lüttich",
    "Maastricht",
    "Luxembourg",
    "Brüssel",
    "Köln",
  ] as const,
  /** ISO 8601 weekday + time spans · standard arbeitstage */
  openingHours: ["Mo-Fr 09:00-18:00"] as const,
  /** radius in km um Eupen für LocalBusiness.serviceArea (GeoCircle) */
  serviceRadiusKm: 150,
  /** sameAs profile · weitere können später dazu (LinkedIn, GitHub, …) */
  sameAs: [
    "https://www.instagram.com/laconis.be",
  ] as readonly string[],
  /** gründungsjahr für Organization.foundingDate */
  foundingDate: "2026",
  /**
   * cal.com booking-URL · express-lane auf /kontakt.
   * leer = booking-card zeigt mailto-fallback.
   * sobald nicolas einen account hat: `https://cal.com/nicolasspies/30min`
   */
  calcomUrl: "",
} as const;

export type Contact = typeof CONTACT;
