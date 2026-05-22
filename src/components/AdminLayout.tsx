import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, LayoutDashboard, MessageSquareQuote, Briefcase, Tag, User } from "lucide-react";
import { useAdminAuth, logout } from "@/lib/adminAuth";

type NavItem = { to: "/admin" | "/admin/testimonials" | "/admin/work" | "/admin/pricing" | "/admin/about"; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const items: NavItem[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/work", label: "Selected Work", icon: Briefcase },
  { to: "/admin/pricing", label: "Pricing", icon: Tag },
  { to: "/admin/about", label: "About", icon: User },
];

export function AdminLayout({ children, title }: { children: React.ReactNode; title: string }) {
  const { authed, ready } = useAdminAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !authed) navigate({ to: "/admin/login" });
  }, [ready, authed, navigate]);

  useEffect(() => setOpen(false), [pathname]);

  if (!ready || !authed) {
    return <div className="flex min-h-screen items-center justify-center bg-background text-sm text-ink-mute">Checking session…</div>;
  }

  const handleLogout = async () => {
    await logout();
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-line bg-background px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-md p-2 hover:bg-paper md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link to="/admin" className="font-display text-lg tracking-tight">solcut · admin</Link>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/" className="hidden text-xs uppercase tracking-[0.2em] text-ink-soft hover:text-ink md:inline">View site ↗</Link>
          <button onClick={handleLogout} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-xs uppercase tracking-[0.2em] hover:bg-paper">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 top-[57px] z-30 w-64 border-r border-line bg-background transition-transform md:sticky md:top-[57px] md:h-[calc(100vh-57px)] md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <nav className="flex flex-col gap-1 p-4">
            {items.map((item) => {
              const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${active ? "bg-ink text-primary-foreground" : "text-ink-soft hover:bg-paper hover:text-ink"}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Mobile backdrop */}
        {open && (
          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[57px] z-20 bg-black/30 md:hidden"
            aria-label="Close menu"
          />
        )}

        {/* Main */}
        <main className="min-h-[calc(100vh-57px)] flex-1 px-4 py-6 md:px-10 md:py-10">
          <h1 className="mb-8 font-display text-3xl font-light md:text-4xl">{title}</h1>
          {children}
        </main>
      </div>
    </div>
  );
}
