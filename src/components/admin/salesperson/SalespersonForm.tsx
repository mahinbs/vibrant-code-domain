import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { SalespersonLink, AVAILABLE_SERVICES, salespersonLinkService } from '@/services/salespersonLinkService';

interface SalespersonFormProps {
  salesperson?: SalespersonLink;
  onSuccess: () => void;
  onCancel: () => void;
}

export const SalespersonForm: React.FC<SalespersonFormProps> = ({
  salesperson,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    salesperson_name: salesperson?.salesperson_name || '',
    display_name: salesperson?.display_name || '',
    email: salesperson?.email || '',
    phone: salesperson?.phone || '',
    services: salesperson?.services || [],
    is_active: salesperson?.is_active ?? true
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, serviceId]
        : prev.services.filter(s => s !== serviceId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.salesperson_name || !formData.display_name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.services.length === 0) {
      toast.error('Please select at least one service');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (salesperson?.id) {
        await salespersonLinkService.updateSalespersonLink(salesperson.id, formData);
        toast.success('Salesperson updated successfully!');
      } else {
        await salespersonLinkService.createSalespersonLink(formData);
        toast.success('Salesperson created successfully!');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving salesperson:', error);
      toast.error('Failed to save salesperson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">
          {salesperson ? 'Edit Salesperson' : 'Add New Salesperson'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="salesperson_name" className="text-gray-200">URL Name *</Label>
            <Input
              id="salesperson_name"
              value={formData.salesperson_name}
              onChange={(e) => setFormData(prev => ({ ...prev, salesperson_name: e.target.value }))}
              placeholder="john-doe (used in URL)"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
            <p className="text-sm text-gray-400 mt-1">
              This will be used in the URL. Only lowercase letters, numbers, and hyphens allowed.
            </p>
          </div>

          <div>
            <Label htmlFor="display_name" className="text-gray-200">Full Name *</Label>
            <Input
              id="display_name"
              value={formData.display_name}
              onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
              placeholder="John Doe"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          <div>
            <Label htmlFor="email" className="text-gray-200">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="john@boostmysites.in"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-gray-200">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+91 98765 43210"
              required
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          <div>
            <Label className="text-gray-200">Services *</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {AVAILABLE_SERVICES.map(service => (
                <div key={service.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={service.id}
                    checked={formData.services.includes(service.id)}
                    onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                    className="border-gray-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                  />
                  <Label htmlFor={service.id} className="text-sm text-gray-300">
                    {service.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked as boolean }))}
              className="border-gray-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
            />
            <Label htmlFor="is_active" className="text-gray-300">Active</Label>
          </div>

          <div className="flex gap-2">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
            >
              {isSubmitting ? 'Saving...' : (salesperson ? 'Update' : 'Create')}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};