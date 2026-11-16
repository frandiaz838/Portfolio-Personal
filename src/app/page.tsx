import { site } from "@/data/site";
import { getFeaturedProjects, getOtherRepos } from "@/features/projects/queries";

// Página provisoria (Server Component): verifica la integración con GitHub.
// Las secciones reales, con Suspense y skeletons, llegan en el paso 5.
export default async function HomePage() {
  const [featured, others] = await Promise.all([getFeaturedProjects(), getOtherRepos()]);

  return (
    <main className="mx-auto max-w-3xl space-y-12 px-4 py-24">
      <header>
        <h1 className="text-4xl font-bold">{site.name}</h1>
        <p className="mt-2 opacity-70">{site.role}</p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold">Destacados</h2>
        <ul className="mt-4 space-y-4">
          {featured.map((p) => (
            <li key={p.slug}>
              <strong>{p.title}</strong> — {p.tagline}
              <div className="text-sm opacity-60">
                {p.github
                  ? `★ ${p.github.stars} · ${p.github.languages.map((l) => `${l.name} ${l.percent}%`).join(", ")}`
                  : "sin datos de GitHub"}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Más en GitHub</h2>
        <ul className="mt-4 space-y-2">
          {others.map((r) => (
            <li key={r.id}>
              <a href={r.url} className="underline">
                {r.name}
              </a>{" "}
              <span className="text-sm opacity-60">{r.language ?? "—"}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
