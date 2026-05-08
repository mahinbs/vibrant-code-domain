import { useEffect, useMemo, useState } from "react";
import { portfolio } from "../data/portfolio";
import { supabase } from "@/integrations/supabase/client";
import { normalizeBackendPortfolio } from "../lib/backendPortfolio";
import { workCaseStudyUrl, workUrl } from "../lib/mainSiteWorkUrl";
import { ArrowRightIcon } from "./icons";

export function Portfolio() {
  const [backendPortfolio, setBackendPortfolio] = useState<typeof portfolio>([]);
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      const { data, error } = await supabase
        .from("portfolios")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || !isMounted) return;

      const normalized = normalizeBackendPortfolio(data as Record<string, unknown>[]);
      if (isMounted && normalized.length > 0) setBackendPortfolio(normalized);
    };

    fetchPortfolio();
    return () => {
      isMounted = false;
    };
  }, []);

  const cards = useMemo(() => (backendPortfolio.length > 0 ? backendPortfolio : portfolio), [backendPortfolio]);

  const tags = useMemo(() => ["All", "Fintech", "Healthcare", "SaaS", "Mobile"], []);

  const filteredCards = useMemo(() => {
    if (activeTag === "All") return cards;

    const token = activeTag.toLowerCase();
    return cards.filter((item) => {
      const haystack = `${item.title} ${item.industry} ${item.serviceId ?? ""}`.toLowerCase();
      if (token === "saas") return haystack.includes("saas");
      if (token === "mobile") return haystack.includes("mobile");
      return haystack.includes(token);
    });
  }, [activeTag, cards]);

  return (
    <section
      id="work"
      className="w-full max-w-[1920px] pt-[120px] px-10 pb-10 flex flex-col items-center gap-12 max-md:pt-20 max-md:px-5"
    >
      <div className="flex flex-col items-center gap-5 text-center max-w-[640px]">
        <div className="inline-flex items-center gap-1.5 bg-black/60 border border-white/15 rounded-full py-2 px-3.5 backdrop-blur-[5px] text-[12px] font-medium text-purple uppercase tracking-[0.08em] w-fit">
          Selected work
        </div>
        <h2 className="text-[44px] font-medium -tracking-[0.04em] leading-[1.05em] text-white max-md:text-3xl">
          Real products. Real results.
        </h2>
        <p className="text-lg text-white/60 max-md:text-base">
          A snapshot from 500+ projects across fintech, healthcare, SaaS, and
          consumer mobile.
        </p>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium tracking-[0.02em] ${
              activeTag === tag
                ? "border-white/25 bg-white/10 text-white"
                : "border-white/12 bg-black/40 text-white/70"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5 w-full max-md:grid-cols-2 max-sm:grid-cols-1">
        {filteredCards.slice(0, 3).map((p) => (
          <a
            key={p.id}
            href={workCaseStudyUrl(p.slug)}
            rel="noopener"
            className="group relative h-[360px] rounded-[14px] border border-white/12 overflow-hidden flex flex-col justify-end p-6 transition-transform hover:-translate-y-1"
          >
            <div
              aria-hidden
              className="absolute inset-0 z-0"
              style={
                p.image
                  ? {
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                  : { background: p.gradient }
              }
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.78)_70%,rgba(0,0,0,0.95)_100%)]"
            />
            <div
              aria-hidden
              className="absolute inset-0 z-[2] opacity-50 mix-blend-overlay bg-repeat bg-[length:67px_auto]"
              style={{ backgroundImage: "url(/textures/grid.svg)" }}
            />
            <div className="absolute top-5 left-5 z-[3]">
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/70 px-2 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-[3px]">
                {p.industry}
              </span>
            </div>

            <div className="relative z-[3] flex flex-col gap-3">
              <h3 className="text-xl font-medium text-white -tracking-[0.01em] leading-[1.2em]">
                {p.title}
              </h3>
              <p className="text-sm text-white/80">{p.outcome}</p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {p.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-medium px-2 py-1 rounded-md border border-white/15 text-white/85 bg-black/30 backdrop-blur-[3px]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
      {filteredCards.length === 0 ? (
        <p className="text-sm text-white/60">No projects found for this category yet.</p>
      ) : null}

      <a
        href={workUrl()}
        rel="noopener"
        className="btn-gloss relative inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
      >
        <span className="relative z-[2]">View portfolio</span>
        <ArrowRightIcon className="relative z-[2] size-4" />
      </a>
    </section>
  );
}
