import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Número de sección, ej. "02". Da ritmo editorial al scroll. */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-4xl", className)}>
      <p className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ash uppercase">
        <span className="text-ember">{index}</span>
        <span aria-hidden className="h-px w-10 bg-ink-line" />
        {eyebrow}
      </p>
      <h2 id={id} className="mt-5 font-condensed text-display-lg text-balance uppercase">
        {title}
      </h2>
      {description && <p className="mt-6 max-w-2xl text-lg text-pretty text-ash">{description}</p>}
    </header>
  );
}
