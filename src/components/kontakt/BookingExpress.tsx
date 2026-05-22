"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CONTACT } from "@/config/contact";
import { useLocale, pick } from "@/i18n/useLocale";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/config";

/**
 * BookingExpress · "express-lane" auf /kontakt zwischen direct-contact und form.
 *
 * inspired by savoirfaire.digital's tidycal-embed-pattern. Hier in laconis-tonalität:
 * niedrigschwellig, klar, mit fallback wenn kein cal.com-account konfiguriert.
 *
 * verhalten:
 *   - default: card sichtbar mit big lime-CTA "20 min direkt buchen"
 *   - klick auf CTA: cal.com-iframe wird inline geladen (lazy · erst on demand)
 *     · keine tracker beim seitenaufruf · privacy-bewusst
 *   - fallback (calcomUrl leer): card zeigt mailto-CTA · keine fehlerhafte iframe
 *
 * micro-anims:
 *   - card reveal von unten on view
 *   - iframe expand mit auto-height + opacity fade
 *   - big "→" pfeil migriert nach rechts on hover (translate +2px)
 *   - badge "neu" mit lila pulse falls erste benutzung
 */

type Dict = {
  kicker: string;
  headline: string;
  body: string;
  cta: string;
  ctaSub: string;
  fallbackCta: string;
  fallbackSub: string;
  loadingText: string;
  closeLabel: string;
  alternativeNote: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    kicker: "· express-lane",
    headline: "wenig zeit?",
    body: "such dir direkt einen 20-minuten-slot · keine mails vorher, kein hin und her.",
    cta: "20 min direkt buchen",
    ctaSub: "lädt erst beim klick · kein tracker im hintergrund",
    fallbackCta: "kurz per mail melden →",
    fallbackSub: "der calendar geht bald live · solange schreibst du mir kurz und der termin steht in stunden",
    loadingText: "kalender lädt …",
    closeLabel: "kalender schließen",
    alternativeNote: "oder · das ausführliche formular weiter unten",
  },
  fr: {
    kicker: "· voie express",
    headline: "peu de temps ?",
    body: "choisis directement un créneau de 20 minutes · pas d'échange de mails préalable.",
    cta: "réserver 20 min direct",
    ctaSub: "se charge au clic seulement · pas de tracker en arrière-plan",
    fallbackCta: "un mot par mail →",
    fallbackSub: "le calendrier arrive bientôt · en attendant écris-moi rapidement et le rendez-vous est calé en quelques heures",
    loadingText: "calendrier en chargement…",
    closeLabel: "fermer le calendrier",
    alternativeNote: "ou · le formulaire détaillé plus bas",
  },
  en: {
    kicker: "· express lane",
    headline: "short on time?",
    body: "pick a 20-minute slot directly · no email back-and-forth.",
    cta: "book 20 min directly",
    ctaSub: "loads only on click · no tracker in the background",
    fallbackCta: "drop a quick email →",
    fallbackSub: "calendar is coming soon · meanwhile drop a quick message and the slot is set in hours",
    loadingText: "calendar loading …",
    closeLabel: "close calendar",
    alternativeNote: "or · the detailed form further down",
  },
};

export function BookingExpress() {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  /* cast via String() · CONTACT.calcomUrl ist via `as const` zur leeren string
     literal narrowed · sobald nicolas einen wert einträgt, greift es ohne änderung */
  const calcomUrl = String(CONTACT.calcomUrl);
  const hasCalcom = calcomUrl.length > 0;
  const calcomEmbed = hasCalcom
    ? `${calcomUrl}${calcomUrl.includes("?") ? "&" : "?"}embed=true&theme=light`
    : "";

  return (
    <section className="py-16 md:py-20 text-[#0a0a0a]">
      <div className="container-site">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative max-w-[920px] mx-auto rounded-2xl overflow-hidden",
            "border border-[#0a0a0a]/15 bg-[#0a0a0a]/[0.025]",
          )}
        >
          {/* kicker + headline + body · always visible */}
          <div className="p-7 md:p-10">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
                {t.kicker}
              </span>
              {/* lila pulse dot = "neu" indikator */}
              <motion.span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#b084d3]"
                animate={
                  reduce
                    ? undefined
                    : {
                        opacity: [0.55, 1, 0.55],
                        scale: [1, 1.3, 1],
                      }
                }
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="max-w-[480px]">
                <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] font-black tracking-[-0.035em] text-[#0a0a0a] lowercase">
                  {t.headline}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-[#0a0a0a]/70">
                  {t.body}
                </p>
              </div>

              {hasCalcom ? (
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    className={cn(
                      "group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-label",
                      "px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52]",
                      "hover:bg-[#1a1a1a] transition-colors tactile-press",
                    )}
                  >
                    <span>{open ? t.closeLabel : t.cta}</span>
                    <motion.span
                      animate={{ x: open ? 0 : 0, rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {open ? "✕" : "→"}
                    </motion.span>
                  </button>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/45 lowercase tracking-mono">
                    {t.ctaSub}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                  <a
                    href={`mailto:${CONTACT.email}?subject=20min-call`}
                    className={cn(
                      "group inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-label",
                      "px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52]",
                      "hover:bg-[#1a1a1a] transition-colors tactile-press",
                    )}
                  >
                    <span>{t.fallbackCta}</span>
                  </a>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/45 lowercase tracking-mono max-w-[280px] md:text-right">
                    {t.fallbackSub}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* lazy iframe · erst sichtbar wenn open=true */}
          <AnimatePresence initial={false}>
            {hasCalcom && open && (
              <motion.div
                key="cal-iframe"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden border-t border-[#0a0a0a]/12"
              >
                <div className="relative w-full" style={{ height: "640px" }}>
                  <p className="absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]/45 pointer-events-none">
                    {t.loadingText}
                  </p>
                  <iframe
                    title="cal.com booking"
                    src={calcomEmbed}
                    loading="lazy"
                    className="relative w-full h-full bg-white"
                    style={{ border: "none" }}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
          {t.alternativeNote}
        </p>
      </div>
    </section>
  );
}
