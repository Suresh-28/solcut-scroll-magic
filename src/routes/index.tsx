import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import logo from "@/assets/solcut-logo.png";
import sphere from "@/assets/sphere.png";

export const Route = createFileRoute("/")({
  component: Index,
});

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [0, distance]);
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-white">
        <a href="#top" className="flex items-center gap-2">
          <span className="font-display text-lg tracking-tight">solcut</span>
        </a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          <a href="#work" className="opacity-80 transition hover:opacity-100">Work</a>
          <a href="#process" className="opacity-80 transition hover:opacity-100">Process</a>
          <a href="#services" className="opacity-80 transition hover:opacity-100">Services</a>
          <a href="#contact" className="opacity-80 transition hover:opacity-100">Contact</a>
        </nav>
        <a href="#contact" className="text-xs uppercase tracking-[0.2em] underline-offset-4 hover:underline">
          Start a project →
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.4]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section id="top" ref={ref} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Parallax logo behind */}
      <motion.div
        style={{ y, scale, rotate, opacity }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <img src={logo} alt="" className="w-[80vmin] max-w-[820px] opacity-[0.08]" />
      </motion.div>

      <motion.div style={{ y: textY }} className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Independent web studio · Est. 2024
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,10vw,9rem)] font-light leading-[0.95] tracking-tight"
        >
          We build websites<br />
          <em className="italic text-ink-soft">that win</em> contracts.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg"
        >
          Solcut is a small team designing and shipping fast, minimal websites for founders
          and studios who treat their landing page like a sales engineer.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm text-primary-foreground transition hover:gap-5"
          >
            Book a discovery call
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
          <a href="#work" className="text-sm underline-offset-4 hover:underline">See work</a>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink-mute">
        scroll
      </div>
    </section>
  );
}

// A realistic sphere that travels and rotates across the entire scroll,
// floating in front of every section and casting a soft contact shadow.
function ContinuingSphere() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 25, mass: 0.6 });

  // Travel path across the viewport (relative to fixed left/top of the sphere's center)
  const left = useTransform(
    smooth,
    [0, 0.15, 0.32, 0.5, 0.68, 0.85, 1],
    ["50vw", "85vw", "15vw", "75vw", "20vw", "82vw", "50vw"]
  );
  const top = useTransform(
    smooth,
    [0, 0.15, 0.32, 0.5, 0.68, 0.85, 1],
    ["70vh", "40vh", "55vh", "35vh", "60vh", "45vh", "55vh"]
  );
  const scale = useTransform(
    smooth,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [1, 0.55, 0.85, 0.45, 0.7, 0.6]
  );
  const rotate = useTransform(smooth, [0, 1], [0, 540]);
  const opacity = useTransform(smooth, [0, 0.04, 0.96, 1], [0, 1, 1, 0]);

  // Soft contact shadow tracks the sphere; scales with it
  const shadowScale = useTransform(scale, (s) => s * 0.9);
  const shadowOpacity = useTransform(scale, [0.3, 1], [0.18, 0.35]);

  return (
    <>
      {/* Ground shadow */}
      <motion.div
        aria-hidden
        style={{
          left,
          top,
          opacity: shadowOpacity,
          scale: shadowScale,
          translateX: "-50%",
          translateY: "180px",
          filter: "blur(28px)",
        }}
        className="pointer-events-none fixed z-30 h-12 w-[260px] rounded-[50%] bg-black md:h-16 md:w-[360px]"
      />
      {/* The sphere itself */}
      <motion.img
        src={sphere}
        alt=""
        aria-hidden
        width={400}
        height={400}
        style={{
          left,
          top,
          rotate,
          scale,
          opacity,
          translateX: "-50%",
          translateY: "-50%",
          filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.35)) drop-shadow(0 8px 12px rgba(0,0,0,0.2))",
          willChange: "transform",
        }}
        className="pointer-events-none fixed z-40 h-[220px] w-[220px] md:h-[320px] md:w-[320px]"
      />
    </>
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
    <section id="services" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Process</p>
            <h2 className="font-display text-5xl font-light leading-[1] md:text-7xl">
              Four steps,<br /><em className="italic text-ink-soft">two weeks</em>.
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Most agencies disappear for two months. We commit to a fixed timeline and ship
            something you can put in front of a customer by Friday week two.
          </p>
        </motion.div>

        <div className="grid gap-px bg-line md:grid-cols-2">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="group relative overflow-hidden bg-background p-10 transition hover:bg-paper md:p-14"
            >
              <div className="mb-12 font-display text-sm text-ink-mute">{s.n}</div>
              <h3 className="mb-4 font-display text-3xl font-light md:text-4xl">{s.t}</h3>
              <p className="max-w-md text-ink-soft">{s.d}</p>
              <div className="absolute right-10 top-10 text-2xl opacity-0 transition group-hover:opacity-100">→</div>
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
  const y1 = useParallax(scrollYProgress, -150);
  const y2 = useParallax(scrollYProgress, 100);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink py-40 text-primary-foreground md:py-56">
      <motion.div
        style={{ y: y2 }}
        className="pointer-events-none absolute -left-20 top-10 font-display text-[20rem] leading-none text-white/[0.04]"
      >
        “
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        className="mx-auto max-w-5xl px-6"
      >
        <p className="font-display text-3xl font-light leading-[1.2] md:text-6xl">
          A website is the only employee that works while you sleep —
          <em className="italic text-white/60"> ours show up rested.</em>
        </p>
        <div className="mt-14 flex items-center gap-4 text-sm">
          <div className="h-px w-12 bg-white/40" />
          <span className="uppercase tracking-[0.25em] text-white/60">Solcut studio note</span>
        </div>
      </motion.div>
    </section>
  );
}

