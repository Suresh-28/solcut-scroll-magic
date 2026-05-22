import { useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { caseStudies as defaultCaseStudies, type CaseStudy } from "@/content/case-studies";
import {
  testimonials as defaultTestimonials,
  clientLogos as defaultLogos,
  type Testimonial,
} from "@/content/testimonials";

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

type SectionKey = "work" | "testimonials" | "logos" | "pricing" | "about";

const DEFAULTS = {
  work: defaultCaseStudies as WorkItem[],
  testimonials: defaultTestimonials,
  logos: defaultLogos,
  pricing: defaultPricing,
  about: defaultAbout,
} as const;

async function fetchSection<T>(key: SectionKey, fallback: T): Promise<T> {
  const { data, error } = await supabase
    .from("site_content")
    .select("data")
    .eq("key", key)
    .maybeSingle();
  if (error) {
    console.error("fetchSection error", key, error);
    return fallback;
  }
  return (data?.data as T) ?? fallback;
}

async function saveSection<T>(key: SectionKey, value: T) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, data: value as never }, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

async function resetSection(key: SectionKey) {
  await supabase.from("site_content").delete().eq("key", key);
}

function useSection<T>(key: SectionKey, fallback: T): [T, (v: T) => Promise<void>, () => Promise<void>] {
  const qc = useQueryClient();
  const queryKey = ["site_content", key];
  const { data } = useQuery<T>({
    queryKey,
    queryFn: () => fetchSection<T>(key, fallback),
    initialData: fallback,
    staleTime: 30_000,
  });

  const setter = useCallback(
    async (v: T) => {
      qc.setQueryData(queryKey, v);
      try {
        await saveSection(key, v);
      } catch (e) {
        await qc.invalidateQueries({ queryKey });
        throw e;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  const reset = useCallback(
    async () => {
      await resetSection(key);
      qc.setQueryData(queryKey, fallback);
      await qc.invalidateQueries({ queryKey });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [data, setter, reset];
}

export const useWork = () => useSection<WorkItem[]>("work", DEFAULTS.work);
export const useTestimonials = () => useSection<Testimonial[]>("testimonials", DEFAULTS.testimonials);
export const useClientLogos = () => useSection<string[]>("logos", DEFAULTS.logos);
export const usePricing = () => useSection<PricingData>("pricing", DEFAULTS.pricing);
export const useAbout = () => useSection<AboutData>("about", DEFAULTS.about);

// SSR-safe synchronous fallback for loaders that need a default before fetch
export function getWorkSync(): WorkItem[] {
  return DEFAULTS.work;
}
