import { Fraunces, Space_Grotesk, Syne } from "next/font/google";

/**
 * Nested layout · lädt die "schweren" display-fonts nur wenn der user
 * tatsächlich auf einer leistungen-seite landet (FontPlayground,
 * FabryCase nutzen diese).
 *
 * Spart auf allen anderen routen ca. 60% font-bytes.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export default function LeistungenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${syne.variable} contents`}
    >
      {children}
    </div>
  );
}
