import type { Locale } from "@/i18n/config";
import type { QA } from "@/components/ueber/PresetKeys";

/**
 * Copy von /ueber-mich · dreisprachig.
 *
 * die tastenbank beantwortet die fragen, die leute einem einzelkämpfer
 * wirklich stellen · inklusive der unangenehmen. „was, wenn du
 * ausfällst" ehrlich zu beantworten wirkt stärker als sie wegzulassen,
 * weil jeder besucher sie ohnehin denkt.
 *
 * trenner ist immer „·" · nie ein binde- oder gedankenstrich.
 */

export type UeberDict = {
  kicker: string;
  h1a: string;
  h1b: string;
  bio: string;
  bioSub: string;
  tags: string[];

  fragH2: string;
  fragHint: string;
  fragen: QA[];

  wegH2: string;
  wegLead: string;
  /* KEINE jahreszahlen mehr · „seit 2019" war frei erfunden, und
     „seit april 2026" ist zwar wahr, aber kein verkaufsargument.
     die reihenfolge erzählt die geschichte, nicht die zahlen. */
  weg: [string, string][];

  /* was er NICHT macht · dieselbe rhetorik wie die streichliste auf
     der startseite: die grenze ist die aussage. er koordiniert, der
     kunde hat eine ansprechperson. */
  partnerH2: string;
  partnerLead: string;
  partner: [string, string][];
  partnerFuss: string;

  theseH2: string;
  these: string[];
  theseMark: string;
  theseFrom: string;

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const UEBER: Record<Locale, UeberDict> = {
  de: {
    kicker: "über mich",
    h1a: "einer.",
    h1b: "mehr nicht.",
    bio: "Ich bin Nicolas. Gelernter Grafikdesigner, der bauen gelernt hat · deshalb sehen meine Seiten nicht nur aus, sie laufen auch.",
    bioSub: "Keine Agentur, keine Zwischenschicht. Du redest mit dem, der auch baut.",
    tags: ["design", "entwicklung", "eigenes cms", "remote"],

    fragH2: "frag mich was.",
    fragHint: "eine taste drücken · die vorherige springt hoch",
    fragen: [
      { q: "arbeitest du wirklich allein?", a: "Ja. Wenn du mir schreibst, antworte ich. Wenn deine Seite gebaut wird, baue ich sie." },
      { q: "und wenn du ausfällst?", a: "Dann steht dein Projekt kurz. Dafür gehören Code, Domain und alle Zugänge dir. Du sitzt nie fest." },
      { q: "warum kein wordpress?", a: "Weil ich damit angefangen habe. Der Web-Teil meiner Ausbildung lief komplett darauf. Ich hab es gemacht und bin rausgegangen." },
      { q: "kannst du auch grösser?", a: "Mehrsprachig mit CMS und Shop: ja. Ein Portal mit fünfzig Redakteuren: da sage ich dir das vorher." },
      { q: "woher kommt der name?", a: "Von lakonisch. Knapp gesagt, viel gemeint." },
    ],

    wegH2: "wie es dazu kam.",
    wegLead: "Keine Drei-Seiten-Biografie. Die Reihenfolge reicht.",
    weg: [
      ["ausbildung · web", "Bei Pixelbar, mit WordPress. Da hab ich gelernt, wie es nicht geht · und warum ich heute alles selbst baue."],
      ["ausbildung · grafik", "Bei Pavonet, dazu ein bisschen Werbetechnik. Danach übernommen."],
      ["colop arts & crafts", "Grafik und Packaging Design."],
      ["cloth kreativbüro", "Ein paar Monate im Kreativbüro."],
      ["nexo", "Mit zwei Freundinnen selbstständig gemacht, als Webdesigner. we-are-nexo.com"],
      ["lacønis", "Das hier. Alles selbst gebaut, eigenes CMS, keine Zwischenschicht."],
    ],

    partnerH2: "was ich nicht mache.",
    partnerLead: "Ich baue Websites. Grafik-Strategie und Social Media können andere besser.",
    partner: [
      ["grafik & branding", "Logo, Erscheinungsbild, Druck."],
      ["strategie", "Positionierung, Botschaft, wer überhaupt angesprochen wird."],
      ["social media", "Redaktionsplan, Inhalte, laufende Betreuung."],
    ],
    partnerFuss: "Du hast trotzdem nur eine Ansprechperson: mich.",

    theseH2: "worauf das hinausläuft.",
    these: [
      "die besten marken",
      "kommen nicht von",
      "agenturen mit",
      "vierzig leuten.",
      "sie kommen von",
      "einer person,",
      "die zuhört.",
    ],
    theseMark: "zuhört",
    theseFrom: "meine arbeitsthese",

    ctaH2: "soweit in kurz. reden wir?",
    ctaBody:
      "Mehr über dich als über mich, am liebsten. Schreib mir kurz, was du vorhast · das kostet nichts und verpflichtet zu nichts.",
    ctaPrimary: "schreib mir",
    ctaSecondary: "meine arbeiten",
  },

  fr: {
    kicker: "à propos",
    h1a: "une personne.",
    h1b: "pas plus.",
    bio: "Je suis Nicolas. Graphiste de formation qui a appris à construire · c'est pour ça que mes sites ne se contentent pas d'être beaux, ils tournent.",
    bioSub: "Pas d'agence, pas d'intermédiaire. Tu parles à celui qui construit.",
    tags: ["design", "développement", "cms maison", "remote"],

    fragH2: "pose-moi une question.",
    fragHint: "appuie sur une touche · la précédente remonte",
    fragen: [
      { q: "tu travailles vraiment seul ?", a: "Oui. Si tu m'écris, c'est moi qui réponds. Si ton site se construit, c'est moi qui le construis." },
      { q: "et si tu tombes malade ?", a: "Ton projet s'arrête un moment. En échange, le code, le domaine et tous les accès sont à toi. Tu n'es jamais coincé." },
      { q: "pourquoi pas wordpress ?", a: "Parce que j'ai commencé avec. Toute la partie web de ma formation tournait dessus. Je l'ai fait, et j'en suis sorti." },
      { q: "tu peux faire plus gros ?", a: "Multilingue avec CMS et boutique : oui. Un portail avec cinquante rédacteurs : je te le dis avant." },
      { q: "d'où vient le nom ?", a: "De laconique. Peu de mots, beaucoup de sens." },
    ],

    wegH2: "comment j'en suis arrivé là.",
    wegLead: "Pas de biographie sur trois pages. L'ordre suffit.",
    weg: [
      ["formation · web", "Chez Pixelbar, avec WordPress. C'est là que j'ai appris comment il ne faut pas faire · et pourquoi je construis tout moi-même aujourd'hui."],
      ["formation · graphisme", "Chez Pavonet, plus un peu de signalétique. Embauché ensuite."],
      ["colop arts & crafts", "Graphisme et packaging."],
      ["cloth kreativbüro", "Quelques mois en studio créatif."],
      ["nexo", "Indépendant avec deux amies, comme webdesigner. we-are-nexo.com"],
      ["lacønis", "Ce que tu vois ici. Tout construit moi-même, CMS maison, pas d'intermédiaire."],
    ],

    partnerH2: "ce que je ne fais pas.",
    partnerLead: "Je construis des sites. Stratégie graphique et social media, d'autres font mieux.",
    partner: [
      ["graphisme & branding", "Logo, identité visuelle, impression."],
      ["stratégie", "Positionnement, message, à qui on parle vraiment."],
      ["réseaux sociaux", "Plan éditorial, contenus, suivi."],
    ],
    partnerFuss: "Tu gardes un seul interlocuteur : moi.",

    theseH2: "ce que ça donne.",
    these: [
      "les meilleures",
      "marques ne viennent",
      "pas d'agences à",
      "quarante personnes.",
      "elles viennent",
      "d'une personne",
      "qui écoute.",
    ],
    theseMark: "écoute",
    theseFrom: "ma thèse de travail",

    ctaH2: "voilà pour le court. on parle ?",
    ctaBody:
      "Plutôt de toi que de moi, de préférence. Écris-moi vite ce que tu prévois · ça ne coûte rien et n'engage à rien.",
    ctaPrimary: "écris-moi",
    ctaSecondary: "mes travaux",
  },

  en: {
    kicker: "about",
    h1a: "one person.",
    h1b: "that's it.",
    bio: "I'm Nicolas. A trained graphic designer who learned to build · which is why my sites do not just look right, they run.",
    bioSub: "No agency, no middle layer. You talk to the person who builds.",
    tags: ["design", "development", "in-house cms", "remote"],

    fragH2: "ask me something.",
    fragHint: "press a key · the previous one pops back up",
    fragen: [
      { q: "do you really work alone?", a: "Yes. If you write to me, I answer. If your site gets built, I build it." },
      { q: "what if you drop out?", a: "Your project pauses. In exchange, the code, domain and every access belong to you. You are never stuck." },
      { q: "why no wordpress?", a: "Because I started with it. The whole web part of my training ran on it. I did it, and I walked out." },
      { q: "can you go bigger?", a: "Multilingual with CMS and shop: yes. A portal with fifty editors: I'll tell you that up front." },
      { q: "where does the name come from?", a: "From laconic. Few words, much meant." },
    ],

    wegH2: "how it came to this.",
    wegLead: "No three-page biography. The order is enough.",
    weg: [
      ["training · web", "At Pixelbar, with WordPress. That is where I learned how not to do it · and why I build everything myself today."],
      ["training · graphic design", "At Pavonet, plus a bit of signage. Taken on afterwards."],
      ["colop arts & crafts", "Graphic design and packaging."],
      ["cloth kreativbüro", "A few months at a creative studio."],
      ["nexo", "Went self-employed with two friends, as a web designer. we-are-nexo.com"],
      ["lacønis", "This. All built myself, own CMS, no layer in between."],
    ],

    partnerH2: "what i do not do.",
    partnerLead: "I build websites. Graphic strategy and social media, others do better.",
    partner: [
      ["graphic design & branding", "Logo, visual identity, print."],
      ["strategy", "Positioning, message, who is actually being addressed."],
      ["social media", "Editorial plan, content, ongoing care."],
    ],
    partnerFuss: "You still have one contact person: me.",

    theseH2: "what it comes down to.",
    these: [
      "the best brands",
      "don't come from",
      "agencies with",
      "forty people.",
      "they come from",
      "one person",
      "who listens.",
    ],
    theseMark: "listens",
    theseFrom: "my working thesis",

    ctaH2: "that's the short version. shall we talk?",
    ctaBody:
      "More about you than about me, preferably. Write me briefly what you're planning · it costs nothing and commits to nothing.",
    ctaPrimary: "write me",
    ctaSecondary: "my work",
  },
};
