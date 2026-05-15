import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PageHero } from "@/components/shared/PageHero";
import { Marquee } from "@/components/shared/Marquee";
import { BrandSystemHero } from "@/components/leistungen/branding/BrandSystemHero";
import { BrandDesk } from "@/components/leistungen/branding/BrandDesk";
import { SpecimenKartei } from "@/components/leistungen/branding/SpecimenKartei";
import { BrandingBento } from "@/components/leistungen/branding/BrandingBento";
import { BrandCase } from "@/components/leistungen/branding/BrandCase";
import { BrandVsAlternatives } from "@/components/leistungen/branding/BrandVsAlternatives";
import { StaerkenStrip } from "@/components/shared/StaerkenStrip";
import { ScribbleBreak } from "@/components/shared/ScribbleBreak";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/leistungen/branding");
}

const BASE = "https://laconis.be";

type Service = { name: string; description: string; minPrice: number; serviceType: string };
type FaqItem = { frage: string; antwort: string };

type Dict = {
  sectionLabel: string;
  heroH1pre: string;
  heroH1accent: string;
  heroH1post: string;
  heroBody: string;
  heroSubBody: string;
  stat1Label: string; stat1Value: string;
  stat2Label: string; stat2Value: string;
  stat3Label: string; stat3Value: string;
  breakLook: string;
  breakCase: string;
  breakHonest: string;
  breakFAQ: string;
  ansatzLinkLabel: string;
  ansatzLinkBody: string;
  ansatzLinkCta: string;
  preiseLinkLabel: string;
  preiseLinkBody: string;
  preiseLinkCta: string;
  faqLabel: string;
  faqH2: string;
  ctaMarginalia: string;
  ctaH2pre: string;
  ctaH2post: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaSignature: string;
  services: Service[];
  faq: FaqItem[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "leistungen · branding",
    heroH1pre: "logo, brand & ",
    heroH1accent: "alles drum herum",
    heroH1post: ".",
    heroBody: "ein logo allein ist noch keine marke. logo + typografie + farben + ton + einheitlicher auftritt auf visitenkarte, social und schaufenster · das ist eine marke. beides kommt von mir · handgemacht.",
    heroSubBody: "branding für startups, handwerker, kleine unternehmen · auch einfach nur ein logo, wenn du damit starten willst.",
    stat1Label: "varianten", stat1Value: "3 – 5",
    stat2Label: "gehört dir", stat2Value: "immer",
    stat3Label: "halbwertszeit", stat3Value: "5+ j.",
    breakLook: "und so sieht's aus ↓",
    breakCase: "ein echter kunde dazu ↓",
    breakHonest: "und mal ehrlich ↓",
    breakFAQ: "bevor du fragst ↓",
    ansatzLinkLabel: "wie ich arbeite",
    ansatzLinkBody: "vier skizzen vom ersten gespräch bis zur übergabe · und was ich bewusst nicht mache.",
    ansatzLinkCta: "ansatz ansehen →",
    preiseLinkLabel: "was es kostet",
    preiseLinkBody: "ehrliche faustregeln statt paket-tabelle · damit du weißt woran du bist.",
    preiseLinkCta: "preise ansehen →",
    faqLabel: "oft gefragt",
    faqH2: "bevor du fragst.",
    ctaMarginalia: "kurz & ehrlich ↘",
    ctaH2pre: "erzähl mir, was du machst · ",
    ctaH2post: "ich sag dir wie man's sichtbar macht.",
    ctaBody: "kein pitch-deck, kein agentur-talk. ein erstes gespräch · 20 minuten · schaust ob's passt. kostet nichts.",
    ctaPrimary: "kontakt aufnehmen →",
    ctaSecondary: "referenzen ansehen",
    ctaSignature: "— nicolas",
    services: [
      { name: "Logo Design", description: "Logo inklusive Varianten + Favicon, Farbpalette, Typografie · der Grundstein einer Marke. Ideal für Neugründer und Selbständige, die sauber starten wollen.", minPrice: 800, serviceType: "Logo Design" },
      { name: "Brand Identity · Komplett", description: "Logo, Brand Guide, Visitenkarte, Briefpapier, Social-Templates · alles in einer Linie, druckreif und digital-ready. Für Marken, die mehr als ein Logo wollen.", minPrice: 1200, serviceType: "Brand Identity" },
      { name: "Brand System · für wachsende Marken", description: "Vollständiges Brand-System mit Bild- und Textrichtlinien, Mood-Direction, Print-Package, Packaging-Templates · für KMU und etablierte Unternehmen.", minPrice: 2800, serviceType: "Brand System" },
    ],
    faq: [
      { frage: "was kostet ein logo bei dir?", antwort: "Ein Logo allein startet ab 800 €. Eine vollständige Brand Identity (Logo + Brand Guide + Visitenkarte + Social-Templates) beginnt ab 1.200 €. Größere Brand-Systeme mit Bildwelt, Print-Package und Packaging zwischen 2.800 und 5.000 €. Keine Paket-Tabelle, jede Marke ist anders." },
      { frage: "wie lange dauert ein branding-projekt?", antwort: "Ein Logo allein 2–3 Wochen, eine vollständige Brand Identity 4–6 Wochen. Hängt vom Feedback-Tempo ab. Recherche, Moodboards und 2 Richtungen kommen in Woche 1–2, danach Verfeinerung und Umsetzung." },
      { frage: "wie viele logo-vorschläge bekomme ich?", antwort: "Zwei Richtungen, nicht 27. Lieber tiefer als breiter · jede Richtung ist durchdacht und visuell stimmig, statt einer wahllosen Auswahl. Eine wird gewählt, dann iterier ich, bis sie sitzt." },
      { frage: "was ist im brand guide enthalten?", antwort: "Logo-Varianten und Schutzraum, Farbpalette (Primär + Sekundär + Hex/CMYK/Pantone), Typografie-Hierarchie (Display, Sans, Mono), Bildsprache, Tonalität und Anwendungsbeispiele. PDF-Dokument, übergeben mit Quelldateien." },
      { frage: "machst du auch nur ein logo · ohne den ganzen rest?", antwort: "Ja. Wenn du nur ein Logo brauchst um zu starten, kein Problem. Aber: ein Logo allein ist noch keine Marke. Wenn später Visitenkarte, Social-Posts oder Schaufenster dazukommen, brauchst du ein System, damit alles stimmig bleibt." },
      { frage: "kann ich später noch ergänzen?", antwort: "Ja. Wenn ich die Marke von Anfang an mitgebaut habe, kenne ich die Regeln dahinter. Broschüre, Roll-up, Speisekarte, Fahrzeugbeschriftung kommen später dazu · alles passt zusammen, weil ich die Linie im Kopf habe." },
    ],
  },
  fr: {
    sectionLabel: "services · branding",
    heroH1pre: "logo, marque & ",
    heroH1accent: "tout ce qui va autour",
    heroH1post: ".",
    heroBody: "un logo seul ne fait pas une marque. logo + typographie + couleurs + ton + cohérence sur carte de visite, social et vitrine · ça c'est une marque. tout vient de moi · fait main.",
    heroSubBody: "branding pour startups, artisans, petites entreprises · ou simplement un logo si tu veux démarrer comme ça.",
    stat1Label: "variantes", stat1Value: "3 – 5",
    stat2Label: "t'appartient", stat2Value: "toujours",
    stat3Label: "durée de vie", stat3Value: "5+ ans",
    breakLook: "et voilà à quoi ça ressemble ↓",
    breakCase: "un vrai client en plus ↓",
    breakHonest: "et franchement ↓",
    breakFAQ: "avant que tu demandes ↓",
    ansatzLinkLabel: "comment je travaille",
    ansatzLinkBody: "quatre croquis de la première discussion à la livraison · et ce que je ne fais volontairement pas.",
    ansatzLinkCta: "voir l'approche →",
    preiseLinkLabel: "ce que ça coûte",
    preiseLinkBody: "des règles honnêtes plutôt qu'une grille forfaitaire · pour que tu saches à quoi t'en tenir.",
    preiseLinkCta: "voir les prix →",
    faqLabel: "souvent demandé",
    faqH2: "avant que tu demandes.",
    ctaMarginalia: "court & honnête ↘",
    ctaH2pre: "raconte-moi ce que tu fais · ",
    ctaH2post: "je te dis comment le rendre visible.",
    ctaBody: "pas de pitch-deck, pas de discours d'agence. un premier échange · 20 minutes · tu regardes si ça colle. ça ne coûte rien.",
    ctaPrimary: "prendre contact →",
    ctaSecondary: "voir les références",
    ctaSignature: "— nicolas",
    services: [
      { name: "Design Logo", description: "Logo avec variantes + favicon, palette de couleurs, typographie · la pierre angulaire d'une marque. Idéal pour créateurs et indépendants qui veulent partir proprement.", minPrice: 800, serviceType: "Logo Design" },
      { name: "Identité de Marque · Complète", description: "Logo, brand guide, carte de visite, papier en-tête, templates social · tout sur la même ligne, prêt pour l'impression et le digital. Pour les marques qui veulent plus qu'un logo.", minPrice: 1200, serviceType: "Brand Identity" },
      { name: "Système de Marque · pour marques en croissance", description: "Système complet avec règles image et texte, direction d'ambiance, pack print, templates packaging · pour PME et entreprises établies.", minPrice: 2800, serviceType: "Brand System" },
    ],
    faq: [
      { frage: "ça coûte combien un logo chez toi ?", antwort: "Un logo seul démarre à 800 €. Une identité de marque complète (logo + brand guide + carte de visite + templates social) à partir de 1 200 €. Systèmes plus grands avec univers visuel, pack print et packaging entre 2 800 et 5 000 €. Pas de grille, chaque marque est différente." },
      { frage: "combien de temps prend un projet branding ?", antwort: "Un logo seul 2–3 semaines, une identité complète 4–6 semaines. Dépend du rythme du feedback. Recherche, moodboards et 2 directions en semaine 1–2, puis raffinement et mise en œuvre." },
      { frage: "je reçois combien de propositions de logo ?", antwort: "Deux directions, pas 27. Plutôt aller en profondeur qu'en largeur · chaque direction est pensée et visuellement cohérente, plutôt qu'un assortiment au hasard. Une est choisie, ensuite je l'itère jusqu'à ce qu'elle tienne." },
      { frage: "qu'est-ce qu'il y a dans le brand guide ?", antwort: "Variantes de logo et zone de protection, palette (primaire + secondaire + Hex/CMYK/Pantone), hiérarchie typographique (display, sans, mono), univers visuel, tonalité et exemples d'usage. Document PDF, livré avec les fichiers sources." },
      { frage: "tu fais aussi juste un logo · sans tout le reste ?", antwort: "Oui. Si tu n'as besoin que d'un logo pour démarrer, pas de souci. Mais : un logo seul n'est pas une marque. Quand carte de visite, posts social ou vitrine arriveront plus tard, il te faudra un système pour que tout reste cohérent." },
      { frage: "je peux compléter plus tard ?", antwort: "Oui. Quand j'ai construit la marque depuis le début, je connais les règles derrière. Brochure, roll-up, carte de menu, marquage véhicule arrivent plus tard · tout colle, parce que j'ai la ligne en tête." },
    ],
  },
  en: {
    sectionLabel: "services · branding",
    heroH1pre: "logo, brand & ",
    heroH1accent: "everything around it",
    heroH1post: ".",
    heroBody: "a logo alone isn't a brand. logo + typography + colours + tone + consistent presence on business card, social and shopfront · that's a brand. it all comes from me · made by hand.",
    heroSubBody: "branding for startups, makers, small businesses · or just a logo if that's where you want to start.",
    stat1Label: "variants", stat1Value: "3 – 5",
    stat2Label: "yours", stat2Value: "always",
    stat3Label: "half-life", stat3Value: "5+ y.",
    breakLook: "and here's what it looks like ↓",
    breakCase: "a real client too ↓",
    breakHonest: "honestly ↓",
    breakFAQ: "before you ask ↓",
    ansatzLinkLabel: "how i work",
    ansatzLinkBody: "four sketches from first conversation to handover · and what i deliberately don't do.",
    ansatzLinkCta: "see approach →",
    preiseLinkLabel: "what it costs",
    preiseLinkBody: "honest rules of thumb instead of a package grid · so you know where you stand.",
    preiseLinkCta: "see pricing →",
    faqLabel: "often asked",
    faqH2: "before you ask.",
    ctaMarginalia: "short & honest ↘",
    ctaH2pre: "tell me what you do · ",
    ctaH2post: "i'll tell you how to make it visible.",
    ctaBody: "no pitch deck, no agency talk. a first conversation · 20 minutes · see if it fits. costs nothing.",
    ctaPrimary: "get in touch →",
    ctaSecondary: "see work",
    ctaSignature: "— nicolas",
    services: [
      { name: "Logo Design", description: "Logo with variants + favicon, colour palette, typography · the foundation of a brand. Ideal for founders and freelancers who want to start cleanly.", minPrice: 800, serviceType: "Logo Design" },
      { name: "Brand Identity · Complete", description: "Logo, brand guide, business card, letterhead, social templates · all in one line, print-ready and digital-ready. For brands that want more than a logo.", minPrice: 1200, serviceType: "Brand Identity" },
      { name: "Brand System · for growing brands", description: "Full brand system with image and text guidelines, mood direction, print pack, packaging templates · for SMBs and established companies.", minPrice: 2800, serviceType: "Brand System" },
    ],
    faq: [
      { frage: "what does a logo cost?", antwort: "A logo alone starts at €800. A full brand identity (logo + brand guide + business card + social templates) from €1,200. Larger brand systems with image world, print pack and packaging between €2,800 and €5,000. No package grid, every brand is different." },
      { frage: "how long does a branding project take?", antwort: "A logo alone 2–3 weeks, full brand identity 4–6 weeks. Depends on feedback pace. Research, moodboards and 2 directions in week 1–2, then refinement and execution." },
      { frage: "how many logo proposals do i get?", antwort: "Two directions, not 27. Better to go deep than wide · each direction is thought through and visually coherent, instead of a random pile. One is picked, then i iterate until it sits." },
      { frage: "what's in the brand guide?", antwort: "Logo variants and clear space, colour palette (primary + secondary + Hex/CMYK/Pantone), typography hierarchy (display, sans, mono), imagery, tone and usage examples. PDF document, handed over with source files." },
      { frage: "do you do just a logo · without the rest?", antwort: "Yes. If you only need a logo to get started, no problem. But: a logo alone isn't a brand. When business card, social posts or shopfront come later, you'll need a system to keep everything coherent." },
      { frage: "can i add to it later?", antwort: "Yes. When i built the brand from the start, i know the rules behind it. Brochure, roll-up, menu card, vehicle wrap come later · everything fits, because i have the line in my head." },
    ],
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
          { name: "leistungen", url: `${BASE}${buildPath("leistungen", locale)}` },
          { name: "branding", url: `${BASE}${buildPath("leistungen/branding", locale)}` },
        ]}
      />
      <ServiceSchema services={t.services} />
      <FAQSchema items={t.faq.map((f) => ({ q: f.frage, a: f.antwort }))} />

      {/* HERO · grey im neuen stil · italic-lila auf accent-word */}
      <PageHero
        kicker={`· ${t.sectionLabel}`}
        line1={t.heroH1pre.replace(/\s+$/, "")}
        italicAccent={`${t.heroH1accent}${t.heroH1post}`}
        sub={
          <>
            <span>{t.heroBody}</span>
            <span className="mt-4 block text-[14px] leading-relaxed text-[#0a0a0a]/55">
              {t.heroSubBody}
            </span>
          </>
        }
        visual={<BrandSystemHero />}
      />

      <Marquee
        items={[
          "·",
          "logo",
          "·",
          "brand guide",
          "·",
          "typo",
          "·",
          "farbe",
          "·",
          "print",
          "·",
          "social",
          "·",
        ]}
        bg="#0a0a0a"
        fg="#b084d3"
        speed={45}
      />

      <StaerkenStrip />
      <BrandDesk num="02" />
      <ScribbleBreak text={t.breakLook} rotate={-1} />
      <SpecimenKartei num="03" />
      <BrandingBento num="04" />
      <ScribbleBreak text={t.breakCase} rotate={-0.8} flip />
      <BrandCase num="05" />
      <ScribbleBreak text={t.breakHonest} rotate={0.8} />
      <BrandVsAlternatives num="06" />

      <section className="pb-20">
        <div className="container-site">
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={buildPath("ansatz", locale)}
              className="group block glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">{t.ansatzLinkLabel}</span>
              <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">{t.ansatzLinkBody}</p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-label text-accent-ink">{t.ansatzLinkCta}</span>
            </Link>
            <Link
              href={buildPath("preise", locale)}
              className="group block glass rounded-xl px-6 py-5 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">{t.preiseLinkLabel}</span>
              <p className="mt-1.5 text-[14px] text-offwhite/75 group-hover:text-offwhite transition-colors">{t.preiseLinkBody}</p>
              <span className="mt-3 inline-block font-mono text-[11px] uppercase tracking-label text-accent-ink">{t.preiseLinkCta}</span>
            </Link>
          </div>
        </div>
      </section>

      <ScribbleBreak text={t.breakFAQ} rotate={0.8} flip />

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

      {/* CTA · lila slab im home-stil */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "#b084d3", color: "#0a0a0a" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.14] pointer-events-none"
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
            {t.ctaMarginalia}
          </p>
          <h2 className="text-[clamp(2rem,5.5vw,4rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[820px]">
            {t.ctaH2pre}
            <span className="opacity-50">{t.ctaH2post}</span>
          </h2>
          <p className="mt-8 max-w-[560px] text-[15px] leading-relaxed text-[#0a0a0a]/80">
            {t.ctaBody}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.ctaPrimary}
            </Link>
            <Link
              href={buildPath("referenzen", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#e1fd52] transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
          <p
            className="mt-10 text-[16px] text-[#0a0a0a]/75"
            style={{ fontFamily: "var(--font-caveat), cursive", transform: "rotate(-1deg)" }}
          >
            {t.ctaSignature}
          </p>
        </div>
      </section>
    </>
  );
}
