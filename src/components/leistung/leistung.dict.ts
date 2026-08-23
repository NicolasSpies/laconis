import type { Locale } from "@/i18n/config";
import type { FeatureT } from "@/components/leistung/FeatureVergleich";

/**
 * Copy der leistungs-seite · dreisprachig.
 *
 * schreibregeln (sitewide): titel klein, fliesstext normale gross-/
 * kleinschreibung, trenner ist immer „·" · nie ein binde- oder
 * gedankenstrich.
 */

export type LeistungDict = {
  hero: { kicker: string; l1: string; l2: string; l3: string; sub: string; hint: string };

  ballastH2: string;
  ballastLead: string;
  vergleich: FeatureT;

  cmsH2: string;
  cmsLead: string;
  editor: {
    panel: string;
    fieldHeadline: string;
    fieldButton: string;
    accent: string;
    imageBlock: string;
    imageHint: string;
    publish: string;
    steps: [string, string, string];
    done: string;
    placeholderHeadline: string;
    placeholderButton: string;
    bodyCopy: string;
    url: string;
  };

  ctaH2: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export const LEISTUNG: Record<Locale, LeistungDict> = {
  de: {
    hero: {
      kicker: "leistung · web",
      l1: "websites,",
      l2: "die vorne",
      l3: "stehen.",
      sub: "Von null gebaut. Kein Template, kein Plugin-Stapel, keine Decke nach oben.",
      hint: "zieh das glas · schau drunter",
    },

    ballastH2: "was passiert, wenn die seite mehr können soll.",
    ballastLead: "Schalt zu, was du brauchst.",
    vergleich: {
      label: "was die seite können soll",
      colPlugins: "mit plugins gebaut",
      colMine: "bei mir gebaut",
      mineNote: "Kein Zukauf, kein fremdes JavaScript. Die Felder dafür sind schon im CMS.",
      gErweiterungen: "erweiterungen",
      gAnbieter: "anbieter",
      none: "nichts zugeschaltet",
      builtIn: "eingebaut",
      kommt: "kommt",
      hint: "Gezählt, nicht geschätzt. „Anbieter\u201c zählt Core und Theme mit. Newsletter kommt noch.",
      verdicts: [
        "Zwei leere Seiten. Ab hier wird es interessant.",
        "Rechts sind die Felder schon da. Links kommt für jede Funktion ein fremdes Stück Software dazu.",
        "Und das ist der ganze Unterschied: rechts hängst du an einem Anbieter, links an einem Dutzend · jeder mit eigenem Update-Rhythmus.",
      ],
      features: [
        { key: "i18n", label: "mehrsprachigkeit", plugin: "WPML" },
        { key: "ki", label: "ki-übersetzung", plugin: "WPML AI · Zusatzmodul" },
        { key: "felder", label: "eigene inhaltsfelder", plugin: "Advanced Custom Fields" },
        { key: "bild", label: "bildoptimierung", plugin: "ShortPixel" },
        { key: "form", label: "kontaktformular", plugin: "Contact Form 7" },
        { key: "shop", label: "shop", plugin: "WooCommerce" },
        { key: "stats", label: "basic analytics", plugin: "Analytics-Plugin" },
        { key: "news", label: "newsletter", plugin: "Mailchimp for WP", kommt: true },
      ],
    },

    cmsH2: "das pflegst du selbst.",
    cmsLead: "Tipp rein. Es ist echt.",
    editor: {
      panel: "contentcore · editor",
      fieldHeadline: "überschrift",
      fieldButton: "knopf-text",
      accent: "akzentfarbe",
      imageBlock: "bild-block",
      imageHint: "zeigt oder versteckt die bildfläche",
      publish: "veröffentlichen",
      steps: ["build läuft", "dateien gehen raus", "cache wird geleert"],
      done: "live",
      placeholderHeadline: "Deine Überschrift.",
      placeholderButton: "jetzt anfragen",
      bodyCopy:
        "Diese Vorschau bearbeitest du gerade wirklich. Kein Video, kein Mockup. So sieht das Pult aus, das du nach der Übergabe bekommst.",
      url: "deine-domain.be",
    },

    ctaH2: "erzähl mir, was du vorhast.",
    ctaBody: "Kurzes Gespräch, kostet nichts.",
    ctaPrimary: "schreib mir",
    ctaSecondary: "preise ansehen",
  },

  fr: {
    hero: {
      kicker: "prestation · web",
      l1: "des sites",
      l2: "qui passent",
      l3: "devant.",
      sub: "Construits de zéro. Pas de template, pas de pile de plugins, pas de plafond.",
      hint: "tire la loupe · regarde dessous",
    },

    ballastH2: "ce qui se passe quand le site doit en faire plus.",
    ballastLead: "Active ce dont tu as besoin.",
    vergleich: {
      label: "ce que le site doit savoir faire",
      colPlugins: "construit avec plugins",
      colMine: "construit chez moi",
      mineNote: "Pas d'achat, pas de JavaScript étranger. Les champs sont déjà dans le CMS.",
      gErweiterungen: "extensions",
      gAnbieter: "fournisseurs",
      none: "rien d'activé",
      builtIn: "intégré",
      kommt: "à venir",
      hint: "Compté, pas estimé. « Fournisseurs » inclut le core et le thème. La newsletter arrive.",
      verdicts: [
        "Deux pages vides. C'est à partir d'ici que ça devient intéressant.",
        "À droite les champs sont déjà là. À gauche, chaque fonction ajoute un logiciel étranger.",
        "Et c'est toute la différence : à droite tu dépends d'un fournisseur, à gauche d'une douzaine · chacun avec son propre rythme de mises à jour.",
      ],
      features: [
        { key: "i18n", label: "multilingue", plugin: "WPML" },
        { key: "ki", label: "traduction ia", plugin: "WPML AI · module" },
        { key: "felder", label: "champs de contenu", plugin: "Advanced Custom Fields" },
        { key: "bild", label: "optimisation d'images", plugin: "ShortPixel" },
        { key: "form", label: "formulaire", plugin: "Contact Form 7" },
        { key: "shop", label: "boutique", plugin: "WooCommerce" },
        { key: "stats", label: "analytics de base", plugin: "plugin analytics" },
        { key: "news", label: "newsletter", plugin: "Mailchimp for WP", kommt: true },
      ],
    },

    cmsH2: "ça, tu le gères toi-même.",
    cmsLead: "Tape dedans. C'est réel.",
    editor: {
      panel: "contentcore · éditeur",
      fieldHeadline: "titre",
      fieldButton: "texte du bouton",
      accent: "couleur d'accent",
      imageBlock: "bloc image",
      imageHint: "affiche ou masque la zone image",
      publish: "publier",
      steps: ["build en cours", "fichiers envoyés", "cache vidé"],
      done: "en ligne",
      placeholderHeadline: "Ton titre.",
      placeholderButton: "demander un devis",
      bodyCopy:
        "Cet aperçu, tu es vraiment en train de le modifier. Pas une vidéo, pas une maquette. Voilà le pupitre que tu reçois à la livraison.",
      url: "ton-domaine.be",
    },

    ctaH2: "raconte-moi ce que tu prépares.",
    ctaBody: "Court échange, gratuit.",
    ctaPrimary: "écris-moi",
    ctaSecondary: "voir les prix",
  },

  en: {
    hero: {
      kicker: "service · web",
      l1: "websites",
      l2: "that come",
      l3: "out front.",
      sub: "Built from scratch. No template, no plugin stack, no ceiling.",
      hint: "drag the glass · look underneath",
    },

    ballastH2: "what happens when the site needs to do more.",
    ballastLead: "Switch on what you need.",
    vergleich: {
      label: "what the site should be able to do",
      colPlugins: "built with plugins",
      colMine: "built with me",
      mineNote: "Nothing bought in, no foreign JavaScript. The fields for it are already in the CMS.",
      gErweiterungen: "extensions",
      gAnbieter: "vendors",
      none: "nothing switched on",
      builtIn: "built in",
      kommt: "coming",
      hint: "Counted, not estimated. \u201cVendors\u201d includes core and theme. Newsletter is still coming.",
      verdicts: [
        "Two empty pages. This is where it gets interesting.",
        "On the right the fields are already there. On the left every feature adds someone else's software.",
        "And that is the whole difference: on the right you depend on one vendor, on the left on a dozen · each with its own update rhythm.",
      ],
      features: [
        { key: "i18n", label: "multilingual", plugin: "WPML" },
        { key: "ki", label: "ai translation", plugin: "WPML AI · add-on" },
        { key: "felder", label: "custom content fields", plugin: "Advanced Custom Fields" },
        { key: "bild", label: "image optimisation", plugin: "ShortPixel" },
        { key: "form", label: "contact form", plugin: "Contact Form 7" },
        { key: "shop", label: "shop", plugin: "WooCommerce" },
        { key: "stats", label: "basic analytics", plugin: "analytics plugin" },
        { key: "news", label: "newsletter", plugin: "Mailchimp for WP", kommt: true },
      ],
    },

    cmsH2: "you maintain this yourself.",
    cmsLead: "Type in it. It's real.",
    editor: {
      panel: "contentcore · editor",
      fieldHeadline: "headline",
      fieldButton: "button text",
      accent: "accent colour",
      imageBlock: "image block",
      imageHint: "shows or hides the image area",
      publish: "publish",
      steps: ["build running", "files shipping", "cache clearing"],
      done: "live",
      placeholderHeadline: "Your headline.",
      placeholderButton: "get in touch",
      bodyCopy:
        "You are genuinely editing this preview right now. Not a video, not a mockup. This is the desk you get at handover.",
      url: "your-domain.be",
    },

    ctaH2: "tell me what you're planning.",
    ctaBody: "Short conversation, costs nothing.",
    ctaPrimary: "write me",
    ctaSecondary: "see pricing",
  },
};
