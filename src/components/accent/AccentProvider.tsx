"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AccentKey = "lime" | "coral" | "sky" | "pink" | "peach" | "slate";

export type AccentDef = {
  key: AccentKey;
  label: string;
  rgb: [number, number, number];
  hex: string;
};

export const ACCENTS: AccentDef[] = [
  { key: "lime", label: "lime", rgb: [225, 253, 82], hex: "#E1FD52" },
  { key: "coral", label: "coral", rgb: [255, 122, 89], hex: "#FF7A59" },
  { key: "sky", label: "sky", rgb: [120, 190, 255], hex: "#78BEFF" },
  { key: "pink", label: "pink", rgb: [244, 154, 194], hex: "#F49AC2" },
  { key: "peach", label: "peach", rgb: [255, 196, 130], hex: "#FFC482" },
  { key: "slate", label: "slate", rgb: [200, 210, 220], hex: "#C8D2DC" },
];

const DEFAULT: AccentKey = "lime";
const STORAGE_KEY = "laconis.accent";

type Ctx = {
  accent: AccentKey;
  setAccent: (k: AccentKey) => void;
  def: AccentDef;
};

const AccentCtx = createContext<Ctx | null>(null);

function applyAccent(def: AccentDef) {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty(
    "--accent",
    `${def.rgb[0]} ${def.rgb[1]} ${def.rgb[2]}`,
  );
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<AccentKey>(DEFAULT);

  // hydrate from storage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw && ACCENTS.some((a) => a.key === raw)) {
        setAccentState(raw as AccentKey);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // apply whenever it changes
  useEffect(() => {
    const def = ACCENTS.find((a) => a.key === accent) ?? ACCENTS[0];
    applyAccent(def);
  }, [accent]);

  const setAccent = useCallback((k: AccentKey) => {
    setAccentState(k);
    try {
      window.localStorage.setItem(STORAGE_KEY, k);
    } catch {
      /* ignore */
    }
  }, []);

  const def = useMemo(
    () => ACCENTS.find((a) => a.key === accent) ?? ACCENTS[0],
    [accent],
  );

  const value = useMemo(() => ({ accent, setAccent, def }), [accent, setAccent, def]);

  return <AccentCtx.Provider value={value}>{children}</AccentCtx.Provider>;
}

export function useAccent(): Ctx {
  const ctx = useContext(AccentCtx);
  if (!ctx) {
    // fallback — if someone mounts the switcher without a provider
    return {
      accent: DEFAULT,
      setAccent: () => {},
      def: ACCENTS[0],
    };
  }
  return ctx;
}
