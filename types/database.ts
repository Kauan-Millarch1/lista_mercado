export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string | null;
          image_url: string;
          unit: string;
          average_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description?: string | null;
          image_url: string;
          unit: string;
          average_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string | null;
          image_url?: string;
          unit?: string;
          average_price?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      shopping_lists: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          status: "active" | "done";
          created_at: string;
          finalized_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          status?: "active" | "done";
          created_at?: string;
          finalized_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          status?: "active" | "done";
          created_at?: string;
          finalized_at?: string | null;
        };
        Relationships: [];
      };
      list_items: {
        Row: {
          id: string;
          list_id: string;
          product_id: string;
          quantity: number;
          priority: "high" | "medium" | "low";
          note: string | null;
          is_checked: boolean;
          estimated_price: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          list_id: string;
          product_id: string;
          quantity?: number;
          priority?: "high" | "medium" | "low";
          note?: string | null;
          is_checked?: boolean;
          estimated_price: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          list_id?: string;
          product_id?: string;
          quantity?: number;
          priority?: "high" | "medium" | "low";
          note?: string | null;
          is_checked?: boolean;
          estimated_price?: number;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
