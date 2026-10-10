/**
 * Content for the /command-center landing page.
 *
 * Positions/sizes are in "poster units": the original artwork is 1080px wide and
 * each card is laid out on a 336-unit-wide grid, so the page scales the poster
 * proportionally at any width.
 */

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Bot,
  Clock,
  Gauge,
  Globe,
  Mail,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  CalendarClock,
  ChartColumnBig,
  ImageIcon,
  MonitorCheck,
  Send,
  Smartphone,
  Briefcase,
  Building2,
  ClipboardList,
  Dumbbell,
  Flame,
  GraduationCap,
  Handshake,
  Inbox,
  LifeBuoy,
  Lock,
  MailCheck,
  Megaphone,
  PauseCircle,
  Receipt,
  RefreshCcw,
  Rocket,
  Search,
  ShoppingBag,
  Stethoscope,
  Store,
  Target,
  UserRound,
  Users,
  Workflow,
  Wrench,
  Zap,
  Brain,
} from "lucide-react";

const ASSET = "/command-center";

export const commandCenterHeader = {
  brandDark: "BOOST",
  brandAccent: "MYSITES",
  tagline: "AI Marketing Command Center",
  pillars: ["People", "Ideas", "Systems", "Results"],
  logoSrc: `${ASSET}/logo-mark.webp`,
};

export const commandCenterHero = {
  headlineLines: ["Everything", "You need", "To acquire", "Clients."],
  sideLabel: ["AI", "Driven", "Client", "Acquisition"],
  subline: "Six core capabilities.",
  sublineAccent: "Credit-based. No upfront payment.",
  robotSrc: `${ASSET}/robot.webp`,
  robotAlt: "AI humanoid robot in profile with an electric-blue paint splash",
};

type Box = { top: number; width: number };

export type CapabilityIconSet = "advertising" | "prospecting" | "outreach" | "conversations" | "email" | "voice";

export type CommandCenterCapability = {
  number: string;
  category: string;
  title: [string] | [string, string];
  credits: string;
  icons: { set: CapabilityIconSet; left: number; top: number; size: number; alt: string };
  illustration: Box & { src: string; right: number };
  titleTop: number;
  pillTop: number;
};

export const commandCenterCapabilities: CommandCenterCapability[] = [
  {
    number: "01",
    category: "Advertising",
    title: ["AI Campaign", "Builder"],
    credits: "150 credits / campaign",
    icons: { set: "advertising", left: 15, top: 52, size: 42, alt: "Meta, Google, LinkedIn and TikTok" },
    illustration: { src: `${ASSET}/card-advertising.webp`, right: 10, top: 37, width: 222 },
    titleTop: 111,
    pillTop: 250,
  },
  {
    number: "02",
    category: "Prospecting",
    title: ["Lead Generation", "& CRM"],
    credits: "12 credits / lead",
    icons: { set: "prospecting", left: 16, top: 48, size: 54, alt: "Contacts and CRM database" },
    illustration: { src: `${ASSET}/card-prospecting.webp`, right: 5, top: 37, width: 175 },
    titleTop: 111,
    pillTop: 250,
  },
  {
    number: "03",
    category: "Outreach",
    title: ["LinkedIn", "Automation"],
    credits: "7 credits / invite",
    icons: { set: "outreach", left: 22, top: 48, size: 56, alt: "LinkedIn" },
    illustration: { src: `${ASSET}/card-outreach.webp`, right: 6, top: 37, width: 186 },
    titleTop: 111,
    pillTop: 250,
  },
  {
    number: "04",
    category: "Conversations",
    title: ["WhatsApp", "Automation"],
    credits: "10 credits / conversation",
    icons: { set: "conversations", left: 16, top: 40, size: 66, alt: "WhatsApp" },
    illustration: { src: `${ASSET}/card-conversations.webp`, right: 6, top: 27, width: 184 },
    titleTop: 135,
    pillTop: 255,
  },
  {
    number: "05",
    category: "Email",
    title: ["Email", "Marketing"],
    credits: "40 credits / sequence",
    icons: { set: "email", left: 22, top: 44, size: 66, alt: "Email" },
    illustration: { src: `${ASSET}/card-email.webp`, right: 3, top: 32, width: 174 },
    titleTop: 135,
    pillTop: 255,
  },
  {
    number: "06",
    category: "Voice",
    title: ["AI Calling"],
    credits: "60 credits / call",
    icons: { set: "voice", left: 24, top: 40, size: 62, alt: "AI voice calls" },
    illustration: { src: `${ASSET}/card-voice.webp`, right: 4, top: 32, width: 208 },
    titleTop: 132,
    pillTop: 255,
  },
];

