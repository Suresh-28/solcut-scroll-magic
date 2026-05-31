import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { caseStudies } from "@/content/case-studies";

const BASE_URL = "https://solcut.in";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = ["/", "/work", "/about", "/pricing", "/contact"];
        const dynamicPaths = caseStudies.map((c) => `/work/${c.slug}`);
        const urls = [...staticPaths, ...dynamicPaths].map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>monthly</changefreq></url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
