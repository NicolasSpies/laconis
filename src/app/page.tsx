import type { Metadata } from "next";
import { HomeDevice } from "@/components/home/HomeDevice";
import { getHomeFaqItems } from "@/data/home-faq";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/");
}

/**
 * home · geräte-richtung (aug 2026).
 *
 * ablauf: shader-hero → wer das hier baut → signalkette (übernahme) →
 * kanalzüge (referenzen) → sendeknopf.
 *
 * KEINE preise mehr auf der home — die leben auf /preise. Statt der
 * preis-sektion steht jetzt der lacønis-teil ("eine person, keine
 * zwischenschicht").
 *
 * die alte light-komposition (Hero/ServicesSplit/RedesignTeaser/
 * SplitStatement/HomeCases/HomeFAQ/ContactBlock) ist ersetzt · die
 * komponenten bleiben im repo, bis alle seiten umgestellt sind.
 *
 * FAQ-schema bleibt im markup (SEO-substanz), auch wenn die FAQ optisch
 * nicht mehr auf der home sitzt — die antworten stehen inhaltlich auf
 * /leistung und /preise.
 */
export default function HomePage() {
  const locale = getLocale();
  const faqItems = getHomeFaqItems(locale);

  return (
    <>
      <FAQSchema items={faqItems.map((f) => ({ q: f.q, a: f.a }))} />
      <HomeDevice />
    </>
  );
}