export const commandCenterAlsoIncluded = {
  heading: "Also included",
  items: [
    { label: ["Social media", "planning & posting"], icon: CalendarClock },
    { label: ["Website &", "Brand Score"], icon: MonitorCheck },
    { label: ["Campaign", "audits & reports"], icon: ChartColumnBig },
    { label: ["Telegram", "updates"], icon: Send },
    { label: ["Mobile", "dashboard"], icon: Smartphone },
    { label: ["Marketer", "portal"], icon: Users },
    { label: ["AI-generated", "images & video"], icon: ImageIcon },
  ] as { label: [string, string]; icon: LucideIcon }[],
};

/* ---------------------------------------------------------------------------
 * Landing sections below the poster. Copy mirrors the boostmysites.in homepage.
 * ------------------------------------------------------------------------- */


const PRODUCT = "https://boostmysites.in";
const MEDIA = "https://www.boostmysites.in";

/** WhatsApp number for this landing page only (the rest of the site keeps site.whatsappNumber). */
export const CC_WHATSAPP_NUMBER = "919790035747";

/** Deep link into the product, optionally pre-filling the AI goal. */
export const appHref = (goal?: string) =>
  goal ? `${PRODUCT}/app?goal=${encodeURIComponent(goal)}` : `${PRODUCT}/app`;

/** Goal prompt each poster card opens in the product (same order as capabilities). */
export const capabilityGoals = [
  "Run ads for my business",
  "Get me 200 qualified leads for my business",
  "Reach decision-makers on LinkedIn",
  "Answer my WhatsApp leads automatically",
  "Set up email marketing for my business",
  "Call my leads with AI",
];

export type IconItem = { icon: LucideIcon; text: string };

/** Brand marks rendered by CcLogos.tsx. */
export type LogoKey =
  | "meta" | "google" | "openai" | "linkedin" | "whatsapp" | "instagram" | "facebook" | "x"
  | "wordpress" | "searchconsole" | "hubspot" | "zapier" | "telegram" | "twilio" | "sendgrid" | "brevo" | "resend"
  | "gpay" | "phonepe" | "paytm" | "razorpay" | "stripe" | "visa" | "mastercard" | "apple" | "windows" | "chrome";

export const ccNavLinks = [
  { label: "Product", href: "#builder" },
  { label: "Laptop or cloud", href: "#run" },
  { label: "Pricing", href: "#raas" },
  { label: "FAQ", href: "#faq" },
];

/** The welcome offer. The 90% code is a team referral code, sent on WhatsApp after an enquiry. */
export const ccOffer = {
  badge: "90% off your first credits",
  headline: "Your first *2,500 credits* for $1",
  was: "$9.99",
  price: "$1",
  inr: "About ₹90 + GST in India (normally ₹899)",
  how: "Book a free demo. On the call you get your 90%-off code and we start your onboarding.",
  cta: "Book my free demo",
  includes: [
    "2,500 credits to use across ads, LinkedIn, WhatsApp, email and calls",
    "Credits never expire",
    "Set up with you by a named growth manager",
  ],
  ribbon: "Book a free demo · get your first 2,500 credits for $1 (90% off)",
};

/** What happens after any CTA: shown on the offer, the form and the popup. */
export const ccJourney = [
  { title: "Book a free demo", body: "Leave your name and WhatsApp number." },
  { title: "See it on your business", body: "We show the AI plan for your goal, live." },
  { title: "Get your 90%-off code", body: "Your first 2,500 credits for $1." },
  { title: "Onboarding, done with you", body: "We connect your accounts and launch together." },
];

