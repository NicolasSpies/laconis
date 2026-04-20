/**
 * FAQSchema — schema.org FAQPage als JSON-LD.
 * Google kann damit FAQ-rich-snippets direkt in der SERP ausspielen
 * (aufklappbare frage/antwort unter dem seiten-titel).
 *
 * Usage:
 *   <FAQSchema items={FAQ.map(f => ({ q: f.q, a: f.a }))} />
 */

type Item = { q: string; a: string };

export function FAQSchema({ items }: { items: Item[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
