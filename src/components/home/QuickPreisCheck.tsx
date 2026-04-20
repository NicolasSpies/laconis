"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Option = { label: string; value: string };

const STEPS: { frage: string; key: "paket" | "seiten"; optionen: Option[] }[] = [
  {
    frage: "was brauchst du?",
    key: "paket",
    optionen: [
      { label: "website", value: "web-standard" },
      { label: "branding", value: "grafik-brand" },
      { label: "beides", value: "bundle-grow" },
    ],
  },
  {
    frage: "wie groß?",
    key: "seiten",
    optionen: [
      { label: "onepager", value: "onepager" },
      { label: "bis 5 seiten", value: "2-5" },
      { label: "größer", value: "6-10" },
    ],
  },
];

export function QuickPreisCheck() {
  const [step, setStep] = useState(0);
  const [paket, setPaket] = useState<string | null>(null);
  const [seiten, setSeiten] = useState<string | null>(null);

  const current = STEPS[step];
  const done = paket !== null && seiten !== null;

  const pick = (value: string) => {
    if (current?.key === "paket") setPaket(value);
    if (current?.key === "seiten") setSeiten(value);
    if (step < STEPS.length - 1) setStep(step + 1);
  };

  const reset = () => {
    setPaket(null);
    setSeiten(null);
    setStep(0);
  };

  return (
    <section className="py-20">
      <div className="container-site">
        <div className="max-w-[720px] mx-auto rounded-2xl border border-ink/10 bg-gradient-to-br from-lime/[0.04] via-ink/[0.02] to-transparent p-8 md:p-12">
          <div className="flex items-baseline justify-between gap-4 mb-8">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              quick-check · 10 sekunden
            </span>
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
              {Math.min(step + 1, STEPS.length)} / {STEPS.length}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key={current.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite leading-[1.1]">
                  {current.frage}
                </h3>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {current.optionen.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => pick(o.value)}
                      className="group relative rounded-xl border border-ink/10 bg-ink/[0.02] px-5 py-5 text-left hover:border-lime/50 hover:bg-lime/[0.04] transition-all"
                    >
                      <span className="block heading-sans text-[18px] text-offwhite group-hover:text-accent-ink transition-colors">
                        {o.label}
                      </span>
                      <span className="mt-2 block font-mono text-[10px] uppercase tracking-label text-offwhite/55 group-hover:text-accent-ink/80 transition-colors">
                        wählen →
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="heading-display text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite leading-[1.1]">
                  passt.{" "}
                  <span className="text-offwhite/35">
                    dein richtwert wartet.
                  </span>
                </h3>

                <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-label">
                  <span className="px-2.5 py-1 rounded-full border border-ink/10 bg-ink/[0.02] text-offwhite/75">
                    {paket}
                  </span>
                  <span className="text-offwhite/35">+</span>
                  <span className="px-2.5 py-1 rounded-full border border-ink/10 bg-ink/[0.02] text-offwhite/75">
                    {seiten}
                  </span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/kontakt?paket=${paket}&seiten=${seiten}#projekt`}
                    className="inline-flex items-center gap-2 rounded-full bg-lime text-black px-5 py-3 font-mono text-[12px] uppercase tracking-label hover:bg-lime/80 transition-colors"
                  >
                    projekt starten →
                  </Link>
                  <button
                    type="button"
                    onClick={reset}
                    className="font-mono text-[10px] uppercase tracking-label text-offwhite/55 hover:text-accent-ink transition-colors"
                  >
                    nochmal wählen
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
