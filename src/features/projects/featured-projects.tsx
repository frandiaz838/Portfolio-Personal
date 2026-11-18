import { Skeleton } from "@/components/ui/skeleton";
import { ProjectCard } from "./project-card";
import { getFeaturedProjects } from "./queries";

const GRID = "grid gap-4 md:grid-cols-2 lg:grid-cols-6";

/** Server Component async: hace su propio fetch y se streamea dentro de un <Suspense>. */
export async function FeaturedProjects() {
  const projects = await getFeaturedProjects();
  return (
    <div className={GRID}>
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}

/** Mismo grid y alturas aproximadas que las cards reales → sin salto al llegar los datos. */
export function FeaturedProjectsSkeleton() {
  return (
    <div className={GRID}>
      <Skeleton className="h-[560px] rounded-3xl md:col-span-2 lg:col-span-4 lg:h-[545px]" />
      <Skeleton className="h-[460px] rounded-3xl md:col-span-2 lg:col-span-2 lg:h-[545px]" />
      <Skeleton className="h-[480px] rounded-3xl lg:col-span-3 lg:h-[460px]" />
      <Skeleton className="h-[480px] rounded-3xl lg:col-span-3 lg:h-[460px]" />
    </div>
  );
}
