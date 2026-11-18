/**
 * Única fuente de verdad para datos personales y links.
 * Si cambia el mail o un perfil, se cambia acá y se propaga a todo el sitio
 * (hero, contacto, command palette, JSON-LD, metadata).
 */
export const site = {
  name: "Francisco Díaz",
  role: "Estudiante de Ingeniería Informática · Full Stack Jr.",
  location: "Córdoba, Argentina",
  email: "frandiaz838@gmail.com",
  github: {
    username: "frandiaz838",
    url: "https://github.com/frandiaz838",
  },
  linkedin: "https://www.linkedin.com/in/francisco-diaz-691b94211",
  cvPath: "/cv/francisco-diaz-cv.pdf",
  /** Qué busco. Se muestra en el hero y en Contacto. */
  lookingFor: "Busco mi primer trabajo formal: desarrollo junior o soporte IT.",
  /** Se muestra en Contacto (no en el hero). */
  availability: "Full time durante las vacaciones y por la mañana cuando retomo la facultad.",
  /** Descripción para buscadores y para la vista previa al compartir el link. */
  description:
    "Portfolio de Francisco Díaz, estudiante de Ingeniería Informática: proyectos full stack desplegados con Next.js, React, Go y TypeScript. Busca su primer trabajo en desarrollo o soporte IT.",
  sourceRepo: "https://github.com/frandiaz838/Portfolio-Personal",
  /**
   * URL pública (la usan metadataBase, Open Graph y el sitemap). Orden:
   *  1. NEXT_PUBLIC_SITE_URL, si la definís (ej. cuando haya dominio propio)
   *  2. el dominio de producción que Vercel inyecta solo en cada build
   *  3. localhost en desarrollo
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;

export type Site = typeof site;
