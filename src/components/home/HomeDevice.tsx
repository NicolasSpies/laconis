"use client";

import { useEffect } from "react";
import { HOME } from "@/components/home/home.dict";
import { useLocale } from "@/i18n/useLocale";
import { ShaderField } from "@/components/device/ShaderField";
import { DeviceNav } from "@/components/device/DeviceNav";
import { SignalChain } from "@/components/device/SignalChain";
import { ChannelRack } from "@/components/device/ChannelRack";
import { SendButton } from "@/components/device/SendButton";
import "@/components/device/device.css";

/**
 * HomeDevice · die echte startseite in der geräte-richtung.
 *
 * ablauf: shader-hero → wer das hier baut (kurz, ohne preise) →
 * signalkette (übernahme) → kanalzüge (referenzen) → sendeknopf.
 *
 * KEINE preise auf der home (Nicolas: "preise will definitiv nicht
 * auf der startseite, da will ich was mehr über lacønis quatschen") —
 * die zahlen leben auf /preise.
 *
 * dosierung: hero und "wer das baut" sind RUHIG (nur typo + licht),
 * die geräte-momente sind kette, kanalzüge und sendeknopf.
 */

export function HomeDevice() {
  const locale = useLocale();
  const t = HOME[locale];

  /* alte nav/footer auf dieser seite stilllegen · die geräte-nav
     übernimmt (root-layout rendert beide global) */
  useEffect(() => {
    document.body.dataset.lab = "1";
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

      {/* ═══ HERO ═══ */}
      <section
        data-no-reveal
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6 md:px-12"
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

        <div className="relative max-w-[1200px] mx-auto w-full">
          <div className="lab-boot flex items-center gap-3 mb-8" style={{ animationDelay: "80ms" }}>
            <span
              className="w-1.5 h-1.5 rounded-full lab-led-idle"
              style={{ background: "#e1fd52", boxShadow: "0 0 10px #e1fd52" }}
            />
            <span className="lab-label">{t.kicker}</span>
          </div>

          <h1
            className="lab-display lab-boot text-[clamp(3rem,11vw,10rem)]"
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

          <div
            className="lab-boot mt-12 flex flex-wrap gap-x-10 gap-y-4"
            style={{ animationDelay: "440ms" }}
          >
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
        </div>

        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 lab-label lab-boot"
          style={{ animationDelay: "700ms" }}
        >
          {t.scroll}
        </div>
      </section>

      {/* ═══ WER DAS HIER BAUT ═══
          bewusst KEIN zweiter typo-hero (sah aus wie ein echo) —
          hier steht ein OBJEKT: das geschraubte typenschild. */}
      <section data-no-reveal className="relative px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-[1200px] mx-auto">
          <span className="lab-label">{t.werLabel}</span>

          {/* prosa führt · kein zweiter typo-knall, aber grösser als
              fliesstext gesetzt, damit die sektion trägt */}
          <p className="mt-8 max-w-[720px] text-[clamp(1.15rem,2.2vw,1.65rem)] leading-[1.5] text-[rgba(242,242,242,0.9)]">
            {t.werLead1}
            <span style={{ color: "#e1fd52" }}>{t.werAccent}</span>
            {t.werLead2}
          </p>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-[rgba(242,242,242,0.5)]">
            {t.werBody}
          </p>

          {/* datenstreifen · zahlen statt worte = anderes register als
              der hero, ohne zweite grosse überschrift */}
          <div className="dv-stats">
            {t.zahlen.map(([k, v], i) => (
              <div key={k} className="dv-stat">
                <div
                  className="dv-display dv-stat-value"
                  style={{ color: i === 1 ? "#e1fd52" : undefined }}
                >
                  {v}
                </div>
                <div className="lab-label mt-2">{k}</div>
              </div>
            ))}
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
