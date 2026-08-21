"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";

/**
 * Richtung A · die seite schreibt sich um.
 *
 * die idee in einem satz: JEDER text auf dieser seite gehört dem
 * besucher. er klickt rein und schreibt ihn um · ohne login, ohne
 * anleitung, ohne bedienpult.
 *
 * warum das die stärkste der drei ist:
 * · es ist einzigartig. niemand macht das.
 * · es IST das produkt. ContentCore ist genau diese geste.
 * · es beweist kommunikation, statt sie zu behaupten · ich habe die
 *   worte gewählt, der besucher darf versuchen, es besser zu machen.
 * · es braucht fast keine copy. die seite ist kurz, weil jeder satz
 *   angefasst werden kann und deshalb sitzen muss.
 *
 * der zähler unten ist der ganze trick: er macht aus einer spielerei
 * ein spiel. sobald da „3 sätze geändert" steht, hat der besucher
 * investiert · und wer investiert hat, schreibt eher.
 *
 * ═══ die eine stelle, an der das kippt ═══
 *
 * contentEditable und react streiten sich um denselben knoten. sobald
 * der zähler state setzt, rendert react neu, gleicht die kinder des
 * feldes gegen `START[k]` ab und wirft den getippten text weg. der
 * zähler zählte, der satz sprang zurück · die geste zerstörte sich
 * selbst bei jedem tastendruck.
 *
 * deshalb ist `Feld` ein memo mit `() => true`: props gelten immer
 * als gleich, react rendert den knoten genau EINMAL und lässt ihn
 * danach dem browser. der DOM ist hier die quelle der wahrheit, nicht
 * der state · das ist keine ausnahme, das ist der punkt.
 *
 * aus demselben grund wird `data-an` im handler direkt am element
 * gesetzt statt als prop: ginge es durch react, wäre der knoten
 * wieder in reacts hand.
 */

const START = {
  h1a: "websites, die man",
  h1b: "anfassen",
  h1c: "will.",
  sub: "Von null gebaut. Kein Template, keine Plugin-Grenzen.",
  claim: "das hier ist meine seite. ab jetzt ist es deine.",
  frage: "was würdest du anders schreiben?",
};

type Schluessel = keyof typeof START;

const Feld = memo(
  function Feld({
    k,
    as = "span",
    className,
    onTouch,
  }: {
    k: Schluessel;
    as?: "span" | "p";
    className?: string;
    onTouch: (k: Schluessel) => void;
  }) {
    const Tag = as;
    return (
      <Tag
        className={`la-edit ${className ?? ""}`}
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        data-an="0"
        onInput={(ev: React.FormEvent<HTMLElement>) => {
          ev.currentTarget.dataset.an = "1";
          onTouch(k);
        }}
      >
        {START[k]}
      </Tag>
    );
  },
  /* nie neu rendern · ab dem ersten paint gehört dieser knoten dem
     browser. `onTouch` ist über useCallback stabil, die closure von
     render eins bleibt also für immer gültig. */
  () => true,
);

export function VarianteA() {
  const [zahl, setZahl] = useState(0);
  const [aktiv, setAktiv] = useState(false);
  const gesehen = useRef<Set<Schluessel>>(new Set());
  const wurzel = useRef<HTMLDivElement>(null);

  const merk = useCallback((k: Schluessel) => {
    if (gesehen.current.has(k)) return;
    gesehen.current.add(k);
    setZahl(gesehen.current.size);
  }, []);

  /* der zeiger bekommt eine schreibmarke, sobald er über etwas
     editierbarem steht · das ist die einzige erklärung, die die
     seite braucht */
  useEffect(() => {
    const el = wurzel.current;
    if (!el) return;
    const an = (e: Event) => setAktiv((e.target as HTMLElement).isContentEditable);
    el.addEventListener("pointerover", an);
    return () => el.removeEventListener("pointerover", an);
  }, []);

  return (
    <div className="la" ref={wurzel} data-schreibt={aktiv ? "1" : "0"}>
      <section className="la-hero" data-no-reveal>
        <h1 className="la-h1">
          <Feld k="h1a" onTouch={merk} />
          <br />
          <Feld k="h1b" className="la-lime" onTouch={merk} />{" "}
          <Feld k="h1c" onTouch={merk} />
        </h1>
        <Feld k="sub" as="p" className="la-sub" onTouch={merk} />
      </section>

      <section className="la-mitte" data-no-reveal>
        <Feld k="claim" as="p" className="la-claim" onTouch={merk} />
      </section>

      <section className="la-fuss" data-no-reveal>
        <Feld k="frage" as="p" className="la-frage" onTouch={merk} />

        {/* der zähler macht aus der spielerei ein spiel */}
        <div className="la-zaehler" aria-live="polite">
          <span className="la-zahl">{String(zahl).padStart(2, "0")}</span>
          <span className="la-zaehler-text">
            {zahl === 0
              ? "noch nichts geändert · klick in einen satz"
              : zahl === 1
                ? "satz geändert. so fühlt sich ContentCore an."
                : "sätze geändert. so fühlt sich ContentCore an."}
          </span>
        </div>
      </section>
    </div>
  );
}
