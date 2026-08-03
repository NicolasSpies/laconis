import type { Locale } from "@/i18n/config";
import type { SceneKind } from "@/components/leistungen/web/ProcessScenes";

/**
 * Web-Ablauf daten · die 4 projekt-schritte (umgezogen von /ansatz,
 * juni 2026 · seite aufgelöst). server-safe (KEIN "use client") damit
 * web/page.tsx die steps fürs HowTo-schema lesen kann · WebAblauf.tsx
 * rendert dieselben daten client-seitig als storyboard.
 *
 * `text` = volltext (nur schema/SEO) · `short` = sichtbarer einzeiler.
 */

export type AblaufStep = {
  name: string;
  text: string;
  duration: string;
  short: string;
  dauer: string;
  scene: SceneKind;
};

export type WebAblaufDict = {
  h2: string;
  label: string;
  howToName: string;
  howToDescription: string;
  steps: AblaufStep[];
};

export const WEB_ABLAUF: Record<Locale, WebAblaufDict> = {
  de: {
    h2: "vier schritte · keine zauberei.",
    label: "schritte",
    howToName: "So läuft ein Web-Projekt bei laconis ab",
    howToDescription:
      "Vier Schritte vom ersten Gespräch bis zur Übergabe. Klarer Prozess, keine Blackbox.",
    steps: [
      { name: "kennenlernen", scene: "call", dauer: "30 min", short: "kurzer video-call · kostet nix · wir schauen ob's passt.", text: "30 Minuten Video-Call. Ich rede mit dir über dich, nicht über Logos oder Pixel. Was machst du, wer ist die Zielgruppe, warum jetzt. Kostet nichts und bringt Klarheit darüber, ob wir zusammen passen.", duration: "P1D" },
      { name: "richtung finden", scene: "fork", dauer: "~1 woche", short: "ich zeig 2–3 richtungen · du wählst, bevor ich was umsetze.", text: "Moodboard, Struktur, Tonalität. Ich lege 2–3 Richtungen vor. Du bestimmst, wohin's geht · bevor irgendeine Farbe oder Zeile umgesetzt wird. So vermeide ich Sackgassen und Doppelarbeit.", duration: "P1W" },
      { name: "bauen", scene: "build", dauer: "~2–3 wochen", short: "klickbare vorschauen alle paar tage · keine funkstille.", text: "Design und Code parallel · du siehst klickbare Vorschau-Versionen alle paar Tage. Keine wochenlange Funkstille.", duration: "P3W" },
      { name: "übergabe", scene: "handover", dauer: "~1 tag", short: "live · du pflegst alles selbst · keine versteckten kosten.", text: "Live-Schaltung + CMS-Einweisung, du kannst von Tag 1 selbst pflegen. Keine Nachlieferungen, keine versteckten Kosten.", duration: "P3D" },
    ],
  },
  fr: {
    h2: "quatre étapes · pas de magie.",
    label: "étapes",
    howToName: "Comment se déroule un projet web chez laconis",
    howToDescription:
      "Quatre étapes de la première conversation à la livraison. Processus clair, pas de boîte noire.",
    steps: [
      { name: "faire connaissance", scene: "call", dauer: "30 min", short: "court appel visio · gratuit · on voit si ça colle.", text: "30 minutes en visio. Je te parle de toi, pas de logos ou de pixels. Ce que tu fais, qui est ta cible, pourquoi maintenant. Ça ne coûte rien et ça clarifie si on s'accorde.", duration: "P1D" },
      { name: "trouver la direction", scene: "fork", dauer: "~1 semaine", short: "je montre 2–3 directions · tu choisis avant que je pose quoi que ce soit.", text: "Moodboard, structure, tonalité. Je propose 2–3 directions. Tu choisis où on va · avant qu'aucune couleur ou ligne ne soit posée. Comme ça j'évite les impasses et les refontes.", duration: "P1W" },
      { name: "construire", scene: "build", dauer: "~2–3 semaines", short: "aperçus cliquables tous les 2–3 jours · pas de silence radio.", text: "Design et code en parallèle · tu vois des versions cliquables toutes les quelques jours. Pas de silence de plusieurs semaines.", duration: "P3W" },
      { name: "livraison", scene: "handover", dauer: "~1 jour", short: "en ligne · tu gères tout toi-même · pas de coûts cachés.", text: "Mise en ligne + formation CMS, tu peux gérer toi-même dès jour 1. Pas de livraisons en retard, pas de coûts cachés.", duration: "P3D" },
    ],
  },
  en: {
    h2: "four steps · no magic.",
    label: "steps",
    howToName: "How a web project runs at laconis",
    howToDescription:
      "Four steps from first conversation to handover. Clear process, no black box.",
    steps: [
      { name: "get to know each other", scene: "call", dauer: "30 min", short: "short video call · free · we see if we fit.", text: "30-minute video call. I talk with you about you, not logos or pixels. What you do, who your audience is, why now. Costs nothing and brings clarity on whether we fit.", duration: "P1D" },
      { name: "find the direction", scene: "fork", dauer: "~1 week", short: "i show 2–3 directions · you choose before i build anything.", text: "Moodboard, structure, tone. I lay out 2–3 directions. You decide where it goes · before any colour or line is set. Saves dead ends and rework.", duration: "P1W" },
      { name: "build", scene: "build", dauer: "~2–3 weeks", short: "clickable previews every few days · no radio silence.", text: "Design and code in parallel · you see clickable previews every few days. No weeks of radio silence.", duration: "P3W" },
      { name: "handover", scene: "handover", dauer: "~1 day", short: "live · you edit everything yourself · no hidden costs.", text: "Launch + CMS walkthrough, you can edit yourself from day 1. No late deliveries, no hidden costs.", duration: "P3D" },
    ],
  },
};
