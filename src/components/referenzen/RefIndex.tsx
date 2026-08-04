"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { referenzen } from "@/data/referenzen";
import type { Locale } from "@/i18n/config";
import { buildPath } from "@/i18n/config";

/**
 * RefIndex · die referenzen als editorial-index.
 *
 * löst die fallblatt-tafel ab. die war hübsch, aber sie hat zwei
 * probleme gehabt, die eine übersichtsseite sich nicht leisten darf:
 * die blätter waren besonders auf dem handy schwer zu lesen, und alle
 * infos lagen unter der falz · man musste scrollen, ohne zu ahnen,
 * dass da noch was kommt.
 *
 * jetzt steht alles in der zeile selbst, und die ganze zeile ist der
 * link. ein klick, und man ist drin.
 *
 * die vorschau folgt dem zeiger. wo es keinen zeiger gibt (touch),
 * steht sie als kleines bild fest in der zeile · niemand verpasst was.
 */

export function RefIndex({
  locale,
  t,
}: {
  locale: Locale;
  t: { stampLive: string; stampKonzept: string; stampWip: string; open: string };
}) {
  const [hover, setHover] = useState<number | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const peek = useRef<HTMLDivElement>(null);

  /* der zeiger bewegt die vorschau über CSS-variablen · kein state,
     kein rerender pro mausbewegung */
  const onMove = (e: React.MouseEvent) => {
    const w = wrap.current;
    const p = peek.current;
    if (!w || !p) return;
    const b = w.getBoundingClientRect();
    p.style.setProperty("--px", `${e.clientX - b.left}px`);
    p.style.setProperty("--py", `${e.clientY - b.top}px`);
  };

  return (
    <div className="ri-wrap" ref={wrap} onMouseMove={onMove}>
      {referenzen.map((r, i) => {
        const stamp = r.istEcht ? t.stampLive : r.inArbeit ? t.stampWip : t.stampKonzept;
        return (
          <Link
            key={r.slug}
            href={`${buildPath("referenzen", locale)}/${r.slug}`}
            className="ri-row"
            data-on={hover === i ? "1" : "0"}
            data-dim={hover !== null && hover !== i ? "1" : "0"}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <span className="ri-nr">{String(i + 1).padStart(2, "0")}</span>

            <span className="ri-name lab-display">{r.name.toLowerCase()}</span>

            {/* auf touch die einzige vorschau · am zeiger-gerät versteckt */}
            {r.shots && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={r.shots.desktop} alt="" className="ri-thumb" />
            )}

            <span className="ri-meta">
              <span className="lab-label">{r.kategorieLabel}</span>
              <span className="lab-label">{r.jahr}</span>
            </span>

            <span className="ri-stamp lab-label" data-live={r.istEcht ? "1" : "0"}>
              <span className="ri-led" data-live={r.istEcht ? "1" : r.inArbeit ? "wip" : "0"} />
              {stamp}
            </span>

            <span className="ri-go" aria-hidden>
              {t.open} →
            </span>
          </Link>
        );
      })}

      {/* die vorschau am zeiger · rein dekorativ, deshalb aria-hidden */}
      <div className="ri-peek" ref={peek} data-on={hover !== null ? "1" : "0"} aria-hidden>
        {referenzen.map((r, i) => (
          <div key={r.slug} className="ri-peek-shot" data-on={hover === i ? "1" : "0"}>
            {r.shots ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={r.shots.desktop} alt="" />
            ) : (
              <span className="ri-peek-mono" style={{ background: r.farbe }}>
                {(r.monogram ?? r.name[0] ?? "·").toLowerCase()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
