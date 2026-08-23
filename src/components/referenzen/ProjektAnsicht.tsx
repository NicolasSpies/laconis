"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ProjektAnsicht · die gebaute seite auf laptop und handy.
 *
 * das ist der baustein, der bei JEDEM projekt funktioniert. keine
 * projekt-spezifische mechanik, nichts, was pro kunde neu erfunden
 * werden muss · zwei aufnahmen ins datenfeld, fertig. genau so muss es
 * sein, wenn das später aus contentcore kommt.
 *
 * bewusst kein iframe: fabry-baumpflege.be schickt x-frame-options DENY
 * und frame-ancestors 'none'. das ist richtig so, und bei seiten, die
 * man nicht selbst betreibt, hat man diese kontrolle nie. aufnahmen
 * funktionieren immer.
 *
 * beide geräte hängen an EINER position · ziehen scrubbt durch die
 * seite, losgelassen driftet sie langsam weiter. mikro-animationen
 * laufen immer, auch da wo niemand hovern kann.
 */

export type ProjektAnsichtT = {
  hint: string;
  empty: string;
  desktopLabel: string;
  mobileLabel: string;
};

/* wie weit die aufnahmen wandern · 1 = einmal komplett durch */
const DRIFT_PER_SEC = 0.022;

export function ProjektAnsicht({
  shots,
  t,
}: {
  shots?: { desktop: string; mobile: string };
  t: ProjektAnsichtT;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const deskShot = useRef<HTMLImageElement>(null);
  const phoneShot = useRef<HTMLImageElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const pos = useRef(0); // 0..1
  const [grab, setGrab] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !shots) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let dragging = false;
    let startY = 0;
    let startPos = 0;

    /* jede aufnahme darf nur um ihren ÜBERSTAND wandern, nicht um ihre
       ganze höhe · sonst läuft das bild unten aus der scheibe raus */
    const shift = (img: HTMLImageElement | null) => {
      if (!img?.parentElement) return 0;
      return Math.max(0, img.offsetHeight - img.parentElement.clientHeight);
    };

    const paint = () => {
      const p = pos.current;
      if (deskShot.current) deskShot.current.style.transform = `translate3d(0,${-p * shift(deskShot.current)}px,0)`;
      if (phoneShot.current) phoneShot.current.style.transform = `translate3d(0,${-p * shift(phoneShot.current)}px,0)`;
      if (fill.current) fill.current.style.width = `${p * 100}%`;
    };

    const tick = (time: number) => {
      const dt = last ? (time - last) / 1000 : 0;
      last = time;
      if (!dragging && !reduced) {
        /* hin und zurück statt springen · ein sprung von unten nach
           oben sieht aus wie ein fehler */
        pos.current += DRIFT_PER_SEC * dt * (dirRef.current || 1);
        if (pos.current >= 1) {
          pos.current = 1;
          dirRef.current = -1;
        } else if (pos.current <= 0) {
          pos.current = 0;
          dirRef.current = 1;
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    const dirRef = { current: 1 as 1 | -1 };
    raf = requestAnimationFrame(tick);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      setGrab(true);
      startY = e.clientY;
      startPos = pos.current;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      /* 420 px ziehen = einmal komplett durch die seite */
      pos.current = Math.max(0, Math.min(1, startPos + (startY - e.clientY) / 420));
      paint();
    };
    const onUp = () => {
      dragging = false;
      setGrab(false);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [shots]);

  return (
    <div>
      <div className="pv-wrap" ref={wrap} data-grab={grab ? "1" : "0"}>
        <div className="pv-laptop">
          <div className="pv-lid">
            <div className="pv-screen">
              {shots ? (
                /* KEIN next/image · die animation schiebt die
                   aufnahme in voller höhe durch den bildschirm,
                   das ist der zweck. aber masse und decoding
                   fehlten · daher layout-shift bei jedem laden. */
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  ref={deskShot}
                  src={shots.desktop}
                  alt={t.desktopLabel}
                  className="pv-shot"
                  width={1440}
                  height={6496}
                  decoding="async"
                  loading="lazy"
                />
              ) : (
                <span className="pv-empty">{t.empty}</span>
              )}
            </div>
          </div>
          <div className="pv-foot" aria-hidden />
        </div>

        <div className="pv-phone">
          <div className="pv-screen">
            {shots ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                ref={phoneShot}
                src={shots.mobile}
                alt={t.mobileLabel}
                className="pv-shot"
                width={390}
                height={7085}
                decoding="async"
                loading="lazy"
              />
            ) : (
              <span className="pv-empty" />
            )}
          </div>
        </div>
      </div>

      {shots && (
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="pv-rail min-w-[140px] flex-1" aria-hidden>
            <span className="pv-rail-fill" ref={fill} />
          </span>
          <span className="lab-hint text-body-sm">{t.hint}</span>
        </div>
      )}
    </div>
  );
}
