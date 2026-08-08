"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ClaimSwitch · der umschalter zwischen 2009 und heute.
 *
 * das argument dieser sektion wird nicht behauptet, sondern gesetzt:
 * links steht der echte alte satz in der typografie seiner zeit,
 * rechts der neue in seiner. wer den schalter wirft, sieht den
 * unterschied zwischen den beiden welten, ohne dass jemand ihn
 * erklären muss.
 *
 * beide texte sind original · der alte stand so auf der wordpress-
 * seite, inklusive der zeile „letzte aktualisierung: 14.03.2009".
 * genau die zeile ist der ganze befund.
 *
 * der wechsel schneidet hart mit kurzem bildriss statt weich zu
 * blenden · ein monitor wechselt den eingang auch nicht mit einer
 * überblendung.
 */

export type ClaimT = {
  eraAlt: string;
  eraNeu: string;
  altTitle: string;
  altBody: string;
  altLink: string;
  altFoot: string;
  neuTitle: string;
  neuBody: string;
  hint: string;
};

export function ClaimSwitch({ t }: { t: ClaimT }) {
  const [era, setEra] = useState<"alt" | "neu">("alt");
  const [flip, setFlip] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const to = (next: "alt" | "neu") => {
    if (next === era) return;
    setEra(next);
    setFlip(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setFlip(false), 280);
  };

  return (
    <div className="gl relative p-6 md:p-10">

      <div className="cs-screen" data-era={era} data-flip={flip ? "1" : "0"}>
        <div className="cs-stage" key={era}>
          {era === "alt" ? (
            <div className="cs-alt">
              <p className="cs-alt-title">{t.altTitle}</p>
              <p className="cs-alt-body">{t.altBody}</p>
              <span className="cs-alt-link">{t.altLink}</span>
              <p className="cs-alt-foot">{t.altFoot}</p>
            </div>
          ) : (
            <div>
              <p className="cs-neu-title">{t.neuTitle}</p>
              <p className="cs-neu-body">{t.neuBody}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-5">
        <div className="cs-toggle" role="radiogroup" aria-label={t.hint}>
          {(
            [
              ["alt", t.eraAlt],
              ["neu", t.eraNeu],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={era === k}
              data-on={era === k ? "1" : "0"}
              onClick={() => to(k)}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="lab-hint max-w-[330px] text-body-sm leading-relaxed">{t.hint}</p>
      </div>
    </div>
  );
}
