"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * KontaktKonsole · das formular als sendekonsole.
 *
 * jedes gefüllte feld hebt den pegel. ist der pegel zu niedrig, ist die
 * schutzkappe über dem sendeknopf verriegelt · zwei bolzen liegen quer
 * darüber und man kommt schlicht nicht ran.
 *
 * damit ist die validierung kein roter text unter einem feld, sondern
 * ein sperrglied. man sieht sofort, woran es liegt, und das aufspringen
 * der riegel ist der moment, für den man das formular ausfüllt.
 *
 * gesendet wird an dieselbe API wie vorher (/api/kontakt, zod-validiert,
 * resend). honeypot bleibt drin.
 */

export type KonsoleT = {
  panel: string;
  fName: string;
  fMail: string;
  fTel: string;
  fTelOpt: string;
  fNotiz: string;
  fNotizPlaceholder: string;
  labelBedarf: string;
  bedarf: [string, string, string];
  labelZeit: string;
  zeit: [string, string, string];
  meterLabel: string;
  lockedHint: string;
  readyHint: string;
  guardClosed: string;
  guardOpen: string;
  sending: string;
  send: string;
  sentTitle: string;
  sentBody: string;
  errorTitle: string;
  errorBody: string;
};

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Phase = "closed" | "armed" | "sending" | "sent" | "error";

