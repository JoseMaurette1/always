import { createClient } from "@supabase/supabase-js";

// Safely access environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create a supabase client only if the URL and key are available
let supabase: ReturnType<typeof createClient> | null = null;

// Don't create the client during server-side build if variables are missing
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Log the issue for debugging, only on client-side
  if (typeof window !== "undefined") {
    console.warn("Supabase credentials not available, client not initialized.");
  }
}

export { supabase };

// Database types
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      workouts: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          user_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          user_id?: string;
        };
      };
      exercises: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          sets: number;
          reps: number;
          weight: number;
          workout_id: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          sets: number;
          reps: number;
          weight: number;
          workout_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          sets?: number;
          reps?: number;
          weight?: number;
          workout_id?: string;
        };
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
  };
}
