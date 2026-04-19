import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer
      data-theme="dark"
      className="relative z-10 bg-black border-t border-ink/5 text-offwhite"
    >
      <div className="container-site pt-8 pb-6 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo size="md" variant="lime" />
            <span className="font-sans text-[12px] text-offwhite/50 tracking-[-0.01em]">
              say less • mean møre
            </span>
          </div>

          <span className="font-sans text-[12px] text-offwhite/45 flex items-center gap-1">
            made with{" "}
            <span className="text-accent-ink" aria-label="love">
              ♥
            </span>{" "}
            by myself
          </span>
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
