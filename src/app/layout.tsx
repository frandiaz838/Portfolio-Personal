import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Portfolio de Francisco Díaz: proyectos full stack en producción con Next.js, React, Go y TypeScript.",
};

export const viewport: Viewport = {
  themeColor: "#0c0e14",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
