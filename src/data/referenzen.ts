export type Referenz = {
  slug: string;
  name: string;
  kategorie: "web" | "branding" | "grafik" | "web-branding";
  kategorieLabel: string;
  ort: string;
  jahr: number;
  kurz: string;
  tags: string[];
  // placeholder visuals until real shots exist
  farbe: string; // hex brand colour for thumbnail background
  monogram?: string; // override for centre initials (default = first letter of name)
  notiz?: string; // short handwritten caption for the moodboard view
  pagespeedMobile?: number;
  pagespeedDesktop?: number;
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
   * optional · zeigt einen vorher/nachher-slider für eigene iterationen.
   * framing: „iteration 1 → iteration 2" bzw. „launch v1 → 2 jahre später".
   * NICHT für vergleiche mit fremd-designern — nur eigene arbeiten.
   */
  evolutionFrames?: {
    before: string; // image path
    after: string; // image path
    labelBefore: string; // z.b. „iteration 1"
    labelAfter: string; // z.b. „iteration 2"
    caption?: string; // hand-text unter slider, z.b. „zwischen diesen: 18 monate."
  };
  /**
   * optionales kundenzitat · wird auf der referenzen-card inline unter dem
   * titel gerendert. kurz halten (≤ 180 zeichen) · formatter zählt drauf.
   */
  testimonial?: {
    quote: string;
    author: string;
    rolle?: string;
  };
  /**
   * optionales hero-bild · wird im home-featured-stack (vollbreite karte)
   * verwendet. 16:10 oder 16:9 querformat, ≥ 1600px breite idealerweise.
   */
  heroImage?: string;
};

export const referenzen: Referenz[] = [
  // --- real projects ---
  {
    slug: "fabry-baumpflege",
    name: "Fabry Baumpflege",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Ostbelgien",
    jahr: 2025,
    kurz: "Website · Design & Development · eigenes CMS",
    tags: ["design", "development", "eigenes cms", "seo"],
    pagespeedMobile: 95,
    pagespeedDesktop: 97,
    urlExtern: "https://fabry-baumpflege.be",
    farbe: "#2f5d3a",
    notiz: "erstes CMS-projekt · ging richtig schnell",
    istEcht: true,
    heroImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1800&q=80&auto=format&fit=crop",
    testimonial: {
      quote:
        "ich hab einfach angerufen, geschrieben wenn was war. keine tickets, keine agentur-höflichkeit.",
      author: "Reimund Fabry",
      rolle: "Fabry Baumpflege",
    },
  },
  {
    slug: "holoroom",
    name: "Holoroom",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Ostbelgien",
    jahr: 2025,
    kurz: "Branding · Logo · Mini Brand Guide · Website kommt",
    tags: ["logo", "brand guide", "visitenkarte"],
    farbe: "#7a4bd1",
    notiz: "violett war am ersten tag klar",
    heroImage:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1800&q=80&auto=format&fit=crop",
  },
  {
    slug: "lespoir-asbl",
    name: "Léspoir ASBL",
    kategorie: "web-branding",
    kategorieLabel: "web + branding",
    ort: "Huy, Belgien",
    jahr: 2026,
    kurz: "Branding + Website · in Arbeit",
    tags: ["branding", "website", "asbl"],
    inArbeit: true,
    farbe: "#d94f4f",
    notiz: "erstes asbl-projekt · ganz viel herz",
    heroImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1800&q=80&auto=format&fit=crop",
  },
  // NICHTS DRUNTER · weitere referenzen kommen später via CMS.
];