export function KontaktKonsole({ t }: { t: KonsoleT }) {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [tel, setTel] = useState("");
  const [notiz, setNotiz] = useState("");
  const [bedarf, setBedarf] = useState(-1);
  const [zeit, setZeit] = useState(-1);
  const [hp, setHp] = useState(""); // honeypot
  const [phase, setPhase] = useState<Phase>("closed");
  const [pressed, setPressed] = useState(false);

  const nameOk = name.trim().length > 1;
  const mailOk = MAIL_RE.test(mail.trim());
  /* nur name + mail entriegeln · alles andere hebt nur den pegel */
  const unlocked = nameOk && mailOk;

  /* pegel: die zwei pflichtfelder zählen doppelt, damit der balken
     ehrlich zeigt, was die anfrage brauchbar macht */
  const segs = [
    nameOk,
    nameOk,
    mailOk,
    mailOk,
    bedarf >= 0,
    zeit >= 0,
    notiz.trim().length > 12,
    tel.trim().length > 5,
  ];
  const bonusFrom = 4;

  async function send() {
    if (!unlocked || phase === "sending") return;
    setPhase("sending");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hp,
          name: name.trim(),
          email: mail.trim(),
          telefon: tel.trim(),
          notiz: notiz.trim(),
          bedarf: bedarf >= 0 ? t.bedarf[bedarf] : "·",
          zeitplan: zeit >= 0 ? t.zeit[zeit] : "·",
        }),
      });
      setPhase(res.ok ? "sent" : "error");
    } catch {
      setPhase("error");
    }
  }

  if (phase === "sent") {
    return (
      <div className="kx-receipt">
        <span className="lab-label" style={{ color: "rgba(225,253,82,0.8)" }}>
          ✓ {t.sentTitle}
        </span>
        <p className="mt-5 max-w-[46ch] text-lead leading-[1.55] text-[rgba(242,242,242,0.88)]">
          {t.sentBody}
        </p>
      </div>
    );
  }

  return (
    <div className="gl relative p-8 md:p-12">

      <div className="mb-7 flex items-center gap-2.5">
        <span
          className="lab-led-idle h-1.5 w-1.5 rounded-full"
          style={{ background: "#e1fd52", boxShadow: "0 0 8px #e1fd52" }}
        />
        <span className="lab-label">{t.panel}</span>
      </div>

      <form
        className="grid gap-5 md:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        {/* honeypot · für menschen unsichtbar, für bots verlockend */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={hp}
          onChange={(e) => setHp(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        />

        <label className="kx-slot block" data-ok={nameOk ? "1" : "0"} data-req="1">
          <span className="lab-label">{t.fName}</span>
          <input
            className="lab-field mt-2"
            value={name}
            autoComplete="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <span className="kx-slot-led" style={{ top: "calc(50% + 9px)" }} aria-hidden />
        </label>

        <label className="kx-slot block" data-ok={mailOk ? "1" : "0"} data-req="1">
          <span className="lab-label">{t.fMail}</span>
          <input
            className="lab-field mt-2"
            type="email"
            value={mail}
            autoComplete="email"
            required
            onChange={(e) => setMail(e.target.value)}
          />
          <span className="kx-slot-led" style={{ top: "calc(50% + 9px)" }} aria-hidden />
        </label>

        <label className="kx-slot block md:col-span-2" data-ok={tel.trim().length > 5 ? "1" : "0"}>
          <span className="lab-label">
            {t.fTel} <span style={{ opacity: 0.5 }}>{t.fTelOpt}</span>
          </span>
          <input
            className="lab-field mt-2"
            type="tel"
            value={tel}
            autoComplete="tel"
            onChange={(e) => setTel(e.target.value)}
          />
          <span className="kx-slot-led" style={{ top: "calc(50% + 9px)" }} aria-hidden />
        </label>

        <div>
          <span className="lab-label">{t.labelBedarf}</span>
          <div className="lab-switch mt-2" role="radiogroup" aria-label={t.labelBedarf}>
            {t.bedarf.map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={bedarf === i}
                data-on={bedarf === i ? "1" : "0"}
                onClick={() => setBedarf(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="lab-label">{t.labelZeit}</span>
          <div className="lab-switch mt-2" role="radiogroup" aria-label={t.labelZeit}>
            {t.zeit.map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={zeit === i}
                data-on={zeit === i ? "1" : "0"}
                onClick={() => setZeit(i)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="kx-slot block md:col-span-2" data-ok={notiz.trim().length > 12 ? "1" : "0"}>
          <span className="lab-label">{t.fNotiz}</span>
          <textarea
            className="lab-field mt-2"
            value={notiz}
            placeholder={t.fNotizPlaceholder}
            maxLength={4000}
            onChange={(e) => setNotiz(e.target.value)}
          />
        </label>

        {/* ── pegel + sendeknopf ── */}
        <div className="md:col-span-2">
          <div className="mb-2 flex items-baseline justify-between gap-4">
            <span className="lab-label">{t.meterLabel}</span>
            {/* hier der zählerstand · der satz steht schon neben dem
                knopf, zweimal dasselbe liest sich wie ein fehler */}
            <span className="lab-hint text-body-sm" aria-hidden>
              {segs.filter(Boolean).length} / {segs.length}
            </span>
          </div>
          <div className="kx-meter" data-locked={unlocked ? "0" : "1"} aria-hidden>
            {segs.map((on, i) => (
              <span
                key={i}
                className="kx-seg"
                data-on={on ? "1" : "0"}
                data-bonus={i >= bonusFrom ? "1" : "0"}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="lab-guard-housing relative" style={{ perspective: "620px" }}>
              <motion.button
                type="button"
                aria-label={phase === "closed" ? t.guardClosed : t.guardOpen}
                disabled={!unlocked}
                onClick={() => setPhase((p) => (p === "closed" ? "armed" : "closed"))}
                className="lab-guard-lid"
                animate={{ rotateX: phase === "closed" ? 0 : -108 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.7 }}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
              >
                <span className="lab-guard-stripes" aria-hidden />
                <span className="lab-label" style={{ color: "rgba(10,10,10,0.75)" }}>
                  {phase === "closed" ? t.guardClosed : ""}
                </span>
              </motion.button>

              <button
                type="submit"
                disabled={phase === "closed" || phase === "sending" || !unlocked}
                onPointerDown={() => setPressed(true)}
                onPointerUp={() => setPressed(false)}
                onPointerLeave={() => setPressed(false)}
                className="lab-guard-key"
                data-armed={phase === "armed" ? "1" : "0"}
                style={{ transform: pressed ? "translateY(4px)" : "none" }}
              >
                {phase === "sending" ? t.sending : t.send}
              </button>

              {/* die verriegelung · liegt über allem, bis name und mail
                  stimmen. dann fahren die bolzen zur seite. */}
              <span className="kx-lock" data-open={unlocked ? "1" : "0"} aria-hidden>
                <span className="kx-bolt" data-side="l" />
                <span className="kx-bolt" data-side="r" />
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="lab-hint max-w-[240px] text-body-sm leading-relaxed"
              >
                {phase === "error" ? t.errorBody : unlocked ? t.readyHint : t.lockedHint}
              </motion.p>
            </AnimatePresence>
          </div>

          {phase === "error" && (
            <p className="mt-4 text-body-sm" style={{ color: "#b084d3" }}>
              {t.errorTitle}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
