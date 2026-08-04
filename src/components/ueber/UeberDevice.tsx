"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { HeroAtmo } from "@/components/device/HeroAtmo";
import { ArtQuote } from "@/components/device/ArtQuote";
import { PresetKeys } from "@/components/ueber/PresetKeys";
import { UEBER } from "@/components/ueber/ueber.dict";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/ueber/ueber.css";

/**
 * UeberDevice · über mich als bedienteil.
 *
 * ein geräte-moment: die tastenbank „frag mich was". der rest ist
 * ruhig · portrait im bildschirmrahmen, werdegang als fünf zeilen,
 * die arbeitsthese als typo.
 *
 * der clou ist die richtungsumkehr: statt dass hier jemand über sich
 * schreibt, drückt der besucher eine frage und bekommt sie beantwortet.
 * inklusive der unangenehmen („und wenn du ausfällst?").
 */

const PORTRAIT = "/nicolas.jpg";

export function UeberDevice() {
  const locale = useLocale();
  const t = UEBER[locale];

  /* monogramm ist der default · das foto ersetzt es erst, wenn es
     wirklich lädt. andersherum blitzt vor der hydration das kaputte
     bild-symbol auf (das hatten wir schon mal). */
  const [hasPhoto, setHasPhoto] = useState(false);

  useEffect(() => {
    document.body.dataset.lab = "1";
    const probe = new window.Image();
    probe.onload = () => setHasPhoto(true);
    probe.src = PORTRAIT;
    return () => {
      delete document.body.dataset.lab;
    };
  }, []);

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ HERO · ruhig, das portrait trägt ═══ */}
      <section
        data-no-reveal
        className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-24 pt-28 md:px-12"
      >
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 md:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] md:gap-16">
          <div>
            <h1
              className="lab-display lab-boot text-[clamp(2.6rem,8vw,6.5rem)]"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>

            <p
              className="lab-boot mt-8 max-w-[520px] text-[clamp(1.02rem,1.8vw,1.3rem)] leading-[1.55] text-[rgba(242,242,242,0.88)]"
              style={{ animationDelay: "300ms" }}
            >
              {t.bio}
            </p>
            <p
              className="lab-boot mt-5 max-w-[480px] text-[15px] leading-relaxed text-[rgba(242,242,242,0.55)]"
              style={{ animationDelay: "380ms" }}
            >
              {t.bioSub}
            </p>

            <div
              className="lab-boot mt-9 flex flex-wrap gap-x-8 gap-y-3"
              style={{ animationDelay: "460ms" }}
            >
              {t.tags.map((tag) => (
                <span key={tag} className="lab-label">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* das licht folgt der hand · ein portrait im dunkeln, auf
              das niemand leuchtet, ist nur ein grauer kasten */}
          <div className="lab-boot ub-portrait" style={{ animationDelay: "260ms" }}>
            <HeroAtmo variant="lampe" />
            {hasPhoto ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={PORTRAIT} alt="Nicolas Spies" />
            ) : (
              <span className="ub-monogram" aria-hidden>
                n.
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ═══ DIE TASTENBANK ═══ */}
      <section data-no-reveal className="relative px-6 pb-28 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="lab-display mb-10 text-[clamp(2rem,5.5vw,3.8rem)]">{t.fragH2}</h2>
          <PresetKeys items={t.fragen} hint={t.fragHint} />
        </div>
      </section>

      {/* ═══ WERDEGANG · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-28 md:px-12">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <h2 className="lab-display text-[clamp(2rem,5vw,3.4rem)]">{t.wegH2}</h2>
            <p className="mt-5 max-w-[320px] text-[14px] leading-relaxed text-[rgba(242,242,242,0.5)]">
              {t.wegLead}
            </p>
          </div>

          <div>
            {t.weg.map(([jahr, titel, kurz]) => (
              <div key={jahr} className="lx-row" style={{ gridTemplateColumns: "46px minmax(0,1fr)" }}>
                <span className="ub-year">{jahr}</span>
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                    {titel}
                  </h3>
                  <p className="mt-2 max-w-[52ch] text-[13.5px] leading-relaxed text-[rgba(242,242,242,0.5)]">
                    {kurz}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DIE THESE · ruhig, aber gross ═══ */}
      <section data-no-reveal className="relative px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-[1200px]">
          <span className="lab-label">{t.theseH2}</span>
          {/* die breite MUSS am satz hängen, nicht am blockquote · „ch"
              rechnet gegen die schriftgrösse des elements, und aussen
              sind das 16px. vorher stand hier ein wort pro zeile. */}
          <ArtQuote
            className="aq--versetzt mt-10"
            lines={t.these}
            mark={t.theseMark}
            source={t.theseFrom}
          />
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

            <div className="max-w-[500px]">
              <h2 className="lab-display text-[clamp(1.9rem,4.2vw,3rem)]">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-[13.5px] leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-key-lime">
                {t.ctaPrimary}
              </Link>
              <Link
                href={buildPath("referenzen", locale)}
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
