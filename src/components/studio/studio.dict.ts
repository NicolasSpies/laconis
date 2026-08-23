import type { Locale } from "@/i18n/config";

/**
 * Studio-Copy · aus den frueheren Seiten leistung, preise und
 * ueber-mich zusammengelegt.
 *
 * der werdegang ist der ECHTE · Pixelbar, Pavonet, Colop, Cloth,
 * Nexo, lacønis. er stand bis august 2026 frei erfunden auf der
 * seite („2019 erste website fuer einen freund"). die wahre
 * geschichte ist besser, weil sie das produkt erklaert: wer mit
 * WordPress angefangen hat und rausgegangen ist, hat ein argument ·
 * wer es kritisiert ohne es gemacht zu haben, ist ein ideologe.
 *
 * KEINE jahreszahlen. lacønis gibt es seit april 2026, das ist
 * ehrlich, aber kein verkaufsargument · die reihenfolge reicht.
 *
 * KEINE preise. Nicolas hat entschieden: preis nach gespraech.
 *
 * die editor-texte kommen aus leistung.dict · sie dort UND hier zu
 * pflegen waere die art dopplung, die still auseinanderlaeuft.
 */

export type StudioT = {
  kicker: string;
  h1: string;
  h1akzent: string;
  lead: string;

  kammer: { satz: string; betont: string };

  cmsH2: string;
  cmsLead: string;

  personH2: string;
  bio: string;
  bioSub: string;
  portraitAlt: string;

  wegH2: string;
  weg: [string, string][];

  grenzeH2: string;
  grenze: string[];
  grenzeFuss: string;

  preisH2: string;
  preis: string;
  preisKey: string;

  schluss: { satz: string; key: string; oder: string };
  fussImpressum: string;
  fussDatenschutz: string;
};

