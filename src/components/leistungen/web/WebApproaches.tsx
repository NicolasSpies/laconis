"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * WebApproaches — tabs für zwei projekttypen:
 * neue seite (von null) vs redesign (bestehendes neu bauen).
 * Spart scroll-länge, zeigt nur was relevant ist.
 */

type Card = { num: string; titel: string; text: string };

const NEU: Card[] = [
  {
    num: "01",
    titel: "briefing von null",
    text: "Ich kläre mit dir, wer du bist, was du brauchst, wer dein Zielpublikum ist. Ohne Altbestand, ohne ‚das war schon immer so'.",
  },
  {
    num: "02",
    titel: "inhalte gemeinsam",
    text: "Texte und Bilder wachsen im Prozess · wenn du nicht gern schreibst, setze ich mich mit hin. Fotografen-Empfehlung gibt's dazu, wenn's nötig ist.",
  },
  {
    num: "03",
    titel: "design ohne ballast",
    text: "Keine alte Seite, keine alte Struktur, keine Kompromisse wegen Legacy. System passt zu dir, nicht zur Vorlage.",
  },
  {
    num: "04",
    titel: "6 bis 12 wochen",
    text: "Länger als Redesign, weil mehr neu entsteht. Dafür steht am Ende etwas, das wirklich nach dir aussieht.",
  },
];

const REDESIGN: Card[] = [
  {
    num: "01",
    titel: "inhalte behalten",
    text: "Deine Texte, deine Bilder, deine Historie. Ich übernehme, was du behalten willst, räume auf, was raus soll, du fängst nicht bei null an.",
  },
  {
    num: "02",
    titel: "google verliert dich nicht",
    text: "Jede alte URL bekommt einen sauberen 301-Redirect. Rankings bleiben stabil, verlinkende Seiten landen weiter bei dir.",
  },
  {
    num: "03",
    titel: "kein ausfall",
    text: "Deine alte Seite bleibt online, bis die neue live ist. Ich schalte erst um, wenn du den Knopf drückst.",
  },
  {
    num: "04",
    titel: "probephase auf test-domain",
    text: "Du siehst das Ergebnis vorher auf einer privaten URL. Kommentieren, korrigieren, umbauen · alles, bevor ein Besucher etwas merkt.",
  },
];

type Tab = "neu" | "redesign";

// subtile alternierende rotationen · papierstapel-feel
const CARD_ROTATIONS = ["-0.8deg", "0.5deg", "-0.5deg", "0.8deg"];

export function WebApproaches({ num = "02" }: { num?: string } = {}) {
  const [tab, setTab] = useState<Tab>("neu");
  const cards = tab === "neu" ? NEU : REDESIGN;

  return (
    <section className="pb-32 overflow-hidden">
      <div className="container-site">
        {/* label + mini-lead · klein, editorial, aus hero-flow */}
        <div className="border-t border-ink/10 pt-10">
          <SectionLabel num={num}>zwei wege</SectionLabel>
          <h2 className="sr-only">zwei wege. gleiches handwerk.</h2>
          <p className="mt-4 max-w-[620px] text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
            {tab === "neu"
              ? "Weißes Blatt · keine alten URLs, kein Content aus 2014, keine heilige Kuh, die man umschiffen muss. Freier Kopf, dafür mehr Entscheidungen am Anfang · den Kompass halt ich."
              : "Das meiste meiner Arbeit ist Redesign, nicht Neubau · eine WordPress-Seite von 2016, ein Baukasten, der jedes Jahr 240 € frisst, eine Wix-Seite, die keiner mehr aufmacht."}
          </p>
        </div>

        {/* underline-tabs · editorial style, konsistent mit OnDemandExtras */}
        <div className="mt-10 flex items-center gap-6">
          <span className="font-hand text-[18px] md:text-[20px] text-offwhite/55 -rotate-1 leading-none shrink-0 hidden md:inline-block">
            und bei dir?
          </span>
          <div
            role="tablist"
            aria-label="projekttyp"
            className="flex gap-1 border-b border-ink/10"
          >
            {(["neu", "redesign"] as const).map((t) => {
              const isActive = tab === t;
              const label = t === "redesign" ? "redesign" : "neue seite";
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setTab(t)}
                  className={[
                    "relative inline-flex items-center px-4 py-3 font-mono text-[12px] uppercase tracking-mono transition-colors",
                    isActive
                      ? "text-accent-ink"
                      : "text-offwhite/45 hover:text-offwhite/85",
                  ].join(" ")}
                >
                  {label}
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

        {/* CARDS · mit subtiler rotation und hover-reset */}
        <div
          key={tab}
          className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-300"
        >
          {cards.map((c, i) => (
            <div key={c.num} className="relative group">
              <article
                className="liquid-glass-dark rounded-xl p-6 flex flex-col gap-3 transition-transform duration-300 ease-out group-hover:!rotate-0 h-full"
                style={{ transform: `rotate(${CARD_ROTATIONS[i] ?? "0deg"})` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  schritt · {c.num}
                </span>
                <h3 className="heading-sans text-[16px] text-offwhite leading-tight">
                  {c.titel}
                </h3>
                <p className="text-[13px] leading-relaxed text-offwhite/75">
                  {c.text}
                </p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
