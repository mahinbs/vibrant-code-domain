import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface WebinarEvent {
  id: string;
  title: string;
  social_proof_logos?: string[];
  recognitions?: string[];
  social_proof_videos?: string[];
  show_social_proof?: boolean;
}

const WebinarSocialProof = () => {
  const [webinar, setWebinar] = useState<WebinarEvent | null>(null);

  useEffect(() => {
    const fetchActiveWebinar = async () => {
      try {
        const { data, error } = await supabase
          .from('webinar_events')
          .select('*')
          .eq('is_active', true)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching webinar:', error);
          return;
        }

        if (data) {
          setWebinar(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchActiveWebinar();
  }, []);

  if (!webinar?.show_social_proof || (!webinar.social_proof_logos?.length && !webinar.recognitions?.length && !webinar.social_proof_videos?.length)) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-t border-border/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            As Featured In
          </h3>
          <p className="text-muted-foreground text-lg">
            Trusted by industry leaders and featured in top publications
          </p>
        </div>
        
        {/* Logos or Recognition Cards */}
        {(webinar.social_proof_logos?.length || webinar.recognitions?.length) && (
          <div className="overflow-hidden mb-12">
            <div 
              className="flex items-center gap-8 animate-scroll" 
              style={{ 
                animation: 'scroll 25s linear infinite',
                width: 'calc(200% + 2rem)'
              }}
            >
              {/* First set */}
              {webinar.social_proof_logos?.length ? (
                <>
                  {webinar.social_proof_logos.map((logo, index) => (
                    <img 
                      key={index} 
                      src={logo} 
                      alt="Media recognition logo" 
                      className="h-12 md:h-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                    />
                  ))}
                  {/* Duplicate for seamless loop */}
                  {webinar.social_proof_logos.map((logo, index) => (
                    <img 
                      key={`dup-${index}`} 
                      src={logo} 
                      alt="Media recognition logo" 
                      className="h-12 md:h-16 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
                    />
                  ))}
                </>
              ) : (
                <>
                  {webinar.recognitions?.map((recognition, index) => (
                    <div 
                      key={index}
                      className="bg-white/10 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-foreground text-sm font-medium hover:bg-white/15 transition-all duration-300 flex-shrink-0"
                    >
                      {recognition}
                    </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {webinar.recognitions?.map((recognition, index) => (
                    <div 
                      key={`dup-${index}`}
                      className="bg-white/10 backdrop-blur-sm border border-border rounded-lg px-6 py-3 text-foreground text-sm font-medium hover:bg-white/15 transition-all duration-300 flex-shrink-0"
                    >
                      {recognition}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        )}

        {/* Instagram Videos Preview */}
        {webinar.social_proof_videos?.length && (
          <div className="space-y-8">
            <div className="text-center">
              <h4 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                Success Stories from Our Community
              </h4>
              <p className="text-muted-foreground">
                Real transformations from our webinar attendees
              </p>
            </div>
            
            {/* Carousel for videos showing 3 at a time */}
            <div className="max-w-6xl mx-auto">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                  slidesToScroll: 3,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {webinar.social_proof_videos.map((video, index) => {
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
                    );
                  })}
                </CarouselContent>
                {/* External Arrow Buttons */}
                <CarouselPrevious className="-left-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white w-10 h-10" />
                <CarouselNext className="-right-12 top-1/2 -translate-y-1/2 bg-white/10 border-white/20 hover:bg-white/20 text-white w-10 h-10" />
              </Carousel>
              
              {/* CTA */}
              <div className="text-center mt-8">
                <p className="text-lg text-muted-foreground mb-4">
                  Want to become next?
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WebinarSocialProof;