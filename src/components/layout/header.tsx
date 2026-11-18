import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MenuIcon } from "@/components/ui/icons";
import { navItems } from "@/data/navigation";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Header flotante de vidrio. Server Component: el menú mobile usa la Popover API
 * nativa (popover / popovertarget), así que abre, cierra con Esc y click afuera,
 * y maneja el foco sin una línea de JS.
 */
export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Principal"
        className="glass mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full pr-2 pl-5"
      >
        <Link href="/" className="flex items-center gap-2.5 font-mono text-sm">
          <span className="text-bone">{site.name}</span>
          <span className="hidden text-ash sm:inline">/ full stack</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={buttonVariants({ variant: "ghost", size: "sm" })}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <a
            href="#contacto"
            className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}
          >
            Hablemos
          </a>
          <button
            type="button"
            popoverTarget="mobile-menu"
            aria-label="Abrir menú"
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
          >
            <MenuIcon className="size-5!" />
          </button>
        </div>
      </nav>

      {/* El popover es un contenedor fixed "limpio" y el vidrio va adentro: .glass pone
          position: relative, que en la capa superior se resuelve como absolute respecto
          del documento. Con la página scrolleada, Safari dejaba el menú arriba de todo,
          fuera de pantalla, y solo se veía el fondo desenfocado. */}
      <div
        id="mobile-menu"
        popover="auto"
        className="fixed inset-x-4 top-20 bottom-auto m-0 w-auto overflow-visible border-0 bg-transparent p-0 text-bone backdrop:bg-ink/75 backdrop:backdrop-blur-sm md:hidden"
      >
        <ul className="glass flex flex-col rounded-3xl p-3">
          {navItems.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="flex items-baseline justify-between rounded-2xl px-4 py-3 font-condensed text-3xl uppercase hover:bg-white/5"
              >
                {item.label}
                <span className="font-mono text-xs text-ash">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
