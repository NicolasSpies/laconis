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
    /* DIE GESTE LIEST DIE WAAGERECHTE, NICHT DIE SENKRECHTE.
       vorher las sie die senkrechte, während .pv-wrap auf
       touch-action: pan-y stand · der browser nimmt sich damit
       genau diese achse und schickt pointercancel. auf dem handy
       war das ziehen tot, während der hinweistext in allen drei
       sprachen dazu auffordert. dieselbe ursache wie bei K6 am
       projektstapel.

       DORT war touch-action: none die lösung, HIER nicht: .st-buehne
       ist auf 340px gedeckelt, .pv-wrap ist auf dem handy höher als
       ein bildschirm (laptop 16/10 über die volle breite plus
       handy darunter) · mit none käme niemand mehr daran vorbei.
       die achse zu drehen kostet nichts und passt besser: die
       fortschritts-schiene darunter läuft ohnehin waagerecht. */
    let startX = 0;
    let startPos = 0;

    /* jede aufnahme darf nur um ihren ÜBERSTAND wandern, nicht um ihre
       ganze höhe · sonst läuft das bild unten aus der scheibe raus.

       DIE WERTE WERDEN GEMESSEN, NICHT JEDEN FRAME NEU BERECHNET:
       offsetHeight und clientHeight erzwingen beide ein layout. bei
       zwei aufnahmen waren das VIER erzwungene messungen pro frame,
       sechzig mal die sekunde, für zwei zahlen die sich nur beim
       resize ändern. */
    const hub = { desk: 0, phone: 0 };
    const messen = () => {
      const h = (img: HTMLImageElement | null) =>
        img?.parentElement ? Math.max(0, img.offsetHeight - img.parentElement.clientHeight) : 0;
      hub.desk = h(deskShot.current);
      hub.phone = h(phoneShot.current);
    };
    messen();
    window.addEventListener("resize", messen);
    /* die aufnahmen laden lazy · vorher ist offsetHeight 0 */
    deskShot.current?.addEventListener("load", messen);
    phoneShot.current?.addEventListener("load", messen);

    const paint = () => {
      const p = pos.current;
      if (deskShot.current) deskShot.current.style.transform = `translate3d(0,${-p * hub.desk}px,0)`;
      if (phoneShot.current) phoneShot.current.style.transform = `translate3d(0,${-p * hub.phone}px,0)`;
      /* scaleX statt width · width ist eine LAYOUT-eigenschaft und
         zwang jeden frame ein reflow des ganzen zweigs. genau
         dieses reflow machte die messungen oben teuer: erst
         schmutzt der schreibvorgang das layout, dann liest der
         nächste frame es synchron zurück. */
      if (fill.current) fill.current.style.transform = `scaleX(${p})`;
    };

    /* ausserhalb des sichtfelds passiert nichts · die aufnahme
       wanderte sonst 60 mal pro sekunde durch einen bildschirm,
       den niemand ansieht */
    let sichtbar = true;
    const io = new IntersectionObserver(([e]) => {
      sichtbar = e.isIntersecting;
      /* beim wiedereintritt die uhr neu setzen, sonst holt der
         nächste frame die ganze pause auf einmal nach */
      if (sichtbar) last = 0;
    });
    io.observe(el);

    const dirRef = { current: 1 as 1 | -1 };

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      if (!sichtbar) return;
      /* dt auf einen frame gedeckelt. ohne deckel addiert die erste
         messung nach einem hintergrund-tab die GANZE pause: schon
         zehn sekunden abwesenheit sind 0.022 × 10 = 0.22, die
         aufnahme rutscht um ein fünftel weiter; ab etwa
         fünfundvierzig sekunden schlägt sie an einen anschlag und
         läuft in die gegenrichtung. */
      const dt = last ? Math.min((time - last) / 1000, 1 / 30) : 0;
      last = time;
      if (!dragging) {
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
    };

    /* bei reduced-motion lief die schleife WEITER · der check sparte
       nur die positionsänderung, paint() und requestAnimationFrame
       liefen sechzig mal die sekunde für ein standbild. */
    if (reduced) {
      paint();
    } else {
      raf = requestAnimationFrame(tick);
    }

    const onDown = (e: PointerEvent) => {
      dragging = true;
      setGrab(true);
      startX = e.clientX;
      startPos = pos.current;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      /* 420 px ziehen = einmal komplett durch die seite ·
         nach links ziehen heisst vorwärts, wie an einer schiene */
      pos.current = Math.max(0, Math.min(1, startPos + (startX - e.clientX) / 420));
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
      io.disconnect();
      window.removeEventListener("resize", messen);
      deskShot.current?.removeEventListener("load", messen);
      phoneShot.current?.removeEventListener("load", messen);
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
