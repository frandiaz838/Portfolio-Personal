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
