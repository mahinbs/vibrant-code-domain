import { useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  emailMarketingHelp,
  getHelpKeyFromPath,
} from "@/data/emailMarketingHelp";

function renderHelpText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="text-white font-medium">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function HelpContent({ helpKey }: { helpKey: string }) {
  const content = emailMarketingHelp[helpKey] ?? emailMarketingHelp.overview;

  return (
    <div className="space-y-3">
      <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
        {content.steps.map((step, i) => (
          <li key={i} className="leading-relaxed">
            {renderHelpText(step)}
          </li>
        ))}
      </ol>
      {content.tip && (
        <p className="text-xs text-cyan-400/90 bg-cyan-950/30 border border-cyan-800/50 rounded-md p-2">
          Tip: {renderHelpText(content.tip)}
        </p>
      )}
      {content.warning && (
        <p className="text-xs text-amber-400/90 bg-amber-950/30 border border-amber-800/50 rounded-md p-2">
          Note: {renderHelpText(content.warning)}
        </p>
      )}
    </div>
  );
}

export function EmailMarketingHelpPanel({ helpKey }: { helpKey?: string }) {
  const location = useLocation();
  const key = helpKey ?? getHelpKeyFromPath(location.pathname);
  const content = emailMarketingHelp[key] ?? emailMarketingHelp.overview;

  return (
    <>
      {/* Mobile accordion — shown on small screens only */}
      <div className="lg:hidden mb-4">
        <Accordion type="single" collapsible className="border border-gray-800 rounded-lg">
          <AccordionItem value="help" className="border-none">
            <AccordionTrigger className="px-4 py-3 text-sm text-gray-200 hover:no-underline">
              How to use this page
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <HelpContent helpKey={key} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Desktop: sticky right panel */}
      <aside className="hidden lg:block">
        <Card className="bg-gray-900 border-gray-800 lg:sticky lg:top-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-white">{content.title}</CardTitle>
            <p className="text-xs text-gray-500">Step by step</p>
          </CardHeader>
          <CardContent>
            <HelpContent helpKey={key} />
          </CardContent>
        </Card>
      </aside>
    </>
  );
}
