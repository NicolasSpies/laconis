"use client";

import { DeviceNav } from "@/components/device/DeviceNav";
import { HeroRail } from "@/components/device/HeroRail";
import { HeroAtmo } from "@/components/device/HeroAtmo";
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

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

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

      {/* ═══ WAS DANACH PASSIERT · ruhig ═══ */}
      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell">
          <h2 className="lab-display max-w-[14ch] text-headline">{t.danachH2}</h2>

          <div className="mt-12 grid gap-x-16 md:grid-cols-3">
            {t.danach.map(([title, body]) => (
              <div key={title} className="lx-row">
                <div>
                  <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                    {title}
                  </h3>
                  <p className="mt-2 max-w-[42ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
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