export const STUDIO: Record<Locale, StudioT> = {
  de: {
    kicker: "studio · eine person",
    h1: "gelernter grafiker,",
    h1akzent: "der bauen gelernt hat.",
    lead:
      "Deshalb sehen meine Seiten nicht nur aus, sie laufen auch. Design, Entwicklung und ein eigenes CMS aus einer Hand.",

    kammer: {
      satz: "Ich habe mit WordPress angefangen.",
      betont: "Deshalb baue ich heute alles selbst.",
    },

    cmsH2: "das pflegst du selbst.",
    cmsLead: "Tipp rein. Es ist echt.",

    personH2: "wer das baut.",
    bio: "Ich bin Nicolas. Der Web-Teil meiner Ausbildung lief mit WordPress · daher die Entscheidung, heute alles selbst zu bauen.",
    bioSub:
      "Keine Agentur, keine Zwischenschicht. Du redest mit dem, der auch baut. Nebenbei lege ich auf · Trance, Progressive, Breakbeats.",
    portraitAlt: "arbeitsplatz bei nacht · das licht kommt vom bildschirm",

    wegH2: "wie es dazu kam",
    weg: [
      ["ausbildung · web", "Bei Pixelbar, mit WordPress. Da hab ich gelernt, wie es nicht geht."],
      ["ausbildung · grafik", "Bei Pavonet, dazu ein bisschen Werbetechnik. Danach übernommen."],
      ["colop arts & crafts", "Grafik und Packaging Design."],
      ["cloth kreativbüro", "Ein paar Monate im Kreativbüro."],
      ["nexo", "Mit zwei Freundinnen selbstständig gemacht, als Webdesigner."],
      ["lacønis", "Das hier. Alles selbst gebaut, eigenes CMS, keine Zwischenschicht."],
    ],

    grenzeH2: "was ich nicht mache.",
    grenze: ["grafik-strategie", "kampagnen", "social media"],
    grenzeFuss:
      "Können andere besser als ich. Ich hole sie dazu, du hast trotzdem nur eine Ansprechperson: mich.",

    preisH2: "was es kostet.",
    preis:
      "Das sage ich dir nach einem kurzen Gespräch. Eine Preisliste würde bei jedem Projekt anders lügen · zwei Seiten mit gleich vielen Unterseiten können Faktor zwei auseinanderliegen.",
    preisKey: "kurz reden →",

    schluss: { satz: "erzähl mir davon.", key: "schreib mir", oder: "oder direkt an" },
    fussImpressum: "impressum",
    fussDatenschutz: "datenschutz",
  },

  fr: {
    kicker: "studio · une personne",
    h1: "graphiste de formation,",
    h1akzent: "qui a appris à construire.",
    lead:
      "C'est pourquoi mes sites ne se contentent pas d'être beaux, ils tournent. Design, développement et un CMS maison d'une seule main · pas d'agence, pas d'intermédiaire.",

    kammer: {
      satz: "J'ai commencé avec WordPress.",
      betont: "C'est pour ça que je construis tout moi-même.",
    },

    cmsH2: "tu le gères toi-même.",
    cmsLead: "Tape dedans. C'est réel.",

    personH2: "qui construit ça.",
    bio: "Je suis Nicolas. Graphiste de formation, qui a appris à construire.",
    bioSub:
      "Pas d'agence, pas d'intermédiaire. Tu parles à celui qui construit. À côté, je mixe · trance, progressive, breakbeats.",
    portraitAlt: "poste de travail la nuit · la lumière vient de l'écran",

    wegH2: "comment j'en suis arrivé là",
    weg: [
      ["formation · web", "Chez Pixelbar, avec WordPress. J'y ai appris comment il ne faut pas faire."],
      ["formation · graphisme", "Chez Pavonet, avec un peu de signalétique. Embauché ensuite."],
      ["colop arts & crafts", "Graphisme et packaging."],
      ["cloth kreativbüro", "Quelques mois en studio créatif."],
      ["nexo", "Indépendant avec deux amies, comme webdesigner."],
      ["lacønis", "Ici. Tout construit moi-même, CMS maison, pas d'intermédiaire."],
    ],

    grenzeH2: "ce que je ne fais pas.",
    grenze: ["stratégie graphique", "campagnes", "social media"],
    grenzeFuss:
      "D'autres font mieux que moi. Je les fais venir, tu gardes un seul interlocuteur : moi.",

    preisH2: "ce que ça coûte.",
    preis:
      "Je te le dis après un court échange. Une grille tarifaire mentirait différemment sur chaque projet · deux sites avec autant de pages peuvent varier du simple au double.",
    preisKey: "en parler →",

    schluss: { satz: "raconte-moi.", key: "écris-moi", oder: "ou directement à" },
    fussImpressum: "mentions légales",
    fussDatenschutz: "confidentialité",
  },

  en: {
    kicker: "studio · one person",
    h1: "trained graphic designer,",
    h1akzent: "who learned to build.",
    lead:
      "That's why my sites don't just look right, they run. Design, development and an in-house CMS from one hand · no agency, no middle layer.",

    kammer: {
      satz: "I started out with WordPress.",
      betont: "That's why I build everything myself now.",
    },

    cmsH2: "you maintain it yourself.",
    cmsLead: "Type in it. It's real.",

    personH2: "who builds this.",
    bio: "I'm Nicolas. A trained graphic designer who learned to build.",
    bioSub:
      "No agency, no middle layer. You talk to the person who builds. On the side I DJ · trance, progressive, breakbeats.",
    portraitAlt: "workspace at night · the light comes from the screen",

    wegH2: "how it came to this",
    weg: [
      ["apprenticeship · web", "At Pixelbar, with WordPress. That's where I learned how not to do it."],
      ["apprenticeship · graphics", "At Pavonet, plus a bit of signage. Taken on afterwards."],
      ["colop arts & crafts", "Graphics and packaging design."],
      ["cloth kreativbüro", "A few months at a creative studio."],
      ["nexo", "Went freelance with two friends, as a web designer."],
      ["lacønis", "This. All built myself, own CMS, no middle layer."],
    ],

    grenzeH2: "what I don't do.",
    grenze: ["graphic strategy", "campaigns", "social media"],
    grenzeFuss:
      "Others do it better than me. I bring them in, you still have one contact person: me.",

    preisH2: "what it costs.",
    preis:
      "I'll tell you after a short conversation. A price list would lie differently on every project · two sites with the same number of pages can differ by a factor of two.",
    preisKey: "let's talk →",

    schluss: { satz: "tell me about it.", key: "write to me", oder: "or straight to" },
    fussImpressum: "legal notice",
    fussDatenschutz: "privacy",
  },
};
