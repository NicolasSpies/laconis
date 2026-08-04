"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import { buildPath, type Locale } from "@/i18n/config";
import { VorherNachher } from "@/components/home/VorherNachher";

/**
 * RedesignTeaser · home-hook für die "schon eine seite?"-persona.
 *
 * v2 (visual-first): der pitch wird nicht mehr erklärt, sondern GEZEIGT —
 * der VorherNachher-regler (2014er-gruselseite vs. laconis-version) ist
 * das zentrum. reihenfolge: headline → beweis → punchline → detail → cta.
 * der ausführliche 5-schritt-ablauf bleibt auf /leistungen/web.
 */

type Dict = {
  headline: string;
  note: string;
  body: string;
  jobPre: string;
  jobHi: string;
  jobPost: string;
  cta: string;
};

const DICT: Record<Locale, Dict> = {
  de: {
    headline: "schon eine seite · sie gefällt dir nur nicht mehr?",
    note: "zieh mich ←→",
    body: "du fängst nicht bei null an · und kümmern musst du dich um fast nichts. du musst mir nicht mal was schicken · ich zieh deine inhalte selbst von deiner alten seite (texte, bilder, alles), schlag dir vor was bleibt und was weg kann, und bau's schneller, klarer und SEO-sauber neu.",
    jobPre: "dein job: ",
    jobHi: "ja oder nein sagen.",
    jobPost: " ändern kannst du danach eh alles selbst.",
    cta: "so läuft das, schritt für schritt",
  },
  fr: {
    headline: "déjà un site · mais il ne te plaît plus?",
    note: "tire-moi ←→",
    body: "tu ne repars pas de zéro · et tu n'as presque rien à faire. tu n'as même pas besoin de m'envoyer quoi que ce soit · je récupère tes contenus moi-même depuis ton ancien site (textes, images, tout), je te propose ce qui reste et ce qui dégage, et je reconstruis le tout plus rapide, plus clair et optimisé SEO.",
    jobPre: "ton job: ",
    jobHi: "dire oui ou non.",
    jobPost: " et de toute façon tu peux tout modifier toi-même après.",
    cta: "voilà comment ça marche, étape par étape",
  },
  en: {
    headline: "already have a site · you just don't like it anymore?",
    note: "drag me ←→",
    body: "you don't start from zero · and you barely lift a finger. you don't even need to send me anything · I pull your content myself from your old site (text, images, everything), suggest what stays and what goes, and rebuild it faster, cleaner and SEO-tight.",
    jobPre: "your job: ",
    jobHi: "say yes or no.",
    jobPost: " you can change everything yourself afterwards anyway.",
    cta: "here's how it works, step by step",
  },
};

export function RedesignTeaser() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section className="py-20 md:py-28">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-display font-black lowercase tracking-[-0.035em] text-[#0a0a0a] text-[clamp(2rem,5.5vw,3.75rem)] leading-[1.02] max-w-[900px]">
            {t.headline}
          </h2>

          {/* beweis zuerst · der regler zeigt was worte erklären müssten */}
          <div className="relative mt-10 md:mt-12 max-w-[960px]">
            <span
              aria-hidden
              className="font-hand absolute -top-8 right-2 text-[20px] md:text-[23px] text-[#0a0a0a]/65"
              style={{ transform: "rotate(-2deg)" }}
            >
              {t.note}
            </span>
            <VorherNachher />
          </div>

          <p className="mt-10 font-display font-light lowercase text-[clamp(1.4rem,3vw,2.1rem)] leading-[1.2] tracking-[-0.02em] text-[#0a0a0a] max-w-[900px]">
            {t.jobPre}
            <span style={{ color: "#b084d3" }}>{t.jobHi}</span>
            <span className="text-[#0a0a0a]/55">{t.jobPost}</span>
          </p>

          <p className="mt-6 max-w-[620px] text-[15px] md:text-[16px] leading-relaxed text-[#0a0a0a]/70">
            {t.body}
          </p>

          <Link
            href={`${buildPath("leistung", locale)}#uebernahme`}
            scroll={false}
            className="link-draw mt-9 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-[#0a0a0a]"
          >
            {t.cta}
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
