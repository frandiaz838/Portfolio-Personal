import { site } from "@/data/site";

// Página provisoria: las secciones reales llegan en el paso 5.
export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="text-4xl font-bold">{site.name}</h1>
      <p className="mt-2 opacity-70">{site.role}</p>
    </main>
  );
}
