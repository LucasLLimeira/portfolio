import type { MouseEventHandler, ReactNode } from "react";

type SharedProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
};

type ButtonProps = SharedProps;

function classes(variant: "primary" | "ghost", className?: string) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const byVariant =
    variant === "primary"
      ? "bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-400 dark:bg-brand-400 dark:text-slate-950 dark:hover:bg-brand-300"
      : "border border-brand-400 bg-white/95 text-slate-900 hover:bg-brand-100 focus-visible:ring-brand-300 dark:border-brand-400 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:bg-slate-800";

  return `${base} ${byVariant} ${className ?? ""}`.trim();
}

export function Button(props: ButtonProps) {
  if (props.href) {
    const { children, variant = "primary", className, href, target, rel } = props;
    return (
      <a href={href} target={target} rel={rel} className={classes(variant, className)}>
        {children}
      </a>
    );
  }

  const {
    children,
    variant = "primary",
    className,
    onClick,
    type = "button",
    "aria-label": ariaLabel,
  } = props;

  return (
    <button onClick={onClick} type={type} aria-label={ariaLabel} className={classes(variant, className)}>
      {children}
    </button>
  );
}
