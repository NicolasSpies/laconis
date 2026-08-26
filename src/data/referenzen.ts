import { AUFNAHMEN } from "./shots.generated";

export type Referenz = {
  slug: string;
  name: string;
  kategorieLabel: string;
  ort: string;
  jahr: number;
  kurz: string;
  tags: string[];
  // placeholder visuals until real shots exist
  farbe: string; // hex brand colour for thumbnail background
  monogram?: string; // override for centre initials (default = first letter of name)
  notiz?: string; // short handwritten caption for the moodboard view
  urlExtern?: string;
  inArbeit?: boolean;
  /**
   * echtes, veröffentlichtes kundenprojekt?
   * - `false` oder `undefined` → konzept-studie · bekommt "konzept"-badge
   * - `true` → echter kunde · kein badge
   * default ist **nicht** real, damit neue einträge nicht versehentlich
   * als live-projekt erscheinen, wenn das flag vergessen wird.
   */
  istEcht?: boolean;
  /**
   * optionales kundenzitat · wird auf der referenzen-card inline unter dem
   * titel gerendert. kurz halten (≤ 180 zeichen) · formatter zählt drauf.
   */
  testimonial?: {
    quote: string;
    /** optionaler autorisierter zeilenumbruch für das grosse zitat ·
        ohne ihn steht der satz in einer zeile */
    lines?: string[];
    author: string;
    rolle?: string;
  };
  /**
   * ganzseitige aufnahmen der gebauten seite · desktop 1440 breit,
   * mobil 390 breit, jeweils volle seitenhöhe. sie laufen auf der
   * detailseite in laptop und handy durch.
   *
   * bewusst aufnahmen statt iframe: fremde seiten schicken meistens
   * x-frame-options, und die kontrolle darüber hat man nur bei den
   * eigenen. aufnahmen funktionieren bei jedem projekt.
   */
  shots?: { desktop: string; mobile: string };
};

/* die rohliste · `referenzen` unten ist das, was die seite benutzt.
   dazwischen sitzt der auflöser, der die aufnahmen einhängt. */
const ROH: Referenz[] = [
  // --- real projects ---
  {
    slug: "fabry-baumpflege",
    name: "Fabry Baumpflege",
    kategorieLabel: "web",
    ort: "Ostbelgien",
    jahr: 2025,
    kurz: "Website · Design & Development · eigenes CMS",
    tags: ["design", "development", "eigenes cms", "seo"],
    urlExtern: "https://fabry-baumpflege.be",
    farbe: "#2f5d3a",
    notiz: "erstes CMS-projekt · ging richtig schnell",
    istEcht: true,
    testimonial: {
      quote:
        "ich hab einfach angerufen, geschrieben wenn was war. keine tickets, keine agentur-höflichkeit.",
      lines: [
        "ich hab einfach",
        "angerufen,",
        "geschrieben",
        "wenn was war.",
        "keine tickets,",
        "keine agentur-",
        "höflichkeit.",
      ],
      author: "Reimund Fabry",
      rolle: "Fabry Baumpflege",
    },
  },
  {
    slug: "holoroom",
    name: "Holoroom",
    kategorieLabel: "branding",
    ort: "Ostbelgien",
    jahr: 2025,
    kurz: "Branding · Logo · Mini Brand Guide · Website kommt",
    tags: ["logo", "brand guide", "visitenkarte"],
    farbe: "#7a4bd1",
    notiz: "violett war am ersten tag klar",
  },
  {
    slug: "lespoir-asbl",
    name: "Léspoir ASBL",
    kategorieLabel: "web + branding",
    ort: "Huy, Belgien",
    jahr: 2026,
    kurz: "Branding + Website · in Arbeit",
    tags: ["branding", "website", "asbl"],
    inArbeit: true,
    farbe: "#d94f4f",
    notiz: "erstes asbl-projekt · ganz viel herz",
  },
  // NICHTS DRUNTER · weitere referenzen kommen später via CMS.
];

/**
 * aufnahmen einhängen · das ist der ganze punkt.
 *
 * ablauf für eine neue referenz: slug + urlExtern eintragen,
 * `npm run shots` laufen lassen, fertig. das skript nimmt die
 * aufnahmen, legt sie unter public/cases/<slug>-desktop.jpg ab und
 * schreibt die liste der vorhandenen slugs nach shots.generated.ts.
 * hier werden sie eingehängt.
 *
 * vorher musste man die pfade von hand in jeden eintrag schreiben ·
 * genau die art arbeit, die keiner macht, und dann steht eine
 * referenz ohne bild auf der seite.
 *
 * ein manuell gesetztes `shots` gewinnt · falls doch mal eine
 * aufnahme von hand kommt.
 */
export const referenzen: Referenz[] = ROH.map((r) => ({
  ...r,
  shots:
    r.shots ??
    (AUFNAHMEN.includes(r.slug)
      ? {
          desktop: `/cases/${r.slug}-desktop.jpg`,
          mobile: `/cases/${r.slug}-mobile.jpg`,
        }
      : undefined),
}));
