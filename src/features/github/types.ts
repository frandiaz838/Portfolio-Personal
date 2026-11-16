import { z } from "zod";

/**
 * Esquema de un repo tal como lo devuelve la API REST de GitHub.
 * Solo validamos los campos que usamos: si GitHub agrega campos no nos afecta,
 * y si cambia uno que usamos, falla el parseo de forma controlada (→ fallback).
 */
export const gitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  html_url: z.url(),
  description: z.string().nullable(),
  homepage: z.string().nullable(),
  language: z.string().nullable(),
  topics: z.array(z.string()).default([]),
  stargazers_count: z.number(),
  forks_count: z.number(),
  fork: z.boolean(),
  archived: z.boolean(),
  private: z.boolean(),
  pushed_at: z.string(),
  updated_at: z.string(),
});

export const gitHubReposSchema = z.array(gitHubRepoSchema);

/** /repos/{owner}/{repo}/languages → { "TypeScript": 12345, "CSS": 678 } (bytes) */
export const gitHubLanguagesSchema = z.record(z.string(), z.number());

export type GitHubRepoRaw = z.infer<typeof gitHubRepoSchema>;

/** Forma normalizada (camelCase, sin nulls innecesarios) que usa la UI. */
export type Repo = {
  id: number;
  name: string;
  url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  isFork: boolean;
  isArchived: boolean;
  pushedAt: string;
};

export type LanguageShare = {
  name: string;
  /** Porcentaje 0–100, redondeado a 1 decimal */
  percent: number;
};
