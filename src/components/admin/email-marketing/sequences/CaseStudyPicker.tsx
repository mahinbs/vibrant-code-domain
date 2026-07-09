import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
          <SelectContent>
            <SelectItem value="auto_industry">Auto by industry</SelectItem>
            <SelectItem value="fixed">Pick case study</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {mode === "fixed" && (
        <div>
          <Label className="text-gray-400 text-xs">Case study</Label>
          <Select value={slug ?? ""} onValueChange={onSlugChange}>
            <SelectTrigger className="w-full bg-gray-800 border-gray-700 mt-1">
              <SelectValue placeholder="Select case study" />
            </SelectTrigger>
            <SelectContent>
              {caseStudies.map((cs) => (
                <SelectItem key={cs.slug} value={cs.slug}>
                  {cs.title} ({cs.category})
                </SelectItem>
              ))}
            </SelectContent>
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
