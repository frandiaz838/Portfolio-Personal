import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

/**
 * Hero asimétrico: nombre gigante abajo a la izquierda, el objeto de partículas
 * ocupa la derecha (desktop) o queda detrás del texto (mobile).
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      data-morph-stage="0"
      className="relative flex min-h-svh flex-col justify-end pt-28 pb-12 md:pb-16"
    >
      <Container>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs tracking-wider text-ash uppercase">
          <span className="inline-flex items-center gap-2 text-bone">
            <span className="size-2 animate-pulse-dot rounded-full bg-ember" aria-hidden />
            Disponible por la mañana
          </span>
          <span aria-hidden className="hidden h-px w-8 bg-ink-line sm:block" />
          <span>{site.location}</span>
        </div>

        <h1 id="hero-title" className="mt-6 font-condensed text-display-xl uppercase">
          <span className="block">Francisco</span>
          <span className="block text-ember">Díaz</span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-sm text-ash">{site.role}</p>
            <p className="mt-3 text-lg text-pretty text-bone/90 md:text-xl">
              Construyo software que ya está en producción: un SaaS propio, un sistema vendido a un
              cliente real y una app móvil hecha en equipo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a href="#proyectos" className={buttonVariants({ size: "lg" })}>
              Ver proyectos
              <ArrowIcon className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
            <a
              href={site.cvPath}
              download
              className={buttonVariants({ variant: "glass", size: "lg" })}
            >
              <DownloadIcon />
              CV
            </a>
            <a
              href={site.github.url}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub (se abre en otra pestaña)"
              className={buttonVariants({ variant: "glass", size: "icon" })}
            >
              <GitHubIcon className="size-5!" />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn (se abre en otra pestaña)"
              className={buttonVariants({ variant: "glass", size: "icon" })}
            >
              <LinkedInIcon className="size-5!" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
