import { supabase } from '@/integrations/supabase/client';

export interface SalespersonLink {
  id?: string;
  salesperson_name: string;
  display_name: string;
  email: string;
  services: string[];
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export const AVAILABLE_SERVICES = [
  { id: 'web-apps', name: 'Web Applications' },
  { id: 'saas', name: 'SAAS Solutions' },
  { id: 'mobile-apps', name: 'Mobile Applications' },
  { id: 'ai-automation', name: 'AI Automation' },
  { id: 'ai-calling', name: 'AI Calling' }
];

export const salespersonLinkService = {
  async getSalespersonLinks(): Promise<SalespersonLink[]> {
    const { data, error } = await supabase
      .from('salesperson_links')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching salesperson links:', error);
      throw error;
    }

    return data || [];
  },

  async createSalespersonLink(salesperson: Omit<SalespersonLink, 'id' | 'created_at' | 'updated_at'>): Promise<SalespersonLink> {
    // Sanitize salesperson name for URL
    const sanitizedName = salesperson.salesperson_name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const { data, error } = await supabase
      .from('salesperson_links')
      .insert({
        ...salesperson,
        salesperson_name: sanitizedName
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating salesperson link:', error);
      throw error;
    }

    return data;
  },

  async updateSalespersonLink(id: string, updates: Partial<SalespersonLink>): Promise<SalespersonLink> {
    if (updates.salesperson_name) {
      updates.salesperson_name = updates.salesperson_name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    const { data, error } = await supabase
      .from('salesperson_links')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating salesperson link:', error);
      throw error;
    }

    return data;
  },

  async deleteSalespersonLink(id: string): Promise<void> {
    const { error } = await supabase
      .from('salesperson_links')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting salesperson link:', error);
      throw error;
    }
  },

  generateLinks(salesperson: SalespersonLink): Array<{ service: string; url: string; serviceName: string }> {
    const baseUrl = 'boostmysites.in';
    return salesperson.services.map(serviceId => {
      const service = AVAILABLE_SERVICES.find(s => s.id === serviceId);
      return {
        service: serviceId,
        url: `${baseUrl}/${salesperson.salesperson_name}/${serviceId}`,
        serviceName: service?.name || serviceId
      };
    });
  }
};