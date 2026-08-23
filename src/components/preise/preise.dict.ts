import type { Locale } from "@/i18n/config";
import type { CaliperT } from "@/components/preise/PriceCaliper";

/**
 * Copy der preis-seite · dreisprachig.
 *
 * haltung: keine paket-tabelle, keine sternchen, kein fixpreis. das
 * instrument misst einen korridor und sagt auch, dass es einer ist.
 * alle zahlen stammen aus Nicolas' eigenen angaben · nichts geschätzt,
 * nichts aus einer marktstudie.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type PreiseDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  sub: string;
  caliper: CaliperT;

  laufendH2: string;
  laufendLead: string;
  /* die summe der zeilen darunter · hosting 20 bis 50 plus domain
     rund 2, CMS und lizenzen ändern sie nicht. wird eine zeile
     angefasst, muss diese spanne mit */
  zaehlerLabel: string;
  zaehlerVon: string;
  zaehlerBis: string;
  zaehlerBisLabel: string;
  zaehlerEinheit: string;
  laufend: [string, string][];

  faqH2: string;
  faq: [string, string][];

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const PREISE: Record<Locale, PreiseDict> = {
  de: {
    kicker: "preise",
    h1a: "was kostet",
    h1b: "das?",
    sub: "Ehrliche Antwort: es kommt drauf an. Stell unten ein, was du vorhast, dann siehst du den Korridor. Eine einzelne Zahl kommt hier bewusst nicht raus.",
    caliper: {
      labelWas: "was soll entstehen",
      wasWeb: "website",
      wasBrand: "branding",
      wasBoth: "beides",
      labelUmfang: "umfang",
      tiersWeb: ["eine seite", "mehrere seiten", "+ shop"],
      tiersBrand: ["logo", "brand identity", "+ anwendungen"],
      tiersBoth: ["klein", "mittel", "gross"],
      labelSprachen: "sprachen",
      sprachen: ["eine", "zwei", "drei"],
      readoutLabel: "korridor",
      vonLabel: "von",
      bisLabel: "bis",
      note: "Ein Korridor, kein Angebot. Die belastbare Zahl kommt nach einem kurzen Gespräch, weil sie an deinem Projekt hängt und nicht an einer Paketstufe.",
      overflowNote: "Ab hier hört die Skala auf. In der Grössenordnung reden wir sowieso besser einmal miteinander, bevor irgendeine Zahl im Raum steht.",
    },

    laufendH2: "und danach?",
    laufendLead:
      "Nach dem Launch läuft nur, was du wirklich brauchst. Keine Vertragsbindung, kein Paket, das mitwächst ohne dass du es merkst.",
    zaehlerLabel: "zählerstand · monatlich",
    zaehlerVon: "22",
    zaehlerBis: "52",
    zaehlerBisLabel: "bis",
    zaehlerEinheit: "€ / monat",
    laufend: [
      ["hosting · backups · kleine pflege", "20 bis 50 € im monat"],
      ["domain", "ca. 2 € im monat, je nach endung"],
      ["cms-nutzung", "0 € · gehört dir mit der seite"],
      ["lizenzen für stock-fotos oder premium-fonts", "nur wenn du sie willst"],
    ],

    faqH2: "bevor du fragst.",
    faq: [
      ["warum steht hier keine preisliste?", "Weil sie bei jedem Projekt anders lügen würde. Der Korridor oben ist so nah dran, wie ich ehrlich kommen kann."],
      ["wie geht es los?", "Kurzes Gespräch, dann ein schriftliches Angebot."],
      ["was ist nicht enthalten?", "Stock-Fotos, Premium-Fonts und externe Tools mit eigenen Lizenzkosten."],
      ["kann ich in raten zahlen?", "Ja. Anzahlung beim Start, Rest beim Launch."],
      ["was, wenn mein budget kleiner ist?", "Dann sag es früh. Meistens geht das Wichtigste zuerst live und der Rest später."],
    ],

    ctaH2: "ich sag dir ehrlich, wo wir stehen.",
    ctaBody:
      "Schreib mir kurz, was du vorhast. Kostenlos, unverbindlich, kein Formular-Labyrinth. Und wenn ich nicht der richtige bin, sage ich dir das auch.",
    ctaPrimary: "schreib mir",
    ctaSecondary: "leistung ansehen",
  },

  fr: {
    kicker: "prix",
    h1a: "ça coûte",
    h1b: "combien ?",
    sub: "Réponse honnête : ça dépend. Règle en bas ce que tu prévois, et tu vois le couloir. Un chiffre unique ne sort pas d'ici, volontairement.",
    caliper: {
      labelWas: "ce qui doit naître",
      wasWeb: "site web",
      wasBrand: "branding",
      wasBoth: "les deux",
      labelUmfang: "ampleur",
      tiersWeb: ["une page", "plusieurs pages", "+ boutique"],
      tiersBrand: ["logo", "brand identity", "+ supports"],
      tiersBoth: ["petit", "moyen", "grand"],
      labelSprachen: "langues",
      sprachen: ["une", "deux", "trois"],
      readoutLabel: "couloir",
      vonLabel: "de",
      bisLabel: "à",
      note: "Un couloir, pas une offre. Le chiffre solide arrive après un court échange, parce qu'il tient à ton projet et pas à un palier de forfait.",
      overflowNote: "Ici l'échelle s'arrête. À cet ordre de grandeur, mieux vaut de toute façon se parler une fois avant qu'un chiffre traîne dans la pièce.",
    },

    laufendH2: "et après ?",
    laufendLead:
      "Après la mise en ligne, il ne tourne que ce dont tu as vraiment besoin. Pas d'engagement, pas de forfait qui grossit sans que tu le voies.",
    zaehlerLabel: "relevé · par mois",
    zaehlerVon: "22",
    zaehlerBis: "52",
    zaehlerBisLabel: "à",
    zaehlerEinheit: "€ / mois",
    laufend: [
      ["hébergement · sauvegardes · petit entretien", "20 à 50 € par mois"],
      ["domaine", "env. 2 € par mois, selon l'extension"],
      ["utilisation du CMS", "0 € · il est à toi avec le site"],
      ["licences photos ou polices premium", "seulement si tu en veux"],
    ],

    faqH2: "avant que tu demandes.",
    faq: [
      ["pourquoi pas de grille tarifaire ?", "Parce qu'elle mentirait différemment sur chaque projet. La fourchette ci-dessus est ce que je peux dire d'honnête."],
      ["comment ça démarre ?", "Court échange, puis une offre écrite."],
      ["qu'est-ce qui n'est pas inclus ?", "Photos stock, polices premium et outils externes sous licence."],
      ["puis-je payer en plusieurs fois ?", "Oui. Acompte au départ, solde au lancement."],
      ["et si mon budget est plus petit ?", "Dis-le tôt. En général l'essentiel part en ligne d'abord, le reste suit."],
    ],

    ctaH2: "je te dis franchement où on en est.",
    ctaBody:
      "Écris-moi vite ce que tu prévois. Gratuit, sans engagement, pas de labyrinthe de formulaire. Et si je ne suis pas la bonne personne, je te le dis aussi.",
    ctaPrimary: "écris-moi",
    ctaSecondary: "voir la prestation",
  },

  en: {
    kicker: "pricing",
    h1a: "what does",
    h1b: "it cost?",
    sub: "Honest answer: it depends. Set what you're planning below and you see the corridor. A single number deliberately does not come out of this.",
    caliper: {
      labelWas: "what should exist",
      wasWeb: "website",
      wasBrand: "branding",
      wasBoth: "both",
      labelUmfang: "scope",
      tiersWeb: ["one page", "several pages", "+ shop"],
      tiersBrand: ["logo", "brand identity", "+ applications"],
      tiersBoth: ["small", "medium", "large"],
      labelSprachen: "languages",
      sprachen: ["one", "two", "three"],
      readoutLabel: "corridor",
      vonLabel: "from",
      bisLabel: "to",
      note: "A corridor, not an offer. The solid number comes after a short conversation, because it depends on your project and not on a package tier.",
      overflowNote: "The scale ends here. At this order of magnitude we're better off talking once before any number is on the table anyway.",
    },

    laufendH2: "and afterwards?",
    laufendLead:
      "After launch only what you actually need keeps running. No lock-in, no package that grows without you noticing.",
    zaehlerLabel: "meter reading · monthly",
    zaehlerVon: "22",
    zaehlerBis: "52",
    zaehlerBisLabel: "to",
    zaehlerEinheit: "€ / month",
    laufend: [
      ["hosting · backups · small upkeep", "20 to 50 € per month"],
      ["domain", "around 2 € per month, depending on the extension"],
      ["cms usage", "0 € · it's yours with the site"],
      ["licences for stock photos or premium fonts", "only if you want them"],
    ],

    faqH2: "before you ask.",
    faq: [
      ["why is there no price list?", "Because it would lie differently on every project. The range above is as close as I can honestly get."],
      ["how does it start?", "Short conversation, then a written quote."],
      ["what is not included?", "Stock photos, premium fonts and licensed external tools."],
      ["can I pay in instalments?", "Yes. Deposit at the start, the rest at launch."],
      ["what if my budget is smaller?", "Say so early. Usually the essentials go live first and the rest follows."],
    ],

    ctaH2: "i'll tell you honestly where we stand.",
    ctaBody:
      "Write me briefly what you're planning. Free, no strings, no form labyrinth. And if I'm not the right person, I'll say that too.",
    ctaPrimary: "write me",
    ctaSecondary: "see the service",
  },
};
