"use client";

import { useState } from "react";

/**
 * ChannelRack · referenzen als kanalzüge (mischpult-metapher).
 *
 * jedes projekt ist ein channel-strip im rack: vorschau hinter glas,
 * VU-meter das die pagespeed-zahl als pegel zeigt, tag-LEDs, öffnen-taste.
 *
 * beim hovern "geht der kanal auf": meter springt hoch, LEDs zünden,
 * die vorschau zoomt minimal. die meter-animation ist CSS-keyframes
 * (compositor) statt JS — friert in inaktiven tabs nicht ein.
 */

const CHANNELS = [
  {
    nr: "01",
    name: "fabry",
    name2: "baumpflege",
    img: "/referenz-konzept/canopy.jpg",
    tags: ["web", "cms"],
    score: 98,
    year: "2025",
  },
  {
    nr: "02",
    name: "holoroom",
    name2: "",
    img: "/referenz-konzept/light.jpg",
    tags: ["web"],
    score: 95,
    year: "2025",
  },
  {
    nr: "03",
    name: "léspoir",
    name2: "asbl",
    img: "/referenz-konzept/path.jpg",
    tags: ["web", "shop"],
    score: 96,
    year: "2026",
  },
];

/**
 * 12 segmente · gefüllt bis zum pegel, oberste zwei in lila (peak).
 * pegel läuft IMMER (leises atmen), hover schaltet auf vollausschlag —
 * hover-only wäre auf mobile unsichtbar.
 */
function VuMeter({ value, live }: { value: number; live: boolean }) {
  const segs = 12;
  const filled = Math.round((value / 100) * segs);
  return (
    <div className="flex items-end gap-[3px] h-8" aria-hidden>
      {Array.from({ length: segs }).map((_, i) => {
        const on = i < filled;
        const peak = i >= segs - 2;
        return (
          <span
            key={i}
            className={`lab-vu-seg ${live && on ? "lab-vu-live" : ""}`}
            style={{
              height: `${28 + i * 3}%`,
              background: on ? (peak ? "#b084d3" : "#e1fd52") : "rgba(242,242,242,0.10)",
              boxShadow: on ? `0 0 8px ${peak ? "#b084d3" : "#e1fd52"}88` : "none",
              animationDelay: `${i * 45}ms`,
            }}
          />
        );
      })}
    </div>
  );
}

export function ChannelRack() {
  const [hot, setHot] = useState<string | null>(null);

  return (
    <div className="relative">

      {/* erst ab lg drei spalten · die breite archivo braucht platz,
          sonst läuft "baumpflege" aus der karte */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {CHANNELS.map((c) => {
          const live = hot === c.nr;
          return (
            <article
              key={c.nr}
              onPointerEnter={() => setHot(c.nr)}
              onPointerLeave={() => setHot(null)}
              className="gl gl--karte lab-glass lab-channel p-4 flex flex-col gap-4"
              data-live={live ? "1" : "0"}
            >
              {/* vorschau hinter glas */}
              <div className="lab-screen relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: live ? "scale(1.06)" : "scale(1)" }}
                  loading="lazy"
                  draggable={false}
                />
                <span className="lab-screen-glare" aria-hidden />
                <span className="absolute left-3 top-2.5 lab-label" style={{ color: "#e1fd52" }}>
                  ch {c.nr}
                </span>
              </div>

              {/* name · skaliert mit der kartenbreite (container-query-frei
                  über clamp), bricht nie aus */}
              <div className="min-w-0">
                <h3
                  className="lab-display leading-[0.92] break-words"
                  style={{ fontSize: "clamp(19px, 2.1vw, 26px)" }}
                >
                  {c.name}
                  {c.name2 && (
                    <>
                      <br />
                      <span style={{ color: "rgba(242,242,242,0.45)" }}>{c.name2}</span>
                    </>
                  )}
                </h3>
              </div>

              {/* pegel + wert */}
              <div className="flex items-end justify-between gap-3">
                <VuMeter value={c.score} live={live} />
                <div className="text-right shrink-0">
                  <div className="lab-label">pagespeed</div>
                  <div
                    className="lab-display text-[24px] leading-none mt-0.5"
                    style={{ fontStretch: "112%", color: "#e1fd52" }}
                  >
                    {c.score}
                  </div>
                </div>
              </div>

              {/* tag-LEDs + jahr */}
              <div className="flex items-center gap-4 pt-1">
                {c.tags.map((t, i) => (
                  <span key={t} className="flex items-center gap-1.5">
                    {/* glimmt dauerhaft (auch ohne hover/mobile), zündet
                        bei live voll durch · versetzte delays = "leben" */}
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-all duration-300 lab-led-idle"
                      style={{
                        background: live ? "#e1fd52" : "rgba(225,253,82,0.42)",
                        boxShadow: live ? "0 0 8px #e1fd52" : "0 0 5px rgba(225,253,82,0.35)",
                        animationDelay: `${i * 700}ms`,
                      }}
                    />
                    <span className="lab-label">{t}</span>
                  </span>
                ))}
                <span className="lab-label ml-auto">{c.year}</span>
              </div>

              <button type="button" className="lab-key mt-1">
                öffnen →
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}
