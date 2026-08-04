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
  lTempo: string;
  tempoNote: string;

  auftragH2: string;
  auftragLead: string;
  auftrag: [string, string][];
  briefing: string;

  claimH2: string;
  claimLead: string;
  claim: ClaimT;

  ansichtH2: string;
  ansichtLead: string;
  ansicht: ProjektAnsichtT;

  detailsH2: string;
  detailsLead: string;
  details: [string, string][];

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
    lTempo: "gemessen",
    tempoNote:
      "Lighthouse, mobil und Desktop, an der echten Seite gemessen. Kein Laborwert aus einer lokalen Umgebung.",

    auftragH2: "der befund.",
    auftragLead:
      "Reimund Fabry klettert seit über zwanzig Jahren in Bäume. Seine Website war das Gegenteil davon: ein gekauftes WordPress-Theme, das er nie selbst ändern konnte.",
    auftrag: [
      ["stand still seit 2009", "Die letzte Änderung stand als Datum im Fussbereich. Sechzehn Jahre, in denen sich der Betrieb weiterentwickelt hat und die Seite nicht."],
      ["auf seite vier", "Wer in der Region nach Baumpflege suchte, fand ihn nicht. Nicht weil er schlecht war, sondern weil die Seite Google nichts anzubieten hatte."],
      ["fremdes theme", "Ein Layout von der Stange, das tausend andere Betriebe auch hatten. Nichts daran erzählte, dass hier jemand seit zwanzig Jahren klettert."],
      ["nicht selbst pflegbar", "Änderungen gingen nur über jemand anderen. Also wurden sie nicht gemacht."],
    ],
    briefing: "gefunden werden, selbst pflegen können",

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

    detailsLead:
      "Die Dinge, nach denen keiner gefragt hat. Sie stehen in keinem Angebot und sind trotzdem der Grund, warum die Seite nicht wie tausend andere aussieht.",

    detailsH2: "was drin steckt.",
    details: [
      ["licht nach der stunde", "Morgens hell wie Morgentau, abends tief wie Waldschatten. Die Seite fragt die Uhr des Besuchers und legt die passende Stimmung über die Bilder."],
      ["die kiefer steht nie still", "Das Zeichen wiegt sich leicht, dauerhaft, kaum merklich. Ein Logo, das atmet, wirkt lebendig · eins, das zappelt, wirkt billig. Der Unterschied liegt in der Amplitude."],
      ["bildwelt nach jahreszeit", "Frisches Frühlingsgrün, tiefes Hochsommerdunkel. Die Seite im November sieht anders aus als im Mai, ohne dass jemand etwas umstellt."],
      ["stillhalten auf ansage", "Wer im Betriebssystem keine Animationen will, bekommt keine. Die Seite merkt es und hält von selbst still. Das ist kein Schalter im Menü, das ist Respekt."],
      ["eigenes cms", "Texte, Bilder und Leistungen pflegt der Kunde selbst. Kein WordPress-Login, kein Plugin, das irgendwann nicht mehr gewartet wird."],
      ["seo ab dem ersten commit", "Struktur, Ladezeit, Meta, Sitemap. Nicht hinterher draufgeklebt, sondern von Anfang an Teil des Baus."],
    ],

    konzeptH2: "eine studie, kein kundenprojekt.",
    konzeptBody:
      "Diese Arbeit ist eine Konzept-Studie. Sie zeigt, wie ich denke und arbeite, aber sie läuft nicht live bei einem Kunden. Ich markiere das lieber deutlich, als sie zwischen echte Projekte zu mischen und darauf zu hoffen, dass niemand nachfragt. Sobald daraus etwas Veröffentlichtes wird, steht es hier.",

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
    lTempo: "mesuré",
    tempoNote:
      "Lighthouse, mobile et desktop, mesuré sur le site réel. Pas une valeur de labo dans un environnement local.",

    auftragH2: "le diagnostic.",
    auftragLead:
      "Reimund Fabry grimpe dans les arbres depuis plus de vingt ans. Son site était tout le contraire : un thème WordPress acheté qu'il n'a jamais pu modifier lui-même.",
    auftrag: [
      ["figé depuis 2009", "La dernière modification était datée en pied de page. Seize ans pendant lesquels l'entreprise a évolué et le site non."],
      ["en page quatre", "Qui cherchait un élagueur dans la région ne le trouvait pas. Pas parce qu'il était mauvais, mais parce que le site n'avait rien à offrir à Google."],
      ["thème générique", "Une mise en page toute faite que mille autres entreprises avaient aussi. Rien n'y racontait que quelqu'un grimpe ici depuis vingt ans."],
      ["pas gérable soi-même", "Les changements passaient par quelqu'un d'autre. Donc ils n'étaient pas faits."],
    ],
    briefing: "être trouvé, pouvoir gérer soi-même",

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

    detailsLead:
      "Les choses que personne n'avait demandées. Elles ne figurent dans aucun devis et sont pourtant la raison pour laquelle le site ne ressemble pas à mille autres.",

    detailsH2: "ce qu'il y a dedans.",
    details: [
      ["lumière selon l'heure", "Clair comme la rosée le matin, profond comme l'ombre des bois le soir. Le site demande l'heure du visiteur et pose l'ambiance qui va avec."],
      ["le pin ne s'arrête jamais", "Le signe se balance légèrement, en continu, à peine perceptible. Un logo qui respire semble vivant · un qui gigote semble bon marché. La différence tient à l'amplitude."],
      ["images selon la saison", "Vert frais du printemps, sombre profond de plein été. Le site en novembre ne ressemble pas à celui de mai, sans que personne ne change quoi que ce soit."],
      ["se tenir tranquille sur demande", "Qui ne veut pas d'animations dans son système n'en reçoit pas. Le site le remarque et se calme de lui-même. Ce n'est pas une case dans un menu, c'est du respect."],
      ["cms maison", "Textes, images et prestations sont gérés par le client. Pas de login WordPress, pas de plugin qui finira par ne plus être maintenu."],
      ["seo dès le premier commit", "Structure, vitesse, méta, sitemap. Pas collé après coup, mais partie de la construction dès le début."],
    ],

    konzeptH2: "une étude, pas un projet client.",
    konzeptBody:
      "Ce travail est une étude concept. Il montre comment je pense et travaille, mais il ne tourne pas en ligne chez un client. Je préfère le marquer clairement plutôt que de le mélanger aux vrais projets en espérant que personne ne demande. Dès que ça devient publié, ce sera écrit ici.",

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
    lTempo: "measured",
    tempoNote:
      "Lighthouse, mobile and desktop, measured on the live site. Not a lab number from a local environment.",

    auftragH2: "the findings.",
    auftragLead:
      "Reimund Fabry has been climbing trees for over twenty years. His website was the opposite: a bought WordPress theme he could never change himself.",
    auftrag: [
      ["frozen since 2009", "The last change was dated in the footer. Sixteen years in which the business moved on and the site didn't."],
      ["on page four", "Anyone searching for tree care in the region didn't find him. Not because he was bad, but because the site had nothing to offer Google."],
      ["someone else's theme", "An off-the-shelf layout a thousand other businesses had too. Nothing about it said that someone here has been climbing for twenty years."],
      ["not self-maintainable", "Changes had to go through someone else. So they didn't happen."],
    ],
    briefing: "get found, be able to maintain it yourself",

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

    detailsLead:
      "The things nobody asked for. They're in no quote and are still the reason the site doesn't look like a thousand others.",

    detailsH2: "what's inside.",
    details: [
      ["light by the hour", "Bright as morning dew, deep as forest shade in the evening. The site asks the visitor's clock and lays the matching mood over the images."],
      ["the pine never stands still", "The mark sways gently, continuously, barely noticeable. A logo that breathes feels alive · one that jitters feels cheap. The difference is in the amplitude."],
      ["imagery by season", "Fresh spring green, deep high-summer dark. The site in November looks different from May, without anyone changing a thing."],
      ["holding still on request", "Whoever turns off animations in their system gets none. The site notices and calms down by itself. That's not a checkbox in a menu, that's respect."],
      ["in-house cms", "Text, images and services are maintained by the client. No WordPress login, no plugin that eventually stops being maintained."],
      ["seo from the first commit", "Structure, load time, meta, sitemap. Not glued on afterwards, but part of the build from the start."],
    ],

    konzeptH2: "a study, not a client project.",
    konzeptBody:
      "This work is a concept study. It shows how i think and work, but it isn't running live at a client. I'd rather mark that clearly than mix it in with real projects and hope nobody asks. As soon as it becomes something published, it will say so here.",

    ctaH2: "something like this for you?",
    ctaBody:
      "Tell me briefly what you're planning. Costs nothing, commits to nothing. And if i'm not the right person, i'll say so.",
    ctaPrimary: "write me",
  },
};
