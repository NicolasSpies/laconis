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
    bioSub:
      "Ich baue Websites, die sich nach den Leuten anfühlen, die dahinterstehen. Keine Agentur, keine Zwischenschicht. Du redest mit dem, der auch baut.",
    tags: ["design", "entwicklung", "eigenes cms", "remote"],

    fragH2: "frag mich was.",
    fragHint: "eine taste drücken · die vorherige springt hoch",
    fragen: [
      {
        q: "arbeitest du wirklich allein?",
        a: "Ja. Kein Team, keine Subunternehmer, kein Praktikant, der die Hälfte macht. Wenn du mir schreibst, antworte ich. Wenn deine Seite gebaut wird, baue ich sie. Das ist der ganze Trick, und es ist gleichzeitig die ganze Einschränkung.",
      },
      {
        q: "und wenn du ausfällst?",
        a: "Dann steht dein Projekt kurz. Das ist der ehrliche Nachteil an einer Person, und ich rede ihn nicht weg. Dafür gehören Code, Domain und alle Zugänge dir und laufen auf deinen Namen. Du sitzt nie fest, auch nicht bei mir.",
      },
      {
        q: "warum kein wordpress?",
        a: "Weil ich damit angefangen habe. Der Web-Teil meiner Ausbildung lief komplett auf WordPress · da hab ich gelernt, wie es nicht geht. Wer WordPress kritisiert, ohne es gemacht zu haben, ist ein Ideologe. Ich hab es gemacht und bin rausgegangen.",
      },
      {
        q: "kannst du auch grösser?",
        a: "Bis zu einem Punkt. Mehrsprachige Seite mit CMS und Shop: ja, das ist genau mein Bereich. Ein Portal mit fünfzig Redakteuren und Rollenrechten: da sage ich dir lieber vorher, dass du jemand anderen brauchst, als es hinterher zu merken.",
      },
      {
        q: "woher kommt der name?",
        a: "Von lakonisch. Knapp gesagt, viel gemeint. Passt zu dem, was ich baue, und ehrlich gesagt auch dazu, wie ich rede.",
      },
      {
        q: "was kostet es, dich zu fragen?",
        a: "Nichts. Ein Gespräch ist ein Gespräch. Und wenn dabei rauskommt, dass ich nicht der richtige für dein Projekt bin, sage ich dir das, statt dir ein Angebot zu schicken, das keinem hilft.",
      },
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
    partnerLead: "Ich baue Websites. Grafik-Strategie, Kampagnen und Social Media können andere besser als ich · und ich sage das lieber vorher als hinterher.",
    partner: [
      ["grafik & branding", "Logo, Erscheinungsbild, Druck."],
      ["strategie", "Positionierung, Botschaft, wer überhaupt angesprochen wird."],
      ["social media", "Redaktionsplan, Inhalte, laufende Betreuung."],
    ],
    partnerFuss: "Du hast trotzdem nur eine Ansprechperson: mich. Ich hole die Leute dazu und halte die Fäden zusammen.",

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
    bioSub:
      "Je construis des sites qui ressemblent aux gens derrière. Pas d'agence, pas d'intermédiaire. Tu parles à celui qui construit aussi.",
    tags: ["design", "développement", "cms maison", "remote"],

    fragH2: "pose-moi une question.",
    fragHint: "appuie sur une touche · la précédente remonte",
    fragen: [
      {
        q: "tu travailles vraiment seul ?",
        a: "Oui. Pas d'équipe, pas de sous-traitants, pas de stagiaire qui fait la moitié. Si tu m'écris, je réponds. Si ton site se construit, c'est moi qui le construis. C'est tout l'intérêt, et c'est aussi toute la limite.",
      },
      {
        q: "et si tu tombes malade ?",
        a: "Alors ton projet s'arrête un moment. C'est le vrai inconvénient d'une seule personne, et je ne vais pas le maquiller. En échange, le code, le domaine et tous les accès t'appartiennent et sont à ton nom. Tu n'es jamais coincé, même pas avec moi.",
      },
      {
        q: "pourquoi pas wordpress ?",
        a: "Parce que j'ai commencé avec. La partie web de ma formation tournait entièrement sur WordPress · c'est là que j'ai appris comment il ne faut pas faire. Critiquer WordPress sans l'avoir pratiqué, c'est de l'idéologie. Moi je l'ai pratiqué, puis je suis sorti.",
      },
      {
        q: "tu peux faire plus grand ?",
        a: "Jusqu'à un point. Site multilingue avec CMS et boutique : oui, c'est exactement mon terrain. Un portail avec cinquante rédacteurs et des rôles : là je préfère te dire avant que tu as besoin de quelqu'un d'autre, plutôt que de le découvrir après.",
      },
      {
        q: "d'où vient le nom ?",
        a: "De laconique. Dire peu, signifier beaucoup. Ça colle à ce que je construis, et franchement aussi à ma façon de parler.",
      },
      {
        q: "ça coûte quoi de te demander ?",
        a: "Rien. Un échange reste un échange. Et s'il en ressort que je ne suis pas le bon pour ton projet, je te le dis, au lieu de t'envoyer une offre qui n'aide personne.",
      },
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
    partnerLead: "Je construis des sites. La stratégie graphique, les campagnes et les réseaux sociaux, d'autres le font mieux que moi · et je préfère le dire avant qu'après.",
    partner: [
      ["graphisme & branding", "Logo, identité visuelle, impression."],
      ["stratégie", "Positionnement, message, à qui on parle vraiment."],
      ["réseaux sociaux", "Plan éditorial, contenus, suivi."],
    ],
    partnerFuss: "Tu n'as quand même qu'un seul interlocuteur : moi. Je fais venir les gens et je tiens les fils.",

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
    bioSub:
      "I build websites that feel like the people behind them. No agency, no middle layer. You talk to the person who also builds.",
    tags: ["design", "development", "in-house cms", "remote"],

    fragH2: "ask me something.",
    fragHint: "press a key · the previous one pops back up",
    fragen: [
      {
        q: "do you really work alone?",
        a: "Yes. No team, no subcontractors, no intern doing half of it. If you write to me, i answer. If your site gets built, i build it. That's the whole point, and it's also the whole limitation.",
      },
      {
        q: "what if you drop out?",
        a: "Then your project stops for a while. That's the honest downside of one person and i'm not going to dress it up. In return, the code, the domain and every access belong to you and are in your name. You're never stuck, not even with me.",
      },
      {
        q: "why not wordpress?",
        a: "Because i started with it. The web part of my training ran entirely on WordPress · that is where i learned how not to do it. Criticising WordPress without having worked in it is ideology. I worked in it, and then i left.",
      },
      {
        q: "can you go bigger?",
        a: "Up to a point. Multilingual site with CMS and shop: yes, that's exactly my ground. A portal with fifty editors and role permissions: there i'd rather tell you up front that you need someone else than have you find out later.",
      },
      {
        q: "where does the name come from?",
        a: "From laconic. Say little, mean a lot. It fits what i build, and honestly also how i talk.",
      },
      {
        q: "what does asking you cost?",
        a: "Nothing. A conversation is a conversation. And if it turns out i'm not the right person for your project, i'll tell you, instead of sending an offer that helps nobody.",
      },
    ],

    wegH2: "how it came to this.",
    wegLead: "No three-page biography. The order is enough.",
    weg: [
      ["training · web", "At Pixelbar, with WordPress. That is where i learned how not to do it · and why i build everything myself today."],
      ["training · graphic design", "At Pavonet, plus a bit of signage. Taken on afterwards."],
      ["colop arts & crafts", "Graphic design and packaging."],
      ["cloth kreativbüro", "A few months at a creative studio."],
      ["nexo", "Went self-employed with two friends, as a web designer. we-are-nexo.com"],
      ["lacønis", "This. All built myself, own CMS, no layer in between."],
    ],

    partnerH2: "what i do not do.",
    partnerLead: "I build websites. Graphic strategy, campaigns and social media are done better by others · and i would rather say so up front than afterwards.",
    partner: [
      ["graphic design & branding", "Logo, visual identity, print."],
      ["strategy", "Positioning, message, who is actually being addressed."],
      ["social media", "Editorial plan, content, ongoing care."],
    ],
    partnerFuss: "You still have only one contact: me. I bring the people in and hold the threads together.",

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
