import cn from "classnames";
import React, { forwardRef, ButtonHTMLAttributes } from "react";
import Link from "@components/ui/link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;

  // Untitled UI color spec (with legacy variant fallback support)
  color?: "primary" | "secondary" | "tertiary" | "primary-destructive" | "secondary-destructive" | "tertiary-destructive" | "link-gray" | "link-color" | "link-destructive" | "outline";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "icon" | "flat" | "slim" | "smoke";

  // Untitled UI sizes (with legacy fallback support)
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "small" | "medium" | "large";

  // Icon slots
  iconLeading?: React.ReactNode;
  iconTrailing?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;

  // Loading indicators
  isLoading?: boolean;
  loading?: boolean;
  showTextWhileLoading?: boolean;

  // Disabled states
  isDisabled?: boolean;
  disabled?: boolean;

  // Layout modifiers
  fullWidth?: boolean;
  rounded?: boolean;
  iconOnly?: boolean;
  active?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  target?: string;
  disableBorderRadius?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    color,
    variant,
    size = "md",
    iconLeading,
    iconTrailing,
    iconLeft,
    iconRight,
    isLoading = false,
    loading = false,
    showTextWhileLoading = false,
    isDisabled = false,
    disabled = false,
    fullWidth = false,
    rounded = false,
    iconOnly = false,
    active,
    href,
    target,
    type = "button",
    disableBorderRadius,
    children,
    ...rest
  } = props;

  // Resolve active states and fallback properties
  const buttonDisabled = isDisabled || disabled;
  const buttonLoading = isLoading || loading;
  const leadIcon = iconLeading || iconLeft;
  const trailIcon = iconTrailing || iconRight;

  // Map input color/variant to final mapped color string
  let finalColor = color;
  if (!finalColor && variant) {
    if (variant === "flat" || variant === "slim") {
      finalColor = "secondary";
    } else if (variant === "smoke") {
      finalColor = "outline";
    } else if (variant === "ghost" || variant === "icon") {
      finalColor = "tertiary";
    } else if (variant === "destructive") {
      finalColor = "primary-destructive";
    } else {
      finalColor = variant as any;
    }
  }
  if (!finalColor) {
    finalColor = "primary";
  }

  // Resolve size
  let finalSize = size;
  if (size === "small") {
    finalSize = "xs";
  } else if (size === "medium") {
    finalSize = "md";
  } else if (size === "large") {
    finalSize = "xl";
  }

  // Check if button should behave as icon-only
  const isIconOnly = iconOnly || (!children && (leadIcon || trailIcon));

  const rootClassName = cn(
    "btn-ds",
    `btn-variant-${finalColor}`,
    `btn-size-${finalSize}`,
    {
      "btn-rounded": rounded,
      "btn-full-width": fullWidth,
      "btn-disabled": buttonDisabled,
      "btn-loading": buttonLoading,
      "btn-icon-only": isIconOnly,
    },
    className
  );

  const content = (
    <>
      {buttonLoading ? (
        <>
          <svg
            className={cn("animate-spin", finalSize === "xs" || finalSize === "sm" ? "h-4 w-4" : "h-5 w-5")}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {showTextWhileLoading && children && <span className="ltr:ml-2 rtl:mr-2">{children}</span>}
        </>
      ) : (
        <>
          {leadIcon && <span className="flex-shrink-0 flex items-center justify-center">{leadIcon}</span>}
          {children && <span className="flex items-center justify-center">{children}</span>}
          {trailIcon && <span className="flex-shrink-0 flex items-center justify-center">{trailIcon}</span>}
        </>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={rootClassName}
        onClick={(e) => {
          if (buttonDisabled || buttonLoading) {
            e.preventDefault();
          }
        }}
        {...(rest as any)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      aria-pressed={active}
      data-variant={finalColor}
      ref={ref}
      className={rootClassName}
      disabled={buttonDisabled}
      type={type}
      {...rest}
    >
      {content}
    </button>
  );
});

Button.displayName = "Button";
export { Button };
export default Button;
