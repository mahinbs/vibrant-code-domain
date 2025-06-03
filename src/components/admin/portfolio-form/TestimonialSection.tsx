
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProject } from '@/services/adminDataService';

interface TestimonialSectionProps {
  formData: AdminProject;
  setFormData: React.Dispatch<React.SetStateAction<AdminProject>>;
}

const TestimonialSection = ({ formData, setFormData }: TestimonialSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Testimonial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="testimonial-text">Testimonial Text</Label>
          <Textarea
            id="testimonial-text"
            value={formData.extendedTestimonial.quote}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              extendedTestimonial: { ...prev.extendedTestimonial, quote: e.target.value }
            }))}
            placeholder="Client testimonial"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-author">Author</Label>
            <Input
              id="testimonial-author"
              value={formData.extendedTestimonial.author}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                extendedTestimonial: { ...prev.extendedTestimonial, author: e.target.value }
              }))}
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-position">Position</Label>
            <Input
              id="testimonial-position"
              value={formData.extendedTestimonial.position}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                extendedTestimonial: { ...prev.extendedTestimonial, position: e.target.value }
              }))}
              placeholder="CEO"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-company">Company</Label>
            <Input
              id="testimonial-company"
              value={formData.extendedTestimonial.company}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                extendedTestimonial: { ...prev.extendedTestimonial, company: e.target.value }
              }))}
              placeholder="Company Name"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialSection;
