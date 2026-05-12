import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { GrundrauschHero } from "@/components/leistungen/web/GrundrauschHero";
import { WebApproaches } from "@/components/leistungen/web/WebApproaches";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { WebDeliverables } from "@/components/leistungen/web/WebDeliverables";
import { WebVsAlternatives } from "@/components/leistungen/web/WebVsAlternatives";
import { FabryCase } from "@/components/leistungen/web/FabryCase";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

/** Option-C-konform: Faustpreise (ab), keine fixen Pakete in der UI. */
const WEB_SERVICES = [
  {
    name: "Onepager Website",
    description:
      "Eine Seite, gebaut von null · responsiv, SEO-ready, Lighthouse 95+, eigenes Analytics, SSL + Backups. Für Selbständige, Handwerker, Neugründer. Domain und Mail separat.",
    minPrice: 1500,
    serviceType: "Web Development",
  },
  {
    name: "Mehrseitige Website",
    description:
      "Mehrere Unterseiten + optional CMS-Bereich zum selbst pflegen. Für KMU und Lokalbetriebe, die mehr zu sagen haben als auf eine Seite passt. Mehrsprachig möglich (DE/FR/EN).",
    minPrice: 2800,
    serviceType: "Web Development",
  },
  {
    name: "Website + Branding · Komplettpaket",
    description:
      "Vollständige Website plus Logo, Brand-Identity und Print-Materialien aus einer Hand. Spart Koordination zwischen zwei Dienstleistern, sieht stimmiger aus.",
    minPrice: 3500,
    serviceType: "Web Development & Branding",
  },
];

