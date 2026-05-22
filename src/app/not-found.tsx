import Link from "next/link";
import { CONTACT } from "@/config/contact";
import { CssPlayground } from "@/components/404/CssPlayground";
import { getLocale } from "@/i18n/getLocale";
import type { Locale } from "@/i18n/config";

const DICT: Record<
  Locale,
  {
    headline: string;
    cta: string;
    note: string;
    bug: string;
  }
> = {
  de: {
    headline: "diese seite gibts nicht. die anderen schon.",
    cta: "zurück zur startseite →",
    note: "vielleicht ein tippfehler · vielleicht ein alter link · egal.",
    bug: "wenn du denkst, das ist ein bug · sag bescheid",
  },
  fr: {
    headline: "cette page n'existe pas. les autres oui.",
    cta: "retour à l'accueil →",
    note: "peut-être une faute de frappe · peut-être un vieux lien · peu importe.",
    bug: "si tu penses que c'est un bug · fais-le savoir",
  },
  en: {
    headline: "this page doesn't exist. the others do.",
    cta: "back to home →",
    note: "maybe a typo · maybe an old link · doesn't matter.",
    bug: "if you think this is a bug · let me know",
  },
};

export default function NotFound() {
  const locale = getLocale();
  const t = DICT[locale] ?? DICT.de;

  return (
    <>
      <section
        className="relative min-h-[100svh] flex items-center overflow-hidden"
        style={{ color: "#0a0a0a" }}
      >
        {/* atmospheric dot-grid · matched zu PageHero */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(20,20,20,0.55) 1px, transparent 1.4px)",
            backgroundSize: "26px 26px",
          }}
        />

        {/* dekoratives lila scribble-X · rechts oben (desktop) */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute right-[-2%] top-[8%] w-[200px] md:w-[280px] opacity-70 pointer-events-none -rotate-[8deg]"
        >
          <path
            d="M20 24 C 70 60, 130 120, 188 178"
            stroke="#b084d3"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M180 22 C 130 64, 76 124, 22 180"
            stroke="#b084d3"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="container-site relative">
          <div className="max-w-[820px]">
            {/* massive 404 mit lime-akzent in der mitte */}
            <div
              className="leading-none font-black lowercase select-none"
              style={{
                fontSize: "clamp(6rem, 22vw, 16rem)",
                letterSpacing: "-0.06em",
                color: "#0a0a0a",
              }}
            >
              4<span style={{ color: "#e1fd52" }}>0</span>4
            </div>

            <h1
              className="mt-6 lowercase font-black"
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: "#0a0a0a",
              }}
            >
              {t.headline}
            </h1>

            <p className="mt-6 max-w-[520px] text-[14px] md:text-[16px] leading-relaxed text-[#0a0a0a]/70">
              {t.note}
            </p>

            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-label px-6 py-4 rounded-full bg-[#0a0a0a] text-[#e1fd52] hover:bg-[#1a1a1a] transition-colors"
              >
                {t.cta}
              </Link>
            </div>

            <p className="mt-12 font-mono text-[10px] uppercase tracking-label text-[#0a0a0a]/55">
              {t.bug} ·{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="underline underline-offset-4 hover:text-[#0a0a0a]"
              >
                {CONTACT.email}
              </a>
            </p>
          </div>
        </div>
      </section>
      <CssPlayground />
    </>
  );
}
