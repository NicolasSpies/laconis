"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Tageslauf · das gebaute feature zum anfassen.
 *
 * die fabry-seite kennt die uhrzeit und ändert ihr licht mit dem tag.
 * hier zieht der besucher die sonne über den himmel und sieht die
 * stimmung wandern · das feature wird vorgeführt, nicht beschrieben.
 *
 * die lichtstimmung liegt als grade ÜBER dem foto, nicht in der
 * bildauswahl. deshalb funktioniert sie mit jedem motiv, und das ist
 * auch auf der echten seite so gebaut: die bilder wechseln mit der
 * jahreszeit, das licht mit der stunde.
 *
 * der weg der marke ist ein echter bogen · sonne steigt und fällt.
 * unter der horizontlinie wird sie zum mond.
 */

const SHOTS = [
  "/referenz-konzept/hero.jpg",
  "/referenz-konzept/canopy.jpg",
  "/referenz-konzept/mist.jpg",
  "/referenz-konzept/pines.jpg",
];

export type TageslaufT = {
  label: string;
  now: string;
  phases: [string, string, string, string, string];
  hint: string;
};

/** sonnenhöhe · -1 (tiefe nacht) bis 1 (zenit) */
function elevation(h: number) {
  return Math.sin((Math.PI * (h - 6)) / 12);
}

/* die benennung hängt am SONNENSTAND, nicht an festen uhrzeit-fenstern ·
   sonst stand über einem stockdunklen bild „abendgold", weil es zufällig
   21 uhr war. was man sieht und was dasteht muss dasselbe sein. */
function phaseIndex(h: number) {
  const e = elevation(h);
  const day = Math.max(0, e);
  if (day < 0.06) return 4; // nachtruhe
  const rising = h < 12;
  if (rising) return day < 0.5 ? 0 : 1; // morgentau · vormittag
  return day >= 0.5 ? 2 : 3; // mittagslicht · abendgold
}

/** multiply-grade + screen-glow für eine stunde */
function light(h: number) {
  const e = elevation(h);
  /* tagsanteil 0..1 · unter dem horizont bleibt es bei 0 */
  const day = Math.max(0, e);
  /* wie nah an sonnenauf/-untergang · dort ist das licht am wärmsten */
  const warm = Math.max(0, 1 - Math.abs(e) * 2.4);

  /* multiply zieht das bild in die nacht · nie ganz auf schwarz,
     sonst sieht man das motiv gar nicht mehr.
     die wurzel biegt die kurve: nach sonnenaufgang wird es schnell
     hell und bleibt es lange. linear war 8 uhr morgens so dunkel wie
     die dämmerung, und so fühlt sich ein vormittag nicht an. */
  const v = 0.28 + Math.pow(day, 0.55) * 0.72;
  const gr = Math.round(255 * v * (1 - warm * 0.02));
  const gg = Math.round(255 * v * (1 - warm * 0.12) * (day < 0.06 ? 0.9 : 1));
  const gb = Math.round(255 * v * (1 - warm * 0.34) * (day < 0.06 ? 1.12 : 1));

  /* screen legt die warme sonne bzw. das kalte mondlicht drauf */
  const glow = warm * 0.5 + (day < 0.06 ? 0.12 : 0);
  const glowCol =
    day < 0.06 ? `rgba(120, 96, 168, ${glow})` : `rgba(255, 176, 74, ${glow})`;

  return {
    grade: `rgb(${Math.min(255, gr)}, ${Math.min(255, gg)}, ${Math.min(255, gb)})`,
    glow: glowCol,
    night: day < 0.06,
  };
}

