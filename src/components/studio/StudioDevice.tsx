"use client";

import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/config/contact";
import { STUDIO } from "@/components/studio/studio.dict";
import { LEISTUNG } from "@/components/leistung/leistung.dict";
import { useLocale } from "@/i18n/useLocale";
import { DeviceNav } from "@/components/device/DeviceNav";
import { Kammer } from "@/components/home/Kammer";
import { LiveEditor } from "@/components/leistung/LiveEditor";
import { Schluss } from "@/components/home/Schluss";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/home/kammer.css";
import "@/components/home/schluss.css";
import "@/components/studio/studio.css";

/**
 * Studio · eine Seite aus dreien.
 *
 * frueher lagen hier drei getrennte routen: /leistung, /preise und
 * /ueber-mich. drei seiten fuer eine person mit drei projekten war
 * eine seite zu viel, zweimal.
 *
 * die reihenfolge folgt der frage, die jemand wirklich hat:
 *
 *   hero        dunkel   wer ist das
 *   kammer      HELL     warum baut er selbst · EIN satz
 *   editor      dunkel   das CMS · anfassen statt lesen
 *   person      dunkel   das gesicht dahinter
 *   weg         dunkel   wie es dazu kam · zeilen, keine kacheln
 *   grenze      dunkel   was er NICHT macht · drei woerter
 *   preis       dunkel   ein satz, keine zahl
 *   schluss     LIME     reden wir.
 *
 * KEINE zahlen, kein feature-vergleich, keine tabelle. der
 * plugin-zaehler stand hier mal und war ein entwickler-argument
 * gegenueber einem anderen entwickler.
 *
 * KEINE preise. Nicolas hat entschieden: preis nach gespraech. die
 * alten zahlen standen sogar in der meta-description und damit im
 * suchergebnis · die sind mit raus.
 */

export function StudioDevice() {
  const locale = useLocale();
  const t = STUDIO[locale];
  /* der editor bringt sein eigenes woerterbuch mit · zweimal
     pflegen hiesse, dass die beiden still auseinanderlaufen */
  const editor = LEISTUNG[locale].editor;

  return (
    <div className="lab-root" data-no-reveal>
      <DeviceNav />

      <section className="st-hero" data-no-reveal>
        <div className="st-innen">
          <p className="st-kicker">{t.kicker}</p>
          <h1 className="st-h1">
            {t.h1} <span className="st-akzent">{t.h1akzent}</span>
          </h1>
          <p className="st-lead">{t.lead}</p>
        </div>
      </section>

      <Kammer t={t.kammer} />

      {/* ═══ DAS CMS · anfassen statt lesen ═══ */}
      <section className="st-block" data-no-reveal>
        <div className="st-innen">
          <div className="st-kopfzeile">
            <h2 className="st-h2">{t.cmsH2}</h2>
            <p className="st-neben">{t.cmsLead}</p>
          </div>
          <LiveEditor t={editor} />
        </div>
      </section>

      {/* ═══ DIE PERSON ═══ */}
      <section className="st-block" data-no-reveal>
        <div className="st-innen st-person">
          <figure className="st-portrait">
            <Image
              src="/portrait-platzhalter.jpg"
              alt=""
              width={1400}
              height={1867}
              sizes="(max-width: 860px) 88vw, 38vw"
            />
            <figcaption className="st-portrait-note">{t.portraitNote}</figcaption>
          </figure>

          <div>
            <h2 className="st-h2">{t.personH2}</h2>
            <p className="st-fliess">{t.bio}</p>
            <p className="st-fliess st-fliess--leise">{t.bioSub}</p>
          </div>
        </div>
      </section>

      {/* ═══ DER WEG · zeilen, keine kacheln ═══ */}
      <section className="st-block" data-no-reveal>
        <div className="st-innen">
          <h2 className="st-h2">{t.wegH2}</h2>
          <ul className="st-weg">
            {t.weg.map(([wo, was]) => (
              <li key={wo} className="st-weg-zeile">
                <span className="st-weg-wo">{wo}</span>
                <span className="st-weg-was">{was}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══ DIE GRENZE · drei woerter, keine beschreibungen ═══ */}
      <section className="st-block" data-no-reveal>
        <div className="st-innen">
          <h2 className="st-h2">{t.grenzeH2}</h2>
          <p className="st-gross">{t.grenze.join(" · ")}</p>
          <p className="st-fliess st-fliess--leise">{t.grenzeFuss}</p>
        </div>
      </section>

      {/* ═══ PREIS · ein satz, keine zahl ═══ */}
      <section className="st-block" data-no-reveal>
        <div className="st-innen">
          <h2 className="st-h2">{t.preisH2}</h2>
          <p className="st-fliess">{t.preis}</p>
          <Link href={buildPath("kontakt", locale)} className="lab-link st-abstand">
            {t.preisKey}
          </Link>
        </div>
      </section>

      <Schluss
        t={t.schluss}
        href={buildPath("kontakt", locale)}
        mail={CONTACT.email}
      />

      <footer className="relative z-[1] mx-auto flex max-w-shell flex-wrap justify-between gap-4 border-t border-[var(--ln-hair)] px-gut pb-rh-s pt-6">
        <a className="lab-label" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        <span className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href={buildPath("impressum", locale)} className="lab-label">
            {t.fussImpressum}
          </Link>
          <Link href={buildPath("datenschutz", locale)} className="lab-label">
            {t.fussDatenschutz}
          </Link>
        </span>
      </footer>
    </div>
  );
}
