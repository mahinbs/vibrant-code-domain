
import { Control, FieldErrors } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormData } from './types';

interface PersonalInformationStepProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const PersonalInformationStep = ({ control }: PersonalInformationStepProps) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
      <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">First Name *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="John"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Last Name *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="Doe"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email Address *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="email"
                  className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="john@company.com"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Phone Number</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  type="tel"
                  className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                  placeholder="+1 (555) 123-4567"
                />
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="company"
        render={({ field }) => (
          <FormItem className="mt-6">
            <FormLabel className="text-gray-300">Company Name</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Your Company Inc."
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInformationStep;
