import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  subject: string;
  body: string;
  intro?: string | null;
  showIntro?: boolean;
  onSubjectChange: (v: string) => void;
  onBodyChange: (v: string) => void;
  onIntroChange?: (v: string) => void;
};

const VAR_HINTS = "{{name}}, {{company}}, {{case_study_title}}, {{case_study_hook}}, {{case_study_url}}, {{ai_body}}";

export function TemplateEditor({
  subject,
  body,
  intro,
  showIntro,
  onSubjectChange,
  onBodyChange,
  onIntroChange,
}: Props) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-500">Variables: {VAR_HINTS}</p>
      <div>
        <Label className="text-gray-400 text-xs">Subject</Label>
        <Input
          value={subject}
          onChange={(e) => onSubjectChange(e.target.value)}
          className="bg-gray-800 border-gray-700 mt-1"
        />
      </div>
      {showIntro && onIntroChange && (
        <div>
          <Label className="text-gray-400 text-xs">Intro / wrapper template</Label>
          <Textarea
            value={intro ?? ""}
            onChange={(e) => onIntroChange(e.target.value)}
            rows={4}
            className="bg-gray-800 border-gray-700 font-mono text-sm mt-1"
          />
        </div>
      )}
      <div>
        <Label className="text-gray-400 text-xs">{showIntro ? "Body template" : "Body"}</Label>
        <Textarea
          value={body}
          onChange={(e) => onBodyChange(e.target.value)}
          rows={6}
          className="bg-gray-800 border-gray-700 font-mono text-sm mt-1"
        />
      </div>
    </div>
  );
}
