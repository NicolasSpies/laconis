"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { Schichten } from "@/components/referenzen/Schichten";
import { RefIndex } from "@/components/referenzen/RefIndex";
import { REFERENZEN } from "@/components/referenzen/referenzen.dict";
import { referenzen } from "@/data/referenzen";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/referenzen/refindex.css";
import "@/components/referenzen/schichten.css";

/**
 * ReferenzenDevice · die referenzen als editorial-index.
 *
 * die übersichtsseite hat genau einen job: zeigen was es gibt, und
 * rein lassen. deshalb steht alles in der zeile und die ganze zeile
 * ist der link · niemand muss ahnen, dass unten noch was kommt.
 *
 * die fallblatt-tafel, die vorher hier stand, war ein schöner
 * mechanismus am falschen ort: schwer zu lesen auf dem handy, und die
 * infos lagen unter der falz.
 *
 * ehrlichkeit bleibt das konzept: was nicht live ist, bekommt den
 * konzept-stempel, und zwar schon in der übersicht.
 */

export function ReferenzenDevice() {
  const locale = useLocale();
  const t = REFERENZEN[locale];

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ HERO · die explosionszeichnung ═══
          statt einer atmosphäre im hintergrund steht hier ein objekt,
          das der besucher tatsächlich bedient. es zeigt nicht wieviele
          projekte es gibt (drei), sondern wieviel in einem steckt. */}
      <section
        data-no-reveal
        className="relative isolate px-6 pb-20 pt-36 md:px-12 md:pt-44"
      >
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-8">
          <div>
            <h1
              className="lab-display lab-boot text-[clamp(2.6rem,7vw,5.6rem)]"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>

            <p
              className="lab-boot mt-8 max-w-[440px] text-[15px] leading-relaxed"
              style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.62)" }}
            >
              {t.sub}
            </p>
          </div>

          <div className="lab-boot" style={{ animationDelay: "420ms" }}>
            <Schichten
              schichten={t.sxSchichten}
              shot={referenzen.find((r) => r.shots)?.shots?.desktop}
              zieh={t.sxZieh}
              einheit={t.sxEinheit}
              seite={t.sxSeite}
            />
          </div>
        </div>
      </section>

      {/* ═══ DER INDEX ═══ */}
      <section data-no-reveal className="relative px-6 pb-24 md:px-12">
        <div className="mx-auto w-full max-w-[1200px]">
          <span className="lab-label block">{t.boardHint}</span>

          <div className="mt-8">
            <RefIndex
              locale={locale}
              t={{
                stampLive: t.stampLive,
                stampKonzept: t.stampKonzept,
                stampWip: t.stampWip,
                open: t.linkCase,
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ EHRLICH · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="lab-display max-w-[14ch] text-[clamp(2rem,5vw,3.6rem)]">{t.honestH2}</h2>
          <p className="mt-8 max-w-[640px] text-[clamp(1rem,1.6vw,1.2rem)] leading-[1.6] text-[rgba(242,242,242,0.72)]">
            {t.honestBody}
          </p>
        </div>
      </section>

      {/* ═══ SCHLUSS ═══ */}
      <section data-no-reveal className="relative px-6 pb-40 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="lab-chassis relative flex flex-col justify-between gap-10 p-6 md:p-12 lg:flex-row lg:items-center">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[480px]">
              <h2 className="lab-display text-[clamp(1.9rem,4.2vw,3rem)]">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-[13.5px] leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-key-lime">
                {t.ctaPrimary}
              </Link>
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
