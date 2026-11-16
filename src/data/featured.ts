/**
 * Proyectos destacados (curados a mano).
 *
 * Cómo agregar uno:
 *  1. Sumá un objeto al array con un `slug` único (se usa en la URL /proyectos/[slug]).
 *  2. Si el repo es público, poné su nombre exacto en `repo`: estrellas, lenguajes y
 *     última actualización se traen solos de GitHub. Si es privado, `repo: null`.
 *  3. Screenshot en public/images/projects/<slug>.webp (16:10, ~1600px de ancho).
 *
 * Lo manual SIEMPRE se muestra, aunque GitHub falle: la API solo enriquece.
 */

export type ProjectKind = "personal" | "colaborativo" | "universitario";

export type FeaturedProject = {
  slug: string;
  title: string;
  /** Una línea, para la card. */
  tagline: string;
  /** Párrafo para la vista de detalle. */
  description: string;
  /** Qué hiciste vos, concreto. */
  role: string;
  kind: ProjectKind;
  year: number;
  /** Etiqueta de estado visible ("En producción", "Etapa comercial", etc.) */
  status: string;
  stack: string[];
  highlights: string[];
  /** Nombre del repo público en GitHub, o null si es privado. */
  repo: string | null;
  links: {
    live?: string;
  };
  /** Ruta en /public. null mientras no haya screenshot (la card usa un placeholder). */
  image: { src: string; alt: string } | null;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "pointix",
    title: "Pointix",
    tagline: "SaaS multi-tenant de gestión de turnos y reservas.",
    description:
      "Plataforma SaaS multi-tenant para la gestión de turnos y reservas, con arquitectura full stack completa (frontend, backend y base de datos) y un sistema de diseño propio. Funcional, con dominio propio y en etapa comercial.",
    role: "Diseño y desarrollo individual, de punta a punta.",
    kind: "personal",
    year: 2026,
    status: "Etapa comercial",
    stack: [
      "Next.js",
      "TypeScript",
      "React",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "NextAuth",
      "MercadoPago",
      "Resend",
      "Recharts",
    ],
    highlights: [
      "Arquitectura multi-tenant",
      "Autenticación con NextAuth",
      "Pagos con MercadoPago",
      "Emails transaccionales con Resend",
      // TODO(Francis): sumar métricas reales si las tenés (clientes, reservas, etc.)
    ],
    repo: "Pointix---Turnero",
    links: { live: "https://pointix.com.ar" },
    image: null, // TODO(Francis): public/images/projects/pointix.webp
  },
  {
    slug: "vila-panaderia",
    title: "Vila Panadería",
    tagline: "Sistema de gestión vendido y en uso diario en una panadería real.",
    description:
      "Sistema de gestión integral para una panadería local: roles (Admin y Encargado), control de stock, fiados/pagos y reportes con log de auditoría. Lo vendimos al cliente y lo desplegamos en producción; lo usan a diario el dueño del comercio y sus empleados.",
    role: "Desarrollo full stack en equipo de dos personas, venta e implementación con el cliente.",
    kind: "colaborativo",
    year: 2026,
    status: "En producción",
    stack: ["Go", "React", "MySQL", "PostgreSQL", "JWT", "Render", "Vercel"],
    highlights: [
      "Cliente real, en uso diario",
      "Roles y permisos con JWT",
      "Stock, fiados y pagos",
      "Reportes con log de auditoría",
    ],
    // Repo privado: la card no lleva link a GitHub.
    repo: null,
    links: {},
    image: null, // TODO(Francis): screenshot SIN datos del cliente (usar datos de prueba)
  },
  {
    slug: "coopul",
    title: "Coopul",
    tagline: "App móvil multiplataforma de viajes compartidos.",
    description:
      "App de carpooling multiplataforma (Android, iOS, Windows) desarrollada con historias de usuario y sprints (Scrum) como proyecto final de Programación Genérica y Eventos. Incluye publicación de viajes, chat grupal, notificaciones, calificaciones y tema claro/oscuro.",
    role: "Mayor parte del desarrollo, incluidas la autenticación, la base de datos en Firebase y sus reglas de seguridad.",
    kind: "universitario",
    year: 2026,
    status: "Proyecto final",
    stack: ["C#", ".NET 10", ".NET MAUI", "Firebase"],
    highlights: [
      "Trabajo en equipo con Scrum",
      "Auth y Realtime Database con Firebase",
      "Chat grupal y notificaciones",
      "Pruebas automatizadas",
    ],
    repo: "PoolCompartido",
    links: {},
    image: null, // TODO(Francis): public/images/projects/coopul.webp
  },
];

/**
 * Repos que nunca aparecen en "Más en GitHub" (además de forks, archivados y destacados).
 */
export const hiddenRepos: readonly string[] = [
  "frandiaz838", // README del perfil
  "Portfolio-Personal", // este mismo sitio (se muestra en "Cómo está hecho")
];
