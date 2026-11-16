import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/data/site";

/** Contacto. El formulario (Server Action + Resend) se suma en el paso 6. */
export function ContactSection() {
  return (
    <section aria-labelledby="contacto" className="flex min-h-svh items-center py-28 md:py-40">
      <Container>
        <SectionHeading
          id="contacto"
          index="04"
          eyebrow="Contacto"
          title={
            <>
              Hablemos<span className="text-ember">.</span>
            </>
          }
          description={`Busco mi primer trabajo formal como desarrollador. ${site.availability}.`}
        />

        <a
          href={`mailto:${site.email}`}
          className="group mt-12 inline-flex max-w-full items-center gap-3 text-[clamp(1.25rem,4.5vw,3rem)] font-medium break-all text-bone transition-colors hover:text-ember"
        >
          {site.email}
          <ArrowIcon className="size-[0.8em] shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>

        <div className="mt-10 flex flex-wrap gap-2">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "glass", size: "lg" })}
          >
            <LinkedInIcon />
            LinkedIn
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
          <a
            href={site.github.url}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ variant: "glass", size: "lg" })}
          >
            <GitHubIcon />
            GitHub
            <span className="sr-only">(se abre en otra pestaña)</span>
          </a>
          <a
            href={site.cvPath}
            download
            className={buttonVariants({ variant: "glass", size: "lg" })}
          >
            <DownloadIcon />
            Descargar CV
          </a>
        </div>
      </Container>
    </section>
  );
}
