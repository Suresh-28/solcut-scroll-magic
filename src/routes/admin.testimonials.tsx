import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useTestimonials, useClientLogos } from "@/lib/contentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { Testimonial } from "@/content/testimonials";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — Solcut Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminTestimonials,
});

function AdminTestimonials() {
  const [items, setItems, resetItems] = useTestimonials();
  const [logos, setLogos, resetLogos] = useClientLogos();
  const [draft, setDraft] = useState<Testimonial[]>(items);
  const [logoDraft, setLogoDraft] = useState<string>(logos.join("\n"));

  useEffect(() => setDraft(items), [items]);
  useEffect(() => setLogoDraft(logos.join("\n")), [logos]);

  const update = (i: number, field: keyof Testimonial, value: string) => {
    setDraft(draft.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  };
  const add = () => setDraft([...draft, { quote: "", author: "", role: "" }]);
  const remove = (i: number) => setDraft(draft.filter((_, idx) => idx !== i));

  const save = () => {
    setItems(draft);
    setLogos(logoDraft.split("\n").map((l) => l.trim()).filter(Boolean));
    toast.success("Testimonials saved");
  };

  return (
    <AdminLayout title="Testimonials">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={save} className="rounded-md bg-ink px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Save changes</button>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm hover:bg-paper">
          <Plus className="h-4 w-4" /> Add testimonial
        </button>
        <button
          onClick={() => { resetItems(); resetLogos(); toast.success("Reset to defaults"); }}
          className="ml-auto inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-ink-soft hover:bg-paper"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="space-y-4">
        {draft.map((t, i) => (
          <div key={i} className="rounded-lg border border-line bg-paper p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">#{i + 1}</p>
              <button onClick={() => remove(i)} className="rounded p-2 text-ink-mute hover:bg-background hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Author</Label>
                <Input value={t.author} onChange={(e) => update(i, "author", e.target.value)} className="mt-2" />
              </div>
              <div>
                <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Role</Label>
                <Input value={t.role} onChange={(e) => update(i, "role", e.target.value)} className="mt-2" />
              </div>
            </div>
            <div className="mt-4">
              <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Quote</Label>
              <Textarea value={t.quote} onChange={(e) => update(i, "quote", e.target.value)} rows={3} className="mt-2" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-line bg-paper p-5">
        <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">Client logos (one per line)</Label>
        <Textarea value={logoDraft} onChange={(e) => setLogoDraft(e.target.value)} rows={6} className="mt-2 font-mono text-sm" />
      </div>
    </AdminLayout>
  );
}
