/**
 * Contenido de "Sobre mí". Todo sale del CV: si algo cambia, se edita acá.
 */
export const aboutParagraphs = [
  "Estudio Ingeniería Informática en la Universidad Blas Pascal y estoy en 3er año. En paralelo construyo software que se usa de verdad: junto a otro desarrollador vendimos un sistema de gestión a una panadería que lo usa todos los días, y desarrollé solo Pointix, un SaaS de turnos que hoy está en etapa comercial.",
  "Desde 2022 tengo mi propio emprendimiento de compra, reparación y venta de notebooks usadas. Diagnosticar cada equipo, responder por lo que entrego y tratar directo con clientes me dio una forma de trabajar que llevo al código.",
  "Busco mi primer trabajo formal como desarrollador junior / full stack.",
] as const;

export type Fact = { value: string; label: string; detail: string };

export const facts: Fact[] = [
  {
    value: "3er año",
    label: "Ingeniería Informática",
    detail: "Universidad Blas Pascal · 2024 – hoy",
  },
  { value: "1", label: "Sistema vendido", detail: "En producción, uso diario" },
  { value: "+200", label: "Notebooks vendidas", detail: "FD Computación, desde 2022" },
  { value: "Mañanas", label: "Disponibilidad", detail: "Estudio por la tarde" },
];

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés técnico", level: "Intermedio (Inglés Técnico I–III, UBP)" },
  { name: "Inglés general", level: "Básico" },
] as const;
