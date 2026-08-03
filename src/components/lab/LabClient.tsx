"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ShaderField } from "@/components/lab/ShaderField";
import { Fader, RockerSwitch, Readout } from "@/components/lab/Controls";
import { ChannelRack } from "@/components/lab/ChannelRack";
import { SendButton } from "@/components/lab/SendButton";
import { LabNav } from "@/components/lab/LabNav";
import { SignalChain } from "@/components/lab/SignalChain";
import "./lab.css";

/**
 * LabClient · prototyp der geräte-richtung (aug 2026).
 *
 * zweck: EINE seite, an der sich entscheidet ob die richtung sitzt,
 * bevor die echte seite angefasst wird. nicht verlinkt, kein sitemap,
 * noindex (metadata sitzt in app/lab/page.tsx).
 *
 * drin: boot-sequenz · WebGL-shader-feld (roh, 0 KB deps) ·
 * liquid-glass-panel mit cursor-specular · anfassbarer konfigurator
 * (fader + wippen) der live richtwert und dauer ausgibt.
 *
 * WARUM client-component statt page.tsx: als "use client"-page mit
 * eigenem layout.tsx verschwand die route bei jedem HMR-recompile
 * (next 14.2 dev-bug, reproduzierbar) · server-page + client-child
 * ist das stabile muster.
 */

/* ── richtwert-logik · bewusst grob, ehrlich als "richtwert" gelabelt ── */
function calc(seiten: number, sprachen: number, cms: boolean, shop: boolean) {
  let eur = 1500 + (seiten - 1) * 260;
  let wochen = 2 + (seiten - 1) * 0.4;
  if (cms) {
    eur += 800;
    wochen += 1;
  }
  if (shop) {
    eur += 1600;
    wochen += 2;
  }
  if (sprachen > 1) {
    eur += (sprachen - 1) * 550;
    wochen += (sprachen - 1) * 0.5;
  }
  return {
    eur: Math.round(eur / 50) * 50,
    wochen: Math.round(wochen),
  };
}

/** glanzlicht auf glas-panels dem cursor nachführen (--mx/--my) */
function useSpecular<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);
  return ref;
}

const SPRACHEN = ["de", "de · fr", "de · fr · en"];

