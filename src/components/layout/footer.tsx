import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-ink-line py-10">
      <Container className="flex flex-col gap-4 font-mono text-xs text-ash sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p>Next.js · TypeScript · Tailwind · WebGL</p>
      </Container>
    </footer>
  );
}