export const ccGoalBand = {
  label: "What do you want to achieve?",
  typed: [
    "Get me 200 qualified leads on WhatsApp",
    "Book 50 demo calls for my software this month",
    "Fill my clinic's appointment slots this week",
    "Get site-visit bookings for my new project",
    "Fill my free demo class with 100 students",
    "Lower my cost per lead on Meta ads",
    "Get franchise enquiries from 5 new cities",
  ],
  sub: "Tell our AI your target. It plans the campaign and builds it on Meta and Google, staged for your approval.",
  chips: [
    { label: "Get 200 qualified leads", goal: "Get me 200 qualified leads for my business" },
    { label: "More WhatsApp enquiries", goal: "Get more WhatsApp enquiries for my business" },
    { label: "Book more sales calls", goal: "Book more sales calls for my business" },
    { label: "More appointment bookings", goal: "Get more appointment bookings" },
    { label: "Fill my webinar or demo class", goal: "Fill my webinar or demo class with registrations" },
    { label: "Lower my cost per lead", goal: "Lower my cost per lead" },
  ],
  primary: "Book a demo for this goal",
  secondary: "Watch demo",
};

export const ccDemo = {
  number: "07",
  label: "Demo",
  heading: "See how it works in *2½ minutes*",
  sub: "One sentence in, a full Meta and Google campaign out. Watch the real dashboard do it.",
  video: `${MEDIA}/demo/how-it-works.mp4`,
  poster: `${MEDIA}/demo/how-it-works.jpg`,
  trust: [
    { icon: Rocket, text: "Setup in days" },
    { icon: Megaphone, text: "Multi-channel ads" },
    { icon: PauseCircle, text: "Paused until you approve" },
    { icon: Inbox, text: "Leads to WhatsApp and CRM" },
  ] as IconItem[],
};

export type CcFeature = {
  id: string;
  number: string;
  badge: string;
  heading: string;
  body: string;
  bullets: IconItem[];
  /** CTAs open the enquiry form, pre-filling the goal. */
  cta: { label: string; goal?: string };
  secondary?: { label: string; goal?: string };
  note?: string;
  video: string;
  poster: string;
  videoLabel: string;
  logos: LogoKey[];
};

