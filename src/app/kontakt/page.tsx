import type { Metadata } from "next";
import { KontaktDevice } from "@/components/kontakt/KontaktDevice";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath } from "@/i18n/config";

/**
 * /kontakt · die sendekonsole.
 *
 * server-component hält metadata + schema, die konsole ist client
 * (formular-state, fetch auf /api/kontakt).
 */

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/kontakt");
}

export default function Page() {
  const locale = getLocale();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "kontakt", url: `${BASE}${buildPath("kontakt", locale)}` },
        ]}
      />

      <KontaktDevice />
    </>
  );
}
