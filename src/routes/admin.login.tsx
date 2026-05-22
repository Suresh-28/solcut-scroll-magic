import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { login, useAdminAuth } from "@/lib/adminAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin login — Solcut" }, { name: "robots", content: "noindex" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const { authed, ready } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && authed) navigate({ to: "/admin" });
  }, [ready, authed, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const ok = await login(username, password);
      if (ok) {
        navigate({ to: "/admin" });
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <form onSubmit={onSubmit} className="w-full max-w-sm">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-ink-mute">Admin</p>
        <h1 className="font-display text-3xl font-light">Sign in</h1>
        <p className="mt-2 text-sm text-ink-soft">Manage testimonials, work, pricing, and about.</p>

        <div className="mt-8 space-y-5">
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Username</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2" autoFocus />
          </div>
          <div>
            <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Password</Label>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-5 py-3 text-sm text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}
