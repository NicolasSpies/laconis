import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { RefThumb } from "@/components/referenzen/RefThumb";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { CaseStudySchema } from "@/components/seo/CaseStudySchema";
import { EvolutionSlider } from "@/components/referenzen/EvolutionSlider";
import { referenzen } from "@/data/referenzen";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";

const BASE = "https://laconis.be";

type Props = { params: { slug: string } };

type Dict = {
  back: string;
  inArbeit: string;
  konzept: string;
  liveAnsehen: string;
  ehrlich: string;
  wasDrin: string;
  steckbrief: string;
  kategorie: string;
  ort: string;
  jahr: string;
  tags: string;
  pagespeed: string;
  pdesktop: string;
  pmobile: string;
  dasProjektTitle: string;
  derProzessTitle: string;
  ergebnisTitle: string;
  projekt1: (type: string, ort: string, kurz: string) => string;
  prozess1: string;
  prozess2: string;
  ergebnisLive: string;
  ergebnisInArbeit: string;
  typWeb: string;
  typBranding: string;
  typGrafik: string;
  iteration: string;
  iterationH2: string;
  bildstrecke: string;
  einblicke: string;
  vorher: string;
  naechstes: string;
  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  notFound: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    back: "← alle referenzen",
    inArbeit: "in arbeit",
    konzept: "konzept-studie",
    liveAnsehen: "live ansehen ↗",
    ehrlich: "ehrlich-hinweis · Dies ist eine Konzept-Studie, kein veröffentlichtes Kunden-Projekt. Die Arbeitsweise ist aber die gleiche.",
    wasDrin: "was drinsteckt ↓",
    steckbrief: "steckbrief",
    kategorie: "kategorie",
    ort: "ort",
    jahr: "jahr",
    tags: "tags",
    pagespeed: "pagespeed",
    pdesktop: "desktop",
    pmobile: "mobile",
    dasProjektTitle: "das projekt",
    derProzessTitle: "der prozess",
    ergebnisTitle: "ergebnis",
    projekt1: (type, ort, kurz) => `ist ${type} aus ${ort}. ${kurz} · Ausgangspunkt war der Wunsch, sich aus dem Grundrauschen ähnlicher Angebote abzuheben und eine Identität zu bauen, die zur Person dahinter passt.`,
    prozess1: "Ich starte jeden Auftrag mit einem intensiven Moodboarding-Termin. Vor der ersten Pixel-Entscheidung stand die Frage: wer seid ihr wirklich, und wer sind die anderen? Aus den Antworten ist das visuelle System gewachsen · Farbe, Typografie, Tonalität.",
    prozess2: "Die Umsetzung lief in kurzen Iterationen, mit Zwischenabgaben statt Black-Box. So kannst du immer lenken, wo es hingehen sollte · ohne Überraschung am Launch-Tag.",
    ergebnisLive: "Das Projekt ist live und wird aktiv genutzt. Feedback bisher: die Seite fühlt sich endlich nach den Leuten an, die dahinter stehen · und nicht nach Template.",
    ergebnisInArbeit: "Das Projekt befindet sich aktuell noch in der Bauphase · erste Screens und der Branding-Rahmen stehen. Launch ist für die kommenden Wochen geplant.",
    typWeb: "eine Website",
    typBranding: "ein Branding-Projekt",
    typGrafik: "eine grafische Arbeit",
    iteration: "iteration",
    iterationH2: "von der ersten version · zur jetzigen.",
    bildstrecke: "bildstrecke ↓",
    einblicke: "einblicke",
    vorher: "← vorheriges",
    naechstes: "nächstes →",
    ctaH2: "sowas auch für dich?",
    ctaBody: "Jedes Projekt ist eigen. Schreib mir, was dir vorschwebt · ich schau, was passt.",
    ctaPrimary: "projekt anfragen →",
    notFound: "projekt nicht gefunden",
  },
  fr: {
    back: "← toutes les références",
    inArbeit: "en cours",
    konzept: "étude conceptuelle",
    liveAnsehen: "voir en live ↗",
    ehrlich: "note honnête · ceci est une étude conceptuelle, pas un projet client publié. la méthode reste la même.",
    wasDrin: "ce qu'il y a dedans ↓",
    steckbrief: "fiche",
    kategorie: "catégorie",
    ort: "lieu",
    jahr: "année",
    tags: "tags",
    pagespeed: "pagespeed",
    pdesktop: "desktop",
    pmobile: "mobile",
    dasProjektTitle: "le projet",
    derProzessTitle: "le processus",
    ergebnisTitle: "résultat",
    projekt1: (type, ort, kurz) => `est ${type} de ${ort}. ${kurz} · au départ : l'envie de sortir du bruit des offres similaires et de construire une identité qui colle à la personne derrière.`,
    prozess1: "Je démarre chaque projet par un moodboard intensif. Avant la première décision pixel, la question : qui êtes-vous vraiment, et qui sont les autres ? Le système visuel a poussé à partir des réponses · couleur, typo, ton.",
    prozess2: "L'exécution s'est faite en courtes itérations, avec des étapes intermédiaires plutôt qu'une boîte noire. Tu peux toujours diriger où ça va · sans surprise le jour du lancement.",
    ergebnisLive: "Le projet est en ligne et utilisé activement. Retour jusqu'ici : le site ressemble enfin aux gens qui sont derrière · pas à un template.",
    ergebnisInArbeit: "Le projet est en cours de construction · premiers écrans et cadre branding posés. Lancement prévu dans les prochaines semaines.",
    typWeb: "un site web",
    typBranding: "un projet de branding",
    typGrafik: "un travail graphique",
    iteration: "itération",
    iterationH2: "de la première version · à l'actuelle.",
    bildstrecke: "galerie ↓",
    einblicke: "aperçus",
    vorher: "← précédent",
    naechstes: "suivant →",
    ctaH2: "ça te tente aussi ?",
    ctaBody: "Chaque projet est unique. Écris-moi ce que t'as en tête · je regarde ce qui colle.",
    ctaPrimary: "lancer un projet →",
    notFound: "projet introuvable",
  },
  en: {
    back: "← all work",
    inArbeit: "in progress",
    konzept: "concept study",
    liveAnsehen: "see live ↗",
    ehrlich: "honesty note · this is a concept study, not a published client project. the working method is the same though.",
    wasDrin: "what's inside ↓",
    steckbrief: "profile",
    kategorie: "category",
    ort: "location",
    jahr: "year",
    tags: "tags",
    pagespeed: "pagespeed",
    pdesktop: "desktop",
    pmobile: "mobile",
    dasProjektTitle: "the project",
    derProzessTitle: "the process",
    ergebnisTitle: "outcome",
    projekt1: (type, ort, kurz) => `is ${type} from ${ort}. ${kurz} · the starting point was the wish to stand out from the noise of similar offerings and build an identity that fits the person behind it.`,
    prozess1: "I start every project with an intense moodboarding session. Before the first pixel decision came the question: who are you really, and who are the others? The visual system grew out of the answers · colour, typography, tone.",
    prozess2: "Execution ran in short iterations, with in-between deliveries instead of a black box. You can always steer where it's going · no surprise on launch day.",
    ergebnisLive: "The project is live and actively used. Feedback so far: the site finally feels like the people behind it · not like a template.",
    ergebnisInArbeit: "The project is currently still being built · first screens and the branding frame are in. Launch is planned for the coming weeks.",
    typWeb: "a website",
    typBranding: "a branding project",
    typGrafik: "a graphic piece",
    iteration: "iteration",
    iterationH2: "from the first version · to the current one.",
    bildstrecke: "image set ↓",
    einblicke: "insights",
    vorher: "← previous",
    naechstes: "next →",
    ctaH2: "something like this for you too?",
    ctaBody: "Every project is its own. Write me what you have in mind · i'll see what fits.",
    ctaPrimary: "request a project →",
    notFound: "project not found",
  },
};

