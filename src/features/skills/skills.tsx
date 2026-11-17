import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { isUsedInProduction, skillGroups, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";

const SIZE: Record<SkillGroup["size"], string> = {
  lg: "md:col-span-3",
  md: "md:col-span-2",
};

export function Skills() {
  return (
    <section aria-labelledby="stack" className="py-28 md:py-40">
      <Container>
        <SectionHeading
          id="stack"
          index="03"
          eyebrow="Stack"
          title={
            <>
              Con qué
              <br />
              <span className="text-ember">construyo.</span>
            </>
          }
          description={
            <>
              Sin barras de porcentaje. Lo resaltado{" "}
              <Chip tone="ember" className="align-middle">
                ● en producción
              </Chip>{" "}
              lo usé en proyectos que hoy están funcionando con usuarios reales.
            </>
          }
        />

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          {skillGroups.map((group) => (
            <div key={group.title} className={cn("glass rounded-3xl p-6 sm:p-7", SIZE[group.size])}>
              <h3 className="font-condensed text-3xl text-bone uppercase">{group.title}</h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const prod = isUsedInProduction(item);
                  return (
                    <li key={item}>
                      <Chip size="md" tone={prod ? "ember" : "default"}>
                        {prod && <span aria-hidden>●</span>}
                        {item}
                        {prod && <span className="sr-only">(usado en producción)</span>}
                      </Chip>
                    </li>
                  );
                })}
              </ul>
              {group.note && <p className="mt-4 text-sm text-ash">{group.note}</p>}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
