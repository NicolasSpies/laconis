"use client";

import { useEffect } from "react";
import { DeviceNav } from "@/components/device/DeviceNav";
import { KontaktKonsole } from "@/components/kontakt/KontaktKonsole";
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

      {/* ═══ HERO + DIREKTWEGE · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <div className="lab-boot mb-8 flex items-center gap-3" style={{ animationDelay: "80ms" }}>
            <span
              className="lab-led-idle h-1.5 w-1.5 rounded-full"
              style={{ background: "#e1fd52", boxShadow: "0 0 10px #e1fd52" }}
            />
            <span className="lab-label">{t.kicker}</span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <h1
              className="lab-display lab-boot text-[clamp(2.8rem,9vw,7.5rem)]"
              style={{ animationDelay: "180ms" }}
            >
              {t.h1a}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
            </h1>
            <p
              className="lab-boot max-w-[420px] text-[15px] leading-relaxed"
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
      <section id="projekt" data-no-reveal className="relative scroll-mt-24 px-6 pb-28 pt-10 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <h2 className="lab-display max-w-[16ch] text-[clamp(1.9rem,5vw,3.4rem)]">
              {t.konsoleH2}
            </h2>
            <p className="lab-hint max-w-[340px] text-[12.5px] leading-relaxed">{t.konsoleLead}</p>
          </div>

          <KontaktKonsole t={t.konsole} />
        </div>
      </section>

      {/* ═══ WAS DANACH PASSIERT · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <h2 className="lab-display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">{t.danachH2}</h2>

          <div className="mt-12 grid gap-x-16 md:grid-cols-3">
            {t.danach.map(([title, body], i) => (
              <div key={title} className="lx-row">
                <span className="lx-row-nr">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-[rgba(242,242,242,0.5)]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-[rgba(242,242,242,0.08)] pt-6">
            <span className="lab-label">© 2026 lacønis</span>
            <a className="lab-label" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
