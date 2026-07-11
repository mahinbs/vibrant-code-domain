export type EmDomain = {
  id: string;
  domain: string;
  resend_domain_id: string | null;
  status: "pending" | "verified" | "failed";
  dns_records: DnsRecord[];
  verified_at: string | null;
  is_primary: boolean;
  warmup_started_at: string | null;
  created_at: string;
};

export type DnsRecord = {
  record: string;
  name: string;
  type: string;
  value: string;
  priority?: number;
  status?: string;
};

export type EmSendingIdentity = {
  id: string;
  domain_id: string;
  email: string;
  display_name: string;
  daily_cap: number;
  sent_today: number;
  warmup_status: "warming" | "active" | "paused";
  is_active: boolean;
  last_sent_at: string | null;
  rotation_order: number;
};

export type EmLead = {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  role: string | null;
  phone: string | null;
  source: string;
  pipeline: "inbound" | "cold" | "blast_only";
  status: string;
  reshab_lead_id: string | null;
  company_id: string | null;
  research_summary: string | null;
  pain_points: string[];
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

export type EmCampaign = {
  id: string;
  type: "cold" | "followup" | "blast" | "inbound_nurture";
  name: string;
  status: string;
  created_by: string;
  segment_filter: Record<string, unknown>;
  subject: string | null;
  body_html: string | null;
  body_text: string | null;
  stats: { sent?: number; opened?: number; clicked?: number; replied?: number; bounced?: number };
  created_at: string;
};

export type EmSequence = {
  id: string;
  name: string;
  pipeline: "cold" | "inbound";
  is_default: boolean;
  description: string | null;
  vertical: string | null;
  is_active: boolean;
  cloned_from_id: string | null;
  settings: Record<string, unknown>;
  created_at: string;
};

export type EmStepType = "template" | "ai_draft" | "case_study" | "hybrid";
export type EmAiAngle = "opener" | "niche_followup" | "breakup" | "case_study_tease" | "custom";
export type EmCaseStudyMode = "fixed" | "auto_industry";
export type EmStepCondition =
  | "no_reply"
  | "always"
  | "no_meeting"
  | "no_open"
  | "opened_not_replied"
  | "opened"
  | "clicked";

export type EmBranchLane = "main" | "opened" | "not_opened";

export type EmSequenceStep = {
  id: string;
  sequence_id: string;
  step_order: number;
  delay_days: number;
  delay_hours: number;
  subject_template: string;
  body_template: string;
  ai_generated: boolean;
  condition: EmStepCondition;
  step_type: EmStepType;
  ai_angle: EmAiAngle | null;
  ai_instructions: string | null;
  case_study_slug: string | null;
  case_study_url: string | null;
  case_study_mode: EmCaseStudyMode;
  intro_template: string | null;
  branch_lane: EmBranchLane;
  branch_after_step_order: number | null;
  metadata: Record<string, unknown>;
};

export type EmSequenceEnrollment = {
  id: string;
  lead_id: string;
  sequence_id: string;
  campaign_id: string | null;
  current_step: number;
  status: "active" | "paused" | "completed" | "stopped";
  enrolled_at: string;
  next_send_at: string | null;
  stopped_reason: string | null;
  last_skip_reason: string | null;
  last_skip_step_order: number | null;
  em_sequences?: EmSequence;
};

export type EmSequenceTemplate = {
  id: string;
  name: string;
  subject: string;
  body: string;
  tags: string[];
  created_at: string;
};

export type EmSequenceStepStats = {
  step_id: string;
  step_order: number;
  sent: number;
  opened: number;
  replied: number;
};

export type EmEmailMessage = {
  id: string;
  lead_id: string | null;
  send_id: string | null;
  direction: "outbound" | "inbound";
  from_email: string;
  to_email: string;
  subject: string;
  body_html: string | null;
  body_text: string | null;
  is_read: boolean;
  sent_at: string | null;
  received_at: string | null;
  created_at: string;
};

export type EmEmailEvent = {
  id: string;
  send_id: string | null;
  lead_id: string | null;
  event_type: string;
  metadata: Record<string, unknown>;
  occurred_at: string;
};

export type EmOverviewStats = {
  sentToday: number;
  dailyCap: number;
  openRate: number;
  replyRate: number;
  bounceRate: number;
  unreadReplies: number;
  activeSequences: number;
  pendingFollowups: number;
  domainStatus: string;
};

export type EmCaseStudyOption = {
  slug: string;
  category: string;
  title: string;
  hook: string;
  path: string;
};
