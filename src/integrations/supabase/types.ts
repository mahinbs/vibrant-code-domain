export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
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
          link: string | null
          service_id: string
          solution: string
          technologies: string[]
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
          link?: string | null
          service_id: string
          solution: string
          technologies?: string[]
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
          link?: string | null
          service_id?: string
          solution?: string
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
