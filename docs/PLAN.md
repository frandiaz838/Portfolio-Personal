# Plan de trabajo — Portfolio Francisco Díaz

Un commit por paso. Los pasos marcados con ⏸ esperan OK antes de seguir.

| #   | Paso                   | Entregable                                                                                                                                                                 |
| --- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0   | Base                   | `git init`, estructura de carpetas, este plan                                                                                                                              |
| 1   | Setup                  | Next.js (App Router) + TS estricto + Tailwind + ESLint/Prettier, alias `@/`, `.env.example`                                                                                |
| 2   | Integración GitHub     | `src/lib/github.ts` (fetch en servidor, ISR 1h + tags, token opcional, tipos), `src/data/featured.ts`, merge API + manual con fallback                                     |
| 3   | ⏸ Direcciones visuales | 2 propuestas (paleta + tipografías + elemento del hero) — elegís vos                                                                                                       |
| 4   | Design system + layout | Tokens, fondo (aurora + grain + grilla), `Glass`, `Button` (cva), header/footer                                                                                            |
| 5   | Secciones              | Hero, Sobre mí, Destacados (bento), Más en GitHub (filtro por lenguaje), Skills, Experiencia, Cómo está hecho, con Suspense + skeletons                                    |
| 6   | Contacto               | Server Action + Zod + Resend, `useActionState` / `useFormStatus` / `useOptimistic`, honeypot                                                                               |
| 7   | Efectos                | Hooks (`useMousePosition`, `useMagnetic`, `useInView`, `useMediaQuery`, `useReducedMotion`), spotlight, tilt, magnéticos, reveal, scroll, marquee, cursor, hero WebGL lazy |
| 8   | Command palette        | Cmd/Ctrl+K: navegar, abrir proyectos, tema, idioma, copiar mail                                                                                                            |
| 9   | ⏸ Rutas avanzadas      | `/proyectos/[slug]` + `@modal` con intercepting routes, `generateStaticParams`, `generateMetadata`, OG con `ImageResponse`                                                 |
| 10  | Tema + i18n            | Dark/light y ES/EN sin flash (cookie leída en servidor)                                                                                                                    |
| 11  | SEO + perf             | Metadata, sitemap, robots, JSON-LD Person, auditoría Lighthouse                                                                                                            |
| 12  | Tests + CI             | Vitest + Testing Library (hooks/utils), GitHub Actions (lint, typecheck, test, build)                                                                                      |
| 13  | Deploy                 | Repo en GitHub, Vercel, env vars, README final                                                                                                                             |
