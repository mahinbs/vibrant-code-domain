import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface InstagramSocialProofProps {
  videoUrls: string[];
  title?: string;
  subtitle?: string;
  onCta?: () => void;
  background?: 'video' | 'inherit';
}

const InstagramSocialProof: React.FC<InstagramSocialProofProps> = ({
  videoUrls,
  title = "Success Stories from Our Community",
  subtitle = "Real transformations from our webinar attendees",
  onCta,
  background = 'video'
}) => {
  if (!videoUrls.length) return null;

  const getInstagramEmbedUrl = (url: string) => {
    if (url.includes('instagram.com')) {
      const postMatch = url.match(/\/p\/([^\/\?]+)/);
      const reelMatch = url.match(/\/reel\/([^\/\?]+)/);
      const postId = postMatch?.[1] || reelMatch?.[1];
      if (postId) {
        return `https://www.instagram.com/p/${postId}/embed/`;
      }
    }
    return url;
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {background === 'video' && (
        <>
          {/* AI Brain Video Background */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover z-0"
            preload="metadata"
          >
            <source src="https://res.cloudinary.com/dknafpppp/video/upload/v1748771996/0_Ai_Brain_1920x1080_quggeb.mp4" type="video/mp4" />
          </video>
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60 z-10"></div>
        </>
      )}
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="text-center mb-12">
          <h3 className={`text-2xl md:text-3xl font-bold mb-3 ${background === 'video' ? 'text-white drop-shadow-lg' : 'text-white'}`}>
            {title}
          </h3>
          <p className={`text-lg ${background === 'video' ? 'text-white/90 drop-shadow-md' : 'text-muted-foreground'}`}>
            {subtitle}
          </p>
        </div>
        
        {/* Carousel for videos with external arrows */}
        <div className="relative max-w-6xl mx-auto px-16">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {videoUrls.map((video, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <div 
                    className="group relative animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-background/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                      <iframe
                        src={getInstagramEmbedUrl(video)}
                        width="100%" 
                        height="400"
                        frameBorder="0"
                        scrolling="no"
                        allowTransparency={true}
                        allow="encrypted-media"
                        loading="lazy"
                        className="w-full rounded-2xl"
                        title={`Success story ${index + 1}`}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* External Arrow Buttons */}
            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white w-12 h-12 shadow-lg" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white w-12 h-12 shadow-lg" />
          </Carousel>
          
          {/* CTA */}
            {onCta && (
            <div className="text-center mt-8">
              <p className={`text-lg mb-4 ${background === 'video' ? 'text-white/90 drop-shadow-md' : 'text-muted-foreground'}`}>
                Want to become next?
              </p>
              <button
                onClick={onCta}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Your Success Story for $1
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InstagramSocialProof;