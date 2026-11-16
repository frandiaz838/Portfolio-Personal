import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Bloque de carga. Las dimensiones las define quien lo usa → cero layout shift al llegar el contenido. */
export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-xl bg-white/[0.04]", className)}
      {...props}
    />
  );
}
