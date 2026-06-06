import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const OUTPUT_PATH = path.join(PUBLIC_DIR, "sitemap.xml");

const SITE_URL = (process.env.SITE_URL || "https://www.boostmysites.com").replace(/\/+$/, "");
const TODAY = new Date().toISOString().slice(0, 10);

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://upxsbhsamorhvnfebvor.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVweHNiaHNhbW9yaHZuZmVidm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4OTIyODQsImV4cCI6MjA2NDQ2ODI4NH0.dQGmD8Zo5-PoJj5INy2xM1eUotayKMiGsf5EEkMrB1U";

const STATIC_ROUTES = [
  "/",
  "/portfolio",
  "/work",
  "/contact",
  "/about",
  "/blogs",
  "/services",
  "/web-apps",
  "/mobile-apps",
  "/ux-ui-design",
  "/saas",
  "/ai-development",
  "/game-development",
  "/ar-vr-development",
  "/blockchain-development",
  "/iot-development",
  "/data-analytics",
  "/cloud-computing",
  "/chatbot-development",
  "/ai-automation",
  "/reviews",
  "/thank-you",
  "/privacy-policy",
  "/terms-and-conditions",
  "/index.php/aie-termsconditions",
  "/partnership",
  "/placement-programs",
  "/ai-freelancing",
  "/ai-freelancing/thank-you",
  "/ai-calling",
  "/app-ideas-lab",
  "/app-ideas",
  "/signup",
  "/build-your-tech-company",
  "/startup-launch",
  "/ai-stock-prediction",
  "/fintech-founder",
  "/fintech-landing",
  "/founder-partnership",
  "/healthcare-landing",
  "/rsb-fintech-founder",
  "/dsn-fintech-founder",
  "/kvy-fintech-founder",
  "/mhn-fintech-founder",
  "/mgh-fintech-founder",
  "/new-homepage-preview",
  "/fintech-development-company",
  "/trading-app-development",
  "/payin-payout-software-development",
  "/for-llm",
  "/for-llm.txt",
  "/llms.txt",
];

const DYNAMIC_PREFIXES = ["/blog/", "/case-study/", "/work/"];

function toSlug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeRoute(route) {
  if (!route) return null;
  const cleaned = `/${String(route).replace(/^\/+/, "")}`.replace(/\/+$/, "");
  return cleaned === "" ? "/" : cleaned;
}

async function readStaticSlugRoutes() {
  const files = [
    { file: "src/data/blogs.ts", prefix: "/blog/" },
    { file: "src/data/projects.ts", prefix: "/case-study/" },
    { file: "src/data/workMock.ts", prefix: "/work/" },
  ];

  const routes = [];
  const slugRegex = /slug\s*:\s*['"`]([^'"`]+)['"`]/g;

  for (const entry of files) {
    const fullPath = path.join(ROOT_DIR, entry.file);
    const content = await fs.readFile(fullPath, "utf8");
    const matches = content.matchAll(slugRegex);
    for (const match of matches) {
      const slug = (match[1] || "").trim();
      if (!slug) continue;
      routes.push(`${entry.prefix}${slug}`);
    }
  }

  return routes;
}

async function readSupabaseSlugRoutes() {
  const routes = [];
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  };

  try {
    const blogResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/blogs?select=id,slug`,
      { headers },
    );
    if (blogResponse.ok) {
      const blogs = await blogResponse.json();
      for (const blog of blogs || []) {
        const slug = blog.slug || blog.id;
        if (slug) routes.push(`/blog/${slug}`);
      }
    } else {
      console.warn("Sitemap: could not fetch blog slugs from Supabase REST.");
    }
  } catch (error) {
    console.warn("Sitemap: could not fetch blog slugs from Supabase REST.", error);
  }

  try {
    const portfolioResponse = await fetch(
      `${SUPABASE_URL}/rest/v1/portfolios?select=id,slug,title`,
      { headers },
    );
    if (portfolioResponse.ok) {
      const portfolios = await portfolioResponse.json();
      for (const project of portfolios || []) {
        const slug = project.slug || toSlug(project.title) || project.id;
        if (!slug) continue;
        routes.push(`/case-study/${slug}`);
        routes.push(`/work/${slug}`);
      }
    } else {
      console.warn("Sitemap: could not fetch portfolio slugs from Supabase REST.");
    }
  } catch (error) {
    console.warn("Sitemap: could not fetch portfolio slugs from Supabase REST.", error);
  }

  return routes;
}

function inferPriority(route) {
  if (route === "/") return "1.0";
  if (route === "/portfolio" || route === "/work" || route === "/services") return "0.9";
  if (
    route === "/fintech-development-company" ||
    route === "/trading-app-development" ||
    route === "/payin-payout-software-development" ||
    route === "/for-llm" ||
    route === "/for-llm.txt" ||
    route === "/llms.txt"
  ) {
    return "0.9";
  }
  if (route.startsWith("/blog/") || route.startsWith("/case-study/") || route.startsWith("/work/")) {
    return "0.8";
  }
  return "0.7";
}

function inferChangefreq(route) {
  if (route === "/" || route === "/blogs") return "daily";
  if (route.startsWith("/blog/") || route.startsWith("/case-study/") || route.startsWith("/work/")) {
    return "weekly";
  }
  return "monthly";
}

function toUrlTag(route) {
  return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${inferChangefreq(route)}</changefreq>
    <priority>${inferPriority(route)}</priority>
  </url>`;
}

function keepOnlyConcreteRoutes(routes) {
  return routes.filter((route) => {
    if (!route) return false;
    if (route.includes(":")) return false;
    if (route === "*" || route.startsWith("/admin")) return false;
    return true;
  });
}

async function generateSitemap() {
  const [localDynamic, supabaseDynamic] = await Promise.all([
    readStaticSlugRoutes(),
    readSupabaseSlugRoutes(),
  ]);

  const allRoutes = [
    ...STATIC_ROUTES,
    ...localDynamic,
    ...supabaseDynamic,
  ]
    .map(normalizeRoute)
    .filter(Boolean);

  const concreteRoutes = keepOnlyConcreteRoutes(allRoutes);
  const uniqueRoutes = [...new Set(concreteRoutes)].sort((a, b) => {
    if (a === "/") return -1;
    if (b === "/") return 1;
    return a.localeCompare(b);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes.map(toUrlTag).join("\n")}
</urlset>
`;

  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_PATH, xml, "utf8");
  const dynamicCount = uniqueRoutes.filter((r) =>
    DYNAMIC_PREFIXES.some((prefix) => r.startsWith(prefix)),
  ).length;
  console.log(
    `Sitemap generated with ${uniqueRoutes.length} URLs (${dynamicCount} dynamic) -> public/sitemap.xml`,
  );
}

generateSitemap().catch((error) => {
  console.error("Sitemap generation failed:", error);
  process.exitCode = 1;
});
