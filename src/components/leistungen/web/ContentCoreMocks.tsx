"use client";

// SVG-Mocks für ContentCore. Alles im Laconis-Dark-Look.

import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

type DashboardCopy = {
  url: string;
  brand: string;
  uebersicht: string;
  woche: string;
  navStartseite: string;
  navSeiten: string;
  navMedien: string;
  navMenues: string;
  navStats: string;
  navNewsletter: string;
  navNutzer: string;
  navEinst: string;
  kpiVisitors: string;
  kpiAnfragen: string;
  kpiPagespeed: string;
  letzte: string;
  ev1: string;
  ev2: string;
  ev3: string;
  ev4: string;
  tagDu: string;
  tagForm: string;
};

type EditorCopy = {
  url: string;
  speichern: string;
  heroTitle: string;
  textBlock: string;
  ueberschrift: string;
  sayLess: string;
  meanMore: string;
  untertitel: string;
  body1: string;
  body2: string;
  body3: string;
};

type StatsCopy = {
  url: string;
  besucher30: string;
  vsVormonat: string;
  topSeiten: string;
  days: string[];
};

const DASH: Record<Locale, DashboardCopy> = {
  de: {
    url: "cms.laconis.be / dashboard",
    brand: "laconis · cms",
    uebersicht: "Übersicht",
    woche: "diese woche · 14 änderungen · 4 neue anfragen",
    navStartseite: "Startseite",
    navSeiten: "Seiten",
    navMedien: "Medien",
    navMenues: "Menüs",
    navStats: "Stats",
    navNewsletter: "Newsletter",
    navNutzer: "Nutzer",
    navEinst: "Einstellungen",
    kpiVisitors: "BESUCHER · 7 TAGE",
    kpiAnfragen: "ANFRAGEN",
    kpiPagespeed: "PAGESPEED",
    letzte: "LETZTE ÄNDERUNGEN",
    ev1: "Startseite · Hero-Text angepasst",
    ev2: "Referenz · Fabry Baumpflege bearbeitet",
    ev3: "Medien · 4 Bilder hochgeladen",
    ev4: "Kontakt · neue Anfrage von M. Keller",
    tagDu: "du",
    tagForm: "form",
  },
  fr: {
    url: "cms.laconis.be / dashboard",
    brand: "laconis · cms",
    uebersicht: "Vue d'ensemble",
    woche: "cette semaine · 14 modifs · 4 nouvelles demandes",
    navStartseite: "Accueil",
    navSeiten: "Pages",
    navMedien: "Médias",
    navMenues: "Menus",
    navStats: "Stats",
    navNewsletter: "Newsletter",
    navNutzer: "Utilisateurs",
    navEinst: "Paramètres",
    kpiVisitors: "VISITEURS · 7 JOURS",
    kpiAnfragen: "DEMANDES",
    kpiPagespeed: "PAGESPEED",
    letzte: "DERNIÈRES MODIFS",
    ev1: "Accueil · hero modifié",
    ev2: "Référence · Fabry Baumpflege éditée",
    ev3: "Médias · 4 images uploadées",
    ev4: "Contact · nouvelle demande de M. Keller",
    tagDu: "toi",
    tagForm: "form",
  },
  en: {
    url: "cms.laconis.be / dashboard",
    brand: "laconis · cms",
    uebersicht: "Overview",
    woche: "this week · 14 edits · 4 new requests",
    navStartseite: "Homepage",
    navSeiten: "Pages",
    navMedien: "Media",
    navMenues: "Menus",
    navStats: "Stats",
    navNewsletter: "Newsletter",
    navNutzer: "Users",
    navEinst: "Settings",
    kpiVisitors: "VISITORS · 7 DAYS",
    kpiAnfragen: "REQUESTS",
    kpiPagespeed: "PAGESPEED",
    letzte: "RECENT EDITS",
    ev1: "Homepage · hero text updated",
    ev2: "Reference · Fabry Baumpflege edited",
    ev3: "Media · 4 images uploaded",
    ev4: "Contact · new request from M. Keller",
    tagDu: "you",
    tagForm: "form",
  },
};

