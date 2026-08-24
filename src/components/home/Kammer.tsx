import { Kamm } from "@/components/shared/Kamm";
import "@/components/home/kammer.css";

/* dieselbe farbe wie .ka in kammer.css · steht hier, weil der
   kamm sie als prop braucht und zwei wahrheiten für dieselbe
   fläche genau der fehler wären, den die farbrunde beseitigt hat */
const PAPIER = "#e9e9e7";

/**
 * Kammer · der helle Schnitt.
 *
 * DIE KOMPONENTE BRINGT IHR CSS SELBST MIT. sie lag bis august
 * 2026 nur auf home und /studio, deren devices kammer.css
 * importierten. seit /arbeiten und /kontakt sie auch benutzen,
 * hing die datei am aufrufer · dort rendert die kammer sonst
 * durchsichtig, also als unsichtbare lücke. genau das ist
 * passiert (gemessen: background rgba(0,0,0,0)).
 * gleiche lehre wie bei LiveEditor/panel.css.
 *
 * eine bildschirmhoehe, ein satz, sonst nichts. keine bewegung, kein
 * bild, kein knopf. sie existiert NUR, damit der naechste schnitt
 * wehtut · zwischen zwei dunklen kapiteln ist eine helle flaeche der
 * lauteste moment, den man ohne jeden effekt haben kann.
 *
 * das ist die anlage von schultzschultz: schwarzer hero, harter
 * schnitt, weisse flaeche mit einem einzigen satz. dort steht die
 * gesamte prosa der startseite in EINEM satz.
 *
 * KEIN lime hier. auf #E9E9E7 hat #e1fd52 rund 1.2:1 · die farbe
 * gehoert den dunklen kapiteln, hier traegt ink.
 *
 * kein verlauf an den kanten. der schnitt muss hart sein, sonst ist
 * er kein schnitt.
 */

export type KammerT = {
  satz: string;
  betont: string;
  /** optionale zweite zeile · leiser, für seiten die mehr brauchen */
  body?: string;
};

/**
 * `bahn` ist die schmale fassung. bis august 2026 rendern home UND
 * /studio dieselbe kammer in voller höhe an derselben stelle
 * (sektion zwei) · ein schnitt, der auf der nächsten seite an
 * gleicher position mit gleichem mass wiederkommt, tut beim zweiten
 * mal nicht mehr weh. jede unterseite bekommt jetzt genau eine, an
 * anderer stelle und in anderem mass.
 */
export function Kammer({
  t,
  variante,
  als = "p",
  kamm = false,
}: {
  t: KammerT;
  variante?: "bahn";
  /** Zinkenprofil an der OBEREN kante · standardmässig aus.

      erster wurf hatte den kamm an BEIDEN kanten jeder kammer, auf
      allen vier seiten — zehn instanzen. nicolas: "sieht mir
      teilweise zu sehr aus wie ein piano. gerne ab und zu solche
      sachen mit dem kamm aber nicht immer."

      die diagnose ist genau: eine einzelne gebissene kante liest
      sich als KANTE. zwei gespiegelte, die eine helle bahn
      einrahmen, ergeben eine KLAVIATUR. deshalb nur noch oben, und
      nur dort, wo es gesetzt wird. */
  kamm?: boolean;
  /** `h2`, wenn der satz die überschrift der sektion IST.
      auf /arbeiten trägt er den ehrlich-abschnitt · er sieht aus
      wie eine überschrift (gleiche grösse wie die h2 daneben) und
      stand trotzdem in keiner gliederung. */
  als?: "p" | "h2";
}) {
  const Satz = als;
  return (
    <>
      {/* nur die OBERE kante, und nur wenn gesetzt · der harte
          schnitt an der unterkante bleibt hart, so wie er gedacht
          war */}
      {kamm && <Kamm ton={PAPIER} platz="kammer-oben" />}

      <section className="ka" data-variante={variante ?? "voll"} data-no-reveal>
        <div className="ka-innen">
          <Satz className="ka-satz">
            {t.satz}
            {/* ohne betonung KEIN leeres span · sonst steht auf der
                seite ein element, das nichts trägt */}
            {t.betont ? <> <span className="ka-betont">{t.betont}</span></> : null}
          </Satz>
          {t.body && <p className="ka-body">{t.body}</p>}
        </div>
      </section>
    </>
  );
}
