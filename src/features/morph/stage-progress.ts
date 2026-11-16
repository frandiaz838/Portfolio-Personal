/**
 * Convierte la posición de scroll en un valor de morph continuo (0 → N-1).
 * Función pura: recibe las posiciones de las secciones, no toca el DOM (testeable).
 *
 * Regla: la forma se mantiene durante la primera mitad de cada sección y muta
 * hacia la siguiente durante la segunda mitad, tomando como referencia el
 * centro del viewport.
 */
export type StageBox = { top: number; height: number };

const smoothstep = (t: number) => t * t * (3 - 2 * t);

export function morphFromScroll(stages: readonly StageBox[], viewportCenter: number): number {
  if (stages.length === 0) return 0;

  for (let i = 0; i < stages.length; i++) {
    const { top, height } = stages[i]!;
    if (viewportCenter < top + height || i === stages.length - 1) {
      if (i === stages.length - 1) return i; // última sección: forma final
      const local = Math.max(0, (viewportCenter - top) / height);
      const t = Math.min(1, Math.max(0, (local - 0.5) / 0.5));
      return i + smoothstep(t);
    }
  }
  return stages.length - 1;
}
