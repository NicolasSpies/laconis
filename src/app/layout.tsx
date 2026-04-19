import type { Metadata } from "next";
import {
  DM_Sans,
  DM_Mono,
  Caveat,
  Instrument_Serif,
  Fraunces,
  Space_Grotesk,
  Syne,
} from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorSpotlight } from "@/components/CursorSpotlight";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
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

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://laconis.be"),
  title: {
    default: "lacønis • design mit meinung • web mit seele",
    template: "%s • lacønis",
  },
  description:
    "Freelance Graphic & Web Design aus Eupen, Belgien. Websites die für sich selbst sprechen. Eigenes CMS inklusive.",
  openGraph: {
    title: "lacønis",
    description: "design mit meinung • web mit seele",
    locale: "de_BE",
    type: "website",
  },
};

/* Inline — runs before React hydrates. Prevents flash of wrong theme. */
const themeInitScript = `(function(){try{var s=localStorage.getItem('laconis-theme');var t=s||'dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      data-theme="dark"
      suppressHydrationWarning
      className={`${dmSans.variable} ${dmMono.variable} ${caveat.variable} ${instrumentSerif.variable} ${fraunces.variable} ${spaceGrotesk.variable} ${syne.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 grid-bg-faint pointer-events-none"
          style={{ top: "100svh", zIndex: -1 }}
        />
        <CursorSpotlight />
        <Nav />
        <main className="relative z-[1]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
