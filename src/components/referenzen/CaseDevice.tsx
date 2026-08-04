"use client";

import { useEffect } from "react";
import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { ClaimSwitch } from "@/components/referenzen/ClaimSwitch";
import { ProjektAnsicht } from "@/components/referenzen/ProjektAnsicht";
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

  useEffect(() => {
    document.body.dataset.lab = "1";
    return () => {
      delete document.body.dataset.lab;
    };
  }, []);

  const isLive = Boolean(r.istEcht);
  const stamp = isLive ? tr.stampLive : r.inArbeit ? tr.stampWip : tr.stampKonzept;

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <DeviceNav />

      {/* ═══ KOPF ═══ */}
      <section data-no-reveal className="relative px-6 pb-12 pt-36 md:px-12 md:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <Link href={buildPath("referenzen", locale)} className="lab-label lab-boot inline-block">
            ← {t.back}
          </Link>

          <span className="lab-stamp lab-boot mt-7 block w-fit" data-kind={isLive ? "live" : "konzept"}>
            {stamp}
          </span>

          <h1
            className="lab-display lab-boot mt-6 text-[clamp(2.4rem,7.5vw,6rem)]"
            style={{ animationDelay: "120ms" }}
          >
            {r.name.toLowerCase()}
          </h1>
          <p
            className="lab-boot mt-6 max-w-[520px] text-[clamp(1rem,1.8vw,1.25rem)] leading-[1.55] text-[rgba(242,242,242,0.8)]"
            style={{ animationDelay: "220ms" }}
          >
            {r.kurz}
          </p>

          <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
            {[
              [t.lOrt, r.ort],
              [t.lJahr, String(r.jahr)],
              [t.lArt, r.kategorieLabel],
            ].map(([k, v]) => (
              <div key={k}>
                <div className="lab-label">{k}</div>
                <div className="mt-1.5 text-[15px] text-[#f2f2f2]">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isLive ? (
        <>
          {/* ═══ DER BEFUND · ruhig, die geschichte ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="lab-display max-w-[14ch] text-[clamp(2rem,5.5vw,3.8rem)]">
                {t.auftragH2}
              </h2>
              <p className="mt-7 max-w-[620px] text-[clamp(1rem,1.7vw,1.2rem)] leading-[1.6] text-[rgba(242,242,242,0.75)]">
                {t.auftragLead}
              </p>

              <div className="mt-12 grid gap-x-16 md:grid-cols-2">
                {t.auftrag.map(([title, body], i) => (
                  <div key={title} className="lx-row">
                    <span className="lx-row-nr">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-[rgba(242,242,242,0.5)]">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* das briefing in seinen worten · so kurz stand es da */}
              <p className="lab-display mt-16 max-w-[900px] text-[clamp(1.5rem,4vw,2.8rem)]">
                <span style={{ color: "rgba(242,242,242,0.35)" }}>„</span>
                {t.briefing}
                <span style={{ color: "rgba(242,242,242,0.35)" }}>"</span>
              </p>
            </div>
          </section>

          {/* ═══ DER UMSCHALTER · das argument in typografie ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
                <h2 className="lab-display max-w-[16ch] text-[clamp(1.8rem,4.6vw,3.2rem)]">
                  {t.claimH2}
                </h2>
                <p className="lab-hint max-w-[340px] text-[12.5px] leading-relaxed">
                  {t.claimLead}
                </p>
              </div>
              <ClaimSwitch t={t.claim} />
            </div>
          </section>

          {/* ═══ DIE GEBAUTE SEITE · funktioniert bei jedem projekt ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
                <h2 className="lab-display max-w-[16ch] text-[clamp(1.8rem,4.6vw,3.2rem)]">
                  {t.ansichtH2}
                </h2>
                <p className="lab-hint max-w-[340px] text-[12.5px] leading-relaxed">
                  {t.ansichtLead}
                </p>
              </div>
              <ProjektAnsicht shots={r.shots} t={t.ansicht} />
            </div>
          </section>

          {/* ═══ WAS DRIN STECKT · ruhig ═══ */}
          <section data-no-reveal className="relative px-6 pb-28 md:px-12">
            <div className="mx-auto max-w-[1200px]">
              <h2 className="lab-display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">
                {t.detailsH2}
              </h2>
              <p className="mt-7 max-w-[560px] text-[15px] leading-relaxed text-[rgba(242,242,242,0.55)]">
                {t.detailsLead}
              </p>
              <div className="mt-12 grid gap-x-16 md:grid-cols-2">
                {t.details.map(([title, body], i) => (
                  <div key={title} className="lx-row">
                    <span className="lx-row-nr">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[17px] font-medium tracking-[-0.01em] text-[#f2f2f2]">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-[46ch] text-[13.5px] leading-relaxed text-[rgba(242,242,242,0.5)]">
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
                <p className="lab-hint mt-6 max-w-[440px] text-[12.5px] leading-relaxed">
                  {t.tempoNote}
                </p>
              </div>
            </section>
          )}

          {/* ═══ DAS ZITAT ═══ */}
          {r.testimonial && (
            <section data-no-reveal className="relative px-6 pb-28 md:px-12">
              <div className="mx-auto max-w-[1200px]">
                <blockquote>
                  <p className="lab-display max-w-[900px] text-[clamp(1.6rem,4.4vw,3.2rem)]">
                    „{r.testimonial.quote}"
                  </p>
                  <footer className="lab-label mt-8">
                    {r.testimonial.author}
                    {r.testimonial.rolle ? ` · ${r.testimonial.rolle}` : ""}
                  </footer>
                </blockquote>
              </div>
            </section>
          )}
        </>
      ) : (
        /* ═══ KONZEPT-STUDIE · kurz und ehrlich ═══ */
        <section data-no-reveal className="relative px-6 pb-28 md:px-12">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="lab-display max-w-[14ch] text-[clamp(2rem,5vw,3.4rem)]">
              {t.konzeptH2}
            </h2>
            <p className="mt-8 max-w-[640px] text-[clamp(1rem,1.7vw,1.2rem)] leading-[1.6] text-[rgba(242,242,242,0.72)]">
              {t.konzeptBody}
            </p>

            {r.notiz && (
              <p className="lab-hint mt-8 max-w-[420px] text-[13px] leading-relaxed">{r.notiz}</p>
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
              <h2 className="lab-display text-[clamp(1.9rem,4.2vw,3rem)]">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-[13.5px] leading-relaxed">{t.ctaBody}</p>
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
