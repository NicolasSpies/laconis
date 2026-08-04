"use client";

import { useEffect, useState } from "react";
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
 * ReferenzenDevice · die referenzen als ein einziges gerät.
 *
 * die übersichtsseite hat genau einen job: zeigen was es gibt, und
 * rein lassen. deshalb steht alles in der zeile und die ganze zeile
 * ist der link · niemand muss ahnen, dass unten noch was kommt.
 *
 * der aufbau ist seit august 2026 auf EIN element zusammengezogen:
 * oben liegt der stapel, unten stehen die drei zeilen, und wer über
 * eine zeile fährt, legt das projekt in den stapel. vorher war das
 * zweigeteilt · der stapel im hero, darunter je projekt noch ein
 * grosses vorschau-band. zwei bilder derselben sache übereinander,
 * und das schöne von beiden ging dabei unter.
 *
 * ohne zeiger gibt es kein hover, deshalb schaltet der stapel dort
 * von selbst weiter. sobald eine hand mitspielt, hört er damit auf
 * und folgt ihr · niemand will gegen eine automatik anhovern.
 *
 * ehrlichkeit bleibt das konzept: was nicht live ist, bekommt den
 * konzept-stempel, und zwar schon in der übersicht.
 */

/* wie lange ein projekt im stapel liegt, solange niemand steuert */
const TAKT = 4200;

export function ReferenzenDevice() {
  const locale = useLocale();
  const t = REFERENZEN[locale];

  const [aktiv, setAktiv] = useState(0);
  /* sobald jemand selbst steuert, ist die automatik aus · sie soll
     nicht gegen die hand arbeiten. einmal aus, bleibt aus. */
  const [vonHand, setVonHand] = useState(false);

  useEffect(() => {
    if (vonHand) return;
    const uhr = setInterval(
      () => setAktiv((i) => (i + 1) % referenzen.length),
      TAKT,
    );
    return () => clearInterval(uhr);
  }, [vonHand]);

  const waehle = (i: number) => {
    setVonHand(true);
    setAktiv(i);
  };

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ DAS GERÄT · zeilen links, stapel rechts ═══
          der stapel zeigt immer genau ein projekt. die zeilen daneben
          schalten ihn um und führen gleichzeitig hinein · ein element
          macht vorschau und navigation.

          beides muss GLEICHZEITIG sichtbar sein. standen die zeilen
          unter dem stapel, war er beim drüberfahren längst aus dem
          bild gescrollt und das umschalten lief ins leere. */}
      <section
        data-no-reveal
        className="relative isolate px-6 pb-24 pt-32 md:px-12 md:pt-40"
      >
        {/* die reihenfolge im DOM ist die MOBILE reihenfolge: titel,
            stapel, liste. auf breiten schirmen setzt das raster den
            stapel in die zweite spalte über beide zeilen · so steht er
            am handy dort, wo er hingehört (direkt unter dem titel,
            nicht hinter der liste), ohne dass es zwei markups braucht. */}
        <div className="rz-raster mx-auto w-full max-w-[1200px]">
          <div className="rz-kopf">
            <h1
              className="lab-display lab-boot text-[clamp(2.4rem,6vw,4.6rem)]"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>

            <p
              className="lab-boot mt-6 max-w-[420px] text-[15px] leading-relaxed"
              style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.62)" }}
            >
              {t.sub}
            </p>
          </div>

          {/* der stapel bleibt stehen, während die zeilen daneben
              durchlaufen · so sieht man das umschalten auch dann noch,
              wenn die liste länger wird als der schirm */}
          <div className="rz-stapel lab-boot" style={{ animationDelay: "500ms" }}>
            <Schichten
              schichten={t.sxSchichten}
              projekte={referenzen}
              aktiv={aktiv}
              zieh={t.sxZieh}
              einheit={t.sxEinheit}
              seite={t.sxSeite}
            />
          </div>

          <div className="rz-liste lab-boot" style={{ animationDelay: "420ms" }}>
            <span className="lab-label block">{t.boardHint}</span>
            <div className="mt-5">
              <RefIndex
                locale={locale}
                aktiv={aktiv}
                setzeAktiv={waehle}
                t={{
                  stampLive: t.stampLive,
                  stampKonzept: t.stampKonzept,
                  stampWip: t.stampWip,
                  open: t.linkCase,
                }}
              />
            </div>
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
