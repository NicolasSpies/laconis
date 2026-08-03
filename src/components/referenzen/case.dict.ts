import type { Locale } from "@/i18n/config";
import type { TageslaufT } from "@/components/referenzen/Tageslauf";

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

  tagH2: string;
  tagLead: string;
  tageslauf: TageslaufT;

  detailsH2: string;
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

    tagH2: "die seite kennt die uhrzeit.",
    tagLead:
      "Zieh die Sonne über den Himmel. Genau das passiert beim Besucher auch, nur ohne Regler · die Seite liest die Uhr und stellt ihr Licht selbst.",
    tageslauf: {
      label: "tageslauf",
      now: "jetzt",
      phases: ["morgentau", "vormittag", "mittagslicht", "abendgold", "nachtruhe"],
      hint: "Die Lichtstimmung liegt über dem Bild, nicht in der Bildauswahl. Deshalb funktioniert sie mit jedem Motiv.",
    },

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

    tagH2: "le site connaît l'heure.",
    tagLead:
      "Fais glisser le soleil dans le ciel. C'est exactement ce qui arrive chez le visiteur, sans curseur · le site lit l'heure et règle sa lumière lui-même.",
    tageslauf: {
      label: "course du jour",
      now: "maintenant",
      phases: ["rosée du matin", "matinée", "plein midi", "or du soir", "repos nocturne"],
      hint: "L'ambiance lumineuse est posée sur l'image, pas dans le choix de l'image. C'est pour ça qu'elle marche avec n'importe quel motif.",
    },

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

    tagH2: "the site knows the time.",
    tagLead:
      "Drag the sun across the sky. That's exactly what happens for the visitor too, just without a slider · the site reads the clock and sets its own light.",
    tageslauf: {
      label: "course of the day",
      now: "now",
      phases: ["morning dew", "forenoon", "midday light", "evening gold", "night rest"],
      hint: "The light grade sits on top of the image, not in the choice of image. That's why it works with any subject.",
    },

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
