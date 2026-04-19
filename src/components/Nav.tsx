"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

type SubLink = { href: string; label: string; kurz: string };
type NavLink = {
  href: string;
  label: string;
  children?: readonly SubLink[];
};

const links: readonly NavLink[] = [
  {
    href: "/leistungen/web",
    label: "leistungen",
    children: [
      {
        href: "/leistungen/web",
        label: "web",
        kurz: "websites, cms, hosting",
      },
      {
        href: "/leistungen/kreatives",
        label: "kreatives",
        kurz: "logo, brand, print",
      },
    ],
  },
  { href: "/referenzen", label: "referenzen" },
  { href: "/preise", label: "preise" },
  { href: "/ueber-mich", label: "über mich" },
] as const;

const langs = ["de", "fr", "en"] as const;

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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark/60 backdrop-blur-xl border-b border-ink/10"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <div className="container-site flex items-center justify-between h-16">
        <Logo size="sm" variant="lime" className="mr-10" />

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => {
            const active =
              pathname === l.href ||
              (l.children?.some((c) => pathname === c.href) ?? false) ||
              (l.href === "/leistungen/web" &&
                pathname.startsWith("/leistungen"));

            if (l.children) {
              return (
                <div key={l.href} className="relative group">
                  <Link
                    href={l.href}
                    className={cn(
                      "font-mono text-[12px] lowercase tracking-mono transition-colors inline-flex items-center gap-1",
                      active
                        ? "text-offwhite"
                        : "text-offwhite/50 hover:text-offwhite",
                    )}
                  >
                    {l.label}
                    <svg
                      aria-hidden
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                      className="mt-[1px] transition-transform group-hover:rotate-180"
                    >
                      <path
                        d="M1.5 2.75L4 5.25L6.5 2.75"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>

                  {/* Hover bridge — kills the gap between link and menu */}
                  <div
                    aria-hidden
                    className="absolute left-0 right-0 top-full h-3"
                  />

                  {/* Dropdown */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+0.75rem)] min-w-[240px] rounded-xl border border-ink/10 bg-dark/95 backdrop-blur-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] p-2 opacity-0 translate-y-1 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200"
                  >
                    {l.children.map((c) => {
                      const sub = pathname === c.href;
                      return (
                        <Link
                          key={c.href}
                          href={c.href}
                          className={cn(
                            "block px-3 py-2.5 rounded-md transition-colors group/item",
                            sub
                              ? "bg-ink/[0.04]"
                              : "hover:bg-ink/[0.03]",
                          )}
                        >
                          <div className="flex items-baseline justify-between gap-4">
                            <span
                              className={cn(
                                "font-mono text-[12px] lowercase tracking-mono transition-colors",
                                sub
                                  ? "text-accent-ink"
                                  : "text-offwhite group-hover/item:text-accent-ink",
                              )}
                            >
                              {c.label}
                            </span>
                            <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/30 group-hover/item:text-offwhite/50 transition-colors">
                              →
                            </span>
                          </div>
                          <span className="mt-0.5 block text-[11px] text-offwhite/45 lowercase">
                            {c.kurz}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-mono text-[12px] lowercase tracking-mono transition-colors",
                  active
                    ? "text-offwhite"
                    : "text-offwhite/50 hover:text-offwhite",
                )}
              >
                {l.label}
              </Link>
            );
          })}
          <span
            aria-disabled
            className="font-mono text-[12px] lowercase tracking-mono text-offwhite/20 cursor-not-allowed"
            title="bald verfügbar"
          >
            shop
          </span>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
            {langs.map((l, i) => (
              <button
                key={l}
                type="button"
                disabled={i !== 0}
                className={cn(
                  "font-mono text-[10px] uppercase px-1.5 py-0.5 rounded",
                  i === 0
                    ? "text-offwhite"
                    : "text-offwhite/25 cursor-not-allowed",
                )}
                title={i !== 0 ? "bald verfügbar" : undefined}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="h-4 w-px bg-ink/15" />
          <ThemeToggle />
          <span className="h-4 w-px bg-ink/15" />
          <span
            aria-disabled
            className="font-mono text-[11px] lowercase tracking-mono text-offwhite/25 cursor-not-allowed"
            title="bald verfügbar"
          >
            login
          </span>
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
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300 bg-dark/90 backdrop-blur-xl border-t border-ink/10",
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-site py-6 flex flex-col gap-5">
          {links.map((l) => (
            <div key={l.href} className="flex flex-col gap-3">
              <Link
                href={l.href}
                className="font-mono text-[14px] lowercase text-offwhite"
              >
                {l.label}
              </Link>
              {l.children && (
                <div className="flex flex-col gap-2 pl-4 border-l border-ink/10">
                  {l.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="font-mono text-[12px] lowercase text-offwhite/60 hover:text-accent-ink transition-colors"
                    >
                      → {c.label}
                      <span className="ml-2 text-offwhite/30 normal-case">
                        {c.kurz}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <span className="font-mono text-[14px] lowercase text-offwhite/30">
            shop
          </span>
          <div className="flex items-center gap-3 pt-2 border-t border-ink/10">
            <ThemeToggle className="mr-2" />
            {langs.map((l, i) => (
              <span
                key={l}
                className={cn(
                  "font-mono text-[11px] uppercase",
                  i === 0 ? "text-offwhite" : "text-offwhite/30",
                )}
              >
                {l}
              </span>
            ))}
          </div>
          <Button href="/kontakt#projekt" size="md" className="mt-2 self-start">
            projekt starten →
          </Button>
        </div>
      </div>
    </header>
  );
}
