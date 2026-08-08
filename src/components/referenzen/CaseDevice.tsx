"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { ArtQuote } from "@/components/device/ArtQuote";
import { ClaimSwitch } from "@/components/referenzen/ClaimSwitch";
import { ProjektAnsicht } from "@/components/referenzen/ProjektAnsicht";
import { HeroAtmo } from "@/components/device/HeroAtmo";
import { CASE } from "@/components/referenzen/case.dict";
import { REFERENZEN } from "@/components/referenzen/referenzen.dict";
import { referenzen } from "@/data/referenzen";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/referenzen/case.css";
import "@/components/referenzen/projektansicht.css";

/**
 * CaseDevice · die referenz-detailseite.
 *
 * ZWEI ausprägungen, weil es zwei sorten projekte gibt:
 *
 *  · fabry ist live. da gibt es ein gebautes feature, echte messwerte
 *    und ein echtes kundenzitat · also bekommt es die volle seite mit
 *    dem tageslauf als geräte-moment.
 *  · holoroom und léspoir sind konzept-studien. die bekommen eine
 *    kurze, ehrliche seite statt einer nachgebauten case-story.
 *
 * vorher rendete JEDER slug die fabry-case-study · auf /referenzen/
 * holoroom stand damit eine baumpflege-geschichte. das war schlicht
 * falsch und ist der eigentliche grund für diese datei.
 */