export function Tageslauf({ t }: { t: TageslaufT }) {
  /* start bei 8 uhr · nicht bei der echten zeit, sonst sieht der halbe
     tag der besucher nur eine schwarze fläche und weiss nicht warum */
  const [h, setH] = useState(8);
  const arc = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = arc.current;
    if (!el) return;
    let down = false;

    const at = (clientX: number) => {
      const b = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (clientX - b.left) / b.width));
      setH(p * 24);
    };
    const onDown = (e: PointerEvent) => {
      down = true;
      el.setPointerCapture(e.pointerId);
      at(e.clientX);
    };
    const onMove = (e: PointerEvent) => down && at(e.clientX);
    const onUp = () => {
      down = false;
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  const l = light(h);
  const shot = Math.min(SHOTS.length - 1, Math.floor((h / 24) * SHOTS.length));
  const hh = String(Math.floor(h)).padStart(2, "0");
  const mm = String(Math.floor((h % 1) * 60)).padStart(2, "0");

  /* bogen: x linear über den tag, y folgt der sonnenhöhe.
     0.5 = horizont, drunter ist nacht. */
  const x = (h / 24) * 100;
  const y = 50 - elevation(h) * 42;

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 3 : 1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      setH((p) => (p + step) % 24);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      setH((p) => (p - step + 24) % 24);
    }
  };

  return (
    <div>
      {/* ── die szene ── */}
      <div className="tl-scene">
        {/* next/image statt <img> · roh waren das 1,7 MB auf einer seite,
            die mit 0,4 sekunden wirbt. nur das erste motiv hat priority,
            der rest lädt faul nach. */}
        {SHOTS.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            quality={72}
            priority={i === 0}
            loading={i === 0 ? undefined : "lazy"}
            className="tl-shot"
            data-on={i === shot ? "1" : "0"}
          />
        ))}
        <span className="tl-grade" style={{ background: l.grade }} aria-hidden />
        <span className="tl-glow" style={{ background: l.glow }} aria-hidden />
        <span className="tl-scrim" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 md:p-8">
          <div>
            <span className="lab-label">{t.phases[phaseIndex(h)]}</span>
            <div className="tl-clock mt-2">
              {hh}
              <span style={{ color: "rgba(242,242,242,0.35)" }}>:</span>
              {mm}
            </div>
          </div>
          <span className="lab-hint max-w-[220px] text-[12px] leading-relaxed">{t.hint}</span>
        </div>
      </div>

      {/* ── der bogen ── */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className="lab-label">{t.label}</span>
        <button
          type="button"
          className="tl-now"
          onClick={() => {
            const d = new Date();
            setH(d.getHours() + d.getMinutes() / 60);
          }}
        >
          {t.now}
        </button>
      </div>

      <div
        ref={arc}
        className="tl-arc mt-3"
        role="slider"
        tabIndex={0}
        aria-label={t.label}
        aria-valuemin={0}
        aria-valuemax={24}
        aria-valuenow={Math.round(h)}
        aria-valuetext={`${hh}:${mm} · ${t.phases[phaseIndex(h)]}`}
        onKeyDown={onKey}
      >
        <svg className="tl-arc-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          {/* die bahn der sonne · y-werte aus derselben formel wie die marke */}
          <path
            className="tl-arc-line"
            vectorEffect="non-scaling-stroke"
            d={Array.from({ length: 49 }, (_, i) => {
              const hh2 = (i / 48) * 24;
              return `${i === 0 ? "M" : "L"} ${(hh2 / 24) * 100} ${50 - elevation(hh2) * 42}`;
            }).join(" ")}
          />
          <line className="tl-arc-horizon" x1="0" y1="50" x2="100" y2="50" vectorEffect="non-scaling-stroke" />
        </svg>

        {Array.from({ length: 25 }, (_, i) => i).map((i) => (
          <span
            key={i}
            className="tl-hour"
            data-major={i % 6 === 0 ? "1" : "0"}
            style={{ left: `${(i / 24) * 100}%` }}
            aria-hidden
          >
            {i % 6 === 0 && i < 24 && (
              <span className="tl-hour-label">{String(i).padStart(2, "0")}</span>
            )}
          </span>
        ))}

        <span
          className="tl-sun"
          data-night={l.night ? "1" : "0"}
          style={{ left: `${x}%`, top: `${y}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
