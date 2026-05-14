import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { GreySection } from "@/components/shared/GreySection";
import { TiltCard } from "@/components/shared/TiltCard";
import { Marquee } from "@/components/shared/Marquee";
import { Werdegang } from "@/components/ueber-mich/Werdegang";
import { Button } from "@/components/ui/Button";
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
  marqueeBits: string[];
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
    kicker: "· über mich",
    heroL1: "ein mensch.",
    heroL2: "kein team.",
    heroItalic: "persönlich.",
    bio: "Nicolas Spies, 29. designer und web-developer seit 2019 · seit 2026 vollzeit als laconis. ich bau marken und websites, die sich nach den leuten anfühlen, die dahinterstehen.",
    ps: "p.s. lakonisch · knapp gesagt, viel gemeint. daher der name.",
    tags: ["designer", "web-developer", "DE · FR · EN", "remote · überall"],
    ctaHero: "sag hallo →",
    quote: "die besten brands kommen nicht von agenturen mit 40 leuten. sie kommen von einer person, die zuhört.",
    quoteFrom: "— meine arbeitsthese",
    marqueeBits: ["·", "ein mensch", "·", "kein team", "·", "ø < 2h antwort", "·", "solo studio", "·", "eupen", "·"],
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
    toolsBody: "aber weil mich's jeder fragt · hier die aktuelle palette. wird sich in 2 jahren wieder geändert haben.",
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
    bio: "Nicolas Spies, 29 ans. designer et développeur web depuis 2019 · à plein temps sous laconis depuis 2026. je construis des marques et des sites qui ressemblent aux gens qui sont derrière.",
    ps: "p.s. laconique · peu de mots, beaucoup de sens. d'où le nom.",
    tags: ["designer", "développeur web", "DE · FR · EN", "remote · partout"],
    ctaHero: "dis bonjour →",
    quote: "les meilleures marques ne viennent pas d'agences à 40 personnes. elles viennent d'une personne qui écoute.",
    quoteFrom: "— ma thèse de travail",
    marqueeBits: ["·", "un humain", "·", "pas d'équipe", "·", "ø < 2h réponse", "·", "solo studio", "·", "eupen", "·"],
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
    toolsBody: "mais comme tout le monde me le demande · voici la palette actuelle. aura changé d'ici 2 ans.",
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
    bio: "Nicolas Spies, 29. designer and web developer since 2019 · full-time as laconis since 2026. i build brands and websites that feel like the people behind them.",
    ps: "p.s. laconic · few words, much meaning. hence the name.",
    tags: ["designer", "web developer", "DE · FR · EN", "remote · everywhere"],
    ctaHero: "say hi →",
    quote: "the best brands don't come from 40-person agencies. they come from one person who listens.",
    quoteFrom: "— my working thesis",
    marqueeBits: ["·", "one human", "·", "no team", "·", "ø < 2h reply", "·", "solo studio", "·", "eupen", "·"],
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
    toolsBody: "but since everyone asks · here's the current palette. will have shifted again in 2 years.",
    finalH2: "that's it in short. up for a talk?",
    finalBody: "more about me than about laconis? also fine. i like coffee and honest conversations.",
    finalPrimary: "get in touch →",
    finalSecondary: "my work",
  },
};

export default function Page() {
  const locale = getLocale();
  const t = DICT[locale];

  return (
    <>
      {/* HERO · grey · big personal headline + portrait card right */}
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

      {/* Big serif quote-block · personal statement */}
      <GreySection tint="lila">
        <div className="max-w-[1100px]">
          <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            · these
          </span>
          <p
            className="mt-6 text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05] text-[#0a0a0a]"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: "-0.015em",
            }}
          >
            „{t.quote}"
          </p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/55">
            {t.quoteFrom}
          </p>
        </div>
      </GreySection>

      <Marquee items={t.marqueeBits} bg="#0a0a0a" fg="#e1fd52" speed={40} />

      {/* WERDEGANG · scroll-fill timeline · lila fillt sich von oben nach unten */}
      <GreySection tone="grey">
        <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
          · {t.werdegangLabel}
        </p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[720px]">
          {t.werdegangH2}
        </h2>

        <div className="mt-14">
          <Werdegang items={t.werdegang} />
        </div>
      </GreySection>

      {/* TOOLS · tilt-card mit chips */}
      <GreySection tone="grey" tint="lime">
        <div className="max-w-[820px]">
          <p className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
            · {t.toolsLabel}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
            {t.toolsH2}
          </h2>
          <p className="mt-4 max-w-[580px] text-[14px] leading-relaxed text-[#0a0a0a]/75">
            {t.toolsBody}
          </p>
        </div>

        <div className="mt-10">
          <TiltCard preset="paper" intensity={6}>
            <div className="p-8 md:p-10 flex flex-wrap gap-2.5">
              {TOOLS.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-baseline gap-2 px-3 py-2 rounded-full border border-[#0a0a0a]/15 bg-[#0a0a0a]/[0.03]"
                >
                  <span className="font-mono text-[9px] uppercase tracking-label text-[#b084d3]">
                    {tool.kat}
                  </span>
                  <span className="font-mono text-[12px] text-[#0a0a0a]">
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </GreySection>

      {/* CTA · closing */}
      <GreySection tone="grey">
        <div className="text-center max-w-[820px] mx-auto">
          <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
            {t.finalH2}
          </h2>
          <p className="mt-5 max-w-[480px] mx-auto text-[14px] leading-relaxed text-[#0a0a0a]/75">
            {t.finalBody}
          </p>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link
              href={buildPath("kontakt", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
            >
              {t.finalPrimary}
            </Link>
            <Link
              href={buildPath("referenzen", locale)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full border-2 border-[#b084d3] text-[#0a0a0a] hover:bg-[#b084d3] hover:text-[#0a0a0a] transition-colors"
            >
              {t.finalSecondary}
            </Link>
          </div>
        </div>
      </GreySection>
    </>
  );
}

function PortraitCard() {
  return (
    <div
      className="relative mx-auto w-[280px] md:w-[320px] aspect-[3/4] rounded-md border border-[#0a0a0a]/15 overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.4)]"
      style={{
        transform: "rotate(-2deg)",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(176,132,211,0.18) 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-[140px] font-black text-[#0a0a0a]/15"
          style={{ letterSpacing: "-0.08em" }}
        >
          ns
        </span>
      </div>
      {/* tape on top */}
      <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#e1fd52]/70 rounded-[1px] rotate-[-3deg]" />
      <div className="absolute bottom-3 left-3 right-3 font-mono text-[9px] uppercase tracking-label text-[#0a0a0a]/65">
        nicolas · 2026
      </div>
    </div>
  );
}
