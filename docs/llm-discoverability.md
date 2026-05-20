# LLM discoverability — post-deploy checklist

After deploying, verify that crawlers receive full content without executing JavaScript.

## curl checks

```bash
# Static HTML (must show H1 + company facts in first response)
curl -sL https://www.boostmysites.com/for-llm | head -80

# Plain-text facts
curl -sL https://www.boostmysites.com/for-llm.txt | head -40

# LLM index
curl -sL https://www.boostmysites.com/llms.txt | head -20
```

Success: `/for-llm` output includes `What is BoostMySites?` and `Company identity` in raw HTML (not only `<div id="root">`).

## Search engine indexing

1. [Google Search Console](https://search.google.com/search-console) — submit `https://www.boostmysites.com/sitemap.xml`, request indexing for:
   - `/for-llm`
   - `/for-llm.txt`
   - `/llms.txt`
2. [Bing Webmaster Tools](https://www.bing.com/webmasters) — same sitemap and URL inspection requests.

Indexing can take days; AI answer quality also depends on external mentions (LinkedIn, press, directories).

## Regenerating static files

Edit `src/lib/seo/forLlmContent.json`, then run:

```bash
npm run for-llm:generate
```

Production builds run this automatically via `npm run build`.
