/**
 * ServiceSchema — schema.org Service als JSON-LD (als graph mit mehreren services).
 * Google mapped service-einträge auf service-cards in der SERP und füttert
 * das Knowledge-Panel für die lokale präsenz.
 *
 * Option-C konform: kein fixer Preis, sondern `priceSpecification.minPrice`
 * (= "ab X €"). Honoriert die "keine Paket-Raster"-Positionierung und liefert
 * trotzdem strukturierte Preisinfo für Search-Engines + LLM-Citations.
 *
 * Usage:
 *   <ServiceSchema services={[
 *     { name: "Website · Onepager", description: "…", minPrice: 1500 },
 *   ]} />
 */

import { CONTACT } from "@/config/contact";

const BASE = "https://laconis.be";

type ServiceInput = {
  name: string;
  description: string;
  /** Faustpreis ab — wird zu priceSpecification.minPrice */
  minPrice: number;
  /** default "EUR" */
  priceCurrency?: string;
  /** z.B. "Web Development" oder "Branding" — gruppierung in der SERP */
  serviceType?: string;
};

export function ServiceSchema({ services }: { services: ServiceInput[] }) {
  const cityAreas = CONTACT.areaServedCities.map((name) => ({
    "@type": "City",
    name,
  }));
  const countryAreas = CONTACT.areaServed.map((name) => ({
    "@type": "Country",
    name,
  }));

  const graph = services.map((s, idx) => ({
    "@type": "Service",
    "@id": `${BASE}/#service-${idx + 1}`,
    name: s.name,
    description: s.description,
    serviceType: s.serviceType ?? "Design & Web Development",
    provider: { "@id": `${BASE}/#org` },
    areaServed: [...countryAreas, ...cityAreas],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: s.minPrice,
        priceCurrency: s.priceCurrency ?? "EUR",
        valueAddedTaxIncluded: false,
      },
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
