/**
 * schema.org JSON-LD für den root-layout.
 *
 * Vier verknüpfte entitäten via @graph:
 * - WebSite (mit searchAction stub, bereit wenn später suche kommt)
 * - Person (nicolas — privat-email, jobTitle, sprachen)
 * - Organization (lacønis — marke, areaServed, logo)
 * - LocalBusiness (physische präsenz in Eupen · mit ContactPoint)
 *
 * sprachen bewusst DE/FR/EN — nicht NL.
 * areaServed: BE/DE/FR für später-expansion.
 *
 * single source of contact-data: @/config/contact
 */

import { CONTACT } from "@/config/contact";

const BASE = "https://laconis.be";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "lacønis",
      description:
        "design mit meinung · web mit seele. freelance designer + web-developer in Eupen.",
      inLanguage: "de-BE",
      publisher: { "@id": `${BASE}/#org` },
      // SearchAction stub · drop-in bereit wenn wir eine site-search bauen
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${BASE}/#nicolas`,
      name: "Nicolas Spies",
      jobTitle: "Freelance Designer & Web Developer",
      worksFor: { "@id": `${BASE}/#org` },
      knowsLanguage: Array.from(CONTACT.languages),
      email: `mailto:${CONTACT.emailPrivate}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE}/#org`,
      name: "lacønis",
      alternateName: "laconis",
      url: BASE,
      logo: `${BASE}/icon.png`,
      founder: { "@id": `${BASE}/#nicolas` },
      slogan: "design mit meinung · web mit seele",
      areaServed: Array.from(CONTACT.areaServed).map((name) => ({
        "@type": "Country",
        name,
      })),
      knowsLanguage: Array.from(CONTACT.languages),
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE}/#local`,
      name: "lacønis",
      description:
        "Freelance Design + Web Development · websites, branding, print, werbetechnik.",
      url: BASE,
      image: `${BASE}/opengraph-image`,
      email: `mailto:${CONTACT.email}`,
      ...(CONTACT.phone ? { telephone: CONTACT.phoneE164 } : {}),
      priceRange: "€€",
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
        postalCode: "4700",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.coords.lat,
        longitude: CONTACT.coords.lng,
      },
      knowsLanguage: Array.from(CONTACT.languages),
      areaServed: Array.from(CONTACT.areaServed).map((name) => ({
        "@type": "Country",
        name,
      })),
      founder: { "@id": `${BASE}/#nicolas` },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: CONTACT.email,
          ...(CONTACT.phone ? { telephone: CONTACT.phoneE164 } : {}),
          contactType: "customer service",
          availableLanguage: Array.from(CONTACT.languages),
          areaServed: Array.from(CONTACT.areaServed),
        },
      ],
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify sicher für inline-scripts (keine user-daten)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