export const ccFeatures: CcFeature[] = [
  {
    id: "linkedin",
    number: "11",
    badge: "LinkedIn automation",
    heading: "Your LinkedIn, *on autopilot.*",
    body: "Hours of searching, copy-pasted invites and forgotten follow-ups, done for you. You describe who you want in plain words; the AI does the busywork and hands you the conversations.",
    bullets: [
      { icon: Target, text: "Finds the right people from one sentence: role, industry, city, company size." },
      { icon: Handshake, text: "Sends connection invites every day at a safe, human pace, only in your working hours." },
      { icon: MailCheck, text: "When they accept, your follow-up goes out by itself." },
      { icon: Flame, text: "When someone replies, your phone buzzes with an answer already written. You read it and press Send." },
    ],
    cta: { label: "Book a LinkedIn demo", goal: "Reach decision-makers on LinkedIn" },
    note: "7 credits per invite · pause any time",
    video: `${MEDIA}/demo/linkedin-autopilot.mp4`,
    poster: `${MEDIA}/demo/linkedin-autopilot-poster.jpg`,
    videoLabel: "LinkedIn automation running on a phone",
    logos: ["linkedin"],
  },
  {
    id: "whatsapp",
    number: "10",
    badge: "WhatsApp automation",
    heading: "Every WhatsApp enquiry, *answered in seconds.*",
    body: "A lead who waits an hour has already messaged your competitor. Your AI agent answers the moment they write, at 11 pm or on a Sunday, and keeps the conversation going toward a booking.",
    bullets: [
      { icon: Brain, text: "Trained on your business: your prices, services, opening hours and the way you talk to customers." },
      { icon: Zap, text: "Replies in seconds, day and night, on your own WhatsApp number." },
      { icon: ClipboardList, text: "Collects what you need (name, requirement, preferred time) and moves them toward a booking." },
      { icon: Inbox, text: "Every chat lands in your CRM, and you can switch the agent off any time." },
    ],
    cta: { label: "Book a WhatsApp demo", goal: "Answer my WhatsApp leads automatically" },
    note: "10 credits per conversation",
    video: `${MEDIA}/demo/whatsapp-ai-reply.mp4`,
    poster: `${MEDIA}/demo/whatsapp-ai-reply-poster.jpg`,
    videoLabel: "AI replying to a WhatsApp enquiry",
    logos: ["whatsapp"],
  },
  {
    id: "team",
    number: "15",
    badge: "The human layer",
    heading: "AI does the work. *A real person* makes sure it works.",
    body: "You started your business to serve customers, not to learn ad accounts, pixels and API keys. Every paying account gets a growth manager on our team: one named person who knows your business and is on your side.",
    bullets: [
      { icon: UserRound, text: "A named person owns your account. You know who they are, and you can reach them." },
      { icon: Wrench, text: "They help connect your Meta and Google ad accounts, pixel, WhatsApp and calling number, so you are set up in days." },
      { icon: Rocket, text: "Short on time? They can build and launch campaigns for you from their own screen. Nothing spends until you approve." },
      { icon: LifeBuoy, text: "When an ad is rejected or a payment fails, our team gets the alert and helps you fix it." },
    ],
    cta: { label: "Meet your growth manager", goal: "Set up my AI campaigns with a growth manager" },
    video: `${MEDIA}/demo/human-layer.mp4`,
    poster: `${MEDIA}/demo/human-layer-poster.jpg`,
    videoLabel: "A real person on your side: a client meets their growth manager (a dramatisation)",
    logos: ["meta", "google", "whatsapp"],
  },
];

export const ccRaas = {
  number: "17",
  badge: "Result as a Service",
  heading: "No retainer. No subscription. *Pay for what gets done.*",
  body: "An agency charges you a monthly fee whether or not anything happened. Here you buy credits once, and they only move when a result does: a lead found, an invite sent, a conversation handled, a campaign built. A quiet week costs nothing. Credits never expire.",
  bullets: [
    { icon: Lock, text: "Nothing launches or spends without your approval. Every campaign is staged paused." },
    { icon: Receipt, text: "Every credit is on your history with the reason it moved, and your invoice shows GST separately." },
    { icon: UserRound, text: "A named person on our team owns your account, and can run campaigns for you from their own screen." },
    { icon: RefreshCcw, text: "Optional auto top-up when you run low: UPI Autopay or card, with a ceiling you set." },
  ] as IconItem[],
  primary: { label: "Book a demo, get 90% off", goal: "Claim the 2,500 credits for $1 offer" },
  secondary: { label: "Ask about pricing", goal: "Questions about credits and pricing" },
  paymentLogos: ["razorpay", "gpay", "phonepe", "paytm", "visa", "mastercard", "stripe"] as LogoKey[],
  payments: "Pay by UPI (GPay, PhonePe, Paytm) or card through Razorpay with a GST invoice, or by card anywhere through Stripe.",
  tableHeading: "What a result costs",
  table: [
    ["A qualified lead found for you", "12"],
    ["A LinkedIn invite, personalised", "7"],
    ["A WhatsApp conversation handled", "10"],
    ["A WhatsApp AI reply", "2"],
    ["An email delivered", "1"],
    ["An AI voice call made", "60"],
    ["A campaign built in your ad account", "150"],
    ["A full AI growth plan", "125"],
    ["A lead synced to your CRM", "2"],
    ["Cloud Desktop, one month", "7,500"],
  ] as [string, string][],
  footnote:
    "Normal price: 2,500 credits for $9.99 (₹899 + GST). Prices are the current catalogue and can change; your history always shows what each action cost you.",
};

