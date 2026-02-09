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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          category_en: string
          category_pt: string
          content_en: string
          content_pt: string
          created_at: string
          excerpt_en: string
          excerpt_pt: string
          id: string
          image_url: string | null
          published: boolean
          read_time: number
          slug: string
          title_en: string
          title_pt: string
          updated_at: string
        }
        Insert: {
          category_en?: string
          category_pt?: string
          content_en?: string
          content_pt?: string
          created_at?: string
          excerpt_en?: string
          excerpt_pt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          read_time?: number
          slug: string
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Update: {
          category_en?: string
          category_pt?: string
          content_en?: string
          content_pt?: string
          created_at?: string
          excerpt_en?: string
          excerpt_pt?: string
          id?: string
          image_url?: string | null
          published?: boolean
          read_time?: number
          slug?: string
          title_en?: string
          title_pt?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          description_en: string
          description_pt: string
          display_order: number
          href: string
          icon_name: string
          id: string
          is_active: boolean
          is_featured: boolean
          is_highlighted: boolean
          title_en: string
          title_pt: string
        }
        Insert: {
          description_en?: string
          description_pt?: string
          display_order?: number
          href?: string
          icon_name?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_highlighted?: boolean
          title_en?: string
          title_pt?: string
        }
        Update: {
          description_en?: string
          description_pt?: string
          display_order?: number
          href?: string
          icon_name?: string
          id?: string
          is_active?: boolean
          is_featured?: boolean
          is_highlighted?: boolean
          title_en?: string
          title_pt?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_en: string
          content_pt: string
          id: string
          section_key: string
          updated_at: string
        }
        Insert: {
          content_en?: string
          content_pt?: string
          id?: string
          section_key: string
          updated_at?: string
        }
        Update: {
          content_en?: string
          content_pt?: string
          id?: string
          section_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          display_order: number
          experience: string
          id: string
          image_url: string | null
          is_active: boolean
          name: string
          quote_en: string
          quote_pt: string
          role_en: string
          role_pt: string
          specialty_en: string
          specialty_pt: string
        }
        Insert: {
          display_order?: number
          experience?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name: string
          quote_en?: string
          quote_pt?: string
          role_en?: string
          role_pt?: string
          specialty_en?: string
          specialty_pt?: string
        }
        Update: {
          display_order?: number
          experience?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          name?: string
          quote_en?: string
          quote_pt?: string
          role_en?: string
          role_pt?: string
          specialty_en?: string
          specialty_pt?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          display_order: number
          id: string
          is_active: boolean
          location: string
          name: string
          service_en: string
          service_pt: string
          text_en: string
          text_pt: string
        }
        Insert: {
          display_order?: number
          id?: string
          is_active?: boolean
          location?: string
          name: string
          service_en?: string
          service_pt?: string
          text_en?: string
          text_pt?: string
        }
        Update: {
          display_order?: number
          id?: string
          is_active?: boolean
          location?: string
          name?: string
          service_en?: string
          service_pt?: string
          text_en?: string
          text_pt?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
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
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
