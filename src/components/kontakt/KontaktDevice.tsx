"use client";

import { DeviceNav } from "@/components/device/DeviceNav";
import { Lauf } from "@/components/device/Lauf";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { HeroRail } from "@/components/device/HeroRail";
import { HeroAtmo } from "@/components/device/HeroAtmo";
import { KontaktKonsole } from "@/components/kontakt/KontaktKonsole";
import { Kammer } from "@/components/home/Kammer";
import { Zeilenliste } from "@/components/device/Zeilenliste";
import { KONTAKT } from "@/components/kontakt/kontakt.dict";
import { CONTACT } from "@/config/contact";
import { useLocale } from "@/i18n/useLocale";
import "@/components/device/device.css";
import "@/components/kontakt/konsole.css";

/**
 * KontaktDevice · kontakt als sendekonsole.
 *
 * ein geräte-moment: die konsole mit pegelanzeige und verriegeltem
 * sendeknopf. drumherum bleibt es ruhig · die zwei direktwege oben
 * sind gravierte schilder, kein zweites bedienteil.
 *
 * bewusst kein mehrstufiger fluss mehr. der alte vier-schritt-assistent
 * hat leute gezählt statt sie schreiben zu lassen · hier steht alles
 * auf einer fläche, und zwei felder reichen zum absenden.
 */

export function KontaktDevice() {
  const locale = useLocale();
  const t = KONTAKT[locale];

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

      <Lauf />
      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ HERO + DIREKTWEGE · ruhig ═══ */}
      <section data-no-reveal className="relative isolate flex min-h-[86svh] flex-col justify-center px-gut pb-rh-s pt-hero">
        <HeroAtmo variant="signal" />

        <div className="mx-auto max-w-shell">

          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <h1
              className="lab-display lab-boot text-display-xl"
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

          <div className="lab-boot mt-14" style={{ animationDelay: "400ms" }}>
            <span className="lab-label">{t.direktLabel}</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a className="kx-plate" href={`mailto:${CONTACT.email}`}>
                <span className="lab-label">{t.schreiben}</span>
                <span className="kx-plate-value">{CONTACT.email}</span>
              </a>
              <a className="kx-plate" href={`tel:${CONTACT.phoneE164}`}>
                <span className="lab-label">{t.anrufen}</span>
                <span className="kx-plate-value">{CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DIE KONSOLE ═══ */}
      <section id="projekt" data-no-reveal className="relative scroll-mt-24 px-gut pb-rh-m pt-rh-s">
        <div className="mx-auto max-w-shell">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[16ch] text-headline">
              {t.konsoleH2}
            </h2>
            <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">{t.konsoleLead}</p>
          </div>

          <KontaktKonsole t={t.konsole} />
        </div>
      </section>

      {/* die helle bahn dieser seite · /kontakt hatte keine
          einzige. sie sitzt zwischen konsole und ablauf, also an
          anderer stelle als auf home und /studio. */}
      <Kammer t={t.kammer} variante="bahn" />

      {/* ═══ WAS DANACH PASSIERT · zeilen, keine kacheln ═══
          hier stand `grid md:grid-cols-3` mit <h3> plus <p> pro
          zelle · der standardblock, wörtlich, am ende einer seite,
          die sonst als gerät gebaut ist. /studio löste dieselbe
          datenform längst als zeilenliste. */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell">
          <h2 className="lab-display max-w-[14ch] text-headline">{t.danachH2}</h2>

          <div className="mt-12">
            <Zeilenliste eintraege={t.danach} />
          </div>

        </div>
      </section>

      {/* AUSSERHALB der sektion · DeviceFuss bringt seine eigene
          schale mit (aussen px-gut, innen max-w-shell). in einer
          zweiten schale wurde daraus 936 statt 1080px, und die
          zeile hing um einen gutter eingerückt unter der seite —
          genau der fehler, den K14 an anderer stelle behoben hat. */}
      <DeviceFuss />
    </div>
  );
}
