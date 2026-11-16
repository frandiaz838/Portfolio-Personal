import type { LanguageShare } from "./types";
import { languageColor } from "./language-colors";

/** Barra apilada de lenguajes (datos reales de GitHub) + leyenda de los principales. */
export function LanguageBar({ languages }: { languages: LanguageShare[] }) {
  if (languages.length === 0) return null;
  const label = languages.map((l) => `${l.name} ${l.percent}%`).join(", ");

  return (
    <div>
      <div
        role="img"
        aria-label={`Lenguajes: ${label}`}
        className="flex h-1.5 gap-0.5 overflow-hidden rounded-full"
      >
        {languages.map((l) => (
          <span
            key={l.name}
            style={{ width: `${l.percent}%`, background: languageColor(l.name) }}
          />
        ))}
      </div>
      <ul
        className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-ash"
        aria-hidden
      >
        {languages.slice(0, 3).map((l) => (
          <li key={l.name} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: languageColor(l.name) }} />
            {l.name} <span className="text-ash">{l.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
