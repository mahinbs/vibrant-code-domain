
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormData } from './types';

interface MessageStepProps {
  control: Control<FormData>;
}

const MessageStep = ({ control }: MessageStepProps) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
      <h3 className="text-2xl font-bold text-white mb-6">Project Description</h3>
      <FormField
        control={control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300">Tell us about your project *</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                rows={6}
                className="bg-gray-800/50 border-gray-600/50 text-white focus:ring-cyan-500 focus:border-cyan-500 resize-none"
                placeholder="Describe your project requirements, goals, and any specific features you need..."
              />
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default MessageStep;
