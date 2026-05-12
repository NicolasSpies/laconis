/**
 * CaseStudySchema — schema.org CreativeWork + WebSite + Review als JSON-LD.
 * Pro referenz wird ein verbundener graph generiert mit:
 *
 * - CreativeWork (das case-projekt selbst)
 * - WebSite (der live-link, falls vorhanden)
 * - Review (das kunden-testimonial, falls vorhanden)
 *
 * Resultat: Google + AI-Search erkennen die Cases als referenzfähige
 * Arbeiten und können Lighthouse-scores, Kundenzitate, Live-URLs
 * korrekt zitieren — was die Konkurrenz aktuell überhaupt nicht macht.
 *
 * Usage:
 *   <CaseStudySchema referenz={r} />
 */

import type { Referenz } from "@/data/referenzen";

const BASE = "https://laconis.be";

export function CaseStudySchema({ referenz: r }: { referenz: Referenz }) {
  const url = `${BASE}/referenzen/${r.slug}`;

  /* CreativeWork mit author=Nicolas, datePublished=jahr, about=tags */
  const creativeWork = {
    "@type": "CreativeWork",
    "@id": `${url}#case`,
    name: r.name,
    headline: r.kurz,
    description: `${r.kurz} · ${r.ort} · ${r.jahr}`,
    creator: { "@id": `${BASE}/#nicolas` },
    author: { "@id": `${BASE}/#nicolas` },
    publisher: { "@id": `${BASE}/#org` },
    datePublished: String(r.jahr),
    inLanguage: "de-BE",
    keywords: r.tags.join(", "),
    about: r.tags,
    locationCreated: {
      "@type": "Place",
      name: r.ort,
    },
    url,
    ...(r.heroImage ? { image: r.heroImage } : {}),
    ...(r.urlExtern ? { sameAs: r.urlExtern } : {}),
    isPartOf: { "@id": `${BASE}/#website` },
  };

  /* graph mit optionalen knoten · WebSite + Review nur wenn daten da */
  const graph: object[] = [creativeWork];

  if (r.urlExtern) {
    /* der echte live-link als WebSite-entität — für google "Site about" */
    graph.push({
      "@type": "WebSite",
      "@id": r.urlExtern,
      url: r.urlExtern,
      name: r.name,
      inLanguage: "de-BE",
      ...(r.heroImage ? { image: r.heroImage } : {}),
      author: { "@id": `${BASE}/#nicolas` },
      ...(r.pagespeedMobile !== undefined || r.pagespeedDesktop !== undefined
        ? {
            additionalProperty: [
              ...(r.pagespeedMobile !== undefined
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "PageSpeed Mobile",
                      value: r.pagespeedMobile,
                      maxValue: 100,
                    },
                  ]
                : []),
              ...(r.pagespeedDesktop !== undefined
                ? [
                    {
                      "@type": "PropertyValue",
                      name: "PageSpeed Desktop",
                      value: r.pagespeedDesktop,
                      maxValue: 100,
                    },
                  ]
                : []),
            ],
          }
        : {}),
    });
  }

  if (r.testimonial) {
    /* Review-knoten · kunden-zitat als strukturierte rezension */
    graph.push({
      "@type": "Review",
      "@id": `${url}#review`,
      itemReviewed: { "@id": `${BASE}/#org` },
      author: {
        "@type": "Person",
        name: r.testimonial.author,
        ...(r.testimonial.rolle ? { jobTitle: r.testimonial.rolle } : {}),
      },
      reviewBody: r.testimonial.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      publisher: { "@id": `${BASE}/#org` },
    });
  }

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
