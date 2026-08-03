import type { Metadata } from "next";
import { UeberDevice } from "@/components/ueber/UeberDevice";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath } from "@/i18n/config";

/**
 * /ueber-mich · die tastenbank.
 *
 * server-component hält metadata + schema, das bedienteil ist client.
 *
 * die Person-entität selbst liegt global im root-layout (StructuredData,
 * @graph) · hier wäre sie nur eine zweite, konkurrierende definition.
 */

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ueber-mich");
}

export default function Page() {
  const locale = getLocale();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "über mich", url: `${BASE}${buildPath("ueber-mich", locale)}` },
        ]}
      />

      <UeberDevice />
    </>
  );
}
