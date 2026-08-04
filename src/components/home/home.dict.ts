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

  ts: {
    label: string;
    serie: string;
    zeile1: string;
    akzent: string;
    zeile2: string;
    tief: string;
    daten: [string, string][];
    key: string;
    hinweis: string;
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

    ts: {
      label: "typenschild",
      serie: "lac-01 · ostbelgien",
      zeile1: "hier baut ",
      akzent: "genau einer",
      zeile2: ". von der ersten zeile bis live.",
      tief: "Kein Ticket-System, kein Projektmanager, kein Praktikant. Du schreibst mir, ich antworte.",
      daten: [
        ["seit", "2019"],
        ["im team", "1"],
        ["kontakt", "1:1"],
      ],
      key: "mehr über mich",
      hinweis: "kipp mich",
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

    ts: {
      label: "plaque signalétique",
      serie: "lac-01 · cantons de l'est",
      zeile1: "ici, c'est ",
      akzent: "une seule personne",
      zeile2: ". de la première ligne jusqu'au live.",
      tief: "Pas de système de tickets, pas de chef de projet, pas de stagiaire. Tu m'écris, je réponds.",
      daten: [
        ["depuis", "2019"],
        ["dans l'équipe", "1"],
        ["contact", "1:1"],
      ],
      key: "en savoir plus sur moi",
      hinweis: "incline-moi",
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

    ts: {
      label: "nameplate",
      serie: "lac-01 · east belgium",
      zeile1: "",
      akzent: "exactly one person",
      zeile2: " builds this. from the first line to live.",
      tief: "No ticket system, no project manager, no intern. You write to me, I answer.",
      daten: [
        ["since", "2019"],
        ["on the team", "1"],
        ["contact", "1:1"],
      ],
      key: "more about me",
      hinweis: "tilt me",
    },

    refH2: "what's already running.",
    refHint: "Three channels, all live · hover them and the level goes full scale.",

    sendH2: "tell me what you're planning.",
    sendBody: "30 minutes, no pitch deck, costs nothing · after that you know whether we fit.",
  },
};
