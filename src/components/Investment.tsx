import { ArrowRight } from "lucide-react";

const Investment = () => {
  const tiers = [
    {
      label: "Audit",
      price: "Free",
      detail: "We map your workflows and hand you a clear plan — yours to keep.",
    },
    {
      label: "First automation",
      price: "From $X",
      detail: "One high-impact workflow, fixed scope, quoted at your audit.",
    },
    {
      label: "Ongoing systems & maintenance",
      price: "Custom",
      detail: "Based on what we run for you — monitored, fixed, and improved as you grow.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start small.{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Scale when it pays off.
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Most clients begin with a single high-impact automation — the one quietly costing them the most — and expand from there as the savings stack up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="p-8 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300 flex flex-col"
            >
              <div className="text-sm uppercase tracking-wider text-gray-400 mb-3">
                {tier.label}
              </div>
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                {tier.price}
              </div>
              <p className="text-gray-400 leading-relaxed">{tier.detail}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            We'll quote it during your audit, tied directly to the hours and dollars you'll save. If the numbers don't make sense, we'll tell you.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105"
          >
            <span>Book My Free Audit</span>
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Investment;
