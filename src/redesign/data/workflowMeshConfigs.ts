import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BarChart3,
  Bell,
  Brain,
  Building2,
  Calendar,
  CheckSquare,
  ClipboardList,
  Cpu,
  Database,
  FileText,
  FormInput,
  Globe,
  Layers,
  Mail,
  MessageSquare,
  Network,
  Package,
  Send,
  ShieldCheck,
  ShoppingCart,
  Slack,
  Ticket,
  UserCheck,
  Users,
  Webhook,
  Zap,
} from "lucide-react";

export const MESH_VIEWBOX = { width: 640, height: 240 } as const;

export const TIER_X = {
  trigger: 80,
  preprocess: 200,
  core: 320,
  routing: 440,
  action: 560,
} as const;

export type WorkflowNodeTier = keyof typeof TIER_X;

export type WorkflowNodeDef = {
  id: string;
  tier: WorkflowNodeTier;
  label: string;
  icon: LucideIcon;
};

export type WorkflowMeshConfig = {
  scopeId: string;
  triggers: WorkflowNodeDef[];
  preprocess: WorkflowNodeDef[];
  routing: WorkflowNodeDef[];
  actions: WorkflowNodeDef[];
};

export type PositionedNode = WorkflowNodeDef & { x: number; y: number };

export type MeshPath = {
  id: string;
  d: string;
  group: "ingest" | "toCore" | "toRouting" | "toAction";
};

function yForCount(index: number, count: number): number {
  if (count === 1) return 120;
  const padding = 50;
  const span = MESH_VIEWBOX.height - padding * 2;
  return padding + (span / (count - 1)) * index;
}

export function positionNodes(config: WorkflowMeshConfig): PositionedNode[] {
  const tiers: { tier: WorkflowNodeTier; nodes: WorkflowNodeDef[] }[] = [
    { tier: "trigger", nodes: config.triggers },
    { tier: "preprocess", nodes: config.preprocess },
    { tier: "routing", nodes: config.routing },
    { tier: "action", nodes: config.actions },
  ];

  const positioned: PositionedNode[] = [];
  for (const { tier, nodes } of tiers) {
    nodes.forEach((node, i) => {
      positioned.push({
        ...node,
        x: TIER_X[tier],
        y: yForCount(i, nodes.length),
      });
    });
  }

  positioned.push({
    id: "core",
    tier: "core",
    label: "AI",
    icon: Brain,
    x: TIER_X.core,
    y: 120,
  });

  return positioned;
}

function bezierPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

function nearest(targetY: number, nodes: PositionedNode[]): PositionedNode {
  return nodes.reduce((best, n) =>
    Math.abs(n.y - targetY) < Math.abs(best.y - targetY) ? n : best,
  );
}

export function buildMeshPaths(nodes: PositionedNode[]): MeshPath[] {
  const triggers = nodes.filter((n) => n.tier === "trigger");
  const preprocess = nodes.filter((n) => n.tier === "preprocess");
  const core = nodes.find((n) => n.id === "core")!;
  const routing = nodes.filter((n) => n.tier === "routing");
  const actions = nodes.filter((n) => n.tier === "action");

  const paths: MeshPath[] = [];

  triggers.forEach((t) => {
    const p = nearest(t.y, preprocess);
    paths.push({
      id: `ingest-${t.id}-${p.id}`,
      group: "ingest",
      d: bezierPath(t.x, t.y, p.x, p.y),
    });
  });

  preprocess.forEach((p) => {
    paths.push({
      id: `tocore-${p.id}`,
      group: "toCore",
      d: bezierPath(p.x, p.y, core.x, core.y),
    });
  });

  routing.forEach((r) => {
    paths.push({
      id: `toroute-${r.id}`,
      group: "toRouting",
      d: bezierPath(core.x, core.y, r.x, r.y),
    });
  });

  routing.forEach((r) => {
    const a = nearest(r.y, actions);
    paths.push({
      id: `toaction-${r.id}-${a.id}`,
      group: "toAction",
      d: bezierPath(r.x, r.y, a.x, a.y),
    });
  });

  return paths;
}

const node = (
  id: string,
  tier: WorkflowNodeTier,
  label: string,
  icon: LucideIcon,
): WorkflowNodeDef => ({ id, tier, label, icon });

