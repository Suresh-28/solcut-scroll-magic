import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Solcut Studio" },
      { name: "description", content: "Fixed-price website sprints from Solcut Studio. Landing, brand site, and custom build packages." },
      { property: "og:title", content: "Pricing — Solcut Studio" },
      { property: "og:description", content: "Transparent fixed-price packages for landing pages, brand sites, and custom builds." },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        provider: { "@type": "Organization", name: "Solcut Studio" },
        name: "Website design and development",
        areaServed: "Worldwide",
      }),
    }],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Landing",
    price: "from $2,400",
    timeline: "1 week",
    ideal: "Founders launching a single high-stakes page.",
    features: ["One-page landing", "Custom design system", "Copy polish", "Lighthouse 95+", "Form + analytics"],
    highlighted: false,
  },
  {
    name: "Brand site",
    price: "from $6,800",
    timeline: "2 weeks",
    ideal: "Studios & teams shipping a full marketing site.",
    features: ["Up to 6 pages", "Headless CMS", "Custom animation", "SEO baseline", "Two rounds of revisions", "30-day post-launch support"],
    highlighted: true,
  },
  {
    name: "Custom build",
    price: "let's talk",
    timeline: "4–8 weeks",
    ideal: "E-commerce, dashboards, or multi-locale platforms.",
    features: ["Discovery workshop", "Headless commerce / CMS", "Bespoke integrations", "Performance budget", "Ongoing retainer optional"],
    highlighted: false,
  },
];

const faqs = [
  { q: "How do payments work?", a: "50% to start, 50% on launch. Custom builds are billed in milestones." },
  { q: "How many revisions are included?", a: "Two structural rounds per phase. After that we tune in public — small iterations after launch are part of the engagement." },
  { q: "Who owns the work?", a: "You do. All code, design files, and content rights transfer on final payment." },
  { q: "Can we edit the site ourselves?", a: "Yes. We default to headless CMS so your team can publish without touching code." },
  { q: "Do you offer ongoing support?", a: "Yes — monthly retainers for iteration, content, and performance work, or hourly as needed." },
  { q: "What if it doesn't ship on time?", a: "We've never missed a date. If we do, you're not charged for the overrun." },
];

function PricingPage() {
  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <section className="pt-44 pb-16 md:pt-56 md:pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute">Pricing</p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.98]">
            Honest packages,<br /><em className="italic text-ink-soft">no surprises</em>.
          </h1>
          <p className="mt-8 max-w-xl text-ink-soft">
            Fixed scope, fixed price, fixed timeline. Pick the closest fit — we'll
            tailor it on the discovery call.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-px bg-line px-0 md:grid-cols-3 md:px-6">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`flex flex-col bg-background p-8 md:p-10 ${t.highlighted ? "md:-my-6 md:bg-paper md:shadow-xl" : ""}`}
            >
              {t.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground">
                  Most picked
                </span>
              )}
              <h3 className="font-display text-3xl font-light">{t.name}</h3>
              <p className="mt-2 font-display text-2xl text-ink-soft">{t.price}</p>
              <p className="mt-1 text-sm text-ink-mute">{t.timeline} · {t.ideal}</p>
              <ul className="mt-8 space-y-3 text-sm text-ink-soft">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-3 bg-ink-mute" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-primary-foreground transition hover:gap-4"
              >
                Book a call →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-paper py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">FAQ</p>
          <h2 className="font-display text-4xl font-light leading-[1.05] md:text-5xl">
            Common questions.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-line">
                <AccordionTrigger className="text-left font-display text-lg font-light hover:no-underline md:text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-ink-soft">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
