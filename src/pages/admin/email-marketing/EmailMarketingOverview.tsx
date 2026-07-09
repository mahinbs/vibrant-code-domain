import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { emailMarketingService } from "@/services/emailMarketing";
import type { EmOverviewStats } from "@/services/emailMarketing/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export default function EmailMarketingOverview() {
  const [stats, setStats] = useState<EmOverviewStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await emailMarketingService.getOverviewStats();
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <EmailMarketingLayout title="Overview">
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={load} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {error && (
        <p className="text-amber-400 text-sm mb-4">
          {error}
          {error.includes("does not exist") && " — Run the email marketing Supabase migration first."}
        </p>
      )}

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
              <span
                className={
                  stats?.domainStatus === "verified" ? "text-emerald-400" : "text-amber-400"
                }
              >
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
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/settings">Setup domain</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/campaigns/new">New blast</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/import">Import leads</Link>
            </Button>
            <Button asChild size="sm" variant="secondary">
              <Link to="/admin/email-marketing/activity">View activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </EmailMarketingLayout>
  );
}