export type CcUseCase = { icon: LucideIcon; title: string; who: string; goals: string[] };

export const ccUseCases = {
  number: "16",
  badge: "Who it's for",
  heading: "Built for *every business* that wants more customers.",
  sub: "Clinic, coaching centre, store, SaaS or solo consultant: pick an outcome and the AI plans budget, platforms, targeting and copy around it.",
  items: [
    {
      icon: Store,
      title: "Local business",
      who: "Shops, services, home repair",
      goals: ["More phone calls", "More WhatsApp enquiries", "More local customers"],
    },
    {
      icon: Stethoscope,
      title: "Clinics & healthcare",
      who: "Dental, skin, physio, diagnostics",
      goals: ["More appointment bookings", "Fill empty slots this week", "More consultation enquiries"],
    },
    {
      icon: Building2,
      title: "Real estate",
      who: "Builders, brokers, property consultants",
      goals: ["More site-visit bookings", "Qualified buyer leads", "Re-engage old enquiries"],
    },
    {
      icon: GraduationCap,
      title: "Education & coaching",
      who: "Schools, institutes, online courses",
      goals: ["More student admissions", "Fill my free demo class", "More counselling bookings"],
    },
    {
      icon: ShoppingBag,
      title: "E-commerce & D2C",
      who: "Online stores and brands",
      goals: ["More sales at a lower cost", "Retarget website visitors", "Win back past customers"],
    },
    {
      icon: Briefcase,
      title: "B2B, SaaS & IT",
      who: "Software, services, manufacturing",
      goals: ["More demo bookings", "Reach decision-makers on LinkedIn", "More qualified sales calls"],
    },
    {
      icon: Users,
      title: "Agencies & consultants",
      who: "Marketers, CAs, lawyers, freelancers",
      goals: ["More client enquiries", "Book more discovery calls", "Lower cost per lead"],
    },
    {
      icon: Dumbbell,
      title: "Fitness, salons & food",
      who: "Gyms, studios, restaurants, cafés",
      goals: ["More memberships", "More table and slot bookings", "More repeat visits"],
    },
  ] as CcUseCase[],
  customLabel: "Or describe your own goal",
  customPlaceholder: "e.g. Get franchise enquiries from 5 new cities",
  customCta: "Book a demo for this",
};

export const ccHow = {
  number: "15",
  badge: "Process",
  heading: "How it *works*",
  sub: "From a one-line goal to qualified leads in your CRM. You approve before anything spends.",
  video: `${MEDIA}/brand/how-loop.mp4`,
  poster: `${MEDIA}/brand/how-loop-poster.jpg`,
  overlay: "Built, launched & tracked by AI",
  steps: [
    { icon: Target, title: "Tell AI your goal", body: "Share what you sell, who you want to reach, and your budget." },
    { icon: Bot, title: "AI builds & runs campaigns", body: "Ads, targeting and budgets on Meta and Google, staged paused for your approval." },
    { icon: Users, title: "Get qualified leads", body: "High-intent leads flow straight to your dashboard, WhatsApp and CRM." },
  ],
  stats: [
    { icon: Search, value: "Hourly", label: "Live ads re-read" },
    { icon: Bot, value: "8", label: "AI agents on your ads" },
    { icon: Workflow, value: "24/7", label: "Plan, launch, follow up" },
    { icon: BadgeCheck, value: "Paused", label: "Until you approve spend" },
  ],
};

export const ccIntegrations = {
  label: "Builds & launches on",
  tail: "+ HubSpot CRM sync",
  plans: "The AI also plans for LinkedIn, TikTok, YouTube, Reddit, Snapchat and X.",
};

export const ccContact = {
  logos: ["whatsapp"] as LogoKey[],
  number: "18",
  badge: "Done with you",
  heading: "Book your *free demo.*",
  body: "A short call with our team, usually within a working day. We show the AI working on your goal, give you your 90%-off code for 2,500 credits, and start your onboarding.",
};

export const ccFinal = {
  heading: "Ready to grow? *Book your free demo.*",
  sub: "Campaigns are built in minutes and",
  subStrong: "nothing launches without your approval.",
  cta: "Book my free demo",
};

