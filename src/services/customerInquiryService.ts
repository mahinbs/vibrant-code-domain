
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
    
    const { data, error } = await supabase
      .from('customer_inquiries')
      .insert([inquiry])
      .select()
      .single();

    if (error) {
      console.error('Error submitting inquiry:', error);
      throw error;
    }

    console.log('Inquiry submitted successfully:', data);
    return data;
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