const ED: Record<Locale, EditorCopy> = {
  de: {
    url: "cms / seiten / startseite / edit",
    speichern: "speichern",
    heroTitle: "Hero · Startseite",
    textBlock: "text-block",
    ueberschrift: "ÜBERSCHRIFT",
    sayLess: "say less",
    meanMore: "mean more",
    untertitel: "UNTERTITEL",
    body1: "Webdesign und Branding, die bleiben.",
    body2: "Für Unternehmen die nicht wie alle",
    body3: "aussehen wollen.",
  },
  fr: {
    url: "cms / pages / accueil / edit",
    speichern: "enregistrer",
    heroTitle: "Hero · Accueil",
    textBlock: "bloc texte",
    ueberschrift: "TITRE",
    sayLess: "dis moins",
    meanMore: "veut dire plus",
    untertitel: "SOUS-TITRE",
    body1: "Webdesign et branding qui durent.",
    body2: "Pour les boîtes qui veulent pas",
    body3: "ressembler à toutes les autres.",
  },
  en: {
    url: "cms / pages / home / edit",
    speichern: "save",
    heroTitle: "Hero · Homepage",
    textBlock: "text block",
    ueberschrift: "HEADLINE",
    sayLess: "say less",
    meanMore: "mean more",
    untertitel: "SUBHEAD",
    body1: "Webdesign and branding that stay.",
    body2: "For companies that don't want",
    body3: "to look like everyone else.",
  },
};

const ST: Record<Locale, StatsCopy> = {
  de: { url: "cms / stats", besucher30: "Besucher · 30 Tage", vsVormonat: "VS. VORMONAT · +18%", topSeiten: "TOP SEITEN", days: ["mo", "di", "mi", "do", "fr", "sa", "so"] },
  fr: { url: "cms / stats", besucher30: "Visiteurs · 30 jours", vsVormonat: "VS. MOIS PRÉC. · +18%", topSeiten: "TOP PAGES", days: ["lu", "ma", "me", "je", "ve", "sa", "di"] },
  en: { url: "cms / stats", besucher30: "Visitors · 30 days", vsVormonat: "VS. PREV. MONTH · +18%", topSeiten: "TOP PAGES", days: ["mo", "tu", "we", "th", "fr", "sa", "su"] },
};

