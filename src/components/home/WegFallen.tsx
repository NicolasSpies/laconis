"use client";

import { useEffect, useRef } from "react";

/**
 * WegFallen · was direkt unter dem hero steht.
 *
 * hier sass bis august 2026 das typenschild: eine gebürstete
 * metallplatte mit vier schrauben, auf der „seit 2019 · im team 1 ·
 * 1:1 kontakt" stand. das waren angaben über den VERKÄUFER, keine
 * argumente · jeder freelancer sagt dasselbe. dazu ein material, das
 * billig aussieht, und schrauben, die es nicht besser machen.
 *
 * das argument steht stattdessen im weglassen. was bei ihm wegfällt,
 * ist genau das, was eine wordpress-seite über die jahre teuer und
 * mühsam macht · und es ist nachprüfbar, weil es keine zahl ist,
 * sondern eine liste von dingen, die es entweder gibt oder nicht.
 *
 * form: keine kachel, kein gehäuse, kein rahmen. nur schrift und
 * sehr viel luft. das ist die ruhige sektion vor dem ersten griff ·
 * die seite darf hier nichts wollen ausser gelesen werden.
 *
 * die zeilen streichen sich beim reinscrollen selbst durch, eine
 * nach der anderen. ausgelöst von einem IntersectionObserver, der
 * sich danach abhängt: animation-timeline: view() wäre der hauseigene
 * weg, ist hier aber nicht verlässlich · und wo der grundzustand der
 * ANFANG sein muss (ungestrichene zeile), fällt eine tote zeitachse
 * nicht auf, sie passiert einfach nicht.
 */

export type WegFallenT = {
  label: string;
  weg: string[];
  stattLead: string;
  stattName: string;
  stattBody: string;
};

export function WegFallen({ t }: { t: WegFallenT }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const beo = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        el.dataset.an = "1";
        beo.disconnect();
      },
      { rootMargin: "0px 0px -22% 0px" },
    );
    beo.observe(el);
    return () => beo.disconnect();
  }, []);

  return (
    <section ref={root} className="wf" data-no-reveal data-an="0">
      <span className="lab-label wf-label">{t.label}</span>

      <ul className="wf-liste">
        {t.weg.map((w, i) => (
          <li key={w} className="wf-zeile" style={{ "--i": i } as React.CSSProperties}>
            {/* der strich liegt IM wort, nicht daneben · als
                geschwister würde er sich am nächsten positionierten
                vorfahren aufhängen und über die ganze spalte laufen */}
            <span className="wf-wort">
              {w}
              <span className="wf-strich" aria-hidden />
            </span>
          </li>
        ))}
      </ul>

      <p className="wf-statt">
        {t.stattLead}
        <strong>{t.stattName}</strong>
        {t.stattBody}
      </p>
    </section>
  );
}
