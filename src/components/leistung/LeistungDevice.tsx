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

      {/* ═══ 2 · WAS DASTEHT · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="lab-display max-w-[16ch] text-display">{t.deliverH2}</h2>
          <p className="mt-7 max-w-[560px] text-body leading-relaxed text-[rgba(242,242,242,0.55)]">
            {t.deliverLead}
          </p>

          <div className="mt-14 grid gap-x-16 md:grid-cols-2">
            {t.deliver.map(([title, body]) => (
              <div key={title} className="lx-row">
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">{title}</h3>
                  <p className="mt-2 max-w-[46ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3 · DER FEATURE-VERGLEICH ═══ */}
      <section data-no-reveal className="relative px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[14ch] text-headline">{t.ballastH2}</h2>
            <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">{t.ballastLead}</p>
          </div>

          <FeatureVergleich t={t.vergleich} />
        </div>
      </section>

      {/* ═══ 4 · DER LIVE-EDITOR ═══ */}
      <section data-no-reveal className="relative px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[14ch] text-headline">{t.cmsH2}</h2>
            <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">{t.cmsLead}</p>
          </div>

          <LiveEditor t={t.editor} />
        </div>
      </section>

      {/* ═══ 5 · DER STACK · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="lab-display max-w-[14ch] text-headline">{t.stackH2}</h2>

          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {t.stack.map(([name, why]) => (
              <div key={name} className="lx-row" style={{ gridTemplateColumns: "8px minmax(0,1fr)" }}>
                <span
                  aria-hidden
                  className="mt-[7px] h-1.5 w-1.5 rounded-full"
                  style={{ background: "#e1fd52", boxShadow: "0 0 8px rgba(225,253,82,0.6)" }}
                />
                <div>
                  <h3 className="text-body font-medium tracking-[-0.01em] text-[#f2f2f2]">{name}</h3>
                  <p className="mt-1.5 max-w-[46ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                    {why}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-[620px] text-body leading-relaxed text-[rgba(242,242,242,0.72)]">
            {t.stackNote}
          </p>
        </div>
      </section>

      {/* ═══ 6 · FAQ · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-32 md:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <h2 className="lab-display self-start text-headline md:sticky md:top-28">{t.faqH2}</h2>

          <div>
            {t.faq.map(([q, a]) => (
              <details key={q} className="lx-faq">
                <summary>
                  <h3 className="text-body font-medium tracking-[-0.01em]">{q}</h3>
                  <span className="lx-faq-sign" aria-hidden />
                </summary>
                <p className="max-w-[62ch] pb-6 text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 7 · SCHLUSS ═══ */}
      <section data-no-reveal className="relative px-6 pb-40 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="lab-chassis relative flex flex-col justify-between gap-10 p-6 md:p-12 lg:flex-row lg:items-center">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[480px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-key-lime">
                {t.ctaPrimary}
              </Link>
              {/* gleiche bauhöhe wie die lime-taste · sonst sitzen die
                  beiden tasten auf verschiedenen ebenen */}
              <Link
                href={buildPath("preise", locale)}
                className="lab-key"
                style={{ width: "auto", padding: "12px 20px" }}
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
