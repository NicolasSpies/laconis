/**
 * BreadcrumbSchema — schema.org BreadcrumbList als JSON-LD.
 * Google nutzt das für breadcrumb-rich-results in der SERP
 * (statt lange URLs zeigt es eine pfadzeile "lacønis › leistungen › web").
 *
 * Usage:
 *   <BreadcrumbSchema items={[
 *     { name: "home",       url: "https://laconis.be/" },
 *     { name: "leistungen", url: "https://laconis.be/leistungen" },
 *     { name: "web",        url: "https://laconis.be/leistungen/web" },
 *   ]} />
 */

type Item = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: Item[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
