
import * as z from 'zod';

export const formSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^[+]?[0-9\s-()]{10,15}$/, 'Please enter a valid phone number (10-15 digits)'),
  company: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  budget_range: z.string().min(1, 'Please select a budget range'),
  project_timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type FormData = z.infer<typeof formSchema>;

export interface CustomerInquiryFormProps {
  sourcePage?: string;
  onSuccess?: () => void;
  className?: string;
}

export const services = [
  'Web Applications',
  'Mobile Apps (iOS/Android)',
  'SaaS Solutions',
  'AI & Automation',
  'AI Calling Systems',
  'Chatbot Development',
  'E-commerce Development',
  'Custom Software',
  'UI/UX Design',
  'Data Analytics',
  'Blockchain Development',
  'AR/VR Development',
  'IoT Development',
  'Game Development',
  'Cloud Computing',
  'Digital Transformation'
];

export const budgetRanges = [
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000 - $250,000',
  '$250,000+'
];

export const timelines = [
  'ASAP (Rush)',
  '1-2 months',
  '3-6 months',
  '6-12 months',
  '12+ months',
  'Just exploring'
];
