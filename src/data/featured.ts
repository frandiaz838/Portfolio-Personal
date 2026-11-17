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

/**
 * Tamaño en el bento de la home:
 *  - "feature": la card grande (con visual), ideal para el proyecto principal
 *  - "tall": alta y angosta
 *  - "wide": mitad de ancho, sin visual
 */
export type ProjectLayout = "feature" | "tall" | "wide";

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
  /** Etiqueta de estado visible ("En producción", "Proyecto final", etc.) */
  status: string;
  /**
   * Desplegado y listo para uso real (tenga o no clientes todavía).
   * Marca su stack como "en producción" en la sección Stack (ver skills.ts).
   */
  inProduction: boolean;
  stack: string[];
  highlights: string[];
  /** Nombre del repo público en GitHub, o null si es privado. */
  repo: string | null;
  links: {
    live?: string;
  };
  layout: ProjectLayout;
  /** Frase destacada para la card (opcional). */
  callout?: string;
  /** Línea "Integraciones · …" en la card (opcional). */
  integrations?: string;
  /** Ruta en /public. null mientras no haya screenshot (la card usa un placeholder). */
  image: { src: string; alt: string } | null;
  /**
   * Capturas extra para la card (opcional). Si un archivo todavía no existe,
   * esa captura no se muestra; si no existe ninguna, la galería no aparece.
   */
  gallery?: { src: string; alt: string }[];
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "pointix",
    layout: "feature",
    title: "Pointix",
    tagline: "SaaS multi-tenant de gestión de turnos y reservas.",
    description:
      "Plataforma SaaS multi-tenant para la gestión de turnos y reservas, con arquitectura full stack completa (frontend, backend y base de datos) y un sistema de diseño propio. Funcional y con dominio propio: desplegado, con pagos de MercadoPago probados; aún sin clientes.",
    role: "Diseño y desarrollo individual, de punta a punta.",
    integrations:
      "Pagos con MercadoPago (cobro de señas y configuración de credenciales por negocio), emails transaccionales con Resend y autenticación con NextAuth.",
    kind: "personal",
    year: 2026,
    status: "Desplegado · Pagos probados",
    inProduction: true,
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
    image: {
      src: "/images/projects/pointix.webp",
      alt: "Panel de Pointix: reservas, ingresos y ocupación del día, y la agenda de turnos del complejo",
    },
    // Para la vista de detalle (paso 9), en /projects/pointix/: grilla.webp (grilla pública
    // de turnos), reservas.webp (gestión de reservas del complejo) y pago.webp (detalle del
    // pago de la seña con MercadoPago). Datos de prueba, sin personas reales.
  },
  {
    slug: "vila-panaderia",
    layout: "tall",
    callout: "Lo usan todos los días el dueño del comercio y sus empleados.",
    title: "Vila Panadería",
    tagline: "Sistema de gestión vendido y en uso diario en una panadería real.",
    description:
      "Sistema de gestión integral para una panadería local: roles (Admin y Encargado), control de stock, fiados/pagos y reportes con log de auditoría. Lo vendimos al cliente y lo desplegamos en producción; lo usan a diario el dueño del comercio y sus empleados.",
    role: "Desarrollo full stack en equipo de dos personas, venta e implementación con el cliente.",
    kind: "colaborativo",
    year: 2026,
    status: "En producción",
    inProduction: true,
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
    slug: "fd-computacion",
    layout: "wide",
    title: "FD Computación",
    tagline: "Catálogo web de mi propio negocio de venta de notebooks.",
    description:
      "Sitio de mi emprendimiento de compra y venta de notebooks usadas: catálogo de equipos, autenticación propia y datos en Supabase. Complementa las ventas por Facebook Marketplace y MercadoLibre.",
    role: "Desarrollo y deploy individual; también soy el usuario y dueño del negocio.",
    kind: "personal",
    year: 2026,
    status: "En producción",
    inProduction: true,
    stack: ["Next.js", "TypeScript", "Supabase", "bcrypt", "JWT", "Vercel"],
    highlights: [
      "Autenticación propia con bcrypt + JWT",
      "Datos en Supabase (SDK)",
      "Usado en un negocio real",
    ],
    repo: "FDNotebooks",
    links: { live: "https://fd-notebooks.vercel.app" },
    image: null, // TODO(Francis): public/images/projects/fd-computacion.webp
  },
  {
    slug: "coopul",
    layout: "wide",
    title: "Coopul",
    tagline: "App móvil multiplataforma de viajes compartidos.",
    description:
      "App de carpooling multiplataforma (Android, iOS, Windows) desarrollada con historias de usuario y sprints (Scrum) como proyecto final de Programación Genérica y Eventos. Incluye publicación de viajes, chat grupal, notificaciones, calificaciones y tema claro/oscuro.",
    role: "Mayor parte del desarrollo, incluidas la autenticación, la base de datos en Firebase y sus reglas de seguridad.",
    kind: "universitario",
    year: 2026,
    status: "Proyecto final",
    inProduction: false,
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
    // TODO(Francis): guardar las capturas con estos nombres en public/projects/coopul/
    // y ajustar cada alt a lo que muestra la captura real.
    gallery: [
      {
        src: "/projects/coopul/viajes.png",
        alt: "Coopul: listado de viajes compartidos publicados, con origen, destino y horario",
      },
      {
        src: "/projects/coopul/chat.png",
        alt: "Coopul: chat grupal entre el conductor y los pasajeros de un viaje",
      },
      {
        src: "/projects/coopul/perfil.png",
        alt: "Coopul: perfil de usuario con sus calificaciones",
      },
    ],
  },
];
