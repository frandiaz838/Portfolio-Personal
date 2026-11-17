import { featuredProjects } from "./featured";

/**
 * Stack agrupado. Sin porcentajes ni barras: no significan nada medible.
 * La señal que sí importa ("lo usé en algo que está en producción") se calcula sola.
 */
export type SkillGroup = {
  title: string;
  /** Tamaño en el bento */
  size: "lg" | "md";
  items: string[];
  note?: string;
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    size: "lg",
    items: ["React", "Next.js", "TypeScript", "JavaScript", ".NET MAUI"],
  },
  {
    title: "Backend",
    size: "lg",
    items: ["Go", "Prisma", "REST APIs", "JWT", "NextAuth", "MercadoPago", "Resend", "C#"],
  },
  {
    title: "Datos",
    size: "md",
    items: ["PostgreSQL", "Supabase", "MySQL", "Firebase"],
  },
  {
    title: "Lenguajes",
    size: "md",
    items: ["TypeScript", "Go", "C#", "C++", "Python"],
  },
  {
    title: "Herramientas",
    size: "md",
    items: ["Git", "GitHub", "Vercel", "Render", "VS Code", "Qt Creator"],
  },
  {
    title: "Inteligencia artificial",
    size: "lg",
    items: ["Gemini API", "AssemblyAI", "Claude Code", "Cursor"],
    note: "Integración de AssemblyAI (diarización de audio) y Gemini en un proyecto final de Programación Orientada a Objetos, en equipo.",
  },
  {
    title: "Redes e infraestructura",
    size: "lg",
    items: ["Cisco Packet Tracer", "VLAN", "STP", "ACL", "WLC", "Hardware"],
    note: "Diagnóstico y reparación de hardware (FD Computación).",
  },
];

/** Normaliza variantes ("PostgreSQL (Supabase)", ".NET 10") para comparar. */
const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, "");

/** Tecnologías usadas en proyectos que hoy están en producción. Derivado de featured.ts. */
export const productionTech: ReadonlySet<string> = new Set(
  featuredProjects
    .filter((p) => p.inProduction)
    .flatMap((p) => p.stack.map(normalize)),
);

export const isUsedInProduction = (tech: string) => productionTech.has(normalize(tech));
