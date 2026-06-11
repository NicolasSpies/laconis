import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorDot } from "@/components/CursorDot";
import { DriftingBlobs } from "@/components/DriftingBlobs";
import { PageTransition } from "@/components/PageTransition";
import { StructuredData } from "@/components/seo/StructuredData";
import { Tracker } from "@/components/analytics/Tracker";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { KonamiListener } from "@/components/easteregg/KonamiListener";
import { AutoReveal } from "@/components/AutoReveal";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://laconis.be"),
  title: {
    default: "lacønis · design mit meinung · web mit seele",
    template: "%s · lacønis",
  },
  description:
    "Freelance Graphic & Web Design aus Eupen, Belgien. Websites die für sich selbst sprechen. Eigenes CMS inklusive. Dreisprachig: Deutsch, Französisch, Englisch.",
  applicationName: "lacønis",
  authors: [{ name: "Nicolas Spies", url: "https://laconis.be/ueber-mich" }],
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
    description: "design mit meinung · web mit seele",
    locale: "de_BE",
    alternateLocale: ["fr_BE", "en_BE"],
    type: "website",
    siteName: "lacønis",
  },
  twitter: {
    card: "summary_large_image",
    title: "lacønis",
    description: "design mit meinung · web mit seele",
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

/* sprint-5-rework: theme-toggle entfernt · site ist jetzt light-first.
   einzelne sections können sich via `<div data-theme="dark">` als
   dark-island überschreiben. kein localStorage, kein system-pref-listen. */

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
      data-theme="light"
      suppressHydrationWarning
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} ${caveat.variable}`}
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
        <DriftingBlobs />
        <CursorDot />
        <Nav />
        <StructuredData />
        <Tracker />
        <ConsoleGreeting />
        <KonamiListener />
        <AutoReveal />
        <main className="relative z-[1]">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
