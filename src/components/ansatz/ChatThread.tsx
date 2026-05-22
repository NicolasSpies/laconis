"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale, pick } from "@/i18n/useLocale";
import type { Locale } from "@/i18n/config";

/**
 * ChatThread · simulierte iMessage-konversation für /ansatz.
 *
 * spielt sich von alleine ab (typing-delays + auto-scroll im phone-
 * frame) und zeigt einen typischen erstkontakt von "moin, was geht"
 * bis "staging-link freitag". untermalt den "ein mensch, keine
 * tickets"-claim mit echtem ablauf statt prozess-checkliste.
 *
 * gerendert in einem mock-iPhone-frame links, kontextspalte rechts
 * mit headline + meta-stats.
 */

type ChatMsg =
  | { kind: "msg"; side: "in" | "out"; text: string; time: string; delay: number }
  | { kind: "voice"; side: "out"; duration: string; time: string; delay: number }
  | {
      kind: "img";
      side: "out";
      img: string;
      cap: string;
      time: string;
      delay: number;
    };

type Dict = {
  sectionLabel: string;
  kicker: string;
  headlinePre: string;
  headlineItalic: string;
  intro: string;
  stats: { label: string; value: string }[];
  contactName: string;
  contactStatus: string;
  imessage: string;
  threadStart: string;
  hint: string;
  voiceCaption: string;
  imgCap: string;
  imgTime: string;
  messages: ChatMsg[];
};

