"use client";

import { useEffect, useRef, useState } from "react";
import { HeroRail } from "@/components/device/HeroRail";

/**
 * LensHero · das eine objekt im hero: eine echte glaslinse, die man zieht.
 *
 * die idee ist keine deko, sondern die aussage der seite: OBEN liegt das
 * design, DRUNTER liegt die technik. wer das glas verschiebt, sieht das
 * drahtgitter, die vermassung, die schrift-achsen. genau das verkauft die
 * seite · man muss es nicht behaupten.
 *
 * technik:
 *  · zwei deckungsgleiche ebenen, die untere per clip-path auf einen kreis
 *    beschnitten. transform-origin sitzt IM linsenmittelpunkt, dadurch
 *    steht der punkt unter dem glas still und alles drumherum wächst weg ·
 *    das ist die echte lupen-optik, kein fake-zoom.
 *  · eine einzige rAF-schleife schreibt zwei CSS-variablen. kein react-
 *    rerender pro frame.
 *  · ohne finger driftet sie auf einer lissajous-bahn weiter (regel:
 *    mikro-animationen laufen immer · mobil gibt es kein hover).
 *  · touch-action: pan-y · vertikal scrollen bleibt, horizontal zieht.
 */

type T = {
  kicker: string;
  l1: string;
  l2: string;
  l3: string;
  sub: string;
  hint: string;
};

/* die vermassung unter glas · position in % der bühne */
const ANNOS: { x: string; y: string; text: string }[] = [
  { x: "4%", y: "17%", text: "<h1> · archivo variable" },
  { x: "4%", y: "23%", text: "wght 800 · wdth 125%" },
  { x: "62%", y: "44%", text: "clamp(3rem, 10vw, 9rem)" },
  { x: "62%", y: "50%", text: "line-height 0.86" },
  { x: "4%", y: "79%", text: "lcp 0.4s · cls 0.00" },
  { x: "62%", y: "85%", text: "0 kb fremd-js" },
];

