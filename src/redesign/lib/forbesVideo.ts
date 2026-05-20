/**
 * Forbes / interview video resolution for env-based config.
 *
 * For a true "our site is playing it" look, self-host an MP4 and set
 * VITE_FORBES_VIDEO_MP4 (HTML5 <video>, no YouTube chrome).
 *
 * YouTube embed uses the same host as MediaCoverage (`youtube.com`) with minimal chrome params.
 */

const YT_QUERY =
  "rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&controls=1";

/** Forbes interview on main site (`src/components/MediaCoverage.tsx`). Overridable via `VITE_FORBES_VIDEO`. */
const DEFAULT_FORBES_YOUTUBE_ID = "z8QmKfoBCWY";

const youtubeEmbedSrc = (id: string) =>
  `https://www.youtube.com/embed/${id}?${YT_QUERY}`;

function extractYoutubeId(input: string): string | null {
  const s = input.trim();
  if (!s) return null;
  if (/^[\w-]{11}$/.test(s)) return s;
  const u = s.startsWith("http") ? s : `https://${s}`;
  try {
    const url = new URL(u);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return id && id.length === 11 ? id : null;
    }
    if (url.hostname.includes("youtube.com") || url.hostname.includes("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && v.length === 11) return v;
      const m = url.pathname.match(/\/(embed|shorts|live)\/([^/?]+)/);
      if (m?.[2] && m[2].length >= 11) return m[2].slice(0, 11);
    }
  } catch {
    return null;
  }
  return null;
}

export type ResolvedForbesVideo =
  | { kind: "mp4"; src: string }
  | { kind: "youtube"; embedSrc: string }
  | { kind: "iframe"; src: string };

export function resolveForbesVideo(): ResolvedForbesVideo {
  const mp4 = (import.meta.env.VITE_FORBES_VIDEO_MP4 as string | undefined)?.trim();
  if (mp4) return { kind: "mp4", src: mp4 };

  const legacyEmbed = (
    import.meta.env.VITE_FORBES_VIDEO_EMBED_URL as string | undefined
  )?.trim();
  if (legacyEmbed) {
    const id = extractYoutubeId(legacyEmbed);
    if (id) {
      return {
        kind: "youtube",
        embedSrc: youtubeEmbedSrc(id),
      };
    }
    return { kind: "iframe", src: legacyEmbed };
  }

  const general = (import.meta.env.VITE_FORBES_VIDEO as string | undefined)?.trim();
  if (general) {
    const id = extractYoutubeId(general);
    if (id) {
      return {
        kind: "youtube",
        embedSrc: youtubeEmbedSrc(id),
      };
    }
    if (/^https?:\/\//i.test(general)) {
      if (/\.(mp4|webm|ogg)(\?|$)/i.test(general)) {
        return { kind: "mp4", src: general };
      }
      return { kind: "iframe", src: general };
    }
  }

  return {
    kind: "youtube",
    embedSrc: youtubeEmbedSrc(DEFAULT_FORBES_YOUTUBE_ID),
  };
}
