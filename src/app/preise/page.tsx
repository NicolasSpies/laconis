import type { Metadata } from "next";
import { PreiseDevice } from "@/components/preise/PreiseDevice";
import { PREISE } from "@/components/preise/preise.dict";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath } from "@/i18n/config";

/**
 * /preise · der messschieber.
 *
 * server-component hält metadata + schema, das instrument selbst ist
 * client (schalter-state).
 *
 * bewusst KEIN Offer/PriceSpecification-schema: die seite nennt keinen
 * fixpreis, also darf sie google auch keinen als strukturiertes datum
 * unterschieben. FAQ ja, preis-auszeichnung nein.
 */

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/preise");
}

export default function Page() {
  const locale = getLocale();
  const t = PREISE[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "preise", url: `${BASE}${buildPath("preise", locale)}` },
        ]}
      />
      <FAQSchema items={t.faq.map(([q, a]) => ({ q, a }))} />

      <PreiseDevice />
    </>
  );
}
