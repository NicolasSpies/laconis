import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { referenzen } from "@/data/referenzen";
import { CaseDevice } from "@/components/referenzen/CaseDevice";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, LOCALES, type Locale } from "@/i18n/config";

/**
 * /referenzen/[slug] · die detailseite.
 *
 * bis august 2026 rendete hier JEDER slug dieselbe fabry-case-study ·
 * auf /referenzen/holoroom stand damit eine baumpflege-geschichte über
 * ein branding-projekt. jetzt zieht die seite ihre daten aus dem slug
 * und unterscheidet zwei fälle: live-projekt bekommt die volle story,
 * konzept-studie bekommt eine kurze ehrliche seite.
 */

type Props = { params: { slug: string } };

/* die referenzen stehen in einer datendatei, nicht in einer datenbank ·
   alles ausserhalb dieser liste ist ein echter 404 und soll gar nicht
   erst gerendert werden. mit dynamicParams=true kam im dev ein 200
   zurück, obwohl die not-found-seite ausgeliefert wurde. */
export const dynamicParams = false;

export function generateStaticParams() {
  return referenzen.map((r) => ({ slug: r.slug }));
}

/* die eine zeile, die pro sprache anders lautet · der rest der
   beschreibung kommt aus den projektdaten und ist (noch) einsprachig,
   das ist ein eigener punkt. */
const CASE_META: Record<Locale, { liste: string; live: string; konzept: string }> = {
  de: {
    liste: "arbeiten",
    live: "Live beim Kunden.",
    konzept: "Konzept-studie, kein veröffentlichtes Kundenprojekt.",
  },
  fr: {
    liste: "travaux",
    live: "En ligne chez le client.",
    konzept: "Étude concept, pas un projet client publié.",
  },
  en: {
    liste: "work",
    live: "Live at the client.",
    konzept: "Concept study, not a published client project.",
  },
};

export function generateMetadata({ params }: Props): Metadata {
  const r = referenzen.find((x) => x.slug === params.slug);
  const locale = getLocale();
  const t = CASE_META[locale];
  if (!r) return { title: t.liste };

  /* DER CANONICAL FOLGT DER SPRACHE.
     vorher stand hier hart `/arbeiten/${slug}` · /en/work/<slug>
     trug damit einen canonical auf die DEUTSCHE url und
     kanonisierte sich selbst weg, während die sitemap dieselbe
     url gleichzeitig als eigenständige sprachfassung mit hreflang
     anmeldet. sitemap und canonical widersprachen sich. */
  const basis = buildPath("referenzen", locale);
  const sprachen = Object.fromEntries(
    LOCALES.map((l) => [l, `${buildPath("referenzen", l)}/${params.slug}`]),
  );

  return {
    title: `${r.name.toLowerCase()} · ${t.liste}`,
    description: `${r.kurz} · ${r.ort}, ${r.jahr}. ${r.istEcht ? t.live : t.konzept}`,
    alternates: {
      canonical: `${basis}/${params.slug}`,
      languages: {
        ...sprachen,
        "x-default": `${buildPath("referenzen", "de")}/${params.slug}`,
      },
    },
  };
}

export default function Page({ params }: Props) {
  /* unbekannter slug ist ein 404 · vorher lief er in die fabry-seite */
  if (!referenzen.some((r) => r.slug === params.slug)) notFound();

  return <CaseDevice slug={params.slug} />;
}
