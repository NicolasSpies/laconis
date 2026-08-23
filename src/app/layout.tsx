import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "@/components/pagetransition.css";
import { LegacyChrome } from "@/components/LegacyChrome";
import { CursorDot } from "@/components/CursorDot";
import { GlasLicht } from "@/components/device/GlasLicht";
import { PageTransition } from "@/components/PageTransition";
import { StructuredData } from "@/components/seo/StructuredData";
import { Tracker } from "@/components/analytics/Tracker";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { KonamiListener } from "@/components/easteregg/KonamiListener";
import { AutoReveal } from "@/components/AutoReveal";
import { HashScroll } from "@/components/HashScroll";
import { HTML_LANG, DEFAULT_LOCALE } from "@/i18n/config";
import { getLocale } from "@/i18n/getLocale";

/**
 * Font-system v3 · SELF-HOSTED (fix für google-fonts-ausfall).
 *
 * vorher kamen die fonts via next/font/google · der download zur
 * build-zeit ist mit ETIMEDOUT gegen fonts.googleapis.com gestorben
 * und next ist STILL auf system-fallbacks umgefallen ("was ist mit
 * der font passiert?"). jetzt: woff2-variable-files im repo
 * (src/fonts/ · aus @fontsource-variable kopiert, ~177KB gesamt) ·
 * kein build hängt mehr am google-CDN, dazu dsgvo-sauberer.
 *
 *   display → Bricolage Grotesque · variable (opsz 12-96 + wght 200-800)
 *   sans    → Instrument Sans · variable (wght 400-700)
 *   mono    → Geist Mono · variable (npm-package, war schon lokal)
 *   hand    → Caveat · variable (wght 400-700, genutzt: 400)
 */
const displayFont = localFont({
  src: "../fonts/bricolage-grotesque-var.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "200 800",
});

const sansFont = localFont({
  src: "../fonts/instrument-sans-var.woff2",
  variable: "--font-sans-v2",
  display: "swap",
  weight: "400 700",
});

/* GeistMono kommt aus dem offiziellen vercel-package · lokal gebundelt. */
const monoFont = GeistMono;

const caveat = localFont({
  src: "../fonts/caveat-var.woff2",
  variable: "--font-caveat",
  display: "swap",
  weight: "400 700",
});

/* Archivo Variable · wdth-schnitt (wght 100-900 UND width 62-125%) ·
   die neue display-schrift für die geräte-richtung: auf 125% gezogen
   wird sie breit-industriell wie ein gefrästes typenschild. */
const labDisplay = localFont({
  src: "../fonts/archivo-wdth-var.woff2",
  variable: "--font-lab",
  display: "swap",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laconis.be"),
  title: {
    /* führte mit "design" · branding gehört laut regel in den
       flüsterton, nicht in den standard-titel jeder seite ohne
       eigene metadaten (404, 500, loading). */
    default: "lacønis · webdesign studio ostbelgien",
    template: "%s · lacønis",
  },
  description:
    "Webdesign & Webentwicklung aus Ostbelgien. Websites von null gebaut, mit eigenem CMS statt Plugin-Stapel. Dreisprachig: Deutsch, Französisch, Englisch.",
  applicationName: "lacønis",
  authors: [{ name: "Nicolas Spies", url: "https://laconis.be/studio" }],
  creator: "Nicolas Spies",
  publisher: "lacønis",
  keywords: [
    "freelance design eupen",
    "webentwicklung belgien",
    "branding eupen",
    "logo design eupen",
    "logo erstellen lassen",
    "brand identity belgien",
    "webdesign eifel",
    "grafik design ostbelgien",
    "freelance designer belgien",
  ],
  openGraph: {
    title: "lacønis",
    description: "websites von null gebaut, mit eigenem CMS.",
    locale: "de_BE",
    alternateLocale: ["fr_BE", "en_BE"],
    type: "website",
    siteName: "lacønis",
  },
  twitter: {
    card: "summary_large_image",
    title: "lacønis",
    description: "websites von null gebaut, mit eigenem CMS.",
  },
  alternates: { canonical: "/" },
  manifest: "/site.webmanifest",
  other: {
    "geo.region": "BE-WLG",
    "geo.placename": "Eupen",
    "geo.position": "50.6288;6.0384",
    ICBM: "50.6288, 6.0384",
  },
};

/* august 2026: light-first war ein relikt · die seite ist dunkel,
   die EINE helle fläche (kammer) trägt ihre farbe selbst. der root
   ist wieder der dunkle default aus :root. einzelne sections können
   sich weiterhin via `<div data-theme="light">` aufhellen. */
export const viewport: Viewport = {
  themeColor: "#08080b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /**
   * Locale aus middleware-header lesen · gesetzt in src/middleware.ts.
   * Macht das layout dynamic — gerechtfertigt weil content + lang
   * pro locale unterscheidet.
   */
  const locale = getLocale();
  const htmlLang = HTML_LANG[locale] ?? HTML_LANG[DEFAULT_LOCALE];

  return (
    <html
      lang={htmlLang}
      suppressHydrationWarning
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${caveat.variable} ${labDisplay.variable}`}
    >
      <head />
      <body>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 grid-bg-faint pointer-events-none"
          style={{
            top: "100svh",
            zIndex: -1,
            // sanfter fade-in am oberen rand · kein harter cut zum hero-grid
            maskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 15%, black 40%)",
          }}
        />
        <CursorDot />
        {/* fuehrt das streiflicht ueber alle .gl-flaechen · war nie
            eingehaengt, deshalb stand das specular auf dem desktop
            dauerhaft bei 50% / 0% */}
        <GlasLicht />
        <LegacyChrome position="nav" />
        <StructuredData />
        <Tracker />
        <ConsoleGreeting />
        <KonamiListener />
        <AutoReveal />
        <HashScroll />
        <main className="relative z-[1]">
          <PageTransition>{children}</PageTransition>
        </main>
        <LegacyChrome position="footer" />
      </body>
    </html>
  );
}
