import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Trash2, Plus, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface WebinarEvent {
  id?: string;
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

const WebinarManagement = () => {
  const [events, setEvents] = useState<WebinarEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<WebinarEvent | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('webinar_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('webinar_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Webinar deleted successfully');
      fetchEvents();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      if (editingEvent?.id) {
        const { error } = await supabase
          .from('webinar_events')
          .update({
            ...editingEvent,
            benefits: editingEvent.benefits,
            agenda: editingEvent.agenda,
            testimonials: editingEvent.testimonials,
            target_audience: editingEvent.target_audience,
            social_proof_logos: editingEvent.social_proof_logos,
            social_proof_videos: editingEvent.social_proof_videos,
            recognitions: editingEvent.recognitions
          })
          .eq('id', editingEvent.id);

        if (error) throw error;
        toast.success('Webinar updated successfully');
      } else {
        const { error } = await supabase
          .from('webinar_events')
          .insert([{
            ...editingEvent,
            benefits: editingEvent.benefits,
            agenda: editingEvent.agenda,
            testimonials: editingEvent.testimonials,
            target_audience: editingEvent.target_audience,
            social_proof_logos: editingEvent.social_proof_logos,
            social_proof_videos: editingEvent.social_proof_videos,
            recognitions: editingEvent.recognitions
          }]);

        if (error) throw error;
        toast.success('Webinar created successfully');
      }

      fetchEvents();
      setEditingEvent(null);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const addBenefit = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        benefits: [...editingEvent.benefits, { title: '', description: '' }]
      });
    }
  };

  const updateBenefit = (index: number, field: string, value: string) => {
    if (editingEvent) {
      const updatedBenefits = [...editingEvent.benefits];
      updatedBenefits[index][field] = value;
      setEditingEvent({
        ...editingEvent,
        benefits: updatedBenefits
      });
    }
  };

  const removeBenefit = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        benefits: editingEvent.benefits.filter((_, i) => i !== index)
      });
    }
  };

  const addAgendaItem = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        agenda: [...editingEvent.agenda, { time: '', topic: '', description: '' }]
      });
    }
  };

  const updateAgendaItem = (index: number, field: string, value: string) => {
    if (editingEvent) {
      const updatedAgenda = [...editingEvent.agenda];
      updatedAgenda[index][field] = value;
      setEditingEvent({
        ...editingEvent,
        agenda: updatedAgenda
      });
    }
  };

  const removeAgendaItem = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        agenda: editingEvent.agenda.filter((_, i) => i !== index)
      });
    }
  };

  const addTestimonial = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        testimonials: [...editingEvent.testimonials, { name: '', role: '', company: '', quote: '', avatar: '' }]
      });
    }
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    if (editingEvent) {
      const updatedTestimonials = [...editingEvent.testimonials];
      updatedTestimonials[index][field] = value;
      setEditingEvent({
        ...editingEvent,
        testimonials: updatedTestimonials
      });
    }
  };

  const removeTestimonial = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        testimonials: editingEvent.testimonials.filter((_, i) => i !== index)
      });
    }
  };

  const addTargetAudience = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        target_audience: [...editingEvent.target_audience, '']
      });
    }
  };

  const updateTargetAudience = (index: number, value: string) => {
    if (editingEvent) {
      const updated = [...editingEvent.target_audience];
      updated[index] = value;
      setEditingEvent({
        ...editingEvent,
        target_audience: updated
      });
    }
  };

  const removeTargetAudience = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        target_audience: editingEvent.target_audience.filter((_, i) => i !== index)
      });
    }
  };

  const addSocialProofLogo = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        social_proof_logos: [...editingEvent.social_proof_logos, '']
      });
    }
  };

  const updateSocialProofLogo = (index: number, value: string) => {
    if (editingEvent) {
      const updated = [...editingEvent.social_proof_logos];
      updated[index] = value;
      setEditingEvent({
        ...editingEvent,
        social_proof_logos: updated
      });
    }
  };

  const removeSocialProofLogo = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        social_proof_logos: editingEvent.social_proof_logos.filter((_, i) => i !== index)
      });
    }
  };

  const addSocialProofVideo = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        social_proof_videos: [...editingEvent.social_proof_videos, '']
      });
    }
  };

  const updateSocialProofVideo = (index: number, value: string) => {
    if (editingEvent) {
      const updated = [...editingEvent.social_proof_videos];
      updated[index] = value;
      setEditingEvent({
        ...editingEvent,
        social_proof_videos: updated
      });
    }
  };

  const removeSocialProofVideo = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        social_proof_videos: editingEvent.social_proof_videos.filter((_, i) => i !== index)
      });
    }
  };

  const addMediaRecognition = () => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        recognitions: [...editingEvent.recognitions, '']
      });
    }
  };

  const updateMediaRecognition = (index: number, value: string) => {
    if (editingEvent) {
      const updated = [...editingEvent.recognitions];
      updated[index] = value;
      setEditingEvent({
        ...editingEvent,
        recognitions: updated
      });
    }
  };

  const removeMediaRecognition = (index: number) => {
    if (editingEvent) {
      setEditingEvent({
        ...editingEvent,
        recognitions: editingEvent.recognitions.filter((_, i) => i !== index)
      });
    }
  };

  if (!editingEvent) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Webinar Management</h1>
          <Button onClick={() => setEditingEvent({
            title: '',
            subtitle: '',
            description: '',
            hero_headline: '',
            hero_subtitle: '',
            speaker_name: '',
            speaker_bio: '',
            speaker_image: '',
            event_date: '',
            duration_minutes: 60,
            registration_limit: 100,
            benefits: [],
            agenda: [],
            target_audience: [],
            social_proof_logos: [],
            social_proof_videos: [],
            recognitions: [],
            testimonials: [],
            cta_text: 'Reserve My Spot Now',
            cta_bg_color: '#f97316',
            privacy_note: 'We never spam or share your info.',
            is_active: true,
            show_agenda_collapsible: true,
            show_social_proof: true,
            show_scarcity: true,
            sticky_cta_enabled: true
          })}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Webinar
          </Button>
        </div>

        <div className="grid gap-4">
          {events.map((event) => (
            <Card key={event.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-gray-600">{event.subtitle}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(event.event_date).toLocaleDateString()} • {event.duration_minutes} minutes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setEditingEvent(event)}>
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(event.id!)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {editingEvent.id ? 'Edit Webinar' : 'Create New Webinar'}
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setEditingEvent(null)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600">
            Save Webinar
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingEvent.title}
                onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                placeholder="Webinar title"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={editingEvent.subtitle}
                onChange={(e) => setEditingEvent({...editingEvent, subtitle: e.target.value})}
                placeholder="Webinar subtitle"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                placeholder="Webinar description"
              />
            </div>
            <div>
              <Label htmlFor="hero_headline">Hero Headline</Label>
              <Input
                id="hero_headline"
                value={editingEvent.hero_headline}
                onChange={(e) => setEditingEvent({...editingEvent, hero_headline: e.target.value})}
                placeholder="Main headline"
              />
            </div>
            <div>
              <Label htmlFor="hero_subtitle">Hero Subtitle</Label>
              <Input
                id="hero_subtitle"
                value={editingEvent.hero_subtitle}
                onChange={(e) => setEditingEvent({...editingEvent, hero_subtitle: e.target.value})}
                placeholder="Hero subtitle"
              />
            </div>
          </CardContent>
        </Card>

        {/* Speaker Information */}
        <Card>
          <CardHeader>
            <CardTitle>Speaker Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="speaker_name">Speaker Name</Label>
              <Input
                id="speaker_name"
                value={editingEvent.speaker_name}
                onChange={(e) => setEditingEvent({...editingEvent, speaker_name: e.target.value})}
                placeholder="Speaker name"
              />
            </div>
            <div>
              <Label htmlFor="speaker_bio">Speaker Bio</Label>
              <Textarea
                id="speaker_bio"
                value={editingEvent.speaker_bio}
                onChange={(e) => setEditingEvent({...editingEvent, speaker_bio: e.target.value})}
                placeholder="Speaker biography"
              />
            </div>
            <div>
              <Label htmlFor="speaker_image">Speaker Image URL</Label>
              <Input
                id="speaker_image"
                value={editingEvent.speaker_image}
                onChange={(e) => setEditingEvent({...editingEvent, speaker_image: e.target.value})}
                placeholder="https://example.com/speaker.jpg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="event_date">Event Date</Label>
              <Input
                id="event_date"
                type="datetime-local"
                value={editingEvent.event_date}
                onChange={(e) => setEditingEvent({...editingEvent, event_date: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="duration_minutes">Duration (minutes)</Label>
              <Input
                id="duration_minutes"
                type="number"
                value={editingEvent.duration_minutes}
                onChange={(e) => setEditingEvent({...editingEvent, duration_minutes: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="registration_limit">Registration Limit</Label>
              <Input
                id="registration_limit"
                type="number"
                value={editingEvent.registration_limit}
                onChange={(e) => setEditingEvent({...editingEvent, registration_limit: parseInt(e.target.value)})}
              />
            </div>
          </CardContent>
        </Card>

        {/* Target Audience */}
        <Card>
          <CardHeader>
            <CardTitle>Target Audience</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.target_audience.map((audience, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={audience}
                    onChange={(e) => updateTargetAudience(index, e.target.value)}
                    placeholder="Target audience description"
                  />
                  <Button variant="outline" size="sm" onClick={() => removeTargetAudience(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addTargetAudience}>
                <Plus className="w-4 h-4 mr-2" />
                Add Target Audience
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Media Recognition Names */}
        <Card>
          <CardHeader>
            <CardTitle>Media Recognition Names</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.recognitions.map((recognition, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={recognition}
                    onChange={(e) => updateMediaRecognition(index, e.target.value)}
                    placeholder="Media recognition name (e.g., Forbes, TechCrunch)"
                  />
                  <Button variant="outline" size="sm" onClick={() => removeMediaRecognition(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addMediaRecognition}>
                <Plus className="w-4 h-4 mr-2" />
                Add Media Recognition
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Media Recognition Logos */}
        <Card>
          <CardHeader>
            <CardTitle>Media Recognition Logos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.social_proof_logos.map((logo, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <Input
                    value={logo}
                    onChange={(e) => updateSocialProofLogo(index, e.target.value)}
                    placeholder="Logo URL (e.g., https://example.com/logo.png)"
                  />
                  {logo && (
                    <img src={logo} alt="Logo preview" className="w-8 h-8 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                  )}
                  <Button variant="outline" size="sm" onClick={() => removeSocialProofLogo(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addSocialProofLogo}>
                <Plus className="w-4 h-4 mr-2" />
                Add Media Logo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Social Proof Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Social Proof Videos (Instagram URLs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.social_proof_videos.map((video, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={video}
                    onChange={(e) => updateSocialProofVideo(index, e.target.value)}
                    placeholder="Instagram post URL (e.g., https://www.instagram.com/p/ABC123/)"
                  />
                  <Button variant="outline" size="sm" onClick={() => removeSocialProofVideo(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addSocialProofVideo}>
                <Plus className="w-4 h-4 mr-2" />
                Add Instagram Video
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.benefits.map((benefit, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`benefit-title-${index}`}>Title</Label>
                    <Input
                      id={`benefit-title-${index}`}
                      value={benefit.title}
                      onChange={(e) => updateBenefit(index, 'title', e.target.value)}
                      placeholder="Benefit title"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`benefit-description-${index}`}>Description</Label>
                    <Input
                      id={`benefit-description-${index}`}
                      value={benefit.description}
                      onChange={(e) => updateBenefit(index, 'description', e.target.value)}
                      placeholder="Benefit description"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeBenefit(index)} className="mt-6">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addBenefit}>
                <Plus className="w-4 h-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agenda */}
        <Card>
          <CardHeader>
            <CardTitle>Agenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.agenda.map((agendaItem, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor={`agenda-time-${index}`}>Time</Label>
                    <Input
                      id={`agenda-time-${index}`}
                      value={agendaItem.time}
                      onChange={(e) => updateAgendaItem(index, 'time', e.target.value)}
                      placeholder="Time"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`agenda-topic-${index}`}>Topic</Label>
                    <Input
                      id={`agenda-topic-${index}`}
                      value={agendaItem.topic}
                      onChange={(e) => updateAgendaItem(index, 'topic', e.target.value)}
                      placeholder="Topic"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`agenda-description-${index}`}>Description</Label>
                    <Input
                      id={`agenda-description-${index}`}
                      value={agendaItem.description}
                      onChange={(e) => updateAgendaItem(index, 'description', e.target.value)}
                      placeholder="Description"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeAgendaItem(index)} className="mt-6">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addAgendaItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Agenda Item
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {editingEvent.testimonials.map((testimonial, index) => (
                <div key={index} className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor={`testimonial-name-${index}`}>Name</Label>
                    <Input
                      id={`testimonial-name-${index}`}
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-role-${index}`}>Role</Label>
                    <Input
                      id={`testimonial-role-${index}`}
                      value={testimonial.role}
                      onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                      placeholder="Role"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-company-${index}`}>Company</Label>
                    <Input
                      id={`testimonial-company-${index}`}
                      value={testimonial.company}
                      onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                      placeholder="Company"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-quote-${index}`}>Quote</Label>
                    <Input
                      id={`testimonial-quote-${index}`}
                      value={testimonial.quote}
                      onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                      placeholder="Quote"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`testimonial-avatar-${index}`}>Avatar URL</Label>
                    <Input
                      id={`testimonial-avatar-${index}`}
                      value={testimonial.avatar}
                      onChange={(e) => updateTestimonial(index, 'avatar', e.target.value)}
                      placeholder="Avatar URL"
                    />
                  </div>
                  <Button variant="outline" size="sm" onClick={() => removeTestimonial(index)} className="mt-6">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addTestimonial}>
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Settings */}
        <Card>
          <CardHeader>
            <CardTitle>CTA Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cta_text">CTA Text</Label>
              <Input
                id="cta_text"
                value={editingEvent.cta_text}
                onChange={(e) => setEditingEvent({...editingEvent, cta_text: e.target.value})}
                placeholder="Reserve My Spot Now"
              />
            </div>
            <div>
              <Label htmlFor="cta_bg_color">CTA Background Color</Label>
              <Input
                id="cta_bg_color"
                type="color"
                value={editingEvent.cta_bg_color}
                onChange={(e) => setEditingEvent({...editingEvent, cta_bg_color: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="privacy_note">Privacy Note</Label>
              <Input
                id="privacy_note"
                value={editingEvent.privacy_note}
                onChange={(e) => setEditingEvent({...editingEvent, privacy_note: e.target.value})}
                placeholder="We never spam or share your info."
              />
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="is_active">Active</Label>
              <Switch
                id="is_active"
                checked={editingEvent.is_active}
                onCheckedChange={(checked) => setEditingEvent({...editingEvent, is_active: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show_agenda_collapsible">Show Agenda Collapsible</Label>
              <Switch
                id="show_agenda_collapsible"
                checked={editingEvent.show_agenda_collapsible}
                onCheckedChange={(checked) => setEditingEvent({...editingEvent, show_agenda_collapsible: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show_social_proof">Show Social Proof</Label>
              <Switch
                id="show_social_proof"
                checked={editingEvent.show_social_proof}
                onCheckedChange={(checked) => setEditingEvent({...editingEvent, show_social_proof: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show_scarcity">Show Scarcity</Label>
              <Switch
                id="show_scarcity"
                checked={editingEvent.show_scarcity}
                onCheckedChange={(checked) => setEditingEvent({...editingEvent, show_scarcity: checked})}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sticky_cta_enabled">Sticky CTA Enabled</Label>
              <Switch
                id="sticky_cta_enabled"
                checked={editingEvent.sticky_cta_enabled}
                onCheckedChange={(checked) => setEditingEvent({...editingEvent, sticky_cta_enabled: checked})}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebinarManagement;
