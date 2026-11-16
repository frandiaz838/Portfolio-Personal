import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

export const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border font-mono whitespace-nowrap",
  {
    variants: {
      tone: {
        default: "border-ink-line bg-white/[0.03] text-ash",
        ember: "border-ember/40 bg-ember/10 text-ember-hot",
        solid: "border-transparent bg-bone text-ink",
      },
      size: {
        sm: "h-6 px-2.5 text-[11px]",
        md: "h-8 px-3 text-xs",
      },
    },
    defaultVariants: { tone: "default", size: "sm" },
  },
);

type ChipProps = ComponentPropsWithoutRef<"span"> & VariantProps<typeof chipVariants>;

export function Chip({ className, tone, size, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ tone, size }), className)} {...props} />;
}
