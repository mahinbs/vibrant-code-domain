const StatsGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <p className="text-center text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Trusted by teams who'd rather grow than do data entry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              40,000+
            </div>
            <div className="text-gray-300 font-medium">
              Hours Automated
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300">
              120+
            </div>
            <div className="text-gray-300 font-medium">Workflows Shipped</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors duration-300">
              98%
            </div>
            <div className="text-gray-300 font-medium">Client Retention</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;
