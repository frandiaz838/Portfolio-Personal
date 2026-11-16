/**
 * Única fuente de verdad para datos personales y links.
 * Si cambia el mail o un perfil, se cambia acá y se propaga a todo el sitio
 * (hero, contacto, command palette, JSON-LD, metadata).
 */
export const site = {
  name: "Francisco Díaz",
  shortName: "Francis",
  role: "Estudiante de Ingeniería Informática · Full Stack Jr.",
  location: "Córdoba, Argentina",
  email: "frandiaz838@gmail.com",
  github: {
    username: "frandiaz838",
    url: "https://github.com/frandiaz838",
  },
  linkedin: "https://www.linkedin.com/in/francisco-diaz-691b94211",
  // TODO(Francis): copiar el PDF del CV a public/cv/francisco-diaz-cv.pdf
  cvPath: "/cv/francisco-diaz-cv.pdf",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export type Site = typeof site;
