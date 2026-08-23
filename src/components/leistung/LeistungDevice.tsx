"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { LensHero } from "@/components/leistung/LensHero";
import { FeatureVergleich } from "@/components/leistung/FeatureVergleich";
import { LiveEditor } from "@/components/leistung/LiveEditor";
import { LEISTUNG } from "@/components/leistung/leistung.dict";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/leistung/lens.css";
import "@/components/leistung/panel.css";

/**
 * LeistungDevice · die eine leistungs-seite. Löst /leistungen/web und
 * /leistungen/web/technik ab (tiefe 3 hat die technik-inhalte begraben).
 *
 * dosierung, wie überall: pro bildschirmhöhe EIN objekt zum anfassen,
 * dazwischen ruhige typo-strecken.
 *   lupe (hero) → ruhig → feature-vergleich → ruhig → live-editor → ruhig
 *
 * drei mal darf der besucher selbst was tun, und jedes mal beweist es
 * ein argument, statt es zu behaupten:
 *   lupe      → „ich kann das handwerk"   (design oben, technik drunter)
 *   vergleich → „deshalb bleibt es schnell"
 *   editor    → „du pflegst das selbst"
 */

export function LeistungDevice() {
  const locale = useLocale();
  const t = LEISTUNG[locale];

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />

      {/* ═══ 1 · DIE LUPE ═══ */}
      <LensHero t={t.hero} />

      {/* ═══ 2 · ContentCore gegen den plugin-stapel ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[14ch] text-headline">{t.ballastH2}</h2>
            <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">{t.ballastLead}</p>
          </div>

          <FeatureVergleich t={t.vergleich} />
        </div>
      </section>

      {/* ═══ 3 · das CMS, das man anfassen kann ═══ */}
      <section data-no-reveal className="relative px-gut py-rh-m">
        <div className="mx-auto max-w-shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[14ch] text-headline">{t.cmsH2}</h2>
            <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">{t.cmsLead}</p>
          </div>

          <LiveEditor t={t.editor} />
        </div>
      </section>

      {/* ═══ 4 · schluss ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="mx-auto max-w-shell">
          <div className="gl relative flex flex-col justify-between gap-10 p-8 md:p-14 lg:flex-row lg:items-center">

            <div className="max-w-[480px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-cta">
                {t.ctaPrimary}
              </Link>
              {/* gleiche bauhöhe wie die lime-taste · sonst sitzen die
                  beiden tasten auf verschiedenen ebenen */}
              <Link
                href={buildPath("leistung", locale)}
                className="lab-cta lab-cta--leise"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-[rgba(242,242,242,0.08)] pt-6">
            <span className="lab-label">© 2026 lacønis</span>
            <a className="lab-label" href="mailto:nicolas@laconis.be">
              nicolas@laconis.be
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
