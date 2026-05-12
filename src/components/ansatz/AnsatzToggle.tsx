"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Mode = "web" | "branding";

type Props = {
  web: ReactNode;
  branding: ReactNode;
  initial?: Mode;
  num?: string;
};

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  tabsLabel: string;
  tabWeb: string;
  tabBranding: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was ich nicht mache",
    h2pre: "kommt drauf an,",
    h2post: "was du brauchst.",
    intro: "Die No-Gos unterscheiden sich zwischen Web und Branding · manche überschneiden sich, manche nicht. Umschalten, was dich betrifft.",
    tabsLabel: "disziplin wählen",
    tabWeb: "web",
    tabBranding: "branding",
  },
  fr: {
    sectionLabel: "ce que je ne fais pas",
    h2pre: "ça dépend de",
    h2post: "ce dont tu as besoin.",
    intro: "Les no-gos diffèrent entre web et branding · certains se recoupent, d'autres non. Bascule selon ce qui te concerne.",
    tabsLabel: "choisir la discipline",
    tabWeb: "web",
    tabBranding: "branding",
  },
  en: {
    sectionLabel: "what i don't do",
    h2pre: "depends on",
    h2post: "what you need.",
    intro: "The no-gos differ between web and branding · some overlap, some don't. Switch to what concerns you.",
    tabsLabel: "choose discipline",
    tabWeb: "web",
    tabBranding: "branding",
  },
};

export function AnsatzToggle({
  web,
  branding,
  initial = "web",
  num = "03",
}: Props) {
  const [mode, setMode] = useState<Mode>(initial);
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <>
      <section className="pt-4 pb-10 md:pb-14">
        <div className="container-site">
          <div className="max-w-[760px]">
            <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
            <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.25rem)] text-offwhite leading-[1.05]">
              {t.h2pre}{" "}
              <span className="text-offwhite/35">{t.h2post}</span>
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed text-offwhite/55">
              {t.intro}
            </p>
          </div>

          <div className="mt-8 md:mt-10 flex items-center justify-center">
            <div
              role="tablist"
              aria-label={t.tabsLabel}
              className="inline-flex items-center gap-1 p-1 rounded-full border border-ink/10 bg-ink/[0.04]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === "web"}
                onClick={() => setMode("web")}
                className={cn(
                  "tactile-press font-mono text-[11px] uppercase tracking-mono px-5 py-2 rounded-full",
                  mode === "web"
                    ? "bg-lime text-[#111]"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                {t.tabWeb}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "branding"}
                onClick={() => setMode("branding")}
                className={cn(
                  "tactile-press font-mono text-[11px] uppercase tracking-mono px-5 py-2 rounded-full",
                  mode === "branding"
                    ? "bg-lime text-[#111]"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                {t.tabBranding}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={cn(mode === "web" ? "block" : "hidden")}>{web}</div>
      <div className={cn(mode === "branding" ? "block" : "hidden")}>
        {branding}
      </div>
    </>
  );
}
