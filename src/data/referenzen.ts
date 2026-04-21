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
};

export const referenzen: Referenz[] = [
  // --- real projects ---
  {
    slug: "fabry-baumpflege",
    name: "Fabry Baumpflege",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Eupen, Belgien",
    jahr: 2025,
    kurz: "Website • Design & Development • eigenes CMS",
    tags: ["design", "development", "eigenes cms", "seo"],
    pagespeedMobile: 95,
    pagespeedDesktop: 97,
    urlExtern: "https://fabry-baumpflege.be",
    farbe: "#2f5d3a",
    notiz: "erstes CMS-projekt • ging richtig schnell",
    istEcht: true,
  },
  {
    slug: "holoroom",
    name: "Holoroom",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Eupen, Belgien",
    jahr: 2025,
    kurz: "Branding • Logo • Mini Brand Guide • Website kommt",
    tags: ["logo", "brand guide", "visitenkarte"],
    farbe: "#7a4bd1",
    notiz: "violett war am ersten tag klar",
  },
  {
    slug: "lespoir-asbl",
    name: "Léspoir ASBL",
    kategorie: "web-branding",
    kategorieLabel: "web + branding",
    ort: "Huy, Belgien",
    jahr: 2026,
    kurz: "Branding + Website • in Arbeit",
    tags: ["branding", "website", "asbl"],
    inArbeit: true,
    farbe: "#d94f4f",
    notiz: "erstes asbl-projekt • ganz viel herz",
  },
  {
    slug: "fotografin",
    name: "Portfolio Fotografin",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Ostbelgien",
    jahr: 2026,
    kurz: "Portfolio Website • Design & Development • in Arbeit",
    tags: ["portfolio", "design", "development"],
    inArbeit: true,
    farbe: "#1a1a1a",
    monogram: "PF",
    notiz: "schwarz war pflicht",
  },

  // --- simulated / demo entries ---
  {
    slug: "kleintierpraxis-moro",
    name: "Kleintierpraxis Moro",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Kelmis, Belgien",
    jahr: 2025,
    kurz: "Praxis-Website • Terminbuchung • elternfreundlich",
    tags: ["website", "booking"],
    farbe: "#e58d3f",
    monogram: "KM",
    notiz: "lieblingsdetail: die terminsuche",
  },
  {
    slug: "atelier-linde",
    name: "Atelier Linde",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Aachen, Deutschland",
    jahr: 2024,
    kurz: "Keramik-Studio • Logo • Farbwelt • Packaging",
    tags: ["logo", "packaging"],
    farbe: "#c9a87a",
    monogram: "AL",
    notiz: "der beige-ton hat stunden gekostet",
  },
  {
    slug: "werk-raum",
    name: "Werk.raum",
    kategorie: "web-branding",
    kategorieLabel: "web + branding",
    ort: "Liège, Belgien",
    jahr: 2025,
    kurz: "Co-Working Brand • Website • Signage",
    tags: ["brand", "website", "signage"],
    farbe: "#3d3d3d",
    monogram: "WR",
    notiz: "beton, licht, stille",
  },
  {
    slug: "ferme-delporte",
    name: "Ferme Delporte",
    kategorie: "grafik",
    kategorieLabel: "grafik",
    ort: "Malmedy, Belgien",
    jahr: 2024,
    kurz: "Etiketten • Flyer • Hof-Beschilderung",
    tags: ["print", "etiketten"],
    farbe: "#6b8e4e",
    monogram: "FD",
  },
  {
    slug: "studio-nord",
    name: "Studio Nord",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Verviers, Belgien",
    jahr: 2025,
    kurz: "Architektur-Portfolio • ruhiges Editorial",
    tags: ["portfolio", "architektur"],
    farbe: "#223447",
    monogram: "SN",
  },
  {
    slug: "kaffee-kontor",
    name: "Kaffee Kontor",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Eupen, Belgien",
    jahr: 2024,
    kurz: "Rösterei • Wordmark • Verpackung • Schilder",
    tags: ["logo", "packaging"],
    farbe: "#4a2c1b",
    monogram: "KK",
    notiz: "★ mein favorit",
  },
  {
    slug: "physio-brand",
    name: "Physio Brand",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "St. Vith, Belgien",
    jahr: 2024,
    kurz: "Physiopraxis • Website • Booking-Flow",
    tags: ["website", "booking"],
    farbe: "#2f7a8a",
    monogram: "PB",
  },
  {
    slug: "holz-hanss",
    name: "Holz Hanss",
    kategorie: "web-branding",
    kategorieLabel: "web + branding",
    ort: "Bütgenbach, Belgien",
    jahr: 2023,
    kurz: "Tischlerei • Logo • Website • Fotostrecke",
    tags: ["brand", "website"],
    farbe: "#8a5a2b",
    monogram: "HH",
    notiz: "die werkstatt riecht nach eiche",
  },
  {
    slug: "vino-mara",
    name: "Vino Mara",
    kategorie: "grafik",
    kategorieLabel: "grafik",
    ort: "Trier, Deutschland",
    jahr: 2024,
    kurz: "Weinetiketten • Menu-Karten",
    tags: ["print", "etiketten"],
    farbe: "#6e1d2b",
    monogram: "VM",
    notiz: "die etiketten sind gedruckt und sehen besser aus als am screen",
  },
  {
    slug: "maison-gaelle",
    name: "Maison Gaëlle",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Namur, Belgien",
    jahr: 2025,
    kurz: "Boutique-Hotel • Wordmark • Claim • Printwelt",
    tags: ["brand", "print"],
    farbe: "#b5928a",
    monogram: "MG",
  },
  {
    slug: "teststrecke",
    name: "Teststrecke",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Online",
    jahr: 2023,
    kurz: "Experimental Site • Scroll-Gimmicks",
    tags: ["experiment"],
    farbe: "#e1fd52",
    monogram: "TS",
    notiz: "pure spielwiese",
  },
  {
    slug: "baeckerei-roth",
    name: "Bäckerei Roth",
    kategorie: "grafik",
    kategorieLabel: "grafik",
    ort: "Eupen, Belgien",
    jahr: 2023,
    kurz: "Speisekarten • Tüten • Ladenbeschilderung",
    tags: ["print"],
    farbe: "#c97a3f",
    monogram: "BR",
  },
  {
    slug: "nord-coffee",
    name: "Nord Coffee",
    kategorie: "web",
    kategorieLabel: "web",
    ort: "Liège, Belgien",
    jahr: 2025,
    kurz: "Café-Website • Karte • einfaches CMS",
    tags: ["website"],
    farbe: "#1f3a2b",
    monogram: "NC",
  },
  {
    slug: "kollektiv-licht",
    name: "Kollektiv Licht",
    kategorie: "branding",
    kategorieLabel: "branding",
    ort: "Köln, Deutschland",
    jahr: 2024,
    kurz: "Künstler-Kollektiv • Wordmark • Editorial",
    tags: ["brand", "editorial"],
    farbe: "#2a2a2a",
    monogram: "KL",
  },
  {
    slug: "kanu-club",
    name: "Kanu-Club Eifel",
    kategorie: "web-branding",
    kategorieLabel: "web + branding",
    ort: "Monschau, Deutschland",
    jahr: 2024,
    kurz: "Verein • Logo-Refresh • Mitglieder-Seite",
    tags: ["brand", "website"],
    farbe: "#2b5d7a",
    monogram: "KC",
    notiz: "logo mit paddel-andeutung",
  },
  {
    slug: "bar-sintax",
    name: "Bar Sintax",
    kategorie: "grafik",
    kategorieLabel: "grafik",
    ort: "Brüssel, Belgien",
    jahr: 2025,
    kurz: "Cocktail-Bar • Speisekarten • Poster • Coaster",
    tags: ["print"],
    farbe: "#141414",
    monogram: "BS",
    notiz: "nachts um zwei entstanden",
  },
];
