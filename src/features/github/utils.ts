/**
 * Funciones puras sobre repos: sin fetch ni Next, así se testean fácil (paso 12).
 */
import type { GitHubRepoRaw, LanguageShare, Repo } from "./types";

export function normalizeRepo(raw: GitHubRepoRaw): Repo {
  return {
    id: raw.id,
    name: raw.name,
    url: raw.html_url,
    description: raw.description,
    // GitHub devuelve "" cuando el campo está vacío: lo tratamos como null
    homepage: raw.homepage?.trim() || null,
    language: raw.language,
    topics: raw.topics,
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    isFork: raw.fork,
    isArchived: raw.archived,
    pushedAt: raw.pushed_at,
  };
}

type FilterOptions = {
  /** Nombres de repo a excluir (ej. los destacados, que ya se muestran arriba). Case-insensitive. */
  exclude?: readonly string[];
};

/** Saca forks, archivados y excluidos; ordena por actividad (último push primero). */
export function selectOtherRepos(repos: readonly Repo[], { exclude = [] }: FilterOptions = {}) {
  const excluded = new Set(exclude.map((name) => name.toLowerCase()));
  return repos
    .filter((r) => !r.isFork && !r.isArchived && !excluded.has(r.name.toLowerCase()))
    .toSorted((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt));
}

/** Lenguajes únicos presentes en los repos, ordenados por cantidad de repos (para el filtro). */
export function getLanguageOptions(repos: readonly Repo[]): string[] {
  const counts = new Map<string, number>();
  for (const { language } of repos) {
    if (language) counts.set(language, (counts.get(language) ?? 0) + 1);
  }
  return [...counts.entries()]
    .toSorted(([aName, a], [bName, b]) => b - a || aName.localeCompare(bName))
    .map(([name]) => name);
}

/**
 * Convierte bytes por lenguaje en porcentajes. Agrupa lo menor a `minPercent` en "Otros"
 * para no mostrar 0.1% de Dockerfile.
 */
export function toLanguageShares(
  bytesByLanguage: Record<string, number>,
  minPercent = 2,
): LanguageShare[] {
  const total = Object.values(bytesByLanguage).reduce((sum, n) => sum + n, 0);
  if (total === 0) return [];

  const shares: LanguageShare[] = [];
  let others = 0;
  for (const [name, bytes] of Object.entries(bytesByLanguage)) {
    const percent = (bytes / total) * 100;
    if (percent < minPercent) others += percent;
    else shares.push({ name, percent: round1(percent) });
  }
  shares.sort((a, b) => b.percent - a.percent);
  if (others > 0) shares.push({ name: "Otros", percent: round1(others) });
  return shares;
}

const round1 = (n: number) => Math.round(n * 10) / 10;
