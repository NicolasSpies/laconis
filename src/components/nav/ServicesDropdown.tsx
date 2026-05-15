"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { buildPath, type Locale } from "@/i18n/config";

/**
 * Services mega-menu · hover/focus open, dual-card panel.
 * Web (lime) + Branding (lila) · mini-preview animation pro card.
 * Replaced the static /leistungen overview page.
 */

const LIME = "#e1fd52";
const LILA = "#b084d3";

type CardCopy = {
  title: string;
  body: string;
  cta: string;
};

type DropdownCopy = {
  web: CardCopy;
  branding: CardCopy;
};

const COPY: Record<Locale, DropdownCopy> = {
  de: {
    web: {
      title: "web",
      body: "websites · gebaut bei null · 95+ google-score · du pflegst selbst.",
      cta: "web ansehen →",
    },
    branding: {
      title: "branding",
      body: "logo, brand-system, print, social · alles aus einer hand.",
      cta: "branding ansehen →",
    },
  },
  fr: {
    web: {
      title: "web",
      body: "sites · partis de zéro · score google 95+ · tu gères toi-même.",
      cta: "voir le web →",
    },
    branding: {
      title: "branding",
      body: "logo, système de marque, print, social · une seule main.",
      cta: "voir le branding →",
    },
  },
  en: {
    web: {
      title: "web",
      body: "websites · built from scratch · 95+ google score · you maintain.",
      cta: "see web →",
    },
    branding: {
      title: "branding",
      body: "logo, brand system, print, social · all from one hand.",
      cta: "see branding →",
    },
  },
};

function WebMiniPreview() {
  return (
    <div
      aria-hidden
      className="w-full h-[88px] rounded-md overflow-hidden border bg-[rgba(10,10,10,0.04)]"
      style={{ borderColor: "rgba(10,10,10,0.18)" }}
    >
      {/* chrome */}
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5 border-b"
        style={{ borderColor: "rgba(10,10,10,0.15)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[rgba(10,10,10,0.35)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[rgba(10,10,10,0.35)]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[rgba(10,10,10,0.35)]" />
        <span className="ml-1.5 h-1.5 flex-1 rounded-sm bg-[rgba(10,10,10,0.12)]" />
      </div>
      {/* skeleton stripes */}
      <div className="p-2.5 space-y-1.5">
        {[0, 0.3, 0.6].map((delay, idx) => (
          <motion.div
            key={idx}
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
            className="h-1.5 rounded-sm bg-[rgba(10,10,10,0.4)]"
            style={{
              width: idx === 0 ? "82%" : idx === 1 ? "62%" : "70%",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function BrandingMiniPreview() {
  return (
    <div
      aria-hidden
      className="w-full h-[88px] rounded-md overflow-hidden border bg-[rgba(10,10,10,0.04)] flex items-center justify-center"
      style={{ borderColor: "rgba(10,10,10,0.18)" }}
    >
      <motion.span
        animate={{
          rotate: [0, 6, -6, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="inline-block font-black leading-none"
        style={{
          fontSize: "62px",
          color: LILA,
          letterSpacing: "-0.05em",
          textShadow: `0 0 18px ${LILA}55`,
        }}
      >
        ø
      </motion.span>
    </div>
  );
}

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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = COPY[currentLocale];

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

  const handleOpen = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
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

      {/* mega-panel · hover-bridge via padding-top */}
      <div
        role="menu"
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[640px] max-w-[92vw] origin-top transition-all duration-150 z-50",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
        )}
      >
        {/* caret */}
        <div
          className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rotate-45 bg-white border-l border-t border-[rgba(10,10,10,0.12)]"
          aria-hidden
        />
        <div
          className="rounded-xl overflow-hidden bg-white border border-[rgba(10,10,10,0.12)]"
          style={{
            boxShadow:
              "0 18px 48px rgba(10,10,10,0.18), 0 4px 12px rgba(10,10,10,0.08)",
          }}
        >
          <div className="grid grid-cols-2 divide-x divide-[rgba(10,10,10,0.1)]">
            {/* WEB */}
            <Link
              href={buildPath("leistungen/web", currentLocale)}
              onClick={() => setOpen(false)}
              className="group block p-5 hover:bg-[rgba(225,253,82,0.18)] transition-colors"
              style={{ borderTop: `3px solid ${LIME}` }}
            >
              <WebMiniPreview />
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-black lowercase text-[20px] text-[#0a0a0a] tracking-[-0.02em]">
                  {t.web.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                  01
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#0a0a0a]/65">
                {t.web.body}
              </p>
              <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-label text-[#0a0a0a] group-hover:translate-x-1 transition-transform">
                {t.web.cta}
              </span>
            </Link>

            {/* BRANDING */}
            <Link
              href={buildPath("leistungen/branding", currentLocale)}
              onClick={() => setOpen(false)}
              className="group block p-5 hover:bg-[rgba(176,132,211,0.16)] transition-colors"
              style={{ borderTop: `3px solid ${LILA}` }}
            >
              <BrandingMiniPreview />
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-black lowercase text-[20px] text-[#0a0a0a] tracking-[-0.02em]">
                  {t.branding.title}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/45">
                  02
                </span>
              </div>
              <p className="mt-1.5 text-[12px] leading-relaxed text-[#0a0a0a]/65">
                {t.branding.body}
              </p>
              <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-label text-[#0a0a0a] group-hover:translate-x-1 transition-transform">
                {t.branding.cta}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
