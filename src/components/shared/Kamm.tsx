import { referenzen } from "@/data/referenzen";
import "@/components/shared/kamm.css";

/**
 * Kamm · der Schnitt zwischen zwei Flächen als Zinkenprofil.
 *
 * Bis August 2026 war jede Kante zwischen einer dunklen Sektion und
 * einer Farbfläche eine gerade Linie. Sie ist jetzt ein Profil aus
 * senkrechten Zähnen — verschiedene Breiten, verschiedene Tiefen,
 * alles 90°, keine Rundung. Mehrere Zahnreihen wandern mit
 * unterschiedlichem Tempo übereinander; wo zwei sich kreuzen, klappt
 * ein Zahn weg und wächst woanders neu.
 *
 * ═══ WARUM DAS AUS DEN PROJEKTDATEN KOMMT ═══
 *
 * Jede Zahnreihe ist ein Projekt aus src/data/referenzen.ts. Der
 * Slug wird über FNV-1a in eine Zahl gehasht, daraus fallen Periode,
 * Tiefe, Tempo und Phase. Deterministisch — derselbe Slug ergibt
 * immer dasselbe Profil, auf Server und Client gleich. Kein
 * Math.random, kein Hydration-Mismatch. Kommt ein Projekt dazu,
 * ändert sich das Profil der ganzen Seite von selbst.
 *
 * ═══ WIE DAS BILD ENTSTEHT ═══
 *
 * `mix-blend-mode: difference` auf REIN schwarz/weissen Lagen ist
 * exakt XOR. Ungerade Zahl Zähne über einem Pixel → weiss, gerade →
 * schwarz. Deshalb bleibt das Profil bei sechs Projekten so
 * ausgewogen wie bei zwei; beim normalen Stapeln (ODER) liefe das
 * Band mit jedem Projekt weiter zu.
 *
 * Eingefärbt wird am Schluss mit EINER multiply-Lage:
 *   multiply(#ffffff, #e1fd52) === #e1fd52   (bitgenau)
 *   multiply(#000000, X)       === #000000   (bitgenau)
 * Zwei Töne, keine Opacity, kein Oliv. Die Lime-Regel bleibt
 * unangetastet — das ist der Grund für den Umweg über Schwarz/Weiss
 * statt direkt in Lime zu rechnen.
 *
 * ═══ DIE ANZAHL MUSS UNGERADE SEIN ═══
 *
 * Bei gerader Lagenzahl kippt das ganze Bild ins Negativ: wo alle
 * Lagen weiss sind, ergibt difference(weiss, weiss) = schwarz, die
 * Fläche wird also schwarz statt farbig. `ungerade()` erzwingt das.
 *
 * ═══ EINSCHRÄNKUNG ═══
 *
 * Das Band darf NICHT in einem Container mit `filter` oder
 * `backdrop-filter` sitzen. Beide bilden einen eigenen
 * Stacking-Context und schneiden das Blending ab — der Kamm wäre
 * dann ein graues Rechteck. Also nie in eine Glasfläche legen.
 */

/* FNV-1a · sechs Zeilen, deterministisch, gut genug gestreut für
   vier Kennzahlen pro Slug */
function hash(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h;
}

/* Primzahl-Leiter für die Perioden. Primzahlen, damit sich die
   Reihen erst nach sehr langer Zeit decken — genau das lässt das
   Profil lebendig statt getaktet aussehen.

   DIE WERTE SIND GROSS, und das ist der ganze Punkt. Erster
   Versuch lief mit 47–73 px: auf 1512 px Breite sind das über
   dreissig Wiederholungen, und das Ergebnis liest sich als
   Barcode, nicht als Schlüsselbart. Ein Profil braucht WENIGE
   GROSSE zähne. Bei 131–743 px sind es vier bis elf über die
   Breite. Jede Sprosse ist mindestens 1,4× die vorherige, sonst
   verschwimmen zwei Reihen zu einem Moiré. */
const PERIODEN = [131, 197, 293, 419, 577, 743];

/* Deckel bei sechs. Mehr Lagen kosten Compositing und machen das
   Profil optisch matschig, statt reicher zu werden. */
const MAX_REIHEN = 6;

export type Welle = {
  key: string;
  periode: number;
  tiefe: number;
  fuell: number;
  dauer: number;
  phase: number;
};

/** ungerade Lagenzahl erzwingen · siehe Docstring */
function ungerade(n: number): number {
  return n % 2 === 0 ? n - 1 : n;
}

export function wellen(): Welle[] {
  const quelle = referenzen.slice(0, MAX_REIHEN);
  const anzahl = Math.max(1, ungerade(quelle.length));

  return quelle.slice(0, anzahl).map((r, i) => {
    const h = hash(r.slug);
    return {
      key: r.slug,
      /* jede Reihe eine andere Sprosse der Leiter · der Rang sorgt
         dafür, dass immer eine grosse (≥ 89) und eine kleine dabei
         ist, statt dass der Zufall drei mittlere zieht */
      periode: PERIODEN[(i + (h % 2)) % PERIODEN.length],
      /* ALLE REIHEN AUF VOLLE HÖHE — und das ist die Lehre aus
         zwei verworfenen Versuchen.

         Erst liefen die Reihen mit gestaffelten Tiefen (100 / 71 /
         42 %). Das XOR erzeugt an jeder Tiefengrenze eine
         waagerechte Kante, und heraus kam ein Blockmuster wie ein
         QR-Ausschnitt — ein dekoratives Band, das neben der Kante
         liegt, statt die Kante zu SEIN.

         Bei voller Höhe kommt die ganze Variation aus der BREITE.
         Genau dort wirkt das XOR: wo zwei Reihen sich kreuzen,
         verschwindet ein Zahn und wächst daneben neu. Die Zähne
         hängen durchgehend vom Schwarz darüber ins Lime — es ist
         eine gebissene Kante, kein Muster. */
      tiefe: 100,
      /* Füllung um 44 % · bei genau 50 % wären Zahn und Lücke
         gleich breit, das liest sich als Raster statt als Profil */
      fuell: 38 + ((h >>> 8) % 13),
      /* Tempo zwischen 34 und 58 s · so langsam, dass man die
         Bewegung nicht verfolgt, aber nach ein paar Sekunden merkt,
         dass sich etwas geändert hat */
      dauer: 34 + ((h >>> 16) % 25),
      /* Startversatz · sonst stünden alle Reihen im Gleichtakt */
      phase: (h >>> 24) % 97,
    };
  });
}

export function Kamm({
  richtung = "ab",
  ton,
  className,
}: {
  /** `ab` = Zähne hängen nach unten, `auf` = sie wachsen nach oben */
  richtung?: "ab" | "auf";
  /** die Farbe der Fläche, in die der Kamm beisst */
  ton: string;
  className?: string;
}) {
  const reihen = wellen();

  return (
    <div
      className={["kamm", className].filter(Boolean).join(" ")}
      data-richtung={richtung}
      style={{ ["--kamm-ton" as string]: ton }}
      aria-hidden
    >
      <div className="kamm-sockel" />
      <div className="kamm-xor">
        {reihen.map((w) => (
          <i
            key={w.key}
            style={
              {
                "--periode": `${w.periode}px`,
                "--tiefe": `${w.tiefe}%`,
                "--fuell": `${w.fuell}%`,
                "--dauer": `${w.dauer}s`,
                "--phase": `${w.phase}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="kamm-farbe" />
    </div>
  );
}
