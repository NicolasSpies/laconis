"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * WebDeliverables · drei versprechen als papierstapel.
 * zahlen hinter den karten, ragen als ecken raus · keine content-überlappung.
 * handmade-vibe: echte papier-stapel-logik, karten sind opak (liquid-glass-dark).
 */

type Corner = "tl" | "tc" | "tr";

type Promise = {
  num: string;
  titel: string;
  kurz: string;
  icon: React.ReactNode;
  rotate: string;
  corner: Corner;
  numRotate: string;
  offset?: string;
};

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
    intro: "Keine 47-Punkt-Feature-Liste · das hier ist der Kern. Den Rest (Hosting-Details, CMS-Architektur, Technik-Tiefkram) spar ich mir hier · liegt drüben für die, die's genauer wissen wollen.",
    versprechenLabel: "versprechen",
    bridgePre: "und wenn du's ",
    bridgeAccent: "genauer",
    bridgePost: " wissen willst?",
    bridgeCta: "alle technik-details →",
    promises: [
      { num: "01", titel: "die seite", kurz: "Schnell genug, dass niemand den Tab vorher schließt · Pagespeed 95+, sauberes SEO, lesbar auch auf dem Uralt-Samsung deiner Tante. Barrierefrei, ohne dass du daran denken musst." },
      { num: "02", titel: "dein zugang", kurz: "Pflegen ohne WordPress-Hölle · mit ContentCore, meinem eigenen CMS. Keine 47 Plugins, kein rotes Update-Fenster im Dashboard. Eine Einweisung, dann läufst du selbst." },
      { num: "03", titel: "für immer deins", kurz: "Der Code gehört dir · keine Abo-Falle, kein Vendor-Lock, kein monatlicher Mietzins ans Silicon Valley. Wenn du mich eines Tages nicht mehr brauchst, nimmst du einfach alles mit." },
    ],
  },
  fr: {
    sectionLabel: "ce que tu reçois",
    h2pre: "trois promesses.",
    h2post: "tenables, pas embrouillées.",
    intro: "Pas de liste de 47 fonctionnalités · voilà l'essentiel. Le reste (détails d'hébergement, architecture CMS, fin du fond technique) je le garde pour ailleurs · pour ceux qui veulent savoir plus précisément.",
    versprechenLabel: "promesse",
    bridgePre: "et si tu veux savoir ",
    bridgeAccent: "plus précisément",
    bridgePost: " ?",
    bridgeCta: "tous les détails techniques →",
    promises: [
      { num: "01", titel: "le site", kurz: "Assez rapide pour que personne ne ferme l'onglet avant · Pagespeed 95+, SEO propre, lisible aussi sur le vieux Samsung de ta tante. Accessible, sans que tu y penses." },
      { num: "02", titel: "ton accès", kurz: "Gérer sans l'enfer WordPress · avec ContentCore, mon CMS maison. Pas 47 plugins, pas de fenêtre update rouge dans le dashboard. Une formation, puis tu pilotes seul." },
      { num: "03", titel: "à toi pour toujours", kurz: "Le code t'appartient · pas de piège d'abonnement, pas de vendor-lock, pas de loyer mensuel à la Silicon Valley. Si un jour tu n'as plus besoin de moi, tu prends tout avec toi." },
    ],
  },
  en: {
    sectionLabel: "what you get",
    h2pre: "three promises.",
    h2post: "deliverable, not vague.",
    intro: "No 47-point feature list · this is the core. The rest (hosting details, CMS architecture, deep tech) i'll spare you here · it's over there for those who want to know the specifics.",
    versprechenLabel: "promise",
    bridgePre: "and if you want to know the ",
    bridgeAccent: "specifics",
    bridgePost: "?",
    bridgeCta: "all the tech details →",
    promises: [
      { num: "01", titel: "the site", kurz: "Fast enough that nobody closes the tab first · Pagespeed 95+, clean SEO, readable even on your aunt's ancient Samsung. Accessible, without you having to think about it." },
      { num: "02", titel: "your access", kurz: "Maintain it without WordPress hell · with ContentCore, my own CMS. No 47 plugins, no red update window in the dashboard. One training session, then you run it yourself." },
      { num: "03", titel: "yours forever", kurz: "The code belongs to you · no subscription trap, no vendor lock-in, no monthly rent to Silicon Valley. The day you don't need me anymore, you just take everything with you." },
    ],
  },
};

