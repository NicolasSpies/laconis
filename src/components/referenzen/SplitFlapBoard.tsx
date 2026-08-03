"use client";

import { useEffect, useRef, useState } from "react";

/**
 * SplitFlapBoard · die fallblatt-tafel, die gleichzeitig die navigation ist.
 *
 * jede zeile ist ein projekt UND der schalter dafür · antippen wählt aus,
 * das datenblatt drunter zieht nach. ein mechanismus, zwei aufgaben.
 *
 * kleinbuchstaben statt flughafen-versalien · das nimmt dem prinzip das
 * retro-klischee und passt zur sitewide-typo.
 *
 * technik:
 *  · EIN interval für die ganze tafel. jede zelle rückt pro tick um ein
 *    zeichen weiter, bis sie ihr ziel hat. buchstaben weit hinten im
 *    alphabet brauchen länger · genau das macht den echten rhythmus.
 *  · gerendert wird nur, wenn sich wirklich was geändert hat.
 *  · nach der landung flattert alle paar sekunden eine zufällige zelle
 *    kurz nach. mikro-animationen laufen immer (mobil gibt es kein hover).
 */

const CHARS = " abcdefghijklmnopqrstuvwxyzäöüéß0123456789·+.&";
const COLS = 16;
const TICK = 52;

function toCells(name: string): number[] {
  const s = name.toLowerCase().slice(0, COLS).padEnd(COLS, " ");
  return [...s].map((c) => {
    const i = CHARS.indexOf(c);
    return i < 0 ? 0 : i;
  });
}

export type BoardRow = { key: string; name: string; meta: string; jahr: number; led: "1" | "wip" | "0" };

export function SplitFlapBoard({
  rows,
  selected,
  onSelect,
}: {
  rows: BoardRow[];
  selected: number;
  onSelect: (i: number) => void;
}) {
  const targets = useRef(rows.map((r) => toCells(r.name)));
  const [cells, setCells] = useState<number[][]>(() => rows.map(() => Array(COLS).fill(0)));
  const cur = useRef<number[][]>(rows.map(() => Array(COLS).fill(0)));
  const tick = useRef(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      cur.current = targets.current.map((r) => [...r]);
      setCells(cur.current.map((r) => [...r]));
      return;
    }

    const id = setInterval(() => {
      tick.current += 1;
      let changed = false;

      for (let r = 0; r < cur.current.length; r++) {
        for (let c = 0; c < COLS; c++) {
          /* gestaffelter start: zeile für zeile, spalte für spalte ·
             sonst rasselt die ganze tafel als ein block los */
          if (tick.current < r * 4 + c) continue;
          const want = targets.current[r]![c]!;
          if (cur.current[r]![c] === want) continue;
          cur.current[r]![c] = (cur.current[r]![c]! + 1) % CHARS.length;
          changed = true;
        }
      }

      if (changed) setCells(cur.current.map((r) => [...r]));
    }, TICK);

    /* nachflattern · eine zufällige zelle bekommt einen kleinen versatz
       und muss zurücklaufen. sieht aus wie eine tafel, die lebt. */
    const flutter = setInterval(() => {
      const r = Math.floor(Math.random() * cur.current.length);
      const c = Math.floor(Math.random() * COLS);
      if (cur.current[r]![c] !== targets.current[r]![c]) return;
      cur.current[r]![c] = (cur.current[r]![c]! - 3 + CHARS.length) % CHARS.length;
    }, 3800);

    return () => {
      clearInterval(id);
      clearInterval(flutter);
    };
  }, []);

  return (
    <div className="sf-board">
      {rows.map((row, i) => (
        <button
          key={row.key}
          type="button"
          className="sf-line"
          data-on={i === selected ? "1" : "0"}
          aria-pressed={i === selected}
          onClick={() => onSelect(i)}
        >
          {/* echter name für screenreader · die blätter sind nur bild */}
          <span className="sr-only">{row.name}</span>

          <span className="sf-flaps" aria-hidden>
            {cells[i]!.map((idx, c) => {
              const ch = CHARS[idx]!;
              return (
                <span key={c} className="sf-cell">
                  {/* key = zeichen · react hängt das span neu ein und die
                      fall-animation läuft dadurch bei jedem wechsel neu */}
                  <span key={`${idx}-${ch}`} className="sf-char">
                    {ch === " " ? " " : ch}
                  </span>
                </span>
              );
            })}
          </span>

          <span className="sf-meta" aria-hidden>
            <span className="lab-label">{row.meta}</span>
            <span className="lab-label">{row.jahr}</span>
          </span>

          <span className="sf-led" data-live={row.led} aria-hidden />
        </button>
      ))}
    </div>
  );
}
