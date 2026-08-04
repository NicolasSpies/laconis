"use client";

import { useEffect, useRef } from "react";
import type { Referenz } from "@/data/referenzen";

/**
 * Schichten · die explosionszeichnung im referenzen-hero.
 *
 * das problem, das dieser hero löst: die seite soll zeigen, WIEVIEL
 * arbeit in dem steckt was hier steht · aber es sind drei projekte.
 * eine zahl an die wand zu nageln wäre gelogen und eine logo-wand mit
 * drei logos sieht nach nichts aus.
 *
 * also wird nicht die MENGE der projekte gezeigt, sondern die tiefe
 * von einem. eine website sieht aus wie eine fläche. zieht man sie
 * auseinander, sind es sieben schichten, die alle jemand bauen muss.
 *
 * seit august 2026 ist der stapel zusätzlich die NAVIGATION: er zeigt
 * immer genau ein projekt, und wer unten über die zeilen fährt,
 * schaltet ihn um. vorher stand darunter noch eine zweite, grosse
 * vorschau je projekt · zwei bilder derselben sache übereinander,
 * einmal als objekt und einmal als briefmarke. jetzt macht das eine
 * element beides.
 *
 * die schichten, die das projekt tragen (bild, farbe, schrift, inhalt),
 * liegen für ALLE projekte gleichzeitig im DOM und werden nur über
 * opacity getauscht. so blendet der wechsel weich über statt zu
 * blitzen, und die aufnahmen sind schon geladen, bevor jemand
 * umschaltet. die schichten, die das HANDWERK tragen (unterbau, code,
 * raster), ändern sich nicht · sie sind bei jedem projekt dieselben.
 *
 * bedienung: ziehen. hoch = auseinander, runter = zusammen. ein
 * kurzer tipp klappt komplett auf oder zu.
 *
 * arbeitsteilung mit der CSS: das grundleben (--atem) läuft dort als
 * keyframe und steht NIE still, auch nicht in einem hintergrund-tab.
 * hier drin entsteht nur --zieh, der versatz aus der geste, und die
 * schleife läuft ausschliesslich solange sie sich noch bewegt. wer
 * die seite nur anschaut, kostet damit exakt null javascript.
 *
 * die etiketten laufen in einer flachen 2D-ebene mit, nicht im 3D-
 * raum · eine reine translateZ im gekippten deck projiziert sich auf
 * dem schirm als reine vertikale bewegung (y = -z · sin(kippwinkel)),
 * deshalb reicht ein translateY mit demselben faktor. so bleibt die
 * schrift gerade und lesbar statt mitgekippt. die rechnung dazu steht
 * komplett in der CSS · hier gibt es nur --zieh und die zahl der lagen.
 */

export type SchichtT = {
  name: string;
  was: string;
};

/* die balken auf der inhalts-schicht · pro projekt ein anderer satz,
   damit der wechsel auch ganz oben sichtbar ist und nicht nur im bild */
const BALKEN = [
  ["62%", "84%", "46%"],
  ["78%", "52%", "66%"],
  ["48%", "72%", "88%"],
];

function monogramm(r: Referenz) {
  return (r.monogram ?? r.name[0] ?? "·").toLowerCase();
}

