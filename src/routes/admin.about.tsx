import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useAbout, type Principle } from "@/lib/contentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/about")({
  head: () => ({ meta: [{ title: "About — Solcut Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminAbout,
});

function AdminAbout() {
  const [data, setData, reset] = useAbout();
  const [draft, setDraft] = useState(data);
  useEffect(() => setDraft(data), [data]);

  const update = (patch: Partial<typeof data>) => setDraft({ ...draft, ...patch });

  const updatePrinciple = (i: number, patch: Partial<Principle>) =>
    setDraft({ ...draft, principles: draft.principles.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) });
  const addPrinciple = () =>
    setDraft({ ...draft, principles: [...draft.principles, { n: String(draft.principles.length + 1).padStart(2, "0"), t: "", d: "" }] });
  const removePrinciple = (i: number) =>
    setDraft({ ...draft, principles: draft.principles.filter((_, idx) => idx !== i) });

  const save = async () => {
    try {
      await setData(draft);
      toast.success("About saved");
    } catch (e) {
      toast.error("Save failed. Check you're signed in as admin.");
    }
  };

  return (
    <AdminLayout title="About">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={save} className="rounded-md bg-ink px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Save changes</button>
        <button onClick={() => { reset(); toast.success("Reset to defaults"); }} className="ml-auto inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-ink-soft hover:bg-paper">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="rounded-lg border border-line bg-paper p-5">
        <h2 className="mb-4 font-display text-xl font-light">Hero</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Headline (line 1)"><Input value={draft.headline} onChange={(e) => update({ headline: e.target.value })} /></Field>
          <Field label="Headline emphasis (italic)"><Input value={draft.headlineEm} onChange={(e) => update({ headlineEm: e.target.value })} /></Field>
        </div>
        <Field label="Intro paragraph"><Textarea rows={4} value={draft.intro} onChange={(e) => update({ intro: e.target.value })} /></Field>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-paper p-5">
        <h2 className="mb-4 font-display text-xl font-light">Founder</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Name"><Input value={draft.founderName} onChange={(e) => update({ founderName: e.target.value })} /></Field>
          <Field label="Role"><Input value={draft.founderRole} onChange={(e) => update({ founderRole: e.target.value })} /></Field>
        </div>
        <Field label="Bio"><Textarea rows={4} value={draft.founderBio} onChange={(e) => update({ founderBio: e.target.value })} /></Field>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-paper p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-light">Principles</h2>
          <button onClick={addPrinciple} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1.5 text-sm hover:bg-background">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <div className="space-y-4">
          {draft.principles.map((p, i) => (
            <div key={i} className="rounded-md border border-line bg-background p-4">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-ink-mute">#{i + 1}</p>
                <button onClick={() => removePrinciple(i)} className="rounded p-2 text-ink-mute hover:bg-paper hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-3 md:grid-cols-[80px_1fr]">
                <Field label="Number"><Input value={p.n} onChange={(e) => updatePrinciple(i, { n: e.target.value })} /></Field>
                <Field label="Title"><Input value={p.t} onChange={(e) => updatePrinciple(i, { t: e.target.value })} /></Field>
              </div>
              <Field label="Description"><Textarea rows={2} value={p.d} onChange={(e) => updatePrinciple(i, { d: e.target.value })} /></Field>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-3">
      <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
