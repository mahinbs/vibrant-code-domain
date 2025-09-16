
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
interface TestimonialSectionProps {
  formData: any;
  setFormData: (field: string, value: unknown) => void;
}

const TestimonialSection = ({ formData, setFormData }: TestimonialSectionProps) => {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Testimonial</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="testimonial-text" className="text-gray-200">Testimonial Text</Label>
          <Textarea
            id="testimonial-text"
            value={formData.extendedTestimonial.quote}
            onChange={(e) => setFormData('extendedTestimonial', { ...formData.extendedTestimonial, quote: e.target.value })}
            placeholder="Client testimonial"
            rows={3}
            className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="testimonial-author" className="text-gray-200">Author</Label>
            <Input
              id="testimonial-author"
              value={formData.extendedTestimonial.author}
              onChange={(e) => setFormData('extendedTestimonial', { ...formData.extendedTestimonial, author: e.target.value })}
              placeholder="John Doe"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-position" className="text-gray-200">Position</Label>
            <Input
              id="testimonial-position"
              value={formData.extendedTestimonial.position}
              onChange={(e) => setFormData('extendedTestimonial', { ...formData.extendedTestimonial, position: e.target.value })}
              placeholder="CEO"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonial-company" className="text-gray-200">Company</Label>
            <Input
              id="testimonial-company"
              value={formData.extendedTestimonial.company}
              onChange={(e) => setFormData('extendedTestimonial', { ...formData.extendedTestimonial, company: e.target.value })}
              placeholder="Company Name"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialSection;
