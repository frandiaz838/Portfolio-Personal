/**
 * Fondo con profundidad, 100% CSS (Server Component, 0 KB de JS):
 *  1. aurora: dos manchas de brasa desenfocadas que se mueven muy lento (solo transform → GPU)
 *  2. grilla tenue que se desvanece hacia los bordes
 *  3. grano para que el negro tenga textura
 *  4. viñeta que concentra la mirada al centro
 */
export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Sin filter: blur: el degradado radial ya es difuso, y un blur de 64px sobre una capa
          animada de 70vmax se recalculaba en cada frame (era de lo más caro de la página). */}
      <div className="absolute -top-[20%] -left-[10%] size-[70vmax] animate-aurora-a rounded-full bg-[radial-gradient(closest-side,rgb(255_91_46/0.16),transparent)] will-change-transform" />
      <div className="absolute -right-[15%] -bottom-[30%] size-[60vmax] animate-aurora-b rounded-full bg-[radial-gradient(closest-side,rgb(183_53_26/0.18),transparent)] will-change-transform" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,#000_30%,transparent_100%)] bg-[size:72px_72px]" />

      {/* Sin mix-blend-mode: obligaba a mezclar toda la pantalla en cada frame */}
      <div className="absolute inset-0 grain opacity-[0.025]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(0_0_0/0.55)_100%)]" />
    </div>
  );
}
