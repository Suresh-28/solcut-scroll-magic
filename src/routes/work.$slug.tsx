import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getWorkSync, useWork } from "@/lib/contentStore";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const list = getWorkSync();
    const study = list.find((c) => c.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    const title = study ? `${study.name} — Solcut Studio` : "Case study — Solcut Studio";
    const desc = study?.summary ?? "Solcut case study.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="relative grain min-h-screen bg-background text-foreground">
      <Nav />
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div>
          <h1 className="font-display text-5xl font-light">Case study not found.</h1>
          <Link to="/work" className="mt-6 inline-block underline underline-offset-4">Back to work</Link>
        </div>
      </div>
    </main>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study: initial } = Route.useLoaderData();
  const [list] = useWork();
  const study = list.find((c) => c.slug === initial.slug) ?? initial;
  const next = list[(list.findIndex((c) => c.slug === study.slug) + 1) % list.length] ?? study;

  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <section className="pt-44 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-baseline gap-6 text-xs uppercase tracking-[0.25em] text-ink-mute">
            <span>{study.tag}</span>
            <span>{study.year}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[clamp(2.25rem,6vw,5rem)] font-light leading-[1]"
          >
            {study.name}
          </motion.h1>
          <p className="mt-8 max-w-2xl text-lg text-ink-soft">{study.summary}</p>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="aspect-[16/9] w-full bg-paper">
            <div className="flex h-full w-full items-center justify-center font-display text-6xl text-ink-mute md:text-8xl">
              {study.name}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl gap-16 px-6 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Challenge</p>
            <p className="font-display text-2xl font-light leading-snug md:text-3xl">{study.challenge}</p>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Approach</p>
            <ul className="space-y-4 text-ink-soft">
              {study.approach.map((a: string, i: number) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-sm text-ink-mute">0{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Results</p>
          <div className="mt-6 grid gap-px bg-line md:grid-cols-3">
            {study.results.map((r: { label: string; value: string }) => (
              <div key={r.label} className="bg-paper p-10">
                <div className="font-display text-5xl font-light md:text-6xl">{r.value}</div>
                <p className="mt-4 text-sm uppercase tracking-[0.2em] text-ink-mute">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {study.testimonial && (
        <section className="border-t border-line bg-ink py-24 text-primary-foreground md:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <blockquote className="font-display text-3xl font-light leading-[1.15] md:text-5xl">
              “{study.testimonial.quote}”
            </blockquote>
            <figcaption className="mt-10 text-sm uppercase tracking-[0.25em] text-white/60">
              {study.testimonial.author} · {study.testimonial.role}
            </figcaption>
          </div>
        </section>
      )}

      <section className="border-t border-line py-16 md:py-24">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6">
          <Link to="/work" className="text-sm underline-offset-4 hover:underline">← All work</Link>
          <Link to="/work/$slug" params={{ slug: next.slug }} className="group text-right">
            <span className="block text-xs uppercase tracking-[0.25em] text-ink-mute">Next case</span>
            <span className="mt-1 font-display text-xl transition group-hover:translate-x-1 md:text-2xl">
              {next.name} →
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
