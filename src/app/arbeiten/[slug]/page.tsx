import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { referenzen } from "@/data/referenzen";
import { CaseDevice } from "@/components/referenzen/CaseDevice";

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

export function generateMetadata({ params }: Props): Metadata {
  const r = referenzen.find((x) => x.slug === params.slug);
  if (!r) return { title: "referenzen" };

  return {
    title: `${r.name.toLowerCase()} · referenzen`,
    description: r.istEcht
      ? `${r.kurz} · ${r.ort}, ${r.jahr}. Live beim Kunden.`
      : `${r.kurz} · ${r.ort}, ${r.jahr}. Konzept-studie, kein veröffentlichtes kundenprojekt.`,
    alternates: { canonical: `/arbeiten/${params.slug}` },
  };
}

export default function Page({ params }: Props) {
  /* unbekannter slug ist ein 404 · vorher lief er in die fabry-seite */
  if (!referenzen.some((r) => r.slug === params.slug)) notFound();

  return <CaseDevice slug={params.slug} />;
}
