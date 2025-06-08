
import { supabase } from '@/integrations/supabase/client';

export interface CustomerInquiry {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  service_interest: string;
  budget_range: string;
  project_timeline: string;
  message: string;
  source_page: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const customerInquiryService = {
  async submitInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'created_at' | 'updated_at' | 'status'>) {
    console.log('Submitting customer inquiry:', inquiry);
    
    try {
      // Clean and validate the data before submission
      const cleanData = {
        first_name: inquiry.first_name.trim(),
        last_name: inquiry.last_name.trim(),
        email: inquiry.email.trim().toLowerCase(),
        phone: inquiry.phone?.trim() || null,
        company: inquiry.company?.trim() || null,
        service_interest: inquiry.service_interest,
        budget_range: inquiry.budget_range,
        project_timeline: inquiry.project_timeline,
        message: inquiry.message.trim(),
        source_page: inquiry.source_page
      };

      console.log('Cleaned data for submission:', cleanData);

      // Test database connection first
      const { data: testData, error: testError } = await supabase
        .from('customer_inquiries')
        .select('count', { count: 'exact', head: true });

      if (testError) {
        console.error('Database connection test failed:', testError);
        throw new Error('Database connection failed. Please try again.');
      }

      console.log('Database connection successful, proceeding with insert...');

      const { data, error } = await supabase
        .from('customer_inquiries')
        .insert([cleanData])
        .select();

      if (error) {
        console.error('Supabase insertion error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // More specific error handling
        if (error.message.includes('row-level security')) {
          throw new Error('Security policy issue. Our team has been notified and will resolve this shortly.');
        } else if (error.message.includes('duplicate') || error.message.includes('unique')) {
          throw new Error('This inquiry appears to have been submitted already. Please contact us directly if you need assistance.');
        } else if (error.message.includes('network') || error.message.includes('timeout')) {
          throw new Error('Network error. Please check your connection and try again.');
        } else {
          throw new Error('Failed to submit inquiry. Please try again or contact us directly.');
        }
      }

      console.log('Inquiry submitted successfully:', data);
      return data[0];
      
    } catch (error) {
      console.error('Error in submitInquiry:', error);
      
      // Re-throw known errors
      if (error instanceof Error) {
        throw error;
      }
      
      // Handle unknown errors
      throw new Error('An unexpected error occurred. Please try again or contact us directly.');
    }
  },

  async getInquiries() {
    console.log('Fetching customer inquiries...');
    
    const { data, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }

    console.log('Inquiries fetched:', data?.length || 0);
    return data || [];
  },

  async updateInquiryStatus(id: string, status: string) {
    console.log('Updating inquiry status:', id, status);
    
    const { data, error } = await supabase
      .from('customer_inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating inquiry status:', error);
      throw error;
    }

    console.log('Inquiry status updated:', data);
    return data;
  },

  async deleteInquiry(id: string) {
    console.log('Deleting inquiry:', id);
    
    const { error } = await supabase
      .from('customer_inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }

    console.log('Inquiry deleted successfully');
  }
};