const WEB_FAQ = [
  {
    frage: "wie lange dauert eine website?",
    antwort:
      "Ein Onepager 2 Wochen, eine mehrseitige Website 3–5 Wochen, ein vollständiges Web + Branding-Projekt 4–8 Wochen. Hängt stark vom Content-Tempo ab — je klarer dein Briefing und je schneller dein Feedback, desto schneller sind wir live. Bei harter Deadline plane ich rückwärts.",
  },
  {
    frage: "was kostet eine website bei dir?",
    antwort:
      "Onepager mit eigenem Content ab 1.500 €, mehrseitige Website mit CMS zwischen 2.800 und 4.500 €, Website + Branding zusammen 3.500–6.000 €. Keine Paket-Tabelle — jedes Projekt ist anders, deshalb kommt nach dem Gespräch ein konkretes Angebot.",
  },
  {
    frage: "mit welcher technologie baust du?",
    antwort:
      "Next.js, TypeScript, Tailwind CSS und ein eigenes leichtgewichtiges CMS (ContentCore). Kein WordPress, kein Wix, kein Webflow. Resultat: Lighthouse-Scores 95–100, Ladezeiten unter einer Sekunde, keine Plugin-Hölle, kein Performance-Verfall über die Jahre.",
  },
  {
    frage: "kann ich die seite später selbst pflegen?",
    antwort:
      "Ja. Für Blog, Team-Bereich, News oder Referenzen baue ich CMS-Bereiche, die du selbst editieren kannst — über ein eigenes Admin-Interface, kein Wordpress-Login. Du bekommst eine Einweisung bei der Übergabe.",
  },
  {
    frage: "übernimmst du auch redesigns?",
    antwort:
      "Die Mehrheit meiner Projekte sind Redesigns: alte WordPress-Seiten, abgelaufene Baukasten-Sites, Wix-Reste. Bestehende URLs bekommen saubere 301-Redirects, deine Rankings bleiben stabil. Die alte Seite bleibt online, bis die neue live ist.",
  },
  {
    frage: "in welchen sprachen kann die seite sein?",
    antwort:
      "Deutsch, Französisch, Englisch — alle drei werden professionell abgedeckt, inklusive korrekter hreflang-Tags für Suchmaschinen. Niederländisch optional, aber nicht meine Kernsprache.",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/web");
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "leistungen", url: `${BASE}/leistungen` },
          { name: "web", url: `${BASE}/leistungen/web` },
        ]}
      />
      <ServiceSchema services={WEB_SERVICES} />
      <FAQSchema items={WEB_FAQ.map((f) => ({ q: f.frage, a: f.antwort }))} />

      {/* HERO · split-layout · text links, live-browser-demo rechts */}
      <section className="pt-32 md:pt-36 pb-16 md:pb-20">
        <div className="container-site">
          <SectionLabel num="01">leistungen · web</SectionLabel>

          <div className="mt-10 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">
            {/* LINKS · text */}
            <div className="max-w-[620px]">
              <h1 className="heading-display text-[clamp(2.25rem,6vw,4.5rem)] text-offwhite leading-[0.98]">
                websites, die nicht im{" "}
                <span className="text-offwhite/35">grundrauschen</span>{" "}
                verschwinden.
              </h1>
              <p className="mt-7 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
                ich fang bei null an. kein baukasten, kein theme das tausende
                nutzen. eine seite, die wirklich nach dir aussieht · und ein
                cms, das du nach der übergabe selbst bedienst.
              </p>

              {/* mini-stats unter dem text · ersetzt zweite fette headline */}
              <dl className="mt-10 grid grid-cols-3 gap-4 max-w-[520px]">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    google-score
                  </dt>
                  <dd className="heading-display text-lime text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    95+
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    du pflegst
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    selbst
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-label text-offwhite/35">
                    launch
                  </dt>
                  <dd className="heading-display text-offwhite text-[clamp(1.5rem,3vw,2.25rem)] leading-none mt-1">
                    2–8w
                  </dd>
                </div>
              </dl>
            </div>

            {/* RECHTS · grundrauschen-animation */}
            <div className="relative">
              <GrundrauschHero />
            </div>
          </div>
        </div>
      </section>

      <ScribbleBreak text="so läuft's ab ↓" rotate={-1} />

      {/* 02 · ZWEI WEGE · das angebot */}
      <WebApproaches num="02" />

      {/* 03 · WAS DU BEKOMMST · deliverables direkt nach angebot */}
      <WebDeliverables num="03" />

      <ScribbleBreak text="ein echter kunde dazu ↓" rotate={0.8} flip />

      {/* 04 · BEWEIS · fabry-case mit testimonial */}
      <FabryCase num="04" />

      {/* 05 · EINORDNUNG · brauchst du mich überhaupt */}
      <WebVsAlternatives num="05" />

      {/* VERTIEFUNGS-LINKS · technik + ansatz */}
      <section className="pb-20">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/leistungen/web/technik"
              className="group glass tactile-sm rounded-xl px-6 py-5 hover:border-lime/25 flex items-start justify-between gap-4"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  für die techniker
                </span>
                <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                  hosting, cms-architektur, contentcore vs wordpress.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 self-center">
                →
              </span>
            </Link>
            <Link
              href="/ansatz"
              className="group glass tactile-sm rounded-xl px-6 py-5 hover:border-lime/25 flex items-start justify-between gap-4"
            >
              <div>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  wie ich arbeite
                </span>
                <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">
                  vier schritte, keine blackbox · und was ich nicht mache.
                </p>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink shrink-0 self-center">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ScribbleBreak text="bevor du fragst ↓" rotate={-0.8} />

      {/* FAQ */}
      <section className="pb-24 pt-4">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="08">oft gefragt</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              bevor du fragst.
            </h2>
          </div>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10 max-w-[820px]">
            {WEB_FAQ.map((q) => (
              <details key={q.frage} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="heading-sans text-[17px] md:text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                    {q.frage}
                  </h3>
                  <span className="font-mono text-[16px] text-offwhite/35 group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-offwhite/55">
                  {q.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontakt" className="pb-36 pt-8">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              klingt nach deinem projekt?
            </h2>
            <p className="mt-5 max-w-[520px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              30 minuten video-call. ich sag dir ehrlich, ob ich die richtige
              adresse bin · und wenn nicht, wer besser passt.
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href="/kontakt"
                variant="primary"
                size="lg"
                analyticsLabel="leistungen_web_kontakt"
              >
                kontakt aufnehmen →
              </Button>
              <Button
                href="/preise"
                variant="glass"
                size="lg"
                analyticsLabel="leistungen_web_preise"
              >
                preise ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
