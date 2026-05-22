import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { z } from "zod";
import { toast } from "sonner";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Solcut Studio" },
      { name: "description", content: "Tell us about your project. Solcut replies within 24 hours." },
      { property: "og:title", content: "Contact — Solcut Studio" },
      { property: "og:description", content: "Start a project with Solcut Studio." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  company: z.string().trim().max(100).optional(),
  budget: z.string().min(1, "Pick a range"),
  timeline: z.string().min(1, "Pick a timeline"),
  brief: z.string().trim().min(10, "A little more detail helps").max(2000),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      budget: parsed.data.budget,
      timeline: parsed.data.timeline,
      brief: parsed.data.brief,
    });
    setSubmitting(false);
    if (error) {
      console.error(error);
      toast.error("Couldn't send brief. Please try again or email us directly.");
      return;
    }
    toast.success("Brief received — we'll reply within 24h.");
    formRef.current?.reset();
  };

  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <section className="pt-44 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute">Contact</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.98]"
          >
            Tell us about<br /><em className="italic text-ink-soft">the project</em>.
          </motion.h1>
          <p className="mt-8 max-w-xl text-ink-soft">
            Replies within 24h. Or email us directly at{" "}
            <a href="mailto:connect.shyamala@gmail.com" className="underline underline-offset-4">
              connect.shyamala@gmail.com
            </a>.
          </p>
        </div>
      </section>

      <section className="pb-32 md:pb-40">
        <div className="mx-auto max-w-3xl px-6">
          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-6">
            <Field label="Your name" error={errors.name}>
              <Input name="name" required maxLength={100} className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus-visible:ring-0" />
            </Field>
            <Field label="Email" error={errors.email}>
              <Input name="email" type="email" required maxLength={255} className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus-visible:ring-0" />
            </Field>
            <Field label="Company (optional)" error={errors.company}>
              <Input name="company" maxLength={100} className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus-visible:ring-0" />
            </Field>
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Budget" error={errors.budget}>
                <Select name="budget">
                  <SelectTrigger className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus:ring-0">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5k</SelectItem>
                    <SelectItem value="5k-10k">$5k – $10k</SelectItem>
                    <SelectItem value="10k-25k">$10k – $25k</SelectItem>
                    <SelectItem value="25k-plus">$25k+</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Timeline" error={errors.timeline}>
                <Select name="timeline">
                  <SelectTrigger className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus:ring-0">
                    <SelectValue placeholder="When do you need it?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="1-month">Within a month</SelectItem>
                    <SelectItem value="1-3-months">1–3 months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>
            <Field label="Project brief" error={errors.brief}>
              <Textarea
                name="brief"
                rows={6}
                required
                maxLength={2000}
                placeholder="What are you building, who's it for, and what does success look like?"
                className="rounded-none border-0 border-b border-line bg-transparent px-0 text-lg focus-visible:ring-0"
              />
            </Field>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-primary-foreground transition hover:gap-5 disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send brief →"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs uppercase tracking-[0.25em] text-ink-mute">{label}</Label>
      <div className="mt-2">{children}</div>
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}
