import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useWork, useTestimonials, usePricing } from "@/lib/contentStore";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Solcut Admin" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [work] = useWork();
  const [testis] = useTestimonials();
  const [pricing] = usePricing();

  const cards = [
    { label: "Selected work", count: work.length, to: "/admin/work" as const },
    { label: "Testimonials", count: testis.length, to: "/admin/testimonials" as const },
    { label: "Pricing tiers", count: pricing.tiers.length, to: "/admin/pricing" as const },
    { label: "FAQs", count: pricing.faqs.length, to: "/admin/pricing" as const },
  ];

  return (
    <AdminLayout title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="rounded-lg border border-line bg-paper p-6 transition hover:border-ink">
            <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">{c.label}</p>
            <p className="mt-4 font-display text-4xl font-light">{c.count}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-line bg-paper p-6">
        <h2 className="font-display text-xl font-light">Welcome back.</h2>
        <p className="mt-2 text-sm text-ink-soft">
          Edits are saved locally in this browser. To sync across devices, enable Lovable Cloud.
        </p>
      </div>
    </AdminLayout>
  );
}
