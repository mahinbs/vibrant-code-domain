const StatsGrid = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors duration-300">
              500+
            </div>
            <div className="text-gray-300 font-medium">
              Projects Delivered
            </div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-300">
              16+
            </div>
            <div className="text-gray-300 font-medium">Tech Services</div>
          </div>
          <div className="text-center group cursor-pointer">
            <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-3 group-hover:text-purple-300 transition-colors duration-300">
              24/7
            </div>
            <div className="text-gray-300 font-medium">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGrid;