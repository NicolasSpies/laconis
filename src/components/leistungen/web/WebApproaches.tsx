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
    text: "ich kläre mit dir wer du bist, was du brauchst, wer dein zielpublikum ist. ohne altbestand, ohne ‚das war schon immer so'.",
  },
  {
    num: "02",
    titel: "inhalte gemeinsam",
    text: "texte und bilder entstehen im prozess. ich helfe beim schreiben, wenn gewünscht. fotografen-empfehlung inklusive.",
  },
  {
    num: "03",
    titel: "design ohne ballast",
    text: "keine alte seite, keine alte struktur, keine kompromisse wegen legacy. system passt zu dir, nicht zur vorlage.",
  },
  {
    num: "04",
    titel: "6 bis 12 wochen",
    text: "länger als redesign, weil mehr neu entsteht. dafür steht am ende etwas, das wirklich nach dir aussieht.",
  },
];

const REDESIGN: Card[] = [
  {
    num: "01",
    titel: "inhalte behalten",
    text: "deine texte, deine bilder, deine historie. ich übernehme was du behalten willst, räume auf was raus soll, du fängst nicht bei null an.",
  },
  {
    num: "02",
    titel: "google verliert dich nicht",
    text: "jede alte URL bekommt einen sauberen 301-redirect. rankings bleiben stabil, verlinkende seiten landen weiter bei dir.",
  },
  {
    num: "03",
    titel: "kein ausfall",
    text: "deine alte seite bleibt online bis die neue live ist. ich schalte erst um, wenn du den knopf drückst.",
  },
  {
    num: "04",
    titel: "probephase auf test-domain",
    text: "du siehst das ergebnis vorher auf einer privaten URL. kommentieren, korrigieren, umbauen, alles bevor ein besucher etwas merkt.",
  },
];

type Tab = "neu" | "redesign";

export function WebApproaches({ num = "02" }: { num?: string } = {}) {
  const [tab, setTab] = useState<Tab>("redesign");
  const cards = tab === "neu" ? NEU : REDESIGN;

  return (
    <section className="pb-32">
      <div className="container-site">
        {/* KEIN fetter h2 mehr · klein-label + tabs + mini-lead, direkt aus hero flow */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-ink/10 pt-10">
          <div>
            <SectionLabel num={num}>zwei wege</SectionLabel>
            <h2 className="sr-only">zwei wege. gleiches handwerk.</h2>
            <p className="mt-4 max-w-[560px] text-[14px] md:text-[15px] leading-relaxed text-offwhite/55">
              {tab === "neu"
                ? "du startest bei null · keine alten URLs, kein legacy-content. freiere gestaltung, aber mehr entscheidungen am anfang. dafür mache ich den kompass."
                : "das meiste meiner arbeit ist redesign, nicht neubau · eine wordpress-seite von 2016, ein baukasten der jedes jahr 240 € frisst, eine wix-seite die keiner mehr aufmacht."}
            </p>
          </div>

          {/* TABS rechts oben */}
          <div
            role="tablist"
            aria-label="projekttyp"
            className="inline-flex rounded-full border border-ink/10 bg-ink/[0.03] p-1 shrink-0"
          >
          <button
            role="tab"
            aria-selected={tab === "redesign"}
            onClick={() => setTab("redesign")}
            className={[
              "px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all",
              tab === "redesign"
                ? "bg-lime text-[#111]"
                : "text-offwhite/55 hover:text-offwhite",
            ].join(" ")}
          >
            redesign
          </button>
          <button
            role="tab"
            aria-selected={tab === "neu"}
            onClick={() => setTab("neu")}
            className={[
              "px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all",
              tab === "neu"
                ? "bg-lime text-[#111]"
                : "text-offwhite/55 hover:text-offwhite",
            ].join(" ")}
          >
            neue seite
          </button>
          </div>
        </div>

        {/* CARDS */}
        <div
          key={tab}
          className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300"
        >
          {cards.map((c) => (
            <div
              key={c.num}
              className="rounded-xl border border-ink/10 bg-gradient-to-b from-ink/[0.02] to-transparent p-6 flex flex-col gap-3 hover:border-lime/25 transition-colors"
            >
              <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                {c.num} · {tab === "neu" ? "neu" : "redesign"}
              </span>
              <h3 className="heading-sans text-[16px] text-offwhite">
                {c.titel}
              </h3>
              <p className="text-[13px] leading-relaxed text-offwhite/55">
                {c.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
