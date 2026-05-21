import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";
import { caseStudies } from "@/content/case-studies";
import sphere from "@/assets/sphere.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

type SectionId = "hero" | "services" | "quote" | "work" | "contact";

type SpherePose = { x: string; y: string; scale: number; rotate: number };

const SPHERE_POSITIONS_DESKTOP: Record<SectionId, SpherePose> = {
  hero:     { x: "85vw", y: "52vh", scale: 1.0,  rotate: 0 },
  services: { x: "15vw", y: "50vh", scale: 0.78, rotate: 120 },
  quote:    { x: "88vw", y: "48vh", scale: 0.88, rotate: 240 },
  work:     { x: "12vw", y: "55vh", scale: 0.7,  rotate: 360 },
  contact:  { x: "86vw", y: "45vh", scale: 0.74, rotate: 480 },
};

const SPHERE_POSITIONS_MOBILE: Record<SectionId, SpherePose> = {
  hero:     { x: "75vw", y: "14vh", scale: 0.55, rotate: 0 },
  services: { x: "25vw", y: "12vh", scale: 0.48, rotate: 120 },
  quote:    { x: "78vw", y: "14vh", scale: 0.52, rotate: 240 },
  work:     { x: "25vw", y: "12vh", scale: 0.46, rotate: 360 },
  contact:  { x: "75vw", y: "14vh", scale: 0.5,  rotate: 480 },
};

function ContinuingSphere({ active }: { active: SectionId }) {
  const isMobile = useIsMobile();
  const pos = (isMobile ? SPHERE_POSITIONS_MOBILE : SPHERE_POSITIONS_DESKTOP)[active];

  return (
    <>
      <motion.div
        aria-hidden
        animate={{ left: pos.x, top: pos.y, scale: pos.scale * 0.85 }}
        transition={{ type: "spring", stiffness: 55, damping: 22, mass: 1.1 }}
        style={{ translateX: "-50%", translateY: "175px", filter: "blur(30px)", opacity: 0.28 }}
        className="pointer-events-none fixed z-30 h-14 w-[300px] rounded-[50%] bg-black md:h-16 md:w-[380px]"
      />
      <motion.img
        src={sphere}
        alt=""
        aria-hidden
        width={400}
        height={400}
        animate={{ left: pos.x, top: pos.y, scale: pos.scale, rotate: pos.rotate }}
        transition={{
          left:   { type: "spring", stiffness: 55, damping: 22, mass: 1.1 },
          top:    { type: "spring", stiffness: 55, damping: 22, mass: 1.1 },
          scale:  { type: "spring", stiffness: 70, damping: 20 },
          rotate: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
        }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.35)) drop-shadow(0 8px 12px rgba(0,0,0,0.22))",
          willChange: "transform",
        }}
        className="pointer-events-none fixed z-40 h-[240px] w-[240px] md:h-[340px] md:w-[340px]"
      />
    </>
  );
}

function Hero() {
  return (
    <section id="hero" data-section="hero" className="relative flex min-h-screen items-center overflow-hidden pt-40 md:pt-0">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-8 text-xs uppercase tracking-[0.3em] text-ink-mute">
            Independent web studio · Est. 2026
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }} className="font-display text-[clamp(2.75rem,8vw,7.5rem)] font-light leading-[0.95] tracking-tight">
            We build websites<br /><em className="italic text-ink-soft">that win</em> contracts.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }} className="mt-10 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
            Solcut is a small team designing and shipping fast, minimal websites for
            founders and studios who treat their landing page like a sales engineer.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8 }} className="mt-12 flex items-center gap-6">
            <Link to="/contact" className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-primary-foreground transition hover:gap-5">
              Book a discovery call
              <span className="transition group-hover:translate-x-1">→</span>
            </Link>
            <Link to="/work" className="text-sm underline-offset-4 hover:underline">See work</Link>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink-mute">scroll</div>
    </section>
  );
}

