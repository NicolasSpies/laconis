import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Caveat, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorSpotlight } from "@/components/CursorSpotlight";
import { CursorDot } from "@/components/CursorDot";
import { PageTransition } from "@/components/PageTransition";
import { StructuredData } from "@/components/seo/StructuredData";
import { Tracker } from "@/components/analytics/Tracker";
import { ConsoleGreeting } from "@/components/ConsoleGreeting";
import { KonamiListener } from "@/components/easteregg/KonamiListener";
import { AutoReveal } from "@/components/AutoReveal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-caveat",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
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

/* Inline — runs before React hydrates. Prevents flash of wrong theme.
   default = light · dark nur wenn user explicit via localStorage ODER os-level
   prefers-color-scheme: dark gesetzt hat · sonst immer light. */
const themeInitScript = `(function(){try{var s=localStorage.getItem('laconis-theme');var pd=(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);var t=s||(pd?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-theme="light"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} ${caveat.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
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
        <CursorSpotlight />
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
