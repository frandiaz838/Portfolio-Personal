import "server-only";

import { featuredProjects, hiddenRepos, type FeaturedProject } from "@/data/featured";
import { getRepoLanguages, getRepos } from "@/features/github/api";
import type { LanguageShare, Repo } from "@/features/github/types";
import { selectOtherRepos } from "@/features/github/utils";

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
 * Las llamadas van en paralelo (Promise.all) y Next deduplica/cachea el fetch de la lista
 * de repos, así que getFeaturedProjects + getOtherRepos cuestan una sola request a /repos.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const repos = await getRepos();
  const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

  return Promise.all(
    featuredProjects.map(async (project): Promise<Project> => {
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

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getFeaturedProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

/** "Más en GitHub": todo lo público menos forks, archivados, destacados y ocultos. */
export async function getOtherRepos(): Promise<Repo[]> {
  const repos = await getRepos();
  const featuredNames = featuredProjects.flatMap((p) => (p.repo ? [p.repo] : []));
  return selectOtherRepos(repos, { exclude: [...featuredNames, ...hiddenRepos] });
}
