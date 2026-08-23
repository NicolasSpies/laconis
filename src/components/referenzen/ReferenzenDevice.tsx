"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { HeroRail } from "@/components/device/HeroRail";
import { Stapel } from "@/components/referenzen/Stapel";
import { Kammer } from "@/components/home/Kammer";
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
      {/* DREI spans · der dritte ist der heisse kern, den
          .lab-ambient span:nth-child(3) einfaerbt. alle aufrufer
          rendern bisher nur zwei, die regel lief ins leere. */}
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ DER STAPEL · übersicht und navigation in einem ═══ */}
      <section
        data-no-reveal
        className="relative isolate px-gut pb-rh-m pt-hero"
      >
        {/* titel OBEN über die volle breite · darunter die namen
            links und das deck gross rechts. das deck darf über die
            schale hinauslaufen, html clippt waagerecht. */}
        <div className="mx-auto w-full max-w-shell-wide">
          <h1
            className="lab-display lab-boot max-w-[16ch] text-display-xl"
            style={{ animationDelay: "180ms" }}
          >
            {t.h1a} <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
          </h1>

          <p
            className="lab-boot mt-6 max-w-[420px] text-lead leading-relaxed"
            style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.6)" }}
          >
            {t.sub}
          </p>

          <div className="lab-boot mt-14 md:mt-20" style={{ animationDelay: "440ms" }}>
            <Stapel
              projekte={referenzen}
              locale={locale}
              klasse="st--gross"
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

      {/* ═══ EHRLICH · und zugleich der helle schnitt dieser seite
          hier stand derselbe satz auf schwarz wie alles davor ·
          /arbeiten hatte keine einzige helle fläche. der ehrliche
          satz ist der richtige moment dafür: er ist das, was man
          sich merken soll. ═══ */}
      <Kammer
        t={{ satz: t.honestH2, betont: "", body: t.honestBody }}
        variante="bahn"
      />

      {/* ═══ SCHLUSS ═══ */}
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
              <Link
                href={buildPath("leistung", locale)}
                className="lab-cta lab-cta--leise"
              >
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          <DeviceFuss />
        </div>
      </section>
    </div>
  );
}
