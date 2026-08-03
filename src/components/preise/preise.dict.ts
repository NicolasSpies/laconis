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

  faktorenH2: string;
  faktorenLead: string;
  faktoren: [string, string][];

  laufendH2: string;
  laufendLead: string;
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
      labelTexte: "texte & bilder",
      texteHint: "an, wenn text und bilder noch entstehen müssen",
      readoutLabel: "korridor",
      note: "Ein Korridor, kein Angebot. Die belastbare Zahl kommt nach einem kurzen Gespräch, weil sie an deinem Projekt hängt und nicht an einer Paketstufe.",
      overflowNote: "Ab hier hört die Skala auf. In der Grössenordnung reden wir sowieso besser einmal miteinander, bevor irgendeine Zahl im Raum steht.",
    },

    faktorenH2: "was den preis wirklich macht.",
    faktorenLead:
      "Fünf Punkte entscheiden, wo ein Projekt im Korridor landet. Keiner davon ist ein Aufschlag, den ich mir ausdenke.",
    faktoren: [
      ["umfang", "Wie viele Seiten? Ein CMS-Bereich zum Selberpflegen? Shop oder Buchung? Jedes bewegliche Teil braucht Bau, Test und Abstimmung davor."],
      ["inhalte", "Bringst du Texte und Bilder mit, oder entstehen sie noch? Inhalte sind fast immer das, was ein Projekt in die Länge zieht. Klarer Content ab Tag eins spart auf beiden Seiten."],
      ["branding", "Website allein, oder soll parallel die visuelle Identität entstehen? Aus einer Hand geht schneller und sieht stimmiger aus, weil niemand zwischen zwei Dienstleistern vermitteln muss."],
      ["ausgangslage", "Weisses Blatt oder bestehende Seite, die übernommen wird? Beides geht. Beides stellt am Anfang andere Fragen."],
      ["tempo", "Entspannter Zeitplan oder feste Deadline? Ein enger Termin heisst mehr Koordination, und die steckt im Aufwand."],
    ],

    laufendH2: "und danach?",
    laufendLead:
      "Nach dem Launch läuft nur, was du wirklich brauchst. Keine Vertragsbindung, kein Paket, das mitwächst ohne dass du es merkst.",
    laufend: [
      ["hosting · backups · kleine pflege", "20 bis 50 € im monat"],
      ["domain", "ca. 2 € im monat, je nach endung"],
      ["cms-nutzung", "0 € · gehört dir mit der seite"],
      ["lizenzen für stock-fotos oder premium-fonts", "nur wenn du sie willst"],
    ],

    faqH2: "bevor du fragst.",
    faq: [
      ["warum steht hier keine preisliste?", "Weil eine Preisliste bei jedem Projekt anders lügen würde. Zwei Seiten mit gleich vielen Unterseiten können Faktor zwei auseinanderliegen, je nachdem was drin passiert. Der Korridor oben ist so nah an einer Liste, wie ich ehrlich kommen kann."],
      ["wie geht es nach dem anfragen los?", "Ich melde mich, sobald ich mir das angeschaut habe. Dann ein kurzes Gespräch: was du brauchst, was realistisch ist, wo der Einstieg liegt. Danach bekommst du ein konkretes Angebot, schriftlich und ohne Kleingedrucktes."],
      ["was ist nicht enthalten?", "Stock-Fotos, Premium-Fonts und externe Tools mit eigenen Lizenzkosten liegen bei dir, ausser wir haben es vorher anders besprochen. Alles, was über den besprochenen Umfang hinausgeht, klär ich vorher. Keine Überraschung auf der Rechnung."],
      ["kann ich in raten zahlen?", "Ja. Üblich ist eine Anzahlung beim Start und der Rest beim Launch, bei grösseren Projekten auch in drei Schritten. Sag einfach, was für dich passt."],
      ["was, wenn mein budget kleiner ist?", "Dann sag es früh. Meistens lässt sich der Umfang so schneiden, dass das Wichtigste zuerst live geht und der Rest später dazukommt. Das ist mir lieber als ein Projekt, das an der Zahl scheitert."],
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
      labelTexte: "textes & images",
      texteHint: "activé si les textes et images restent à créer",
      readoutLabel: "couloir",
      note: "Un couloir, pas une offre. Le chiffre solide arrive après un court échange, parce qu'il tient à ton projet et pas à un palier de forfait.",
      overflowNote: "Ici l'échelle s'arrête. À cet ordre de grandeur, mieux vaut de toute façon se parler une fois avant qu'un chiffre traîne dans la pièce.",
    },

    faktorenH2: "ce qui fait vraiment le prix.",
    faktorenLead:
      "Cinq points décident où un projet atterrit dans le couloir. Aucun n'est un supplément que j'invente.",
    faktoren: [
      ["ampleur", "Combien de pages ? Une zone CMS à gérer toi-même ? Boutique ou réservation ? Chaque pièce mobile demande construction, test et coordination en amont."],
      ["contenus", "Tu apportes textes et images, ou restent-ils à créer ? Le contenu est presque toujours ce qui rallonge un projet. Du contenu clair dès le jour un fait gagner des deux côtés."],
      ["branding", "Site seul, ou l'identité visuelle en parallèle ? D'une seule main c'est plus rapide et plus cohérent, parce que personne n'a à faire l'intermédiaire entre deux prestataires."],
      ["point de départ", "Page blanche ou site existant à reprendre ? Les deux marchent. Les deux posent d'autres questions au début."],
      ["rythme", "Planning détendu ou date fixe ? Une échéance serrée veut dire plus de coordination, et ça se trouve dans la charge."],
    ],

    laufendH2: "et après ?",
    laufendLead:
      "Après la mise en ligne, il ne tourne que ce dont tu as vraiment besoin. Pas d'engagement, pas de forfait qui grossit sans que tu le voies.",
    laufend: [
      ["hébergement · sauvegardes · petit entretien", "20 à 50 € par mois"],
      ["domaine", "env. 2 € par mois, selon l'extension"],
      ["utilisation du CMS", "0 € · il est à toi avec le site"],
      ["licences photos ou polices premium", "seulement si tu en veux"],
    ],

    faqH2: "avant que tu demandes.",
    faq: [
      ["pourquoi pas de grille tarifaire ici ?", "Parce qu'une grille mentirait différemment sur chaque projet. Deux sites avec le même nombre de pages peuvent être à un facteur deux l'un de l'autre, selon ce qui s'y passe. Le couloir ci-dessus est ce que je peux offrir de plus proche d'une grille, honnêtement."],
      ["comment ça démarre après la demande ?", "Je reviens vers toi dès que j'ai regardé. Puis un court échange : ce dont tu as besoin, ce qui est réaliste, où se situe le départ. Ensuite tu reçois une offre concrète, par écrit et sans petits caractères."],
      ["qu'est-ce qui n'est pas compris ?", "Photos de stock, polices premium et outils externes avec leurs propres licences sont à ta charge, sauf accord préalable. Tout ce qui dépasse le périmètre convenu, je le clarifie avant. Pas de surprise sur la facture."],
      ["je peux payer en plusieurs fois ?", "Oui. L'usage est un acompte au démarrage et le solde à la mise en ligne, en trois temps pour les plus gros projets. Dis simplement ce qui te convient."],
      ["et si mon budget est plus petit ?", "Alors dis-le tôt. En général on peut tailler le périmètre pour que l'essentiel parte en ligne d'abord et que le reste suive. Je préfère ça à un projet qui échoue sur un chiffre."],
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
      labelTexte: "text & images",
      texteHint: "on if text and images still have to be made",
      readoutLabel: "corridor",
      note: "A corridor, not an offer. The solid number comes after a short conversation, because it depends on your project and not on a package tier.",
      overflowNote: "The scale ends here. At this order of magnitude we're better off talking once before any number is on the table anyway.",
    },

    faktorenH2: "what actually sets the price.",
    faktorenLead:
      "Five things decide where a project lands in the corridor. None of them is a surcharge i make up.",
    faktoren: [
      ["scope", "How many pages? A CMS area you maintain yourself? Shop or booking? Every moving part needs building, testing and agreement up front."],
      ["content", "Do you bring text and images, or do they still have to be made? Content is almost always what stretches a project. Clear content from day one saves on both sides."],
      ["branding", "Website alone, or the visual identity alongside it? From one hand it's faster and more coherent, because nobody has to mediate between two providers."],
      ["starting point", "Blank page or an existing site to take over? Both work. Both raise different questions at the start."],
      ["pace", "Relaxed schedule or a fixed date? A tight deadline means more coordination, and that sits in the effort."],
    ],

    laufendH2: "and afterwards?",
    laufendLead:
      "After launch only what you actually need keeps running. No lock-in, no package that grows without you noticing.",
    laufend: [
      ["hosting · backups · small upkeep", "20 to 50 € per month"],
      ["domain", "around 2 € per month, depending on the extension"],
      ["cms usage", "0 € · it's yours with the site"],
      ["licences for stock photos or premium fonts", "only if you want them"],
    ],

    faqH2: "before you ask.",
    faq: [
      ["why is there no price list here?", "Because a price list would lie differently on every project. Two sites with the same number of pages can be a factor of two apart depending on what happens inside them. The corridor above is as close to a list as i can honestly get."],
      ["how does it start after i get in touch?", "I get back to you once i've had a look. Then a short conversation: what you need, what's realistic, where the entry point is. After that you get a concrete offer, in writing and without small print."],
      ["what isn't included?", "Stock photos, premium fonts and external tools with their own licence costs are on you, unless we agreed otherwise beforehand. Anything beyond the agreed scope i clear up front. No surprise on the invoice."],
      ["can i pay in instalments?", "Yes. The usual is a deposit at the start and the rest at launch, in three steps for bigger projects. Just say what works for you."],
      ["what if my budget is smaller?", "Then say so early. Usually the scope can be cut so the important part goes live first and the rest follows. I prefer that to a project that fails on a number."],
    ],

    ctaH2: "i'll tell you honestly where we stand.",
    ctaBody:
      "Write me briefly what you're planning. Free, no strings, no form labyrinth. And if i'm not the right person, i'll say that too.",
    ctaPrimary: "write me",
    ctaSecondary: "see the service",
  },
};
