export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          author: Json
          content: string
          created_at: string
          excerpt: string
          id: string
          image: string
          published_date: string
          reading_time: number
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          author?: Json
          content: string
          created_at?: string
          excerpt: string
          id?: string
          image: string
          published_date: string
          reading_time?: number
          tags?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          author?: Json
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image?: string
          published_date?: string
          reading_time?: number
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      customer_inquiries: {
        Row: {
          budget_range: string
          company: string | null
          created_at: string
          deleted_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          phone: string | null
          project_timeline: string
          service_interest: string
          source_page: string
          status: string
          updated_at: string
        }
        Insert: {
          budget_range: string
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          phone?: string | null
          project_timeline: string
          service_interest: string
          source_page?: string
          status?: string
          updated_at?: string
        }
        Update: {
          budget_range?: string
          company?: string | null
          created_at?: string
          deleted_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          phone?: string | null
          project_timeline?: string
          service_interest?: string
          source_page?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      inquiry_audit_trails: {
        Row: {
          action: string
          created_at: string
          details: Json | null
          id: string
          inquiry_id: string
        }
        Insert: {
          action: string
          created_at?: string
          details?: Json | null
          id?: string
          inquiry_id: string
        }
        Update: {
          action?: string
          created_at?: string
          details?: Json | null
          id?: string
          inquiry_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inquiry_audit_trails_inquiry_id_fkey"
            columns: ["inquiry_id"]
            isOneToOne: false
            referencedRelation: "customer_inquiries"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolios: {
        Row: {
          challenge: string
          client: string
          created_at: string
          description: string
          detailed_metrics: Json
          extended_testimonial: Json
          gallery: string[]
          id: string
          image: string
          industry: string | null
          link: string | null
          service_id: string
          solution: string
          team: string | null
          technologies: string[]
          timeline: string | null
          title: string
          updated_at: string
        }
        Insert: {
          challenge: string
          client: string
          created_at?: string
          description: string
          detailed_metrics?: Json
          extended_testimonial?: Json
          gallery?: string[]
          id?: string
          image: string
          industry?: string | null
          link?: string | null
          service_id: string
          solution: string
          team?: string | null
          technologies?: string[]
          timeline?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          challenge?: string
          client?: string
          created_at?: string
          description?: string
          detailed_metrics?: Json
          extended_testimonial?: Json
          gallery?: string[]
          id?: string
          image?: string
          industry?: string | null
          link?: string | null
          service_id?: string
          solution?: string
          team?: string | null
          technologies?: string[]
          timeline?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      salesperson_links: {
        Row: {
          conversion_tag: string | null
          created_at: string
          display_name: string
          email: string
          gtag_script: string | null
          id: string
          is_active: boolean
          phone: string | null
          salesperson_name: string
          services: string[]
          updated_at: string
        }
        Insert: {
          conversion_tag?: string | null
          created_at?: string
          display_name: string
          email: string
          gtag_script?: string | null
          id?: string
          is_active?: boolean
          phone?: string | null
          salesperson_name: string
          services?: string[]
          updated_at?: string
        }
        Update: {
          conversion_tag?: string | null
          created_at?: string
          display_name?: string
          email?: string
          gtag_script?: string | null
          id?: string
          is_active?: boolean
          phone?: string | null
          salesperson_name?: string
          services?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      trial_leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          source: string | null
          updated_at: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          source?: string | null
          updated_at?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      webinar_events: {
        Row: {
          agenda: Json
          benefits: Json
          created_at: string
          cta_bg_color: string | null
          cta_text: string | null
          description: string
          duration_minutes: number
          event_date: string
          hero_headline: string | null
          hero_subtitle: string | null
          id: string
          is_active: boolean
          privacy_note: string | null
          recognitions: string[] | null
          registration_limit: number | null
          show_agenda_collapsible: boolean | null
          show_scarcity: boolean | null
          show_social_proof: boolean | null
          social_proof_logos: string[] | null
          social_proof_videos: string[] | null
          speaker_bio: string
          speaker_image: string | null
          speaker_name: string
          sticky_cta_enabled: boolean | null
          subtitle: string
          target_audience: string[] | null
          testimonials: Json | null
          title: string
          updated_at: string
        }
        Insert: {
          agenda?: Json
          benefits?: Json
          created_at?: string
          cta_bg_color?: string | null
          cta_text?: string | null
          description: string
          duration_minutes?: number
          event_date: string
          hero_headline?: string | null
          hero_subtitle?: string | null
          id?: string
          is_active?: boolean
          privacy_note?: string | null
          recognitions?: string[] | null
          registration_limit?: number | null
          show_agenda_collapsible?: boolean | null
          show_scarcity?: boolean | null
          show_social_proof?: boolean | null
          social_proof_logos?: string[] | null
          social_proof_videos?: string[] | null
          speaker_bio: string
          speaker_image?: string | null
          speaker_name: string
          sticky_cta_enabled?: boolean | null
          subtitle: string
          target_audience?: string[] | null
          testimonials?: Json | null
          title: string
          updated_at?: string
        }
        Update: {
          agenda?: Json
          benefits?: Json
          created_at?: string
          cta_bg_color?: string | null
          cta_text?: string | null
          description?: string
          duration_minutes?: number
          event_date?: string
          hero_headline?: string | null
          hero_subtitle?: string | null
          id?: string
          is_active?: boolean
          privacy_note?: string | null
          recognitions?: string[] | null
          registration_limit?: number | null
          show_agenda_collapsible?: boolean | null
          show_scarcity?: boolean | null
          show_social_proof?: boolean | null
          social_proof_logos?: string[] | null
          social_proof_videos?: string[] | null
          speaker_bio?: string
          speaker_image?: string | null
          speaker_name?: string
          sticky_cta_enabled?: boolean | null
          subtitle?: string
          target_audience?: string[] | null
          testimonials?: Json | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      webinar_registrations: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          registration_date: string
          status: string
          updated_at: string
          webinar_id: string
          whatsapp_number: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          registration_date?: string
          status?: string
          updated_at?: string
          webinar_id: string
          whatsapp_number: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          registration_date?: string
          status?: string
          updated_at?: string
          webinar_id?: string
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "webinar_registrations_webinar_id_fkey"
            columns: ["webinar_id"]
            isOneToOne: false
            referencedRelation: "webinar_events"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
