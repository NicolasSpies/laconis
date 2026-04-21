"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { CONTACT } from "@/config/contact";
import { findStartSlot } from "@/data/verfuegbarkeit";

/** grobe kw → "mon. monat"-näherung, montag der kw (ISO 8601) */
function kwLabel(kw: number, year: number): string {
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const day = jan4.getUTCDay() || 7;
  const monKW1 = new Date(jan4);
  monKW1.setUTCDate(jan4.getUTCDate() - day + 1);
  const target = new Date(monKW1);
  target.setUTCDate(monKW1.getUTCDate() + (kw - 1) * 7);
  return target.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function KontaktStrip() {
  const nextFree = findStartSlot("flex");
  const nextFreeLabel = nextFree
    ? `ab ${kwLabel(nextFree.kw, nextFree.jahr)} · kw ${nextFree.kw}`
    : null;

  return (
    <section className="relative py-24">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-2xl p-10 md:p-14 flex flex-col md:flex-row md:items-end justify-between gap-10 overflow-hidden"
        >
          {/* Local lime glow inside the card */}
          <div
            aria-hidden
            className="absolute -right-20 -top-20 w-[420px] h-[420px] rounded-full bg-lime/25 blur-[120px]"
          />

          <div className="relative">
            {/* verfügbarkeits-zeile · ehrlich statt hypen */}
            {nextFreeLabel && (
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/[0.06] pl-2 pr-3 py-1">
                <span aria-hidden className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
                  nächster slot frei
                </span>
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink tabular-nums">
                  {nextFreeLabel}
                </span>
              </div>
            )}

            <p
              className="font-hand text-[20px] md:text-[24px] text-offwhite/55 leading-snug mb-2"
              style={{ transform: "rotate(-1deg)" }}
            >
              hallo.
            </p>
            <h2 className="heading-display text-[clamp(2rem,4.5vw,3.25rem)] text-offwhite leading-[1.05]">
              schreib mir · oder{" "}
              <span className="italic font-serif text-accent-ink">ruf an.</span>
            </h2>
            <p className="mt-5 max-w-[420px] text-[14px] leading-relaxed text-offwhite/55">
              Kein Formular-Pflicht. E-Mail, Telefon, oder direkt der Multistep
              wenn du's strukturiert magst. Ich melde mich gleichen Tag zurück.
            </p>
            <div className="mt-8 flex flex-wrap gap-10">
              <div>
                <div className="label-mono mb-1.5">e-mail</div>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="font-sans text-[15px] text-offwhite hover:text-accent-ink transition-colors"
                >
                  {CONTACT.email}
                </a>
              </div>
              {CONTACT.phone && (
                <div>
                  <div className="label-mono mb-1.5">telefon</div>
                  <a
                    href={`tel:${CONTACT.phoneE164}`}
                    className="font-sans text-[15px] text-offwhite hover:text-accent-ink transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="relative flex flex-col items-start md:items-end gap-2">
            <Magnetic strength={0.4} max={18}>
              <Button
                href="/kontakt#projekt"
                size="lg"
                analyticsLabel="home_kontakt_strip"
              >
                projekt starten →
              </Button>
            </Magnetic>
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              multistep · dauert 60 sekunden
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
