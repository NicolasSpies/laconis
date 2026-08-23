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

/* der breadcrumb-name folgt der sprache · google zeigt ihn im
   suchergebnis an */
const BROT: Record<string, string> = { de: "arbeiten", fr: "travaux", en: "work" };

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/arbeiten");
}

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: referenzen.map((r, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    url: `${BASE}/arbeiten/${r.slug}`,
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
          /* hiess in ALLEN drei sprachen "referenzen" · google zeigt den
             breadcrumb im suchergebnis an, und die route heisst seit
             dem relaunch /arbeiten bzw. /travaux bzw. /work */
          { name: BROT[locale], url: `${BASE}${buildPath("referenzen", locale)}` },
        ]}
      />
      <Script id="referenzen-itemlist" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(itemListSchema)}
      </Script>

      <ReferenzenDevice />
    </>
  );
}
