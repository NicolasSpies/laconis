/**
 * schema.org JSON-LD für den root-layout.
 *
 * Vier verknüpfte entitäten via @graph:
 * - WebSite (mit searchAction stub, bereit wenn später suche kommt)
 * - Person (nicolas — privat-email, jobTitle, sprachen, knowsAbout)
 * - Organization (lacønis — marke, areaServed, logo, sameAs, foundingDate)
 * - LocalBusiness (physische präsenz in Eupen · openingHours, granular areaServed,
 *   GeoCircle serviceArea, ContactPoint, knowsAbout)
 *
 * sprachen bewusst DE/FR/EN — nicht NL.
 * areaServed: Länder + granulare Städte/Regionen für Local Pack.
 *
 * single source of contact-data: @/config/contact
 */

import { CONTACT } from "@/config/contact";

const BASE = "https://laconis.be";

/** opening-hours-string ("Mo-Fr 09:00-18:00") → OpeningHoursSpecification[] */
const openingHoursSpec = CONTACT.openingHours.map((spec) => {
  const [daysPart, timePart] = spec.split(" ");
  const [opens, closes] = timePart.split("-");
  const dayMap: Record<string, string> = {
    Mo: "Monday",
    Tu: "Tuesday",
    We: "Wednesday",
    Th: "Thursday",
    Fr: "Friday",
    Sa: "Saturday",
    Su: "Sunday",
  };
  const [startDay, endDay] = daysPart.includes("-")
    ? daysPart.split("-")
    : [daysPart, daysPart];
  const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const startIdx = order.indexOf(startDay);
  const endIdx = order.indexOf(endDay);
  const days = order.slice(startIdx, endIdx + 1).map((d) => dayMap[d]);
  return {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: days,
    opens,
    closes,
  };
});

const cityAreas = CONTACT.areaServedCities.map((name) => ({
  "@type": "City",
  name,
}));

const countryAreas = CONTACT.areaServed.map((name) => ({
  "@type": "Country",
  name,
}));

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
      inLanguage: ["de-BE", "fr-BE", "en"],
      publisher: { "@id": `${BASE}/#org` },
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
      givenName: "Nicolas",
      familyName: "Spies",
      jobTitle: "Freelance Designer & Web Developer",
      description:
        "Freelance Designer + Web Developer in Eupen, Belgien · dreisprachig DE/FR/EN · Branding und Websites aus einer Hand.",
      url: `${BASE}/ueber-mich`,
      worksFor: { "@id": `${BASE}/#org` },
      knowsLanguage: Array.from(CONTACT.languages),
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Branding",
        "Logo Design",
        "Brand Identity",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Visual Design",
        "Typography",
      ],
      email: `mailto:${CONTACT.emailPrivate}`,
      ...(CONTACT.phone ? { telephone: CONTACT.phoneE164 } : {}),
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.city,
        addressCountry: CONTACT.country,
        postalCode: CONTACT.postalCode,
      },
      ...(CONTACT.sameAs.length > 0 ? { sameAs: Array.from(CONTACT.sameAs) } : {}),
    },
    {
      "@type": "Organization",
      "@id": `${BASE}/#org`,
      name: "lacønis",
      alternateName: "laconis",
      url: BASE,
      logo: `${BASE}/icon.png`,
      image: `${BASE}/opengraph-image`,
      founder: { "@id": `${BASE}/#nicolas` },
      foundingDate: CONTACT.foundingDate,
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.street,
          addressLocality: CONTACT.city,
          addressCountry: CONTACT.country,
        },
      },
      slogan: "design mit meinung · web mit seele",
      description:
        "Freelance Web- und Branding-Studio in Eupen, Belgien · dreisprachig DE/FR/EN · Websites, Logos und Brand-Identities aus einer Hand.",
      areaServed: [...countryAreas, ...cityAreas],
      knowsLanguage: Array.from(CONTACT.languages),
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Branding",
        "Logo Design",
        "Visual Identity",
        "Print Design",
        "User Experience",
        "Frontend Engineering",
      ],
      ...(CONTACT.sameAs.length > 0 ? { sameAs: Array.from(CONTACT.sameAs) } : {}),
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE}/#local`,
      name: "lacønis",
      legalName: "lacønis · Nicolas Spies",
      description:
        "Freelance Design + Web Development in Eupen, Belgien · Websites, Branding, Print · dreisprachig DE/FR/EN.",
      url: BASE,
      image: `${BASE}/opengraph-image`,
      logo: `${BASE}/icon.png`,
      email: `mailto:${CONTACT.email}`,
      ...(CONTACT.phone ? { telephone: CONTACT.phoneE164 } : {}),
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: ["Bank Transfer", "SEPA"],
      address: {
        "@type": "PostalAddress",
        streetAddress: CONTACT.street,
        addressLocality: CONTACT.city,
        addressRegion: CONTACT.region,
        addressCountry: CONTACT.country,
        postalCode: CONTACT.postalCode,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: CONTACT.coords.lat,
        longitude: CONTACT.coords.lng,
      },
      /** physischer service-radius rund um Eupen · Local Pack signal */
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: CONTACT.coords.lat,
          longitude: CONTACT.coords.lng,
        },
        geoRadius: CONTACT.serviceRadiusKm * 1000, // meters
      },
      areaServed: [...countryAreas, ...cityAreas],
      openingHoursSpecification: openingHoursSpec,
      knowsLanguage: Array.from(CONTACT.languages),
      knowsAbout: [
        "Web Design",
        "Web Development",
        "Branding",
        "Logo Design",
        "Brand Identity",
        "Visual Design",
      ],
      founder: { "@id": `${BASE}/#nicolas` },
      employee: { "@id": `${BASE}/#nicolas` },
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
      ...(CONTACT.sameAs.length > 0 ? { sameAs: Array.from(CONTACT.sameAs) } : {}),
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
