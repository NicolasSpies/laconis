import type { Metadata } from "next";
import { referenzen } from "@/data/referenzen";
import { FabryCaseStudy } from "@/components/referenzen/FabryCaseStudy";

/**
 * TEMPORÄR (juni 2026) · referenz-detailseite.
 *
 * die alte daten-getriebene detailseite wurde ersetzt: aktuell rendert JEDER
 * referenz-slug die fabry-case-study (components/referenzen/FabryCaseStudy).
 * alle referenzen verlinken vorübergehend auf /referenzen/fabry-baumpflege ·
 * die idee der detailseite wiederholt sich eh. später: echte per-projekt seiten.
 *
 * generateStaticParams bleibt (alle slugs bauen, kein 404 bei direktaufruf).
 */

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return referenzen.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = referenzen.find((x) => x.slug === params.slug);
  const name = (r?.name ?? "referenz").toLowerCase();
  return {
    title: `${name} · referenzen`,
    description: r?.kurz,
    alternates: { canonical: `/referenzen/${params.slug}` },
  };
}

export default function Page() {
  return <FabryCaseStudy />;
}
