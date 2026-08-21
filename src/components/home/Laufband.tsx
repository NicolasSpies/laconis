/**
 * Laufband · der übergang vom hellen kopf in den dunklen raum.
 *
 * ein wortband, das nie stehenbleibt. es sagt in acht wörtern, was
 * hier gebaut wird · ohne einen einzigen satz, ohne überschrift,
 * ohne kachel. das ist der unterschied zwischen einer liste und
 * einer bewegung.
 *
 * warum es hier steht: zwischen grau und schwarz liegt sonst eine
 * harte kante. das band nimmt den fall auf und gibt der seite einen
 * rhythmuswechsel, bevor die arbeiten kommen.
 *
 * nebenbei trägt es die begriffe, die in der meta-description stehen ·
 * echter, sichtbarer text, kein verstecktes keyword-feld.
 *
 * ═══ technik ═══
 *
 * CSS-keyframes, kein javascript · die hausregel ist da eindeutig:
 * was von selbst laufen muss, läuft in CSS, sonst steht es im
 * hintergrund-tab still.
 *
 * die wörter stehen ZWEIMAL im markup. das ist kein versehen: eine
 * kopie läuft aus dem bild, während die zweite hereinkommt · bei
 * -50 % ist der zustand identisch zum start, deshalb springt nichts.
 * die zweite kopie ist aria-hidden, sonst liest ein screenreader
 * alles doppelt.
 */

export function Laufband({ worte }: { worte: string[] }) {
  const band = (versteckt: boolean) => (
    <span className="lb-spur" aria-hidden={versteckt || undefined}>
      {worte.map((w) => (
        <span key={w} className="lb-wort">
          {w}
          <i aria-hidden>·</i>
        </span>
      ))}
    </span>
  );

  return (
    <div className="lb">
      <div className="lb-lauf">
        {band(false)}
        {band(true)}
      </div>
    </div>
  );
}
