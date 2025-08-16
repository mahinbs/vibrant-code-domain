import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { CalendarDays, Users, Eye, Edit, Trash2, Plus } from 'lucide-react';

interface WebinarEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  event_date: string;
  duration_minutes: number;
  speaker_name: string;
  speaker_bio: string;
  speaker_image: string;
  benefits: string[];
  agenda: Array<{ time: string; topic: string }>;
  is_active: boolean;
  registration_limit: number;
  created_at: string;
  updated_at: string;
  // New landing page control fields
  hero_headline?: string;
  hero_subtitle?: string;
  show_scarcity?: boolean;
  sticky_cta_enabled?: boolean;
  cta_text?: string;
  cta_bg_color?: string;
  target_audience?: string[];
  social_proof_logos?: string[];
  social_proof_videos?: string[];
  recognitions?: string[];
  testimonials?: Array<{ quote: string; author: string; role: string; company: string; avatar?: string }>;
  show_social_proof?: boolean;
  privacy_note?: string;
  show_agenda_collapsible?: boolean;
}

interface WebinarRegistration {
  id: string;
  webinar_id: string;
  name: string;
  email: string;
  whatsapp_number: string;
  registration_date: string;
  status: string;
  webinar_events?: { title: string };
}

const WebinarManagement = () => {
  const [webinars, setWebinars] = useState<WebinarEvent[]>([]);
  const [registrations, setRegistrations] = useState<WebinarRegistration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<WebinarEvent>>({});

  useEffect(() => {
    fetchWebinars();
    fetchRegistrations();
  }, []);

  const fetchWebinars = async () => {
    try {
      const { data, error } = await supabase
        .from('webinar_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWebinars((data || []).map(webinar => ({
        ...webinar,
        benefits: Array.isArray(webinar.benefits) 
          ? webinar.benefits.filter((b: any) => typeof b === 'string') as string[]
          : [],
        agenda: Array.isArray(webinar.agenda) 
          ? webinar.agenda.filter((a: any) => a && typeof a === 'object' && a.time && a.topic) as Array<{ time: string; topic: string }>
          : [],
        // Type-safe conversion for new fields
        testimonials: Array.isArray(webinar.testimonials) 
          ? webinar.testimonials as Array<{ quote: string; author: string; role: string; company: string; avatar?: string }>
          : [],
        target_audience: Array.isArray(webinar.target_audience) 
          ? webinar.target_audience as string[]
          : [],
        social_proof_logos: Array.isArray(webinar.social_proof_logos) 
          ? webinar.social_proof_logos as string[]
          : [],
        social_proof_videos: Array.isArray(webinar.social_proof_videos) 
          ? webinar.social_proof_videos as string[]
          : [],
        recognitions: Array.isArray(webinar.recognitions) 
          ? webinar.recognitions as string[]
          : []
      })));
    } catch (error) {
      console.error('Error fetching webinars:', error);
      toast({
        title: "Error",
        description: "Failed to fetch webinars",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('webinar_registrations')
        .select(`
          *,
          webinar_events (title)
        `)
        .order('registration_date', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.map((item: any, i: number) => 
        i === index ? (field === 'agenda' ? { ...item, topic: value } : value) : item
      ) || []
    }));
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [
        ...(prev[field] || []),
        field === 'agenda' ? { time: '', topic: '' } : ''
      ]
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index) || []
    }));
  };

  const startEditing = (webinar?: WebinarEvent) => {
    if (webinar) {
      setFormData(webinar);
      setSelectedWebinar(webinar);
    } else {
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        event_date: '',
        duration_minutes: 90,
        speaker_name: '',
        speaker_bio: '',
        speaker_image: '',
        benefits: [''],
        agenda: [{ time: '', topic: '' }],
        is_active: true,
        registration_limit: 100,
        // Default values for new fields
        hero_headline: '',
        hero_subtitle: '',
        show_scarcity: true,
        sticky_cta_enabled: true,
        cta_text: 'Reserve My Spot Now',
        cta_bg_color: '#22c55e',
        target_audience: ['Entrepreneurs', 'Freelancers', 'Coaches / Consultants', 'E-Commerce Sellers', 'Students & Professionals exploring AI'],
        social_proof_logos: [],
        social_proof_videos: [],
        recognitions: ['Forbes', 'Entrepreneur Magazine', 'Times of India Award'],
        testimonials: [],
        show_social_proof: true,
        privacy_note: 'We never spam or share your info.',
        show_agenda_collapsible: true
      });
      setSelectedWebinar(null);
    }
    setIsEditing(true);
  };

  const saveWebinar = async () => {
    try {
      const { id, created_at, updated_at, ...saveData } = formData as any;
      
      if (selectedWebinar) {
        const { error } = await supabase
          .from('webinar_events')
          .update(saveData)
          .eq('id', selectedWebinar.id);

        if (error) throw error;
        toast({ title: "Success", description: "Webinar updated successfully" });
      } else {
        const { error } = await supabase
          .from('webinar_events')
          .insert([saveData]);

        if (error) throw error;
        toast({ title: "Success", description: "Webinar created successfully" });
      }

      setIsEditing(false);
      setSelectedWebinar(null);
      setFormData({});
      fetchWebinars();
    } catch (error) {
      console.error('Error saving webinar:', error);
      toast({
        title: "Error",
        description: "Failed to save webinar",
        variant: "destructive",
      });
    }
  };

  const deleteWebinar = async (id: string) => {
    if (!confirm('Are you sure you want to delete this webinar?')) return;

    try {
      const { error } = await supabase
        .from('webinar_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Webinar deleted successfully" });
      fetchWebinars();
    } catch (error) {
      console.error('Error deleting webinar:', error);
      toast({
        title: "Error",
        description: "Failed to delete webinar",
        variant: "destructive",
      });
    }
  };

  const exportRegistrations = () => {
    const csv = [
      ['Name', 'Email', 'WhatsApp', 'Webinar', 'Registration Date', 'Status'],
      ...registrations.map(reg => [
        reg.name,
        reg.email,
        reg.whatsapp_number,
        reg.webinar_events?.title || 'Unknown',
        new Date(reg.registration_date).toLocaleDateString(),
        reg.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'webinar_registrations.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Webinar Management</h1>
        <Button onClick={() => startEditing()}>
          <Plus className="w-4 h-4 mr-2" />
          Create Webinar
        </Button>
      </div>

      <Tabs defaultValue="events" className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          {isEditing && <TabsTrigger value="form">Edit Event</TabsTrigger>}
        </TabsList>

        <TabsContent value="events" className="space-y-4">
          <div className="grid gap-4">
            {webinars.map((webinar) => (
              <Card key={webinar.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {webinar.title}
                        {webinar.is_active && <Badge>Active</Badge>}
                      </CardTitle>
                      <CardDescription>{webinar.subtitle}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('/webinar', '_blank')}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => startEditing(webinar)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteWebinar(webinar.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      {new Date(webinar.event_date).toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Limit: {webinar.registration_limit}
                    </div>
                    <div>
                      Duration: {webinar.duration_minutes} minutes
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="registrations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Registrations ({registrations.length})</h2>
            <Button onClick={exportRegistrations}>Export CSV</Button>
          </div>
          
          <div className="grid gap-4">
            {registrations.map((registration) => (
              <Card key={registration.id}>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="font-medium">{registration.name}</p>
                      <p className="text-sm text-muted-foreground">{registration.email}</p>
                    </div>
                    <div>
                      <p className="text-sm">WhatsApp: {registration.whatsapp_number}</p>
                    </div>
                    <div>
                      <p className="text-sm">{registration.webinar_events?.title || 'Unknown Event'}</p>
                    </div>
                    <div>
                      <p className="text-sm">{new Date(registration.registration_date).toLocaleString()}</p>
                      <Badge variant={registration.status === 'registered' ? 'default' : 'secondary'}>
                        {registration.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {isEditing && (
          <TabsContent value="form" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{selectedWebinar ? 'Edit' : 'Create'} Webinar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={formData.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Webinar title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input
                      value={formData.subtitle || ''}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      placeholder="Compelling subtitle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed description"
                    rows={3}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Event Date & Time</Label>
                    <Input
                      type="datetime-local"
                      value={formData.event_date ? (() => {
                        // Display the stored datetime exactly as it is
                        const date = new Date(formData.event_date);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        return `${year}-${month}-${day}T${hours}:${minutes}`;
                      })() : ''}
                      onChange={(e) => {
                        if (e.target.value) {
                          // Store the datetime exactly as entered, no conversion
                          const inputDate = new Date(e.target.value);
                          handleInputChange('event_date', inputDate.toISOString());
                        } else {
                          handleInputChange('event_date', '');
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Duration (minutes)</Label>
                    <Input
                      type="number"
                      value={formData.duration_minutes || ''}
                      onChange={(e) => handleInputChange('duration_minutes', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Limit</Label>
                    <Input
                      type="number"
                      value={formData.registration_limit || ''}
                      onChange={(e) => handleInputChange('registration_limit', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Speaker Name</Label>
                    <Input
                      value={formData.speaker_name || ''}
                      onChange={(e) => handleInputChange('speaker_name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Speaker Image URL</Label>
                    <Input
                      value={formData.speaker_image || ''}
                      onChange={(e) => handleInputChange('speaker_image', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Speaker Bio</Label>
                  <Textarea
                    value={formData.speaker_bio || ''}
                    onChange={(e) => handleInputChange('speaker_bio', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Benefits</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('benefits')}>
                      Add Benefit
                    </Button>
                  </div>
                  {formData.benefits?.map((benefit, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={benefit}
                        onChange={(e) => handleArrayChange('benefits', index, e.target.value)}
                        placeholder="Key benefit or learning outcome"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeArrayItem('benefits', index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Agenda</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('agenda')}>
                      Add Agenda Item
                    </Button>
                  </div>
                  {formData.agenda?.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2">
                      <Input
                        value={item.time}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          agenda: prev.agenda?.map((agendaItem, i) => 
                            i === index ? { ...agendaItem, time: e.target.value } : agendaItem
                          ) || []
                        }))}
                        placeholder="Time (e.g., 14:00)"
                      />
                      <Input
                        value={item.topic}
                        onChange={(e) => handleArrayChange('agenda', index, e.target.value)}
                        placeholder="Topic/Session title"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        onClick={() => removeArrayItem('agenda', index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                 {/* Landing Page Settings */}
                 <div className="border-t pt-6 space-y-6">
                   <h3 className="text-lg font-semibold">Landing Page Settings</h3>
                   
                   {/* Hero Section */}
                   <div className="space-y-4">
                     <h4 className="font-medium">Hero Section</h4>
                     <div className="grid md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label>Hero Headline (if different from title)</Label>
                         <Input
                           value={formData.hero_headline || ''}
                           onChange={(e) => handleInputChange('hero_headline', e.target.value)}
                           placeholder="e.g., Launch Your AI Freelancing Career – Start Earning with AI in Just $1"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>Hero Subtitle (if different from subtitle)</Label>
                         <Input
                           value={formData.hero_subtitle || ''}
                           onChange={(e) => handleInputChange('hero_subtitle', e.target.value)}
                           placeholder="Short, direct subheading"
                         />
                       </div>
                     </div>
                   </div>

                   {/* CTA Settings */}
                   <div className="space-y-4">
                     <h4 className="font-medium">Call-to-Action Settings</h4>
                     <div className="grid md:grid-cols-3 gap-4">
                       <div className="space-y-2">
                         <Label>CTA Button Text</Label>
                         <Input
                           value={formData.cta_text || ''}
                           onChange={(e) => handleInputChange('cta_text', e.target.value)}
                           placeholder="Reserve My Spot Now"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label>CTA Button Color</Label>
                         <div className="flex gap-2">
                           <Input
                             type="color"
                             value={formData.cta_bg_color || '#22c55e'}
                             onChange={(e) => handleInputChange('cta_bg_color', e.target.value)}
                             className="w-16 h-10"
                           />
                           <Input
                             value={formData.cta_bg_color || ''}
                             onChange={(e) => handleInputChange('cta_bg_color', e.target.value)}
                             placeholder="#22c55e"
                           />
                         </div>
                       </div>
                       <div className="flex items-center gap-2 mt-6">
                         <input
                           type="checkbox"
                           id="sticky_cta_enabled"
                           checked={formData.sticky_cta_enabled || false}
                           onChange={(e) => handleInputChange('sticky_cta_enabled', e.target.checked)}
                         />
                         <Label htmlFor="sticky_cta_enabled">Enable Sticky CTA</Label>
                       </div>
                     </div>
                   </div>

                   {/* Scarcity & Social Proof */}
                   <div className="grid md:grid-cols-2 gap-6">
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="show_scarcity"
                         checked={formData.show_scarcity || false}
                         onChange={(e) => handleInputChange('show_scarcity', e.target.checked)}
                       />
                       <Label htmlFor="show_scarcity">Show Scarcity Bar</Label>
                     </div>
                     <div className="flex items-center gap-2">
                       <input
                         type="checkbox"
                         id="show_social_proof"
                         checked={formData.show_social_proof || false}
                         onChange={(e) => handleInputChange('show_social_proof', e.target.checked)}
                       />
                       <Label htmlFor="show_social_proof">Show Social Proof Section</Label>
                     </div>
                   </div>

                   {/* Target Audience */}
                   <div className="space-y-4">
                     <div className="flex justify-between items-center">
                       <Label>Target Audience</Label>
                       <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('target_audience')}>
                         Add Audience
                       </Button>
                     </div>
                     {formData.target_audience?.map((audience, index) => (
                       <div key={index} className="flex gap-2">
                         <Input
                           value={audience}
                           onChange={(e) => handleArrayChange('target_audience', index, e.target.value)}
                           placeholder="e.g., Entrepreneurs, Freelancers"
                         />
                         <Button 
                           type="button" 
                           variant="destructive" 
                           size="sm"
                           onClick={() => removeArrayItem('target_audience', index)}
                         >
                           Remove
                         </Button>
                       </div>
                     ))}
                   </div>

                    {/* Recognitions */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Media Recognition (Forbes, TOI, etc.)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('recognitions')}>
                          Add Recognition
                        </Button>
                      </div>
                      {formData.recognitions?.map((recognition, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={recognition}
                            onChange={(e) => handleArrayChange('recognitions', index, e.target.value)}
                            placeholder="e.g., Forbes, Entrepreneur Magazine"
                          />
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeArrayItem('recognitions', index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>

                    {/* Media Recognition Logos */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Media Recognition Logos</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('social_proof_logos')}>
                          Add Logo URL
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Add logo image URLs for media outlets that featured you</p>
                      {formData.social_proof_logos?.map((logo, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex gap-2">
                            <Input
                              value={logo}
                              onChange={(e) => handleArrayChange('social_proof_logos', index, e.target.value)}
                              placeholder="Logo image URL (e.g., https://example.com/forbes-logo.png)"
                            />
                            <Button 
                              type="button" 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeArrayItem('social_proof_logos', index)}
                            >
                              Remove
                            </Button>
                          </div>
                          {logo && (
                            <div className="ml-2">
                              <img 
                                src={logo} 
                                alt="Logo preview" 
                                className="h-8 w-auto object-contain border rounded" 
                                onError={(e) => {
                                  (e.target as HTMLImageElement).style.display = 'none';
                                }} 
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Social Proof Videos (Instagram URLs) */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label>Social Proof Videos (Instagram URLs)</Label>
                        <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('social_proof_videos')}>
                          Add Instagram Video
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">Add Instagram post/reel URLs for video testimonials</p>
                      {formData.social_proof_videos?.map((video, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={video}
                            onChange={(e) => handleArrayChange('social_proof_videos', index, e.target.value)}
                            placeholder="Instagram URL (e.g., https://www.instagram.com/p/ABC123/)"
                          />
                          <Button 
                            type="button" 
                            variant="destructive" 
                            size="sm"
                            onClick={() => removeArrayItem('social_proof_videos', index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>


                    {/* Privacy Note */}
                    <div className="space-y-2">
                      <Label>Privacy Note (below form)</Label>
                      <Input
                        value={formData.privacy_note || ''}
                        onChange={(e) => handleInputChange('privacy_note', e.target.value)}
                        placeholder="We never spam or share your info."
                      />
                    </div>

                   <div className="flex items-center gap-2">
                     <input
                       type="checkbox"
                       id="show_agenda_collapsible"
                       checked={formData.show_agenda_collapsible || false}
                       onChange={(e) => handleInputChange('show_agenda_collapsible', e.target.checked)}
                     />
                     <Label htmlFor="show_agenda_collapsible">Make Agenda Collapsible on Mobile</Label>
                   </div>
                 </div>

                 <div className="flex items-center gap-2">
                   <input
                     type="checkbox"
                     id="is_active"
                     checked={formData.is_active || false}
                     onChange={(e) => handleInputChange('is_active', e.target.checked)}
                   />
                   <Label htmlFor="is_active">Active (visible on landing page)</Label>
                 </div>

                <div className="flex gap-4">
                  <Button onClick={saveWebinar}>
                    {selectedWebinar ? 'Update' : 'Create'} Webinar
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setIsEditing(false);
                      setSelectedWebinar(null);
                      setFormData({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default WebinarManagement;