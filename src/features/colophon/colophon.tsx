import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GitHubIcon } from "@/components/ui/icons";
import { site } from "@/data/site";

/** "Cómo está hecho este sitio": decisiones técnicas con su porqué, en una línea cada una. */
const decisions = [
  {
    label: "Server Components",
    value: "por defecto",
    why: "JavaScript al cliente solo donde hay interacción real: hoy, el objeto 3D.",
  },
  {
    label: "GitHub API",
    value: "ISR · 1 h",
    why: "Se trae en el servidor y se cachea con tags. Si GitHub falla, se ven los datos manuales.",
  },
  {
    label: "WebGL2",
    value: "≈ 6 KB",
    why: "El objeto que muta es un shader propio, sin Three.js. Se adapta a los fps de cada equipo.",
  },
  {
    label: "Streaming",
    value: "Suspense",
    why: "El hero se pinta al instante; lo que depende de GitHub llega después con skeletons.",
  },
  {
    label: "CSS",
    value: "Tailwind 4",
    why: "Tokens de diseño en un solo archivo. El fondo y el vidrio son CSS puro: 0 KB de JS.",
  },
  {
    label: "Menú mobile",
    value: "Popover API",
    why: "Nativo del navegador: foco, Esc y click afuera sin una línea de JavaScript.",
  },
] as const;

export function Colophon() {
  return (
    <section aria-labelledby="como-esta-hecho" className="pb-28 md:pb-40">
      <Container>
        <div className="glass rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] text-ash uppercase">Colofón</p>
              <h2
                id="como-esta-hecho"
                className="mt-3 font-condensed text-display-md text-bone uppercase"
              >
                Cómo está hecho este sitio
              </h2>
            </div>
            <a
              href={site.sourceRepo}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "glass" })}
            >
              <GitHubIcon />
              Ver el código
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
            {decisions.map((d) => (
              <div key={d.label} className="bg-ink/80 p-5">
                <dt className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] tracking-wider text-ash uppercase">
                    {d.label}
                  </span>
                  <span className="font-mono text-sm text-ember">{d.value}</span>
                </dt>
                <dd className="mt-3 text-sm text-pretty text-bone/80">{d.why}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
