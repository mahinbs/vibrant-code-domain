import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BRAND } from "@/lib/seo/brand";
import { TEAM } from "../components/TeamSection";
import { SeoShell, absUrl } from "./SeoShell";
import { FaqSection, GLOSS, GhostButton, HubGrid, PrimaryButton, Section, SeoHero, SeoLeadForm, EYEBROW, faqJsonLd } from "./blocks";
import { PRICING, creditsLabel, inr } from "./pricing";
import { HUBS, pagePath } from "./registry";
import type { Faq } from "./types";

const H2 = "text-[26px] font-medium leading-[1.15] -tracking-[0.03em] text-white md:text-[34px]";
const BODY = "text-[15px] leading-[1.7] text-white/70 md:text-[16px]";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-white/12 p-5 md:p-6" style={{ background: GLOSS }}>
      {children}
    </div>
  );
}

/* ------------------------------- Pricing ------------------------------- */

const PRICING_FAQS: Faq[] = [
  {
    q: "Is there a monthly fee or subscription?",
    a: "No. There is no retainer and no subscription. You buy a credit pack once, and credits only move when something is done: a lead found, an invite sent, a conversation handled, a campaign built. A quiet week costs nothing.",
  },
  {
    q: "Do credits expire?",
    a: "No. Credits never expire. Every credit used appears in your credit history with the reason it moved.",
  },
  {
    q: "Is ad spend included?",
    a: "No. Your ad spend is paid directly to Meta, Google and the other platforms from your own ad accounts, under your own billing. Credits pay for what our system and agents do.",
  },
  {
    q: "Can I top up automatically?",
    a: "Yes, if you want to. Optional auto top-up buys a pack when your balance runs low, by UPI Autopay or card, with a ceiling you set. You can cancel it at any time.",
  },
  {
    q: "Where do I buy credits?",
    a: "On boostmysites.in, our product site. Businesses in India pay in rupees by Razorpay and get a GST invoice with GST shown separately; businesses outside India pay in US dollars.",
  },
  {
    q: "Do you guarantee leads?",
    a: "No one honest can. We commit to the process: campaigns staged paused until you approve, run in your own accounts, checked every 20 minutes, with every credit and every change on record.",
  },
];

