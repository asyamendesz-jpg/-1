import { cn } from "@/lib/utils";
import Link from "next/link";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  full?: boolean;
};

const variants = {
  primary:
    "bg-burgundy text-ivory hover:bg-burgundy-soft shadow-[0_10px_24px_-16px_rgba(107,45,60,0.9)]",
  secondary:
    "bg-transparent text-graphite border border-graphite/15 hover:border-gold hover:text-chocolate",
  ghost: "bg-ivory/80 text-graphite hover:bg-ivory",
  dark: "bg-graphite text-ivory hover:bg-ink",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
  full,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-medium tracking-[0.04em] transition-all duration-300 ease-out",
    "hover:scale-[1.015] active:scale-[0.985] disabled:opacity-50 disabled:pointer-events-none",
    variants[variant],
    full && "w-full",
    className,
  );

  if (href) {
    const external = /^(https?:|tel:|mailto:)/i.test(href);
    if (external) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
