-- GEO / LLM SEO upgrade for the blogs table.
-- This migration is purely additive: it does not drop, rename or change the
-- type of any existing column. Existing inserts/selects keep working.
--
-- New columns:
--   category          - optional taxonomy used by the public blog UI and JSON-LD
--   slug              - stable, indexable URL slug (generated on first save)
--   meta_description  - optional override of `excerpt` for <meta name="description">
--   is_published      - publish toggle (defaults to true so existing rows remain visible)

ALTER TABLE public.blogs
  ADD COLUMN IF NOT EXISTS category text,
  ADD COLUMN IF NOT EXISTS slug text,
  ADD COLUMN IF NOT EXISTS meta_description text,
  ADD COLUMN IF NOT EXISTS is_published boolean NOT NULL DEFAULT true;

-- Backfill stable slugs for any existing rows that do not have one yet.
-- Format mirrors generateBlogSlug() in src/lib/slugUtils.ts but is computed
-- once in SQL so the URL is FROZEN even if the title or tags later change.
UPDATE public.blogs
SET slug = trim(both '-' from regexp_replace(
  lower(coalesce(title, '') || '-' || coalesce(category, 'general') || '-' ||
        coalesce((tags)[1], '') || '-' || coalesce(extract(year from published_date)::text, '')),
  '[^a-z0-9]+', '-', 'g'
))
WHERE slug IS NULL OR length(slug) = 0;

-- Unique index on slug (partial so legacy rows with NULL never collide).
CREATE UNIQUE INDEX IF NOT EXISTS blogs_slug_unique_idx
  ON public.blogs (slug)
  WHERE slug IS NOT NULL;

-- Helpful index for the published-only public listing.
CREATE INDEX IF NOT EXISTS blogs_is_published_published_date_idx
  ON public.blogs (is_published, published_date DESC);

-- NOTE on RLS:
-- We intentionally do NOT change the existing "Public can view published blogs"
-- policy (USING (true)) defined in 20250801062649. The application layer is
-- responsible for filtering is_published=true on the public read path so that
-- this migration cannot accidentally hide previously visible rows.
