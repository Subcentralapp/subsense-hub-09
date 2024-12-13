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
      applications: {
        Row: {
          AVANTAGES: string | null
          CARACTÉRISTIQUES: Json | null
          CATÉGORIE: string | null
          DESCRIPTION: string | null
          id: number
          INCONVÉNIENTS: string | null
          NOM: string | null
          "NOMBRE D'UTILISATEURS": number | null
          NOTE: number | null
          PRICE: string | null
          REVUE: string | null
          "URL DU LOGO": string | null
          "URL DU SITE WEB": string | null
        }
        Insert: {
          AVANTAGES?: string | null
          CARACTÉRISTIQUES?: Json | null
          CATÉGORIE?: string | null
          DESCRIPTION?: string | null
          id?: number
          INCONVÉNIENTS?: string | null
          NOM?: string | null
          "NOMBRE D'UTILISATEURS"?: number | null
          NOTE?: number | null
          PRICE?: string | null
          REVUE?: string | null
          "URL DU LOGO"?: string | null
          "URL DU SITE WEB"?: string | null
        }
        Update: {
          AVANTAGES?: string | null
          CARACTÉRISTIQUES?: Json | null
          CATÉGORIE?: string | null
          DESCRIPTION?: string | null
          id?: number
          INCONVÉNIENTS?: string | null
          NOM?: string | null
          "NOMBRE D'UTILISATEURS"?: number | null
          NOTE?: number | null
          PRICE?: string | null
          REVUE?: string | null
          "URL DU LOGO"?: string | null
          "URL DU SITE WEB"?: string | null
        }
        Relationships: []
      }
      budgets: {
        Row: {
          amount: number
          created_at: string | null
          id: number
          period_end: string
          period_start: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: number
          period_end: string
          period_start: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: number
          period_end?: string
          period_start?: string
          user_id?: string
        }
        Relationships: []
      }
      failed_login_attempts: {
        Row: {
          attempt_time: string | null
          email: string
          id: number
          ip_address: string
          is_blocked: boolean | null
        }
        Insert: {
          attempt_time?: string | null
          email: string
          id?: number
          ip_address: string
          is_blocked?: boolean | null
        }
        Update: {
          attempt_time?: string | null
          email?: string
          id?: number
          ip_address?: string
          is_blocked?: boolean | null
        }
        Relationships: []
      }
      invoicedetails: {
        Row: {
          amount: number | null
          category: string | null
          created_at: string | null
          id: number
          invoice_date: string | null
          invoice_id: number | null
          merchant_name: string | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          id?: never
          invoice_date?: string | null
          invoice_id?: number | null
          merchant_name?: string | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          category?: string | null
          created_at?: string | null
          id?: never
          invoice_date?: string | null
          invoice_id?: number | null
          merchant_name?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoicedetails_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          file_path: string | null
          id: number
          merchant_name: string | null
          names: string | null
          url: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          file_path?: string | null
          id?: never
          merchant_name?: string | null
          names?: string | null
          url?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          file_path?: string | null
          id?: never
          merchant_name?: string | null
          names?: string | null
          url?: string | null
          user_id?: string
        }
        Relationships: []
      }
      login_attempts: {
        Row: {
          attempt_time: string | null
          email: string
          id: number
          ip_address: string
          successful: boolean | null
        }
        Insert: {
          attempt_time?: string | null
          email: string
          id?: number
          ip_address: string
          successful?: boolean | null
        }
        Update: {
          attempt_time?: string | null
          email?: string
          id?: number
          ip_address?: string
          successful?: boolean | null
        }
        Relationships: []
      }
      metadata: {
        Row: {
          created_at: string | null
          date: Json | null
          id: number
          name: string
          price: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date?: Json | null
          id?: number
          name: string
          price: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: Json | null
          id?: number
          name?: string
          price?: number
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          due_date: string | null
          id: number
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          due_date?: string | null
          id?: number
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          due_date?: string | null
          id?: number
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_logs: {
        Row: {
          endpoint: string
          error_message: string | null
          id: number
          memory_usage: number | null
          metadata: Json | null
          response_time: number
          status_code: number | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          endpoint: string
          error_message?: string | null
          id?: number
          memory_usage?: number | null
          metadata?: Json | null
          response_time: number
          status_code?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          endpoint?: string
          error_message?: string | null
          id?: number
          memory_usage?: number | null
          metadata?: Json | null
          response_time?: number
          status_code?: number | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_locked: boolean | null
          avatar_url: string | null
          created_at: string
          failed_login_attempts: number | null
          id: string
          last_login: string | null
          last_password_change: string | null
          username: string | null
        }
        Insert: {
          account_locked?: boolean | null
          avatar_url?: string | null
          created_at?: string
          failed_login_attempts?: number | null
          id: string
          last_login?: string | null
          last_password_change?: string | null
          username?: string | null
        }
        Update: {
          account_locked?: boolean | null
          avatar_url?: string | null
          created_at?: string
          failed_login_attempts?: number | null
          id?: string
          last_login?: string | null
          last_password_change?: string | null
          username?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          application_id: number | null
          code: string
          created_at: string | null
          description: string | null
          discount_amount: number
          discount_type: string | null
          id: number
          is_active: boolean | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          application_id?: number | null
          code: string
          created_at?: string | null
          description?: string | null
          discount_amount: number
          discount_type?: string | null
          id?: number
          is_active?: boolean | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          application_id?: number | null
          code?: string
          created_at?: string | null
          description?: string | null
          discount_amount?: number
          discount_type?: string | null
          id?: number
          is_active?: boolean | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promo_codes_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      rate_limits: {
        Row: {
          created_at: string
          endpoint: string
          id: number
          key: string
          timestamp: string
        }
        Insert: {
          created_at?: string
          endpoint: string
          id?: number
          key: string
          timestamp?: string
        }
        Update: {
          created_at?: string
          endpoint?: string
          id?: number
          key?: string
          timestamp?: string
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          is_trial: boolean | null
          name: string
          next_billing: string | null
          price: number
          trial_end_date: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_trial?: boolean | null
          name: string
          next_billing?: string | null
          price: number
          trial_end_date?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          is_trial?: boolean | null
          name?: string
          next_billing?: string | null
          price?: number
          trial_end_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          age_range: string | null
          created_at: string
          current_monthly_spend: string | null
          desired_features: string[] | null
          favorite_subscriptions: string[] | null
          has_used_management_app: boolean | null
          id: string
          interested_services: string[] | null
          management_habits: string | null
          notification_preferences: string[] | null
          region: string | null
          revenue_percentage: string | null
          subscription_barriers: string[] | null
          subscription_priorities: string[] | null
          target_monthly_budget: string | null
          updated_at: string
          usage_frequency: Json | null
          wants_recommendations: boolean | null
        }
        Insert: {
          age_range?: string | null
          created_at?: string
          current_monthly_spend?: string | null
          desired_features?: string[] | null
          favorite_subscriptions?: string[] | null
          has_used_management_app?: boolean | null
          id: string
          interested_services?: string[] | null
          management_habits?: string | null
          notification_preferences?: string[] | null
          region?: string | null
          revenue_percentage?: string | null
          subscription_barriers?: string[] | null
          subscription_priorities?: string[] | null
          target_monthly_budget?: string | null
          updated_at?: string
          usage_frequency?: Json | null
          wants_recommendations?: boolean | null
        }
        Update: {
          age_range?: string | null
          created_at?: string
          current_monthly_spend?: string | null
          desired_features?: string[] | null
          favorite_subscriptions?: string[] | null
          has_used_management_app?: boolean | null
          id?: string
          interested_services?: string[] | null
          management_habits?: string | null
          notification_preferences?: string[] | null
          region?: string | null
          revenue_percentage?: string | null
          subscription_barriers?: string[] | null
          subscription_priorities?: string[] | null
          target_monthly_budget?: string | null
          updated_at?: string
          usage_frequency?: Json | null
          wants_recommendations?: boolean | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_trial_ending: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      clean_old_login_attempts: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      clean_old_performance_logs: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      clean_old_rate_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
