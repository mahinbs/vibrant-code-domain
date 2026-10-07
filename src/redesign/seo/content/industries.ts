import type { SeoPageData } from "../types";

/**
 * Industry pages (/industries/<slug>). One search phrase per page.
 * Every budget split, audience list, ad line and WhatsApp script below is a
 * SAMPLE written to show how a plan looks — not a result, not a promise.
 */
export const industryPages: SeoPageData[] = [
  /* ------------------------------------------------------------------ */
  /* 1. Real estate                                                      */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "real-estate",
    navLabel: "Real estate",
    cardSummary: "Ads, WhatsApp follow-up and site-visit booking for builders, brokers and channel partners.",
    metaTitle: "Lead Generation for Real Estate | BoostMySites",
    metaDescription:
      "Real estate lead generation with ads in your own accounts, WhatsApp qualification and site-visit booking. Nothing spends until you approve.",
    primaryPhrase: "lead generation for real estate",
    eyebrow: "Industries · Real estate",
    h1: "Lead generation for real estate that ends in site visits, not cold numbers",
    intro:
      "Most property enquiries die between the form and the first call. We run lead generation for real estate that answers each buyer on WhatsApp as soon as they enquire, checks budget and location, and books the site visit for your team. Every campaign runs in your own ad accounts and waits, paused, until you approve it.",
    leadIndustry: "Real estate",
    blocks: [
      {
        kind: "points",
        heading: "The three problems builders and brokers tell us about",
        intro: "These come up on almost every first call with a developer, broker or channel partner.",
        items: [
          {
            title: "Portal leads are shared and go cold fast",
            body: "A buyer who fills a listing form often hears from several agents within the hour. If your team calls back the next morning, the buyer has already spoken to three people and stopped picking up unknown numbers.",
          },
          {
            title: "Wrong-budget enquiries eat the sales team's day",
            body: "Someone asking about a 3 BHK with a 2 BHK budget, or a buyer wanting a different locality, still takes a call, a brochure and two follow-ups. Your best closers spend hours on people who were never going to buy this project.",
          },
          {
            title: "Site visits get promised, then skipped",
            body: "A buyer says 'Sunday, maybe' on the phone and nobody confirms it. Without a reminder, a location pin and a named person to meet, many planned visits never happen and the lead quietly drops off the list.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a property project",
        intro:
          "You start with one sentence, for example: 'Get booked site visits for our 2 and 3 BHK project near the metro.' The system turns that into a plan you review line by line.",
        steps: [
          {
            title: "Build the plan around the project, not the brand",
            body: "We split budget across Meta lead forms, Google Search on project and locality keywords, and YouTube walkthrough videos. The plan shows audiences, keywords and ad copy for each platform before anything goes live.",
          },
          {
            title: "Ask the qualifying questions inside the form",
            body: "The lead form asks configuration, budget band and when they plan to buy. That one step filters out a large share of browsers before your team sees the lead.",
          },
          {
            title: "Reply on WhatsApp the moment the form is submitted",
            body: "The Qualifier agent confirms budget and preferred location over WhatsApp. If the buyer does not reply, the AI calling agent can make a short follow-up call, and the Follow-up agent sends reminders on a set schedule.",
          },
          {
            title: "Book and confirm the site visit",
            body: "The Scheduler agent offers visit slots, sends the location pin and confirms the day before. Your sales person gets the lead with the full chat history and a lead score.",
          },
          {
            title: "Keep tuning every 20 minutes",
            body: "The optimisation loop reads results, compares ad sets, moves budget toward the ones producing qualified visits and pauses the ones that are not. It runs 72 checks a day and flags tired creatives so you can swap in fresh photos or walkthroughs.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for a residential launch",
        intro: "Shown as a share of your own monthly ad budget. Your real split depends on the project, city and goal.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Meta lead forms (Facebook and Instagram)", "45%", "Main source of enquiries, with budget and timeline questions in the form"],
          ["Google Search", "30%", "Buyers already searching the project name, builder or locality"],
          ["YouTube", "15%", "Walkthrough and amenities videos for people still comparing projects"],
          ["Meta retargeting", "10%", "Reminds website visitors and video viewers to book a visit"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. Ad spend is paid by you directly to each platform.",
      },
      {
        kind: "points",
        heading: "Audiences we would test first",
        items: [
          {
            title: "Families upgrading their home",
            body: "People living within a commute of the project who engage with home-buying content, many of them moving from a rented flat to their own.",
          },
          {
            title: "Non-resident buyers",
            body: "For Indian projects, buyers living in the Gulf, UK or US who are looking at their home city. They often prefer video calls and WhatsApp over phone calls.",
          },
          {
            title: "Investors and second-home buyers",
            body: "Kept in a separate ad set with separate copy, so their enquiries are scored and routed differently from end users.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "Sample ad copy (for illustration only)",
        paragraphs: [
          "Sample 1: '3 BHK homes, a short walk from the metro. See the sample flat this weekend — pick your slot on WhatsApp.'",
          "Sample 2: 'Planning to move from rent to your own home? Get the floor plans and price sheet on WhatsApp in one tap.'",
          "Sample 3 (for buyers abroad): 'Buying back home from overseas? Book a live video walkthrough of the site with our team.'",
          "Every line is written for your project, checked against your brochure and approved by you. Where your project is RERA-registered in India, the registration number is shown on the ad as required.",
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample of how the first conversation could go after a buyer fills a Meta lead form. Wording is set with you before launch.",
        messages: [
          { from: "business", text: "Hi Ramesh, thanks for asking about the 3 BHK homes near the metro. I'm the project assistant. Can I ask two quick questions so we send the right details?" },
          { from: "lead", text: "Ok sure" },
          { from: "business", text: "Is this for your own family to live in, or as an investment? And roughly when are you planning to buy?" },
          { from: "lead", text: "For us to live. Maybe in the next 3-4 months" },
          { from: "business", text: "Got it. Here is the floor plan and price sheet for the 3 BHK units. Would you like to see the sample flat? We have slots on Saturday and Sunday." },
          { from: "lead", text: "Sunday 11 am works" },
          { from: "business", text: "Booked for Sunday at 11 am. Our sales manager will meet you at the site office. Here is the location pin. I'll send a reminder on Saturday evening." },
          { from: "lead", text: "Thanks. Is parking available there?" },
          { from: "business", text: "Yes, visitor parking is next to the site office. See you on Sunday, Ramesh." },
        ],
      },
      {
        kind: "callout",
        heading: "Your ad accounts, your billing, your approval",
        body: "Every campaign is built and staged paused inside your own Meta, Google and YouTube accounts. Nothing spends until you approve it, and you can pause everything with one click. You sign in to the platforms yourself — we never see or store your passwords — and ad spend is billed by the platforms straight to you.",
      },
      {
        kind: "prose",
        heading: "Keeping property ads clean and compliant",
        paragraphs: [
          "Property ads carry more rules than most. In India, RERA-registered projects should show the registration number in their ads, and claims about possession dates, approvals or amenities must match what is registered. We do not write lines that promise price growth or rental returns.",
          "Some ad platforms treat housing as a special ad category in certain regions, which limits how finely you can target by age or location. The plan respects those limits rather than working around them. Every week the Report Writer agent sends a plain-English summary of what ran, what it cost and which ad sets produced booked visits.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these leads exclusive to us, or shared like portal leads?",
        a: "They come from ads running in your own ad account and land in your own forms, so they are yours. We do not resell or share enquiries between clients.",
      },
      {
        q: "Can you show our RERA number in every ad?",
        a: "Yes. Where your project is registered, we include the number in the ad copy or creative, and you check it before approving the campaign.",
      },
      {
        q: "How much ad budget do we need for a project launch?",
        a: "There is no fixed number. The plan is built from your goal and the budget you set, and our ad budget calculator can help you think through a starting number. Ad spend goes from you directly to the platforms, separate from our AI Growth Credits.",
      },
      {
        q: "What happens to a lead who says they will buy in a year?",
        a: "They are scored lower and placed on a slower follow-up track on WhatsApp and email, so your team focuses on near-term buyers without losing the long-term ones.",
      },
      {
        q: "Do you guarantee a number of site visits or bookings?",
        a: "No. Nobody can honestly guarantee that. What we do commit to is a clear plan, campaigns that only run after you approve them, and a weekly report showing exactly what happened.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "Lead generation for interior designers", href: "/industries/interior-designers" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 2. Clinics and healthcare                                           */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "clinics",
    navLabel: "Clinics and healthcare",
    cardSummary: "Patient enquiries answered on WhatsApp and booked into slots for dental, skin, physio and specialty clinics.",
    metaTitle: "Lead Generation for Clinics & Healthcare | BoostMySites",
    metaDescription:
      "Patient lead generation for clinics: policy-safe ads, WhatsApp replies and appointment booking. Runs in your own ad accounts, paused until you approve.",
    primaryPhrase: "lead generation for clinics",
    eyebrow: "Industries · Clinics and healthcare",
    h1: "Lead generation for clinics that turns enquiries into booked appointments",
    intro:
      "Patients search, message two or three clinics, and book with whoever answers first and clearly. Our lead generation for clinics runs careful, policy-safe ads, replies to every enquiry on WhatsApp, and offers real appointment slots. Your front desk stops chasing and starts confirming.",
    leadIndustry: "Clinics and healthcare",
    blocks: [
      {
        kind: "points",
        heading: "Why clinics struggle to fill appointment slots",
        intro: "Dental, dermatology, physiotherapy, fertility and specialty clinics describe the same three gaps.",
        items: [
          {
            title: "The front desk cannot answer messages and patients at once",
            body: "Receptionists are checking people in, handling payments and answering the landline. Instagram and WhatsApp messages wait for hours, and an anxious patient rarely waits that long.",
          },
          {
            title: "Price shoppers crowd out genuine patients",
            body: "Many enquiries only ask 'what is the cost?' and vanish after hearing a number. Without a quick way to understand the problem and explain what a consultation includes, staff time goes to people comparing prices across town.",
          },
          {
            title: "Health ads are easy to get rejected",
            body: "Ad platforms have strict policies for health content. Before-and-after photos, outcome promises or copy that points at a personal condition can get ads disapproved or accounts restricted, so many clinics give up on ads entirely.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a clinic",
        intro:
          "A typical one-sentence goal: 'Fill weekday consultation slots for our dental clinic from people within 5 km.' Here is how the plan would take shape.",
        steps: [
          {
            title: "Target the catchment, not the whole city",
            body: "Patients rarely travel far for routine care. Ads are limited to the area around each branch, with Google Search covering treatment-plus-locality searches and Meta covering nearby people who are not searching yet.",
          },
          {
            title: "Write copy that informs instead of promising",
            body: "Ads describe the service, the doctor's qualifications and the consultation process. They avoid outcome claims and personal-condition targeting, in line with platform health-ad policies.",
          },
          {
            title: "Answer and triage on WhatsApp",
            body: "The Qualifier agent asks what the visit is about, preferred branch and time of day. It does not give medical advice — clinical questions are passed to your staff.",
          },
          {
            title: "Offer real slots and send reminders",
            body: "The Scheduler agent offers open slots and sends a reminder before the visit. Patients who stop replying get a gentle follow-up, and the AI calling agent can ring those who prefer a call.",
          },
          {
            title: "Shift budget toward booked consultations",
            body: "Every 20 minutes the loop compares which treatments, areas and ads are producing booked appointments, moves budget toward them and pauses the rest. You get a plain-English report each week.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for a single-branch clinic",
        intro: "Percentages of your own monthly ad budget, as an example only.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Google Search", "50%", "People searching a treatment or 'clinic near me' in your area"],
          ["Meta (Facebook and Instagram)", "35%", "Local awareness and appointment-request forms"],
          ["YouTube", "10%", "Short doctor explainer videos for people researching a treatment"],
          ["Meta retargeting", "5%", "Reminds website visitors to book their consultation"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. Ad spend is billed by the platforms directly to you.",
      },
      {
        kind: "points",
        heading: "Audiences and sample ad lines",
        intro: "Audiences are kept broad and location-based. The ad lines below are samples, not final copy.",
        items: [
          {
            title: "Audience: people living or working near the branch",
            body: "A radius around each clinic, adjusted for traffic and how far patients usually travel for your specialty.",
          },
          {
            title: "Audience: people searching treatment terms locally",
            body: "Search keywords such as the treatment name plus your area. No targeting based on someone's health condition.",
          },
          {
            title: "Sample ad lines",
            body: "'Gentle dental care in Indiranagar. Weekday evening slots — book on WhatsApp.' · 'Meet our physiotherapist for a first assessment. Choose a time that suits you.' · 'Questions about a treatment? Message our clinic team and get a clear answer.'",
          },
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample of how a first enquiry from a Google ad could be handled. Medical questions always go to your staff.",
        messages: [
          { from: "lead", text: "Hi, do you do root canal? How much?" },
          { from: "business", text: "Hi Anjali, thanks for messaging [Clinic name]. Yes, we do. The cost depends on the tooth and what the dentist finds, so we start with a consultation and X-ray." },
          { from: "business", text: "Would you like to book a consultation? We have slots today at 6 pm and tomorrow at 11 am or 5:30 pm." },
          { from: "lead", text: "Tomorrow 5:30 is fine. Is it painful?" },
          { from: "business", text: "That's a good question for the dentist — I'll note it so the dentist can explain everything at your visit. You're booked for tomorrow at 5:30 pm at our Indiranagar branch." },
          { from: "lead", text: "Ok. Where exactly?" },
          { from: "business", text: "Here is the location pin. Please bring any old X-rays if you have them. I'll send a reminder tomorrow afternoon." },
          { from: "lead", text: "Thanks" },
        ],
      },
      {
        kind: "callout",
        heading: "You approve every ad before a rupee is spent",
        body: "Campaigns are created in your clinic's own ad accounts and stay paused until you sign off on them. One click pauses all of them again. You log in to the platforms yourself, so we never handle your passwords, and the platforms bill ad spend to your clinic directly.",
      },
      {
        kind: "prose",
        heading: "A note on healthcare advertising rules",
        paragraphs: [
          "Health advertising is regulated by the ad platforms and, depending on your country, by medical councils and consumer law. We follow platform health-ad policies, avoid promises about results, and keep before-and-after images out of ads. Doctors may also have their own professional rules on advertising, so you review every line before approval.",
          "The WhatsApp assistant is there for logistics — timings, location, booking and reminders. It is set up to hand any clinical question to your team, and patients are only messaged after they have reached out or opted in.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will the WhatsApp assistant give medical advice to patients?",
        a: "No. It handles booking, timings, location and reminders. Anything clinical is handed to your doctors or staff, and you set that rule before launch.",
      },
      {
        q: "Can you run ads for treatments like hair transplant or weight loss?",
        a: "Some treatments face tighter platform rules than others. We check the current policy for each one, write copy that avoids outcome claims, and tell you upfront if a treatment is unlikely to be approved.",
      },
      {
        q: "We have three branches. Can each get its own leads?",
        a: "Yes. Each branch can have its own location targeting and booking slots, and leads are routed to the right branch team with their chat history.",
      },
      {
        q: "Is patient data safe?",
        a: "Ads run in your accounts and leads flow into your CRM. We collect only what is needed to book an appointment and do not ask for medical records over WhatsApp.",
      },
      {
        q: "Can you promise a certain number of patients each month?",
        a: "No. We do not guarantee patients, bookings or revenue. You get a clear plan, campaigns that only spend after your approval, and a weekly report on what worked.",
      },
    ],
    related: [
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "AI calling agent", href: "/services/ai-calling" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "Lead generation for coaching institutes", href: "/industries/education" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 3. Education and coaching                                           */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "education",
    navLabel: "Education and coaching",
    cardSummary: "Admission enquiries, demo-class bookings and parent follow-up for coaching institutes and training centres.",
    metaTitle: "Lead Generation for Coaching Institutes | BoostMySites",
    metaDescription:
      "Lead generation for coaching institutes: ads for admission season, WhatsApp follow-up with parents and demo-class booking. Paused until you approve.",
    primaryPhrase: "lead generation for coaching institutes",
    eyebrow: "Industries · Education and coaching",
    h1: "Lead generation for coaching institutes, from first enquiry to demo class",
    intro:
      "Admissions come in waves, and every wave brings hundreds of half-interested enquiries. We run lead generation for coaching institutes that reaches students and parents during admission season, follows up on WhatsApp, and books them into a demo class. Your counsellors talk to families who have already shown up.",
    leadIndustry: "Education and coaching",
    blocks: [
      {
        kind: "points",
        heading: "What makes admissions hard for coaching centres",
        intro: "Whether you teach entrance exams, languages, coding or school tuition, these three issues show up every season.",
        items: [
          {
            title: "Admission season is short and crowded",
            body: "Most decisions happen in a few weeks after board results or before a new batch. Every institute in the city is advertising at once, and if your counsellors fall behind on calls, those weeks are gone.",
          },
          {
            title: "Students enquire, parents decide",
            body: "The student fills the form, but a parent pays the fees. Follow-ups that only talk to the student often stall, and calls to a parent during office hours rarely get picked up.",
          },
          {
            title: "Demo classes get booked but not attended",
            body: "A family agrees to a free demo, then forgets or picks another centre. Without reminders and a clear reason to come, the demo slot sits empty and the counsellor starts again.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for an institute",
        intro:
          "Example goal: 'Fill our new JEE foundation batch with Class 9 and 10 students from nearby schools.' The plan below would be generated, reviewed by you and only then approved.",
        steps: [
          {
            title: "Time the budget to the admission calendar",
            body: "Budget is weighted toward result dates, batch start dates and school holidays. Between peaks, spend drops to a lower always-on level for retargeting.",
          },
          {
            title: "Speak to students and parents separately",
            body: "Instagram and YouTube ads speak to students about the course and teachers. Facebook and Google Search ads speak to parents about batch timings, safety, faculty and fee structure.",
          },
          {
            title: "Capture the right details in the form",
            body: "The form asks class, school area, subject or exam and who the parent contact is. The Qualifier agent fills gaps on WhatsApp.",
          },
          {
            title: "Book the demo class and make sure they come",
            body: "The Scheduler agent offers demo slots, and the Follow-up agent sends a reminder to both the student and the parent. Families who miss the demo get one easy chance to rebook.",
          },
          {
            title: "Move spend to the courses that are filling",
            body: "Every 20 minutes the loop checks which course, area and ad is producing demo bookings, shifts budget toward them and pauses the weak ones. Creative fatigue is flagged, which matters when the same students see your ads all season.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split during admission season",
        intro: "As a share of your own ad budget for the season. Shown to explain the idea, not as a recommendation.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Meta (Instagram and Facebook)", "40%", "Student-facing reels and parent-facing lead forms"],
          ["Google Search", "30%", "Parents searching coaching, tuition or course names near them"],
          ["YouTube", "20%", "Faculty intro and sample-lesson videos"],
          ["Snapchat", "10%", "Reaching younger students where they spend time, for awareness only"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. You pay ad spend to the platforms yourself.",
      },
      {
        kind: "prose",
        heading: "Audiences and sample ad copy",
        paragraphs: [
          "We would start with three audiences: students in the target class living near each centre, parents in the same areas, and people who watched your faculty videos or visited the fees page.",
          "Sample line for students: 'Foundation batch for Class 9 starts next month. Sit in on a free demo class this Saturday.'",
          "Sample line for parents: 'Small batches, weekly parent updates, a centre close to home. Book a counselling visit on WhatsApp.'",
          "Sample retargeting line: 'You looked at our timetable. Seats in the evening batch are filling — want us to hold a demo slot?' These are illustrations only; every line is written for your institute and approved by you.",
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample conversation with a parent after their child filled an Instagram lead form.",
        messages: [
          { from: "business", text: "Hello, this is the admissions desk at [Institute name]. Aarav enquired about our Class 9 foundation batch. Are you his parent?" },
          { from: "lead", text: "Yes I'm his mother. What are the timings?" },
          { from: "business", text: "There are two batches: weekdays 5 to 7 pm and weekends 9 am to 1 pm. Which would suit Aarav better with his school schedule?" },
          { from: "lead", text: "Weekdays. How many students in one batch?" },
          { from: "business", text: "Batches are kept small so teachers can follow each student. The best way to see this is a free demo class. Can Aarav join on Wednesday or Thursday at 5 pm?" },
          { from: "lead", text: "Thursday. Can I come along?" },
          { from: "business", text: "Of course. After the class, our counsellor will meet you both and share the fee structure. Booked for Thursday at 5 pm — here is the centre location." },
          { from: "lead", text: "Ok thank you" },
          { from: "business", text: "You're welcome. I'll send a reminder on Thursday morning to you and Aarav." },
        ],
      },
      {
        kind: "callout",
        heading: "Run your admission campaigns on your terms",
        body: "Everything is set up in your institute's own ad accounts and stays paused until you approve it. If a batch fills early, one click pauses all ads. You sign in to each platform yourself, your passwords are never seen or stored by us, and ad spend is billed to you by the platforms.",
      },
      {
        kind: "prose",
        heading: "Honest education ads",
        paragraphs: [
          "Families make big decisions on coaching, and regulators in India have paid close attention to misleading coaching claims. We do not write ads that promise ranks, selections or guaranteed results, and we only use toppers' names or photos when you confirm you have permission.",
          "Each week the Report Writer agent sends a plain-English update: which courses drew enquiries, how many demos were booked and attended, and where budget moved. Your counsellors see every lead with its score and full WhatsApp history in the CRM.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we pause ads between admission seasons?",
        a: "Yes. You can pause everything in one click, or keep a small always-on budget for retargeting and pause the rest.",
      },
      {
        q: "Will follow-ups reach the parent as well as the student?",
        a: "Yes. The form and the WhatsApp assistant ask for a parent contact, and reminders for demo classes can go to both.",
      },
      {
        q: "We run online courses for students across India. Does this still work?",
        a: "Yes. Instead of local targeting, the plan focuses on interest and search intent, and the demo becomes a live online class or webinar.",
      },
      {
        q: "Can we mention our toppers in ads?",
        a: "Only if the results are real and you have the student's and family's consent. We avoid any wording that suggests a guaranteed rank or selection.",
      },
      {
        q: "Do you guarantee admissions?",
        a: "No. We do not guarantee enquiries, admissions or fee collection. You approve the plan, control the budget and get a weekly report on what it produced.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "Lead generation for clinics", href: "/industries/clinics" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 4. Interior designers                                               */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "interior-designers",
    navLabel: "Interior designers",
    cardSummary: "Qualified homeowner enquiries and booked design consultations for interior studios and modular kitchen firms.",
    metaTitle: "Lead Generation for Interior Designers | BoostMySites",
    metaDescription:
      "Lead generation for interior designers: portfolio ads, budget and possession-date checks on WhatsApp, booked consultations. You approve before spend.",
    primaryPhrase: "lead generation for interior designers",
    eyebrow: "Industries · Interior design",
    h1: "Lead generation for interior designers who want serious homeowners",
    intro:
      "An interior project is a big, slow decision, and most enquiries are early ideas rather than ready budgets. Our lead generation for interior designers shows your real work to people who just bought or are moving into a home, checks scope and budget on WhatsApp, and books a design consultation. You spend your evenings on clients, not on 'just checking prices'.",
    leadIndustry: "Interior design",
    blocks: [
      {
        kind: "points",
        heading: "Three things that slow interior studios down",
        intro: "Independent designers, turnkey studios and modular kitchen firms all mention these.",
        items: [
          {
            title: "Enquiries arrive without a budget or a timeline",
            body: "Someone likes a reel and asks 'how much for my flat?'. You do not know if they have possession, how many rooms, or whether they want a full home or one wardrobe. Every vague enquiry costs a long call.",
          },
          {
            title: "Free site visits that lead nowhere",
            body: "Measuring a home, preparing a mood board and drafting a quote takes real time. When the homeowner was only collecting three quotes to compare, that effort is lost.",
          },
          {
            title: "Long gaps between enquiry and decision",
            body: "A buyer may enquire months before handover. If nobody stays in touch, they sign with whoever is in front of them when the keys arrive.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a design studio",
        intro: "A typical starting sentence: 'Get consultations from new homeowners in gated communities near us who want full-home interiors.'",
        steps: [
          {
            title: "Lead with finished projects",
            body: "Ads use your real photos and walkthrough videos — kitchens, living rooms and before-and-after transformations of spaces you actually delivered.",
          },
          {
            title: "Reach people around new homes",
            body: "Meta ads target areas with new residential handovers and interests linked to home buying and decor. Google Search covers 'interior designer near me', 'modular kitchen' and similar searches.",
          },
          {
            title: "Qualify on scope, budget band and possession date",
            body: "The Qualifier agent asks on WhatsApp what type of home it is, which rooms, a budget range and when they get the keys. Leads are scored before your team spends any time.",
          },
          {
            title: "Nurture the early ones",
            body: "Homeowners still months from handover get occasional project photos and tips by WhatsApp and email, so you are top of mind when they are ready.",
          },
          {
            title: "Book the consultation, then keep optimising",
            body: "Ready leads are offered a studio or video consultation through the Scheduler agent. Meanwhile, the 20-minute loop keeps moving budget to the creatives and areas that bring consultations.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for an interior studio",
        intro: "A share of your own ad budget, to show how a plan might be balanced.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Instagram and Facebook (Meta)", "50%", "Portfolio reels and carousel ads with a consultation form"],
          ["Google Search", "25%", "People actively searching for designers or modular kitchens"],
          ["YouTube", "15%", "Full home walkthrough videos"],
          ["Meta retargeting", "10%", "Brings back people who watched videos or saved posts"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. Ad spend goes from you to the platforms directly.",
      },
      {
        kind: "points",
        heading: "Audiences and sample ad copy",
        intro: "The ad lines here are samples for illustration. Final copy is written around your portfolio and style.",
        items: [
          {
            title: "Audience: new homeowners",
            body: "People living in or near newly delivered apartment complexes and villas in your service area.",
          },
          {
            title: "Audience: renovators",
            body: "Owners of older homes who engage with renovation and kitchen content, often looking for one or two rooms rather than a full home.",
          },
          {
            title: "Sample ad lines",
            body: "'Got the keys to your new 3 BHK? See how we designed one just like it.' · 'A modular kitchen built around how you cook. Book a design chat.' · 'Moving in later this year? Start planning your interiors now, without pressure.'",
          },
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample first conversation with a homeowner who filled an Instagram form.",
        messages: [
          { from: "business", text: "Hi Neha, thanks for your interest in [Studio name]. Saw you liked our living room project. Is this for a new home or a renovation?" },
          { from: "lead", text: "New flat, 3 BHK. Getting possession in December" },
          { from: "business", text: "Congratulations! Are you looking at the full home, or specific rooms like the kitchen and wardrobes?" },
          { from: "lead", text: "Kitchen, wardrobes and living room mainly" },
          { from: "business", text: "Got it. To suggest the right options, do you have a rough budget range in mind? A range is fine." },
          { from: "lead", text: "Somewhere around 8-10 lakhs" },
          { from: "business", text: "Thank you, that helps. Would you like a 30-minute consultation with our designer? You can visit the studio or do it on a video call. We have Saturday afternoon free." },
          { from: "lead", text: "Video call Saturday 4pm" },
          { from: "business", text: "Done — Saturday at 4 pm with our designer. If you have the floor plan, please share it here before the call." },
        ],
      },
      {
        kind: "callout",
        heading: "Nothing goes live without your yes",
        body: "We build the ads in your studio's own Meta, Google and YouTube accounts and leave them paused for you to review. Approve when you are happy, pause everything with a single click whenever you are busy with projects. You sign in yourself — we never see your passwords — and the platforms bill ad spend to you.",
      },
      {
        kind: "prose",
        heading: "Why we only use your real work",
        paragraphs: [
          "Interior buyers judge you by what they see. Using stock photos or other studios' work damages trust the moment a homeowner visits your studio, so every creative is built from projects you have delivered. If you are new and your portfolio is thin, we will say so and plan around it rather than borrow images.",
          "The Health Monitor agent watches for creative fatigue, which happens quickly when you run the same reel for weeks. When a creative is tiring out, you get a note asking for fresh project photos. The Report Writer then shows you each week which projects and rooms drew the most consultations.",
        ],
      },
    ],
    faqs: [
      {
        q: "We are a small studio. Can we handle the leads this creates?",
        a: "You set the budget and can pause in one click. Because leads are qualified and scored first, you only spend time on the homeowners who match your scope and budget.",
      },
      {
        q: "Do you need our photos and videos?",
        a: "Yes. Ads work best with your real completed projects. If you only have phone photos, we will tell you which ones are usable and what to shoot next.",
      },
      {
        q: "Can you filter out people with very small budgets?",
        a: "Yes. The form and WhatsApp questions ask for a budget range, and the lead score reflects it. Low-fit leads can get a polite reply instead of a call.",
      },
      {
        q: "What if a homeowner gets possession six months later?",
        a: "They go on a slower nurture track with occasional project updates by WhatsApp and email, and are scored up again closer to their handover date.",
      },
      {
        q: "Will you guarantee projects or signed contracts?",
        a: "No. We do not guarantee leads, projects or revenue. You get a clear plan, campaigns that run only after approval, and weekly reports you can check.",
      },
    ],
    related: [
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "Lead generation for real estate", href: "/industries/real-estate" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 5. CA and finance firms                                             */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "ca-finance",
    navLabel: "CA and finance firms",
    cardSummary: "Business clients for CA firms, tax consultants and finance advisers through informational ads and LinkedIn outreach.",
    metaTitle: "Lead Generation for CA Firms & Finance | BoostMySites",
    metaDescription:
      "Lead generation for CA firms and finance advisers: informational ads, LinkedIn outreach and WhatsApp follow-up. No guaranteed-return language, ever.",
    primaryPhrase: "lead generation for CA firms",
    eyebrow: "Industries · CA and finance",
    h1: "Lead generation for CA firms and finance practices, done carefully",
    intro:
      "Most CA firms grow by referral, which is steady but slow and hard to plan. We run lead generation for CA firms and finance practices that reaches business owners when they need help — GST, compliance, company setup, accounting — with informational ads and polite LinkedIn outreach. Every enquiry is followed up and handed to you with context.",
    leadIndustry: "CA and finance",
    blocks: [
      {
        kind: "points",
        heading: "What holds back growth for CA and finance firms",
        intro: "Chartered accountants, tax consultants and finance advisers raise these three points again and again.",
        items: [
          {
            title: "Growth depends almost entirely on referrals",
            body: "Referrals are high quality but unpredictable. When you hire a new associate or open a service line, you cannot simply ask your existing clients for more introductions.",
          },
          {
            title: "Enquiries are often one-time and price-led",
            body: "Many people want a single ITR filed at the lowest price. Firms that want retainer clients — monthly accounting, GST, payroll, audit — need a way to find business owners, not one-off filers.",
          },
          {
            title: "Professional rules limit how you can promote",
            body: "Chartered accountants in practice have guidelines on advertising and solicitation, and finance advisers face rules on what they can claim. Generic marketing agencies often write copy that does not fit those limits.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a CA or finance firm",
        intro: "Example goal: 'Find founders of small private limited companies in Pune who need monthly accounting and GST filing.'",
        steps: [
          {
            title: "Start with your rules, then the reach",
            body: "Before any copy is written, you tell us what your professional guidelines allow. Ads stay informational — what a service covers, deadlines and how to get help — rather than claims of superiority.",
          },
          {
            title: "Catch intent on Google, build trust on LinkedIn",
            body: "Google Search covers searches like GST registration, company incorporation and accounting services near the client. LinkedIn Ads and LinkedIn outreach reach founders and finance heads by company size and industry.",
          },
          {
            title: "Use deadlines as natural moments",
            body: "Filing and compliance deadlines are when business owners look for help. The plan raises budget ahead of those windows and sends reminder emails to past enquiries.",
          },
          {
            title: "Qualify by business type and need",
            body: "The Qualifier agent asks entity type, turnover band and which services are needed. The Enrichment agent adds company details so a partner can judge fit before calling.",
          },
          {
            title: "Book a discovery call and keep improving",
            body: "The Scheduler agent books a call with the right partner. The 20-minute optimisation loop keeps moving budget to the searches and audiences that bring retainer-type enquiries.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for a CA firm",
        intro: "Percentages of your own monthly budget, as an example of how a plan could look.",
        columns: ["Channel", "Share of your budget", "Job in the plan"],
        rows: [
          ["Google Search", "45%", "Business owners searching for specific compliance and accounting services"],
          ["LinkedIn Ads", "30%", "Founders and finance heads, filtered by company size and industry"],
          ["Meta (Facebook and Instagram)", "15%", "Informational posts for small business owners and traders"],
          ["YouTube", "10%", "Short explainers on deadlines and changes, featuring a partner"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. LinkedIn outreach runs alongside and is not part of ad spend.",
      },
      {
        kind: "points",
        heading: "Audiences and sample ad copy",
        intro: "Sample lines only, written to stay informational. You approve final wording against your own professional guidelines.",
        items: [
          {
            title: "Audience: founders of small companies",
            body: "Owners and directors of companies in their first few years, who often need bookkeeping, GST and annual filings handled together.",
          },
          {
            title: "Audience: traders and family businesses",
            body: "Established local businesses searching for GST, TDS or audit support in your city.",
          },
          {
            title: "Sample ad lines",
            body: "'GST return due soon? Here is what you need to keep ready.' · 'Monthly accounting and compliance for small private limited companies — a short guide.' · 'Setting up a company? Understand the steps before you start.'",
          },
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample conversation after a founder downloads a GST checklist from a Google ad.",
        messages: [
          { from: "business", text: "Hi Vikram, thanks for downloading the GST checklist from [Firm name]. Hope it's useful. Is this for your own company?" },
          { from: "lead", text: "Yes, we're a 2 year old pvt ltd. Our accountant left" },
          { from: "business", text: "Understood. Which of these do you need help with right now: monthly bookkeeping, GST returns, TDS, payroll, or annual ROC filings?" },
          { from: "lead", text: "Bookkeeping and GST mainly. ROC also due" },
          { from: "business", text: "Thanks. Roughly how many invoices do you raise in a month? It helps the partner understand the workload." },
          { from: "lead", text: "Maybe 60-80" },
          { from: "business", text: "Got it. Would you like a 20-minute call with one of our partners to understand your setup? They are free tomorrow at 11 am or Friday at 3 pm." },
          { from: "lead", text: "Friday 3 is good" },
          { from: "business", text: "Booked for Friday at 3 pm. The partner will call you on this number. If you have last year's filings handy, it will help them advise you." },
        ],
      },
      {
        kind: "callout",
        heading: "Your firm keeps full control of spend",
        body: "Campaigns live in your firm's own Google, LinkedIn and Meta ad accounts and wait in a paused state until a partner approves them. Pausing all of them takes one click. You sign in to each platform yourself, so we never see or store passwords, and every rupee of ad spend is billed by the platform straight to your firm.",
      },
      {
        kind: "prose",
        heading: "Careful language for a regulated profession",
        paragraphs: [
          "Chartered accountants should check their institute's current guidelines on advertising and solicitation before any campaign goes live, and other finance professionals should check the rules that apply to their registration. We keep ads informational and never use guaranteed-return, guaranteed-refund or 'lowest tax' language.",
          "LinkedIn outreach is kept polite and relevant: a short note, a useful resource and no pushy follow-ups. Every reply, enquiry and booked call is logged in the CRM, and the Report Writer agent sends partners a plain-English weekly summary they can read in two minutes.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are CA firms allowed to run ads?",
        a: "Practising chartered accountants have institute guidelines on advertising and solicitation. Please check the current rules with your institute. We keep campaigns informational and you approve every line.",
      },
      {
        q: "Can you avoid one-time ITR filers and find retainer clients?",
        a: "Yes. Targeting and keywords focus on business services, and the Qualifier agent asks about entity type and ongoing needs, so one-off filers are scored lower.",
      },
      {
        q: "Will LinkedIn outreach be sent from my profile?",
        a: "It can be. You connect your own account yourself, approve the message templates, and can stop outreach at any time.",
      },
      {
        q: "We are a wealth adviser. Can you promise returns in ads?",
        a: "No. We never write guaranteed-return or assured-profit claims. Ads explain your service and process, within the rules that apply to your registration.",
      },
      {
        q: "Do you guarantee new clients?",
        a: "No. We do not guarantee leads, clients or fees. We give you a reviewed plan, campaigns that spend only after your approval, and a weekly report.",
      },
    ],
    related: [
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "Lead generation for SaaS companies", href: "/industries/it-saas" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 6. Ecommerce                                                        */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "ecommerce",
    navLabel: "Ecommerce",
    cardSummary: "Ads, WhatsApp and email that bring shoppers back for D2C brands and online stores.",
    metaTitle: "Lead Generation for Ecommerce Brands | BoostMySites",
    metaDescription:
      "Ecommerce lead generation for D2C brands: ads in your own accounts, WhatsApp and email follow-up for subscribers and carts. You approve all spend.",
    primaryPhrase: "lead generation for ecommerce",
    eyebrow: "Industries · Ecommerce",
    h1: "Lead generation for ecommerce brands that want customers, not just clicks",
    intro:
      "Most visitors to an online store leave without buying and without leaving a way to reach them. Our lead generation for ecommerce turns ad traffic into subscribers you can talk to on WhatsApp and email, then brings them back to buy. It all runs inside your own ad accounts, and you approve every campaign first.",
    leadIndustry: "Ecommerce",
    blocks: [
      {
        kind: "points",
        heading: "Where online stores lose shoppers",
        intro: "D2C founders and store owners usually point to three leaks.",
        items: [
          {
            title: "Paid traffic leaves without a trace",
            body: "You pay for a click, the shopper browses two products and closes the tab. Without an email or WhatsApp number, the only way to reach them again is to pay for another ad.",
          },
          {
            title: "Abandoned carts and pre-purchase questions",
            body: "Shoppers hesitate over size, delivery time, cash on delivery or returns. If nobody answers that question quickly, the cart is simply left behind.",
          },
          {
            title: "Rising ad costs with no repeat buying",
            body: "When every sale needs a new ad click, margins get thin. Brands that never build a list of past buyers end up renting the same customers again and again.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a D2C brand",
        intro: "Example goal: 'Grow WhatsApp subscribers for our skincare brand and turn them into first orders.'",
        steps: [
          {
            title: "Turn ad clicks into subscribers",
            body: "Meta and Google ads point to an offer worth signing up for — a size guide, a first-order code, early access to a drop. The shopper leaves a WhatsApp number or email, with clear consent to be messaged.",
          },
          {
            title: "Answer the questions that block a purchase",
            body: "The WhatsApp assistant answers common pre-purchase questions about sizing, delivery and returns from the policies you provide, and sends the product link back when the shopper is ready.",
          },
          {
            title: "Follow up on carts and browsing",
            body: "The Follow-up agent sends reminders on WhatsApp and email to subscribers who left a cart, within the frequency limits you set.",
          },
          {
            title: "Win back past buyers",
            body: "Email and WhatsApp sequences invite past buyers to restock, try a related product or see a new launch, so not every order depends on paid ads.",
          },
          {
            title: "Let the loop handle budget",
            body: "Every 20 minutes the optimisation loop checks which products, audiences and creatives are producing subscribers and orders, shifts budget toward them and pauses the rest. Fatigued creatives are flagged, which matters for fast-moving product ads.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for an online store",
        intro: "A share of your own monthly ad budget, shown to explain the approach.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Meta (Instagram and Facebook)", "45%", "Product reels and sign-up offers to new audiences"],
          ["Google Search and Shopping", "30%", "Shoppers searching for your product category or brand"],
          ["YouTube", "10%", "Product demos and unboxing videos"],
          ["Meta retargeting", "15%", "Store visitors and video viewers who have not subscribed yet"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. Where available in your market, TikTok or Snapchat can be added.",
      },
      {
        kind: "prose",
        heading: "Audiences and sample ad copy",
        paragraphs: [
          "Starting audiences would usually be people interested in your category, lookalikes of your past buyers built from your own customer list, and visitors who browsed product pages in the last few weeks.",
          "Sample line for new audiences: 'Not sure about your shade? Get our two-minute shade guide on WhatsApp.'",
          "Sample line for retargeting: 'Still thinking about the cotton kurta set? Ask us anything about sizing before you order.'",
          "Sample line for past buyers: 'Running low? Your usual is back in stock — reorder in two taps.' These lines are for illustration; we write final copy from your products, offers and brand voice, and you approve it.",
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample conversation with a shopper who subscribed through an Instagram ad and left an item in the cart.",
        messages: [
          { from: "business", text: "Hi Sana, thanks for joining [Brand name] on WhatsApp. Here is the size guide you asked for. Any questions, just reply here." },
          { from: "lead", text: "Thanks. I added the green kurta set but not sure M or L" },
          { from: "business", text: "Happy to help. What is your usual size in tops, and do you prefer a relaxed or a closer fit?" },
          { from: "lead", text: "Usually M, I like it loose" },
          { from: "business", text: "Then L would give you the relaxed fit. The set is cotton and does not shrink much after the first wash." },
          { from: "lead", text: "Ok. Is COD available to Jaipur?" },
          { from: "business", text: "Yes, cash on delivery is available to Jaipur, and delivery usually takes a few working days. Here is your cart link with size L selected." },
          { from: "lead", text: "Done, ordered" },
          { from: "business", text: "Thank you! You'll get tracking details here once it ships." },
        ],
      },
      {
        kind: "callout",
        heading: "Your store, your ad accounts, your switch",
        body: "We set up campaigns in your brand's own Meta, Google and YouTube accounts and keep them paused until you approve. During a stock-out or a sale change, one click pauses everything. You log in to each platform yourself, we never see or store your passwords, and the platforms bill ad spend directly to your business.",
      },
      {
        kind: "prose",
        heading: "Consent and policy in ecommerce messaging",
        paragraphs: [
          "WhatsApp and email follow-ups only go to people who chose to subscribe, and every message makes it easy to stop. Ad copy follows each platform's commerce policies: no fake urgency, no claims your product page cannot back up, and discounts that actually exist in your store.",
          "Each week the Report Writer agent explains in plain English how many subscribers came in, which products drew the most interest, how carts were followed up and where budget moved. Leads are scored and kept in the CRM, so your team can see who is a repeat buyer and who is new.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this only for collecting leads, or does it drive sales too?",
        a: "Both. Ads can point straight to products for sales and to sign-up offers for subscribers, and the follow-up system works to turn subscribers into orders. We do not guarantee sales or a return on ad spend.",
      },
      {
        q: "Can the WhatsApp assistant answer product questions?",
        a: "Yes, from the product details and policies you provide. Anything outside that, such as a complaint or a special request, is handed to your team.",
      },
      {
        q: "Will this spam our customers?",
        a: "No. Messages only go to people who opted in, you set how often follow-ups can go out, and every subscriber can stop messages at any time.",
      },
      {
        q: "We sell on marketplaces too. Does this help there?",
        a: "The system is built around your own store and your own customer list. Ads can point anywhere you choose, but follow-up works best for customers you can contact directly.",
      },
      {
        q: "How do I decide how much to spend on ads?",
        a: "Our ad budget calculator can help you pick a starting number. Then you set a goal and budget, and the plan splits it across platforms for you to review and change before approving.",
      },
    ],
    related: [
      { label: "WhatsApp automation", href: "/services/whatsapp-automation" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Ad budget calculator", href: "/tools/ad-budget-calculator" },
      { label: "Lead generation for agencies", href: "/industries/agencies" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 7. IT and SaaS                                                      */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "it-saas",
    navLabel: "IT and SaaS",
    cardSummary: "Demo bookings and trial sign-ups for SaaS products and IT service firms, through ads, LinkedIn and email.",
    metaTitle: "Lead Generation for SaaS Companies | BoostMySites",
    metaDescription:
      "Lead generation for SaaS and IT companies: LinkedIn and Google ads, outreach, enrichment and demo booking — all paused until you approve the plan.",
    primaryPhrase: "lead generation for SaaS companies",
    eyebrow: "Industries · IT and SaaS",
    h1: "Lead generation for SaaS companies and IT service firms",
    intro:
      "B2B buyers research quietly, compare several tools and only talk to sales late. Our lead generation for SaaS companies reaches the right roles at the right companies, enriches every sign-up, and books demos for the ones that fit your ideal customer. IT service firms get the same system for discovery calls.",
    leadIndustry: "IT and SaaS",
    blocks: [
      {
        kind: "points",
        heading: "Why pipeline is hard for SaaS and IT companies",
        intro: "Founders, sales heads and growth teams usually describe these three problems.",
        items: [
          {
            title: "Sign-ups that never become pipeline",
            body: "Free trials and newsletter sign-ups pile up from students, competitors and tiny teams. Sales cannot tell which ones belong to a company that could actually buy.",
          },
          {
            title: "Long cycles with many people involved",
            body: "A user finds the tool, a manager evaluates it and finance signs off. If your follow-up only reaches the first person, the deal stalls when it moves upstairs.",
          },
          {
            title: "Outbound that feels like spam",
            body: "Mass cold email and generic LinkedIn messages burn your domain and your brand. Small teams do not have time to research and personalise every message by hand.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for a SaaS or IT company",
        intro: "Example goal: 'Book demos with operations heads at logistics companies with 50 to 500 employees.'",
        steps: [
          {
            title: "Define the ideal customer in plain words",
            body: "Industry, company size, region and the job titles that use and approve your product. This drives ad targeting, keyword choice and outreach lists.",
          },
          {
            title: "Combine intent ads with account-based reach",
            body: "Google Search catches people searching for your category and competitor alternatives. LinkedIn Ads reach the named roles. ChatGPT ads and YouTube can be tested for category education where they fit.",
          },
          {
            title: "Enrich and score every sign-up",
            body: "The Enrichment agent adds company size, industry and role to each lead. The Lead Scout finds similar accounts, and the score tells sales which sign-ups deserve a personal reply.",
          },
          {
            title: "Personal outreach at a human pace",
            body: "LinkedIn outreach and email sequences go to fitting accounts with short, relevant messages, not blasts. Replies are handed to your team immediately.",
          },
          {
            title: "Book the demo and keep tuning",
            body: "The Scheduler agent books demos into your sales calendar. The 20-minute optimisation loop shifts budget to the keywords, audiences and ads that produce qualified demos, not just cheap sign-ups.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for a B2B SaaS product",
        intro: "As a share of your own monthly ad budget. This is one example of a plan, not a recommendation.",
        columns: ["Platform", "Share of your budget", "Job in the plan"],
        rows: [
          ["Google Search", "40%", "Category, problem and 'alternative to' searches"],
          ["LinkedIn Ads", "35%", "Decision-makers by job title, industry and company size"],
          ["YouTube", "10%", "Product walkthroughs for evaluators"],
          ["ChatGPT ads", "5%", "A small test where buyers research your category"],
          ["Meta retargeting", "10%", "Website and pricing-page visitors who have not booked a demo"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. Outreach and email run alongside and are not part of ad spend.",
      },
      {
        kind: "points",
        heading: "Audiences and sample ad copy",
        intro: "These ad lines are samples to show tone. Final copy comes from your product and is approved by you.",
        items: [
          {
            title: "Audience: the people who feel the pain",
            body: "Team leads and managers who would use the product daily, reached on LinkedIn and through problem-based searches.",
          },
          {
            title: "Audience: the people who sign off",
            body: "Department heads and founders at companies that match your size and industry, reached with short explainers on time and cost saved, plus product demos.",
          },
          {
            title: "Sample ad lines",
            body: "'Still tracking shipments in spreadsheets? See a 15-minute walkthrough.' · 'An alternative to stitching three tools together. Book a demo with our product team.' · 'Built for ops teams of 20 to 200. Try it on your own data.'",
          },
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample follow-up after an operations manager starts a free trial and shares a WhatsApp number at sign-up.",
        messages: [
          { from: "business", text: "Hi Arjun, thanks for starting a trial of [Product name]. I'm the onboarding assistant. Want a quick tip to set up your first route board?" },
          { from: "lead", text: "Yes please. Got stuck on importing" },
          { from: "business", text: "Here is a 2-minute guide to importing from a CSV. How many vehicles does your team manage, roughly?" },
          { from: "lead", text: "Around 120 across 3 cities" },
          { from: "business", text: "Thanks. At that size, most teams find a guided setup easier. Would a 20-minute call with our solutions team help? They can import your data with you." },
          { from: "lead", text: "Sure. My manager might join" },
          { from: "business", text: "Great, it helps to have both of you. We have Tuesday at 3 pm or Wednesday at 11 am." },
          { from: "lead", text: "Wednesday 11" },
          { from: "business", text: "Booked for Wednesday at 11 am. A calendar invite is on its way — feel free to forward it to your manager." },
        ],
      },
      {
        kind: "callout",
        heading: "Your accounts, your budget, your approval",
        body: "The plan is built inside your company's own Google, LinkedIn and other ad accounts and staged paused. Nothing spends until you approve it, and one click pauses every campaign. You authenticate each platform yourself — we never see or store passwords — and ad spend is invoiced by the platforms to your company.",
      },
      {
        kind: "prose",
        heading: "Data, privacy and sensible outreach",
        paragraphs: [
          "If you sell into regions with strict privacy laws, such as the EU, outreach and email follow the consent and opt-out rules that apply there. We keep sending volumes modest, use your own domains with care and stop any sequence the moment a prospect replies or opts out.",
          "Every lead lands in the CRM with its enrichment data, score and full conversation history. The Report Writer agent sends a plain-English weekly report so founders and sales heads can see which channels produced demos, not just clicks.",
        ],
      },
    ],
    faqs: [
      {
        q: "We are an IT services firm, not a product. Does this fit us?",
        a: "Yes. The same system works for services: ads and outreach target the industries you serve, and the goal becomes a discovery call rather than a product demo.",
      },
      {
        q: "Can you target specific companies on LinkedIn?",
        a: "LinkedIn Ads can target by company attributes, and outreach can focus on accounts that match your ideal customer. You review the target list and messages before anything starts.",
      },
      {
        q: "How do you stop trial sign-ups from flooding sales?",
        a: "Every sign-up is enriched and scored. Only those matching your ideal customer get routed for a personal follow-up; the rest get helpful automated onboarding.",
      },
      {
        q: "What are ChatGPT ads, and do we need them?",
        a: "They are ads shown where people use ChatGPT, where available. We suggest them only as a small test when your buyers research the category that way, and you decide whether to include them.",
      },
      {
        q: "Will you guarantee demos or pipeline value?",
        a: "No. We do not guarantee leads, demos, pipeline or revenue. You get a plan you approve, controls you keep, and a weekly report on what each channel produced.",
      },
    ],
    related: [
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "Email marketing", href: "/services/email-marketing" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "Lead generation for agencies", href: "/industries/agencies" },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* 8. Agencies                                                         */
  /* ------------------------------------------------------------------ */
  {
    kind: "industry",
    slug: "agencies",
    navLabel: "Agencies",
    cardSummary: "A steady flow of new-client conversations for marketing, creative, web and consulting agencies.",
    metaTitle: "Lead Generation for Agencies | BoostMySites",
    metaDescription:
      "Lead generation for agencies: LinkedIn outreach, targeted ads and WhatsApp follow-up that book discovery calls. Paused in your accounts until approved.",
    primaryPhrase: "lead generation for agencies",
    eyebrow: "Industries · Agencies",
    h1: "Lead generation for agencies that are tired of feast-or-famine months",
    intro:
      "Agencies are great at winning clients for others and often too busy to do it for themselves. We run lead generation for agencies that keeps outreach, ads and follow-up going while your team delivers client work. The result we aim for is a calendar of discovery calls with businesses that fit your services.",
    leadIndustry: "Agencies",
    blocks: [
      {
        kind: "points",
        heading: "Three reasons agency pipelines run dry",
        intro: "Marketing, design, web, video and consulting agencies tell us the same story.",
        items: [
          {
            title: "New business stops when delivery gets busy",
            body: "When the team is flat out on client work, nobody sends proposals or follows up. Two months later a big client leaves and the pipeline is empty.",
          },
          {
            title: "Too many enquiries are the wrong size",
            body: "Small one-off jobs and people asking for a logo 'by tomorrow' eat the founder's time. The retainers you actually want are harder to find.",
          },
          {
            title: "Every agency sounds the same",
            body: "Prospects get pitched by many agencies each week. Generic messages about 'growing your brand' are ignored, and personalising each one by hand does not scale.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "The campaign plan we would run for an agency",
        intro: "Example goal: 'Book discovery calls with D2C brands doing their own marketing who need a performance agency.'",
        steps: [
          {
            title: "Pick a niche you can prove",
            body: "We start from the industries and services where you already have work to show. A focused message to one type of client beats a broad one to everyone.",
          },
          {
            title: "Run outreach in the background",
            body: "The Lead Scout finds businesses that match your target, the Enrichment agent adds context, and LinkedIn outreach and email sequences go out at a steady, human pace — even in the weeks you are busy delivering.",
          },
          {
            title: "Back it up with ads where buyers look",
            body: "LinkedIn Ads reach founders and marketing heads, Google Search covers people looking for your service in your city, and Meta retargets visitors who read your case work.",
          },
          {
            title: "Qualify before the call",
            body: "The Qualifier agent asks about the prospect's current setup, the kind of help they want and their monthly budget range, so the founder joins calls already knowing the fit.",
          },
          {
            title: "Book, report and adjust",
            body: "The Scheduler agent books discovery calls. The 20-minute optimisation loop moves budget toward what produces qualified calls, and the Report Writer sends a plain-English weekly summary.",
          },
        ],
      },
      {
        kind: "table",
        heading: "Sample budget split for an agency",
        intro: "A share of your own ad budget, to show the shape of a plan. Outreach runs alongside.",
        columns: ["Channel", "Share of your budget", "Job in the plan"],
        rows: [
          ["LinkedIn Ads", "40%", "Founders and marketing heads in your target industries"],
          ["Google Search", "30%", "Businesses searching for your service in your city or niche"],
          ["Meta retargeting", "15%", "People who visited your work pages or watched your videos"],
          ["YouTube", "10%", "Short breakdowns of how you approach client problems"],
          ["ChatGPT ads", "5%", "A small test where buyers research agencies and services"],
        ],
        note: "Illustrative split — your plan is built from your goal and budget. LinkedIn outreach and email are not part of ad spend.",
      },
      {
        kind: "points",
        heading: "Audiences and sample ad copy",
        intro: "Sample lines only. Real copy comes from your own work, niche and voice.",
        items: [
          {
            title: "Audience: founders running marketing themselves",
            body: "Owners of growing businesses in your niche who are still handling ads, content or design in-house.",
          },
          {
            title: "Audience: in-house marketing teams that need extra hands",
            body: "Marketing managers at mid-sized companies who need a specialist partner for one channel or a launch.",
          },
          {
            title: "Sample ad lines",
            body: "'Running your own Meta ads between meetings? Let's talk about handing them over.' · 'Website redesigns for clinics, built around booking appointments.' · 'See how we plan a product launch, step by step — then book a 20-minute chat.'",
          },
        ],
      },
      {
        kind: "chat",
        heading: "Sample WhatsApp follow-up script",
        intro: "A sample follow-up with a founder who replied to LinkedIn outreach and shared their number.",
        messages: [
          { from: "business", text: "Hi Meera, thanks for replying on LinkedIn. This is the team at [Agency name]. You mentioned your ads are being run in-house right now?" },
          { from: "lead", text: "Yes, I do it myself on weekends honestly" },
          { from: "business", text: "That's common for founders at your stage. Which channels are you running, and what would you most like off your plate?" },
          { from: "lead", text: "Meta and Google. Mostly want someone to handle Meta properly" },
          { from: "business", text: "Got it. Roughly what do you spend on Meta each month? A range is fine — it helps us suggest the right kind of support." },
          { from: "lead", text: "Around 2-3 lakhs" },
          { from: "business", text: "Thanks. Would a 20-minute call with our founder help? He can look at your current account structure with you. Thursday 4 pm or Friday 11 am?" },
          { from: "lead", text: "Friday works" },
          { from: "business", text: "Booked for Friday at 11 am. Our founder will send a meeting link. If you can, share read access to the ad account before the call." },
        ],
      },
      {
        kind: "callout",
        heading: "Your agency's accounts, your approval",
        body: "Campaigns for your own new business run in your agency's own ad accounts, staged paused until you approve them, with one click to pause everything. You sign in to each platform yourself and we never see or store your passwords. Ad spend is billed by the platforms to your agency, not routed through us.",
      },
      {
        kind: "prose",
        heading: "Protecting your agency's reputation",
        paragraphs: [
          "Your outreach reflects on your brand, so we keep it modest: a small number of personal messages a day, no fake familiarity and no inflated claims. We only reference client work you are allowed to share, and we never invent results or logos.",
          "Prospects who say 'not now' are moved to a slower email track rather than chased. The CRM shows every lead's source, score and conversation, and the weekly report makes it clear whether outreach, ads or referrals are bringing in the calls.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can we use this to find clients for our own agency, not just our clients?",
        a: "Yes, this page is about exactly that: running outreach, ads and follow-up to win new clients for your agency.",
      },
      {
        q: "Will prospects know the outreach is automated?",
        a: "Messages are written in your voice, sent at a human pace and replies come straight to your team. You approve the templates before anything is sent.",
      },
      {
        q: "We only want retainer clients. Can you filter for that?",
        a: "Yes. The qualifying questions ask about ongoing needs and budget range, and the lead score reflects how closely each prospect fits your retainer criteria.",
      },
      {
        q: "Do we need a big ad budget to start?",
        a: "No. Some agencies start with outreach and a small retargeting budget. You set a budget you are comfortable with, and the plan is built around it.",
      },
      {
        q: "Will you guarantee new retainers?",
        a: "No. We do not guarantee leads, calls or signed clients. You approve the plan, keep control of spend and see a weekly report on what came in.",
      },
    ],
    related: [
      { label: "LinkedIn outreach", href: "/services/linkedin-outreach" },
      { label: "AI ad campaigns", href: "/services/ai-ad-campaigns" },
      { label: "Leads and CRM", href: "/services/leads-crm" },
      { label: "Lead response calculator", href: "/tools/lead-response-calculator" },
      { label: "Lead generation for SaaS companies", href: "/industries/it-saas" },
    ],
  },
];
