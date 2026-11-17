import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Avatares de GitHub (foto de perfil, owners de repos)
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
  // queries.ts chequea qué capturas de proyectos existen en /public. En Vercel esa
  // carpeta no viaja con la función que regenera la página (ISR): la sumamos al trace.
  outputFileTracingIncludes: {
    "/": ["./public/projects/**/*"],
    "/**": ["./public/projects/**/*"],
  },
};

export default nextConfig;