function Work() {
  const projects = [
    { name: "Northwind Capital", tag: "Financial advisory", year: "2025" },
    { name: "Field & Foundry", tag: "Furniture studio", year: "2025" },
    { name: "Tertia Labs", tag: "Developer tooling", year: "2024" },
    { name: "Marin & Co.", tag: "Architecture", year: "2024" },
  ];

  return (
    <section id="work" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-ink-mute">Selected work</p>
          <h2 className="font-display text-5xl font-light leading-[1] md:text-7xl">
            Brands we've<br /><em className="italic text-ink-soft">put online</em>.
          </h2>
        </motion.div>

        <div className="border-t border-line">
          {projects.map((p, i) => (
            <motion.a
              key={p.name}
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group flex items-baseline justify-between border-b border-line py-8 transition hover:bg-paper md:py-12"
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span className="hidden font-display text-sm text-ink-mute md:inline">0{i + 1}</span>
                <h3 className="font-display text-3xl font-light tracking-tight transition group-hover:translate-x-3 md:text-5xl">
                  {p.name}
                </h3>
              </div>
              <div className="flex items-baseline gap-8 text-sm text-ink-soft">
                <span className="hidden md:inline">{p.tag}</span>
                <span>{p.year}</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-paper py-32 md:py-48">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-6 text-xs uppercase tracking-[0.3em] text-ink-mute"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.5rem,8vw,7rem)] font-light leading-[1]"
        >
          Let's build something<br /><em className="italic text-ink-soft">worth visiting</em>.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <a
            href="mailto:hello@solcut.studio"
            className="font-display text-2xl underline decoration-1 underline-offset-8 transition hover:decoration-2 md:text-4xl"
          >
            hello@solcut.studio
          </a>
          <p className="text-sm text-ink-soft">
            Replies within 24h · Booking projects for Q3 2026
          </p>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-3xl gap-12 border-t border-line pt-16 text-left md:grid-cols-3">
          {[
            { h: "Scope", l: ["Landing pages", "Brand sites", "Web apps"] },
            { h: "Engagement", l: ["Fixed-price sprints", "Ongoing retainer", "Audit & consult"] },
            { h: "Stack", l: ["React + TanStack", "Headless CMS", "Edge hosting"] },
          ].map((col) => (
            <div key={col.h}>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-ink-mute">{col.h}</p>
              <ul className="space-y-2 text-ink-soft">
                {col.l.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line bg-background py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-xs text-ink-mute md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Solcut" className="h-6 w-6 object-contain" />
          <span>© {new Date().getFullYear()} Solcut Studio. All rights reserved.</span>
        </div>
        <div className="flex gap-6 uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-ink">Twitter</a>
          <a href="#" className="hover:text-ink">Read.cv</a>
          <a href="mailto:hello@solcut.studio" className="hover:text-ink">Email</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="relative grain bg-background text-foreground">
      <Nav />
      <ContinuingSphere />
      <Hero />
      <Marquee />
      <Services />
      <ParallaxQuote />
      <Work />
      <Contact />
      <Footer />
    </main>
  );
}
