
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Users, CheckCircle, Star, Calendar, MapPin, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

interface WebinarEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  hero_headline: string;
  hero_subtitle: string;
  speaker_name: string;
  speaker_bio: string;
  speaker_image: string;
  event_date: string;
  duration_minutes: number;
  registration_limit: number;
  benefits: Array<{ title: string; description: string }>;
  agenda: Array<{ time: string; topic: string; description: string }>;
  target_audience: string[];
  social_proof_logos: string[];
  social_proof_videos: string[];
  recognitions: string[];
  testimonials: Array<{ name: string; role: string; company: string; quote: string; avatar: string }>;
  cta_text: string;
  cta_bg_color: string;
  privacy_note: string;
  is_active: boolean;
  show_agenda_collapsible: boolean;
  show_social_proof: boolean;
  show_scarcity: boolean;
  sticky_cta_enabled: boolean;
}

interface RegistrationForm {
  name: string;
  email: string;
  whatsapp_number: string;
}

const WebinarPage = () => {
  const [webinar, setWebinar] = useState<WebinarEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [form, setForm] = useState<RegistrationForm>({
    name: '',
    email: '',
    whatsapp_number: ''
  });

  useEffect(() => {
    fetchActiveWebinar();
  }, []);

  const fetchActiveWebinar = async () => {
    try {
      const { data, error } = await supabase
        .from('webinar_events')
        .select('*')
        .eq('is_active', true)
        .single();

      if (error) {
        console.error('Error fetching webinar:', error);
        return;
      }

      setWebinar(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!webinar) return;

    setRegistering(true);

    try {
      const { error } = await supabase
        .from('webinar_registrations')
        .insert([{
          webinar_id: webinar.id,
          name: form.name,
          email: form.email,
          whatsapp_number: form.whatsapp_number
        }]);

      if (error) throw error;

      setRegistered(true);
      toast.success('Successfully registered for the webinar!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setRegistering(false);
    }
  };

  const extractInstagramPostId = (url: string) => {
    const match = url.match(/instagram\.com\/p\/([^\/\?]+)/);
    return match ? match[1] : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading webinar...</p>
        </div>
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Active Webinar</h1>
          <p className="text-gray-600">There are no active webinars at the moment.</p>
        </div>
      </div>
    );
  }

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for registering for <strong>{webinar.title}</strong>
          </p>
          <p className="text-sm text-gray-500">
            You'll receive a confirmation email with webinar details shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src="/logo.png" 
              alt="Company Logo" 
              className="h-12 mx-auto mb-6"
            />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            {webinar.hero_headline || webinar.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {webinar.hero_subtitle || webinar.subtitle}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 text-gray-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <span>{new Date(webinar.event_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              <span>{webinar.duration_minutes} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-500" />
              <span>Online Event</span>
            </div>
          </div>

          {/* Registration Form */}
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={form.whatsapp_number}
                    onChange={(e) => setForm({...form, whatsapp_number: e.target.value})}
                    placeholder="Enter your WhatsApp number"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full text-lg py-6 bg-orange-500 hover:bg-orange-600"
                  disabled={registering}
                >
                  {registering ? 'Registering...' : (webinar.cta_text || 'Reserve My Spot Now')}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  {webinar.privacy_note}
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Speaker Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Your Expert</h2>
              <h3 className="text-2xl font-semibold text-orange-500 mb-4">{webinar.speaker_name}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{webinar.speaker_bio}</p>
              
              {/* Media Recognition */}
              {webinar.recognitions && webinar.recognitions.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3">As Featured In:</h4>
                  <div className="flex flex-wrap gap-2">
                    {webinar.recognitions.map((recognition, index) => (
                      <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                        {recognition}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="text-center">
              {webinar.speaker_image && (
                <img 
                  src={webinar.speaker_image} 
                  alt={webinar.speaker_name}
                  className="w-64 h-64 rounded-full mx-auto object-cover shadow-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      {webinar.target_audience && webinar.target_audience.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Perfect For</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {webinar.target_audience.map((audience, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-gray-700">{audience}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {webinar.benefits && webinar.benefits.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {webinar.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-orange-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Agenda Section */}
      {webinar.agenda && webinar.agenda.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Webinar Agenda</h2>
            
            {webinar.show_agenda_collapsible ? (
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-center gap-2 mx-auto mb-8 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  <span>View Full Agenda</span>
                  <ChevronDown className="w-4 h-4" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="space-y-6">
                    {webinar.agenda.map((item, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex gap-4">
                          <div className="text-orange-500 font-semibold min-w-[80px]">
                            {item.time}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">{item.topic}</h3>
                            <p className="text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <div className="space-y-6">
                {webinar.agenda.map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex gap-4">
                      <div className="text-orange-500 font-semibold min-w-[80px]">
                        {item.time}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2">{item.topic}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Social Proof Section */}
      {webinar.show_social_proof && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Success Stories</h2>
            
            {/* Instagram Videos */}
            {webinar.social_proof_videos && webinar.social_proof_videos.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">Client Success Videos</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {webinar.social_proof_videos.map((videoUrl, index) => {
                    const postId = extractInstagramPostId(videoUrl);
                    if (!postId) return null;
                    
                    return (
                      <div key={index} className="aspect-square">
                        <iframe
                          src={`https://www.instagram.com/p/${postId}/embed`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency={true}
                          className="rounded-lg"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Media Logos Marquee */}
            {webinar.social_proof_logos && webinar.social_proof_logos.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-center text-gray-700 mb-8">Trusted by Leading Brands</h3>
                <div className="overflow-hidden">
                  <div className="flex animate-scroll space-x-8">
                    {[...webinar.social_proof_logos, ...webinar.social_proof_logos].map((logo, index) => (
                      <img
                        key={index}
                        src={logo}
                        alt="Client logo"
                        className="h-12 w-auto object-contain flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Testimonials */}
            {webinar.testimonials && webinar.testimonials.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {webinar.testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        {testimonial.avatar && (
                          <img 
                            src={testimonial.avatar} 
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-gray-800">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Miss This Opportunity!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of professionals who are transforming their businesses
          </p>
          
          {webinar.show_scarcity && (
            <div className="bg-white/10 rounded-lg p-4 mb-8 inline-block">
              <p className="text-lg font-semibold">
                ⏰ Limited Seats Available - Only {webinar.registration_limit} Spots Left!
              </p>
            </div>
          )}

          <Button 
            size="lg" 
            className="text-xl px-12 py-6 bg-white text-orange-500 hover:bg-gray-100"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {webinar.cta_text || 'Secure Your Spot Now'}
          </Button>
        </div>
      </section>

      {/* Sticky CTA */}
      {webinar.sticky_cta_enabled && (
        <div className="fixed bottom-0 left-0 right-0 bg-orange-500 text-white p-4 shadow-lg z-50 md:hidden">
          <Button 
            className="w-full bg-white text-orange-500 hover:bg-gray-100"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {webinar.cta_text || 'Register Now'}
          </Button>
        </div>
      )}

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WebinarPage;
