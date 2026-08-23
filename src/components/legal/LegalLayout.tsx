"use client";

import Link from "next/link";
import { DeviceNav } from "@/components/device/DeviceNav";
import { CONTACT } from "@/config/contact";
import { DeviceFuss } from "@/components/device/DeviceFuss";
import { HeroRail } from "@/components/device/HeroRail";
import { useLocale } from "@/i18n/useLocale";
import { buildPath } from "@/i18n/config";
import "@/components/device/device.css";

/**
 * LegalLayout · impressum und datenschutz in der geräte-sprache.
 *
 * lief bis august 2026 noch in der alten papier-richtung: heller grund,
 * handschrift-schnitt für die randnotizen, leicht gedrehte texte. das
 * war der letzte ort auf der seite, an dem die verworfene bildsprache
 * überlebt hat.
 *
 * hier bleibt es bewusst RUHIG. pflichtseiten brauchen kein gerät zum
 * anfassen · sie brauchen luft, klare hierarchie und lesbare zeilen.
 * die einzige geste ist die schiene am rand, damit man sieht, dass man
 * dieselbe seite nicht verlassen hat.
 */

type Props = {
  num: string;
  label: string;
  titel: string;
  intro?: string;
  children: React.ReactNode;
};

/* `num` ist bei BEIDEN aufrufern das zeichen ⎔ · er ist eine
   nummerierungs-spalte, die keine nummer trägt und beim nächsten
   mal zu 01/02 einlädt. sektions-nummerierung ist raus. */
export function LegalLayout({ num, label, titel, intro, children }: Props) {
  const locale = useLocale();

  return (
    <div className="lab-root" data-no-reveal>
      {/* DREI spans · der dritte ist der heisse kern, den
          .lab-ambient span:nth-child(3) einfaerbt. alle aufrufer
          rendern bisher nur zwei, die regel lief ins leere. */}
      <div className="lab-ambient" aria-hidden>
        <span />
        <span />
        <span />
      </div>

      <DeviceNav />
      <HeroRail label={`${num} · ${label}`} />

      <section data-no-reveal className="relative px-gut pb-rh-s pt-hero">
        <div className="mx-auto max-w-shell">
          <h1 className="lab-display lab-boot max-w-[14ch] text-display">
            {titel}
          </h1>
          {intro && (
            <p
              className="lab-boot mt-7 max-w-measure text-lead leading-[1.6] text-[rgba(242,242,242,0.72)]"
              style={{ animationDelay: "160ms" }}
            >
              {intro}
            </p>
          )}
        </div>
      </section>

      <section data-no-reveal className="relative px-gut pb-rh-m">
        <div className="mx-auto max-w-shell space-y-14">{children}</div>
      </section>

      <section data-no-reveal className="relative px-gut pb-rh-l">
        <div className="mx-auto max-w-shell">
          <div className="flex flex-wrap justify-between gap-4 border-t border-[rgba(242,242,242,0.08)] pt-6">
            <Link href={buildPath("home", locale)} className="lab-label">
              ← lacønis
            </Link>
            <a className="lab-label" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      <DeviceFuss />
    </div>
  );
}

export function LegalSection({
  titel,
  aside,
  children,
}: {
  titel: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-start gap-8 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] md:gap-14">
      <div>
        {/* juristische überschriften sind lang ("§5 ddg / art. iii.74
            wer (be)") · in display-grösse fressen sie zwei zeilen und
            schreien lauter als der text, um den es geht */}
        <h2 className="text-lead font-medium leading-snug tracking-[-0.015em] text-[#f2f2f2]">
          {titel}
        </h2>
        <div className="mt-5 space-y-3 text-body leading-relaxed text-[rgba(242,242,242,0.72)]">
          {children}
        </div>
      </div>
      {/* die randnotiz stand vorher in handschrift und leicht gedreht ·
          jetzt ist sie einfach eine leise spalte */}
      {aside && (
        <aside className="text-body-sm leading-relaxed text-[var(--tx-3)] md:border-l md:border-[rgba(242,242,242,0.1)] md:pl-6 md:pt-1">
          {aside}
        </aside>
      )}
    </div>
  );
}

export function LegalRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="lx-row" style={{ gridTemplateColumns: "minmax(120px,180px) minmax(0,1fr)" }}>
      <span className="lab-label pt-0.5">{k}</span>
      <span className="text-body leading-relaxed text-[rgba(242,242,242,0.85)]">{v}</span>
    </div>
  );
}
