
import { Control, FieldErrors } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormData, services, timelines } from './types';
import { useGeoCurrency } from '@/hooks/useGeoCurrency';
import { useMemo } from 'react';

interface ProjectDetailsStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const ProjectDetailsStep = ({ control }: ProjectDetailsStepProps) => {
  const { currency, convertPrice } = useGeoCurrency();
  
  const budgetRanges = useMemo(() => {
    const baseBudgets = [
      { min: 5000, max: 15000 },
      { min: 15000, max: 50000 },
      { min: 50000, max: 100000 },
      { min: 100000, max: 250000 },
      { min: 250000, max: null }
    ];
    
    return baseBudgets.map(budget => {
      const minConverted = convertPrice(budget.min);
      if (budget.max) {
        const maxConverted = convertPrice(budget.max);
        return `${minConverted.formatted} - ${maxConverted.formatted}`;
      } else {
        return `${minConverted.formatted}+`;
      }
    });
  }, [convertPrice]);
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
      <h3 className="text-2xl font-bold text-white mb-6">Project Details</h3>
      <div className="space-y-6">
        <FormField
          control={control}
          name="service_interest"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Service Interest *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {services.map((service) => (
                    <SelectItem key={service} value={service} className="text-white focus:bg-gray-700">
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="budget_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Budget Range ({currency}) *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range} className="text-white focus:bg-gray-700">
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="project_timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Project Timeline *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {timelines.map((timeline) => (
                    <SelectItem key={timeline} value={timeline} className="text-white focus:bg-gray-700">
                      {timeline}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ProjectDetailsStep;
