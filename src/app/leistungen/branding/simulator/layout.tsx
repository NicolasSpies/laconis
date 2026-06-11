import { Fraunces } from "next/font/google";

/**
 * Simulator-layout · lädt Fraunces NUR hier (BrandSimulator font-switcher
 * braucht sie als auswahl-option). Vorher lag der load im leistungen-layout
 * und hat alle service-pages mit 3 ungenutzten fonts belastet.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export default function SimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${fraunces.variable} contents`}>{children}</div>;
}
