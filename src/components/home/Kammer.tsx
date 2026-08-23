import "@/components/home/kammer.css";

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
export function Kammer({ t, variante }: { t: KammerT; variante?: "bahn" }) {
  return (
    <section className="ka" data-variante={variante ?? "voll"} data-no-reveal>
      <div className="ka-innen">
        <p className="ka-satz">
          {t.satz} <span className="ka-betont">{t.betont}</span>
        </p>
        {t.body && <p className="ka-body">{t.body}</p>}
      </div>
    </section>
  );
}
