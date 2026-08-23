import type { Locale } from "@/i18n/config";

/**
 * Copy der referenzen-seite · dreisprachig.
 *
 * haltung: der stapel hat genau drei schichten, weil es genau drei
 * projekte gibt. ein aufgeblasenes portfolio wäre in zwei minuten
 * durchschaut · die ehrlichkeit ist hier das verkaufsargument.
 *
 * die copy ist bewusst KURZ. jede aussage steht genau einmal: der
 * name an der schicht, der status am stempel, der hinweis zur geste
 * einmal unter dem stapel. was doppelt stand, ist raus.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type ReferenzenDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  sub: string;
  /* der einzige hinweistext am stapel · alles andere steht als
     name oder stempel direkt an der schicht */
  sxZieh: string;
  lOrt: string;
  lJahr: string;
  lTempo: string;
  mobil: string;
  desktop: string;

  stampLive: string;
  stampKonzept: string;
  stampWip: string;

  linkLive: string;

  honestH2: string;
  honestBody: string;

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const REFERENZEN: Record<Locale, ReferenzenDict> = {
  de: {
    kicker: "arbeiten",
    h1a: "was schon",
    h1b: "läuft.",
    sub: "Jede Schicht ist ein Projekt.",

    sxZieh: "ziehen · klicken",
    lOrt: "ort",
    lJahr: "jahr",
    lTempo: "gemessen",
    mobil: "mobil",
    desktop: "desktop",

    stampLive: "live",
    stampKonzept: "konzept",
    stampWip: "in arbeit",

    linkLive: "seite ansehen",

    honestH2: "kein aufgeblasenes regal.",
    honestBody:
      "Hier steht nur, was ich selbst gebaut habe. Was noch nicht live ist, sagt das an seiner Schicht auch.",

    ctaH2: "und deins?",
    ctaBody:
      "Kurzes Gespräch, kein Pitch-Deck, kostet nichts.",
    ctaPrimary: "schreib mir",
    ctaSecondary: "wie ich arbeite",
  },

  fr: {
    kicker: "travaux",
    h1a: "ce qui tourne",
    h1b: "déjà.",
    sub: "Chaque couche est un projet.",

    sxZieh: "tirer · cliquer",
    lOrt: "lieu",
    lJahr: "année",
    lTempo: "mesuré",
    mobil: "mobile",
    desktop: "desktop",

    stampLive: "en ligne",
    stampKonzept: "concept",
    stampWip: "en cours",

    linkLive: "voir le site",

    honestH2: "pas d'étagère gonflée.",
    honestBody:
      "Ici, il n'y a que ce que j'ai construit moi-même. Ce qui n'est pas encore en ligne le dit sur sa couche.",

    ctaH2: "et le tien ?",
    ctaBody:
      "Court échange, pas de pitch deck, ça ne coûte rien.",
    ctaPrimary: "écris-moi",
    ctaSecondary: "comment je travaille",
  },

  en: {
    kicker: "work",
    h1a: "what's already",
    h1b: "running.",
    sub: "Each layer is one project.",

    sxZieh: "drag · click",
    lOrt: "place",
    lJahr: "year",
    lTempo: "measured",
    mobil: "mobile",
    desktop: "desktop",

    stampLive: "live",
    stampKonzept: "concept",
    stampWip: "in progress",

    linkLive: "visit the site",

    honestH2: "no padded shelf.",
    honestBody:
      "Only what I built myself is on here. Whatever is not live yet says so on its own layer.",

    ctaH2: "and yours?",
    ctaBody:
      "Short conversation, no pitch deck, costs nothing.",
    ctaPrimary: "write me",
    ctaSecondary: "how i work",
  },
};
