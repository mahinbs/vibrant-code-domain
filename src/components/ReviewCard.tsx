
import React, { memo, useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`transform transition-opacity duration-500 ${isInView ? 'opacity-100 animate-fade-in' : 'opacity-0'}`}
      style={{
        animationDelay: `${Math.min(index * 100, 500)}ms`,
      }}
    >
      <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-400/10">
        
        {/* Service Badge */}
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border mb-4 ${getServiceColor(review.service)}`}>
          {review.service}
        </div>

        {/* Rating */}
        <div className="flex mb-4 space-x-1">
          {[...Array(review.rating)].map((_, i) => (
            <Star 
              key={i} 
              className="h-4 w-4 text-yellow-400 fill-current" 
            />
          ))}
        </div>

        {/* Review Text */}
        <blockquote className="text-gray-300 mb-6 leading-relaxed">
          "{review.review}"
        </blockquote>

        {/* Client Info */}
        <div className="flex items-center">
          <img 
            src={review.image} 
            alt={review.name} 
            className="w-12 h-12 rounded-full border border-cyan-400/30 mr-3"
            loading="lazy"
          />
          <div>
            <div className="font-semibold text-white">{review.name}</div>
            <div className="text-cyan-300 text-sm">{review.role}</div>
            <div className="text-gray-400 text-xs">at {review.company}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

ReviewCard.displayName = 'ReviewCard';

export default ReviewCard;