const DICT: Record<Locale, Dict> = {
  de: {
    sectionLabel: "wie es startet",
    kicker: "↘ ein echter erstkontakt · sprache komprimiert",
    headlinePre: "kein briefing-formular. ",
    headlineItalic: "nur ein chat.",
    intro:
      "vom ersten „moin“ bis zum freitags-launch sind's bei mir meistens 12-18 nachrichten und eine sprachnachricht. kein kickoff-call mit 6 leuten, kein 80-seiten-deck. wenn die antworten sitzen, geht's los.",
    stats: [
      { label: "ø antwortzeit", value: "< 2h werktags" },
      { label: "kickoff", value: "morgens nach dem chat" },
      { label: "staging-url ab", value: "tag 3-4" },
      { label: "go-live", value: "tag 14-22" },
    ],
    contactName: "nicolas · laconis",
    contactStatus: "aktiv vor 2 min",
    imessage: "imessage",
    threadStart: "· mittwoch 09:14 ·",
    hint: "self-playing · echter ablauf, komprimiert ↗",
    voiceCaption: "voicemail",
    imgCap: "skizze · donnerstag 11:42",
    imgTime: "donnerstag 11:43",
    messages: [
      {
        kind: "msg",
        side: "in",
        text: "moin, sind eben über deine seite gestolpert. wir haben ne wix-site die uns nervt — laden mega lang, keine sprachen, sieht aus wie alle anderen.",
        time: "09:14",
        delay: 0,
      },
      {
        kind: "msg",
        side: "out",
        text: "moin! danke fürs schreiben. zwei fragen bevor ich was sage: 1) was macht ihr, 2) wer sind eure kunden?",
        time: "09:17",
        delay: 1900,
      },
      {
        kind: "msg",
        side: "in",
        text: "café/röster in lausanne. eröffnen bald in genf. zielgruppe 30+, schätzen craft.",
        time: "09:21",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "ok — und was nervt euch am meisten an wix konkret? ehrlich.",
        time: "09:23",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "in",
        text: "1) lädt langsam, vor allem mobil. 2) plugins kosten extra. 3) wir haben das gefühl, es ist nicht WIRKLICH unsere site, wir sind im wix-frame gefangen.",
        time: "09:30",
        delay: 2100,
      },
      {
        kind: "msg",
        side: "out",
        text: "ja klassiker. ich schick dir heute abend ne kurze sprachnachricht mit grobem rahmen + budget. kein pdf. einfach gesprochen.",
        time: "09:32",
        delay: 1900,
      },
      { kind: "voice", side: "out", duration: "4:18", time: "20:48", delay: 2400 },
      {
        kind: "msg",
        side: "in",
        text: "🎧 grad gehört. klingt gut. wann können wir starten?",
        time: "21:05",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "morgen. erste skizzen donnerstag, staging-url freitag.",
        time: "21:07",
        delay: 1300,
      },
      {
        kind: "img",
        side: "out",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format&fit=crop",
        cap: "skizze · donnerstag 11:42",
        time: "donnerstag 11:43",
        delay: 2200,
      },
      {
        kind: "msg",
        side: "in",
        text: "OOOH. genau die richtung. mach weiter.",
        time: "donnerstag 11:55",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "out",
        text: "🫡 staging-link kommt freitag 14:00. ab da iterieren wir live, du siehst alles.",
        time: "donnerstag 11:57",
        delay: 1500,
      },
    ],
  },
  fr: {
    sectionLabel: "comment ça démarre",
    kicker: "↘ un vrai premier contact · langue compressée",
    headlinePre: "pas de formulaire de briefing. ",
    headlineItalic: "juste un chat.",
    intro:
      "du premier « salut » au lancement vendredi, c'est 12-18 messages et un mémo vocal. pas de kickoff à 6 personnes, pas de deck de 80 pages. quand les réponses tiennent, on commence.",
    stats: [
      { label: "ø temps de réponse", value: "< 2h jours ouvrés" },
      { label: "kickoff", value: "le matin après le chat" },
      { label: "url staging dès", value: "jour 3-4" },
      { label: "go-live", value: "jour 14-22" },
    ],
    contactName: "nicolas · laconis",
    contactStatus: "actif il y a 2 min",
    imessage: "imessage",
    threadStart: "· mercredi 09:14 ·",
    hint: "lecture auto · vrai déroulé, compressé ↗",
    voiceCaption: "mémo vocal",
    imgCap: "esquisse · jeudi 11:42",
    imgTime: "jeudi 11:43",
    messages: [
      {
        kind: "msg",
        side: "in",
        text: "salut, on est tombés sur ton site. on a un site wix qui nous saoule — chargement long, pas de langues, ça ressemble à tout le monde.",
        time: "09:14",
        delay: 0,
      },
      {
        kind: "msg",
        side: "out",
        text: "salut ! merci. deux questions avant que je dise quoi que ce soit : 1) vous faites quoi, 2) qui sont vos clients ?",
        time: "09:17",
        delay: 1900,
      },
      {
        kind: "msg",
        side: "in",
        text: "café/torréfacteur à lausanne. on ouvre bientôt à genève. cible 30+, sensible au craft.",
        time: "09:21",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "ok — et qu'est-ce qui vous saoule le plus avec wix concrètement ? franchement.",
        time: "09:23",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "in",
        text: "1) lent surtout en mobile. 2) les plugins coûtent en plus. 3) on a l'impression que ce n'est pas VRAIMENT notre site, on est coincés dans le cadre wix.",
        time: "09:30",
        delay: 2100,
      },
      {
        kind: "msg",
        side: "out",
        text: "classique. je t'envoie ce soir une note vocale courte avec cadre + budget. pas de pdf. juste parlé.",
        time: "09:32",
        delay: 1900,
      },
      { kind: "voice", side: "out", duration: "4:18", time: "20:48", delay: 2400 },
      {
        kind: "msg",
        side: "in",
        text: "🎧 viens de l'écouter. ça me parle. quand on commence ?",
        time: "21:05",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "demain. premières esquisses jeudi, url staging vendredi.",
        time: "21:07",
        delay: 1300,
      },
      {
        kind: "img",
        side: "out",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format&fit=crop",
        cap: "esquisse · jeudi 11:42",
        time: "jeudi 11:43",
        delay: 2200,
      },
      {
        kind: "msg",
        side: "in",
        text: "OOOH. exactement la bonne direction. continue.",
        time: "jeudi 11:55",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "out",
        text: "🫡 le lien staging arrive vendredi 14h. à partir de là, on itère en direct, tu vois tout.",
        time: "jeudi 11:57",
        delay: 1500,
      },
    ],
  },
  en: {
    sectionLabel: "how it starts",
    kicker: "↘ a real first contact · language compressed",
    headlinePre: "no briefing form. ",
    headlineItalic: "just a chat.",
    intro:
      "from the first \"hey\" to friday launch, it's usually 12-18 messages and one voice note. no kickoff call with 6 people, no 80-slide deck. when the answers sit, we start.",
    stats: [
      { label: "ø response time", value: "< 2h on workdays" },
      { label: "kickoff", value: "morning after the chat" },
      { label: "staging url from", value: "day 3-4" },
      { label: "go-live", value: "day 14-22" },
    ],
    contactName: "nicolas · laconis",
    contactStatus: "active 2 min ago",
    imessage: "imessage",
    threadStart: "· wednesday 09:14 ·",
    hint: "self-playing · real flow, compressed ↗",
    voiceCaption: "voice note",
    imgCap: "sketch · thursday 11:42",
    imgTime: "thursday 11:43",
    messages: [
      {
        kind: "msg",
        side: "in",
        text: "hey, just stumbled onto your site. we have a wix site that's killing us — slow load, no languages, looks like everyone else's.",
        time: "09:14",
        delay: 0,
      },
      {
        kind: "msg",
        side: "out",
        text: "hey! thanks for writing. two questions before i say anything: 1) what do you do, 2) who are your clients?",
        time: "09:17",
        delay: 1900,
      },
      {
        kind: "msg",
        side: "in",
        text: "café/roaster in lausanne. opening in geneva soon. audience 30+, values craft.",
        time: "09:21",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "ok — and what bothers you most about wix specifically? honestly.",
        time: "09:23",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "in",
        text: "1) slow on mobile especially. 2) plugins cost extra. 3) we feel it's not REALLY our site, we're stuck inside the wix frame.",
        time: "09:30",
        delay: 2100,
      },
      {
        kind: "msg",
        side: "out",
        text: "classic. i'll send you a short voice note tonight with rough scope + budget. no pdf. just spoken.",
        time: "09:32",
        delay: 1900,
      },
      { kind: "voice", side: "out", duration: "4:18", time: "20:48", delay: 2400 },
      {
        kind: "msg",
        side: "in",
        text: "🎧 just heard it. sounds right. when can we start?",
        time: "21:05",
        delay: 1700,
      },
      {
        kind: "msg",
        side: "out",
        text: "tomorrow. first sketches thursday, staging url friday.",
        time: "21:07",
        delay: 1300,
      },
      {
        kind: "img",
        side: "out",
        img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&q=80&auto=format&fit=crop",
        cap: "sketch · thursday 11:42",
        time: "thursday 11:43",
        delay: 2200,
      },
      {
        kind: "msg",
        side: "in",
        text: "OOOH. exactly the right direction. keep going.",
        time: "thursday 11:55",
        delay: 1800,
      },
      {
        kind: "msg",
        side: "out",
        text: "🫡 staging link comes friday 14:00. from there we iterate live, you see everything.",
        time: "thursday 11:57",
        delay: 1500,
      },
    ],
  },
};

