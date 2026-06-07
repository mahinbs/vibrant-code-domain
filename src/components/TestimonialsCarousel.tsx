import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { Button } from './ui/button';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = useMemo(() => [
    {
      name: "Priya Nair",
      company: "Founder, Craftline Goods",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "We were drowning in manual order processing. Boostmysites automated the whole thing in three weeks. We've reclaimed two full days a week and haven't looked back.",
      rating: 5,
      result: "2 full days/week reclaimed"
    },
    {
      name: "Marcus Bennett",
      company: "Sales Director, Vantage Realty",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Our leads used to sit for hours. Now they get a response in under a minute, and our close rate jumped 28%. It paid for itself in the first month.",
      rating: 5,
      result: "+28% close rate"
    },
    {
      name: "Elena Sokolova",
      company: "Operations Lead, Northwind Logistics",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b03c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      text: "Honestly the best money we've spent this year. It's like quietly adding staff who never sleep and never make mistakes.",
      rating: 5,
      result: "Zero-error operations"
    }
  ], []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || document.hidden) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getVisibleTestimonials = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      items.push(testimonials[index]);
    }
    return items;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            What Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real results from real businesses who handed their busywork to automation
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-7xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 border-cyan-400/30 hover:bg-cyan-500/20 hover:border-cyan-400/50 text-cyan-400 hover:text-cyan-300 transition-all duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonials Grid */}
          <div className="px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getVisibleTestimonials().map((testimonial, index) => (
                <div 
                  key={`${currentIndex}-${index}`}
                  className="group bg-gray-900/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105 animate-fade-in"
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-cyan-400 opacity-60" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                    "{testimonial.text}"
                  </p>

                  {/* Result Badge */}
                  <div className="mb-6">
                    <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300 font-medium">
                      ✨ {testimonial.result}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-cyan-400 fill-current" />
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center space-x-4">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name}, ${testimonial.company} — client headshot`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-400/30"
                      width={48}
                      height={48}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-500/20 border border-cyan-400/30 rounded-full">
            <Star className="h-5 w-5 text-cyan-400 fill-current" />
            <span className="text-cyan-300 font-medium">4.9/5 Average Rating</span>
            <Star className="h-5 w-5 text-cyan-400 fill-current" />
          </div>
          <p className="text-gray-400 mt-4">Based on 120+ automation projects shipped</p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;