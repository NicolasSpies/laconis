/**
 * Kammer · der helle Schnitt.
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
};

export function Kammer({ t }: { t: KammerT }) {
  return (
    <section className="ka" data-no-reveal>
      <p className="ka-satz">
        {t.satz} <span className="ka-betont">{t.betont}</span>
      </p>
    </section>
  );
}