export function ChatThread({ num = "02" }: { num?: string } = {}) {
  const locale = useLocale();
  const t = pick(DICT, locale);
  const [step, setStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = t.messages;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    function advance() {
      setStep((s) => {
        const next = s + 1;
        if (next >= messages.length) {
          timer = setTimeout(() => setStep(0), 4200);
          return s;
        }
        timer = setTimeout(advance, messages[next].delay);
        return next;
      });
    }
    timer = setTimeout(advance, 800);
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [step]);

  const visible = messages.slice(0, step + 1);
  const isTyping = step < messages.length - 1;
  const nextSide = messages[step + 1]?.side;

  return (
    <section className="relative py-20 md:py-28">
      <div className="container-site">
        <SectionLabel num={num}>{t.sectionLabel}</SectionLabel>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* context */}
          <div className="lg:sticky lg:top-32">
            <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
              {t.kicker}
            </span>
            <h2 className="mt-6 heading-display text-[clamp(1.8rem,3.8vw,3rem)] leading-[1.05] text-offwhite">
              {t.headlinePre}
              <br />
              <span
                className="text-offwhite/55"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
              >
                {t.headlineItalic}
              </span>
            </h2>
            <p className="mt-6 max-w-[440px] text-[14px] leading-relaxed text-offwhite/55">
              {t.intro}
            </p>
            <div className="mt-10 space-y-3 max-w-[420px]">
              {t.stats.map((s, i) => (
                <div
                  key={i}
                  className="flex items-baseline justify-between border-b border-ink/20 pb-1.5 font-mono text-[10px] uppercase tracking-label"
                >
                  <span className="text-offwhite/45">{s.label}</span>
                  <span className="text-offwhite/85">{s.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 font-hand text-[20px] text-accent-ink rotate-[-1deg] inline-block">
              {t.hint}
            </p>
          </div>

          {/* phone */}
          <div className="relative mx-auto">
            <div className="relative w-[360px] h-[720px] rounded-[44px] bg-[#0a0a0a] border-[6px] border-[#1a1a1a] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden">
              {/* notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[26px] bg-[#0a0a0a] rounded-full z-30 border border-ink/15" />
              {/* status bar */}
              <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-7 pt-3 z-20 font-mono text-[10px] text-offwhite/85">
                <span>9:14</span>
                <span className="flex items-center gap-1">
                  <span>5G</span>
                  <span className="ml-1">·</span>
                  <span>87%</span>
                </span>
              </div>
              {/* contact bar */}
              <div className="absolute top-12 left-0 right-0 px-5 py-3 border-b border-ink/20 bg-[#0e0e0e] z-10 flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-lime/15 border border-lime/40 flex items-center justify-center font-mono text-[12px] text-lime">
                  n
                </span>
                <div className="flex-1">
                  <div
                    className="text-[14px] text-offwhite leading-tight"
                    style={{
                      fontFamily: "var(--font-caveat), cursive",
                    }}
                  >
                    {t.contactName}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-label text-offwhite/55">
                    {t.contactStatus}
                  </div>
                </div>
                <span aria-hidden className="font-mono text-[10px] text-offwhite/45">
                  ↗
                </span>
              </div>

              {/* thread */}
              <div
                ref={scrollRef}
                className="absolute top-[88px] bottom-0 left-0 right-0 overflow-y-auto px-3.5 pt-4 pb-20 space-y-2 scroll-smooth"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="text-center font-mono text-[9px] uppercase tracking-label text-offwhite/35 py-2">
                  {t.threadStart}
                </div>
                {visible.map((m, i) => {
                  if (m.kind === "msg") {
                    return (
                      <div
                        key={i}
                        className={`flex ${m.side === "out" ? "justify-end" : "justify-start"}`}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className={`max-w-[78%] rounded-[18px] px-3.5 py-2 text-[14px] leading-snug ${
                            m.side === "out"
                              ? "bg-lime text-[#0a0a0a] rounded-br-[6px]"
                              : "bg-[#1f1f1f] text-offwhite/95 rounded-bl-[6px]"
                          }`}
                        >
                          {m.text}
                          <div
                            className={`font-mono text-[8px] uppercase tracking-label mt-1 ${
                              m.side === "out"
                                ? "text-[#0a0a0a]/55"
                                : "text-offwhite/35"
                            }`}
                          >
                            {m.time}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  if (m.kind === "voice") {
                    return (
                      <div key={i} className="flex justify-end">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                          className="bg-lime text-[#0a0a0a] rounded-[18px] rounded-br-[6px] px-4 py-2.5 flex items-center gap-3"
                        >
                          <span className="w-7 h-7 rounded-full bg-[#0a0a0a]/15 flex items-center justify-center">
                            ▶
                          </span>
                          <svg viewBox="0 0 80 20" className="w-20 h-5" aria-hidden>
                            {[3, 5, 8, 12, 15, 18, 14, 10, 7, 13, 16, 11, 8, 5, 9, 12, 7].map(
                              (h, j) => (
                                <rect
                                  key={j}
                                  x={j * 5}
                                  y={10 - h / 2}
                                  width="2.5"
                                  height={h}
                                  fill="currentColor"
                                  rx="1"
                                  opacity="0.85"
                                />
                              ),
                            )}
                          </svg>
                          <span className="font-mono text-[11px]">{m.duration}</span>
                          <div className="font-mono text-[8px] uppercase tracking-label text-[#0a0a0a]/55 ml-2">
                            {m.time}
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  if (m.kind === "img") {
                    return (
                      <div key={i} className="flex justify-end">
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.4 }}
                          className="max-w-[78%] rounded-[14px] overflow-hidden bg-lime"
                        >
                          <div className="relative aspect-[4/5] w-[220px]">
                            <Image
                              src={m.img}
                              alt={m.cap}
                              fill
                              sizes="220px"
                              className="object-cover"
                            />
                          </div>
                          <div className="px-3 py-1.5 flex items-center justify-between text-[#0a0a0a]">
                            <span className="font-mono text-[9px] uppercase tracking-label">
                              {m.cap}
                            </span>
                            <span className="font-mono text-[8px] uppercase tracking-label opacity-65">
                              {m.time}
                            </span>
                          </div>
                        </motion.div>
                      </div>
                    );
                  }
                  return null;
                })}

                {/* typing indicator */}
                {isTyping && (
                  <div
                    className={`flex ${nextSide === "out" ? "justify-end" : "justify-start"} pt-1`}
                  >
                    <div
                      className={`rounded-full px-4 py-2 flex items-center gap-1 ${
                        nextSide === "out" ? "bg-lime/35" : "bg-[#1f1f1f]"
                      }`}
                    >
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className={`w-1.5 h-1.5 rounded-full ${
                            nextSide === "out" ? "bg-[#0a0a0a]/55" : "bg-offwhite/45"
                          }`}
                          style={{
                            animation: `chatBounce 1.2s ease-in-out ${d * 0.15}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* compose bar */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#0a0a0a] border-t border-ink/20 flex items-center px-4 gap-3 z-10">
                <span className="w-7 h-7 rounded-full border border-ink/20 flex items-center justify-center text-offwhite/45 font-mono text-[12px]">
                  +
                </span>
                <span className="flex-1 h-7 rounded-full bg-[#1a1a1a] border border-ink/15 px-3 flex items-center font-mono text-[10px] text-offwhite/35">
                  {t.imessage}
                </span>
                <span className="w-7 h-7 rounded-full bg-lime flex items-center justify-center font-mono text-[12px] text-[#0a0a0a]">
                  ↑
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes chatBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
