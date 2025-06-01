
import React, { memo, useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { usePerformance } from '@/hooks/usePerformance';

interface ReviewCardProps {
  review: {
    id: number;
    name: string;
    role: string;
    company: string;
    rating: number;
    review: string;
    service: string;
    image: string;
  };
  index: number;
  getServiceColor: (service: string) => string;
}

const ReviewCard = memo(({ review, index, getServiceColor }: ReviewCardProps) => {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { createOptimizedObserver } = usePerformance();

  useEffect(() => {
    const observer = createOptimizedObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [createOptimizedObserver]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      cardRef.current.style.willChange = 'transform';
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.willChange = 'auto';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`group relative transform transition-all duration-700 prevent-layout-shift ${isInView ? 'animate-fade-in' : 'opacity-0'} ${isHovered ? 'scale-105' : ''}`}
      style={{
        animationDelay: `${index * 0.1}s`,
        contain: 'layout style paint',
        contentVisibility: 'auto',
        containIntrinsicSize: '1px 400px'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card Container with optimized 3D Transform */}
      <div className="relative bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-cyan-400/20 gpu-accelerate review-card">
        
        {/* Optimized Holographic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        
        {/* Service Badge with optimized Neon Effect */}
        <div className={`inline-block px-4 py-2 rounded-full text-xs font-bold border mb-6 relative overflow-hidden gpu-accelerate ${getServiceColor(review.service)}`}>
          <span className="relative z-10">{review.service}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </div>

        {/* Rating with optimized animation */}
        <div className="flex mb-6 space-x-1" style={{ contain: 'layout' }}>
          {[...Array(review.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="h-5 w-5 text-yellow-400 fill-current transform hover:scale-125 transition-transform duration-300 gpu-accelerate" 
              style={{
                animationDelay: `${i * 0.1}s`
              }} 
            />
          ))}
        </div>

        {/* Review Text */}
        <blockquote className="text-gray-300 mb-8 leading-relaxed text-lg relative">
          <span className="text-cyan-400 text-4xl absolute -top-2 -left-2 opacity-50">"</span>
          <span className="relative z-10">{review.review}</span>
          <span className="text-cyan-400 text-4xl absolute -bottom-4 -right-2 opacity-50">"</span>
        </blockquote>

        {/* Client Info with optimized Avatar */}
        <div className="flex items-center relative" style={{ contain: 'layout style' }}>
          <div className="relative mr-4">
            <img 
              src={review.image} 
              alt={review.name} 
              className="w-16 h-16 rounded-full border-2 border-cyan-400/50 shadow-lg shadow-cyan-400/20 group-hover:shadow-cyan-400/40 transition-all duration-500 gpu-accelerate"
              loading="lazy"
              decoding="async"
              style={{
                contentVisibility: 'auto',
                containIntrinsicSize: '64px 64px'
              }}
            />
            {/* Optimized avatar glow effect */}
            <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md animate-pulse"></div>
          </div>
          <div>
            <div className="font-bold text-white text-lg mb-1">{review.name}</div>
            <div className="text-cyan-300 font-medium">{review.role}</div>
            <div className="text-gray-400 text-sm">at {review.company}</div>
          </div>
        </div>

        {/* Optimized scan line effect */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Corner accents */}
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-500"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-colors duration-500"></div>
      </div>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;
