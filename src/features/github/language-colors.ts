/** Colores oficiales de GitHub Linguist para los lenguajes que aparecen en los repos. */
const COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Python: "#3572A5",
  CSS: "#663399",
  HTML: "#e34c26",
  PLpgSQL: "#336790",
  Dart: "#00B4AB",
  Shell: "#89e051",
};

export function languageColor(language: string): string {
  return COLORS[language] ?? "#9a938a"; // ash para desconocidos y "Otros"
}
