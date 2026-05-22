"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * Services dropdown · click-based, schlicht wie LangDropdown.
 * Zwei eintrage: web + branding. Kein mega-menu, keine preview-cards.
 */

type SubLink = {
  key: "web" | "branding";
  routeKey: "leistungen/web" | "leistungen/branding";
  labels: Record<Locale, string>;
  hints: Record<Locale, string>;
};

const SUB_LINKS: readonly SubLink[] = [
  {
    key: "web",
    routeKey: "leistungen/web",
    labels: { de: "web", fr: "web", en: "web" },
    hints: {
      de: "websites · cms",
      fr: "sites · cms",
      en: "websites · cms",
    },
  },
  {
    key: "branding",
    routeKey: "leistungen/branding",
    labels: { de: "branding", fr: "branding", en: "branding" },
    hints: {
      de: "logo · brand-system",
      fr: "logo · système de marque",
      en: "logo · brand system",
    },
  },
] as const;

export function ServicesDropdown({
  currentLocale,
  active,
  triggerLabel,
}: {
  currentLocale: Locale;
  active: boolean;
  triggerLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={cn(
          "relative font-mono text-[12px] lowercase tracking-mono transition-colors inline-flex items-center gap-1.5",
          active
            ? "text-offwhite"
            : "text-offwhite/55 hover:text-offwhite",
        )}
      >
        <span>{triggerLabel}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden
          className={cn("transition-transform", open && "rotate-180")}
        >
          <path
            d="M 1 2.5 L 4 5.5 L 7 2.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {active && (
          <span
            aria-hidden
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime"
          />
        )}
      </button>

      {/* dropdown · zentriert unter button */}
      <div
        role="menu"
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[200px] origin-top transition-all duration-150",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {/* caret */}
        <div
          className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-[rgba(10,12,10,0.78)] border-l border-t border-white/8"
          aria-hidden
        />
        <div className="liquid-glass rounded-lg overflow-hidden">
          <ul className="py-1.5">
            {SUB_LINKS.map((sub) => {
              const href = buildPath(sub.routeKey, currentLocale);
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={sub.key}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "w-full flex flex-col gap-0.5 px-3.5 py-2.5 transition-colors",
                      isActive
                        ? "text-accent-ink"
                        : "text-offwhite/80 hover:text-accent-ink",
                    )}
                  >
                    <span className="font-mono text-[11px] lowercase tracking-mono">
                      {sub.labels[currentLocale]}
                    </span>
                    <span className="font-mono text-[10px] text-offwhite/45 lowercase">
                      {sub.hints[currentLocale]}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
