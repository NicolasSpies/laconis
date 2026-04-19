"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  type LineItem,
  type Totals,
  formatEUR,
} from "@/lib/paket-pricing";

/**
 * Kassenzettel — der receipt rechts neben dem konfigurator.
 * Volle bon-ästhetik: monospace, gestrichelte trennlinien, zentrierter header,
 * dotted-leaders zwischen label + preis. Jede zeile animiert rein.
 */

type Props = {
  items: LineItem[];
  totals: Totals;
  bonNumber: string;
  closestPaket: string | null;
  empty: boolean;
};

const dashLine = "·".repeat(40); // wird per CSS auf container-breite gekürzt

export function Kassenzettel({
  items,
  totals,
  bonNumber,
  closestPaket,
  empty,
}: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      id="kassenzettel-preview"
      className="relative rounded-xl bg-[#faf8f3] text-[#1a1a1a] p-6 md:p-7 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] font-mono text-[11.5px] leading-[1.7]"
      style={{
        // leichtes paper-feeling
        backgroundImage:
          "repeating-linear-gradient(180deg, transparent 0px, transparent 23px, rgba(0,0,0,0.025) 23px, rgba(0,0,0,0.025) 24px)",
      }}
    >
      {/* papier-rand oben (zackenmuster) */}
      <div
        aria-hidden
        className="absolute -top-1 left-0 right-0 h-2"
        style={{
          background:
            "linear-gradient(-45deg, transparent 33%, #faf8f3 33%) 0 0 / 8px 8px, linear-gradient(45deg, transparent 33%, #faf8f3 33%) 0 0 / 8px 8px",
        }}
      />

      {/* header */}
      <div className="text-center">
        <div className="tracking-[0.3em] text-[10px] text-[#1a1a1a]/70">
          LACØNIS
        </div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#1a1a1a]/50">
          voranschlag / estimate
        </div>
        <div className="mt-3 text-[9px] text-[#1a1a1a]/55">
          {dateStr} · {timeStr} · bon #{bonNumber}
        </div>
      </div>

      <Divider />

      {/* items */}
      {empty ? (
        <div className="py-8 text-center text-[#1a1a1a]/40">
          <div className="text-[11px] uppercase tracking-[0.2em]">
            noch nichts im korb
          </div>
          <div className="mt-2 text-[10px] leading-relaxed max-w-[240px] mx-auto">
            wähl links etwas aus • jede änderung landet sofort hier als
            zeile auf dem zettel.
          </div>
        </div>
      ) : (
        <div className="py-3">
          <AnimatePresence initial={false}>
            {items
              .filter((i) => !i.monthly)
              .map((item, i) => (
                <Row key={`fix-${item.label}-${i}`} item={item} />
              ))}
          </AnimatePresence>
        </div>
      )}

      {!empty && (
        <>
          <Divider />
          {/* einmalsumme */}
          <div className="flex items-baseline justify-between pt-2 pb-1 text-[12px]">
            <span className="uppercase tracking-[0.15em] text-[#1a1a1a]/75">
              gesamt einmalig
            </span>
            <motion.span
              key={totals.oneTime}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[15px] font-bold"
            >
              {formatEUR(totals.oneTime)} €
            </motion.span>
          </div>

          {/* monthly */}
          {totals.monthly > 0 && (
            <>
              <div className="mt-4 text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/45">
                + laufend pro monat
              </div>
              <div className="mt-2">
                {items
                  .filter((i) => i.monthly)
                  .map((item, i) => (
                    <Row key={`mt-${item.label}-${i}`} item={item} monthly />
                  ))}
              </div>
              <div className="flex items-baseline justify-between pt-2 mt-2 border-t border-dashed border-[#1a1a1a]/20 text-[11.5px]">
                <span className="uppercase tracking-[0.15em] text-[#1a1a1a]/65">
                  summe / monat
                </span>
                <motion.span
                  key={`mt-${totals.monthly}`}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[13px] font-bold"
                >
                  {formatEUR(totals.monthly)} €
                </motion.span>
              </div>
            </>
          )}

          <Divider />

          {/* closest paket hint */}
          {closestPaket && (
            <div className="text-center text-[9.5px] leading-relaxed text-[#1a1a1a]/55 mt-1">
              entspricht grob dem paket
              <div className="mt-1 text-[10.5px] text-[#1a1a1a]/85">
                {closestPaket}
              </div>
            </div>
          )}

          {/* footer */}
          <div className="mt-5 text-center text-[9px] leading-relaxed text-[#1a1a1a]/45 uppercase tracking-[0.18em]">
            richtpreis · kein angebot
            <br />
            antwort innerhalb 24 std
          </div>

          <div className="mt-3 text-center text-[11px] text-[#1a1a1a]/70">
            danke • und schönen tag.
          </div>
        </>
      )}

      {/* papier-rand unten */}
      <div
        aria-hidden
        className="absolute -bottom-1 left-0 right-0 h-2"
        style={{
          background:
            "linear-gradient(-135deg, transparent 33%, #faf8f3 33%) 0 0 / 8px 8px, linear-gradient(135deg, transparent 33%, #faf8f3 33%) 0 0 / 8px 8px",
        }}
      />
    </div>
  );
}

/* ══════════════════════════ sub-components ══════════════════════════ */

function Row({ item, monthly }: { item: LineItem; monthly?: boolean }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 8 }}
      transition={{ duration: 0.22 }}
      className="py-1"
    >
      <div
        className={[
          "flex items-baseline gap-2",
          item.discount ? "text-[#1a1a1a]/80" : "",
        ].join(" ")}
      >
        <span className="flex-1 truncate">
          {item.label}
        </span>
        <span
          aria-hidden
          className="flex-shrink min-w-0 overflow-hidden text-[#1a1a1a]/25 tracking-[0.1em]"
        >
          {dashLine}
        </span>
        <span className={item.discount ? "text-[#1a1a1a]/80" : ""}>
          {item.discount ? "−" : ""}
          {formatEUR(Math.abs(item.amount))} €{monthly ? "/Mt" : ""}
        </span>
      </div>
      {item.hint && (
        <div className="pl-3 text-[9.5px] text-[#1a1a1a]/40 -mt-0.5">
          {item.hint}
        </div>
      )}
    </motion.div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      className="my-3 h-px border-t border-dashed border-[#1a1a1a]/25"
    />
  );
}
