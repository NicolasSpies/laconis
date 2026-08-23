"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { DeviceFuss } from "@/components/device/DeviceFuss";
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
      {/* DREI spans · der dritte ist der heisse kern, den
          .lab-ambient span:nth-child(3) einfaerbt. alle aufrufer
          rendern bisher nur zwei, die regel lief ins leere. */}
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <DeviceNav />

      {/* ═══ KOPF · die gebaute seite steht sofort da ═══ */}
      <section data-no-reveal className="relative isolate px-gut pb-rh-s pt-hero">
        <HeroAtmo
          variant="schweben"
          /* ohne shots rendert die variante NICHTS · sie lief seit dem
             umbau leer, weil der aufrufer sie nie durchgereicht hat */
          shots={r.shots ? [r.shots.desktop, r.shots.mobile] : undefined}
        />
        <div className="mx-auto grid max-w-shell items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
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
            className="lab-display lab-boot mt-6 text-display"
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
          <section data-no-reveal className="relative px-gut pb-rh-m">
            <div className="mx-auto max-w-shell">
              <h2 className="lab-display max-w-[14ch] text-headline">
                {t.auftragH2}
              </h2>
              <p className="mt-7 max-w-measure text-lead leading-[1.6] text-[rgba(242,242,242,0.75)]">
                {t.auftragLead}
              </p>

              {/* das briefing in seinen worten · so kurz stand es da */}
              <ArtQuote className="aq--versetzt mt-20" lines={t.briefing} />
            </div>
          </section>

          {/* ═══ DER UMSCHALTER · das argument in typografie ═══ */}
          <section data-no-reveal className="relative px-gut pb-rh-m">
            <div className="mx-auto max-w-shell">
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

          {/* ═══ DAS ZITAT ═══ */}
          {r.testimonial && (
            <section data-no-reveal className="relative px-gut pb-rh-m">
              <div className="mx-auto max-w-shell">
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
        <section data-no-reveal className="relative px-gut pb-rh-m">
          <div className="mx-auto max-w-shell">
            <h2 className="lab-display max-w-[14ch] text-headline">
              {t.konzeptH2}
            </h2>
            <p className="mt-8 max-w-measure text-lead leading-[1.6] text-[rgba(242,242,242,0.72)]">
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
      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="mx-auto max-w-shell">
          <div className="gl relative flex flex-col justify-between gap-10 p-8 md:p-14 lg:flex-row lg:items-center">

            <div className="max-w-[500px]">
              <h2 className="lab-display text-headline">{t.ctaH2}</h2>
              <p className="lab-hint mt-4 text-body-sm leading-relaxed">{t.ctaBody}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link href={buildPath("kontakt", locale)} className="lab-cta">
                {t.ctaPrimary}
              </Link>
              {r.urlExtern && (
                <a
                  href={r.urlExtern}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lab-cta lab-cta--leise"
                >
                  {tr.linkLive} ↗
                </a>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* siehe KontaktDevice · ausserhalb der sektion, sonst misst
          die zeile 936 statt 1080px */}
      <DeviceFuss
        vorne={
          <Link href={buildPath("referenzen", locale)} className="lab-label-lg">
            ← {t.back}
          </Link>
        }
      />
    </div>
  );
}
