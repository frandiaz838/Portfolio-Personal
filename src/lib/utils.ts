import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases condicionales (clsx) y resuelve conflictos de Tailwind (twMerge).
 * Ej: cn("px-2", isBig && "px-4") → "px-4" en vez de "px-2 px-4".
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
