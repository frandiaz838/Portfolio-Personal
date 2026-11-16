import "server-only"; // si alguien lo importa desde un Client Component, falla el build (protege el token)

import type { z } from "zod";
import { site } from "@/data/site";
import { gitHubLanguagesSchema, gitHubReposSchema, type LanguageShare, type Repo } from "./types";
import { normalizeRepo, toLanguageShares } from "./utils";

const API = "https://api.github.com";

/** ISR: los datos se regeneran como mucho una vez por hora. */
export const GITHUB_REVALIDATE_SECONDS = 60 * 60;
/** Tag para invalidar todo lo de GitHub on-demand con revalidateTag("github", "max"). */
export const GITHUB_CACHE_TAG = "github";

type Result<T> = { ok: true; data: T } | { ok: false; error: string };

function headers(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "portfolio-site",
    // Token opcional: sin él, 60 req/h por IP; con él, 5000/h.
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * fetch + validación con Zod. Nunca tira: devuelve un Result para que quien llama
 * decida el fallback (la UI no se rompe si GitHub está caído o nos limitó).
 */
async function gitHubFetch<S extends z.ZodType>(
  path: string,
  schema: S,
): Promise<Result<z.infer<S>>> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: headers(),
      next: { revalidate: GITHUB_REVALIDATE_SECONDS, tags: [GITHUB_CACHE_TAG] },
    });

    if (!res.ok) {
      const hint =
        res.status === 401
          ? " (GITHUB_TOKEN inválido o vencido)"
          : res.status === 403 || res.status === 429
            ? " (rate limit: configurá GITHUB_TOKEN)"
            : "";
      return { ok: false, error: `GitHub respondió ${res.status} en ${path}${hint}` };
    }

    const parsed = schema.safeParse(await res.json());
    if (!parsed.success) return { ok: false, error: `Respuesta inesperada de GitHub en ${path}` };
    return { ok: true, data: parsed.data };
  } catch (err) {
    return { ok: false, error: `No se pudo conectar con GitHub: ${String(err)}` };
  }
}

function logFailure(error: string) {
  console.warn(`[github] ${error} → usando fallback`);
}

/** Repos públicos del usuario (sin filtrar). Devuelve [] si falla. */
export async function getRepos(username = site.github.username): Promise<Repo[]> {
  const res = await gitHubFetch(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
    gitHubReposSchema,
  );
  if (!res.ok) {
    logFailure(res.error);
    return [];
  }
  return res.data.map(normalizeRepo);
}

/** Porcentaje de lenguajes de un repo. Devuelve [] si falla. */
export async function getRepoLanguages(
  repo: string,
  owner = site.github.username,
): Promise<LanguageShare[]> {
  const res = await gitHubFetch(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`,
    gitHubLanguagesSchema,
  );
  if (!res.ok) {
    logFailure(res.error);
    return [];
  }
  return toLanguageShares(res.data);
}
