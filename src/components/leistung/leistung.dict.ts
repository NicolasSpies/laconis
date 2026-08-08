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

  deliverH2: string;
  deliverLead: string;
  deliver: [string, string][];

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

  stackH2: string;
  stack: [string, string][];
  stackNote: string;

  faqH2: string;
  faq: [string, string][];

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

    deliverH2: "was am ende dasteht.",
    deliverLead:
      "Kein Paket, keine Stufen. Das hier steckt in jedem Projekt drin, egal wie gross es wird.",
    deliver: [
      ["Eine Seite, die es nur einmal gibt", "Design und Code entstehen für dich. Kein Theme, kein Baukasten, keine zehntausend Zwillinge im Netz."],
      ["Tempo, das bleibt", "Lighthouse 95+ am Launch und in zwei Jahren immer noch. Weil nichts drin ist, was mit der Zeit verrottet."],
      ["Ein CMS, das du selbst bedienst", "Eigenbau. Texte, Bilder, Preise änderst du selbst. Kein Plugin-Update um Mitternacht, keine Update-Angst."],
      ["SEO, das nicht nachgereicht wird", "Struktur, Ladezeit, Meta, Sitemap, strukturierte Daten. Ab dem ersten Commit drin statt hinterher draufgeklebt."],
      ["Deine alte Seite darf mit", "Inhalte, Bilder, Rankings kommen rüber. Alte Adressen bekommen saubere Weiterleitungen, die alte Seite bleibt bis zum Umschalten online."],
      ["Du kriegst den Schlüssel", "Code, Domain, Hosting-Zugang laufen auf deinen Namen. Kein Mietmodell, keine Geiselhaft, du kannst jederzeit gehen."],
    ],

    ballastH2: "was passiert, wenn die seite mehr können soll.",
    ballastLead:
      "Schalt zu, was du brauchst. Links wird jede Funktion ein zugekauftes Plugin · mit eigenem Anbieter, eigenem Update-Rhythmus, eigenem Risiko. Rechts ist sie Teil der Seite.",
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
      hint: "Gezählt, nicht geschätzt: die Plugin-Namen sind die, die man dafür üblicherweise nimmt, und „Anbieter\" zählt den WordPress-Core und das Theme mit · die sind da, bevor das erste Plugin dazukommt. Newsletter ist in ContentCore noch nicht drin und steht deshalb als „kommt\".",
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
    cmsLead:
      "Links tippen, rechts steht es. Genau so fühlt sich das später bei dir an. Probier es aus, es ist echt.",
    editor: {
      panel: "contentcore · editor",
      fieldHeadline: "überschrift",
      fieldButton: "knopf-text",
      accent: "akzentfarbe",
      imageBlock: "bild-block",
      imageHint: "zeigt oder versteckt die bildfläche",
      publish: "veröffentlichen",
      steps: ["build läuft", "dateien gehen raus", "cache wird geleert"],
      done: "live · 0.4 s",
      placeholderHeadline: "Deine Überschrift.",
      placeholderButton: "jetzt anfragen",
      bodyCopy:
        "Diese Vorschau bearbeitest du gerade wirklich. Kein Video, kein Mockup. So sieht das Pult aus, das du nach der Übergabe bekommst.",
      url: "deine-domain.be",
    },

    stackH2: "womit gebaut wird.",
    stack: [
      ["Next.js · React", "Serverseitig gerendert. Google bekommt fertige Seiten, keine Baustelle."],
      ["TypeScript", "Fehler fallen beim Bauen auf, nicht bei deinem Kunden."],
      ["Tailwind", "Ein Stil-System statt gewachsener CSS-Haufen. Auch in zwei Jahren noch änderbar."],
      ["ContentCore", "Mein eigenes CMS. Genau die Felder, die deine Seite braucht, und keins mehr."],
      ["Server in der EU", "Kein Umweg über Übersee, DSGVO ohne Kleingedrucktes."],
      ["Kein Fremd-Tracking", "Eigene Statistik ohne Cookie-Banner-Zirkus."],
    ],
    stackNote:
      "Kein WordPress, kein Wix, kein Webflow. Nicht aus Prinzip, sondern weil ich sonst für die Ladezeit nicht geradestehen kann.",

    faqH2: "bevor du fragst.",
    faq: [
      ["wie lange dauert das?", "Eine Seite mit klarem Inhalt zwei bis drei Wochen, eine mehrseitige Seite mit CMS drei bis fünf. Der grösste Hebel bist du: je schneller Texte und Bilder da sind, desto früher steht die Seite. Bei fester Deadline plane ich rückwärts."],
      ["kannst du meine bestehende seite übernehmen?", "Ja, das ist sogar der häufigste Fall. Ich ziehe deine alte Seite komplett, du schickst mir vorab nichts. Inhalte, Struktur und Rankings kommen mit, alte Adressen bekommen dauerhafte Weiterleitungen."],
      ["was, wenn ich später was ändern will?", "Dann änderst du es. Alles, was sich regelmässig ändert, landet im CMS und gehört dir. Für alles Grössere schreibst du mir, und ich bin nicht drei Wochen im Ticket-System unterwegs."],
      ["was kostet das?", "Richtwerte stehen offen auf der Preisseite. Eine belastbare Zahl kommt nach einem kurzen Gespräch, weil sie vom Umfang abhängt und nicht von einer Paketstufe."],
      ["und wenn ich später einen shop brauche?", "Dann wird er dazugebaut. Nichts an der Seite ist so verschraubt, dass ein neuer Bereich einen Neuanfang bedeutet. Genau dafür ist von null gebaut gut."],
      ["gehört mir das am ende wirklich?", "Ja. Code, Domain und Hosting laufen auf deinen Namen. Wenn du irgendwann jemand anderen willst, nimmst du alles mit. Ich halte nichts fest."],
    ],

    ctaH2: "erzähl mir, was du vorhast.",
    ctaBody:
      "Kurzes Gespräch, kein Pitch-Deck, kostet nichts. Danach weisst du, ob ich der richtige bin. Und wenn nicht, sage ich dir das auch.",
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

    deliverH2: "ce qui reste à la fin.",
    deliverLead:
      "Pas de forfait, pas de paliers. Tout ça est dans chaque projet, quelle que soit sa taille.",
    deliver: [
      ["Un site qui n'existe qu'une fois", "Design et code faits pour toi. Pas de thème, pas de constructeur, pas dix mille jumeaux sur le web."],
      ["Une vitesse qui tient", "Lighthouse 95+ au lancement et encore dans deux ans. Parce qu'il n'y a rien dedans qui pourrit avec le temps."],
      ["Un CMS que tu pilotes toi-même", "Fait maison. Textes, images, prix : tu changes toi-même. Pas de mise à jour de plugin à minuit."],
      ["Un SEO qui n'arrive pas après coup", "Structure, vitesse, méta, sitemap, données structurées. Dedans dès le premier commit."],
      ["Ton ancien site peut venir", "Contenus, images, positions Google suivent. Les anciennes adresses reçoivent des redirections propres et l'ancien site reste en ligne jusqu'à la bascule."],
      ["Tu reçois les clés", "Code, domaine, accès hébergement à ton nom. Pas de location, pas de prise d'otage, tu peux partir quand tu veux."],
    ],

    ballastH2: "ce qui se passe quand le site doit en faire plus.",
    ballastLead:
      "Active ce dont tu as besoin. À gauche, chaque fonction devient un plugin acheté qui traîne son propre JavaScript. À droite, elle fait partie du site.",
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
      hint: "Compté, pas estimé : les noms de plugins sont ceux qu'on prend habituellement, et « fournisseurs » compte le cœur de WordPress et le thème · ils sont là avant le premier plugin. La newsletter n'est pas encore dans ContentCore, d'où « à venir ».",
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
    cmsLead:
      "Tape à gauche, ça s'affiche à droite. C'est exactement la sensation que tu auras ensuite. Essaie, c'est réel.",
    editor: {
      panel: "contentcore · éditeur",
      fieldHeadline: "titre",
      fieldButton: "texte du bouton",
      accent: "couleur d'accent",
      imageBlock: "bloc image",
      imageHint: "affiche ou masque la zone image",
      publish: "publier",
      steps: ["build en cours", "fichiers envoyés", "cache vidé"],
      done: "en ligne · 0.4 s",
      placeholderHeadline: "Ton titre.",
      placeholderButton: "demander un devis",
      bodyCopy:
        "Cet aperçu, tu es vraiment en train de le modifier. Pas une vidéo, pas une maquette. Voilà le pupitre que tu reçois à la livraison.",
      url: "ton-domaine.be",
    },

    stackH2: "avec quoi c'est construit.",
    stack: [
      ["Next.js · React", "Rendu côté serveur. Google reçoit des pages finies, pas un chantier."],
      ["TypeScript", "Les erreurs tombent au build, pas chez ton client."],
      ["Tailwind", "Un système de styles au lieu d'un tas de CSS. Encore modifiable dans deux ans."],
      ["ContentCore", "Mon propre CMS. Exactement les champs dont ton site a besoin, pas un de plus."],
      ["Serveurs en UE", "Pas de détour outre-Atlantique, RGPD sans petits caractères."],
      ["Pas de tracking tiers", "Statistiques maison, sans cirque de bannières cookies."],
    ],
    stackNote:
      "Pas de WordPress, pas de Wix, pas de Webflow. Pas par principe, mais parce que sinon je ne peux pas répondre du temps de chargement.",

    faqH2: "avant que tu demandes.",
    faq: [
      ["ça prend combien de temps ?", "Un site avec un contenu clair : deux à trois semaines. Un site multi-pages avec CMS : trois à cinq. Le vrai levier, c'est toi : plus les textes et images arrivent vite, plus le site est prêt tôt. Avec une deadline fixe, je planifie à rebours."],
      ["tu peux reprendre mon site actuel ?", "Oui, c'est même le cas le plus fréquent. Je récupère ton ancien site en entier, tu ne m'envoies rien à l'avance. Contenus, structure et positions suivent, les anciennes adresses reçoivent des redirections permanentes."],
      ["et si je veux changer quelque chose plus tard ?", "Tu le changes. Tout ce qui bouge régulièrement vit dans le CMS et t'appartient. Pour le reste tu m'écris, et je ne suis pas perdu trois semaines dans un système de tickets."],
      ["ça coûte combien ?", "Les ordres de grandeur sont ouverts sur la page prix. Un chiffre solide arrive après un court échange, parce qu'il dépend du périmètre et pas d'un palier de forfait."],
      ["et si j'ai besoin d'une boutique plus tard ?", "On la construit en plus. Rien n'est vissé au point qu'une nouvelle partie impose de tout recommencer. C'est exactement l'intérêt du sur-mesure."],
      ["ça m'appartient vraiment à la fin ?", "Oui. Code, domaine et hébergement sont à ton nom. Si un jour tu veux quelqu'un d'autre, tu emportes tout. Je ne retiens rien."],
    ],

    ctaH2: "raconte-moi ce que tu prépares.",
    ctaBody:
      "Court échange, pas de pitch deck, ça ne coûte rien. Ensuite tu sais si je suis la bonne personne. Et sinon, je te le dis aussi.",
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

    deliverH2: "what you end up with.",
    deliverLead:
      "No packages, no tiers. All of this is in every project, however big it gets.",
    deliver: [
      ["A site that exists once", "Design and code made for you. No theme, no builder, no ten thousand twins out there."],
      ["Speed that lasts", "Lighthouse 95+ at launch and still in two years. Because there's nothing in it that rots over time."],
      ["A CMS you run yourself", "In-house. Text, images, prices: you change them. No plugin update at midnight, no update anxiety."],
      ["SEO that isn't bolted on later", "Structure, load time, meta, sitemap, structured data. In from the first commit."],
      ["Your old site can come along", "Content, images and rankings carry over. Old addresses get clean permanent redirects and the old site stays up until the switch."],
      ["You get the keys", "Code, domain and hosting are in your name. No rental model, no hostage situation, you can walk any time."],
    ],

    ballastH2: "what happens when the site needs to do more.",
    ballastLead:
      "Switch on what you need. On the left every feature becomes a bought plugin dragging its own JavaScript along. On the right it's part of the site.",
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
      hint: "Counted, not estimated: the plugin names are the ones people usually reach for, and „vendors\" counts the WordPress core and the theme too · they are there before the first plugin. Newsletter is not in ContentCore yet, hence „coming\".",
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
    cmsLead:
      "Type on the left, it's there on the right. That's exactly how it will feel for you later. Try it, it's real.",
    editor: {
      panel: "contentcore · editor",
      fieldHeadline: "headline",
      fieldButton: "button text",
      accent: "accent colour",
      imageBlock: "image block",
      imageHint: "shows or hides the image area",
      publish: "publish",
      steps: ["build running", "files shipping", "cache clearing"],
      done: "live · 0.4 s",
      placeholderHeadline: "Your headline.",
      placeholderButton: "get in touch",
      bodyCopy:
        "You are genuinely editing this preview right now. Not a video, not a mockup. This is the desk you get at handover.",
      url: "your-domain.be",
    },

    stackH2: "what it's built with.",
    stack: [
      ["Next.js · React", "Server-rendered. Google gets finished pages, not a construction site."],
      ["TypeScript", "Errors show up at build time, not at your customer."],
      ["Tailwind", "A style system instead of a grown CSS pile. Still editable in two years."],
      ["ContentCore", "My own CMS. Exactly the fields your site needs, and not one more."],
      ["Servers in the EU", "No detour overseas, GDPR without small print."],
      ["No third-party tracking", "Own analytics, no cookie banner circus."],
    ],
    stackNote:
      "No WordPress, no Wix, no Webflow. Not on principle, but because otherwise i can't stand behind the load time.",

    faqH2: "before you ask.",
    faq: [
      ["how long does it take?", "A site with clear content two to three weeks, a multi-page site with CMS three to five. The biggest lever is you: the faster text and images arrive, the sooner it's up. With a fixed deadline i plan backwards."],
      ["can you take over my existing site?", "Yes, that's actually the most common case. I pull your old site in full, you send me nothing up front. Content, structure and rankings carry over, old addresses get permanent redirects."],
      ["what if i want to change something later?", "Then you change it. Everything that moves regularly lives in the CMS and belongs to you. For anything bigger you write me, and i'm not lost in a ticket system for three weeks."],
      ["what does it cost?", "Ballparks are out in the open on the pricing page. A solid number comes after a short conversation, because it depends on scope and not on a package tier."],
      ["what if i need a shop later?", "Then it gets built on. Nothing is bolted down so tightly that a new area means starting over. That's exactly the point of building from scratch."],
      ["do i really own it in the end?", "Yes. Code, domain and hosting are in your name. If you ever want someone else, you take everything with you. I hold on to nothing."],
    ],

    ctaH2: "tell me what you're planning.",
    ctaBody:
      "Short conversation, no pitch deck, costs nothing. After that you know whether i'm the right person. And if i'm not, i'll say so.",
    ctaPrimary: "write me",
    ctaSecondary: "see pricing",
  },
};
