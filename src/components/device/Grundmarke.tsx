import "@/components/device/grundmarke.css";

/**
 * Grundmarke · die Ebene, die stehen bleibt.
 *
 * HEISST NICHT "Wortmarke" · src/components/Wortmarke.tsx ist das
 * echte Inline-SVG-Logo und wird von Nav, Footer und DeviceNav
 * benutzt. Zwei Komponenten gleichen Namens in einem Projekt sind
 * die Sorte Falle, die erst beim Umbenennen eines Imports zuschnappt.
 *
 * ═══ WOHER DIE IDEE KOMMT ═══
 *
 * bleibtgleich.dev, von Nicolas als Vorbild genannt und im Browser
 * vermessen. Der Kern dieser Seite ist nicht ihr Stack (Webflow,
 * jQuery, GSAP mit SplitText/MorphSVG/Inertia, Barba, Three.js,
 * 56 ScrollTrigger, 2 WebGL2-Canvas) und auch nicht ihre Grösse —
 * ihre grösste Type ist 95 px, kleiner als hier, und Farbe hat sie
 * überhaupt keine.
 *
 * Der Kern ist: die Wörter "bleibt" und "gleich" stehen links und
 * rechts im Bild und BEWEGEN SICH NIE, während in der Mitte alles
 * durchläuft. Die Seite heisst bleibtgleich. Der Mechanismus IST
 * der Name.
 *
 * Genau deshalb ist ein Eins-zu-eins-Nachbau das Einzige, was
 * garantiert nicht mehr originell wäre: ohne den Namen bleibt eine
 * hübsche Fixierung ohne Pointe.
 *
 * Was hier übernommen wird, ist die MECHANIK, und die gehört
 * niemandem: eine Ebene, die steht, während der Inhalt darüber
 * fährt. Sie trägt hier das Wortzeichen, in Bandbreite gesetzt wie
 * der Hero — dieselbe Schrift, dieselbe Achse, drei Nummern grösser.
 * Die Arbeiten fliegen daran vorbei, es steht still. Das ist die
 * Aussage: das kommt alles von hier.
 *
 * ═══ WARUM ES ÜBERHAUPT SICHTBAR IST ═══
 *
 * `.lab-root` trägt `--su-void` (#08080b), `.ar` trug bis hierher
 * `--g-0` (#08080b) — bitgenau derselbe Ton. Die Sektion hat ihren
 * eigenen Grund also nur wiederholt und dabei alles verdeckt, was
 * dahinter liegt. Gibt sie ihn ab, sieht man diese Ebene, ohne dass
 * sich ein einziger Farbwert ändert.
 *
 * Die hellen Flächen (Kammer, Lime-Schlussplatte) decken sie weiter
 * zu, und das ist Absicht: das Zeichen taucht in den dunklen
 * Strecken auf und verschwindet unter den Farbblöcken. Daraus wird
 * ein Rhythmus statt einer Dauerbeschriftung.
 *
 * ═══ KEIN BLEND-MODUS ═══
 *
 * Naheliegend wäre, das Zeichen ÜBER alles zu legen und per
 * `mix-blend-mode: difference` invertieren zu lassen. Das würde
 * aber #e1fd52 auf der Schlussplatte umrechnen — und die Lime-Regel
 * ist, dass diese Farbe nie abgewandelt wird. Also liegt es
 * dahinter, nicht darüber.
 */

export function Grundmarke() {
  return (
    <div className="wm" aria-hidden>
      <span className="wm-wort">lacønis</span>
    </div>
  );
}
