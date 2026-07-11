import { useEffect, useState } from "react";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import { DnsRecordsBlock } from "@/components/admin/email-marketing/DnsRecordsBlock";
import {
  emailMarketingService,
  emailMarketingEdge,
  type EmDomain,
  type EmSendingIdentity,
} from "@/services/emailMarketing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function EmailMarketingSettings() {
  const [domains, setDomains] = useState<EmDomain[]>([]);
  const [senders, setSenders] = useState<EmSendingIdentity[]>([]);
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [newDomain, setNewDomain] = useState("boostmysites.com");
  const [newSenderLocal, setNewSenderLocal] = useState("ceo");
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [testEmail, setTestEmail] = useState("ceo@boostmysites.com");
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const [d, s, cfg] = await Promise.all([
        emailMarketingService.listDomains(),
        emailMarketingService.listSenders(),
        emailMarketingService.getSettings(),
      ]);
      setDomains(d);
      setSenders(s);
      setSettings(cfg);
      if (d.length && !selectedDomainId) setSelectedDomainId(d[0].id);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleLinkDomain = async () => {
    try {
      await emailMarketingEdge.linkDomain(newDomain, domains.length === 0);
      toast.success("Domain linked — you can add senders now");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to link domain");
    }
  };

  const handleAddDomain = async () => {
    try {
      await emailMarketingEdge.addDomain(newDomain, domains.length === 0);
      toast.success("Domain added — paste DNS records below");
      load();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to add domain";
      if (/restricted to only send/i.test(message)) {
        toast.error(
          "Your Resend API key is send-only. Use “Link verified domain” if boostmysites.com is already verified in Resend.",
          { duration: 8000 },
        );
        return;
      }
      toast.error(message);
    }
  };

  const handleVerify = async (id: string) => {
    try {
      await emailMarketingEdge.verifyDomain(id);
      toast.success("Verification requested");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Verify failed");
    }
  };

  const handleAddSender = async () => {
    if (!selectedDomainId) return;
    try {
      await emailMarketingEdge.addSender(selectedDomainId, newSenderLocal, "CEO @ BoostMySites");
      toast.success("Sender added");
      load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add sender");
    }
  };

  const handleSendTest = async (senderId: string) => {
    try {
      await emailMarketingEdge.sendTest(senderId, testEmail);
      toast.success("Test email queued via Resend");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Test send failed");
    }
  };

  const saveSettings = async () => {
    try {
      await emailMarketingEdge.updateSettings({
        global_daily_cap: settings.global_daily_cap,
        per_sender_daily_cap: settings.per_sender_daily_cap,
        warmup_enabled: settings.warmup_enabled,
        reply_to_email: settings.reply_to_email,
        reply_knowledge_base: settings.reply_knowledge_base,
        default_from_name: settings.default_from_name,
        calendly_url: settings.calendly_url,
      });
      toast.success("Settings saved");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    }
  };

  return (
    <EmailMarketingLayout title="Settings">
      {loading && <p className="text-gray-500 text-sm">Loading…</p>}

      <div className="grid gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Domains</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap items-end">
              <div>
                <Label className="text-gray-400">Domain</Label>
                <Input
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="boostmysites.com"
                  className="max-w-xs bg-gray-800 border-gray-700"
                />
              </div>
              <EmActionButton onClick={handleLinkDomain}>Link verified domain</EmActionButton>
              <EmActionButton variant="outline" onClick={handleAddDomain}>
                Add via Resend API
              </EmActionButton>
            </div>
            <p className="text-xs text-gray-500">
              Already verified boostmysites.com in the Resend dashboard? Click{" "}
              <strong className="text-gray-400">Link verified domain</strong>. “Add via Resend API” needs a
              full-access Resend key (not send-only).
            </p>
            {domains.map((d) => (
              <div key={d.id} className="border border-gray-800 rounded-lg p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-white font-medium">{d.domain}</p>
                    <p className="text-xs text-gray-500">
                      Status:{" "}
                      <span className={d.status === "verified" ? "text-emerald-400" : "text-amber-400"}>
                        {d.status}
                      </span>
                    </p>
                  </div>
                  {d.resend_domain_id ? (
                    <EmActionButton size="sm" variant="outline" onClick={() => handleVerify(d.id)}>
                      Verify DNS
                    </EmActionButton>
                  ) : (
                    <span className="text-xs text-emerald-400">Linked from Resend dashboard</span>
                  )}
                </div>
                <DnsRecordsBlock records={d.dns_records ?? []} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Sending identities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap items-end">
              <div>
                <Label className="text-gray-400">Local part</Label>
                <Input
                  value={newSenderLocal}
                  onChange={(e) => setNewSenderLocal(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <EmActionButton onClick={handleAddSender} disabled={!selectedDomainId}>
                Add sender
              </EmActionButton>
            </div>
            {!selectedDomainId && (
              <p className="text-xs text-amber-400">
                Link or add a domain above first — Add sender is disabled until a domain exists.
              </p>
            )}
            {senders.map((s) => (
              <div
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 border border-gray-800 rounded p-3"
              >
                <div>
                  <p className="text-white">{s.email}</p>
                  <p className="text-xs text-gray-500">
                    {s.sent_today}/{s.daily_cap} sent today · {s.warmup_status}
                  </p>
                </div>
                <EmActionButton size="sm" variant="secondary" onClick={() => handleSendTest(s.id)}>
                  Send test
                </EmActionButton>
              </div>
            ))}
            <div>
              <Label className="text-gray-400">Test recipient</Label>
              <Input
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 max-w-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">AI knowledge base</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-2xl">
            <div>
              <Label className="text-gray-400">Reply knowledge base</Label>
              <Textarea
                value={String(settings.reply_knowledge_base ?? "").replace(/^"|"$/g, "")}
                onChange={(e) => setSettings({ ...settings, reply_knowledge_base: e.target.value })}
                rows={10}
                placeholder="Services, pricing, tone, booking link, what not to promise…"
                className="bg-gray-800 border-gray-700 mt-1 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used by **Generate AI reply** on lead pages. Update when offers or pricing change.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Caps & warmup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 max-w-md">
            <div>
              <Label className="text-gray-400">Global daily cap</Label>
              <Input
                type="number"
                value={String(settings.global_daily_cap ?? 40)}
                onChange={(e) =>
                  setSettings({ ...settings, global_daily_cap: Number(e.target.value) })
                }
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label className="text-gray-400">Per-sender daily cap</Label>
              <Input
                type="number"
                value={String(settings.per_sender_daily_cap ?? 20)}
                onChange={(e) =>
                  setSettings({ ...settings, per_sender_daily_cap: Number(e.target.value) })
                }
                className="bg-gray-800 border-gray-700"
              />
            </div>
            <div>
              <Label className="text-gray-400">Reply-to email</Label>
              <Input
                value={String(
                  settings.reply_to_email ?? "leads-in@replies.boostmysites.com",
                ).replace(/"/g, "")}
                onChange={(e) => setSettings({ ...settings, reply_to_email: e.target.value })}
                className="bg-gray-800 border-gray-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Marketing replies go here (Resend inbound). ceo@ stays your normal inbox.
              </p>
            </div>
            <div>
              <Label className="text-gray-400">Calendly URL</Label>
              <Input
                value={String(settings.calendly_url ?? "").replace(/"/g, "")}
                onChange={(e) => setSettings({ ...settings, calendly_url: e.target.value })}
                placeholder="https://calendly.com/your-link"
                className="bg-gray-800 border-gray-700"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used in sequence emails via {"{{calendly_url}}"} — paste your tracked booking link.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={settings.warmup_enabled !== false}
                onCheckedChange={(v) => setSettings({ ...settings, warmup_enabled: v })}
              />
              <Label className="text-gray-400">Warmup mode enabled</Label>
            </div>
            <EmActionButton onClick={saveSettings}>Save settings</EmActionButton>
          </CardContent>
        </Card>
      </div>
    </EmailMarketingLayout>
  );
}
