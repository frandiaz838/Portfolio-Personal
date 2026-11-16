import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const glassVariants = cva("glass", {
  variants: {
    radius: {
      md: "rounded-2xl",
      lg: "rounded-3xl",
      full: "rounded-full",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8 md:p-10",
    },
  },
  defaultVariants: { radius: "lg", padding: "md" },
});

type GlassProps = ComponentPropsWithoutRef<"div"> & VariantProps<typeof glassVariants>;

/** Panel de vidrio. Usar solo en lo que "flota" sobre el fondo. */
export function Glass({ className, radius, padding, ...props }: GlassProps) {
  return <div className={cn(glassVariants({ radius, padding }), className)} {...props} />;
}
