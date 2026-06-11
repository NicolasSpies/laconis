"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { MenuToggleIcon } from "./ui/MenuToggleIcon";
import { ServicesDropdown } from "./nav/ServicesDropdown";
import { cn } from "@/lib/cn";
import {
  LOCALES,
  LOCALE_LABELS,
  DEFAULT_LOCALE,
  switchLocale,
  buildPath,
  type Locale,
} from "@/i18n/config";

type NavLink = {
  routeKey: "referenzen" | "preise" | "ansatz" | "ueber-mich";
  labels: Record<Locale, string>;
};

const SERVICES_LABELS: Record<Locale, string> = {
  de: "leistungen",
  fr: "services",
  en: "services",
};

const SERVICES_SUB_LABELS: Record<Locale, { web: string; branding: string }> = {
  de: { web: "web", branding: "branding" },
  fr: { web: "web", branding: "branding" },
  en: { web: "web", branding: "branding" },
};

const links: readonly NavLink[] = [
  {
    routeKey: "referenzen",
    labels: { de: "referenzen", fr: "références", en: "work" },
  },
  {
    routeKey: "preise",
    labels: { de: "preise", fr: "prix", en: "pricing" },
  },
  {
    routeKey: "ansatz",
    labels: { de: "ansatz", fr: "approche", en: "approach" },
  },
  {
    routeKey: "ueber-mich",
    labels: { de: "über mich", fr: "à propos", en: "about" },
  },
] as const;

const CTA_LABELS: Record<Locale, string> = {
  de: "projekt starten →",
  fr: "démarrer un projet →",
  en: "start a project →",
};

/** locale aus pathname-prefix erkennen */
function getCurrentLocale(pathname: string): Locale {
  if (pathname === "/fr" || pathname.startsWith("/fr/")) return "fr";
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  return DEFAULT_LOCALE;
}

function LangDropdown({ currentLocale }: { currentLocale: Locale }) {
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
        aria-label={`sprache wechseln · aktuell ${LOCALE_LABELS[currentLocale].long}`}
        className={cn(
          "tactile-press inline-flex items-center gap-1.5 font-mono text-[11px] uppercase px-2 py-1 rounded",
          "text-offwhite hover:text-accent-ink",
        )}
      >
        <span>{LOCALE_LABELS[currentLocale].short}</span>
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
      </button>

      {/* dropdown · zentriert unter button */}
      <div
        role="menu"
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[160px] origin-top transition-all duration-150",
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
        <div data-theme="dark" className="liquid-glass rounded-lg overflow-hidden">
          <ul className="py-1.5">
            {LOCALES.map((code) => {
              const isActive = code === currentLocale;
              const targetPath = switchLocale(pathname, code);
              return (
                <li key={code}>
                  <Link
                    href={targetPath}
                    hrefLang={code}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "w-full flex items-baseline justify-between gap-3 px-3.5 py-2 font-mono text-[11px] lowercase tracking-mono transition-colors",
                      isActive
                        ? "text-accent-ink"
                        : "text-offwhite/75 hover:text-accent-ink",
                    )}
                  >
                    <span className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          "uppercase text-[10px]",
                          isActive && "text-accent-ink",
                        )}
                      >
                        {LOCALE_LABELS[code].short}
                      </span>
                      <span>{LOCALE_LABELS[code].long.toLowerCase()}</span>
                    </span>
                    {isActive && (
                      <span className="text-[10px] text-accent-ink">·</span>
                    )}
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

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = getCurrentLocale(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 border-b",
        scrolled ? "nav-glass-scrolled border-ink/15" : "nav-glass border-ink/5",
      )}
    >
      <div className="container-site flex items-center justify-between h-16">
        {/* dark variant · lime-logo wäre auf papier-hellem bg unsichtbar */}
        <Logo size="sm" variant="dark" className="mr-10" />

        <nav className="hidden md:flex items-center gap-7">
          <ServicesDropdown
            currentLocale={currentLocale}
            triggerLabel={SERVICES_LABELS[currentLocale]}
            active={
              pathname.startsWith(buildPath("leistungen/web", currentLocale)) ||
              pathname.startsWith(
                buildPath("leistungen/branding", currentLocale),
              )
            }
          />
          {links.map((l) => {
            const href = buildPath(l.routeKey, currentLocale);
            const active =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href + "/"));

            return (
              <Link
                key={l.routeKey}
                href={href}
                className={cn(
                  "link-draw relative whitespace-nowrap font-mono text-[12px] lowercase tracking-mono transition-colors",
                  active
                    ? "text-offwhite"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                {l.labels[currentLocale]}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <LangDropdown currentLocale={currentLocale} />
          <Button
            href={`${buildPath("kontakt", currentLocale)}#projekt`}
            size="sm"
          >
            {CTA_LABELS[currentLocale]}
          </Button>
        </div>

        <button
          type="button"
          aria-label="menu"
          aria-expanded={open}
          className="tactile-press md:hidden p-2 rounded text-offwhite"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuToggleIcon open={open} className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 nav-glass-drawer border-t border-ink/20",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-site py-6 flex flex-col gap-5">
          {/* leistungen · zwei flache sublinks (web + branding) */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/45">
              {SERVICES_LABELS[currentLocale]}
            </span>
            <Link
              href={buildPath("leistungen/web", currentLocale)}
              className="font-mono text-[14px] lowercase text-offwhite pl-3 border-l-2 border-lime/45"
            >
              {SERVICES_SUB_LABELS[currentLocale].web}
            </Link>
            <Link
              href={buildPath("leistungen/branding", currentLocale)}
              className="font-mono text-[14px] lowercase text-offwhite pl-3 border-l-2 border-[#b084d3]/45"
            >
              {SERVICES_SUB_LABELS[currentLocale].branding}
            </Link>
          </div>
          {links.map((l) => (
            <Link
              key={l.routeKey}
              href={buildPath(l.routeKey, currentLocale)}
              className="font-mono text-[14px] lowercase text-offwhite"
            >
              {l.labels[currentLocale]}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-ink/20">
            <div className="flex items-center gap-4">
              {LOCALES.map((code) => {
                const isActive = code === currentLocale;
                return (
                  <Link
                    key={code}
                    href={switchLocale(pathname, code)}
                    hrefLang={code}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "font-mono text-[11px] uppercase transition-colors",
                      isActive
                        ? "text-accent-ink"
                        : "text-offwhite/55 hover:text-offwhite",
                    )}
                  >
                    {LOCALE_LABELS[code].short}
                  </Link>
                );
              })}
            </div>
          </div>
          <Button
            href={`${buildPath("kontakt", currentLocale)}#projekt`}
            size="md"
            className="mt-2 self-start"
          >
            {CTA_LABELS[currentLocale]}
          </Button>
        </div>
      </div>
    </header>
  );
}
