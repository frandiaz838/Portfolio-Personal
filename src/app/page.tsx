import { Container } from "@/components/ui/container";
import { Glass } from "@/components/ui/glass";
import { SectionHeading } from "@/components/ui/section-heading";
import { Hero } from "@/features/hero/hero";
import { getFeaturedProjects, getOtherRepos } from "@/features/projects/queries";

// Esqueleto de secciones. El contenido real (bento, filtros, Suspense) llega en el paso 5.
// data-morph-stage marca en qué forma tiene que estar el objeto de fondo en cada sección.
export default async function HomePage() {
  const [featured, others] = await Promise.all([getFeaturedProjects(), getOtherRepos()]);

  return (
    <main>
      <Hero />

      <section data-morph-stage="1" className="py-32">
        <Container>
          <SectionHeading
            id="proyectos"
            index="01"
            eyebrow="Proyectos"
            title={
              <>
                Software real,
                <br />
                <span className="text-ember">en producción.</span>
              </>
            }
            description="No son ejercicios: son sistemas que usan clientes y negocios todos los días."
          />
          <ul className="mt-16 grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <li key={p.slug}>
                <Glass className="h-full">
                  <p className="font-mono text-xs text-ash uppercase">{p.status}</p>
                  <h3 className="mt-3 font-condensed text-display-md uppercase">{p.title}</h3>
                  <p className="mt-3 text-ash">{p.tagline}</p>
                </Glass>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-mono text-xs text-ash">+ {others.length} repos más en GitHub</p>
        </Container>
      </section>

      <section data-morph-stage="2" className="flex min-h-svh items-center py-32">
        <Container>
          <SectionHeading
            id="sobre-mi"
            index="02"
            eyebrow="Sobre mí"
            title="Contenido en el paso 5"
          />
        </Container>
      </section>

      <section data-morph-stage="3" className="flex min-h-svh items-center py-32">
        <Container>
          <SectionHeading id="stack" index="03" eyebrow="Stack" title="Contenido en el paso 5" />
        </Container>
      </section>

      <section data-morph-stage="4" className="flex min-h-svh items-center py-32">
        <Container>
          <SectionHeading
            id="contacto"
            index="04"
            eyebrow="Contacto"
            title="Contenido en el paso 6"
          />
        </Container>
      </section>
    </main>
  );
}
