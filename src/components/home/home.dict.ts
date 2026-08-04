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

  werLabel: string;
  werLead1: string;
  werAccent: string;
  werLead2: string;
  werBody: string;
  zahlen: [string, string][];

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

    werLabel: "· wer das hier baut",
    werLead1: "Ich bin Nicolas. Du schreibst mir, ",
    werAccent: "ich antworte",
    werLead2: ". Nicht ein Ticket-System, nicht ein Projektmanager, nicht ein Praktikant.",
    werBody:
      "Ich nehme wenige Projekte gleichzeitig, damit deins nicht in einer Pipeline versauert. Dafür kennst du am Ende jede Entscheidung, die in deiner Seite steckt.",
    zahlen: [
      ["seit", "2019"],
      ["im team", "1"],
      ["sprachen", "3"],
      ["kontakt", "1:1"],
    ],

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

    werLabel: "· qui construit ça",
    werLead1: "Je suis Nicolas. Tu m'écris, ",
    werAccent: "je réponds",
    werLead2: ". Pas un système de tickets, pas un chef de projet, pas un stagiaire.",
    werBody:
      "Je prends peu de projets en même temps, pour que le tien ne moisisse pas dans un pipeline. En échange, tu connais à la fin chaque décision qui est dans ton site.",
    zahlen: [
      ["depuis", "2019"],
      ["dans l'équipe", "1"],
      ["langues", "3"],
      ["contact", "1:1"],
    ],

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

    werLabel: "· who builds this",
    werLead1: "I'm Nicolas. You write to me, ",
    werAccent: "i answer",
    werLead2: ". Not a ticket system, not a project manager, not an intern.",
    werBody:
      "I take on few projects at a time so yours doesn't rot in a pipeline. In return you know every decision that went into your site by the end.",
    zahlen: [
      ["since", "2019"],
      ["in the team", "1"],
      ["languages", "3"],
      ["contact", "1:1"],
    ],

    refH2: "what's already running.",
    refHint: "Three channels, all live · hover them and the level goes full scale.",

    sendH2: "tell me what you're planning.",
    sendBody: "30 minutes, no pitch deck, costs nothing · after that you know whether we fit.",
  },
};
