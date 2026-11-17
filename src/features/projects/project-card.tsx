import { buttonVariants } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { ArrowIcon, GitHubIcon } from "@/components/ui/icons";
import type { ProjectKind, ProjectLayout } from "@/data/featured";
import { LanguageBar } from "@/features/github/language-bar";
import { formatRelativeDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import { ProjectGallery } from "./project-gallery";
import { ProjectVisual } from "./project-visual";
import type { Project } from "./queries";

const KIND_LABEL: Record<ProjectKind, string> = {
  personal: "Proyecto personal",
  colaborativo: "En equipo de 2",
  universitario: "Universitario · equipo",
};

/** Posición en el bento. md: 2 columnas; lg: 6 columnas con tamaños variados. */
const LAYOUT: Record<ProjectLayout, string> = {
  feature: "md:col-span-2 lg:col-span-4 lg:row-span-2",
  tall: "lg:col-span-2 lg:row-span-2",
  wide: "lg:col-span-3 md:last:col-span-2 lg:last:col-span-3",
};

const MAX_CHIPS = 6;

export function ProjectCard({ project }: { project: Project }) {
  const { layout, github } = project;
  const extraStack = project.stack.length - MAX_CHIPS;

  return (
    <article
      aria-labelledby={`p-${project.slug}`}
      className={cn("group glass flex flex-col gap-6 rounded-3xl p-5 sm:p-7", LAYOUT[layout])}
    >
      <header className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] tracking-wider text-ash uppercase">
        <span>
          {KIND_LABEL[project.kind]} · {project.year}
        </span>
        <span className="inline-flex items-center gap-1.5 text-bone">
          <span className="size-1.5 rounded-full bg-ember" aria-hidden />
          {project.status}
        </span>
      </header>

      {layout === "feature" && <ProjectVisual project={project} className="aspect-[16/9]" />}

      <div>
        <h3
          id={`p-${project.slug}`}
          className={cn(
            "font-condensed uppercase",
            layout === "feature" ? "text-display-lg" : "text-display-md",
          )}
        >
          {project.title}
        </h3>
        <p className="mt-3 max-w-prose text-pretty text-bone/85">{project.tagline}</p>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <ProjectGallery title={project.title} shots={project.gallery} />
      )}

      {layout === "tall" && (
        <ProjectVisual project={project} className="min-h-40 flex-1 max-lg:hidden" />
      )}

      {project.callout && (
        <blockquote className="border-l-2 border-ember pl-4 text-lg leading-snug text-pretty text-bone">
          {project.callout}
        </blockquote>
      )}

      <p className="text-sm text-ash">
        <span className="font-mono text-[11px] tracking-wider text-ash uppercase">Rol · </span>
        {project.role}
      </p>

      {project.integrations && (
        <p className="text-sm text-ash">
          <span className="font-mono text-[11px] tracking-wider text-ash uppercase">
            Integraciones ·{" "}
          </span>
          {project.integrations}
        </p>
      )}

      <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.slice(0, MAX_CHIPS).map((tech) => (
          <li key={tech}>
            <Chip>{tech}</Chip>
          </li>
        ))}
        {extraStack > 0 && (
          <li>
            <Chip tone="ember" title={project.stack.slice(MAX_CHIPS).join(", ")}>
              +{extraStack}
            </Chip>
          </li>
        )}
      </ul>

      {/* mt-auto: empuja el pie al fondo → cards de la misma fila alinean sus pies */}
      <footer className="mt-auto flex flex-col gap-5 border-t border-white/[0.06] pt-5">
        {github && (
          <div className="flex flex-col gap-3">
            <LanguageBar languages={github.languages} />
            <p className="font-mono text-[11px] text-ash">
              Actualizado {formatRelativeDate(github.pushedAt)}
              {github.stars > 0 && ` · ★ ${github.stars}`}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Ver en vivo
              <ArrowIcon />
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          )}
          {github ? (
            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "glass", size: "sm" })}
            >
              <GitHubIcon />
              Código
              <span className="sr-only">
                de {project.title} en GitHub (se abre en otra pestaña)
              </span>
            </a>
          ) : (
            project.repo === null && (
              <span className="font-mono text-[11px] text-ash">
                Código privado (proyecto de cliente)
              </span>
            )
          )}
        </div>
      </footer>
    </article>
  );
}
