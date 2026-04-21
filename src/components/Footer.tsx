import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      className="relative z-10 bg-dark border-t border-ink/5 text-offwhite"
    >
      <div className="container-site pt-8 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size="md" variant="lime" />
            <span className="font-sans text-[12px] text-offwhite/55 tracking-[-0.01em]">
              say less • mean møre
            </span>
          </div>

          {/* handwritten signature · wie am ende eines briefes
              · kleine fußnote drunter erklärt den namen subtil */}
          <div className="flex flex-col items-start md:items-end gap-1">
            <span
              className="flex items-baseline gap-2 text-accent-ink select-none"
              style={{
                fontFamily: "var(--font-caveat), cursive",
                fontSize: "24px",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                transform: "rotate(-3deg)",
              }}
              aria-label="signiert von Nicolas Spies"
              title="Handmade in Eupen"
            >
              <span aria-hidden className="text-offwhite/35 text-[16px]">~</span>
              by Nicolas Spies
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-label text-offwhite/35 select-none"
              aria-label="wortbedeutung lakonisch"
            >
              lakonisch · knapp gesagt, viel gemeint
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-ink/5 flex flex-col md:flex-row justify-between gap-3 font-mono text-[10px] text-offwhite/55 uppercase tracking-mono">
          <span>© 2026 lacønis</span>
          <div className="flex gap-5">
            <Link href="/impressum">impressum</Link>
            <Link href="/datenschutz">datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
