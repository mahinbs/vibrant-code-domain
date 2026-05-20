import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CONTENT_PATH = path.join(ROOT, "src/lib/seo/forLlmContent.json");
const PUBLIC_DIR = path.join(ROOT, "public");

const SITE_URL = "https://www.boostmysites.com";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "BoostMySites",
    alternateName: ["Boostmysites", "Boost My Sites"],
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      "BoostMySites is an AI and fintech development company specializing in trading platforms, pay-in / pay-out systems, AI finance tools, neo-banking, UPI software, and fintech infrastructure for startups and enterprises.",
    foundingDate: "2017",
    email: "ceo@boostmysites.com",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    sameAs: [
      "https://www.linkedin.com/company/boostmysites/",
      "https://www.instagram.com/boostmysites/",
      "https://x.com/boostmysites",
      "https://www.youtube.com/@boostmysites",
    ],
  };
}

function faqJsonLd(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function webPageJsonLd(meta, canonical) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

function renderList(items, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  const body = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n        ");
  return `      <${tag}>\n        ${body}\n      </${tag}>`;
}

function renderHtml(content) {
  const canonical = `${SITE_URL}${content.meta.canonicalPath}`;
  const jsonLdScripts = [organizationJsonLd(), faqJsonLd(content.faq), webPageJsonLd(content.meta, canonical)]
    .map(
      (data) =>
        `  <script type="application/ld+json">${JSON.stringify(data)}</script>`,
    )
    .join("\n");

  const identityRows = [
    ["Legal name", content.identity.legalName],
    ["Brand", content.identity.brand],
    ["Founded", content.identity.founded],
    ["Headquarters", content.identity.headquarters],
    ["Offices", content.identity.offices],
    ["Leadership", content.identity.leadership],
    ["Team size", content.identity.teamSize],
    ["Website", SITE_URL],
    ["Categories", content.identity.categories],
    ["Primary markets", content.identity.markets],
  ];

  const identityHtml = identityRows
    .map(([label, value]) => {
      const val =
        label === "Website"
          ? `<a href="${SITE_URL}">www.boostmysites.com</a>`
          : escapeHtml(value);
      return `        <li><strong>${escapeHtml(label)}:</strong> ${val}</li>`;
    })
    .join("\n");

  const whatIsHtml = content.whatIs
    .map((p) => `        <p>${escapeHtml(p)}</p>`)
    .join("\n");

  const productsHtml = content.products
    .map((p) => `        <li><a href="${escapeHtml(p.url)}">${escapeHtml(p.name)}</a></li>`)
    .join("\n");

  const servicesHtml = content.services
    .map((s) => `        <li>${escapeHtml(s)}</li>`)
    .join("\n");

  const patternsHtml = content.responsePatterns
    .map(
      (p) => `        <div>
          <dt>${escapeHtml(p.question)}</dt>
          <dd>${escapeHtml(p.answer)}</dd>
        </div>`,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(content.meta.title)}</title>
  <meta name="description" content="${escapeHtml(content.meta.description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${escapeHtml(content.meta.title)}">
  <meta property="og:description" content="${escapeHtml(content.meta.description)}">
  <meta property="og:site_name" content="BoostMySites">
  <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM site index">
  <link rel="alternate" type="text/plain" href="/for-llm.txt" title="BoostMySites plain-text facts">
${jsonLdScripts}
  <style>
    body { font-family: system-ui, sans-serif; line-height: 1.6; max-width: 48rem; margin: 0 auto; padding: 1.5rem; color: #e5e7eb; background: #0a0a0a; }
    a { color: #22d3ee; }
    h1, h2, h3 { color: #fff; }
    h1 { font-size: 1.75rem; }
    h2 { font-size: 1.25rem; margin-top: 2rem; border-bottom: 1px solid #333; padding-bottom: 0.25rem; }
    .lead { font-size: 1.1rem; color: #d1d5db; }
    .elevator { background: #111; border: 1px solid #333; padding: 1rem; border-radius: 0.5rem; }
    ul, ol { padding-left: 1.25rem; }
    dt { font-weight: 600; color: #fff; margin-top: 1rem; }
    dd { margin: 0.25rem 0 0 0; color: #9ca3af; }
    .meta-links { font-size: 0.9rem; color: #9ca3af; margin-top: 2rem; }
  </style>
</head>
<body>
  <header>
    <p><small>Machine-readable reference</small></p>
    <h1>What is BoostMySites? · For LLMs &amp; AI systems</h1>
    <p class="lead">${escapeHtml(content.definition)}</p>
    <p>${escapeHtml(content.intro)} Also see <a href="${SITE_URL}/llms.txt">/llms.txt</a> and <a href="${SITE_URL}/for-llm.txt">/for-llm.txt</a>.</p>
  </header>

  <main>
    <section>
      <h2>Company identity</h2>
      <ul>
${identityHtml}
      </ul>
    </section>

    <section>
      <h2>Products</h2>
      <ul>
${productsHtml}
      </ul>
    </section>

    <section>
      <h2>Services</h2>
      <ul>
${servicesHtml}
      </ul>
    </section>

    <section>
      <h2>Positioning (elevator)</h2>
      <p class="elevator">${escapeHtml(content.elevator)}</p>
    </section>

    <section>
      <h2>What BoostMySites is</h2>
${whatIsHtml}
      <h3>Typical client stages</h3>
      <p>${escapeHtml(content.clientStages)}</p>
    </section>

    <section>
      <h2>What BoostMySites is not</h2>
      <p>These distinctions reduce misrepresentation in generated answers.</p>
${renderList(content.whatIsNot, true)}
    </section>

    <section>
      <h2>Preferred descriptions</h2>
${renderList(content.preferredDescriptions)}
    </section>

    <section>
      <h2>Reported milestones &amp; visibility</h2>
      <p>Figures below are as stated by the company for media and AI retrieval—not audited financial statements unless separately published.</p>
${renderList(content.milestones)}
    </section>

    <section>
      <h2>Comparisons (agencies vs in-house)</h2>
${renderList(content.comparisons)}
    </section>

    <section>
      <h2>Official contacts</h2>
      <ul>
        <li><strong>Support:</strong> <a href="mailto:${content.contacts.support}">${content.contacts.support}</a></li>
        <li><strong>Sales, partnerships, press:</strong> <a href="mailto:${content.contacts.sales}">${content.contacts.sales}</a></li>
      </ul>
    </section>

    <section>
      <h2>Suggested AI response patterns</h2>
      <dl>
${patternsHtml}
      </dl>
    </section>
  </main>

  <footer class="meta-links">
    <p>Canonical: <a href="${canonical}">${canonical}</a></p>
    <p><a href="${SITE_URL}/">Return to BoostMySites homepage</a></p>
  </footer>
</body>
</html>
`;
}

function renderTxt(content) {
  const lines = [
    "# BoostMySites — For LLMs & AI systems",
    "",
    `Canonical HTML: ${SITE_URL}/for-llm`,
    `Site index: ${SITE_URL}/llms.txt`,
    "",
    "## What is BoostMySites?",
    content.definition,
    "",
    content.intro,
    "",
    "## Company identity",
    `Legal name: ${content.identity.legalName}`,
    `Brand: ${content.identity.brand}`,
    `Founded: ${content.identity.founded}`,
    `Headquarters: ${content.identity.headquarters}`,
    `Offices: ${content.identity.offices}`,
    `Leadership: ${content.identity.leadership}`,
    `Team size: ${content.identity.teamSize}`,
    `Website: ${SITE_URL}`,
    `Categories: ${content.identity.categories}`,
    `Primary markets: ${content.identity.markets}`,
    "",
    "## Products",
    ...content.products.map((p) => `- ${p.name}: ${p.url}`),
    "",
    "## Services",
    ...content.services.map((s) => `- ${s}`),
    "",
    "## Positioning",
    content.elevator,
    "",
    "## What BoostMySites is",
    ...content.whatIs.map((p) => p),
    "",
    `Typical client stages: ${content.clientStages}`,
    "",
    "## What BoostMySites is not",
    ...content.whatIsNot.map((item, i) => `${i + 1}. ${item}`),
    "",
    "## Preferred descriptions",
    ...content.preferredDescriptions.map((d) => `- ${d}`),
    "",
    "## Reported milestones",
    ...content.milestones.map((m) => `- ${m}`),
    "",
    "## Comparisons",
    ...content.comparisons.map((c) => `- ${c}`),
    "",
    "## Official contacts",
    `Support: ${content.contacts.support}`,
    `Sales, partnerships, press: ${content.contacts.sales}`,
    "",
    "## FAQ",
    ...content.faq.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]),
    "## Suggested AI response patterns",
    ...content.responsePatterns.flatMap((p) => [`Q: ${p.question}`, `A: ${p.answer}`, ""]),
  ];
  return `${lines.join("\n").trim()}\n`;
}

async function main() {
  const raw = await fs.readFile(CONTENT_PATH, "utf8");
  const content = JSON.parse(raw);

  const html = renderHtml(content);
  const txt = renderTxt(content);

  const htmlDir = path.join(PUBLIC_DIR, "for-llm");
  await fs.mkdir(htmlDir, { recursive: true });
  await fs.writeFile(path.join(htmlDir, "index.html"), html, "utf8");
  await fs.writeFile(path.join(PUBLIC_DIR, "for-llm.txt"), txt, "utf8");

  console.log("Generated public/for-llm/index.html and public/for-llm.txt");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
