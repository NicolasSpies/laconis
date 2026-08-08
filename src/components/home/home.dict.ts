import type { Locale } from "@/i18n/config";

/**
 * Copy der startseite · dreisprachig.
 *
 * war bis august 2026 als einzige geräte-seite fest deutsch verdrahtet ·
 * /fr und /en zeigten also ausgerechnet auf der wichtigsten seite
 * deutschen text.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type HomeDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  h1accent: string;
  h1c: string;
  sub: string;
  facts: [string, string][];
  scroll: string;

  wf: {
    label: string;
    weg: string[];
    stattLead: string;
    stattName: string;
    stattBody: string;
  };

  refH2: string;
  refHint: string;

  sendH2: string;
  sendBody: string;
};

export const HOME: Record<Locale, HomeDict> = {
  de: {
    kicker: "webdesign studio · ostbelgien",
    h1a: "websites,",
    h1b: "die man",
    h1accent: "anfassen",
    h1c: " will.",
    sub: "Von null gebaut · kein Template, keine WordPress-Grenzen. Das hier läuft auf einem Shader, nicht auf einem Plugin.",
    facts: [
      ["pagespeed", "95+"],
      ["ladezeit", "0.4s"],
      ["cms", "eigenbau"],
      ["3rd-party js", "0 kb"],
    ],
    scroll: "↓ scrollen",

    wf: {
      label: "was bei dir wegfällt",
      weg: [
        "plugin-updates",
        "theme-lizenzen",
        "monatliche abos",
        "update-angst",
        "agentur-tickets",
      ],
      stattLead: "Stattdessen ",
      stattName: "ContentCore",
      stattBody:
        " · mein eigenes CMS. Mehrsprachigkeit, Übersetzung, Bilder, Formulare, Shop und Analytics sind eingebaut, nicht zugekauft. Ein Anbieter statt zehn.",
    },

    refH2: "was schon läuft.",
    refHint: "Drei Kanäle, alle live · fahr drüber, dann geht der Pegel auf Vollausschlag.",

    sendH2: "erzähl mir, was du vorhast.",
    sendBody: "30 Minuten, kein Pitch-Deck, kostet nichts · danach weisst du, ob wir zusammenpassen.",
  },

  fr: {
    kicker: "studio webdesign · cantons de l'est",
    h1a: "des sites",
    h1b: "qu'on veut",
    h1accent: "toucher",
    h1c: ".",
    sub: "Construits de zéro · pas de template, pas de limites WordPress. Ceci tourne sur un shader, pas sur un plugin.",
    facts: [
      ["pagespeed", "95+"],
      ["chargement", "0.4s"],
      ["cms", "maison"],
      ["js externe", "0 kb"],
    ],
    scroll: "↓ défiler",

    wf: {
      label: "ce qui disparaît chez toi",
      weg: [
        "mises à jour de plugins",
        "licences de thème",
        "abonnements mensuels",
        "peur des updates",
        "tickets d'agence",
      ],
      stattLead: "À la place ",
      stattName: "ContentCore",
      stattBody:
        " · mon propre CMS. Multilingue, traduction, images, formulaires, boutique et analytics sont intégrés, pas achetés. Un fournisseur au lieu de dix.",
    },

    refH2: "ce qui tourne déjà.",
    refHint: "Trois canaux, tous en ligne · passe dessus et le niveau part à fond.",

    sendH2: "raconte-moi ce que tu prépares.",
    sendBody: "30 minutes, pas de pitch deck, ça ne coûte rien · ensuite tu sais si on colle.",
  },

  en: {
    kicker: "webdesign studio · east belgium",
    h1a: "websites",
    h1b: "you want to",
    h1accent: "touch",
    h1c: ".",
    sub: "Built from scratch · no template, no WordPress ceiling. This runs on a shader, not on a plugin.",
    facts: [
      ["pagespeed", "95+"],
      ["load time", "0.4s"],
      ["cms", "in-house"],
      ["3rd-party js", "0 kb"],
    ],
    scroll: "↓ scroll",

    wf: {
      label: "what falls away for you",
      weg: [
        "plugin updates",
        "theme licences",
        "monthly subscriptions",
        "update anxiety",
        "agency tickets",
      ],
      stattLead: "Instead ",
      stattName: "ContentCore",
      stattBody:
        " · my own CMS. Multilingual, translation, images, forms, shop and analytics are built in, not bought in. One vendor instead of ten.",
    },

    refH2: "what's already running.",
    refHint: "Three channels, all live · hover them and the level goes full scale.",

    sendH2: "tell me what you're planning.",
    sendBody: "30 minutes, no pitch deck, costs nothing · after that you know whether we fit.",
  },
};