export function PricingPage() {
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const offers = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "BoostMySites credits",
    brand: { "@type": "Brand", name: "BoostMySites" },
    description: PRICING.creditsNote,
    offers: [
      ...PRICING.packsINR.map((p) => ({
        "@type": "Offer",
        name: `${creditsLabel(p.credits)} credits (India)`,
        price: String(p.price),
        priceCurrency: "INR",
        url: absUrl("/pricing"),
      })),
      { "@type": "Offer", name: "2,500 credits (international)", price: "9.99", priceCurrency: "USD", url: absUrl("/pricing") },
    ],
  };
  return (
    <SeoShell
      title="Pricing: pay per result with credits | BoostMySites"
      description="No retainer, no subscription. 2,500 credits cost ₹899 + GST or $9.99, used only when something is done. Credits never expire."
      path="/pricing"
      crumbs={[{ label: "Pricing", href: "/pricing" }]}
      jsonLd={[offers, faqJsonLd(PRICING_FAQS)]}
    >
      <SeoHero
        eyebrow="Pricing"
        h1="No retainer. No subscription. Pay for what gets done."
        intro="An agency charges a monthly fee whether or not anything happened. Here you buy credits once, and they only move when a result does. A quiet week costs nothing, and credits never expire."
        actions={<PrimaryButton href={PRICING.signupUrl}>Start with 2,500 credits</PrimaryButton>}
      />
      <Section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[24px] font-medium text-white md:text-[30px]">Credit packs</h2>
          <div role="tablist" aria-label="Currency" className="inline-flex rounded-full border border-white/15 bg-black/50 p-1">
            {(["INR", "USD"] as const).map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={currency === c}
                onClick={() => setCurrency(c)}
                className={`rounded-full px-5 py-2 text-[14px] font-medium ${currency === c ? "bg-purple/70 text-white" : "text-white/60 hover:text-white"}`}
              >
                {c === "INR" ? "₹ India" : "$ International"}
              </button>
            ))}
          </div>
        </div>
        {currency === "INR" ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PRICING.packsINR.map((p) => {
                const popular = "popular" in p && p.popular;
                return (
                  <div
                    key={p.credits}
                    className={`flex flex-col rounded-[16px] border p-6 ${popular ? "border-purple/60 bg-[rgba(72,118,255,0.10)]" : "border-white/12"}`}
                    style={popular ? undefined : { background: GLOSS }}
                  >
                    {popular ? <span className="impact-highlight mb-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em]">Most popular</span> : null}
                    <p className="text-[26px] font-medium text-white">
                      {creditsLabel(p.credits)} <span className="text-[15px] font-normal text-white/55">credits</span>
                    </p>
                    <p className="mt-1 text-[20px] text-white">
                      {inr(p.price)} <span className="text-[14px] text-white/50">+ GST</span>
                    </p>
                    <p className="mt-1 text-[13px] text-white/45">₹{((p.price / p.credits) * 1000).toFixed(2)} per 1,000 credits</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-[13.5px] text-white/50">Billed in India by Razorpay. GST at 18% is added and shown separately on your invoice.</p>
          </>
        ) : (
          <div className="mt-6 max-w-[520px] rounded-[16px] border border-white/12 p-6" style={{ background: GLOSS }}>
            <p className="text-[26px] font-medium text-white">
              2,500 <span className="text-[15px] font-normal text-white/55">credits</span>
            </p>
            <p className="mt-1 text-[20px] text-white">$9.99</p>
            <p className="mt-3 text-[14px] leading-relaxed text-white/60">The starter pack for businesses outside India, billed in US dollars. Larger packs are shown when you buy on boostmysites.in.</p>
          </div>
        )}
        <div className="mt-6">
          <PrimaryButton href={PRICING.signupUrl}>Buy credits on boostmysites.in</PrimaryButton>
        </div>
      </Section>
      <Section>
        <h2 className="text-[24px] font-medium text-white md:text-[30px]">What a result costs</h2>
        <div className="mt-6 overflow-hidden rounded-[16px] border border-white/12" style={{ background: GLOSS }}>
          <table className="w-full text-left text-[15px]">
            <tbody>
              {PRICING.actionCosts.map((a) => (
                <tr key={a.action} className="border-b border-white/[0.06] last:border-0">
                  <th scope="row" className="p-4 font-normal text-white/75">{a.action}</th>
                  <td className="p-4 text-right font-medium text-white">{a.credits} credits</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[13.5px] text-white/50">
          {PRICING.starter}. {PRICING.catalogueNote} Ad spend is separate and paid to the platforms from your own ad accounts.
        </p>
      </Section>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h2 className="text-[20px] font-medium text-white">What you get</h2>
            <ul className="mt-4 space-y-2.5">
              {PRICING.included.map((i) => (
                <li key={i} className="flex gap-2 text-[14.5px] text-white/70">
                  <span className="impact-highlight shrink-0">—</span>
                  {i}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <h2 className="text-[20px] font-medium text-white">The human layer</h2>
            <ul className="mt-4 space-y-2.5">
              {PRICING.support.map((i) => (
                <li key={i} className="flex gap-2 text-[14.5px] text-white/70">
                  <span className="impact-highlight shrink-0">—</span>
                  {i}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] text-white/50">
              See our <Link to="/refund-policy" className="underline underline-offset-2">refund policy</Link> and{" "}
              <Link to="/terms-and-conditions" className="underline underline-offset-2">terms</Link>.
            </p>
          </Card>
        </div>
      </Section>
      <FaqSection faqs={PRICING_FAQS} heading="Pricing questions" />
      <SeoLeadForm path="/pricing" title="Not sure how many credits you need?" subtitle="Tell us your goal. We'll show you the campaign plan and roughly how many credits it would use before you buy anything." />
    </SeoShell>
  );
}

/* -------------------------------- About -------------------------------- */

const FORBES_VIDEO = "https://www.youtube.com/watch?v=z8QmKfoBCWY";
const TIMES_ARTICLE =
  "https://timesofindia.indiatimes.com/life-style/events/times-business-awards-north-2024-acknowledging-the-very-best-in-business/articleshow/109378158.cms";

export function AboutPage() {
  const org = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absUrl("/about"),
    mainEntity: {
      "@type": "Organization",
      name: BRAND.legalName,
      alternateName: "BoostMySites",
      foundingDate: String(BRAND.foundingYear),
      url: BRAND.siteUrl,
      address: { "@type": "PostalAddress", ...BRAND.registeredAddress },
      employee: TEAM.map((m) => ({ "@type": "Person", name: m.name, jobTitle: m.role, sameAs: m.linkedin })),
      founder: { "@type": "Person", name: "Mahin B S", sameAs: "https://in.linkedin.com/in/mahin-b-s" },
    },
  };
  return (
    <SeoShell
      title="About BoostMySites | Team, story and registration"
      description="BoostMySites was founded in 2017 in Bengaluru. Meet the team behind the AI client acquisition system, and see our company registration."
      path="/about"
      crumbs={[{ label: "About", href: "/about" }]}
      jsonLd={[org]}
    >
      <SeoHero
        eyebrow="About us"
        h1="The team behind the AI client acquisition system"
        intro="We started in 2017 in Bengaluru building software for other companies. We kept seeing the same problem: good businesses with no steady way to get clients. The acquisition system is what we built to fix that."
      />
      <Section narrow>
        <h2 className={H2}>Our story</h2>
        <div className="mt-5 space-y-4">
          <p className={BODY}>
            {BRAND.legalName} was founded by Mahin B S in 2017. For years we built web, mobile, SaaS and fintech products for startups and
            enterprises. Many of those clients had the same complaint once the product shipped: they could build, but they could not reliably find
            customers. Agencies were slow and expensive, and running six ad platforms by hand was a full-time job.
          </p>
          <p className={BODY}>
            So we built a system that does the work: it plans campaigns from a one-sentence goal, launches them inside the client's own ad accounts
            only after approval, checks them every 20 minutes, and follows up every lead on WhatsApp, LinkedIn and email. Today it is our main
            product, and boostmysites.in is where customers sign up and run it.
          </p>
          <p className={BODY}>
            Our founder has been interviewed by Forbes, featured on the cover of Entrepreneur's Startups, and recognised at the Times Business Awards
            North 2024. Links below, so you can check each one.
          </p>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          <li><GhostButton href={FORBES_VIDEO}>Forbes interview (video)</GhostButton></li>
          <li><GhostButton href={TIMES_ARTICLE}>Times Business Awards 2024</GhostButton></li>
          <li><GhostButton href="/founder">About the founder</GhostButton></li>
        </ul>
      </Section>
      <Section>
        <h2 className={H2}>Leadership</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM.map((m) => (
            <a key={m.name} href={m.linkedin} target="_blank" rel="noopener noreferrer" className="group rounded-[16px] border border-white/12 p-4" style={{ background: GLOSS }}>
              <img src={m.photo} alt={`${m.name}, ${m.role} at BoostMySites`} width={320} height={320} loading="lazy" className="aspect-square w-full rounded-[12px] object-cover" />
              <p className="mt-3 text-[16px] font-medium text-white group-hover:text-[#9dbaff]">{m.name}</p>
              <p className="text-[13.5px] text-white/55">{m.role}</p>
            </a>
          ))}
        </div>
      </Section>
      <Section narrow>
        <h2 className={H2}>Company registration</h2>
        <dl className="mt-6 grid gap-x-6 gap-y-3 rounded-[16px] border border-white/12 p-6 text-[15px] md:grid-cols-[180px_1fr]" style={{ background: GLOSS }}>
          <dt className="text-white/50">Legal name</dt>
          <dd className="text-white">{BRAND.legalName}</dd>
          <dt className="text-white/50">Founded</dt>
          <dd className="text-white">{BRAND.foundingYear}</dd>
          {BRAND.cin ? (
            <>
              <dt className="text-white/50">CIN</dt>
              <dd className="text-white">{BRAND.cin}</dd>
            </>
          ) : null}
          <dt className="text-white/50">GSTIN</dt>
          <dd className="text-white">{BRAND.gstin}</dd>
          <dt className="text-white/50">Registered office</dt>
          <dd className="text-white">{BRAND.registeredAddressLine}</dd>
          <dt className="text-white/50">Contact</dt>
          <dd className="text-white">
            {BRAND.email} · {BRAND.phone}
          </dd>
        </dl>
      </Section>
      <SeoLeadForm path="/about" />
    </SeoShell>
  );
}

/* ------------------------------- Security ------------------------------ */

const SECURITY_POINTS = [
  {
    title: "We never see your ad account passwords",
    body: "When the system needs your Meta, Google or LinkedIn account, it opens the platform's own login page and you sign in yourself. Your password is typed by you, into the platform, and is never seen or stored by us.",
  },
  {
    title: "Everything stays paused until you approve",
    body: "Campaigns are built and staged paused. Nothing spends a rupee or a dollar until you approve the plan, and you can pause everything again in one click at any time.",
  },
  {
    title: "Your accounts, your billing",
    body: "Campaigns run inside your own ad accounts and are billed by the platforms to you. If you stop working with us, the accounts, campaigns, audiences and history stay yours.",
  },
  {
    title: "Every change is logged",
    body: "The optimisation loop writes every budget shift, pause and creative rotation to an audit trail, so you can see what changed, when and why.",
  },
  {
    title: "Lead data handled under Indian law",
    body: "Leads you collect are processed to run your campaigns and follow-ups, as set out in our privacy policy under India's Digital Personal Data Protection Act. You can ask us to delete your data.",
  },
  {
    title: "Account safety watched continuously",
    body: "A dedicated Health Monitor AI watches account safety signals and acceptance rates, so outreach does not get your accounts flagged, throttled or banned.",
  },
];

export function SecurityPage() {
  return (
    <SeoShell
      title="Security and data | BoostMySites"
      description="We never see your ad account passwords, campaigns stay paused until you approve, and they run in your own accounts. How we protect your data."
      path="/security"
      crumbs={[{ label: "Security", href: "/security" }]}
    >
      <SeoHero
        eyebrow="Security"
        h1="How we keep your accounts and data safe"
        intro="You stay in control of your money, your accounts and your data. Here is exactly how the system works with them."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {SECURITY_POINTS.map((p) => (
            <Card key={p.title}>
              <h2 className="text-[18px] font-medium text-white">{p.title}</h2>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">{p.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-[14px] text-white/55">
          Read the full <Link to="/privacy-policy" className="underline underline-offset-2">privacy policy</Link>, how to{" "}
          <Link to="/user-data-deletion" className="underline underline-offset-2">delete your data</Link>, or contact our{" "}
          <Link to="/legal/contact" className="underline underline-offset-2">grievance officer</Link>.
        </p>
      </Section>
      <SeoLeadForm path="/security" title="Questions about security?" subtitle="Ask us anything about how the system uses your accounts. We'll answer before you sign up." />
    </SeoShell>
  );
}

/* ------------------------------- Partners ------------------------------ */

export function PartnersPage() {
  return (
    <SeoShell
      title="Partner programme | BoostMySites"
      description="Agencies, consultants and freelancers: refer or resell the AI client acquisition system to your clients. Tell us about your clients to discuss terms."
      path="/partners"
      crumbs={[{ label: "Partner programme", href: "/partners" }]}
    >
      <SeoHero
        eyebrow="Partner programme"
        h1="Partner with BoostMySites"
        intro="If your clients need a steady flow of leads, you can bring them the acquisition system while you keep the relationship. We work with agencies, consultants and freelancers."
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <h2 className="text-[18px] font-medium text-white">Agencies</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">Add AI-run campaigns and WhatsApp follow-up to your service list without hiring for every ad platform.</p>
          </Card>
          <Card>
            <h2 className="text-[18px] font-medium text-white">Consultants</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">Give clients a system that turns your strategy into running campaigns, approved by them, in their own ad accounts.</p>
          </Card>
          <Card>
            <h2 className="text-[18px] font-medium text-white">Freelancers</h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-white/65">Refer businesses you already work with. We handle the setup; you stay their point of contact.</p>
          </Card>
        </div>
        <p className="mt-6 max-w-[720px] text-[15px] leading-relaxed text-white/65">
          Terms depend on how many clients you bring and whether you refer or resell. Tell us about your clients below and we will set up a call to agree terms.
        </p>
      </Section>
      <SeoLeadForm path="/partners" title="Apply to partner" subtitle="Tell us who your clients are and how you'd like to work together." />
    </SeoShell>
  );
}

/* ------------------------------- Careers ------------------------------- */

export function CareersPage() {
  return (
    <SeoShell
      title="Careers at BoostMySites | Bengaluru"
      description="Join the team building the AI client acquisition system in Bengaluru: engineering, growth and sales. How to apply."
      path="/careers"
      crumbs={[{ label: "Careers", href: "/careers" }]}
    >
      <SeoHero
        eyebrow="Careers"
        h1="Work on the system that gets businesses their clients"
        intro="We are a Bengaluru team building AI that plans, launches and follows up campaigns for growing businesses. We hire people who like shipping and measuring results."
        actions={<PrimaryButton href={`mailto:${BRAND.email}?subject=${encodeURIComponent("Careers — application")}`}>Email your CV</PrimaryButton>}
      />
      <Section narrow>
        <h2 className={H2}>How to apply</h2>
        <div className="mt-5 space-y-4">
          <p className={BODY}>
            Send your CV and one thing you built or grew that you are proud of to {BRAND.email}, with the role you want in the subject line. We read
            every application and reply when there is a fit.
          </p>
          <p className={BODY}>
            We mostly hire for engineering, growth marketing and sales, working from our Bengaluru office at {BRAND.registeredAddressLine}.
          </p>
        </div>
      </Section>
    </SeoShell>
  );
}

/* -------------------------------- Proof -------------------------------- */

export function ProofHubPage() {
  const compare = HUBS.compare.pages.map((p) => ({ title: p.navLabel, summary: p.cardSummary, href: pagePath(p), meta: "Comparison" }));
  return (
    <SeoShell
      title="Case studies, reviews and comparisons | BoostMySites"
      description="Proof before you pay: client case studies, reviews, and honest comparisons with agencies, HubSpot and doing it yourself."
      path="/case-studies"
      crumbs={[{ label: "Proof", href: "/case-studies" }]}
    >
      <SeoHero
        eyebrow="Proof"
        h1="Case studies, reviews and comparisons"
        intro="Every claim on this site is one we can show. Case studies are published only with each client's written permission."
      />
      <Section>
        <h2 className="mb-5 text-[22px] font-medium text-white md:text-[26px]">Case studies</h2>
        <Card>
          <p className="text-[15px] leading-relaxed text-white/70">
            Our first client case studies — with the starting point, what we ran, spend, leads and cost per lead — are being prepared with each client's
            permission. Meanwhile, see real software builds in our <Link to="/automation-case-studies" className="underline underline-offset-2">automation case studies</Link> and{" "}
            <Link to="/portfolio" className="underline underline-offset-2">portfolio</Link>.
          </p>
        </Card>
      </Section>
      <Section>
        <h2 className="mb-5 text-[22px] font-medium text-white md:text-[26px]">Comparisons</h2>
        <HubGrid cards={compare} />
      </Section>
      <SeoLeadForm path="/case-studies" />
    </SeoShell>
  );
}

/* -------------------------------- Author ------------------------------- */

const AUTHORS: Record<string, { teamName: string; bio: string }> = {
  "kavya-shree-r": {
    teamName: "Kavya Shree.R",
    bio: "Kavya Shree.R is Chief Marketing Officer at BoostMySites and runs the blog's content calendar. She writes about getting clients with ads, WhatsApp and follow-up systems for growing businesses.",
  },
  "mahin-b-s": {
    teamName: "Mahin B S",
    bio: "Mahin B S founded BoostMySites in 2017. He writes about client acquisition, AI in marketing, and building companies in India.",
  },
};

export function authorPathFor(name: string | null | undefined): string | null {
  const hit = Object.entries(AUTHORS).find(([, a]) => a.teamName === name);
  return hit ? `/authors/${hit[0]}` : null;
}

export function AuthorPage({ slug }: { slug: string }) {
  const a = AUTHORS[slug];
  const m = a ? TEAM.find((t) => t.name === a.teamName) : null;
  if (!a || !m) return null;
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    image: absUrl(m.photo),
    sameAs: [m.linkedin],
    worksFor: { "@type": "Organization", name: BRAND.legalName, url: BRAND.siteUrl },
    description: a.bio,
  };
  return (
    <SeoShell
      title={`${m.name} — ${m.role} | BoostMySites`}
      description={a.bio.slice(0, 150)}
      path={`/authors/${slug}`}
      crumbs={[{ label: "Blog", href: "/blogs" }, { label: m.name, href: `/authors/${slug}` }]}
      jsonLd={[person]}
    >
      <Section narrow>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <img src={m.photo} alt={`${m.name}, ${m.role} at BoostMySites`} width={160} height={160} className="size-40 rounded-full object-cover" />
          <div>
            <p className={EYEBROW}>Author</p>
            <h1 className="mt-3 text-[34px] font-medium leading-tight text-white md:text-[44px]">{m.name}</h1>
            <p className="text-[15px] text-white/60">{m.role}, BoostMySites</p>
          </div>
        </div>
        <p className={`mt-6 ${BODY}`}>{a.bio}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <GhostButton href={m.linkedin}>LinkedIn</GhostButton>
          <GhostButton href="/blogs">Read the blog</GhostButton>
        </div>
      </Section>
    </SeoShell>
  );
}

export function AuthorRoute() {
  const { slug = "" } = useParams<{ slug: string }>();
  if (!AUTHORS[slug]) return <Navigate to="/blogs" replace />;
  return <AuthorPage slug={slug} />;
}
