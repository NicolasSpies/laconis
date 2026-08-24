"use client";

import { CONTACT } from "@/config/contact";
import { referenzen } from "@/data/referenzen";
import { HOME } from "@/components/home/home.dict";
import { useLocale } from "@/i18n/useLocale";
import { DeviceNav } from "@/components/device/DeviceNav";
import { Lauf } from "@/components/device/Lauf";
import { Wortmarke } from "@/components/device/Wortmarke";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { Kopf } from "@/components/home/Kopf";
import { Kammer } from "@/components/home/Kammer";
import { Arbeiten } from "@/components/home/Arbeiten";
import { Laufband } from "@/components/home/Laufband";
import { EigenesCms } from "@/components/home/EigenesCms";
import { Schluss } from "@/components/home/Schluss";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";
import "@/components/home/kopf.css";
import "@/components/home/kammer.css";
import "@/components/home/arbeiten.css";
import "@/components/home/anflug.css";
import "@/components/home/laufband.css";
import "@/components/home/eigenescms.css";
import "@/components/home/schluss.css";

/**
 * Startseite · der Rhythmus IST das Erlebnis.
 *
 * die farbe wechselt dreimal hart, ohne verlauf dazwischen:
 *
 *   kopf        dunkel   laut     chrom-koerper, riesensatz
 *   kammer      HELL     ruhe     ein satz, nichts bewegt sich
 *   arbeiten    dunkel   mittel   drei zeilen, alle gleichrangig
 *   band        lime     mittel   eine echte nachricht
 *   contentcore dunkel   mittel   der einzige moment, der behauptet
 *   schluss     LIME     knall    die einzige lime-vollflaeche
 *
 * die helle kammer existiert nur, damit der naechste schnitt wehtut.
 * zwischen zwei dunklen kapiteln ist eine helle flaeche der lauteste
 * moment, den man ohne jeden effekt haben kann.
 *
 * KEINE arbeit steht im vordergrund. eine runde lang lief die eine
 * mit echten aufnahmen gross und randlos oben, die anderen zwei als
 * zeilen darunter · das war eine hierarchie, die hier nicht
 * hingehoert. drei zeilen, gleiche groesse, gleiche form.
 */

export function HomeDevice() {
  const locale = useLocale();
  const t = HOME[locale];
  const arbeiten = buildPath("referenzen", locale);

  return (
    <div className="lab-root" data-no-reveal>
      <Lauf />
      <Wortmarke />
      <DeviceNav />

      <Kopf
        t={{
          kicker: t.kicker,
          h1: t.h1,
          akzent: t.akzent,
          zeile: t.zeile,
        }}
      />

      <Kammer t={t.kammer} />

      <Arbeiten werke={referenzen} t={{ h2: t.arbeitenH2, alle: t.arbeitenAlle }} href={arbeiten} />

      <Laufband worte={t.band} />

      <EigenesCms t={t.cms} href={buildPath("leistung", locale)} />

      <Schluss
        t={t.schluss}
        href={buildPath("kontakt", locale)}
        mail={CONTACT.email}
        fuss={<DeviceFuss aufLime />}
      />
    </div>
  );
}
