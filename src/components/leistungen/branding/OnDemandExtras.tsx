"use client";

import { useState } from "react";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Kat = {
  key: string;
  label: string;
  icon: React.ReactNode;
  items: string[];
};

type Dict = {
  headlinePre: string;
  headlineItalic: string;
  headlinePost: string;
  asideL1: string;
  asideL2: string;
  digitalLabel: string;
  printLabel: string;
  digitalItems: string[];
  printItems: string[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    headlinePre: "einzeln ",
    headlineItalic: "zubuchbar",
    headlinePost: ".",
    asideL1: "und sicher noch vieles mehr · was mir gerade nicht einfällt.",
    asideL2: "du hast als kunde bestimmt krassere ideen als ich · raus damit.",
    digitalLabel: "digitales",
    printLabel: "drucksachen",
    digitalItems: ["erweiterter brand guide", "social-templates", "banner · ads", "newsletter-header", "präsentationen", "icons · piktogramme", "infografiken"],
    printItems: ["erweiterter brand guide", "flyer", "broschüre", "plakat", "roll-up", "speisekarte", "aufkleber", "visitenkarten-nachdruck"],
  },
  fr: {
    headlinePre: "à la ",
    headlineItalic: "carte",
    headlinePost: ".",
    asideL1: "et sûrement bien d'autres choses · qui me viennent pas là maintenant.",
    asideL2: "en tant que client t'as sûrement des idées plus folles que moi · balance.",
    digitalLabel: "digital",
    printLabel: "imprimés",
    digitalItems: ["brand guide étendu", "templates social", "bannières · ads", "header newsletter", "présentations", "icônes · pictogrammes", "infographies"],
    printItems: ["brand guide étendu", "flyer", "brochure", "affiche", "roll-up", "menu", "stickers", "réimpression cartes de visite"],
  },
  en: {
    headlinePre: "à la ",
    headlineItalic: "carte",
    headlinePost: ".",
    asideL1: "and definitely a lot more · stuff that's not coming to me right now.",
    asideL2: "as a client you've probably got wilder ideas than me · let them out.",
    digitalLabel: "digital",
    printLabel: "print",
    digitalItems: ["extended brand guide", "social templates", "banners · ads", "newsletter header", "presentations", "icons · pictograms", "infographics"],
    printItems: ["extended brand guide", "flyer", "brochure", "poster", "roll-up", "menu", "stickers", "business card reprint"],
  },
};

const ICONS = {
  digital: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M9 20 L15 20 M12 17 L12 20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
      <path d="M7 3 L17 3 L17 21 L7 21 Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M10 7 L14 7 M10 11 L14 11 M10 15 L13 15" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />
    </svg>
  ),
};

export function OnDemandExtras() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  const KATEGORIEN: Kat[] = [
    { key: "digital", label: t.digitalLabel, icon: ICONS.digital, items: t.digitalItems },
    { key: "print", label: t.printLabel, icon: ICONS.print, items: t.printItems },
  ];

  const [active, setActive] = useState<string>(KATEGORIEN[0].key);
  const current = KATEGORIEN.find((k) => k.key === active) ?? KATEGORIEN[0];

  return (
    <section className="pb-32 pt-8 md:pt-10">
      <div className="container-site">
        <h3 className="heading-display text-[clamp(1.25rem,2.5vw,1.6rem)] text-offwhite leading-[1.15] text-center">
          {t.headlinePre}
          <span className="font-hand text-accent-ink">{t.headlineItalic}</span>
          {t.headlinePost}
        </h3>

        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            className="flex gap-1 border-b border-ink/20"
          >
            {KATEGORIEN.map((k) => {
              const isActive = k.key === active;
              return (
                <button
                  key={k.key}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(k.key)}
                  className={[
                    "relative inline-flex items-center gap-2 px-4 py-3 font-mono text-[12px] transition-colors",
                    isActive ? "text-accent-ink" : "text-offwhite/45 hover:text-offwhite/85",
                  ].join(" ")}
                >
                  <span className={isActive ? "text-accent-ink" : "text-offwhite/35"}>
                    {k.icon}
                  </span>
                  <span>{k.label}</span>
                  <span
                    className={[
                      "font-mono text-[10px]",
                      isActive ? "text-accent-ink/55" : "text-offwhite/25",
                    ].join(" ")}
                  >
                    · {k.items.length}
                  </span>

                  <span
                    aria-hidden
                    className={[
                      "absolute left-0 right-0 -bottom-px h-[2px] transition-transform origin-center",
                      isActive ? "bg-lime scale-x-100" : "bg-lime scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 mx-auto max-w-[720px]">
          <div className="flex flex-wrap items-start justify-center gap-2 min-h-[88px]">
            {current.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-ink/25 bg-ink/[0.035] font-mono text-[12px] text-offwhite/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-10 mx-auto max-w-[640px] text-center font-hand text-[18px] md:text-[20px] leading-snug text-offwhite/55 -rotate-[0.8deg]">
          {t.asideL1}
          <br />
          <span className="text-offwhite/80">
            {t.asideL2}
          </span>
        </p>
      </div>
    </section>
  );
}
