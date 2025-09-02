import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { SalespersonLink, AVAILABLE_SERVICES, salespersonLinkService } from '@/services/salespersonLinkService';

const salespersonSchema = z.object({
  salesperson_name: z.string()
    .min(1, 'URL Name is required')
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers, and hyphens allowed'),
  display_name: z.string().min(1, 'Full Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[0-9\s-()]{10,15}$/, 'Please enter a valid phone number (10-15 digits)'),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  is_active: z.boolean(),
});

type SalespersonFormData = z.infer<typeof salespersonSchema>;

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SalespersonFormData>({
    resolver: zodResolver(salespersonSchema),
    defaultValues: {
      salesperson_name: salesperson?.salesperson_name || '',
      display_name: salesperson?.display_name || '',
      email: salesperson?.email || '',
      phone: salesperson?.phone || '',
      services: salesperson?.services || [],
      is_active: salesperson?.is_active ?? true
    },
  });

  const onSubmit = async (data: SalespersonFormData) => {
    setIsSubmitting(true);
    
    try {
      if (salesperson?.id) {
        await salespersonLinkService.updateSalespersonLink(salesperson.id, data);
        toast.success('Salesperson updated successfully!');
      } else {
        await salespersonLinkService.createSalespersonLink(data as Omit<SalespersonLink, "id" | "created_at" | "updated_at">);
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="salesperson_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">URL Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john-doe (used in URL)"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <p className="text-sm text-gray-400 mt-1">
                    This will be used in the URL. Only lowercase letters, numbers, and hyphens allowed.
                  </p>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="display_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Full Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="john@boostmysites.in"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-200">Phone Number *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-cyan-500"
                                              onChange={(e) => {
                          // Only allow numbers, spaces, hyphens, parentheses, and plus sign
                          const value = e.target.value.replace(/[^0-9\s\-()]/g, '');
                          field.onChange(value);
                        }}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-200">Services *</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {AVAILABLE_SERVICES.map(service => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={form.watch('services').includes(service.id)}
                          onCheckedChange={(checked) => {
                            const currentServices = form.getValues('services');
                            if (checked) {
                              form.setValue('services', [...currentServices, service.id]);
                            } else {
                              form.setValue('services', currentServices.filter(s => s !== service.id));
                            }
                          }}
                          className="border-gray-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                        />
                        <Label htmlFor={service.id} className="text-sm text-gray-300">
                          {service.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="border-gray-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:border-cyan-600"
                    />
                  </FormControl>
                  <Label className="text-gray-300">Active</Label>
                </FormItem>
              )}
            />

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
        </Form>
      </CardContent>
    </Card>
  );
};