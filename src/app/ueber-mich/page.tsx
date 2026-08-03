import { PageHero } from "@/components/shared/PageHero";
import { GreySection } from "@/components/shared/GreySection";
import { LimeCta } from "@/components/shared/LimeCta";
import { Werdegang } from "@/components/ueber-mich/Werdegang";
import { PortraitCard } from "@/components/ueber-mich/PortraitCard";
import { BrandValues } from "@/components/ueber-mich/BrandValues";
import { Button } from "@/components/ui/Button";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ueber-mich");
}

type WerdegangItem = { jahr: string; titel: string; kurz: string };

type Dict = {
  kicker: string;
  heroL1: string;
  heroL2: string;
  heroItalic: string;
  bio: string;
  ps: string;
  tags: string[];
  ctaHero: string;
  quote: string;
  quoteFrom: string;
  /** das eine wort der these, das im dark-room lime + lila-unterstrich kriegt */
  quoteHighlight: string;
  werdegangLabel: string;
  werdegangH2: string;
  werdegang: WerdegangItem[];
  finalH2: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· über mich",
    heroL1: "ein mensch.",
    heroL2: "kein team.",
    heroItalic: "persönlich.",
    bio: "Nicolas Spies, 29. designer und web-developer seit 2019 · seit 2026 vollzeit als laconis. ich bau websites, die sich nach den leuten anfühlen, die dahinterstehen.",
    ps: "p.s. lakonisch · knapp gesagt, viel gemeint. daher der name.",
    tags: ["designer", "web-developer", "DE · FR · EN", "remote · überall"],
    ctaHero: "sag hallo →",
    quote: "die besten brands kommen nicht von agenturen mit 40 leuten. sie kommen von einer person, die zuhört.",
    quoteFrom: "— meine arbeitsthese",
    quoteHighlight: "zuhört",
    werdegangLabel: "werdegang",
    werdegangH2: "in kürze · keine drei-seiten-bio.",
    werdegang: [
      { jahr: "2019", titel: "erste website", kurz: "Für einen Freund eine WordPress-Seite gebastelt. Haken tief drinnen." },
      { jahr: "2021", titel: "nebenberuflich selbständig", kurz: "Erste echte Kunden. Die ersten „ich mach das für lau\"-Fehler." },
      { jahr: "2023", titel: "umzug auf next.js", kurz: "WordPress weg. Alles selbst gebaut. Nie mehr Plugin-Hölle." },
      { jahr: "2025", titel: "laconis als marke", kurz: "Aus „Nicolas macht Websites\" wird „laconis\". Name, Handschrift, Haltung." },
      { jahr: "2026", titel: "vollzeit", kurz: "Endlich. Nur noch laconis. Volle Konzentration." },
    ],
    finalH2: "soweit in kurz. lust auf ein gespräch?",
    finalBody: "mehr über mich als über laconis? auch okay. ich mag kaffee und ehrliche gespräche.",
    finalPrimary: "kontakt aufnehmen →",
    finalSecondary: "meine arbeiten",
  },
  fr: {
    kicker: "· à propos",
    heroL1: "un humain.",
    heroL2: "pas une équipe.",
    heroItalic: "personnellement.",
    bio: "Nicolas Spies, 29 ans. designer et développeur web depuis 2019 · à plein temps sous laconis depuis 2026. je construis des sites qui ressemblent aux gens qui sont derrière.",
    ps: "p.s. laconique · peu de mots, beaucoup de sens. d'où le nom.",
    tags: ["designer", "développeur web", "DE · FR · EN", "remote · partout"],
    ctaHero: "dis bonjour →",
    quote: "les meilleures marques ne viennent pas d'agences à 40 personnes. elles viennent d'une personne qui écoute.",
    quoteFrom: "— ma thèse de travail",
    quoteHighlight: "écoute",
    werdegangLabel: "parcours",
    werdegangH2: "en bref · pas une bio de trois pages.",
    werdegang: [
      { jahr: "2019", titel: "premier site web", kurz: "Bricolé un site WordPress pour un ami. L'hameçon est resté planté." },
      { jahr: "2021", titel: "indépendant à côté", kurz: "Premiers vrais clients. Les premières erreurs « je le fais gratuit »." },
      { jahr: "2023", titel: "passage à next.js", kurz: "WordPress hors-jeu. Tout construit à la main. Fini l'enfer des plugins." },
      { jahr: "2025", titel: "laconis comme marque", kurz: "« Nicolas fait des sites » devient « laconis ». Nom, écriture, posture." },
      { jahr: "2026", titel: "temps plein", kurz: "Enfin. Plus que laconis. Concentration totale." },
    ],
    finalH2: "voilà pour le rapide. envie d'échanger ?",
    finalBody: "plus sur moi que sur laconis ? pas de souci. j'aime le café et les discussions franches.",
    finalPrimary: "prendre contact →",
    finalSecondary: "mes travaux",
  },
  en: {
    kicker: "· about",
    heroL1: "one person.",
    heroL2: "not a team.",
    heroItalic: "personally.",
    bio: "Nicolas Spies, 29. designer and web developer since 2019 · full-time as laconis since 2026. i build websites that feel like the people behind them.",
    ps: "p.s. laconic · few words, much meaning. hence the name.",
    tags: ["designer", "web developer", "DE · FR · EN", "remote · everywhere"],
    ctaHero: "say hi →",
    quote: "the best brands don't come from 40-person agencies. they come from one person who listens.",
    quoteFrom: "— my working thesis",
    quoteHighlight: "listens",
    werdegangLabel: "path",
    werdegangH2: "in short · not a three-page bio.",
    werdegang: [
      { jahr: "2019", titel: "first website", kurz: "Built a WordPress site for a friend. Hook deeply set." },
      { jahr: "2021", titel: "freelance on the side", kurz: "First real clients. First \"i'll do it for free\" mistakes." },
      { jahr: "2023", titel: "moved to next.js", kurz: "WordPress gone. Built everything myself. No more plugin hell." },
      { jahr: "2025", titel: "laconis as a brand", kurz: "\"Nicolas makes websites\" became \"laconis\". Name, handwriting, posture." },
      { jahr: "2026", titel: "full-time", kurz: "Finally. Just laconis. Full focus." },
    ],
    finalH2: "that's it in short. up for a talk?",
    finalBody: "more about me than about laconis? also fine. i like coffee and honest conversations.",
    finalPrimary: "get in touch →",
    finalSecondary: "my work",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];
  /* these-quote für den dark-room splitten · ein wort wird lime + lila-strich */
  const [qpre, qpost = ""] = t.quote.split(t.quoteHighlight);

  return (
    <>
      {/* HERO · grey · big personal headline */}
      <PageHero
        kicker={t.kicker}
        line1={t.heroL1}
        line2={t.heroL2}
        italicAccent={t.heroItalic}
        sub={
          <>
            <span>{t.bio}</span>
            <span
              className="mt-5 block"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                lineHeight: 1.25,
                color: "#0a0a0a",
                transform: "rotate(-1deg)",
                transformOrigin: "left center",
              }}
            >
              {t.ps}
            </span>
          </>
        }
        visual={<PortraitCard />}
        visualInteractive
      >
        <div className="flex flex-wrap gap-2 mb-7">
          {t.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full border border-[#0a0a0a]/20 bg-[#0a0a0a]/[0.04] text-[#0a0a0a]/75"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button
          href={buildPath("kontakt", locale)}
          variant="primary"
          size="lg"
          analyticsLabel="ueber_mich_hero_kontakt"
        >
          {t.ctaHero}
        </Button>
      </PageHero>

      {/* THESE · dark-room · die persönliche arbeitsthese (früh, nach hero).
          ein wort lime + lila-unterstrich · quote in offwhite */}
      <GreySection tone="dark">
        <div className="max-w-[1100px]">
          <p
            className="mt-6 text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] text-[#f2f2f2]"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontWeight: 400,
              letterSpacing: "-0.015em",
            }}
          >
            „{qpre}
            <span
              style={{
                color: "#e1fd52",
                textDecoration: "underline",
                textDecorationColor: "#b084d3",
                textDecorationThickness: "3px",
                textUnderlineOffset: "0.1em",
              }}
            >
              {t.quoteHighlight}
            </span>
            {qpost}"
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-label text-[#f2f2f2]/55">
            {t.quoteFrom}
          </p>
        </div>
      </GreySection>

      {/* HALTUNG · 4-wort-anker tief·klar·ruhig·dein (umgezogen von /ansatz ·
          haltung gehört zur person) */}
      <BrandValues />

      {/* WERDEGANG · plain papier (war fake-grey) */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container-site relative">
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[720px]">
            {t.werdegangH2}
          </h2>

          <div className="mt-14">
            <Werdegang items={t.werdegang} />
          </div>
        </div>
      </section>

      {/* CTA · sitewide lime-flood sign-off (war grey) */}
      <LimeCta
        ariaLabel={t.finalH2}
        h2={t.finalH2}
        body={t.finalBody}
        primaryLabel={t.finalPrimary}
        primaryHref={buildPath("kontakt", locale)}
        secondaryLabel={t.finalSecondary}
        secondaryHref={buildPath("referenzen", locale)}
      />
    </>
  );
}

