import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

/** Ancho máximo + gutter: 16px en mobile, crece con el viewport. */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)} {...props} />
  );
}
