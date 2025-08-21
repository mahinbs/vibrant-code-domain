import React, { useMemo } from 'react';
import ReviewCard from '@/components/ReviewCard';

interface BaseReview {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number; // 1-5
  review: string;
  image: string; // full URL
}

interface ServiceReviewsSectionProps {
  serviceName: string; // e.g., "Mobile Applications", "Chatbot Development"
  reviews: BaseReview[]; // service inferred from prop
  accentColor?: string; // e.g., 'purple', 'teal', or full class 'text-teal-400'
}

const ServiceReviewsSection = ({ serviceName, reviews, accentColor = 'purple' }: ServiceReviewsSectionProps) => {
  const parsedAccent = useMemo(() => {
    // Normalize accent to a simple color keyword
    if (accentColor.startsWith('text-')) {
      const colorName = accentColor.replace('text-', '').replace('-400', '').trim();
      return colorName;
    }
    return accentColor;
  }, [accentColor]);

  const headingColorClass = useMemo(() => {
    const colorMap: Record<string, string> = {
      cyan: 'text-cyan-400',
      purple: 'text-purple-400',
      red: 'text-red-400',
      yellow: 'text-yellow-400',
      indigo: 'text-indigo-400',
      teal: 'text-teal-400',
      pink: 'text-pink-400',
      blue: 'text-blue-400',
      green: 'text-green-400',
      orange: 'text-orange-400'
    };
    return colorMap[parsedAccent] || 'text-white';
  }, [parsedAccent]);

  const separatorClass = useMemo(() => {
    const sepMap: Record<string, string> = {
      cyan: 'via-cyan-300',
      purple: 'via-purple-300',
      red: 'via-red-300',
      yellow: 'via-yellow-300',
      indigo: 'via-indigo-300',
      teal: 'via-teal-300',
      pink: 'via-pink-300',
      blue: 'via-blue-300',
      green: 'via-green-300',
      orange: 'via-orange-300'
    };
    return sepMap[parsedAccent] || 'via-gray-300';
  }, [parsedAccent]);

  const getServiceColor = useMemo<((service: string) => string)>(() => {
    return (_service: string) => {
      const badgeMap: Record<string, string> = {
        cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-400/30',
        purple: 'bg-purple-500/10 text-purple-300 border-purple-400/30',
        red: 'bg-red-500/10 text-red-300 border-red-400/30',
        yellow: 'bg-yellow-500/10 text-yellow-300 border-yellow-400/30',
        indigo: 'bg-indigo-500/10 text-indigo-300 border-indigo-400/30',
        teal: 'bg-teal-500/10 text-teal-300 border-teal-400/30',
        pink: 'bg-pink-500/10 text-pink-300 border-pink-400/30',
        blue: 'bg-blue-500/10 text-blue-300 border-blue-400/30',
        green: 'bg-green-500/10 text-green-300 border-green-400/30',
        orange: 'bg-orange-500/10 text-orange-300 border-orange-400/30'
      };
      return badgeMap[parsedAccent] || 'bg-gray-500/10 text-gray-300 border-gray-400/30';
    };
  }, [parsedAccent]);

  return (
    <section className="py-20 bg-black/80">
      <div className={`w-full h-0.5 bg-gradient-to-r from-transparent ${separatorClass} to-transparent mb-8`}></div>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${headingColorClass}`}>What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real feedback from our {serviceName.toLowerCase()} projects
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, index) => (
            <ReviewCard
              key={r.id}
              review={{ ...r, service: serviceName }}
              index={index}
              getServiceColor={getServiceColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceReviewsSection;


