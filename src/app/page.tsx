import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GitHubIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { About } from "@/features/about/about";
import { Colophon } from "@/features/colophon/colophon";
import { ContactSection } from "@/features/contact/contact-section";
import { Hero } from "@/features/hero/hero";
import { FeaturedProjects, FeaturedProjectsSkeleton } from "@/features/projects/featured-projects";
import { Skills } from "@/features/skills/skills";
import { site } from "@/data/site";

/**
 * Home. Server Component sin await propio: el hero se envía de inmediato y
 * cada bloque que depende de GitHub se streamea en su propio <Suspense>.
 *
 * data-morph-stage = forma del objeto de fondo en ese bloque
 * (0 núcleo · 1 nudo · 2 hélice · 3 retícula · 4 ola).
 */
export default function HomePage() {
  return (
    <main>
      <Hero />

      <div data-morph-stage="1">
        <section aria-labelledby="proyectos" className="py-28 md:py-40">
          <Container>
            <SectionHeading
              id="proyectos"
              index="01"
              eyebrow="Proyectos"
              title={
                <>
                  Software real,
                  <br />
                  <span className="text-ember">funcionando.</span>
                </>
              }
              description="Sistemas reales: dos en uso con clientes, un SaaS propio desplegado y un proyecto final hecho en equipo."
            />
            <div className="mt-14">
              <Suspense fallback={<FeaturedProjectsSkeleton />}>
                <FeaturedProjects />
              </Suspense>
            </div>
            <a
              href={site.github.url}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "glass", className: "mt-8" })}
            >
              <GitHubIcon />
              Ver todo mi GitHub
              <span className="sr-only">(se abre en otra pestaña)</span>
            </a>
          </Container>
        </section>
      </div>

      <div data-morph-stage="2">
        <About />
      </div>

      <div data-morph-stage="3">
        <Skills />
        <Colophon />
      </div>

      <div data-morph-stage="4">
        <ContactSection />
      </div>
    </main>
  );
}
