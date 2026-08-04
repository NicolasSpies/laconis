"use client";

/**
 * HeroRail · der kicker steht hochkant am rechten rand.
 *
 * er sass vorher als zeile über der headline und hat ihr die luft
 * genommen · jede seite fing mit derselben kleinen mono-zeile an, bevor
 * überhaupt was passierte. hochkant liest er sich wie eine beschriftung
 * am gerät statt wie eine überschrift über der überschrift, und die
 * headline darf oben anfangen.
 *
 * gedreht wird gegen den uhrzeigersinn (von unten nach oben lesbar),
 * die lampe sitzt unten am fuss der linie.
 */

export function HeroRail({ label, delay = 80 }: { label: string; delay?: number }) {
  return (
    <span className="lab-rail lab-boot" style={{ animationDelay: `${delay}ms` }} aria-hidden>
      <span className="lab-rail-line" />
      <span className="lab-rail-text">{label}</span>
      <span className="lab-rail-led lab-led-idle" />
    </span>
  );
}
