import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmSelectContent, EmSelectItem } from "@/components/admin/email-marketing/EmSelectContent";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { EmCaseStudyMode, EmCaseStudyOption } from "@/services/emailMarketing";

type Props = {
  caseStudies: EmCaseStudyOption[];
  mode: EmCaseStudyMode;
  slug: string | null;
  url: string | null;
  onModeChange: (mode: EmCaseStudyMode) => void;
  onSlugChange: (slug: string) => void;
  onUrlChange: (url: string) => void;
};

export function CaseStudyPicker({
  caseStudies,
  mode,
  slug,
  url,
  onModeChange,
  onSlugChange,
  onUrlChange,
}: Props) {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-gray-400 text-xs">Case study selection</Label>
        <Select value={mode} onValueChange={(v) => onModeChange(v as EmCaseStudyMode)}>
          <SelectTrigger className="w-56 bg-gray-800 border-gray-700 mt-1">
            <SelectValue />
          </SelectTrigger>
          <EmSelectContent>
            <EmSelectItem value="auto_industry">Auto by industry</EmSelectItem>
            <EmSelectItem value="fixed">Pick case study</EmSelectItem>
          </EmSelectContent>
        </Select>
      </div>
      {mode === "fixed" && (
        <div>
          <Label className="text-gray-400 text-xs">Case study</Label>
          <Select value={slug ?? ""} onValueChange={onSlugChange}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 mt-1">
              <SelectValue placeholder="Select case study" />
            </SelectTrigger>
            <EmSelectContent>
              {caseStudies.map((cs) => (
                <EmSelectItem key={cs.slug} value={cs.slug}>
                  {cs.title} ({cs.category})
                </EmSelectItem>
              ))}
            </EmSelectContent>
          </Select>
        </div>
      )}
      <div>
        <Label className="text-gray-400 text-xs">URL override (optional)</Label>
        <Input
          value={url ?? ""}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://boostmysites.com/automation/..."
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
    </div>
  );
}
