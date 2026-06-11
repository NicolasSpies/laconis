"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type Row = { thema: string; wordpress: string; contentcore: string };

type Dict = {
  sectionLabel: string;
  h2pre: string;
  h2post: string;
  intro: string;
  themaLabel: string;
  rows: Row[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "contentcore vs. wordpress",
    h2pre: "der direkte vergleich.",
    h2post: "ohne schönmalen.",
    intro: "WordPress läuft auf 43 Prozent aller Websites. Das macht es nicht besser, es macht es zum Lieblingsziel für Angriffe. Hier steht, warum ich stattdessen ContentCore gebaut habe und was dir das im Alltag bringt.",
    themaLabel: "thema",
    rows: [
      { thema: "sicherheit", wordpress: "Meistgehacktes CMS der Welt", contentcore: "4-Schichten-Schutz, 2FA, EU-Server" },
      { thema: "angriffsfläche", wordpress: "20+ Plugins, hunderte Endpunkte", contentcore: "Eine gehärtete API" },
      { thema: "updates", wordpress: "Manuell, wöchentlich, riskant", contentcore: "Automatisch, ohne dein Zutun" },
      { thema: "performance", wordpress: "PHP-Runtime + Plugin-Bloat", contentcore: "Statisch ausgeliefert, 95+ PageSpeed" },
      { thema: "mehrsprachigkeit", wordpress: "Plugin (WPML) kostet extra", contentcore: "Eingebaut: DE · FR · EN" },
      { thema: "besucher-stats", wordpress: "Google Analytics + Cookie-Banner", contentcore: "Eingebaut, 100% DSGVO, ohne Cookies" },
      { thema: "online-shop", wordpress: "WooCommerce oder Shopify extra", contentcore: "Direkt integriert, Stripe-Checkout" },
      { thema: "KI-unterstützung", wordpress: "Nachrüst-Plugin, oft kostenpflichtig", contentcore: "Bild-Alt-Texte, Übersetzung, Korrektur" },
      { thema: "datenhoheit", wordpress: "Geteilter Server, unklare Lage", contentcore: "Eigene Instanz in Litauen (EU)" },
      { thema: "support", wordpress: "Forum, Stack Overflow, Google", contentcore: "Ich. Persönlich. Per Mail oder Call." },
    ],
  },
  fr: {
    sectionLabel: "contentcore vs. wordpress",
    h2pre: "le comparatif direct.",
    h2post: "sans enjoliver.",
    intro: "WordPress tourne sur 43 pour cent des sites. Ça ne le rend pas meilleur, ça en fait la cible favorite des attaques. Voici pourquoi j'ai construit ContentCore à la place et ce que ça t'apporte au quotidien.",
    themaLabel: "thème",
    rows: [
      { thema: "sécurité", wordpress: "CMS le plus piraté au monde", contentcore: "Protection 4 couches, 2FA, serveurs UE" },
      { thema: "surface d'attaque", wordpress: "20+ plugins, des centaines d'endpoints", contentcore: "Une API durcie" },
      { thema: "updates", wordpress: "Manuels, hebdo, risqués", contentcore: "Auto, sans rien de ta part" },
      { thema: "performance", wordpress: "Runtime PHP + bloat plugins", contentcore: "Livré statique, PageSpeed 95+" },
      { thema: "multilingue", wordpress: "Plugin (WPML) coûte extra", contentcore: "Intégré : DE · FR · EN" },
      { thema: "stats visiteurs", wordpress: "Google Analytics + bandeau cookies", contentcore: "Intégré, 100% RGPD, sans cookies" },
      { thema: "shop", wordpress: "WooCommerce ou Shopify en plus", contentcore: "Intégré direct, checkout Stripe" },
      { thema: "aide ia", wordpress: "Plugin à rajouter, souvent payant", contentcore: "Alt-texts images, traduction, correction" },
      { thema: "souveraineté", wordpress: "Serveur partagé, situation floue", contentcore: "Instance propre en Lituanie (UE)" },
      { thema: "support", wordpress: "Forum, Stack Overflow, Google", contentcore: "Moi. Perso. Par mail ou call." },
    ],
  },
  en: {
    sectionLabel: "contentcore vs. wordpress",
    h2pre: "the direct comparison.",
    h2post: "no sugar-coating.",
    intro: "WordPress runs 43 percent of all websites. That doesn't make it better, it makes it the favourite target for attacks. Here's why i built ContentCore instead and what that gives you day to day.",
    themaLabel: "topic",
    rows: [
      { thema: "security", wordpress: "Most-hacked CMS in the world", contentcore: "4-layer protection, 2FA, EU servers" },
      { thema: "attack surface", wordpress: "20+ plugins, hundreds of endpoints", contentcore: "One hardened API" },
      { thema: "updates", wordpress: "Manual, weekly, risky", contentcore: "Automatic, without you lifting a finger" },
      { thema: "performance", wordpress: "PHP runtime + plugin bloat", contentcore: "Statically served, 95+ PageSpeed" },
      { thema: "multilingual", wordpress: "Plugin (WPML) costs extra", contentcore: "Built in: DE · FR · EN" },
      { thema: "visitor stats", wordpress: "Google Analytics + cookie banner", contentcore: "Built in, 100% GDPR, no cookies" },
      { thema: "online shop", wordpress: "WooCommerce or Shopify extra", contentcore: "Built in, Stripe checkout" },
      { thema: "ai support", wordpress: "Add-on plugin, often paid", contentcore: "Image alt-text, translation, correction" },
      { thema: "data sovereignty", wordpress: "Shared server, unclear setup", contentcore: "Own instance in Lithuania (EU)" },
      { thema: "support", wordpress: "Forum, Stack Overflow, Google", contentcore: "Me. In person. By mail or call." },
    ],
  },
};

export function ContentCoreVsWordpress({
  num = "07",
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
            <span className="text-offwhite/35">{t.h2post}</span>
          </h2>
          <p className="mt-6 max-w-[580px] text-[15px] leading-relaxed text-offwhite/55">
            {t.intro}
          </p>
        </div>

        <div className="mt-14 glass rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-ink/20 bg-ink/[0.02]">
            <div className="px-5 py-4">
              <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
                {t.themaLabel}
              </span>
            </div>
            <div className="px-5 py-4 border-l border-ink/20">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/55">
                  wordpress
                </span>
              </div>
            </div>
            <div className="px-5 py-4 border-l border-ink/20">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                <span className="font-mono text-[11px] uppercase tracking-label text-accent-ink">
                  contentcore
                </span>
              </div>
            </div>
          </div>

          {t.rows.map((r, i) => (
            <div
              key={r.thema}
              className={
                "grid grid-cols-[1fr_1fr_1fr] items-start hover:bg-ink/[0.035] transition-colors" +
                (i < t.rows.length - 1 ? " border-b border-ink/5" : "")
              }
            >
              <div className="px-5 py-5">
                <span className="heading-sans text-[14px] md:text-[15px] text-offwhite">
                  {r.thema}
                </span>
              </div>
              <div className="px-5 py-5 border-l border-ink/20">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-red-400/70 mt-0.5 shrink-0">
                    ⚠
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/55">
                    {r.wordpress}
                  </span>
                </div>
              </div>
              <div className="px-5 py-5 border-l border-ink/20">
                <div className="flex items-start gap-2">
                  <span className="font-mono text-[11px] text-accent-ink mt-0.5 shrink-0">
                    ✓
                  </span>
                  <span className="text-[13px] leading-relaxed text-offwhite/75">
                    {r.contentcore}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}