
import * as z from 'zod';

export const formSchema = z.object({
  first_name: z.string().min(2, 'First name must be at least 2 characters'),
  last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(1, 'Phone number is required'),
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
  'Mobile Apps',
  'SaaS Solutions',
  'AI & Automation',
  'E-commerce',
  'Custom Software',
  'UI/UX Design',
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