export function CaseDevice({ slug }: { slug: string }) {
  const locale = useLocale();
  const t = CASE[locale];
  const tr = REFERENZEN[locale];
  const r = referenzen.find((x) => x.slug === slug) ?? referenzen[0]!;

  const isLive = Boolean(r.istEcht);
  const stamp = isLive ? tr.stampLive : r.inArbeit ? tr.stampWip : tr.stampKonzept;

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />

      {/* ═══ KOPF · die gebaute seite steht sofort da ═══ */}
      <section data-no-reveal className="relative isolate px-6 pb-16 pt-36 md:px-12 md:pt-44">
        <HeroAtmo variant="schweben" />
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <div>
          <div>
            <Link href={buildPath("referenzen", locale)} className="lab-label lab-boot">
              ← {t.back}
            </Link>
          </div>

          <span className="lab-stamp lab-boot mt-7" data-kind={isLive ? "live" : "konzept"}>
            {stamp}
          </span>

          <h1
            className="lab-display lab-boot mt-6 text-headline"
            style={{ animationDelay: "120ms" }}
          >
            {r.name.toLowerCase()}
          </h1>
          <p
            className="lab-boot mt-5 max-w-[420px] text-lead leading-[1.55] text-[rgba(242,242,242,0.8)]"
            style={{ animationDelay: "220ms" }}
          >
            {r.kurz}
          </p>

          <div className="mt-8 flex flex-wrap gap-x-9 gap-y-4">
            {[
              [t.lOrt, r.ort],
              [t.lJahr, String(r.jahr)],
              [t.lArt, r.kategorieLabel],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="lab-label">{k}</div>
                <div className="mt-1.5 text-body text-[#f2f2f2]">{v}</div>
              </div>
            ))}
            </div>
          </div>

          {/* die geräte im hero statt weiter unten · niemand soll
              scrollen müssen, um die seite zu sehen, um die es geht */}
          <div className="lab-boot" style={{ animationDelay: "320ms" }}>
            <ProjektAnsicht shots={r.shots} t={t.ansicht} />
          </div>
        </div>
      </section>

      {isLive ? (
        <>
          {/* ═══ DER BEFUND · ruhig, die geschichte ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="lab-display max-w-[14ch] text-headline">
                {t.auftragH2}
              </h2>
              <p className="mt-7 max-w-[620px] text-lead leading-[1.6] text-[rgba(242,242,242,0.75)]">
                {t.auftragLead}
              </p>

              <div className="mt-12 grid gap-x-16 md:grid-cols-2">
                {t.auftrag.map(([title, body]) => (
                  <div key={title} className="lx-row">
                    <div>
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-[46ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* das briefing in seinen worten · so kurz stand es da */}
              <ArtQuote className="aq--versetzt mt-20" lines={t.briefing} />
            </div>
          </section>

          {/* ═══ DER UMSCHALTER · das argument in typografie ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                <h2 className="lab-display max-w-[16ch] text-headline">
                  {t.claimH2}
                </h2>
                <p className="lab-hint max-w-[340px] text-body-sm leading-relaxed">
                  {t.claimLead}
                </p>
              </div>
              <ClaimSwitch t={t.claim} />
            </div>
          </section>

          {/* ═══ WAS DRIN STECKT · ruhig ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="lab-display max-w-[14ch] text-headline">
                {t.detailsH2}
              </h2>
              <p className="mt-7 max-w-[560px] text-body leading-relaxed text-[rgba(242,242,242,0.55)]">
                {t.detailsLead}
              </p>
              <div className="mt-12 grid gap-x-16 md:grid-cols-2">
                {t.details.map(([title, body]) => (
                  <div key={title} className="lx-row">
                    <div>
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-[46ch] text-body-sm leading-relaxed text-[rgba(242,242,242,0.5)]">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ═══ GEMESSEN ═══ */}
          {r.pagespeedMobile != null && (
            <section data-no-reveal className="relative px-6 pb-28 md:px-12">
              <div className="mx-auto max-w-[1200px]">
                <span className="lab-label">{t.lTempo}</span>
                <div className="mt-6 flex flex-wrap gap-x-16 gap-y-8">
                  <div>
                    <div className="lab-readout-value" style={{ color: "#e1fd52" }}>
                      {r.pagespeedMobile}
                    </div>
                    <div className="lab-label mt-2">{tr.mobil}</div>
                  </div>
                  {r.pagespeedDesktop != null && (
                    <div>
                      <div className="lab-readout-value">{r.pagespeedDesktop}</div>
                      <div className="lab-label mt-2">{tr.desktop}</div>
                    </div>
                  )}
                </div>
                <p className="lab-hint mt-6 max-w-[440px] text-body-sm leading-relaxed">
                  {t.tempoNote}
                </p>
              </div>
            </section>
          )}

          {/* ═══ DAS ZITAT ═══ */}
          {r.testimonial && (
            <section data-no-reveal className="relative px-6 pb-28 md:px-12">
              <div className="mx-auto max-w-[1200px]">
                {/* der umbruch kommt aus den daten · wo ein zitat
                    bricht, ist gestaltung und keine berechnung */}
                <ArtQuote
                  className="aq--versetzt"
                  lines={r.testimonial.lines ?? [r.testimonial.quote]}
                  source={`${r.testimonial.author}${r.testimonial.rolle ? ` · ${r.testimonial.rolle}` : ""}`}
                />
              </div>
            </section>
          )}
        </>
      ) : (
        /* ═══ KONZEPT-STUDIE · kurz und ehrlich ═══ */
        <section data-no-reveal className="relative px-6 pb-28 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="lab-display max-w-[14ch] text-headline">
              {t.konzeptH2}
            </h2>
            <p className="mt-8 max-w-[640px] text-lead leading-[1.6] text-[rgba(242,242,242,0.72)]">
              {t.konzeptBody}
            </p>

            {r.notiz && (
              <p className="lab-hint mt-8 max-w-[420px] text-body-sm leading-relaxed">{r.notiz}</p>
            )}

            <div className="mt-10 flex flex-wrap gap-2">
              {r.tags.map((tag) => (
                <span key={tag} className="lab-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SCHLUSS ═══ */}
      <section data-no-reveal className="relative px-6 pb-40 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="lab-chassis relative flex flex-col justify-between gap-10 p-6 md:p-12 lg:flex-row lg:items-center">
            <span className="lab-screw" style={{ left: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, top: 14 }} aria-hidden />
            <span className="lab-screw" style={{ left: 14, bottom: 14 }} aria-hidden />
            <span className="lab-screw" style={{ right: 14, bottom: 14 }} aria-hidden />

            <div className="max-w-[500px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-key-lime">
                {t.ctaPrimary}
              </Link>
              {r.urlExtern && (
                <a
                  href={r.urlExtern}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-key"
                  style={{ width: "auto", padding: "12px 20px" }}
                >
                  {tr.linkLive} ↗
                </a>
              )}
            </div>
          </div>

          <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-[rgba(242,242,242,0.08)] pt-6">
            <Link href={buildPath("referenzen", locale)} className="lab-label">
              ← {t.back}
            </Link>
            <a className="lab-label" href="mailto:nicolas@laconis.be">
              nicolas@laconis.be
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