export function LensHero({ t }: { t: T }) {
  const stage = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const home = useRef({ x: 0, y: 0 });
  const dragging = useRef(false);
  const [grab, setGrab] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let r = 118;

    const layout = () => {
      const b = el.getBoundingClientRect();
      r = Math.max(70, Math.min(140, Math.min(b.width, b.height) * 0.17));
      el.style.setProperty("--lx-r", `${r}px`);
      /* startplatz MUSS auf der headline liegen · steht das glas
         daneben, sieht man nur raster und die pointe ist weg */
      home.current = { x: b.width * 0.47, y: b.height * 0.47 };
      clampHome(b.width, b.height);
      if (pos.current.x === 0 && pos.current.y === 0) {
        pos.current = { ...home.current };
        target.current = { ...home.current };
      }
    };

    const clampHome = (w: number, h: number) => {
      home.current.x = Math.max(r + 8, Math.min(w - r - 8, home.current.x));
      home.current.y = Math.max(r + 8, Math.min(h - r - 8, home.current.y));
    };

    layout();

    const tick = (time: number) => {
      const b = el.getBoundingClientRect();

      if (!dragging.current && !reduced) {
        /* lissajous · zwei unterschiedliche perioden, damit die bahn
           nie sichtbar zurückläuft */
        const ax = Math.min(70, b.width * 0.07);
        const ay = Math.min(46, b.height * 0.06);
        target.current.x = home.current.x + Math.sin(time * 0.00023) * ax;
        target.current.y = home.current.y + Math.sin(time * 0.00037 + 1.1) * ay;
      }

      target.current.x = Math.max(r + 4, Math.min(b.width - r - 4, target.current.x));
      target.current.y = Math.max(r + 4, Math.min(b.height - r - 4, target.current.y));

      /* feder · gezogen straffer, treibend weicher = gewicht */
      const k = dragging.current ? 0.24 : 0.06;
      pos.current.x += (target.current.x - pos.current.x) * k;
      pos.current.y += (target.current.y - pos.current.y) * k;

      el.style.setProperty("--lx-x", `${pos.current.x.toFixed(1)}px`);
      el.style.setProperty("--lx-y", `${pos.current.y.toFixed(1)}px`);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const point = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      target.current.x = e.clientX - b.left;
      target.current.y = e.clientY - b.top;
    };

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      setGrab(true);
      el.setPointerCapture(e.pointerId);
      point(e);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      point(e);
    };
    const onUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      setGrab(false);
      /* dort weiterdriften, wo losgelassen wurde */
      const b = el.getBoundingClientRect();
      home.current = { ...target.current };
      clampHome(b.width, b.height);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    const ro = new ResizeObserver(layout);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      ro.disconnect();
    };
  }, []);

  /* beide ebenen benutzen exakt dieselbe box · nur so sitzt die untere
     pixelgenau unter der oberen. die basis-ebene gibt die höhe vor
     (min-h), die untere füllt sie (h-full) · pt-28 hält die headline
     unter der leiste. */
  const box = "flex flex-col justify-center px-6 pt-28 pb-24 md:px-12";
  const inner = "mx-auto w-full max-w-[1200px]";

  return (
    <section
      ref={stage}
      data-grab={grab ? "1" : "0"}
      data-no-reveal
      className="lx-stage min-h-[100svh]"
      style={{ ["--lx-z" as string]: "1.3" }}
    >
      <div className="lx-grid" aria-hidden />
      <HeroRail label={t.kicker} />

      {/* ── oben: das design ── */}
      <div className="lx-layer">
        <div className={`${box} min-h-[100svh]`}>
          <div className={inner}>
            <h1 className="lab-display lab-boot text-[clamp(3rem,10vw,9rem)]" style={{ animationDelay: "180ms" }}>
              {t.l1}
              <br />
              {t.l2}
              <br />
              <span style={{ color: "#e1fd52" }}>{t.l3}</span>
            </h1>

            <p
              className="lab-boot mt-10 max-w-[440px] text-[15px] leading-relaxed"
              style={{ animationDelay: "320ms", color: "rgba(242,242,242,0.62)" }}
            >
              {t.sub}
            </p>
          </div>
        </div>
      </div>

      {/* ── drunter: die technik ── */}
      <div className="lx-layer--under" aria-hidden>
        <div className="lx-under-inner">
          <div className="lx-grid" />
          <div className={`${box} h-full`}>
            <div className={inner}>
              <h1 className="lab-display lx-h1-wire text-[clamp(3rem,10vw,9rem)]">
                {t.l1}
                <br />
                {t.l2}
                <br />
                {t.l3}
              </h1>
              <p className="mt-10 max-w-[440px] text-[15px] leading-relaxed" style={{ color: "rgba(225,253,82,0.35)" }}>
                {t.sub}
              </p>
            </div>
          </div>

          {ANNOS.map((a) => (
            <span key={a.text} className="lx-anno" style={{ left: a.x, top: a.y }}>
              {a.text}
            </span>
          ))}
          <span className="lx-anno-rule" style={{ left: "4%", top: "30%", width: "56%" }} />
          <span className="lx-anno-rule" style={{ left: "4%", top: "72%", width: "56%" }} />
        </div>
      </div>

      {/* ── der linsenkörper ── */}
      <div className="lx-lens" aria-hidden>
        <span className="lx-lens-edge" />
        <span className="lx-lens-fringe" />
        <span className="lx-lens-spec" />
        <span className="lx-lens-cross" />
      </div>

      <div
        aria-hidden
        className="lab-boot absolute bottom-8 left-1/2 z-[4] -translate-x-1/2 whitespace-nowrap text-center"
        style={{ animationDelay: "700ms" }}
      >
        <span className="lab-label">{t.hint}</span>
      </div>
    </section>
  );
}
