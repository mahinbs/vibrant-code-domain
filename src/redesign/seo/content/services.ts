import type { SeoPageData } from "../types";

/**
 * Service pages (/services/<slug>). Content only — rendered by SeoPage.
 * Every claim here must map to a verified product fact. No invented numbers,
 * clients, quotes or results. Prices are rendered by the template, not here.
 */
export const servicePages: SeoPageData[] = [
  // ---------------------------------------------------------------------------
  // 1. AI ad campaigns
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "ai-ad-campaigns",
    navLabel: "AI ad campaigns",
    cardSummary: "AI plans, builds and tunes Meta and Google ads inside your own accounts. Nothing spends until you approve.",
    metaTitle: "AI Ads Management for Meta and Google | BoostMySites",
    metaDescription: "AI ads management that plans, builds and tunes Meta and Google campaigns in your own ad accounts. Staged paused, live only after you approve.",
    primaryPhrase: "AI ads management",
    eyebrow: "Service · AI ad campaigns",
    h1: "AI ads management for Meta and Google, run inside your own accounts",
    intro:
      "Tell the system what you sell, who buys it and what you can spend. It plans the campaigns, writes the ads and builds them in your own Meta and Google accounts, all staged paused until you say go. Once live, it checks the numbers every 20 minutes and moves money toward the ads that are actually bringing leads.",
    blocks: [
      {
        kind: "steps",
        heading: "How AI ads management works, from one sentence to live campaigns",
        intro:
          "You do not need to know bidding strategies or audience settings. You need to know your business. The rest is planned for you and shown to you before a single rupee is spent.",
        steps: [
          {
            title: "Tell it your goal in one sentence",
            body: "Say what you sell, who you sell it to and the budget you are comfortable with. For example: a dental clinic in one city looking for implant enquiries, with a fixed monthly spend. That one line is enough to start planning.",
          },
          {
            title: "Review the plan it builds",
            body: "The Campaign Launcher AI prepares a full plan: how the budget is split across platforms, which audiences to target, which keywords to bid on, and the ad copy for each platform. Everything is built inside your accounts but left paused, so you can read it, question it and change it.",
          },
          {
            title: "Approve and go live",
            body: "When you are happy, you approve. Only then do the campaigns start spending. If something in the plan feels wrong, you say so before launch rather than after the money is gone.",
          },
          {
            title: "The 20-minute loop takes over",
            body: "From launch onward the system reads live spend, clicks, click-through rate and cost per lead, compares them against a target for your category and against the last run, then decides what to change. It runs this loop 72 times a day.",
          },
        ],
      },
      {
        kind: "points",
        heading: "What the AI does every 20 minutes",
        intro:
          "Most ad accounts are checked once a week, if that. Problems like a tired creative or a starved ad set can quietly waste money for days. The loop is built to catch those early.",
        items: [
          {
            title: "Read",
            body: "Pulls current spend, clicks, CTR and cost per lead from each running campaign, straight from the platform.",
          },
          {
            title: "Compare",
            body: "Checks those numbers against the target for your type of business and against the previous check, so trends show up quickly.",
          },
          {
            title: "Decide",
            body: "Looks for ad fatigue, frequency creeping up, creatives that have stopped working and good ad sets that are short of budget.",
          },
          {
            title: "Act",
            body: "Shifts budget toward what converts, pauses what does not and queues fresh creatives to rotate in when the current ones wear out.",
          },
          {
            title: "Log",
            body: "Writes every change to an audit trail, with what was changed and why, so nothing happens in your account that you cannot trace.",
          },
        ],
      },
      {
        kind: "points",
        heading: "Platforms it can plan and run",
        intro:
          "Meta and Google are where most Indian businesses start, but the same system can plan across several networks and split budget between them based on results.",
        items: [
          {
            title: "Meta (Facebook and Instagram)",
            body: "Lead and traffic campaigns aimed at the people most likely to need what you sell, with copy written for the feed.",
          },
          {
            title: "Google and YouTube",
            body: "Search campaigns built around buying-intent keywords, plus video placements when your offer is easier to show than to describe.",
          },
          {
            title: "LinkedIn Ads",
            body: "Useful when your buyer is a business, a founder or a specific job title rather than a general consumer.",
          },
          {
            title: "TikTok, Snapchat and ChatGPT ads",
            body: "Available when your audience spends time there. The plan only includes them if they make sense for your goal.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "What you see before and after your ads go live",
        paragraphs: [
          "Before launch you see the plan laid out in plain language: the budget split by platform, each audience and why it was chosen, the keyword list for search, and every piece of ad copy grouped by platform. Because it is all built in your own accounts, you can also open Meta Ads Manager or Google Ads yourself and see the same paused campaigns sitting there.",
          "After launch you see the live picture: spend so far, clicks, click-through rate and cost per lead for each campaign, set against the target for your category. Next to that is the audit trail, a running list of every change the AI made, such as budget moved from one ad set to another or a creative paused, with the reason written beside it.",
          "Once a week the Report Writer AI sends a short summary in plain English. It tells you what worked, what is wasting money and what it plans to do next. You do not need to read charts to understand where your spend went.",
        ],
      },
      {
        kind: "callout",
        heading: "Nothing spends until you approve it",
        body: "Every campaign is created in a paused state. Money only starts moving after you approve the plan, and you can pause everything in one click at any time. You stay the person who decides when your budget is used.",
      },
      {
        kind: "prose",
        heading: "Your ad accounts, your billing, your passwords",
        paragraphs: [
          "Campaigns launch inside your own ad accounts, not ours. Ad spend is billed by Meta, Google and the other platforms directly to you, on your own payment method. If you ever stop working with us, the accounts, the campaigns and their history stay with you.",
          "To do the work, the AI drives a real Chrome window inside those accounts. You sign in yourself. Your passwords are never seen or stored by us. This keeps access in your hands and means there is no shared login floating around a team.",
        ],
      },
      {
        kind: "points",
        heading: "Who AI ads management suits, and when it does not",
        items: [
          {
            title: "Owners who run ads but have no time to watch them",
            body: "You know ads work for you, but checking them daily is not realistic. The loop does the checking and the weekly report keeps you informed.",
          },
          {
            title: "Businesses about to start paid ads",
            body: "You have a clear offer and a budget but no in-house ad person. The plan gives you a structured starting point you can approve line by line.",
          },
          {
            title: "Teams that want control without doing the setup",
            body: "Your marketing person can review and approve, while the build, monitoring and adjustments are handled for them.",
          },
          {
            title: "When it is not a fit",
            body: "If the offer itself is unclear, or if you need a promise of a fixed number of leads, ads management alone will not solve that. We would rather tell you upfront.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "After the click: where your leads go next",
        paragraphs: [
          "An ad that gets a form filled is only half the job. The same system picks up from there. WhatsApp, LinkedIn and email follow up with each new lead, the Qualifier AI scores how well they fit, and the Enrichment AI captures the email and phone number behind them. Everything lands in the CRM so your team calls the right people first.",
          "That connection also feeds the ads. When the loop can see which campaigns produce leads that actually qualify, it can move budget toward those campaigns rather than toward the ones that only look cheap on paper.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need my own Meta and Google ad accounts?",
        a: "Yes. Campaigns are built and run inside your own ad accounts. If you do not have one yet, you create it and sign in yourself. We never hold your login details, and the accounts stay yours whatever happens.",
      },
      {
        q: "Who pays for the ad spend?",
        a: "You pay the platforms directly through your own billing. Our plans load prepaid AI Growth Credits, which are drawn down for the work we agree on, such as planning, building and managing campaigns. Ad spend is separate and goes straight from you to Meta, Google or the other platform.",
      },
      {
        q: "Can the AI spend my money without asking?",
        a: "Not at launch. Every campaign is staged paused and goes live only after you approve the plan. Once running, the AI adjusts budgets between campaigns within what you approved, and every change is written to the audit trail. You can pause everything in one click whenever you want.",
      },
      {
        q: "Will AI ads management guarantee me leads or a set return?",
        a: "No. Nobody can honestly promise a fixed number of leads, sales or return on ad spend, because results depend on your offer, your market and your budget. What the system does is check performance every 20 minutes, cut waste quickly and tell you each week what is working.",
      },
      {
        q: "How is this different from hiring an agency to run ads?",
        a: "The day-to-day monitoring happens 72 times a day instead of when someone gets around to it, and every change is logged with a reason. You also keep full ownership of the accounts and approve the plan before launch, so you are never locked out of your own campaigns.",
      },
    ],
    related: [
      { label: "AI ads for real estate", href: "/industries/real-estate" },
      { label: "AI ads for clinics", href: "/industries/clinics" },
      { label: "AI ads for ecommerce", href: "/industries/ecommerce" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead management CRM", href: "/services/leads-crm" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 2. WhatsApp automation
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "whatsapp-automation",
    navLabel: "WhatsApp automation",
    cardSummary: "Follow up with every enquiry on WhatsApp the moment they respond, qualify them and pass warm leads to your team.",
    metaTitle: "WhatsApp Automation for Business | BoostMySites",
    metaDescription: "WhatsApp automation for business: reply to new enquiries as soon as they respond, ask qualifying questions and send scored leads to your CRM.",
    primaryPhrase: "WhatsApp automation for business",
    eyebrow: "Service · WhatsApp automation",
    h1: "WhatsApp automation for business that follows up while you work",
    intro:
      "When someone responds to your ad or enquiry form, the Follow-up AI picks up the conversation on WhatsApp straight away. It asks the questions your team would ask, scores how serious the lead is and puts them in your CRM. You spend your time on the people who are ready to talk.",
    blocks: [
      {
        kind: "prose",
        heading: "Why follow-up speed decides who gets the customer",
        paragraphs: [
          "Most enquiries do not go cold because the buyer lost interest. They go cold because nobody replied while the interest was still there. A person who fills a form at 9 pm on a Sunday will often contact two or three other businesses before Monday morning, and the first one to reply in a useful way has the advantage.",
          "For a lot of Indian buyers, WhatsApp is where they already talk to their builder, their doctor and their child's school. Meeting them there, quickly and with a relevant question, is often the difference between a conversation and a missed call that never gets returned.",
          "WhatsApp automation for business is not about blasting messages. It is about making sure every real enquiry gets a prompt, sensible first reply and a few follow-ups after that, without depending on someone remembering to do it.",
        ],
      },
      {
        kind: "steps",
        heading: "How the WhatsApp follow-up works",
        intro: "The WhatsApp layer picks up where your ads leave off. Its job is to qualify, follow up and nurture.",
        steps: [
          {
            title: "A lead responds",
            body: "Someone fills your form, clicks your ad or replies to an earlier message. That response is the trigger. The system does not cold-message strangers who never showed interest.",
          },
          {
            title: "The Follow-up AI replies at once",
            body: "A first message goes out the moment the lead responds, thanking them and asking one simple question to understand what they need.",
          },
          {
            title: "It qualifies with a few short questions",
            body: "Based on what you told us matters, such as location, timeline or type of requirement, it asks a handful of questions in a natural order. The Qualifier AI uses the answers to score how well the lead fits.",
          },
          {
            title: "It fills in the gaps",
            body: "The Enrichment AI captures the email and phone details behind the lead so your team has what it needs to call or send a proposal.",
          },
          {
            title: "Warm leads go to your team, the rest are nurtured",
            body: "Scored leads are pushed into the CRM so the best ones are called first. Leads that are interested but not ready yet get gentle follow-ups over time instead of being forgotten.",
          },
        ],
      },
      {
        kind: "chat",
        heading: "A sample follow-up conversation",
        intro:
          "This is an illustration of the style, written for an interior design studio. Your own script is planned around your business and reviewed by you before it is used.",
        messages: [
          { from: "lead", text: "Hi, I filled the form for a home interior quote." },
          {
            from: "business",
            text: "Thanks for reaching out! Happy to help. Is this for a new flat or a renovation of your current home?",
          },
          { from: "lead", text: "New flat, possession next month." },
          {
            from: "business",
            text: "Congratulations! Which rooms are you planning to do first, the full home or a few rooms like kitchen and bedrooms?",
          },
          { from: "lead", text: "Full home, but kitchen is the priority." },
          {
            from: "business",
            text: "Got it. Would a short call with our designer this week work for you? Let us know a day and time that suits you.",
          },
        ],
      },
      {
        kind: "points",
        heading: "What you see for every WhatsApp lead",
        intro: "You do not have to scroll through a phone to know where things stand. Each lead comes with the context your team needs.",
        items: [
          {
            title: "The conversation so far",
            body: "What was asked, what the lead answered and when, so whoever calls them next does not repeat the same questions.",
          },
          {
            title: "A fit score",
            body: "The Qualifier AI's view of how closely the lead matches your ideal customer, so you can sort by who to call first.",
          },
          {
            title: "Captured contact details",
            body: "Email and phone details gathered by the Enrichment AI, ready for a call or a proposal.",
          },
          {
            title: "A weekly summary",
            body: "The Report Writer AI's plain-English note on what worked in follow-up that week, what did not, and what it suggests changing.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "You approve the plan, and you can stop it anytime",
        body: "The follow-up approach, the questions and the tone are part of the plan you review before anything goes live. If you want to change a message or pause follow-ups completely, you can do that at any time with one click.",
      },
      {
        kind: "prose",
        heading: "Playing by WhatsApp's rules",
        paragraphs: [
          "Business messaging on WhatsApp runs under Meta's policies. In general that means your business profile has to be set up properly, and messages that start a conversation usually need a pre-approved template. Those rules exist to protect people from spam, and they protect your number too.",
          "We plan follow-ups to stay inside those rules: messaging people who have responded to you, keeping messages relevant and not sending more than a reasonable person would expect. The exact requirements are set by Meta and can change, so we check them as part of setting you up.",
        ],
      },
      {
        kind: "points",
        heading: "Which businesses WhatsApp automation fits",
        items: [
          {
            title: "Businesses with more enquiries than time",
            body: "If leads arrive faster than your team can reply, automation makes sure each one gets a first response and a few follow-ups.",
          },
          {
            title: "High-consideration purchases",
            body: "Property, home interiors, treatments, courses and professional services, where buyers ask questions before they commit.",
          },
          {
            title: "Teams already running ads",
            body: "Paying for leads and then replying late wastes the spend. WhatsApp follow-up protects the money already going into ads.",
          },
          {
            title: "When it is not a fit",
            body: "If you have very few enquiries and reply to each one personally within minutes, you may not need this yet.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will it send WhatsApp messages to people who never contacted me?",
        a: "No. Follow-up is triggered when a lead responds to you, for example by filling a form, clicking an ad or replying to a message. Sending unsolicited messages would break WhatsApp's rules and put your number at risk, so we do not plan follow-ups that way.",
      },
      {
        q: "Do I need a WhatsApp Business setup first?",
        a: "Business messaging on WhatsApp needs a properly set up business presence under Meta's rules, and conversation-starting messages generally need approved templates. If you are not set up yet, we walk you through what is needed. The specific requirements are Meta's, and we check them for your case.",
      },
      {
        q: "What happens when a lead is ready to buy?",
        a: "The lead is scored, their contact details are captured and they are pushed into your CRM, so your team can see who is warmest and call them first. The AI's job is to get the lead to that point quickly, not to replace the conversation your team has with a serious buyer.",
      },
      {
        q: "Does WhatsApp automation work on its own or with my ads?",
        a: "It works best as part of the full system. Your ads bring people in, WhatsApp, LinkedIn and email follow up, and the CRM keeps everything in one place. That said, the follow-up layer is useful wherever your enquiries come from.",
      },
      {
        q: "Can I guarantee more sales with WhatsApp automation?",
        a: "No tool can guarantee that. What it does is make sure every real enquiry gets a prompt reply and a sensible follow-up, which removes one of the most common reasons leads go cold. Results still depend on your offer, your pricing and your sales conversations.",
      },
    ],
    related: [
      { label: "WhatsApp follow-up for real estate", href: "/industries/real-estate" },
      { label: "WhatsApp follow-up for interior designers", href: "/industries/interior-designers" },
      { label: "WhatsApp follow-up for education", href: "/industries/education" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead management CRM", href: "/services/leads-crm" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 3. AI calling agent
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "ai-calling",
    navLabel: "AI calling agent",
    cardSummary: "A voice agent that answers, qualifies and books in natural conversation, around the clock. Try the live demo.",
    metaTitle: "AI Calling Agent for Indian Businesses | BoostMySites",
    metaDescription: "An AI calling agent for India that answers enquiries, qualifies leads and books next steps in natural voice conversation, 24/7. Hear the live demo.",
    primaryPhrase: "AI calling agent India",
    eyebrow: "Service · AI calling agent",
    h1: "AI calling agent for businesses in India that answers, qualifies and books",
    intro:
      "Our AI calling agent holds natural voice conversations with your leads. It answers their questions, checks whether they are a good fit and books the next step, at any hour of the day. You can hear exactly how it sounds on our live voice demo before you decide anything.",
    blocks: [
      {
        kind: "prose",
        heading: "What an AI calling agent actually does",
        paragraphs: [
          "Think of it as a first conversation that never has to wait for someone to be free. When a lead wants to talk, the agent speaks with them, listens to what they need and responds in a natural way rather than reading out a menu of options.",
          "Its job is narrow and practical. It answers the common questions you would expect, asks the qualifying questions you care about, and moves a good lead toward a booked visit, consultation or callback. It is not there to close a large deal on its own. It is there so no interested person is left waiting until your office opens.",
          "Because it is part of the wider BoostMySites system, the calling agent does not work in isolation. Leads it speaks to are scored and added to the same CRM that your ads, WhatsApp, LinkedIn and email follow-up feed into.",
        ],
      },
      {
        kind: "steps",
        heading: "How setting up the AI calling agent works",
        intro: "You give the agent the knowledge and boundaries a good new hire would need on their first day.",
        steps: [
          {
            title: "Tell us what a good call looks like",
            body: "What you sell, who usually calls, which questions come up again and again, and what counts as a qualified lead for you. Also tell us what the next step should be, such as a site visit, an appointment or a call from your team.",
          },
          {
            title: "Review the script and boundaries",
            body: "We prepare how the agent should open, what it should ask, how it should answer common questions and what it must not say or promise. You read it and change anything that does not sound like your business.",
          },
          {
            title: "Approve and switch it on",
            body: "Once you are comfortable, the agent goes live. It is available 24/7, so evenings, weekends and holidays are covered without anyone staying late.",
          },
          {
            title: "Leads flow into your CRM",
            body: "After each conversation, the lead is scored on fit and added to the CRM with what was learned, so your team knows who to follow up with first.",
          },
        ],
      },
      {
        kind: "points",
        heading: "The conversations it handles well",
        items: [
          {
            title: "Answering enquiries",
            body: "Explaining what you offer, how the process works and what the buyer should expect next, in a calm, conversational voice.",
          },
          {
            title: "Qualifying leads",
            body: "Asking the few questions that separate a serious buyer from a casual one, so your team does not spend its day on poor-fit calls.",
          },
          {
            title: "Booking the next step",
            body: "Moving an interested lead toward an appointment, a visit or a callback rather than ending the call with a vague promise.",
          },
          {
            title: "Out-of-hours cover",
            body: "Taking conversations when your team is off, so a lead who wants to talk at night is not left with an unanswered phone.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "Hear it before you decide",
        body: "The AI calling agent is live on our voice demo page. Talk to it yourself, ask it awkward questions and judge how natural it sounds. We would rather you test it than take our word for it.",
      },
      {
        kind: "prose",
        heading: "What you get after each conversation",
        paragraphs: [
          "Every lead the agent speaks with ends up in your CRM with a fit score from the Qualifier AI and the details captured during the conversation. Your team opens the list and sees who sounded ready, who needs more time and who was not a fit, without listening back to anything.",
          "Once a week, the Report Writer AI sends a plain-English summary across the whole system, including how follow-up went. It points out what is working, where effort is being wasted and what it suggests trying next.",
        ],
      },
      {
        kind: "prose",
        heading: "You stay in control of what it says",
        paragraphs: [
          "The agent only speaks within the script and boundaries you approved. If your pricing changes, a service is paused or you want a different tone, the script is updated and you review the change. You can switch the agent off in one click whenever you need to.",
          "We are also careful about what the agent promises. It does not quote outcomes, guarantee results or make commitments your team would have to walk back. That keeps the first conversation honest and protects your reputation.",
        ],
      },
      {
        kind: "points",
        heading: "When an AI calling agent makes sense",
        items: [
          {
            title: "Businesses that miss calls",
            body: "Clinics with a busy front desk, property teams out on site visits, institutes during admission season. Anyone who loses enquiries because no one picked up.",
          },
          {
            title: "Teams that want to call only qualified leads",
            body: "If your salespeople spend hours on first calls that go nowhere, the agent can handle that first filter for them.",
          },
          {
            title: "Businesses already generating leads",
            body: "If ads or referrals bring in a steady flow, a calling agent helps more of those leads get a timely conversation.",
          },
          {
            title: "When it is not a fit",
            body: "If every call needs deep technical judgement or a sensitive personal discussion from the very first minute, a human should take it.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Does the AI calling agent sound robotic?",
        a: "It is built to hold natural voice conversations, not to read out menus. The best way to judge is to try it yourself on our live voice demo and decide whether it sounds right for your customers.",
      },
      {
        q: "Can it really work at night and on weekends?",
        a: "Yes. The agent is available 24/7, so a lead who wants to talk at 11 pm or on a public holiday still gets a conversation instead of a missed call.",
      },
      {
        q: "Will it replace my receptionist or sales team?",
        a: "It is meant to take the first conversation off their plate, not replace them. It answers common questions, qualifies leads and books next steps, then hands the warm leads to your people through the CRM. Serious buying conversations stay with your team.",
      },
      {
        q: "How does it fit with my ads and WhatsApp follow-up?",
        a: "It is one part of the same system. Ads bring leads in, WhatsApp, LinkedIn and email follow up, and the calling agent adds a voice option. Every lead is scored and lands in one CRM, so you are not juggling separate tools.",
      },
      {
        q: "Is there a guarantee of more bookings?",
        a: "No. We do not promise a number of bookings or sales. What the agent changes is that more of your leads get a prompt, consistent first conversation. What happens after that depends on your offer and your team.",
      },
    ],
    related: [
      { label: "Try the live voice demo", href: "/voice-demo" },
      { label: "AI calling for clinics", href: "/industries/clinics" },
      { label: "AI calling for real estate", href: "/industries/real-estate" },
      { label: "AI calling for education", href: "/industries/education" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Lead management CRM", href: "/services/leads-crm" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 4. LinkedIn outreach
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "linkedin-outreach",
    navLabel: "LinkedIn outreach",
    cardSummary: "AI finds prospects who match your ideal customer, invites them, follows up and watches your account's health.",
    metaTitle: "LinkedIn Lead Generation with AI | BoostMySites",
    metaDescription: "LinkedIn lead generation where AI finds prospects that fit your ideal customer, sends invites, follows up on replies and keeps your account safe.",
    primaryPhrase: "LinkedIn lead generation",
    eyebrow: "Service · LinkedIn outreach",
    h1: "LinkedIn lead generation with AI that finds, invites and follows up",
    intro:
      "Describe your ideal customer and the Lead Scout AI finds people on LinkedIn who match, then invites them to connect. When someone responds, the Follow-up AI continues the conversation, and every lead is scored and added to your CRM. All of it runs at a steady pace during working hours on weekdays, with your account's health watched throughout.",
    blocks: [
      {
        kind: "prose",
        heading: "Why LinkedIn lead generation is hard to do by hand",
        paragraphs: [
          "For B2B businesses, LinkedIn is where the decision makers are. The trouble is the work involved. Searching for the right titles, checking each profile, sending invites, remembering who accepted and following up at the right moment takes hours every week, and it is the first task to slip when you get busy.",
          "When it slips, the pipeline dries up a few weeks later. Doing it in bursts does not help either, because sudden spikes of activity can look unnatural to the platform and hurt the account you depend on.",
          "AI-run outreach solves both problems. It does the repetitive parts every working day, at a measured pace, and keeps an eye on the signals that tell you whether the account is healthy.",
        ],
      },
      {
        kind: "steps",
        heading: "How AI LinkedIn outreach works",
        steps: [
          {
            title: "Define your ideal customer",
            body: "Tell us who you want to reach: the industry, the role, the company size, the region. A clear description here makes everything that follows more accurate.",
          },
          {
            title: "Review the plan and messages",
            body: "You see who the Lead Scout AI will look for and the connection note and follow-up messages it will use. Nothing goes out until you approve.",
          },
          {
            title: "Prospects are found and invited",
            body: "The Lead Scout AI finds people who match your ideal customer and sends them invites, spread across the working week rather than all at once.",
          },
          {
            title: "Replies are followed up",
            body: "The Follow-up AI responds to people who accept or reply, while the Qualifier AI scores how well each one fits.",
          },
          {
            title: "Contacts are enriched and logged",
            body: "The Enrichment AI captures the email and phone details behind a promising lead, and the lead is pushed into your CRM for your team to take forward.",
          },
        ],
      },
      {
        kind: "points",
        heading: "The AI agents behind your LinkedIn outreach",
        intro: "Several of the eight agents in the system work together on LinkedIn. Each has one clear job.",
        items: [
          {
            title: "Lead Scout AI",
            body: "Finds prospects who match your ideal customer and invites them to connect.",
          },
          {
            title: "Qualifier AI",
            body: "Scores each prospect on fit, so effort goes toward the people most likely to need you.",
          },
          {
            title: "Follow-up AI",
            body: "Messages leads the moment they respond, so a warm reply is never left sitting for days.",
          },
          {
            title: "Enrichment AI",
            body: "Captures the email and phone behind a lead so your team can move the conversation off LinkedIn.",
          },
          {
            title: "Health Monitor AI",
            body: "Watches account safety and invite acceptance rates, and flags when activity should slow down.",
          },
          {
            title: "Scheduler AI",
            body: "Keeps outreach to working hours on weekdays, which is when real professionals are active.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "Your account's health comes first",
        body: "LinkedIn sets its own limits on how much activity an account can do, and those limits can change. The Health Monitor AI watches acceptance rates and other safety signals so outreach stays at a pace that protects your profile. You can pause everything in one click at any time.",
      },
      {
        kind: "prose",
        heading: "What you see as outreach runs",
        paragraphs: [
          "You can see who has been invited, who accepted, who replied and how each person was scored. Promising leads appear in the CRM with whatever contact details were captured, so your team can pick them up without digging through LinkedIn messages.",
          "Each week the Report Writer AI sums it up in plain English: which kinds of prospects responded, which messages are not landing, and what it suggests changing next week. You get the picture without reading a spreadsheet.",
        ],
      },
      {
        kind: "prose",
        heading: "Outreach and LinkedIn Ads are different tools",
        paragraphs: [
          "Outreach is one-to-one: inviting specific people and talking with them. LinkedIn Ads is paid reach: showing an ad to a defined audience. Both can be useful for B2B, and they suit different goals.",
          "The Campaign Launcher AI can also build LinkedIn Ads campaigns as part of a wider ad plan. Those are staged paused and only spend once you approve. Many businesses start with outreach because it costs nothing in ad spend, then add ads when they want more reach.",
        ],
      },
      {
        kind: "points",
        heading: "Who LinkedIn lead generation works for",
        items: [
          {
            title: "B2B services and software",
            body: "IT services, SaaS products, consultancies and agencies whose buyers hold specific job titles.",
          },
          {
            title: "Professional firms",
            body: "Chartered accountants, finance advisers and similar firms that win work from business owners and finance heads.",
          },
          {
            title: "Founders doing their own sales",
            body: "If you are the main salesperson and outreach keeps getting pushed to next week, this keeps it moving.",
          },
          {
            title: "When it is not a fit",
            body: "If your buyers are everyday consumers rather than professionals, WhatsApp follow-up and consumer ads are usually a better place to start.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will LinkedIn outreach get my account restricted?",
        a: "No one can promise a platform will never act on an account, because LinkedIn sets and changes its own rules. What we do is keep activity steady, run it only during weekday working hours and have the Health Monitor AI watch acceptance rates and safety signals so the pace can be eased when needed.",
      },
      {
        q: "Who decides which people get contacted?",
        a: "You do, by defining your ideal customer and approving the plan. The Lead Scout AI then looks for people who match that description. If you see the wrong kind of prospect being found, tell us and the targeting is adjusted.",
      },
      {
        q: "What happens after someone accepts my invite?",
        a: "The Follow-up AI continues the conversation as soon as they respond, the Qualifier AI scores how well they fit and the Enrichment AI captures their email and phone where it can. The lead then goes into your CRM so your team can take it forward.",
      },
      {
        q: "Is this the same as running LinkedIn Ads?",
        a: "No. Outreach is personal invites and messages, with no ad spend. LinkedIn Ads is paid advertising. The system can do both, and any ad campaigns are staged paused until you approve them.",
      },
      {
        q: "Can you guarantee a number of meetings from LinkedIn?",
        a: "No. Meetings depend on how well your offer fits the people being contacted and on your market. The system makes outreach consistent and well targeted, and the weekly report shows you what is and is not working so you can adjust.",
      },
    ],
    related: [
      { label: "LinkedIn outreach for IT and SaaS", href: "/industries/it-saas" },
      { label: "LinkedIn outreach for CA and finance firms", href: "/industries/ca-finance" },
      { label: "LinkedIn outreach for agencies", href: "/industries/agencies" },
      { label: "Email automation for leads", href: "/services/email-marketing" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 5. Email marketing
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "email-marketing",
    navLabel: "Email automation",
    cardSummary: "Nurture leads who are not ready yet with timely, relevant emails, so they remember you when they are.",
    metaTitle: "Email Automation for Leads | BoostMySites",
    metaDescription: "Email automation for leads who enquired but are not ready to buy. Plain, useful follow-up emails sent on weekdays, planned by AI and approved by you.",
    primaryPhrase: "email automation for leads",
    eyebrow: "Service · Email marketing",
    h1: "Email automation for leads who are not ready to buy yet",
    intro:
      "Not every enquiry turns into a sale this week. Email automation keeps in touch with those leads through short, useful emails, so when they are ready to decide, your business is the one they remember. It runs alongside WhatsApp and LinkedIn follow-up and feeds the same CRM.",
    blocks: [
      {
        kind: "prose",
        heading: "The leads most businesses forget about",
        paragraphs: [
          "Every business has a pile of people who showed interest and then went quiet. They asked for a brochure, filled a form or replied once, and then life got in the way. Nobody followed up properly because the team was busy with the leads who wanted to buy now.",
          "Many of those people still have the need. They are comparing options, waiting for a budget, or simply not in a hurry. If you disappear from their view, they will eventually buy from whoever stayed in touch.",
          "Email automation for leads is the low-effort way to stay present. It does not chase or pressure. It sends the right message at a sensible time, and it keeps doing it without anyone on your team needing to remember.",
        ],
      },
      {
        kind: "steps",
        heading: "How email automation for leads works",
        steps: [
          {
            title: "Leads are captured from your other channels",
            body: "Enquiries come in through your ads, WhatsApp, LinkedIn or calls. Where an email address is not given upfront, the Enrichment AI captures it where it can.",
          },
          {
            title: "Leads are scored and grouped",
            body: "The Qualifier AI scores each lead on fit. Hot leads go straight to your team, while leads who are interested but not ready are placed into email nurture.",
          },
          {
            title: "A sequence is planned for you to review",
            body: "AI drafts a short series of emails in your voice: what to say first, what to send later, and when. You read and approve them before anything is sent.",
          },
          {
            title: "Emails go out at sensible times",
            body: "The Scheduler AI sends during working hours on weekdays, when people are more likely to read a business email and less likely to feel interrupted.",
          },
          {
            title: "Replies are picked up quickly",
            body: "When a lead replies, the Follow-up AI responds straight away and the lead's status is updated in the CRM, so a re-awakened lead does not go cold again.",
          },
        ],
      },
      {
        kind: "points",
        heading: "The kind of emails we plan",
        intro: "Good nurture email is useful first and promotional second. These are the types of messages a typical sequence includes.",
        items: [
          {
            title: "A prompt thank-you",
            body: "Confirms you received the enquiry, says what happens next and gives a simple way to reply.",
          },
          {
            title: "Answers to common questions",
            body: "The things buyers in your field usually wonder about but do not always ask, written plainly.",
          },
          {
            title: "A gentle check-in",
            body: "A short note asking whether their plans have moved forward, with no pressure attached.",
          },
          {
            title: "A reason to come back",
            body: "Something relevant to their situation, such as a new service, a seasonal reminder or a useful guide, that invites a reply.",
          },
        ],
      },
      {
        kind: "points",
        heading: "What you see while your emails run",
        items: [
          {
            title: "The full sequence before launch",
            body: "Every email laid out in order with its timing, so you can edit the wording or remove a message entirely.",
          },
          {
            title: "Lead status in the CRM",
            body: "Which leads have replied and which are ready for your team to call.",
          },
          {
            title: "A plain-English weekly report",
            body: "The Report Writer AI tells you what is working across email and the other channels, what is wasting effort and what it would change.",
          },
        ],
      },
      {
        kind: "callout",
        heading: "Nothing is sent until you approve it",
        body: "You see and sign off every email in a sequence before it goes live. If a message no longer fits, it can be changed or removed, and you can pause all sending in one click.",
      },
      {
        kind: "prose",
        heading: "Staying on the right side of the inbox",
        paragraphs: [
          "Email works when people trust it. We plan sequences for people who have shown interest in your business, keep messages short and relevant, and make it easy for anyone to stop hearing from you. Sending to bought lists or strangers damages your sender reputation and is not something we do.",
          "Email providers and privacy rules both expect businesses to send responsibly. Keeping volumes sensible and content useful protects your domain so that your important emails, like quotes and invoices, keep reaching the inbox.",
        ],
      },
      {
        kind: "points",
        heading: "When email automation is worth it",
        items: [
          {
            title: "Long decision cycles",
            body: "Courses, B2B services, software and big-ticket purchases where buyers take weeks or months to decide.",
          },
          {
            title: "Businesses with an untouched lead list",
            body: "If you have enquiries from the past that nobody followed up, a nurture sequence gives them a reason to come back.",
          },
          {
            title: "Teams already using WhatsApp or LinkedIn follow-up",
            body: "Email adds a calmer, longer-term channel alongside the quicker conversations happening elsewhere.",
          },
          {
            title: "When it is not a fit",
            body: "If nearly every buyer decides within a day, fast WhatsApp follow-up or a calling agent will usually matter more than email.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "Will this spam my leads?",
        a: "No. Sequences are short, spaced out and sent only to people who showed interest in your business. Every email is approved by you first, and anyone can opt out. Sending too much would hurt your domain's reputation, so restraint is part of the plan.",
      },
      {
        q: "Who writes the emails?",
        a: "AI drafts them in your business's voice using what you have told us about your offer and your buyers. You then review, edit and approve each one. Nothing goes out in words you have not seen.",
      },
      {
        q: "When are the emails sent?",
        a: "The Scheduler AI sends during working hours on weekdays. Business emails sent at sensible times are more likely to be read and less likely to feel intrusive.",
      },
      {
        q: "How is email different from WhatsApp follow-up?",
        a: "WhatsApp is for fast, conversational follow-up right after someone enquires. Email is better for steady, longer-term nurture of leads who are not ready yet. The system uses both and keeps every lead's status in the same CRM.",
      },
      {
        q: "Does email automation guarantee sales?",
        a: "No. It keeps your business in front of interested people and makes sure replies are picked up quickly. Whether a lead buys still depends on your offer, timing and the conversation your team has with them.",
      },
    ],
    related: [
      { label: "Email nurture for education", href: "/industries/education" },
      { label: "Email nurture for IT and SaaS", href: "/industries/it-saas" },
      { label: "Email nurture for ecommerce", href: "/industries/ecommerce" },
      { label: "LinkedIn lead generation", href: "/services/linkedin-outreach" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
    ],
  },

  // ---------------------------------------------------------------------------
  // 6. Leads CRM
  // ---------------------------------------------------------------------------
  {
    kind: "service",
    slug: "leads-crm",
    navLabel: "Leads CRM",
    cardSummary: "Every lead from every channel, scored on fit, enriched with contact details and kept in one place.",
    metaTitle: "Lead Management CRM with AI Scoring | BoostMySites",
    metaDescription: "A lead management CRM where every enquiry is scored on fit, enriched with email and phone, followed up by AI and kept in one list for your team.",
    primaryPhrase: "lead management CRM",
    eyebrow: "Service · Leads and CRM",
    h1: "Lead management CRM that scores, enriches and follows up for you",
    intro:
      "Leads from your ads, WhatsApp, LinkedIn, email and calls all land in one CRM. Each one is scored on how well it fits your ideal customer and enriched with an email and phone where possible. Your team opens one list and knows exactly who to call first.",
    blocks: [
      {
        kind: "prose",
        heading: "Why most lead lists stop being useful",
        paragraphs: [
          "In many businesses, leads live in five places at once: a spreadsheet, a WhatsApp chat, an ad platform's lead form, someone's inbox and a salesperson's memory. Nobody can say for sure how many enquiries came in last week, let alone which ones were worth calling.",
          "A CRM only helps if it is kept up to date, and keeping it up to date is a job people quietly stop doing. Within a few weeks it holds half the leads, with half the details, and the team goes back to their phones.",
          "A lead management CRM that fills itself changes that. When scoring, enrichment and follow-up happen automatically, the list stays current without anyone having to type it in.",
        ],
      },
      {
        kind: "steps",
        heading: "How leads move through the CRM",
        steps: [
          {
            title: "A lead arrives from any channel",
            body: "An ad form, a WhatsApp reply, a LinkedIn response, an email reply or a conversation with the AI calling agent. All of them feed into the same place.",
          },
          {
            title: "The Qualifier AI scores fit",
            body: "Each lead is scored against your ideal customer, ideally before more money or time is spent on them. A strong fit rises to the top.",
          },
          {
            title: "The Enrichment AI fills in the gaps",
            body: "Where a lead only left a name or a social profile, the Enrichment AI captures the email and phone behind them so your team can actually reach out.",
          },
          {
            title: "The Follow-up AI keeps the conversation going",
            body: "Leads who respond get a reply straight away on the channel they used, and leads who are not ready are kept warm through WhatsApp, LinkedIn or email nurture.",
          },
          {
            title: "Your team takes the warm ones",
            body: "Your people work from a sorted list: highest fit and most engaged first. They spend their day on conversations, not on data entry.",
          },
        ],
      },
      {
        kind: "points",
        heading: "What you see in your lead management CRM",
        intro: "The aim is one screen your team can trust, rather than one more tool to update.",
        items: [
          {
            title: "One list of every lead",
            body: "Enquiries from ads, WhatsApp, LinkedIn, email and calls together, so nothing is hidden in a separate app.",
          },
          {
            title: "A fit score on each lead",
            body: "The Qualifier AI's assessment of how closely the lead matches your ideal customer, so the list can be sorted by priority.",
          },
          {
            title: "Contact details that are filled in",
            body: "Email and phone captured by the Enrichment AI, so a lead is something your team can act on, not just a name.",
          },
          {
            title: "Where each lead stands",
            body: "The stage each lead is at in your pipeline, so two people do not chase the same person.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "How scoring makes your ad spend smarter",
        paragraphs: [
          "Scoring is not just for your sales team. The ad side of the system reads cost per lead every 20 minutes and shifts budget toward what converts. When it can see which campaigns bring in leads that score well, it has a better signal than cost per lead alone.",
          "That matters because the cheapest leads are not always the best ones. A campaign that brings in fewer but better-fitting enquiries is often the one worth more budget, and a connected CRM is how the system can tell the difference.",
          "Once a week, the Report Writer AI pulls this together in plain English: what worked, what is wasting money and what it suggests doing next.",
        ],
      },
      {
        kind: "callout",
        heading: "You decide what a good lead looks like",
        body: "Scoring follows the ideal customer you define and approve. If the scores do not match what your team sees on real calls, tell us and the criteria are adjusted. Automated follow-up can be paused in one click whenever you want.",
      },
      {
        kind: "points",
        heading: "Who needs a lead management CRM",
        items: [
          {
            title: "Businesses with leads scattered across tools",
            body: "If enquiries live in spreadsheets, chats and inboxes, one scored list is the quickest way to stop losing them.",
          },
          {
            title: "Sales teams that waste time on poor-fit leads",
            body: "Scoring and enrichment let your people start each day with the leads most likely to need you.",
          },
          {
            title: "Owners who want a clear weekly picture",
            body: "If you want to know what your marketing produced without asking three people, the CRM and weekly report give you that.",
          },
          {
            title: "When it is not a fit",
            body: "If you receive only a handful of enquiries a month and remember each one personally, a full lead system may be more than you need right now.",
          },
        ],
      },
    ],
    faqs: [
      {
        q: "How is a lead scored?",
        a: "The Qualifier AI compares each lead against the ideal customer you defined, such as the type of buyer, their need and how serious they seem from their responses. The score is a guide to who to call first. It is not a prediction that someone will buy.",
      },
      {
        q: "What does enrichment mean?",
        a: "Enrichment means filling in missing contact details. When a lead arrives with only a name or a social profile, the Enrichment AI captures the email and phone behind them where it can, so your team has a real way to get in touch.",
      },
      {
        q: "Does the CRM only work with your ads?",
        a: "No. It collects leads from every channel in the system: ads, WhatsApp, LinkedIn, email and the AI calling agent. The value comes from having all of them in one sorted list instead of spread across separate tools.",
      },
      {
        q: "Will my team still need to follow up manually?",
        a: "The first replies and the long-term nurture are handled by the Follow-up AI. Your team steps in for the warm, high-scoring leads, where a human conversation matters most. That is where their time is best spent.",
      },
      {
        q: "How do I pay for this?",
        a: "Plans load prepaid AI Growth Credits, which are drawn down for the work we agree on. They are not a guarantee of leads, sales or returns. The current price is shown on this page, and you can message us on WhatsApp at +91 96329 53355 with questions.",
      },
    ],
    related: [
      { label: "Lead management for real estate", href: "/industries/real-estate" },
      { label: "Lead management for clinics", href: "/industries/clinics" },
      { label: "Lead management for CA and finance firms", href: "/industries/ca-finance" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
];
