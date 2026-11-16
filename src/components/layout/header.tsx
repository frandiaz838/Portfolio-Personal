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
        <Link href="/" className="group flex items-center gap-2.5 font-mono text-sm">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-full bg-ember font-condensed text-sm text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-12deg]"
          >
            FD
          </span>
          <span className="text-bone">{site.shortName}</span>
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

      <div
        id="mobile-menu"
        popover="auto"
        className="glass inset-x-4 top-20 bottom-auto m-0 w-auto rounded-3xl p-3 text-bone backdrop:bg-ink/60 backdrop:backdrop-blur-sm md:hidden"
      >
        <ul className="flex flex-col">
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