export function generateStaticParams() {
  return referenzen.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const r = referenzen.find((x) => x.slug === params.slug);
  if (!r) return { title: "projekt nicht gefunden" };
  const typLabel = r.istEcht ? r.kategorieLabel : `${r.kategorieLabel} · konzept-studie`;
  return {
    title: `${r.name.toLowerCase()} · referenzen`,
    description: `${r.kurz} · ${typLabel} · ${r.ort} · ${r.jahr}`,
    openGraph: {
      title: `${r.name} · laconis`,
      description: r.kurz,
      url: `/referenzen/${r.slug}`,
      locale: "de_BE",
      type: "article",
    },
    alternates: { canonical: `/referenzen/${r.slug}` },
  };
}

export default function Page({ params }: Props) {
  const r = referenzen.find((x) => x.slug === params.slug);
  if (!r) notFound();

  const idx = referenzen.findIndex((x) => x.slug === params.slug);
  const nextRef = referenzen[(idx + 1) % referenzen.length];
  const prevRef = referenzen[(idx - 1 + referenzen.length) % referenzen.length];

  const hasPagespeed =
    r.pagespeedMobile !== undefined || r.pagespeedDesktop !== undefined;

  const locale = getLocale();
  const t = DICT[locale];

  const typeLabel =
    r.kategorie === "web" || r.kategorie === "web-branding"
      ? t.typWeb
      : r.kategorie === "branding"
        ? t.typBranding
        : t.typGrafik;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: "referenzen", url: `${BASE}/referenzen` },
          { name: r.name.toLowerCase(), url: `${BASE}/referenzen/${r.slug}` },
        ]}
      />
      <CaseStudySchema referenz={r} />

      <section className="pt-36 pb-8">
        <div className="container-site">
          <Link
            href={buildPath("referenzen", locale)}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
          >
            {t.back}
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-site">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-lime" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              {r.kategorieLabel}
            </span>
            <span className="h-px flex-1 bg-ink/10" />
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              {r.jahr}
            </span>
          </div>

          <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite lowercase">
            {r.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-mono text-[12px] uppercase tracking-label text-offwhite/55">
              {r.ort}
            </span>
            {r.inArbeit && (
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink bg-lime/10 border border-lime/25 rounded-full px-2.5 py-1">
                {t.inArbeit}
              </span>
            )}
            {!r.istEcht && (
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/75 bg-offwhite/5 border border-offwhite/15 rounded-full px-2.5 py-1">
                {t.konzept}
              </span>
            )}
            {r.urlExtern && (
              <Button
                href={r.urlExtern}
                variant="primary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.liveAnsehen}
              </Button>
            )}
          </div>

          <p className="mt-10 max-w-[680px] text-[16px] md:text-[18px] leading-relaxed text-offwhite/75">
            {r.kurz}
          </p>

          {!r.istEcht && (
            <p className="mt-5 max-w-[680px] text-[13px] leading-relaxed text-offwhite/55 italic">
              {t.ehrlich}
            </p>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site">
          <div className="relative rounded-2xl overflow-hidden border border-ink/10">
            <RefThumb ref_={r} aspect="16 / 9" />
          </div>
          {r.notiz && (
            <p
              className="mt-4 font-hand text-[20px] text-offwhite/55 max-w-[680px]"
              style={{ transform: "rotate(-0.8deg)" }}
            >
              {r.notiz}
            </p>
          )}
        </div>
      </section>

      <div className="container-site py-2 pb-8">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(-1deg)" }}>
            {t.wasDrin}
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      <section className="pb-24">
        <div className="container-site grid lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] gap-12">
          <div>
            <SectionLabel>{t.steckbrief}</SectionLabel>
            <dl className="mt-6 space-y-4">
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/10">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.kategorie}
                </dt>
                <dd className="text-[13px] text-offwhite">
                  {r.kategorieLabel}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/10">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.ort}
                </dt>
                <dd className="text-[13px] text-offwhite">{r.ort}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 pb-3 border-b border-ink/10">
                <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                  {t.jahr}
                </dt>
                <dd className="text-[13px] text-offwhite">{r.jahr}</dd>
              </div>
              {r.tags.length > 0 && (
                <div className="pb-3 border-b border-ink/10">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 mb-3">
                    {t.tags}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-label px-2 py-0.5 rounded-full border border-ink/10 text-offwhite/55"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
              {hasPagespeed && (
                <div className="pb-3">
                  <dt className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 mb-3">
                    {t.pagespeed}
                  </dt>
                  <dd className="flex gap-4">
                    {r.pagespeedDesktop !== undefined && (
                      <Score label={t.pdesktop} value={r.pagespeedDesktop} />
                    )}
                    {r.pagespeedMobile !== undefined && (
                      <Score label={t.pmobile} value={r.pagespeedMobile} />
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="space-y-10 text-[15px] md:text-[16px] leading-relaxed text-offwhite/75">
            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                {t.dasProjektTitle}
              </h2>
              <p>
                {r.name} {t.projekt1(typeLabel, r.ort.split(",")[0], r.kurz)}
              </p>
            </div>

            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                {t.derProzessTitle}
              </h2>
              <p>{t.prozess1}</p>
              <p className="mt-4">{t.prozess2}</p>
            </div>

            <div>
              <h2 className="heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite mb-4">
                {t.ergebnisTitle}
              </h2>
              <p>{r.inArbeit ? t.ergebnisInArbeit : t.ergebnisLive}</p>
            </div>
          </div>
        </div>
      </section>

      {r.evolutionFrames && (
        <section className="pb-24">
          <div className="container-site">
            <SectionLabel>{t.iteration}</SectionLabel>
            <h2 className="mt-4 heading-sans text-[clamp(1.5rem,3vw,2.25rem)] text-offwhite">
              {t.iterationH2}
            </h2>
            <div className="mt-8">
              <EvolutionSlider
                slug={r.slug}
                before={r.evolutionFrames.before}
                after={r.evolutionFrames.after}
                labelBefore={r.evolutionFrames.labelBefore}
                labelAfter={r.evolutionFrames.labelAfter}
                caption={r.evolutionFrames.caption}
              />
            </div>
          </div>
        </section>
      )}

      <div className="container-site py-2 pb-6">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(0.8deg)" }}>
            {t.bildstrecke}
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      <section className="pb-28">
        <div className="container-site">
          <SectionLabel>{t.einblicke}</SectionLabel>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="21 / 9" />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="4 / 3" />
            </div>
            <div className="relative rounded-xl overflow-hidden border border-ink/10">
              <RefThumb ref_={r} aspect="4 / 3" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-ink/10">
            <Link href={`${buildPath("referenzen", locale)}/${prevRef.slug}`} className="group block">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 group-hover:text-accent-ink transition-colors">
                {t.vorher}
              </span>
              <h3 className="mt-2 heading-sans text-[20px] text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                {prevRef.name}
              </h3>
            </Link>
            <Link
              href={`${buildPath("referenzen", locale)}/${nextRef.slug}`}
              className="group block text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 group-hover:text-accent-ink transition-colors">
                {t.naechstes}
              </span>
              <h3 className="mt-2 heading-sans text-[20px] text-offwhite group-hover:text-accent-ink transition-colors lowercase">
                {nextRef.name}
              </h3>
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-36">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              {t.ctaH2}
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              {t.ctaBody}
            </p>
            <div className="mt-8">
              <Button
                href={buildPath("kontakt", locale)}
                variant="primary"
                size="lg"
                analyticsLabel={`referenz_detail_${r.slug}`}
              >
                {t.ctaPrimary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Score({ label, value }: { label: string; value: number }) {
  const tone =
    value >= 90
      ? "text-accent-ink"
      : value >= 70
        ? "text-offwhite"
        : "text-orange-400";
  return (
    <div>
      <div
        className={`font-mono text-[24px] ${tone} tabular-nums leading-none`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
        {label}
      </div>
    </div>
  );
}
