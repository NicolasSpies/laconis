"use client";

import { useState } from "react";

/**
 * OnDemandExtras — underline-tabs mit mini-icons, bubbles als content.
 */

type Kat = {
  key: string;
  label: string;
  icon: React.ReactNode;
  items: string[];
};

const ICONS = {
  digital: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
      <rect
        x="3"
        y="4"
        width="18"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path
        d="M9 20 L15 20 M12 17 L12 20"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  ),
  print: (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" aria-hidden>
      <path
        d="M7 3 L17 3 L17 21 L7 21 Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M10 7 L14 7 M10 11 L14 11 M10 15 L13 15"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  ),
};

const KATEGORIEN: Kat[] = [
  {
    key: "digital",
    label: "digitales",
    icon: ICONS.digital,
    items: [
      "erweiterter brand guide",
      "social-templates",
      "banner · ads",
      "newsletter-header",
      "präsentationen",
      "icons · piktogramme",
      "infografiken",
    ],
  },
  {
    key: "print",
    label: "drucksachen",
    icon: ICONS.print,
    items: [
      "erweiterter brand guide",
      "flyer",
      "broschüre",
      "plakat",
      "roll-up",
      "speisekarte",
      "aufkleber",
      "visitenkarten-nachdruck",
    ],
  },
];

export function OnDemandExtras() {
  const [active, setActive] = useState<string>(KATEGORIEN[0].key);
  const current = KATEGORIEN.find((k) => k.key === active) ?? KATEGORIEN[0];

  return (
    <section className="pb-32 pt-8 md:pt-10">
      <div className="container-site">
        {/* kein section-label · flow aus "was du bekommst" direkt durch den teaser-pfeil */}
        <h3 className="heading-display text-[clamp(1.25rem,2.5vw,1.6rem)] text-offwhite leading-[1.15] text-center">
          einzeln{" "}
          <span className="italic font-serif text-accent-ink">zubuchbar</span>
          .
        </h3>

        {/* underline-tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            className="flex gap-1 border-b border-ink/10"
          >
            {KATEGORIEN.map((k) => {
              const isActive = k.key === active;
              return (
                <button
                  key={k.key}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActive(k.key)}
                  className={[
                    "relative inline-flex items-center gap-2 px-4 py-3 font-mono text-[12px] transition-colors",
                    isActive
                      ? "text-accent-ink"
                      : "text-offwhite/45 hover:text-offwhite/85",
                  ].join(" ")}
                >
                  <span
                    className={
                      isActive ? "text-accent-ink" : "text-offwhite/35"
                    }
                  >
                    {k.icon}
                  </span>
                  <span>{k.label}</span>
                  <span
                    className={[
                      "font-mono text-[10px]",
                      isActive ? "text-accent-ink/55" : "text-offwhite/25",
                    ].join(" ")}
                  >
                    · {k.items.length}
                  </span>

                  {/* underline */}
                  <span
                    aria-hidden
                    className={[
                      "absolute left-0 right-0 -bottom-px h-[2px] transition-transform origin-center",
                      isActive ? "bg-lime scale-x-100" : "bg-lime scale-x-0",
                    ].join(" ")}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* bubble-content */}
        <div className="mt-8 mx-auto max-w-[720px]">
          <div className="flex flex-wrap items-start justify-center gap-2 min-h-[88px]">
            {current.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-3 py-1.5 rounded-full border border-ink/10 bg-ink/[0.015] font-mono text-[12px] text-offwhite/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* lockerer hand-aside unter den bubbles */}
        <p className="mt-10 mx-auto max-w-[640px] text-center font-hand text-[18px] md:text-[20px] leading-snug text-offwhite/55 -rotate-[0.8deg]">
          und sicher noch vieles mehr · was mir gerade nicht einfällt.
          <br />
          <span className="text-offwhite/80">
            du hast als kunde bestimmt krassere ideen als ich · raus damit.
          </span>
        </p>
      </div>
    </section>
  );
}
