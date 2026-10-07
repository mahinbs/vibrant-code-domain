import type { SeoPageData } from "../types";

/**
 * Comparison pages (/compare/<slug>). Rules: be fair, say plainly when the
 * alternative wins, never state competitor prices or feature limits, and only
 * make product claims from the verified fact list.
 */
export const comparisonPages: SeoPageData[] = [
  /* ------------------------------------------------------------------ */
  /* VS A TRADITIONAL MARKETING AGENCY                                   */
  /* ------------------------------------------------------------------ */
  {
    kind: "compare",
    slug: "vs-agency",
    navLabel: "BoostMySites vs a marketing agency",
    cardSummary:
      "How an AI client acquisition system compares with a traditional marketing agency on cost, speed and control.",
    metaTitle: "AI vs Marketing Agency: Cost, Speed, Control",
    metaDescription:
      "AI vs a traditional marketing agency for lead generation: retainers, launch speed and account ownership compared honestly, including when an agency wins.",
    primaryPhrase: "AI vs marketing agency",
    eyebrow: "Compare",
    h1: "AI vs a marketing agency: which should run your lead generation?",
    intro:
      "A traditional marketing agency sells you people's time; BoostMySites gives you AI agents that run your campaigns every 20 minutes, with a team behind them. Here is an honest comparison of cost, speed to launch and control — including the situations where an agency is the better choice.",
    blocks: [
      {
        kind: "table",
        heading: "BoostMySites vs a traditional agency at a glance",
        intro:
          "Agencies differ a lot, so the left-hand column describes the common retainer model rather than any particular firm.",
        columns: ["", "Traditional marketing agency", "BoostMySites"],
        rows: [
          [
            "Cost model",
            "A monthly retainer, sometimes plus a percentage of ad spend. The retainer is due whether campaigns perform or not.",
            "From ₹33,333 a month + GST or US$199 a month, loaded as prepaid AI Growth Credits. Ad spend is separate and paid directly to the platforms. No guarantee of leads or sales.",
          ],
          [
            "Speed to launch",
            "Typically about 5–10 days from brief to live campaign, depending on the team's workload.",
            "A plan assembled in minutes from a one-sentence goal. Campaigns are staged paused for your review and go live as soon as you approve.",
          ],
          [
            "Control",
            "Varies. Some agencies run ads from their own accounts, and changes go through your account manager.",
            "Campaigns run in your own ad accounts on your own billing. You sign in yourself, approve before anything spends and can pause everything in one click.",
          ],
          [
            "Who does the work",
            "An account manager juggling many clients, plus specialists when they have time.",
            "8 AI agents — Lead Scout, Qualifier, Follow-up, Enrichment, Campaign Launcher, Health Monitor, Scheduler and Report Writer — checking campaigns 72 times a day.",
          ],
          [
            "Lead follow-up",
            "Usually your team's job once the lead arrives.",
            "WhatsApp automation, email, an AI calling agent, lead scoring and a CRM are part of the system.",
          ],
          [
            "Reporting",
            "Often a monthly report or review call.",
            "A plain-English weekly report from the Report Writer, plus a log of every action the agents take.",
          ],
          [
            "Lock-in",
            "Depends on the contract. If the agency owns the ad accounts, history and audiences can be hard to take with you.",
            "Everything is built in your own accounts, so campaigns, audiences and history stay with you if you leave.",
          ],
        ],
        note: "Agency terms vary widely. Ask any agency you're considering who owns the ad accounts, what the notice period is, and whether they charge a fee on ad spend.",
      },
      {
        kind: "prose",
        heading: "Where the agency model struggles for lead generation",
        paragraphs: [
          "The retainer is the first problem. You pay the same fee in a month where the campaigns produced nothing as in a month where they filled your calendar. That isn't dishonest — it is how service businesses price people's time — but it means the agency's income doesn't move with your results, and you carry all the risk.",
          "Speed is the second. A brief has to be written, discussed, scheduled into a team's week and turned into a campaign, which is why going from brief to live often takes about 5–10 days. Optimisation follows the same rhythm: someone has to find the time to log in, notice a problem and fix it. On a busy week, that might be once.",
          "Attention is the third. Account managers usually juggle many clients at once. Even a good one can only look at your account for a slice of their day, and the smaller your budget, the thinner that slice tends to be.",
        ],
      },
      {
        kind: "steps",
        heading: "What changes when AI runs the loop",
        intro:
          "Instead of waiting for someone to log in, our agents run the same five-step loop every 20 minutes — 72 times a day — on every live campaign.",
        steps: [
          {
            title: "Read",
            body: "Pull the latest numbers from each ad platform and from your lead inbox: spend, clicks, leads, replies, bookings.",
          },
          {
            title: "Compare",
            body: "Check those numbers against the plan you approved and the limits you set, such as maximum daily spend or target cost per lead.",
          },
          {
            title: "Decide",
            body: "Work out whether anything needs to change — pause a tired ad, shift budget between ad sets, flag a problem — and whether that change is inside your limits.",
          },
          {
            title: "Act",
            body: "Make the change if it is within your limits. Anything outside them, like spending more, waits for your approval.",
          },
          {
            title: "Log",
            body: "Record what was done and why, so you can see every decision in the dashboard and in the weekly report.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "When a traditional agency is the right choice",
        paragraphs: [
          "An agency is often the better fit when what you need is mainly creative or strategic rather than lead generation. If you are planning a brand launch, a video shoot, a PR push or a campaign across TV, outdoor and digital, you want experienced people in a room, and that is what a good agency provides.",
          "It can also be right if you have a large, complex account across many markets and want a dedicated senior team who will sit in your leadership meetings. Some businesses simply prefer a person they can call for everything, and value that relationship more than speed or price. If that's you, a strong agency with a clear contract — your accounts, a fair notice period, transparent fees — is a reasonable choice.",
        ],
      },
      {
        kind: "prose",
        heading: "When BoostMySites is the better fit",
        paragraphs: [
          "We are built for businesses whose main goal is a steady flow of qualified enquiries: clinics, institutes, real estate teams, consultants, interior designers, B2B firms and agencies themselves. If you want campaigns live in days rather than weeks, run in accounts you own, and watched every 20 minutes rather than every week, the AI approach usually fits better.",
          "It also suits businesses that have been burned by retainers before. You see what each agent did and why, you approve before anything spends, and if you stop working with us, nothing is held back: the ad accounts, audiences and history were always yours.",
        ],
      },
      {
        kind: "callout",
        heading: "The part agencies rarely offer",
        body: "Every campaign is staged paused and nothing spends until you approve it. It runs in your own ad account, on your own card, and you can pause everything in one click — no email to an account manager required.",
      },
      {
        kind: "prose",
        heading: "Can you use both?",
        paragraphs: [
          "Yes, and some businesses do. A common split is to keep an agency or freelancer for brand, creative production and big launches, and let our system handle the day-to-day lead generation and follow-up. Because our campaigns run in your own accounts, both can see the same data, and you remain the one who decides.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is BoostMySites a marketing agency?",
        a: "Not in the traditional sense. The day-to-day work is done by AI agents, with our team in Bengaluru setting things up and supporting you. Plans are monthly and load prepaid AI Growth Credits rather than paying for hours of staff time.",
      },
      {
        q: "Is it cheaper than an agency?",
        a: "It can be, but compare like with like. Our plans start from ₹33,333 a month plus GST or US$199 a month, and ad spend is separate. Add up an agency's retainer plus any fee on ad spend, and compare total cost against what each option actually does for you.",
      },
      {
        q: "Will I lose the human contact an agency gives me?",
        a: "You still have people to talk to: onboarding is on a video call and our team answers on WhatsApp. What changes is that the routine checking and adjusting is done by agents every 20 minutes instead of waiting for someone's free hour.",
      },
      {
        q: "Can I switch from my agency without losing campaign history?",
        a: "If your ad accounts are in your name, yes — we work inside them, so the history stays. If your agency owns the accounts, ask them how a transfer works before you give notice.",
      },
      {
        q: "Do you guarantee better results than an agency?",
        a: "No. We don't guarantee leads, sales or return on ad spend, and nobody honestly can. We do guarantee you will see every change and nothing will spend without your approval.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Lead scoring and CRM", href: "/services/leads-crm" },
      { label: "For marketing agencies", href: "/industries/agencies" },
      { label: "Run ads yourself vs AI", href: "/compare/vs-diy" },
      { label: "HubSpot alternative for lead generation", href: "/compare/vs-hubspot" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* VS HUBSPOT                                                          */
  /* ------------------------------------------------------------------ */
  {
    kind: "compare",
    slug: "vs-hubspot",
    navLabel: "BoostMySites vs HubSpot",
    cardSummary:
      "A CRM you operate versus a system that runs your campaigns: an honest look at when each one fits, and when HubSpot wins.",
    metaTitle: "HubSpot Alternative for Lead Generation | BoostMySites",
    metaDescription:
      "BoostMySites vs HubSpot: a platform your team operates versus AI agents that run your campaigns for you. An honest look at when each one fits.",
    primaryPhrase: "HubSpot alternative for lead generation",
    eyebrow: "Compare",
    h1: "A HubSpot alternative for lead generation? An honest comparison",
    intro:
      "HubSpot is a CRM and marketing platform that you and your team operate. BoostMySites runs your lead generation for you: AI agents launch and watch ads, follow up leads and report weekly. They solve different problems, and for some businesses HubSpot is the better answer.",
    blocks: [
      {
        kind: "table",
        heading: "BoostMySites vs HubSpot: roles, not feature lists",
        intro:
          "We are deliberately not comparing prices or feature limits here. HubSpot's plans change, and you should check them on HubSpot's own site. This table compares what each one is for and who does the work.",
        columns: ["", "HubSpot", "BoostMySites"],
        rows: [
          [
            "What it is",
            "A CRM and marketing software platform: contacts, pipelines, email, forms, automation and more, offered across several product areas.",
            "A done-for-you AI client acquisition system: ads, follow-up, outreach, calling, lead scoring and reporting run by AI agents.",
          ],
          [
            "Cost model",
            "A software subscription priced by HubSpot by product and tier. Check HubSpot's current pricing.",
            "From ₹33,333 a month + GST or US$199 a month, loaded as prepaid AI Growth Credits. Ad spend is separate and paid to the platforms.",
          ],
          [
            "Speed to launch",
            "Depends on your team. Setting up the CRM, workflows, forms and campaigns is work someone has to do.",
            "A plan assembled in minutes from a one-sentence goal. Campaigns staged paused and live once you approve.",
          ],
          [
            "Control",
            "Full control. You configure everything yourself.",
            "You approve before anything spends, campaigns run in your own ad accounts, and one click pauses everything.",
          ],
          [
            "Who does the work",
            "You, your marketing team, or a partner agency you hire to run it.",
            "8 AI agents running a 20-minute loop. You approve plans and handle the sales conversations.",
          ],
          [
            "Reporting",
            "Dashboards and reports you configure and read.",
            "A plain-English weekly report written for you, plus a log of every action taken.",
          ],
          [
            "Lock-in",
            "Your contacts and history live in the platform. Moving any well-used CRM takes planning.",
            "Campaigns, audiences and spend history stay in your own ad accounts.",
          ],
          [
            "Strongest at",
            "Managing contacts, sales pipelines, content and inbound marketing across a team.",
            "Running paid campaigns across many platforms and following up every lead on WhatsApp, email and phone.",
          ],
        ],
        note: "HubSpot is a trademark of HubSpot, Inc. BoostMySites is not affiliated with or endorsed by HubSpot.",
      },
      {
        kind: "prose",
        heading: "The real difference: a tool you operate vs a system that operates",
        paragraphs: [
          "People often search for a HubSpot alternative when what they actually need is someone — or something — to do the lead generation work. HubSpot gives you a very capable set of tools. It doesn't write your ads, decide your budget split across Meta and Google, notice at 3 p.m. that a campaign's cost per lead has doubled, or send the first WhatsApp message to a lead who just filled in a form. Your team, or an agency you hire, does that.",
          "BoostMySites starts from the other end. You describe a goal in one sentence, a plan is assembled in minutes, and once you approve, AI agents run the campaigns on Meta, Google, LinkedIn, TikTok, YouTube, Snapchat and ChatGPT ads, follow up leads on WhatsApp and email, call the promising ones with an AI calling agent and score them in a built-in CRM. You still make the decisions; you just don't do the clicking.",
        ],
      },
      {
        kind: "prose",
        heading: "When HubSpot is the better choice",
        paragraphs: [
          "If you have an in-house marketing team that wants to run campaigns itself, HubSpot gives them a powerful place to do it. If your sales team needs detailed pipeline management, deal stages, forecasting and shared inboxes, a full CRM is the right foundation, and our lead scoring and CRM is not designed to replace that for a large sales organisation.",
          "HubSpot is also the stronger option if your growth comes mainly from content and inbound — blogs, SEO, newsletters and landing pages your team builds — or if you need customer service tools in the same platform. And if you already use HubSpot well and your pipeline is healthy, switching for the sake of it rarely makes sense.",
        ],
      },
      {
        kind: "prose",
        heading: "When BoostMySites is the better fit",
        paragraphs: [
          "We fit businesses that don't have a marketing team, or have one that is stretched thin, and need paid campaigns running and leads followed up now. Clinics, coaching institutes, real estate teams, interior designers, consultants and B2B firms often fall into this group: they know their customers well but don't want to learn six ad managers.",
          "We also fit markets where WhatsApp is the main sales channel, such as India and the Gulf, because WhatsApp follow-up is built into how the system works rather than added later. And if you have bought a marketing platform before and found it sitting half set up, a system that does the work rather than waiting for you to configure it can be the more practical choice.",
        ],
      },
      {
        kind: "prose",
        heading: "Can you use both?",
        paragraphs: [
          "Some businesses will want a full CRM like HubSpot for their sales team and a system like ours to generate and follow up leads. Our lead scoring and CRM covers what is needed to qualify and route leads from our campaigns. If you need those leads to end up in HubSpot, ask us how that would work for your setup before you sign up — we would rather tell you plainly than assume.",
        ],
      },
      {
        kind: "callout",
        heading: "Hands-off doesn't mean out of control",
        body: "Our agents do the work, but you keep the controls: campaigns are staged paused, nothing spends until you approve, everything runs in your own ad accounts and billing, and one click pauses it all.",
      },
    ],
    faqs: [
      {
        q: "Is BoostMySites a replacement for HubSpot?",
        a: "For some businesses, yes — if what you needed was leads generated and followed up, not a platform to operate. If you need a full CRM for a sales team, content tools or customer service software, HubSpot does things we don't try to do.",
      },
      {
        q: "Does BoostMySites integrate with HubSpot?",
        a: "Ask us about your specific setup before signing up. We won't promise an integration on this page; we would rather check how your HubSpot account is configured and tell you honestly what is possible.",
      },
      {
        q: "Which one is cheaper?",
        a: "It depends on which HubSpot products and tiers you would need and the cost of the people who run them, so check HubSpot's current pricing on their site. Our plans start from ₹33,333 a month plus GST or US$199 a month, with ad spend paid separately to the platforms.",
      },
      {
        q: "Do I need marketing skills to use BoostMySites?",
        a: "No. You describe the goal in one sentence, review the paused campaigns and approve them. The agents handle launching, monitoring and follow-up, and the weekly report explains what happened in plain English.",
      },
      {
        q: "We already use HubSpot and have a marketing team. Should we switch?",
        a: "Probably not, if it is working. You might use us alongside it for paid campaigns and WhatsApp follow-up if your team is stretched, but there is no reason to replace a setup that is producing a healthy pipeline.",
      },
    ],
    related: [
      { label: "Lead scoring and CRM", href: "/services/leads-crm" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Lead generation for IT and SaaS", href: "/industries/it-saas" },
      { label: "AI vs marketing agency", href: "/compare/vs-agency" },
      { label: "Pricing", href: "/pricing" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* VS DOING IT YOURSELF                                                */
  /* ------------------------------------------------------------------ */
  {
    kind: "compare",
    slug: "vs-diy",
    navLabel: "BoostMySites vs doing it yourself",
    cardSummary:
      "Running your own ads vs letting AI agents run them: cost, time, control and when doing it yourself is the smarter call.",
    metaTitle: "Run Ads Yourself vs AI: An Honest Comparison",
    metaDescription:
      "Should you run ads yourself or let AI agents do it? Cost, time, control and follow-up compared, including when doing it yourself is the right call.",
    primaryPhrase: "run ads yourself vs AI",
    eyebrow: "Compare",
    h1: "Run ads yourself vs AI: which makes sense for your business?",
    intro:
      "Running your own ads costs nothing but ad spend and your time — and time is the catch. BoostMySites puts AI agents on the job: they launch and watch your campaigns every 20 minutes, follow up leads and report weekly, while you keep the same control you'd have doing it yourself. Here's an honest comparison.",
    blocks: [
      {
        kind: "table",
        heading: "Doing it yourself vs BoostMySites",
        columns: ["", "Doing it yourself", "BoostMySites"],
        rows: [
          [
            "Cost model",
            "Ad spend plus your own time. No fees on top.",
            "From ₹33,333 a month + GST or US$199 a month in prepaid AI Growth Credits, plus ad spend paid directly to the platforms.",
          ],
          [
            "Speed to launch",
            "As fast as you can learn each platform's ad manager. First campaigns often take a few attempts to get right.",
            "A plan assembled in minutes from a one-sentence goal; campaigns staged paused and live once you approve.",
          ],
          [
            "Control",
            "Total. You make every click yourself.",
            "You approve before anything spends, own the ad accounts and billing, and can pause everything in one click.",
          ],
          [
            "Who does the work",
            "You, in between running the business.",
            "8 AI agents running a 20-minute loop — read, compare, decide, act, log — 72 times a day.",
          ],
          [
            "Lead follow-up",
            "Whenever you get to it, with real enquiries mixed in among leads with fake numbers.",
            "Automatic WhatsApp and email follow-up, an AI calling agent, and a Qualifier that scores leads so real ones rise to the top.",
          ],
          [
            "Reporting",
            "Six ad platforms, six logins, six dashboards to read.",
            "One plain-English weekly report, plus a log of every action.",
          ],
          [
            "Lock-in",
            "None.",
            "Your ad accounts, audiences and history stay in your name whatever you decide later.",
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What doing it yourself usually looks like",
        paragraphs: [
          "Most owners who run their own ads don't start with a plan. They boost a post that did well, set a budget, and hope. Some weeks it works; most weeks it's hard to tell. The boost button is easy precisely because it skips the decisions that make a campaign work: who exactly should see it, what action you want them to take, and what happens after they do.",
          "Then there is the sprawl. Meta, Google, LinkedIn, YouTube, TikTok and Snapchat each have their own ad manager, their own reporting and their own login. Six ad platforms, six logins, and no single view of what is working. Leads arrive in different inboxes, some with fake numbers, and the real ones wait until you find time to call — by which point many have already spoken to a competitor.",
        ],
      },
      {
        kind: "prose",
        heading: "When running ads yourself is the right call",
        paragraphs: [
          "Doing it yourself is genuinely the better option in some situations. If your budget is very small and you only need one platform — say, a local business running a single Instagram campaign — the cost of any service may outweigh the benefit. If you enjoy the work, have the time, and want to understand advertising deeply, running your own campaigns is one of the best ways to learn.",
          "It also makes sense early on, when you are still working out what you sell and to whom. A few weeks of small experiments can teach you a lot about your customers before you spend on anything more structured. Our free ad budget calculator can help you size those experiments sensibly.",
        ],
      },
      {
        kind: "prose",
        heading: "When BoostMySites makes more sense",
        paragraphs: [
          "The balance tips once ads matter to your revenue and your time matters more than the plan fee. If you are advertising on more than one platform, losing leads because nobody replied quickly, or spending evenings in ad managers instead of with customers, handing the routine work to AI agents gives you those hours back.",
          "It also makes sense if you have tried it yourself and can't tell what's working. The weekly report explains in plain English what ran, what it cost, what changed and why, so you keep learning without doing every click.",
        ],
      },
      {
        kind: "steps",
        heading: "What the agents do that's hard to do by hand",
        intro:
          "None of these jobs is impossible for a person. The difference is doing all of them, on every campaign, every 20 minutes.",
        steps: [
          {
            title: "Watch every campaign, all day",
            body: "The Health Monitor checks each live campaign 72 times a day and flags rising costs or campaigns drifting away from the plan you approved.",
          },
          {
            title: "Reply to every lead",
            body: "The Follow-up agent picks up new leads automatically and starts the WhatsApp or email conversation, so nobody waits for you to finish a meeting.",
          },
          {
            title: "Separate real leads from junk",
            body: "The Qualifier scores each lead and the Enrichment agent fills in missing details, so fake numbers and tyre-kickers drop to the bottom of the list.",
          },
          {
            title: "Call the promising ones",
            body: "The AI calling agent rings leads who are ready to talk and hands warm conversations to you or your team.",
          },
          {
            title: "Keep to your hours",
            body: "The Scheduler makes sure follow-ups and calls happen during the working hours you set.",
          },
          {
            title: "Explain it all weekly",
            body: "The Report Writer turns the week's data into a plain-English summary with recommendations.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "Same control as doing it yourself",
        body: "You still own the ad accounts and the billing, you sign in yourself, and we never see or store your passwords. Campaigns are staged paused and nothing spends until you approve. Want to stop? One click pauses everything.",
      },
    ],
    faqs: [
      {
        q: "Isn't it cheaper to run ads myself?",
        a: "In cash terms, yes: you only pay ad spend. The real cost is your time and the leads that slip through when follow-up is slow. If ads are a small side activity, doing it yourself may be the right choice; if they drive your revenue, the time saved usually matters more.",
      },
      {
        q: "I've been boosting posts. Isn't that the same thing?",
        a: "Not quite. Boosting is a quick way to show a post to more people, but it gives you less control over targeting, objectives and what happens after someone responds. A lead campaign with qualifying questions and automatic follow-up is built to produce enquiries, not just views.",
      },
      {
        q: "Can I still log in and change things myself?",
        a: "Yes. Campaigns run in your own ad accounts, so you can sign in to Meta, Google or any other platform at any time. Every change the agents make is logged so you can see what happened.",
      },
      {
        q: "I want to learn how ads work. Will I learn anything?",
        a: "Yes. The weekly report explains what ran, what it cost, what changed and why, in plain English. You learn from your own campaigns without trial and error across six ad managers.",
      },
      {
        q: "Do you guarantee better results than I'd get myself?",
        a: "No. We don't guarantee leads, sales or return on ad spend. Results depend on your offer, budget and market. What you get is constant monitoring, fast follow-up and full visibility — with nothing spending until you approve.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead scoring and CRM", href: "/services/leads-crm" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "AI vs marketing agency", href: "/compare/vs-agency" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];
