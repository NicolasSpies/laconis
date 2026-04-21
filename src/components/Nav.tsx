"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

type NavLink = {
  href: string;
  label: string;
};

const links: readonly NavLink[] = [
  { href: "/leistungen", label: "leistungen" },
  { href: "/referenzen", label: "referenzen" },
  { href: "/preise", label: "preise" },
  { href: "/ansatz", label: "ansatz" },
  { href: "/ueber-mich", label: "über mich" },
] as const;

type Lang = { code: "de" | "fr" | "en"; label: string; available: boolean };

const LANGS: readonly Lang[] = [
  { code: "de", label: "deutsch", available: true },
  { code: "fr", label: "français", available: false },
  { code: "en", label: "english", available: false },
] as const;

function LangDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const activeLang = LANGS.find((l) => l.available) ?? LANGS[0];

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
          "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase px-2 py-1 rounded transition-colors",
          "text-offwhite hover:text-accent-ink",
        )}
      >
        <span>{activeLang.code}</span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          aria-hidden
          className={cn(
            "transition-transform",
            open && "rotate-180",
          )}
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
        <div className="liquid-glass rounded-lg overflow-hidden">
          <ul className="py-1.5">
            {LANGS.map((l) => {
              const isActive = l.available;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    disabled={!l.available}
                    className={cn(
                      "w-full flex items-baseline justify-between gap-3 px-3.5 py-2 font-mono text-[11px] lowercase tracking-mono transition-colors",
                      isActive
                        ? "text-offwhite hover:text-accent-ink"
                        : "text-offwhite/35 cursor-not-allowed",
                    )}
                  >
                    <span className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          "uppercase text-[10px]",
                          isActive && "text-accent-ink",
                        )}
                      >
                        {l.code}
                      </span>
                      <span>{l.label}</span>
                    </span>
                    {!isActive && (
                      <span className="text-[8px] uppercase tracking-label text-offwhite/35">
                        bald
                      </span>
                    )}
                  </button>
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
        <Logo size="sm" variant="lime" className="mr-10" />

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.href !== "/" && pathname.startsWith(l.href + "/"));

            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative font-mono text-[12px] lowercase tracking-mono transition-colors",
                  active
                    ? "text-offwhite"
                    : "text-offwhite/55 hover:text-offwhite",
                )}
              >
                {l.label}
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
          <LangDropdown />
          <ThemeToggle />
          <Button href="/kontakt#projekt" size="sm">
            projekt starten →
          </Button>
        </div>

        <button
          type="button"
          aria-label="menu"
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-offwhite transition-transform",
              open && "translate-y-[7px] rotate-45",
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-offwhite transition-opacity",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1.5px] bg-offwhite transition-transform",
              open && "-translate-y-[7px] -rotate-45",
            )}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 nav-glass-drawer border-t border-ink/10",
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-site py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[14px] lowercase text-offwhite"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-ink/10">
            <div className="flex items-center gap-3">
              {LANGS.map((l) => (
                <span
                  key={l.code}
                  className={cn(
                    "font-mono text-[11px] uppercase",
                    l.available ? "text-offwhite" : "text-offwhite/25",
                  )}
                >
                  {l.code}
                </span>
              ))}
            </div>
            <ThemeToggle />
          </div>
          <Button href="/kontakt#projekt" size="md" className="mt-2 self-start">
            projekt starten →
          </Button>
        </div>
      </div>
    </header>
  );
}
