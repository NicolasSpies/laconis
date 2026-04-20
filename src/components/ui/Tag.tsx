import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  highlight?: boolean;
  variant?: "glass" | "solid";
  className?: string;
};

export function Tag({
  children,
  highlight = false,
  variant = "glass",
  className,
}: Props) {
  const base =
    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] lowercase tracking-mono transition-colors whitespace-nowrap";

  const styles = highlight
    ? "bg-lime/80 text-dark border border-lime"
    : variant === "glass"
      ? "bg-ink/[0.03] backdrop-blur-md border border-ink/10 text-offwhite/75 hover:bg-ink/[0.06] hover:border-ink/25 hover:text-offwhite"
      : "bg-offwhite text-dark border border-offwhite";

  return <span className={cn(base, styles, className)}>{children}</span>;
}
