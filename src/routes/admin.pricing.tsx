import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { usePricing, type Tier, type Faq } from "@/lib/contentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/pricing")({
  head: () => ({ meta: [{ title: "Pricing — Solcut Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminPricing,
});

function AdminPricing() {
  const [data, setData, reset] = usePricing();
  const [tiers, setTiers] = useState<Tier[]>(data.tiers);
  const [faqs, setFaqs] = useState<Faq[]>(data.faqs);

  useEffect(() => { setTiers(data.tiers); setFaqs(data.faqs); }, [data]);

  const updateTier = (i: number, patch: Partial<Tier>) =>
    setTiers(tiers.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  const addTier = () => setTiers([...tiers, { name: "New tier", price: "from $0", timeline: "1 week", ideal: "", features: [], highlighted: false }]);
  const removeTier = (i: number) => setTiers(tiers.filter((_, idx) => idx !== i));

  const updateFaq = (i: number, patch: Partial<Faq>) =>
    setFaqs(faqs.map((f, idx) => (idx === i ? { ...f, ...patch } : f)));
  const addFaq = () => setFaqs([...faqs, { q: "", a: "" }]);
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));

  const save = async () => {
    try {
      await setData({ tiers, faqs });
      toast.success("Pricing saved");
    } catch (e) {
      toast.error("Save failed. Check you're signed in as admin.");
    }
  };

  return (
    <AdminLayout title="Pricing">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={save} className="rounded-md bg-ink px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Save changes</button>
        <button onClick={() => { reset(); toast.success("Reset to defaults"); }} className="ml-auto inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-ink-soft hover:bg-paper">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-light">Tiers</h2>
          <button onClick={addTier} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm hover:bg-paper">
            <Plus className="h-4 w-4" /> Add tier
          </button>
        </div>
        <div className="space-y-4">
          {tiers.map((t, i) => (
            <div key={i} className="rounded-lg border border-line bg-paper p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">Tier #{i + 1}</p>
                <button onClick={() => removeTier(i)} className="rounded p-2 text-ink-mute hover:bg-background hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Name"><Input value={t.name} onChange={(e) => updateTier(i, { name: e.target.value })} /></Field>
                <Field label="Price"><Input value={t.price} onChange={(e) => updateTier(i, { price: e.target.value })} /></Field>
                <Field label="Timeline"><Input value={t.timeline} onChange={(e) => updateTier(i, { timeline: e.target.value })} /></Field>
                <Field label="Ideal for"><Input value={t.ideal} onChange={(e) => updateTier(i, { ideal: e.target.value })} /></Field>
              </div>
              <Field label="Features (one per line)">
                <Textarea
                  rows={5}
                  value={t.features.join("\n")}
                  onChange={(e) => updateTier(i, { features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                />
              </Field>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" checked={t.highlighted} onChange={(e) => updateTier(i, { highlighted: e.target.checked })} />
                Highlight as “Most picked”
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-light">FAQs</h2>
          <button onClick={addFaq} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm hover:bg-paper">
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-lg border border-line bg-paper p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">FAQ #{i + 1}</p>
                <button onClick={() => removeFaq(i)} className="rounded p-2 text-ink-mute hover:bg-background hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <Field label="Question"><Input value={f.q} onChange={(e) => updateFaq(i, { q: e.target.value })} /></Field>
              <Field label="Answer"><Textarea rows={3} value={f.a} onChange={(e) => updateFaq(i, { a: e.target.value })} /></Field>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
