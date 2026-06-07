const Payoff = () => {
  const stats = [
    { value: "15+", label: "hours saved per employee, every week", color: "text-cyan-400" },
    { value: "3x", label: "faster response to new leads", color: "text-blue-400" },
    { value: "60%", label: "fewer manual errors", color: "text-purple-400" },
    { value: "<90 days", label: "to ROI for most clients", color: "text-green-400" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What our clients{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              get back
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-3`}>
                {stat.value}
              </div>
              <div className="text-gray-400 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg text-gray-300 leading-relaxed">
            The math is simple: if automation saves one team member ten hours a week, that's over <span className="text-white font-semibold">500 hours a year</span> — the equivalent of a part-time hire you don't have to pay, manage, or train.
          </p>
          <p className="text-xl md:text-2xl text-white font-semibold leading-relaxed">
            You're not spending money on automation. You're stopping the money you're already losing.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Payoff;
