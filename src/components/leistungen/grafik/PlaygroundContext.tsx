"use client";

import { createContext, useContext, useState, ReactNode } from "react";

/**
 * PlaygroundContext — shared state für die grafik-playground-sektion.
 * LogoLab, MoodboardGenerator und BrandPreview lesen/schreiben hier.
 * So reagieren alle teile aufeinander → man sieht wirklich ein system.
 */

export type FontKey = "fraunces" | "dm-sans" | "caveat" | "instrument";

export type Theme = {
  id: string;
  titel: string;
  untertitel: string;
  farben: { hex: string; label: string }[];
  /** neutrale grundtöne pro stimmung — papier / mittelton / tinte.
   *  Diese werden im brand-simulator gezeigt, NICHT die mood-farben —
   *  so kollidiert die stimmung nicht mit der frei gewählten primär/sekundärfarbe. */
  neutrals: { hex: string; label: string }[];
  headline: string;
  headlineFont: FontKey;
  bodyFont: FontKey;
  keywords: string[];
  textures: { style: string; label: string }[];
  // for brand preview
  previewBg: string;
  previewFg: string;
  tagline: string;
};

export const FONT_MAP: Record<FontKey, string> = {
  fraunces: "var(--font-fraunces), serif",
  "dm-sans": "var(--font-dm-sans), sans-serif",
  caveat: "var(--font-caveat), cursive",
  instrument: "var(--font-instrument), serif",
};

