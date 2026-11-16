import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutParagraphs, facts, languages } from "@/data/about";
import { experience } from "@/data/experience";

export function About() {
  return (
    <section aria-labelledby="sobre-mi" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          id="sobre-mi"
          index="02"
          eyebrow="Sobre mí"
          title={
            <>
              Del aula
              <br />
              <span className="text-ember">al cliente.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="space-y-5 text-lg leading-relaxed text-pretty text-bone/85 md:text-xl">
            {aboutParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          {/* Datos duros en un mini bento: se escanean en 3 segundos */}
          <dl className="grid grid-cols-2 gap-3 self-start">
            {facts.map((fact) => (
              <div key={fact.label} className="glass rounded-2xl p-5">
                <dt className="font-mono text-[11px] tracking-wider text-ash uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-2 font-condensed text-display-md text-bone uppercase">
                  {fact.value}
                </dd>
                <dd className="mt-1 text-sm text-ash">{fact.detail}</dd>
              </div>
            ))}
            <div className="glass col-span-2 rounded-2xl p-5">
              <dt className="font-mono text-[11px] tracking-wider text-ash uppercase">Idiomas</dt>
              {languages.map((l) => (
                <dd key={l.name} className="mt-2 flex justify-between gap-4 text-sm">
                  <span className="text-bone">{l.name}</span>
                  <span className="text-right text-ash">{l.level}</span>
                </dd>
              ))}
            </div>
          </dl>
        </div>

        <Experience />
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <div className="mt-28">
      <h3 className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-ash uppercase">
        Experiencia
        <span aria-hidden className="h-px flex-1 bg-ink-line" />
      </h3>
      <ol className="mt-4">
        {experience.map((item) => (
          <li
            key={item.org}
            className="grid gap-x-10 gap-y-2 border-b border-white/[0.06] py-8 md:grid-cols-[200px_1fr]"
          >
            <p className="font-mono text-xs tracking-wider text-ash uppercase md:pt-2">
              {item.period}
            </p>
            <div>
              <p className="flex flex-wrap items-center gap-3">
                <span className="font-condensed text-3xl text-bone uppercase md:text-4xl">
                  {item.org}
                </span>
                {item.highlight && (
                  <span className="rounded-full border border-ember/40 bg-ember/10 px-2.5 py-0.5 font-mono text-[11px] text-ember-hot">
                    Iniciativa propia
                  </span>
                )}
              </p>
              <p className="mt-1 text-ash">{item.role}</p>
              <ul className="mt-4 space-y-2 text-bone/85">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-ember" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
