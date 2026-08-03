"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SendButton · der abschluss-moment: kippschutz hoch, dann drücken.
 *
 * zwei-stufig wie an echtem gerät — die klappe verhindert den
 * versehentlichen druck. genau das macht den zweiten klick befriedigend
 * und merkt sich der besucher.
 *
 * die klappe ist ein 3d-scharnier (rotateX über perspective), der knopf
 * darunter sitzt vertieft und fährt beim drücken 4px runter.
 *
 * a11y: klappe und knopf sind echte buttons mit aria-label · der knopf
 * ist disabled solange die klappe zu ist (kein tab-fallen-loch).
 */

type Phase = "closed" | "armed" | "sent";

export function SendButton({ onSend }: { onSend?: () => void }) {
  const [phase, setPhase] = useState<Phase>("closed");
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div className="lab-guard-housing" style={{ perspective: "620px" }}>
        {/* die klappe */}
        <motion.button
          type="button"
          aria-label={phase === "closed" ? "schutzkappe öffnen" : "schutzkappe schließen"}
          onClick={() => setPhase((p) => (p === "closed" ? "armed" : "closed"))}
          className="lab-guard-lid"
          animate={{ rotateX: phase === "closed" ? 0 : -108 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.7 }}
          style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
        >
          <span className="lab-guard-stripes" aria-hidden />
          <span className="lab-label" style={{ color: "rgba(10,10,10,0.75)" }}>
            {phase === "closed" ? "kappe öffnen" : ""}
          </span>
        </motion.button>

        {/* der knopf darunter */}
        <button
          type="button"
          disabled={phase === "closed"}
          aria-label="anfrage senden"
          onPointerDown={() => setPressed(true)}
          onPointerUp={() => setPressed(false)}
          onPointerLeave={() => setPressed(false)}
          onClick={() => {
            if (phase === "closed") return;
            setPhase("sent");
            onSend?.();
          }}
          className="lab-guard-key"
          data-armed={phase !== "closed" ? "1" : "0"}
          style={{ transform: pressed ? "translateY(4px)" : "none" }}
        >
          {phase === "sent" ? "gesendet ✓" : "senden"}
        </button>
      </div>

      <div className="min-w-0">
        <AnimatePresence mode="wait">
          <motion.p
            key={phase}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="lab-hint max-w-[220px]"
          >
            {phase === "closed" && "Kappe hochklappen, dann senden."}
            {phase === "armed" && "Scharf. Jetzt drücken."}
            {phase === "sent" && "Raus damit · Antwort in unter 2h."}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
