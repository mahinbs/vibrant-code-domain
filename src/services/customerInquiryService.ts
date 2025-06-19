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
  deleted_at?: string | null;
}

export const customerInquiryService = {
  async submitInquiry(inquiry: Omit<CustomerInquiry, 'id' | 'created_at' | 'updated_at' | 'status' | 'deleted_at'>) {
    console.log('CustomerInquiryService: Starting submission to Supabase with data:', inquiry);
    
    try {
      // Test connection first
      console.log('CustomerInquiryService: Testing Supabase connection...');
      
      const { data, error } = await supabase
        .from('customer_inquiries')
        .insert([inquiry])
        .select();

      if (error) {
        console.error('CustomerInquiryService: Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Provide more specific error messages
        if (error.code === '42501') {
          throw new Error('Database permission denied. Please try again or contact support.');
        } else if (error.code === '23505') {
          throw new Error('A submission with this information already exists.');
        } else if (error.message.includes('RLS')) {
          throw new Error('Database security policy error. Please contact support.');
        }
        
        throw new Error(`Failed to submit inquiry: ${error.message}`);
      }

      if (!data || data.length === 0) {
        console.error('CustomerInquiryService: No data returned from insert operation');
        throw new Error('No data returned from submission. Please try again.');
      }

      console.log('CustomerInquiryService: Submission successful, returned data:', data[0]);
      return data[0];
      
    } catch (error) {
      console.error('CustomerInquiryService: Caught error during submission:', error);
      
      // Re-throw with better context
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('An unexpected error occurred during submission. Please try again.');
      }
    }
  },

  async getInquiries() {
    const { data, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching inquiries:', error);
      throw error;
    }

    return data || [];
  },
  
  async getDeletedInquiries() {
    const { data, error } = await supabase
      .from('customer_inquiries')
      .select('*')
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false });

    if (error) {
      console.error('Error fetching deleted inquiries:', error);
      throw error;
    }

    return data || [];
  },

  async updateInquiryStatus(id: string, status: string) {
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

    return data;
  },

  async deleteInquiry(id: string) { // Soft delete
    const { data, error } = await supabase
      .from('customer_inquiries')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error soft deleting inquiry:', error);
      throw error;
    }

    return data;
  },
  
  async restoreInquiry(id: string) {
    const { data, error } = await supabase
      .from('customer_inquiries')
      .update({ deleted_at: null })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error restoring inquiry:', error);
      throw error;
    }

    return data;
  },

  async hardDeleteInquiry(id: string) { // Permanent delete
    const { error } = await supabase
      .from('customer_inquiries')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting inquiry:', error);
      throw error;
    }
  }
};
