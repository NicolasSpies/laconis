"use client";

import { ProcessSteps } from "@/components/leistungen/web/ProcessSteps";
import { WEB_ABLAUF } from "@/data/web-ablauf";
import { useLocale, pick } from "@/i18n/useLocale";

/**
 * WebAblauf · die 4 projekt-schritte als storyboard (umgezogen von /ansatz).
 *
 * sitzt direkt nach WebApproaches ("neu von null") · so hat jeder weg
 * seinen ablauf: neubau = diese 4 schritte, übernahme = die 5 in
 * WebUebernahme. id="ablauf" ist das anker-ziel der home-bento-kachel
 * "vier schritte" (via HashScroll).
 */
export function WebAblauf() {
  const locale = useLocale();
  const t = pick(WEB_ABLAUF, locale);

  return (
    <section id="ablauf" className="relative py-20 md:py-28 overflow-hidden scroll-mt-24">
      <div className="container-site relative">
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.75rem)] leading-[1] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase max-w-[680px]">
          {t.h2}
        </h2>
        <div className="mt-14">
          <ProcessSteps steps={t.steps} label={t.label} />
        </div>
      </div>
    </section>
  );
}
