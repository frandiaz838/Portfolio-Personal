"use client"; // usa window.matchMedia: solo existe en el navegador

import { useCallback, useSyncExternalStore } from "react";

/**
 * Suscribe a una media query. useSyncExternalStore (en vez de useState + useEffect)
 * evita renders "rotos" con valores viejos y es seguro con concurrent rendering.
 * En el servidor devuelve `serverFallback` (por defecto false).
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