export const workflowMeshConfigs: Record<string, WorkflowMeshConfig> = {
  "lead-nurturing": {
    scopeId: "lead-nurturing",
    triggers: [
      node("t-form", "trigger", "Web form", FormInput),
      node("t-crm", "trigger", "CRM hook", Webhook),
    ],
    preprocess: [
      node("p-qualify", "preprocess", "Qualify", UserCheck),
      node("p-enrich", "preprocess", "Enrich", Layers),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-wa", "action", "WhatsApp", MessageSquare),
      node("a-crm", "action", "CRM sync", Database),
    ],
  },
  "ai-support": {
    scopeId: "ai-support",
    triggers: [
      node("t-chat", "trigger", "Web chat", Globe),
      node("t-email", "trigger", "Email", Mail),
    ],
    preprocess: [
      node("p-classify", "preprocess", "Classify", Layers),
      node("p-kb", "preprocess", "KB lookup", FileText),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-ticket", "action", "Ticket", Ticket),
      node("a-handoff", "action", "Handoff", Users),
    ],
  },
  reports: {
    scopeId: "reports",
    triggers: [
      node("t-crm", "trigger", "CRM API", Database),
      node("t-sheets", "trigger", "Sheets", FileText),
    ],
    preprocess: [
      node("p-agg", "preprocess", "Aggregate", BarChart3),
      node("p-val", "preprocess", "Validate", ShieldCheck),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-slack", "action", "Slack", Slack),
      node("a-email", "action", "Digest", Mail),
    ],
  },
  documents: {
    scopeId: "documents",
    triggers: [
      node("t-email", "trigger", "Email/PDF", Mail),
      node("t-drive", "trigger", "Drive", FileText),
    ],
    preprocess: [
      node("p-extract", "preprocess", "Extract", Layers),
      node("p-match", "preprocess", "Match", CheckSquare),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-erp", "action", "ERP", Database),
      node("a-approve", "action", "Approval", ClipboardList),
    ],
  },
  "hr-onboarding": {
    scopeId: "hr-onboarding",
    triggers: [
      node("t-offer", "trigger", "Offer", FileText),
      node("t-form", "trigger", "Form", FormInput),
    ],
    preprocess: [
      node("p-verify", "preprocess", "Verify", ShieldCheck),
      node("p-check", "preprocess", "Checklist", ClipboardList),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-it", "action", "IT access", Zap),
      node("a-slack", "action", "Slack", Slack),
    ],
  },
  messaging: {
    scopeId: "messaging",
    triggers: [
      node("t-wa", "trigger", "WhatsApp", MessageSquare),
      node("t-email", "trigger", "Email", Mail),
    ],
    preprocess: [
      node("p-tpl", "preprocess", "Template", FileText),
      node("p-sched", "preprocess", "Schedule", Calendar),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-sendgrid", "action", "SendGrid", Send),
      node("a-twilio", "action", "Twilio", Zap),
    ],
  },
  compliance: {
    scopeId: "compliance",
    triggers: [
      node("t-kyc", "trigger", "KYC upload", FileText),
      node("t-bank", "trigger", "Bank API", Database),
    ],
    preprocess: [
      node("p-verify", "preprocess", "Verify ID", ShieldCheck),
      node("p-risk", "preprocess", "Risk score", BarChart3),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-audit", "action", "Audit log", ClipboardList),
      node("a-alert", "action", "Alert", AlertTriangle),
    ],
  },
  "real-estate": {
    scopeId: "real-estate",
    triggers: [
      node("t-mb", "trigger", "MagicBricks", Building2),
      node("t-99", "trigger", "99acres", Globe),
    ],
    preprocess: [
      node("p-qualify", "preprocess", "Qualify", UserCheck),
      node("p-slots", "preprocess", "Slots", Calendar),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-wa", "action", "WhatsApp", MessageSquare),
      node("a-cal", "action", "Calendar", Calendar),
    ],
  },
  inventory: {
    scopeId: "inventory",
    triggers: [
      node("t-erp", "trigger", "ERP", Database),
      node("t-shop", "trigger", "Shopify", ShoppingCart),
    ],
    preprocess: [
      node("p-stock", "preprocess", "Stock", Package),
      node("p-forecast", "preprocess", "Forecast", BarChart3),
    ],
    routing: [
      node("r-logic", "routing", "Logic", Cpu),
      node("r-api", "routing", "API route", Network),
    ],
    actions: [
      node("a-reorder", "action", "Reorder", Bell),
      node("a-supplier", "action", "Supplier", Send),
    ],
  },
};

export function getWorkflowMeshConfig(scopeId: string): WorkflowMeshConfig {
  return workflowMeshConfigs[scopeId] ?? workflowMeshConfigs.messaging;
}