export const THEMES: Theme[] = [
  {
    id: "warm",
    titel: "warm · lokal · handgemacht",
    untertitel: "für bäckereien, tischlereien, metzger, hof-läden.",
    farben: [
      { hex: "#E6A26A", label: "sauerteig" },
      { hex: "#3B2414", label: "röstkruste" },
      { hex: "#FAF6EC", label: "mehl" },
      { hex: "#8A6A3E", label: "kastanie" },
      { hex: "#C5412A", label: "paprika" },
    ],
    neutrals: [
      { hex: "#FAF6EC", label: "papier" },
      { hex: "#A59A86", label: "kraft" },
      { hex: "#2A2016", label: "tinte" },
    ],
    headline: "brot das riecht.",
    headlineFont: "fraunces",
    bodyFont: "dm-sans",
    keywords: ["warm", "taktil", "geerdet", "handschrift", "lokal", "langsam"],
    textures: [
      { style: "linear-gradient(135deg, #E6A26A 0%, #3B2414 100%)", label: "verlauf" },
      { style: "repeating-linear-gradient(45deg, #FAF6EC 0px, #FAF6EC 6px, #E6A26A 6px, #E6A26A 7px)", label: "weizen-streif" },
      { style: "radial-gradient(circle at 30% 30%, #C5412A, #3B2414 70%)", label: "ofen-rot" },
    ],
    previewBg: "#FAF6EC",
    previewFg: "#3B2414",
    tagline: "handgemacht, seit gestern.",
  },
  {
    id: "minimal",
    titel: "minimal · präzise · high-end",
    untertitel: "für architekten, juristen, fin-tech, b2b-services.",
    farben: [
      { hex: "#0A0A0A", label: "tiefschwarz" },
      { hex: "#F5F5F0", label: "papier" },
      { hex: "#7A7A7A", label: "beton-grau" },
      { hex: "#D4C5A9", label: "sand" },
      { hex: "#1E3A5F", label: "nacht-blau" },
    ],
    neutrals: [
      { hex: "#FFFFFF", label: "papier" },
      { hex: "#8A8A8A", label: "beton" },
      { hex: "#0A0A0A", label: "tinte" },
    ],
    headline: "form folgt funktion.",
    headlineFont: "instrument",
    bodyFont: "dm-sans",
    keywords: ["klar", "reduziert", "präzise", "ruhig", "teuer", "verlässlich"],
    textures: [
      { style: "linear-gradient(135deg, #F5F5F0 0%, #7A7A7A 100%)", label: "beton-verlauf" },
      { style: "repeating-linear-gradient(90deg, #0A0A0A 0px, #0A0A0A 1px, transparent 1px, transparent 14px)", label: "raster" },
      { style: "linear-gradient(180deg, #1E3A5F 0%, #0A0A0A 100%)", label: "dämmerung" },
    ],
    previewBg: "#F5F5F0",
    previewFg: "#0A0A0A",
    tagline: "form folgt funktion.",
  },
  {
    id: "laut",
    titel: "verspielt · laut · jung",
    untertitel: "für kultur, gastro mit persönlichkeit, mode, events.",
    farben: [
      { hex: "#FF3B5C", label: "kirsche" },
      { hex: "#E1FD52", label: "lime" },
      { hex: "#111111", label: "tinte" },
      { hex: "#6A5AFF", label: "nachtblau" },
      { hex: "#FFE9B0", label: "vanille" },
    ],
    neutrals: [
      { hex: "#F4F2EE", label: "papier" },
      { hex: "#7D7D7D", label: "grau" },
      { hex: "#111111", label: "tinte" },
    ],
    headline: "keine bühne ohne publikum.",
    headlineFont: "caveat",
    bodyFont: "fraunces",
    keywords: ["laut", "verspielt", "gegen-den-strich", "kontrast", "mutig", "frech"],
    textures: [
      { style: "linear-gradient(135deg, #FF3B5C 0%, #6A5AFF 100%)", label: "disco-verlauf" },
      { style: "radial-gradient(circle at 20% 50%, #E1FD52, transparent 40%), radial-gradient(circle at 80% 30%, #FF3B5C, transparent 40%), #111", label: "spots" },
      { style: "repeating-linear-gradient(-45deg, #111 0px, #111 12px, #E1FD52 12px, #E1FD52 24px)", label: "absperr-band" },
    ],
    previewBg: "#111111",
    previewFg: "#FFE9B0",
    tagline: "keine bühne ohne publikum.",
  },
  {
    id: "nordisch",
    titel: "nordisch · ruhig · klar",
    untertitel: "für therapeuten, coaches, interior, wellness, architektur-studios.",
    farben: [
      { hex: "#D8DEE4", label: "eisblau" },
      { hex: "#2E3440", label: "mitternacht" },
      { hex: "#ECEFF4", label: "birke" },
      { hex: "#88C0D0", label: "fjord" },
      { hex: "#A3BE8C", label: "moos" },
    ],
    neutrals: [
      { hex: "#F5F7FA", label: "schnee" },
      { hex: "#9AA3AE", label: "nebel" },
      { hex: "#2E3440", label: "nacht" },
    ],
    headline: "stille gehört dazu.",
    headlineFont: "instrument",
    bodyFont: "dm-sans",
    keywords: ["ruhig", "hell", "reduziert", "natürlich", "aufgeräumt", "kühl"],
    textures: [
      { style: "linear-gradient(180deg, #ECEFF4 0%, #D8DEE4 100%)", label: "nebel" },
      { style: "repeating-linear-gradient(0deg, #2E3440 0px, #2E3440 0.5px, transparent 0.5px, transparent 12px)", label: "feiner strich" },
      { style: "radial-gradient(circle at 70% 30%, #88C0D0, #D8DEE4 60%)", label: "fjord-licht" },
    ],
    previewBg: "#ECEFF4",
    previewFg: "#2E3440",
    tagline: "stille gehört dazu.",
  },
  {
    id: "retro",
    titel: "retro · 80s · synth",
    untertitel: "für mode, musik, kreativ-agenturen, nachtleben.",
    farben: [
      { hex: "#FF006E", label: "magenta" },
      { hex: "#8338EC", label: "synth-violett" },
      { hex: "#3A86FF", label: "vhs-blau" },
      { hex: "#FFBE0B", label: "sonnenuntergang" },
      { hex: "#14081E", label: "kosmos" },
    ],
    neutrals: [
      { hex: "#F5EFE6", label: "vintage" },
      { hex: "#8B7F8B", label: "staub" },
      { hex: "#14081E", label: "kosmos" },
    ],
    headline: "analog in digital.",
    headlineFont: "caveat",
    bodyFont: "fraunces",
    keywords: ["neon", "retro", "nostalgie", "bold", "analog", "grafisch"],
    textures: [
      { style: "linear-gradient(135deg, #FF006E 0%, #8338EC 50%, #3A86FF 100%)", label: "synth-verlauf" },
      { style: "repeating-linear-gradient(90deg, #FFBE0B 0px, #FFBE0B 8px, #FF006E 8px, #FF006E 16px)", label: "spielfeld" },
      { style: "radial-gradient(circle at 50% 50%, #FFBE0B, #FF006E 40%, #14081E 80%)", label: "sonnenball" },
    ],
    previewBg: "#14081E",
    previewFg: "#FFBE0B",
    tagline: "analog in digital.",
  },
  {
    id: "botanisch",
    titel: "botanisch · organisch · grün",
    untertitel: "für garten, bio-produkte, naturkosmetik, nachhaltigkeit.",
    farben: [
      { hex: "#606C38", label: "waldboden" },
      { hex: "#283618", label: "tannenschatten" },
      { hex: "#FEFAE0", label: "pergament" },
      { hex: "#DDA15E", label: "honig" },
      { hex: "#BC6C25", label: "rinde" },
    ],
    neutrals: [
      { hex: "#FEFAE0", label: "pergament" },
      { hex: "#8A8566", label: "leinen" },
      { hex: "#283618", label: "tanne" },
    ],
    headline: "was wächst, braucht zeit.",
    headlineFont: "fraunces",
    bodyFont: "dm-sans",
    keywords: ["natürlich", "langsam", "gewachsen", "erdig", "echt", "ehrlich"],
    textures: [
      { style: "linear-gradient(135deg, #606C38 0%, #283618 100%)", label: "blattschatten" },
      { style: "repeating-radial-gradient(circle at 30% 30%, #DDA15E 0px, #DDA15E 3px, transparent 3px, transparent 14px)", label: "sommerwiese" },
      { style: "radial-gradient(ellipse at 50% 50%, #FEFAE0, #DDA15E 60%, #BC6C25 100%)", label: "abendlicht" },
    ],
    previewBg: "#FEFAE0",
    previewFg: "#283618",
    tagline: "was wächst, braucht zeit.",
  },
];

