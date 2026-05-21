import { useEffect, useState, useCallback } from "react";
import { caseStudies as defaultCaseStudies, type CaseStudy } from "@/content/case-studies";
import { testimonials as defaultTestimonials, clientLogos as defaultLogos, type Testimonial } from "@/content/testimonials";

export type WorkItem = CaseStudy & { link?: string; category?: string };

export type Tier = {
  name: string;
  price: string;
  timeline: string;
  ideal: string;
  features: string[];
  highlighted: boolean;
};
export type Faq = { q: string; a: string };
export type PricingData = { tiers: Tier[]; faqs: Faq[] };

export type Principle = { n: string; t: string; d: string };
export type AboutData = {
  headline: string;
  headlineEm: string;
  intro: string;
  principles: Principle[];
  founderName: string;
  founderRole: string;
  founderBio: string;
};

const defaultPricing: PricingData = {
  tiers: [
    { name: "Landing", price: "from $2,400", timeline: "1 week", ideal: "Founders launching a single high-stakes page.", features: ["One-page landing", "Custom design system", "Copy polish", "Lighthouse 95+", "Form + analytics"], highlighted: false },
    { name: "Brand site", price: "from $6,800", timeline: "2 weeks", ideal: "Studios & teams shipping a full marketing site.", features: ["Up to 6 pages", "Headless CMS", "Custom animation", "SEO baseline", "Two rounds of revisions", "30-day post-launch support"], highlighted: true },
    { name: "Custom build", price: "let's talk", timeline: "4–8 weeks", ideal: "E-commerce, dashboards, or multi-locale platforms.", features: ["Discovery workshop", "Headless commerce / CMS", "Bespoke integrations", "Performance budget", "Ongoing retainer optional"], highlighted: false },
  ],
  faqs: [
    { q: "How do payments work?", a: "50% to start, 50% on launch. Custom builds are billed in milestones." },
    { q: "How many revisions are included?", a: "Two structural rounds per phase. After that we tune in public — small iterations after launch are part of the engagement." },
    { q: "Who owns the work?", a: "You do. All code, design files, and content rights transfer on final payment." },
    { q: "Can we edit the site ourselves?", a: "Yes. We default to headless CMS so your team can publish without touching code." },
    { q: "Do you offer ongoing support?", a: "Yes — monthly retainers for iteration, content, and performance work, or hourly as needed." },
    { q: "What if it doesn't ship on time?", a: "We've never missed a date. If we do, you're not charged for the overrun." },
  ],
};

const defaultAbout: AboutData = {
  headline: "A small studio for",
  headlineEm: "brands that mean it",
  intro: "Solcut was founded in 2026 by a designer and an engineer who were tired of agency timelines and template-shaped websites. We work directly with founders and small teams, take the brief seriously, and ship fast.",
  principles: [
    { n: "01", t: "Ship in two weeks", d: "Fixed timelines force sharper decisions. We commit to a date and meet it." },
    { n: "02", t: "Performance is design", d: "A slow site is a bad site. 95+ Lighthouse is the floor, not the ceiling." },
    { n: "03", t: "No template tells", d: "Every layout, type pairing, and interaction is custom. You'll never see your site twice." },
    { n: "04", t: "Edit without us", d: "Headless CMS by default. Your team owns the words after we leave." },
  ],
  founderName: "Shyamala",
  founderRole: "Design & strategy",
  founderBio: "Shyamala leads design and client strategy at Solcut. Previously shipped product and brand work for studios and venture-backed startups across India, the UK, and the US. Believes the best websites read like the people who built them.",
};

const KEYS = {
  work: "solcut:work",
  testimonials: "solcut:testimonials",
  logos: "solcut:logos",
  pricing: "solcut:pricing",
  about: "solcut:about",
} as const;

const EVENT = "solcut:content-change";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
}

function useStore<T>(key: string, fallback: T): [T, (v: T) => void, () => void] {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => {
    setValue(read(key, fallback));
    const onChange = () => setValue(read(key, fallback));
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const setter = useCallback((v: T) => write(key, v), [key]);
  const reset = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
      window.dispatchEvent(new CustomEvent(EVENT, { detail: { key } }));
    }
  }, [key]);
  return [value, setter, reset];
}

export const useWork = () => useStore<WorkItem[]>(KEYS.work, defaultCaseStudies as WorkItem[]);
export const useTestimonials = () => useStore<Testimonial[]>(KEYS.testimonials, defaultTestimonials);
export const useClientLogos = () => useStore<string[]>(KEYS.logos, defaultLogos);
export const usePricing = () => useStore<PricingData>(KEYS.pricing, defaultPricing);
export const useAbout = () => useStore<AboutData>(KEYS.about, defaultAbout);

// Synchronous getters for loaders (SSR-safe defaults)
export function getWorkSync(): WorkItem[] {
  return read<WorkItem[]>(KEYS.work, defaultCaseStudies as WorkItem[]);
}
