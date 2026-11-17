import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Background } from "@/components/layout/background";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MorphCanvas } from "@/features/morph/morph-canvas";
import { site } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

const defaultTitle = `${site.name} — ${site.role}`;

/**
 * og.png: captura del hero a 1200×630 (lo que muestran LinkedIn y WhatsApp al pegar el link).
 * metadataBase la convierte en URL absoluta: en producción hay que definir NEXT_PUBLIC_SITE_URL.
 */
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.role}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={fontVariables}>
      <body className="min-h-dvh overflow-x-clip antialiased">
        <a
          href="#contenido"
          className="fixed top-4 left-4 z-[60] -translate-y-24 rounded-full bg-ember px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <Background />
        <MorphCanvas />
        <Header />
        <div id="contenido">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
