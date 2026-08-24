"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Film · die gebaute Kundenseite läuft in der Platte.
 *
 * ═══ WARUM DAS JAVASCRIPT BRAUCHT ═══
 *
 * Erster Versuch war zwei <video> nebeneinander, per Media-Query
 * getauscht, ohne eine Zeile JavaScript. Die Annahme dahinter: ein
 * Browser spielt kein Video, das nicht gerendert wird.
 *
 * GEMESSEN, und die Annahme ist falsch. Chrome lädt und spielt ein
 * `display: none`-Video vollständig ab — readyState 4, paused
 * false, currentTime läuft. Auf dem Schreibtisch wären das 579 kB
 * Handy-Film umsonst, und das reduced-motion-Gate wäre nur optisch
 * gewesen: der Film hätte unsichtbar weitergespielt und Akku
 * gezogen.
 *
 * Drei Dinge müssen deshalb wirklich entschieden werden, nicht nur
 * angezeigt:
 *   1. WELCHER Film — auf 390 px die Handy-Aufnahme, sonst die vom
 *      Schreibtisch. Eine 1440er Seite in einem 340-px-Feld ist
 *      Matsch.
 *   2. OB überhaupt — bei `prefers-reduced-motion: reduce` steht
 *      das Standbild, und es wird kein Video geladen.
 *   3. WANN — ausserhalb des Bildes wird angehalten. Bei drei
 *      Projekten liefen sonst drei Filme gleichzeitig, davon zwei
 *      unsichtbar.
 *
 * ═══ WAS OHNE JAVASCRIPT STEHT ═══
 *
 * Das Standbild, server-gerendert. Es ist derselbe Kopf der Seite,
 * den der Film in seiner ersten Sekunde zeigt — kein Platzhalter,
 * kein graues Rechteck, kein Sprung beim Nachladen.
 */

export function Film({ slug }: { slug: string }) {
  /* `null` = noch nicht entschieden · dann steht das Standbild.
     Das ist auch der Server-Zustand, es gibt also keinen
     Hydration-Unterschied. */
  const [quelle, setQuelle] = useState<"desktop" | "mobil" | null>(null);
  const [imBild, setImBild] = useState(false);
  const huelle = useRef<HTMLSpanElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ruhe = window.matchMedia("(prefers-reduced-motion: reduce)");
    const schmal = window.matchMedia("(max-width: 720px)");
    const lies = () => setQuelle(ruhe.matches ? null : schmal.matches ? "mobil" : "desktop");
    lies();
    ruhe.addEventListener("change", lies);
    schmal.addEventListener("change", lies);
    return () => {
      ruhe.removeEventListener("change", lies);
      schmal.removeEventListener("change", lies);
    };
  }, []);

  useEffect(() => {
    const el = huelle.current;
    if (!el) return;
    /* grosszügiger Rand · der Film soll schon laufen, wenn die
       Platte aus der Tiefe herankommt, nicht erst wenn sie steht */
    const beobachter = new IntersectionObserver(
      ([e]) => setImBild(e.isIntersecting),
      { rootMargin: "40% 0px" },
    );
    beobachter.observe(el);
    return () => beobachter.disconnect();
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (imBild) void v.play().catch(() => {});
    else v.pause();
  }, [imBild, quelle]);

  return (
    <span className="ar-film-huelle" ref={huelle}>
      {/* das Standbild liegt IMMER darunter · es trägt den ersten
          Frame, bevor der Film entschieden ist, und bleibt bei
          reduzierter Bewegung stehen */}
      <img
        className="ar-standbild"
        src={`/film/${slug}-desktop.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      {quelle && (
        <video
          key={quelle}
          ref={video}
          className="ar-film"
          poster={`/film/${slug}-${quelle}.jpg`}
          loop
          muted
          playsInline
          /* KEIN autoPlay · der IntersectionObserver startet ihn.
             Mit autoPlay liefe er ab dem ersten Frame, auch wenn
             die Platte drei Bildschirme weiter unten steht. */
          preload="metadata"
        >
          <source src={`/film/${slug}-${quelle}.webm`} type="video/webm" />
          <source src={`/film/${slug}-${quelle}.mp4`} type="video/mp4" />
        </video>
      )}
    </span>
  );
}
