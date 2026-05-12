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
  /** sameAs profile · TODO Nicolas: ergänze deine echten profile-URLs */
  sameAs: [
    // "https://www.linkedin.com/in/nicolasspies",
    // "https://github.com/NicolasSpies",
    // "https://www.instagram.com/laconis.be",
  ] as readonly string[],
  /** gründungsjahr für Organization.foundingDate */
  foundingDate: "2024",
} as const;

export type Contact = typeof CONTACT;
