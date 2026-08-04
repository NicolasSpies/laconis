"use client";

import { HOME } from "@/components/home/home.dict";
import { useLocale } from "@/i18n/useLocale";
import { ShaderField } from "@/components/device/ShaderField";
import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { SignalChain } from "@/components/device/SignalChain";
import { ChannelRack } from "@/components/device/ChannelRack";
import { SendButton } from "@/components/device/SendButton";
import { Typenschild } from "@/components/home/Typenschild";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/home/typenschild.css";

/**
 * HomeDevice · die echte startseite in der geräte-richtung.
 *
 * ablauf: shader-hero → typenschild → signalkette (übernahme) →
 * kanalzüge (referenzen) → sendeknopf.
 *
 * KEINE preise auf der home (Nicolas: "preise will definitiv nicht
 * auf der startseite, da will ich was mehr über lacønis quatschen") —
 * die zahlen leben auf /preise.
 *
 * dosierung: der hero ist RUHIG (nur typo + licht). die geräte-
 * momente sind typenschild, kette, kanalzüge und sendeknopf · jeweils
 * einer pro bildschirmhöhe.
 */

export function HomeDevice() {
  const locale = useLocale();
  const t = HOME[locale];

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
        className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pb-32 pt-28 md:px-12"
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

        <div className="relative mx-auto my-auto w-full max-w-[1200px]">
          <h1
            className="lab-display lab-boot text-[clamp(2.9rem,8.6vw,8rem)]"
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
            className="lab-boot mt-10 max-w-[460px] text-[15px] leading-relaxed"
            style={{ animationDelay: "320ms", color: "rgba(242,242,242,0.62)" }}
          >
            {t.sub}
          </p>

        </div>

        {/* die kennzahlen sitzen am fuss der ersten bildschirmhöhe ·
            im fluss hätten sie den titel aus der mitte gedrückt */}
        <div className="pointer-events-none absolute inset-x-6 bottom-9 md:inset-x-12">
          <div
            className="lab-boot mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-x-10 gap-y-4"
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

      {/* ═══ TYPENSCHILD ═══
          hier stand ein absatz prosa plus ein zahlenstreifen. es
          passierte nichts, man konnte nichts anfassen, und es stand
          zu viel über Nicolas für eine startseite. das gehört auf
          /ueber-mich · hier steht jetzt ein objekt, das man kippt,
          und ein knopf, der dorthin führt. */}
      <section data-no-reveal className="relative px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-[1200px]">
          <div className="max-w-[860px]">
            <Typenschild t={t.ts} href={buildPath("ueber-mich", locale)} />
          </div>
        </div>
      </section>

      {/* ═══ SIGNALKETTE · sticky horizontal ═══ */}
      <SignalChain />

      {/* ═══ KANALZÜGE · referenzen ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 py-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <h2 className="lab-display text-[clamp(2rem,5vw,3.6rem)]">{t.refH2}</h2>
            <span className="lab-hint max-w-[300px]">
              {t.refHint}
            </span>
          </div>
          <ChannelRack />
        </div>
      </section>

      {/* ═══ SENDEN ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 pb-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="lab-chassis relative p-6 md:p-12 flex flex-col lg:flex-row lg:items-center gap-10 justify-between">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[460px]">
              <h2 className="lab-display text-[clamp(1.9rem,4.2vw,3rem)]">
                {t.sendH2}
              </h2>
              <p className="lab-hint mt-4 text-[13.5px] leading-relaxed">
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