export function DashboardMock({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = pick(DASH, locale);
  return (
    <svg
      viewBox="0 0 720 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Dashboard"
    >
      <defs>
        <linearGradient id="screen-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f0f0f" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="laptop-frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0d0d0d" />
        </linearGradient>
      </defs>

      <rect x="18" y="12" width="684" height="400" rx="14" fill="url(#laptop-frame)" stroke="rgba(255,255,255,0.08)" />
      <rect x="30" y="24" width="660" height="376" rx="6" fill="url(#screen-bg)" />
      <rect x="0" y="412" width="720" height="16" rx="4" fill="#141414" stroke="rgba(255,255,255,0.05)" />
      <rect x="300" y="412" width="120" height="6" rx="3" fill="#222" />

      <g>
        <rect x="30" y="24" width="660" height="36" fill="#0d0d0d" />
        <circle cx="48" cy="42" r="4" fill="#2a2a2a" />
        <circle cx="62" cy="42" r="4" fill="#2a2a2a" />
        <circle cx="76" cy="42" r="4" fill="#2a2a2a" />
        <text x="100" y="46" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(242,242,242,0.5)">
          {t.url}
        </text>
        <rect x="640" y="34" width="32" height="16" rx="3" fill="rgb(var(--accent) / 0.12)" stroke="rgb(var(--accent) / 0.35)" />
        <text x="656" y="45" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgb(var(--accent))" textAnchor="middle">
          live
        </text>
      </g>

      <g>
        <rect x="30" y="60" width="160" height="340" fill="#0a0a0a" />
        <text x="50" y="86" fontFamily="ui-monospace, monospace" fontSize="10" fill="rgba(242,242,242,0.85)" fontWeight="600">
          {t.brand}
        </text>

        {[
          { y: 118, label: t.navStartseite, active: true },
          { y: 146, label: t.navSeiten },
          { y: 174, label: t.navMedien },
          { y: 202, label: t.navMenues },
          { y: 230, label: t.navStats },
          { y: 258, label: t.navNewsletter },
          { y: 286, label: t.navNutzer },
          { y: 314, label: t.navEinst },
        ].map((n) => (
          <g key={n.label}>
            {n.active && (
              <rect x="42" y={n.y - 12} width="136" height="22" rx="4" fill="rgb(var(--accent) / 0.08)" />
            )}
            {n.active && (
              <rect x="42" y={n.y - 12} width="2" height="22" fill="rgb(var(--accent))" />
            )}
            <text
              x="58"
              y={n.y + 3}
              fontFamily="system-ui, sans-serif"
              fontSize="11"
              fill={n.active ? "#F2F2F2" : "rgba(242,242,242,0.5)"}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      <g>
        <text x="210" y="100" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
          {t.uebersicht}
        </text>
        <text x="210" y="120" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          {t.woche}
        </text>

        {[
          { x: 210, label: t.kpiVisitors, wert: "2.184" },
          { x: 370, label: t.kpiAnfragen, wert: "12" },
          { x: 530, label: t.kpiPagespeed, wert: "96", accent: true },
        ].map((k) => (
          <g key={k.label}>
            <rect x={k.x} y="140" width="140" height="72" rx="6" fill="#101010" stroke="rgba(255,255,255,0.06)" />
            <text x={k.x + 14} y="162" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
              {k.label}
            </text>
            <text
              x={k.x + 14}
              y="196"
              fontFamily="system-ui, sans-serif"
              fontSize="24"
              fontWeight="700"
              fill={k.accent ? "rgb(var(--accent))" : "#F2F2F2"}
            >
              {k.wert}
            </text>
          </g>
        ))}

        <text x="210" y="250" fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.4)">
          {t.letzte}
        </text>
        {[
          { y: 276, titel: t.ev1, tag: t.tagDu },
          { y: 306, titel: t.ev2, tag: t.tagDu },
          { y: 336, titel: t.ev3, tag: t.tagDu },
          { y: 366, titel: t.ev4, tag: t.tagForm },
        ].map((e) => (
          <g key={e.titel}>
            <rect x="210" y={e.y - 14} width="460" height="24" rx="4" fill="#0d0d0d" stroke="rgba(255,255,255,0.05)" />
            <circle cx="224" cy={e.y - 2} r="3" fill="rgb(var(--accent))" />
            <text x="236" y={e.y + 1} fontFamily="system-ui, sans-serif" fontSize="11" fill="rgba(242,242,242,0.75)">
              {e.titel}
            </text>
            <text x="640" y={e.y + 1} fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.35)" textAnchor="end">
              {e.tag}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function EditorMock({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = pick(ED, locale);
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Editor"
    >
      <rect x="4" y="4" width="412" height="272" rx="8" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" />
      <rect x="4" y="4" width="412" height="28" fill="#080808" />
      <circle cx="18" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="28" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="38" cy="18" r="3" fill="#2a2a2a" />
      <rect x="54" y="10" width="200" height="14" rx="3" fill="#141414" />
      <text x="62" y="20" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.url}
      </text>
      <rect x="370" y="10" width="36" height="14" rx="3" fill="rgb(var(--accent) / 0.12)" stroke="rgb(var(--accent) / 0.3)" />
      <text x="388" y="20" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgb(var(--accent))" textAnchor="middle">
        {t.speichern}
      </text>

      <text x="28" y="66" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
        {t.heroTitle}
      </text>
      <rect x="28" y="78" width="70" height="14" rx="3" fill="rgb(var(--accent) / 0.1)" stroke="rgb(var(--accent) / 0.25)" />
      <text x="63" y="88" fontFamily="ui-monospace, monospace" fontSize="7" fill="rgb(var(--accent))" textAnchor="middle">
        {t.textBlock}
      </text>

      <text x="28" y="114" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.ueberschrift}
      </text>
      <rect x="28" y="120" width="364" height="30" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.08)" />
      <text x="40" y="140" fontFamily="system-ui, sans-serif" fontSize="12" fill="#F2F2F2">
        {t.sayLess}
      </text>
      <text x="85" y="140" fontFamily="serif" fontSize="12" fontStyle="italic" fill="rgb(var(--accent) / 0.9)">
        {t.meanMore}
      </text>
      <line x1="148" y1="126" x2="148" y2="144" stroke="rgb(var(--accent))" strokeWidth="1" />

      <text x="28" y="168" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.untertitel}
      </text>
      <rect x="28" y="174" width="364" height="56" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.08)" />
      <text x="40" y="192" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        {t.body1}
      </text>
      <text x="40" y="208" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        {t.body2}
      </text>
      <text x="40" y="222" fontFamily="system-ui, sans-serif" fontSize="10" fill="rgba(242,242,242,0.8)">
        {t.body3}
      </text>

      <rect x="28" y="246" width="200" height="20" rx="4" fill="#0a0a0a" stroke="rgba(255,255,255,0.06)" />
      {["B", "I", "U", "·", "H1", "H2", "⌖", "🔗"].map((s, i) => (
        <text
          key={i}
          x={40 + i * 22}
          y="260"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="rgba(242,242,242,0.5)"
        >
          {s}
        </text>
      ))}
    </svg>
  );
}

export function StatsMock({ className = "" }: { className?: string }) {
  const locale = useLocale();
  const t = pick(ST, locale);
  return (
    <svg
      viewBox="0 0 420 280"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ContentCore Stats"
    >
      <rect x="4" y="4" width="412" height="272" rx="8" fill="#0d0d0d" stroke="rgba(255,255,255,0.08)" />
      <rect x="4" y="4" width="412" height="28" fill="#080808" />
      <circle cx="18" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="28" cy="18" r="3" fill="#2a2a2a" />
      <circle cx="38" cy="18" r="3" fill="#2a2a2a" />
      <rect x="54" y="10" width="180" height="14" rx="3" fill="#141414" />
      <text x="62" y="20" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.url}
      </text>

      <text x="28" y="58" fontFamily="system-ui, sans-serif" fontSize="14" fontWeight="700" fill="#F2F2F2" letterSpacing="-0.02em">
        {t.besucher30}
      </text>
      <text x="28" y="74" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.vsVormonat}
      </text>

      <rect x="28" y="86" width="364" height="110" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.05)" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1="40"
          y1={104 + i * 25}
          x2="380"
          y2={104 + i * 25}
          stroke="rgba(255,255,255,0.04)"
        />
      ))}
      <path
        d="M 40 170 L 75 158 L 110 164 L 145 148 L 180 152 L 215 130 L 250 136 L 285 114 L 320 122 L 355 102 L 380 96"
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 40 170 L 75 158 L 110 164 L 145 148 L 180 152 L 215 130 L 250 136 L 285 114 L 320 122 L 355 102 L 380 96 L 380 186 L 40 186 Z"
        fill="rgb(var(--accent) / 0.08)"
      />
      {t.days.map((d, i) => (
        <text
          key={d}
          x={55 + i * 53}
          y="200"
          fontFamily="ui-monospace, monospace"
          fontSize="7"
          fill="rgba(242,242,242,0.3)"
          textAnchor="middle"
        >
          {d}
        </text>
      ))}

      <text x="28" y="224" fontFamily="ui-monospace, monospace" fontSize="8" fill="rgba(242,242,242,0.4)">
        {t.topSeiten}
      </text>
      {[
        { y: 242, name: "/", proz: 64 },
        { y: 256, name: "/leistungen/web", proz: 38 },
      ].map((row) => (
        <g key={row.name}>
          <text x="28" y={row.y + 3} fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.75)">
            {row.name}
          </text>
          <rect x="160" y={row.y - 6} width="180" height="8" rx="2" fill="#0a0a0a" />
          <rect x="160" y={row.y - 6} width={(row.proz / 100) * 180} height="8" rx="2" fill="rgb(var(--accent) / 0.7)" />
          <text x="348" y={row.y + 3} fontFamily="ui-monospace, monospace" fontSize="9" fill="rgba(242,242,242,0.5)">
            {row.proz}%
          </text>
        </g>
      ))}
    </svg>
  );
}
