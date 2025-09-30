import React from 'react';
import { Star } from 'lucide-react';
import Title from './Title';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Ramesh Kumar",
      location: "Bangalore",
      text: "I got my first AI freelancing client in 17 days! Never thought it was possible.",
      rating: 5,
      earnings: "₹45,000 in first month"
    },
    {
      name: "Priya Sharma", 
      location: "Delhi",
      text: "The CRM system helped me manage 12 leads in my first week. Amazing results!",
      rating: 5,
      earnings: "₹38,000 in first month"
    },
    {
      name: "Arjun Patel",
      location: "Mumbai", 
      text: "From zero experience to landing my first project. The training is incredible!",
      rating: 5,
      earnings: "₹52,000 in first month"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 pointer-events-none"></div>
      
      {/* Internal Glow Effects - Contained within viewport */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-2xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <Title className="text-4xl mb-4">Real Success Stories</Title>
          <p className="text-xl text-muted-foreground">See what our students achieve in their first month</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card/10 backdrop-blur-sm border border-border/20 rounded-xl p-6 hover:bg-card/15 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                ))}
              </div>
              <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
              <div className="border-t border-border/20 pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                <p className="text-sm font-semibold text-primary mt-2">{testimonial.earnings}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;