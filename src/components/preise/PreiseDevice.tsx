"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { HeroAtmo } from "@/components/device/HeroAtmo";
import { PriceCaliper } from "@/components/preise/PriceCaliper";
import { Zaehler } from "@/components/preise/Zaehler";
import { PREISE } from "@/components/preise/preise.dict";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/preise/caliper.css";

/**
 * PreiseDevice · die preis-seite als messinstrument.
 *
 * ein geräte-moment (der messschieber), danach nur noch ruhige typo:
 * was den preis macht → was danach läuft → FAQ → schluss.
 *
 * die harte regel dieser seite: es kommt nie eine einzelne zahl raus.
 * das instrument misst einen korridor und sagt auch, dass es einer ist.
 */

export function PreiseDevice() {
  const locale = useLocale();
  const t = PREISE[locale];

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ DER MESSSCHIEBER ═══ */}
      <section
        data-no-reveal
        className="relative isolate flex min-h-[100svh] flex-col justify-center px-gut pb-rh-s pt-hero"
      >
        <HeroAtmo variant="korridor" />

        <div className="mx-auto w-full max-w-shell">

          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <h1
              className="lab-display lab-boot text-display"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>
            <p
              className="lab-boot max-w-[420px] text-body leading-relaxed"
              style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.62)" }}
            >
              {t.sub}
            </p>
          </div>

          <div className="lab-boot mt-10" style={{ animationDelay: "420ms" }}>
            <PriceCaliper t={t.caliper} />
          </div>
        </div>
      </section>

      {/* ═══ WAS DEN PREIS MACHT · ruhig ═══ */}
      <section data-no-reveal className="relative px-gut py-rh-m">
        <div className="mx-auto max-w-shell">
          <h2 className="lab-display max-w-[16ch] text-headline">{t.faktorenH2}</h2>
          <p className="mt-7 max-w-[560px] text-body leading-relaxed text-[rgba(242,242,242,0.55)]">
            {t.faktorenLead}
          </p>

          <div className="mt-12 grid gap-x-16 md:grid-cols-2">
            {t.faktoren.map(([title, body]) => (
              <div key={title} className="lx-row">
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LAUFENDE KOSTEN · ruhig ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell">
          <div className="grid gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
            <div>
              <h2 className="lab-display text-headline">{t.laufendH2}</h2>
              <p className="mt-6 max-w-[380px] text-body leading-relaxed text-[rgba(242,242,242,0.55)]">
                {t.laufendLead}
              </p>

              {/* das zählwerk trägt die aussage, die zeilen rechts
                  sagen, woraus der stand besteht */}
              <div className="mt-9">
                <Zaehler
                  label={t.zaehlerLabel}
                  von={t.zaehlerVon}
                  bis={t.zaehlerBis}
                  bisLabel={t.zaehlerBisLabel}
                  einheit={t.zaehlerEinheit}
                />
              </div>
            </div>
            <div>
              {t.laufend.map(([k, v]) => (
                <div key={k} className="pr-mini">
                  <span className="text-body leading-snug text-[rgba(242,242,242,0.72)]">{k}</span>
                  <span className="pr-mini-value">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ · ruhig ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto grid max-w-shell gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <h2 className="lab-display self-start text-headline md:sticky md:top-28">
            {t.faqH2}
          </h2>
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

      {/* ═══ SCHLUSS ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="mx-auto max-w-shell">
          <div className="lab-chassis relative flex flex-col justify-between gap-10 p-6 md:p-12 lg:flex-row lg:items-center">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[500px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-key-lime">
                {t.ctaPrimary}
              </Link>
              <Link
                href={buildPath("leistung", locale)}
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
