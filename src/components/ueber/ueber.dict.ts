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
  weg: [string, string, string][];

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
    bio: "Ich bin Nicolas. Designer und Web-Entwickler seit 2019, seit 2026 in Vollzeit als lacønis.",
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
        a: "Ich hab damit angefangen, 2019, für einen Freund. 2023 bin ich raus. Nicht aus Prinzip, sondern weil ich keine Lust mehr hatte, für Ladezeiten geradezustehen, die dreissig fremde Plugins bestimmen.",
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
    wegLead: "Keine Drei-Seiten-Biografie. Fünf Punkte reichen.",
    weg: [
      ["2019", "erste website", "Für einen Freund eine WordPress-Seite gebastelt. Der Haken sass tief."],
      ["2021", "nebenberuflich", "Erste echte Kunden. Und die ersten „mach ich für lau\"-Fehler, die man genau einmal macht."],
      ["2023", "raus aus wordpress", "Alles selbst gebaut, von null. Seitdem keine Plugin-Hölle mehr und keine Ausreden."],
      ["2025", "lacønis als marke", "Aus „Nicolas macht Websites\" wird ein Name, eine Handschrift, eine Haltung."],
      ["2026", "vollzeit", "Kein Nebenher mehr. Nur noch das hier."],
    ],

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
    bio: "Je suis Nicolas. Designer et développeur web depuis 2019, à plein temps sous lacønis depuis 2026.",
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
        a: "J'ai commencé avec, en 2019, pour un ami. En 2023 je suis sorti. Pas par principe, mais parce que je n'avais plus envie de répondre de temps de chargement décidés par trente plugins étrangers.",
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

    wegH2: "comment on en arrive là.",
    wegLead: "Pas de biographie en trois pages. Cinq points suffisent.",
    weg: [
      ["2019", "premier site", "Un site WordPress bricolé pour un ami. L'hameçon était bien planté."],
      ["2021", "en parallèle", "Premiers vrais clients. Et les premières erreurs « je le fais gratuit » qu'on ne fait qu'une fois."],
      ["2023", "sortie de wordpress", "Tout construit moi-même, de zéro. Depuis, plus d'enfer des plugins et plus d'excuses."],
      ["2025", "lacønis comme marque", "« Nicolas fait des sites » devient un nom, une écriture, une position."],
      ["2026", "plein temps", "Plus rien à côté. Uniquement ça."],
    ],

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
    bio: "I'm Nicolas. Designer and web developer since 2019, full time as lacønis since 2026.",
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
        a: "I started with it, in 2019, for a friend. In 2023 i got out. Not on principle, but because i was done answering for load times that thirty foreign plugins decide.",
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

    wegH2: "how it got here.",
    wegLead: "No three-page biography. Five points are enough.",
    weg: [
      ["2019", "first website", "Cobbled together a WordPress site for a friend. The hook went in deep."],
      ["2021", "on the side", "First real clients. And the first \"i'll do it for free\" mistakes you only make once."],
      ["2023", "out of wordpress", "Built everything myself, from scratch. No plugin hell since, and no excuses."],
      ["2025", "lacønis as a brand", "\"Nicolas makes websites\" becomes a name, a handwriting, a position."],
      ["2026", "full time", "Nothing on the side any more. Only this."],
    ],

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
