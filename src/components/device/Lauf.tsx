"use client";

import { useEffect } from "react";

/**
 * Lauf · der Scroll bekommt Gewicht.
 *
 * ═══ WARUM DAS DIE GRÖSSTE EINZELNE ÄNDERUNG IST ═══
 *
 * bleibtgleich.dev im Browser vermessen, weil Nicolas sie als
 * Vorbild genannt hat: 56 ScrollTrigger, 2 WebGL2-Canvas, GSAP mit
 * SplitText/MorphSVG/Inertia, Barba, Three.js — und **Lenis**.
 * Kein einziges Video, grösste Type 95 px, keine Farbe ausser
 * Schwarz, Weiss und vier Graustufen.
 *
 * Das Gefühl "krass dynamisch" kommt dort also nicht aus Material
 * und nicht aus Grösse. Es kommt aus Choreografie — und der grösste
 * einzelne Anteil daran ist, dass der Scroll NACHLÄUFT. Ein
 * nativer Scroll springt in Rasten; ein gedämpfter hat Masse. Alles,
 * was daran hängt (Parallaxe, Kamerafahrten, Einblendungen), erbt
 * diese Masse sofort mit.
 *
 * ═══ WARUM LENIS UND NICHT SELBSTGEBAUT ═══
 *
 * Ein gedämpfter Scroll ist in zehn Zeilen geschrieben und in
 * tausend falsch. Die Fallen: Trackpad gegen Mausrad gegen Touch,
 * Momentum unter iOS, Ankersprünge, Tastatur (Bild auf/ab, Pos1,
 * Leertaste), verschachtelte Scroll-Container, und die Frage, ob
 * `scrollY` und `scrollend` überhaupt noch stimmen. Lenis löst das,
 * ist MIT-lizenziert und schreibt echte Scrollpositionen statt den
 * Inhalt zu verschieben.
 *
 * DAS IST DER PUNKT, DER HIER ZÄHLT: weil Lenis wirklich scrollt
 * statt zu transformieren, laufen `animation-timeline: view()` und
 * `position: sticky` unverändert weiter. Der Anflug-Tunnel in
 * anflug.css hängt an genau diesen beiden — ein transformbasierter
 * Smooth-Scroll (der klassische "wrapper mit translateY") hätte ihn
 * still zerlegt.
 *
 * ═══ REDUZIERTE BEWEGUNG ═══
 *
 * Wer `prefers-reduced-motion: reduce` gesetzt hat, bekommt Lenis
 * gar nicht erst — nicht abgeschaltet, sondern nie gestartet. Ein
 * gedämpfter Scroll ist für Leute mit vestibulären Beschwerden
 * genau die Art Bewegung, die die Einstellung meint.
 */

export function Lauf() {
  useEffect(() => {
    const ruhe = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (ruhe.matches) return;

    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let abgebrochen = false;

    /* dynamisch geladen · so liegt die Bibliothek in einem eigenen
       Bündel und nicht im ersten Byte der Seite. Der Hero steht
       damit, bevor der Scroll überhaupt Masse hat. */
    void import("lenis").then(({ default: Lenis }) => {
      if (abgebrochen) return;
      lenis = new Lenis({
        /* 1,05 s Nachlauf · lang genug, dass man das Gewicht spürt,
           kurz genug, dass ein gezielter Sprung nicht wie Sirup
           wirkt. Darüber fängt es an, sich nach Kontrollverlust
           anzufühlen — und das ist bei Leuten, die eine Website
           anfragen wollen, das Letzte, was man will. */
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        /* TOUCH BLEIBT NATIV. Auf dem Handy ist der Systemscroll
           mit seinem eigenen Momentum das Beste, was es gibt, und
           jede Dämpfung darüber fühlt sich kaputt an. */
        smoothWheel: true,
        syncTouch: false,
      }) as unknown as { raf: (t: number) => void; destroy: () => void };

      const tick = (zeit: number) => {
        lenis?.raf(zeit);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      abgebrochen = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return null;
}
