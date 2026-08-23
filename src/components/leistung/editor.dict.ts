import type { Locale } from "@/i18n/config";

/**
 * Wörterbuch des CMS-Pults · nur der Editor-Block.
 *
 * er stand bis august 2026 in leistung.dict.ts (238 zeilen), und
 * StudioDevice importierte diese datei für GENAU EINEN key. damit
 * lag die komplette plugin-zähler-tabelle der gelöschten
 * /leistung-seite plus "preise ansehen" im client-bundle von
 * /studio · im quelltext lesbar. jetzt trägt das pult sein
 * wörterbuch selbst.
 */

export type EditorT = {
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

export const EDITOR: Record<Locale, EditorT> = {
  de: {
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
  fr: {
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
  en: {
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
};
