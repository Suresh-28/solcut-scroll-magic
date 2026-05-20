import { Link } from "@tanstack/react-router";
import logo from "@/assets/solcut-logo.png";

export function Footer() {
  return (
    <footer className="border-t border-line bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Solcut" className="h-6 w-6 object-contain" />
              <span className="font-display text-lg">solcut</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-soft">
              An independent studio shipping minimal, conversion-led websites.
            </p>
          </div>
          <FooterCol title="Studio" links={[
            { to: "/work", label: "Work" },
            { to: "/about", label: "About" },
            { to: "/pricing", label: "Pricing" },
          ]} />
          <FooterCol title="Contact" links={[
            { to: "/contact", label: "Start a project" },
          ]} extra={
            <a href="mailto:connect.shyamala@gmail.com" className="text-sm text-ink-soft hover:text-ink">
              connect.shyamala@gmail.com
            </a>
          } />
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-mute">Elsewhere</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="https://www.behance.net/solcut" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Behance ↗</a></li>
              <li><a href="https://instagram.com/solcut_x" target="_blank" rel="noopener noreferrer" className="hover:text-ink">Instagram ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-mute md:flex-row md:items-center">
          <span>© 2026 Solcut Studio. All rights reserved.</span>
          <span>Booking projects for Q3 2026 · Replies within 24h</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, extra }: { title: string; links: { to: string; label: string }[]; extra?: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-mute">{title}</p>
      <ul className="space-y-2 text-sm text-ink-soft">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-ink">{l.label}</Link>
          </li>
        ))}
        {extra && <li>{extra}</li>}
      </ul>
    </div>
  );
}
