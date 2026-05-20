export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Solcut turned a two-month redesign into a two-week one — and the inbound finally matches the room.",
    author: "Hema Rao",
    role: "Partner, Northwind Capital",
  },
  {
    quote:
      "Our customers said the site felt like the studio. That's the highest compliment.",
    author: "Marin Idris",
    role: "Founder, Field & Foundry",
  },
  {
    quote:
      "Fast, opinionated, and the only studio I've worked with that ships on the date they quote.",
    author: "Jordan Lee",
    role: "CEO, Tertia Labs",
  },
];

export const clientLogos = [
  "Northwind", "Field & Foundry", "Tertia Labs", "Marin & Co.", "Aurelia", "Halcyon",
];
