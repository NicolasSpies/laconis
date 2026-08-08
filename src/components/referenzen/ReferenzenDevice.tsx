"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { Stapel } from "@/components/referenzen/Stapel";
import { REFERENZEN } from "@/components/referenzen/referenzen.dict";
import { referenzen } from "@/data/referenzen";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/referenzen/stapel.css";

/**
 * ReferenzenDevice · die referenzen als ein einziges objekt.
 *
 * die seite war zwischenzeitlich überladen: ein stapel aus sieben
 * beschrifteten schichten, darunter eine liste derselben projekte,
 * dazu ein hinweis über der liste, ein zähler unter dem stapel und
 * pro zeile nochmal „case lesen". der projektname stand doppelt, der
 * hinweis zum stapel dreifach.
 *
 * jetzt trägt EIN element die ganze übersicht: eine schicht ist ein
 * projekt. der stapel ist damit gleichzeitig die liste, und was in
 * einer website steckt, wird dort erklärt, wo von genau einer die
 * rede ist · auf der case-seite.
 *
 * ehrlichkeit bleibt das konzept: was nicht live ist, trägt seinen
 * stempel direkt an der schicht.
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

      {/* ═══ DER STAPEL · übersicht und navigation in einem ═══ */}
      <section
        data-no-reveal
        className="relative isolate flex min-h-[100svh] flex-col justify-center px-gut pb-rh-s pt-hero"
      >
        <div className="mx-auto grid w-full max-w-shell-wide items-center gap-14 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-10">
          <div>
            <h1
              className="lab-display lab-boot text-display"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>

            <p
              className="lab-boot mt-7 max-w-[360px] text-body leading-relaxed"
              style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.6)" }}
            >
              {t.sub}
            </p>
          </div>

          <div className="lab-boot" style={{ animationDelay: "440ms" }}>
            <Stapel
              projekte={referenzen}
              locale={locale}
              t={{
                zieh: t.sxZieh,
                stampLive: t.stampLive,
                stampKonzept: t.stampKonzept,
                stampWip: t.stampWip,
              }}
            />
          </div>
        </div>
      </section>

      {/* ═══ EHRLICH · ein satz, mehr braucht es nicht ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell">
          <h2 className="lab-display max-w-[13ch] text-headline">{t.honestH2}</h2>
          <p className="mt-7 max-w-[560px] text-lead leading-[1.6] text-[rgba(242,242,242,0.7)]">
            {t.honestBody}
          </p>
        </div>
      </section>

      {/* ═══ SCHLUSS ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="mx-auto max-w-shell">
          <div className="gl relative flex flex-col justify-between gap-10 p-8 md:p-14 lg:flex-row lg:items-center">

            <div className="max-w-[480px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
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
