
const BlogHero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-black bg-opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Tech Insights
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Discover the latest trends, best practices, and innovative solutions in web development, 
            AI, and digital transformation.
          </p>
          <div className="flex items-center justify-center gap-4 text-gray-400">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 max-w-32"></div>
            <span className="text-cyan-400 font-medium">Fresh insights weekly</span>
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 max-w-32"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
