"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * WebDeliverables · drei versprechen als big colored slabs.
 * jeder slab full-width, in brand-color, mit großer number daneben.
 * alternierendes layout (number rechts/links/rechts) für visuelle rhythm.
 */

type PromiseCopy = { num: string; titel: string; kurz: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  versprechenLabel: string;
  bridgePre: string;
  bridgeAccent: string;
  bridgePost: string;
  bridgeCta: string;
  promises: PromiseCopy[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was du bekommst",
    h2pre: "drei versprechen.",
    h2post: "einlösbar, nicht verschwurbelt.",
    intro:
      "Keine 47-Punkt-Feature-Liste · das hier ist der Kern. Den Rest (Hosting-Details, CMS-Architektur, Technik-Tiefkram) spar ich mir hier · liegt drüben für die, die's genauer wissen wollen.",
    versprechenLabel: "versprechen",
    bridgePre: "und wenn du's ",
    bridgeAccent: "genauer",
    bridgePost: " wissen willst?",
    bridgeCta: "alle technik-details →",
    promises: [
      {
        num: "01",
        titel: "die seite",
        kurz: "Schnell genug, dass niemand den Tab vorher schließt · Pagespeed 95+, sauberes SEO, lesbar auch auf dem Uralt-Samsung deiner Tante. Barrierefrei, ohne dass du daran denken musst.",
      },
      {
        num: "02",
        titel: "dein zugang",
        kurz: "Pflegen ohne WordPress-Hölle · mit ContentCore, meinem eigenen CMS. Keine 47 Plugins, kein rotes Update-Fenster im Dashboard. Eine Einweisung, dann läufst du selbst.",
      },
      {
        num: "03",
        titel: "für immer deins",
        kurz: "Der Code gehört dir · keine Abo-Falle, kein Vendor-Lock, kein monatlicher Mietzins ans Silicon Valley. Wenn du mich eines Tages nicht mehr brauchst, nimmst du einfach alles mit.",
      },
    ],
  },
  fr: {
    sectionLabel: "ce que tu reçois",
    h2pre: "trois promesses.",
    h2post: "tenables, pas embrouillées.",
    intro:
      "Pas de liste de 47 fonctionnalités · voilà l'essentiel. Le reste (détails d'hébergement, architecture CMS, fin du fond technique) je le garde pour ailleurs · pour ceux qui veulent savoir plus précisément.",
    versprechenLabel: "promesse",
    bridgePre: "et si tu veux savoir ",
    bridgeAccent: "plus précisément",
    bridgePost: " ?",
    bridgeCta: "tous les détails techniques →",
    promises: [
      {
        num: "01",
        titel: "le site",
        kurz: "Assez rapide pour que personne ne ferme l'onglet avant · Pagespeed 95+, SEO propre, lisible aussi sur le vieux Samsung de ta tante. Accessible, sans que tu y penses.",
      },
      {
        num: "02",
        titel: "ton accès",
        kurz: "Gérer sans l'enfer WordPress · avec ContentCore, mon CMS maison. Pas 47 plugins, pas de fenêtre update rouge dans le dashboard. Une formation, puis tu pilotes seul.",
      },
      {
        num: "03",
        titel: "à toi pour toujours",
        kurz: "Le code t'appartient · pas de piège d'abonnement, pas de vendor-lock, pas de loyer mensuel à la Silicon Valley. Si un jour tu n'as plus besoin de moi, tu prends tout avec toi.",
      },
    ],
  },
  en: {
    sectionLabel: "what you get",
    h2pre: "three promises.",
    h2post: "deliverable, not vague.",
    intro:
      "No 47-point feature list · this is the core. The rest (hosting details, CMS architecture, deep tech) i'll spare you here · it's over there for those who want to know the specifics.",
    versprechenLabel: "promise",
    bridgePre: "and if you want to know the ",
    bridgeAccent: "specifics",
    bridgePost: "?",
    bridgeCta: "all the tech details →",
    promises: [
      {
        num: "01",
        titel: "the site",
        kurz: "Fast enough that nobody closes the tab first · Pagespeed 95+, clean SEO, readable even on your aunt's ancient Samsung. Accessible, without you having to think about it.",
      },
      {
        num: "02",
        titel: "your access",
        kurz: "Maintain it without WordPress hell · with ContentCore, my own CMS. No 47 plugins, no red update window in the dashboard. One training session, then you run it yourself.",
      },
      {
        num: "03",
        titel: "yours forever",
        kurz: "The code belongs to you · no subscription trap, no vendor lock-in, no monthly rent to Silicon Valley. The day you don't need me anymore, you just take everything with you.",
      },
    ],
  },
};

