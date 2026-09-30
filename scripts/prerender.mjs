/**
 * Pre-render the public pages into real HTML after `vite build`.
 *
 * The site is a single-page app: every URL used to be served the same near-empty index.html, so
 * search engines' first pass (and link previews, and AI crawlers) saw one title, one description
 * and no content on all of them, and phones waited for the whole bundle before anything painted.
 * Here each page in the sitemap is opened in headless Chrome, left to render, and its finished
 * HTML — content, title, description, canonical, structured data — is written to
 * dist/<path>/index.html. Vercel serves that file first; the app then takes over in the
 * background (src/main.tsx).
 *
 * dist/app-shell.html (the untouched index.html, written by the Vite plugin in vite.config.ts) is
 * what every other route falls back to, so a page that is not pre-rendered behaves exactly as
 * before. If Chrome cannot start (an unusual build machine), the build still succeeds — the site
 * is served as it was — and the log says so.
 */
import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "..", "dist");
const SITE = (process.env.SITE_URL || "https://www.boostmysites.com").replace(/\/+$/, "");
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);
const PAGE_TIMEOUT = 60_000;

/** Never baked into HTML: pages that need a signed-in person, forms mid-flow, or are private. */
const SKIP = /^\/(dashboard|admin|pay|acquisition\/pay|questionnaire|unsubscribe|signup|thank-you|ai-freelancing\/thank-you|new-homepage-preview|acquisition-preview|voice-demo|lp)(\/|$)|\.(txt|xml|json)$/i;
/** Third parties never contacted while pre-rendering: analytics must not count a build as a visit. */
const BLOCK = /googletagmanager|google-analytics|googleadservices|doubleclick|facebook\.(net|com)|connect\.facebook|clarity\.ms|ads-twitter|analytics\.twitter|hotjar|linkedin\.com\/px|snap\.licdn|elevenlabs|youtube\.com\/embed|player\.vimeo/i;

const log = (...a) => console.log("[prerender]", ...a);

async function routes() {
  let xml = "";
  try { xml = await fs.readFile(path.join(DIST, "sitemap.xml"), "utf8"); } catch { /* none */ }
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
  const paths = new Set(["/"]);
  for (const l of locs) {
    try {
      const u = new URL(l);
      const p = decodeURIComponent(u.pathname).replace(/\/+$/, "") || "/";
      // A page that is already a static file (public/for-llm/…) is never replaced.
      if (!SKIP.test(p) && !existsSync(path.join(DIST, p, "index.html"))) paths.add(p);
    } catch { /* not a URL */ }
  }
  return [...paths].slice(0, 400);
}

/** A static server for dist with the same rule Vercel follows: a real file first, the app shell otherwise. */
function serve(port) {
  const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2", ".mp4": "video/mp4", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml" };
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://x");
    let file = path.join(DIST, decodeURIComponent(url.pathname));
    try {
      const st = await fs.stat(file);
      if (st.isDirectory()) throw new Error("dir");
    } catch {
      // During pre-rendering every page starts from the shell, never from another page's output.
      file = path.join(DIST, "app-shell.html");
    }
    try {
      const body = await fs.readFile(file);
      res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

async function launch() {
  const puppeteer = (await import("puppeteer-core")).default;
  const local = process.env.CHROME_PATH || [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser",
  ].find((p) => existsSync(p));
  if (process.platform === "linux" && !process.env.CHROME_PATH) {
    // Build machines (Vercel) have no Chrome: a self-contained Chromium for Linux.
    const chromium = (await import("@sparticuz/chromium")).default;
    return puppeteer.launch({ args: chromium.args, executablePath: await chromium.executablePath(), headless: true, defaultViewport: { width: 1366, height: 900 } });
  }
  return puppeteer.launch({ executablePath: local, headless: true, args: ["--no-sandbox"], defaultViewport: { width: 1366, height: 900 } });
}

/** The page's HTML as the app left it, tidied for serving. */
async function snapshot(page, route) {
  return page.evaluate((route, SITE) => {
    // One description / robots: the page's own (Helmet, data-rh) wins over the shell's default.
    for (const name of ["description", "robots"]) {
      const own = document.head.querySelector(`meta[name="${name}"][data-rh]`);
      if (own) document.head.querySelectorAll(`meta[name="${name}"]:not([data-rh])`).forEach((m) => m.remove());
    }
    // Open Graph follows the page, so link previews show the right title and text.
    const setMeta = (prop, content) => {
      if (!content) return;
      let m = document.head.querySelector(`meta[property="${prop}"]`);
      if (!m) { m = document.createElement("meta"); m.setAttribute("property", prop); document.head.appendChild(m); }
      m.setAttribute("content", content);
    };
    const desc = document.head.querySelector('meta[name="description"]')?.getAttribute("content");
    setMeta("og:title", document.title);
    setMeta("og:description", desc);
    setMeta("og:url", SITE + (route === "/" ? "/" : route));
    // Anything a third party injected despite the guard never ships inside the HTML.
    document.querySelectorAll('script[src*="googletagmanager"], script[src*="clarity.ms"], script[src*="fbevents"], script[src*="ads-twitter"], iframe[src*="googletagmanager"]:not(noscript iframe)').forEach((s) => s.remove());
    const root = document.getElementById("root");
    root.setAttribute("data-prerendered", route);
    return "<!DOCTYPE html>\n" + document.documentElement.outerHTML;
  }, route, SITE);
}

async function renderOne(browser, base, route) {
  const page = await browser.newPage();
  try {
    await page.evaluateOnNewDocument(() => { window.__PRERENDER__ = true; });
    await page.setRequestInterception(true);
    page.on("request", (r) => (BLOCK.test(r.url()) ? r.abort() : r.continue()));
    // Some pages never fall network-silent (a polling widget, a looping video), so the page's own
    // signals are waited for instead: content in the root, and the head tags the page sets itself
    // (RouteMeta's description carries data-rh) — a snapshot before that has the shell's title.
    await page.goto(base + route, { waitUntil: "load", timeout: PAGE_TIMEOUT });
    await page.waitForFunction(() => {
      const root = document.getElementById("root");
      return root && root.innerText.trim().length > 200 && document.head.querySelector('meta[name="description"][data-rh]');
    }, { timeout: PAGE_TIMEOUT });
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 6000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 400));
    // A route that redirects in the app (<Navigate to="/">) is not a page of its own.
    const landed = new URL(page.url()).pathname.replace(/\/+$/, "") || "/";
    if (landed !== route) return { route, skipped: `redirects to ${landed}` };
    // The page's own links: how blog posts and case studies are found, exactly as the site links them.
    const links = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")).filter((h) => h && h.startsWith("/") && !h.startsWith("//")));
    const html = await snapshot(page, route);
    const title = await page.title();
    if (/not found/i.test(title) || /page not found/i.test(html.slice(0, 5000))) return { route, skipped: "renders the not-found page" };
    const out = route === "/" ? path.join(DIST, "index.html") : path.join(DIST, route, "index.html");
    await fs.mkdir(path.dirname(out), { recursive: true });
    await fs.writeFile(out, html);
    return { route, bytes: html.length, title, links };
  } catch (e) {
    return { route, skipped: String(e.message || e).split("\n")[0].slice(0, 120) };
  } finally { await page.close().catch(() => {}); }
}

