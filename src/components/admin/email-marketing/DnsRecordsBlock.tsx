import type { DnsRecord } from "@/services/emailMarketing/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DnsRecordsBlock({ records }: { records: DnsRecord[] }) {
  if (!records?.length) {
    return <p className="text-sm text-gray-500">No DNS records yet. Refresh after adding domain.</p>;
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-3">
      {records.map((r, i) => (
        <div key={i} className="rounded border border-gray-700 p-3 text-sm">
          <div className="flex justify-between items-start gap-2">
            <div className="space-y-1 min-w-0">
              <p className="text-cyan-400 font-mono text-xs">{r.type} · {r.name}</p>
              <p className="text-gray-300 break-all font-mono text-xs">{r.value}</p>
              {r.status && <p className="text-xs text-gray-500">Status: {r.status}</p>}
            </div>
            <Button size="sm" variant="outline" onClick={() => copy(r.value)}>
              Copy
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
