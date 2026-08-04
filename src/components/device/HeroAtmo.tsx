"use client";

import { useEffect, useRef } from "react";
import "@/components/device/hero-atmo.css";

/**
 * HeroAtmo · die stimmung hinter dem hero.
 *
 * jede seite hat ihre eigene idee, keine tapete:
 *   korridor  · /preise    · zwei lichtbänder, die sich annähern
 *   signal    · /kontakt   · ringe laufen nach aussen, wie eine stimme
 *   schweben  · /referenzen· die drei gebauten seiten liegen im raum
 *   lampe     · /ueber-mich· das licht folgt der hand
 *
 * alles warm und weich · die geräte-sprache trägt die bedienelemente,
 * ein hero soll einladen und nicht nach werkbank aussehen.
 *
 * bewegung läuft als CSS-keyframe, nicht über rAF · nur die lampe
 * braucht den zeiger und schaltet ohne ihn auf eigenes wandern um.
 */

export type AtmoVariant = "korridor" | "signal" | "schweben" | "lampe";

export function HeroAtmo({
  variant,
  shots,
}: {
  variant: AtmoVariant;
  /** nur für „schweben" · aufnahmen der projekte */
  shots?: string[];
}) {
  const lamp = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (variant !== "lampe") return;
    const el = lamp.current;
    if (!el) return;

    /* nur wo es einen echten zeiger gibt · auf touch bleibt das
       eigene wandern an, sonst liegt das portrait im dunkeln */
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const b = parent.getBoundingClientRect();
      el.dataset.idle = "0";
      el.style.setProperty("--lx", `${((e.clientX - b.left) / b.width) * 100}%`);
      el.style.setProperty("--ly", `${((e.clientY - b.top) / b.height) * 100}%`);
    };
    const onLeave = () => {
      el.dataset.idle = "1";
      el.style.removeProperty("--lx");
      el.style.removeProperty("--ly");
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, [variant]);

  return (
    <div className="ha" aria-hidden>
      {/* grundwärme · liegt unter jeder variante */}
      <span className="ha-glow" data-a />
      <span className="ha-glow" data-b />

      {variant === "korridor" && (
        <>
          <span className="ha-band" data-side="top" />
          <span className="ha-band" data-side="bottom" />
        </>
      )}

      {variant === "signal" && (
        <>
          <span className="ha-ring" />
          <span className="ha-ring" />
          <span className="ha-ring" />
        </>
      )}

      {variant === "schweben" &&
        shots?.slice(0, 3).map((src) => (
          <span className="ha-float" key={src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" />
          </span>
        ))}

      {variant === "lampe" && <span className="ha-lamp" ref={lamp} data-idle="1" />}
    </div>
  );
}
