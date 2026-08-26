"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Wortmarke } from "./Wortmarke";
import { Button } from "./ui/Button";
import { MenuToggleIcon } from "./ui/MenuToggleIcon";
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
  routeKey: "referenzen" | "leistung";
  labels: Record<Locale, string>;
};

/* NUR NOCH auf der alten oberfläche · /leistungen/web gibt es
   seit dem relaunch nicht mehr, der link geht auf /studio.
   web-only: EIN direkter leistungs-link ·
   kein dropdown ("web" als label wäre doppelt — die ganze seite IST web) ·
   branding hat keine eigene seite mehr (august 2026) */
const SERVICE_LABELS: Record<Locale, string> = {
  de: "leistung",
  fr: "service",
  en: "service",
};

/* NUR NOCH auf der alten oberfläche (/preview,
   /web-performance-ostbelgien) · die vier lebenden seiten
   bringen DeviceNav mit.
   zwei punkte statt vier · preise und ueber-mich sind seit dem
   umbau teil von /studio und haben keine eigene route mehr */
const links: readonly NavLink[] = [
  {
    routeKey: "referenzen",
    labels: { de: "arbeiten", fr: "travaux", en: "work" },
  },
  {
    routeKey: "leistung",
    labels: { de: "studio", fr: "studio", en: "studio" },
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
          "text-offwhite hover:text-[#b084d3]",
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

  /* body-scroll-lock + escape solange das fullscreen-menü offen ist */
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* einträge fürs fullscreen-menü · web zuerst, branding bewusst NICHT
     (stille seite · nur über footer erreichbar) */
  const menuItems = [
    {
      key: "web",
      href: buildPath("leistung", currentLocale),
      label: SERVICE_LABELS[currentLocale],
      accent: "#e1fd52",
    },
    ...links.map((l) => ({
      key: l.routeKey,
      href: buildPath(l.routeKey, currentLocale),
      label: l.labels[currentLocale],
      accent: "#e1fd52",
    })),
  ];

  return (
    <header
      data-theme={open ? "dark" : undefined}
      className={cn(
        "fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 border-b",
        open
          ? "bg-transparent border-transparent"
          : scrolled
            ? "nav-glass-scrolled border-ink/15"
            : "nav-glass border-ink/5",
      )}
    >
      <div className="container-site flex items-center justify-between h-16">
        {/* logo · auf dem dunklen fullscreen-menü hell, sonst dark */}
        <Wortmarke
          className={cn(
            "mr-10 relative z-[1] h-4 w-auto",
            open ? "text-offwhite" : "text-ink",
          )}
          title="lacønis"
        />

        <nav className="hidden md:flex items-center gap-7">
          {(() => {
            const href = buildPath("leistung", currentLocale);
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                href={href}
                className={cn(
                  "link-draw relative whitespace-nowrap font-mono text-[12px] lowercase tracking-mono transition-colors",
                  active
                    ? "text-offwhite"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                {SERVICE_LABELS[currentLocale]}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-lime"
                  />
                )}
              </Link>
            );
          })()}
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
          className={cn(
            "tactile-press md:hidden p-2 -mr-2 rounded relative z-[1] transition-colors",
            open ? "text-[#f2f2f2]" : "text-offwhite",
          )}
          onClick={() => setOpen((v) => !v)}
        >
          <MenuToggleIcon open={open} className="w-6 h-6" />
        </button>
      </div>

      {/* Fullscreen mobile menu · portal in body, hinter der nav-leiste
          (z-9990 < header 10000, damit logo + X klickbar bleiben) */}
      {open &&
        createPortal(
          <div
            data-theme="dark"
            className="md:hidden fixed inset-0 z-[9990] bg-[#0a0a0a] animate-in fade-in duration-300"
          >
            {/* inverted dot-grid */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(242,242,242,0.6) 1px, transparent 1.4px)",
                backgroundSize: "26px 26px",
              }}
            />
            {/* akzent-glows */}
            <div
              aria-hidden
              className="absolute -top-28 -right-28 w-[65vw] h-[65vw] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(225,253,82,0.10), transparent 70%)",
              }}
            />
            <div
              aria-hidden
              className="absolute -bottom-32 -left-24 w-[65vw] h-[65vw] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(176,132,211,0.13), transparent 70%)",
              }}
            />

            <div className="relative h-[100dvh] container-site flex flex-col pt-24 pb-10 overflow-y-auto">
              <nav className="flex-1 flex flex-col justify-center gap-0.5">
                {menuItems.map((item, i) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center gap-4 py-2 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
                      style={{
                        animationDelay: `${90 + i * 55}ms`,
                        animationDuration: "560ms",
                      }}
                    >
                      <span
                        className="font-mono text-[12px] tabular-nums w-7 shrink-0"
                        style={{ color: item.accent, opacity: active ? 1 : 0.55 }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="font-display font-black lowercase tracking-[-0.035em] leading-[0.92] text-[clamp(2.6rem,13vw,4.4rem)] transition-colors"
                        style={{ color: active ? item.accent : "#f2f2f2" }}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <span
                          aria-hidden
                          className="ml-2 w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: item.accent }}
                        />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* footer · sprache + CTA */}
              <div
                className="relative pt-7 mt-6 border-t border-offwhite/15 flex items-center justify-between gap-4 animate-in fade-in fill-mode-both"
                style={{
                  animationDelay: `${90 + menuItems.length * 55 + 80}ms`,
                  animationDuration: "560ms",
                }}
              >
                <div className="flex items-center gap-4">
                  {LOCALES.map((code) => {
                    const isActive = code === currentLocale;
                    return (
                      <Link
                        key={code}
                        href={switchLocale(pathname, code)}
                        hrefLang={code}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "font-mono text-[12px] uppercase tracking-mono transition-colors",
                          isActive
                            ? "text-[#e1fd52]"
                            : "text-offwhite/45 hover:text-offwhite",
                        )}
                      >
                        {LOCALE_LABELS[code].short}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href={`${buildPath("kontakt", currentLocale)}#projekt`}
                  onClick={() => setOpen(false)}
                  className="tactile inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-label px-6 py-3.5 rounded-full bg-[#e1fd52] text-[#0a0a0a]"
                >
                  {CTA_LABELS[currentLocale]}
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
