import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GreySection } from "@/components/shared/GreySection";
import { TiltCard } from "@/components/shared/TiltCard";
import { Marquee } from "@/components/shared/Marquee";
import { PriceCard } from "@/components/preise/PriceCard";
import { PreisExplorer } from "@/components/preise/PreisExplorer";
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
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  intro: string;
  factorsLabel: string;
  factorsHeadlinePre: string;
  factorsHeadlinePost: string;
  factorsIntro: string;
  faktoren: Faktor[];
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
  hostingHand: string;
  faqLabel: string;
  faqHeadline: string;
  faq: FaqItem[];
  marqueeBits: string[];
  ctaHand: string;
  ctaHeadlinePre: string;
  ctaHeadlinePost: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· investment",
    heroL1: "was kostet",
    heroL2: "das?",
    heroItalic: "eigentlich.",
    intro: "ehrliche antwort. kein paket-raster, keine sternchen. jedes projekt ist anders · deshalb gibt's hier keine tabelle, sondern eine erklärung, was den preis wirklich macht.",
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
    numbersLabel: "richtwerte",
    numbersHeadline: "und konkret?",
    numbersIntro: "keine fixpreise, aber ehrliche faustregeln · damit klar ist, worum's geht, bevor das gespräch losgeht.",
    websiteLabel: "website",
    websiteBody: "onepager mit klarem briefing und deinem content. mehrseitig mit CMS und branding zwischen 3.500 und 6.000.",
    websiteHand: "keine versteckten posten.",
    brandingLabel: "branding",
    brandingBody: "logo, farbwelt, typo, brand guide, visitenkarte. vollständiges branding-projekt · oder direkt mit website kombiniert.",
    brandingHand: "alles aus einer hand.",
    hostingLabel: "hosting · laufend",
    hostingBody: "nach dem launch: hosting, backup, kleine pflege. domain separat ca. 2 €/monat.",
    hostingHand: "klar und transparent.",
    faqLabel: "oft gefragt",
    faqHeadline: "bevor du fragst.",
    faq: [
      { frage: "wie geht's nach dem anfragen los?", antwort: "Ich melde mich innerhalb von 24 Std (werktags). Dann: 20–30 min Gespräch · was du brauchst, was realistisch ist, wo der einstieg liegt. Danach bekommst du ein konkretes Angebot, schriftlich und ohne Kleingedrucktes." },
      { frage: "wie lange dauert so ein projekt?", antwort: "Ein Onepager ca. 2 Wochen, ein Multipager 3–5 Wochen, Website + Branding zusammen 4–8 Wochen. Hängt stark vom Content-Tempo ab · je klarer dein Briefing und je schneller dein Feedback, desto schneller ist alles fertig. Wenn du eine harte Deadline hast, sag Bescheid · ich plane rückwärts." },
      { frage: "was ist nicht enthalten?", antwort: "Stock-Fotos, Premium-Fonts und externe Tools mit eigenen Lizenzkosten liegen beim Kunden, es sei denn das war vorher besprochen. Domain-Registrierung ist optional. Alles, was über den besprochenen Scope hinausgeht, klär ich vor dem Start · keine Überraschungen auf der Rechnung." },
      { frage: "läuft nach dem launch noch was?", antwort: "Hosting, Backups und kleine Pflege · je nach Setup 20–50 €/Monat. Domain separat, ca. 2 €/Monat je nach TLD. Das erklär ich dir im Gespräch ganz konkret, damit du weißt, womit du langfristig rechnest." },
    ],
    marqueeBits: ["·", "ab 1.500 €", "·", "onepager", "·", "ab 1.200 €", "·", "branding", "·", "ab 3.500 €", "·", "komplett-paket", "·"],
    ctaHand: "kurze frage, klare antwort.",
    ctaHeadlinePre: "ich sag dir innerhalb von 24 std, ",
    ctaHeadlinePost: "wo wir stehen.",
    ctaBody: "schreib mir kurz, was du vorhast · kostenlos, unverbindlich. kein formular-chaos. einfach ein gespräch.",
    ctaPrimary: "projekt besprechen →",
    ctaSecondary: "leistungen ansehen",
  },
  fr: {
    kicker: "· investissement",
    heroL1: "ça coûte",
    heroL2: "combien?",
    heroItalic: "en vrai.",
    intro: "réponse honnête. pas de grille forfaitaire, pas d'astérisques. chaque projet est différent · donc pas de tableau ici, mais une explication de ce qui fait vraiment le prix.",
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
    numbersLabel: "fourchettes",
    numbersHeadline: "et concrètement ?",
    numbersIntro: "pas de prix fixes, mais des règles honnêtes · pour que ce soit clair avant que le premier appel commence.",
    websiteLabel: "site web",
    websiteBody: "onepage avec brief clair et ton propre contenu. multi-pages avec CMS et branding entre 3 500 et 6 000.",
    websiteHand: "pas de coûts cachés.",
    brandingLabel: "branding",
    brandingBody: "logo, palette, typo, brand guide, carte de visite. projet branding complet · ou directement combiné au site.",
    brandingHand: "tout d'une même main.",
    hostingLabel: "hébergement · récurrent",
    hostingBody: "après le lancement : hébergement, sauvegarde, petite maintenance. domaine à part env. 2 €/mois.",
    hostingHand: "clair et transparent.",
    faqLabel: "souvent demandé",
    faqHeadline: "avant que tu demandes.",
    faq: [
      { frage: "comment ça se passe après la demande ?", antwort: "Je te réponds dans les 24h (en semaine). Ensuite : 20–30 min d'échange · ce dont tu as besoin, ce qui est réaliste, où on commence. Puis tu reçois une offre concrète, par écrit et sans petits caractères." },
      { frage: "combien de temps dure un projet ?", antwort: "Un onepage environ 2 semaines, un multi-pages 3–5 semaines, site + branding ensemble 4–8 semaines. Ça dépend beaucoup du rythme du contenu · plus ton brief est clair et ton feedback rapide, plus tout est prêt vite. Si tu as une deadline serrée, dis-le · je planifie à rebours." },
      { frage: "qu'est-ce qui n'est pas inclus ?", antwort: "Les photos stock, les fonts premium et les outils externes avec leurs propres licences sont à la charge du client, sauf accord préalable. L'enregistrement du domaine est optionnel. Tout ce qui dépasse le scope discuté, je le clarifie avant le démarrage · pas de surprises sur la facture." },
      { frage: "il y a quelque chose qui tourne après le launch ?", antwort: "Hébergement, sauvegardes et petite maintenance · selon le setup 20–50 €/mois. Domaine à part, environ 2 €/mois selon le TLD. Je t'explique ça concrètement en discussion, pour que tu saches sur quoi tu comptes à long terme." },
    ],
    marqueeBits: ["·", "dès 1 500 €", "·", "onepage", "·", "dès 1 200 €", "·", "branding", "·", "dès 3 500 €", "·", "pack complet", "·"],
    ctaHand: "question courte, réponse claire.",
    ctaHeadlinePre: "je te dis en 24h, ",
    ctaHeadlinePost: "où on en est.",
    ctaBody: "écris-moi brièvement ce que tu prévois · gratuit, sans engagement. pas de chaos de formulaire. juste une discussion.",
    ctaPrimary: "discuter du projet →",
    ctaSecondary: "voir les services",
  },
  en: {
    kicker: "· investment",
    heroL1: "what does",
    heroL2: "it cost?",
    heroItalic: "actually.",
    intro: "honest answer. no package grid, no asterisks. every project is different · so no table here, but an explanation of what really drives the price.",
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
    numbersLabel: "ranges",
    numbersHeadline: "and concretely?",
    numbersIntro: "no fixed prices, but honest rules of thumb · so it's clear what we're talking about before the conversation starts.",
    websiteLabel: "website",
    websiteBody: "onepager with clear brief and your own content. multi-page with CMS and branding between 3,500 and 6,000.",
    websiteHand: "no hidden line items.",
    brandingLabel: "branding",
    brandingBody: "logo, colour palette, typography, brand guide, business card. full branding project · or combined directly with the website.",
    brandingHand: "all from one hand.",
    hostingLabel: "hosting · recurring",
    hostingBody: "after launch: hosting, backup, small maintenance. domain separate, around 2 €/month.",
    hostingHand: "clear and transparent.",
    faqLabel: "often asked",
    faqHeadline: "before you ask.",
    faq: [
      { frage: "what happens after the inquiry?", antwort: "I get back to you within 24h (weekdays). Then: 20–30 min talk · what you need, what's realistic, where we start. After that you get a concrete written offer, no small print." },
      { frage: "how long does a project take?", antwort: "A onepager about 2 weeks, a multi-page 3–5 weeks, website + branding together 4–8 weeks. Heavily depends on content pace · the clearer your brief and faster your feedback, the sooner it's done. If you have a hard deadline, tell me · I plan backwards." },
      { frage: "what's not included?", antwort: "Stock photos, premium fonts and external tools with their own licence costs are on the client, unless agreed otherwise. Domain registration is optional. Anything beyond the agreed scope I clarify before starting · no surprises on the invoice." },
      { frage: "does anything keep running after launch?", antwort: "Hosting, backups and small maintenance · depending on setup €20–50/month. Domain separate, around €2/month depending on TLD. I explain that concretely in the conversation, so you know what to plan for long-term." },
    ],
    marqueeBits: ["·", "from 1,500 €", "·", "onepager", "·", "from 1,200 €", "·", "branding", "·", "from 3,500 €", "·", "complete pack", "·"],
    ctaHand: "short question, clear answer.",
    ctaHeadlinePre: "i'll tell you within 24h, ",
    ctaHeadlinePost: "where we stand.",
    ctaBody: "write me briefly what you're planning · free, no obligation. no form chaos. just a conversation.",
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
          { name: "preise", url: `${BASE}${buildPath("preise", locale)}` },
        ]}
      />
      <FAQSchema items={t.faq.map((f) => ({ q: f.frage, a: f.antwort }))} />

      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2}
        italicAccent={t.heroItalic}
        sub={t.intro}
      />

      {/* RICHTWERTE · 3 tilt-cards mit animierten preis-countern */}
      <GreySection tint="lime">
        <div className="max-w-[820px]">
          <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            · {t.numbersLabel}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,6vw,4rem)] leading-[0.95] font-black tracking-[-0.04em] text-[#0a0a0a] lowercase">
            {t.numbersHeadline}
          </h2>
          <p className="mt-5 max-w-[620px] text-[15px] leading-relaxed text-[#0a0a0a]/75">
            {t.numbersIntro}
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <PriceCard
            label={t.websiteLabel}
            fromPrice={1500}
            toPrice={6000}
            desc={t.websiteBody}
            hand={t.websiteHand}
            preset="lime"
          />
          <PriceCard
            label={t.brandingLabel}
            fromPrice={1200}
            toPrice={5000}
            desc={t.brandingBody}
            hand={t.brandingHand}
            preset="lila"
          />
          <PriceCard
            label={t.hostingLabel}
            fromPrice={20}
            toPrice={50}
            desc={t.hostingBody}
            hand={t.hostingHand}
            preset="dark"
          />
        </div>
      </GreySection>

      {/* PreisExplorer · interaktiv */}
      <GreySection tone="grey">
        <PreisExplorer />
      </GreySection>

      {/* FAKTOREN · sticky linke seite + ol rechts · gleicher pattern wie alt aber neu styled */}
      <GreySection tone="grey" tint="lila">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
              · {t.factorsLabel}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
              {t.factorsHeadlinePre}
              <span className="opacity-50">{t.factorsHeadlinePost}</span>
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-[#0a0a0a]/70 max-w-[320px]">
              {t.factorsIntro}
            </p>
          </div>

          <ol className="space-y-3">
            {t.faktoren.map((f, idx) => (
              <li key={f.num}>
                <TiltCard
                  preset={idx % 2 === 0 ? "paper" : "ink"}
                  intensity={6}
                >
                  <div className="p-7 md:p-8 grid grid-cols-[auto_1fr] gap-5">
                    <span
                      className="font-mono text-[11px] uppercase tracking-label pt-1 tabular-nums"
                      style={{ opacity: 0.6 }}
                    >
                      {f.num}
                    </span>
                    <div>
                      <h3 className="text-[clamp(1.2rem,2.2vw,1.6rem)] font-black tracking-[-0.025em] leading-tight lowercase">
                        {f.titel}
                      </h3>
                      <p
                        className="mt-3 text-[14px] md:text-[15px] leading-relaxed"
                        style={{ opacity: 0.78 }}
                      >
                        {f.text}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ol>
        </div>
      </GreySection>

      <Marquee items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={40} />

      {/* FAQ */}
      <GreySection tone="grey">
        <div className="max-w-[820px]">
          <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            · {t.faqLabel}
          </p>
          <h2 className="mt-4 text-[clamp(2rem,5.5vw,3.5rem)] leading-[1.0] font-black tracking-[-0.04em] text-[#0a0a0a] lowercase">
            {t.faqHeadline}
          </h2>
        </div>

        <div className="mt-12 divide-y divide-[#0a0a0a]/12 border-y border-[#0a0a0a]/12 max-w-[820px]">
          {t.faq.map((q) => (
            <details key={q.frage} className="group py-6 cursor-pointer">
              <summary className="flex items-center justify-between gap-4 list-none">
                <h3 className="text-[17px] md:text-[19px] font-black tracking-[-0.02em] text-[#0a0a0a] group-hover:text-[#b084d3] transition-colors lowercase leading-tight">
                  {q.frage}
                </h3>
                <span className="font-mono text-[16px] text-[#0a0a0a]/55 group-open:rotate-45 transition-transform shrink-0">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[680px] text-[14px] leading-relaxed text-[#0a0a0a]/75">
                {q.antwort}
              </p>
            </details>
          ))}
        </div>
      </GreySection>

      {/* CTA · lila slab im stil home SplitStatement */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "#b084d3" }}
        aria-label={t.ctaHeadlinePre}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
          }}
        />
        <div className="container-site relative">
          <p
            className="font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/65 mb-6"
            style={{ transform: "rotate(-0.5deg)" }}
          >
            {t.ctaHand}
          </p>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[820px]">
            {t.ctaHeadlinePre}
            <span className="opacity-55">{t.ctaHeadlinePost}</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-[#0a0a0a]/80">
            {t.ctaBody}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={`${buildPath("kontakt", locale)}#projekt`}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("leistungen/web", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
