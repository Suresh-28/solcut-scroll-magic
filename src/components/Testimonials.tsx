import { motion } from "motion/react";
import { useTestimonials, useClientLogos } from "@/lib/contentStore";

export function Testimonials({ heading = "What clients say" }: { heading?: string }) {
  const [testimonials] = useTestimonials();
  const [clientLogos] = useClientLogos();

  return (
    <section className="relative border-t border-line bg-background py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Testimonials</p>
        <h2 className="font-display text-4xl font-light leading-[1.05] md:text-6xl">
          {heading}
        </h2>

        <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={`${t.author}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-background p-8 md:p-10"
            >
              <blockquote className="font-display text-xl font-light leading-snug md:text-2xl">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-8 text-sm text-ink-soft">
                <span className="text-ink">{t.author}</span> · {t.role}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-10 gap-y-4 border-t border-line pt-10 text-sm uppercase tracking-[0.25em] text-ink-mute">
          {clientLogos.map((l) => (
            <span key={l} className="transition hover:text-ink">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
