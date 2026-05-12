import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

const BASE = "https://laconis.be";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/preise");
}

type FaqItem = { frage: string; antwort: string };
type Faktor = { num: string; titel: string; text: string };

type Dict = {
  sectionLabel: string;
  headlinePre: string;
  headlineItalic: string;
  headlinePost: string;
  intro: string;
  breakWhy: string;
  factorsLabel: string;
  factorsHeadlinePre: string;
  factorsHeadlinePost: string;
  factorsIntro: string;
  faktoren: Faktor[];
  breakNumbers: string;
  numbersLabel: string;
  numbersHeadline: string;
  numbersIntro: string;
  websiteLabel: string;
  websiteBody: string;
  websiteHand: string;
  brandingLabel: string;
  brandingBody: string;
  brandingHand: string;
  hostingLabel: string;
  hostingBody: string;
  breakFAQ: string;
  faqLabel: string;
  faqHeadline: string;
  faq: FaqItem[];
  ctaHand: string;
  ctaHeadlinePre: string;
  ctaHeadlinePost: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "investment",
    headlinePre: "was kostet das ",
    headlineItalic: "eigentlich",
    headlinePost: "?",
    intro: "Ehrliche Antwort. Kein Paket-Raster, keine Sternchen. Jedes Projekt ist anders · deshalb gibt's hier keine Tabelle, sondern eine Erklärung, was den Preis wirklich macht.",
    breakWhy: "was den preis macht ↓",
    factorsLabel: "die faktoren",
    factorsHeadlinePre: "kein projekt ",
    factorsHeadlinePost: "ist wie das andere.",
    factorsIntro: "Diese fünf Punkte bestimmen, wie aufwendig ein Projekt ist · und damit, wo es preislich landet.",
    faktoren: [
      { num: "01", titel: "scope", text: "Wie viele Seiten? Gibt es einen CMS-Bereich, den du selbst pflegen willst? Braucht's einen Shop oder Buchungs-System? Je mehr bewegliche Teile, desto mehr Aufwand · und desto mehr Abstimmung davor." },
      { num: "02", titel: "content", text: "Bringst du Texte und Bilder mit · oder soll ich beim Schreiben mit ran? Content ist oft das, was Projekte in die Länge zieht. Und in den Preis. Klarer Content vom ersten Tag spart Zeit auf beiden Seiten." },
      { num: "03", titel: "branding", text: "Website allein, oder soll parallel auch eine visuelle Identität entstehen? Wenn beides aus einer Hand kommt, geht das schneller, sieht stimmiger aus und spart dir Koordination zwischen zwei Dienstleistern." },
      { num: "04", titel: "timing", text: "Flexibel oder gestern? Für knappe Deadlines ist mehr Koordination nötig · das spiegelt sich im Aufwand. Ein entspannter Zeitplan gibt Raum für bessere Entscheidungen auf beiden Seiten." },
      { num: "05", titel: "ausgangslage", text: "Weißes Blatt oder bestehendes System, das neu gebaut werden soll? Beides ist machbar · beides bedeutet andere Fragen am Anfang. Je klarer dein Briefing, desto genauer mein Angebot." },
    ],
    breakNumbers: "und in zahlen ↓",
    numbersLabel: "richtwerte",
    numbersHeadline: "und konkret?",
    numbersIntro: "Keine Fixpreise, aber ehrliche Faustregeln · damit klar ist, worum's geht, bevor das gespräch losgeht.",
    websiteLabel: "website",
    websiteBody: "Ein Onepager mit klarem Briefing und deinem eigenen Content startet ab rund 1.500 €. Eine mehrseitige Website mit CMS und Branding dazu landet typischerweise zwischen 3.500 und 6.000 €. Was dazwischen liegt: liegt dazwischen.",
    websiteHand: "keine versteckten posten.",
    brandingLabel: "branding",
    brandingBody: "Logo, Farbwelt, Typo, Brand Guide, Visitenkarte · das Start-Paket. Ein vollständiges Branding-Projekt beginnt ab 1.200 €. Wenn Website + Branding zusammen kommen, spart das Zeit und Koordination auf beiden Seiten.",
    brandingHand: "alles aus einer hand.",
    hostingLabel: "hosting · laufend",
    hostingBody: "Nach dem Launch: Hosting, Backup und kleine Pflege für 20–50 €/Monat je nach Setup. Domain separat, ca. 2 €/Monat. Ich erkläre das im Gespräch konkret · damit du weißt, was du langfristig einplanst.",
    breakFAQ: "bevor du fragst ↓",
    faqLabel: "oft gefragt",
    faqHeadline: "bevor du fragst.",
    faq: [
      { frage: "wie geht's nach dem anfragen los?", antwort: "Ich melde mich innerhalb von 24 Std (werktags). Dann: 20–30 min Gespräch · was du brauchst, was realistisch ist, wo der einstieg liegt. Danach bekommst du ein konkretes Angebot, schriftlich und ohne Kleingedrucktes." },
      { frage: "wie lange dauert so ein projekt?", antwort: "Ein Onepager ca. 2 Wochen, ein Multipager 3–5 Wochen, Website + Branding zusammen 4–8 Wochen. Hängt stark vom Content-Tempo ab · je klarer dein Briefing und je schneller dein Feedback, desto schneller ist alles fertig. Wenn du eine harte Deadline hast, sag Bescheid · ich plane rückwärts." },
      { frage: "was ist nicht enthalten?", antwort: "Stock-Fotos, Premium-Fonts und externe Tools mit eigenen Lizenzkosten liegen beim Kunden, es sei denn das war vorher besprochen. Domain-Registrierung ist optional. Alles, was über den besprochenen Scope hinausgeht, klär ich vor dem Start · keine Überraschungen auf der Rechnung." },
      { frage: "läuft nach dem launch noch was?", antwort: "Hosting, Backups und kleine Pflege · je nach Setup 20–50 €/Monat. Domain separat, ca. 2 €/Monat je nach TLD. Das erklär ich dir im Gespräch ganz konkret, damit du weißt, womit du langfristig rechnest." },
    ],
    ctaHand: "kurze frage, klare antwort.",
    ctaHeadlinePre: "ich sag dir innerhalb von 24 std, ",
    ctaHeadlinePost: "wo wir stehen.",
    ctaBody: "Schreib mir kurz, was du vorhast · kostenlos, unverbindlich. Kein Formular-Chaos. Einfach ein Gespräch.",
    ctaPrimary: "projekt besprechen →",
    ctaSecondary: "leistungen ansehen",
  },
  fr: {
    sectionLabel: "investissement",
    headlinePre: "ça coûte combien, ",
    headlineItalic: "en vrai",
    headlinePost: " ?",
    intro: "Réponse honnête. Pas de grille forfaitaire, pas d'astérisques. Chaque projet est différent · donc pas de tableau ici, mais une explication de ce qui fait vraiment le prix.",
    breakWhy: "ce qui fait le prix ↓",
    factorsLabel: "les facteurs",
    factorsHeadlinePre: "aucun projet ",
    factorsHeadlinePost: "ne ressemble à l'autre.",
    factorsIntro: "Ces cinq points déterminent à quel point un projet est lourd · et donc, où il se situe au niveau prix.",
    faktoren: [
      { num: "01", titel: "scope", text: "Combien de pages ? Une zone CMS que tu veux gérer toi-même ? Une boutique ou un système de réservation ? Plus il y a de pièces mobiles, plus c'est lourd · et plus il faut de coordination en amont." },
      { num: "02", titel: "contenu", text: "Tu apportes textes et images · ou tu veux que je m'y mette pour l'écriture ? Le contenu est souvent ce qui rallonge les projets. Et le prix. Du contenu clair dès le premier jour fait gagner du temps des deux côtés." },
      { num: "03", titel: "branding", text: "Site web seul, ou faut-il créer en parallèle une identité visuelle ? Quand les deux viennent de la même main, c'est plus rapide, plus cohérent, et ça t'évite la coordination entre deux prestataires." },
      { num: "04", titel: "timing", text: "Flexible ou hier ? Pour des délais serrés il faut plus de coordination · ça se reflète dans la charge. Un planning détendu laisse de la place pour de meilleures décisions des deux côtés." },
      { num: "05", titel: "point de départ", text: "Page blanche ou système existant à reconstruire ? Les deux sont faisables · les deux soulèvent d'autres questions au début. Plus ton brief est clair, plus mon offre l'est aussi." },
    ],
    breakNumbers: "et en chiffres ↓",
    numbersLabel: "fourchettes",
    numbersHeadline: "et concrètement ?",
    numbersIntro: "Pas de prix fixes, mais des règles honnêtes · pour que ce soit clair avant que le premier appel commence.",
    websiteLabel: "site web",
    websiteBody: "Un onepage avec brief clair et ton propre contenu démarre à environ 1 500 €. Un site multi-pages avec CMS et branding inclus se situe typiquement entre 3 500 et 6 000 €. Ce qui est entre les deux : est entre les deux.",
    websiteHand: "pas de coûts cachés.",
    brandingLabel: "branding",
    brandingBody: "Logo, palette, typo, brand guide, carte de visite · le pack de démarrage. Un projet branding complet démarre à 1 200 €. Quand site + branding viennent ensemble, ça fait gagner du temps et de la coordination des deux côtés.",
    brandingHand: "tout d'une même main.",
    hostingLabel: "hébergement · récurrent",
    hostingBody: "Après le lancement : hébergement, sauvegarde et petite maintenance pour 20–50 €/mois selon le setup. Domaine à part, environ 2 €/mois. Je t'explique ça concrètement en discussion · pour que tu saches sur quoi tu t'engages à long terme.",
    breakFAQ: "avant que tu demandes ↓",
    faqLabel: "souvent demandé",
    faqHeadline: "avant que tu demandes.",
    faq: [
      { frage: "comment ça se passe après la demande ?", antwort: "Je te réponds dans les 24h (en semaine). Ensuite : 20–30 min d'échange · ce dont tu as besoin, ce qui est réaliste, où on commence. Puis tu reçois une offre concrète, par écrit et sans petits caractères." },
      { frage: "combien de temps dure un projet ?", antwort: "Un onepage environ 2 semaines, un multi-pages 3–5 semaines, site + branding ensemble 4–8 semaines. Ça dépend beaucoup du rythme du contenu · plus ton brief est clair et ton feedback rapide, plus tout est prêt vite. Si tu as une deadline serrée, dis-le · je planifie à rebours." },
      { frage: "qu'est-ce qui n'est pas inclus ?", antwort: "Les photos stock, les fonts premium et les outils externes avec leurs propres licences sont à la charge du client, sauf accord préalable. L'enregistrement du domaine est optionnel. Tout ce qui dépasse le scope discuté, je le clarifie avant le démarrage · pas de surprises sur la facture." },
      { frage: "il y a quelque chose qui tourne après le launch ?", antwort: "Hébergement, sauvegardes et petite maintenance · selon le setup 20–50 €/mois. Domaine à part, environ 2 €/mois selon le TLD. Je t'explique ça concrètement en discussion, pour que tu saches sur quoi tu comptes à long terme." },
    ],
    ctaHand: "question courte, réponse claire.",
    ctaHeadlinePre: "je te dis en 24h, ",
    ctaHeadlinePost: "où on en est.",
    ctaBody: "Écris-moi brièvement ce que tu prévois · gratuit, sans engagement. Pas de chaos de formulaire. Juste une discussion.",
    ctaPrimary: "discuter du projet →",
    ctaSecondary: "voir les services",
  },
  en: {
    sectionLabel: "investment",
    headlinePre: "what does it ",
    headlineItalic: "actually",
    headlinePost: " cost?",
    intro: "Honest answer. No package grid, no asterisks. Every project is different · so no table here, but an explanation of what really drives the price.",
    breakWhy: "what drives the price ↓",
    factorsLabel: "the factors",
    factorsHeadlinePre: "no project ",
    factorsHeadlinePost: "is like another.",
    factorsIntro: "These five points decide how heavy a project gets · and therefore where it lands price-wise.",
    faktoren: [
      { num: "01", titel: "scope", text: "How many pages? Is there a CMS area you want to manage yourself? Does it need a shop or booking system? More moving parts means more effort · and more coordination upfront." },
      { num: "02", titel: "content", text: "Do you bring text and images · or should I help with the writing? Content is often what stretches projects out. And up in price. Clear content from day one saves time on both sides." },
      { num: "03", titel: "branding", text: "Website alone, or should a visual identity be built in parallel? When both come from one hand, it's faster, more cohesive, and saves you coordination between two providers." },
      { num: "04", titel: "timing", text: "Flexible or yesterday? Tight deadlines need more coordination · that shows in the effort. A relaxed timeline leaves room for better decisions on both sides." },
      { num: "05", titel: "starting point", text: "Blank page or existing system to be rebuilt? Both are doable · both raise different questions early on. The clearer your brief, the more precise my offer." },
    ],
    breakNumbers: "and in numbers ↓",
    numbersLabel: "ranges",
    numbersHeadline: "and concretely?",
    numbersIntro: "No fixed prices, but honest rules of thumb · so it's clear what we're talking about before the conversation starts.",
    websiteLabel: "website",
    websiteBody: "A onepager with clear brief and your own content starts at around €1,500. A multi-page website with CMS and branding included typically lands between €3,500 and €6,000. What's in between: is in between.",
    websiteHand: "no hidden line items.",
    brandingLabel: "branding",
    brandingBody: "Logo, colour palette, typography, brand guide, business card · the starter pack. A full branding project starts at €1,200. When website + branding come together, it saves time and coordination on both sides.",
    brandingHand: "all from one hand.",
    hostingLabel: "hosting · recurring",
    hostingBody: "After launch: hosting, backup and small maintenance for €20–50/month depending on setup. Domain separate, around €2/month. I explain that concretely in the conversation · so you know what you're committing to long-term.",
    breakFAQ: "before you ask ↓",
    faqLabel: "often asked",
    faqHeadline: "before you ask.",
    faq: [
      { frage: "what happens after the inquiry?", antwort: "I get back to you within 24h (weekdays). Then: 20–30 min talk · what you need, what's realistic, where we start. After that you get a concrete written offer, no small print." },
      { frage: "how long does a project take?", antwort: "A onepager about 2 weeks, a multi-page 3–5 weeks, website + branding together 4–8 weeks. Heavily depends on content pace · the clearer your brief and faster your feedback, the sooner it's done. If you have a hard deadline, tell me · I plan backwards." },
      { frage: "what's not included?", antwort: "Stock photos, premium fonts and external tools with their own licence costs are on the client, unless agreed otherwise. Domain registration is optional. Anything beyond the agreed scope I clarify before starting · no surprises on the invoice." },
      { frage: "does anything keep running after launch?", antwort: "Hosting, backups and small maintenance · depending on setup €20–50/month. Domain separate, around €2/month depending on TLD. I explain that concretely in the conversation, so you know what to plan for long-term." },
    ],
    ctaHand: "short question, clear answer.",
    ctaHeadlinePre: "i'll tell you within 24h, ",
    ctaHeadlinePost: "where we stand.",
    ctaBody: "Write me briefly what you're planning · free, no obligation. No form chaos. Just a conversation.",
    ctaPrimary: "discuss the project →",
    ctaSecondary: "see services",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "home", url: `${BASE}/` },
          { name: t.sectionLabel, url: `${BASE}${buildPath("preise", locale)}` },
        ]}
      />
      <FAQSchema items={t.faq.map((f) => ({ q: f.frage, a: f.antwort }))} />

      {/* HERO */}
      <section className="pt-36 pb-24">
        <div className="container-site">
          <SectionLabel num="01">{t.sectionLabel}</SectionLabel>

          <div className="mt-8 max-w-[920px]">
            <h1 className="heading-display text-[clamp(2.5rem,8vw,6rem)] text-offwhite leading-[1.0]">
              {t.headlinePre}
              <span className="italic font-serif text-accent-ink">
                {t.headlineItalic}
              </span>
              {t.headlinePost}
            </h1>
            <p className="mt-8 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakWhy} rotate={-1} />

      {/* FAKTOREN */}
      <section className="py-20">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionLabel num="02">{t.factorsLabel}</SectionLabel>
              <h2 className="heading-display mt-4 text-[clamp(2rem,4.5vw,3rem)] text-offwhite leading-[1.05]">
                {t.factorsHeadlinePre}
                <span className="text-offwhite/35">{t.factorsHeadlinePost}</span>
              </h2>
              <p className="mt-6 text-[14px] leading-relaxed text-offwhite/55 max-w-[320px]">
                {t.factorsIntro}
              </p>
            </div>

            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {t.faktoren.map((f) => (
                <li
                  key={f.num}
                  className="group grid grid-cols-[auto_1fr] gap-5 py-7 md:py-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 pt-1 tabular-nums">
                    {f.num}
                  </span>
                  <div>
                    <h3 className="heading-sans text-[clamp(1.1rem,2vw,1.4rem)] text-offwhite">
                      {f.titel}
                    </h3>
                    <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
                      {f.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakNumbers} rotate={0.8} flip />

      {/* RICHTWERTE */}
      <section className="py-20">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="03">{t.numbersLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              {t.numbersHeadline}
            </h2>
            <p className="mt-5 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
              {t.numbersIntro}
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-[820px]">
            <div className="glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                {t.websiteLabel}
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55">
                {t.websiteBody}
              </p>
              <p
                className="mt-5 font-hand text-[17px] text-accent-ink/80 leading-snug"
                style={{ transform: "rotate(-1deg)" }}
              >
                {t.websiteHand}
              </p>
            </div>

            <div className="glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                {t.brandingLabel}
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55">
                {t.brandingBody}
              </p>
              <p
                className="mt-5 font-hand text-[17px] text-accent-ink/80 leading-snug"
                style={{ transform: "rotate(1deg)" }}
              >
                {t.brandingHand}
              </p>
            </div>

            <div className="md:col-span-2 glass rounded-2xl p-7 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                {t.hostingLabel}
              </span>
              <p className="mt-4 text-[14px] leading-relaxed text-offwhite/55 max-w-[600px]">
                {t.hostingBody}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakFAQ} rotate={-0.8} />

      {/* FAQ */}
      <section className="pb-28 pt-4">
        <div className="container-site">
          <div className="max-w-[820px]">
            <SectionLabel num="04">{t.faqLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.5rem)] text-offwhite leading-[1.05]">
              {t.faqHeadline}
            </h2>
          </div>

          <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10 max-w-[820px]">
            {t.faq.map((q) => (
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
      <section className="pb-36">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <p
              className="font-hand text-[20px] md:text-[22px] text-offwhite/55 mb-4"
              style={{ transform: "rotate(-1deg)" }}
            >
              {t.ctaHand}
            </p>
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[680px] mx-auto">
              {t.ctaHeadlinePre}
              <span className="text-offwhite/35">{t.ctaHeadlinePost}</span>
            </h2>
            <p className="mt-5 max-w-[540px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              {t.ctaBody}
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button href={`${buildPath("kontakt", locale)}#projekt`} variant="primary" size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={buildPath("leistungen", locale)} variant="glass" size="lg">
                {t.ctaSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
