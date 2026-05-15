import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PageHero } from "@/components/shared/PageHero";
import { GrundrauschHero } from "@/components/leistungen/web/GrundrauschHero";
import { WebApproaches } from "@/components/leistungen/web/WebApproaches";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { WebDeliverables } from "@/components/leistungen/web/WebDeliverables";
import { WebVsAlternatives } from "@/components/leistungen/web/WebVsAlternatives";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

type Service = { name: string; description: string; minPrice: number; serviceType: string };
type FaqItem = { frage: string; antwort: string };

type Dict = {
  sectionLabel: string;
  heroH1pre: string;
  heroH1mid: string;
  heroH1post: string;
  heroBody: string;
  stat1Label: string;
  stat2Label: string;
  stat2Value: string;
  stat3Label: string;
  breakHow: string;
  techLinkLabel: string;
  techLinkBody: string;
  ansatzLinkLabel: string;
  ansatzLinkBody: string;
  breakFAQ: string;
  faqLabel: string;
  faqH2: string;
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  services: Service[];
  faq: FaqItem[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "leistungen · web",
    heroH1pre: "websites, die nicht im ",
    heroH1mid: "grundrauschen",
    heroH1post: " verschwinden.",
    heroBody: "ich fang bei null an. kein baukasten, kein theme das tausende nutzen. eine seite, die wirklich nach dir aussieht · und ein cms, das du nach der übergabe selbst bedienst.",
    stat1Label: "google-score",
    stat2Label: "du pflegst",
    stat2Value: "selbst",
    stat3Label: "launch",
    breakHow: "so läuft's ab ↓",
    techLinkLabel: "für die techniker",
    techLinkBody: "hosting, cms-architektur, contentcore vs wordpress.",
    ansatzLinkLabel: "wie ich arbeite",
    ansatzLinkBody: "vier schritte, keine blackbox · und was ich nicht mache.",
    breakFAQ: "bevor du fragst ↓",
    faqLabel: "oft gefragt",
    faqH2: "bevor du fragst.",
    ctaH2: "klingt nach deinem projekt?",
    ctaBody: "30 minuten video-call. ich sag dir ehrlich, ob ich die richtige adresse bin · und wenn nicht, wer besser passt.",
    ctaPrimary: "kontakt aufnehmen →",
    ctaSecondary: "preise ansehen",
    services: [
      { name: "Onepager Website", description: "Eine Seite, gebaut von null · responsiv, SEO-ready, Lighthouse 95+, eigenes Analytics, SSL + Backups. Für Selbständige, Handwerker, Neugründer. Domain und Mail separat.", minPrice: 1500, serviceType: "Web Development" },
      { name: "Mehrseitige Website", description: "Mehrere Unterseiten + optional CMS-Bereich zum selbst pflegen. Für KMU und Lokalbetriebe, die mehr zu sagen haben als auf eine Seite passt. Mehrsprachig möglich (DE/FR/EN).", minPrice: 2800, serviceType: "Web Development" },
      { name: "Website + Branding · Komplettpaket", description: "Vollständige Website plus Logo, Brand-Identity und Print-Materialien aus einer Hand. Spart Koordination zwischen zwei Dienstleistern, sieht stimmiger aus.", minPrice: 3500, serviceType: "Web Development & Branding" },
    ],
    faq: [
      { frage: "wie lange dauert eine website?", antwort: "Ein Onepager 2 Wochen, eine mehrseitige Website 3–5 Wochen, ein vollständiges Web + Branding-Projekt 4–8 Wochen. Hängt stark vom Content-Tempo ab · je klarer dein Briefing und je schneller dein Feedback, desto schneller ist die seite live. Bei harter Deadline plane ich rückwärts." },
      { frage: "was kostet eine website bei dir?", antwort: "Onepager mit eigenem Content ab 1.500 €, mehrseitige Website mit CMS zwischen 2.800 und 4.500 €, Website + Branding zusammen 3.500–6.000 €. Keine Paket-Tabelle · jedes Projekt ist anders, deshalb kommt nach dem Gespräch ein konkretes Angebot." },
      { frage: "mit welcher technologie baust du?", antwort: "Next.js, TypeScript, Tailwind CSS und ein eigenes leichtgewichtiges CMS (ContentCore). Kein WordPress, kein Wix, kein Webflow. Resultat: Lighthouse-Scores 95–100, Ladezeiten unter einer Sekunde, keine Plugin-Hölle, kein Performance-Verfall über die Jahre." },
      { frage: "kann ich die seite später selbst pflegen?", antwort: "Ja. Für Blog, Team-Bereich, News oder Referenzen baue ich CMS-Bereiche, die du selbst editieren kannst · über ein eigenes Admin-Interface, kein WordPress-Login. Du bekommst eine Einweisung bei der Übergabe." },
      { frage: "übernimmst du auch redesigns?", antwort: "Die meisten meiner Projekte sind Redesigns: alte WordPress-Seiten, abgelaufene Baukasten-Sites, Wix-Reste. Bestehende URLs bekommen saubere 301-Redirects, deine Rankings bleiben stabil. Die alte Seite bleibt online, bis die neue live ist." },
      { frage: "in welchen sprachen kann die seite sein?", antwort: "Deutsch, Französisch, Englisch · alle drei werden professionell abgedeckt, inklusive korrekter hreflang-Tags für Suchmaschinen. Niederländisch optional, aber nicht meine Kernsprache." },
    ],
  },
  fr: {
    sectionLabel: "services · web",
    heroH1pre: "des sites web qui ne se ",
    heroH1mid: "noient",
    heroH1post: " pas dans la masse.",
    heroBody: "je commence à zéro. pas de constructeur, pas de thème utilisé par des milliers. un site qui te ressemble vraiment · et un cms que tu pilotes toi-même après la livraison.",
    stat1Label: "google-score",
    stat2Label: "tu gères",
    stat2Value: "toi-même",
    stat3Label: "lancement",
    breakHow: "comment ça se passe ↓",
    techLinkLabel: "pour les tech",
    techLinkBody: "hébergement, architecture cms, contentcore vs wordpress.",
    ansatzLinkLabel: "comment je travaille",
    ansatzLinkBody: "quatre étapes, pas de boîte noire · et ce que je ne fais pas.",
    breakFAQ: "avant que tu demandes ↓",
    faqLabel: "souvent demandé",
    faqH2: "avant que tu demandes.",
    ctaH2: "ça ressemble à ton projet ?",
    ctaBody: "30 minutes en visio. je te dis honnêtement si je suis la bonne adresse · et sinon, qui convient mieux.",
    ctaPrimary: "prendre contact →",
    ctaSecondary: "voir les prix",
    services: [
      { name: "Site Web Onepage", description: "Une page, construite à partir de zéro · responsive, prêt SEO, Lighthouse 95+, analytics intégrés, SSL + sauvegardes. Pour indépendants, artisans, créateurs. Domaine et mail à part.", minPrice: 1500, serviceType: "Web Development" },
      { name: "Site Web Multi-pages", description: "Plusieurs sous-pages + zone CMS optionnelle à gérer toi-même. Pour PME et entreprises locales qui ont plus à dire que ce qui tient sur une page. Multilingue possible (DE/FR/EN).", minPrice: 2800, serviceType: "Web Development" },
      { name: "Site Web + Branding · Pack complet", description: "Site complet plus logo, identité de marque et supports print d'une seule main. Évite la coordination entre deux prestataires, plus cohérent visuellement.", minPrice: 3500, serviceType: "Web Development & Branding" },
    ],
    faq: [
      { frage: "combien de temps prend un site web ?", antwort: "Un onepage 2 semaines, un site multi-pages 3–5 semaines, un projet web + branding complet 4–8 semaines. Ça dépend beaucoup du rythme du contenu · plus ton brief est clair et ton feedback rapide, plus vite le site est en ligne. Pour une deadline serrée je planifie à rebours." },
      { frage: "ça coûte combien chez toi ?", antwort: "Onepage avec ton propre contenu à partir de 1 500 €, site multi-pages avec CMS entre 2 800 et 4 500 €, web + branding ensemble 3 500–6 000 €. Pas de grille forfaitaire · chaque projet est différent, donc une offre concrète arrive après l'échange." },
      { frage: "avec quelle techno tu construis ?", antwort: "Next.js, TypeScript, Tailwind CSS et un CMS léger fait maison (ContentCore). Pas de WordPress, pas de Wix, pas de Webflow. Résultat : scores Lighthouse 95–100, temps de chargement sous une seconde, pas d'enfer des plugins, pas de dégradation des perfs au fil des ans." },
      { frage: "je pourrai gérer le site moi-même ensuite ?", antwort: "Oui. Pour blog, page équipe, news ou références je construis des zones CMS que tu peux éditer toi-même · via une interface admin dédiée, pas de login WordPress. Tu reçois une formation à la livraison." },
      { frage: "tu fais aussi des refontes ?", antwort: "La plupart de mes projets sont des refontes : vieux sites WordPress, sites builders périmés, restes de Wix. Les URLs existantes reçoivent des redirections 301 propres, ton SEO reste stable. L'ancien site reste en ligne jusqu'à la mise en service du nouveau." },
      { frage: "dans quelles langues peut être le site ?", antwort: "Allemand, français, anglais · les trois sont couvertes professionnellement, balises hreflang incluses pour les moteurs. Néerlandais possible mais pas ma langue principale." },
    ],
  },
  en: {
    sectionLabel: "services · web",
    heroH1pre: "websites that don't ",
    heroH1mid: "drown",
    heroH1post: " in the noise.",
    heroBody: "i start from scratch. no builders, no themes used by thousands. a site that actually looks like you · and a cms you run yourself after handover.",
    stat1Label: "google score",
    stat2Label: "you maintain",
    stat2Value: "yourself",
    stat3Label: "launch",
    breakHow: "how it works ↓",
    techLinkLabel: "for the technical folks",
    techLinkBody: "hosting, cms architecture, contentcore vs wordpress.",
    ansatzLinkLabel: "how i work",
    ansatzLinkBody: "four steps, no black box · and what i don't do.",
    breakFAQ: "before you ask ↓",
    faqLabel: "often asked",
    faqH2: "before you ask.",
    ctaH2: "sounds like your project?",
    ctaBody: "30-minute video call. i'll tell you honestly if i'm the right person · and if not, who fits better.",
    ctaPrimary: "get in touch →",
    ctaSecondary: "see pricing",
    services: [
      { name: "Onepager Website", description: "One page, built from scratch · responsive, SEO-ready, Lighthouse 95+, own analytics, SSL + backups. For freelancers, makers, founders. Domain and mail separate.", minPrice: 1500, serviceType: "Web Development" },
      { name: "Multi-page Website", description: "Multiple subpages + optional CMS area you maintain yourself. For SMBs and local businesses with more to say than fits on one page. Multilingual possible (DE/FR/EN).", minPrice: 2800, serviceType: "Web Development" },
      { name: "Website + Branding · Complete pack", description: "Full website plus logo, brand identity and print materials from one hand. Saves coordination between two providers, looks more cohesive.", minPrice: 3500, serviceType: "Web Development & Branding" },
    ],
    faq: [
      { frage: "how long does a website take?", antwort: "A onepager 2 weeks, multi-page 3–5 weeks, full web + branding 4–8 weeks. Heavily depends on content pace · the clearer your brief and faster your feedback, the sooner the site goes live. With a hard deadline i plan backwards." },
      { frage: "what does a website cost?", antwort: "Onepager with your own content from €1,500, multi-page with CMS between €2,800 and €4,500, web + branding together €3,500–6,000. No package grid · every project is different, so a concrete offer comes after the conversation." },
      { frage: "what technology do you build with?", antwort: "Next.js, TypeScript, Tailwind CSS and a lightweight in-house CMS (ContentCore). No WordPress, no Wix, no Webflow. Result: Lighthouse scores 95–100, sub-second load times, no plugin hell, no performance decay over the years." },
      { frage: "can i maintain the site myself later?", antwort: "Yes. For blog, team area, news or references i build CMS areas you can edit yourself · via a dedicated admin interface, not a WordPress login. You get a walkthrough at handover." },
      { frage: "do you take on redesigns?", antwort: "Most of my projects are redesigns: old WordPress sites, expired builder sites, Wix leftovers. Existing URLs get clean 301 redirects, your rankings stay stable. The old site stays online until the new one launches." },
      { frage: "what languages can the site be in?", antwort: "German, French, English · all three covered professionally, with correct hreflang tags. Dutch optional but not my core language." },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/web");
}

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "leistungen", url: `${BASE}${buildPath("leistungen", locale)}` },
          { name: "web", url: `${BASE}${buildPath("leistungen/web", locale)}` },
        ]}
      />
      <ServiceSchema services={t.services} />
      <FAQSchema items={t.faq.map((f) => ({ q: f.frage, a: f.antwort }))} />

      {/* HERO · grey im stil home */}
      <PageHero
        kicker={`· ${t.sectionLabel}`}
        line1={t.heroH1pre.replace(/\s+$/, "")}
        line2={
          <>
            <span style={{ fontFamily: "var(--font-caveat), cursive", fontWeight: 400 }}>
              {t.heroH1mid}
            </span>
            {t.heroH1post}
          </>
        }
        sub={t.heroBody}
        visual={<GrundrauschHero />}
      />

      <ScribbleBreak text={t.breakHow} rotate={-1} />

      <WebApproaches num="02" />
      <WebDeliverables num="03" />

      <WebVsAlternatives num="05" />

      {/* VERTIEFUNGS-LINKS · clean text-links statt glass cards */}
      <section className="pb-20">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-[1100px] border-t-2 border-[#0a0a0a]/15">
            <Link
              href={buildPath("leistungen/web/technik", locale)}
              className="group block py-8 border-b-2 border-[#0a0a0a]/15 md:border-b-0 md:border-r-2"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.techLinkLabel}
              </span>
              <p className="mt-2 text-[18px] md:text-[20px] text-[#0a0a0a] font-medium tracking-[-0.01em] group-hover:text-[#0a0a0a] transition-colors flex items-center gap-2">
                {t.techLinkBody}
                <span className="font-mono text-[14px] text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all">→</span>
              </p>
            </Link>
            <Link
              href={buildPath("ansatz", locale)}
              className="group block py-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.ansatzLinkLabel}
              </span>
              <p className="mt-2 text-[18px] md:text-[20px] text-[#0a0a0a] font-medium tracking-[-0.01em] group-hover:text-[#0a0a0a] transition-colors flex items-center gap-2">
                {t.ansatzLinkBody}
                <span className="font-mono text-[14px] text-[#0a0a0a]/45 group-hover:text-[#0a0a0a] group-hover:translate-x-1 transition-all">→</span>
              </p>
            </Link>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakFAQ} rotate={-0.8} />

      {/* FAQ */}
      <section className="pb-24 pt-4">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="08">{t.faqLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              {t.faqH2}
            </h2>
          </div>
          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/20 max-w-[820px]">
            {t.faq.map((q) => (
              <details key={q.frage} className="group py-6 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="heading-sans text-[17px] md:text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                    {q.frage}
                  </h3>
                  <span className="font-mono text-[16px] text-offwhite/35 group-open:rotate-45 transition-transform shrink-0">+</span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-offwhite/55">
                  {q.antwort}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA · transparent · blobs durch · lila accent statt lime fläche */}
      <section
        id="kontakt"
        className="relative py-24 md:py-32 overflow-hidden text-[#0a0a0a]"
      >
        <div className="container-site relative text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-[1] font-black tracking-[-0.04em] text-[#0a0a0a] lowercase max-w-[680px] mx-auto">
            {t.ctaH2}
          </h2>
          <p className="mt-6 max-w-[520px] mx-auto text-[14px] md:text-[15px] leading-relaxed text-[#0a0a0a]/80">
            {t.ctaBody}
          </p>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("preise", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#b084d3] text-[#0a0a0a] hover:bg-[#b084d3] hover:text-[#0a0a0a] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
