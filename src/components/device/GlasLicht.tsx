"use client";

import { useEffect } from "react";

/**
 * GlasLicht · führt das streiflicht über alle glasflächen.
 *
 * `.gl` hat ein specular, das dem zeiger folgen soll · über --mx und
 * --my, die als @property registriert sind, damit sie gleiten statt
 * zu springen. geschrieben hat sie bis august 2026 NIEMAND: ein grep
 * über das ganze repo fand keine einzige zeile javascript, die
 * --mx/--my setzt.
 *
 * folge: auf touch lief die keyframe labGlassDrift, auf dem desktop
 * stand das glanzlicht für immer bei 50% / 0%. das panel sah aus wie
 * ein grauer kasten mit verlauf, und niemand konnte sehen warum.
 *
 * EIN listener für die ganze seite statt einer pro panel. er sucht
 * das element unter dem zeiger und geht von dort nach oben zum
 * nächsten .gl · das kostet einen elementFromPoint pro frame und
 * funktioniert für jedes panel, das je dazukommt, ohne dass man es
 * anmeldet.
 *
 * gedrosselt auf einen frame: pointermove feuert deutlich öfter als
 * der bildschirm zeichnet, und jeder ungedrosselte setProperty auf
 * eine registrierte custom property löst layout-arbeit aus.
 */
export function GlasLicht() {
  useEffect(() => {
    /* ohne zeiger übernimmt die keyframe in der CSS · dort ist der
       hook nicht nur nutzlos, sondern würde bei jedem tippen einen
       sprung ins glanzlicht schreiben */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let x = 0;
    let y = 0;

    const mal = () => {
      raf = 0;
      const el = document.elementFromPoint(x, y);
      const glas = el?.closest<HTMLElement>(".gl");
      if (!glas) return;
      const b = glas.getBoundingClientRect();
      glas.style.setProperty("--mx", `${(((x - b.left) / b.width) * 100).toFixed(1)}%`);
      glas.style.setProperty("--my", `${(((y - b.top) / b.height) * 100).toFixed(1)}%`);
    };

    const bewegt = (ev: PointerEvent) => {
      x = ev.clientX;
      y = ev.clientY;
      if (!raf) raf = requestAnimationFrame(mal);
    };

    window.addEventListener("pointermove", bewegt, { passive: true });
    return () => {
      window.removeEventListener("pointermove", bewegt);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
