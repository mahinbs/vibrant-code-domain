import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { emailMarketingService } from "@/services/emailMarketing";
import type { EmOverviewStats } from "@/services/emailMarketing/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, CheckCircle2, Circle, X } from "lucide-react";

const BANNER_KEY = "em_setup_banner_dismissed";

export default function EmailMarketingOverview() {
  const [stats, setStats] = useState<EmOverviewStats | null>(null);
  const [senderCount, setSenderCount] = useState(0);
  const [sequenceCount, setSequenceCount] = useState(0);
  const [leadCount, setLeadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(
    () => localStorage.getItem(BANNER_KEY) === "1",
  );

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [data, senders, sequences, leads] = await Promise.all([
        emailMarketingService.getOverviewStats(),
        emailMarketingService.listSenders(),
        emailMarketingService.listSequences(),
        emailMarketingService.listLeads(),
      ]);
      setStats(data);
      setSenderCount(senders.length);
      setSequenceCount(sequences.length);
      setLeadCount(leads.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const domainVerified = stats?.domainStatus === "verified";
  const showBanner = !bannerDismissed && stats && !domainVerified;

  const checklist = [
    {
      done: domainVerified,
      label: "Domain verified in Settings",
      href: "/admin/email-marketing/settings",
    },
    {
      done: senderCount > 0,
      label: "At least one sender added",
      href: "/admin/email-marketing/settings",
    },
    {
      done: sequenceCount > 0,
      label: "Sequence created",
      href: "/admin/email-marketing/sequences",
    },
    {
      done: leadCount > 0,
      label: "Leads imported",
      href: "/admin/email-marketing/import",
    },
  ];

  return (
    <EmailMarketingLayout title="Overview">
      {showBanner && (
        <div className="mb-4 flex items-start justify-between gap-2 rounded-lg border border-amber-600/50 bg-amber-950/30 px-4 py-3 text-sm text-amber-200">
          <p>
            Start here: go to{" "}
            <Link to="/admin/email-marketing/settings" className="underline font-medium">
              Settings
            </Link>{" "}
            and verify your domain before sending.
          </p>
          <button
            type="button"
            onClick={() => {
              localStorage.setItem(BANNER_KEY, "1");
              setBannerDismissed(true);
            }}
            className="text-amber-400 hover:text-white shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex justify-end mb-4">
        <EmActionButton variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </EmActionButton>
      </div>

      {error && (
        <p className="text-amber-400 text-sm mb-4">
          {error}
          {error.includes("does not exist") && " — Run the email marketing Supabase migration first."}
        </p>
      )}

      <Card className="bg-gray-900 border-gray-800 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-base">Setup checklist</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {checklist.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              {item.done ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : (
                <Circle className="h-4 w-4 text-gray-600 shrink-0" />
              )}
              <span className={item.done ? "text-gray-500 line-through" : ""}>{item.label}</span>
            </Link>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Sent today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">
              {stats?.sentToday ?? 0}
              <span className="text-sm text-gray-500 font-normal"> / {stats?.dailyCap ?? 40}</span>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Open rate (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{stats?.openRate ?? 0}%</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Reply rate (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{stats?.replyRate ?? 0}%</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Bounce rate (7d)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">{stats?.bounceRate ?? 0}%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-300">
            <p>
              Domain:{" "}
              <span className={domainVerified ? "text-emerald-400" : "text-amber-400"}>
                {stats?.domainStatus ?? "not configured"}
              </span>
            </p>
            <p>Active sequences: {stats?.activeSequences ?? 0}</p>
            <p>Follow-ups due today: {stats?.pendingFollowups ?? 0}</p>
            <Link to="/admin/email-marketing/activity" className="text-cyan-400 hover:underline block">
              {stats?.unreadReplies ?? 0} unread replies →
            </Link>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <EmActionButton asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/settings">Setup domain</Link>
            </EmActionButton>
            <EmActionButton asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/campaigns/new">New blast</Link>
            </EmActionButton>
            <EmActionButton asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/import">Import leads</Link>
            </EmActionButton>
            <EmActionButton asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/activity">View activity</Link>
            </EmActionButton>
          </CardContent>
        </Card>
      </div>
    </EmailMarketingLayout>
  );
}
