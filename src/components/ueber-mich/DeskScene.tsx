"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CONTACT } from "@/config/contact";

/**
 * DeskScene — schreibtisch-aufsicht mit post-its + handy-mockup.
 *
 * revamp:
 *   - bleistift mit stroke-draw on enter
 *   - post-its mit hover-flatter (±2deg + lift)
 *   - post-it-click zeigt hand-notiz 2s
 *   - phone mit idle-shake alle 8s (sehr subtil)
 *   - phone-hover → screen brightness +10%
 *   - kaffee-tasse mit dampf (endlos-loop, reduce-motion-safe)
 *   - tintenfleck-vignette hinter post-its
 *   - klemmbrett-rand oben links (bricht grid auf)
 *
 * alle animationen respektieren prefers-reduced-motion.
 */

type PostIt = {
  titel: string;
  kurz: string;
  aside: string; // hand-notiz beim click
  farbe: string;
  ink: string;
  rotate: number;
  x: number;
  y: number;
};

const POSTITS: PostIt[] = [
  {
    titel: "drei sprachen",
    kurz: "DE · FR · EN • verhandlungssicher.",
    aside: "meetings · mails · kleingedrucktes.",
    farbe: "#E1FD52",
    ink: "#0a0a0a",
    rotate: -4,
    x: 6,
    y: 10,
  },
  {
    titel: "seit 2019",
    kurz: "angefangen mit wordpress. heute: next.js + eigenes cms.",
    aside: "genau das.",
    farbe: "#F7EED0",
    ink: "#1a1a1a",
    rotate: 3,
    x: 40,
    y: 120,
  },
  {
    titel: "eupen",
    kurz: "ostbelgien. kunden in DE · BE · LUX.",
    aside: "kaffee? gern.",
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
  `EMAIL;TYPE=INTERNET,PREF:${CONTACT.email}`,
  ...(CONTACT.phone ? [`TEL;TYPE=CELL:${CONTACT.phoneE164}`] : []),
  "URL:https://laconis.be",
  `ADR;TYPE=WORK:;;;${CONTACT.city};;;Belgien`,
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

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function DeskScene() {
  return (
    <section className="pb-32">
      <div className="container-site">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-10 lg:gap-14 items-start">
          {/* POST-ITS + dekor */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative min-h-[460px] md:min-h-[500px]"
            >
              {/* klemmbrett-rand oben links · bricht das grid auf */}
              <ClipboardEdge />

              {/* tintenfleck-vignette hinter post-its */}
              <InkBlot />

              {POSTITS.map((p, i) => (
                <PostItCard key={p.titel} post={p} index={i} />
              ))}

              {/* kaffee-tasse mit dampf · unten links, kleine prise leben */}
              <CoffeeCup />

              {/* bleistift mit stroke-draw on enter · unten rechts */}
              <PencilDraw />
            </motion.div>
          </div>

          {/* iPHONE MOCKUP */}
          <div className="order-1 lg:order-2">
            <PhoneColumn />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* POST-IT                                                             */
/* ------------------------------------------------------------------ */

function PostItCard({ post, index }: { post: PostIt; index: number }) {
  const [noteOpen, setNoteOpen] = useState(false);

  useEffect(() => {
    if (!noteOpen) return;
    const t = setTimeout(() => setNoteOpen(false), 2000);
    return () => clearTimeout(t);
  }, [noteOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: 0, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: post.rotate,
        scale: 1,
      }}
      whileHover={{
        rotate: post.rotate + (index % 2 === 0 ? 2 : -2),
        y: -4,
        boxShadow: "0 28px 60px -20px rgba(0,0,0,0.85)",
      }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.14,
        type: "spring",
        stiffness: 180,
        damping: 16,
      }}
      onClick={() => setNoteOpen(true)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setNoteOpen(true);
        }
      }}
      className="absolute w-[220px] md:w-[240px] p-5 rounded-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-lime/50 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
      style={{
        left: `${post.x}%`,
        top: `${post.y}px`,
        background: post.farbe,
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
        style={{ color: post.ink }}
      >
        {post.titel}
      </h3>
      <p
        className="mt-1.5 font-hand text-[15px] md:text-[16px] leading-snug"
        style={{ color: post.ink, opacity: 0.7 }}
      >
        {post.kurz}
      </p>

      {/* hand-notiz, nach click 2s sichtbar */}
      <motion.span
        initial={false}
        animate={{
          opacity: noteOpen ? 1 : 0,
          y: noteOpen ? 0 : 6,
          rotate: noteOpen ? -6 : -10,
        }}
        transition={{ duration: 0.25 }}
        className="pointer-events-none absolute -bottom-4 right-3 font-hand text-[18px] text-accent-ink"
        aria-hidden
      >
        {post.aside}
      </motion.span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* DEKOR · klemmbrett, tintenfleck, kaffee, bleistift                 */
/* ------------------------------------------------------------------ */

function ClipboardEdge() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 80"
      className="absolute -top-4 -left-6 w-[120px] h-auto opacity-35 rotate-[-6deg] pointer-events-none"
    >
      {/* klemme */}
      <rect
        x="44"
        y="2"
        width="30"
        height="14"
        rx="3"
        fill="#b8b0a0"
        stroke="#3a3a3a"
        strokeWidth="1.2"
      />
      <rect x="54" y="2" width="10" height="14" rx="2" fill="#6e6a60" />
      {/* brett-rand */}
      <path
        d="M 10 14 L 110 14 L 110 78 L 10 78 Z"
        fill="#d8cfb4"
        stroke="#2a2a2a"
        strokeWidth="1.2"
      />
      {/* scribble-linien auf dem papier */}
      <path
        d="M 22 30 Q 40 28 60 32 T 100 30"
        stroke="#3a3a3a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 22 42 Q 40 40 60 44 T 100 42"
        stroke="#3a3a3a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M 22 54 Q 40 52 60 56 T 86 54"
        stroke="#3a3a3a"
        strokeWidth="0.8"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

function InkBlot() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="desk-inkblot absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply"
    >
      <defs>
        <radialGradient id="blot-grad" cx="50%" cy="50%" r="50%">
          <stop className="desk-inkblot-stop" offset="0%" stopColor="#1a1a1a" stopOpacity="0.55" />
          <stop className="desk-inkblot-stop" offset="70%" stopColor="#1a1a1a" stopOpacity="0.08" />
          <stop className="desk-inkblot-stop" offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* unregelmäßiger fleck */}
      <path
        d="M 200 120 C 260 100 320 150 320 210 C 330 270 270 310 210 300 C 150 295 100 260 110 200 C 115 150 150 130 200 120 Z"
        fill="url(#blot-grad)"
      />
    </svg>
  );
}

function CoffeeCup() {
  const reduced = useRef<boolean>(false);
  useEffect(() => {
    reduced.current = prefersReducedMotion();
  }, []);

  return (
    <div
      className="absolute bottom-6 left-0 w-[90px] h-[110px] pointer-events-none opacity-80"
      aria-hidden
    >
      <svg viewBox="0 0 90 110" className="w-full h-full">
        {/* dampf · drei wellige pfade mit offset-loop */}
        <g className="coffee-steam desk-coffee-steam" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M 30 45 Q 25 35 30 25 Q 35 15 30 5" className="steam-path-1" />
          <path d="M 45 45 Q 50 35 45 25 Q 40 15 45 5" className="steam-path-2" />
          <path d="M 60 45 Q 55 35 60 25 Q 65 15 60 5" className="steam-path-3" />
        </g>
        {/* tasse */}
        <path
          className="desk-coffee-cup"
          d="M 18 55 L 72 55 L 66 100 Q 64 104 60 104 L 30 104 Q 26 104 24 100 Z"
          fill="#f5f1e8"
          strokeWidth="1.8"
        />
        {/* kaffee-oberfläche */}
        <ellipse cx="45" cy="55" rx="27" ry="4" fill="#3a2418" />
        {/* henkel */}
        <path
          className="desk-coffee-cup"
          d="M 72 62 Q 86 64 84 76 Q 82 86 68 84"
          strokeWidth="1.8"
          fill="none"
        />
      </svg>
      <style>{`
        .coffee-steam path {
          stroke-dasharray: 30;
          stroke-dashoffset: 0;
          animation: steam-float 3.4s ease-in-out infinite;
          opacity: 0;
        }
        .steam-path-1 { animation-delay: 0s; }
        .steam-path-2 { animation-delay: 0.5s; }
        .steam-path-3 { animation-delay: 1s; }
        @keyframes steam-float {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 0.8; }
          80% { opacity: 0.4; }
          100% { transform: translateY(-6px); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .coffee-steam path {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

function PencilDraw() {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // "zeichnung" als pfade mit stroke-dashoffset, geschrieben in 1.2s
  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 240 40"
      className="absolute bottom-4 right-0 w-[200px] h-auto opacity-70 rotate-[8deg]"
    >
      <defs>
        <linearGradient id="pencil-wood-2" x1="0" x2="1">
          <stop offset="0" stopColor="#c8a066" />
          <stop offset="1" stopColor="#8e6a3a" />
        </linearGradient>
      </defs>

      {/* pencil solids · fade in */}
      <g style={{ opacity: drawn ? 1 : 0, transition: "opacity 0.6s ease-out 0.4s" }}>
        <polygon points="0,20 18,12 18,28" fill="#222" />
        <polygon points="14,16 18,20 14,24" fill="#f4d48c" />
        <rect x="18" y="12" width="180" height="16" fill="url(#pencil-wood-2)" />
        <rect x="198" y="12" width="18" height="16" fill="#b8b0a0" />
        <rect x="216" y="12" width="24" height="16" rx="3" fill="#e08a7f" />
      </g>

      {/* scribble-strich, der aussieht wie vom bleistift gezeichnet */}
      <path
        className="desk-pencil-scribble"
        d="M 20 38 Q 60 34 100 38 T 180 36 Q 210 34 230 36"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        style={{
          strokeDasharray: 260,
          strokeDashoffset: drawn ? 0 : 260,
          transition: "stroke-dashoffset 1.2s ease-out",
        }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* PHONE                                                               */
/* ------------------------------------------------------------------ */

function PhoneColumn() {
  const controls = useAnimation();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let cancelled = false;
    const schedule = () => {
      if (cancelled) return;
      const timer = setTimeout(async () => {
        if (cancelled) return;
        await controls.start({
          x: [0, -1.5, 1.5, -1, 1, 0],
          rotate: [0, -0.3, 0.3, -0.2, 0.2, 0],
          transition: { duration: 0.25, ease: "easeInOut" },
        });
        schedule();
      }, 8000);
      return () => clearTimeout(timer);
    };
    const cleanup = schedule();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mx-auto w-[280px] md:w-[320px]"
    >
      <motion.div
        animate={controls}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          filter: hovered ? "brightness(1.1)" : "brightness(1)",
          transition: "filter 0.4s ease-out",
        }}
      >
        <PhoneMock onAddContact={downloadVCard} />
      </motion.div>

      <div className="mt-6 text-center">
        <span className="font-mono text-[10px] uppercase tracking-label text-offwhite/35">
          tipp · vcard laden → kontakt ins adressbuch
        </span>
      </div>
    </motion.div>
  );
}

function PhoneMock({ onAddContact }: { onAddContact: () => void }) {
  return (
    <div
      className="relative aspect-[9/19] w-full rounded-[48px] border border-ink/10 overflow-hidden shadow-[0_50px_120px_-40px_rgba(0,0,0,0.9)]"
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
        <div className="absolute top-0 inset-x-0 h-10 flex items-center justify-between px-6 z-[5] font-mono text-[10px] text-offwhite/75">
          <span>9:41</span>
          <span className="flex items-center gap-1.5">
            <span>●●●●</span>
            <span className="opacity-70">100%</span>
          </span>
        </div>

        {/* content — contact card */}
        <div className="absolute inset-0 pt-14 px-5 pb-6 flex flex-col">
          {/* monogram "avatar" */}
          <div className="mx-auto mt-4 h-24 w-24 rounded-full border border-lime/50 bg-gradient-to-br from-lime/25 to-transparent flex items-center justify-center">
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
            <p className="mt-1 font-mono text-[10px] uppercase tracking-label text-offwhite/55">
              lacønis · eupen
            </p>
          </div>

          {/* fields */}
          <div className="mt-6 space-y-2.5">
            <Field label="mail" value={CONTACT.email} />
            <Field label="web" value="laconis.be" />
            <Field label="ort" value="Eupen · Belgien" />
            <Field label="sprachen" value="DE · FR · EN" />
          </div>

          {/* CTA */}
          <div className="mt-auto pt-4">
            <button
              type="button"
              onClick={onAddContact}
              className="w-full rounded-2xl bg-lime text-black px-4 py-3 font-mono text-[11px] uppercase tracking-label font-semibold hover:bg-lime/80 transition-colors"
            >
              kontakt hinzufügen ↓
            </button>
            <p className="mt-2 text-center font-mono text-[8.5px] uppercase tracking-label text-offwhite/35">
              vcard · 1.2 kb
            </p>
          </div>
        </div>

        {/* home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-28 rounded-full bg-offwhite/35" />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-ink/[0.04] px-3.5 py-2.5">
      <div className="font-mono text-[8.5px] uppercase tracking-label text-offwhite/35">
        {label}
      </div>
      <div className="mt-0.5 text-[13px] text-offwhite">{value}</div>
    </div>
  );
}