/* ---------------------------------------------------------------------------
 * Product depth (round 4). Every claim here is checked against the ailead code:
 * only Meta and Google launch end to end; ChatGPT Ads runs on the client's own
 * OpenAI ad account; other platforms are planned, not launched.
 * ------------------------------------------------------------------------- */

export const ccBuilder = {
  number: "08",
  badge: "AI campaign builder",
  heading: "One sentence in. *A full growth plan and 7 campaigns out.*",
  body: "Tell the AI what you sell, who you want and your budget. It writes the whole plan, checks it against what each platform really supports, and builds the campaigns inside your own ad accounts, paused until you press Deploy.",
  planLabel: "What the plan includes",
  plan: [
    "Daily budget, split per platform",
    "Target customer, and why",
    "Platforms, and why each one",
    "Where every lead goes: form, WhatsApp or call",
    "Google keywords and negatives",
    "Ad copy and creative strategy for each platform",
    "Tracking plan, risks and forecast",
  ],
  campaignsLabel: "Becomes 7 campaigns on Meta & Google",
  campaigns: ["Meta Awareness", "Meta Traffic", "Meta Engagement", "Meta Leads", "Meta Sales", "Google Search", "Google Demand Gen"],
  extras: [
    { icon: Sparkles, text: "ChatGPT Ads, where OpenAI has opened them: your business shown inside ChatGPT conversations, from your own OpenAI ad account." },
    { icon: ShieldCheck, text: "Ad audit: a rejected ad is read, the reason found, and the ad rewritten so it passes review." },
    { icon: Clock, text: "Every live ad is re-read every hour, and the AI writes a fix plan you can apply in one click." },
    { icon: ImageIcon, text: "AI designs every missing creative format in the same look as your brand." },
  ] as IconItem[],
  logos: ["meta", "google", "openai"] as LogoKey[],
  image: `${ASSET}/product/campaign-builder.jpg`,
  imageAlt: "The BOOSTMYSITES campaign builder: tell AI your goal, it builds the plan, you review and approve",
  cta: { label: "See it plan my campaign", goal: "Build my first AI campaign on Meta and Google" },
};

export type CcChannel = {
  icon: LucideIcon;
  title: string;
  body: string;
  points: string[];
  goal: string;
  logos: LogoKey[];
};

export const ccChannels = {
  number: "14",
  badge: "Every channel, one dashboard",
  heading: "Ads are only *the start.*",
  sub: "Social media, SEO and reporting run from the same dashboard, on the same credits.",
  items: [
    {
      icon: Megaphone,
      title: "Social media",
      logos: ["linkedin", "instagram", "facebook", "x"],
      body: "A month of posts written for your business, in your voice, approved by you, published to your accounts.",
      points: ["LinkedIn, Instagram, Facebook, X", "AI images and presenter videos", "Replies to comments and DMs"],
      goal: "Plan and post my social media",
    },
    {
      icon: Globe,
      title: "SEO autopilot",
      logos: ["google", "wordpress"],
      body: "An audit of your site, then pages written to deserve their ranking, published on your own domain.",
      points: ["Audit of up to 500 pages", "Up to 100 pages a month", "8 quality checks on every page"],
      goal: "Grow my website traffic with SEO",
    },
    {
      icon: Gauge,
      title: "Reports & health",
      logos: ["telegram"],
      body: "A Marketing Health score out of 100 across 8 areas, and a weekly report in plain English.",
      points: ["Brand Score and ad audit", "90-day growth roadmap", "Telegram updates and mobile app"],
      goal: "Audit my marketing and show me what to fix",
    },
  ] as CcChannel[],
  footnote: "Works in 11 languages. Agencies get separate client workspaces and a marketer portal.",
};

export type CcTrioItem = {
  icon: LucideIcon;
  badge: string;
  title: string;
  body: string;
  points: string[];
  note: string;
  logos: LogoKey[];
  cta: { label: string; goal: string };
};