function Marquee() {
  const items = ["Landing pages", "Brand sites", "E-commerce", "Web apps", "SEO", "Performance", "Animation", "CMS"];
  return (
    <section className="relative overflow-hidden border-y border-line bg-paper py-8">
      <div className="marquee flex w-max gap-16 whitespace-nowrap font-display text-3xl md:text-5xl">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className="text-ink">{t}</span>
            <span className="text-ink-mute">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { n: "01", t: "Discovery", d: "We map your customer, your offer, and the proof points that already convert in conversation." },
    { n: "02", t: "Design", d: "Minimal layouts, opinionated typography, no template tells. Every section earns its place." },
    { n: "03", t: "Build", d: "Hand-coded with modern stacks. 95+ Lighthouse, accessible by default, edited without us." },
    { n: "04", t: "Iterate", d: "We ship in two weeks then watch the data. Headlines, sections, and flows tuned in public." },
  ];
  return (
    <section id="services" data-section="services" className="relative pt-56 pb-32 md:py-48">
      <div className="ml-auto max-w-4xl px-6 md:pr-12 md:pl-0 md:w-[58%]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Process</p>
          <h2 className="font-display text-5xl font-light leading-[1] md:text-7xl">
            Four steps,<br /><em className="italic text-ink-soft">two weeks</em>.
          </h2>
          <p className="mt-8 max-w-md text-ink-soft">
            Most agencies disappear for two months. We commit to a fixed timeline and ship
            something you can put in front of a customer by Friday week two.
          </p>
        </motion.div>
        <div className="grid gap-px bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay: i * 0.08 }} className="group relative overflow-hidden bg-background p-8 transition hover:bg-paper md:p-10">
              <div className="mb-10 font-display text-sm text-ink-mute">{s.n}</div>
              <h3 className="mb-3 font-display text-2xl font-light md:text-3xl">{s.t}</h3>
              <p className="text-sm text-ink-soft">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useParallax(scrollYProgress, -120);
  return (
    <section id="quote" data-section="quote" ref={ref} className="relative overflow-hidden bg-ink pt-56 pb-40 text-primary-foreground md:py-56">
      <motion.div style={{ y: y1 }} className="max-w-3xl px-6 md:pl-[8%] md:pr-0">
        <p className="font-display text-3xl font-light leading-[1.15] md:text-5xl">
          A website is the only employee that works while you sleep —
          <em className="italic text-white/60"> ours show up rested.</em>
        </p>
        <div className="mt-12 flex items-center gap-4 text-sm">
          <div className="h-px w-12 bg-white/40" />
          <span className="uppercase tracking-[0.25em] text-white/60">Solcut studio note</span>
        </div>
      </motion.div>
    </section>
  );
}

function WorkPreview() {
  const featured = caseStudies.slice(0, 3);
  return (
    <section id="work" data-section="work" className="relative pt-56 pb-32 md:py-48">
      <div className="ml-auto max-w-4xl px-6 md:pr-[8%] md:pl-0 md:w-[62%]">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-16">
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Selected work</p>
          <h2 className="font-display text-5xl font-light leading-[1] md:text-7xl">
            Brands we've<br /><em className="italic text-ink-soft">put online</em>.
          </h2>
        </motion.div>
        <div className="border-t border-line">
          {featured.map((p, i) => (
            <motion.div key={p.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.05 }}>
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group flex items-baseline justify-between border-b border-line py-7 transition hover:bg-paper md:py-10">
                <div className="flex items-baseline gap-6 md:gap-8">
                  <span className="hidden font-display text-sm text-ink-mute md:inline">0{i + 1}</span>
                  <h3 className="font-display text-2xl font-light tracking-tight transition group-hover:translate-x-3 md:text-4xl">{p.name}</h3>
                </div>
                <div className="flex items-baseline gap-6 text-xs text-ink-soft md:text-sm">
                  <span className="hidden md:inline">{p.tag}</span>
                  <span>{p.year}</span>
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="mt-10">
          <Link to="/work" className="text-sm uppercase tracking-[0.25em] underline-offset-4 hover:underline">
            See all work →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section id="contact" data-section="contact" className="relative overflow-hidden bg-paper pt-56 pb-32 md:py-48">
      <div className="max-w-3xl px-6 pt-40 md:pt-24 md:pl-[8%] md:pr-0 md:text-left text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute">Contact</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.25rem,7vw,6rem)] font-light leading-[1]"
        >
          Let's build something<br /><em className="italic text-ink-soft">worth visiting</em>.
        </motion.h2>
        <div className="mt-12 flex flex-col items-center gap-6 md:items-start">
          <Link to="/contact" className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-base text-primary-foreground transition hover:gap-5">
            Start a project →
          </Link>
          <a href="mailto:connect.shyamala@gmail.com" className="text-sm underline underline-offset-4 hover:no-underline">
            or email connect.shyamala@gmail.com
          </a>
          <p className="text-sm text-ink-soft">Replies within 24h · Booking projects for Q3 2026</p>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-section") as SectionId;
          if (id) setActive(id);
        }
      },
      { threshold: [0.35, 0.55, 0.75] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <ContinuingSphere active={active} />
      <Hero />
      <Marquee />
      <Services />
      <ParallaxQuote />
      <WorkPreview />
      <Testimonials />
      <ContactCTA />
      <Footer />
    </main>
  );
}
