import type { Metadata } from "next";
import { StudioDevice } from "@/components/studio/StudioDevice";
import { LEISTUNG } from "@/components/leistung/leistung.dict";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * /studio · leistung, preise und ueber-mich in einer seite.
 *
 * die drei alten routen leiten per 301 hierher (siehe next.config).
 * server-component haelt metadata und schema, die geraete-seite
 * selbst ist client.
 *
 * die minPrice-angaben im ServiceSchema sind RAUS · Nicolas nennt
 * keine preise mehr, und ein preis im strukturierten datensatz kann
 * von google als rich result ausgespielt werden. dann stuende bei der
 * suche eine zahl, die auf der seite nirgends mehr auftaucht.
 */

const BASE = "https://laconis.be";

const SERVICES: Record<Locale, { name: string; description: string; serviceType: string }[]> = {
  de: [
    { name: "Website von null gebaut", description: "Design und Code entstehen für dich · kein Theme, kein Baukasten. Responsiv, SEO-fertig, Lighthouse 95+, eigenes Analytics, SSL und Backups. Domain und Mail separat.", serviceType: "Web Development" },
    { name: "Mehrseitige Website mit CMS", description: "Mehrere Unterseiten plus ContentCore-Bereich zum Selberpflegen. Für Betriebe, die mehr zu sagen haben als auf eine Seite passt. Mehrsprachig möglich (DE/FR/EN).", serviceType: "Web Development" },
    { name: "Übernahme einer bestehenden Website", description: "Die alte Seite wird komplett gezogen und neu gebaut · Inhalte, Bilder und Rankings kommen mit, alte Adressen bekommen dauerhafte Weiterleitungen. Die alte Seite bleibt bis zum Umschalten online.", serviceType: "Web Development" },
  ],
  fr: [
    { name: "Site web construit de zéro", description: "Design et code faits pour toi · pas de thème, pas de constructeur. Responsive, prêt pour le SEO, Lighthouse 95+, analytics maison, SSL et sauvegardes. Domaine et mail à part.", serviceType: "Web Development" },
    { name: "Site multi-pages avec CMS", description: "Plusieurs sous-pages plus une zone ContentCore à gérer toi-même. Pour les entreprises qui ont plus à dire que ce qui tient sur une page. Multilingue possible (DE/FR/EN).", serviceType: "Web Development" },
    { name: "Reprise d'un site existant", description: "L'ancien site est récupéré en entier et reconstruit · contenus, images et positions suivent, les anciennes adresses reçoivent des redirections permanentes. L'ancien site reste en ligne jusqu'à la bascule.", serviceType: "Web Development" },
  ],
  en: [
    { name: "Website built from scratch", description: "Design and code made for you · no theme, no builder. Responsive, SEO-ready, Lighthouse 95+, own analytics, SSL and backups. Domain and mail separate.", serviceType: "Web Development" },
    { name: "Multi-page website with CMS", description: "Several subpages plus a ContentCore area you maintain yourself. For businesses with more to say than fits on one page. Multilingual possible (DE/FR/EN).", serviceType: "Web Development" },
    { name: "Takeover of an existing website", description: "The old site is pulled in full and rebuilt · content, images and rankings carry over, old addresses get permanent redirects. The old site stays online until the switch.", serviceType: "Web Development" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/studio");
}

export default function Page() {
  const locale = getLocale();
  const t = LEISTUNG[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: t.hero.kicker, url: `${BASE}${buildPath("leistung", locale)}` },
        ]}
      />
      <ServiceSchema services={SERVICES[locale]} />

      <StudioDevice />
    </>
  );
}
