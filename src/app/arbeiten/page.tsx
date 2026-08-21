import type { Metadata } from "next";
import Script from "next/script";
import { ReferenzenDevice } from "@/components/referenzen/ReferenzenDevice";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { referenzen } from "@/data/referenzen";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath } from "@/i18n/config";

/**
 * /referenzen · die fallblatt-tafel.
 *
 * server-component hält metadata + schema, die tafel selbst ist client
 * (eigener tick, auswahl-state).
 *
 * das ItemList-JSON-LD läuft über next/script statt über ein rohes
 * script-tag · gleiche wirkung, aber ohne dangerouslySetInnerHTML im
 * seiten-code. inhalt kommt ausschliesslich aus src/data/referenzen.ts,
 * nie aus request- oder nutzer-daten.
 */

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/arbeiten");
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: referenzen.map((r, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${BASE}/referenzen/${r.slug}`,
    name: r.name,
  })),
};

export default function Page() {
  const locale = getLocale();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "referenzen", url: `${BASE}${buildPath("referenzen", locale)}` },
        ]}
      />
      <Script id="referenzen-itemlist" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(itemListSchema)}
      </Script>

      <ReferenzenDevice />
    </>
  );
}
