export type NicheSymptom = { label: string; value: string };
export type NicheLogEntry = {
  time: string;
  text?: string;
  command?: string;
  output?: string;
  status?: "ok" | "warn" | "info";
};

export type BusinessAutomationNiche = {
  id: string;
  label: string;
  hiddenPain: string;
  beforeStory: string;
  beforeSymptoms: NicheSymptom[];
  manualSteps: string[];
  log: NicheLogEntry[];
  afterStats: NicheSymptom[];
};

export const businessAutomationNiches: BusinessAutomationNiche[] = [
  {
    id: "realestate",
    label: "Real Estate",
    hiddenPain:
      "Your broker followed up 14 hours late. The buyer signed with someone else at 11 AM.",
    beforeStory:
      "A serious buyer fills your inquiry form at 9 PM Friday. Your team sees it Saturday morning. They call — no answer. Call again at 2 PM. The buyer toured a competitor at 10 AM, loved it, and paid the booking amount. You never had a chance.",
    beforeSymptoms: [
      { label: "Avg lead response time", value: "14 hrs" },
      { label: "Leads contacted same day", value: "31%" },
      { label: "Post-visit follow-ups sent", value: "1 in 5" },
    ],
    manualSteps: [
      "A serious buyer fills your inquiry form at 9 PM Friday — your team sees it Saturday morning",
      "Broker checks MagicBricks / 99acres inquiries once or twice a day",
      "Lead details copied into Excel or WhatsApp group manually — calls often hours late",
      "Buyer toured a competitor at 10 AM, loved it, and paid booking — you never had a chance",
      "Post-visit follow-up depends on broker remembering to send price sheet",
    ],
    log: [
      {
        time: "9:02 PM",
        command: "ingest_lead --source=magicbricks --notify=whatsapp",
        output: "New inquiry received — WhatsApp sent instantly",
        status: "ok",
      },
      {
        time: "9:03 PM",
        command: "qualify_lead --budget=80-100L --timeline=2mo",
        output: "Budget ₹80–100L, ready to move in 2 months",
        status: "ok",
      },
      {
        time: "9:04 PM",
        command: "send_slots --count=3 --type=site_visit",
        output: "3 available site visit slots sent for lead to choose",
        status: "ok",
      },
      {
        time: "9:47 PM",
        command: "confirm_booking --slot='Sat 11 AM' --sync=calendar",
        output: "Lead confirmed. Broker calendar updated automatically",
        status: "ok",
      },
      {
        time: "Sat 10:30 AM",
        command: "send_reminder --offset=30m --include=address",
        output: "Reminder sent: site visit in 30 minutes",
        status: "ok",
      },
      {
        time: "Sat 2 PM",
        command: "trigger_sequence --flow=post_visit --attach=price_sheet,floor_plan,emi",
        output: "Post-visit sequence started. All assets delivered",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "Response time", value: "< 2 min" },
      { label: "Leads contacted", value: "100%" },
      { label: "Site visits booked", value: "3.4× more" },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    hiddenPain:
      "Patients intend to come back. They just never get reminded. Your schedule has invisible gaps every single day.",
    beforeStory:
      "Dr. Sharma sees 40 patients a week. 8 don't show. No one called them the day before. Lab reports are ready but sitting in a folder — patients find out only when they walk in by chance. Follow-up appointments disappear into thin air.",
    beforeSymptoms: [
      { label: "No-show rate (avg clinic)", value: "18–22%" },
      { label: "Lab reports collected on time", value: "54%" },
      { label: "Follow-up care completion", value: "40%" },
    ],
    manualSteps: [
      "Dr. Sharma sees 40 patients a week — 8 don't show because no one called the day before",
      "Reception prints tomorrow's appointment list each evening",
      "Staff calls patients one by one to confirm — if they have time",
      "Lab reports sit in a folder — patients find out only when they walk in by chance",
      "Follow-up appointments booked ad hoc at checkout — many slip through",
    ],
    log: [
      {
        time: "D−2",
        command: "send_reminder --channel=whatsapp --patients=34 --window=7d",
        output: "34 appointment reminders queued for upcoming week",
        status: "ok",
      },
      {
        time: "D−1",
        command: "send_reminder --confirm --patients=34 --include=location",
        output: "29 of 34 confirmed",
        status: "warn",
      },
      {
        time: "D-day 7 AM",
        command: "send_nudge --template=morning --doctor='Dr. Sharma' --time=11AM",
        output: "Morning nudge delivered to all confirmed patients",
        status: "ok",
      },
      {
        time: "2:30 PM",
        command: "notify_lab_report --patient=auto --channel=whatsapp",
        output: "Lab report ready — patient notified. No staff needed",
        status: "ok",
      },
      {
        time: "D+7",
        command: "trigger_followup --channel=whatsapp --book_in_chat=true",
        output: "Follow-up sent. Patient booked next appointment in chat",
        status: "ok",
      },
      {
        time: "D+30",
        command: "run_campaign --type=wellness_check --reengage=lapsed",
        output: "Monthly wellness check triggered. Lapsed patients re-engaged",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "No-show reduction", value: "62%" },
      { label: "Reports collected on time", value: "96%" },
      { label: "Patient retention", value: "+41%" },
    ],
  },
  {
    id: "staffing",
    label: "Staffing / HR",
    hiddenPain:
      "By the time your recruiter calls the shortlisted candidates, 6 out of 10 have already joined someone else.",
    beforeStory:
      "300 resumes arrive for a single role. Your recruiter spends 12 days screening. They call the top 10. 6 declined — they accepted offers days ago. The role stays open another month. The client is quietly looking for another agency.",
    beforeSymptoms: [
      { label: "Time to shortlist", value: "10–14 days" },
      { label: "Top candidates still available", value: "38%" },
      { label: "Interview scheduling time", value: "3 days avg" },
    ],
    manualSteps: [
      "300 resumes arrive for one role — recruiter spends 12 days screening manually",
      "Each CV read and scored by hand against the JD",
      "Top 10 called days later — 6 already accepted offers elsewhere",
      "Interview slots negotiated over email and phone, one candidate at a time",
      "Offer letter drafted, reviewed, and sent by hand while the role stays open another month",
    ],
    log: [
      {
        time: "9:00 AM",
        command: "screen_resumes --role=senior_dev --count=300",
        output: "300 resumes received. AI screening started",
        status: "ok",
      },
      {
        time: "9:04 AM",
        command: "rank_candidates --top=18 --match=jd",
        output: "Top 18 shortlisted and ranked against JD",
        status: "ok",
      },
      {
        time: "9:05 AM",
        command: "send_slots --candidates=18 --channel=whatsapp",
        output: "Interview slot options sent to all 18 candidates",
        status: "ok",
      },
      {
        time: "9:42 AM",
        command: "sync_calendar --confirmed=11 --notify=client",
        output: "11 candidates confirmed. Calendar updated. Client notified",
        status: "ok",
      },
      {
        time: "Day 2",
        command: "generate_offer --candidate=selected --auto_send=true",
        output: "Offer letter generated and sent automatically",
        status: "ok",
      },
      {
        time: "Day 3",
        command: "trigger_onboarding --collect=documents --flow=automated",
        output: "Onboarding checklist triggered. Documents collected",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "Shortlist time", value: "< 10 min" },
      { label: "Top candidates reached", value: "100%" },
      { label: "Time-to-hire", value: "−67%" },
    ],
  },
  {
    id: "fintech",
    label: "Fintech / NBFC",
    hiddenPain:
      "Customers who genuinely intend to pay their EMI still miss it — because your reminder process depends on who showed up to work that day.",
    beforeStory:
      "Your collections team makes 200 manual calls a day. Half go unanswered. Some customers feel harassed. Some genuinely forgot and now have a late fee. The NPA number climbs every quarter — not because customers can't pay, but because the system failed them.",
    beforeSymptoms: [
      { label: "Manual reminder calls per day", value: "200+" },
      { label: "EMI paid on due date", value: "61%" },
      { label: "NPA cases from missed reminders", value: "~18%" },
    ],
    manualSteps: [
      "Collections team makes 200+ manual calls a day — half go unanswered",
      "Some customers feel harassed; others genuinely forgot and now have a late fee",
      "Agents dial customers one by one from the morning overdue list",
      "Payment outcomes logged in spreadsheet, not always in CRM",
      "NPA climbs every quarter — not because customers can't pay, but because reminders failed",
    ],
    log: [
      {
        time: "D−3",
        command: "send_emi_reminder --customers=847 --include=amount,date,link",
        output: "EMI reminders sent to all 847 customers",
        status: "ok",
      },
      {
        time: "D−1",
        command: "send_followup --channel=upi_deeplink --customers=847",
        output: "74% of customers paid at this stage",
        status: "ok",
      },
      {
        time: "Due date",
        command: "send_nudge --template=morning --track=payments",
        output: "821 payments received before noon",
        status: "ok",
      },
      {
        time: "D+1",
        command: "trigger_escalation --overdue=26 --level=soft",
        output: "Soft escalation message sent to 26 accounts",
        status: "warn",
      },
      {
        time: "D+3",
        command: "assign_agent --unresolved_only=true --sla=7d",
        output: "91% resolved within the week",
        status: "ok",
      },
      {
        time: "Monthly",
        command: "generate_statements --all_borrowers --auto_deliver=true",
        output: "Loan statements auto-generated and delivered",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "On-time payment rate", value: "+34%" },
      { label: "Collection calls reduced", value: "−78%" },
      { label: "NPA reduction", value: "21%" },
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    hiddenPain:
      "68% of your customers abandon their cart. You have zero system to bring them back. That revenue is just gone.",
    beforeStory:
      "1,000 people visit your store today. 680 add to cart and disappear. Your team is drowning in return requests and unanswered reviews. No one has time to chase abandoned carts. You watch ₹4L+ in potential orders evaporate every week.",
    beforeSymptoms: [
      { label: "Cart abandonment rate", value: "68%" },
      { label: "Avg return response time", value: "48+ hrs" },
      { label: "Post-purchase review requests", value: "0%" },
    ],
    manualSteps: [
      "1,000 people visit today — 680 add to cart and disappear with zero recovery",
      "Support inbox flooded with return and order-status queries",
      "Abandoned carts checked manually — if anyone has time that day",
      "Return requests triaged by hand; pickup slots sent one customer at a time",
      "₹4L+ in potential orders evaporates every week — no one chases abandoned carts",
    ],
    log: [
      {
        time: "11:22 AM",
        command: "recover_cart --delay=30m --channel=whatsapp",
        output: "Cart abandoned — recovery message sent",
        status: "ok",
      },
      {
        time: "11:52 AM",
        command: "apply_discount --percent=5 --trigger=no_purchase",
        output: "Customer returned and completed order",
        status: "ok",
      },
      {
        time: "Day 3",
        command: "request_review --on=delivery_confirmed",
        output: "Review request sent. 4.6★ received",
        status: "ok",
      },
      {
        time: "Return req.",
        command: "process_return --ai_triage=true --send_pickup_slot=true",
        output: "Ticket raised, pickup slot sent in under 2 minutes",
        status: "ok",
      },
      {
        time: "Refund",
        command: "track_refund --notify_at_each_stage=true",
        output: "Status updates sent. Zero manual calls",
        status: "ok",
      },
      {
        time: "Day 30",
        command: "trigger_campaign --type=repeat_purchase --based_on=history",
        output: "Repeat purchase campaign triggered",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "Cart recovery rate", value: "24%" },
      { label: "Return handling time", value: "< 5 min" },
      { label: "Repeat purchase rate", value: "+38%" },
    ],
  },
  {
    id: "manufacturing",
    label: "Manufacturing / B2B",
    hiddenPain:
      "Purchase orders arrive on WhatsApp and email. Someone manually copies them into ERP. One wrong digit. Wrong quantity shipped. Client relationship takes the hit.",
    beforeStory:
      "Your ops team handles 40 POs a day across email, WhatsApp, and PDF attachments. Each one is read by a human and re-typed into the system. A 4% error rate sounds small — until a client receives 500 units instead of 5,000 and you're paying for the reshipping.",
    beforeSymptoms: [
      { label: "POs entered manually per day", value: "30–50" },
      { label: "Data entry error rate", value: "4–7%" },
      { label: "PO to acknowledgment time", value: "4–6 hrs" },
    ],
    manualSteps: [
      "40 POs a day arrive on WhatsApp, email, and PDF — each read and re-typed by a human",
      "Data entered line by line into ERP; a 4% error rate sounds small until it's not",
      "Wrong digit ships 500 units instead of 5,000 — client pays for reshipping",
      "Stock checked manually against warehouse spreadsheet",
      "Acknowledgment and tracking updates chased by phone when the client asks",
    ],
    log: [
      {
        time: "10:14 AM",
        command: "ingest_po --source=email --format=pdf --extract=ai",
        output: "PO received. All line items extracted",
        status: "ok",
      },
      {
        time: "10:14 AM",
        command: "validate_po --against=catalog,pricing",
        output: "Data validated. Zero mismatches",
        status: "ok",
      },
      {
        time: "10:15 AM",
        command: "create_order --erp=sync --id=PO-2847",
        output: "Order created in ERP. No human touch",
        status: "ok",
      },
      {
        time: "10:15 AM",
        command: "send_ack --client=auto --dispatch_eta=3d",
        output: "Acknowledgment sent: PO received, dispatch in 3 days",
        status: "ok",
      },
      {
        time: "D+2",
        command: "trigger_dispatch --check_stock=true --notify=warehouse",
        output: "Dispatch reminder triggered. Stock confirmed",
        status: "ok",
      },
      {
        time: "D+3",
        command: "send_tracking --generate_invoice=true",
        output: "Tracking link sent. Invoice generated automatically",
        status: "ok",
      },
    ],
    afterStats: [
      { label: "Data entry errors", value: "~0%" },
      { label: "Acknowledgment time", value: "< 1 min" },
      { label: "Ops team capacity freed", value: "60%" },
    ],
  },
];
