import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-lg tracking-tight">solcut</span>
        </Link>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          <Link to="/work" className="opacity-80 transition hover:opacity-100" activeProps={{ className: "opacity-100" }}>Work</Link>
          <Link to="/about" className="opacity-80 transition hover:opacity-100" activeProps={{ className: "opacity-100" }}>About</Link>
          <Link to="/pricing" className="opacity-80 transition hover:opacity-100" activeProps={{ className: "opacity-100" }}>Pricing</Link>
          <Link to="/contact" className="opacity-80 transition hover:opacity-100" activeProps={{ className: "opacity-100" }}>Contact</Link>
        </nav>
        <Link to="/contact" className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline">
          Start a project →
        </Link>
      </div>
    </header>
  );
}
