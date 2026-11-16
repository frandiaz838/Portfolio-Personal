import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";

/**
 * next/font descarga las fuentes en build y las sirve desde nuestro dominio:
 * cero requests a Google, cero layout shift (genera un fallback con métricas ajustadas).
 */

/** Display: variable con ejes de ancho (wdth 75–100) y tamaño óptico. Títulos condensados. */
export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const fontSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false, // se usa en detalles chicos, no bloquea el primer render
});

export const fontVariables = [fontDisplay.variable, fontSans.variable, fontMono.variable].join(" ");
