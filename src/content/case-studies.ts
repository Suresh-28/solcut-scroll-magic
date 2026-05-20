export type CaseStudy = {
  slug: string;
  name: string;
  tag: string;
  year: string;
  summary: string;
  outcome: string;
  challenge: string;
  approach: string[];
  results: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-capital",
    name: "Northwind Capital",
    tag: "Financial advisory",
    year: "2025",
    summary: "A boutique advisory firm needed a site that read as carefully as their decks.",
    outcome: "+42% qualified inbound in the first quarter after launch.",
    challenge:
      "Northwind's prior site looked like a template. Prospects arrived from referrals and bounced because the brand on the page didn't match the brand in the room.",
    approach: [
      "Re-framed the homepage around a single, opinionated point of view.",
      "Stripped six service pages down to two with sharper proof points.",
      "Hand-coded for sub-second LCP and accessible from the first ship.",
    ],
    results: [
      { label: "Qualified inbound", value: "+42%" },
      { label: "LCP", value: "0.9s" },
      { label: "Time to ship", value: "2 weeks" },
    ],
    testimonial: {
      quote: "Solcut turned a two-month redesign into a two-week one — and the inbound finally matches the room.",
      author: "Hema Rao",
      role: "Partner, Northwind Capital",
    },
  },
  {
    slug: "field-and-foundry",
    name: "Field & Foundry",
    tag: "Furniture studio",
    year: "2025",
    summary: "An independent furniture studio launching a direct-to-customer line.",
    outcome: "Sold out the launch collection in 11 days.",
    challenge:
      "F&F was moving from gallery commissions to e-commerce and needed a storefront that protected the brand while it scaled.",
    approach: [
      "Editorial-led product pages with macro photography front and center.",
      "Headless CMS so the team could publish drops without us.",
      "Edge-cached checkout flow to keep TTFB under 200ms globally.",
    ],
    results: [
      { label: "Launch sold out", value: "11 days" },
      { label: "Mobile conversion", value: "3.8%" },
      { label: "Lighthouse perf", value: "98" },
    ],
    testimonial: {
      quote: "Our customers said the site felt like the studio. That's the highest compliment.",
      author: "Marin Idris",
      role: "Founder, Field & Foundry",
    },
  },
  {
    slug: "tertia-labs",
    name: "Tertia Labs",
    tag: "Developer tooling",
    year: "2024",
    summary: "A new dev-tools company launching out of stealth.",
    outcome: "1,400 waitlist signups in launch week from a single landing page.",
    challenge:
      "Tertia had eight weeks until their HN launch and no marketing site. Founder time was the bottleneck.",
    approach: [
      "Distilled the pitch into one headline and three demos.",
      "Built a docs-grade typographic system that scales to the eventual product.",
      "Shipped in 9 working days; iterated copy weekly post-launch.",
    ],
    results: [
      { label: "Waitlist (week 1)", value: "1,400" },
      { label: "HN front page", value: "#3" },
      { label: "Days to launch", value: "9" },
    ],
  },
  {
    slug: "marin-and-co",
    name: "Marin & Co.",
    tag: "Architecture",
    year: "2024",
    summary: "A residential architecture practice with a 12-year portfolio.",
    outcome: "Doubled qualified project enquiries year-over-year.",
    challenge:
      "Beautiful work, invisible website. The portfolio buried the work under heavy chrome and slow image loading.",
    approach: [
      "Built a quiet, monochrome shell that lets the photography breathe.",
      "Lazy-streamed AVIF images with a custom blurhash placeholder.",
      "Restructured projects around scope, scale, and location filters.",
    ],
    results: [
      { label: "YoY enquiries", value: "2.0×" },
      { label: "Image weight cut", value: "-71%" },
      { label: "Avg. session", value: "4m 20s" },
    ],
  },
];
