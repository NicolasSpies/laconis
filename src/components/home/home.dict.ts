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

  /* greenfield ZUERST, übernahme danach · vorher sprach die
     startseite nur leute mit bestehender seite an */
  ad: {
    label: string; h2a: string; h2b: string; hinweis: string;
    seiteTitel: string; seiteText: string; seiteKnopf: string; fuss: string;
  };
  vn: { h2a: string; h2b: string; lead: string; schritte: string[]; key: string };
  ub: {
    h2a: string; h2b: string; lead: string; alt: string; neu: string;
    posten: [string, string][]; griff: string; schluss: string;
  };

  refH2: string;
  refHint: string;
  refLink: string;

  sl: { gravur: string; hinweis: string; key: string; oder: string };
  /* auf keiner geräte-seite gab es bisher einen link zu impressum
     oder datenschutz · in belgien pflicht */
  fussImpressum: string;
  fussDatenschutz: string;
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

    ad: {
      label: "das ist kein bild",
      h2a: "änder das hier.",
      h2b: "jetzt.",
      hinweis: "klick rein und tipp",
      seiteTitel: "Baumpflege in deiner Nähe",
      seiteText: "Wir schneiden, fällen und pflegen · seit 2011, mit Seilklettertechnik statt Hebebühne.",
      seiteKnopf: "termin anfragen",
      fuss: "So pflegst du deine Seite später auch: anklicken, tippen, fertig. Kein Login-Labyrinth, keine Schulung, kein Anruf bei mir.",
    },
    vn: {
      h2a: "du hast noch",
      h2b: "gar nichts?",
      lead: "Das ist der einfachere Fall. Keine Altlasten, keine Weiterleitungsliste, kein „das war schon immer so\".",
      schritte: [
        "du erzählst mir, was du machst",
        "ich schreibe und baue",
        "du sagst, was fehlt",
        "dann steht sie",
      ],
      key: "so läuft das",
    },
    ub: {
      h2a: "du hast schon eine seite?",
      h2b: "die zieht einfach um.",
      lead: "Zieh am Griff, dann siehst du, was rübergeht.",
      alt: "deine seite heute",
      neu: "deine seite danach",
      posten: [
        ["texte", "übernommen"],
        ["bilder", "übernommen"],
        ["adressen", "301 weitergeleitet"],
        ["rankings", "bleiben"],
        ["alte seite", "online bis zum umschalten"],
      ],
      griff: "zieh rüber",
      schluss: "und du hast mir vorher nichts geschickt.",
    },
    refH2: "drei projekte.",
    refHint: "Fahr über eine Schicht, dann hebt sie sich raus. Klick führt rein.",
    refLink: "alle referenzen",

    sl: {
      gravur: "sag mir, was du vorhast.",
      hinweis: "Zwei Sätze reichen: was du machst, und was die Seite können soll. Den Rest frage ich.",
      key: "schreib mir",
      oder: "oder direkt an",
    },
    fussImpressum: "impressum",
    fussDatenschutz: "datenschutz",
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

    ad: {
      label: "ce n'est pas une image",
      h2a: "change ça.",
      h2b: "maintenant.",
      hinweis: "clique dedans et tape",
      seiteTitel: "Élagage près de chez toi",
      seiteText: "On taille, on abat, on entretient · depuis 2011, en grimpe sur corde plutôt qu'en nacelle.",
      seiteKnopf: "demander un rendez-vous",
      fuss: "C'est comme ça que tu géreras ton site plus tard : cliquer, taper, fini. Pas de labyrinthe de connexion, pas de formation, pas d'appel à moi.",
    },
    vn: {
      h2a: "tu n'as encore",
      h2b: "rien du tout ?",
      lead: "C'est le cas le plus simple. Pas d'héritage, pas de liste de redirections, pas de « ça a toujours été comme ça ».",
      schritte: [
        "tu me racontes ce que tu fais",
        "j'écris et je construis",
        "tu me dis ce qui manque",
        "et il est là",
      ],
      key: "comment ça marche",
    },
    ub: {
      h2a: "tu as déjà un site ?",
      h2b: "il déménage, simplement.",
      lead: "Tire sur la poignée pour voir ce qui passe de l'autre côté.",
      alt: "ton site aujourd'hui",
      neu: "ton site après",
      posten: [
        ["textes", "repris"],
        ["images", "reprises"],
        ["adresses", "redirigées en 301"],
        ["positions", "conservées"],
        ["ancien site", "en ligne jusqu'à la bascule"],
      ],
      griff: "tire",
      schluss: "et tu ne m'as rien envoyé avant.",
    },
    refH2: "trois projets.",
    refHint: "Survole une couche, elle se soulève. Un clic et tu es dedans.",
    refLink: "toutes les références",

    sl: {
      gravur: "dis-moi ce que tu prépares.",
      hinweis: "Deux phrases suffisent : ce que tu fais, et ce que le site doit savoir faire. Le reste, je le demande.",
      key: "écris-moi",
      oder: "ou directement à",
    },
    fussImpressum: "mentions légales",
    fussDatenschutz: "confidentialité",
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

    ad: {
      label: "this is not an image",
      h2a: "change this.",
      h2b: "right now.",
      hinweis: "click in and type",
      seiteTitel: "Tree care near you",
      seiteText: "We prune, fell and maintain · since 2011, on ropes rather than lifts.",
      seiteKnopf: "request an appointment",
      fuss: "This is how you will maintain your site later: click, type, done. No login maze, no training, no call to me.",
    },
    vn: {
      h2a: "you have",
      h2b: "nothing yet?",
      lead: "That is the easier case. No legacy, no redirect list, no \"it has always been like that\".",
      schritte: [
        "you tell me what you do",
        "i write and build",
        "you say what is missing",
        "then it stands",
      ],
      key: "how it works",
    },
    ub: {
      h2a: "you already have a site?",
      h2b: "it simply moves over.",
      lead: "Pull the handle and see what comes across.",
      alt: "your site today",
      neu: "your site after",
      posten: [
        ["text", "carried over"],
        ["images", "carried over"],
        ["addresses", "301 redirected"],
        ["rankings", "kept"],
        ["old site", "live until the switch"],
      ],
      griff: "pull it over",
      schluss: "and you sent me nothing beforehand.",
    },
    refH2: "what's already running.",
    refHint: "Hover a layer and it lifts out. A click takes you in.",
    refLink: "all work",

    sl: {
      gravur: "tell me what you are planning.",
      hinweis: "Two sentences are enough: what you do, and what the site should be able to do. I will ask for the rest.",
      key: "write to me",
      oder: "or straight to",
    },
    fussImpressum: "legal notice",
    fussDatenschutz: "privacy",
  },
};
