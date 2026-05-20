import { IndustryLandingPage } from "../components/IndustryLandingPage";

const FOUNDER_APP_HREF = "/founder-partnership?utm_source=build-your-tech-company";

export default function BuildYourTechCompanyLanding() {
  return (
    <IndustryLandingPage
      heroBannerSrc="/images/build-your-tech-company-hero.png"
      heroBannerMobileSrc="/images/build-your-tech-company-hero-vertical.png"
      heroBannerApplyHref={FOUNDER_APP_HREF}
      heroPrimaryCta="founder"
      founderApplicationHref={FOUNDER_APP_HREF}
      heroPrimaryCtaLabel="Fill Founder application"
      founderStripEyebrow="Who you'll partner with"
      founderStripTitle="Built by a {{founder}}, for {{founders}}."
      founderStripIntro="Mahin B S started BoostMySites after watching strong ideas stall without a real execution team. If you have the vision, we become the product, design, and launch partner. You stay focused on the business."
      founderStripPullQuote="Ship fast, measure ruthlessly, and never outsource conviction. The founders who win build systems, not just features."
      leadSourcePage="build-your-tech-company"
      eyebrow="For every founder with a vision"
      heroTitle=""
      heroSubtitle="Great ideas don't fail. {{Execution}} does. We become your {{dedicated team}}, from product to launch."
      socialProofItems={[
        "500+ products shipped",
        "Trusted across 56+ cities",
        "24-hour response guarantee",
      ]}
      trustIndicators={[
        "Tech product development",
        "Brand identity & design",
        "Marketing & growth",
        "Go-to-market execution",
        "Startup India funding support",
      ]}
      trustedByHeading="Who this is for"
      trustedBySubheading="Built for operators who want a real tech asset, not another side project that never ships."
      trustedByGroups={[
        "Aspiring founders",
        "Business owners",
        "Freelancers",
        "Non-tech visionaries",
      ]}
      expertiseSectionHeading="We help {{non-tech founders}} build and scale"
      expertiseSectionSubheading="We transform non-tech leaders into {{tech operators}}. You don't need to write {{a single line of code}}."
      capabilityTitle="What we do for you"
      capabilityCards={[
        {
          title: "Idea validation & planning",
          body: "We stress-test your idea against market data and shape a build plan you can execute.",
        },
        {
          title: "App / SaaS development",
          body: "Full-stack development by senior engineering teams, from design through production.",
        },
        {
          title: "Infrastructure & maintenance",
          body: "Enterprise-grade hosting, security, updates, and observability after launch.",
        },
        {
          title: "Go-to-market strategy",
          body: "Launch plans designed to get your first customers and early revenue traction.",
        },
        {
          title: "User acquisition & scaling",
          body: "Growth systems, paid acquisition, and retention loops as you scale users.",
        },
        {
          title: "Funding & growth support",
          body: "Pitch decks, investor narrative, and scaling support when you're ready to raise.",
        },
      ]}
      buildItems={[
        {
          title: "Recurring subscriptions",
          description: "Monthly or annual SaaS fees. Predictable revenue that compounds over time.",
        },
        {
          title: "Pay-as-you-go",
          description: "Usage-based billing when your customers' activity drives your upside.",
        },
        {
          title: "Premium upgrades",
          description: "Pro tiers and feature gates that lift average revenue per user.",
        },
        {
          title: "Targeted ad revenue",
          description: "Monetize free-tier traffic with native ads and sponsorships.",
        },
        {
          title: "Investor funding",
          description: "Venture-ready architecture and narrative for seed and Series A paths.",
        },
        {
          title: "Strategic exit",
          description: "Own a digital asset that can appreciate toward a life-changing payout.",
        },
      ]}
      operatingModelTitle="How we {{partner with founders}}"
      operatingModelSubheading="{{Shared infrastructure}}, clear ownership, and execution you can track week by week."
      operatingModelPillars={[
        {
          title: "You own the product",
          body: "100% IP transfer and code ownership. This is your company, not a white-label rental.",
        },
        {
          title: "Senior execution",
          body: "Product, engineering, and launch support without a junior-heavy outsourcing pipeline.",
        },
        {
          title: "Sprint visibility",
          body: "Weekly demos and transparent backlog so you always know what's shipping next.",
        },
        {
          title: "Scale-ready foundation",
          body: "Architecture, QA, and ops discipline so v1 is built to grow, not rebuilt in six months.",
        },
      ]}
      scaleTitle="Built for {{scale}} from day one"
      scaleArchitecture={[
        { label: "Cloud-native", detail: "Infrastructure that grows with user and revenue load" },
        { label: "Security", detail: "Access control, secrets, and secure defaults from sprint one" },
        { label: "Observability", detail: "Logs, metrics, and incident visibility in production" },
        { label: "CI/CD", detail: "Release guardrails and rollback-safe deployments" },
        { label: "Data ownership", detail: "Your users, your database, your analytics stack" },
        { label: "Support", detail: "Post-launch continuity for fixes and the next feature wave" },
      ]}
      caseStudies={[
        {
          title: "SaaS revenue platform",
          category: "SaaS",
          impact: "Launched subscription billing and admin ops in under 12 weeks.",
          stack: ["React", "Node.js", "PostgreSQL"],
          businessResult: "Founder went from idea to paying users with owned infrastructure.",
          image:
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 0% 0%, rgba(72,118,255,0.48), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "Mobile-first marketplace",
          category: "Marketplace",
          impact: "Two-sided app with payments and operator dashboard shipped end-to-end.",
          stack: ["React Native", "TypeScript", "Stripe"],
          businessResult: "Non-technical founder operated launch without hiring an in-house dev team.",
          image:
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 100% 0%, rgba(96,142,255,0.34), rgba(0,0,0,0.85) 70%)",
        },
        {
          title: "AI product suite",
          category: "AI",
          impact: "Shipped MVP with model orchestration and usage-based billing.",
          stack: ["Next.js", "Python", "OpenAI"],
          businessResult: "Validated demand and recurring revenue within the first quarter post-launch.",
          image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
          gradient:
            "radial-gradient(120% 100% at 100% 100%, rgba(84,130,255,0.28), rgba(0,0,0,0.9) 70%)",
        },
      ]}
      processTitle="How {{it works}}"
      processSteps={[
        {
          title: "Share your idea",
          body: "Bring your concept, or choose from proven SaaS and app patterns we’ve shipped before.",
        },
        {
          title: "We build everything",
          body: "Design, development, infrastructure, and launch handled by one execution partner.",
        },
        {
          title: "Launch & start earning",
          body: "Your product goes live with monetization paths wired from day one.",
        },
        {
          title: "Scale with growth",
          body: "User acquisition, revenue optimization, and funding support as you grow.",
        },
      ]}
      operatorQuotes={[
        {
          quote:
            "I had zero tech background. Today, I own a SaaS product generating monthly revenue.",
          attribution: "Rahul Sharma, SaaS founder",
        },
        {
          quote: "BoostMySites handled everything: development, launch, and growth.",
          attribution: "Priya Patel, app founder",
        },
        {
          quote: "I never imagined owning an app business would be this straightforward.",
          attribution: "Vikram Singh, digital product founder",
        },
      ]}
      faqGroups={[
        {
          category: "Getting started",
          items: [
            {
              question: "Do I need a technical background?",
              answer:
                "No. We handle product, engineering, and launch. You focus on vision, customers, and growth while we ship the system.",
            },
            {
              question: "Can I start without a fully formed idea?",
              answer:
                "Yes. We help validate concepts, shape scope, and pick a build path, whether you arrive with a napkin sketch or a detailed brief.",
            },
          ],
        },
        {
          category: "Ownership & revenue",
          items: [
            {
              question: "Do I own the product?",
              answer:
                "Yes. You own the IP and codebase. BoostMySites is your execution partner, not a platform that rents you access.",
            },
            {
              question: "How do founders make money?",
              answer:
                "Most products combine subscriptions, usage billing, premium tiers, or ads. We help wire monetization into the first release.",
            },
          ],
        },
        {
          category: "Delivery",
          items: [
            {
              question: "How long until launch?",
              answer:
                "Scope drives timing: focused MVPs often ship in weeks; larger platforms take longer. You get weekly demos and clear milestones.",
            },
            {
              question: "What happens after launch?",
              answer:
                "We support fixes, scaling, and the next feature wave, so launch is the start of the partnership, not the end.",
            },
          ],
        },
      ]}
      finalTitle="Your {{tech company}} starts here."
      finalSubtitle="Don't just invest. {{Build something you own}}, and apply when you're ready to move."
    />
  );
}
