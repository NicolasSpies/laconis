"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Feature = { titel: string; beschreibung: string; stichwort: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  features: Feature[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "was contentcore alles kann",
    h2pre: "ein system.",
    h2post: "alles was du brauchst, nichts was du nicht willst.",
    intro: "Kein Shopify für den Shop, kein Mailchimp für den Newsletter, kein WPML für die Übersetzung, kein Analytics-Dschungel für die Statistik. Alles an einem Ort, alles aufeinander abgestimmt, alles von mir gewartet.",
    features: [
      { titel: "KI, die mitliest", stichwort: "01 · intelligenz", beschreibung: "Lädst du ein Foto hoch, beschreibt die KI automatisch, was drauf ist, in allen Sprachen. Google dankt, Screenreader auch. Für Texte gibt's Tippfehler-, Grammatik- und Stil-Hinweise direkt im Editor." },
      { titel: "ein klick übersetzt alles", stichwort: "02 · mehrsprachig", beschreibung: "Deutsch, Französisch, Englisch · was du brauchst. KI macht den groben Wurf, du schleifst nach. Jede Sprache hat eigene URL, eigene SEO, eigenen Übersetzungsstatus." },
      { titel: "bilder, die sich selbst optimieren", stichwort: "03 · performance", beschreibung: "Foto hochladen, fertig. ContentCore wandelt in WebP (30% kleiner), schneidet fünf Größen für Handy bis Desktop, und bei Bildermonstern wie Fotograf:innen landet alles im Cloud-Speicher." },
      { titel: "newsletter direkt im system", stichwort: "04 · kontakt", beschreibung: "Kein Mailchimp-Abo mehr. Drag-&-Drop-Editor, Abonnenten-Verwaltung, Öffnungsraten, Versand geplant oder sofort, alles in ContentCore." },
      { titel: "shop ohne shopify", stichwort: "05 · verkauf", beschreibung: "Produkte, Varianten, Lagerbestand, Stripe-Checkout mit Apple Pay und SEPA. 1,5% + 25 Cent pro Transaktion, keine Shopify-Grundgebühr." },
      { titel: "versionsverlauf als sicherheitsnetz", stichwort: "06 · ruhe", beschreibung: "Alle 30 Sekunden automatisch speichern. Jede Änderung bleibt in der Historie, du kannst jederzeit zurück. Wenn zwei gleichzeitig am selben Artikel sind, warnt das System, bevor was doppelt entsteht." },
      { titel: "redaktionskalender", stichwort: "07 · planung", beschreibung: "Monats- und Wochenansicht, Artikel per Drag & Drop verschieben, farbcodiert nach Inhaltstyp. Für alle, die mehr als drei Posts im Jahr machen." },
      { titel: "jahresrückblick, automatisch", stichwort: "08 · gimmick", beschreibung: "Jedes Jahr am 1. Dezember bekommt jeder Kunde eine animierte Story, wie bei Instagram, nur für deine Seite. Meistgelesener Artikel, bester Monat, Total-Besucher. Teilbar, vollautomatisch." },
      { titel: "dein branding, nicht meins", stichwort: "09 · white-label", beschreibung: "Im ContentCore siehst du dein Logo, deine Firmenfarben, deinen Namen. Das Wort „ContentCore\" taucht nirgends auf. Es fühlt sich an wie dein eigenes System, weil es das ist." },
      { titel: "statistiken ohne spionage", stichwort: "10 · ehrlich", beschreibung: "Keine Cookies, kein Google Analytics, kein Banner. Du siehst trotzdem: Besucherzahl, Top-Seiten, Geräteverteilung, Herkunft. Sauber, DSGVO-konform, ohne Ballast." },
    ],
  },
  fr: {
    sectionLabel: "tout ce que contentcore sait faire",
    h2pre: "un système.",
    h2post: "tout ce dont tu as besoin, rien que tu veux pas.",
    intro: "Pas de Shopify pour le shop, pas de Mailchimp pour la newsletter, pas de WPML pour la traduction, pas de jungle Analytics pour les stats. Tout au même endroit, tout cohérent, tout maintenu par moi.",
    features: [
      { titel: "ia qui lit avec toi", stichwort: "01 · intelligence", beschreibung: "Tu uploads une photo, l'ia décrit ce qu'il y a dessus, dans toutes les langues. Google dit merci, les lecteurs d'écran aussi. Pour les textes : suggestions de fautes, grammaire et style direct dans l'éditeur." },
      { titel: "un clic, tout est traduit", stichwort: "02 · multilingue", beschreibung: "Allemand, français, anglais · ce qu'il te faut. L'ia fait la première passe, tu peaufines. Chaque langue a son URL propre, son SEO, son statut de trad." },
      { titel: "images qui s'optimisent toutes seules", stichwort: "03 · performance", beschreibung: "Upload de la photo, fini. ContentCore convertit en WebP (30% plus petit), découpe cinq tailles du mobile au desktop, et pour les monstres d'images comme les photographes, tout part dans le cloud-storage." },
      { titel: "newsletter direct dans le système", stichwort: "04 · contact", beschreibung: "Plus d'abo Mailchimp. Éditeur drag-and-drop, gestion d'abonnés, taux d'ouverture, envoi planifié ou immédiat, tout dans ContentCore." },
      { titel: "shop sans shopify", stichwort: "05 · vente", beschreibung: "Produits, variantes, stock, checkout Stripe avec Apple Pay et SEPA. 1,5% + 25 centimes par transaction, pas d'abo Shopify mensuel." },
      { titel: "historique des versions comme filet", stichwort: "06 · sérénité", beschreibung: "Auto-save toutes les 30 secondes. Chaque modif reste dans l'historique, tu peux revenir n'importe quand. Si deux personnes sont sur le même article, le système prévient avant le doublon." },
      { titel: "calendrier éditorial", stichwort: "07 · planning", beschreibung: "Vue mois et semaine, articles déplaçables par drag-and-drop, code couleur par type. Pour tous ceux qui font plus de trois posts par an." },
      { titel: "rétrospective annuelle, auto", stichwort: "08 · gimmick", beschreibung: "Chaque année le 1er décembre, chaque client reçoit une story animée, comme sur Instagram, mais pour ton site. Article le plus lu, meilleur mois, total visiteurs. Partageable, tout auto." },
      { titel: "ton branding, pas le mien", stichwort: "09 · white-label", beschreibung: "Dans ContentCore tu vois ton logo, tes couleurs, ton nom. Le mot « ContentCore » apparaît nulle part. Ça donne l'impression d'être ton propre système, parce que c'est le cas." },
      { titel: "stats sans espionnage", stichwort: "10 · honnête", beschreibung: "Pas de cookies, pas de Google Analytics, pas de bandeau. Tu vois quand même : nombre de visiteurs, top pages, devices, origine. Propre, conforme RGPD, sans ballast." },
    ],
  },
  en: {
    sectionLabel: "everything contentcore can do",
    h2pre: "one system.",
    h2post: "everything you need, nothing you don't want.",
    intro: "No Shopify for the shop, no Mailchimp for the newsletter, no WPML for translation, no Analytics jungle for stats. All in one place, all coherent, all maintained by me.",
    features: [
      { titel: "ai that reads along", stichwort: "01 · intelligence", beschreibung: "Upload a photo, the ai describes what's on it, in all languages. Google says thanks, screen readers too. For text: spelling, grammar and style hints right in the editor." },
      { titel: "one click translates everything", stichwort: "02 · multilingual", beschreibung: "German, French, English · whatever you need. AI does the rough cut, you refine. Each language gets its own URL, own SEO, own translation status." },
      { titel: "images that optimise themselves", stichwort: "03 · performance", beschreibung: "Upload the photo, done. ContentCore converts to WebP (30% smaller), cuts five sizes from phone to desktop, and for image monsters like photographers, everything lands in cloud storage." },
      { titel: "newsletter right in the system", stichwort: "04 · contact", beschreibung: "No more Mailchimp subscription. Drag-and-drop editor, subscriber management, open rates, scheduled or instant send, all in ContentCore." },
      { titel: "shop without shopify", stichwort: "05 · sales", beschreibung: "Products, variants, stock, Stripe checkout with Apple Pay and SEPA. 1.5% + 25 cents per transaction, no Shopify base fee." },
      { titel: "version history as safety net", stichwort: "06 · calm", beschreibung: "Auto-save every 30 seconds. Every change stays in history, you can roll back any time. If two people are on the same article at once, the system warns before duplicates happen." },
      { titel: "editorial calendar", stichwort: "07 · planning", beschreibung: "Month and week view, drag-and-drop articles, colour-coded by content type. For anyone who does more than three posts a year." },
      { titel: "year in review, automatic", stichwort: "08 · gimmick", beschreibung: "Every year on December 1st, every client gets an animated story, like on Instagram, but for your site. Most-read article, best month, total visitors. Shareable, fully automatic." },
      { titel: "your branding, not mine", stichwort: "09 · white-label", beschreibung: "In ContentCore you see your logo, your company colours, your name. The word \"ContentCore\" doesn't appear anywhere. It feels like your own system, because it is." },
      { titel: "stats without spying", stichwort: "10 · honest", beschreibung: "No cookies, no Google Analytics, no banner. You still see: visitor count, top pages, device split, origin. Clean, GDPR-compliant, no ballast." },
    ],
  },
};

export function ContentCoreDeepDive({
  num = "08",
}: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[720px]">
          <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite">
            {t.h2pre}{" "}
            <span className="text-offwhite/35">
              {t.h2post}
            </span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {t.features.map((f) => (
            <div
              key={f.titel}
              className="glass rounded-xl p-6 flex flex-col gap-3 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink/80">
                {f.stichwort}
              </span>
              <h3 className="heading-sans text-[17px] text-offwhite leading-snug">
                {f.titel}
              </h3>
              <p className="text-[13px] leading-relaxed text-offwhite/55">
                {f.beschreibung}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
