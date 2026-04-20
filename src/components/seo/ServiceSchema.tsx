/**
 * ServiceSchema — schema.org Service als JSON-LD (als graph mit mehreren services).
 * Google mapped service-einträge auf service-cards in der SERP und füttert
 * das Knowledge-Panel für die lokale präsenz.
 *
 * Usage:
 *   <ServiceSchema services={[
 *     { name: "Website Basis", description: "…", price: 1400 },
 *     { name: "Website Essential", description: "…", price: 2800 },
 *   ]} />
 */

import { CONTACT } from "@/config/contact";

const BASE = "https://laconis.be";

type ServiceInput = {
  name: string;
  description: string;
  price: number;
  /** default "EUR" */
  priceCurrency?: string;
  /** z.B. "web" oder "branding" — zur gruppierung in der SERP */
  serviceType?: string;
};

export function ServiceSchema({ services }: { services: ServiceInput[] }) {
  const graph = services.map((s, idx) => ({
    "@type": "Service",
    "@id": `${BASE}/#service-${idx + 1}`,
    name: s.name,
    description: s.description,
    serviceType: s.serviceType ?? "Design & Web Development",
    provider: { "@id": `${BASE}/#org` },
    areaServed: Array.from(CONTACT.areaServed).map((name) => ({
      "@type": "Country",
      name,
    })),
    offers: {
      "@type": "Offer",
      price: s.price,
      priceCurrency: s.priceCurrency ?? "EUR",
      availability: "https://schema.org/InStock",
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
