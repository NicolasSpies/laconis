"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LabNav } from "@/components/lab/LabNav";
import { SplitFlapBoard, type BoardRow } from "@/components/referenzen/SplitFlapBoard";
import { REFERENZEN } from "@/components/referenzen/referenzen.dict";
import { referenzen } from "@/data/referenzen";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/lab/lab.css";
import "@/components/referenzen/splitflap.css";

/**
 * ReferenzenDevice · die referenzen als fallblatt-tafel.
 *
 * ein einziges gerät trägt die ganze seite: die tafel ist hero UND
 * navigation, das datenblatt drunter ist die ruhige auflösung. mehr
 * braucht es bei drei projekten auch nicht · eine zweite grosse geste
 * wäre nur kaschieren.
 *
 * ehrlichkeit ist hier das konzept: was nicht live ist, bekommt den
 * konzept-stempel. das steht so schon auf der alten seite und bleibt.
 */

export function ReferenzenDevice() {
  const locale = useLocale();
  const t = REFERENZEN[locale];
  const [sel, setSel] = useState(0);

  useEffect(() => {
    document.body.dataset.lab = "1";
    return () => {
      delete document.body.dataset.lab;
    };
  }, []);

  const rows: BoardRow[] = referenzen.map((r) => ({
    key: r.slug,
    name: r.name,
    meta: r.kategorieLabel,
    jahr: r.jahr,
    led: r.istEcht ? "1" : r.inArbeit ? "wip" : "0",
  }));

  const r = referenzen[sel]!;
  const stamp = r.istEcht ? t.stampLive : r.inArbeit ? t.stampWip : t.stampKonzept;
  const stampKind = r.istEcht ? "live" : "konzept";

  return (
    <div className="lab-root" data-no-reveal>
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
      </div>

      <LabNav />

      {/* ═══ DIE TAFEL ═══ */}
      <section
        data-no-reveal
        className="relative flex min-h-[100svh] flex-col justify-center px-6 pb-24 pt-28 md:px-12"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="lab-boot mb-8 flex items-center gap-3" style={{ animationDelay: "80ms" }}>
            <span
              className="lab-led-idle h-1.5 w-1.5 rounded-full"
              style={{ background: "#e1fd52", boxShadow: "0 0 10px #e1fd52" }}
            />
            <span className="lab-label">{t.kicker}</span>
          </div>

          <h1
            className="lab-display lab-boot text-[clamp(2.6rem,8vw,7rem)]"
            style={{ animationDelay: "180ms" }}
          >
            {t.h1a}
            <br />
            <span style={{ color: "#e1fd52" }}>{t.h1b}</span>
          </h1>

          <p
            className="lab-boot mt-8 max-w-[460px] text-[15px] leading-relaxed"
            style={{ animationDelay: "300ms", color: "rgba(242,242,242,0.62)" }}
          >
            {t.sub}
          </p>

          <div className="lab-boot mt-14" style={{ animationDelay: "420ms" }}>
            <SplitFlapBoard rows={rows} selected={sel} onSelect={setSel} />
          </div>

          <span className="lab-label lab-boot mt-8 block" style={{ animationDelay: "620ms" }}>
            ↑ {t.boardHint}
          </span>
        </div>
      </section>

      {/* ═══ DAS DATENBLATT · ruhig ═══ */}
      <section data-no-reveal className="relative px-6 pb-32 md:px-12">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
            <div>
              <span className="lab-stamp" data-kind={stampKind}>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  aria-hidden
                  style={{
                    background: r.istEcht ? "#e1fd52" : "rgba(242,242,242,0.4)",
                    boxShadow: r.istEcht ? "0 0 8px #e1fd52" : "none",
                  }}
                />
                {stamp}
              </span>

              <h2 className="lab-display mt-6 text-[clamp(2rem,5vw,3.6rem)]">{r.name}</h2>

              {r.notiz && (
                <p className="lab-hint mt-4 max-w-[380px] text-[13px] leading-relaxed">{r.notiz}</p>
              )}

              <div className="mt-8 flex flex-wrap gap-2">
                {r.tags.map((tag) => (
                  <span key={tag} className="lab-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  href={`${buildPath("referenzen", locale)}/${r.slug}`}
                  className="lab-key"
                  style={{ width: "auto", padding: "12px 20px" }}
                >
                  {t.linkCase}
                </Link>
                {r.urlExtern && (
                  <a
                    href={r.urlExtern}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-key"
                    style={{ width: "auto", padding: "12px 20px" }}
                  >
                    {t.linkLive} ↗
                  </a>
                )}
              </div>
            </div>

            <div>
              {/* kein status-zeile hier · der stempel links sagt es
                  schon, zweimal dasselbe liest sich wie ein fehler */}
              <div className="sf-sheet-row">
                <span className="lab-label">{t.lLeistung}</span>
                <span className="text-[14px] text-[#f2f2f2]">{r.kurz}</span>
              </div>
              <div className="sf-sheet-row">
                <span className="lab-label">{t.lOrt}</span>
                <span className="text-[14px] text-[#f2f2f2]">{r.ort}</span>
              </div>
              <div className="sf-sheet-row">
                <span className="lab-label">{t.lJahr}</span>
                <span className="text-[14px] text-[#f2f2f2]">{r.jahr}</span>
              </div>

              {/* zahlen gibt es nur, wo wirklich gemessen wurde */}
              {r.pagespeedMobile != null && (
                <div className="sf-sheet-row">
                  <span className="lab-label">{t.lTempo}</span>
                  <span className="flex flex-wrap gap-x-8 gap-y-2">
                    <span>
                      <span
                        className="lab-readout-value"
                        style={{ fontSize: "1.7rem", color: "#e1fd52" }}
                      >
                        {r.pagespeedMobile}
                      </span>
                      <span className="lab-label ml-2">{t.mobil}</span>
                    </span>
                    {r.pagespeedDesktop != null && (
                      <span>
                        <span className="lab-readout-value" style={{ fontSize: "1.7rem" }}>
                          {r.pagespeedDesktop}
                        </span>
                        <span className="lab-label ml-2">{t.desktop}</span>
                      </span>
                    )}
                  </span>
                </div>
              )}

              {r.testimonial && (
                <div className="sf-sheet-row">
                  <span className="lab-label">{t.lStimme}</span>
                  <blockquote>
                    <p className="text-[15px] leading-relaxed text-[rgba(242,242,242,0.85)]">
                      „{r.testimonial.quote}"
                    </p>
                    <footer className="lab-label mt-3">
                      {r.testimonial.author}
                      {r.testimonial.rolle ? ` · ${r.testimonial.rolle}` : ""}
                    </footer>
                  </blockquote>
                </div>
              )}
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
