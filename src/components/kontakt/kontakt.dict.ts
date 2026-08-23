import type { Locale } from "@/i18n/config";
import type { KonsoleT } from "@/components/kontakt/KontaktKonsole";

/**
 * Copy von /kontakt · dreisprachig.
 *
 * keine zeitversprechen im text · die kann Nicolas nicht halten und
 * will sie deshalb auch nicht geben. was hier steht, ist nur, dass die
 * nachricht direkt bei ihm landet.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type KontaktDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  sub: string;

  direktLabel: string;
  schreiben: string;
  anrufen: string;

  konsoleH2: string;
  konsoleLead: string;
  konsole: KonsoleT;

  kammer: { satz: string; betont: string };
  danachH2: string;
  danach: [string, string][];
};

export const KONTAKT: Record<Locale, KontaktDict> = {
  de: {
    kicker: "kontakt",
    h1a: "lass",
    h1b: "reden.",
    sub: "Eine kurze Nachricht reicht. Kein Verkaufs-Pitch, kein Formular-Zwang. Du landest direkt bei mir, nicht in einem Ticket-System.",

    direktLabel: "direkter draht",
    schreiben: "schreiben",
    anrufen: "anrufen",

    konsoleH2: "oder sag mir gleich, was du vorhast.",
    konsoleLead:
      "Zwei Felder reichen, um die Verriegelung zu lösen. Alles andere hebt nur den Pegel · und macht meine erste Antwort brauchbarer.",
    konsole: {
      panel: "anfrage · konsole",
      fName: "name",
      fMail: "e-mail",
      fTel: "telefon",
      fTelOpt: "(optional)",
      fNotiz: "worum geht es",
      fNotizPlaceholder: "Ein paar Sätze reichen. Was hast du vor, was stört dich an der jetzigen Seite, was soll am Ende dastehen?",
      labelBedarf: "was brauchst du",
      bedarf: ["website", "branding", "beides"],
      labelZeit: "wie eilig",
      zeit: ["entspannt", "diesen monat", "eilig"],
      meterLabel: "pegel",
      lockedHint: "Name und E-Mail entriegeln den Knopf.",
      readyHint: "Entriegelt. Kappe hoch, dann senden.",
      guardClosed: "kappe öffnen",
      guardOpen: "kappe schliessen",
      sending: "sendet …",
      send: "senden",
      sentTitle: "raus damit",
      sentBody:
        "Deine Anfrage liegt bei mir. Ich melde mich, sobald ich sie mir angeschaut habe. Wenn du in der Zwischenzeit noch etwas nachreichen willst, schreib einfach an nicolas@laconis.be.",
      errorTitle: "das ging schief",
      errorBody:
        "Der Versand hat nicht geklappt. Schreib mir stattdessen direkt an nicolas@laconis.be, dann geht nichts verloren.",
    },

    kammer: { satz: "und wenn ich nicht der richtige bin,", betont: "sage ich dir das." },
    danachH2: "was danach passiert.",
    danach: [
      ["ich lese", "Direkt, ohne Zwischenschicht, die vorsortiert."],
      ["ich melde mich", "Ein kurzes Gespräch, kein Pitch-Deck."],
      ["du kriegst eine zahl", "Ein festes Angebot, schriftlich, ohne Kleingedrucktes."],
    ],
  },

  fr: {
    kicker: "contact",
    h1a: "on",
    h1b: "parle ?",
    sub: "Un message court suffit. Pas de pitch commercial, pas de formulaire obligatoire. Tu tombes directement chez moi, pas dans un système de tickets.",

    direktLabel: "voie directe",
    schreiben: "écrire",
    anrufen: "appeler",

    konsoleH2: "ou dis-moi directement ce que tu prévois.",
    konsoleLead:
      "Deux champs suffisent pour lever le verrou. Tout le reste ne fait que monter le niveau · et rend ma première réponse plus utile.",
    konsole: {
      panel: "demande · console",
      fName: "nom",
      fMail: "e-mail",
      fTel: "téléphone",
      fTelOpt: "(optionnel)",
      fNotiz: "de quoi s'agit-il",
      fNotizPlaceholder: "Quelques phrases suffisent. Qu'est-ce que tu prévois, qu'est-ce qui te gêne sur le site actuel, à quoi ça doit ressembler à la fin ?",
      labelBedarf: "il te faut quoi",
      bedarf: ["site web", "branding", "les deux"],
      labelZeit: "c'est urgent ?",
      zeit: ["tranquille", "ce mois-ci", "pressé"],
      meterLabel: "niveau",
      lockedHint: "Nom et e-mail déverrouillent le bouton.",
      readyHint: "Déverrouillé. Lève le capot, puis envoie.",
      guardClosed: "ouvrir le capot",
      guardOpen: "fermer le capot",
      sending: "envoi …",
      send: "envoyer",
      sentTitle: "c'est parti",
      sentBody:
        "Ta demande est chez moi. Je reviens vers toi dès que je l'ai regardée. Si tu veux ajouter quelque chose entre-temps, écris simplement à nicolas@laconis.be.",
      errorTitle: "ça a raté",
      errorBody:
        "L'envoi n'a pas fonctionné. Écris-moi plutôt directement à nicolas@laconis.be, comme ça rien ne se perd.",
    },

    kammer: { satz: "et si je ne suis pas le bon,", betont: "je te le dis." },
    danachH2: "ce qui se passe ensuite.",
    danach: [
      ["je lis", "Directement, sans intermédiaire qui trie avant."],
      ["je te réponds", "Un court échange, pas de pitch deck."],
      ["tu reçois un chiffre", "Une offre ferme, par écrit, sans petits caractères."],
    ],
  },

  en: {
    kicker: "contact",
    h1a: "let's",
    h1b: "talk.",
    sub: "A short message is enough. No sales pitch, no forced forms. You land straight with me, not in a ticket system.",

    direktLabel: "direct line",
    schreiben: "write",
    anrufen: "call",

    konsoleH2: "or tell me right away what you're planning.",
    konsoleLead:
      "Two fields are enough to release the lock. Everything else just raises the level · and makes my first reply more useful.",
    konsole: {
      panel: "request · console",
      fName: "name",
      fMail: "e-mail",
      fTel: "phone",
      fTelOpt: "(optional)",
      fNotiz: "what's it about",
      fNotizPlaceholder: "A few sentences are enough. What are you planning, what bothers you about the current site, what should be there in the end?",
      labelBedarf: "what do you need",
      bedarf: ["website", "branding", "both"],
      labelZeit: "how urgent",
      zeit: ["relaxed", "this month", "urgent"],
      meterLabel: "level",
      lockedHint: "Name and e-mail release the button.",
      readyHint: "Released. Lift the cover, then send.",
      guardClosed: "open cover",
      guardOpen: "close cover",
      sending: "sending …",
      send: "send",
      sentTitle: "off it goes",
      sentBody:
        "Your request is with me. I'll get back to you once i've had a look at it. If you want to add something in the meantime, just write to nicolas@laconis.be.",
      errorTitle: "that went wrong",
      errorBody:
        "Sending didn't work. Write to me directly at nicolas@laconis.be instead, then nothing gets lost.",
    },

    kammer: { satz: "and if i'm not the right person,", betont: "i'll tell you." },
    danachH2: "what happens next.",
    danach: [
      ["i read it", "Directly, with no middle layer pre-sorting it."],
      ["i get back to you", "A short conversation, no pitch deck."],
      ["you get a number", "A firm offer, in writing, without small print."],
    ],
  },
};
