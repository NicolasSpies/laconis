import type { Locale } from "@/i18n/config";

/**
 * Copy der referenzen-seite · dreisprachig.
 *
 * haltung: der index zeigt genau drei zeilen, weil es genau drei gibt.
 * ein aufgeblasenes portfolio wäre in zwei minuten durchschaut · die
 * ehrlichkeit ist hier das eigentliche verkaufsargument.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type ReferenzenDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  sub: string;
  boardHint: string;

  lStatus: string;
  lLeistung: string;
  lOrt: string;
  lJahr: string;
  lTempo: string;
  lStimme: string;
  mobil: string;
  desktop: string;

  stampLive: string;
  stampKonzept: string;
  stampWip: string;

  linkLive: string;
  linkCase: string;

  honestH2: string;
  honestBody: string;

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const REFERENZEN: Record<Locale, ReferenzenDict> = {
  de: {
    kicker: "referenzen",
    h1a: "was schon",
    h1b: "läuft.",
    sub: "Drei Projekte. Fahr drüber, dann siehst du die Seite · klick drauf, dann siehst du, wie sie entstanden ist.",
    boardHint: "jede zeile führt direkt rein",

    lStatus: "status",
    lLeistung: "leistung",
    lOrt: "ort",
    lJahr: "jahr",
    lTempo: "gemessen",
    lStimme: "der kunde dazu",
    mobil: "mobil",
    desktop: "desktop",

    stampLive: "live beim kunden",
    stampKonzept: "konzept-studie",
    stampWip: "konzept-studie · in arbeit",

    linkLive: "seite ansehen",
    linkCase: "case lesen",

    honestH2: "drei zeilen. mehr nicht.",
    honestBody:
      "Ich zeige nur, was es wirklich gibt. Eine Seite läuft live beim Kunden, zwei sind Konzept-Studien und genau so gestempelt. Kein aufgeblasenes Regal mit fremden Arbeiten drin. Wenn du Nummer vier sein willst: gerade ist Platz, und entsprechend viel Aufmerksamkeit bekommst du auch.",

    ctaH2: "dein projekt als nummer vier?",
    ctaBody:
      "Kurzes Gespräch, kein Pitch-Deck, kostet nichts. Danach weisst du, ob ich der richtige bin. Und wenn nicht, sage ich dir das auch.",
    ctaPrimary: "schreib mir",
    ctaSecondary: "preise ansehen",
  },

  fr: {
    kicker: "références",
    h1a: "ce qui tourne",
    h1b: "déjà.",
    sub: "Trois projets. Survole pour voir le site · clique pour voir comment il est né.",
    boardHint: "chaque ligne mène directement au projet",

    lStatus: "statut",
    lLeistung: "prestation",
    lOrt: "lieu",
    lJahr: "année",
    lTempo: "mesuré",
    lStimme: "le client en dit",
    mobil: "mobile",
    desktop: "desktop",

    stampLive: "en ligne chez le client",
    stampKonzept: "étude concept",
    stampWip: "étude concept · en cours",

    linkLive: "voir le site",
    linkCase: "lire le case",

    honestH2: "trois lignes. pas plus.",
    honestBody:
      "Je ne montre que ce qui existe vraiment. Un site tourne en ligne chez le client, deux sont des études concept et marquées comme telles. Pas d'étagère gonflée avec les travaux des autres dedans. Si tu veux être le numéro quatre : il y a de la place en ce moment, et donc beaucoup d'attention pour toi.",

    ctaH2: "ton projet en numéro quatre ?",
    ctaBody:
      "Court échange, pas de pitch deck, ça ne coûte rien. Ensuite tu sais si je suis la bonne personne. Et sinon, je te le dis aussi.",
    ctaPrimary: "écris-moi",
    ctaSecondary: "voir les prix",
  },

  en: {
    kicker: "work",
    h1a: "what's already",
    h1b: "running.",
    sub: "Three projects. Hover to see the site · click to see how it came about.",
    boardHint: "every row leads straight in",

    lStatus: "status",
    lLeistung: "scope",
    lOrt: "place",
    lJahr: "year",
    lTempo: "measured",
    lStimme: "the client on it",
    mobil: "mobile",
    desktop: "desktop",

    stampLive: "live at the client",
    stampKonzept: "concept study",
    stampWip: "concept study · in progress",

    linkLive: "visit the site",
    linkCase: "read the case",

    honestH2: "three rows. that's it.",
    honestBody:
      "I only show what actually exists. One site is live at the client, two are concept studies and stamped as such. No inflated shelf with other people's work on it. If you want to be number four: there's room right now, and you get the attention that comes with it.",

    ctaH2: "your project as number four?",
    ctaBody:
      "Short conversation, no pitch deck, costs nothing. After that you know whether i'm the right person. And if i'm not, i'll say so.",
    ctaPrimary: "write me",
    ctaSecondary: "see pricing",
  },
};
