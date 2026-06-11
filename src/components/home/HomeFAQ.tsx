"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { HOME_FAQ } from "@/data/home-faq";

/**
 * HomeFAQ · kompakte 4-fragen-sektion für die startseite (phase 2 · SEO).
 *
 * zweck: die money-keywords ("was kostet eine website", "webdesigner",
 * "wordpress alternative") landen in echten, ehrlichen antworten auf der
 * home · das FAQPage-schema rendert die page (server) aus denselben daten
 * (src/data/home-faq.ts · server-safe).
 *
 * bewusst klein gehalten: 4 fragen, accordion, max-w-820 ·
 * die ausführlichen FAQs leben weiter auf den service-pages.
 */
export function HomeFAQ() {
  const locale = useLocale();
  const t = pick(HOME_FAQ, locale);
  const reduce = useReducedMotion();

  return (
    <section className="py-20 md:py-24">
      <div className="container-site">
        <motion.div
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-10 md:gap-16 items-start"
        >
          <div className="md:sticky md:top-28">
            <p className="font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              · {t.label}
            </p>
            <h2 className="heading-display mt-4 text-[clamp(1.75rem,4.5vw,2.75rem)] text-offwhite leading-[1.05]">
              {t.headline}
            </h2>
          </div>

          <div className="divide-y divide-ink/10 border-y border-ink/20">
            {t.items.map((item) => (
              <details key={item.q} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between gap-4 list-none">
                  <h3 className="heading-sans text-[16px] md:text-[17px] text-offwhite group-hover:text-[#b084d3] transition-colors">
                    {item.q}
                  </h3>
                  <span className="font-mono text-[16px] text-offwhite/35 group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-offwhite/60">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
