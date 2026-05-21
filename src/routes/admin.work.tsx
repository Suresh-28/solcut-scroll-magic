import { createFileRoute } from "@tanstack/react-router";
import { AdminLayout } from "@/components/AdminLayout";
import { useWork, type WorkItem } from "@/lib/contentStore";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, RotateCcw, ChevronDown, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/work")({
  head: () => ({ meta: [{ title: "Selected Work — Solcut Admin" }, { name: "robots", content: "noindex" }] }),
  component: AdminWork,
});

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "untitled";

function AdminWork() {
  const [items, setItems, reset] = useWork();
  const [draft, setDraft] = useState<WorkItem[]>(items);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => setDraft(items), [items]);

  const update = (i: number, patch: Partial<WorkItem>) =>
    setDraft(draft.map((w, idx) => (idx === i ? { ...w, ...patch } : w)));

  const add = () => {
    const next: WorkItem = {
      slug: `new-project-${Date.now()}`,
      name: "New project",
      tag: "Category",
      category: "",
      year: String(new Date().getFullYear()),
      link: "",
      summary: "",
      outcome: "",
      challenge: "",
      approach: [],
      results: [],
    };
    setDraft([...draft, next]);
    setOpenIdx(draft.length);
  };
  const remove = (i: number) => setDraft(draft.filter((_, idx) => idx !== i));

  const save = () => {
    const cleaned = draft.map((w) => ({ ...w, slug: w.slug ? w.slug : slugify(w.name) }));
    setItems(cleaned);
    toast.success("Work saved");
  };

  return (
    <AdminLayout title="Selected Work">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button onClick={save} className="rounded-md bg-ink px-5 py-2 text-sm text-primary-foreground hover:opacity-90">Save changes</button>
        <button onClick={add} className="inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm hover:bg-paper">
          <Plus className="h-4 w-4" /> Add project
        </button>
        <button onClick={() => { reset(); toast.success("Reset to defaults"); }} className="ml-auto inline-flex items-center gap-2 rounded-md border border-line px-4 py-2 text-sm text-ink-soft hover:bg-paper">
          <RotateCcw className="h-4 w-4" /> Reset
        </button>
      </div>

      <div className="space-y-3">
        {draft.map((w, i) => {
          const open = openIdx === i;
          return (
            <div key={i} className="rounded-lg border border-line bg-paper">
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  <span className="font-display text-lg">{w.name || "Untitled"}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-ink-mute">{w.tag} · {w.year}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); remove(i); }} className="rounded p-2 text-ink-mute hover:bg-background hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </button>
              {open && (
                <div className="space-y-4 border-t border-line p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Name">
                      <Input value={w.name} onChange={(e) => update(i, { name: e.target.value })} />
                    </Field>
                    <Field label="Slug (URL)">
                      <Input value={w.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} />
                    </Field>
                    <Field label="Category / Tag">
                      <Input value={w.tag} onChange={(e) => update(i, { tag: e.target.value, category: e.target.value })} />
                    </Field>
                    <Field label="Year">
                      <Input value={w.year} onChange={(e) => update(i, { year: e.target.value })} />
                    </Field>
                    <Field label="External link (optional)">
                      <Input type="url" placeholder="https://…" value={w.link ?? ""} onChange={(e) => update(i, { link: e.target.value })} />
                    </Field>
                    <Field label="Outcome (one-liner)">
                      <Input value={w.outcome} onChange={(e) => update(i, { outcome: e.target.value })} />
                    </Field>
                  </div>
                  <Field label="Summary">
                    <Textarea rows={2} value={w.summary} onChange={(e) => update(i, { summary: e.target.value })} />
                  </Field>
                  <Field label="Challenge">
                    <Textarea rows={3} value={w.challenge} onChange={(e) => update(i, { challenge: e.target.value })} />
                  </Field>
                  <Field label="Approach (one bullet per line)">
                    <Textarea
                      rows={4}
                      value={w.approach.join("\n")}
                      onChange={(e) => update(i, { approach: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
                    />
                  </Field>
                  <Field label="Results (one per line: Label | Value)">
                    <Textarea
                      rows={3}
                      placeholder="Qualified inbound | +42%"
                      value={w.results.map((r) => `${r.label} | ${r.value}`).join("\n")}
                      onChange={(e) => update(i, {
                        results: e.target.value.split("\n").map((line) => {
                          const [label, value] = line.split("|").map((s) => s?.trim() ?? "");
                          return { label, value };
                        }).filter((r) => r.label && r.value),
                      })}
                    />
                  </Field>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AdminLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-[0.2em] text-ink-mute">{label}</Label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
