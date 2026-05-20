import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { caseStudies } from "@/content/case-studies";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Solcut Studio" },
      { name: "description", content: "Selected case studies from Solcut Studio: financial advisory, furniture, dev tools, and architecture clients." },
      { property: "og:title", content: "Work — Solcut Studio" },
      { property: "og:description", content: "Selected websites we've shipped — measurable outcomes, two-week sprints." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <section className="pt-44 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute">Selected work</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.98]">
            Brands we've<br /><em className="italic text-ink-soft">put online</em>.
          </h1>
        </div>
      </section>

      <section className="pb-24 md:pb-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-px bg-line md:grid-cols-2">
            {caseStudies.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="bg-background"
              >
                <Link to="/work/$slug" params={{ slug: c.slug }} className="group block p-8 transition hover:bg-paper md:p-12">
                  <div className="mb-12 aspect-[4/3] w-full overflow-hidden bg-paper">
                    <div className="flex h-full w-full items-center justify-center font-display text-5xl text-ink-mute transition group-hover:scale-105 md:text-7xl">
                      {c.name.split(" ")[0]}
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-ink-mute">
                    <span>{c.tag}</span>
                    <span>{c.year}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-light tracking-tight transition group-hover:translate-x-2 md:text-4xl">
                    {c.name}
                  </h2>
                  <p className="mt-3 text-ink-soft">{c.outcome}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm transition group-hover:gap-4">
                    Read case study →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
