"use client";

import { motion } from "framer-motion";

/**
 * DeskScene — schreibtisch-aufsicht mit post-its + handy-mockup.
 * Ersetzt das alte post-it-scatter-layout im hero.
 * Desktop: 40/60 split (post-its links, phone rechts).
 * Mobile: phone oben, post-its drunter.
 */

type PostIt = {
  titel: string;
  kurz: string;
  farbe: string; // background
  ink: string;   // text-color
  rotate: number;
  x: number;     // absolute left in %
  y: number;     // absolute top in px
};

const POSTITS: PostIt[] = [
  {
    titel: "drei sprachen",
    kurz: "DE · FR · EN • verhandlungssicher.",
    farbe: "#E1FD52", // lime
    ink: "#0a0a0a",
    rotate: -4,
    x: 6,
    y: 10,
  },
  {
    titel: "seit 2019",
    kurz: "angefangen mit wordpress. heute: next.js + eigenes cms.",
    farbe: "#F7EED0", // cream
    ink: "#1a1a1a",
    rotate: 3,
    x: 40,
    y: 120,
  },
  {
    titel: "eupen",
    kurz: "ostbelgien. kunden in DE · BE · LUX · NL.",
    farbe: "#E1FD52",
    ink: "#0a0a0a",
    rotate: -2,
    x: 14,
    y: 270,
  },
];

const VCARD = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  "N:Spies;Nicolas;;;",
  "FN:Nicolas Spies",
  "ORG:lacønis",
  "TITLE:designer & web-developer",
  "EMAIL;TYPE=INTERNET,PREF:nicolas@laconis.be",
  "URL:https://laconis.be",
  "ADR;TYPE=WORK:;;;Eupen;;;Belgien",
  "NOTE:kaffee? gern. kurz vorher schreiben.",
  "END:VCARD",
].join("\r\n");

function downloadVCard() {
  if (typeof window === "undefined") return;
  const blob = new Blob([VCARD], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "nicolas-spies.vcf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function DeskScene() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 items-start">
          {/* POST-ITS */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative min-h-[460px] md:min-h-[500px]"
            >
              {POSTITS.map((p, i) => (
                <motion.div
                  key={p.titel}
                  initial={{ opacity: 0, y: 18, rotate: 0, scale: 0.95 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    rotate: p.rotate,
                    scale: 1,
                  }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.14,
                    type: "spring",
                    stiffness: 180,
                    damping: 16,
                  }}
                  className="absolute w-[220px] md:w-[240px] p-5 rounded-sm shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}px`,
                    background: p.farbe,
                  }}
                >
                  {/* tape */}
                  <span
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 rotate-[-4deg] opacity-50"
                    style={{ background: "rgba(0,0,0,0.12)" }}
                    aria-hidden
                  />
                  <h3
                    className="font-hand text-[22px] md:text-[24px] leading-tight"
                    style={{ color: p.ink }}
                  >
                    {p.titel}
                  </h3>
                  <p
                    className="mt-1.5 font-hand text-[15px] md:text-[16px] leading-snug"
                    style={{ color: p.ink, opacity: 0.7 }}
                  >
                    {p.kurz}
                  </p>
                </motion.div>
              ))}

              {/* pencil svg decoration */}
              <svg
                aria-hidden
                viewBox="0 0 240 20"
                className="absolute bottom-4 right-0 w-[180px] h-auto opacity-60 rotate-[8deg]"
              >
                <defs>
                  <linearGradient id="pencil-wood" x1="0" x2="1">
                    <stop offset="0" stopColor="#c8a066" />
                    <stop offset="1" stopColor="#8e6a3a" />
                  </linearGradient>
                </defs>
                {/* tip */}
                <polygon points="0,10 18,2 18,18" fill="#222" />
                <polygon points="14,6 18,10 14,14" fill="#f4d48c" />
                {/* body */}
                <rect x="18" y="2" width="180" height="16" fill="url(#pencil-wood)" />
                {/* ferrule */}
                <rect x="198" y="2" width="18" height="16" fill="#b8b0a0" />
                {/* eraser */}
                <rect x="216" y="2" width="24" height="16" rx="3" fill="#e08a7f" />
              </svg>
            </motion.div>
          </div>

          {/* iPHONE MOCKUP */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto w-[280px] md:w-[320px]"
            >
              <PhoneMock onAddContact={downloadVCard} />

              <div className="mt-6 text-center">
                <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/40">
                  tipp · vcard laden → kontakt ins adressbuch
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneMock({ onAddContact }: { onAddContact: () => void }) {
  return (
    <div
      className="relative aspect-[9/19] w-full rounded-[48px] border border-ink/15 overflow-hidden shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
      style={{
        background:
          "linear-gradient(160deg, #1e1e1e 0%, #0a0a0a 60%, #000 100%)",
        padding: "14px",
      }}
    >
      {/* inner screen */}
      <div className="relative h-full w-full rounded-[36px] bg-[#0a0a0a] overflow-hidden border border-ink/25">
        {/* dynamic island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 h-[22px] w-[90px] rounded-full bg-black z-10" />

        {/* status bar */}
        <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-6 z-[5] font-mono text-[10px] text-offwhite/80">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span>●●●●</span>
            <span className="opacity-70">100%</span>
          </span>
        </div>

        {/* content — contact card */}
        <div className="absolute inset-0 pt-14 px-5 pb-6 flex flex-col">
          {/* monogram "avatar" */}
          <div className="mx-auto mt-4 h-24 w-24 rounded-full border border-lime/40 bg-gradient-to-br from-lime/15 to-transparent flex items-center justify-center">
            <span
              className="heading-display text-[40px] text-accent-ink"
              style={{ letterSpacing: "-0.05em" }}
            >
              NS
            </span>
          </div>

          <div className="mt-4 text-center">
            <h4 className="heading-sans text-[20px] text-offwhite leading-tight">
              nicolas spies
            </h4>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/50">
              lacønis · eupen
            </p>
          </div>

          {/* fields */}
          <div className="mt-6 space-y-2.5">
            <Field label="mail" value="nicolas@laconis.be" />
            <Field label="web" value="laconis.be" />
            <Field label="ort" value="eupen · belgien" />
            <Field label="sprachen" value="DE · FR · EN" />
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={onAddContact}
              className="w-full rounded-2xl bg-lime text-black px-4 py-3 font-mono text-[11px] uppercase tracking-label font-semibold hover:bg-lime/90 transition-colors"
            >
              kontakt hinzufügen ↓
            </button>
            <p className="mt-2 text-center font-mono text-[8.5px] uppercase tracking-label text-offwhite/35">
              vcard · 1.2 kb
            </p>
          </div>
        </div>

        {/* home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-offwhite/30" />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink/15 bg-ink/[0.04] px-3.5 py-2.5">
      <div className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/40">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] text-offwhite">{value}</div>
    </div>
  );
}
