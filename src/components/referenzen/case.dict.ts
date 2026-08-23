import type { Locale } from "@/i18n/config";
import type { ClaimT } from "@/components/referenzen/ClaimSwitch";
import type { ProjektAnsichtT } from "@/components/referenzen/ProjektAnsicht";

/**
 * Copy der referenz-detailseiten · dreisprachig.
 *
 * die vier „details" sind echte features der gebauten fabry-seite,
 * keine erfundene case-story: uhrzeit-licht, die schwingende kiefer im
 * zeichen, bildwelt nach jahreszeit, und das stillhalten bei
 * reduzierter bewegung.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type CaseDict = {
  back: string;
  lOrt: string;
  lJahr: string;
  lArt: string;
  auftragH2: string;
  auftragLead: string;
  briefing: string[];

  claimH2: string;
  claimLead: string;
  claim: ClaimT;

  ansichtH2: string;
  ansichtLead: string;
  ansicht: ProjektAnsichtT;

  konzeptH2: string;
  konzeptBody: string;

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
};

export const CASE: Record<Locale, CaseDict> = {
  de: {
    back: "alle referenzen",
    lOrt: "ort",
    lJahr: "jahr",
    lArt: "art",
    auftragH2: "der befund.",
    auftragLead:
      "Reimund Fabry klettert seit über zwanzig Jahren in Bäume. Seine Website war das Gegenteil davon: ein gekauftes WordPress-Theme, das er nie selbst ändern konnte.",
    briefing: ["gefunden werden,", "selbst pflegen", "können"],

    claimH2: "derselbe betrieb, zwei welten.",
    claimLead:
      "Wirf den Schalter. Beides sind die echten Sätze · links wie er 2009 dastand, rechts wie er heute dasteht.",
    claim: {
      eraAlt: "2009",
      eraNeu: "heute",
      altTitle: "Wir sind Ihr zuverlässiger Partner für Baumpflege, Baumfällung und Heckenschnitt in der Region.",
      altBody: "Fragen Sie uns! Wir beraten Sie gerne.",
      altLink: "» Kontakt",
      altFoot: "Letzte Aktualisierung: 14.03.2009",
      neuTitle: "wir halten ihre bäume gesund.",
      neuBody: "Ein Baumpfleger. Keine Agentur. Sechs Wörter, die sagen, was er tut · und nicht, was jeder Anbieter über sich sagen würde.",
      hint: "Die Typografie führt hier das Argument. Kein Text musste erklären, was sich geändert hat.",
    },

    ansichtH2: "so läuft sie heute.",
    ansichtLead:
      "Die echte Seite, auf beiden Geräten. Zieh sie durch · oder lass sie laufen, sie fährt von selbst.",
    ansicht: {
      hint: "Ziehen scrubbt durch die Seite. Losgelassen läuft sie weiter.",
      empty: "aufnahmen folgen",
      desktopLabel: "Desktop-Ansicht der gebauten Seite",
      mobileLabel: "Mobile Ansicht der gebauten Seite",
    },

    konzeptH2: "eine studie, kein kundenprojekt.",
    konzeptBody:
      "Eine Konzept-Studie · sie zeigt, wie ich arbeite, läuft aber nicht live bei einem Kunden. Sobald sie das tut, steht es hier.",

    ctaH2: "sowas für dich?",
    ctaBody:
      "Erzähl mir kurz, was du vorhast. Kostet nichts, verpflichtet zu nichts. Und wenn ich nicht der richtige bin, sage ich dir das auch.",
    ctaPrimary: "schreib mir",
  },

  fr: {
    back: "toutes les références",
    lOrt: "lieu",
    lJahr: "année",
    lArt: "type",
    auftragH2: "le diagnostic.",
    auftragLead:
      "Reimund Fabry grimpe dans les arbres depuis plus de vingt ans. Son site était tout le contraire : un thème WordPress acheté qu'il n'a jamais pu modifier lui-même.",
    briefing: ["être trouvé,", "pouvoir gérer", "soi-même"],

    claimH2: "la même entreprise, deux mondes.",
    claimLead:
      "Bascule l'interrupteur. Les deux phrases sont réelles · à gauche telle qu'il apparaissait en 2009, à droite telle qu'il apparaît aujourd'hui.",
    claim: {
      eraAlt: "2009",
      eraNeu: "aujourd'hui",
      altTitle: "Wir sind Ihr zuverlässiger Partner für Baumpflege, Baumfällung und Heckenschnitt in der Region.",
      altBody: "Fragen Sie uns! Wir beraten Sie gerne.",
      altLink: "» Kontakt",
      altFoot: "Letzte Aktualisierung: 14.03.2009",
      neuTitle: "wir halten ihre bäume gesund.",
      neuBody: "Un élagueur. Pas une agence. Six mots qui disent ce qu'il fait · et pas ce que n'importe quel prestataire dirait de lui-même.",
      hint: "C'est la typographie qui porte l'argument ici. Aucun texte n'a eu besoin d'expliquer ce qui a changé.",
    },

    ansichtH2: "voilà comment il tourne.",
    ansichtLead:
      "Le vrai site, sur les deux appareils. Fais-le défiler · ou laisse-le, il avance tout seul.",
    ansicht: {
      hint: "Tirer fait défiler le site. Relâché, il continue.",
      empty: "captures à venir",
      desktopLabel: "Vue desktop du site construit",
      mobileLabel: "Vue mobile du site construit",
    },

    konzeptH2: "une étude, pas un projet client.",
    konzeptBody:
      "Une étude concept · elle montre comment je travaille, mais elle ne tourne pas en ligne chez un client. Dès que ce sera le cas, ce sera écrit ici.",

    ctaH2: "quelque chose comme ça pour toi ?",
    ctaBody:
      "Raconte-moi vite ce que tu prévois. Ça ne coûte rien, ça n'engage à rien. Et si je ne suis pas le bon, je te le dis aussi.",
    ctaPrimary: "écris-moi",
  },

  en: {
    back: "all work",
    lOrt: "place",
    lJahr: "year",
    lArt: "type",
    auftragH2: "the findings.",
    auftragLead:
      "Reimund Fabry has been climbing trees for over twenty years. His website was the opposite: a bought WordPress theme he could never change himself.",
    briefing: ["get found,", "be able to", "maintain it yourself"],

    claimH2: "same business, two worlds.",
    claimLead:
      "Throw the switch. Both sentences are real · on the left how he appeared in 2009, on the right how he appears today.",
    claim: {
      eraAlt: "2009",
      eraNeu: "today",
      altTitle: "Wir sind Ihr zuverlässiger Partner für Baumpflege, Baumfällung und Heckenschnitt in der Region.",
      altBody: "Fragen Sie uns! Wir beraten Sie gerne.",
      altLink: "» Kontakt",
      altFoot: "Letzte Aktualisierung: 14.03.2009",
      neuTitle: "wir halten ihre bäume gesund.",
      neuBody: "One arborist. Not an agency. Six words that say what he does · and not what any provider would say about themselves.",
      hint: "The typography carries the argument here. No copy had to explain what changed.",
    },

    ansichtH2: "how it runs today.",
    ansichtLead:
      "The real site, on both devices. Drag it through · or leave it, it moves on its own.",
    ansicht: {
      hint: "Dragging scrubs through the site. Let go and it keeps going.",
      empty: "captures to follow",
      desktopLabel: "Desktop view of the built site",
      mobileLabel: "Mobile view of the built site",
    },

    konzeptH2: "a study, not a client project.",
    konzeptBody:
      "A concept study · it shows how I work, but it isn't running live at a client. As soon as it is, it will say so here.",

    ctaH2: "something like this for you?",
    ctaBody:
      "Tell me briefly what you're planning. Costs nothing, commits to nothing. And if I'm not the right person, I'll say so.",
    ctaPrimary: "write me",
  },
};
