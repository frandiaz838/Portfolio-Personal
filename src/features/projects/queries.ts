import "server-only";

import { existsSync } from "node:fs";
import path from "node:path";
import { featuredProjects, type FeaturedProject } from "@/data/featured";
import { getRepoLanguages, getRepos } from "@/features/github/api";
import type { LanguageShare } from "@/features/github/types";

/** Datos de GitHub que enriquecen un destacado. Ausente si es privado o si la API falló. */
export type ProjectGitHubData = {
  url: string;
  description: string | null;
  stars: number;
  pushedAt: string;
  languages: LanguageShare[];
};

export type Project = FeaturedProject & { github: ProjectGitHubData | null };

/**
 * Destacados = datos manuales + datos de GitHub.
 * Una request a /repos (cacheada y deduplicada por Next) + una por lenguajes de cada repo,
 * en paralelo con Promise.all.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const repos = await getRepos();
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  return Promise.all(
    featuredProjects.map(withExistingGallery).map(async (project): Promise<Project> => {
      const repo = project.repo ? byName.get(project.repo.toLowerCase()) : undefined;
      if (!repo) return { ...project, github: null }; // privado o GitHub caído → solo manual

      return {
        ...project,
        github: {
          url: repo.url,
          description: repo.description,
          stars: repo.stars,
          pushedAt: repo.pushedAt,
          languages: await getRepoLanguages(repo.name),
        },
      };
    }),
  );
}

/**
 * Deja en la galería solo las capturas que ya están en /public: si todavía no subiste
 * los archivos, la card se ve como antes (sin cajas vacías ni 404).
 * En Vercel, /public no viaja con la función de ISR por defecto: por eso
 * next.config.ts la suma con outputFileTracingIncludes.
 */
function withExistingGallery(project: FeaturedProject): FeaturedProject {
  if (!project.gallery) return project;
  const gallery = project.gallery.filter((shot) =>
    existsSync(path.join(process.cwd(), "public", shot.src)),
  );
  return { ...project, gallery };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getFeaturedProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}
