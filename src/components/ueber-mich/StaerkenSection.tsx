import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * StaerkenSection — was mich ausmacht.
 * lange version für /ueber-mich · drei punkte, jeweils mit mini-beweis.
 */

type Staerke = {
  num: string;
  titel: string;
  kicker: string;
  text: string;
  beweis: string;
};

const STAERKEN: Staerke[] = [
  {
    num: "01",
    titel: "alles aus einem kopf",
    kicker: "Kein Ping-Pong zwischen Designer und Dev.",
    text: "Ich entwerfe, was ich code, und code, was ich entwerfe. Kein Handoff, keine verlorene Übersetzung, keine „das geht technisch nicht“-Mails. Wenn ich ein Detail entwerfe, weiß ich schon während des Zeichnens, wie es später im Browser aussieht.",
    beweis: "ein ansprechpartner · keine agentur-hierarchie.",
  },
  {
    num: "02",
    titel: "eigenes system, keine templates",
    kicker: "Jede Zeile habe ich selbst geschrieben.",
    text: "Ich nutze keine Baukästen, keine fertigen Themes, keine KI-generierten Logos. Jedes Projekt fängt mit Fragen an · was machst du, für wen, warum · und endet mit einem System, das zu genau dir passt. Das dauert länger und kostet mehr. Macht die Sache aber robust.",
    beweis: "recherche vor design · system vor einzelteilen.",
  },
  {
    num: "03",
    titel: "bleibt nach dem launch",
    kicker: "Ich tauche nicht ab, wenn die Rechnung bezahlt ist.",
    text: "Nach der Übergabe beginnt die eigentliche Beziehung. Fragen, Nachträge, kleine Änderungen, neue Ideen · ich bin erreichbar, die ganze Zeit, über Jahre. Kein Ticketsystem, kein Support-Hotline-Robot. Eine Mail, eine Antwort.",
    beweis: "direkter draht · auch 2 jahre später.",
  },
  {
    num: "04",
    titel: "in 3 jahren redest du mit demselben",
    kicker: "\u201eOhh, der Kollege, der das damals gemacht hat, arbeitet leider nicht mehr hier.\u201c · Gibt's bei mir nicht.",
    text: "Klassische Szene in meiner Branche: Du rufst zwei Jahre nach Launch an, willst eine Kleinigkeit ändern · und kriegst \u201eDer Kollege arbeitet hier nicht mehr, aber jemand Neues schaut sich das mal an\u201c. Oder der Laden heißt inzwischen anders. Oder den Laden gibt's nicht mehr. Bei mir: eine Person, ein Name, kein Personalroulette. Ich bin laconis. Und ich habe nicht vor, das nächstes Jahr umzubennen, an jemanden zu übergeben oder den Laden dichtzumachen, weil der Geschäftsführer sich umorientiert. Solo · mit Absicht.",
    beweis: "keine fluktuation · kein rebrand · kein weg.",
  },
];

export function StaerkenSection() {
  return (
    <section className="pb-28">
      <div className="container-site">
        <SectionLabel num="07">was mich ausmacht</SectionLabel>
        <h2 className="heading-display mt-4 text-[clamp(2rem,5vw,3.5rem)] text-offwhite leading-[1.05] max-w-[820px]">
          vier dinge, auf die ich{" "}
          <span className="italic font-serif text-accent-ink">stehe</span>.
        </h2>
        <p className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-offwhite/55">
          Nicht „Werte“ im Sinne von Hochglanz-Pitchdeck. Nur das, worauf
          ich mich festlegen lasse · und wofür du mich gern kritisieren
          darfst, wenn ich&apos;s verpatze.
        </p>

        <div className="mt-16 space-y-5">
          {STAERKEN.map((s) => (
            <article
              key={s.num}
              className="liquid-glass grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-10 rounded-2xl p-7 md:p-10"
            >
              <div className="flex md:flex-col gap-3 md:gap-1 items-baseline md:items-start">
                <span className="font-mono text-[10px] uppercase tracking-label text-accent-ink">
                  · {s.num}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-label text-offwhite/35 md:mt-auto">
                  {s.beweis}
                </span>
              </div>

              <div>
                <h3 className="heading-sans text-[22px] md:text-[26px] text-offwhite leading-tight">
                  {s.titel}
                </h3>
                <p className="mt-2 text-[14px] italic text-offwhite/55">
                  {s.kicker}
                </p>
                <p className="mt-5 max-w-[620px] text-[14.5px] leading-relaxed text-offwhite/75">
                  {s.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
