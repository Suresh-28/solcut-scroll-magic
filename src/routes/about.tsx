import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Solcut Studio" },
      { name: "description", content: "Solcut is an independent studio designing and shipping fast, minimal websites for founders and studios." },
      { property: "og:title", content: "About — Solcut Studio" },
      { property: "og:description", content: "Meet the studio behind Solcut — small team, opinionated craft, two-week sprints." },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { n: "01", t: "Ship in two weeks", d: "Fixed timelines force sharper decisions. We commit to a date and meet it." },
  { n: "02", t: "Performance is design", d: "A slow site is a bad site. 95+ Lighthouse is the floor, not the ceiling." },
  { n: "03", t: "No template tells", d: "Every layout, type pairing, and interaction is custom. You'll never see your site twice." },
  { n: "04", t: "Edit without us", d: "Headless CMS by default. Your team owns the words after we leave." },
];

function AboutPage() {
  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <section className="pt-44 pb-24 md:pt-56 md:pb-32">
        <div className="mx-auto max-w-5xl px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute">
            About
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.98]"
          >
            A small studio for<br /><em className="italic text-ink-soft">brands that mean it</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-10 max-w-2xl text-lg leading-relaxed text-ink-soft"
          >
            Solcut was founded in 2026 by a designer and an engineer who were tired of
            agency timelines and template-shaped websites. We work directly with founders
            and small teams, take the brief seriously, and ship fast.
          </motion.p>
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Principles</p>
          <h2 className="font-display text-4xl font-light leading-[1.05] md:text-5xl">
            How we work.
          </h2>
          <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
            {principles.map((p) => (
              <div key={p.n} className="bg-paper p-8 md:p-10">
                <div className="mb-6 font-display text-sm text-ink-mute">{p.n}</div>
                <h3 className="mb-3 font-display text-2xl font-light md:text-3xl">{p.t}</h3>
                <p className="text-sm text-ink-soft">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Founder</p>
              <h3 className="font-display text-2xl font-light">Shyamala</h3>
              <p className="mt-1 text-sm text-ink-soft">Design & strategy</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg leading-relaxed text-ink-soft">
                Shyamala leads design and client strategy at Solcut. Previously shipped
                product and brand work for studios and venture-backed startups across
                India, the UK, and the US. Believes the best websites read like the
                people who built them.
              </p>
              <div className="mt-6 flex gap-6 text-sm">
                <a href="https://www.behance.net/solcut" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Behance ↗</a>
                <a href="https://instagram.com/solcut_x" target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">Instagram ↗</a>
                <a href="mailto:connect.shyamala@gmail.com" className="underline-offset-4 hover:underline">Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials heading="Words from the people we've shipped for." />

      <section className="border-t border-line bg-ink py-24 text-primary-foreground md:py-32">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-8 px-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-4xl font-light leading-[1.05] md:text-5xl">
            See what we've shipped.
          </h2>
          <div className="flex gap-4">
            <Link to="/work" className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm text-ink transition hover:gap-5">
              View work →
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-3 rounded-full border border-white/40 px-7 py-4 text-sm transition hover:bg-white/10">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
