import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmActionButton } from "@/components/admin/email-marketing/EmActionButton";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmSelectContent, EmSelectItem } from "@/components/admin/email-marketing/EmSelectContent";
import type { EmSequence } from "@/services/emailMarketing";

type Props = {
  sequence: EmSequence;
  onChange: (patch: Partial<EmSequence>) => void;
  onSave: () => void;
  saving?: boolean;
};

export function SequenceHeader({ sequence, onChange, onSave, saving }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end border border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex-1 min-w-[200px]">
        <Label className="text-gray-400 text-xs">Name</Label>
        <Input
          value={sequence.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
      <div className="w-40">
        <Label className="text-gray-400 text-xs">Pipeline</Label>
        <Input value={sequence.pipeline} disabled className="bg-gray-800 border-gray-700 mt-1" />
      </div>
      <div className="w-40">
        <Label className="text-gray-400 text-xs">Vertical</Label>
        <Input
          value={sequence.vertical ?? ""}
          onChange={(e) => onChange({ vertical: e.target.value || null })}
          placeholder="e.g. saas"
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
      <div className="flex-1 min-w-[200px]">
        <Label className="text-gray-400 text-xs">Description</Label>
        <Input
          value={sequence.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value || null })}
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
      <div className="w-32">
        <Label className="text-gray-400 text-xs">Status</Label>
        <Select
          value={sequence.is_active ? "active" : "paused"}
          onValueChange={(v) => onChange({ is_active: v === "active" })}
        >
          <SelectTrigger className="bg-gray-800 border-gray-700 mt-1">
            <SelectValue />
          </SelectTrigger>
          <EmSelectContent>
            <EmSelectItem value="active">Active</EmSelectItem>
            <EmSelectItem value="paused">Paused</EmSelectItem>
          </EmSelectContent>
        </Select>
      </div>
      <EmActionButton onClick={onSave} disabled={saving}>
        {saving ? "Saving…" : "Save sequence"}
      </EmActionButton>
    </div>
  );
}
