"use client";

import { useEffect, useRef, useState } from "react";
import { RockerSwitch } from "@/components/device/Controls";

/**
 * LiveEditor · das cms, aber zum anfassen.
 *
 * links das redaktionspult, rechts der bildschirm. was links getippt
 * wird, steht rechts sofort · genau so fühlt sich contentcore an. „du
 * pflegst das selbst" ist damit kein versprechen mehr, sondern etwas,
 * das der besucher gerade selbst gemacht hat.
 *
 * der veröffentlichen-schlüssel ist der belohnungs-moment: taste sackt
 * weg, die zeile zählt die schritte durch, am ende steht die zeit. bewusst
 * eine simulation der echten pipeline, nicht ein fake-ladebalken · die
 * schritte heissen wie im echten deploy.
 */

const ACCENTS = [
  { key: "lime", css: "#e1fd52", ink: "#0a0a0a" },
  { key: "lila", css: "#b084d3", ink: "#0a0a0a" },
  { key: "ink", css: "#141414", ink: "#f2f2f2" },
] as const;

type T = {
  panel: string;
  fieldHeadline: string;
  fieldButton: string;
  accent: string;
  imageBlock: string;
  imageHint: string;
  publish: string;
  steps: [string, string, string];
  done: string;
  placeholderHeadline: string;
  placeholderButton: string;
  bodyCopy: string;
  url: string;
};

export function LiveEditor({ t }: { t: T }) {
  const [headline, setHeadline] = useState(t.placeholderHeadline);
  const [cta, setCta] = useState(t.placeholderButton);
  const [accent, setAccent] = useState(0);
  const [image, setImage] = useState(true);
  const [step, setStep] = useState(-1);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const publish = () => {
    if (step >= 0 && step < 3) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setStep(0);
    [1, 2, 3].forEach((s, i) => {
      timers.current.push(setTimeout(() => setStep(s), 420 * (i + 1)));
    });
    timers.current.push(setTimeout(() => setStep(-1), 3600));
  };

  const a = ACCENTS[accent]!;
  const busy = step >= 0 && step < 3;
  const statusLine = step === 3 ? t.done : step >= 0 ? t.steps[step]! : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
      {/* ═══ das pult ═══ */}
      <div className="lab-chassis relative p-6 md:p-8">
        <span className="lab-screw" style={{ left: 12, top: 12 }} aria-hidden />
        <span className="lab-screw" style={{ right: 12, top: 12 }} aria-hidden />
        <span className="lab-screw" style={{ left: 12, bottom: 12 }} aria-hidden />
        <span className="lab-screw" style={{ right: 12, bottom: 12 }} aria-hidden />

        <div className="mb-6 flex items-center gap-2.5">
          <span
            className="lab-led-idle h-1.5 w-1.5 rounded-full"
            style={{ background: "#e1fd52", boxShadow: "0 0 8px #e1fd52" }}
          />
          <span className="lab-label">{t.panel}</span>
        </div>

        <label className="block">
          <span className="lab-label">{t.fieldHeadline}</span>
          <input
            className="lab-field mt-2"
            value={headline}
            maxLength={38}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder={t.placeholderHeadline}
          />
        </label>

        <label className="mt-5 block">
          <span className="lab-label">{t.fieldButton}</span>
          <input
            className="lab-field mt-2"
            value={cta}
            maxLength={22}
            onChange={(e) => setCta(e.target.value)}
            placeholder={t.placeholderButton}
          />
        </label>

        <div className="mt-6">
          <span className="lab-label">{t.accent}</span>
          <div className="mt-2 flex gap-2.5">
            {ACCENTS.map((c, i) => (
              <button
                key={c.key}
                type="button"
                className="lx-swatch"
                data-on={i === accent ? "1" : "0"}
                aria-pressed={i === accent}
                aria-label={c.key}
                onClick={() => setAccent(i)}
                style={{ background: c.css }}
              />
            ))}
          </div>
        </div>

        <div className="mt-7">
          <RockerSwitch label={t.imageBlock} hint={t.imageHint} on={image} onToggle={() => setImage((p) => !p)} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="button" className="lab-key-lime" onClick={publish} data-busy={busy ? "1" : "0"} disabled={busy}>
            {t.publish}
          </button>
          {statusLine && (
            <span
              className="lab-label"
              style={{ color: step === 3 ? "#e1fd52" : "rgba(242,242,242,0.5)" }}
            >
              {statusLine}
            </span>
          )}
        </div>
      </div>

      {/* ═══ der bildschirm ═══ */}
      <div className="lx-screen self-start">
        <div className="lx-screen-bar">
          <span className="h-2 w-2 rounded-full" style={{ background: "rgba(10,10,10,0.22)" }} aria-hidden />
          <span className="lx-screen-url">{t.url}</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            aria-hidden
            style={{
              background: step === 3 ? "#8aa61c" : "rgba(10,10,10,0.22)",
              transition: "background 300ms ease",
            }}
          />
        </div>

        <div className="p-6 md:p-9" style={{ minHeight: 330 }}>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: a.css }} aria-hidden />
            <span
              className="font-mono text-[9px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(10,10,10,0.45)" }}
            >
              contentcore
            </span>
          </div>

          <h3
            className="lab-display mt-5 text-[clamp(1.5rem,3.6vw,2.4rem)]"
            style={{ color: "#0a0a0a", textTransform: "none" }}
          >
            {headline || t.placeholderHeadline}
          </h3>

          <p className="mt-4 max-w-[46ch] text-[13px] leading-relaxed" style={{ color: "rgba(10,10,10,0.6)" }}>
            {t.bodyCopy}
          </p>

          <span
            className="mt-6 inline-block rounded-[7px] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{
              background: a.css,
              color: a.ink,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 0 rgba(0,0,0,0.18)",
            }}
          >
            {cta || t.placeholderButton}
          </span>

          <div
            className="mt-7 grid gap-3"
            style={{
              gridTemplateColumns: image ? "1.3fr 1fr" : "1fr",
              transition: "grid-template-columns 420ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <div className="flex flex-col gap-2.5 pt-1">
              <span className="lx-skel" style={{ width: "92%" }} />
              <span className="lx-skel" style={{ width: "78%" }} />
              <span className="lx-skel" style={{ width: "85%" }} />
              <span className="lx-skel" style={{ width: "54%" }} />
            </div>
            <div
              className="rounded-[8px]"
              style={{
                minHeight: 84,
                opacity: image ? 1 : 0,
                transform: image ? "scale(1)" : "scale(0.94)",
                transition: "opacity 320ms ease, transform 420ms cubic-bezier(0.22,1,0.36,1)",
                background: `linear-gradient(150deg, ${a.css}, rgba(10,10,10,0.14))`,
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </div>
  );
}
