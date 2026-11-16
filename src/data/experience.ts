export type ExperienceItem = {
  org: string;
  role: string;
  period: string;
  /** Destaca el ítem (iniciativa propia). */
  highlight?: boolean;
  points: string[];
};

/** Del CV. Orden: lo más relevante primero. */
export const experience: ExperienceItem[] = [
  {
    org: "FD Computación",
    role: "Emprendimiento propio · compra y venta de notebooks usadas",
    period: "2022 – actualidad",
    highlight: true,
    points: [
      "Más de 200 notebooks vendidas, con diagnóstico de fallas, reparación y preparación de cada equipo antes de su reventa.",
      "Ventas por Facebook Marketplace, MercadoLibre y catálogo web propio (desarrollado por mí).",
    ],
  },
  {
    org: "ONIET · UBP",
    role: "Colaborador en la organización de equipos del torneo universitario",
    period: "2025",
    points: ["Actividad extracurricular de la facultad."],
  },
  {
    org: "Ellos Deciden Indumentaria",
    role: "Atención al público",
    period: "Dic. 2024 – May. 2025",
    points: [
      "Atención al público, control de stock y mantenimiento del equipamiento informático del local.",
    ],
  },
  {
    org: "Avance Automotores",
    role: "Atención al público y canales digitales",
    period: "Jul. 2022 – May. 2023",
    points: [
      "Atención al público, manejo de redes sociales, ventas por MercadoLibre y administración de la página web.",
    ],
  },
];
