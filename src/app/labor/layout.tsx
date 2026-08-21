import type { Metadata } from "next";
import Link from "next/link";
import "@/components/labor/labor.css";

/**
 * /labor · die drei richtungen zum vergleichen.
 *
 * dieselben inhalte, drei handschriften. gedacht als
 * entscheidungshilfe, nicht als teil der seite · deshalb noindex
 * für den ganzen zweig, genau wie bei /preview.
 *
 * die umschaltleiste liegt im layout, damit man im vergleich
 * springen kann, ohne den kopf zu verlieren.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const VARIANTEN = [
  ["a", "schreibt sich um"],
  ["b", "editorial"],
  ["c", "kinematisch"],
] as const;

export default function LaborLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lb-root">
      <nav className="lb-switch" aria-label="Richtung wählen">
        <span className="lb-switch-label">richtung</span>
        {VARIANTEN.map(([k, name]) => (
          <Link key={k} href={`/labor/${k}`} className="lb-switch-link">
            <b>{k}</b> {name}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
