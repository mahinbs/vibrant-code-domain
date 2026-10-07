import type { SeoPageData } from "../types";

/**
 * Location pages (/locations/<slug>). Each page is written for its own market:
 * different platforms, sectors, languages, time zones and billing notes.
 * Only Bengaluru has an office. No local phone numbers anywhere — contact is
 * WhatsApp +91 96329 53355 for every market. No CPC/CPL figures: ad costs are
 * described qualitatively and quoted after we read the client's account.
 */
export const locationPages: SeoPageData[] = [
  /* ------------------------------------------------------------------ */
  /* DUBAI                                                               */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "dubai",
    navLabel: "Dubai",
    cardSummary:
      "Meta, Google and WhatsApp-led lead generation for UAE businesses, run remotely and billed in US dollars.",
    metaTitle: "Lead Generation Company Dubai | BoostMySites",
    metaDescription:
      "AI lead generation for Dubai businesses: Meta, Google and WhatsApp campaigns in your own ad accounts, billed in USD. Nothing spends until you approve.",
    primaryPhrase: "lead generation company Dubai",
    eyebrow: "Dubai · United Arab Emirates",
    h1: "An AI lead generation company for Dubai businesses",
    intro:
      "BoostMySites works remotely with Dubai businesses as an AI-driven lead generation company: our agents plan, launch and watch your ads on Meta, Google and other platforms, then keep every lead talking on WhatsApp. Everything runs in your own ad accounts, billing is in US dollars, and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for lead generation in Dubai",
        intro:
          "Buyers in Dubai move between Instagram, Google and WhatsApp in a single sitting. The right mix depends on what you sell, but these are the channels that usually carry the weight here.",
        items: [
          {
            title: "WhatsApp is where the sale happens",
            body: "In the UAE, most sales conversations end up on WhatsApp. A lead who fills in a form expects a message there, not an email two days later. Our Follow-up agent picks up each new enquiry, sends the first WhatsApp message and keeps the conversation going until the lead books a call, goes quiet or asks to stop.",
          },
          {
            title: "Instagram and Facebook for visual offers",
            body: "Property launches, hotel and restaurant offers, salons, clinics and fit-out companies sell on visuals. Meta lead forms and click-to-WhatsApp ads let someone go from a reel to a conversation in two taps, which suits a market where people compare a lot and decide quickly.",
          },
          {
            title: "Google Search and YouTube for intent",
            body: "When someone types a service and the word Dubai into Google, they are usually close to a decision. Search catches that intent for clinics, business setup, education, movers and home services. YouTube is better for longer walk-throughs of a property, a venue or a course.",
          },
          {
            title: "LinkedIn for B2B and free zone companies",
            body: "Dubai is a regional base for consultancies, recruiters, logistics firms and companies selling to other businesses across the Gulf. LinkedIn Ads reach decision-makers by job title and company, and our LinkedIn outreach runs alongside with messages you approve first.",
          },
          {
            title: "Snapchat and TikTok as measured tests",
            body: "For consumer brands aimed at younger residents and visitors, Snapchat and TikTok are worth testing. We treat them as experiments with a capped budget until your own numbers say they deserve more.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Ad costs in Dubai: what to expect",
        intro:
          "We don't publish a cost per lead for Dubai, because an honest figure doesn't exist until we have seen your account. A luxury property enquiry and a café booking are different worlds. What we can show you is how each platform is typically used here and what tends to push costs up or down.",
        columns: ["Platform", "Typical use for Dubai businesses", "What tends to move cost"],
        rows: [
          [
            "Meta (Instagram, Facebook)",
            "Property launches, hospitality offers, beauty and wellness, retail promotions, click-to-WhatsApp ads",
            "How crowded your category is that month, creative fatigue, how tightly you target by area and language",
          ],
          [
            "Google Search",
            "Searches for clinics, business setup, education, legal services, movers and home services",
            "How many advertisers bid on the same terms, keyword category, landing page quality",
          ],
          [
            "YouTube",
            "Property and project walk-throughs, venue tours, course explainers",
            "Video length and quality, audience size, retargeting past visitors versus cold reach",
          ],
          [
            "LinkedIn Ads",
            "B2B services, recruitment, consultancy and free zone offers aimed at decision-makers",
            "Seniority and job-title filters; narrow B2B audiences generally cost more per click than consumer platforms",
          ],
          [
            "Snapchat and TikTok",
            "Consumer brands, food and beverage, events aimed at younger audiences",
            "Creative that feels native to the platform; stiff, repurposed ads struggle regardless of budget",
          ],
        ],
        note: "Costs depend on your industry, the season and how many competitors are bidding. We recommend a budget after reading your account and goals, not before.",
      },
      {
        kind: "prose",
        heading: "Seasons and timing in the UAE",
        paragraphs: [
          "Demand in Dubai rarely stays flat across the year. Many businesses see behaviour shift around Ramadan, during the hotter summer months when a lot of residents travel, and through the busier stretch from autumn into the new year when tourism, events and property activity tend to pick up. The pattern is different for every category, so we don't assume one — we watch your own numbers.",
          "That is where the 20-minute loop helps. Every 20 minutes our agents read your campaign data, compare it with the plan, decide whether anything needs to change, act within the limits you have set, and log what they did — 72 checks a day. If cost per lead drifts upward in a slow week, the Health Monitor flags it. Anything outside your limits, such as a bigger budget, still waits for your approval.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Dubai business",
        intro:
          "We work with Dubai clients remotely from Bengaluru. The UAE is an hour and a half behind India, so our working day overlaps comfortably with yours.",
        steps: [
          {
            title: "Tell us the goal in one sentence",
            body: "For example: more viewing requests for off-plan apartments, or more consultation bookings for a clinic. The system assembles a draft plan in minutes, covering platforms, audiences, budget split and the follow-up sequence.",
          },
          {
            title: "Connect your own accounts",
            body: "You sign in to Meta, Google and any other platforms yourself. The ad accounts and the billing stay in your company's name. We never see or store your passwords.",
          },
          {
            title: "Review the staged campaigns",
            body: "The Campaign Launcher builds every campaign in a paused state. You see the ads, the audiences, the English or Arabic copy and the daily budget before anything is spent.",
          },
          {
            title: "Go live on UAE time",
            body: "The Scheduler agent runs during your working week and hours, not ours. WhatsApp follow-ups and AI calls go out when your team is available to pick up the conversation, so leads aren't contacted at odd hours.",
          },
          {
            title: "Qualify and hand over",
            body: "The Qualifier scores each lead, the Enrichment agent fills in missing details, and the Follow-up agent keeps WhatsApp conversations moving. Leads that are ready to talk go straight to you or your sales team.",
          },
          {
            title: "Read the weekly report",
            body: "Every week the Report Writer sends a plain-English summary: what ran, what it cost, what changed and what we suggest next.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing for UAE clients",
        paragraphs: [
          "You buy credits in US dollars, with no retainer or subscription: 2,500 credits cost $9.99, and they are used only when the agents do something, such as finding a lead, handling a WhatsApp conversation, making a call or building a campaign. Ad spend is separate: it goes straight from your card to Meta, Google, LinkedIn or whichever platform shows the ad, inside your own ad account.",
          "That split matters. You can see every bit of media spend in each platform's own billing, and we never sit in the middle of it. Our invoice comes from Triple-Seven BoostMySites AI Solutions Private Limited, a company registered in India; your accountant can advise how a foreign service invoice is treated in your books.",
        ],
      },
      {
        kind: "callout",
        heading: "Your accounts, your approval, your off switch",
        body: "Every campaign is staged paused and nothing spends until you approve it. Campaigns run in your own ad accounts on your own billing, you sign in yourself, and one click pauses everything if you need to stop.",
      },
      {
        kind: "prose",
        heading: "Working with us from Dubai",
        paragraphs: [
          "We don't have an office in the UAE, and we won't pretend otherwise. Our team works from Bengaluru with clients in Dubai entirely online: onboarding over a video call, day-to-day questions on WhatsApp at +91 96329 53355, and everything else visible in your dashboard.",
          "For many Dubai businesses that is how they already prefer to work. Decisions are made on WhatsApp, approvals happen on a phone between meetings, and nobody needs to book a meeting room to read a report.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Dubai?",
        a: "No. We are based in Bengaluru, India, and work with Dubai clients remotely. You can reach us on WhatsApp at +91 96329 53355, and onboarding happens over a video call.",
      },
      {
        q: "Can you run ads in Arabic?",
        a: "Arabic ad copy can be included if you want it, alongside English. Tell us which audiences should see which language, and you approve every version before anything goes live.",
      },
      {
        q: "We sell property in Dubai. Is there anything different about property ads?",
        a: "Property advertising in Dubai has its own rules, and some ads need permit or registration details. You or your brokerage are responsible for those. We build the ads around the details you give us, and nothing launches until you approve it.",
      },
      {
        q: "What currency do I pay in?",
        a: "Credits are billed in US dollars: 2,500 credits cost $9.99, with no subscription. Ad spend is charged by the platforms directly to your own card in your own ad account.",
      },
      {
        q: "Can you guarantee a number of leads?",
        a: "No, and we would be wary of anyone who does. Results depend on your offer, budget, competition and season. What we can promise is that nothing spends without your approval and every change shows up in your weekly report.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead generation for real estate", href: "/industries/real-estate" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-AE",
      areaServed: "United Arab Emirates",
      priceLine: "2,500 credits for $9.99. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* UK                                                                  */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "uk",
    navLabel: "United Kingdom",
    cardSummary:
      "Google Search, LinkedIn and email-led lead generation for UK businesses, run on UK hours and billed in US dollars.",
    metaTitle: "Lead Generation Company UK | BoostMySites",
    metaDescription:
      "AI lead generation for UK businesses: Google, LinkedIn and Meta campaigns with email and phone follow-up on UK hours. Your accounts, your approval.",
    primaryPhrase: "lead generation company UK",
    eyebrow: "United Kingdom",
    h1: "An AI lead generation company for UK businesses",
    intro:
      "BoostMySites is an AI lead generation company that works remotely with UK businesses. Our agents plan and run campaigns on Google, LinkedIn, Meta and more, follow up enquiries by email, phone or WhatsApp during UK working hours, and explain what happened in a plain-English report every week. Everything runs in your own ad accounts and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for UK lead generation",
        intro:
          "UK buyers tend to research carefully, compare suppliers and search before they ever respond to an ad on social media. That shapes where the budget should go first.",
        items: [
          {
            title: "Google Search carries the intent",
            body: "For most UK service businesses, search is where demand shows up first. Someone typing a service plus their town is close to choosing a supplier. We build tight keyword groups, write ads that match each search and send people to a page that answers the question they actually asked.",
          },
          {
            title: "LinkedIn for B2B buyers",
            body: "For software, consultancies, recruitment, training and professional services, LinkedIn reaches buyers by job title, seniority and company size. Our LinkedIn outreach runs alongside the ads, with connection notes and messages you approve before anything is sent.",
          },
          {
            title: "Email for longer decisions",
            body: "UK B2B buyers still live in their inbox, and many decisions take weeks. Our email sequences keep in touch with leads who aren't ready yet, with a clear way to unsubscribe, so a good enquiry from March isn't forgotten by May.",
          },
          {
            title: "Meta for local and consumer services",
            body: "For home improvement, trades, clinics, fitness and other local services, Facebook and Instagram lead ads work well, especially with a tight radius around the towns you actually cover.",
          },
          {
            title: "YouTube for considered purchases",
            body: "Useful for explaining something people think hard about: a course, a renovation, a software product. We use it mostly to remind people who already visited your site, rather than for cold reach.",
          },
        ],
      },
      {
        kind: "table",
        heading: "UK ad costs: what drives them",
        intro:
          "We won't quote a UK cost per lead before seeing your account. A solicitor bidding on legal terms in London and a landscaper in a market town are not comparable, and an average would mislead both.",
        columns: ["Platform", "Typical use for UK businesses", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "Local trades and services, professional services, B2B software, education",
            "Keyword category (legal, finance and insurance-adjacent terms are crowded), London versus regional targeting, landing page quality",
          ],
          [
            "LinkedIn Ads",
            "B2B lead generation, recruitment, events and webinars",
            "Narrow job-title and seniority filters; the strength of the offer — a useful guide usually beats a hard sell",
          ],
          [
            "Meta (Facebook, Instagram)",
            "Home improvement, trades, clinics, fitness, local retail",
            "Radius size, how fresh the creative is, how many nearby competitors run similar offers",
          ],
          [
            "YouTube",
            "Considered purchases and retargeting",
            "Video quality and length, size of the audience you are retargeting",
          ],
          [
            "Email",
            "Nurturing new leads and re-engaging older enquiries",
            "No per-click media cost, but results depend on list quality, consent and sending responsibly",
          ],
        ],
        note: "Costs depend on your industry, the time of year and who else is bidding. We recommend a budget after reading your account, not before.",
      },
      {
        kind: "prose",
        heading: "Rules worth knowing before we contact UK leads",
        paragraphs: [
          "The UK has clear rules on marketing consent and personal data. Marketing emails, calls and messages are covered by data-protection and electronic-communications law, and numbers registered with the Telephone Preference Service need particular care. We set up follow-up so that emails, WhatsApp messages and AI calls go to people who asked to hear from you through your form or ad, with an easy way to opt out.",
          "We don't give legal advice and we won't claim a blanket compliance badge. If you work in a regulated sector such as financial services, healthcare or legal services, your compliance lead should review ad copy and follow-up scripts. Because you approve every message before it is used, that review fits naturally into the process.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a UK business",
        intro:
          "Our team is in Bengaluru, four and a half to five and a half hours ahead of the UK depending on the time of year. Your mornings overlap with our afternoons, and the agents themselves work to your clock.",
        steps: [
          {
            title: "Start with one sentence",
            body: "For example: more demo requests from UK finance teams for our software, or more quote requests for loft conversions in Bristol. A draft plan — platforms, keywords, audiences and budget split — comes back in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to Google Ads, LinkedIn and Meta yourself. If you already have ad accounts with history, we use them; that history is valuable and stays yours.",
          },
          {
            title: "Approve the paused campaigns",
            body: "Every campaign is staged paused. You check the keywords, audiences, copy and daily budget before a penny is spent.",
          },
          {
            title: "Run on UK hours",
            body: "The Scheduler agent follows UK time, including the clock changes. Follow-up emails, WhatsApp messages and AI calls go out during your working hours, not ours.",
          },
          {
            title: "Score and route",
            body: "The Qualifier and Enrichment agents tag each lead by fit and add company details where they are available, so your team calls the most promising people first.",
          },
          {
            title: "Weekly report",
            body: "The Report Writer sends a plain-English summary every week: spend, leads, what changed and what we would do next.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing for UK clients",
        paragraphs: [
          "UK clients buy credits in US dollars, not pounds sterling, so your card provider may apply its own exchange rate. 2,500 credits cost $9.99, there is no retainer or subscription, and credits are used only when the agents do something for you. Ad spend is separate and goes straight to Google, LinkedIn or Meta from your own ad account, in whatever currency that account uses.",
          "Our invoice comes from Triple-Seven BoostMySites AI Solutions Private Limited, an Indian company. Your accountant will know how to treat an overseas service invoice for VAT.",
        ],
      },
      {
        kind: "callout",
        heading: "Nothing spends without your sign-off",
        body: "Campaigns sit paused until you approve them. They run in ad accounts you own, on billing you control, and you log in yourself — we never see or store your passwords. One click pauses the lot.",
      },
      {
        kind: "prose",
        heading: "Working with us from the UK",
        paragraphs: [
          "We don't have a UK office and there is no UK phone number to call. We work with UK clients remotely: onboarding on a video call, questions on WhatsApp at +91 96329 53355, and everything else in your dashboard and weekly report.",
          "If you have worked with an offshore team before and found the gaps frustrating, the difference here is that the day-to-day work isn't waiting on a person in another time zone. The agents check your campaigns every 20 minutes, around the clock, and log every action so you can see exactly what happened while you were asleep.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a UK office or a UK phone number?",
        a: "No. We are based in Bengaluru, India, and work with UK clients remotely. The quickest way to reach us is WhatsApp on +91 96329 53355; onboarding happens on a video call.",
      },
      {
        q: "Can you bill us in pounds?",
        a: "No. Credits are billed in US dollars: 2,500 credits cost $9.99. Your ad spend is billed separately by Google, LinkedIn or Meta in your own ad account.",
      },
      {
        q: "Do you handle B2B lead generation on LinkedIn?",
        a: "Yes. We run LinkedIn Ads and LinkedIn outreach together, with email follow-up for people who aren't ready yet. You approve the audiences and every message template before anything goes out.",
      },
      {
        q: "Will you use our existing Google Ads account?",
        a: "Yes, and we prefer to. Its history is useful, and it stays in your name. You sign in yourself; we never see or store your password.",
      },
      {
        q: "Do you guarantee a number of leads?",
        a: "No. Results depend on your offer, market, budget and competition. We don't guarantee leads, sales or return on ad spend, but you will see every change we make and why in the weekly report.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Lead generation for IT and SaaS", href: "/industries/it-saas" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-GB",
      areaServed: "United Kingdom",
      priceLine: "2,500 credits for $9.99. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* USA                                                                 */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "usa",
    navLabel: "United States",
    cardSummary:
      "City- and state-targeted lead generation for US businesses, with phone and email follow-up on your local time.",
    metaTitle: "Lead Generation Company USA | BoostMySites",
    metaDescription:
      "AI lead generation for US businesses: Google, Meta and LinkedIn campaigns targeted by city or state, with follow-up on your local time. Billed in USD.",
    primaryPhrase: "lead generation company USA",
    eyebrow: "United States",
    h1: "An AI lead generation company for businesses in the USA",
    intro:
      "BoostMySites is an AI lead generation company that works remotely with businesses in the USA. Our agents plan, launch and monitor campaigns on Google, Meta, LinkedIn, YouTube and TikTok, then follow up each lead by phone and email during your local business hours. Your ad accounts stay yours, and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for US lead generation",
        intro:
          "The US is not one market. A roofing company in Texas, a software startup in California and a dental practice in New Jersey need very different mixes. These are the channels we usually weigh up.",
        items: [
          {
            title: "Google Search as the backbone",
            body: "For most US service businesses, search is where buyers start. Searches that include a city or near-me intent are close to a decision. We structure campaigns by service and by location so budget follows the areas you actually serve.",
          },
          {
            title: "Meta for local and consumer offers",
            body: "Facebook and Instagram are strong for home services, wellness, fitness, education and local consumer offers. Lead forms keep friction low; we add a qualifying question or two so you aren't calling people who simply tapped through.",
          },
          {
            title: "LinkedIn for B2B sellers",
            body: "If you sell to other businesses, LinkedIn reaches buyers by title, industry and company size. Paired with our LinkedIn outreach, it produces conversations with decision-makers rather than just impressions.",
          },
          {
            title: "YouTube and TikTok, tested carefully",
            body: "YouTube suits explainer and proof content you already have. TikTok can work for consumer brands whose creative feels native to the platform. We test both with capped budgets first and expand only when your results justify it.",
          },
          {
            title: "Phone and email follow-up",
            body: "WhatsApp is less central in the US than in many markets we work in. Many US leads expect a call or an email, so we lean on the AI calling agent and email sequences here, and use WhatsApp where your audience already does.",
          },
        ],
      },
      {
        kind: "table",
        heading: "US ad costs: why we don't publish a number",
        intro:
          "US ad costs vary enormously by metro area, state and industry. Anyone quoting a single US cost per lead before looking at your account is guessing. Here is how each platform is typically used and what tends to move the price.",
        columns: ["Platform", "Typical use for US businesses", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "Home services, legal, healthcare, local services, B2B software",
            "Metro-level competition, keyword category, bidding against national brands, landing page quality",
          ],
          [
            "Meta (Facebook, Instagram)",
            "Home services, wellness, fitness, education, e-commerce",
            "Audience size, creative fatigue, crowding around major shopping and holiday periods",
          ],
          [
            "LinkedIn Ads",
            "B2B software, professional services, recruiting",
            "Narrow targeting by title and company size; how compelling the offer is",
          ],
          [
            "YouTube",
            "Explainers, demos and retargeting",
            "Video quality, how well the audience is defined",
          ],
          [
            "TikTok",
            "Consumer brands and younger audiences",
            "Creative that feels native; recycled TV-style ads rarely work",
          ],
        ],
        note: "Costs depend on your industry, season and competition. We recommend a budget after reading your account, not before.",
      },
      {
        kind: "prose",
        heading: "Time zones and calling rules",
        paragraphs: [
          "The continental US spans four time zones, and India is roughly nine and a half to twelve and a half hours ahead depending on where you are and the time of year. That gap doesn't affect the agents. The Scheduler runs on your local time zone, so follow-up calls and emails go out during your business hours. If you serve customers in several zones, we set the schedule per campaign.",
          "US rules on automated calls and texts are strict, and consent matters. We set up the AI calling agent to work from leads who came in through your own forms and ads and asked to be contacted, and we recommend your own counsel reviews the consent wording on your forms. Every call script is something you approve before it is used.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a US business",
        intro:
          "Our team is in Bengaluru and works with US clients remotely. Live calls with us are usually set for your morning or late afternoon; the agents themselves work around the clock, on your clock.",
        steps: [
          {
            title: "One sentence to start",
            body: "For example: more booked estimates for kitchen remodels in Austin, or more demo requests from US mid-market companies. The system assembles a draft plan in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to Google Ads, Meta, LinkedIn and anything else yourself. The accounts and billing stay in your company's name, and we never see or store your passwords.",
          },
          {
            title: "Check the geography and approve",
            body: "Every campaign is staged paused. Before approving, you can see exactly which states, cities or ZIP code radiuses each campaign targets, along with the ads and daily budgets.",
          },
          {
            title: "Launch on your schedule",
            body: "Once you approve, the Campaign Launcher takes campaigns live. The Scheduler keeps follow-up inside your local working hours, whichever time zone you are in.",
          },
          {
            title: "Follow up and qualify",
            body: "The Qualifier scores each lead and the Enrichment agent fills gaps. The AI calling agent and email sequences reach out to the ones worth talking to, and hot leads are routed to your team.",
          },
          {
            title: "Weekly report",
            body: "A plain-English summary from the Report Writer every week: spend, leads, what changed and what is next.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing for US clients",
        paragraphs: [
          "You buy credits in US dollars, with no retainer or subscription: 2,500 credits cost $9.99, and they are used only when the agents do something, such as finding a lead, handling a WhatsApp conversation, making a call or building a campaign. Ad spend is separate and is billed by Google, Meta, LinkedIn and the other platforms directly to your card, in your own ad accounts.",
          "Our invoice comes from Triple-Seven BoostMySites AI Solutions Private Limited, a company registered in India. There is no markup on your media spend because it never passes through us.",
        ],
      },
      {
        kind: "callout",
        heading: "You hold the keys",
        body: "Campaigns are built paused and stay that way until you approve them. They run in your ad accounts, charged to your card, and you sign in yourself. If you want everything stopped, one click pauses all of it.",
      },
      {
        kind: "prose",
        heading: "Working with us from the US",
        paragraphs: [
          "We don't have a US office or a US phone number. We work with American clients remotely: onboarding on a video call, questions on WhatsApp at +91 96329 53355 or by email, and a dashboard that shows what the agents are doing in real time.",
          "Because the agents log every action they take, you don't have to wait for our working day to know what happened overnight. Open the dashboard in the morning and the log shows each check, each change and the reason for it.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have a US office?",
        a: "No. We are based in Bengaluru, India, and work with US clients remotely. Reach us on WhatsApp at +91 96329 53355 or by email, and we will set up a video call at a time that suits your time zone.",
      },
      {
        q: "Can you target just my city or state?",
        a: "Yes. Campaigns can be limited to specific states, cities or a radius around a ZIP code, and you see the exact geography on every campaign before approving it.",
      },
      {
        q: "How do you handle different US time zones?",
        a: "The Scheduler agent runs on your local time zone. If you serve several zones, each campaign can follow its own schedule so leads are contacted during sensible local hours.",
      },
      {
        q: "Will the AI calling agent cold-call people?",
        a: "We set it up to call leads who came through your own forms and ads and asked to be contacted. US calling rules are strict, so we recommend your counsel reviews your consent wording, and you approve every script.",
      },
      {
        q: "Is ad spend included in the price of credits?",
        a: "No. Credits (2,500 for $9.99) pay for what the agents do, such as leads found, conversations handled and campaigns built. Ad spend is paid directly to the platforms from your own ad accounts.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead scoring and CRM", href: "/services/leads-crm" },
      { label: "Lead generation for IT and SaaS", href: "/industries/it-saas" },
      { label: "Lead generation for e-commerce", href: "/industries/ecommerce" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-US",
      areaServed: "United States",
      priceLine: "2,500 credits for $9.99. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* SINGAPORE                                                           */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "singapore",
    navLabel: "Singapore",
    cardSummary:
      "Google, LinkedIn and WhatsApp-led lead generation for Singapore businesses, with room to expand across the region.",
    metaTitle: "Lead Generation Company Singapore | BoostMySites",
    metaDescription:
      "AI lead generation for Singapore: Google, Meta and LinkedIn campaigns with WhatsApp follow-up, ready to expand regionally. Billed in USD.",
    primaryPhrase: "lead generation company Singapore",
    eyebrow: "Singapore",
    h1: "An AI lead generation company for Singapore businesses",
    intro:
      "BoostMySites is an AI lead generation company that works remotely with Singapore businesses. Our agents run your Google, Meta and LinkedIn campaigns, follow up leads on WhatsApp and email, and can extend into neighbouring markets once Singapore is working. Ad accounts stay in your name and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for lead generation in Singapore",
        intro:
          "Singapore is small, dense and very online. Your audience is easy to reach — but so is everyone else's, so precision matters more than volume.",
        items: [
          {
            title: "Google Search for active buyers",
            body: "People in Singapore search before they commit, whether it is tuition, renovation, a clinic or business software. When your service is something people actively look for, search is usually where budget should go first.",
          },
          {
            title: "WhatsApp for the conversation",
            body: "WhatsApp is widely used for business conversations in Singapore. Click-to-WhatsApp ads and prompt WhatsApp follow-up keep leads warm without forcing a phone call on people who would rather type.",
          },
          {
            title: "LinkedIn for regional decision-makers",
            body: "Many companies run their regional operations from Singapore. For B2B services, LinkedIn Ads plus outreach reach decision-makers whose remit often covers the wider region, not just the island.",
          },
          {
            title: "Meta for home, education and lifestyle",
            body: "Instagram and Facebook suit renovation and interior design, enrichment classes, beauty, fitness and food. Area targeting helps when you only serve certain parts of the island.",
          },
          {
            title: "A base for regional expansion",
            body: "The same ad accounts can target Malaysia, Indonesia, the Philippines and beyond, so Singapore businesses often prove an offer at home before spending regionally. We build separate campaigns per country so the results don't blur together.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Singapore ad costs in context",
        intro:
          "There is no single Singapore rate worth publishing. Your industry, your offer and how many others are bidding decide the cost, and in a small market a few large advertisers can move prices in a niche.",
        columns: ["Platform", "Typical use for Singapore businesses", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "Tuition and enrichment, renovation, clinics, professional services, B2B software",
            "Concentrated competition in a small market; a handful of heavy bidders can shift a whole category",
          ],
          [
            "Meta (Instagram, Facebook)",
            "Interior design, education, beauty, fitness, consumer offers",
            "Creative fatigue sets in quickly when the audience is small, so fresh variations matter",
          ],
          [
            "LinkedIn Ads",
            "B2B services, regional decision-makers, recruitment",
            "Seniority filters, and whether you target Singapore only or the wider region",
          ],
          [
            "YouTube",
            "Explainers, course previews, property and showroom walk-throughs",
            "Video quality; retargeting past visitors versus reaching new people",
          ],
          [
            "TikTok",
            "Consumer brands and younger audiences",
            "Creative that suits the platform rather than polished corporate video",
          ],
        ],
        note: "Costs depend on industry, season and competition. We recommend a budget after reading your account and goals.",
      },
      {
        kind: "prose",
        heading: "Language and consent in Singapore",
        paragraphs: [
          "English works for most Singapore campaigns. If part of your audience responds better to Chinese, Malay or Tamil, ad copy in those languages can be included if you want it; you or a native speaker on your team approve it before anything goes live.",
          "Singapore has a personal data protection law and a Do Not Call Registry. We set up follow-up so that WhatsApp messages, emails and AI calls go to people who submitted your form or asked to be contacted, with a simple way to opt out. For anything specific to your sector, your own adviser should have the final word, and because every message template is approved by you, there is a clear point for that review.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Singapore business",
        intro:
          "Singapore is two and a half hours ahead of our team in Bengaluru, so most of your working day overlaps with ours. The agents themselves run on Singapore time.",
        steps: [
          {
            title: "Describe the goal",
            body: "One sentence is enough — for example, more trial classes booked for a primary school tuition centre, or more discovery calls with regional HR heads for a training firm. A draft plan comes back in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to each platform yourself. Ad accounts and billing stay in your company's name; we never see or store your passwords.",
          },
          {
            title: "Approve what is staged",
            body: "Campaigns are built paused. You review audiences, copy, languages and daily budgets before anything is spent.",
          },
          {
            title: "Run on Singapore time",
            body: "The Scheduler agent keeps follow-ups and AI calls within your business hours and quiet on the days you choose.",
          },
          {
            title: "Qualify and route",
            body: "The Qualifier scores each lead, the Enrichment agent adds what it can, and promising leads go to your team with the conversation history attached.",
          },
          {
            title: "Expand when it works",
            body: "Once Singapore campaigns are steady, we can draft separate campaigns for other markets — staged paused for your approval, like everything else.",
          },
          {
            title: "Weekly report",
            body: "The Report Writer sends a plain-English summary every week, split by market if you run more than one.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing for Singapore clients",
        paragraphs: [
          "Singapore clients buy credits in US dollars rather than Singapore dollars. 2,500 credits cost $9.99, with no retainer or subscription, and they are used only when the agents do something for you. Ad spend is separate and goes directly to Google, Meta, LinkedIn and the other platforms from your own ad accounts.",
          "Our invoice is issued by Triple-Seven BoostMySites AI Solutions Private Limited in India. Your accountant can advise on how an overseas service invoice is treated for your company.",
        ],
      },
      {
        kind: "callout",
        heading: "Paused until you say go",
        body: "Nothing spends until you approve it. Campaigns live in your own ad accounts and billing, you sign in yourself, and a single click pauses every campaign across every platform.",
      },
      {
        kind: "prose",
        heading: "Working with us from Singapore",
        paragraphs: [
          "We don't have an office in Singapore. Our team is in Bengaluru and works with Singapore clients online: onboarding on a video call, WhatsApp at +91 96329 53355 for questions, and a dashboard with a log of every action the agents take.",
          "The small time difference makes this easy in practice. A question you send in the morning usually lands while our team is already at work, and approvals can happen the same day.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Singapore?",
        a: "No. We are based in Bengaluru, India, and work with Singapore clients remotely. WhatsApp us at +91 96329 53355 and we will set up a video call.",
      },
      {
        q: "Can you bill in Singapore dollars?",
        a: "No. Credits are billed in US dollars: 2,500 credits cost $9.99. Ad spend is billed separately by each platform in your own ad account.",
      },
      {
        q: "Can campaigns also cover Malaysia or Indonesia?",
        a: "Yes. We build separate campaigns per country so you can see results market by market, and each one is staged paused for your approval before it spends.",
      },
      {
        q: "Can ads be in Chinese, Malay or Tamil?",
        a: "Copy in those languages can be included if you want it. We recommend someone on your team who speaks the language approves it, and nothing goes live until you do.",
      },
      {
        q: "How are new leads followed up?",
        a: "The Follow-up agent picks up new leads automatically and replies on WhatsApp or email during the hours you set, so leads aren't left waiting for someone to check an inbox.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Lead generation for education", href: "/industries/education" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-SG",
      areaServed: "Singapore",
      priceLine: "2,500 credits for $9.99. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* BENGALURU (only city with an office)                                */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "bengaluru",
    navLabel: "Bengaluru",
    cardSummary:
      "AI-run ads and WhatsApp follow-up for Bengaluru businesses, from our office in JP Nagar. GST invoice included.",
    metaTitle: "Digital Marketing Agency Bengaluru | BoostMySites",
    metaDescription:
      "Bengaluru digital marketing agency run by AI agents: Google, Meta and LinkedIn ads with WhatsApp follow-up. Office in JP Nagar. Credits from ₹899 + GST.",
    primaryPhrase: "digital marketing agency Bengaluru",
    eyebrow: "Bengaluru · Karnataka",
    h1: "A digital marketing agency in Bengaluru, run by AI agents",
    intro:
      "BoostMySites is a Bengaluru digital marketing agency built around AI: our agents plan, launch and watch your ads on Google, Meta, LinkedIn and more, then follow up every lead on WhatsApp and by phone. We are headquartered in JP Nagar, campaigns run in your own ad accounts, and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for Bengaluru businesses",
        intro:
          "Bengaluru combines a large technology sector with a fast-growing consumer city. The right channel depends heavily on which side of that you sell to.",
        items: [
          {
            title: "LinkedIn for tech and B2B",
            body: "For SaaS companies, IT services firms, staffing agencies and B2B startups, LinkedIn reaches founders, engineering leaders and HR heads by title and company. Our LinkedIn outreach runs alongside the ads, with every message approved by you.",
          },
          {
            title: "Google Search by locality",
            body: "Clinics, coaching centres, interior designers, packers and movers and property developers all get searches tied to an area — Whitefield, HSR Layout, Sarjapur Road, JP Nagar. We build campaigns around the localities you actually serve.",
          },
          {
            title: "Instagram and Facebook for the consumer city",
            body: "Meta drives enquiries for apartment interiors, new residential projects, restaurants, salons and courses. Lead forms with a couple of qualifying questions filter out casual taps before they reach your phone.",
          },
          {
            title: "WhatsApp for every reply",
            body: "Bengaluru customers expect to hear back on WhatsApp. The Follow-up agent picks up each new lead, sends the first message and keeps the conversation going until the lead books or opts out.",
          },
          {
            title: "YouTube for longer stories",
            body: "Project walk-throughs, course previews and founder explainers. YouTube works best here as a way to re-engage people who already visited your site or filled in half a form.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Ad costs in Bengaluru: what drives them",
        intro:
          "We don't publish a Bengaluru cost per lead, because there isn't an honest single figure. An enterprise software demo and a weekend pottery class are different businesses with different economics.",
        columns: ["Platform", "Typical use for Bengaluru businesses", "What tends to move cost"],
        rows: [
          [
            "LinkedIn Ads",
            "B2B SaaS, IT services, staffing, corporate training",
            "Narrow job-title and company filters; other tech companies targeting the same buyers",
          ],
          [
            "Google Search",
            "Clinics, coaching, interiors, real estate, home services",
            "Locality and keyword competition; property and education terms attract many bidders",
          ],
          [
            "Meta (Instagram, Facebook)",
            "Interiors, residential projects, food, beauty, education",
            "How fresh the creative is, area targeting, festive-season competition",
          ],
          [
            "YouTube",
            "Walk-throughs, course previews, product demos",
            "Video quality and the size of your retargeting audience",
          ],
        ],
        note: "Costs depend on industry, season and competition. We recommend a budget once we have read your account and goals.",
      },
      {
        kind: "prose",
        heading: "Language, localities and timing in Bengaluru",
        paragraphs: [
          "Most Bengaluru campaigns run in English, and Kannada copy can be added for audiences where it connects better — local services, for instance, or residential projects aimed at long-time residents. You approve every version before it runs.",
          "Locality matters more here than in many cities. With the traffic, people prefer a clinic, school or showroom close to home or work, so we target by area rather than the whole city when that is how your customers decide. Timing matters too: many consumer categories get busier around festivals, and education demand follows the admission calendar. Rather than assume a fixed pattern, the agents check your numbers every 20 minutes and adjust within the limits you set.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Bengaluru business",
        steps: [
          {
            title: "One sentence, one plan",
            body: "Tell us the goal — say, more site visits for a 3BHK project on Sarjapur Road, or more demo requests from mid-size Indian companies for an HR tool. A draft plan is assembled in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to Google, Meta and LinkedIn yourself. Ad accounts and billing stay in your name; we never see or store your passwords.",
          },
          {
            title: "Approve the paused campaigns",
            body: "The Campaign Launcher stages everything paused. You check localities, audiences, copy and daily budgets before any rupee is spent.",
          },
          {
            title: "Live during your business hours",
            body: "The Scheduler keeps WhatsApp follow-ups and AI calls inside the days and hours you choose, so a lead isn't rung at dinner time unless you want them to be.",
          },
          {
            title: "Qualify and call",
            body: "The Qualifier scores every lead, the Enrichment agent fills in missing details, and the AI calling agent rings the hot ones. Everything lands in the built-in CRM.",
          },
          {
            title: "Weekly report",
            body: "Every week the Report Writer sends a plain-English summary of spend, leads, changes and next steps.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing and GST",
        paragraphs: [
          "Credits start at ₹899 + GST for 2,500, with no retainer or subscription. You receive a GST invoice from Triple-Seven BoostMySites AI Solutions Private Limited, our Bengaluru company. If your business is GST-registered, your accountant can confirm whether you can claim input tax credit on it.",
          "Credits are used only when the agents do something, such as finding a lead, handling a conversation or building a campaign, and they never expire. Ad spend is separate: you pay Google, Meta and the other platforms directly from your own ad accounts, and they invoice you for it.",
        ],
      },
      {
        kind: "callout",
        heading: "Approval first, always",
        body: "Campaigns are created paused and nothing spends until you approve. They run in your own ad accounts with your own payment method, you sign in yourself, and one click pauses every campaign at once.",
      },
      {
        kind: "prose",
        heading: "Our office in Bengaluru",
        paragraphs: [
          "BoostMySites has been based in Bengaluru since 2017. Our office is at #137, 3rd Main Cross, Dollars Colony, 4th Phase JP Nagar, Bengaluru, Karnataka 560076.",
          "Most clients work with us online — onboarding on a video call, questions on WhatsApp at +91 96329 53355 — but if you would rather sit down in person, message us first and we will set a time at the office.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can I meet your team in person?",
        a: "Yes. Our office is in 4th Phase JP Nagar, Bengaluru. Message us on WhatsApp at +91 96329 53355 first so we can set a time.",
      },
      {
        q: "Do you work with startups?",
        a: "Yes. The system is built for businesses that need leads without hiring a full marketing team. There is no retainer: credits start at ₹899 + GST for 2,500, and ad spend is whatever you choose to give the platforms.",
      },
      {
        q: "Can ads be in Kannada?",
        a: "Kannada copy can be included alongside English if you want it. You approve every version before it goes live.",
      },
      {
        q: "Is GST included in the price?",
        a: "No. You buy credits (2,500 for ₹899 + GST) and receive a GST invoice. Ad spend is billed separately by the platforms.",
      },
      {
        q: "Do you guarantee leads?",
        a: "No. We don't guarantee leads, sales or return on ad spend. Results depend on your offer, budget and competition. You approve everything before it spends and see every change in the weekly report.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead generation for IT and SaaS", href: "/industries/it-saas" },
      { label: "Lead generation for interior designers", href: "/industries/interior-designers" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-IN",
      areaServed: "Bengaluru, Karnataka, India",
      priceLine: "2,500 credits for ₹899 + GST. No retainer, no subscription",
      officeAddress:
        "#137, 3rd Main Cross, Dollars Colony, 4th Phase JP Nagar, Bengaluru, Karnataka 560076",
    },
  },

  /* ------------------------------------------------------------------ */
  /* MUMBAI                                                              */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "mumbai",
    navLabel: "Mumbai",
    cardSummary:
      "AI-run campaigns for Mumbai's finance, property and consumer brands, targeted by suburb and followed up on WhatsApp.",
    metaTitle: "Digital Marketing Agency Mumbai | BoostMySites",
    metaDescription:
      "AI-run digital marketing for Mumbai businesses: Google, Meta and LinkedIn ads targeted by suburb, WhatsApp follow-up, GST invoice, no retainer.",
    primaryPhrase: "digital marketing agency Mumbai",
    eyebrow: "Mumbai · Maharashtra",
    h1: "An AI-powered digital marketing agency for Mumbai businesses",
    intro:
      "BoostMySites is an AI-powered digital marketing agency for Mumbai businesses. Our agents plan and run your ads on Meta, Google, LinkedIn and YouTube, then follow up every lead on WhatsApp and by phone, so enquiries don't sit unanswered between meetings. We work with Mumbai clients remotely from Bengaluru; your ad accounts stay yours and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for Mumbai businesses",
        intro:
          "Mumbai runs on finance, property, media, trade and a huge consumer market spread across the wider metropolitan region. Channel choice follows that mix.",
        items: [
          {
            title: "Google Search, suburb by suburb",
            body: "Chartered accountants, financial advisers, clinics, coaching institutes and home services all get searched by area — Andheri, Powai, Thane, Navi Mumbai. Search catches people who already know what they need and want someone nearby.",
          },
          {
            title: "Instagram for brands and launches",
            body: "Instagram is central for D2C brands, fashion, food, salons and new residential launches. Lead forms and click-to-WhatsApp ads turn a scroll into a conversation without making anyone visit a website.",
          },
          {
            title: "LinkedIn for corporate buyers",
            body: "For financial services, B2B services, media and corporate training sold to the many companies headquartered in the city, LinkedIn reaches decision-makers by title and industry.",
          },
          {
            title: "WhatsApp for follow-up",
            body: "Mumbai does business on WhatsApp. Leads expect a reply there, and the Follow-up agent sends it automatically during your business hours, then keeps the thread going.",
          },
          {
            title: "YouTube for explaining",
            body: "Financial products, property projects and courses often need more than a short ad. YouTube gives room to explain, and works especially well for re-engaging people who already showed interest.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Ad costs in Mumbai: what drives them",
        intro:
          "Some of the most competitive ad categories in India — property and financial services among them — are concentrated in Mumbai. Even so, a single published figure would mislead you, because your niche, area and offer decide the cost.",
        columns: ["Platform", "Typical use for Mumbai businesses", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "CA and finance services, clinics, education, home services, legal",
            "Finance and property terms draw many bidders; targeting one suburb versus the whole region",
          ],
          [
            "Meta (Instagram, Facebook)",
            "D2C and e-commerce, residential launches, food, beauty, events",
            "Festive-season competition from large brands; creative fatigue",
          ],
          [
            "LinkedIn Ads",
            "Financial services, B2B services, corporate training, media",
            "Job-title and seniority filters; narrow professional audiences",
          ],
          [
            "YouTube",
            "Financial explainers, project walk-throughs, courses",
            "Video length and quality; size of the retargeting audience",
          ],
        ],
        note: "Costs depend on industry, season and competition. We recommend a budget after reading your account and goals.",
      },
      {
        kind: "prose",
        heading: "Regulated categories, language and geography",
        paragraphs: [
          "A lot of Mumbai advertising sits in categories with extra rules: investment and lending products, insurance, healthcare and real estate. Ad platforms apply their own policies to financial services, and regulators have their own requirements. If you are in one of these categories, your compliance team approves the copy — and because every campaign is staged paused, there is a natural checkpoint before anything goes live.",
          "Most campaigns here run in English, and Hindi or Marathi copy can be included where it suits the audience, such as local services or residential projects. Geography matters as much as language. A clinic in Borivali rarely wants clicks from Navi Mumbai, and a Thane developer may want buyers commuting from specific suburbs. We target by area so budget follows the places your customers actually come from.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Mumbai business",
        intro:
          "We work with Mumbai clients remotely: same time zone, same working week, and most approvals happen on WhatsApp.",
        steps: [
          {
            title: "Give us the goal",
            body: "For example: more consultations for tax filing and GST services in Andheri, or more enquiries for a new launch in Thane. The system assembles a draft plan in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to each ad platform yourself. Accounts and billing stay in your company's name, and we never see or store your passwords.",
          },
          {
            title: "Compliance and approval",
            body: "Campaigns are staged paused. You — and your compliance team if you have one — review the copy, audiences, areas and budgets before anything spends.",
          },
          {
            title: "Launch and schedule",
            body: "Once approved, campaigns go live. The Scheduler keeps follow-up messages and calls inside the hours you set.",
          },
          {
            title: "Qualify and call",
            body: "The Qualifier scores each lead, the Enrichment agent fills gaps, and the AI calling agent rings the promising ones so your team spends time on real conversations.",
          },
          {
            title: "Weekly report",
            body: "The Report Writer sends a plain-English summary each week covering spend, leads, what changed and what we would do next.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing and GST for Mumbai clients",
        paragraphs: [
          "Credits start at ₹899 + GST for 2,500, with no retainer or subscription, invoiced with a proper GST invoice from Triple-Seven BoostMySites AI Solutions Private Limited. Your accountant can confirm how the input credit applies to your business.",
          "Credits are used only when the agents do something for you, and they never expire. Ad spend is paid directly to Meta, Google, LinkedIn and others from your own ad accounts, and those platforms bill you for it themselves.",
        ],
      },
      {
        kind: "callout",
        heading: "Your money moves only when you say so",
        body: "Campaigns wait in a paused state until you approve them. They run in ad accounts you own, on your billing, with you signing in yourself. One click stops everything.",
      },
      {
        kind: "prose",
        heading: "Working with us from Mumbai",
        paragraphs: [
          "We don't have a Mumbai office. Our team is based in Bengaluru and works with Mumbai clients remotely: onboarding on a video call, questions on WhatsApp at +91 96329 53355, and a dashboard that logs every action the agents take.",
          "For busy founders and partners that tends to suit the city's pace. Approvals take a minute on the phone, and the weekly report is written to be read on the commute.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Mumbai?",
        a: "No. We are based in Bengaluru and work with Mumbai clients remotely. Reach us on WhatsApp at +91 96329 53355.",
      },
      {
        q: "Can you advertise financial products?",
        a: "We can run campaigns for financial services businesses, but ads must meet platform policies and the rules for your category. Your compliance team approves the copy, and nothing goes live without that approval.",
      },
      {
        q: "Can ads be in Hindi or Marathi?",
        a: "Yes, Hindi or Marathi copy can be included alongside English if you want it. You approve each version before it runs.",
      },
      {
        q: "Can you target only certain suburbs?",
        a: "Yes. Campaigns can be limited to specific areas or a radius around your location, and you see the targeting on each campaign before approving it.",
      },
      {
        q: "How is billing handled?",
        a: "Credits start at ₹899 + GST for 2,500, with a GST invoice and no retainer. Ad spend is separate and paid directly to the platforms from your own ad accounts.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead generation for CA and finance", href: "/industries/ca-finance" },
      { label: "Lead generation for real estate", href: "/industries/real-estate" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-IN",
      areaServed: "Mumbai, Maharashtra, India",
      priceLine: "2,500 credits for ₹899 + GST. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* DELHI NCR                                                           */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "delhi-ncr",
    navLabel: "Delhi NCR",
    cardSummary:
      "City-by-city campaigns across Delhi, Gurugram, Noida, Ghaziabad and Faridabad, with Hindi copy where it helps.",
    metaTitle: "Digital Marketing Agency Delhi NCR | BoostMySites",
    metaDescription:
      "AI-driven digital marketing across Delhi NCR: campaigns split by city, Hindi and English ads, WhatsApp follow-up. Credits from ₹899 + GST.",
    primaryPhrase: "digital marketing agency Delhi NCR",
    eyebrow: "Delhi NCR",
    h1: "An AI-driven digital marketing agency for Delhi NCR",
    intro:
      "BoostMySites is an AI-driven digital marketing agency for businesses across Delhi NCR. Our agents plan and run campaigns on Google, Meta, YouTube and LinkedIn, target the specific parts of Delhi, Gurugram, Noida, Ghaziabad or Faridabad you serve, and follow up every lead on WhatsApp and by phone. We work remotely, your ad accounts stay yours, and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter across Delhi NCR",
        intro:
          "NCR is several cities across Delhi, Haryana and Uttar Pradesh that people talk about as one region. Good campaigns respect the differences between them.",
        items: [
          {
            title: "Google Search for education, health and services",
            body: "Coaching institutes, schools, clinics and hospitals, legal practices and home services get heavy search demand. Targeting by city or locality stops a Dwarka clinic paying for clicks from Greater Noida.",
          },
          {
            title: "Instagram and Facebook for launches and retail",
            body: "Meta carries residential launches in Gurugram and Noida, fashion and retail, restaurants and education offers. Lead forms with qualifying questions help filter very large audiences down to people worth calling.",
          },
          {
            title: "YouTube for demo lessons and walk-throughs",
            body: "Coaching and education businesses use YouTube heavily for demo lessons and explainers, and property developers use it for project walk-throughs. It works well for re-engaging people who already showed interest.",
          },
          {
            title: "LinkedIn for corporate Gurugram and Noida",
            body: "Gurugram and Noida host many corporate offices, IT companies and startups. For B2B services, LinkedIn Ads and outreach reach HR, finance and technology leaders directly.",
          },
          {
            title: "WhatsApp to close the loop",
            body: "Leads here respond on WhatsApp far more readily than by email. The Follow-up agent picks up each enquiry automatically and keeps the conversation moving until it turns into a visit, a demo class or a call.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Ad costs in Delhi NCR: what drives them",
        intro:
          "Education and real estate are among the most crowded ad categories in NCR, but your cost depends on your niche, your locality and your offer, not a regional average.",
        columns: ["Platform", "Typical use in Delhi NCR", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "Coaching and test prep, schools, clinics, legal, home services",
            "Admission-season competition in education; how widely you target across the region",
          ],
          [
            "Meta (Instagram, Facebook)",
            "Residential launches, retail and fashion, food, education",
            "Festive-season competition; creative fatigue in large audiences",
          ],
          [
            "YouTube",
            "Demo lessons, explainers, project walk-throughs",
            "Video quality and the size of your retargeting audience",
          ],
          [
            "LinkedIn Ads",
            "B2B services selling to corporates in Gurugram and Noida",
            "Seniority filters and narrow professional audiences",
          ],
        ],
        note: "Costs depend on industry, season and competition. We recommend a budget after reading your account and goals.",
      },
      {
        kind: "prose",
        heading: "Language and geography in NCR",
        paragraphs: [
          "Hindi copy often connects better with consumer and education audiences in NCR, while corporate B2B buyers mostly expect English. We can run both side by side, with Hindi included where you want it, and let your own results decide which version gets more budget. You approve every version first.",
          "Geography is the other big lever. Delhi, Gurugram, Noida, Ghaziabad and Faridabad behave like separate markets, with different price points, commuting patterns and competitors. We usually split campaigns by city so you can see which areas produce real enquiries, then shift budget accordingly within limits you approve.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Delhi NCR business",
        intro:
          "We work with NCR clients remotely from Bengaluru — same time zone, same working week.",
        steps: [
          {
            title: "Set the goal",
            body: "For example: more demo classes booked for JEE coaching in South Delhi, or more site visits for a residential project on Dwarka Expressway. A draft plan comes back in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to Google, Meta, YouTube and LinkedIn yourself. Accounts and billing stay in your name; we never see or store your passwords.",
          },
          {
            title: "Approve the city split",
            body: "Campaigns are staged paused, usually one per city or cluster of localities. You check areas, languages, copy and budgets before anything spends.",
          },
          {
            title: "Schedule around your audience",
            body: "The Scheduler runs follow-up during the hours you set. Education businesses, for instance, can schedule calls for the evening when parents are more likely to pick up.",
          },
          {
            title: "Qualify and call",
            body: "The Qualifier scores each lead, the AI calling agent rings the promising ones, and everything is logged in the built-in CRM for your counsellors or sales team.",
          },
          {
            title: "Weekly report",
            body: "A plain-English summary every week, broken down by city, from the Report Writer agent.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing and GST for NCR clients",
        paragraphs: [
          "Credits start at ₹899 + GST for 2,500, with no retainer or subscription, and you receive a GST invoice from Triple-Seven BoostMySites AI Solutions Private Limited. Ask your accountant how input credit applies to your registration.",
          "Credits are used only when the agents do something for you, and a quiet week costs nothing. Ad spend is separate and goes directly to the platforms from your own ad accounts — useful for institutes that want media spend visible line by line during admission season.",
        ],
      },
      {
        kind: "callout",
        heading: "Staged, paused, yours",
        body: "Every campaign is built paused and nothing spends until you approve. Your own ad accounts, your own billing, your own login — and one click to pause the whole lot.",
      },
      {
        kind: "prose",
        heading: "Working with us from Delhi NCR",
        paragraphs: [
          "We don't have an office anywhere in NCR. Our team is in Bengaluru and works with NCR clients online: onboarding on a video call, questions on WhatsApp at +91 96329 53355, and a dashboard that logs every action the agents take.",
          "That arrangement suits multi-location businesses especially well. A coaching chain with centres in three cities can see each centre's campaigns and leads separately without anyone needing to travel between them.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Delhi?",
        a: "No. We are based in Bengaluru and work with clients across Delhi NCR remotely. WhatsApp us at +91 96329 53355.",
      },
      {
        q: "Can you run ads in Hindi?",
        a: "Yes, Hindi copy can be included alongside English if you want it. You approve every version before it goes live.",
      },
      {
        q: "Can you target only Gurugram, or only Noida?",
        a: "Yes. Campaigns can be limited to one city or specific localities, and we often split them by city so you can compare results.",
      },
      {
        q: "We are a coaching institute. Can you plan around admission season?",
        a: "Yes. We plan budgets around your admission calendar, and the agents check costs every 20 minutes, so spend can be raised within limits you approve when demand peaks and pulled back when the season ends.",
      },
      {
        q: "Is GST extra?",
        a: "Yes. You buy credits (2,500 for ₹899 + GST) and receive a GST invoice. Ad spend is billed separately by the platforms.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead generation for education", href: "/industries/education" },
      { label: "Lead generation for real estate", href: "/industries/real-estate" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-IN",
      areaServed: "Delhi NCR, India",
      priceLine: "2,500 credits for ₹899 + GST. No retainer, no subscription",
    },
  },

  /* ------------------------------------------------------------------ */
  /* HYDERABAD                                                           */
  /* ------------------------------------------------------------------ */
  {
    kind: "location",
    slug: "hyderabad",
    navLabel: "Hyderabad",
    cardSummary:
      "AI-run campaigns for Hyderabad's tech, healthcare, education and property businesses, with Telugu copy if you want it.",
    metaTitle: "Digital Marketing Agency Hyderabad | BoostMySites",
    metaDescription:
      "AI-led digital marketing for Hyderabad: Google, Meta and LinkedIn campaigns, Telugu or English copy, WhatsApp follow-up. Credits from ₹899 + GST.",
    primaryPhrase: "digital marketing agency Hyderabad",
    eyebrow: "Hyderabad · Telangana",
    h1: "An AI-led digital marketing agency for Hyderabad businesses",
    intro:
      "BoostMySites is an AI-led digital marketing agency for Hyderabad businesses. Our agents plan and run campaigns on Google, Meta, LinkedIn and YouTube, follow up every lead on WhatsApp and by phone, and send you a plain-English report every week. We work remotely from Bengaluru; your ad accounts stay yours and nothing spends until you approve it.",
    blocks: [
      {
        kind: "points",
        heading: "Which platforms matter for Hyderabad businesses",
        intro:
          "Hyderabad pairs a large technology and life-sciences sector with a growing residential and consumer market. The channel mix follows which of those you sell to.",
        items: [
          {
            title: "LinkedIn for the tech corridor",
            body: "Technology companies and large corporate offices cluster around HITEC City, Gachibowli and the financial district. For IT services, SaaS, staffing and corporate training, LinkedIn Ads and outreach reach the people who sign off on purchases.",
          },
          {
            title: "Google Search for healthcare and education",
            body: "Hospitals and clinics, diagnostic centres, coaching institutes and study-abroad consultancies get steady search demand. People searching for these services usually want to talk to someone soon.",
          },
          {
            title: "Instagram and Facebook for homes and lifestyle",
            body: "New residential projects, interior design, restaurants, salons and events do well on Meta. Lead forms with a qualifying question keep your team from chasing casual interest.",
          },
          {
            title: "YouTube in Telugu and English",
            body: "YouTube is a strong channel for explainer content, course previews and property walk-throughs, and Telugu-language video can reach audiences that English ads miss.",
          },
          {
            title: "WhatsApp for every follow-up",
            body: "Hyderabad leads expect a WhatsApp reply. The Follow-up agent sends it automatically during your business hours and keeps the conversation going until there is a booking or a clear no.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Ad costs in Hyderabad: what drives them",
        intro:
          "Healthcare, education and real estate all draw plenty of advertisers in Hyderabad, but a single published figure wouldn't tell you what your campaigns will cost. That depends on your niche, your area and your offer.",
        columns: ["Platform", "Typical use for Hyderabad businesses", "What tends to move cost"],
        rows: [
          [
            "Google Search",
            "Healthcare, study-abroad consultancies, coaching, home services",
            "Keyword competition in health and education; city-wide versus locality targeting",
          ],
          [
            "Meta (Instagram, Facebook)",
            "Residential projects, interiors, food, retail, events",
            "Festive-season competition; how often the creative is refreshed",
          ],
          [
            "LinkedIn Ads",
            "IT services, SaaS, pharma and life-sciences B2B, staffing",
            "Narrow job-title and seniority filters",
          ],
          [
            "YouTube",
            "Telugu and English explainers, course previews, walk-throughs",
            "Video quality; whether you reach new viewers or retarget past visitors",
          ],
        ],
        note: "Costs depend on industry, season and competition. We recommend a budget after reading your account and goals.",
      },
      {
        kind: "prose",
        heading: "Language and sector rules in Hyderabad",
        paragraphs: [
          "English works for most B2B and corporate audiences. For consumer audiences, Telugu copy can be included if you want it, and in some parts of the city Hindi or Urdu may suit better. We can run versions side by side and let your results decide; you approve every one before it runs.",
          "Healthcare and pharma come with extra advertising rules. Platforms restrict certain health claims, and medical advertising has its own regulations. We write copy that sticks to what you actually offer, and because every campaign is staged paused, your medical or compliance team gets a clear chance to review it before anything goes live.",
        ],
      },
      {
        kind: "steps",
        heading: "How we run campaigns for a Hyderabad business",
        intro:
          "We work with Hyderabad clients remotely from Bengaluru — same time zone and same working week, with approvals and questions handled on WhatsApp.",
        steps: [
          {
            title: "One-sentence goal",
            body: "For example: more consultation bookings for a fertility clinic in Banjara Hills, or more counselling sessions for a study-abroad consultancy in Ameerpet. A draft plan is assembled in minutes.",
          },
          {
            title: "Connect your accounts",
            body: "You sign in to each platform yourself. Ad accounts and billing stay in your name, and we never see or store your passwords.",
          },
          {
            title: "Review and approve",
            body: "Everything is staged paused. You check the languages, localities, audiences, copy and daily budgets before anything spends.",
          },
          {
            title: "Go live on your hours",
            body: "The Scheduler keeps WhatsApp follow-ups and AI calls within the days and hours you set, including clinic timings if you want calls only when the front desk is staffed.",
          },
          {
            title: "Qualify and route",
            body: "The Qualifier scores each lead, the Enrichment agent fills in missing details, and the AI calling agent reaches the promising ones. Everything is recorded in the built-in CRM.",
          },
          {
            title: "Weekly report",
            body: "A plain-English summary of spend, leads, changes and recommendations from the Report Writer every week.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Billing and GST for Hyderabad clients",
        paragraphs: [
          "Credits start at ₹899 + GST for 2,500, with no retainer or subscription, invoiced with a GST invoice from Triple-Seven BoostMySites AI Solutions Private Limited. Your accountant can tell you how input credit applies to your business.",
          "Credits are used only when the agents do something for you, and they never expire. Ad spend is separate and paid directly to Google, Meta, LinkedIn and the rest from your own ad accounts.",
        ],
      },
      {
        kind: "callout",
        heading: "No spend without your yes",
        body: "Campaigns are created paused and only go live once you approve. They sit in your own ad accounts and billing, you sign in yourself, and you can pause every campaign in one click.",
      },
      {
        kind: "prose",
        heading: "Working with us from Hyderabad",
        paragraphs: [
          "We don't have an office in Hyderabad. Our team is in Bengaluru and works with Hyderabad clients online: onboarding on a video call, questions on WhatsApp at +91 96329 53355, and a dashboard that logs every action the agents take.",
          "For clinics and institutes that run long days, the log is the useful part. You can check at the end of the day what changed in your campaigns and why, without a separate call.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do you have an office in Hyderabad?",
        a: "No. We are based in Bengaluru and work with Hyderabad clients remotely. Reach us on WhatsApp at +91 96329 53355.",
      },
      {
        q: "Can ads be in Telugu?",
        a: "Telugu copy can be included alongside English if you want it. You approve each version before it goes live.",
      },
      {
        q: "We run a clinic. Can you advertise healthcare services?",
        a: "Yes, within platform policies and the rules for medical advertising. Copy sticks to what you actually offer, and your team approves it before anything runs.",
      },
      {
        q: "Can you reach IT and pharma decision-makers?",
        a: "Yes. LinkedIn Ads and LinkedIn outreach target people by job title, seniority and company, and you approve audiences and messages before they go out.",
      },
      {
        q: "What does it cost?",
        a: "Credits start at ₹899 + GST for 2,500, with a GST invoice and no retainer. Ad spend is separate and paid directly to the platforms. We don't guarantee leads or sales.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Lead scoring and CRM", href: "/services/leads-crm" },
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Lead generation for clinics", href: "/industries/clinics" },
      { label: "Lead generation for IT and SaaS", href: "/industries/it-saas" },
      { label: "Pricing", href: "/pricing" },
    ],
    locale: {
      hreflang: "en-IN",
      areaServed: "Hyderabad, Telangana, India",
      priceLine: "2,500 credits for ₹899 + GST. No retainer, no subscription",
    },
  },
];
