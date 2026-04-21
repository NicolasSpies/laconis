"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";
import { track } from "@/lib/analytics";

type Variant = "primary" | "glass" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "btn-primary tactile bg-lime text-[#111] border border-lime",
  glass:
    "tactile-sm bg-ink/[0.06] backdrop-blur-xl text-offwhite border border-ink/10 hover:border-ink/25",
  ghost:
    "tactile-sm bg-transparent text-offwhite border border-ink/25 hover:border-ink/40",
  dark: "tactile bg-dark text-offwhite border border-ink/10 hover:border-lime",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-[11px]",
  md: "px-5 py-2.5 text-[12px]",
  lg: "px-7 py-3.5 text-[13px]",
};

/* transition-all bewusst NICHT mehr drin · würde mit .tactile's
   eigener transform/box-shadow-transition kollidieren (duration-mismatch).
   colors kriegen eigene transition damit hover-color-changes smooth bleiben. */
const base =
  "inline-flex items-center justify-center gap-2 font-mono lowercase tracking-mono rounded-full whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed [transition:background-color_0.3s,color_0.3s,border-color_0.3s]";

type Common = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  /**
   * wenn gesetzt, fired `cta_click`-analytics beim klick.
   * label sollte lesbar sein (z.b. "hero_primary" oder "referenzen_detail").
   */
  analyticsLabel?: string;
};

type AsLink = Common & { href: string } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof Common
  >;
type AsButton = Common & { href?: undefined } & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof Common
  >;

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  AsLink | AsButton
>(function Button(
  { variant = "primary", size = "md", className, children, analyticsLabel, ...rest },
  ref,
) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, onClick, ...a } = rest;
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (analyticsLabel) {
        track({
          type: "cta_click",
          label: analyticsLabel,
          target: typeof href === "string" ? href : String(href),
        });
      }
      onClick?.(e);
    };
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={cls}
        onClick={handleClick}
        {...a}
      >
        {children}
      </Link>
    );
  }

  const { onClick, ...btnRest } = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (analyticsLabel) {
      track({
        type: "cta_click",
        label: analyticsLabel,
        target: "button",
      });
    }
    onClick?.(e);
  };
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={cls}
      onClick={handleClick}
      {...btnRest}
    >
      {children}
    </button>
  );
});
