/**
 * CONTACT · single source of truth für alle kontakt-daten.
 *
 * Regel:
 * - `email` = public-facing (website, footer, kontaktformular, autoreply-FROM)
 * - `emailPrivate` = intern (API, SEO-schema, console-logs, bug-reports)
 *
 * Niemals mails hardcoden. Wenn du irgendwo `@laconis.be` tippen willst → CONTACT importieren.
 */
export const CONTACT = {
  email: "hallo@laconis.be",
  emailPrivate: "nicolas@laconis.be",
  phone: "+32 488 43 91 47",
  phoneE164: "+32488439147",
  city: "Eupen",
  country: "BE",
  region: "BE-WLG",
  coords: { lat: 50.6288, lng: 6.0384 },
  languages: ["de", "fr", "en"] as const,
  areaServed: ["BE", "DE", "FR"] as const,
} as const;

export type Contact = typeof CONTACT;