/**
 * The sitemap, rebuilt from what actually rendered: every page that exists as real HTML now, plus
 * the static files the old sitemap listed (for-llm, llms.txt). A redirect or a not-found page can
 * no longer be listed.
 */
async function writeSitemap(rendered) {
  let xml = "";
  try { xml = await fs.readFile(path.join(DIST, "sitemap.xml"), "utf8"); } catch { /* none */ }
  const keep = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]).filter((u) => {
    try { const p = new URL(u).pathname; return /\.(txt|xml)$/.test(p) || existsSync(path.join(DIST, p.replace(/\/+$/, ""), "index.html")) && SKIP.test(p) === false && !rendered.includes(p.replace(/\/+$/, "") || "/"); } catch { return false; }
  });
  const today = new Date().toISOString().slice(0, 10);
  const urls = [...new Set([...rendered.map((r) => SITE + (r === "/" ? "/" : r)), ...keep])];
  const body = urls.map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join("\n");
  await fs.writeFile(path.join(DIST, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
  log(`sitemap.xml: ${urls.length} URLs`);
}

async function main() {
  const started = Date.now();
  try { await fs.access(path.join(DIST, "app-shell.html")); } catch {
    log("dist/app-shell.html is missing — the Vite plugin did not run; skipping so the site stays as it was.");
    return;
  }
  const list = await routes();
  let browser;
  try { browser = await launch(); } catch (e) {
    log(`Chrome could not start (${String(e.message || e).split("\n")[0]}) — pages are served as before, not pre-rendered.`);
    return;
  }
  const port = 4610 + Math.floor(Math.random() * 300);
  const server = await serve(port);
  const base = `http://127.0.0.1:${port}`;
  const results = [];
  const queue = [...list];
  const seen = new Set(list);
  const MAX = Number(process.env.PRERENDER_MAX || 300);
  let active = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    for (;;) {
      if (!queue.length) {
        if (!active) return;
        await new Promise((r) => setTimeout(r, 200));
        continue;
      }
      active++;
      const r = await renderOne(browser, base, queue.shift());
      active--;
      results.push(r);
      log(r.skipped ? `skip ${r.route}: ${r.skipped}` : `ok   ${r.route} (${Math.round(r.bytes / 1024)} KB) — ${r.title}`);
      for (const href of r.links ?? []) {
        const p = decodeURIComponent(href.split(/[?#]/)[0]).replace(/\/+$/, "") || "/";
        if (seen.size >= MAX || seen.has(p) || SKIP.test(p) || existsSync(path.join(DIST, p, "index.html")) || /\.[a-z0-9]{2,4}$/i.test(p)) continue;
        seen.add(p);
        queue.push(p);
      }
    }
  }));
  // Pages that only ran out of time under load get a second, unhurried pass one at a time.
  for (const r of results.filter((x) => x.skipped && /timeout|exceeded/i.test(x.skipped))) {
    const again = await renderOne(browser, base, r.route);
    log(again.skipped ? `skip ${r.route} (second try): ${again.skipped}` : `ok   ${r.route} (second try) — ${again.title}`);
    Object.assign(r, again, again.skipped ? {} : { skipped: undefined });
  }
  await writeSitemap(results.filter((r) => !r.skipped).map((r) => r.route));
  await browser.close().catch(() => {});
  server.close();
  const ok = results.filter((r) => !r.skipped).length;
  log(`${ok}/${results.length} pages pre-rendered in ${Math.round((Date.now() - started) / 1000)} s`);
}

main().catch((e) => { log(`failed: ${e.message} — pages are served as before`); });