type SlabStyle = {
  bg: string;
  fg: string;
  labelColor: string;
  numColor: string;
  numOpacity: number;
  numAlign: "right" | "left";
};

const SLAB_STYLES: SlabStyle[] = [
  // 01 · LIME
  {
    bg: "#e1fd52",
    fg: "#0a0a0a",
    labelColor: "rgba(10,10,10,0.7)",
    numColor: "#0a0a0a",
    numOpacity: 0.12,
    numAlign: "right",
  },
  // 02 · DARK mit lime number
  {
    bg: "#0a0a0a",
    fg: "#f2f2f2",
    labelColor: "rgba(225,253,82,0.8)",
    numColor: "#e1fd52",
    numOpacity: 0.18,
    numAlign: "left",
  },
  // 03 · LILA mit dark number
  {
    bg: "#b084d3",
    fg: "#0a0a0a",
    labelColor: "rgba(10,10,10,0.7)",
    numColor: "#0a0a0a",
    numOpacity: 0.14,
    numAlign: "right",
  },
];

export function WebDeliverables({ num = "05" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="relative py-12 md:py-16 overflow-hidden">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            {t.h2pre}{" "}
            <span className="text-offwhite/45">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/70">
            {t.intro}
          </p>
        </div>

        {/* 3 big slabs · jeder mit brand-color + big number daneben */}
        <div className="mt-16 md:mt-20 space-y-4 md:space-y-6">
          {t.promises.map((p, idx) => {
            const s = SLAB_STYLES[idx];
            const numRight = s.numAlign === "right";
            return (
              <article
                key={p.num}
                className="relative rounded-2xl overflow-hidden p-8 md:p-12 lg:p-16 transition-transform duration-500 hover:-translate-y-1"
                style={{ background: s.bg, color: s.fg }}
              >
                <div
                  className={`flex flex-col ${
                    numRight ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-6 md:gap-12`}
                >
                  {/* content */}
                  <div className="flex-1 max-w-[640px]">
                    <span
                      className="font-mono text-[10px] uppercase tracking-label"
                      style={{ color: s.labelColor }}
                    >
                      {t.versprechenLabel} · {p.num}
                    </span>
                    <h3 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-black leading-[1] tracking-[-0.03em]">
                      {p.titel}
                    </h3>
                    <p
                      className="mt-5 text-[14px] md:text-[15px] leading-relaxed"
                      style={{ opacity: 0.85 }}
                    >
                      {p.kurz}
                    </p>
                  </div>
                  {/* big number */}
                  <div className="shrink-0 self-stretch md:self-center flex items-center">
                    <span
                      aria-hidden
                      className="block font-black leading-[0.82]"
                      style={{
                        fontSize: "clamp(6rem, 13vw, 13rem)",
                        color: s.numColor,
                        opacity: s.numOpacity,
                        letterSpacing: "-0.05em",
                      }}
                    >
                      {p.num}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <TechnikBridge t={t} locale={locale} />
      </div>
    </section>
  );
}

function TechnikBridge({ t, locale }: { t: Dict; locale: Locale }) {
  return (
    <div className="mt-16 md:mt-20 relative flex flex-col items-center gap-3">
      <span className="font-hand text-[22px] md:text-[24px] text-offwhite/85 -rotate-2 leading-tight">
        {t.bridgePre}
        <span className="text-accent-ink">{t.bridgeAccent}</span>
        {t.bridgePost}
      </span>
      <svg
        width="74"
        height="88"
        viewBox="0 0 74 88"
        fill="none"
        aria-hidden
        className="text-offwhite/55"
      >
        <path
          d="M38 2 C 44 16, 28 28, 36 42 C 44 56, 28 64, 38 80"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M31 72 L38 82 L46 72"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <Button
        href={buildPath("leistungen/web/technik", locale)}
        variant="primary"
        size="sm"
      >
        {t.bridgeCta}
      </Button>
    </div>
  );
}
