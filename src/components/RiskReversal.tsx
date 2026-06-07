import { ShieldCheck } from "lucide-react";

const RiskReversal = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_60%)]"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 flex items-center justify-center">
              <ShieldCheck className="h-8 w-8" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            The only thing you risk is{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              staying busy.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            The audit is free and the plan is yours to keep. If we can't find automations that clearly pay for themselves, we'll say so — no pitch, no pressure. You've got nothing to lose but the busywork.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RiskReversal;
