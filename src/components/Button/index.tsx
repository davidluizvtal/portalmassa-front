import Spin from "@components/Spin";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const styles = tv({
  base: "relative flex items-center justify-center gap-2 px-4 py-2 font-medium transition-all duration-200 enabled:hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed",
  variants: {
    variant: {
      primary:
        "bg-zinc-700 text-zinc-50 enabled:hover:bg-yellow-400 enabled:hover:text-zinc-700",
      secondary:
        "bg-yellow-400 text-zinc-700 enabled:hover:bg-zinc-700 enabled:hover:text-zinc-50",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    rounded: {
      full: "rounded-full",
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
    fluid: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: "sm",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof styles> {
  loading?: boolean;
}

export function Button({
  children,
  variant,
  size,
  rounded,
  fluid,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        styles({
          variant,
          size,
          rounded,
          fluid,
        }),
        props.className
      )}
    >
      <div className="flex items-center">
        <div>{children}</div>
        {loading && (
          <div className="ml-2">
            <Spin label={""} />
          </div>
        )}
      </div>
    </button>
  );
}
