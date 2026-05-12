import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { DeskScene } from "@/components/ueber-mich/DeskScene";
import { Werkstatt } from "@/components/home/Werkstatt";
import { StaerkenSection } from "@/components/ueber-mich/StaerkenSection";
import { getMeta } from "@/lib/seo/getMeta";
import { getLocale } from "@/i18n/getLocale";
import { buildPath, type Locale } from "@/i18n/config";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return getMeta("/ueber-mich");
}

const TOOLS = [
  { name: "next.js", kat: "stack" },
  { name: "react", kat: "stack" },
  { name: "tailwind", kat: "stack" },
  { name: "typescript", kat: "stack" },
  { name: "affinity designer", kat: "design" },
  { name: "procreate", kat: "design" },
  { name: "notion", kat: "ops" },
  { name: "linear", kat: "ops" },
];

type WerdegangItem = { jahr: string; titel: string; kurz: string };

type Dict = {
  sectionLabel: string;
  heroH1pre: string;
  heroH1accent: string;
  heroH1post: string;
  bio: string;
  ps: string;
  tags: string[];
  ctaHero: string;
  breakWoher: string;
  breakWerkzeug: string;
  werdegangLabel: string;
  werdegangH2: string;
  werdegang: WerdegangItem[];
  toolsLabel: string;
  toolsH2: string;
  toolsBody: string;
  finalH2: string;
  finalBody: string;
  finalPrimary: string;
  finalSecondary: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "über mich",
    heroH1pre: "hinter laconis steckt ",
    heroH1accent: "nur ich.",
    heroH1post: " und ich nehme das persönlich.",
    bio: "Nicolas Spies, 29. Designer und Web-Developer seit 2019 · seit 2026 vollzeit als laconis. Ich bau Marken und Websites, die sich nach den Leuten anfühlen, die dahinterstehen.",
    ps: "p.s. lakonisch · knapp gesagt, viel gemeint. daher der name.",
    tags: ["designer", "web-developer", "DE · FR · EN", "remote · überall"],
    ctaHero: "sag hallo →",
    breakWoher: "und wo ich herkomme ↓",
    breakWerkzeug: "was ich dabei nutze ↓",
    werdegangLabel: "werdegang",
    werdegangH2: "in kürze · keine drei-seiten-bio.",
    werdegang: [
      { jahr: "2019", titel: "erste website", kurz: "Für einen Freund eine WordPress-Seite gebastelt. Haken tief drinnen." },
      { jahr: "2021", titel: "nebenberuflich selbständig", kurz: "Erste echte Kunden. Die ersten „ich mach das für lau\"-Fehler." },
      { jahr: "2023", titel: "umzug auf next.js", kurz: "WordPress weg. Alles selbst gebaut. Nie mehr Plugin-Hölle." },
      { jahr: "2025", titel: "laconis als marke", kurz: "Aus „Nicolas macht Websites\" wird „laconis\". Name, Handschrift, Haltung." },
      { jahr: "2026", titel: "vollzeit", kurz: "Endlich. Nur noch laconis. Volle Konzentration." },
    ],
    toolsLabel: "werkzeug",
    toolsH2: "tools sind mittel, nicht sinn.",
    toolsBody: "Aber weil mich's jeder fragt · hier die aktuelle Palette. Wird sich in 2 Jahren wieder geändert haben.",
    finalH2: "soweit in kurz. lust auf ein gespräch?",
    finalBody: "Mehr über mich als über laconis? Auch okay. Ich mag Kaffee und ehrliche Gespräche.",
    finalPrimary: "kontakt aufnehmen →",
    finalSecondary: "meine arbeiten",
  },
  fr: {
    sectionLabel: "à propos",
    heroH1pre: "derrière laconis il n'y a ",
    heroH1accent: "que moi.",
    heroH1post: " et je le prends personnellement.",
    bio: "Nicolas Spies, 29 ans. Designer et développeur web depuis 2019 · à plein temps sous laconis depuis 2026. Je construis des marques et des sites qui ressemblent aux gens qui sont derrière.",
    ps: "p.s. laconique · peu de mots, beaucoup de sens. d'où le nom.",
    tags: ["designer", "développeur web", "DE · FR · EN", "remote · partout"],
    ctaHero: "dis bonjour →",
    breakWoher: "et d'où je viens ↓",
    breakWerkzeug: "et avec quoi je travaille ↓",
    werdegangLabel: "parcours",
    werdegangH2: "en bref · pas une bio de trois pages.",
    werdegang: [
      { jahr: "2019", titel: "premier site web", kurz: "Bricolé un site WordPress pour un ami. L'hameçon est resté planté." },
      { jahr: "2021", titel: "indépendant à côté", kurz: "Premiers vrais clients. Les premières erreurs « je le fais gratuit »." },
      { jahr: "2023", titel: "passage à next.js", kurz: "WordPress hors-jeu. Tout construit à la main. Fini l'enfer des plugins." },
      { jahr: "2025", titel: "laconis comme marque", kurz: "« Nicolas fait des sites » devient « laconis ». Nom, écriture, posture." },
      { jahr: "2026", titel: "temps plein", kurz: "Enfin. Plus que laconis. Concentration totale." },
    ],
    toolsLabel: "outils",
    toolsH2: "les outils sont des moyens, pas le but.",
    toolsBody: "Mais comme tout le monde me le demande · voici la palette actuelle. Aura changé d'ici 2 ans.",
    finalH2: "voilà pour le rapide. envie d'échanger ?",
    finalBody: "Plus sur moi que sur laconis ? Pas de souci. J'aime le café et les discussions franches.",
    finalPrimary: "prendre contact →",
    finalSecondary: "mes travaux",
  },
  en: {
    sectionLabel: "about",
    heroH1pre: "behind laconis it's ",
    heroH1accent: "just me.",
    heroH1post: " and i take that personally.",
    bio: "Nicolas Spies, 29. Designer and web developer since 2019 · full-time as laconis since 2026. I build brands and websites that feel like the people behind them.",
    ps: "p.s. laconic · few words, much meaning. hence the name.",
    tags: ["designer", "web developer", "DE · FR · EN", "remote · everywhere"],
    ctaHero: "say hi →",
    breakWoher: "and where i come from ↓",
    breakWerkzeug: "and what i use ↓",
    werdegangLabel: "path",
    werdegangH2: "in short · not a three-page bio.",
    werdegang: [
      { jahr: "2019", titel: "first website", kurz: "Built a WordPress site for a friend. Hook deeply set." },
      { jahr: "2021", titel: "freelance on the side", kurz: "First real clients. First \"i'll do it for free\" mistakes." },
      { jahr: "2023", titel: "moved to next.js", kurz: "WordPress gone. Built everything myself. No more plugin hell." },
      { jahr: "2025", titel: "laconis as a brand", kurz: "\"Nicolas makes websites\" became \"laconis\". Name, handwriting, posture." },
      { jahr: "2026", titel: "full-time", kurz: "Finally. Just laconis. Full focus." },
    ],
    toolsLabel: "tools",
    toolsH2: "tools are means, not the point.",
    toolsBody: "But since everyone asks · here's the current palette. Will have shifted again in 2 years.",
    finalH2: "that's it in short. up for a talk?",
    finalBody: "More about me than about laconis? Also fine. I like coffee and honest conversations.",
    finalPrimary: "get in touch →",
    finalSecondary: "my work",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      {/* HERO */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div className="container-site">
          <SectionLabel num="06">{t.sectionLabel}</SectionLabel>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 items-center">
            <div>
              <h1 className="heading-display text-[clamp(2.25rem,6vw,4.75rem)] text-offwhite leading-[1.05]">
                {t.heroH1pre}
                <span className="text-accent-ink">{t.heroH1accent}</span>
                <span className="text-offwhite/35">{t.heroH1post}</span>
              </h1>

              <p className="mt-8 max-w-[520px] text-[15px] md:text-[16px] leading-relaxed text-offwhite/55">
                {t.bio}
              </p>

              <p
                className="mt-5 max-w-[520px] text-accent-ink"
                style={{
                  fontFamily: "var(--font-caveat), cursive",
                  fontSize: "clamp(1.15rem, 1.6vw, 1.35rem)",
                  lineHeight: 1.25,
                  transform: "rotate(-1deg)",
                  transformOrigin: "left center",
                }}
              >
                {t.ps}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="mt-10">
                <Button
                  href={buildPath("kontakt", locale)}
                  variant="primary"
                  size="lg"
                  analyticsLabel="ueber_mich_hero_kontakt"
                >
                  {t.ctaHero}
                </Button>
              </div>
            </div>

            {/* right — portrait */}
            <div className="relative">
              <div
                className="portrait-stand relative mx-auto w-[280px] md:w-[320px] aspect-[3/4] rounded-md border border-ink/10 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]"
                style={{ transform: "rotate(-2deg)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="heading-display text-offwhite/20 text-[140px]"
                    style={{ letterSpacing: "-0.08em" }}
                  >
                    ns
                  </span>
                </div>
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-lime/50 rounded-[1px] rotate-[-3deg]" />
                <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                  nicolas · 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DeskScene />
      <Werkstatt />
      <StaerkenSection />

      <div className="container-site py-2">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(-1deg)" }}>
            {t.breakWoher}
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      {/* WERDEGANG */}
      <section className="pb-28 pt-8">
        <div className="container-site">
          <SectionLabel num="08">{t.werdegangLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite max-w-[720px]">
            {t.werdegangH2}
          </h2>

          <div className="mt-14 relative">
            <div className="absolute left-[56px] top-2 bottom-2 w-px bg-ink/10 hidden md:block" />

            <div className="space-y-8">
              {t.werdegang.map((w) => (
                <div
                  key={w.jahr}
                  className="grid md:grid-cols-[100px_1fr] gap-4 md:gap-8 items-start relative"
                >
                  <div className="relative">
                    <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                      {w.jahr}
                    </span>
                    <span className="absolute hidden md:block left-[52px] top-1 h-2 w-2 rounded-full bg-lime ring-4 ring-black" />
                  </div>
                  <div className="md:pl-4">
                    <h3 className="heading-sans text-[22px] text-offwhite">
                      {w.titel}
                    </h3>
                    <p className="mt-2 max-w-[560px] text-[14px] leading-relaxed text-offwhite/55">
                      {w.kurz}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-site py-2">
        <div className="flex items-center gap-6">
          <span className="h-px flex-1 bg-ink/10" />
          <p className="font-hand text-[19px] text-offwhite/30 shrink-0" style={{ transform: "rotate(0.7deg)" }}>
            {t.breakWerkzeug}
          </p>
          <span className="h-px flex-1 bg-ink/10" />
        </div>
      </div>

      {/* TOOLS */}
      <section className="pb-28 pt-8">
        <div className="container-site">
          <SectionLabel num="09">{t.toolsLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(1.75rem,4vw,3rem)] text-offwhite max-w-[720px]">
            {t.toolsH2}
          </h2>
          <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-offwhite/55">
            {t.toolsBody}
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className="flex items-baseline gap-2 px-3 py-2 rounded-full border border-ink/10 bg-ink/[0.015]"
              >
                <span className="font-mono text-[9px] uppercase tracking-label text-accent-ink/80">
                  {tool.kat}
                </span>
                <span className="font-mono text-[12px] text-offwhite">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-36">
        <div className="container-site">
          <div className="liquid-glass rounded-2xl p-10 md:p-16 text-center">
            <h2 className="heading-display text-[clamp(1.75rem,4.5vw,3rem)] text-offwhite max-w-[640px] mx-auto">
              {t.finalH2}
            </h2>
            <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-offwhite/55">
              {t.finalBody}
            </p>
            <div className="mt-8 flex justify-center gap-3 flex-wrap">
              <Button
                href={buildPath("kontakt", locale)}
                variant="primary"
                size="lg"
                analyticsLabel="ueber_mich_final_kontakt"
              >
                {t.finalPrimary}
              </Button>
              <Button
                href={buildPath("referenzen", locale)}
                variant="glass"
                size="lg"
                analyticsLabel="ueber_mich_final_referenzen"
              >
                {t.finalSecondary}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-label px-3 py-1.5 rounded-full border border-ink/10 bg-ink/[0.02] text-offwhite/55">
      {children}
    </span>
  );
}
