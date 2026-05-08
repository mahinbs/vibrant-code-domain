import { Link, useSearchParams } from "react-router-dom";
import type { PortfolioItem } from "../data/portfolio";
import { workCaseStudyUrl, workUrl } from "../lib/mainSiteWorkUrl";
import { ArrowRightIcon } from "./icons";
import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { SiteBackground } from "./SiteBackground";

type Props = {
  eyebrow: string;
  title: string;
  subtitle: string;
  items: PortfolioItem[];
  startCtaLabel: string;
};

export function VerticalPortfolioLanding({
  eyebrow,
  title,
  subtitle,
  items,
  startCtaLabel,
}: Props) {
  const [searchParams] = useSearchParams();
  const utm = searchParams.toString();
  const allWorkHref = utm ? `${workUrl()}?${utm}` : workUrl();
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <>
      <SiteBackground />
      <Nav />
      <main className="relative z-10 w-full max-w-[min(1500px,96vw)] mx-auto flex flex-col items-center pt-[130px] pb-[80px] px-10 max-md:px-5">
        <section className="w-full border border-white/12 rounded-[16px] bg-black/40 backdrop-blur-[8px] p-8 max-md:p-6">
          <p className="text-[11px] uppercase tracking-[0.12em] text-white/60">{eyebrow}</p>
          <h1 className="mt-2 text-[44px] font-medium -tracking-[0.03em] leading-[1.06em] text-white max-md:text-[32px]">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-[16px] text-white/70 leading-[1.5em]">{subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={allWorkHref}
              target="_top"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-white/15 bg-white/5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
            >
              Explore all work
            </a>
            <a
              href={utm ? `/?${utm}` : "/"}
              className="btn-gloss relative overflow-hidden inline-flex items-center px-4 py-2.5 rounded-[10px] bg-purple/60 border border-white/15 text-sm font-medium text-white shadow-[inset_0_0_6px_3px_rgba(255,255,255,0.18)]"
            >
              <span className="relative z-[2]">{startCtaLabel}</span>
            </a>
          </div>
        </section>

        {featured ? (
          <section className="w-full mt-8 rounded-[16px] border border-white/12 bg-black/35 backdrop-blur-[8px] overflow-hidden">
            <div className="grid grid-cols-12 max-lg:grid-cols-1">
              <div className="col-span-7 p-8 max-md:p-6">
                <p className="text-[11px] uppercase tracking-[0.1em] text-white/60">Featured case study</p>
                <h2 className="mt-3 text-[34px] font-medium -tracking-[0.02em] leading-[1.1em] text-white max-md:text-[28px]">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] text-white/70 max-w-[54ch]">{featured.outcome}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/75"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <Link
                    to={workCaseStudyUrl(featured.slug)}
                    target="_top"
                    rel="noopener"
                    className="btn-gloss relative inline-flex items-center gap-1.5 overflow-hidden rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
                  >
                    <span className="relative z-[2]">Read full case study</span>
                    <ArrowRightIcon className="relative z-[2] size-3.5" />
                  </Link>
                </div>
              </div>
              <div className="col-span-5 relative min-h-[280px] max-lg:min-h-[220px]">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: featured.gradient }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.65)_75%,rgba(0,0,0,0.9)_100%)]"
                />
                <div className="absolute left-5 top-5">
                  <span className="rounded-full border border-white/15 bg-black/55 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85 backdrop-blur-[3px]">
                    {featured.industry}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="w-full mt-8 grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {rest.map((p) => (
            <article
              key={p.id}
              className="group relative h-[360px] rounded-[14px] border border-white/12 overflow-hidden flex flex-col justify-end p-6 transition-transform hover:-translate-y-1"
            >
              <div aria-hidden className="absolute inset-0 z-0" style={{ background: p.gradient }} />
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
                <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/75 px-2 py-1 rounded-full border border-white/15 bg-black/40 backdrop-blur-[3px]">
                  {p.industry}
                </span>
              </div>

              <div className="relative z-[3] flex flex-col gap-3">
                <h2 className="text-xl font-medium text-white -tracking-[0.01em] leading-[1.2em]">{p.title}</h2>
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
                <Link
                  to={workCaseStudyUrl(p.slug)}
                  target="_top"
                  rel="noopener"
                  className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-[10px] border border-[#4b78ff]/70 bg-[linear-gradient(180deg,#2f5eff_0%,#254dcf_100%)] px-3 py-2 text-[12px] font-semibold text-white shadow-[inset_0_0_8px_2px_rgba(255,255,255,0.18)]"
                >
                  View case study
                  <ArrowRightIcon className="size-3.5" />
                </Link>
              </div>
            </article>
          ))} 
        </section>
      </main>
      <Footer />
    </>
  );
}
