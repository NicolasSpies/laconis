"use client";

import { useEffect, useState, useCallback } from "react";
import { track } from "@/lib/analytics";

/**
 * KonamiListener — lauscht auf die konami-sequence
 * ↑ ↑ ↓ ↓ ← → ← → B A
 * und toggled „scribble-mode" auf dem body.
 *
 * verhalten:
 *   - bei match:  body.class = "scribble-mode", sessionStorage-flag, toast, analytics
 *   - bei ESC:    scribble-mode aus (nur wenn aktiv)
 *   - persists in sessionStorage — die aktuelle session bleibt aktiv, neuer tab startet clean
 *
 * sonstiges:
 *   - nur pointer:fine (desktop + pen) — tastatur-gesteuert, mobile macht das onehin nicht
 *   - accessibility: aria-live-toast · reduce-motion wird im css respected (nicht hier)
 */

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

const STORAGE_KEY = "laconis-scribble-mode";
const TOAST_DURATION_MS = 3000;

export function KonamiListener() {
  const [pos, setPos] = useState(0);
  const [active, setActive] = useState(false);
  const [toast, setToast] = useState(false);

  // initial hydrate · scribble-mode kann schon aktiv sein (sessionStorage)
  useEffect(() => {
    try {
      const was = sessionStorage.getItem(STORAGE_KEY) === "1";
      if (was) {
        document.body.classList.add("scribble-mode");
        setActive(true);
      }
    } catch {
      /* noop */
    }
  }, []);

  const activate = useCallback(() => {
    document.body.classList.add("scribble-mode");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* noop */
    }
    setActive(true);
    setToast(true);
    track({ type: "konami_triggered" });
    window.setTimeout(() => setToast(false), TOAST_DURATION_MS);
  }, []);

  const deactivate = useCallback(() => {
    document.body.classList.remove("scribble-mode");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
    setActive(false);
    setToast(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // ESC schaltet ab
      if (e.key === "Escape" && active) {
        deactivate();
        return;
      }

      // in input-feldern nicht mitlesen · sonst zerstören wir form-eingaben
      const tgt = e.target as HTMLElement | null;
      if (
        tgt &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.isContentEditable)
      ) {
        return;
      }

      const expected = SEQUENCE[pos];
      const pressed =
        e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (pressed === expected) {
        const next = pos + 1;
        if (next === SEQUENCE.length) {
          setPos(0);
          activate();
        } else {
          setPos(next);
        }
      } else {
        // bei mismatch: position reset — aber prüfen, ob der key der anfang
        // einer neuen sequence sein kann (z.B. ↑↑ schnell hintereinander)
        setPos(pressed === SEQUENCE[0] ? 1 : 0);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pos, active, activate, deactivate]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-20 right-4 z-[100] rounded-xl border border-lime/50 bg-dark/95 backdrop-blur-md px-4 py-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] pointer-events-none animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="font-mono text-[9px] uppercase tracking-label text-lime/80 mb-1">
        easter egg
      </div>
      <div className="font-hand text-[20px] text-offwhite leading-tight">
        du hast&apos;s gefunden. scribble-mode on.
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-label text-offwhite/35">
        esc → aus
      </div>
    </div>
  );
}