/** AI calling, email marketing and the built-in CRM: one row, three columns. */
export const ccTrio = {
  number: "12",
  badge: "Calls, email and CRM",
  heading: "Every lead called, emailed and *tracked in one place.*",
  sub: "Three more channels in the same dashboard, on the same credits, switched on by our team during onboarding.",
  items: [
    {
      icon: PhoneCall,
      badge: "AI calling",
      title: "A voice agent that calls your leads",
      body: "It calls in the voice you choose and says exactly what you teach it, then books the meeting.",
      points: [
        "AI writes the call script for you",
        "Appointment booking, payment reminders and feedback calls",
        "Answers incoming calls too",
        "Get a number from us, or connect your own Twilio number",
      ],
      note: "60 credits per call",
      logos: ["twilio"],
      cta: { label: "Book an AI calling demo", goal: "Call my leads with AI" },
    },
    {
      icon: Mail,
      badge: "Email marketing",
      title: "Sequences written for your business",
      body: "An AI email plan: who to email, which sequences to run, and a 4-week calendar with realistic targets.",
      points: [
        "Ready-made sequences, written in your voice",
        "Sent from your own address",
        "Upload up to 2,000 contacts from a CSV",
        "Nothing sends until you press Send",
      ],
      note: "40 credits per sequence · 1 credit per email",
      logos: ["brevo", "sendgrid", "resend"],
      cta: { label: "Book an email demo", goal: "Set up email marketing for my business" },
    },
    {
      icon: Inbox,
      badge: "Built-in lead CRM",
      title: "Every lead in one list, read by AI",
      body: "Leads sorted into hot, warm and cold, each with a 0–100 score, a next step and a follow-up reminder.",
      points: [
        "Website forms, Meta and Google lead forms, WhatsApp, calls and LinkedIn",
        "One line of code captures every form on your website",
        "Stages from New to Won, duplicates merged",
        "Syncs with HubSpot",
      ],
      note: "2 credits per lead record",
      logos: ["hubspot", "meta", "whatsapp"],
      cta: { label: "Book a CRM demo", goal: "Organise and follow up all my leads" },
    },
  ] as CcTrioItem[],
};

export const ccRunModes = {
  number: "13",
  badge: "Runs on your laptop, or ours",
  heading: "A real browser does the work. *You choose where it runs.*",
  sub: "The AI works the way a media buyer would: in a real Chrome window, signed in as you, inside your own accounts. You can watch every step.",
  modes: [
    {
      key: "companion",
      tag: "Included",
      title: "Companion app",
      platforms: "Mac (Apple Silicon & Intel) · Windows 10/11",
      body: "A small app on your computer that drives your own Chrome.",
      points: [
        "Your passwords stay on your machine",
        "Watch every step, then Take over or Hand back to AI",
        "Work queues while your laptop is off and runs when it opens",
        "Updates itself, keeps your sign-ins",
      ],
    },
    {
      key: "cloud",
      tag: "New",
      title: "Cloud Desktop",
      platforms: "No laptop needed · watch from your phone",
      body: "A private cloud computer with real Chrome, only your account can reach it.",
      points: [
        "Ads, WhatsApp replies and LinkedIn keep running 24/7",
        "Watch it live and use it from any screen, even a phone",
        "Sign in once, it stays signed in",
        "Restarts and updates itself · 7,500 credits a month, stop any time",
      ],
    },
  ],
  shared: [
    { icon: Lock, text: "Built inside your own ad accounts, under your own billing" },
    { icon: PauseCircle, text: "Everything is built paused until you approve" },
    { icon: ClipboardList, text: "Every action written to an audit log" },
  ] as IconItem[],
  privacy:
    "With Cloud Desktop, your platform sign-ins are kept inside your private cloud Chrome so the agent can work while you are away. You can stop it and ask for it to be deleted at any time.",
  cta: { label: "Book a setup demo", goal: "Set up the Companion or Cloud Desktop for me" },
};

