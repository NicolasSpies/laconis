"use client";

import Link from "next/link";
import { HOME } from "@/components/home/home.dict";
import { useLocale } from "@/i18n/useLocale";
import { ShaderField } from "@/components/device/ShaderField";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { VonNull } from "@/components/home/VonNull";
import { Umzug } from "@/components/home/Umzug";
import { Stapel } from "@/components/referenzen/Stapel";
import { referenzen } from "@/data/referenzen";
import { REFERENZEN } from "@/components/referenzen/referenzen.dict";
import { buildPath } from "@/i18n/config";
import { SendButton } from "@/components/device/SendButton";
import { WegFallen } from "@/components/home/WegFallen";
import "@/components/device/device.css";
import "@/components/home/wegfallen.css";
import "@/components/referenzen/stapel.css";
import "@/components/home/umzug.css";

/**
 * HomeDevice · die echte startseite in der geräte-richtung.
 *
 * ablauf: shader-hero → was wegfällt → von null → übernahme →
 * referenzen → schluss.
 *
 * die reihenfolge der zielgruppen ist absicht: ERST wer noch nichts
 * hat, DANN wer schon eine seite hat. vorher gab es nur die zweite.
 *
 * KEINE preise auf der home (Nicolas: "preise will definitiv nicht
 * auf der startseite, da will ich was mehr über lacønis quatschen") —
 * die zahlen leben auf /preise.
 *
 * dosierung: hero und „was wegfällt" sind RUHIG (nur typo + licht).
 * die geräte-momente sind kette, kanalzüge und sendeknopf · jeweils
 * einer pro bildschirmhöhe.
 */

export function HomeDevice() {
  const locale = useLocale();
  const t = HOME[locale];
  /* die stempel und der geste-hinweis leben im referenzen-dict ·
     zwei quellen für denselben satz wären genau die dopplung,
     die hier weg soll */
  const rt = REFERENZEN[locale];

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={t.kicker} />

      {/* ═══ HERO ═══ */}
      <section
        data-no-reveal
        /* der block sass oben. mittig geht aber nur, wenn er auch
           REINPASST · vier zeilen à 11vw plus fliesstext plus zahlen
           waren höher als der bildschirm, da hilft kein justify-center.
           deshalb: titel etwas kleiner, und die kennzahlen wandern an
           den fuss statt unter den fliesstext */
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-gut pb-rh-m pt-hero"
      >
        <ShaderField className="absolute inset-0 w-full h-full" />
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(12,12,14,0.72) 0%, rgba(12,12,14,0.28) 40%, rgba(12,12,14,0.9) 100%)",
          }}
        />

        <div className="relative mx-auto my-auto w-full max-w-shell">
          <h1
            className="lab-display lab-boot text-display-xl"
            style={{ animationDelay: "180ms" }}
          >
            {t.h1a}
            <br />
            {t.h1b}
            <br />
            <span style={{ color: "#e1fd52" }}>{t.h1accent}</span>
            {t.h1c}
          </h1>

          <p
            className="lab-boot mt-10 max-w-[460px] text-body leading-relaxed"
            style={{ animationDelay: "320ms", color: "rgba(242,242,242,0.62)" }}
          >
            {t.sub}
          </p>

        </div>

        {/* die kennzahlen sitzen am fuss der ersten bildschirmhöhe ·
            im fluss hätten sie den titel aus der mitte gedrückt */}
        <div className="pointer-events-none absolute inset-x-6 bottom-9 md:inset-x-12">
          <div
            className="lab-boot mx-auto flex max-w-shell flex-wrap items-end justify-between gap-x-10 gap-y-4"
            style={{ animationDelay: "440ms" }}
          >
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {t.facts.map(([k, v]) => (
                <div key={k}>
                  <div className="lab-label">{k}</div>
                  <div
                    className="lab-display mt-1 text-[22px]"
                    style={{ fontStretch: "112%", fontWeight: 700 }}
                  >
                    {v}
                  </div>
                </div>
              ))}
            </div>

            <span aria-hidden className="lab-label">
              {t.scroll}
            </span>
          </div>
        </div>
      </section>

      {/* ═══ WAS WEGFÄLLT ═══
          hier sass das typenschild: gebürstetes metall, vier
          schrauben, „seit 2019 · im team 1 · 1:1 kontakt". das waren
          angaben über den verkäufer, keine argumente. jetzt steht
          das argument im weglassen · und es ist nachprüfbar, weil
          es keine zahl ist, sondern eine liste. */}
      <WegFallen t={t.wf} />

      {/* ═══ ERST WER NICHTS HAT ═══
          für diese gruppe stand vorher kein einziger satz auf der
          seite · die einzige zielgruppen-frage war „du hast schon
          eine seite?". */}
      <VonNull t={t.vn} href={buildPath("leistung", locale)} />

      {/* ═══ DANN DIE ÜBERNAHME ═══
          ersetzt die SignalChain: 320vh sticky für 120 wörter, text
          hart deutsch verdrahtet, und eine form (fünf stationen,
          schiene, fortschrittsbalken), die wie ein prozessdiagramm
          las und angst machte statt sie zu nehmen. */}
      <Umzug t={t.ub} />

      {/* ═══ REFERENZEN ═══
          hier standen kacheln mit erfundenen pagespeed-werten
          (98/95/96 · echt ist nur fabry mit 95/97), einem shop-tag
          für ein projekt ohne shop, stockfotos statt der echten
          aufnahme und einem „öffnen →", das ein button ohne onClick
          war. dazu die behauptung „drei kanäle, alle live" · live
          ist genau eines.

          jetzt steht hier DASSELBE bauteil wie auf /referenzen, nur
          kleiner. die daten kommen aus src/data/referenzen.ts, es
          gibt also nichts mehr zu erfinden. */}
      <section data-no-reveal className="relative px-gut py-rh-m">
        <div className="max-w-shell-wide mx-auto">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <h2 className="lab-display text-headline">{t.refH2}</h2>
            <span className="lab-hint max-w-[300px]">{t.refHint}</span>
          </div>

          <Stapel
            projekte={referenzen}
            locale={locale}
            klasse="st--klein"
            t={{
              zieh: rt.sxZieh,
              stampLive: rt.stampLive,
              stampKonzept: rt.stampKonzept,
              stampWip: rt.stampWip,
            }}
          />

          <Link
            href={buildPath("referenzen", locale)}
            className="lab-label mt-10 inline-block transition-colors hover:text-[#e1fd52]"
          >
            {t.refLink} →
          </Link>
        </div>
      </section>

      {/* ═══ SENDEN ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="max-w-shell mx-auto">
          <div className="gl relative p-8 md:p-14 flex flex-col lg:flex-row lg:items-center gap-10 justify-between">

            <div className="max-w-[460px]">
              <h2 className="lab-display text-headline">
                {t.sendH2}
              </h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">
                {t.sendBody}
              </p>
            </div>

            <SendButton />
          </div>

          {/* schlichter fuss · das chrome bleibt still */}
          <div className="mt-16 pt-6 border-t border-[rgba(242,242,242,0.08)] flex flex-wrap justify-between gap-4">
            <span className="lab-label">© 2026 lacønis</span>
            <span className="lab-label">nicolas@laconis.be</span>
          </div>
        </div>
      </section>
    </div>
  );
}
