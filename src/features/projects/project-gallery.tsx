import Image from "next/image";
import type { FeaturedProject } from "@/data/featured";

type Shot = NonNullable<FeaturedProject["gallery"]>[number];

/**
 * Tira de capturas de la app. Recibe solo las que existen en /public
 * (el filtro está en queries.ts), así que nunca muestra cajas vacías.
 */
export function ProjectGallery({ title, shots }: { title: string; shots: Shot[] }) {
  return (
    <ul aria-label={`Capturas de ${title}`} className="grid grid-cols-3 gap-2">
      {shots.map((shot) => (
        <li
          key={shot.src}
          className="relative aspect-[9/16] overflow-hidden rounded-xl border border-white/[0.06] bg-ink-raised"
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            fill
            sizes="(min-width: 1024px) 14vw, (min-width: 768px) 22vw, 30vw"
            className="object-cover object-top"
          />
        </li>
      ))}
    </ul>
  );
}
