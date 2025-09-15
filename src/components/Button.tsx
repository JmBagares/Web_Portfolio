import React from "react";
import { cn } from "./ui/utils"; // ✅ fix: correct path to your utils

// Shared styling props
type Variant = "primary" | "secondary" | "disabled" | "ghost";
type Size = "small" | "medium" | "large";

// Button-only props (no href)
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: undefined;            // <— ensures this branch is used when no href
  variant?: Variant;
  size?: Size;
  className?: string;
};

// Anchor-only props (must have href)
type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;                // <— ensures this branch is used when href exists
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = NativeButtonProps | AnchorProps;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  {
    // common styling props with defaults
    variant = "primary",
    size = "medium",
    className,
    children,
    ...rest
  }: ButtonProps,
  ref
) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-primary text-primary-foreground hover:bg-primary/90":
        variant === "primary",
      "bg-secondary text-secondary-foreground hover:bg-secondary/90":
        variant === "secondary",
      "opacity-50 cursor-not-allowed": variant === "disabled",
      "bg-transparent hover:bg-muted": variant === "ghost",
    },
    {
      "px-3 py-1 text-sm": size === "small",
      "px-4 py-2 text-base": size === "medium",
      "px-6 py-3 text-lg": size === "large",
    },
    className
  );

  // If this is an anchor (has href in the props union)
  if ("href" in rest && typeof rest.href === "string") {
    const { href, ...anchorRest } = rest as AnchorProps;
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"               // ✅ open in new tab
        rel="noopener noreferrer"     // ✅ security best practice
        className={classes}
        {...anchorRest}               // only valid <a> props here
      >
        {children}
      </a>
    );
  }

  // Otherwise, render a native <button>
  const buttonRest = rest as NativeButtonProps;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      {...buttonRest}                  // only valid <button> props here
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