export function LabClient() {
  const [seiten, setSeiten] = useState(4);
  const [sprachIdx, setSprachIdx] = useState(0);
  const [cms, setCms] = useState(true);
  const [shop, setShop] = useState(false);

  const panelRef = useSpecular<HTMLDivElement>();
  const { eur, wochen } = useMemo(
    () => calc(seiten, sprachIdx + 1, cms, shop),
    [seiten, sprachIdx, cms, shop],
  );

  /* nav/footer der alten seite für den prototyp ausblenden */
  useEffect(() => {
    document.body.dataset.lab = "1";
    return () => {
      delete document.body.dataset.lab;
    };
  }, []);

  return (
    <div className="lab-root" data-no-reveal>
      {/* ambient · zwei sehr grosse, sehr schwache farbwolken die
          minutenlang driften · macht die fläche lebendig ohne aufzufallen */}
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <LabNav />

      {/* ═══ HERO · das gerät fährt hoch ═══ */}
      <section
        data-no-reveal
        className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-6 md:px-12"
      >
        <ShaderField className="absolute inset-0 w-full h-full" />
        {/* leseschutz über dem shader */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.30) 40%, rgba(10,10,10,0.88) 100%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto w-full">
          <div className="lab-boot flex items-center gap-3 mb-8" style={{ animationDelay: "80ms" }}>
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#e1fd52", boxShadow: "0 0 10px #e1fd52" }}
            />
            <span className="lab-label">laconis · web systems</span>
          </div>

          <h1
            className="lab-display lab-boot text-[clamp(3rem,11vw,10rem)]"
            style={{ animationDelay: "180ms" }}
          >
            websites,
            <br />
            die man
            <br />
            <span style={{ color: "#e1fd52" }}>anfassen</span> will.
          </h1>

          <p
            className="lab-boot mt-10 max-w-[440px] text-[15px] leading-relaxed"
            style={{ animationDelay: "320ms", color: "rgba(242,242,242,0.62)" }}
          >
            Von null gebaut · kein Template, keine WordPress-Grenzen. Das hier
            läuft auf einem Shader, nicht auf einem Plugin.
          </p>

          {/* spec-leiste · wie ein typenschild */}
          <div
            className="lab-boot mt-12 flex flex-wrap gap-x-10 gap-y-4"
            style={{ animationDelay: "440ms" }}
          >
            {[
              ["pagespeed", "95+"],
              ["ladezeit", "0.4s"],
              ["cms", "eigenbau"],
              ["3rd-party js", "0 kb"],
            ].map(([k, v]) => (
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
          ↓ bedienfeld
        </div>
      </section>

      {/* ═══ KONFIGURATOR · das bedienfeld ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 pb-32 pt-8">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <h2 className="lab-display text-[clamp(2rem,5vw,3.6rem)]">
              stell dir was zusammen.
            </h2>
            <span className="lab-hint max-w-[280px]">
              Richtwerte, keine Offerte · damit du ein Gefühl kriegst, was wohin
              treibt.
            </span>
          </div>

          <div ref={panelRef} className="lab-chassis relative p-6 md:p-10">
            <span className="lab-sweep" aria-hidden />
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12">
              {/* linke seite · die regler */}
              <div className="lab-glass p-6 md:p-8 flex flex-col gap-9">
                <Fader
                  label="seiten"
                  min={1}
                  max={10}
                  value={seiten}
                  onChange={setSeiten}
                  format={(v) => (v === 1 ? "onepager" : `${v} seiten`)}
                />

                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="lab-label">sprachen</span>
                    <span className="lab-readout-sm">{SPRACHEN[sprachIdx]}</span>
                  </div>
                  {/* 3-wege-wahlschalter */}
                  <div className="grid grid-cols-3 gap-2">
                    {SPRACHEN.map((s, i) => {
                      const active = i === sprachIdx;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSprachIdx(i)}
                          aria-pressed={active}
                          className="lab-rocker !py-3 text-center"
                          style={{
                            background: active ? "rgba(225,253,82,0.12)" : "rgba(0,0,0,0.35)",
                            borderColor: active ? "rgba(225,253,82,0.5)" : "rgba(242,242,242,0.09)",
                            boxShadow: active
                              ? "inset 0 0 14px rgba(225,253,82,0.18)"
                              : "inset 0 2px 4px rgba(0,0,0,0.8)",
                          }}
                        >
                          <span
                            className="lab-label"
                            style={{ color: active ? "#e1fd52" : undefined }}
                          >
                            {i + 1}×
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-1 -mx-4">
                  <RockerSwitch
                    label="cms · selbst pflegen"
                    hint="Texte und Bilder selbst ändern, ohne mich"
                    on={cms}
                    onToggle={() => setCms((v) => !v)}
                  />
                  <RockerSwitch
                    label="onlineshop"
                    hint="Produkte, Warenkorb, Stripe-Checkout"
                    on={shop}
                    onToggle={() => setShop((v) => !v)}
                  />
                </div>
              </div>

              {/* rechte seite · das display */}
              <div className="lab-glass p-6 md:p-8 flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-8">
                  <Readout label="richtwert" value={`${eur.toLocaleString("de-DE")}`} unit="€" />
                  <Readout
                    label="dauer"
                    value={`${wochen}`}
                    unit={wochen === 1 ? "woche" : "wochen"}
                    accent="#b084d3"
                  />
                </div>

                <div>
                  <div
                    className="h-px w-full mb-5"
                    style={{ background: "rgba(242,242,242,0.1)" }}
                  />
                  <p className="lab-hint mb-5">
                    Kein Angebot · echtes Angebot nach einem 30-Min-Gespräch.
                  </p>
                  <button
                    type="button"
                    className="w-full rounded-xl py-4 lab-label transition-transform active:translate-y-[2px]"
                    style={{
                      background: "#e1fd52",
                      color: "#0a0a0a",
                      boxShadow: "0 4px 0 #7d8f1c, 0 12px 28px -8px rgba(225,253,82,0.5)",
                    }}
                  >
                    projekt starten →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIGNALKETTE · der übernahme-ablauf ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-12 max-w-[620px]">
            <h2 className="lab-display lab-skew text-[clamp(2rem,5vw,3.6rem)]">
              du hast schon eine seite?
            </h2>
            <p className="lab-hint mt-4 text-[13.5px] leading-relaxed">
              Dann fängst du nicht bei null an. Fünf Stationen von deiner alten
              Seite zur neuen · vier laufen automatisch bei mir, eine gehört
              dir.
            </p>
          </div>
          <SignalChain />
        </div>
      </section>

      {/* ═══ KANALZÜGE · referenzen ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <h2 className="lab-display text-[clamp(2rem,5vw,3.6rem)]">
              was schon läuft.
            </h2>
            <span className="lab-hint max-w-[280px]">
              Drei Kanäle, alle live · fahr drüber, dann geht der Pegel auf Vollausschlag.
            </span>
          </div>
          <ChannelRack />
        </div>
      </section>

      {/* ═══ SENDEN · zwei-stufig ═══ */}
      <section data-no-reveal className="relative px-6 md:px-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="lab-chassis relative p-6 md:p-10 flex flex-col lg:flex-row lg:items-center gap-10 justify-between">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[440px]">
              <h2 className="lab-display text-[clamp(1.9rem,4.2vw,3rem)]">
                erzähl mir, was du vorhast.
              </h2>
              <p className="lab-hint mt-4">
                30 Minuten, kein Pitch-Deck, kostet nichts · danach weißt du, ob wir
                zusammenpassen.
              </p>
            </div>

            <SendButton />
          </div>

          <p className="lab-hint mt-8 text-center">
            Prototyp · nicht verlinkt, nicht indexiert
          </p>
        </div>
      </section>
    </div>
  );
}
