"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { BeforeAfterSlider } from "@/components/leistungen/BeforeAfterSlider";

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
    text: "wir klären wer du bist, was du brauchst, wer dein zielpublikum ist. ohne altbestand, ohne ‚das war schon immer so'.",
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
    text: "deine texte, deine bilder, deine historie. wir übernehmen was du behalten willst, räumen auf was raus soll, du fängst nicht bei null an.",
  },
  {
    num: "02",
    titel: "google verliert dich nicht",
    text: "jede alte URL bekommt einen sauberen 301-redirect. rankings bleiben stabil, verlinkende seiten landen weiter bei dir.",
  },
  {
    num: "03",
    titel: "kein ausfall",
    text: "deine alte seite bleibt online bis die neue live ist. wir schalten erst um, wenn du den knopf drückst.",
  },
  {
    num: "04",
    titel: "probephase auf test-domain",
    text: "du siehst das ergebnis vorher auf einer privaten URL. kommentieren, korrigieren, umbauen, alles bevor ein besucher etwas merkt.",
  },
];

type Tab = "neu" | "redesign";

export function WebApproaches() {
  const [tab, setTab] = useState<Tab>("redesign");
  const cards = tab === "neu" ? NEU : REDESIGN;

  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="max-w-[820px]">
          <SectionLabel num="03">zwei wege</SectionLabel>
          <h2 className="heading-display mt-4 text-[clamp(2rem,5.5vw,3.75rem)] text-offwhite leading-[1.05]">
            {tab === "neu" ? (
              <>
                neue seite von null.{" "}
                <span className="text-offwhite/35">
                  freie gestaltung, mehr entscheidungen.
                </span>
              </>
            ) : (
              <>
                du hast schon eine seite.{" "}
                <span className="text-offwhite/35">
                  wir machen eine, mit der du wieder gern rausgehst.
                </span>
              </>
            )}
          </h2>
          <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/60">
            {tab === "neu"
              ? "du startest bei null. keine alten URLs, kein legacy-content, kein seo-gepäck. freiere gestaltung, aber mehr entscheidungen am anfang — dafür mache ich den kompass."
              : "die meisten kommen nicht bei null. eine wordpress-seite von 2016, ein baukasten der jedes jahr 240 € frisst, eine wix-seite die keiner mehr aufmacht. das meiste meiner arbeit ist redesign, nicht neubau."}
          </p>
        </div>

        {/* TABS */}
        <div
          role="tablist"
          aria-label="projekttyp"
          className="mt-10 inline-flex rounded-full border border-ink/15 bg-ink/[0.03] p-1"
        >
          <button
            role="tab"
            aria-selected={tab === "redesign"}
            onClick={() => setTab("redesign")}
            className={[
              "px-5 py-2.5 rounded-full font-mono text-[11px] uppercase tracking-mono transition-all",
              tab === "redesign"
                ? "bg-lime text-[#111]"
                : "text-offwhite/60 hover:text-offwhite",
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
                : "text-offwhite/60 hover:text-offwhite",
            ].join(" ")}
          >
            neue seite
          </button>
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

        {/* BEFORE/AFTER SLIDER — ONLY IN REDESIGN TAB */}
        {tab === "redesign" && (
          <div className="mt-20 border-t border-ink/8 pt-14">
            <div className="mb-8 flex items-end justify-between gap-6 flex-wrap">
              <div className="max-w-[720px]">
                <span className="font-mono text-[11px] uppercase tracking-label text-offwhite/40">
                  demo · vorher / nachher
                </span>
                <h3 className="heading-display mt-3 text-[clamp(1.5rem,3.5vw,2.25rem)] text-offwhite">
                  zieh den regler.{" "}
                  <span className="text-offwhite/35">
                    dieselbe bäckerei. einmal baukasten, einmal nach dem
                    redesign.
                  </span>
                </h3>
              </div>
              <p className="max-w-[360px] text-[13px] leading-relaxed text-offwhite/50">
                unter dem regler pickst du eine farbe, die neue seite zieht sich
                direkt um.
              </p>
            </div>

            <BeforeAfterSlider />
          </div>
        )}
      </div>
    </section>
  );
}