const ICONS: React.ReactNode[] = [
  <svg key="0" viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
    <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 17 L42 17" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="13" cy="13.5" r="0.9" fill="currentColor" />
    <circle cx="16" cy="13.5" r="0.9" fill="currentColor" />
    <path d="M12 24 L22 24 M12 28 L30 28 M12 32 L24 32" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>,
  <svg key="1" viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
    <circle cx="16" cy="24" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="24" r="1.8" fill="currentColor" />
    <path d="M22 24 L40 24 M34 24 L34 29 M38 24 L38 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="2" viewBox="0 0 48 48" className="w-8 h-8" fill="none" aria-hidden>
    <path d="M8 14 L20 14 L23 18 L40 18 L40 36 L8 36 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 24 L34 24 M14 28 L30 28" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>,
];

const PROMISE_META: Pick<Promise, "rotate" | "corner" | "numRotate" | "offset">[] = [
  { rotate: "-1.6deg", corner: "tl", numRotate: "-10deg", offset: "md:mt-0" },
  { rotate: "1.2deg", corner: "tc", numRotate: "4deg", offset: "md:mt-8" },
  { rotate: "-0.8deg", corner: "tr", numRotate: "8deg", offset: "md:mt-3" },
];

const OUTLINE_STYLE = {
  WebkitTextStroke: "1.5px currentColor",
  WebkitTextFillColor: "transparent",
} as const;

const CORNER_ANCHOR: Record<Corner, string> = {
  tl: "top-0 left-0",
  tc: "top-0 left-1/2",
  tr: "top-0 right-0",
};
const CORNER_TRANSLATE: Record<Corner, string> = {
  tl: "translate(-45%, -65%)",
  tc: "translate(-50%, -75%)",
  tr: "translate(45%, -65%)",
};

export function WebDeliverables({ num = "05" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="relative pb-8 md:pb-10 overflow-hidden">
      <div className="container-site">
        <div className="max-w-[760px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05]">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">
              {t.h2post}
            </span>
          </h2>
          <p className="mt-6 max-w-[600px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
          {t.promises.map((p, idx) => {
            const meta = PROMISE_META[idx];
            return (
              <div
                key={p.num}
                className={[
                  "relative group",
                  idx > 0 ? "md:-ml-4" : "",
                  meta.offset ?? "",
                ].join(" ")}
                style={{ zIndex: 10 + idx }}
              >
                <span
                  aria-hidden
                  className={[
                    "heading-display block absolute select-none pointer-events-none z-0",
                    "text-[clamp(5.5rem,10vw,7.5rem)] leading-[0.82] text-offwhite/30",
                    CORNER_ANCHOR[meta.corner],
                  ].join(" ")}
                  style={{
                    ...OUTLINE_STYLE,
                    transform: `${CORNER_TRANSLATE[meta.corner]} rotate(${meta.numRotate})`,
                  }}
                >
                  {p.num}
                </span>

                <article
                  className="relative z-10 liquid-glass-dark rounded-2xl p-7 md:p-8 transition-all duration-500 ease-out group-hover:!rotate-0 group-hover:-translate-y-1 group-hover:border-lime/50"
                  style={{ transform: `rotate(${meta.rotate})` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                      {t.versprechenLabel} · {p.num}
                    </span>
                    <span className="text-accent-ink">{ICONS[idx]}</span>
                  </div>
                  <h3 className="heading-sans mt-5 text-[clamp(1.3rem,2vw,1.55rem)] text-offwhite leading-tight">
                    {p.titel}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-offwhite/75">
                    {p.kurz}
                  </p>
                </article>
              </div>
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
        {t.bridgePre}<span className="text-accent-ink">{t.bridgeAccent}</span>{t.bridgePost}
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
      <Button href={buildPath("leistungen/web/technik", locale)} variant="primary" size="sm">
        {t.bridgeCta}
      </Button>
    </div>
  );
}
