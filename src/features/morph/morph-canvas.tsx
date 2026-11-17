"use client"; // necesita canvas, WebGL, scroll y puntero: todo APIs del navegador

import { useEffect, useRef, useState } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { MorphRenderer, StageParams } from "./renderer";
import { morphFromScroll, type StageBox } from "./stage-progress";

/** Posición/tamaño/opacidad del objeto en cada sección (hero, proyectos, sobre mí, stack, contacto) */
const DESKTOP_STAGES: StageParams[] = [
  // Hero: centrada en vertical entre el header y la fila de botones
  { x: 0.5, y: 0.06, scale: 0.75, opacity: 1 },
  { x: 0.5, y: 0.05, scale: 0.85, opacity: 0.75 },
  { x: 0.55, y: 0.0, scale: 0.9, opacity: 0.6 },
  { x: 0.5, y: 0.0, scale: 0.9, opacity: 0.6 },
  { x: 0.45, y: -0.05, scale: 0.8, opacity: 0.9 },
];

/** En mobile el objeto queda centrado arriba y más tenue: el texto tiene prioridad. */
const MOBILE_STAGES: StageParams[] = [
  { x: 0, y: 0.55, scale: 0.5, opacity: 0.85 },
  { x: 0, y: 0.1, scale: 0.8, opacity: 0.35 },
  { x: 0, y: 0.1, scale: 0.8, opacity: 0.25 },
  { x: 0, y: 0.1, scale: 0.75, opacity: 0.25 },
  { x: 0, y: 0.15, scale: 0.85, opacity: 0.45 },
];

function idle(cb: () => void) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout: 1500 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 300);
  return () => clearTimeout(id);
}

/**
 * Canvas fijo detrás del contenido con el objeto de partículas.
 * Las secciones marcan su forma con data-morph-stage="n".
 */
export function MorphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "fallback">("loading");
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const finePointer = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: MorphRenderer | null = null;
    let disposed = false;
    let boxes: StageBox[] = [];
    let scrollFrame = 0;

    const measure = () => {
      boxes = [...document.querySelectorAll<HTMLElement>("[data-morph-stage]")]
        .sort((a, b) => Number(a.dataset.morphStage) - Number(b.dataset.morphStage))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return { top: rect.top + window.scrollY, height: rect.height };
        });
    };

    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        renderer?.setTarget(morphFromScroll(boxes, window.scrollY + window.innerHeight / 2));
      });
    };

    const onPointer = (e: PointerEvent) => {
      renderer?.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };

    const onVisibility = () => {
      if (document.hidden) renderer?.stop();
      else renderer?.start();
    };

    // El layout cambia cuando entra contenido por streaming o cargan fuentes/imágenes
    const resizeObserver = new ResizeObserver(() => {
      measure();
      renderer?.resize();
      onScroll();
    });

    const cancelIdle = idle(async () => {
      try {
        // Import dinámico: el código WebGL va en su propio chunk y no bloquea la carga inicial
        const { MorphRenderer } = await import("./renderer");
        if (disposed) return;
        const cores = navigator.hardwareConcurrency ?? 4;
        renderer = new MorphRenderer(canvas, {
          count: isMobile ? 5000 : cores <= 4 ? 9000 : 14000,
          maxDpr: 1.5,
          animate: !reducedMotion,
          stages: isMobile ? MOBILE_STAGES : DESKTOP_STAGES,
        });
        measure();
        onScroll();
        renderer.start();
        setStatus("ready");

        window.addEventListener("scroll", onScroll, { passive: true });
        if (finePointer && !reducedMotion) {
          window.addEventListener("pointermove", onPointer, { passive: true });
        }
        document.addEventListener("visibilitychange", onVisibility);
        resizeObserver.observe(document.body);
        resizeObserver.observe(canvas);
      } catch (err) {
        console.warn("[morph] WebGL no disponible, usando fallback estático", err);
        setStatus("fallback");
      }
    });

    return () => {
      disposed = true;
      cancelIdle();
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      resizeObserver.disconnect();
      renderer?.dispose();
    };
  }, [isMobile, reducedMotion, finePointer]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-[5]">
      {/* Fallback / placeholder: resplandor CSS donde va a aparecer el objeto */}
      <div
        className={cn(
          "absolute top-[38%] left-1/2 size-[min(70vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_91_46/0.28),rgb(183_53_26/0.08)_60%,transparent)] blur-2xl transition-opacity duration-1000 md:top-1/2 md:left-[71%]",
          status === "ready" && "opacity-0",
        )}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 size-full opacity-0 transition-opacity duration-[1500ms] ease-out",
          status === "ready" && "opacity-100",
        )}
      />
    </div>
  );
}