export const ccCompare = {
  number: "09",
  badge: "Why not an agency?",
  heading: "Agency results, *without the agency retainer.*",
  cols: ["BOOSTMYSITES", "Typical agency", "Doing it yourself"],
  /** Each row: our answer, then agency and DIY with an honest tone: bad ✕, mixed –, ok ✓. */
  rows: [
    { label: "Monthly retainer", values: ["None. Credits only move when work is done", "Fixed fee, every month", "Your own time"], tones: ["bad", "mixed"] },
    { label: "Setup time", values: ["Days, done with you", "Weeks of onboarding", "Learning every platform"], tones: ["bad", "bad"] },
    { label: "Ad accounts and data", values: ["Yours, under your billing", "Sometimes held by the agency", "Yours"], tones: ["mixed", "ok"] },
    { label: "WhatsApp replies at 11 pm", values: ["Answered in seconds", "Next working day", "If you are awake"], tones: ["bad", "mixed"] },
    { label: "LinkedIn outreach", values: ["Daily, at a safe human pace", "Usually extra", "Manual"], tones: ["mixed", "bad"] },
    { label: "A real person on your side", values: ["A named growth manager", "An account manager", "No one"], tones: ["ok", "bad"] },
    { label: "Approval before spend", values: ["Always. Built paused", "Depends on the agency", "Yes"], tones: ["mixed", "ok"] },
  ] as { label: string; values: [string, string, string]; tones: ("bad" | "mixed" | "ok")[] }[],
};

export const ccFaq = {
  number: "19",
  badge: "Questions",
  heading: "Questions people ask *before they start.*",
  items: [
    {
      q: "Do I need a laptop?",
      a: "No. The Companion app runs on a Mac or Windows computer, or you can use Cloud Desktop: a private cloud Chrome that keeps your ads, WhatsApp replies and LinkedIn running 24/7 with no laptop on.",
    },
    {
      q: "Can anything spend money without me?",
      a: "No. Every campaign is built paused inside your own ad account and only goes live when you press Deploy. Ad spend is billed by Meta or Google to your own card.",
    },
    {
      q: "Who owns the ad accounts and the data?",
      a: "You do. Campaigns, pixels, audiences and history stay in your own ad accounts. If you leave, you keep everything.",
    },
    {
      q: "Is my password safe?",
      a: "You sign in yourself, in a Chrome window, and the app never types or sees your password. With the Companion, sign-ins stay on your computer; with Cloud Desktop, they stay inside your private cloud Chrome.",
    },
    {
      q: "What is a credit, and how much does it cost?",
      a: "Credits pay for the work the AI does: 12 for a qualified lead, 7 for a LinkedIn invite, 10 for a WhatsApp conversation, 150 for a campaign build. Normally 2,500 credits cost $9.99 (₹899 + GST). Your first 2,500 are $1 with the code our team sends you.",
    },
    {
      q: "Do credits expire? Can I get a refund?",
      a: "Credits never expire. Bought credits are not refundable, so the first pack is priced at $1 to let you try it properly.",
    },
    {
      q: "Which ad platforms does it work on?",
      a: "It builds and launches campaigns on Meta (Facebook and Instagram) and Google, and runs ChatGPT Ads from your own OpenAI ad account in countries where OpenAI has opened them. The AI also plans for LinkedIn, TikTok, YouTube, Reddit, Snapchat and X.",
    },
    {
      q: "What if an ad gets rejected?",
      a: "The AI reads the ad, finds what tripped the review and rewrites it so it passes. When an ad is rejected or a payment fails, our team is alerted and helps you fix it.",
    },
    {
      q: "Do you guarantee results?",
      a: "No honest platform can guarantee leads or sales. What we guarantee is the process: a full plan, campaigns built in your accounts, nothing spent without your approval, and a named person who helps you get it right.",
    },
    {
      q: "Do I get a GST invoice? Which languages?",
      a: "Yes. In India you pay by UPI or card through Razorpay and get a GST invoice. The dashboard works in 11 languages, including Hindi, Tamil, Malayalam, Arabic and Urdu.",
    },
  ],
};