export type ColorMode = "one" | "two";

type PlaygroundState = {
  name: string;
  setName: (v: string) => void;
  accent: string;
  setAccent: (v: string) => void;
  secondaryAccent: string;
  setSecondaryAccent: (v: string) => void;
  colorMode: ColorMode;
  setColorMode: (v: ColorMode) => void;
  moodId: string;
  setMoodId: (v: string) => void;
  mood: Theme;
};

const PlaygroundCtx = createContext<PlaygroundState | null>(null);

export function PlaygroundProvider({ children }: { children: ReactNode }) {
  const [name, setName] = useState("müller");
  const [accent, setAccent] = useState("#E1FD52");
  const [secondaryAccent, setSecondaryAccent] = useState("#111111");
  const [colorMode, setColorMode] = useState<ColorMode>("one");
  const [moodId, setMoodId] = useState("warm");
  const mood = THEMES.find((t) => t.id === moodId) ?? THEMES[0];

  return (
    <PlaygroundCtx.Provider
      value={{
        name,
        setName,
        accent,
        setAccent,
        secondaryAccent,
        setSecondaryAccent,
        colorMode,
        setColorMode,
        moodId,
        setMoodId,
        mood,
      }}
    >
      {children}
    </PlaygroundCtx.Provider>
  );
}

export function usePlayground() {
  const ctx = useContext(PlaygroundCtx);
  if (!ctx)
    throw new Error(
      "usePlayground must be used within a PlaygroundProvider"
    );
  return ctx;
}
