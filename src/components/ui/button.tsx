import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Variantes exportadas aparte para poder estilizar <a> y <Link> como botón
 * sin envolverlos: <Link className={buttonVariants({ variant: "glass" })} />
 */
export const buttonVariants = cva(
  [
    "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none",
    "transition-[transform,background-color,box-shadow,color] duration-300 ease-out-expo",
    "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-ember text-ink",
          "shadow-[0_0_0_1px_rgb(255_138_61/0.6)_inset,0_8px_32px_-8px_rgb(255_91_46/0.7)]",
          "hover:bg-ember-hot hover:shadow-[0_0_0_1px_rgb(255_200_160/0.7)_inset,0_10px_40px_-6px_rgb(255_91_46/0.9)]",
        ],
        glass: "glass text-bone hover:bg-white/10",
        ghost: "text-ash hover:bg-white/5 hover:text-bone",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonVariantProps;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
