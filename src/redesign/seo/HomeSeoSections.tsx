import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JsonLd from "@/components/seo/JsonLd";
import { localBusinessJsonLd } from "@/lib/seo/brand";
import { getCombinedBlogs } from "@/services/blogDataService";
import type { BlogPost } from "@/data/blogs";
import { ArrowRightIcon } from "../components/icons";
import { EYEBROW, FaqSection, GLOSS, HubGrid, Section, faqJsonLd } from "./blocks";
import { HUBS, pagePath } from "./registry";
import { PRICING } from "./pricing";
import type { Faq } from "./types";

/**
 * Homepage blocks from the SEO site plan: links into every hub (stack, industries,
 * pricing, comparisons, blog) plus the homepage FAQ with FAQPage schema.
 */

const H2 = "mt-4 text-[28px] font-medium leading-[1.1] -tracking-[0.04em] text-white md:text-[40px]";

export const HOME_FAQS: Faq[] = [
  {
    q: "What is an AI client acquisition system?",
    a: "Software plus eight AI agents that plan your ad campaigns, launch them in your own ad accounts after you approve, check them every 20 minutes, and follow up every lead on WhatsApp, LinkedIn, email and calls, then put scored leads into your CRM.",
  },
  {
    q: "How much does it cost?",
    a: `${PRICING.teaser}. Plans load prepaid AI Growth Credits. Your ad spend is separate and paid directly to the platforms from your own ad accounts.`,
  },
  {
    q: "Will anything spend money without my approval?",
    a: "No. Every campaign is built paused. Nothing spends until you approve the plan, and you can pause everything in one click at any time.",
  },
  {
    q: "Do you need my ad account passwords?",
    a: "No. The system opens each platform's own login page and you sign in yourself. Your password is never seen or stored by us.",
  },
  {
    q: "Which platforms do you run ads on?",
    a: "Meta (Facebook and Instagram), Google, LinkedIn, YouTube, TikTok, Snapchat and ChatGPT ads, depending on where your buyers are and what is available in your market.",
  },
  {
    q: "Which businesses is it for?",
    a: "Growing businesses that sell through enquiries: real estate, clinics, education, interior designers, CA and finance firms, e-commerce, IT and SaaS, and agencies, in India and abroad.",
  },
  {
    q: "Do you guarantee leads?",
    a: "No. Results depend on your offer, market and budget. We commit to the process: a plan you approve, campaigns in your own accounts, constant optimisation and a plain-English weekly report.",
  },
  {
    q: "How is this different from hiring an agency?",
    a: "An agency assigns people who check your campaigns a few times a week. Here AI agents check them 72 times a day, follow up leads automatically, and everything runs in accounts you own.",
  },
  {
    q: "Where do I sign up?",
    a: "Sign-up and payment happen on boostmysites.in, our product site. If you want help first, ask for a free plan here and we'll show it to you before you pay anything.",
  },
];

const COMPARE_ROWS: [string, string, string, string][] = [
  ["Who runs the campaigns", "AI agents, with your approval", "An account manager", "You"],
  ["How often campaigns are checked", "Every 20 minutes", "A few times a week", "When you find time"],
  ["Lead follow-up", "Automatic on WhatsApp, LinkedIn, email and calls", "Usually your job", "Your job"],
  ["Whose ad accounts", "Yours", "Sometimes the agency's", "Yours"],
  ["Spend before you approve", "Nothing", "Varies", "Whatever you set"],
];

function SeeAll({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="impact-highlight mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium">
      {children} <ArrowRightIcon className="size-3.5" />
    </Link>
  );
}

function LatestPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  useEffect(() => {
    let live = true;
    getCombinedBlogs()
      .then((all) => {
        if (!live) return;
        const sorted = [...all]
          .filter((p) => p.isPublished !== false && p.slug)
          .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
        setPosts(sorted.slice(0, 3));
      })
      .catch(() => undefined);
    return () => {
      live = false;
    };
  }, []);
  if (posts.length === 0) return null;
  return (
    <Section>
      <p className={EYEBROW}>From the blog</p>
      <h2 className={H2}>Latest guides</h2>
      <div className="mt-8">
        <HubGrid
          cards={posts.map((p) => ({
            title: p.title,
            summary: p.excerpt,
            href: `/blog/${p.slug}`,
            meta: new Date(p.publishedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          }))}
        />
      </div>
      <SeeAll to="/blogs">Read the blog</SeeAll>
    </Section>
  );
}

export function HomeSeoSections() {
  const services = HUBS.service.pages.map((p) => ({ title: p.navLabel, summary: p.cardSummary, href: pagePath(p) }));
  const industries = HUBS.industry.pages;
  return (
    <>
      <JsonLd data={[localBusinessJsonLd(), faqJsonLd(HOME_FAQS)]} id="home-seo" />

      <Section>
        <p className={EYEBROW}>The stack</p>
        <h2 className={H2}>Six services. One system.</h2>
        <p className="mt-3 max-w-[680px] text-[15px] leading-relaxed text-white/65 md:text-[16px]">
          Ads bring people in. WhatsApp, calls, LinkedIn and email follow up. Every lead is scored and lands in your CRM.
        </p>
        <div className="mt-8">
          <HubGrid cards={services} />
        </div>
        <SeeAll to="/services">All services</SeeAll>
      </Section>

      <Section>
        <p className={EYEBROW}>Industries</p>
        <h2 className={H2}>Built for how your industry gets clients</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          {industries.map((p) => (
            <Link
              key={p.slug}
              to={pagePath(p)}
              className="rounded-[14px] border border-white/12 px-4 py-5 text-[15px] font-medium text-white transition-colors hover:border-purple/60"
              style={{ background: GLOSS }}
            >
              {p.navLabel}
            </Link>
          ))}
        </div>
        <SeeAll to="/industries">All industries</SeeAll>
      </Section>

      <Section>
        <div className="rounded-[18px] border border-purple/50 bg-[rgba(72,118,255,0.08)] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-9">
          <div>
            <p className={EYEBROW}>Pricing</p>
            <h2 className="mt-4 text-[26px] font-medium leading-[1.15] text-white md:text-[34px]">{PRICING.teaser}</h2>
            <p className="mt-3 max-w-[620px] text-[14.5px] leading-relaxed text-white/65">{PRICING.creditsNote}</p>
          </div>
          <Link
            to="/pricing"
            className="btn-gloss mt-6 inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-white/20 bg-purple/70 px-5 py-3.5 text-[15px] font-semibold text-white md:mt-0"
          >
            See pricing <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </Section>

      <Section>
        <p className={EYEBROW}>Compare</p>
        <h2 className={H2}>BoostMySites vs an agency vs doing it yourself</h2>
        <div className="mt-8 overflow-x-auto rounded-[16px] border border-white/12" style={{ background: GLOSS }}>
          <table className="w-full min-w-[640px] text-left text-[14.5px]">
            <thead>
              <tr className="border-b border-white/10 text-white">
                <th className="p-4 font-medium" scope="col"><span className="sr-only">Question</span></th>
                <th className="p-4 font-medium" scope="col">BoostMySites</th>
                <th className="p-4 font-medium" scope="col">Agency</th>
                <th className="p-4 font-medium" scope="col">DIY</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map(([q, us, agency, diy]) => (
                <tr key={q} className="border-b border-white/[0.06] last:border-0">
                  <th scope="row" className="p-4 font-normal text-white/55">{q}</th>
                  <td className="p-4 text-white">{us}</td>
                  <td className="p-4 text-white/70">{agency}</td>
                  <td className="p-4 text-white/70">{diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <SeeAll to="/compare/vs-agency">Full agency comparison</SeeAll>
          <SeeAll to="/compare/vs-diy">Full DIY comparison</SeeAll>
        </div>
      </Section>

      <FaqSection faqs={HOME_FAQS} heading="Questions businesses ask us" />

      <LatestPosts />
    </>
  );
}

export default HomeSeoSections;
