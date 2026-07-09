import { useEffect, useState } from "react";
import { EmailMarketingLayout } from "@/components/admin/email-marketing/EmailMarketingLayout";
import {
  emailMarketingService,
  type EmSequence,
  type EmSequenceStep,
} from "@/services/emailMarketing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { emailMarketingEdge } from "@/services/emailMarketing";

export default function EmailMarketingSequences() {
  const [sequences, setSequences] = useState<EmSequence[]>([]);
  const [stepsBySeq, setStepsBySeq] = useState<Record<string, EmSequenceStep[]>>({});

  const load = async () => {
    const seqs = await emailMarketingService.listSequences();
    setSequences(seqs);
    const steps: Record<string, EmSequenceStep[]> = {};
    for (const s of seqs) {
      steps[s.id] = await emailMarketingService.getSequenceSteps(s.id);
    }
    setStepsBySeq(steps);
  };

  useEffect(() => {
    load().catch((e) => toast.error(e.message));
  }, []);

  const saveStep = async (step: EmSequenceStep) => {
    await emailMarketingService.updateSequenceStep(step.id, {
      subject_template: step.subject_template,
      body_template: step.body_template,
      delay_days: step.delay_days,
    });
    toast.success("Step saved");
  };

  return (
    <EmailMarketingLayout title="Sequences">
      <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={async () => {
            try {
              const r = await emailMarketingEdge.triggerProcessSequences();
              toast.success(`Processed ${r.processed} sequence steps`);
            } catch (e) {
              toast.error(e instanceof Error ? e.message : "Failed");
            }
          }}
        >
          Run sequence processor
        </Button>
      </div>

      <div className="space-y-6">
        {sequences.map((seq) => (
          <Card key={seq.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                {seq.name}
                <Badge variant="outline">{seq.pipeline}</Badge>
                {seq.is_default && <Badge>Default</Badge>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(stepsBySeq[seq.id] ?? []).map((step) => (
                <div key={step.id} className="border border-gray-800 rounded-lg p-4 space-y-2">
                  <p className="text-sm text-gray-500">
                    Step {step.step_order} · +{step.delay_days}d · {step.condition}
                    {step.ai_generated && " · AI"}
                  </p>
                  {!step.ai_generated && (
                    <>
                      <div>
                        <Label className="text-gray-400 text-xs">Subject</Label>
                        <Input
                          value={step.subject_template}
                          onChange={(e) => {
                            const updated = { ...step, subject_template: e.target.value };
                            setStepsBySeq({
                              ...stepsBySeq,
                              [seq.id]: stepsBySeq[seq.id].map((s) =>
                                s.id === step.id ? updated : s,
                              ),
                            });
                          }}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div>
                        <Label className="text-gray-400 text-xs">Body</Label>
                        <Textarea
                          value={step.body_template}
                          onChange={(e) => {
                            const updated = { ...step, body_template: e.target.value };
                            setStepsBySeq({
                              ...stepsBySeq,
                              [seq.id]: stepsBySeq[seq.id].map((s) =>
                                s.id === step.id ? updated : s,
                              ),
                            });
                          }}
                          rows={4}
                          className="bg-gray-800 border-gray-700 font-mono text-sm"
                        />
                      </div>
                      <Button size="sm" variant="secondary" onClick={() => saveStep(step)}>
                        Save step
                      </Button>
                    </>
                  )}
                  {step.ai_generated && (
                    <p className="text-sm text-gray-500 italic">
                      AI-generated at send time (research + draft)
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </EmailMarketingLayout>
  );
}
