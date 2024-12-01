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
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: number
          period_end: string
          period_start: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: number
          period_end?: string
          period_start?: string
          user_id?: string | null
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
        }
        Insert: {
          created_at?: string | null
          file_path?: string | null
          id?: never
          merchant_name?: string | null
          names?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string | null
          id?: never
          merchant_name?: string | null
          names?: string | null
          url?: string | null
        }
        Relationships: []
      }
      Invoices: {
        Row: {
          created_at: string | null
          file_path: string | null
          id: number
          Names: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          file_path?: string | null
          id?: number
          Names?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          file_path?: string | null
          id?: number
          Names?: string | null
          url?: string | null
        }
        Relationships: []
      }
      Métadonné: {
        Row: {
          date: Json | null
          Name: number
          Price: number
        }
        Insert: {
          date?: Json | null
          Name?: number
          Price: number
        }
        Update: {
          date?: Json | null
          Name?: number
          Price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          id?: string
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
      subscriptions: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          id: number
          name: string
          next_billing: string | null
          price: number
          user_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name: string
          next_billing?: string | null
          price: number
          user_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          id?: number
          name?: string
          next_billing?: string | null
          price?: number
          user_id?: string | null
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
