"use client";

import { motion } from "framer-motion";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * WebUebernahme · der redesign-/übernahme-ablauf auf /leistungen/web.
 *
 * der zweite pfad neben "neu von null" (WebApproaches). kernbotschaft:
 * du musst dich um fast nichts kümmern. fünf schritte, vier mach ich,
 * einer ist deiner (das briefing). schritt 03 = "dein part", lila
 * hervorgehoben zwischen den vier "ich"-schritten.
 *
 * absorbiert die früher losen redesign-kärtchen (1:1-inhalt → schritt 04,
 * 301 · kein ausfall · test-domain → garantien-zeile drunter).
 */

type Step = { num: string; who: string; titel: string; text: string; mine: boolean };

type Dict = {
  h2: string;
  sub: string;
  steps: Step[];
  guarantees: string[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    h2: "so übernehme ich deine seite",
    sub: "fünf schritte · vier mach ich, einer ist deiner.",
    steps: [
      { num: "01", who: "ich", mine: true, titel: "scannen", text: "ich scanne deine bestehende seite, komplett · jede unterseite, jeder text, jedes bild. du schickst mir nichts." },
      { num: "02", who: "ich", mine: true, titel: "analysieren", text: "was klappt, was nicht: ladezeit, struktur, was google sieht und was nicht." },
      { num: "03", who: "dein part", mine: false, titel: "briefing", text: "du kriegst konkrete optimierungsvorschläge. du sagst nur: was bleibt, was raus kann. das ist alles, was ich von dir brauche." },
      { num: "04", who: "ich", mine: true, titel: "inhalte ziehen", text: "alle inhalte inkl. bilder · 1:1 übernommen, nichts geht verloren." },
      { num: "05", who: "ich", mine: true, titel: "optimiert nachbauen", text: "schneller, klarer, SEO-sauber neu gebaut · dein inhalt, besseres drumherum." },
    ],
    guarantees: [
      "rankings bleiben · saubere 301-redirects auf jede alte url",
      "kein ausfall · deine alte seite läuft, bis du den knopf drückst",
      "vorschau auf test-domain · du siehst alles vorher",
      "danach voller backend-zugriff · änderst du jederzeit selbst",
    ],
  },
  fr: {
    h2: "voilà comment je reprends ton site",
    sub: "cinq étapes · j'en fais quatre, une est la tienne.",
    steps: [
      { num: "01", who: "moi", mine: true, titel: "scanner", text: "je scanne ton site existant, en entier · chaque page, chaque texte, chaque image. tu ne m'envoies rien." },
      { num: "02", who: "moi", mine: true, titel: "analyser", text: "ce qui marche, ce qui ne marche pas : vitesse, structure, ce que google voit et ne voit pas." },
      { num: "03", who: "ton rôle", mine: false, titel: "briefing", text: "tu reçois des propositions concrètes. tu dis juste : ce qui reste, ce qui dégage. c'est tout ce dont j'ai besoin de toi." },
      { num: "04", who: "moi", mine: true, titel: "récupérer les contenus", text: "tous les contenus, images comprises · repris à l'identique, rien ne se perd." },
      { num: "05", who: "moi", mine: true, titel: "reconstruire optimisé", text: "plus rapide, plus clair, SEO propre · ton contenu, un meilleur écrin." },
    ],
    guarantees: [
      "positions conservées · redirections 301 propres sur chaque ancienne url",
      "aucune coupure · ton ancien site tourne jusqu'à ce que tu bascules",
      "aperçu sur domaine de test · tu vois tout avant",
      "ensuite accès complet au backend · tu modifies quand tu veux",
    ],
  },
  en: {
    h2: "how I take over your site",
    sub: "five steps · I do four, one is yours.",
    steps: [
      { num: "01", who: "me", mine: true, titel: "scan", text: "I scan your existing site, completely · every page, every text, every image. you send me nothing." },
      { num: "02", who: "me", mine: true, titel: "analyse", text: "what works, what doesn't: speed, structure, what google sees and what it doesn't." },
      { num: "03", who: "your part", mine: false, titel: "briefing", text: "you get concrete suggestions. you just say: what stays, what goes. that's all I need from you." },
      { num: "04", who: "me", mine: true, titel: "pull the content", text: "all content incl. images · taken over 1:1, nothing gets lost." },
      { num: "05", who: "me", mine: true, titel: "rebuild optimised", text: "faster, cleaner, SEO-tight · your content, a better shell." },
    ],
    guarantees: [
      "rankings stay · clean 301 redirects on every old url",
      "no downtime · your old site runs until you flip the switch",
      "preview on a staging domain · you see everything first",
      "then full backend access · change it yourself anytime",
    ],
  },
};

const LILA = "#b084d3";

export function WebUebernahme() {
  const locale = useLocale();
  const t = pick(DICT, locale);

  return (
    <section id="uebernahme" className="relative py-20 md:py-28 overflow-x-clip scroll-mt-24">
      <div className="container-site">
        <h2 className="heading-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-offwhite leading-[1.05] max-w-[20ch]">
          {t.h2}
        </h2>
        <p className="mt-5 font-mono text-[12px] md:text-[13px] uppercase tracking-label text-offwhite/55">
          {t.sub}
        </p>

        {/* 5 schritte · 03 (dein part) lila hervorgehoben */}
        <ol className="mt-12 flex flex-col gap-3">
          {t.steps.map((s, i) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
              className="flex items-start gap-5 md:gap-8 rounded-2xl border p-6 md:p-7"
              style={{
                borderColor: s.mine ? "rgba(10,10,10,0.07)" : `${LILA}80`,
                background: s.mine ? "rgba(10,10,10,0.02)" : `${LILA}14`,
              }}
            >
              <span
                className="font-display font-black leading-none tracking-[-0.04em] text-[clamp(2rem,4vw,3rem)] tabular-nums shrink-0"
                style={{ color: s.mine ? "#0a0a0a" : LILA }}
              >
                {s.num}
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-[clamp(1.2rem,2.4vw,1.6rem)] font-black text-offwhite leading-[1.1] tracking-[-0.02em] lowercase">
                    {s.titel}
                  </h3>
                  <span
                    className="font-mono text-[10px] uppercase tracking-label"
                    style={{ color: s.mine ? "rgba(10,10,10,0.4)" : LILA }}
                  >
                    · {s.who}
                  </span>
                </div>
                <p className="mt-2.5 text-[14px] md:text-[15px] leading-relaxed text-offwhite/70 max-w-[60ch]">
                  {s.text}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* garantien · absorbiert die alten redesign-reassurances */}
        <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 border-t border-offwhite/10 pt-8">
          {t.guarantees.map((g) => (
            <li key={g} className="flex items-start gap-2.5 text-[13px] md:text-[14px] leading-snug text-offwhite/65">
              <span aria-hidden className="mt-0.5 shrink-0" style={{ color: LILA }}>
                ✓
              </span>
              {g}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