export function Schichten({
  schichten,
  projekte,
  aktiv,
  zieh,
  einheit,
  seite,
}: {
  schichten: SchichtT[];
  projekte: Referenz[];
  /** index des projekts, das der stapel gerade zeigt */
  aktiv: number;
  zieh: string;
  einheit: string;
  seite: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  /* alles was pro frame passiert liegt in refs · state würde hier
     sechzig rerender pro sekunde auslösen */
  const versatz = useRef(0);
  const ziel = useRef(0);
  const raf = useRef(0);
  const griff = useRef<{ y: number; z: number; weit: number } | null>(null);

  /* die schleife startet erst bei der ersten berührung und hört auf,
     sobald nichts mehr nachfedert */
  const lauf = () => {
    if (raf.current) return;
    const tick = () => {
      const el = root.current;
      if (!el) return;
      const d = ziel.current - versatz.current;
      versatz.current += d * (griff.current ? 0.45 : 0.09);
      el.style.setProperty("--zieh", versatz.current.toFixed(4));
      if (griff.current || Math.abs(d) > 0.0008) {
        raf.current = requestAnimationFrame(tick);
      } else {
        versatz.current = ziel.current;
        el.style.setProperty("--zieh", versatz.current.toFixed(4));
        raf.current = 0;
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  /* --zieh ist ein VERSATZ auf die ruhelage 0.7, nicht der absolute
     wert · deshalb reicht der bereich von ganz zu bis ganz auf */
  const setzeZiel = (v: number) => {
    ziel.current = Math.max(-0.72, Math.min(0.3, v));
    lauf();
  };

  const onDown = (ev: React.PointerEvent) => {
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    griff.current = { y: ev.clientY, z: ziel.current, weit: 0 };
    lauf();
  };

  const onMove = (ev: React.PointerEvent) => {
    const g = griff.current;
    if (!g) return;
    const d = g.y - ev.clientY;
    g.weit = Math.max(g.weit, Math.abs(d));
    /* 300px hub für den vollen weg · kurz genug fürs handy, lang
       genug um unterwegs stehen bleiben zu können */
    setzeZiel(g.z + d / 300);
  };

  const onUp = () => {
    const g = griff.current;
    griff.current = null;
    /* unter 6px war es kein ziehen sondern ein tipp · dann ganz auf
       oder ganz zu, damit die geste auch ohne feinmotorik was tut */
    if (g && g.weit < 6) setzeZiel(ziel.current > -0.35 ? -0.72 : 0.3);
    else lauf();
  };

  const jetzt = projekte[aktiv];

  return (
    <div
      className="sx"
      ref={root}
      style={{ "--n": schichten.length - 1 } as React.CSSProperties}
    >
      <div
        className="sx-buehne"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        role="slider"
        tabIndex={0}
        aria-label={zieh}
        aria-valuemin={0}
        aria-valuemax={7}
        aria-valuenow={schichten.length}
        aria-valuetext={schichten.map((s) => s.name).join(", ")}
        onKeyDown={(ev) => {
          if (ev.key === "ArrowUp" || ev.key === "ArrowRight") setzeZiel(ziel.current + 0.2);
          else if (ev.key === "ArrowDown" || ev.key === "ArrowLeft") setzeZiel(ziel.current - 0.2);
          else return;
          ev.preventDefault();
        }}
      >
        <div className="sx-deck" aria-hidden>
          {schichten.map((s, i) => (
            <div key={s.name} className="sx-platte" data-k={i} style={{ "--z": i } as React.CSSProperties}>
              <div className="sx-flaeche" data-k={i}>
                {/* ── das handwerk · bei jedem projekt gleich ── */}
                {i === 0 && (
                  <>
                    <span className="sx-schraube" style={{ left: 10, top: 10 }} />
                    <span className="sx-schraube" style={{ right: 10, top: 10 }} />
                    <span className="sx-schraube" style={{ left: 10, bottom: 10 }} />
                    <span className="sx-schraube" style={{ right: 10, bottom: 10 }} />
                  </>
                )}
                {i === 1 && (
                  <div className="sx-code">
                    {["<section>", "  grid-template", "  @media 780px", "  aria-label", "</section>"].map((z) => (
                      <span key={z}>{z}</span>
                    ))}
                  </div>
                )}
                {i === 2 && <div className="sx-raster" />}

                {/* ── das projekt · alle gleichzeitig da, per opacity
                    getauscht. so blendet es weich über und die bilder
                    sind vor dem umschalten schon geladen ── */}
                {i === 3 &&
                  projekte.map((p, n) => (
                    <div key={p.slug} className="sx-wechsel sx-farbe" data-on={n === aktiv ? "1" : "0"}>
                      <span style={{ background: "#e1fd52" }} />
                      <span style={{ background: "#1a1a1f" }} />
                      <span style={{ background: p.farbe }} />
                    </div>
                  ))}

                {i === 4 &&
                  projekte.map((p, n) => (
                    <div key={p.slug} className="sx-wechsel" data-on={n === aktiv ? "1" : "0"}>
                      {p.shots ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={p.shots.desktop} alt="" className="sx-shot" />
                      ) : (
                        /* ohne aufnahme steht die projektfarbe · das ist
                           ehrlicher als ein platzhalter-screenshot */
                        <span className="sx-leer" style={{ background: p.farbe }} />
                      )}
                    </div>
                  ))}

                {i === 5 &&
                  projekte.map((p, n) => (
                    <div key={p.slug} className="sx-wechsel sx-typo" data-on={n === aktiv ? "1" : "0"}>
                      {monogramm(p)}
                    </div>
                  ))}

                {i === 6 &&
                  projekte.map((p, n) => (
                    <div key={p.slug} className="sx-wechsel sx-inhalt" data-on={n === aktiv ? "1" : "0"}>
                      {(BALKEN[n % BALKEN.length] ?? BALKEN[0]!).map((b, k) => (
                        <span key={k} style={{ width: b }} />
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* etiketten · flach, damit sie lesbar bleiben */}
        <div className="sx-tags" aria-hidden>
          {schichten.map((s, i) => (
            <div key={s.name} className="sx-tag" style={{ "--z": i } as React.CSSProperties}>
              <span className="sx-tag-strich" />
              <span className="sx-tag-nr">{String(i + 1).padStart(2, "0")}</span>
              <span className="sx-tag-name">{s.name}</span>
              <span className="sx-tag-was">{s.was}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="sx-fuss">
        <span className="lab-label sx-zieh">{zieh}</span>
        <span className="sx-zaehler">
          <b>{String(schichten.length).padStart(2, "0")}</b> {einheit}
          <i>·</i>
          {/* das schild sagt, welches projekt gerade im stapel liegt ·
              sonst weiss man beim ziehen nicht mehr, wessen seite das ist */}
          <em>{jetzt ? jetzt.name.toLowerCase() : seite}</em>
        </span>
      </div>
    </div>
  );
}
