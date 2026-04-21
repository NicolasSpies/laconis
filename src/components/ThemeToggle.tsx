"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { track } from "@/lib/analytics";

type Theme = "dark" | "light";
const STORAGE_KEY = "laconis-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const sys = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initial = stored ?? sys;
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);

    // follow OS changes live — only when user hasn't pinned a choice
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSysChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return; // user pinned → ignore
      const next: Theme = e.matches ? "dark" : "light";
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
    };
    mq.addEventListener("change", onSysChange);
    return () => mq.removeEventListener("change", onSysChange);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
    track({ type: "theme_toggled", to: next });
  };

  // Track indicator sits over the active label.
  const isLight = theme === "light";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={
        isLight ? "zu dark mode wechseln" : "zu light mode wechseln"
      }
      onClick={toggle}
      className={cn(
        "tactile-press relative inline-flex items-center rounded-full border border-ink/10 bg-ink/[0.03] hover:bg-ink/[0.06]",
        "h-6 w-[58px] px-[2px]",
        /* depth-press simuliert eingelassenen track · pill darauf "schwebt" mit eigenem shadow */
        "shadow-[var(--depth-press)]",
        className,
      )}
    >
      {/* Sliding pill · sitzt links für light (default), rechts für dark */}
      <span
        aria-hidden
        className={cn(
          "absolute top-[2px] bottom-[2px] w-[26px] rounded-full bg-lime shadow-[0_2px_6px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-out",
          mounted && !isLight ? "translate-x-[28px]" : "translate-x-0",
        )}
      />

      {/* Sun (light-mode side · links) */}
      <span
        aria-hidden
        className={cn(
          "relative z-10 inline-flex h-[22px] w-[26px] items-center justify-center transition-colors",
          isLight ? "text-black" : "text-offwhite/55",
        )}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="2.6" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
            <path d="M7 1.5v1.2" />
            <path d="M7 11.3v1.2" />
            <path d="M1.5 7h1.2" />
            <path d="M11.3 7h1.2" />
            <path d="M2.9 2.9l.85.85" />
            <path d="M10.25 10.25l.85.85" />
            <path d="M2.9 11.1l.85-.85" />
            <path d="M10.25 3.75l.85-.85" />
          </g>
        </svg>
      </span>

      {/* Moon (dark-mode side · rechts) */}
      <span
        aria-hidden
        className={cn(
          "relative z-10 inline-flex h-[22px] w-[26px] items-center justify-center transition-colors",
          !isLight ? "text-black" : "text-offwhite/55",
        )}
      >
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path
            d="M10.5 7.2a4.5 4.5 0 11-5.7-5.7 4 4 0 105.7 5.7z"
            fill="currentColor"
          />
        </svg>
      </span>
    </button>
  );
}
