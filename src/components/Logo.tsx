import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  size?: "sm" | "md" | "lg";
  variant?: "light" | "lime" | "dark";
  href?: string;
  className?: string;
};

const sizes = {
  sm: "h-[20px]",
  md: "h-[26px]",
  lg: "h-[38px]",
};

const colors = {
  light: "bg-offwhite",
  lime: "bg-accent-ink",
  dark: "bg-anthrazit",
};

export function Logo({
  size = "md",
  variant = "lime",
  href = "/",
  className,
}: Props) {
  return (
    <Link
      href={href}
      aria-label="lacønis • zur Startseite"
      className={cn("inline-flex items-center", className)}
    >
      <span
        className={cn(
          "block aspect-[600/140.83] transition-colors",
          sizes[size],
          colors[variant],
        )}
        style={{
          WebkitMaskImage: "url(/laconis-logo.svg)",
          maskImage: "url(/laconis-logo.svg)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    </Link>
  );
}
