import Image from "next/image";
import type { Project } from "./queries";
import { cn } from "@/lib/utils";

/**
 * Screenshot del proyecto, o un placeholder generativo que se ve intencional
 * (no un "imagen no disponible"). Aspect ratio fijo → cero layout shift.
 */
export function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-raised",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div aria-hidden className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_120%,rgb(255_91_46/0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent,#000_40%,#000)] bg-[size:28px_28px]" />
          <span className="absolute -bottom-[0.18em] left-4 font-condensed text-[clamp(4rem,13vw,10rem)] leading-none text-transparent uppercase [-webkit-text-stroke:1px_rgb(255_138_61/0.45)]">
            {project.title}
          </span>
        </div>
      )}
    </div>
  );
}
