import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Will this work with the tools we already use?",
      answer:
        "Almost certainly. We work with the platforms you already have — your CRM, email, spreadsheets, accounting, and more. The audit confirms exactly what's possible.",
    },
    {
      question: "Is my team going to have to learn something complicated?",
      answer:
        "No. Good automation is invisible. In most cases your team simply notices the busywork is gone.",
    },
    {
      question: "What if something breaks?",
      answer:
        "We monitor and maintain everything we build. If something needs attention, we handle it — usually before you'd even notice.",
    },
    {
      question: "We're not a huge company. Is this overkill?",
      answer:
        "The opposite. Smaller teams feel the time savings the most, because every hour back is a bigger share of your capacity.",
    },
    {
      question: "How fast can we go live?",
      answer:
        "Many first automations are live within 2 weeks of the audit.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions,{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              answered
            </span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-700/50 rounded-2xl bg-gray-900/50 backdrop-blur-sm px-6 hover:border-cyan-400/50 transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
